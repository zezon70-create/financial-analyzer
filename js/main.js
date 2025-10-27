// js/main.js (Corrected Version + Explicit Global Export)

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
        navBenchmarks: "المقارنات المعيارية", // تمت إضافته
        exportPdf: "تصدير PDF",
        pageTitle: "المحلل المالي", // لعنوان الصفحة
        passwordTitle: "مطلوب مصادقة",
        passwordSubtitle: "الرجاء إدخال كلمة المرور لعرض الموقع.",
        passwordPlaceholder: "كلمة المرور",
        passwordButtonText: "دخول",
        passwordErrorText: "كلمة المرور غير صحيحة. حاول مرة أخرى."
    },
    en: {
        brandTitle: "Financial Analyzer", navHome: "Home", navInput: "Input", navUpload: "Upload",
        navReport: "Report", navAdvanced: "Advanced", navDashboard: "Dashboard", navCompare: "Comparisons",
        footerText: "© 2025 Financial Analyzer. All rights reserved.",
        navBenchmarks: "Benchmarks", // تمت إضافته
        exportPdf: "Export PDF",
        pageTitle: "Financial Analyzer", // For page title
        passwordTitle: "Authentication Required",
        passwordSubtitle: "Please enter the password to view the site.",
        passwordPlaceholder: "Password",
        passwordButtonText: "Login",
        passwordErrorText: "Incorrect password. Please try again."
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
        link.classList.toggle('active', link.getAttribute('href') === currentPage);
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
    // Call translation ONCE here after DOM is ready
    applyTranslations();
    console.log("Initial setup complete (main.js).");
    // ==========================================================
    //  (إضافة جديدة) - كود التحكم في الشاشة الترحيبية والباسورد
    // ==========================================================

    // *** يمكنك تغيير الباسورد من هنا ***
    const CORRECT_PASSWORD = "1986"; 
    // تحديد العناصر الجديدة
    const splashScreen = document.getElementById('splashScreen');
    const passwordModal = document.getElementById('passwordModal');
    const passwordInput = document.getElementById('passwordInput');
    const passwordButton = document.getElementById('passwordButton');
    const passwordError = document.getElementById('passwordError');
    const passwordContent = document.querySelector('.password-content');
    // مدة عرض الشاشة الترحيبية (بالمللي ثانية)
    const splashDuration = 1500; // 1.5 ثانية
    const showPasswordModal = () => {
        // تأكد من أن نصوص الباسورد مترجمة قبل إظهارها
        // (لأن applyTranslations() الأصلي قد لا يشملها إذا كانت مخفية)
        document.querySelector('[data-translate-key="passwordTitle"]').textContent = t('passwordTitle');
        document.querySelector('[data-translate-key="passwordSubtitle"]').textContent = t('passwordSubtitle');
        document.querySelector('[data-translate-key="passwordPlaceholder"]').placeholder = t('passwordPlaceholder');
        document.querySelector('[data-translate-key="passwordButtonText"]').textContent = t('passwordButtonText');
        document.querySelector('[data-translate-key="passwordErrorText"]').textContent = t('passwordErrorText'); // يجهز النص لكن لا يظهره     
        passwordModal.classList.add('visible');
        passwordInput.focus(); // التركيز على حقل الإدخال
    };
    const hidePasswordModal = () => {
        passwordModal.classList.remove('visible');
    };
    const showPasswordError = () => {
        passwordError.classList.add('visible');
        passwordContent.classList.add('shake');
        // إزالة كلاس الاهتزاز بعد انتهاء الحركة
        setTimeout(() => {
            passwordContent.classList.remove('shake');
        }, 500);
    };
    const hidePasswordError = () => {
        passwordError.classList.remove('visible');
    };
    // 1. التحكم في الشاشة الترحيبية
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.classList.add('hidden');          
            // 2. بعد اختفاء الشاشة الترحيبية، أظهر شاشة الباسورد
            if (passwordModal) {
                // ننتظر 500ms (مدة اختفاء الشاشة) قبل إظهار الباسورد
                setTimeout(showPasswordModal, 500); 
            }
        }, splashDuration);
    }
    if (passwordButton) {
        passwordButton.addEventListener('click', () => {
            if (passwordInput.value === CORRECT_PASSWORD) {
                hidePasswordError();
                hidePasswordModal();
            } else {
                showPasswordError();
            }
        });
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                passwordButton.click(); // كأن المستخدم ضغط على الزر
            }
        });
        passwordInput.addEventListener('input', hidePasswordError);
    }
});
// *** ADD THIS LINE AT THE VERY END (Outside DOMContentLoaded) ***
window.applyTranslations = applyTranslations;
console.log("applyTranslations function explicitly attached to window.");
