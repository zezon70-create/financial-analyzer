// scripts/pdf-export.js
document.addEventListener('DOMContentLoaded', ()=>{
  // prepare watermark image data (load from assets)
  const logoPath = 'assets/img/logo.png';
  // pre-load image as data URL
  const img = new Image();
  img.src = logoPath;
  img.onload = ()=>{ window._fa_logo_data = getDataUrlFromImage(img); };
  img.onerror = ()=>{ console.warn('logo load failed for watermark'); };

  const btn = document.getElementById('export-pdf');
  if (btn) btn.addEventListener('click', ()=>{ if (window.makePdfReport) window.makePdfReport(); else makePdfReport(); });
});

function getDataUrlFromImage(img){
  try{
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img,0,0);
    return c.toDataURL('image/png');
  }catch(e){ console.error(e); return null; }
}

window.makePdfReport = function(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({unit:'pt', format:'a4'});
  const rows = gatherTableRows();
  // add watermark background if available
  const watermark = window._fa_logo_data;
  if (watermark){
    // add faint watermark centered on each page
    const imgProps = new Image();
    imgProps.src = watermark;
    imgProps.onload = ()=>{
      const w = 200;
      const h = (imgProps.naturalHeight/imgProps.naturalWidth) * w;
      doc.setGState ? doc.setGState(new doc.GState({opacity:0.08})) : null;
      // fallback: draw with transparency by setting globalAlpha via canvas trick not available; use jpg with low opacity if needed
      // Place watermark centered
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.addImage(watermark, 'PNG', (pageWidth-w)/2, (pageHeight-h)/2, w, h, undefined, 'NONE');
      addContentAndSave(doc, rows);
    };
    imgProps.onerror = ()=>{ addContentAndSave(doc, rows); };
  } else {
    addContentAndSave(doc, rows);
  }
};

function addContentAndSave(doc, rows){
  doc.setFontSize(14);
  doc.text('تقرير مالي - Financial Analyzer', 40, 50);
  doc.setFontSize(10);
  let y = 80;
  doc.text('المحتويات:', 40, y); y+=16;
  rows.forEach((r, idx)=>{
    const line = `${idx+1}. ${r.Account} - Dr:${r.Debit} Cr:${r.Credit}`;
    // split text if long
    const split = doc.splitTextToSize(line, 500);
    doc.text(split, 40, y); y += (split.length*12 + 6);
    if (y > 740){ doc.addPage(); y = 40; }
  });
  doc.save('Financial-Report.pdf');
}
