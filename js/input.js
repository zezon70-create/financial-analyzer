document.addEventListener('DOMContentLoaded', () => {
  const tbBody = document.getElementById('tbBody');
  const fileInput = document.getElementById('fileInput');
  const addRowBtn = document.getElementById('addRow');
  const validateBtn = document.getElementById('validate');
  const saveBtn = document.getElementById('saveSession');
  const loadBtn = document.getElementById('loadSession');
  const clearBtn = document.getElementById('clearAll');
  const validationResult = document.getElementById('validationResult');

  // عرض الصفوف
  function renderRows() {
    tbBody.innerHTML = '';
    const trial = window.__trialData || [];
    trial.forEach((r, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input data-idx="${idx}" data-field="account" value="${escapeHtml(r.account || '')}" /></td>
        <td>
          <select data-idx="${idx}" data-field="type" class="form-select form-select-sm">
            <option value="asset" ${r.type==='asset'?'selected':''}>أصول</option>
            <option value="liability" ${r.type==='liability'?'selected':''}>خصوم</option>
            <option value="equity" ${r.type==='equity'?'selected':''}>حقوق ملكية</option>
            <option value="revenue" ${r.type==='revenue'?'selected':''}>إيرادات</option>
            <option value="expense" ${r.type==='expense'?'selected':''}>مصروفات</option>
          </select>
        </td>
        <td><input data-idx="${idx}" data-field="code" value="${escapeHtml(r.code || '')}" /></td>
        <td><input data-idx="${idx}" data-field="debit" type="number" value="${r.debit || 0}" /></td>
        <td><input data-idx="${idx}" data-field="credit" type="number" value="${r.credit || 0}" /></td>
        <td><button class="btn btn-sm btn-danger btn-del" data-idx="${idx}">حذف</button></td>
      `;
      tbBody.appendChild(tr);
    });
    attachRowEvents();
  }

  function attachRowEvents() {
    tbBody.querySelectorAll('input, select').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const idx = Number(e.target.dataset.idx), field = e.target.dataset.field;
        const v = field==='debit'||field==='credit' ? Number(e.target.value || 0) : e.target.value;
        window.__trialData[idx][field] = v;
      });
    });
    tbBody.querySelectorAll('.btn-del').forEach(b => {
      b.addEventListener('click', (e) => {
        const idx = Number(e.target.dataset.idx);
        window.__trialData.splice(idx, 1);
        renderRows();
      });
    });
  }

  // إضافة صف جديد
  addRowBtn.addEventListener('click', () => {
    if (!window.__trialData) window.__trialData = [];
    window.__trialData.push({ account:'', type:'asset', code:'', debit:0, credit:0 });
    renderRows();
  });

  // رفع CSV/Excel
  fileInput.addEventListener('change', () => {
    const f = fileInput.files[0];
    if(!f) return;
    const name = f.name.toLowerCase();
    if(name.endsWith('.csv')){
      Papa.parse(f,{ header:true, skipEmptyLines:true,
        complete: function(results){
          window.__trialData = results.data.map(r=>({
            account: r.account||'',
            type: r.type||'asset',
            code: r.code||'',
            debit: Number(r.debit||0),
            credit: Number(r.credit||0)
          }));
          renderRows();
        }
      });
    } else {
      const reader = new FileReader();
      reader.onload = function(e){
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data,{type:'array'});
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws,{defval:''});
        window.__trialData = json.map(r=>({
          account: r.account||'',
          type: r.type||'asset',
          code: r.code||'',
          debit: Number(r.debit||0),
          credit: Number(r.credit||0)
        }));
        renderRows();
      };
      reader.readAsArrayBuffer(f);
    }
  });

  // تحقق من الميزان
  validateBtn.addEventListener('click', ()=>{
    const trial = window.__trialData || [];
    if(!trial.length){
      validationResult.innerHTML = '<div class="alert alert-warning">لا توجد بيانات للتحقق.</div>';
      return;
    }
    let totalDebit=0, totalCredit=0;
    trial.forEach(r=>{ totalDebit+=Number(r.debit||0); totalCredit+=Number(r.credit||0); });
    if(Math.abs(totalDebit-totalCredit)<0.01){
      validationResult.innerHTML = `<div class="alert alert-success">ميزان المراجعة متوازن ✅. مجموع المدين: ${fmt(totalDebit)}, مجموع الدائن: ${fmt(totalCredit)}</div>`;
    } else {
      validationResult.innerHTML = `<div class="alert alert-danger">ميزان المراجعة غير متوازن ❌! مجموع المدين: ${fmt(totalDebit)}, مجموع الدائن: ${fmt(totalCredit)}</div>`;
    }
  });

  // حفظ واسترجاع الجلسة
  saveBtn.addEventListener('click', ()=>{
    if(!window.__trialData) window.__trialData=[];
    localStorage.setItem('trialSession', JSON.stringify(window.__trialData));
    alert('تم حفظ الجلسة محلياً.');
  });
  loadBtn.addEventListener('click', ()=>{
    const s = localStorage.getItem('trialSession');
    if(!s){ alert('لا توجد جلسة محفوظة'); return; }
    window.__trialData = JSON.parse(s);
    renderRows();
    alert('تم استرجاع الجلسة.');
  });
  clearBtn.addEventListener('click', ()=>{
    if(confirm('هل تريد مسح كل البيانات؟')){
      window.__trialData=[];
      localStorage.removeItem('trialSession');
      renderRows();
    }
  });

  // helpers
  function escapeHtml(text){ return text?text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'):''; }
});
