// scripts/pdf-export.js
document.addEventListener('DOMContentLoaded', ()=>{
  const exportPdfBtns = document.querySelectorAll('#exportPdf, #exportPdfBtn');
  exportPdfBtns.forEach(btn=>{
    btn && btn.addEventListener('click', ()=> {
      makePdfReport();
    });
  });
});

function getLogoDataUrl(callback){
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = 'assets/img/logo.png';
  img.onload = ()=> {
    const c = document.createElement('canvas');
    const scale = 0.6;
    c.width = img.naturalWidth * scale; c.height = img.naturalHeight * scale;
    const ctx = c.getContext('2d'); ctx.drawImage(img,0,0,c.width,c.height);
    callback(c.toDataURL('image/png'));
  };
  img.onerror = ()=> callback(null);
}

async function makePdfReport(){
  const { jsPDF } = window.jspdf ?? window.jspdf || { jsPDF: window.jspdf };
  const doc = new jsPDF();
  // watermark
  getLogoDataUrl((dataUrl)=>{
    if (dataUrl) {
      const pageW = doc.internal.pageSize.getWidth();
      const pageH = doc.internal.pageSize.getHeight();
      const w = 180, h = 180 * 0.4;
      doc.addImage(dataUrl,'PNG',(pageW-w)/2,(pageH-h)/2,w,h,'','FAST');
      doc.setFontSize(12);
      doc.text('تقرير مالي — Financial Analyzer', 14, 20);
    } else {
      doc.text('تقرير مالي — Financial Analyzer', 14, 20);
    }
    // محتوى تقرير مبسط: نأخذ معاينة إن وجدت
    const preview = document.getElementById('previewTable');
    if (preview) {
      doc.setFontSize(10);
      doc.text(preview.textContent || 'لا توجد بيانات للمعاينة', 14, 40);
    }
    doc.save('Financial-Report.pdf');
  });
}
