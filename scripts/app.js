// scripts/app.js

/* ----------------------------
  i18n (Arabic / English)
   - all strings used in UI should be here for easy expansion
---------------------------- */
const i18n = {
  ar: {
    nav_input: 'إدخال البيانات', nav_dashboard: 'لوحة التحكم', nav_reports:'التقارير', nav_compare:'مقارنة',
    welcome: 'أهلاً بك في المحلل المالي', lead:'أداة إلكترونية لتحويل ميزان المراجعة إلى قوائم مالية وتحليلها.',
    start_input: 'ابدأ بإدخال البيانات', start_input_desc:'ارفع ملف ميزان المراجعة أو أدخله يدوياً ثم انتقل للوحة التحكم.',
    view_dashboard:'عرض التحليلات', view_dashboard_desc:'اطّلع على القوائم والنسب والرسوم البيانية فوراً.',
    reports:'التقارير', reports_desc:'صدّر القوائم والتقارير إلى Excel أو PDF.',
    go_input:'إدخال البيانات', go_dashboard:'لوحة التحكم', go_reports:'التقارير',
    input_title:'إدخال ميزان المراجعة', input_desc:'اختر الطريقة: ارفع CSV/XLSX أو أدخل الحسابات يدوياً.',
    download_template:'تحميل قالب CSV', download_template_desc:'قالب جاهز لتسهيل إدخال البيانات.',
    upload_file:'رفع ملف الميزان', trial_table:'ميزان المراجعة (قابل للتعديل)',
    col_account:'الحساب', col_accno:'رقم الحساب', col_debit:'مدين', col_credit:'دائن', col_actions:'إجراءات',
    dashboard_title:'الملخص المالي والتحليلات'
  },
  en: {
    nav_input: 'Input', nav_dashboard: 'Dashboard', nav_reports:'Reports', nav_compare:'Compare',
    welcome: 'Welcome to Financial Analyzer', lead:'A tool to convert trial balance to financial statements and analyze them.',
    start_input: 'Start by Inputting Data', start_input_desc:'Upload a trial balance file or enter it manually, then go to the dashboard.',
    view_dashboard:'View Analytics', view_dashboard_desc:'See statements, ratios & charts instantly.',
    reports:'Reports', reports_desc:'Export statements and reports to Excel or PDF.',
    go_input:'Input Data', go_dashboard:'Dashboard', go_reports:'Reports',
    input_title:'Enter Trial Balance', input_desc:'Choose: upload CSV/XLSX or input accounts manually.',
    download_template:'Download CSV Template', download_template_desc:'A ready template to ease input.',
    upload_file:'Upload Trial Balance', trial_table:'Editable Trial Balance',
    col_account:'Account', col_accno:'Account No.', col_debit:'Debit', col_credit:'Credit', col_actions:'Actions',
    dashboard_title:'Financial Summary & Analytics'
  }
};

/* ----------------------------
  Preferences (theme, lang, currency)
---------------------------- */
const prefs = loadPrefs() || {};
const state = {
  lang: prefs.lang || 'ar',
  theme: prefs.theme || 'light',
  currency: prefs.currency || 'EGP',
  rates: prefs.rates || { EGP:1, USD:30.9, EUR:33.5 } // default naive rates; user can change in code or we can add UI later
};

/* ----------------------------
  Apply theme
---------------------------- */
function applyTheme(){
  if(state.theme === 'dark') document.documentElement.setAttribute('data-theme','dark');
  else document.documentElement.removeAttribute('data-theme');
  // toggle icons/buttons if present
  const bt = document.querySelectorAll('[id^=themeToggle]');
  bt.forEach(b => b.textContent = state.theme === 'dark' ? '☀️' : '🌙');
  savePrefs();
}

/* ----------------------------
  Apply language (simple DOM text replacement using data-i18n attributes)
---------------------------- */
function applyLanguage(){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    const txt = i18n[state.lang] && i18n[state.lang][key] ? i18n[state.lang][key] : el.textContent;
    el.textContent = txt;
  });
  // adjust direction if needed (we keep arabic rtl, english ltr)
  if(state.lang === 'en') document.documentElement.setAttribute('dir','ltr');
  else document.documentElement.setAttribute('dir','rtl');
  // toggle lang button label
  document.querySelectorAll('[id^=langToggle]').forEach(b=> b.textContent = state.lang === 'ar' ? 'EN' : 'عربى');
  savePrefs();
}

/* ----------------------------
  Currency: formatting and conversion
---------------------------- */
function formatCurrency(amount){
  const symbol = state.currency === 'USD' ? '$' : state.currency === 'EUR' ? '€' : 'جنيه';
  // convert from base EGP stored values to selected currency by dividing by rate
  const rate = state.rates[state.currency] || 1;
  const converted = amount / (state.rates.EGP || 1) * (state.rates.EGP / rate); // keep simple: assume stored in EGP; if not, no-op
  // For simplicity show value and symbol
  return `${Number(converted).toLocaleString(undefined, {maximumFractionDigits:2})} ${symbol}`;
}

/* ----------------------------
  Helpers: saving prefs
---------------------------- */
function savePrefs(){
  savePrefsLocal({ lang: state.lang, theme: state.theme, currency: state.currency, rates: state.rates });
}
function savePrefsLocal(p){ savePrefs(p); }

/* ----------------------------
  Hook up UI controls (theme/lang/currency) and initialize
---------------------------- */
function attachGlobalControls(){
  document.querySelectorAll('#themeToggle, #themeToggleTop, #themeToggleDash').forEach(btn=>{
    if(!btn) return;
    btn.addEventListener('click', ()=>{
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme();
    });
  });

  document.querySelectorAll('#langToggle, #langToggleTop, #langToggleDash').forEach(btn=>{
    if(!btn) return;
    btn.addEventListener('click', ()=>{
      state.lang = state.lang === 'ar' ? 'en' : 'ar';
      applyLanguage();
    });
  });

  document.querySelectorAll('#currencySelect, #currencySelectTop, #currencySelectDash').forEach(sel=>{
    if(!sel) return;
    // set value
    sel.value = state.currency;
    sel.addEventListener('change', e=>{
      state.currency = e.target.value;
      savePrefs();
      // rerender dashboard if available
      if(typeof refreshDashboard === 'function') refreshDashboard();
    });
  });
}

/* ----------------------------
  Loading & init
---------------------------- */
document.addEventListener('DOMContentLoaded', ()=>{
  // load prefs if exist
  const p = loadPrefs();
  if(p){
    state.lang = p.lang || state.lang;
    state.theme = p.theme || state.theme;
    state.currency = p.currency || state.currency;
    state.rates = p.rates || state.rates;
  }
  applyTheme();
  applyLanguage();
  attachGlobalControls();
});
