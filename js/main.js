// js/main.js (Corrected Version - Function moved to Global Scope)

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

// Function to get translations (remains global)
const t = (key) => (translations[state.preferences.lang] && translations[state.preferences.lang][key]) || key;

// Function to apply theme (remains global)
const applyTheme = (theme) => {
    document.body.setAttribute('data-theme', theme);
    // Find the toggle button inside the function when needed
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }
    localStorage.setItem('theme', theme);
};

// *** MOVED & RENAMED applyLanguage to applyTranslations - NOW GLOBAL ***
function applyTranslations() {
    const lang = state.preferences.lang; // Use the global state
    console.log(`Applying translations for language: ${lang} (main.js)`); // Add log

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Translate common elements + page specific elements
    document.querySelectorAll('[data-translate-key]').forEach(el => {
        // Use global translations and potentially page-specific ones
        const pageTranslations = (typeof window.pageTranslations === 'object' && window.pageTranslations !== null) ? window.pageTranslations : {};
        const key = el.dataset.translateKey;
        const translatedText = pageTranslations[lang]?.[key]
                             || translations[lang]?.[key]
                             || `[${key}]`; // Fallback to key

        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
           // Only update placeholder if translation found
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
        link.classList.toggle('active', link.getAttribute('href') === currentPage);
    });
    console.log("Translations applied (main.js)."); // Add log
};


// --- 3. DOMContentLoaded for Initialization and Event Binding ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed (main.js)");

    // Get UI Elements needed here
    const themeToggle = document.getElementById('themeToggle');
    const languageSelect = document.getElementById('languageSelect');

    // --- Event Binding ---
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    if (languageSelect) {
        languageSelect.innerHTML = `<option value="ar">العربية</option><option value="en">English</option>`;
        languageSelect.value = state.preferences.lang; // Set dropdown from state
        languageSelect.addEventListener('change', (e) => {
            state.preferences.lang = e.target.value; // Update global state
            localStorage.setItem('lang', state.preferences.lang); // Save preference
            // *** Reload page to apply language everywhere consistently ***
            window.location.reload();
        });
    }

    // --- Initial Load Actions ---
    applyTheme(state.preferences.theme);
    // *** Call the globally defined applyTranslations function ONCE on load ***
    applyTranslations();

    console.log("Initial setup complete (main.js).");
});

// Optional: Explicitly attach to window if still needed (shouldn't be necessary now)
// window.applyTranslations = applyTranslations;
