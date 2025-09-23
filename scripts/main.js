// scripts/main.js

// --------------------- Utilities ---------------------
function formatNumber(n){
  try { return Number(n).toLocaleString(); } catch(e){ return n; }
}

// --------------------- تحميل واسترجاع الجلسة ---------------------
function saveSession(){
  const rows = Array.from(document.querySelectorAll('#tbBody tr')).map(tr=>{
    return {
      account: tr.querySelector('.acc')?.value || '',
      accountNumber: tr.querySelector('.accNo')?.value || '',
      debit: Number(tr.querySelector('.debit')?.value || 0),
      credit: Number(tr.querySelector('.credit')?.value || 0)
    };
  });
  const session = {trial: rows, timestamp: new Date().toISOString()};
  localStorage.setItem('fa:data:v1', JSON.stringify(session));
  alert('✅ تم حفظ الجلسة بنجاح');
}

function loadSession(){
  const raw = localStorage.getItem('fa:data:v1');
  if (!raw) return alert('⚠️ لا توجد جلسة محفوظة');
  const parsed = JSON.parse(raw);
  if (!parsed || !parsed.trial) return alert('⚠️ البيانات غير صالحة');
  populateTable(parsed.trial);
  updateKPI();
  alert('✅ تم استرجاع الجلسة بنجاح');
}

// --------------------- إدارة الجدول ---------------------
function addRow(row={}){
  const tbody = document.getElementById('tbBody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td><input class="form-control form-control-sm acc" value="${row.account||''}"></td>
    <td><input class="form-control form-control-sm accNo" value="${row.accountNumber||''}"></td>
    <td><input type="number" min="0" class="form-control form-control-sm debit" value="${row.debit||0}"></td>
    <td><input type="number" min="0" class="form-control form-control-sm credit" value="${row.credit||0}"></td>
    <td><button class="btn btn-sm btn-danger removeRow"><i class="fa fa-trash"></i></button></td>
  `;
  tbody.appendChild(tr);

  tr.querySelector('.removeRow').addEventListener('click', ()=>{ tr.remove(); updateKPI(); });
  tr.querySelectorAll('input').forEach(input=>input.addEventListener('input', updateKPI));
}

function populateTable(rows){
  const tbody = document.getElementById('tbBody');
  tbody.innerHTML = '';
  rows.forEach(row=>addRow(row));
}

// --------------------- التحقق من الميزان ---------------------
function validateTrial(){
  const rows = Array.from(document.querySelectorAll('#tbBody tr'));
  let totalDebit=0, totalCredit=0;
  rows.forEach(tr=>{
    totalDebit += Number(tr.querySelector('.debit')?.value||0);
    totalCredit += Number(tr.querySelector('.credit')?.value||0);
  });

  const resDiv = document.getElementById('validationResult');
  if (totalDebit === totalCredit){
    resDiv.innerHTML = `<div class="alert alert-success">✅ الميزان متوازن (مدين = دائن = ${formatNumber(totalDebit)})</div>`;
  } else {
    resDiv.innerHTML = `<div class="alert alert-danger">⚠️ الميزان غير متوازن (مدين = ${formatNumber(totalDebit)}, دائن = ${formatNumber(totalCredit)})</div>`;
  }
}

// --------------------- تحميل CSV/XLSX ---------------------
function handleFile(file){
  const ext = file.name.split('.').pop().toLowerCase();
  if(['csv'].includes(ext)){
    Papa.parse(file, {
      header:true, skipEmptyLines:true,
      complete: function(results){
        const data = results.data.map(r=>({
          account: r.account||r.Account||r['الحساب']||'',
          accountNumber: r.accountNumber||r['رقم الحساب']||'',
          debit: Number(r.debit||r.Debit||r['مدين']||0),
          credit: Number(r.credit||r.Credit||r['دائن']||0)
        }));
        populateTable(data);
        updateKPI();
      }
    });
  } else if(['xlsx','xls'].includes(ext)){
    const reader = new FileReader();
    reader.onload = (e)=>{
      const wb = XLSX.read(e.target.result, {type:'binary'});
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(ws);
      const mapped = data.map(r=>({
        account: r.account||r.Account||r['الحساب']||'',
        accountNumber: r.accountNumber||r['رقم الحساب']||'',
        debit: Number(r.debit||r.Debit||r['مدين']||0),
        credit: Number(r.credit||r.Credit||r['دائن']||0)
      }));
      populateTable(mapped);
      updateKPI();
    };
    reader.readAsBinaryString(file);
  } else {
    alert('⚠️ صيغة الملف غير مدعومة');
  }
}

// --------------------- مؤشرات KPI ---------------------
function updateKPI(){
  const rows = Array.from(document.querySelectorAll('#tbBody tr'));
  let revenues=0, expenses=0, assets=0, liabilities=0, equity=0;

  const revKeywords = ['sales','revenue','income','إيراد','مبيعات','إيرادات'];
  const expKeywords = ['expense','cost','مصروف','مصاريف','تكلفة'];
  const assetKeywords = ['asset','الأصول','موجودات','اصل'];
  const liabKeywords = ['liabil','الدين','الخصوم','قرض'];
  const equityKeywords = ['equity','حقوق','ملكية','رأس المال'];

  rows.forEach(tr=>{
    const acc = tr.querySelector('.acc')?.value.toLowerCase() || '';
    const debit = Number(tr.querySelector('.debit')?.value||0);
    const credit = Number(tr.querySelector('.credit')?.value||0);

    if(revKeywords.some(k=>acc.includes(k))) revenues += credit||debit;
    else if(expKeywords.some(k=>acc.includes(k))) expenses += debit||credit;
    else if(assetKeywords.some(k=>acc.includes(k))) assets += debit||credit;
    else if(liabKeywords.some(k=>acc.includes(k))) liabilities += credit||debit;
    else if(equityKeywords.some(k=>acc.includes(k))) equity += credit||debit;
    else { if(credit>0) revenues+=credit; if(debit>0) expenses+=debit; }
  });

  const profit = revenues - expenses;
  document.getElementById('netProfit').innerText = formatNumber(profit);
  document.getElementById('roa').innerText = assets?((profit/assets)*100).toFixed(2)+'%' : '-';
  document.getElementById('roe').innerText = equity?((profit/equity)*100).toFixed(2)+'%' : '-';
  document.getElementById('eva').innerText = formatNumber(profit - (equity*0.1)); // مثال EVA
}

// --------------------- Event Listeners ---------------------
document.getElementById('addRow').addEventListener('click', ()=>addRow());
document.getElementById('validate').addEventListener('click', validateTrial);
document.getElementById('saveSession').addEventListener('click', saveSession);
document.getElementById('loadSession').addEventListener('click', loadSession);

document.getElementById('fileInput').addEventListener('change', e=>{
  if(e.target.files.length) handleFile(e.target.files[0]);
});
document.getElementById('parseFile').addEventListener('click', ()=>{
  const fileEl = document.getElementById('fileInput');
  if(fileEl.files.length) handleFile(fileEl.files[0]);
  else alert('⚠️ اختر ملف أولاً');
});
document.getElementById('clearAll').addEventListener('click', ()=>{
  if(confirm('هل أنت متأكد من مسح جميع البيانات؟')){
    document.getElementById('tbBody').innerHTML='';
    updateKPI();
  }
});
