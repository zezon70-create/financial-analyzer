// ========================
// إعدادات عامة
// ========================
let currentLanguage = "ar";
let currentCurrency = "EGP";
let isDarkMode = false;

const translations = {
  ar: {
    liquidity: "نسب السيولة",
    profitability: "نسب الربحية",
    activity: "نسب النشاط",
    debt: "نسب المديونية",
    ratio: "النسبة",
    value: "القيمة",
    interpretation: "التفسير",
    currentRatio: "نسبة التداول",
    quickRatio: "النسبة السريعة",
    grossMargin: "هامش الربح الإجمالي",
    netMargin: "هامش صافي الربح",
    roa: "العائد على الأصول",
    roe: "العائد على حقوق الملكية",
    assetTurnover: "معدل دوران الأصول",
    inventoryTurnover: "معدل دوران المخزون",
    debtRatio: "نسبة المديونية",
    debtEquity: "نسبة الدين إلى حقوق الملكية"
  },
  en: {
    liquidity: "Liquidity Ratios",
    profitability: "Profitability Ratios",
    activity: "Activity Ratios",
    debt: "Debt Ratios",
    ratio: "Ratio",
    value: "Value",
    interpretation: "Interpretation",
    currentRatio: "Current Ratio",
    quickRatio: "Quick Ratio",
    grossMargin: "Gross Margin",
    netMargin: "Net Profit Margin",
    roa: "Return on Assets (ROA)",
    roe: "Return on Equity (ROE)",
    assetTurnover: "Asset Turnover",
    inventoryTurnover: "Inventory Turnover",
    debtRatio: "Debt Ratio",
    debtEquity: "Debt-to-Equity"
  }
};

// ========================
// تبديل اللغة
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const langBtn = document.getElementById("toggleLanguage");
  const darkBtn = document.getElementById("toggleDarkMode");
  const currencySelect = document.getElementById("currencySelect");

  if (langBtn) {
    langBtn.addEventListener("click", () => {
      currentLanguage = currentLanguage === "ar" ? "en" : "ar";
      document.documentElement.lang = currentLanguage;
      document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
      renderAdvancedIfNeeded();
    });
  }

  if (darkBtn) {
    darkBtn.addEventListener("click", () => {
      isDarkMode = !isDarkMode;
      document.body.classList.toggle("dark-mode", isDarkMode);
      document.body.classList.toggle("light-mode", !isDarkMode);
    });
  }

  if (currencySelect) {
    currencySelect.addEventListener("change", (e) => {
      currentCurrency = e.target.value;
      renderAdvancedIfNeeded();
    });
  }

  // Render advanced if we're on advanced.html
  renderAdvancedIfNeeded();
});

// ========================
// حساب النسب المالية
// ========================
function calculateRatios(financials) {
  return {
    liquidity: [
      {
        name: translations[currentLanguage].currentRatio,
        value: (financials.currentAssets / financials.currentLiabilities).toFixed(2),
        interpretation: "كلما زادت كان أفضل"
      },
      {
        name: translations[currentLanguage].quickRatio,
        value: ((financials.currentAssets - financials.inventory) / financials.currentLiabilities).toFixed(2),
        interpretation: "قياس أكثر تحفظًا للسيولة"
      }
    ],
    profitability: [
      {
        name: translations[currentLanguage].grossMargin,
        value: ((financials.grossProfit / financials.revenue) * 100).toFixed(2) + "%",
        interpretation: "هامش ربح من المبيعات"
      },
      {
        name: translations[currentLanguage].netMargin,
        value: ((financials.netIncome / financials.revenue) * 100).toFixed(2) + "%",
        interpretation: "نسبة صافي الربح"
      },
      {
        name: translations[currentLanguage].roa,
        value: ((financials.netIncome / financials.totalAssets) * 100).toFixed(2) + "%",
        interpretation: "العائد من الأصول"
      },
      {
        name: translations[currentLanguage].roe,
        value: ((financials.netIncome / financials.equity) * 100).toFixed(2) + "%",
        interpretation: "العائد من حقوق الملكية"
      }
    ],
    activity: [
      {
        name: translations[currentLanguage].assetTurnover,
        value: (financials.revenue / financials.totalAssets).toFixed(2),
        interpretation: "كفاءة استخدام الأصول"
      },
      {
        name: translations[currentLanguage].inventoryTurnover,
        value: (financials.cogs / financials.inventory).toFixed(2),
        interpretation: "سرعة دوران المخزون"
      }
    ],
    debt: [
      {
        name: translations[currentLanguage].debtRatio,
        value: (financials.totalLiabilities / financials.totalAssets).toFixed(2),
        interpretation: "نسبة الاعتماد على الديون"
      },
      {
        name: translations[currentLanguage].debtEquity,
        value: (financials.totalLiabilities / financials.equity).toFixed(2),
        interpretation: "هيكل رأس المال"
      }
    ]
  };
}

// ========================
// ملء advanced.html
// ========================
function renderAdvancedIfNeeded() {
  if (!document.getElementById("liquidityRatios")) return;

  const sampleFinancials = {
    currentAssets: 500000,
    currentLiabilities: 200000,
    inventory: 100000,
    grossProfit: 300000,
    revenue: 800000,
    netIncome: 120000,
    totalAssets: 1000000,
    equity: 400000,
    totalLiabilities: 600000,
    cogs: 500000
  };

  const ratios = calculateRatios(sampleFinancials);

  fillTable("liquidityRatios", ratios.liquidity);
  fillTable("profitabilityRatios", ratios.profitability);
  fillTable("activityRatios", ratios.activity);
  fillTable("debtRatios", ratios.debt);

  drawChart("liquidityChart", ratios.liquidity);
  drawChart("profitabilityChart", ratios.profitability);
  drawChart("activityChart", ratios.activity);
  drawChart("debtChart", ratios.debt);
}

// ========================
// ملء الجداول
// ========================
function fillTable(tableId, data) {
  const tbody = document.getElementById(tableId);
  if (!tbody) return;
  tbody.innerHTML = "";
  data.forEach((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.value}</td>
      <td>${item.interpretation}</td>
    `;
    tbody.appendChild(tr);
  });
}

// ========================
// الرسم البياني
// ========================
function drawChart(canvasId, data) {
  const ctx = document.getElementById(canvasId);
  if (!ctx) return;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.map((d) => d.name),
      datasets: [
        {
          label: translations[currentLanguage].value,
          data: data.map((d) => parseFloat(d.value)),
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}
