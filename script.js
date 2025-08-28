// دعم اللغة
function switchLanguage(lang){
  if(lang === 'en'){
    document.documentElement.lang = 'en';
    alert("Language switched to English (UI text not translated fully in this demo).");
  } else {
    document.documentElement.lang = 'ar';
  }
}

// حفظ البيانات من data-entry.html
document.getElementById("trialBalanceForm")?.addEventListener("submit", function(e){
  e.preventDefault();
  const assets = eval(document.getElementById("assets").value);
  const liabilities = eval(document.getElementById("liabilities").value);
  const equity = eval(document.getElementById("equity").value);
  const netIncome = eval(document.getElementById("netIncome").value);

  const financialData = {
    totalAssets: assets,
    totalLiabilities: liabilities,
    equity: equity,
    netIncome: netIncome,
    currentRatio: assets/liabilities,
    debtRatio: liabilities/assets
  };
  localStorage.setItem("financialData", JSON.stringify(financialData));
  alert("تم حفظ البيانات بنجاح!");
});

// تصدير Excel
document.getElementById("exportExcel")?.addEventListener("click", function() {
  const data = JSON.parse(localStorage.getItem("financialData"));
  if(!data) return alert("لا توجد بيانات للتصدير!");
  const wb = XLSX.utils.book_new();
  const wsData = [
    ["البند", "القيمة"],
    ["إجمالي الأصول", data.totalAssets],
    ["إجمالي الخصوم", data.totalLiabilities],
    ["حقوق الملكية", data.equity],
    ["صافي الربح", data.netIncome],
    ["النسبة الحالية", data.currentRatio],
    ["نسبة الدين", data.debtRatio]
  ];
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  XLSX.utils.book_append_sheet(wb, ws, "Analysis");
  XLSX.writeFile(wb, "FinancialAnalysis.xlsx");
});

// تصدير PDF
document.getElementById("exportPDF")?.addEventListener("click", function() {
  const data = JSON.parse(localStorage.getItem("financialData"));
  if(!data) return alert("لا توجد بيانات للتصدير!");
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Financial Analysis", 20, 20);
  doc.setFontSize(12);
  let y = 30;
  for (const [key, value] of Object.entries(data)) {
    doc.text(`${key}: ${value.toLocaleString()}`, 20, y);
    y += 10;
  }
  doc.save("FinancialAnalysis.pdf");
});
