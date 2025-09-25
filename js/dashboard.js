// dashboard.js - نسخة محسّنة ومتكاملة للـ Dashboard
// متطلبات: Chart.js, html2pdf.js, SheetJS (XLSX) محمّلة في الصفحة
document.addEventListener('DOMContentLoaded', () => {
  // عناصر DOM — نفحص وجودها قبل الاستخدام
  const noDataEl = document.getElementById('noData');
  const contentEl = document.getElementById('dashboardContent');
  const refreshBtn = document.getElementById('refreshBtn');
  const netProfitEl = document.getElementById('netProfit');
  const roaEl = document.getElementById('roa');
  const roeEl = document.getElementById('roe');
  const evaEl = document.getElementById('eva');
  const revExpCanvas = document.getElementById('revExpChart');
  const ratiosCanvas = document.getElementById('ratiosChart');

  const darkToggle = document.getElementById('darkModeToggle'); // قد لا يوجد في بعض الـ HTML — افحص قبل الاستخدام
  const currencySelect = document.getElementById('currencySelect');
  const languageSelect = document.getElementById('languageSelect');
  const exportPdfBtn = document.getElementById('exportPdfBtn');
  const exportExcelBtn = document.getElementById('exportExcelBtn');

  // حالة مخططات Chart.js
  let revExpChart = null;
  let ratiosChart = null;

  // إعدادات افتراضية (يمكن تخزين/قراءة من localStorage)
  const state = {
    currency: (localStorage.getItem('currency') || (currencySelect ? currencySelect.value : 'EGP')),
    lang: localStorage.getItem('lang') || (languageSelect ? languageSelect.value : 'ar'),
    darkMode: localStorage.getItem('darkMode') === 'true'
  };

  // فورماتر رقمي آمن
  function fmtNumber(n, opts = {}) {
    if (n === null || n === undefined || Number.isNaN(Number(n))) return '-';
    const locale = (state.lang === 'ar') ? 'ar-EG' : 'en-US';
    const currency = opts.currency || state.currency || 'EGP';
    return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: (opts.decimals ?? 2) }).format(Number(n));
  }

  // تحميل الجلسة — يحاول من عدة مصادر
  function loadSession() {
    // 1) window.__trialData
    if (Array.isArray(window.__trialData) && window.__trialData.length) return window.__trialData;
    // 2) localStorage common keys
    const keys = ['trialSession', 'fa_session_v1', 'financialSession'];
    for (const k of keys) {
      try {
        const raw = localStorage.getItem(k);
        if (raw) {
          const obj = JSON.parse(raw);
          // older format: array directly, newer: { trial: [...] }
          if (Array.isArray(obj)) return obj;
          if (Array.isArray(obj.trial)) return obj.trial;
        }
      } catch (e) { /* ignore parse errors */ }
    }
    return [];
  }

  // نرماليز لصفوف الميزان: نقبل {account, code, debit, credit, value, type}
  function normalizeTrialRows(rows) {
    if (!Array.isArray(rows)) return [];
    const out = rows.map(r => {
      const account = (r.account || r['الحساب'] || r.name || r.Name || '').toString();
      const code = (r.code || r['رمز'] || r['Code'] || r['رقم الحساب'] || '') + '';
      // debit/credit or single value
      let debit = safeNum(r.debit ?? r.Debit ?? r['مدين'] ?? 0);
      let credit = safeNum(r.credit ?? r.Credit ?? r['دائن'] ?? 0);
      const value = r.value ?? r.Value ?? r['القيمة'];
      if ((debit === 0 && credit === 0) && value !== undefined) {
        const v = Number(value || 0);
        if (v >= 0) debit = v; else credit = Math.abs(v);
      }
      // sometimes data has 'amount' prop
      if ((debit === 0 && credit === 0) && (r.amount !== undefined || r.Amount !== undefined)) {
        const v = Number(r.amount ?? r.Amount ?? 0);
        if (v >= 0) debit = v; else credit = Math.abs(v);
      }
      // type detection: if already provided use it, else guess later
      const type = r.type || r['النوع'] || '';
      return { account, code, debit: Number(debit || 0), credit: Number(credit || 0), type };
    });
    return out;
  }

  function safeNum(x) { return Number(x || 0); }

  // تصنيف حساب اساسي (heuristic) — يمكن توسيع القواعد لاحقاً
  function classifyAccount(name) {
    if (!name) return 'other';
    const s = name.toString().toLowerCase();
    if (/(cash|صندوق|نقد|bank|بنك|banking|مدين)/i.test(s)) return 'asset_current';
    if (/(inventory|stock|مخزون|بضاعة)/i.test(s)) return 'asset_current';
    if (/(fixed asset|assets fixed|أصل ثابت|معدات|مبان)/i.test(s)) return 'asset_noncurrent';
    if (/(receivable|مدينون|ذمم)/i.test(s)) return 'asset_current';
    if (/(payable|دائنون|مورد)/i.test(s)) return 'liability_current';
    if (/(loan|قرض|قروض|التزام طويل)/i.test(s)) return 'liability_noncurrent';
    if (/(capital|رأس المال|أرباح محتجزة|حقوق الملكية|equity)/i.test(s)) return 'equity';
    if (/(sale|مبيعات|revenue|إيراد)/i.test(s)) return 'revenue';
    if (/(cogs|تكلفة|تكلفة المبيعات|تكاليف مباشرة)/i.test(s)) return 'cogs';
    if (/(expense|مصاريف|مصروفات|رواتب|أجور|إيجار|إعلان)/i.test(s)) return 'expense_operating';
    if (/(tax|ضرائب|ضريبة)/i.test(s)) return 'tax';
    return 'other';
  }

  // تحويل الصفوف المصنفة (اجمالي/صافي) — نستخدم (credit - debit) كمقياس للإيراد، (debit - credit) للمصروف/أصل
  function buildClassified(rows) {
    const normalized = normalizeTrialRows(rows);
    const map = {}; // key by class+account
    for (const r of normalized) {
      const cls = r.type || classifyAccount(r.account);
      const key = `${cls}||${r.account}||${r.code || ''}`;
      if (!map[key]) map[key] = { account: r.account, code: r.code || '', classKey: cls, debit: 0, credit: 0 };
      map[key].debit += safeNum(r.debit);
      map[key].credit += safeNum(r.credit);
    }
    return Object.values(map);
  }

  // توليد قائمة دخل من الصفوف
  function generateIncomeStatement(trialRows) {
    const classified = buildClassified(trialRows);
    // revenues ~ credit - debit
    const sum = (classes) => classified
      .filter(x => classes.includes(x.classKey) || classes.includes('other') && x.classKey === 'other')
      .reduce((s, x) => s + (x.credit - x.debit), 0);

    const sales = sum(['revenue']);
    const cogs = sum(['cogs']);
    const grossProfit = sales - cogs;
    const operatingExpenses = classified.filter(x => x.classKey === 'expense_operating').reduce((s, x) => s + (x.debit - x.credit), 0);
    const financeExpenses = classified.filter(x => x.classKey === 'expense_finance').reduce((s, x) => s + (x.debit - x.credit), 0);
    const otherIncome = classified.filter(x => x.classKey === 'other_income').reduce((s, x) => s + (x.credit - x.debit), 0);
    const otherExpenses = classified.filter(x => x.classKey === 'other_expense').reduce((s, x) => s + (x.debit - x.credit), 0);
    const netBeforeTax = grossProfit - operatingExpenses - financeExpenses + otherIncome - otherExpenses;
    const tax = classified.filter(x => x.classKey === 'tax').reduce((s, x) => s + (x.debit - x.credit), 0);
    const netAfterTax = netBeforeTax - tax;

    return { sales, cogs, grossProfit, operatingExpenses, financeExpenses, otherIncome, otherExpenses, netBeforeTax, tax, netAfterTax, classified };
  }

  // توليد الميزانية
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

  // حساب النِّسب (بسيط ومفهومي)
  function computeRatios(trialRows) {
    const inc = generateIncomeStatement(trialRows);
    const bs = generateBalanceSheet(trialRows);

    const net = inc.netAfterTax;
    const assets = bs.totalAssets || 0;
    const equity = bs.equity || 0;
    const roa = assets ? (net / assets) * 100 : null;
    const roe = equity ? (net / equity) * 100 : null;
    const eva = net - (equity * 0.08); // تقدير بتكلفة رأس مال 8%
    return { net, assets, equity, roa, roe, eva };
  }

  // رندر القوائم على الصفحة
  function render() {
    try {
      const trial = loadSession();
      if (!trial || trial.length === 0) {
        if (noDataEl) noDataEl.style.display = 'block';
        if (contentEl) contentEl.style.display = 'none';
        return;
      }
      if (noDataEl) noDataEl.style.display = 'none';
      if (contentEl) contentEl.style.display = 'block';

      const inc = generateIncomeStatement(trial);
      const bs = generateBalanceSheet(trial);
      const ratios = computeRatios(trial);

      if (netProfitEl) netProfitEl.innerText = fmtNumber(ratios.net);
      if (roaEl) roaEl.innerText = ratios.roa !== null ? `${Number(ratios.roa).toFixed(2)} %` : '-';
      if (roeEl) roeEl.innerText = ratios.roe !== null ? `${Number(ratios.roe).toFixed(2)} %` : '-';
      if (evaEl) evaEl.innerText = fmtNumber(ratios.eva);

      // income statement table
      const incContainer = document.getElementById('incomeStatement');
      if (incContainer) {
        const rows = [];
        rows.push(['إجمالي المبيعات', fmtNumber(inc.sales)]);
        rows.push(['تكلفة المبيعات', fmtNumber(inc.cogs)]);
        rows.push(['مجمل الربح', fmtNumber(inc.grossProfit)]);
        rows.push(['المصروفات التشغيلية', fmtNumber(inc.operatingExpenses)]);
        rows.push(['المصروفات التمويلية', fmtNumber(inc.financeExpenses)]);
        rows.push(['إيرادات/مصاريف أخرى (صافي)', fmtNumber(inc.otherIncome - inc.otherExpenses)]);
        rows.push(['صافي قبل الضريبة', fmtNumber(inc.netBeforeTax)]);
        rows.push(['الضريبة', fmtNumber(inc.tax)]);
        rows.push(['صافي بعد الضريبة', fmtNumber(inc.netAfterTax)]);
        incContainer.innerHTML = `<table class="table table-sm"><tbody>${rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</tbody></table>`;
      }

      // balance sheet table
      const bsContainer = document.getElementById('balanceSheet');
      if (bsContainer) {
        const rows = [];
        rows.push(['الأصول المتداولة', fmtNumber(bs.assetsCurrent)]);
        rows.push(['الأصول غير المتداولة', fmtNumber(bs.assetsNonCurrent)]);
        rows.push(['إجمالي الأصول', fmtNumber(bs.totalAssets)]);
        rows.push(['الخصوم المتداولة', fmtNumber(bs.liabilitiesCurrent)]);
        rows.push(['الخصوم طويلة الأجل', fmtNumber(bs.liabilitiesNonCurrent)]);
        rows.push(['إجمالي الخصوم', fmtNumber(bs.totalLiabilities)]);
        rows.push(['حقوق الملكية', fmtNumber(bs.equity)]);
        bsContainer.innerHTML = `<table class="table table-sm"><tbody>${rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</tbody></table>`;
      }

      updateCharts(inc, ratios);
    } catch (err) {
      console.error('Render error:', err);
    }
  }

  // تحديث/بناء المخططات مع تدمير السابق
  function updateCharts(inc, ratios) {
    const revenue = inc.sales || 0;
    const expense = (inc.cogs || 0) + (inc.operatingExpenses || 0) + (inc.financeExpenses || 0) + (inc.otherExpenses || 0);

    // Pie: إيرادات/مصروفات
    if (revExpCanvas) {
      if (revExpChart) try { revExpChart.destroy(); } catch (e) {}
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

    // Bar: ROA, ROE, EVA (مقياس مختلط — EVA قد يحتاج فورمات آخر)
    if (ratiosCanvas) {
      if (ratiosChart) try { ratiosChart.destroy(); } catch (e) {}
      // إعداد بيانات للعرض: نحول النسب إلى أرقام قابلة للعرض
      const roaVal = ratios.roa ? Number(ratios.roa) : 0;
      const roeVal = ratios.roe ? Number(ratios.roe) : 0;
      // نجعل EVA بالقيمة النقدية (ليس نسبة)
      const evaVal = ratios.eva || 0;
      ratiosChart = new Chart(ratiosCanvas, {
        type: 'bar',
        data: {
          labels: ['ROA (%)', 'ROE (%)', 'EVA'],
          datasets: [{
            label: 'قيمة/N%', // عنوان عام
            data: [roaVal, roeVal, evaVal],
            backgroundColor: ['#007bff', '#ffc107', '#17a2b8']
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                // للـ EVA نعرض قيمة كبيرة — Chart.js سيتعامل تلقائياً
                callback: function (val) {
                  // إذا العنصر الثالث (EVA) أكبر بكثير — لا نحاول تحليل، نعرض عدد عادي
                  return val;
                }
              }
            }
          },
          plugins: { legend: { display: false } }
        }
      });
    }
  }

  // وظائف التصدير
  function exportPdf() {
    if (!exportPdfBtn) return;
    try {
      // اختر كونتينر التقرير (إن وجد) وإلا القص للكامل
      const el = document.getElementById('report-area') || document.body;
      html2pdf().set({ margin: [10, 10, 10, 10], filename: 'financial-report.pdf', jsPDF: { unit: 'mm', format: 'a4' } }).from(el).save();
    } catch (e) {
      console.error('PDF export error', e);
      alert('فشل تصدير PDF — تأكد أن html2pdf محمّلة.');
    }
  }

  function exportExcel() {
    if (!exportExcelBtn) return;
    try {
      const trial = loadSession();
      if (!trial || trial.length === 0) { alert('لا توجد بيانات للتصدير'); return; }
      const wb = XLSX.utils.book_new();

      // ورقة ميزان المراجعة
      const tb = (trial.map && trial.map(r => ({
        الحساب: r.account || r['الحساب'] || '',
        رمز: r.code || '',
        مدين: r.debit || r.Debit || r.amount || 0,
        دائن: r.credit || r.Credit || 0,
        النوع: r.type || ''
      })));
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(tb), 'ميزان المراجعة');

      // ورقة قائمة الدخل
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

      // ورقة الميزانية
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
      alert('فشل تصدير Excel — تأكد أن SheetJS محمّل.');
    }
  }

  // مساعدات DOM-safe لربط الأحداث إن وُجدت العناصر
  if (darkToggle) {
    darkToggle.checked = state.darkMode;
    darkToggle.addEventListener('change', (e) => {
      document.body.classList.toggle('dark-mode', e.target.checked);
      localStorage.setItem('darkMode', e.target.checked ? 'true' : 'false');
    });
    // apply initial state
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

  // init render
  render();
});
