// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. STATE & CONFIG ---
    const state = {
        preferences: {
            theme: localStorage.getItem('theme') || 'light',
            lang: localStorage.getItem('lang') || 'ar',
        }
    };

    const translations = {
        ar: {
            brandTitle: "المحلل المالي",
            navHome: "الرئيسية",
            navInput: "الإدخال",
            navUpload: "الرفع",
            navReport: "التقرير",
            navAdvanced: "تحليلات متقدمة",
            navDashboard: "لوحة التحكم",
            navCompare: "المقارنات",
            footerText: "© 2025 المحلل المالي. جميع الحقوق محفوظة.",
        },
        en: {
            brandTitle: "Financial Analyzer",
            navHome: "Home",
            navInput: "Input",
            navUpload: "Upload",
            navReport: "Report",
            navAdvanced: "Advanced",
            navDashboard: "Dashboard",
            navCompare: "Comparisons",
            footerText: "© 2025 Financial Analyzer. All rights reserved.",
        }
    };

    // --- 2. UI ELEMENTS ---
    const UI = {
        themeToggle: document.getElementById('themeToggle'),
        languageSelect: document.getElementById('languageSelect'),
    };

    // --- 3. FUNCTIONS ---
    const t = (key) => (translations[state.preferences.lang] && translations[state.preferences.lang][key]) || key;

    const applyTheme = (theme) => {
        document.body.setAttribute('data-theme', theme);
        if (UI.themeToggle) {
            UI.themeToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        }
        localStorage.setItem('theme', theme);
    };

    const applyLanguage = (lang) => {
        state.preferences.lang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Translate common elements
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const pageTranslations = window.pageTranslations || {};
            const key = el.dataset.translateKey;
            const translatedText = pageTranslations[lang]?.[key] || translations[lang]?.[key] || key;
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = translatedText;
            } else {
                el.textContent = translatedText;
            }
        });

        // Highlight active nav link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.main-nav .nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        localStorage.setItem('lang', lang);
    };

    // --- 4. EVENT BINDING & INITIALIZATION ---
    if (UI.themeToggle) {
        UI.themeToggle.addEventListener('click', () => {
            const newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    if (UI.languageSelect) {
        UI.languageSelect.innerHTML = `<option value="ar">العربية</option><option value="en">English</option>`;
        UI.languageSelect.value = state.preferences.lang;
        UI.languageSelect.addEventListener('change', (e) => {
            applyLanguage(e.target.value);
            // Reload the page to apply translations everywhere
            window.location.reload();
        });
    }

    // Initial Load
    applyTheme(state.preferences.theme);
    applyLanguage(state.preferences.lang);
});
