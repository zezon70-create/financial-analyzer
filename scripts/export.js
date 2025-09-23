// scripts/export.js
// Uses SheetJS and html2canvas + jsPDF (CDN linked in pages as needed)

// export trial array to CSV
function exportTrialCSV(rows, filename='trial_balance.csv'){
  const header = ['الحساب','رقم الحساب','مدين','دائن'];
  const lines = [header.join(',')];
  rows.forEach(r => {
    lines.push([r.account,r.accountNumber,r.debit,r.credit].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(','));
  });
  const blob = new Blob([lines.join('\n')], {type:'text/csv;charset=utf-8;'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

// export trial to XLSX using SheetJS
function exportTrialXLSX(rows, filename='trial_balance.xlsx'){
  const ws_data = [['الحساب','رقم الحساب','مدين','دائن'], ...rows.map(r=>[r.account,r.accountNumber,r.debit,r.credit])];
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(ws_data);
  XLSX.utils.book_append_sheet(wb, ws, 'trial');
  XLSX.writeFile(wb, filename);
}

// export full report to PDF (uses html2canvas + jsPDF)
async function exportReportPdf(domElement, filename='financial_report.pdf'){
  // lazy load html2canvas and jsPDF via CDN if not present
  if(typeof html2canvas === 'undefined' || typeof jspdf === 'undefined'){
    // load scripts dynamically
    await loadScript('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
  }

  // capture
  const canvas = await html2canvas(domElement, {scale:2, useCORS:true});
  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const { jsPDF } = window.jspdf || window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageHeight = 297;
  const pageWidth = 210;
  const imgProps = pdf.getImageProperties(imgData);
  const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;
  if(pdfHeight <= pageHeight){
    pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pdfHeight);
  } else {
    // paginate
    let position = 0;
    let remainingHeight = imgProps.height;
    const ratio = pageWidth / imgProps.width;
    while(remainingHeight > 0){
      pdf.addImage(imgData, 'JPEG', 0, position, pageWidth, pdfHeight);
      remainingHeight -= pageHeight/ratio;
      position -= pageHeight;
      if(remainingHeight > 0) pdf.addPage();
    }
  }
  pdf.save(filename);
}

// utility to load script
function loadScript(url){
  return new Promise((res, rej)=>{
    const s = document.createElement('script');
    s.src = url;
    s.onload = res;
    s.onerror = rej;
    document.head.appendChild(s);
  });
}
