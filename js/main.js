document.getElementById('lang-toggle')?.addEventListener('click', toggleLang);

let currentLang = 'en';
function toggleLang(){
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    alert(`Language changed to ${currentLang}`);
    // هنا ممكن نضيف التغيير الديناميكي لكل النصوص من ملفات i18n/ar.json و en.json
}
