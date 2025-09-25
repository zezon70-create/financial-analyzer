// js/input.js
// نسخة محسّنة لإدارة إدخال ميزان المراجعة
// يتوقع وجود tbody#tbBody و fileInput و أزرار كما في input.html

(function(){
  const SESSION_KEY = 'fa_session_v1';

  // عناصر DOM
  const tbBody = document.getElementById('tbBody');
  const fileInput = document.getElementById('fileInput');
  const addRowBtn = document.getElementById('addRow');
  const validateBtn = document.getElementById('validate');
  const saveBtn = document.getElementById('saveSession');
  const loadBtn = document.getElementById('loadSession');
  const clearBtn = document.getElementById('clearAll');
  const downloadTemplateBtn = document.getElementById('downloadTemplate');
  const validationResult = document.getElementById('validationResult');
  const currencySelect = document.getElementById('currencySelect') || { value: 'EGP', addEventListener: ()=>{} };
  const darkToggle = document.getElementById('darkToggle');
  const langSelect = document.getElementById('langSelect');

  // الحالة المحلية
  let trial = []; // array of rows { account, type, code, debit, credit }
  let currency = localStorage.getItem('fa_currency') || (currencySelect.value || 'EGP');

  // تنسيقات
  function fmtNumber(n) {
    return new Intl.NumberFormat(langSelect && langSelect.value === 'ar' ? 'ar-EG' : 'en-US', { maximumFractionDigits: 2 }).format(Number(n || 0));
  }
  function fmtCurrency(n) {
    try {
      return new Intl.NumberFormat(langSelect && langSelect.value === 'ar' ? 'ar-EG' : 'en-US', { style:'currency', currency }).format(Number(n || 0));
    } catch(e) {
      return fmtNumber(n);
    }
  }

  // ==== Helpers ====
  function escapeHtml(s){ if (s===null||s===undefined) return ''; return String(s).replace(/[&<>"'`=\/]/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#96;','=':'&#61;' })[c]); }

  // Normalize imported rows (يدعم object أو array)
  function normalizeRows(rows) {
    const res = [];
    for (const r of rows) {
      if (!r) continue;
      if (Array.isArray(r)) {
        // [account, code, debit, credit] أو [account, debit, credit]
        const account = r[0] || '';
        const code = r[1] || '';
        const debit = Number(r[2] || 0) || 0;
        const credit = Number(r[3] || 0) || 0;
        if (account) res.push({ account: String(account), code: String(code), type:'asset', debit, credit });
      } else {
        // object with possible keys in Arabic/English
        const account = r.account || r['الحساب'] || r.Name || r.name || r['اسم'] || '';
        const code = r.code || r['رقم الحساب'] || r.Code || '';
        const debit = Number(r.debit || r['مدين'] || r.Debit || r.Dr || 0) || 0;
        const credit = Number(r.credit || r['دائن'] || r.Credit || r.Cr || 0) || 0;
        // if single 'value' column
        const value = r.value || r['القيمة'] || r.Value;
        if ((debit === 0 && credit === 0) && value !== undefined) {
          const v = Number(value || 0);
          if (v >= 0) res.push({ account: String(account), code: String(code), type:'asset', debit: v, credit: 0 });
          else res.push({ account: String(account), code: String(code), type:'revenue', debit: 0, credit: Math.abs(v) });
        } else {
          if (account) res.push({ account: String(account), code: String(code), type:'asset', debit, credit });
        }
      }
    }
    return res;
  }

  // تصنيف اسم الحساب (heuristic) - يمكن توسيع القوانين لاحقاً
  function classifyAccountName(name){
    if(!name) return 'other';
    const s = name.toLowerCase();
    if (/(cash|نقد|صندوق|bank|بنك)/i.test(s)) return 'asset_current';
    if (/(accounts receivable|مدينون|مدين)/i.test(s)) return 'asset_current';
    if (/(inventory|مخزون|بضاعة)/i.test(s)) return 'asset_current';
    if (/(fixed asset|أصل ثابت|مبان|معدات|ممتلكات)/i.test(s)) return 'asset_noncurrent';
    if (/(payable|دائنون|موردون|مستحقات)/i.test(s)) return 'liability_current';
    if (/(loan|قرض|قروض طويلة)/i.test(s)) return 'liability_noncurrent';
    if (/(capital|رأس المال|equity|أرباح محتجزة)/i.test(s)) return 'equity';
    if (/(sales|revenue|مبيعات|إيراد)/i.test(s)) return 'revenue';
    if (/(cogs|تكلفة المبيعات|تكلفة البضاعة)/i.test(s)) return 'cogs';
    if (/(expense|مصروف|مصاريف|رواتب|إيجار|أجور|صيانة)/i.test(s)) return 'expense_operating';
    return 'other';
  }

  // Save / Load session (shared key)
  function saveSession() {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ trial, savedAt: new Date().toISOString() }));
      showMsg('تم حفظ الجلسة محلياً.');
    } catch(e) {
      console.error(e);
      showMsg('حدث خطأ أثناء الحفظ', true);
    }
  }
  function loadSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (obj && Array.isArray(obj.trial)) {
        trial = obj.trial;
        return obj;
      }
      return null;
    } catch(e) {
      console.error(e);
      return null;
    }
  }
  function clearSession() {
    trial = [];
    localStorage.removeItem(SESSION_KEY);
    renderAll();
    showMsg('تم مسح البيانات.');
  }

  // Download CSV template
  function downloadTemplate() {
    const headers = 'account,code,debit,credit\n';
    const example = [
      'صندوق,1001,10000,0',
      'مبيعات,4001,0,15000',
      'مصاريف إيجار,5001,2000,0'
    ].join('\n');
    const csv = headers + example;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'trial_balance_template.csv';
    document.body.appendChild(a); a.click(); a.remove();
    URL.revokeObjectURL(url);
  }

  // ==== Rendering ====
  // render single row at index (replace tr if exists)
  function renderRow(idx) {
    const r = trial[idx];
    let tr = tbBody.querySelector(`tr[data-idx="${idx}"]`);
    if (!tr) {
      tr = document.createElement('tr');
      tr.dataset.idx = idx;
      tbBody.appendChild(tr);
    }
    tr.innerHTML = `
      <td><input data-field="account" class="form-control form-control-sm" value="${escapeHtml(r.account || '')}" /></td>
      <td>
        <select data-field="type" class="form-select form-select-sm">
          <option value="asset" ${r.type==='asset'?'selected':''}>أصول</option>
          <option value="liability" ${r.type==='liability'?'selected':''}>خصوم</option>
          <option value="equity" ${r.type==='equity'?'selected':''}>حقوق ملكية</option>
          <option value="revenue" ${r.type==='revenue'?'selected':''}>إيرادات</option>
          <option value="expense" ${r.type==='expense'?'selected':''}>مصروفات</option>
        </select>
      </td>
      <td><input data-field="code" class="form-control form-control-sm" value="${escapeHtml(r.code || '')}" /></td>
      <td><input data-field="debit" class="form-control form-control-sm text-end" type="number" step="0.01" value="${Number(r.debit || 0)}" /></td>
      <td><input data-field="credit" class="form-control form-control-sm text-end" type="number" step="0.01" value="${Number(r.credit || 0)}" /></td>
      <td>
        <div class="d-flex gap-1">
          <button class="btn btn-sm btn-danger btn-delete">حذف</button>
          <button class="btn btn-sm btn-outline-secondary btn-classify" title="تصنيف تلقائي">تصنيف</button>
        </div>
      </td>
    `;
    // mark balanced/unbalanced later in renderAll
  }

  // render full table (only when necessary)
  function renderAll() {
    tbBody.innerHTML = '';
    for (let i = 0; i < trial.length; i++) renderRow(i);
    // highlight balance
    const totals = trial.reduce((s, r) => {
      s.debit += Number(r.debit || 0);
      s.credit += Number(r.credit || 0);
      return s;
    }, { debit: 0, credit: 0 });
    highlightBalance(totals.debit, totals.credit);
  }

  // update a field on a row (called by event delegation)
  function updateRowField(idx, field, value) {
    if (!trial[idx]) return;
    if (field === 'debit' || field === 'credit') trial[idx][field] = Number(value || 0);
    else trial[idx][field] = value;
    // update display only for that row and totals
    renderRow(idx);
    // recalc totals & highlight
    const totals = trial.reduce((s, r) => { s.debit += Number(r.debit||0); s.credit += Number(r.credit||0); return s; }, { debit:0, credit:0 });
    highlightBalance(totals.debit, totals.credit);
    saveSessionToLocalTemp(); // small autosave
  }

  // small autosave (in-memory local save so user can reload)
  function saveSessionToLocalTemp() {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ trial, savedAt: new Date().toISOString() }));
    } catch(e) { /* ignore */ }
  }

  // highlight rows and show message
  function highlightBalance(totalDebit, totalCredit) {
    const rows = tbBody.querySelectorAll('tr');
    rows.forEach(tr => { tr.classList.remove('balanced','unbalanced'); });
    if (Math.abs(totalDebit - totalCredit) < 0.01) {
      rows.forEach(tr => tr.classList.add('balanced'));
      validationResult.innerHTML = `<div class="alert alert-success mb-0">ميزان المراجعة متوازن ✅ — مجموع المدين: ${fmtCurrency(totalDebit)}, مجموع الدائن: ${fmtCurrency(totalCredit)}</div>`;
    } else {
      rows.forEach(tr => tr.classList.add('unbalanced'));
      validationResult.innerHTML = `<div class="alert alert-danger mb-0">ميزان المراجعة غير متوازن ❌ — مجموع المدين: ${fmtCurrency(totalDebit)}, مجموع الدائن: ${fmtCurrency(totalCredit)}</div>`;
    }
  }

  // ==== Events & File Parsers ====

  // event delegation for table (inputs / selects / buttons)
  tbBody.addEventListener('input', (ev) => {
    const tr = ev.target.closest('tr');
    if (!tr) return;
    const idx = Number(tr.dataset.idx);
    const field = ev.target.dataset.field;
    if (!field) return;
    updateRowField(idx, field, ev.target.value);
  });

  tbBody.addEventListener('change', (ev) => {
    const tr = ev.target.closest('tr');
    if (!tr) return;
    const idx = Number(tr.dataset.idx);
    const field = ev.target.dataset.field;
    if (!field) return;
    updateRowField(idx, field, ev.target.value);
  });

  // click delegation for delete/classify
  tbBody.addEventListener('click', (ev) => {
    const btn = ev.target.closest('button');
    if (!btn) return;
    const tr = btn.closest('tr');
    if (!tr) return;
    const idx = Number(tr.dataset.idx);
    if (btn.classList.contains('btn-delete')) {
      trial.splice(idx, 1);
      // update data-idx attributes of subsequent rows
      renderAll();
      saveSessionToLocalTemp();
      return;
    }
    if (btn.classList.contains('btn-classify')) {
      const name = trial[idx].account || '';
      trial[idx].autoClass = classifyAccountName(name);
      showMsg(`صُنِّف الحساب كـ: ${trial[idx].autoClass}`);
      // optionally we could set type based on autoClass
      renderRow(idx);
      saveSessionToLocalTemp();
      return;
    }
  });

  // Add row
  addRowBtn.addEventListener('click', () => {
    trial.push({ account: '', type: 'asset', code: '', debit: 0, credit: 0 });
    renderAll();
    saveSessionToLocalTemp();
    // scroll into view last row
    const last = tbBody.querySelector('tr:last-child');
    if (last) last.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });

  // Validate button (recalculate)
  validateBtn.addEventListener('click', () => {
    const totals = trial.reduce((s, r) => { s.debit += Number(r.debit||0); s.credit += Number(r.credit||0); return s; }, { debit:0, credit:0 });
    highlightBalance(totals.debit, totals.credit);
  });

  // Save / Load / Clear
  saveBtn.addEventListener('click', saveSession);
  loadBtn.addEventListener('click', () => {
    const obj = loadSession();
    if (!obj || !Array.isArray(obj.trial)) { showMsg('لا توجد جلسة محفوظة', true); return; }
    trial = obj.trial;
    renderAll();
    showMsg('تم استرجاع الجلسة.');
  });
  clearBtn.addEventListener('click', () => {
    if (!confirm('هل تريد مسح كل البيانات؟')) return;
    clearSession();
  });

  // Download template
  downloadTemplateBtn.addEventListener('click', downloadTemplate);

  // File input: CSV via PapaParse, Excel via SheetJS
  fileInput.addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const name = f.name.toLowerCase();
    if (name.endsWith('.csv')) {
      Papa.parse(f, {
        header: true,
        skipEmptyLines: true,
        complete: (res) => {
          const normalized = normalizeRows(res.data);
          // append to existing trial
          trial = trial.concat(normalized);
          renderAll();
          saveSessionToLocalTemp();
          showMsg('تم استيراد ملف CSV.');
        },
        error: (err) => { console.error(err); showMsg('خطأ في قراءة CSV', true); }
      });
    } else {
      // attempt XLSX
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = new Uint8Array(ev.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });
          const normalized = normalizeRows(json);
          trial = trial.concat(normalized);
          renderAll();
          saveSessionToLocalTemp();
          showMsg('تم استيراد ملف Excel.');
        } catch (err) {
          console.error(err);
          showMsg('خطأ في قراءة Excel', true);
        }
      };
      reader.readAsArrayBuffer(f);
    }
    // clear input to allow re-upload same file if needed
    fileInput.value = '';
  });

  // Currency select
  if (currencySelect) {
    currencySelect.value = currency;
    currencySelect.addEventListener('change', (e) => {
      currency = e.target.value;
      localStorage.setItem('fa_currency', currency);
      renderAll();
    });
  }

  // Dark toggle
  if (darkToggle) {
    darkToggle.checked = localStorage.getItem('fa_theme') === 'dark';
    if (darkToggle.checked) document.body.classList.add('dark-mode');
    darkToggle.addEventListener('change', (e) => {
      document.body.classList.toggle('dark-mode', e.target.checked);
      localStorage.setItem('fa_theme', e.target.checked ? 'dark' : 'light');
    });
  }

  // Language select (very light i18n for button texts)
  if (langSelect) {
    langSelect.value = localStorage.getItem('fa_lang') || 'ar';
    langSelect.addEventListener('change', (e) => {
      localStorage.setItem('fa_lang', e.target.value);
      // For now just reformat numbers/text direction as needed
      if (e.target.value === 'en') {
        document.documentElement.lang = 'en';
        document.documentElement.dir = 'ltr';
      } else {
        document.documentElement.lang = 'ar';
        document.documentElement.dir = 'rtl';
      }
      renderAll();
    });
  }

  // Small helper: show message in validationResult area
  function showMsg(msg, isError = false) {
    validationResult.innerHTML = `<div class="alert ${isError ? 'alert-danger' : 'alert-info'} mb-0">${escapeHtml(msg)}</div>`;
    setTimeout(() => { if (validationResult) validationResult.innerHTML = ''; }, 3500);
  }

  // On load: try to load session
  function init() {
    const obj = loadSession();
    if (obj && Array.isArray(obj.trial)) {
      trial = obj.trial;
    } else {
      trial = []; // start empty
    }
    // if there is no data, render an initial blank row for convenience
    if (!trial.length) trial.push({ account:'', type:'asset', code:'', debit:0, credit:0 });
    renderAll();
  }

  // initialize
  init();

  // Expose small API for other pages (optional)
  window.fa = window.fa || {};
  window.fa.getTrial = () => trial;
  window.fa.saveSession = saveSession;
  window.fa.loadSession = loadSession;
  window.fa.clearSession = clearSession;

})();
