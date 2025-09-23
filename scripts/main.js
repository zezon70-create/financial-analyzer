// ================== Dark Mode Toggle ==================
const darkToggle = document.getElementById("darkToggle");
darkToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("dark-mode", document.body.classList.contains("dark-mode"));
});

// عند التحميل: تفعيل الوضع السابق
if (localStorage.getItem("dark-mode") === "true") {
  document.body.classList.add("dark-mode");
}

// ================== Language Switch ==================
const langSelect = document.getElementById("langSelect");
langSelect?.addEventListener("change", (e) => {
  const lang = e.target.value;
  localStorage.setItem("lang", lang);
  applyLanguage(lang);
});

function applyLanguage(lang) {
  const texts = {
    ar: {
      revenues: "الإيرادات",
      expenses: "المصروفات",
      assets: "الأصول",
      liabilities: "الخصوم",
      equity: "حقوق الملكية",
      profit: "الأرباح",
    },
    en: {
      revenues: "Revenues",
      expenses: "Expenses",
      assets: "Assets",
      liabilities: "Liabilities",
      equity: "Equity",
      profit: "Profit",
    },
  };

  document.querySelectorAll("[data-key]").forEach((el) => {
    const key = el.getAttribute("data-key");
    el.textContent = texts[lang][key] || el.textContent;
  });
}

// تفعيل اللغة المحفوظة
applyLanguage(localStorage.getItem("lang") || "ar");

// ================== Currency Switch ==================
const currencySelect = document.getElementById("currencySelect");
let currency = localStorage.getItem("currency") || "EGP";

currencySelect?.addEventListener("change", (e) => {
  currency = e.target.value;
  localStorage.setItem("currency", currency);
  updateCards();
});

function formatCurrency(value) {
  const symbols = { EGP: "ج.م", USD: "$", EUR: "€" };
  return `${Number(value).toLocaleString()} ${symbols[currency]}`;
}

// ================== Dashboard Data ==================
const dashboardData = {
  revenues: 250000,
  expenses: 120000,
  assets: 500000,
  liabilities: 200000,
  equity: 300000,
  profit: 130000,
};

function updateCards() {
  for (let key in dashboardData) {
    const el = document.getElementById(key);
    if (el) el.textContent = formatCurrency(dashboardData[key]);
  }
}
updateCards();

// ================== Charts ==================
function renderCharts() {
  const ctx1 = document.getElementById("chart1");
  const ctx2 = document.getElementById("chart2");

  if (ctx1) {
    new Chart(ctx1, {
      type: "bar",
      data: {
        labels: ["Revenues", "Expenses", "Profit"],
        datasets: [
          {
            label: "Financials",
            data: [
              dashboardData.revenues,
              dashboardData.expenses,
              dashboardData.profit,
            ],
            backgroundColor: ["#0077b6", "#ef233c", "#38b000"],
          },
        ],
      },
    });
  }

  if (ctx2) {
    new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: ["Assets", "Liabilities", "Equity"],
        datasets: [
          {
            label: "Balance Sheet",
            data: [
              dashboardData.assets,
              dashboardData.liabilities,
              dashboardData.equity,
            ],
            backgroundColor: ["#0096c7", "#ef476f", "#06d6a0"],
          },
        ],
      },
    });
  }
}
renderCharts();

// ================== Export Reports ==================
document.getElementById("exportPDF")?.addEventListener("click", () => {
  alert("🚀 سيتم توليد تقرير PDF هنا");
});

document.getElementById("exportExcel")?.addEventListener("click", () => {
  alert("🚀 سيتم توليد تقرير Excel هنا");
});

document.getElementById("exportCSV")?.addEventListener("click", () => {
  alert("🚀 سيتم توليد تقرير CSV هنا");
});
