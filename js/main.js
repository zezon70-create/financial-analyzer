document.getElementById('lang-toggle')?.addEventListener('click', toggleLang);
let currentLang = 'en';
function toggleLang(){
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    alert(`Language changed to ${currentLang}`);
}