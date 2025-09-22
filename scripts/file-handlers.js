// scripts/file-handlers.js
function escapeHTML(str){
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

document.addEventListener('DOMContentLoaded', ()=>{
  const input = document.getElementById('file-input');
  const sampleBtn = document.getElementById('download-sample');
  const saveBtn = document.getElementById('save-local');
  const exportExcelBtn = document.getElementById('export-excel');
  const clearBtn = document.getElementById('clear-data');
  const exportPdfBtn = document.getElementById('export-pdf');

  if (input){
    input.addEventListener('change', async (e)=>{
      const file = e.target.files[0];
      if (!file) return;
      const name = file.name.toLowerCase();
      if (name.endsWith('.csv')){
        Papa.parse(file, {
          header:true, dynamicTyping: true, skipEmptyLines:true, worker:true,
          complete: function(results){ handleParsedRows(results.data); },
          error: function(err){ alert('خطأ في قراءة ملف CSV'); console.error(err); }
        });
      } else if (name.endsWith('.xlsx') || name.endsWith('.xls')){
        const data = await file.arrayBuffer();
        const wb = XLSX.read(data, {type:'array'});
        const firstSheetName = wb.SheetNames[0];
        const ws = wb.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(ws, {defval: null});
        handleParsedRows(json);
      } else {
        alert('الملف غير مدعوم. استخدم CSV أو XLSX.');
      }
    });
  }

  if (sampleBtn){
    sampleBtn.addEventListener('click', ()=>{
      const csv = 'Account,Debit,Credit\\nCash,1000,0\\nSales,0,1000\\n';
      const blob = new Blob([csv], {type: 'text/csv'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'sample_balance.csv'; a.click(); URL.revokeObjectURL(url);
    });
  }

  if (saveBtn){
    saveBtn.addEventListener('click', async ()=>{
      const pass = prompt('ادخل كلمة مرور تشفير الجلسة (اختياري)');
      const rows = gatherTableRows();
      if (!pass){ alert('لم يتم ادخال كلمة مرور. تم حفظ البيانات بدون تشفير.'); localStorage.setItem('fa:data:v1', JSON.stringify(rows)); return; }
      await window.secureSave('fa:data:v1', rows, pass);
      alert('تم حفظ الجلسة محليًا مشفّرة.');
    });
  }

  if (exportExcelBtn){
    exportExcelBtn.addEventListener('click', ()=>{
      const rows = gatherTableRows();
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(rows);
      XLSX.utils.book_append_sheet(wb, ws, 'Balance');
      XLSX.writeFile(wb, 'Financial-Report.xlsx');
    });
  }

  if (clearBtn){
    clearBtn.addEventListener('click', ()=>{
      if (!confirm('هل أنت متأكد أنك تريد مسح كل البيانات؟ هذا الإجراء لا يمكن التراجع عنه.')) return;
      window.clearAllData();
      localStorage.clear();
      alert('تم مسح بيانات التطبيق محليًا.');
      location.reload();
    });
  }

  if (exportPdfBtn){
    exportPdfBtn.addEventListener('click', ()=>{
      // rely on pdf-export.js implementation
      if (window.makePdfReport) window.makePdfReport();
      else alert('ميزة PDF غير متاحة الآن.');
    });
  }
});

function gatherTableRows(){
  const tbody = document.querySelector('#data-table tbody');
  if (!tbody) return [];
  const rows = Array.from(tbody.querySelectorAll('tr')).map(tr=>{
    return {
      Account: tr.children[0].textContent.trim(),
      Debit: Number(tr.children[1].textContent.trim()) || 0,
      Credit: Number(tr.children[2].textContent.trim()) || 0
    };
  });
  // if table empty, attempt to load from localStorage (non-encrypted)
  if (!rows.length){
    try{
      const raw = localStorage.getItem('fa:data:v1');
      if (raw) return JSON.parse(raw);
    }catch(e){}
  }
  return rows;
}

function handleParsedRows(rows){
  const errors = [];
  const clean = rows.map((r,i)=>{
    const account = r['Account'] ?? r['account'] ?? r['الحساب'] ?? '';
    const debit = Number(r['Debit'] ?? r['debit'] ?? r['مدين'] ?? 0) || 0;
    const credit = Number(r['Credit'] ?? r['credit'] ?? r['دائن'] ?? 0) || 0;
    if (!account) errors.push(`صف ${i+1}: اسم الحساب مفقود`);
    return {account: escapeHTML(account), debit, credit};
  });
  if (errors.length){
    alert('وجد أخطاء فى الملف:\\n' + errors.slice(0,10).join('\\n'));
    console.warn('file errors', errors);
  }
  renderTable(clean);
}

function renderTable(data){
  const tbody = document.querySelector('#data-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  data.forEach(row=>{
    const tr = document.createElement('tr');
    const tdAcc = document.createElement('td'); tdAcc.textContent = row.account; tr.appendChild(tdAcc);
    const tdDr = document.createElement('td'); tdDr.textContent = row.debit; tr.appendChild(tdDr);
    const tdCr = document.createElement('td'); tdCr.textContent = row.credit; tr.appendChild(tdCr);
    tbody.appendChild(tr);
  });
}
