// js/main.js (Corrected Version)

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
    },
    en: {
        brandTitle: "Financial Analyzer", navHome: "Home", navInput: "Input", navUpload: "Upload",
        navReport: "Report", navAdvanced: "Advanced", navDashboard: "Dashboard", navCompare: "Comparisons",
        footerText: "© 2025 Financial Analyzer. All rights reserved.",
    }
};

// --- 2. GLOBAL FUNCTIONS ---

// Function to get translations (remains the same)
const t = (key) => (translations[state.preferences.lang] && translations[state.preferences.lang][key]) || key;

// Function to apply theme (remains the same)
const applyTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    const themeToggle = document.getElementById('themeToggle'); // Get element inside function
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }
    localStorage.setItem('theme', theme);
};

// *** MODIFIED: Renamed and moved applyLanguage function to GLOBAL scope ***
function applyTranslations() {
    const lang = state.preferences.lang; // Get current language from state
    console.log(`Applying translations for language: ${lang}`); // Debug log

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Translate common elements + page specific elements
    document.querySelectorAll('[data-translate-key]').forEach(el => {
        // *** CRITICAL: Check if window.pageTranslations exists before trying to access it ***
        const pageTranslations = (typeof window.pageTranslations === 'object' && window.pageTranslations !== null) ? window.pageTranslations : {};
        
        const key = el.dataset.translateKey;
        
        // Prioritize page-specific translations, then global, then show key
        const translatedText = pageTranslations[lang]?.[key] 
                             || translations[lang]?.[key] 
                             || `[${key}]`; // Show key if translation missing

        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            // Only update placeholder if a valid translation was found
            if (translatedText !== `[${key}]`) {
                 el.placeholder = translatedText;
            }
        } else {
            el.textContent = translatedText;
        }
    });

    // Highlight active nav link (remains the same)
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav .nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    console.log("Translations applied."); // Debug log
};


// --- 3. DOMContentLoaded for Initialization and Event Binding ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed (main.js)"); // Debug log

    const UI = { // Define UI elements needed within this scope
        themeToggle: document.getElementById('themeToggle'),
        languageSelect: document.getElementById('languageSelect'),
    };

    // --- Event Binding ---
    if (UI.themeToggle) {
        UI.themeToggle.addEventListener('click', () => {
            const newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    if (UI.languageSelect) {
        UI.languageSelect.innerHTML = `<option value="ar">العربية</option><option value="en">English</option>`;
        UI.languageSelect.value = state.preferences.lang; // Set dropdown to current lang
        UI.languageSelect.addEventListener('change', (e) => {
            state.preferences.lang = e.target.value; // Update state lang
            localStorage.setItem('lang', state.preferences.lang); // Save preference
            // applyTranslations(); // Apply immediately (might cause flicker before reload)
            window.location.reload(); // Reload to apply language change globally
        });
    }

    // --- Initial Load Actions ---
    applyTheme(state.preferences.theme);
    // *** Call the globally defined applyTranslations function ***
    // This initial call might be redundant if page-specific JS calls it, but safe to keep.
    applyTranslations(); 

    console.log("Initial setup complete (main.js)."); // Debug log
});
