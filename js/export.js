// export.js
async function downloadExcel(){
  // create worksheet from FA_DATA
  const ws = XLSX.utils.json_to_sheet(FA_DATA.map(r=>({Account:r.account, Debit:r.debit, Credit:r.credit})));
  const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, "TrialBalance");
  XLSX.writeFile(wb, `financial_analyzer_export_${Date.now()}.xlsx`);
}
document.getElementById('downloadExcel')?.addEventListener('click', downloadExcel);

async function downloadPDF(){
  // capture reportPreview or whole dashboard
  const el = document.getElementById('reportPreview') || document.body;
  const canvas = await html2canvas(el, {scale:2});
  const imgData = canvas.toDataURL('image/png');
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p','mm','a4');
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`financial_report_${Date.now()}.pdf`);
}
document.getElementById('downloadPDF')?.addEventListener('click', downloadPDF);

// attach export to input page too
document.getElementById('exportExcel')?.addEventListener('click', downloadExcel);
document.getElementById('exportPDF')?.addEventListener('click', downloadPDF);
