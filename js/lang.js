// lang.js - basic language toggling (strings can be extended)
const STRINGS = {
  ar: {
    importSuccess: 'تم الاستيراد',
    noData: 'لا توجد بيانات'
  },
  en: {
    importSuccess: 'Imported',
    noData: 'No data'
  }
};

function applyLang(lang='ar'){
  // minimal: update dir and some labels if needed
  document.documentElement.lang = (lang==='ar') ? 'ar' : 'en';
  if(lang === 'ar'){ document.documentElement.dir = 'rtl'; } else { document.documentElement.dir = 'ltr'; }
  // store
  localStorage.setItem('fa_lang', lang);
}
