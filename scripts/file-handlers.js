// scripts/file-handlers.js
function escapeHTML(str){
  if (str === null || str === undefined) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
}

document.addEventListener('DOMContentLoaded', ()=>{

  // Elements
  const fileInput = document.getElementById('file-input');
  const parseBtn = document.getElementById('parseFile');
  const downloadTemplate = document.getElementById('downloadTemplate');
  const addRowBtn = document.getElementById('addRow');
  const tbBody = document.getElementById('tbBody');
  const saveSessionBtn = document.getElementById('saveSession');
  const loadSessionBtn = document.getElementById('loadSessionBtn');
  const clearAll = document.getElementById('clearAll');

  if (downloadTemplate) {
    downloadTemplate.addEventListener('click', ()=>{
      const csv = 'Account,AccountNumber,Debit,Credit\\nCash,101,1000,0\\nSales,401,0,1000\\n';
      const blob = new Blob([csv], {type:'text/csv'});
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download='sample_balance.csv'; a.click(); URL.revokeObjectURL(a.href);
    });
  }

  if (parseBtn && fileInput){
    parseBtn.addEventListener('click', ()=>{
      const file = fileInput.files[0];
      if (!file) { alert('اختر ملفًا أولاً'); return; }
      const name = file.name.toLowerCase();
      if (name.endsWith('.csv')){
        Papa.parse(file, {header:true, dynamicTyping:true, skipEmptyLines:true, complete: (res)=> handleParsedRows(res.data), error: (err)=>{alert('خطأ في قراءة CSV'); console.error(err);} });
      } else {
        // xlsx
        file.arrayBuffer().then(buf=>{
          const wb = XLSX.read(buf, {type:'array'});
          const ws = wb.Sheets[wb.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(ws, {defval:null});
          handleParsedRows(json);
        }).catch(e=>{alert('خطأ في قراءة الملف'); console.error(e);});
      }
    });
  }

  function handleParsedRows(rows){
    const clean = rows.map(r=>{
      const account = r['Account'] ?? r['account'] ?? r['الحساب'] ?? r['AccountName'] ?? '';
      const number = r['AccountNumber'] ?? r['رقم الحساب'] ?? '';
      const debit = Number(r['Debit'] ?? r['debit'] ?? r['مدين'] ?? 0) || 0;
      const credit = Number(r['Credit'] ?? r['credit'] ?? r['دائن'] ?? 0) || 0;
      return {account: escapeHTML(account), number, debit, credit};
    });
    renderTable(clean);
    alert('تم استيراد الملف بنجاح. راجع الجدول وقم بحفظ الجلسة.');
  }

  function renderTable(data){
    tbBody.innerHTML = '';
    data.forEach((row, idx)=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${row.account}</td><td>${row.number}</td><td>${row.debit}</td><td>${row.credit}</td>
      <td><button class="btn btn-sm btn-outline-danger remove-row">حذف</button></td>`;
      tbBody.appendChild(tr);
    });
    attachRemoveHandlers();
  }

  function attachRemoveHandlers(){
    document.querySelectorAll('.remove-row').forEach((btn,i)=>{
      btn.onclick = ()=> { btn.closest('tr').remove(); };
    });
  }

  if (addRowBtn){
    addRowBtn.addEventListener('click', ()=> {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td contenteditable>الحساب الجديد</td><td contenteditable></td><td contenteditable>0</td><td contenteditable>0</td><td><button class="btn btn-sm btn-outline-danger remove-row">حذف</button></td>`;
      tbBody.appendChild(tr);
      attachRemoveHandlers();
    });
  }

  if (saveSessionBtn){
    saveSessionBtn.addEventListener('click', async ()=>{
      const pass = prompt('ادخل كلمة مرور لتشفير الجلسة (اتركه فارغاً للحفظ بدون تشفير)');
      const rows = gatherTableRows();
      if (!pass) {
        localStorage.setItem('fa:data:v1', JSON.stringify({trial:rows}));
        alert('تم حفظ الجلسة محليًا (غير مشفرة).');
      } else {
        await window.secureSave('fa:data:v1', {trial:rows}, pass);
        alert('تم حفظ الجلسة محليًا ومشفرة.');
      }
    });
  }

  if (loadSessionBtn){
    loadSessionBtn.addEventListener('click', async ()=>{
      const pass = prompt('ادخل كلمة المرور إذا كانت الجلسة مشفرة، أو اضغط موافق إذا لم تكن مشفرة');
      let data = null;
      if (pass) data = await window.secureLoad('fa:data:v1', pass);
      else {
        try{ data = JSON.parse(localStorage.getItem('fa:data:v1')); }catch(e){ data=null; }
      }
      if (!data) return alert('لم يتم العثور على جلسة.');
      const rows = data.trial ?? data;
      renderTable(rows);
      alert('تم استرجاع الجلسة.');
    });
  }

  if (clearAll){
    clearAll.addEventListener('click', ()=> {
      if (!confirm('تأكيد مسح كل البيانات المحفوظة محلياً؟')) return;
      localStorage.removeItem('fa:data:v1'); alert('تم المسح.');
      location.reload();
    });
  }

  function gatherTableRows(){
    const rows = [];
    tbBody.querySelectorAll('tr').forEach(tr=>{
      const tds = tr.querySelectorAll('td');
      const acc = tds[0]?.textContent.trim() ?? '';
      const num = tds[1]?.textContent.trim() ?? '';
      const dr  = Number(tds[2]?.textContent.trim()) || 0;
      const cr  = Number(tds[3]?.textContent.trim()) || 0;
      rows.push({account: acc, accountNumber: num, debit: dr, credit: cr});
    });
    return rows;
  }

});
