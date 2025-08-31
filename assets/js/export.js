/* export.js - export to Excel & PDF */
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('exportExcelBtn')?.addEventListener('click', ()=> {
    const tb = loadTB();
    if(!tb || !tb.length) { alert('No data'); return; }
    const ws = XLSX.utils.json_to_sheet(tb.map(r=>({Code:r.code, Name:r.name, Debit:r.debit, Credit:r.credit})));
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'TrialBalance');
    XLSX.writeFile(wb, 'trial_balance.xlsx');
  });

  document.getElementById('exportExcelFull')?.addEventListener('click', ()=> {
    const bs = document.getElementById('balanceSheet')?.textContent || '';
    const is = document.getElementById('incomeStatement')?.textContent || '';
    const cf = document.getElementById('cashFlow')?.textContent || '';
    const ratios = document.getElementById('ratiosOut')?.textContent || '';
    const ws = XLSX.utils.aoa_to_sheet([['Balance Sheet', bs], ['Income Statement', is], ['Cash Flow', cf], ['Ratios', ratios]]);
    const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, 'financial_report.xlsx');
  });

  document.getElementById('exportPdfFull')?.addEventListener('click', async ()=> {
    const node = document.querySelector('.main');
    if(!node) return;
    const canvas = await html2canvas(node, {scale:2});
    const img = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'pt', 'a4');
    const imgProps = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('financial_report.pdf');
  });

  document.getElementById('exportPdfDash')?.addEventListener('click', async ()=>{
    const node = document.querySelector('.main');
    if(!node) return;
    const canvas = await html2canvas(node, {scale:2});
    const img = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'pt', 'a4');
    const imgProps = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('dashboard.pdf');
  });
});