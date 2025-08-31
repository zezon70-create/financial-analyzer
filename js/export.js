function exportExcel(){ alert("سيتم التصدير إلى Excel بعد ربط مكتبة SheetJS"); }
function exportPDF(){ alert("سيتم التصدير إلى PDF بعد ربط مكتبة jsPDF"); }
document.getElementById('exportExcel')?.addEventListener('click', exportExcel);
document.getElementById('exportPDF')?.addEventListener('click', exportPDF);
