// scripts/dashboard.js

// دوال الترجمة
const translations = {
  ar: {
    dashboard_title: "لوحة التحكم",
    revenues: "الإيرادات",
    expenses: "المصروفات",
    assets: "الأصول",
    liabilities: "الخصوم",
    equity: "حقوق الملكية",
    profit: "صافي الربح",
    charts: "الرسوم البيانية",
    export_pdf: "تصدير PDF",
    clear_data: "مسح البيانات",
    back_input: "العودة لإدخال البيانات",
  },
  en: {
    dashboard_title: "Dashboard",
    revenues: "Revenues",
    expenses: "Expenses",
    assets: "Assets",
    liabilities: "Liabilities",
    equity: "Equity",
    profit: "Net Profit",
    charts: "Charts",
    export_pdf: "Export PDF",
    clear_data: "Clear Data",
    back_input: "Back to Input",
  }
};

let currentLang = localStorage.getItem("lang") || "ar";
let currentTheme = localStorage.getItem("theme") || "light";

// تحميل البيانات من LocalStorage
function getData() {
  const data = localStorage.getItem("financialData");
  return data ? JSON.parse(data) : null;
}

// تحديث الكروت
function updateCards(data) {
  const profit = data.revenues - data.expenses;
  document.getElementById("revenuesValue").textContent = formatNumber(data.revenues);
  document.getElementById("expensesValue").textContent = formatNumber(data.expenses);
  document.getElementById("assetsValue").textContent = formatNumber(data.assets);
  document.getElementById("liabilitiesValue").textContent = formatNumber(data.liabilities);
  document.getElementById("equityValue").textContent = formatNumber(data.equity);
  document.getElementById("profitValue").textContent = formatNumber(profit);
}

// رسم الرسوم البيانية
function renderCharts(data) {
  const ctxBar = document.getElementById("barChart").getContext("2d");
  const ctxPie = document.getElementById("pieChart").getContext("2d");

  new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: [translations[currentLang].revenues, translations[currentLang].expenses, translations[currentLang].profit],
      datasets: [{
        label: translations[currentLang].charts,
        data: [data.revenues, data.expenses, data.revenues - data.expenses],
        backgroundColor: ["#0d6efd", "#dc3545", "#198754"]
      }]
    },
    options: { responsive: true }
  });

  new Chart(ctxPie, {
    type: "pie",
    data: {
      labels: [translations[currentLang].assets, translations[currentLang].liabilities, translations[currentLang].equity],
      datasets: [{
        data: [data.assets, data.liabilities, data.equity],
        backgroundColor: ["#ffc107", "#6c757d", "#0dcaf0"]
      }]
    },
    options: { responsive: true }
  });
}

// تنسيقات الأرقام
function formatNumber(num) {
  return new Intl.NumberFormat(currentLang === "ar" ? "ar-EG" : "en-US").format(num);
}

// تبديل اللغة
function toggleLanguage() {
  currentLang = currentLang === "ar" ? "en" : "ar";
  localStorage.setItem("lang", currentLang);
  applyTranslations();
  location.reload(); // لإعادة تحميل الرسوم البيانية باللغة الجديدة
}

// تطبيق الترجمة
function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[currentLang][key];
  });
  document.getElementById("toggle-lang").textContent = currentLang === "ar" ? "English" : "العربية";
}

// تبديل الثيم
function toggleTheme() {
  currentTheme = currentTheme === "light" ? "dark" : "light";
  document.body.setAttribute("data-theme", currentTheme);
  localStorage.setItem("theme", currentTheme);
  document.getElementById("toggle-theme").textContent = currentTheme === "dark" ? "☀️" : "🌙";
}

// تصدير PDF
function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text(translations[currentLang].dashboard_title, 10, 10);
  doc.text(`${translations[currentLang].revenues}: ${document.getElementById("revenuesValue").textContent}`, 10, 20);
  doc.text(`${translations[currentLang].expenses}: ${document.getElementById("expensesValue").textContent}`, 10, 30);
  doc.text(`${translations[currentLang].profit}: ${document.getElementById("profitValue").textContent}`, 10, 40);

  doc.save("dashboard-report.pdf");
}

// مسح البيانات
function clearData() {
  localStorage.removeItem("financialData");
  alert(currentLang === "ar" ? "تم مسح البيانات!" : "Data cleared!");
  location.reload();
}

// تشغيل عند التحميل
document.addEventListener("DOMContentLoaded", () => {
  // إعداد اللغة والثيم
  applyTranslations();
  document.body.setAttribute("data-theme", currentTheme);
  document.getElementById("toggle-theme").textContent = currentTheme === "dark" ? "☀️" : "🌙";

  const data = getData();
  if (data) {
    updateCards(data);
    renderCharts(data);
  } else {
    alert(currentLang === "ar" ? "لا توجد بيانات مدخلة" : "No input data found");
  }

  // الأحداث
  document.getElementById("toggle-lang").addEventListener("click", toggleLanguage);
  document.getElementById("toggle-theme").addEventListener("click", toggleTheme);
  document.getElementById("exportPDF").addEventListener("click", exportPDF);
  document.getElementById("clearData").addEventListener("click", clearData);
});
