// export-server.js
const XLSX = require('xlsx');
const PDFDocument = require('pdfkit');

function parseUploadedWorkbook(buffer){
  const workbook = XLSX.read(buffer, {type:'buffer'});
  const firstSheet = workbook.SheetNames[0];
  const ws = workbook.Sheets[firstSheet];
  const arr = XLSX.utils.sheet_to_json(ws, {header:1});
  return parseArrayRows(arr);
}

function parseCSVText(text){
  const lines = text.split(/\r?\n/).filter(l=>l.trim());
  const arr = lines.map(l => l.split(',').map(s=>s.trim()));
  return parseArrayRows(arr);
}

function parseArrayRows(rows){
  const parsed = [];
  for(let i=0;i<rows.length;i++){
    const row = rows[i];
    if(!row || row.length < 2) continue;
    if(i===0 && /account|debit|credit|acc|حساب/i.test(row.join(' '))) continue;
    const account = row[0] || '';
    const debit = Number(row[1] || 0) || 0;
    const credit = Number(row[2] || 0) || 0;
    const year = row[3] ? String(row[3]) : undefined;
    parsed.push({ account: account.trim(), debit, credit, year });
  }
  return parsed;
}

function buildExcelBuffer(statementsObj){
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
  const wbout = XLSX.write(wb, { bookType:'xlsx', type:'buffer' });
  return wbout;
}

async function buildPdfBufferAsync(statementsObj){
  return new Promise((resolve, reject)=>{
    try{
      const doc = new PDFDocument({ margin: 30 });
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', ()=> resolve(Buffer.concat(buffers)));

      doc.fontSize(18).text('Financial Statements', { underline:true });
      doc.moveDown(0.5);

      for(const year of Object.keys(statementsObj.statements)){
        const s = statementsObj.statements[year];
        doc.fontSize(12).text(`Year: ${year}`);
        doc.fontSize(10).text(`Assets: ${s.assets}`);
        doc.text(`Liabilities: ${s.liabilities}`);
        doc.text(`Equity: ${s.equity}`);
        doc.text(`Revenue: ${s.revenue}`);
        doc.text(`Expenses: ${s.expenses}`);
        doc.text(`Net Income: ${s.netIncome}`);
        doc.moveDown(0.5);
      }

      doc.end();
    } catch(e){
      reject(e);
    }
  });
}

module.exports = { parseUploadedWorkbook, parseCSVText, parseArrayRows, buildExcelBuffer, buildPdfBufferAsync };
