const translations = {
  en: {
    welcome: "Welcome to Financial Analysis System",
    chooseLang: "Please choose your language:",
    start: "Start",
    trialBalance: "Enter Trial Balance",
    account: "Account",
    debit: "Debit",
    credit: "Credit",
    addRow: "Add Row",
    generate: "Generate Statements",
    statements: "Financial Statements",
    next: "Go to Analysis",
    analysis: "Financial Analysis",
    dashboard: "Dashboard",
    forecast: "Financial Forecast"
  },
  ar: {
    welcome: "مرحبًا بك في نظام التحليل المالي",
    chooseLang: "من فضلك اختر اللغة:",
    start: "ابدأ",
    trialBalance: "إدخال ميزان المراجعة",
    account: "الحساب",
    debit: "مدين",
    credit: "دائن",
    addRow: "إضافة صف",
    generate: "إعداد القوائم المالية",
    statements: "القوائم المالية",
    next: "الانتقال للتحليل",
    analysis: "التحليل المالي",
    dashboard: "لوحة التحكم",
    forecast: "التنبؤ المالي"
  }
};

function setLanguage(lang) {
  localStorage.setItem("lang", lang);
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.innerText = translations[lang][el.getAttribute("data-i18n")];
  });
}

window.onload = () => {
  const lang = localStorage.getItem("lang") || "en";
  setLanguage(lang);
};
