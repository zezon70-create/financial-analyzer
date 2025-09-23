// ==========================
// تفعيل الدارك مود
// ==========================
const modeToggle = document.getElementById("modeToggle");
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    modeToggle.textContent = "☀️ Light Mode";
  } else {
    modeToggle.textContent = "🌙 Dark Mode";
  }
});

// ==========================
// تغيير اللغة
// ==========================
const langToggle = document.getElementById("langToggle");
let currentLang = "ar"; // اللغة الافتراضية

langToggle.addEventListener("click", () => {
  if (currentLang === "ar") {
    currentLang = "en";
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    langToggle.textContent = "العربية";
    translateToEnglish();
  } else {
    currentLang = "ar";
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
    langToggle.textContent = "English";
    translateToArabic();
  }
});

function translateToEnglish() {
  document.querySelector("h1").textContent = "Dashboard - Financial Analyzer";
  document.querySelector("#overview h2").textContent = "Performance Overview";
  document.querySelector("#analysis h2").textContent = "Financial Analysis";
}

function translateToArabic() {
  document.querySelector("h1").textContent = "لوحة التحكم - Financial Analyzer";
  document.querySelector("#overview h2").textContent = "ملخص الأداء";
  document.querySelector("#analysis h2").textContent = "تحليلات مالية";
}

// ==========================
// اختيار العملة
// ==========================
const currencySelect = document.getElementById("currencySelect");
let currentCurrency = "EGP";

currencySelect.addEventListener("change", () => {
  currentCurrency = currencySelect.value;
  updateCurrencyDisplay();
});

function updateCurrencyDisplay() {
  const elements = document.querySelectorAll(".amount");
  elements.forEach(el => {
    let value = parseFloat(el.dataset.value);
    let converted = convertCurrency(value, currentCurrency);
    el.textContent = `${converted} ${currentCurrency}`;
  });
}

function convertCurrency(value, currency) {
  // أسعار صرف تجريبية (ممكن نربطها بـ API فيما بعد)
  const rates = {
    "EGP": 1,
    "USD": 0.020, // مثال
    "EUR": 0.018  // مثال
  };
  return (value * rates[currency]).toFixed(2);
}

// ==========================
// تشغيل الرسوم البيانية (لو موجودة)
// ==========================
// هنا تقدر تضيف أي رسوم بيانية قديمة كانت مستخدمة
// مثال بسيط:
document.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard Loaded with Dark Mode, Language & Currency features ✅");
  updateCurrencyDisplay();
});
