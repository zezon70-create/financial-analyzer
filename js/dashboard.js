// Export Excel
document.getElementById('exportExcel')?.addEventListener('click', ()=>{
    const wb = XLSX.utils.book_new();
    const ws_data = [
        ['العنصر','القيمة'],
        ['الإيرادات', document.getElementById('revenue').value],
        ['المصروفات', document.getElementById('expenses').value],
        ['الأصول', document.getElementById('assets').value],
        ['الخصوم', document.getElementById('liabilities').value],
        ['صافي الربح', document.getElementById('profit').textContent.split(': ')[1]]
    ];
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Financial Report");
    XLSX.writeFile(wb,"FinancialReport.xlsx");
});

// Export PDF
document.getElementById('exportPDF')?.addEventListener('click', ()=>{
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("تقرير المحلل المالي", 10, 10);
    doc.text(document.getElementById('profit').textContent, 10, 20);
    doc.text(document.getElementById('roi').textContent, 10, 30);
    doc.text(document.getElementById('deRatio').textContent, 10, 40);
    doc.save("FinancialReport.pdf");
});
