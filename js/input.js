/* js/input.js — النسخة النهائية المحسّنة بالكامل
 - وظائف النسخة القديمة كلها محفوظة
 - i18n كامل: ar/en
 - Toast ديناميكي وجذاب
 - تحديث صف واحد فقط عند التعديل
 - تصدير PDF/Excel محسّن مع شعار/علامة مائية
 - حفظ واسترجاع الجلسة بالكامل
 - الوضع الليلي والتخزين المحلي للإعدادات
 - أداء محسن وحماية البيانات
*/

document.addEventListener('DOMContentLoaded', () => {
  // DOM
  const tbBody = document.getElementById('tbBody');
  const fileInput = document.getElementById('fileInput');
  const addRowBtn = document.getElementById('addRow');
  const validateBtn = document.getElementById('validate');
  const saveBtn = document.getElementById('saveSession');
  const loadBtn = document.getElementById('loadSession');
  const clearBtn = document.getElementById('clearAll');
  const validationResult = document.getElementById('validationResult');
  const currencySelect = document.getElementById('currencySelect');
  const darkToggle = document.getElementById('darkModeToggle');
  const langSelect = document.getElementById('languageSelect');
  const exportPdfBtn = document.getElementById('exportPdfBtn');
  const exportExcelBtn = document.getElementById('exportExcelBtn');

  const SETTINGS_KEY = 'fa_settings_v1';
  const STORAGE_KEYS = ['trialSession','fa_session_v1','financialSession'];
  if (!window.__trialData) window.__trialData = [];

  // i18n
  let I18N = {};
  const defaultLang = localStorage.getItem('lang') || 'ar';

  // Helpers
  const safeNum = x => Number(x || 0);
  const escapeHtml = s => s == null ? '' : String(s).replace(/[&<>"'`=\/]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#96;','=':'&#x3D;'})[c]);

  function getSettings(){
    const s = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    return Object.assign({theme:'light', lang: defaultLang, currency: (currencySelect?currencySelect.value:'EGP')}, s);
  }
  function saveSettings(s){ localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); }

  function fmtCurrency(v){
    const settings = getSettings();
    const curr = settings.currency || 'EGP';
    const locale = settings.lang === 'ar' ? 'ar-EG' : 'en-US';
    if (v == null || Number.isNaN(Number(v))) return '-';
    try { return new Intl.NumberFormat(locale, { style:'currency', currency: curr, maximumFractionDigits:2 }).format(Number(v)); }
    catch(e){ return Number(v).toFixed(2) + ' ' + curr; }
  }

  // Toast
  function ensureToastArea(){
    let area = document.getElementById('fa_toast_area');
    if(area) return area;
    area = document.createElement('div');
    area.id = 'fa_toast_area';
    area.style.position = 'fixed';
    area.style.top = '18px';
    area.style.left = '18px';
    area.style.zIndex = 12000;
    document.body.appendChild(area);
    return area;
  }
  function showToast(msg, type='info', ttl=3000){
    const area = ensureToastArea();
    const el = document.createElement('div');
    el.textContent = msg;
    el.style.background = type==='success' ? '#198754' : type==='error' ? '#d63333' : '#0d6efd';
    el.style.color = '#fff';
    el.style.padding = '10px 14px';
    el.style.borderRadius = '8px';
    el.style.marginTop = '8px';
    el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
    el.style.opacity = '1';
    el.style.transition = 'all .35s ease';
    area.appendChild(el);
    setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateX(12px)'; }, ttl-300);
    setTimeout(()=>{ area.removeChild(el); }, ttl);
  }

  // Normalize rows
  function normalizeRows(rows){
    if(!Array.isArray(rows)) return [];
    return rows.map(r=>{
      const account = r.account || r['Account'] || r['الحساب'] || r['Account Name'] || '';
      const code = r.code || r['Code'] || r['رمز'] || r['Account Code'] || '';
      const debit = safeNum(r.debit ?? r.Debit ?? r['مدين'] ?? r.Dr ?? 0);
      const credit = safeNum(r.credit ?? r.Credit ?? r['دائن'] ?? r.Cr ?? 0);
      const amount = r.amount ?? r.Amount ?? r.value ?? r.Value;
      let type = (r.type || r.Type || r['النوع'] || '').toString().toLowerCase();
      if((debit===0 && credit===0) && typeof amount !== 'undefined'){
        const v = Number(amount||0);
        return v>=0 ? {account, code, debit:v, credit:0, type} : {account, code, debit:0, credit:Math.abs(v), type};
      }
      return {account, code, debit, credit, type};
    }).filter(r => (r.account || r.code) && (r.debit || r.credit || r.code));
  }

  // Create row element
  function createRowElement(rowObj, idx){
    const tr = document.createElement('tr');
    tr.dataset.idx = idx;
    tr.innerHTML = `
      <td><input data-field="account" class="form-control form-control-sm" value="${escapeHtml(rowObj.account||'')}" /></td>
      <td>
        <select data-field="type" class="form-select form-select-sm">
          <option value="asset">${I18N['type_asset']||'أصول'}</option>
          <option value="liability">${I18N['type_liability']||'خصوم'}</option>
          <option value="equity">${I18N['type_equity']||'حقوق ملكية'}</option>
          <option value="revenue">${I18N['type_revenue']||'إيرادات'}</option>
          <option value="expense">${I18N['type_expense']||'مصروفات'}</option>
        </select>
      </td>
      <td><input data-field="code" class="form-control form-control-sm" value="${escapeHtml(rowObj.code||'')}" /></td>
      <td><input data-field="debit" type="number" step="0.01" class="form-control form-control-sm text-end" value="${rowObj.debit||0}" /></td>
      <td><input data-field="credit" type="number" step="0.01" class="form-control form-control-sm text-end" value="${rowObj.credit||0}" /></td>
      <td class="text-center"><button class="btn btn-sm btn-outline-danger btn-del">${I18N['delete']||'حذف'}</button></td>
    `;
    const sel = tr.querySelector('select[data-field="type"]');
    if(rowObj.type) { try{ sel.value = rowObj.type; } catch(e){} }
    return tr;
  }

  // Render all rows
  function renderAll(){
    tbBody.innerHTML = '';
    const trial = window.__trialData || [];
    trial.forEach((r, idx) => {
      const tr = createRowElement(r, idx);
      tbBody.appendChild(tr);
    });
    attachDelegation();
    calculateAndHighlight();
  }

  function updateRowDom(idx){
    const tr = tbBody.querySelector(`tr[data-idx="${idx}"]`);
    if(!tr) return;
    const r = window.__trialData[idx];
    tr.querySelector('input[data-field="account"]').value = r.account || '';
    const sel = tr.querySelector('select[data-field="type"]');
    if(sel) sel.value = r.type || 'asset';
    tr.querySelector('input[data-field="code"]').value = r.code || '';
    tr.querySelector('input[data-field="debit"]').value = r.debit || 0;
    tr.querySelector('input[data-field="credit"]').value = r.credit || 0;
  }

  // Delegated events
  function attachDelegation(){
    tbBody.querySelectorAll('input, select, .btn-del').forEach(el=>{ el.oninput=null; el.onchange=null; el.onclick=null; });
    tbBody.addEventListener('input', onTbInput);
    tbBody.addEventListener('change', onTbInput);
    tbBody.querySelectorAll('.btn-del').forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        const tr = e.target.closest('tr');
        const idx = Number(tr.dataset.idx);
        window.__trialData.splice(idx,1);
        saveToLocal();
        renderAll();
        showToast(I18N['deleted']||'تم الحذف', 'success');
      });
    });
  }

  function onTbInput(e){
    const target = e.target;
    const tr = target.closest('tr');
    if(!tr) return;
    const idx = Number(tr.dataset.idx);
    const field = target.dataset.field;
    if(typeof field === 'undefined') return;
    let value = target.value;
    if(field==='debit' || field==='credit') value=Number(value||0);
    window.__trialData[idx][field]=value;
    saveToLocal();
    updateRowDom(idx);
    calculateAndHighlight();
  }

  // Add row
  addRowBtn.addEventListener('click', ()=>{
    window.__trialData.push({account:'', code:'', debit:0, credit:0, type:'asset'});
    saveToLocal(); renderAll();
    showToast(I18N['row_added']||'تم إضافة صف','success');
  });

  // File parsing
  fileInput.addEventListener('change', e=>{
    const f = e.target.files[0];
    if(!f) return;
    const name = f.name.toLowerCase();
    if(name.endsWith('.csv')){
      Papa.parse(f,{header:true, skipEmptyLines:true, complete(res){
        window.__trialData = normalizeRows(res.data);
        saveToLocal(); renderAll();
        showToast(I18N['file_loaded']||'تم تحميل الملف','success');
      }});
    } else {
      const reader = new FileReader();
      reader.onload = ev=>{
        const arr = new Uint8Array(ev.target.result);
        const wb = XLSX.read(arr,{type:'array'});
        const first = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(first,{defval:''});
        window.__trialData = normalizeRows(json);
        saveToLocal(); renderAll();
        showToast(I18N['file_loaded']||'تم تحميل الملف','success');
      };
      reader.readAsArrayBuffer(f);
    }
  });

  // Calculate totals
  function calculateAndHighlight(){
    const trial = window.__trialData || [];
    let totalDebit=0, totalCredit=0;
    trial.forEach(r=>{ totalDebit+=safeNum(r.debit); totalCredit+=safeNum(r.credit); });
    tbBody.querySelectorAll('tr').forEach(tr=>{ tr.classList.remove('balanced','unbalanced'); });
    if(Math.abs(totalDebit-totalCredit)<0.01){
      tbBody.querySelectorAll('tr').forEach(tr=>tr.classList.add('balanced'));
      validationResult.innerHTML = `<div class="alert alert-success">${I18N['balanced']||'ميزان المراجعة متوازن'} — ${fmtCurrency(totalDebit)}</div>`;
    } else {
      tbBody.querySelectorAll('tr').forEach(tr=>tr.classList.add('unbalanced'));
      validationResult.innerHTML = `<div class="alert alert-danger">${I18N['unbalanced']||'ميزان المراجعة غير متوازن'} — (${I18N['debit']||'مدين'}: ${fmtCurrency(totalDebit)} — ${I18N['credit']||'دائن'}: ${fmtCurrency(totalCredit)})</div>`;
    }
  }

  // Validate
  validateBtn.addEventListener('click', ()=>{
    if(!(window.__trialData||[]).length){ showToast(I18N['no_data']||'لا توجد بيانات للتحقق','error'); return; }
    calculateAndHighlight(); showToast(I18N['validation_done']||'تم التحقق','success');
  });

  // Save / Load / Clear
  function saveToLocal(){
    try{
      localStorage.setItem('trialSession', JSON.stringify(window.__trialData||[]));
      localStorage.setItem('fa_session_v1', JSON.stringify({trial: window.__trialData||[], savedAt: new Date().toISOString()}));
      return true;
    }catch(e){ console.error(e); return false; }
  }
  saveBtn.addEventListener('click', ()=>{ saveToLocal(); showToast(I18N['saved']||'تم حفظ الجلسة محلياً','success'); });

  loadBtn.addEventListener('click', ()=>{
    let loaded = null;
    for(const k of STORAGE_KEYS){
      const s = localStorage.getItem(k);
      if(s){ try{ const obj=JSON.parse(s); if(Array.isArray(obj)){ loaded=obj; break; } if(obj && Array.isArray(obj.trial)){ loaded=obj.trial; break; } }catch(e){} }
    }
    if(!loaded){ showToast(I18N['no_saved']||'لا توجد جلسة محفوظة','error'); return; }
    window.__trialData = normalizeRows(loaded); renderAll();
    showToast(I18N['loaded']||'تم استرجاع الجلسة','success');
  });

  clearBtn.addEventListener('click', ()=>{
    if(!confirm(I18N['confirm_clear']||'هل تريد مسح كل البيانات؟')) return;
    window.__trialData=[]; for(const k of STORAGE_KEYS) localStorage.removeItem(k);
    renderAll(); showToast(I18N['cleared']||'تم مسح البيانات','success');
  });

  // Export PDF / Excel
  if(exportPdfBtn) exportPdfBtn.addEventListener('click', async ()=>{
    try{
      const wrapper=document.createElement('div');
      wrapper.style.padding='20px'; wrapper.style.background='#fff';
      const report=document.createElement('div');
      report.innerHTML=`<h2>${I18N['report_title']||'تقرير ميزان المراجعة'}</h2><div>${new Date().toLocaleString()}</div><br/>`;
      const table=document.createElement('table'); table.style.width='100%'; table.style.borderCollapse='collapse';
      const headers=['الحساب','النوع','الرمز','مدين','دائن'];
      table.innerHTML=`<tr>${headers.map(h=>`<th style="border-bottom:1px solid #ddd;padding:6px;text-align:right">${h}</th>`).join('')}</tr>`+
        window.__trialData.map(r=>`<tr>
          <td style="padding:6px;text-align:right">${escapeHtml(r.account)}</td>
          <td style="padding:6px;text-align:right">${escapeHtml(r.type||'')}</td>
          <td style="padding:6px;text-align:right">${escapeHtml(r.code||'')}</td>
          <td style="padding:6px;text-align:right">${r.debit||0}</td>
          <td style="padding:6px;text-align:right">${r.credit||0}</td>
        </tr>`).join('');
      report.appendChild(table);
      const wm=document.createElement('div'); wm.style.textAlign='center'; wm.style.opacity='0.06'; wm.style.marginTop='20px';
      const img=document.createElement('img'); img.src='assets/logo.png'; img.style.maxWidth='220px';
      wm.appendChild(img); wrapper.appendChild(report); wrapper.appendChild(wm);
      await html2pdf().from(wrapper).set({filename:'trial-balance-report.pdf', margin:12, jsPDF:{unit:'mm',format:'a4'}, html2canvas:{scale:2}}).save();
      showToast(I18N['export_pdf_ok']||'تم تصدير PDF','success');
    }catch(e){ console.error(e); showToast(I18N['export_pdf_fail']||'فشل تصدير PDF','error'); }
  });

  if(exportExcelBtn) exportExcelBtn.addEventListener('click', ()=>{
    try{
      const trial=window.__trialData||[];
      if(!trial.length){ showToast(I18N['no_data_export']||'لا توجد بيانات للتصدير','error'); return; }
      const wb=XLSX.utils.book_new();
      const ws=XLSX.utils.json_to_sheet(trial.map(r=>({الحساب:r.account, الرمز:r.code, مدين:r.debit, دائن:r.credit, النوع:r.type})));
      XLSX.utils.book_append_sheet(wb, ws, 'ميزان المراجعة');
      const totalDebit=trial.reduce((s,r)=>s+safeNum(r.debit),0);
      const totalCredit=trial.reduce((s,r)=>s+safeNum(r.credit),0);
      const summary=[
        [(I18N['app_title']||'Financial Analyzer')],
        [(I18N['report_generated']||'Report generated'), new Date().toLocaleString()],
        [],
        [(I18N['total_debit']||'Total Debit'), totalDebit],
        [(I18N['total_credit']||'Total Credit'), totalCredit],
        [(I18N['balanced_label']||'Balanced'), Math.abs(totalDebit-totalCredit)<0.01?'Yes':'No']
      ];
      XLSX.utils.book_append_sheet(wb,XLSX.utils.aoa_to_sheet(summary),'Summary');
      XLSX.writeFile(wb,'trial-balance.xlsx');
      showToast(I18N['export_excel_ok']||'تم تصدير Excel','success');
    }catch(e){ console.error(e); showToast(I18N['export_excel_fail']||'فشل تصدير Excel','error'); }
  });

  // i18n loader & apply
  async function loadI18n(lang){
    try{
      const res = await fetch(`lang/${lang}.json`);
      if(!res.ok) throw new Error('i18n fetch failed');
      I18N = await res.json();
      applyTranslations();
    }catch(e){ console.error('i18n load error', e); }
  }
  function applyTranslations(){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key=el.getAttribute('data-i18n'); if(key && I18N[key]) el.textContent=I18N[key];
    });
    if(document.getElementById('upload-hint') && I18N['upload_hint']) document.getElementById('upload-hint').textContent=I18N['upload_hint'];
    renderAll();
  }

  // Language select
  if(langSelect){
    langSelect.value = localStorage.getItem('lang') || defaultLang;
    loadI18n(langSelect.value);
    langSelect.addEventListener('change', e=>{
      const v = e.target.value; localStorage.setItem('lang', v);
      const s=getSettings(); s.lang=v; saveSettings(s);
      loadI18n(v);
      document.documentElement.lang=v;
      document.documentElement.dir=v==='ar'?'rtl':'ltr';
    });
  } else loadI18n(defaultLang);

  // Dark mode
  if(darkToggle){
    const st = localStorage.getItem('theme')==='dark';
    darkToggle.checked=st; document.body.setAttribute('data-theme', st?'dark':'light');
    darkToggle.addEventListener('change', e=>{
      const on=e.target.checked;
      document.body.setAttribute('data-theme', on?'dark':'light');
      localStorage.setItem('theme', on?'dark':'light');
      const s=getSettings(); s.theme=on?'dark':'light'; saveSettings(s);
    });
  }

  // Currency select
  if(currencySelect){
    const cur=localStorage.getItem('currency')||currencySelect.value;
    currencySelect.value=cur;
    currencySelect.addEventListener('change', e=>{
      localStorage.setItem('currency', e.target.value);
      const s=getSettings(); s.currency=e.target.value; saveSettings(s);
      renderAll();
    });
  }

  // Initial load
  (function initLoad(){
    const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    if(settings.lang){ if(langSelect) langSelect.value=settings.lang; loadI18n(settings.lang); }
    if(settings.currency && currencySelect) currencySelect.value=settings.currency;
    if(settings.theme){ document.body.setAttribute('data-theme', settings.theme==='dark'?'dark':'light'); if(darkToggle) darkToggle.checked=settings.theme==='dark'; }
    for(const k of STORAGE_KEYS){
      const s = localStorage.getItem(k);
      if(s){ try{ const obj=JSON.parse(s); if(Array.isArray(obj)){ window.__trialData=normalizeRows(obj); break; } if(obj && Array.isArray(obj.trial)){ window.__trialData=normalizeRows(obj.trial); break; } }catch(e){} }
    }
    renderAll();
  })();

  // Inject minimal toast CSS
  (function injectToastStyles(){
    const css = `.fa-toast{transition:all .3s ease} .fa-toast-success{background:#198754} .fa-toast-error{background:#d63333} .fa-toast-info{background:#0d6efd}`;
    const s=document.createElement('style'); s.appendChild(document.createTextNode(css)); document.head.appendChild(s);
  })();

}); // DOMContentLoaded end
