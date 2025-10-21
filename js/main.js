// js/main.js (Corrected Version + Added Global PDF Export Function)

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
        navBenchmarks: "المقارنات المعيارية",
        footerText: "© 2025 المحلل المالي. جميع الحقوق محفوظة.",
        exportPdf: "تصدير PDF", // *** ADDED ***
    },
    en: {
        brandTitle: "Financial Analyzer", navHome: "Home", navInput: "Input", navUpload: "Upload",
        navReport: "Report", navAdvanced: "Advanced", navDashboard: "Dashboard", navCompare: "Comparisons",
        navBenchmarks: "Benchmarks",
        footerText: "© 2025 Financial Analyzer. All rights reserved.",
        exportPdf: "Export PDF", // *** ADDED ***
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
            el.textContent = translatedText;
        }
    });
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav .nav-link').forEach(link => {
        const linkHref = link.getAttribute('href').split('/').pop(); // Handle relative paths
        link.classList.toggle('active', linkHref === currentPage);
    });
    console.log("Translations applied (main.js).");
};

// --- 3. DOMContentLoaded for Initialization and Event Binding ---
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed (main.js)");
    const UI = { themeToggle: document.getElementById('themeToggle'), languageSelect: document.getElementById('languageSelect') };

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
    applyTranslations();
    console.log("Initial setup complete (main.js).");
});

window.applyTranslations = applyTranslations;
console.log("applyTranslations function explicitly attached to window.");


// *** START: ADDED PDF EXPORT FUNCTION ***
/**
 * Exports a specific element to PDF with watermark.
 * @param {string} elementId The ID of the element to export (e.g., 'advancedTabsContent')
 * @param {string} reportTitle The title for the generated PDF file (e.g., 'Advanced_Analysis')
 */
window.exportPageToPDF = (elementId, reportTitle = 'Financial_Report') => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`PDF Export Error: Element with ID '${elementId}' not found.`);
        return;
    }

    console.log(`[PDF Export] Exporting element #${elementId}...`);
    
    // --- FIX 1: Show all hidden tab-panes before cloning ---
    const originalDisplays = [];
    const tabsToPrint = element.querySelectorAll('.tab-pane');
    if (tabsToPrint.length > 0) {
        console.log(`[PDF Export] Found ${tabsToPrint.length} tab-panes. Forcing display: block...`);
        tabsToPrint.forEach(tab => {
            originalDisplays.push({ el: tab, display: tab.style.display }); // Save original style
            tab.style.display = 'block'; // Force show
        });
    }
    
    const clone = element.cloneNode(true);
    clone.style.padding = '1rem'; 
    clone.style.position = 'relative'; 
    clone.style.zIndex = '1';
    clone.classList.add('pdf-export-content'); // Add class for specific PDF styles

    // --- FIX 2: Restore original tab display after cloning ---
    originalDisplays.forEach(item => {
        item.el.style.display = item.display; // Restore original state
    });
    console.log("[PDF Export] Tab display restored.");

    // --- FIX 3: Use Absolute URL for Logo ---
    const logoUrl = 'https://zezon70-create.github.io/financial-analyzer/assets/logo.png';

    const watermarkContainer = document.createElement('div');
    watermarkContainer.style.position = 'absolute';
    watermarkContainer.style.top = '50%';
    watermarkContainer.style.left = '50%';
    watermarkContainer.style.transform = 'translate(-50%, -50%)';
    watermarkContainer.style.zIndex = '-1'; 
    watermarkContainer.style.opacity = '0.08';
    watermarkContainer.style.pointerEvents = 'none';
    watermarkContainer.innerHTML = `<img src="${logoUrl}" style="width: 500px; max-width: 100%;">`;
    
    const printWrapper = document.createElement('div');
    printWrapper.style.position = 'relative'; 
    printWrapper.style.overflow = 'hidden'; 
    // Ensure print wrapper uses the correct font by pulling from body
    printWrapper.style.fontFamily = getComputedStyle(document.body).fontFamily;

    printWrapper.appendChild(watermarkContainer);
    printWrapper.appendChild(clone); 

    const opt = {
        margin:       0.5,
        filename:     `${reportTitle}_${new Date().toISOString().split('T')[0]}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
            scale: 2, 
            useCORS: true, // Needed for loading the logo from the full URL
            logging: false,
            // --- FIX 4: Fix Arabic Font Rendering ---
            foreignObjectRendering: true 
        },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // Temporarily append to body to ensure styles are computed
    document.body.appendChild(printWrapper);
    
    html2pdf().from(printWrapper).set(opt).save().then(() => {
        console.log("[PDF Export] Export complete.");
        document.body.removeChild(printWrapper); // Clean up
    }).catch(err => {
        console.error("[PDF Export] Error:", err);
        document.body.removeChild(printWrapper); // Clean up on error
    });
};
// *** END: ADDED PDF EXPORT FUNCTION ***
