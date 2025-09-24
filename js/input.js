document.addEventListener('DOMContentLoaded', () => {
  const tbBody = document.getElementById('tbBody');
  const fileInput = document.getElementById('fileInput');
  const addRowBtn = document.getElementById('addRow');
  const validateBtn = document.getElementById('validate');
  const saveBtn = document.getElementById('saveSession');
  const loadBtn = document.getElementById('loadSession');
  const clearBtn = document.getElementById('clearAll');
  const validationResult = document.getElementById('validationResult');
  const currencySelect = document.getElementById('currencySelect');

  // helpers
  function escapeHtml(text){ return text?text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'):''; }
  function fmt(v,curr='EGP'){ return new Intl.NumberFormat('en-US',{style:'currency',currency:curr}).format(v); }

  // render rows
  function renderRows(){
    tbBody.innerHTML='';
    const trial = window.__trialData || [];
    let totalDebit=0,totalCredit=0;
    trial.forEach((r,idx)=>{
      totalDebit+=Number(r.debit||0); totalCredit+=Number(r.credit||0);
      const tr=document.createElement('tr');
      tr.innerHTML=`
        <td><input data-idx="${idx}" data-field="account" value="${escapeHtml(r.account||'')}" /></td>
        <td><select data-idx="${idx}" data-field="type" class="form-select form-select-sm">
          <option value="asset" ${r.type==='asset'?'selected':''}>أصول</option>
          <option value="liability" ${r.type==='liability'?'selected':''}>خصوم</option>
          <option value="equity" ${r.type==='equity'?'selected':''}>حقوق ملكية</option>
          <option value="revenue" ${r.type==='revenue'?'selected':''}>إيرادات</option>
          <option value="expense" ${r.type==='expense'?'selected':''}>مصروفات</option>
        </select></td>
        <td><input data-idx="${idx}" data-field="code" value="${escapeHtml(r.code||'')}" /></td>
        <td><input data-idx="${idx}" data-field="debit" type="number" value="${r.debit||0}" class="financial-value" data-base-value="${r.debit||0}" /></td>
        <td><input data-idx="${idx}" data-field="credit" type="number" value="${r.credit||0}" class="financial-value" data-base-value="${r.credit||0}" /></td>
        <td><button class="btn btn-sm btn-danger btn-del" data-idx="${idx}">حذف</button></td>
      `;
      tbBody.appendChild(tr);
    });
    attachRowEvents();
    highlightBalance(totalDebit,totalCredit);
  }

  function attachRowEvents(){
    tbBody.querySelectorAll('input, select').forEach(inp=>{
      inp.addEventListener('change', e=>{
        const idx=Number(e.target.dataset.idx), field=e.target.dataset.field;
        const v=field==='debit'||field==='credit'?Number(e.target.value||0):e.target.value;
        window.__trialData[idx][field]=v;
        renderRows();
      });
    });
    tbBody.querySelectorAll('.btn-del').forEach(b=>{
      b.addEventListener('click', e=>{
        const idx=Number(e.target.dataset.idx);
        window.__trialData.splice(idx,1);
        renderRows();
      });
    });
  }

  // add row
  addRowBtn.addEventListener('click', ()=>{
    if(!window.__trialData) window.__trialData=[];
    window.__trialData.push({account:'',type:'asset',code:'',debit:0,credit:0});
    renderRows();
  });

  // file input
  fileInput.addEventListener('change', ()=>{
    const f=fileInput.files[0]; if(!f) return;
    const name=f.name.toLowerCase();
    if(name.endsWith('.csv')){
      Papa.parse(f,{header:true,skipEmptyLines:true,complete:results=>{
        window.__trialData=results.data.map(r=>({
          account:r.account||'', type:r.type||'asset', code:r.code||'', debit:Number(r.debit||0), credit:Number(r.credit||0)
        }));
        renderRows();
      }});
    } else {
      const reader=new FileReader();
      reader.onload=function(e){
        const data=new Uint8Array(e.target.result);
        const wb=XLSX.read(data,{type:'array'});
        const ws=wb.Sheets[wb.SheetNames[0]];
        const json=XLSX.utils.sheet_to_json(ws,{defval:''});
        window.__trialData=json.map(r=>({
          account:r.account||'', type:r.type||'asset', code:r.code||'', debit:Number(r.debit||0), credit:Number(r.credit||0)
        }));
        renderRows();
      };
      reader.readAsArrayBuffer(f);
    }
  });

  // validate
  validateBtn.addEventListener('click', ()=>{
    const trial = window.__trialData||[];
    if(!trial.length){ validationResult.innerHTML='<div class="alert alert-warning">لا توجد بيانات للتحقق.</div>'; return; }
    let totalDebit=0,totalCredit=0;
    trial.forEach(r=>{ totalDebit+=Number(r.debit||0); totalCredit+=Number(r.credit||0); });
    highlightBalance(totalDebit,totalCredit);
  });

  function highlightBalance(debit,credit){
    tbBody.querySelectorAll('tr').forEach(tr=>tr.classList.remove('balanced','unbalanced'));
    if(Math.abs(debit-credit)<0.01){
      tbBody.querySelectorAll('tr').forEach(tr=>tr.classList.add('balanced'));
      validationResult.innerHTML=`<div class="alert alert-success">ميزان المراجعة متوازن ✅. مجموع المدين: ${fmt(debit)}, مجموع الدائن: ${fmt(credit)}</div>`;
    } else {
      tbBody.querySelectorAll('tr').forEach(tr=>tr.classList.add('unbalanced'));
      validationResult.innerHTML=`<div class="alert alert-danger">ميزان المراجعة غير متوازن ❌! مجموع المدين: ${fmt(debit)}, مجموع الدائن: ${fmt(credit)}</div>`;
    }
  }

  // save/load/clear
  saveBtn.addEventListener('click', ()=>{
    if(!window.__trialData) window.__trialData=[];
    localStorage.setItem('trialSession',JSON.stringify(window.__trialData));
    showMessage('تم حفظ الجلسة محلياً.');
  });
  loadBtn.addEventListener('click', ()=>{
    const s=localStorage.getItem('trialSession');
    if(!s){ showMessage('لا توجد جلسة محفوظة',true); return; }
    window.__trialData=JSON.parse(s);
    renderRows();
    showMessage('تم استرجاع الجلسة.');
  });
  clearBtn.addEventListener('click', ()=>{
    if(confirm('هل تريد مسح كل البيانات؟')){
      window.__trialData=[];
      localStorage.removeItem('trialSession');
      renderRows();
    }
  });

  // currency
  currencySelect.addEventListener('change', ()=> renderRows() );

  function showMessage(msg,isError=false){
    validationResult.innerHTML=`<div class="alert ${isError?'alert-danger':'alert-info'}">${msg}</div>`;
    setTimeout(()=>validationResult.innerHTML='',3000);
  }

  // init
  if(!window.__trialData) window.__trialData=[];
  renderRows();
});
