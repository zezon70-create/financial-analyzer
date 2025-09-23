// scripts/report.js
// Report page controller
// - يجلب البيانات من localStorage (مع fallbacks)
// - يحسب قوائم مبسطة ونسب مالية
// - يرسم charts (Chart.js)
// - يدعم التصدير: PDF (html2canvas+jsPDF) و XLSX (SheetJS) و CSV
// - يدعم اللغة (fa:lang) و الثيم (fa:theme) و العملة (fa:currency)

// ---------------------- إعداد الحالة والترجمات ----------------------
const state = {
  lang: localStorage.getItem('fa:lang') || 'ar',
  theme: localStorage.getItem('fa:theme') || 'light',
  currency: localStorage.getItem('fa:currency') || 'EGP',
  rates: JSON.parse(localStorage.getItem('fa:rates') || '{"EGP":1,"USD":30.90,"EUR":33.50}')
};

const i18n = {
  ar: {
    report_title: 'التقارير المالية',
    report_name: 'تقرير التحليل المالي',
    export_pdf: 'تصدير PDF',
    back_dashboard: 'العودة للوحة التحكم',
    net_profit: 'صافي الربح',
    gross_margin: 'الهامش الإجمالي',
    net_margin: 'نسبة صافي الربح',
    roa: 'العائد على الأصول (ROA)',
    roe: 'العائد على حقوق الملكية (ROE)',
    current_ratio: 'النسبة الحالية (Current Ratio)',
    income_statement: 'قائمة الدخل (مبسطة)',
    balance_sheet: 'الميزانية العمومية (مبسطة)',
    ratios_table: 'جداول ونسب مالية',
    rev_exp_trend: 'تطور الإيرادات والمصروفات',
    structure: 'بنية الميزانية',
    ratio: 'النسبة',
    value: 'القيمة',
    explanation: 'تفسير / ملاحظة',
    no_data: 'لا توجد بيانات — اذهب لصفحة الإدخال.',
    date: 'التاريخ'
  },
  en: {
    report_title: 'Financial Reports',
    report_name: 'Financial Analysis Report',
    export_pdf: 'Export PDF',
    back_dashboard: 'Back to Dashboard',
    net_profit: 'Net Profit',
    gross_margin: 'Gross Margin',
    net_margin: 'Net Margin',
    roa: 'Return on Assets (ROA)',
    roe: 'Return on Equity (ROE)',
    current_ratio: 'Current Ratio',
    income_statement: 'Income Statement (Simplified)',
    balance_sheet: 'Balance Sheet (Simplified)',
    ratios_table: 'Ratios & Tables',
    rev_exp_trend: 'Revenue / Expense Trend',
    structure: 'Balance Structure',
    ratio: 'Ratio',
    value: 'Value',
    explanation: 'Explanation / Note',
    no_data: 'No input data — go to Input page.',
    date: 'Date'
  }
};

// ---------------------- Helpers: format ----------------------
function fmtNumber(n) {
  if (n === null || n === undefined || isNaN(n)) return '-';
  const locale = state.lang === 'ar' ? 'ar-EG' : 'en-US';
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(Number(n));
}
function fmtCurrency(n) {
  if (n === null || n === undefined || isNaN(n)) return '-';
  // convert using rates stored (assume stored amounts are in EGP baseline)
  const target = state.currency || 'EGP';
  const rate = Number(state.rates[target] || 1);
  // Prevent divide-by-zero
  const converted = (Number(n) / (Number(state.rates['EGP'] || 1))) * (Number(state.rates['EGP'] || 1) / rate);
  const symbol = (target === 'USD') ? '$' : (target === 'EUR' ? '€' : 'ج.م');
  return `${fmtNumber(converted)} ${symbol}`;
}

// ---------------------- Load Raw Data (fallback keys) ----------------------
function loadRaw() {
  const keys = ['financialData','fa:data:v1','fa:data','fa_sessions_data'];
  for (let k of keys) {
    const r = localStorage.getItem(k);
    if (!r) continue;
    try {
      return JSON.parse(r);
    } catch (e) {
      console.warn('parse fail for', k);
    }
  }
  return null;
}

// ---------------------- Normalize (same heuristics as dashboard) ----------------------
function normalize(input) {
  if (!input) return { revenues:0, expenses:0, assets:0, liabilities:0, equity:0, history:[] };

  // if object with fields
  if (typeof input === 'object' && !Array.isArray(input)) {
    const res = {
      revenues: Number(input.revenues ?? input.Revenues ?? input.sales ?? input.sales_total ?? 0) || 0,
      expenses: Number(input.expenses ?? input.Expenses ?? input.costs ?? input.total_expenses ?? 0) || 0,
      assets: Number(input.assets ?? input.Assets ?? 0) || 0,
      liabilities: Number(input.liabilities ?? input.liability ?? input.liabilities_total ?? 0) || 0,
      equity: Number(input.equity ?? input.Equity ?? 0) || 0,
      history: Array.isArray(input.history) ? input.history : []
    };
    // rows field
    if (Array.isArray(input.rows) || Array.isArray(input.trial) || Array.isArray(input.trialRows)) {
      const rows = input.rows ?? input.trial ?? input.trialRows;
      const agg = aggregateRows(rows);
      return { ...res, ...agg, history: (res.history.length ? res.history : (agg.history||[])) };
    }
    return res;
  }

  if (Array.isArray(input)) {
    return aggregateRows(input);
  }

  return { revenues:0, expenses:0, assets:0, liabilities:0, equity:0, history:[] };
}

function aggregateRows(rows) {
  const r = { revenues:0, expenses:0, assets:0, liabilities:0, equity:0, history:[] };
  if (!rows || !rows.length) return r;

  const revKeys = ['sale','revenue','مبيعات','إيراد','إيرادات','income'];
  const expKeys = ['expense','cost','مصروف','مصاريف','تكلفة'];
  const assetKeys = ['asset','أصول','موجودات','اصول'];
  const liabKeys = ['liabil','خصوم','قرض','قروض','التزامات'];
  const eqKeys = ['equity','حقوق','رأس المال','capital'];

  rows.forEach(row => {
    const acc = (row.account || row.Account || row.AccountName || row['الحساب'] || '').toString().toLowerCase();
    const debit = Number(row.debit ?? row.Debit ?? row.Dr ?? row['مدين'] ?? 0) || 0;
    const credit = Number(row.credit ?? row.Credit ?? row.Cr ?? row['دائن'] ?? 0) || 0;

    if (revKeys.some(k=>acc.includes(k))) r.revenues += credit || debit;
    else if (expKeys.some(k=>acc.includes(k))) r.expenses += debit || credit;
    else if (assetKeys.some(k=>acc.includes(k))) r.assets += debit || credit;
    else if (liabKeys.some(k=>acc.includes(k))) r.liabilities += credit || debit;
    else if (eqKeys.some(k=>acc.includes(k))) r.equity += credit || debit;
    else {
      if (credit>0) r.revenues += credit;
      if (debit>0) r.expenses += debit;
    }
  });

  r.profit = r.revenues - r.expenses;
  return r;
}

// ---------------------- Compute ratios ----------------------
function computeRatios(data) {
  const profit = (data.revenues || 0) - (data.expenses || 0);
  const grossMargin = data.revenues ? ((data.revenues - data.expenses) / data.revenues) * 100 : 0;
  const netMargin = data.revenues ? (profit / data.revenues) * 100 : 0;
  const roa = data.assets ? (profit / data.assets) * 100 : 0;
  const roe = data.equity ? (profit / data.equity) * 100 : 0;
  // current ratio: current assets / current liabilities (we don't have separate current assets, use assets/liabilities)
  const currentRatio = data.liabilities ? (data.assets / data.liabilities) : 0;

  return {
    profit,
    grossMargin,
    netMargin,
    roa,
    roe,
    currentRatio
  };
}

// ---------------------- Render functions ----------------------
function renderKpis(norm) {
  document.getElementById('kpiProfit').textContent = fmtCurrency(norm.revenues - norm.expenses);
  document.getElementById('kpiGrossMargin').textContent = (computeRatios(norm).grossMargin ? computeRatios(norm).grossMargin.toFixed(2)+' %' : '-');
  document.getElementById('kpiNetMargin').textContent = (computeRatios(norm).netMargin ? computeRatios(norm).netMargin.toFixed(2)+' %' : '-');
  document.getElementById('kpiROA').textContent = (computeRatios(norm).roa ? computeRatios(norm).roa.toFixed(2)+' %' : '-');
  document.getElementById('kpiROE').textContent = (computeRatios(norm).roe ? computeRatios(norm).roe.toFixed(2)+' %' : '-');
  document.getElementById('kpiCurrentRatio').textContent = (computeRatios(norm).currentRatio ? computeRatios(norm).currentRatio.toFixed(2) : '-');
}

function renderStatements(norm) {
  const inc = document.getElementById('incomeStatement');
  const bal = document.getElementById('balanceSheet');
  const profit = norm.revenues - norm.expenses;

  if (inc) {
    inc.innerHTML = `
      <p>${i18n[state.lang].revenues || 'Revenues'}: <strong>${fmtCurrency(norm.revenues)}</strong></p>
      <p>${i18n[state.lang].expenses || 'Expenses'}: <strong>${fmtCurrency(norm.expenses)}</strong></p>
      <p>${i18n[state.lang].net_profit || 'Net Profit'}: <strong>${fmtCurrency(profit)}</strong></p>
    `;
  }

  if (bal) {
    bal.innerHTML = `
      <p>${i18n[state.lang].assets || 'Assets'}: <strong>${fmtCurrency(norm.assets)}</strong></p>
      <p>${i18n[state.lang].liabilities || 'Liabilities'}: <strong>${fmtCurrency(norm.liabilities)}</strong></p>
      <p>${i18n[state.lang].equity || 'Equity'}: <strong>${fmtCurrency(norm.equity)}</strong></p>
    `;
  }
}

function renderRatiosTable(norm) {
  const tbody = document.querySelector('#ratiosTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  const ratios = computeRatios(norm);

  const rows = [
    { name: i18n[state.lang].net_profit, value: fmtCurrency(ratios.profit), note: '' },
    { name: i18n[state.lang].gross_margin, value: ratios.grossMargin ? ratios.grossMargin.toFixed(2)+' %' : '-', note: (state.lang==='ar' ? 'كلما زاد أفضل' : 'Higher is better') },
    { name: i18n[state.lang].net_margin, value: ratios.netMargin ? ratios.netMargin.toFixed(2)+' %' : '-', note: (state.lang==='ar' ? 'كفاءة ربحية بعد المصروفات' : 'Profitability after expenses') },
    { name: i18n[state.lang].roa, value: ratios.roa ? ratios.roa.toFixed(2)+' %' : '-', note: (state.lang==='ar' ? 'نسبة ربحية الأصول' : 'Profitability of assets') },
    { name: i18n[state.lang].roe, value: ratios.roe ? ratios.roe.toFixed(2)+' %' : '-', note: (state.lang==='ar' ? 'نسبة ربحية الملاك' : 'Profitability for owners') },
    { name: i18n[state.lang].current_ratio, value: ratios.currentRatio ? ratios.currentRatio.toFixed(2) : '-', note: (state.lang==='ar' ? 'نسبة تغطية الخصوم بالأصول' : 'Coverage of liabilities by assets') }
  ];

  rows.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.name}</td><td>${r.value}</td><td>${r.note}</td>`;
    tbody.appendChild(tr);
  });
}

// ---------------------- Charts ----------------------
let trendChart = null;
let structureChart = null;

function renderCharts(norm) {
  // trendChart (revenue vs expense over history if exists)
  const ctxT = document.getElementById('trendChart');
  const history = (norm.history && norm.history.length) ? norm.history : [
    { label: 'Now', revenues: norm.revenues, expenses: norm.expenses }
  ];

  const labels = history.map(h => h.month || h.label || (h.date || '').toString());
  const revs = history.map(h => Number(h.revenues || h.rev || 0));
  const exps = history.map(h => Number(h.expenses || h.exp || 0));

  if (trendChart) try { trendChart.destroy(); } catch(e){}
  trendChart = new Chart(ctxT, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: i18n[state.lang].revenues, data: revs.map(v=>convertForChart(v)), borderColor: '#0d6efd', tension:0.3, fill:true, backgroundColor:'rgba(13,110,253,0.08)' },
        { label: i18n[state.lang].expenses, data: exps.map(v=>convertForChart(v)), borderColor: '#dc3545', tension:0.3, fill:true, backgroundColor:'rgba(220,53,69,0.06)' }
      ]
    },
    options: { responsive:true, plugins:{ legend:{ position:'top' } } }
  });

  // structure chart (pie)
  const ctxS = document.getElementById('structureChart');
  if (structureChart) try { structureChart.destroy(); } catch(e){}
  structureChart = new Chart(ctxS, {
    type:'doughnut',
    data: {
      labels: [i18n[state.lang].assets, i18n[state.lang].liabilities, i18n[state.lang].equity],
      datasets: [{
        data: [convertForChart(norm.assets), convertForChart(norm.liabilities), convertForChart(norm.equity)],
        backgroundColor: ['#ffc107','#6c757d','#198754']
      }]
    },
    options: { responsive:true, plugins:{ legend:{ position:'bottom' } } }
  });
}

function convertForChart(amount) {
  // تحويل بسيط بحسب rates الموجودة (مثل dashboard)
  const target = state.currency || 'EGP';
  const rate = Number(state.rates[target] || 1);
  const converted = (Number(amount) / (Number(state.rates['EGP'] || 1))) * (Number(state.rates['EGP'] || 1) / rate);
  return Number(converted || 0);
}

// ---------------------- Exporters ----------------------
async function exportAsPdf() {
  // حمّل المكتبات إذا لم تكن موجودة
  if (typeof html2canvas === 'undefined') {
    await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
  }
  if (typeof window.jspdf === 'undefined') {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
  }

  const el = document.querySelector('main');
  if (!el) return alert(state.lang === 'ar' ? 'لا يوجد محتوى للتصدير' : 'Nothing to export');

  const canvas = await html2canvas(el, { scale: 2, useCORS: true });
  const img = canvas.toDataURL('image/jpeg', 0.95);

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const imgProps = pdf.getImageProperties(img);
  const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;

  pdf.addImage(img, 'JPEG', 0, 0, pageWidth, pdfHeight);
  pdf.save(`financial-report-${(new Date()).toISOString().slice(0,10)}.pdf`);
}

function exportAsXlsx() {
  const raw = loadRaw();
  const norm = normalize(raw && (raw.trial || raw.data || raw) ? (raw.trial || raw.data || raw) : raw);

  // إذا كانت SheetJS متاحة
  if (typeof XLSX !== 'undefined') {
    const wb = XLSX.utils.book_new();
    const sheetData = [
      [i18n[state.lang].report_name, (new Date()).toLocaleString()],
      [],
      [i18n[state.lang].revenues, norm.revenues],
      [i18n[state.lang].expenses, norm.expenses],
      [i18n[state.lang].net_profit || 'Net Profit', norm.revenues - norm.expenses],
      [],
      [i18n[state.lang].assets, norm.assets],
      [i18n[state.lang].liabilities, norm.liabilities],
      [i18n[state.lang].equity, norm.equity]
    ];
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(wb, ws, 'Summary');
    XLSX.writeFile(wb, `financial-report-${(new Date()).toISOString().slice(0,10)}.xlsx`);
    return;
  }

  // fallback: CSV
  exportAsCsv();
}

function exportAsCsv() {
  const raw = loadRaw();
  const norm = normalize(raw && (raw.trial || raw.data || raw) ? (raw.trial || raw.data || raw) : raw);

  const lines = [];
  lines.push([i18n[state.lang].report_name, (new Date()).toLocaleString()].join(','));
  lines.push('');
  lines.push([i18n[state.lang].revenues, norm.revenues].join(','));
  lines.push([i18n[state.lang].expenses, norm.expenses].join(','));
  lines.push([i18n[state.lang].net_profit || 'Net Profit', norm.revenues - norm.expenses].join(','));
  lines.push('');
  lines.push([i18n[state.lang].assets, norm.assets].join(','));
  lines.push([i18n[state.lang].liabilities, norm.liabilities].join(','));
  lines.push([i18n[state.lang].equity, norm.equity].join(','));

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `financial-report-${(new Date()).toISOString().slice(0,10)}.csv`;
  a.click();
}

// ---------------------- Utility: load external script ----------------------
function loadScript(url) {
  return new Promise((resolve,reject) => {
    const s = document.createElement('script');
    s.src = url;
    s.onload = () => resolve();
    s.onerror = (e) => reject(e);
    document.head.appendChild(s);
  });
}

// ---------------------- UI: wire controls ----------------------
document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const langSel = document.getElementById('languageSelect');
  const currencySel = document.getElementById('currencySelect');
  const themeBtn = document.getElementById('toggleThemeBtn');
  const exportPdfBtn = document.getElementById('exportPdfBtn');
  const exportXlsxBtn = document.getElementById('exportXlsxBtn');
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const reportDateEl = document.getElementById('reportDate');

  // apply saved prefs
  if (langSel) langSel.value = state.lang;
  if (currencySel) currencySel.value = state.currency;
  if (state.theme === 'dark') document.body.classList.add('dark-mode');

  // translations (data-i18n)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[state.lang][key]) el.textContent = i18n[state.lang][key];
  });

  // report date
  if (reportDateEl) reportDateEl.textContent = `${i18n[state.lang].date || 'Date'}: ${(new Date()).toLocaleString()}`;

  // load & normalize data
  const raw = loadRaw();
  const rawCandidate = raw && (raw.trial || raw.data || raw) ? (raw.trial || raw.data || raw) : raw;
  const norm = normalize(rawCandidate);

  // if nothing: show message
  if (!norm || (norm.revenues===0 && norm.expenses===0 && norm.assets===0 && norm.liabilities===0 && norm.equity===0)) {
    // show a notice card
    const main = document.querySelector('main');
    if (main) {
      const warn = document.createElement('div');
      warn.className = 'card';
      warn.style.background = '#fff3cd';
      warn.style.border = '1px solid #ffeeba';
      warn.textContent = i18n[state.lang].no_data;
      main.prepend(warn);
    }
  }

  // render content
  renderKpisAndTables(norm);

  // bind controls
  if (langSel) {
    langSel.addEventListener('change', (e) => {
      state.lang = e.target.value;
      localStorage.setItem('fa:lang', state.lang);
      // reload translations & UI
      location.reload();
    });
  }

  if (currencySel) {
    currencySel.addEventListener('change', (e) => {
      state.currency = e.target.value;
      localStorage.setItem('fa:currency', state.currency);
      // re-render currency displays
      renderKpisAndTables(norm);
    });
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      state.theme = (state.theme === 'dark') ? 'light' : 'dark';
      localStorage.setItem('fa:theme', state.theme);
      document.body.classList.toggle('dark-mode');
    });
  }

  if (exportPdfBtn) exportPdfBtn.addEventListener('click', exportAsPdf);
  if (exportXlsxBtn) exportXlsxBtn.addEventListener('click', exportAsXlsx);
  if (exportCsvBtn) exportCsvBtn.addEventListener('click', exportAsCsv);
});

// helper to render both KPIs/tables/charts
function renderKpisAndTables(norm) {
  renderKpis(norm);
  renderStatements(norm);
  renderRatiosTable(norm);
  renderCharts(norm);

  // update amounts (elements with class 'amount' will be rewritten)
  document.querySelectorAll('.amount').forEach(el => {
    const rawVal = Number(el.dataset.value || 0);
    el.textContent = fmtCurrency(rawVal);
  });
}
