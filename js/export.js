// Excel Export
function exportToExcel(){
    const ws_data = financialData.map(d => [d.account, d.debit, d.credit]);
    ws_data.unshift(["Account","Debit","Credit"]);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Financial Data");
    XLSX.writeFile(wb, "financial_data.xlsx");
}

// PDF Export
function exportToPDF(){
    const doc = new jsPDF();
    doc.text("Financial Data", 10, 10);
    financialData.forEach((d, i) => {
        doc.text(`${d.account} - Debit: ${d.debit} - Credit: ${d.credit}`, 10, 20 + (i*10));
    });
    doc.save("financial_data.pdf");
}
