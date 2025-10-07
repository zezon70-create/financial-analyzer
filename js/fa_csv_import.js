

// Use Web Worker for parsing large CSVs if available
function parseCSVtoTableUsingWorker(csvText, tableSelector){
  return new Promise((resolve, reject)=>{
    if(window.Worker){
      try{
        const w = new Worker('js/worker_parser.js');
        w.postMessage({cmd:'parseCSV', payload: csvText});
        w.onmessage = function(ev){
          const d = ev.data;
          if(d.status === 'ok'){
            // build table
            const rows = d.rows || [];
            const table = document.querySelector(tableSelector);
            if(!table){ resolve(false); return; }
            const tbody = table.querySelector('tbody') || (function(){ const b = document.createElement('tbody'); table.appendChild(b); return b; })();
            tbody.innerHTML = '';
            rows.forEach(cols=>{
              const tr = document.createElement('tr');
              const acc = cols[0]||'';
              const debit = cols[1]||'0';
              const credit = cols[2]||'0';
              tr.innerHTML = `<td>${acc}</td><td>${debit}</td><td>${credit}</td>`;
              tbody.appendChild(tr);
            });
            resolve(true);
          } else {
            resolve(false);
          }
          w.terminate();
        };
        w.onerror = function(err){
          console.error('worker error', err);
          w.terminate();
          resolve(false);
        };
      }catch(e){
        console.warn('worker failed', e);
        resolve(false);
      }
    } else {
      // no worker
      resolve(false);
    }
  });
}

// Modify existing parseCSVtoTable to try worker first for big files
const _orig_parseCSVtoTable = typeof parseCSVtoTable === 'function' ? parseCSVtoTable : null;
function parseCSVtoTable(csvText, tableSelector){
  // if large text, try worker
  if(csvText.length > 20000 && window.Worker){
    return parseCSVtoTableUsingWorker(csvText, tableSelector).then(success=>{
      if(success) return true;
      // fallback to original implementation if exists
      if(_orig_parseCSVtoTable) return _orig_parseCSVtoTable(csvText, tableSelector);
      return false;
    });
  } else {
    if(_orig_parseCSVtoTable) return _orig_parseCSVtoTable(csvText, tableSelector);
    // basic fallback: split & append
    const rows = csvText.split(/\\r?\\n/).map(r=>r.trim()).filter(r=>r.length>0);
    const table = document.querySelector(tableSelector);
    if(!table) return false;
    const tbody = table.querySelector('tbody') || (function(){ const b = document.createElement('tbody'); table.appendChild(b); return b; })();
    tbody.innerHTML = '';
    rows.forEach((r, idx)=>{
      const cols = r.split(',');
      const tr = document.createElement('tr');
      const acc = cols[0]||('');
      const debit = cols[1]||'0';
      const credit = cols[2]||'0';
      tr.innerHTML = `<td>${acc}</td><td>${debit}</td><td>${credit}</td>`;
      tbody.appendChild(tr);
    });
    return true;
  }
}

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
  if(!f) { showToast('Select a CSV file','error'); return; }
  const reader = new FileReader();
  reader.onload = function(e){
    const txt = e.target.result;
    const ok = parseCSVtoTable(txt, tableSelector);
    if(ok) showToast('CSV loaded into table. Please validate and compute.','error');
  }
  reader.readAsText(f, 'utf-8');
}
