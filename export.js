function exportStatementsToExcel(statementsObj, filename='financial_statements.xlsx'){
  if(!statementsObj) return alert('No data to export');
  const wb = XLSX.utils.book_new();
  for(const year of Object.keys(statementsObj.statements)){
    const s = statementsObj.statements[year];
    const rows = [
      ['Item','Value'],
      ['Assets', s.assets],
      ['Liabilities', s.liabilities],
      ['Equity', s.equity],
      ['Revenue', s.revenue],
      ['Expenses', s.expenses],
      ['Net Income', s.netIncome]
    ];
    const ws = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(wb, ws, String(year));
  }
  const wbout = XLSX.write(wb, {bookType:'xlsx', type:'array'});
  saveAs(new Blob([wbout], {type:'application/octet-stream'}), filename);
}

async function exportStatementsToPDF(statementsObj, filename='financial_statements.pdf'){
  if(!statementsObj) return alert('No data to export');
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;
  doc.setFontSize(14);
  doc.text('Financial Statements', 10, y); y += 8;
  for(const year of Object.keys(statementsObj.statements)){
    const s = statementsObj.statements[year];
    doc.setFontSize(12);
    doc.text(`Year: ${year}`, 10, y); y += 6;
    doc.setFontSize(10);
    doc.text(`Assets: ${s.assets}`, 10, y); y += 5;
    doc.text(`Liabilities: ${s.liabilities}`, 10, y); y += 5;
    doc.text(`Equity: ${s.equity}`, 10, y); y += 5;
    doc.text(`Revenue: ${s.revenue}`, 10, y); y += 5;
    doc.text(`Expenses: ${s.expenses}`, 10, y); y += 5;
    doc.text(`Net Income: ${s.netIncome}`, 10, y); y += 8;
    if(y > 270){ doc.addPage(); y = 10; }
  }
  doc.save(filename);
}

function downloadTemplate(){
  const rows = [['Account','Debit','Credit','Year (optional)'],
                ['Cash',1000,0,2024],
                ['Sales',0,5000,2024],
                ['COGS',2000,0,2024]];
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, 'Template');
  const wbout = XLSX.write(wb, {bookType:'xlsx', type:'array'});
  saveAs(new Blob([wbout], {type:'application/octet-stream'}), 'trialbalance_template.xlsx');
}
