
// CSV import helper: convert CSV to trial-balance table
function parseCSVtoTable(csvText, tableSelector){
  const rows = csvText.split(/\r?\n/).map(r=>r.trim()).filter(r=>r.length>0);
  const table = document.querySelector(tableSelector);
  if(!table) return false;
  const tbody = table.querySelector('tbody') || (function(){ const b=document.createElement('tbody'); table.appendChild(b); return b; })();
  tbody.innerHTML = '';
  rows.forEach((r, idx)=>{
    const cols = r.split(',');
    const tr = document.createElement('tr');
    // assume format: account,debit,credit
    const acc = cols[0]||('');
    const debit = cols[1]||'0';
    const credit = cols[2]||'0';
    tr.innerHTML = `<td>${acc}</td><td>${debit}</td><td>${credit}</td>`;
    tbody.appendChild(tr);
  });
  return true;
}
function handleCSVFileInput(inputElement, tableSelector){
  const f = inputElement.files && inputElement.files[0];
  if(!f) { alert('Select a CSV file'); return; }
  const reader = new FileReader();
  reader.onload = function(e){
    const txt = e.target.result;
    const ok = parseCSVtoTable(txt, tableSelector);
    if(ok) alert('CSV loaded into table. Please validate and compute.');
  }
  reader.readAsText(f, 'utf-8');
}
