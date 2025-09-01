// Export PDF
document.getElementById('exportPDF')?.addEventListener('click',()=>{
    const element = document.getElementById('reportContainer');
    if(element) html2pdf().from(element).save('Financial_Report.pdf');
});

// Export Excel
document.getElementById('exportExcel')?.addEventListener('click',()=>{
    const element = document.getElementById('reportContainer');
    if(!element) return;
    const ws = XLSX.utils.table_to_sheet(element);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Report');
    XLSX.writeFile(wb,'Financial_Report.xlsx');
});
