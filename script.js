// التبديل بين الوضع الليلي
document.getElementById("darkModeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// ترجمة المحتوى
const translations = {
  ar: {
    title: "أدخل بياناتك المالية",
    revenue: "الإيرادات:",
    expenses: "المصروفات:",
    assets: "الأصول:",
    liabilities: "الخصوم:",
    analyze: "تحليل",
    results: "النتائج",
    profit: "صافي الربح",
    roi: "العائد على الاستثمار",
    de: "نسبة الدين إلى حقوق الملكية",
  },
  en: {
    title: "Enter Your Financial Data",
    revenue: "Revenue:",
    expenses: "Expenses:",
    assets: "Assets:",
    liabilities: "Liabilities:",
    analyze: "Analyze",
    results: "Results",
    profit: "Net Profit",
    roi: "Return on Investment",
    de: "Debt-to-Equity Ratio",
  }
};

document.getElementById("languageSelector").addEventListener("change", (e) => {
  const lang = e.target.value;
  const t = translations[lang];
  document.getElementById("pageTitle").textContent = t.title;
  document.querySelector("label[for='revenue']").textContent = t.revenue;
  document.querySelector("label[for='expenses']").textContent = t.expenses;
  document.querySelector("label[for='assets']").textContent = t.assets;
  document.querySelector("label[for='liabilities']").textContent = t.liabilities;
  document.querySelector("button[type='submit']").textContent = t.analyze;
  document.querySelector("#results h2").textContent = t.results;
});

// حساب التحليلات
document.getElementById("dataForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const revenue = parseFloat(document.getElementById("revenue").value);
  const expenses = parseFloat(document.getElementById("expenses").value);
  const assets = parseFloat(document.getElementById("assets").value);
  const liabilities = parseFloat(document.getElementById("liabilities").value);
  const currency = document.getElementById("currencySelector").value;

  const profit = revenue - expenses;
  const roi = ((profit / assets) * 100).toFixed(2);
  const deRatio = (liabilities / (assets - liabilities)).toFixed(2);

  document.getElementById("results").classList.remove("hidden");
  document.getElementById("profit").textContent = `صافي الربح: ${profit} ${currency}`;
  document.getElementById("roi").textContent = `العائد على الاستثمار: ${roi}%`;
  document.getElementById("deRatio").textContent = `نسبة الدين إلى حقوق الملكية: ${deRatio}`;
});
