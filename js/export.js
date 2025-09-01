// export.js - build excel and pdf from data
async function exportExcelPackage({trialRows, incomeRows, balanceRows, cashRows, ratiosRows, notesRows}){
  const wb = XLSX.utils.book_new();
  if(trialRows) XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(trialRows), 'TrialBalance');
  if(incomeRows) XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(incomeRows), 'IncomeStatement');
  if(balanceRows) XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(balanceRows), 'BalanceSheet');
  if(cashRows) XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(cashRows), 'CashFlow');
  if(ratiosRows) XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(ratiosRows), 'Ratios');
  if(notesRows) XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(notesRows), 'Notes');
  XLSX.writeFile(wb, `Financial_Report_${Date.now()}.xlsx`);
}

async function buildReportPreview({logo='', notes='', inc, bs, ratios}){
  const el = document.createElement('div');
  el.style.padding = '12px';
  el.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div>
        <h2>تقرير التحليل المالي</h2>
        <div>${new Date().toLocaleString()}</div>
      </div>
      <div>${logo ? `<img src="assets/${escapeHtml(logo)}" style="height:60px" onerror="this.style.display='none'">` : ''}</div>
    </div>
    <hr/>
    <h3>قائمة الدخل</h3>
    <div>Revenue: ${fmtNumber(inc.revenue)} | Net Profit: ${fmtNumber(inc.netProfit)}</div>
    <h3>Balance Sheet</h3>
    <div>Assets: ${fmtNumber(bs.assets)} | Liabilities: ${fmtNumber(bs.liabilities)} | Equity: ${fmtNumber(bs.equity)}</div>
    <h3>Key Ratios</h3>
    <div>Gross Margin: ${(ratios.grossMargin*100).toFixed(2)}% | Net Margin: ${(ratios.netMargin*100).toFixed(2)}%</div>
    <h3>Notes</h3>
    <div>${escapeHtml(notes)}</div>
  `;
  return el;
}

async function exportPDFFromElement(el, filename='report.pdf'){
  const canvas = await html2canvas(el, {scale:2});
  const img = canvas.toDataURL('image/png');
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p','mm','a4');
  const prop = pdf.getImageProperties(img);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (prop.height * pdfWidth) / prop.width;
  pdf.addImage(img,'PNG',0,0,pdfWidth,pdfHeight);
  pdf.save(filename);
}

// small helper
function fmtNumber(n){ return Number(n||0).toLocaleString(); }
