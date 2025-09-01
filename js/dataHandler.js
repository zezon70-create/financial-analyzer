// dataHandler.js
let FA_DATA = JSON.parse(localStorage.getItem('FA_DATA_v1')) || []; // [{account,debit,credit}]
const alertsDiv = document.getElementById('alerts');
const tableWrapper = document.getElementById('tableWrapper');

function pushAlert(msg, type='warning'){ alertsDiv.innerHTML = `<div class="alert">${msg}</div>`; setTimeout(()=>alertsDiv.innerHTML='',6000); }

function saveFA(){ localStorage.setItem('FA_DATA_v1', JSON.stringify(FA_DATA)); }
function clearFA(){ FA_DATA = []; saveFA(); renderTable(); pushAlert('تم مسح البيانات', 'info'); }

function addRow(account,debit,credit){
  if(!account || (isNaN(debit) || isNaN(credit))) { pushAlert('البيانات غير صحيحة'); return false; }
  FA_DATA.push({account:account.trim(), debit: Number(debit), credit: Number(credit)});
  saveFA(); renderTable(); return true;
}

function renderTable(){
  if(!tableWrapper) return;
  if(FA_DATA.length===0){ tableWrapper.innerHTML = '<p>لا توجد بيانات بعد</p>'; return; }
  let html = `<table><thead><tr><th>الحساب</th><th>مدين</th><th>دائن</th><th>الإجراء</th></tr></thead><tbody>`;
  FA_DATA.forEach((r,i)=>{
    html += `<tr>
      <td contenteditable data-i="${i}" data-field="account">${r.account}</td>
      <td contenteditable data-i="${i}" data-field="debit">${r.debit}</td>
      <td contenteditable data-i="${i}" data-field="credit">${r.credit}</td>
      <td><button class="btn ghost" onclick="deleteRow(${i})">حذف</button></td>
    </tr>`;
  });
  html += '</tbody></table>';
  tableWrapper.innerHTML = html;
  // add listeners for inline edit
  document.querySelectorAll('[contenteditable]').forEach(cell=>{
    cell.addEventListener('blur', (e)=>{
      const i = Number(e.target.dataset.i), field = e.target.dataset.field, val = e.target.textContent.trim();
      if(field==='account'){ FA_DATA[i].account = val; }
      else { const num = parseFloat(val||0); FA_DATA[i][field] = isNaN(num)?0:num; }
      saveFA(); renderTable(); // re-render to keep format
    });
  });
}

function deleteRow(i){
  FA_DATA.splice(i,1); saveFA(); renderTable();
}

// handle form
document.getElementById('dataForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const acc = document.getElementById('accountName').value;
  const deb = parseFloat(document.getElementById('debit').value||0);
  const cred = parseFloat(document.getElementById('credit').value||0);
  if(addRow(acc, deb, cred)){
    document.getElementById('accountName').value=''; document.getElementById('debit').value='0'; document.getElementById('credit').value='0';
  }
});

// file import
document.getElementById('importBtn')?.addEventListener('click', ()=>{
  const f = document.getElementById('fileInput').files[0];
  if(!f) { pushAlert('الرجاء اختيار ملف'); return; }
  const reader = new FileReader();
  reader.onload = (ev)=>{
    try{
      const data = new Uint8Array(ev.target.result);
      const workbook = XLSX.read(data, {type:'array'});
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, {header:['account','debit','credit'], range:1});
      let imported = 0;
      json.forEach(row=>{
        const acc = row.account, deb = Number(row.debit||0), cred = Number(row.credit||0);
        if(acc) { FA_DATA.push({account:acc, debit:deb, credit:cred}); imported++; }
      });
      saveFA(); renderTable(); pushAlert(`تم استيراد ${imported} سطر`,'info');
    }catch(err){
      console.error(err);
      pushAlert('فشل قراءة الملف: تأكد أنه Excel/CSV مطابق للتنسيق');
    }
  };
  reader.readAsArrayBuffer(f);
});

// clear all
document.getElementById('clearAll')?.addEventListener('click', ()=>{
  if(confirm('هل تريد حذف كل البيانات؟')) clearFA();
});

// save/load session
document.getElementById('saveSession')?.addEventListener('click', ()=>{ saveFA(); pushAlert('تم حفظ الجلسة'); });
document.getElementById('loadSession')?.addEventListener('click', ()=>{ FA_DATA = JSON.parse(localStorage.getItem('FA_DATA_v1'))||[]; renderTable(); pushAlert('تم تحميل الجلسة'); });

// initial render
renderTable();
