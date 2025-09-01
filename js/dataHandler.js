// dataHandler.js
let FA_DATA = JSON.parse(localStorage.getItem('FA_DATA_v1')) || []; // each {account,debit,credit}
const alertsDiv = document.getElementById('alerts');
const tableWrapper = document.getElementById('tableWrapper');

function pushAlert(msg, type='info'){ if(alertsDiv) alertsDiv.innerHTML = `<div class="alert">${msg}</div>`; setTimeout(()=>{ if(alertsDiv) alertsDiv.innerHTML=''; },6000); }
function saveFA(){ localStorage.setItem('FA_DATA_v1', JSON.stringify(FA_DATA)); }
function clearFA(){ FA_DATA = []; saveFA(); renderTable(); pushAlert('تم مسح البيانات', 'info'); }

function addRow(account,debit,credit){
  if(!account || (isNaN(debit) || isNaN(credit))){ pushAlert('البيانات غير صحيحة'); return false; }
  FA_DATA.push({account:account.trim(), debit: Number(debit), credit: Number(credit)});
  saveFA(); renderTable(); window.dispatchEvent(new Event('storage')); return true;
}

function renderTable(){
  if(!tableWrapper) return;
  if(FA_DATA.length === 0){ tableWrapper.innerHTML = '<p>لا توجد بيانات بعد.</p>'; return; }
  let html = '<table><thead><tr><th>الحساب</th><th>مدين</th><th>دائن</th><th>الإجراء</th></tr></thead><tbody>';
  FA_DATA.forEach((d,i)=>{ html += `<tr><td contenteditable data-i="${i}" data-field="account">${d.account}</td><td contenteditable data-i="${i}" data-field="debit">${d.debit}</td><td contenteditable data-i="${i}" data-field="credit">${d.credit}</td><td><button class="btn ghost" onclick="deleteRow(${i})">حذف</button></td></tr>`; });
  html += '</tbody></table>';
  tableWrapper.innerHTML = html;
  document.querySelectorAll('[contenteditable]').forEach(cell=>{
    cell.addEventListener('blur',(e)=>{ const i=Number(e.target.dataset.i), field=e.target.dataset.field, val=e.target.textContent.trim(); if(field==='account'){ FA_DATA[i].account = val; } else { FA_DATA[i][field] = Number(val||0); } saveFA(); renderTable(); window.dispatchEvent(new Event('storage')); });
  });
}

function deleteRow(i){ FA_DATA.splice(i,1); saveFA(); renderTable(); window.dispatchEvent(new Event('storage')); }

document.getElementById('dataForm')?.addEventListener('submit',(e)=>{
  e.preventDefault();
  const acc = document.getElementById('accountName').value;
  const deb = parseFloat(document.getElementById('debit').value||0);
  const cred = parseFloat(document.getElementById('credit').value||0);
  if(addRow(acc,deb,cred)){ document.getElementById('accountName').value=''; document.getElementById('debit').value='0'; document.getElementById('credit').value='0'; }
});

document.getElementById('importBtn')?.addEventListener('click', ()=>{
  const f = document.getElementById('fileInput').files[0];
  if(!f){ pushAlert('الرجاء اختيار ملف'); return; }
  const reader = new FileReader();
  reader.onload = (ev)=>{
    try{
      const data = new Uint8Array(ev.target.result);
      const workbook = XLSX.read(data, {type:'array'});
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, {defval:''});
      let imported=0;
      json.forEach(row=>{
        const keys = Object.keys(row);
        let account='', debit=0, credit=0;
        if(keys.length>=1){ account = row['Account']||row['الحساب']||row[keys[0]]; }
        if(keys.length>=2){ debit = Number(row['Debit']||row['مدين']||row[keys[1]]||0); }
        if(keys.length>=3){ credit = Number(row['Credit']||row['دائن']||row[keys[2]]||0); }
        if(account !== undefined){ FA_DATA.push({account: String(account), debit: Number(debit||0), credit: Number(credit||0)}); imported++; }
      });
      saveFA(); renderTable(); pushAlert(`تم استيراد ${imported} صف`); window.dispatchEvent(new Event('storage'));
    }catch(err){ console.error(err); pushAlert('فشل قراءة الملف: تأكد من تنسيق Excel/CSV'); }
  };
  reader.readAsArrayBuffer(f);
});

document.getElementById('clearAll')?.addEventListener('click', ()=>{ if(confirm('هل تريد حذف كل البيانات؟')) clearFA(); });
document.getElementById('saveSession')?.addEventListener('click', ()=>{ saveFA(); pushAlert('تم حفظ الجلسة'); });
document.getElementById('loadSession')?.addEventListener('click', ()=>{ FA_DATA = JSON.parse(localStorage.getItem('FA_DATA_v1'))||[]; renderTable(); pushAlert('تم تحميل الجلسة'); });

renderTable();
