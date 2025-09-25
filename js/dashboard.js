// js/dashboard.js - نسخة محسّنة
document.addEventListener('DOMContentLoaded', () => {
  // عناصر DOM
  const noData = document.getElementById('noData');
  const content = document.getElementById('dashboardContent');
  const refreshBtn = document.getElementById('refreshBtn');
  const netProfitEl = document.getElementById('netProfit');
  const roaEl = document.getElementById('roa');
  const roeEl = document.getElementById('roe');
  const evaEl = document.getElementById('eva');
  const revExpCtx = document.getElementById('revExpChart');
  const ratiosCtx = document.getElementById('ratiosChart');
  const darkToggle = document.getElementById('darkModeToggle');
  const currencySelect = document.getElementById('currencySelect');
  const languageSelect = document.getElementById('languageSelect');
  const exportPdfBtn = document.getElementById('exportPdfBtn');
  const exportExcelBtn = document.getElementById('exportExcelBtn');

  // charts
  let revExpChart = null, ratiosChart = null;

  // التهيئة من localStorage أو الافتراضات
  const storedCurrency = localStorage.getItem('fa_currency') || localStorage.getItem('currency') || 'EGP';
  let currentCurrency = storedCurrency;
  const storedLang = localStorage.getItem('fa_lang') || localStorage.getItem('lang') || 'ar';
  let currentLang = storedLang;
  const storedTheme = localStorage.getItem('fa_theme') || localStorage.getItem('darkMode') || 'light';
  if (storedTheme === 'dark' || storedTheme === 'true') document.body.classList.add('dark-mode');

  // set UI initial values (if present)
  if (currencySelect) { currencySelect.value = currentCurrency; }
  if (languageSelect) { languageSelect.value = currentLang; }
  if (darkToggle) { darkToggle.checked = document.body.classList.contains('dark-mode'); }

  // ترجمة بسيطة للصفحة (العناصر التي لها data-i18n)
  const I18N = {
    ar: {
      app_title: "المحلل المالي",
      toggle_dark: "الوضع الليلي",
      export_pdf: "تصدير PDF",
      export_excel: "تصدير Excel",
      refresh: "تحديث",
      no_data: "لا توجد بيانات — ارفع ميزان المراجعة في صفحة الإدخال أولاً.",
      net_profit: "صافي الربح",
      net_profit_desc: "الفرق بين الإيرادات والمصروفات",
      roa: "العائد على الأصول (ROA)",
      roa_desc: "نسبة ربحية الأصول",
      roe: "العائد على حقوق الملكية (ROE)",
      roe_desc: "نسبة ربحية الملاك",
      eva: "EVA (قيمة اقتصادية مضافة)",
      eva_desc: "قياس القيمة المضافة بعد تكلفة رأس المال",
      rev_exp_chart: "تطور الإيرادات والمصروفات",
      ratios_chart: "ملف النسب",
      detailed_statements: "قوائم مالية تفصيلية",
      income_statement: "قائمة الدخل",
      balance_sheet: "الميزانية العمومية"
    },
    en: {
      app_title: "Financial Analyzer",
      toggle_dark: "Dark Mode",
      export_pdf: "Export PDF",
      export_excel: "Export Excel",
      refresh: "Refresh",
      no_data: "No data — upload a trial balance on Input page first.",
      net_profit: "Net Profit",
      net_profit_desc: "Difference between revenues and expenses",
      roa: "Return on Assets (ROA)",
      roa_desc: "Profitability of assets",
      roe: "Return on Equity (ROE)",
      roe_desc: "Profitability of owners",
      eva: "EVA (Economic Value Added)",
      eva_desc: "Value added after cost of capital",
      rev_exp_chart: "Revenue vs Expenses",
      ratios_chart: "Ratios Overview",
      detailed_statements: "Detailed Financial Statements",
      income_statement: "Income Statement",
      balance_sheet: "Balance Sheet"
    }
  };

  function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (I18N[lang] && I18N[lang][key]) el.textContent = I18N[lang][key];
    });
  }

  // apply initial language
  applyTranslations(currentLang);

  // helper: format currency according to selected currency and locale
  function fmtCurrency(value) {
    const locale = currentLang === 'ar' ? 'ar-EG' : 'en-US';
    const currency = currentCurrency || 'EGP';
    if (value === null || value === undefined || Number.isNaN(Number(value))) return '-';
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(Number(value));
  }

  // load session (try multiple keys for backward compatibility)
  function loadSession() {
    try {
      let raw = localStorage.getItem('fa_session_v1');
      if (!raw) raw = localStorage.getItem('trialSession');
      if (!raw) raw = localStorage.getItem('financialSession');
      if (!raw) return [];
      const obj = JSON.parse(raw);
      // stored as object {trial: [...] } or plain array
      if (obj && Array.isArray(obj.trial)) return obj.trial;
      if (Array.isArray(obj)) return obj;
      return [];
    } catch (e) {
      console.error('loadSession error', e);
      return [];
    }
  }

  // If available use main.js detailed generators (preferred)
  const hasDetailedIncome = typeof window.generateIncomeStatementDetailed === 'function';
  const hasDetailedBalance = typeof window.generateBalanceSheetDetailed === 'function';
  const hasTrialBalanceGen = typeof window.generateTrialBalanceDetailed === 'function';
  const hasExportAll = typeof window.exportAllToExcel === 'function';
  const hasExportPdf = typeof window.exportReportToPdf === 'function';

  // fallback simple generators (if detailed not present)
  function simpleGenerateIncome(trial) {
    // expect trial rows {account, code, debit, credit, type?}
    let sales = 0, expenses = 0;
    for (const r of trial) {
      const name = (r.account || '').toString().toLowerCase();
      // heuristics
      if (/مبيعات|إيراد|revenue|sales/i.test(name) || (r.type === 'revenue')) {
        sales += (Number(r.credit || 0) - Number(r.debit || 0));
      } else if (/مصاريف|مصروف|expense|expenses|رواتب|أجور/i.test(name) || (r.type === 'expense')) {
        expenses += (Number(r.debit || 0) - Number(r.credit || 0));
      } else {
        // classify by sign
        if ((Number(r.credit || 0)) > (Number(r.debit || 0))) sales += (Number(r.credit || 0) - Number(r.debit || 0));
        else expenses += (Number(r.debit || 0) - Number(r.credit || 0));
      }
    }
    const net = sales - expenses;
    const rows = [];
    rows.push({ بند: 'إجمالي الإيرادات', قيمة: sales });
    rows.push({ بند: 'إجمالي المصروفات', قيمة: expenses });
    rows.push({ بند: 'صافي الربح', قيمة: net });
    return rows;
  }

  function simpleGenerateBalance(trial) {
    let assets = 0, liabilities = 0, equity = 0;
    for (const r of trial) {
      const d = Number(r.debit || 0), c = Number(r.credit || 0);
      if (d > c) assets += (d - c);
      else liabilities += (c - d);
    }
    // equity = assets - liabilities (rough)
    equity = Math.max(0, assets - liabilities);
    return [
      { بند: 'الأصول', قيمة: assets },
      { بند: 'الخصوم', قيمة: liabilities },
      { بند: 'حقوق الملكية', قيمة: equity }
    ];
  }

  // compute key ratios (use detailed functions if possible)
  function computeRatiosFromSession(trial) {
    let incRows = null, bsRows = null;
    if (hasDetailedIncome) {
      // detailed generator returns object with fields; try to coerce to rows
      try {
        const detail = window.generateIncomeStatementDetailed(trial);
        // if returns object with properties like sales, cogs... convert to rows
        if (detail && typeof detail === 'object' && !Array.isArray(detail)) {
          const rows = [];
          for (const k of Object.keys(detail)) {
            rows.push({ بند: k, قيمة: detail[k] });
          }
          incRows = rows;
        } else incRows = detail;
      } catch (e) { console.warn('detailed income failed', e); incRows = null; }
    }
    if (!incRows) incRows = simpleGenerateIncome(trial);

    if (hasDetailedBalance) {
      try {
        const b = window.generateBalanceSheetDetailed(trial);
        // b is object with numeric fields: convert to rows
        if (b && typeof b === 'object' && !Array.isArray(b)) {
          const rows = [];
          for (const k of Object.keys(b)) rows.push({ بند: k, قيمة: b[k] });
          bsRows = rows;
        } else bsRows = b;
      } catch (e) { console.warn('detailed balance failed', e); bsRows = null; }
    }
    if (!bsRows) bsRows = simpleGenerateBalance(trial);

    // obtain totals
    const revenue = (incRows.find(r => /إجمالي الإيرادات|Total Revenue|المبيعات/i.test(r.بند)) || incRows[0])?.قيمة || 0;
    const expenses = (incRows.find(r => /إجمالي المصروفات|Total Expense/i.test(r.بند)) || incRows[1])?.قيمة || 0;
    const net = (incRows.find(r => /صافي الربح|Net Profit/i.test(r.بند)) || { قيمة: revenue - expenses }).قيمة;

    const assetsRow = bsRows.find(r => /الأصول|Total Assets|assets/i.test(r.بند)) || bsRows[0];
    const liabilitiesRow = bsRows.find(r => /الخصوم|Total Liabilities|liabilities/i.test(r.بند)) || bsRows.find(r => /الخصوم|liabilities/i.test(r.بند)) || { قيمة: 0 };
    const equityRow = bsRows.find(r => /حقوق الملكية|Equity/i.test(r.بند)) || bsRows.find(r => /equity/i.test(r.بند)) || { قيمة: Math.max(0, (assetsRow?.قيمة || 0) - (liabilitiesRow?.قيمة || 0)) };

    const assets = Number(assetsRow.قيمة || 0);
    const liabilities = Number(liabilitiesRow.قيمة || 0);
    const equity = Number(equityRow.قيمة || 0);

    const roa = assets ? ((net / assets) * 100) : null;
    const roe = equity ? ((net / equity) * 100) : null;
    // EVA approximate: net - (cost_of_capital * equity), cost_of_capital default 10%
    const wacc = 0.10;
    const eva = net - (wacc * equity);

    return { incRows, bsRows, revenue, expenses, net, assets, liabilities, equity, roa, roe, eva };
  }

  // render functions
  function renderTables(trial) {
    // income & balance
    const computed = computeRatiosFromSession(trial);
    const incRows = computed.incRows || [];
    const bsRows = computed.bsRows || [];

    // render income
    const incHtml = `<table class="table table-sm"><tbody>${incRows.map(r => `<tr><td>${escapeHtml(String(r.بند))}</td><td style="text-align:left">${fmtCurrency(r.قيمة)}</td></tr>`).join('')}</tbody></table>`;
    const bsHtml = `<table class="table table-sm"><tbody>${bsRows.map(r => `<tr><td>${escapeHtml(String(r.بند))}</td><td style="text-align:left">${fmtCurrency(r.قيمة)}</td></tr>`).join('')}</tbody></table>`;

    const incomeDiv = document.getElementById('incomeStatement');
    const balanceDiv = document.getElementById('balanceSheet');
    if (incomeDiv) incomeDiv.innerHTML = incHtml;
    if (balanceDiv) balanceDiv.innerHTML = bsHtml;

    // KPIs
    netProfitEl.innerText = fmtCurrency(computed.net);
    roaEl.innerText = computed.roa !== null ? (Number(computed.roa).toFixed(2) + ' %') : '-';
    roeEl.innerText = computed.roe !== null ? (Number(computed.roe).toFixed(2) + ' %') : '-';
    evaEl.innerText = fmtCurrency(computed.eva);

    // charts
    updateCharts(computed.revenue, computed.expenses, computed);
  }

  function updateCharts(revenue, expense, computed) {
    // revenue/expense pie
    if (revExpChart) revExpChart.destroy();
    const revExpData = [Number(revenue || 0), Number(expense || 0)];
    revExpChart = new Chart(revExpCtx, {
      type: 'doughnut',
      data: {
        labels: [ currentLang === 'ar' ? 'إيرادات' : 'Revenue', currentLang === 'ar' ? 'مصروفات' : 'Expenses' ],
        datasets: [{ data: revExpData }]
      },
      options: { responsive:true, plugins:{legend:{position:'bottom'}} }
    });

    // ratios bar (ROA, ROE, EVA as numeric-ish)
    if (ratiosChart) ratiosChart.destroy();
    const roaVal = computed.roa || 0;
    const roeVal = computed.roe || 0;
    const evaVal = Number(computed.eva || 0);
    ratiosChart = new Chart(ratiosCtx, {
      type: 'bar',
      data: {
        labels: [ 'ROA', 'ROE', 'EVA' ],
        datasets: [{ label: currentLang === 'ar' ? 'النسب' : 'Ratios', data: [roaVal, roeVal, evaVal], backgroundColor: ['#0d6efd','#ffc107','#198754'] }]
      },
      options: { responsive:true, scales:{ y:{ beginAtZero:true }}, plugins:{legend:{display:false}} }
    });
  }

  // main render
  function render() {
    const trial = loadSession();
    if (!trial || !trial.length) {
      noData.style.display = 'block';
      content.style.display = 'none';
      return;
    }
    noData.style.display = 'none';
    content.style.display = 'block';
    // render using available generators
    try {
      // if detailed generators exist and return arrays/objects convert accordingly
      if (hasTrialBalanceGen) {
        // nothing extra needed here, computeTables will call detailed if available
      }
      renderTables(trial);
    } catch (e) {
      console.error('render error', e);
      // fallback
      const simpleInc = simpleGenerateIncome(trial);
      const simpleBs = simpleGenerateBalance(trial);
      document.getElementById('incomeStatement').innerHTML = `<pre>${JSON.stringify(simpleInc, null, 2)}</pre>`;
      document.getElementById('balanceSheet').innerHTML = `<pre>${JSON.stringify(simpleBs, null, 2)}</pre>`;
    }
  }

  // Utilities
  function escapeHtml(s) {
    if (s === null || s === undefined) return '';
    return String(s).replace(/[&<>"'`=\/]/g, function (c) {
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  // Event handlers for settings
  if (darkToggle) {
    darkToggle.addEventListener('change', (e) => {
      document.body.classList.toggle('dark-mode', e.target.checked);
      localStorage.setItem('fa_theme', e.target.checked ? 'dark' : 'light');
    });
  }

  if (currencySelect) {
    currencySelect.addEventListener('change', (e) => {
      currentCurrency = e.target.value;
      localStorage.setItem('fa_currency', currentCurrency);
      render();
    });
  }

  if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
      currentLang = e.target.value;
      localStorage.setItem('fa_lang', currentLang);
      applyTranslations(currentLang);
      render();
    });
  }

  if (refreshBtn) refreshBtn.addEventListener('click', render);

  // Export PDF: prefer global exportReportToPdf if available (sets good options), else fallback
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', () => {
      // wrap only reportArea for printable content
      const reportEl = document.getElementById('reportArea') || document.body;
      if (hasExportPdf) {
        // main.js exportReportToPdf expects an id
        try {
          window.exportReportToPdf('reportArea', 'financial-report.pdf');
          return;
        } catch (e) { console.warn('exportReportToPdf failed, fallback to html2pdf', e); }
      }
      html2pdf().set({
        margin: 10,
        filename: 'financial-report.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).from(reportEl).save();
    });
  }

  // Export Excel: prefer exportAllToExcel if available (it creates multiple sheets + logo support)
  if (exportExcelBtn) {
    exportExcelBtn.addEventListener('click', () => {
      const trial = loadSession();
      if (!trial || !trial.length) { alert(currentLang === 'ar' ? 'لا توجد بيانات للتصدير' : 'No data to export'); return; }
      if (hasExportAll) {
        try { window.exportAllToExcel(); return; } catch (e) { console.warn('exportAllToExcel failed', e); }
      }
      // fallback: simple workbook with sheets
      const wb = XLSX.utils.book_new();
      try {
        const tb = (Array.isArray(trial) ? trial : []).map(r => ({ حساب: r.account || r.بند || '', نوع: r.type || '', مدين: r.debit || 0, دائن: r.credit || 0 }));
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(tb), 'ميزان المراجعة');
        const incRows = computeRatiosFromSession(trial).incRows || [];
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(incRows), 'قائمة الدخل');
        const bsRows = computeRatiosFromSession(trial).bsRows || [];
        XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(bsRows), 'الميزانية');
        XLSX.writeFile(wb, 'financial-export.xlsx');
      } catch (e) {
        console.error('excel export error', e);
        alert(currentLang === 'ar' ? 'حدث خطأ أثناء تصدير Excel' : 'Error exporting Excel');
      }
    });
  }

  // initial render
  render();
});
