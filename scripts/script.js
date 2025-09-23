// script.js
// Dashboard controller: reading data, KPIs, Charts, Theme, Language, Currency
// التعليقات بالعربي لسهولة الفهم

/* ==========================
   إعداد الحالة الافتراضية
   ========================== */
const state = {
  lang: localStorage.getItem('fa:lang') || 'ar',          // 'ar' or 'en'
  theme: localStorage.getItem('fa:theme') || 'light',    // 'light' or 'dark'
  currency: localStorage.getItem('fa:currency') || 'EGP',// 'EGP'|'USD'|'EUR'
  rates: JSON.parse(localStorage.getItem('fa:rates')) || { EGP: 1, USD: 30.90, EUR: 33.50 }, // قيم افتراضية
  chart: null
};

/* ==========================
   ترجمات بسيطة (i18n)
   ========================== */
const i18n = {
  ar: {
    title: 'لوحة التحكم - المحلل المالي',
    overview: 'ملخص الأداء',
    analysis: 'التحليلات المالية',
    revenues: 'الإيرادات',
    expenses: 'المصروفات',
    profit: 'صافي الربح',
    assets: 'الأصول',
    liabilities: 'الخصوم',
    equity: 'حقوق الملكية',
    noData: 'لا توجد بيانات مدخلة — اذهب لصفحة الإدخال.',
    exportPdf: 'تصدير PDF',
    clearData: 'مسح البيانات'
  },
  en: {
    title: 'Dashboard - Financial Analyzer',
    overview: 'Performance Overview',
    analysis: 'Financial Analysis',
    revenues: 'Revenues',
    expenses: 'Expenses',
    profit: 'Net Profit',
    assets: 'Assets',
    liabilities: 'Liabilities',
    equity: 'Equity',
    noData: 'No input data found — please go to Input page.',
    exportPdf: 'Export PDF',
    clearData: 'Clear Data'
  }
};

/* ==========================
   Helpers: قراءة وكتابة الـ prefs
   ========================== */
function savePrefs() {
  localStorage.setItem('fa:lang', state.lang);
  localStorage.setItem('fa:theme', state.theme);
  localStorage.setItem('fa:currency', state.currency);
  localStorage.setItem('fa:rates', JSON.stringify(state.rates));
}

/* ==========================
   تنسيق الأرقام و العملة
   ========================== */
function formatNumber(n) {
  if (n === null || n === undefined || isNaN(n)) return '-';
  const locale = (state.lang === 'ar') ? 'ar-EG' : 'en-US';
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(Number(n));
}

function convertForDisplay(amount) {
  // افتراض: القيم مخزنة بوحدة افتراضية (EGP) أو مباشرة كأرقام
  // نحسب التحويل بعكس المعدلات المخزنة (مبسّط)
  const rateEGP = state.rates.EGP || 1;
  const targetRate = state.rates[state.currency] || rateEGP;
  // تحويل: amount_in_display_currency = amount_in_egp / targetRate * rateEGP
  // إذا كانت القيم أصلاً ليست بالـ EGP فهذا سيتطلب تعديل لاحق
  const converted = (Number(amount) / (rateEGP || 1)) * (rateEGP / (targetRate || 1));
  return converted;
}

function formatCurrency(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '-';
  const converted = convertForDisplay(amount);
  const symbol = state.currency === 'USD' ? '$' : state.currency === 'EUR' ? '€' : 'ج.م';
  return `${formatNumber(converted)} ${symbol}`;
}

/* ==========================
   قراءة البيانات من localStorage (مع fallbacks)
   - يدعم أشكال متعددة: كائن trial مباشر أو مصفوفة صفوف
   ========================== */
function loadRawData() {
  // حاول مفاتيح متعددة لتعويض الاختلافات بين النسخ القديمة
  const candidates = ['financialData', 'fa:data:v1', 'fa:data', 'fa_sessions_data'];
  for (let k of candidates) {
    const raw = localStorage.getItem(k);
    if (!raw) continue;
    try {
      const parsed = JSON.parse(raw);
      if (parsed) return parsed;
    } catch (e) {
      // لو بيانات نصية أو CSV مخزنة، نتجاهل
      console.warn('parse error for key', k, e);
    }
  }
  return null;
}

/* ==========================
   Normalize trial data:
   - يقبل object {revenues, expenses, assets, liabilities, equity, history?}
   - أو array rows [{account, debit, credit}, ...]
   يعيد كائن موحّد
   ========================== */
function normalizeTrial(input) {
  const defaultResult = { revenues: 0, expenses: 0, assets: 0, liabilities: 0, equity: 0, history: [] };

  if (!input) return defaultResult;

  // إذا كان input كائن ويحتوي الحقول المطلوبة
  if (typeof input === 'object' && !Array.isArray(input)) {
    // إذا فيه حقول مباشرة
    const r = {
      revenues: Number(input.revenues ?? input.Revenues ?? input.sales ?? input.sales_total ?? 0) || 0,
      expenses: Number(input.expenses ?? input.Expenses ?? input.costs ?? input.total_expenses ?? 0) || 0,
      assets: Number(input.assets ?? input.Assets ?? 0) || 0,
      liabilities: Number(input.liabilities ?? input.liability ?? input.liabilities_total ?? 0) || 0,
      equity: Number(input.equity ?? input.Equity ?? 0) || 0,
      history: Array.isArray(input.history) ? input.history : []
    };
    // إذا كان يحتوي على rows أو trialRows كمصفوفة
    if (Array.isArray(input.rows) || Array.isArray(input.trial) || Array.isArray(input.trialRows)) {
      const rows = input.rows ?? input.trial ?? input.trialRows;
      const agg = aggregateFromRows(rows);
      return { ...r, ...agg, history: r.history.length ? r.history : agg.history || [] };
    }
    return r;
  }

  // إذا كانت مصفوفة صفوف
  if (Array.isArray(input)) {
    return aggregateFromRows(input);
  }

  return defaultResult;
}

/* ==========================
   Aggregate from rows heuristic
   - يحاول التعرف على الإيرادات/المصروفات/أصول/خصوم من اسم الحساب أو من الدائن/المدين
   ========================== */
function aggregateFromRows(rows) {
  const result = { revenues: 0, expenses: 0, assets: 0, liabilities: 0, equity: 0, history: [] };
  if (!rows || !rows.length) return result;

  const revKeywords = ['sale', 'revenue', 'income', 'مبيعات', 'إيراد', 'إيرادات', 'sales'];
  const expKeywords = ['expense', 'cost', 'مصروف', 'مصاريف', 'تكلفة', 'expenses'];
  const assetKeywords = ['asset', 'أصول', 'موجودات', 'اصول', 'fixed asset'];
  const liabKeywords = ['liabil', 'خصوم', 'قرض', 'قروض', 'التزامات', 'debtor', 'liability'];
  const equityKeywords = ['equity', 'حقوق', 'رأس المال', 'capital'];

  rows.forEach(row => {
    const acc = (row.account || row.Account || row.AccountName || row['الحساب'] || '').toString().toLowerCase();
    const debit = Number(row.debit ?? row.Debit ?? row.Dr ?? row['مدين'] ?? 0) || 0;
    const credit = Number(row.credit ?? row.Credit ?? row.Cr ?? row['دائن'] ?? 0) || 0;

    // heuristics
    if (revKeywords.some(k => acc.includes(k))) {
      // غالباً الإيرادات تظهر كـ credit
      result.revenues += credit || debit;
    } else if (expKeywords.some(k => acc.includes(k))) {
      result.expenses += debit || credit;
    } else if (assetKeywords.some(k => acc.includes(k))) {
      result.assets += debit || credit;
    } else if (liabKeywords.some(k => acc.includes(k))) {
      result.liabilities += credit || debit;
    } else if (equityKeywords.some(k => acc.includes(k))) {
      result.equity += credit || debit;
    } else {
      // fallback: لو الدائن > 0 نعاملها كمبيعات، لو المدين >0 كمصروف
      if (credit > 0) result.revenues += credit;
      if (debit > 0) result.expenses += debit;
    }
  });

  result.profit = result.revenues - result.expenses;
  return result;
}

/* ==========================
   تحديث واجهة الـ Dashboard
   ========================== */
function updateDashboardUI(normalized) {
  // عناصر موجودة في dashboard.html (تأكد أنها بنفس IDs)
  const elRevenues = document.getElementById('revenues');
  const elExpenses = document.getElementById('expenses');
  const elProfit = document.getElementById('profit');
  const elAssets = document.getElementById('assets');
  const elLiabilities = document.getElementById('liabilities');
  const elEquity = document.getElementById('equity');

  if (!elRevenues) return; // page not matching

  elRevenues.textContent = formatCurrency(normalized.revenues);
  elExpenses.textContent = formatCurrency(normalized.expenses);
  elProfit.textContent = formatCurrency(normalized.revenues - normalized.expenses);
  elAssets.textContent = formatCurrency(normalized.assets);
  elLiabilities.textContent = formatCurrency(normalized.liabilities);
  elEquity.textContent = formatCurrency(normalized.equity);

  // ضع القيم الخام كـ data-value (للاستخدام لاحقاً)
  elRevenues.dataset.value = normalized.revenues;
  elExpenses.dataset.value = normalized.expenses;
  elProfit.dataset.value = normalized.revenues - normalized.expenses;
  elAssets.dataset.value = normalized.assets;
  elLiabilities.dataset.value = normalized.liabilities;
  elEquity.dataset.value = normalized.equity;

  // تحديث جدول التحليل إن وُجد
  const analysisTable = document.getElementById('analysis-table');
  if (analysisTable) {
    // نفترض الأسطر في ترتيب: assets, liabilities, equity
    const rows = analysisTable.querySelectorAll('tr');
    if (rows[0]) rows[0].children[1].textContent = formatCurrency(normalized.assets);
    if (rows[1]) rows[1].children[1].textContent = formatCurrency(normalized.liabilities);
    if (rows[2]) rows[2].children[1].textContent = formatCurrency(normalized.equity);
  }
}

/* ==========================
   رسم الرسم البياني (Chart.js)
   - يدعم وجود history في البيانات وإلا يعرض القيم الحالية
   ========================== */
function renderChart(normalized) {
  const ctx = document.getElementById('chart');
  if (!ctx) return;

  // تحضير بيانات history إن وُجدت
  let labels = [];
  let revenuesData = [];
  let expensesData = [];

  if (Array.isArray(normalized.history) && normalized.history.length) {
    const hist = normalized.history.slice(-12); // آخر 12 فترة
    labels = hist.map(h => h.month || h.label || '');
    revenuesData = hist.map(h => Number(h.revenues || h.rev || 0));
    expensesData = hist.map(h => Number(h.expenses || h.exp || 0));
  } else {
    // عرض البيانات الحالية فقط
    labels = [ i18n[state.lang].revenues, i18n[state.lang].expenses ];
    revenuesData = [ normalized.revenues ];
    expensesData = [ normalized.expenses ];
  }

  // إذا كان رسم سابق موجود ندمّره
  if (state.chart) {
    try { state.chart.destroy(); } catch(e){/* ignore */ }
    state.chart = null;
  }

  // إنشاء chart مركب (خط + شريط) بسيط
  state.chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          type: 'bar',
          label: i18n[state.lang].revenues,
          data: revenuesData.map(v => convertForDisplay(v)),
          backgroundColor: '#0d6efd'
        },
        {
          type: 'bar',
          label: i18n[state.lang].expenses,
          data: expensesData.map(v => convertForDisplay(v)),
          backgroundColor: '#dc3545'
        }
      ]
    },
    options: {
      responsive: true,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            label: function(context) {
              const raw = context.raw;
              return `${context.dataset.label}: ${formatNumber(raw)} ${state.currency === 'USD' ? '$' : state.currency === 'EUR' ? '€' : 'ج.م'}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) { return formatNumber(value); }
          }
        }
      }
    }
  });
}

/* ==========================
   Translate UI texts (basic)
   - يعتمد على وجود عناصر بالعناصر الثابتة في الصفحة
   ========================== */
function applyTranslations() {
  // عنوان الصفحة
  document.title = i18n[state.lang].title;
  // عناوين إن وُجدت بعناصر مع data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18n[state.lang][key]) el.textContent = i18n[state.lang][key];
  });

  // عناصر محددة إذا لم تستخدم data-i18n
  const overviewEl = document.querySelector('#overview h2');
  if (overviewEl) overviewEl.textContent = i18n[state.lang].overview;
  const analysisEl = document.querySelector('#analysis h2');
  if (analysisEl) analysisEl.textContent = i18n[state.lang].analysis;

  // زر اللغة إن وُجد
  const langSelect = document.getElementById('language');
  const langToggle = document.getElementById('langToggle');
  if (langSelect) langSelect.value = state.lang;
  if (langToggle) langToggle.textContent = (state.lang === 'ar') ? 'English' : 'العربية';
}

/* ==========================
   Theme application
   ========================== */
function applyTheme() {
  if (state.theme === 'dark') document.body.classList.add('dark-mode');
  else document.body.classList.remove('dark-mode');

  // تحديث نص زر التبديل إن وجد
  const toggle = document.getElementById('toggle-dark') || document.getElementById('modeToggle') || document.getElementById('darkModeToggle');
  if (toggle) toggle.textContent = (state.theme === 'dark') ? '☀️' : '🌙';
}

/* ==========================
   Export PDF (اختياري)
   - يتطلب html2canvas و jspdf أو سيسمح بتحميلهما ديناميكياً
   ========================== */
async function exportDashboardToPdf(filename = 'financial_report.pdf') {
  // تحميل المكتبات إذا غير موجودة
  if (typeof html2canvas === 'undefined') {
    await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
  }
  if (typeof window.jspdf === 'undefined' && typeof window.jspdf === 'undefined') {
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
  }

  // اختر عنصر لنصوّره (main أو عنصر محدد)
  const el = document.querySelector('main') || document.body;
  const canvas = await html2canvas(el, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL('image/jpeg', 0.95);

  const { jsPDF } = window.jspdf || window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const imgProps = pdf.getImageProperties(imgData);
  const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;

  pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pdfHeight);
  pdf.save(filename);
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = url;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Failed to load ' + url));
    document.head.appendChild(s);
  });
}

/* ==========================
   Init: ربط الأحداث وتهيئة الصفحة
   ========================== */
document.addEventListener('DOMContentLoaded', () => {
  // عناصر واجهة التحكم
  const toggleDarkBtn = document.getElementById('toggle-dark') || document.getElementById('modeToggle') || document.getElementById('darkModeToggle');
  const langSelect = document.getElementById('language') || document.getElementById('langSelect') || document.getElementById('langToggle');
  const currencySelect = document.getElementById('currency') || document.getElementById('currencySelect') || document.getElementById('currencySelectDash');
  const exportPdfBtn = document.getElementById('exportPDF') || document.getElementById('exportPdf');
  const clearBtn = document.getElementById('clearData');

  // تطبيق الإعدادات المحفوظة
  applyTheme();
  applyTranslations();

  // تحميل البيانات الخام ثم تطبيعها
  const raw = loadRawData();
  let normalized = normalizeTrial(raw && (raw.trial || raw.data || raw) ? (raw.trial || raw.data || raw) : raw);

  // بعض المستودعات تخزن الجلسة داخل كائن أعلى، حاول البحث
  if ((!normalized || (normalized.revenues === 0 && normalized.expenses === 0)) && raw && raw.sessions && raw.sessions.length) {
    // مثال: قد يكون structure مختلف — حاول أخذ الجلسة الأخيرة
    const last = raw.sessions[raw.sessions.length - 1];
    normalized = normalizeTrial(last.data || last.trial || last);
  }

  // إذا لم نجد أي بيانات، نعرض رسالة
  if (!normalized || (normalized.revenues === 0 && normalized.expenses === 0 && normalized.assets === 0 && normalized.liabilities === 0 && normalized.equity === 0)) {
    const noDataMsg = i18n[state.lang].noData;
    // حاول إظهار رسالة على الصفحة بدل alert
    const main = document.querySelector('main');
    if (main) {
      const warn = document.createElement('div');
      warn.className = 'card';
      warn.style.background = '#fff3cd';
      warn.style.border = '1px solid #ffeeba';
      warn.textContent = noDataMsg;
      main.prepend(warn);
    } else {
      console.warn(noDataMsg);
    }
  }

  // تحديث الواجهة والرسم
  updateDashboardUI(normalized);
  renderChart(normalized);

  // ربط أحداث الأزرار
  if (toggleDarkBtn) {
    toggleDarkBtn.addEventListener('click', () => {
      state.theme = (state.theme === 'dark') ? 'light' : 'dark';
      applyTheme();
      savePrefs();
    });
  }

  if (langSelect) {
    // إذا كان عنصر select
    if (langSelect.tagName === 'SELECT') {
      langSelect.value = state.lang;
      langSelect.addEventListener('change', (e) => {
        state.lang = e.target.value;
        savePrefs();
        applyTranslations();
        // إعادة رسم لتحديث التسميات
        renderChart(normalized);
        updateDashboardUI(normalized);
      });
    } else {
      // عنصر زر toggle
      langSelect.addEventListener('click', () => {
        state.lang = (state.lang === 'ar') ? 'en' : 'ar';
        savePrefs();
        applyTranslations();
        renderChart(normalized);
        updateDashboardUI(normalized);
      });
    }
  }

  if (currencySelect) {
    currencySelect.value = state.currency;
    currencySelect.addEventListener('change', (e) => {
      state.currency = e.target.value;
      savePrefs();
      updateDashboardUI(normalized);
      renderChart(normalized);
    });
  }

  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', async () => {
      try {
        await exportDashboardToPdf();
      } catch (err) {
        console.error('PDF export failed', err);
        alert((state.lang === 'ar') ? 'فشل تصدير PDF' : 'PDF export failed');
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm((state.lang === 'ar') ? 'هل تريد مسح كل البيانات؟' : 'Do you want to clear all data?')) {
        // حذف المفاتيح الشائعة
        ['financialData', 'fa:data:v1', 'fa:data', 'fa_sessions_data'].forEach(k => localStorage.removeItem(k));
        // إعادة تحميل الصفحة
        location.reload();
      }
    });
  }

  // تحديثات دورية إن رغبت (مثلاً لجلب أسعار عملة من API مستقبلاً)
  // setInterval(fetchRatesFromApi, 1000 * 60 * 60); // كل ساعة (اختياري)
});

/* ==========================
   (اختياري) مثال: جلب أسعار الصرف من API (غير مفعل افتراضياً)
   لو أردت تفعيله قم بفك التعليقات وربط API صحيح
   ========================== */
async function fetchRatesFromApi() {
  // مثال: يمكنك ربط api مفتوحة أو خدمة خارجية
  // const resp = await fetch('https://api.exchangerate.host/latest?base=EGP&symbols=USD,EUR');
  // const j = await resp.json();
  // if (j && j.rates) {
  //   state.rates.USD = j.rates.USD;
  //   state.rates.EUR = j.rates.EUR;
  //   savePrefs();
  // }
}
