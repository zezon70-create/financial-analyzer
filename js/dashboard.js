// dashboard.js - النسخة النهائية والمحسّنة
document.addEventListener('DOMContentLoaded', () => {
  const noDataEl = document.getElementById('noData');
  const contentEl = document.getElementById('dashboardContent');
  const refreshBtn = document.getElementById('refreshBtn');
  const netProfitEl = document.getElementById('netProfit');
  const roaEl = document.getElementById('roa');
  const roeEl = document.getElementById('roe');
  const evaEl = document.getElementById('eva');
  const revExpCanvas = document.getElementById('revExpChart');
  const ratiosCanvas = document.getElementById('ratiosChart');

  const darkToggle = document.getElementById('darkModeToggle');
  const currencySelect = document.getElementById('currencySelect');
  const languageSelect = document.getElementById('languageSelect');
  const exportPdfBtn = document.getElementById('exportPdfBtn');
  const exportExcelBtn = document.getElementById('exportExcelBtn');

  let revExpChart = null;
  let ratiosChart = null;

  const state = {
    currency: localStorage.getItem('currency') || 'EGP',
    lang: localStorage.getItem('lang') || 'ar',
    darkMode: localStorage.getItem('darkMode') === 'true'
  };

  // ----- Helpers -----
  const safeNum = x => Number.isFinite(Number(x)) ? Number(x) : 0;
  const fmtNumber = (n, opts = {}) => {
    if (n === null || n === undefined || Number.isNaN(Number(n))) return '-';
    const locale = state.lang === 'ar' ? 'ar-EG' : 'en-US';
    const currency = opts.currency || state.currency || 'EGP';
    const decimals = opts.decimals !== undefined ? opts.decimals : 2;
    try {
      return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: decimals }).format(Number(n));
    } catch {
      return Number(n).toFixed(decimals);
    }
  };
  const debounce = (fn, ms = 120) => {
    let t = null;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  };

  // ----- Load session -----
  const loadSession = () => {
    if (Array.isArray(window.__trialData) && window.__trialData.length) return window.__trialData;
    const keys = ['trialSession', 'fa_session_v1', 'financialSession'];
    for (const k of keys) {
      try {
        const raw = localStorage.getItem(k);
        if (!raw) continue;
        const obj = JSON.parse(raw);
        if (Array.isArray(obj)) return obj;
        if (obj && Array.isArray(obj.trial)) return obj.trial;
      } catch {}
    }
    return [];
  };

  // ----- Normalize rows -----
  const normalizeTrialRows = rows => {
    if (!Array.isArray(rows)) return [];
    return rows.map(r => {
      const account = String(r.account ?? r['الحساب'] ?? r.name ?? '').trim();
      const code = String(r.code ?? r['رمز'] ?? '').trim();
      let debit = safeNum(r.debit ?? r.Debit ?? r['مدين']);
      let credit = safeNum(r.credit ?? r.Credit ?? r['دائن']);
      const value = r.value ?? r.Value ?? r['القيمة'] ?? r.amount ?? r.Amount;
      if ((debit === 0 && credit === 0) && value !== undefined) {
        const v = Number(value || 0);
        if (v >= 0) debit = v; else credit = Math.abs(v);
      }
      const type = (r.type || r['النوع'] || '').toString().trim();
      return { account, code, debit, credit, type };
    });
  };

  // ----- Classification -----
  const classifyAccount = name => {
    if (!name) return 'other';
    const s = name.toString().toLowerCase();
    if (/(cash|صندوق|نقد|bank|بنك)/i.test(s)) return 'asset_current';
    if (/(inventory|stock|مخزون|بضاعة)/i.test(s)) return 'asset_current';
    if (/(fixed asset|أصل ثابت|مبان|معدات)/i.test(s)) return 'asset_noncurrent';
    if (/(receivable|مدينون|ذمم)/i.test(s)) return 'asset_current';
    if (/(payable|دائنون|مورد)/i.test(s)) return 'liability_current';
    if (/(loan|قرض|قروض|سند)/i.test(s)) return 'liability_noncurrent';
    if (/(capital|رأس المال|احتياطيات|حقوق الملكية|equity)/i.test(s)) return 'equity';
    if (/(sale|مبيعات|revenue|إيراد)/i.test(s)) return 'revenue';
    if (/(cogs|تكلفة|تكلفة المبيعات|تكاليف مباشرة)/i.test(s)) return 'cogs';
    if (/(expense|مصاريف|مصروفات|رواتب|أجور|إيجار|إعلان)/i.test(s)) return 'expense_operating';
    if (/(interest|فوائد|تمويل)/i.test(s)) return 'expense_finance';
    if (/(tax|ضرائب|ضريبة)/i.test(s)) return 'tax';
    return 'other';
  };

  const buildClassified = rows => {
    const normalized = normalizeTrialRows(rows);
    const map = {};
    for (const r of normalized) {
      const cls = r.type || classifyAccount(r.account);
      const key = `${cls}||${r.account}||${r.code || ''}`;
      if (!map[key]) map[key] = { account: r.account, code: r.code || '', classKey: cls, debit: 0, credit: 0 };
      map[key].debit += safeNum(r.debit);
      map[key].credit += safeNum(r.credit);
    }
    return Object.values(map);
  };

  // ----- Financial statements -----
  const generateIncomeStatement = trialRows => {
    const classified = buildClassified(trialRows);
    const sumBy = (keys, creditMinusDebit = true) => classified
      .filter(x => keys.includes(x.classKey))
      .reduce((s, x) => s + (creditMinusDebit ? (x.credit - x.debit) : (x.debit - x.credit)), 0);

    const sales = sumBy(['revenue']);
    const cogs = sumBy(['cogs']);
    const grossProfit = sales - cogs;
    const operatingExpenses = sumBy(['expense_operating'], false);
    const financeExpenses = sumBy(['expense_finance'], false);
    const otherIncome = sumBy(['other_income']);
    const otherExpenses = sumBy(['other_expense'], false);
    const netBeforeTax = grossProfit - operatingExpenses - financeExpenses + otherIncome - otherExpenses;
    const tax = sumBy(['tax'], false);
    const netAfterTax = netBeforeTax - tax;

    return { sales, cogs, grossProfit, operatingExpenses, financeExpenses, otherIncome, otherExpenses, netBeforeTax, tax, netAfterTax, classified };
  };

  const generateBalanceSheet = trialRows => {
    const classified = buildClassified(trialRows);
    const assetsCurrent = classified.filter(x => x.classKey === 'asset_current').reduce((s, x) => s + (x.debit - x.credit), 0);
    const assetsNonCurrent = classified.filter(x => x.classKey === 'asset_noncurrent').reduce((s, x) => s + (x.debit - x.credit), 0);
    const liabilitiesCurrent = classified.filter(x => x.classKey === 'liability_current').reduce((s, x) => s + (x.credit - x.debit), 0);
    const liabilitiesNonCurrent = classified.filter(x => x.classKey === 'liability_noncurrent').reduce((s, x) => s + (x.credit - x.debit), 0);
    const equity = classified.filter(x => x.classKey === 'equity').reduce((s, x) => s + (x.credit - x.debit), 0);

    const totalAssets = assetsCurrent + assetsNonCurrent;
    const totalLiabilities = liabilitiesCurrent + liabilitiesNonCurrent;
    return { assetsCurrent, assetsNonCurrent, totalAssets, liabilitiesCurrent, liabilitiesNonCurrent, totalLiabilities, equity, classified };
  };

  const computeRatios = trialRows => {
    const inc = generateIncomeStatement(trialRows);
    const bs = generateBalanceSheet(trialRows);
    const net = inc.netAfterTax;
    const assets = bs.totalAssets || 0;
    const equity = bs.equity || 0;
    const roa = assets ? (net / assets) * 100 : null;
    const roe = equity ? (net / equity) * 100 : null;
    const eva = net - (equity * 0.08);
    return { net, assets, equity, roa, roe, eva };
  };

  // ----- Animate numbers -----
  const animateValue = (el, start, end, duration = 800) => {
    const range = end - start;
    let startTime = null;
    const step = time => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      el.innerText = fmtNumber(start + range * progress);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  // ----- Render -----
  const render = () => {
    const trial = loadSession();
    if (!trial.length) {
      noDataEl.style.display = 'block';
      contentEl.style.display = 'none';
      return;
    }
    noDataEl.style.display = 'none';
    contentEl.style.display = 'block';

    const inc = generateIncomeStatement(trial);
    const bs = generateBalanceSheet(trial);
    const ratios = computeRatios(trial);

    if (netProfitEl) animateValue(netProfitEl, 0, ratios.net);
    if (roaEl) roaEl.innerText = ratios.roa ? `${ratios.roa.toFixed(2)} %` : '-';
    if (roeEl) roeEl.innerText = ratios.roe ? `${ratios.roe.toFixed(2)} %` : '-';
    if (evaEl) animateValue(evaEl, 0, ratios.eva);

    const incContainer = document.getElementById('incomeStatement');
    if (incContainer) {
      const rows = [
        ['إجمالي المبيعات', fmtNumber(inc.sales)],
        ['تكلفة المبيعات', fmtNumber(inc.cogs)],
        ['مجمل الربح', fmtNumber(inc.grossProfit)],
        ['المصروفات التشغيلية', fmtNumber(inc.operatingExpenses)],
        ['المصروفات التمويلية', fmtNumber(inc.financeExpenses)],
        ['إيرادات/مصاريف أخرى', fmtNumber((inc.otherIncome || 0) - (inc.otherExpenses || 0))],
        ['صافي قبل الضريبة', fmtNumber(inc.netBeforeTax)],
        ['الضريبة', fmtNumber(inc.tax)],
        ['صافي بعد الضريبة', fmtNumber(inc.netAfterTax)]
      ];
      incContainer.innerHTML = `<table class="table table-sm"><tbody>${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</tbody></table>`;
    }

    const bsContainer = document.getElementById('balanceSheet');
    if (bsContainer) {
      const rows = [
        ['الأصول المتداولة', fmtNumber(bs.assetsCurrent)],
        ['الأصول غير المتداولة', fmtNumber(bs.assetsNonCurrent)],
        ['إجمالي الأصول', fmtNumber(bs.totalAssets)],
        ['الخصوم المتداولة', fmtNumber(bs.liabilitiesCurrent)],
        ['الخصوم طويلة الأجل', fmtNumber(bs.liabilitiesNonCurrent)],
        ['إجمالي الخصوم', fmtNumber(bs.totalLiabilities)],
        ['حقوق الملكية', fmtNumber(bs.equity)]
      ];
      bsContainer.innerHTML = `<table class="table table-sm"><tbody>${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</tbody></table>`;
    }

    updateCharts(inc, ratios);
  };

  const updateCharts = debounce((inc, ratios) => {
    if (revExpCanvas) {
      if (revExpChart) revExpChart.destroy();
      revExpChart = new Chart(revExpCanvas, {
        type: 'pie',
        data: {
          labels: ['إيرادات', 'مصروفات'],
          datasets: [{
            data: [Math.max(0, inc.sales), Math.max(0, (inc.cogs + inc.operatingExpenses + inc.financeExpenses + inc.otherExpenses))],
            backgroundColor: ['rgba(40,167,69,0.8)', 'rgba(220,53,69,0.8)']
          }]
        },
        options: { responsive: true }
      });
    }
    if (ratiosCanvas) {
      if (ratiosChart) ratiosChart.destroy();
      ratiosChart = new Chart(ratiosCanvas, {
        type: 'bar',
        data: {
          labels: ['ROA', 'ROE', 'EVA'],
          datasets: [{
            label: 'النسب المالية',
            data: [ratios.roa || 0, ratios.roe || 0, ratios.eva || 0],
            backgroundColor: ['#0d6efd', '#6f42c1', '#fd7e14']
          }]
        },
        options: { responsive: true }
      });
    }
  }, 100);

  // ----- Dark mode -----
  const applyDarkMode = () => {
    document.body.classList.toggle('dark-mode', state.darkMode);
    darkToggle.checked = state.darkMode;
    localStorage.setItem('darkMode', state.darkMode);
  };
  darkToggle.addEventListener('change', e => {
    state.darkMode = e.target.checked;
    applyDarkMode();
  });

  // ----- Currency -----
  currencySelect.value = state.currency;
  currencySelect.addEventListener('change', e => {
    state.currency = e.target.value;
    localStorage.setItem('currency', state.currency);
    render();
  });

  // ----- Language -----
  languageSelect.value = state.lang;
  languageSelect.addEventListener('change', e => {
    state.lang = e.target.value;
    localStorage.setItem('lang', state.lang);
    render();
  });

  // ----- Refresh -----
  refreshBtn.addEventListener('click', () => render());

  // ----- Export PDF -----
  exportPdfBtn.addEventListener('click', () => {
    const opt = { margin: 0.5, filename: 'financial_dashboard.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'landscape' } };
    html2pdf().set(opt).from(document.getElementById('report-area')).save();
  });

  // ----- Export Excel -----
  exportExcelBtn.addEventListener('click', () => {
    const wb = XLSX.utils.book_new();
    const incTbl = document.getElementById('incomeStatement').querySelector('table');
    const bsTbl = document.getElementById('balanceSheet').querySelector('table');
    if (incTbl) XLSX.utils.book_append_sheet(wb, XLSX.utils.table_to_sheet(incTbl), 'قائمة الدخل');
    if (bsTbl) XLSX.utils.book_append_sheet(wb, XLSX.utils.table_to_sheet(bsTbl), 'الميزانية');
    XLSX.writeFile(wb, 'financial_dashboard.xlsx');
  });

  applyDarkMode();
  render();
});
