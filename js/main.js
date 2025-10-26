// js/main.js (النسخة المصححة + دمج الشاشة الترحيبية)
// --- 1. STATE & CONFIG (Global Scope) ---
const state = {
    preferences: {
        theme: localStorage.getItem('theme') || 'light',
        lang: localStorage.getItem('lang') || 'ar',
    }
};
const translations = {
    ar: {
        brandTitle: "المحلل المالي", navHome: "الرئيسية", navInput: "الإدخال", navUpload: "الرفع",
        navReport: "التقرير", navAdvanced: "تحليلات متقدمة", navDashboard: "لوحة التحكم", navCompare: "المقارنات",
        footerText: "© 2025 المحلل المالي. جميع الحقوق محفوظة.",
        navBenchmarks: "المقارنات المعيارية",
        exportPdf: "تصدير PDF",
    },
    en: {
        brandTitle: "Financial Analyzer", navHome: "Home", navInput: "Input", navUpload: "Upload",
        navReport: "Report", navAdvanced: "Advanced", navDashboard: "Dashboard", navCompare: "Comparisons",
        footerText: "© 2025 Financial Analyzer. All rights reserved.",
        navBenchmarks: "Benchmarks",
        exportPdf: "Export PDF",
    }
};
// --- 2. GLOBAL FUNCTIONS ---
const t = (key) => (translations[state.preferences.lang] && translations[state.preferences.lang][key]) || key;
const applyTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }
    localStorage.setItem('theme', theme);
};
// *** Define applyTranslations GLOBALLY ***
// *** (تم التراجع عن تعديل el.offsetParent الذي سبب المشكلة) ***
function applyTranslations() {
    const lang = state.preferences.lang;
    console.log(`Applying translations for language: ${lang} (main.js)`);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-translate-key]').forEach(el => {
        const pageTranslations = (typeof window.pageTranslations === 'object' && window.pageTranslations !== null) ? window.pageTranslations : {};
        const key = el.dataset.translateKey;
        const translatedText = pageTranslations[lang]?.[key]
                             || translations[lang]?.[key]
                             || `[${key}]`;
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            if (translatedText !== `[${key}]`) { el.placeholder = translatedText; }
        } else {
            el.textContent = translatedText; // <-- هذا هو الكود الأصلي الصحيح
        }
    });
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav .nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === currentPage);
    });
    console.log("Translations applied (main.js).");
};
// --- 3. DOMContentLoaded for Initialization and Event Binding ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed (main.js)");    
    // تعريف عناصر الواجهة
    const UI = { 
        themeToggle: document.getElementById('themeToggle'), 
        languageSelect: document.getElementById('languageSelect'),
        splashScreen: document.getElementById('splashScreen') // <-- إضافة عنصر الشاشة
    };
    // --- (الكود الأصلي الخاص بك - كما هو) ---
    if (UI.themeToggle) { UI.themeToggle.addEventListener('click', () => { const newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light'; applyTheme(newTheme); }); }
    if (UI.languageSelect) {
        UI.languageSelect.innerHTML = `<option value="ar">العربية</option><option value="en">English</option>`;
        UI.languageSelect.value = state.preferences.lang;
        UI.languageSelect.addEventListener('change', (e) => {
            state.preferences.lang = e.target.value;
            localStorage.setItem('lang', state.preferences.lang);
            window.location.reload();
        });
    }    
    applyTheme(state.preferences.theme);    
    // استدعاء الترجمة مرة واحدة (كما كان في الكود الأصلي)
    // هذا سيقوم بترجمة كل شيء بما في ذلك الشاشة الترحيبية
    applyTranslations();    
    console.log("Initial setup complete (main.js).");
    // --- (نهاية الكود الأصلي) ---
    // =========================================
    //  إضافة جديدة: كود الشاشة الترحيبية
    //  (يتم إضافته في النهاية لضمان عمل الكود الأصلي أولاً)
    // =========================================
    if (UI.splashScreen) {
        const splashDuration = 1500; // مدة العرض: 1.5 ثانية        
        // لا نحتاج لاستدعاء الترجمة مرة أخرى، فقد تم استدعاؤها بالفعل        
        setTimeout(() => {
            UI.splashScreen.classList.add('hidden');
        }, splashDuration);
    }
    // =========================================
    //  نهاية كود الشاشة الترحيبية
    // =========================================
});
// *** ADD THIS LINE AT THE VERY END (Outside DOMContentLoaded) ***
window.applyTranslations = applyTranslations;
console.log("applyTranslations function explicitly attached to window.");
