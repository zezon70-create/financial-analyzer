const state = {
    preferences: {
        theme: localStorage.getItem("theme") || "light",
        lang: localStorage.getItem("lang") || "ar"
    }
},
translations = {
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
        navBenchmarks: "المقارنات المعيارية",
        navExecutiveSummary: "الملخص التنفيذي", // <-- ✅ هذه هي الإضافة
        exportPdf: "تصدير PDF",
        pageTitle: "المحلل المالي",
        passwordTitle: "مطلوب مصادقة",
        passwordSubtitle: "الرجاء إدخال كلمة المرور لعرض الموقع.",
        passwordPlaceholder: "كلمة المرور",
        passwordButtonText: "دخول",
        passwordErrorText: "كلمة المرور غير صحيحة. حاول مرة أخرى."
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
        navBenchmarks: "Benchmarks",
        navExecutiveSummary: "Executive Summary", // <-- ✅ هذه هي الإضافة
        exportPdf: "Export PDF",
        pageTitle: "Financial Analyzer",
        passwordTitle: "Authentication Required",
        passwordSubtitle: "Please enter the password to view the site.",
        passwordPlaceholder: "Password",
        passwordButtonText: "Login",
        passwordErrorText: "Incorrect password. Please try again."
    }
},
t = e => translations[state.preferences.lang] && translations[state.preferences.lang][e] || e,
applyTheme = e => {
    document.body.setAttribute("data-theme", e);
    const t = document.getElementById("themeToggle");
    t && (t.innerHTML = "dark" === e ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>'), localStorage.setItem("theme", e)
};

function applyTranslations() {
    const e = state.preferences.lang;
    console.log(`Applying translations for language: ${e} (main.js)`), document.documentElement.lang = e, document.documentElement.dir = "ar" === e ? "rtl" : "ltr", document.querySelectorAll("[data-translate-key]").forEach((t => {
        const a = "object" == typeof window.pageTranslations && null !== window.pageTranslations ? window.pageTranslations : {},
            n = t.dataset.translateKey,
            s = a[e]?.[n] || translations[e]?.[n] || `[${n}]`;
        "INPUT" === t.tagName || "TEXTAREA" === t.tagName ? s !== `[${n}]` && (t.placeholder = s) : t.textContent = s
    }));
    const t = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".main-nav .nav-link").forEach((e => {
        e.classList.toggle("active", e.getAttribute("href") === t)
    })), console.log("Translations applied (main.js).")
}
document.addEventListener("DOMContentLoaded", (() => {
    console.log("DOM fully loaded and parsed (main.js)");
    const e = {
        themeToggle: document.getElementById("themeToggle"),
        languageSelect: document.getElementById("languageSelect")
    };
    e.themeToggle && e.themeToggle.addEventListener("click", (() => {
        const e = "light" === document.body.getAttribute("data-theme") ? "dark" : "light";
        applyTheme(e)
    })), e.languageSelect && (e.languageSelect.innerHTML = '<option value="ar">العربية</option><option value="en">English</option>', e.languageSelect.value = state.preferences.lang, e.languageSelect.addEventListener("change", (e => {
        state.preferences.lang = e.target.value, localStorage.setItem("lang", state.preferences.lang), window.location.reload()
    }))), applyTheme(state.preferences.theme), applyTranslations(), console.log("Initial setup complete (main.js).");
    const t = document.getElementById("splashScreen"),
        a = document.getElementById("passwordModal"),
        n = document.getElementById("passwordInput"),
        s = document.getElementById("passwordButton"),
        o = document.getElementById("passwordError"),
        l = document.querySelector(".password-content"),
        r = () => {
            a.classList.add("visible"), n.focus()
        },
        i = () => {
            o.classList.add("visible"), l.classList.add("shake"), setTimeout((() => {
                l.classList.remove("shake")
            }), 500)
        },
        d = () => {
            o.classList.remove("visible")
        };
    "true" === sessionStorage.getItem("isAuthenticated") ? t && setTimeout((() => {
        t.classList.add("hidden")
    }), 1500) : (t && setTimeout((() => {
        t.classList.add("hidden"), a && setTimeout(r, 500)
    }), 1500), s && (s.addEventListener("click", (() => {
        const e = n.value;
        fetch("zezo.json").then((e => {
            if (!e.ok) throw new Error("Network response was not ok " + e.statusText);
            return e.json()
        })).then((t => {
            t.includes(e) ? (d(), sessionStorage.setItem("isAuthenticated", "true"), a.classList.remove("visible")) : (i(), n && (n.value = ""))
        })).catch((e => {
            console.error("Error fetching or parsing passwords file:", e), i(), n && (n.value = "")
        }))
    })), n && n.addEventListener("keypress", (e => {
        "Enter" === e.key && (e.preventDefault(), s.click())
    })), n && n.addEventListener("input", d)))
})), window.applyTranslations = applyTranslations, console.log("applyTranslations function explicitly attached to window.");
