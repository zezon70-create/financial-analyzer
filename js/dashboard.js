// dashboard.js - نسخة نهائية محسّنة للـ Dashboard
// متطلبات: Chart.js, html2pdf.js, SheetJS (XLSX) محمّلة في الصفحة
document.addEventListener('DOMContentLoaded', () => {
  // --- DOM elements (قد تكون مفقودة في بعض الصفحات) ---
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

  // --- state & charts ---
  let revExpChart = null;
  let ratiosChart = null;
  const state = {
    currency: localStorage.getItem('currency') || (currencySelect ? currencySelect.value : 'EGP'),
    lang: localStorage.getItem('lang') || (languageSelect ? languageSelect.value : 'ar'),
    darkMode: localStorage.getItem('darkMode') === 'true'
  };

  // --- helpers ---
  function safeNum(x) { const n = Number(x); return Number.isFinite(n) ? n : 0; }
  function isEmptyArray(a) { return !Array.isArray(a) || a.length === 0; }

  function fmtNumber(n, opts = {}) {
    if (n === null || n === undefined || Number.isNaN(Number(n))) return '-';
    const locale = (state.lang === 'ar') ? 'ar-EG' : 'en-US';
    const currency = opts.currency || state.currency || 'EGP';
    const decimals = (opts.decimals !== undefined) ? opts.decimals : 2;
    try {
      return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: decimals }).format(Number(n));
    } catch (e) {
      return Number(n).toFixed(decimals);
    }
  }

  // Debounce small helper to avoid excessive chart redraws
  function debounce(fn, ms = 120) {
    let t = null;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  }

  // --- load session (من عدة مفاتيح محتملة) ---
  function loadSession() {
    if (Array.isArray(window.__trialData) && window.__trialData.length) return window.__trialData;
    const keys = ['trialSession', 'fa_session_v1', 'financialSession'];
    for (const k of keys) {
      try {
        const raw = localStorage.getItem(k);
        if (!raw) continue;
        const obj = JSON.parse(raw);
        if (Array.isArray(obj)) return obj;
        if (obj && Array.isArray(obj.trial)) return obj.trial;
      } catch (e) { /* ignore */ }
    }
    return [];
  }

  // --- normalize rows: تقبل debit/credit أو value/amount ---
  function normalizeTrialRows(rows) {
    if (!Array.isArray(rows)) return [];
    return rows.map(r => {
      const account = String(r.account ?? r['الحساب'] ?? r.name ?? r.Name ?? '').trim();
      const code = String(r.code ?? r['رمز'] ?? r['Code'] ?? r['رقم الحساب'] ?? '').trim();
      let debit = safeNum(r.debit ?? r.Debit ?? r['مدين']);
      let credit = safeNum(r.credit ?? r.Credit ?? r['دائن']);
      const value = (r.value ?? r.Value ?? r['القيمة'] ?? r.amount ?? r.Amount);
      if ((debit === 0 && credit === 0) && value !== undefined) {
        const v = Number(value || 0);
        if (v >= 0) debit = v; else credit = Math.abs(v);
      }
      // final fallbacks
      debit = safeNum(debit);
      credit = safeNum(credit);
      const type = (r.type || r['النوع'] || '').toString().trim();
      return { account, code, debit, credit, type };
    });
  }

  // --- basic classification (قابل للتوسعة لاحقاً) ---
  function classifyAccount(name) {
    if (!name) return 'other';
    const s = name.toString().toLowerCase();
    if (/(cash|صندوق|نقد|bank|بنك|banking|مدين)/i.test(s)) return 'asset_current';
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
  }

  // --- aggregate/classify rows ---
  function buildClassified(rows) {
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
  }

  // --- financial statements generators ---
  function generateIncomeStatement(trialRows) {
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

    return {
      sales, cogs, grossProfit,
      operatingExpenses, financeExpenses,
      otherIncome, otherExpenses,
      netBeforeTax, tax, netAfterTax, classified
    };
  }

  function generateBalanceSheet(trialRows) {
    const classified = buildClassified(trialRows);
    const assetsCurrent = classified.filter(x => x.classKey === 'asset_current').reduce((s, x) => s + (x.debit - x.credit), 0);
    const assetsNonCurrent = classified.filter(x => x.classKey === 'asset_noncurrent').reduce((s, x) => s + (x.debit - x.credit), 0);
    const liabilitiesCurrent = classified.filter(x => x.classKey === 'liability_current').reduce((s, x) => s + (x.credit - x.debit), 0);
    const liabilitiesNonCurrent = classified.filter(x => x.classKey === 'liability_noncurrent').reduce((s, x) => s + (x.credit - x.debit), 0);
    const equity = classified.filter(x => x.classKey === 'equity').reduce((s, x) => s + (x.credit - x.debit), 0);

    const totalAssets = assetsCurrent + assetsNonCurrent;
    const totalLiabilities = liabilitiesCurrent + liabilitiesNonCurrent;
    return { assetsCurrent, assetsNonCurrent, totalAssets, liabilitiesCurrent, liabilitiesNonCurrent, totalLiabilities, equity, classified };
  }

  // --- ratios ---
  function computeRatios(trialRows) {
    const inc = generateIncomeStatement(trialRows);
    const bs = generateBalanceSheet(trialRows);
    const net = inc.netAfterTax;
    const assets = bs.totalAssets || 0;
    const equity = bs.equity || 0;
    const roa = assets ? (net / assets) * 100 : null;
    const roe = equity ? (net / equity) * 100 : null;
    const eva = net - (equity * 0.08);
    return { net, assets, equity, roa, roe, eva };
  }

  // --- rendering (tables + top cards + charts) ---
  function render() {
    try {
      const trial = loadSession();
      if (!Array.isArray(trial) || trial.length === 0) {
        if (noDataEl) noDataEl.style.display = 'block';
        if (contentEl) contentEl.style.display = 'none';
        return;
      }
      if (noDataEl) noDataEl.style.display = 'none';
      if (contentEl) contentEl.style.display = 'block';

      const inc = generateIncomeStatement(trial);
      const bs = generateBalanceSheet(trial);
      const ratios = computeRatios(trial);

      if (netProfitEl) netProfitEl.innerText = fmtNumber(ratios.net ?? 0);
      if (roaEl) roaEl.innerText = (ratios.roa !== null && ratios.roa !== undefined) ? `${Number(ratios.roa).toFixed(2)} %` : '-';
      if (roeEl) roeEl.innerText = (ratios.roe !== null && ratios.roe !== undefined) ? `${Number(ratios.roe).toFixed(2)} %` : '-';
      if (evaEl) evaEl.innerText = fmtNumber(ratios.eva ?? 0);

      // Income statement table
      const incContainer = document.getElementById('incomeStatement');
      if (incContainer) {
        const rows = [
          ['إجمالي المبيعات', fmtNumber(inc.sales)],
          ['تكلفة المبيعات', fmtNumber(inc.cogs)],
          ['مجمل الربح', fmtNumber(inc.grossProfit)],
          ['المصروفات التشغيلية', fmtNumber(inc.operatingExpenses)],
          ['المصروفات التمويلية', fmtNumber(inc.financeExpenses)],
          ['إيرادات/مصاريف أخرى (صافي)', fmtNumber((inc.otherIncome || 0) - (inc.otherExpenses || 0))],
          ['صافي قبل الضريبة', fmtNumber(inc.netBeforeTax)],
          ['الضريبة', fmtNumber(inc.tax)],
          ['صافي بعد الضريبة', fmtNumber(inc.netAfterTax)]
        ];
        incContainer.innerHTML = `<table class="table table-sm"><tbody>${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</tbody></table>`;
      }

      // Balance sheet table
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

      debouncedUpdateCharts(inc, ratios);
    } catch (err) {
      console.error('Render error:', err);
    }
  }

  const debouncedUpdateCharts = debounce(updateCharts, 150);

  function updateCharts(inc, ratios) {
    const revenue = inc.sales || 0;
    const expense = (inc.cogs || 0) + (inc.operatingExpenses || 0) + (inc.financeExpenses || 0) + (inc.otherExpenses || 0);

    // rev/exp pie
    if (revExpCanvas) {
      try { if (revExpChart) revExpChart.destroy(); } catch (e) { /* ignore */ }
      revExpChart = new Chart(revExpCanvas, {
        type: 'pie',
        data: {
          labels: ['إيرادات', 'مصروفات'],
          datasets: [{
            data: [Math.max(0, revenue), Math.max(0, Math.abs(expense))],
            backgroundColor: ['#28a745', '#dc3545']
          }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
      });
    }

    // ratios bar
    if (ratiosCanvas) {
      try { if (ratiosChart) ratiosChart.destroy(); } catch (e) { /* ignore */ }
      const roaVal = ratios.roa ? Number(ratios.roa) : 0;
      const roeVal = ratios.roe ? Number(ratios.roe) : 0;
      const evaVal = ratios.eva ? Number(ratios.eva) : 0;
      ratiosChart = new Chart(ratiosCanvas, {
        type: 'bar',
        data: {
          labels: ['ROA (%)', 'ROE (%)', 'EVA'],
          datasets: [{
            label: state.lang === 'ar' ? 'قيمة / نسبة' : 'Value / %',
            data: [roaVal, roeVal, evaVal],
            backgroundColor: ['#007bff', '#ffc107', '#17a2b8']
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true }
          },
          plugins: { legend: { display: false } }
        }
      });
    }
  }

  // --- export helpers ---
  function exportPdf() {
    if (!exportPdfBtn) return;
    try {
      const el = document.getElementById('report-area') || document.body;
      html2pdf().set({
        margin: [10, 10, 10, 10],
        filename: 'financial-report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4' }
      }).from(el).save();
    } catch (e) {
      console.error('PDF export error', e);
      alert(state.lang === 'ar' ? 'فشل تصدير PDF — تأكد أن html2pdf محمّلة.' : 'PDF export failed — check html2pdf is loaded.');
    }
  }

  function exportExcel() {
    if (!exportExcelBtn) return;
    try {
      const trial = loadSession();
      if (!trial || trial.length === 0) {
        alert(state.lang === 'ar' ? 'لا توجد بيانات للتصدير' : 'No data to export');
        return;
      }
      const wb = XLSX.utils.book_new();
      const tb = trial.map(r => ({
        الحساب: r.account ?? r['الحساب'] ?? '',
        رمز: r.code ?? r['رمز'] ?? '',
        مدين: r.debit ?? r.Debit ?? r.amount ?? 0,
        دائن: r.credit ?? r.Credit ?? 0,
        النوع: r.type ?? ''
      }));
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(tb), 'ميزان المراجعة');

      const inc = generateIncomeStatement(trial);
      const incSheet = [
        { بند: 'إجمالي المبيعات', قيمة: inc.sales },
        { بند: 'تكلفة المبيعات', قيمة: inc.cogs },
        { بند: 'مجمل الربح', قيمة: inc.grossProfit },
        { بند: 'مصاريف تشغيلية', قيمة: inc.operatingExpenses },
        { بند: 'مصاريف تمويلية', قيمة: inc.financeExpenses },
        { بند: 'صافي قبل الضريبة', قيمة: inc.netBeforeTax },
        { بند: 'ضريبة', قيمة: inc.tax },
        { بند: 'صافي بعد الضريبة', قيمة: inc.netAfterTax }
      ];
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(incSheet), 'قائمة الدخل');

      const bs = generateBalanceSheet(trial);
      const bsSheet = [
        { بند: 'الأصول المتداولة', قيمة: bs.assetsCurrent },
        { بند: 'الأصول غير المتداولة', قيمة: bs.assetsNonCurrent },
        { بند: 'إجمالي الأصول', قيمة: bs.totalAssets },
        { بند: 'الخصوم المتداولة', قيمة: bs.liabilitiesCurrent },
        { بند: 'الخصوم طويلة الأجل', قيمة: bs.liabilitiesNonCurrent },
        { بند: 'إجمالي الخصوم', قيمة: bs.totalLiabilities },
        { بند: 'حقوق الملكية', قيمة: bs.equity }
      ];
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(bsSheet), 'الميزانية');

      XLSX.writeFile(wb, 'financial-report.xlsx');
    } catch (e) {
      console.error('Excel export error', e);
      alert(state.lang === 'ar' ? 'فشل تصدير Excel — تأكد أن SheetJS محمّل.' : 'Excel export failed — check SheetJS is loaded.');
    }
  }

  // --- UI bindings (DOM-safe) ---
  if (darkToggle) {
    darkToggle.checked = state.darkMode;
    darkToggle.addEventListener('change', (e) => {
      document.body.classList.toggle('dark-mode', e.target.checked);
      localStorage.setItem('darkMode', e.target.checked ? 'true' : 'false');
    });
    if (state.darkMode) document.body.classList.add('dark-mode');
  }
  if (currencySelect) {
    currencySelect.value = state.currency;
    currencySelect.addEventListener('change', (e) => {
      state.currency = e.target.value;
      localStorage.setItem('currency', state.currency);
      render();
    });
  }
  if (languageSelect) {
    languageSelect.value = state.lang;
    languageSelect.addEventListener('change', (e) => {
      state.lang = e.target.value;
      localStorage.setItem('lang', state.lang);
      render();
    });
  }
  if (refreshBtn) refreshBtn.addEventListener('click', render);
  if (exportPdfBtn) exportPdfBtn.addEventListener('click', exportPdf);
  if (exportExcelBtn) exportExcelBtn.addEventListener('click', exportExcel);

  // initial render
  render();
});
