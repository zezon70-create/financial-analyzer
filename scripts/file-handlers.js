// scripts/file-handlers.js
// parsing CSV/XLSX and mapping columns

function mapRow(row){
  return {
    account: row.account || row.Account || row['الحساب'] || row['Account'] || '',
    accountNumber: row.accountNumber || row['رقم الحساب'] || row['AccountNumber'] || '',
    debit: Number(row.debit || row.Debit || row['مدين'] || row['Debit'] || 0),
    credit: Number(row.credit || row.Credit || row['دائن'] || row['Credit'] || 0)
  };
}

function parseCSVFile(file, cb){
  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function(results){
      const mapped = results.data.map(mapRow);
      cb(mapped);
    },
    error: function(err){
      cb(null, err);
    }
  });
}

function parseExcelFile(file, cb){
  const reader = new FileReader();
  reader.onload = function(e){
    try{
      const wb = XLSX.read(e.target.result, {type:'binary'});
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws, {defval:0});
      const mapped = data.map(mapRow);
      cb(mapped);
    }catch(err){
      cb(null, err);
    }
  };
  reader.readAsBinaryString(file);
}
