/* data.js - Data entry logic */
function createRow(code='', name='', debit=0, credit=0){ return { code: (code||''), name: (name||''), debit: (debit||0), credit: (credit||0) }; }

function evaluateCell(v){
  if(v === null || v === undefined) return 0;
  let s = String(v).trim();
  if(s === '') return 0;
  if(s.startsWith('=')){
    const expr = s.substring(1);
    try {
      if(expr.toUpperCase().startsWith('SUM(')){
        const inner = expr.substring(4).replace(/\)$/,'');
        const parts = inner.split(/[,;]+/).map(x=>parseFloat(x)||0);
        return parts.reduce((a,b)=>a+b,0);
      } else {
        const val = Function('"use strict";return (' + expr + ')')();
        return Number(val) || 0;
      }
    } catch(e){ return 0; }
  }
  return Number(s) || 0;
}

function renderTable(){
  const tb = loadTB();
  const body = document.getElementById('tbBody');
  if(!body) return;
  body.innerHTML = '';
  tb.forEach((r, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input data-idx="${idx}" data-field="code" value="${r.code}" /></td>
      <td><input data-idx="${idx}" data-field="name" value="${r.name}" /></td>
      <td><input data-idx="${idx}" data-field="debit" value="${r.debit}" /></td>
      <td><input data-idx="${idx}" data-field="credit" value="${r.credit}" /></td>
      <td><button class="delRow" data-idx="${idx}">Del</button></td>
    `;
    body.appendChild(tr);
  });

  document.querySelectorAll('#tbBody input').forEach(inp => {
    inp.addEventListener('change', (e) => {
      const idx = +e.target.dataset.idx;
      const field = e.target.dataset.field;
      const tb = loadTB();
      let val = e.target.value;
      if(field === 'debit' || field === 'credit') val = evaluateCell(val);
      tb[idx][field] = val;
      saveTB(tb);
      updateTotals();
    });
  });

  document.querySelectorAll('.delRow').forEach(b => b.addEventListener('click', (e) => {
    const idx = +e.target.dataset.idx;
    const tb = loadTB(); tb.splice(idx,1); saveTB(tb);
    renderTable(); updateTotals();
  }));

  updateTotals();
}

function updateTotals(){
  const tb = loadTB();
  const totalDebit = tb.reduce((s,r)=> s + (Number(r.debit)||0), 0);
  const totalCredit = tb.reduce((s,r)=> s + (Number(r.credit)||0), 0);
  const el = document.getElementById('tbTotals');
  if(el) el.textContent = `Debit: ${totalDebit.toLocaleString()}  |  Credit: ${totalCredit.toLocaleString()}`;
}

document.addEventListener('DOMContentLoaded', ()=> {
  if(loadTB().length === 0){
    const sample = [
      createRow('1000','Cash',12000,0),
      createRow('1100','AR',4000,0),
      createRow('2000','Bank Loan',0,5000),
      createRow('4000','Sales 2022',0,80000),
      createRow('4001','Sales 2023',0,90000),
      createRow('3000','COGS',30000,0)
    ];
    saveTB(sample);
  }

  renderTable();

  document.getElementById('addRowBtn')?.addEventListener('click', ()=>{
    const tb = loadTB(); tb.push(createRow()); saveTB(tb); renderTable();
  });
  document.getElementById('saveTbBtn')?.addEventListener('click', ()=>{
    alert('Saved'); renderTable();
  });

  document.getElementById('importExcelBtn')?.addEventListener('click', ()=> document.getElementById('fileInput').click());
  document.getElementById('fileInput')?.addEventListener('change', async (e)=>{
    const f = e.target.files[0]; if(!f) return;
    const data = await f.arrayBuffer();
    const wb = XLSX.read(data);
    const ws = wb.Sheets[wb.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(ws, {header:1});
    const rows = [];
    for(let i=1;i<json.length;i++){
      const r = json[i]; if(!r || r.length < 2) continue;
      rows.push(createRow(r[0]||'', r[1]||'', r[2]||0, r[3]||0));
    }
    if(rows.length){ saveTB(rows); renderTable(); alert('Imported ' + rows.length + ' rows'); }
  });

  document.getElementById('clearTbBtn')?.addEventListener('click', ()=>{
    if(confirm('Clear table?')){ saveTB([]); renderTable(); }
  });
});
