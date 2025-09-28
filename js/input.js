/* input.js — نسخة محسّنة شاملة
 Features:
 - قراءة CSV/XLSX (PapaParse + XLSX)
 - تعديل صفوف مع تحديث صف واحد فقط (performant)
 - حفظ / استرجاع / مسح الجلسة (LocalStorage)
 - Dark mode + Language + Currency (stored)
 - i18n loading (lang/ar.json, lang/en.json)
 - Toast notifications
 - Export PDF (html2pdf) with watermark/logo
 - Export Excel (XLSX) with summary sheet including logo text
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

  // Config / Storage keys
  const STORAGE_KEYS = ['trialSession','fa_session_v1','financialSession'];
  const SETTINGS_KEY = 'fa_settings_v1';
  if (!window.__trialData) window.__trialData = [];

  // i18n container
  let I18N = {};
  const defaultLang = localStorage.getItem('lang') || 'ar';

  // Helpers
  const safeNum = x => Number(x || 0);
  const escapeHtml = s => s == null ? '' : String(s).replace(/[&<>"'`=\/]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#96;','=':'&#x3D;'})[c]);

  function getSettings(){
    const s = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    return Object.assign({theme: 'light', lang: defaultLang, currency: currencySelect ? currencySelect.value : 'EGP'}, s);
  }
  function saveSettings(settings){
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }

  function fmtCurrency(v){
    const settings = getSettings();
    const curr = settings.currency || 'EGP';
    const locale = settings.lang === 'ar' ? 'ar-EG' : 'en-US';
    if (v == null || Number.isNaN(Number(v))) return '-';
    try {
      return new Intl.NumberFormat(locale, { style:'currency', currency: curr, maximumFractionDigits:2 }).format(Number(v));
    } catch(e){
      return Number(v).toFixed(2) + ' ' + curr;
    }
  }

  // Toast system (simple)
  const TOAST_AREA_ID = 'fa_toast_area';
  function ensureToastArea(){
    let area = document.getElementById(TOAST_AREA_ID);
    if(area) return area;
    area = document.createElement('div');
    area.id = TOAST_AREA_ID;
    area.style.position = 'fixed';
    area.style.top = '18px';
    area.style.right = '18px';
    area.style.zIndex = 99999;
    document.body.appendChild(area);
    return area;
  }
  function showToast(message, type='info', ttl=3500){
    const area = ensureToastArea();
    const t = document.createElement('div');
    t.className = `fa-toast fa-toast-${type}`;
    t.style.background = (type==='error'?'#d9534f': type==='success'?'#198754':'#0d6efd');
    t.style.color = '#fff';
    t.style.padding = '10px 14px';
    t.style.borderRadius = '8px';
    t.style.boxShadow = '0 6px 18px rgba(0,0,0,0.12)';
    t.style.marginTop = '8px';
    t.textContent = message;
    area.appendChild(t);
    setTimeout(()=>{ t.style.opacity = '0'; t.style.transform='translateX(12px)'; }, ttl-300);
    setTimeout(()=>{ area.removeChild(t); }, ttl);
  }

  // Normalize imported rows: flexible headers
  function normalizeRows(rows){
    if(!Array.isArray(rows)) return [];
    return rows.map(r=>{
      // try various header names
      const account = r.account || r['Account'] || r['الحساب'] || r['Account Name'] || r['AccountName'] || '';
      const code = r.code || r['Code'] || r['رمز'] || r['Account Code'] || '';
      const debit = safeNum(r.debit ?? r.Debit ?? r['مدين'] ?? r.Dr ?? 0);
      const credit = safeNum(r.credit ?? r.Credit ?? r['دائن'] ?? r.Cr ?? 0);
      const type = (r.type || r.Type || '').toString().toLowerCase();
      // some files give single amount column
      const amount = r.amount ?? r.Amount ?? r.value ?? r.Value;
      if((debit===0 && credit===0) && typeof amount !== 'undefined'){
        const v = Number(amount||0);
        return v>=0 ? {account, code, debit: v, credit: 0, type} : {account, code, debit:0, credit: Math.abs(v), type};
      }
      return {account, code, debit, credit, type};
    }).filter(r => (r.account || r.code) && (r.debit || r.credit || r.code));
  }

  // Render helpers
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
      <td><input data-field="debit" type="number" step="0.01" class="form-control form-control-sm" value="${rowObj.debit||0}" /></td>
      <td><input data-field="credit" type="number" step="0.01" class="form-control form-control-sm" value="${rowObj.credit||0}" /></td>
      <td class="text-center"><button class="btn btn-sm btn-danger btn-del">${I18N['delete']||'حذف'}</button></td>
    `;
    // set select value
    const sel = tr.querySelector('select[data-field="type"]');
    if(rowObj.type) try{ sel.value = rowObj.type; }catch(e){}
    return tr;
  }

  // Full render (initial or load)
  function renderAll(){
    tbBody.innerHTML = '';
    const trial = window.__trialData || [];
    trial.forEach((r, idx) => {
      const tr = createRowElement(r, idx);
      tbBody.appendChild(tr);
    });
    attachEventsDelegation();
    calculateAndHighlight();
  }

  // Update single row in DOM (by index)
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

  // Event delegation for edits / delete
  function attachEventsDelegation(){
    // remove previous listener if any (safe)
    tbBody.querySelectorAll('input, select, button.btn-del').forEach(el=>{
      el.onchange = null;
      el.onclick = null;
    });

    tbBody.addEventListener('input', onTbInput);
    tbBody.addEventListener('change', onTbInput);
    // for delete buttons via click
    tbBody.querySelectorAll('.btn-del').forEach(btn=>{
      btn.addEventListener('click', (e)=>{
        const tr = e.target.closest('tr');
        const idx = Number(tr.dataset.idx);
        window.__trialData.splice(idx,1);
        saveToLocal();
        renderAll(); // indices changed, re-render all rows
        showToast(I18N['deleted'] || 'تم الحذف', 'success');
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
    if(field==='debit' || field==='credit') value = Number(value||0);
    window.__trialData[idx][field] = value;
    saveToLocal();
    // update only this row visually (and totals)
    updateRowDom(idx);
    calculateAndHighlight(); // update totals & validation
  }

  // Add row
  addRowBtn.addEventListener('click', ()=>{
    window.__trialData.push({account:'', code:'', debit:0, credit:0, type:'asset'});
    saveToLocal();
    renderAll();
    showToast(I18N['row_added']||'تم إضافة صف', 'success');
  });

  // File input parsing
  fileInput.addEventListener('change', e=>{
    const f = e.target.files[0];
    if(!f) return;
    const name = f.name.toLowerCase();
    if(name.endsWith('.csv')){
      Papa.parse(f, { header:true, skipEmptyLines:true, complete: res=>{
        window.__trialData = normalizeRows(res.data);
        saveToLocal(); renderAll();
        showToast(I18N['file_loaded']||'تم تحميل الملف', 'success');
      }});
    } else {
      const reader = new FileReader();
      reader.onload = ev=>{
        const arr = new Uint8Array(ev.target.result);
        const wb = XLSX.read(arr, { type:'array' });
        const first = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(first, { defval:'' });
        window.__trialData = normalizeRows(json);
        saveToLocal(); renderAll();
        showToast(I18N['file_loaded']||'تم تحميل الملف', 'success');
      };
      reader.readAsArrayBuffer(f);
    }
  });

  // Calculate totals & highlight rows
  function calculateAndHighlight(){
    const trial = window.__trialData || [];
    let totalDebit = 0, totalCredit = 0;
    trial.forEach(r => { totalDebit += safeNum(r.debit); totalCredit += safeNum(r.credit); });
    // highlight rows via classes on tbody rows
    tbBody.querySelectorAll('tr').forEach(tr=>{ tr.classList.remove('balanced','unbalanced'); });
    if(Math.abs(totalDebit - totalCredit) < 0.01){
      tbBody.querySelectorAll('tr').forEach(tr=>tr.classList.add('balanced'));
      validationResult.innerHTML = `<div class="alert alert-success">${I18N['balanced']||'ميزان المراجعة متوازن'} — ${fmtCurrency(totalDebit)}</div>`;
    } else {
      tbBody.querySelectorAll('tr').forEach(tr=>tr.classList.add('unbalanced'));
      validationResult.innerHTML = `<div class="alert alert-danger">${I18N['unbalanced']||'ميزان المراجعة غير متوازن'} — (${I18N['debit']||'مدين'}: ${fmtCurrency(totalDebit)} — ${I18N['credit']||'دائن'}: ${fmtCurrency(totalCredit)})</div>`;
    }
  }

  // Validate button
  validateBtn.addEventListener('click', ()=>{
    const trial = window.__trialData || [];
    if(!trial.length){ showToast(I18N['no_data']||'لا توجد بيانات للتحقق', 'error'); return; }
    calculateAndHighlight();
    showToast(I18N['validation_done']||'تم التحقق', 'success');
  });

  // Save / Load / Clear functions
  function saveToLocal(){
    try{
      localStorage.setItem('trialSession', JSON.stringify(window.__trialData||[]));
      localStorage.setItem('fa_session_v1', JSON.stringify({trial: window.__trialData||[], savedAt: new Date().toISOString()}));
      return true;
    }catch(e){ console.error(e); return false; }
  }

  saveBtn.addEventListener('click', ()=>{
    saveToLocal();
    showToast(I18N['saved']||'تم حفظ الجلسة محلياً', 'success');
  });

  loadBtn.addEventListener('click', ()=>{
    let loaded = null;
    for(const k of STORAGE_KEYS){
      const s = localStorage.getItem(k);
      if(s){
        try{
          const obj = JSON.parse(s);
          if(Array.isArray(obj)) { loaded = obj; break; }
          if(obj && Array.isArray(obj.trial)) { loaded = obj.trial; break; }
        }catch(e){}
      }
    }
    if(!loaded){ showToast(I18N['no_saved']||'لا توجد جلسة محفوظة', 'error'); return; }
    window.__trialData = normalizeRows(loaded);
    renderAll();
    showToast(I18N['loaded']||'تم استرجاع الجلسة', 'success');
  });

  clearBtn.addEventListener('click', ()=>{
    if(!confirm(I18N['confirm_clear']||'هل تريد مسح كل البيانات؟')) return;
    window.__trialData = [];
    for(const k of STORAGE_KEYS) localStorage.removeItem(k);
    renderAll();
    showToast(I18N['cleared']||'تم مسح البيانات', 'success');
  });

  // Export PDF (html2pdf) — include watermark/logo by cloning main content and adding watermark node
  if(exportPdfBtn) exportPdfBtn.addEventListener('click', async ()=>{
    try{
      const mainEl = document.querySelector('main') || document.body;
      // clone
      const clone = mainEl.cloneNode(true);
      // add watermark
      const wm = document.createElement('div');
      wm.style.position='fixed'; wm.style.top='50%'; wm.style.left='50%';
      wm.style.transform='translate(-50%,-50%)'; wm.style.opacity='0.06'; wm.style.fontSize='64px'; wm.style.color='#000';
      wm.style.pointerEvents='none'; wm.style.zIndex='1000';
      // try to use logo image if exists
      const logoUrl = 'assets/logo.png';
      const img = document.createElement('img'); img.src = logoUrl; img.style.maxWidth='260px'; img.style.opacity='0.06';
      wm.appendChild(img);
      const wrapper = document.createElement('div');
      wrapper.appendChild(clone);
      wrapper.appendChild(wm);
      const opt = { filename: 'trial-balance-report.pdf', margin: 12, jsPDF:{unit:'mm',format:'a4'}, html2canvas:{scale:2} };
      await html2pdf().from(wrapper).set(opt).save();
      showToast(I18N['export_pdf_ok']||'تم تصدير PDF', 'success');
    }catch(e){ console.error(e); showToast(I18N['export_pdf_fail']||'فشل تصدير PDF', 'error'); }
  });

  // Export Excel (XLSX) — create workbook with sheet data and a Summary sheet with logo text
  if(exportExcelBtn) exportExcelBtn.addEventListener('click', ()=>{
    try{
      const trial = window.__trialData || [];
      if(!trial.length){ showToast(I18N['no_data_export']||'لا توجد بيانات للتصدير', 'error'); return; }
      const wb = XLSX.utils.book_new();
      // main sheet — convert to friendly headers
      const sheetData = trial.map(r => ({ الحساب: r.account, الرمز: r.code, مدين: r.debit, دائن: r.credit, النوع: r.type }));
      const ws = XLSX.utils.json_to_sheet(sheetData);
      XLSX.utils.book_append_sheet(wb, ws, 'ميزان المراجعة');
      // summary sheet
      const totalDebit = trial.reduce((s,r)=>s+safeNum(r.debit),0);
      const totalCredit = trial.reduce((s,r)=>s+safeNum(r.credit),0);
      const summary = [
        [ 'Financial Analyzer' ],
        [ 'Report generated', new Date().toLocaleString() ],
        [],
        [ 'Total Debit', totalDebit ],
        [ 'Total Credit', totalCredit ],
        [ 'Balanced', Math.abs(totalDebit - totalCredit) < 0.01 ? 'Yes' : 'No' ]
      ];
      const ws2 = XLSX.utils.aoa_to_sheet(summary);
      XLSX.utils.book_append_sheet(wb, ws2, 'Summary');
      XLSX.writeFile(wb, 'trial-balance.xlsx');
      showToast(I18N['export_excel_ok']||'تم تصدير Excel', 'success');
    }catch(e){ console.error(e); showToast(I18N['export_excel_fail']||'فشل تصدير Excel', 'error'); }
  });

  // i18n loader & apply
  async function loadI18n(lang){
    try{
      const res = await fetch(`lang/${lang}.json`);
      if(!res.ok) throw new Error('i18n fetch failed');
      I18N = await res.json();
      applyTranslations();
    }catch(e){
      console.error('i18n load error', e);
    }
  }
  function applyTranslations(){
    // translate static elements by data-i18n attribute or known ids
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.dataset.i18n || el.getAttribute('data-i18n');
      if(key && I18N[key]) el.textContent = I18N[key];
    });
    // translate some dynamic elements by ids (fallback)
    try{
      if(document.getElementById('upload-hint')) document.getElementById('upload-hint').textContent = I18N['upload_hint'] || document.getElementById('upload-hint').textContent;
      if(document.getElementById('upload-title')) document.getElementById('upload-title').textContent = I18N['upload_title'] || document.getElementById('upload-title').textContent;
    }catch(e){}
    // table column headers: replace if present
    const ths = document.querySelectorAll('table thead th');
    const mapping = ['col_account','col_type','col_code','col_debit','col_credit','col_actions'];
    ths.forEach((th,i)=>{ if(I18N[mapping[i]]) th.textContent = I18N[mapping[i]]; });
    // re-render row selects (so options localized)
    renderAll();
  }

  // Language select handler (if exists)
  if(langSelect){
    langSelect.value = localStorage.getItem('lang') || defaultLang;
    loadI18n(langSelect.value);
    langSelect.addEventListener('change', (e)=>{
      const v = e.target.value;
      localStorage.setItem('lang', v);
      loadI18n(v);
    });
  } else {
    loadI18n(defaultLang);
  }

  // Dark mode toggle
  if(darkToggle){
    const st = localStorage.getItem('darkMode') === 'true';
    darkToggle.checked = st;
    document.body.classList.toggle('dark-mode', st);
    darkToggle.addEventListener('change', e=>{
      const on = e.target.checked;
      document.body.classList.toggle('dark-mode', on);
      localStorage.setItem('darkMode', on ? 'true' : 'false');
    });
  }

  // Currency select
  if(currencySelect){
    const cur = localStorage.getItem('currency') || currencySelect.value;
    currencySelect.value = cur;
    currencySelect.addEventListener('change', e=>{
      localStorage.setItem('currency', e.target.value);
      renderAll(); // reformat totals
    });
  }

  // Utility: single-value gettext fallback
  function gettext(key, fallback){ return (I18N && I18N[key]) ? I18N[key] : (fallback || key); }

  // show message helper used earlier
  function showMessageBox(html, timeout=3000){ validationResult.innerHTML = html; if(timeout) setTimeout(()=>validationResult.innerHTML='', timeout); }

  // Initial load from storage
  (function initLoad(){
    // load settings
    const settings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    if(settings.lang){
      if(langSelect) langSelect.value = settings.lang;
      loadI18n(settings.lang);
    }
    if(settings.currency && currencySelect) currencySelect.value = settings.currency;
    if(settings.theme){
      if(settings.theme === 'dark' && darkToggle){
        darkToggle.checked = true; document.body.classList.add('dark-mode');
      }
    }
    // load trial data
    for(const k of STORAGE_KEYS){
      const s = localStorage.getItem(k);
      if(s){
        try{
          const obj = JSON.parse(s);
          if(Array.isArray(obj)){ window.__trialData = normalizeRows(obj); break; }
          if(obj && Array.isArray(obj.trial)){ window.__trialData = normalizeRows(obj.trial); break; }
        }catch(e){}
      }
    }
    renderAll();
  })();

  // small CSS for toast (create once)
  (function injectToastStyles(){
    const css = `.fa-toast { transition: all 0.35s ease; } .fa-toast-success{ background:#198754; } .fa-toast-error{ background:#d9534f; } .fa-toast-info{ background:#0d6efd; }`;
    const s = document.createElement('style'); s.appendChild(document.createTextNode(css)); document.head.appendChild(s);
  })();

}); // DOMContentLoaded end
