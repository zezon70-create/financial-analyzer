document.getElementById("exportExcel")?.addEventListener("click", () => {
  const wb = XLSX.utils.book_new();
  const ws_data = [
    ["الإيرادات", document.getElementById("revenue")?.value || 0],
    ["المصروفات", document.getElementById("expenses")?.value || 0],
    ["الأصول", document.getElementById("assets")?.value || 0],
    ["الخصوم", document.getElementById("liabilities")?.value || 0],
    ["صافي الربح", document.getElementById("profit")?.textContent || 0]
  ];
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  XLSX.utils.book_append_sheet(wb, ws, "Results");
  XLSX.writeFile(wb, "Financial_Report.xlsx");
});

document.getElementById("exportPDF")?.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text(document.getElementById("profit")?.textContent || "", 10, 10);
  doc.text(document.getElementById("roi")?.textContent || "", 10, 20);
  doc.text(document.getElementById("deRatio")?.textContent || "", 10, 30);
  doc.save("Financial_Report.pdf");
});
