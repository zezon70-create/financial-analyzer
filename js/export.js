function exportExcel(){
    alert("ميزة تصدير Excel سيتم تنفيذها باستخدام مكتبة SheetJS");
}

function exportPDF(){
    alert("ميزة تصدير PDF سيتم تنفيذها باستخدام مكتبة jsPDF");
}

document.getElementById('exportExcel')?.addEventListener('click', exportExcel);
document.getElementById('exportPDF')?.addEventListener('click', exportPDF);
