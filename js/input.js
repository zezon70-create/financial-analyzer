document.addEventListener('DOMContentLoaded', () => {
  const tbBody = document.getElementById('tbBody');
  const fileInput = document.getElementById('fileInput');
  const addRowBtn = document.getElementById('addRow');
  const validateBtn = document.getElementById('validate');
  const saveBtn = document.getElementById('saveSession');
  const loadBtn = document.getElementById('loadSession');
  const clearBtn = document.getElementById('clearAll');

  if(!window.__trialData) window.__trialData = [];

  // =======================
  // عرض الصفوف
  // =======================
  function renderRows() {
    tbBody.innerHTML = '';
    window.__trialData.forEach((row, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input data-idx="${idx}" data-field="account" value="${escapeHtml(row.account)}" class="form-control form-control-sm"/></td>
        <td>
          <select data-idx="${idx}" data-field="type" class="form-select form-select-sm">
            <option value="asset" ${row.type==='asset'?'selected':''}>أصول</option>
            <option value="liability" ${row.type==='liability'?'selected':''}>خصوم</option>
            <option value="equity" ${row.type==='equity'?'selected':''}>حقوق ملكية</option>
            <option value="revenue" ${row.type==='revenue'?'selected':''}>إيرادات</option>
            <option value="expense" ${row.type==='expense'?'selected':''}>مصروفات</option>
          </select>
        </td>
        <td><input data-idx="${idx}" data-field="code" value="${escapeHtml(row.code)}" class="form-control form-control-sm"/></td>
        <td><input data-idx="${idx}" data-field="debit" type="number" value="${row.debit || 0}" class="form-control form-control-sm"/></td>
        <td><input data-idx="${idx}" data-field="credit" type="number" value="${row.credit || 0}" class="form-control form-control-sm"/></td>
        <td><button class="btn btn-sm btn-danger btn-del" data-idx="${idx}"><i class="fa fa-trash"></i></button></td>
      `;
      tbBody.appendChild(tr);
    });
    attachRowEvents();
  }

  function attachRowEvents() {
    tbBody.querySelectorAll('input, select').forEach(el => {
      el.addEventListener('change', e => {
        const idx = Number(e.target.dataset.idx);
        const field = e.target.dataset.field;
        window.__trialData[idx][field] = (field==='debit'||field==='credit') ? Number(e.target.value || 0) : e.target.value;
      });
    });

    tbBody.querySelectorAll('.btn-del').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = Number(e.target.dataset.idx);
        window.__trialData.splice(idx,1);
        renderRows();
      });
    });
  }

  // =======================
  // إضافة صف جديد
  // =======================
  addRowBtn.addEventListener('click', () => {
    window.__trialData.push({ account:'', type:'asset', code:'', debit:0, credit:0 });
    renderRows();
  });

  // =======================
  // رفع CSV/Excel
  // =======================
  fileInput.addEventListener('change', () => {
    const f = fileInput.files[0];
    if(!f) return;

    const name = f.name.toLowerCase();
    if(name.endsWith('.csv')){
      Papa.parse(f, { header:true, skipEmptyLines:true,
        complete: results => {
          window.__trialData = results.data.map(r => ({
            account: r.account || '',
            type: r.type || 'asset',
            code: r.code || '',
            debit: Number(r.debit || 0),
            credit: Number(r.credit || 0)
          }));
          renderRows();
          Swal.fire({ icon:'success', title:'تم تحميل الملف CSV بنجاح!' });
        }
      });
    } else {
      const reader = new FileReader();
      reader.onload = e => {
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, { type:'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws, { defval:'' });
        window.__trialData = json.map(r => ({
          account: r.account || '',
          type: r.type || 'asset',
          code: r.code || '',
          debit: Number(r.debit || 0),
          credit: Number(r.credit || 0)
        }));
        renderRows();
        Swal.fire({ icon:'success', title:'تم تحميل ملف Excel بنجاح!' });
      };
      reader.readAsArrayBuffer(f);
    }
  });

  // =======================
  // تحقق من الميزان
  // =======================
  validateBtn.addEventListener('click', () => {
    const totalDebit = window.__trialData.reduce((sum,r)=>sum+(r.debit||0),0);
    const totalCredit = window.__trialData.reduce((sum,r)=>sum+(r.credit||0),0);
    const diff = Math.abs(totalDebit-totalCredit);

    if(diff<0.01){
      Swal.fire({ icon:'success', title:'ميزان المراجعة متوازن ✅',
        html:`<b>مدين:</b> ${fmt(totalDebit)}<br><b>دائن:</b> ${fmt(totalCredit)}`
      });
    } else {
      Swal.fire({ icon:'error', title:'ميزان المراجعة غير متوازن ❌',
        html:`<b>مدين:</b> ${fmt(totalDebit)}<br><b>دائن:</b> ${fmt(totalCredit)}`
      });
    }
  });

  // =======================
  // حفظ واسترجاع الجلسة
  // =======================
  saveBtn.addEventListener('click', () => {
    localStorage.setItem('trialSession', JSON.stringify(window.__trialData));
    Swal.fire({ icon:'success', title:'تم حفظ الجلسة محلياً' });
  });

  loadBtn.addEventListener('click', () => {
    const s = localStorage.getItem('trialSession');
    if(!s){
      Swal.fire({ icon:'info', title:'لا توجد جلسة محفوظة' });
      return;
    }
    window.__trialData = JSON.parse(s);
    renderRows();
    Swal.fire({ icon:'success', title:'تم استرجاع الجلسة' });
  });

  clearBtn.addEventListener('click', () => {
    Swal.fire({
      icon:'warning',
      title:'هل تريد مسح كل البيانات؟',
      showCancelButton:true,
      confirmButtonText:'نعم',
      cancelButtonText:'إلغاء'
    }).then(res => {
      if(res.isConfirmed){
        window.__trialData=[];
        localStorage.removeItem('trialSession');
        renderRows();
      }
    });
  });

  // =======================
  // Helpers
  // =======================
  function escapeHtml(text){ return text?text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'):''; }
  function fmt(num){ return num.toLocaleString(undefined,{minimumFractionDigits:2, maximumFractionDigits:2}); }

  renderRows();
});
