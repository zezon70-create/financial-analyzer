/* input.js — نسخة محسّنة: قراءة CSV/XLSX, تحرير الجداول, حفظ/تحميل, dark-mode, i18n بسيطة, currency formatting */
/* متطلبات: PapaParse و XLSX محمّلين في الصفحة */

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

  // state
  if (!window.__trialData) window.__trialData = [];
  const STORAGE_KEYS = ['trialSession', 'fa_session_v1', 'financialSession'];

  // helpers
  function safeNum(x){ return Number(x || 0); }
  function escapeHtml(s){ if(s===null||s===undefined) return ''; return String(s).replace(/[&<>"'`=\/]/g,c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#96;','=':'&#x3D;' })[c]); }
  function fmtCurrency(v, curr = (currencySelect ? currencySelect.value : 'EGP')) {
    if (v === null || v === undefined || Number.isNaN(Number(v))) return '-';
    try {
      return new Intl.NumberFormat((langSelect && langSelect.value === 'ar') ? 'ar-EG' : 'en-US', { style: 'currency', currency: curr, maximumFractionDigits: 2 }).format(Number(v));
    } catch (e) { return Number(v).toFixed(2); }
  }

  // normalize rows from various sources
  function normalizeRows(rows) {
    if (!Array.isArray(rows)) return [];
    return rows.map(r => {
      // try many key names
      const account = r.account || r['الحساب'] || r.name || r['Account'] || '';
      const code = r.code || r['رمز'] || r['Code'] || r['رقم الحساب'] || '';
      const debit = safeNum(r.debit ?? r.Debit ?? r['مدين'] ?? r.Dr ?? 0);
      const credit = safeNum(r.credit ?? r.Credit ?? r['دائن'] ?? r.Cr ?? 0);
      const value = r.value ?? r.Value ?? r.amount ?? r.Amount;
      if ((debit === 0 && credit === 0) && value !== undefined) {
        const v = Number(value || 0);
        if (v >= 0) return { account, code, debit: v, credit: 0, type: r.type || '' };
        return { account, code, debit: 0, credit: Math.abs(v), type: r.type || '' };
      }
      return { account, code, debit, credit, type: r.type || '' };
    }).filter(r => (r.account && (r.debit || r.credit || r.code)));
  }

  // render table rows
  function renderRows() {
    tbBody.innerHTML = '';
    const trial = window.__trialData || [];
    let totalDebit = 0, totalCredit = 0;
    trial.forEach((r, idx) => {
      totalDebit += safeNum(r.debit);
      totalCredit += safeNum(r.credit);
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input data-idx="${idx}" data-field="account" class="form-control form-control-sm" value="${escapeHtml(r.account||'')}" /></td>
        <td>
          <select data-idx="${idx}" data-field="type" class="form-select form-select-sm">
            <option value="asset" ${r.type==='asset'?'selected':''}>أصول</option>
            <option value="liability" ${r.type==='liability'?'selected':''}>خصوم</option>
            <option value="equity" ${r.type==='equity'?'selected':''}>حقوق ملكية</option>
            <option value="revenue" ${r.type==='revenue'?'selected':''}>إيرادات</option>
            <option value="expense" ${r.type==='expense'?'selected':''}>مصروفات</option>
          </select>
        </td>
        <td><input data-idx="${idx}" data-field="code" class="form-control form-control-sm" value="${escapeHtml(r.code||'')}" /></td>
        <td><input data-idx="${idx}" data-field="debit" type="number" step="0.01" class="form-control form-control-sm" value="${r.debit||0}" /></td>
        <td><input data-idx="${idx}" data-field="credit" type="number" step="0.01" class="form-control form-control-sm" value="${r.credit||0}" /></td>
        <td class="text-center"><button class="btn btn-sm btn-danger btn-del">حذف</button></td>
      `;
      tbBody.appendChild(tr);
      // attach data-idx attribute on row-level actions
      tr.querySelector('.btn-del').addEventListener('click', () => {
        window.__trialData.splice(idx,1);
        saveToLocal('trialSession'); // keep local copy
        renderRows();
      });
    });

    attachRowEvents();
    highlightBalance(totalDebit, totalCredit);
  }

  function attachRowEvents() {
    tbBody.querySelectorAll('input[data-idx], select[data-idx]').forEach(inp => {
      inp.onchange = (e) => {
        const idx = Number(e.target.dataset.idx);
        const field = e.target.dataset.field;
        const v = (field === 'debit' || field === 'credit') ? Number(e.target.value || 0) : e.target.value;
        window.__trialData[idx][field] = v;
        saveToLocal('trialSession');
        renderRows();
      };
    });
  }

  // add row
  addRowBtn.addEventListener('click', () => {
    if (!Array.isArray(window.__trialData)) window.__trialData = [];
    window.__trialData.push({ account:'', type:'asset', code:'', debit:0, credit:0 });
    saveToLocal('trialSession');
    renderRows();
  });

  // file input handling
  fileInput.addEventListener('change', (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const name = f.name.toLowerCase();
    if (name.endsWith('.csv')) {
      Papa.parse(f, { header: true, skipEmptyLines: true, complete: (res) => {
        window.__trialData = normalizeRows(res.data);
        saveToLocal('trialSession');
        renderRows();
      }});
    } else {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const arr = new Uint8Array(ev.target.result);
        const wb = XLSX.read(arr, { type: 'array' });
        const first = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(first, { defval: '' });
        window.__trialData = normalizeRows(json);
        saveToLocal('trialSession');
        renderRows();
      };
      reader.readAsArrayBuffer(f);
    }
  });

  // highlight balance
  function highlightBalance(totalDebit, totalCredit) {
    tbBody.querySelectorAll('tr').forEach(tr => { tr.classList.remove('balanced','unbalanced'); });
    if (Math.abs(totalDebit - totalCredit) < 0.01) {
      tbBody.querySelectorAll('tr').forEach(tr => tr.classList.add('balanced'));
      validationResult.innerHTML = `<div class="alert alert-success">ميزان المراجعة متوازن ✅ — ${fmtCurrency(totalDebit)}</div>`;
    } else {
      tbBody.querySelectorAll('tr').forEach(tr => tr.classList.add('unbalanced'));
      validationResult.innerHTML = `<div class="alert alert-danger">ميزان المراجعة غير متوازن ❌ (مدين: ${fmtCurrency(totalDebit)} — دائن: ${fmtCurrency(totalCredit)})</div>`;
    }
    setTimeout(()=>{ /* keep message for 6s */ }, 6000);
  }

  // validate button
  validateBtn.addEventListener('click', () => {
    const trial = window.__trialData || [];
    if (!trial.length) { validationResult.innerHTML = `<div class="alert alert-warning">لا توجد بيانات للتحقق.</div>`; return; }
    let totalDebit = 0, totalCredit = 0;
    trial.forEach(r => { totalDebit += safeNum(r.debit); totalCredit += safeNum(r.credit); });
    highlightBalance(totalDebit, totalCredit);
  });

  // save/load/clear
  function saveToLocal(key = 'trialSession') {
    try {
      localStorage.setItem(key, JSON.stringify(window.__trialData || []));
      // also write common key fa_session_v1 for compatibility
      localStorage.setItem('fa_session_v1', JSON.stringify({ trial: window.__trialData || [], savedAt: new Date().toISOString() }));
      return true;
    } catch (e) {
      console.error(e); return false;
    }
  }
  saveBtn.addEventListener('click', () => { saveToLocal('trialSession'); showMessage('تم حفظ الجلسة محلياً.'); });

  loadBtn.addEventListener('click', () => {
    let loaded = null;
    for (const k of STORAGE_KEYS) {
      const s = localStorage.getItem(k);
      if (s) {
        try {
          const obj = JSON.parse(s);
          if (Array.isArray(obj)) { loaded = obj; break; }
          if (obj && Array.isArray(obj.trial)) { loaded = obj.trial; break; }
        } catch(e){}
      }
    }
    if (!loaded) { showMessage('لا توجد جلسة محفوظة', true); return; }
    window.__trialData = normalizeRows(loaded);
    renderRows();
    showMessage('تم استرجاع الجلسة.');
  });

  clearBtn.addEventListener('click', () => {
    if (!confirm('هل تريد مسح كل البيانات؟')) return;
    window.__trialData = [];
    for (const k of STORAGE_KEYS) localStorage.removeItem(k);
    renderRows();
    showMessage('تم مسح البيانات.');
  });

  // export PDF (simple)
  if (exportPdfBtn) exportPdfBtn.addEventListener('click', () => {
    const el = document.querySelector('main') || document.body;
    html2pdf().set({ filename: 'trial-balance-report.pdf', jsPDF:{ unit:'mm', format:'a4' } }).from(el).save();
  });

  // export Excel (simple)
  if (exportExcelBtn) exportExcelBtn.addEventListener('click', () => {
    try {
      const trial = window.__trialData || [];
      if (!trial.length) { alert('لا توجد بيانات للتصدير'); return; }
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(trial.map(r => ({
        الحساب: r.account, رمز: r.code, مدين: r.debit, دائن: r.credit, النوع: r.type
      })));
      XLSX.utils.book_append_sheet(wb, ws, 'ميزان المراجعة');
      XLSX.writeFile(wb, 'trial-balance.xlsx');
    } catch (e) {
      console.error(e); alert('فشل التصدير إلى Excel');
    }
  });

  // utility messages
  function showMessage(msg, isError=false) {
    validationResult.innerHTML = `<div class="alert ${isError ? 'alert-danger':'alert-info'}">${msg}</div>`;
    setTimeout(()=>{ if (validationResult) validationResult.innerHTML = ''; }, 3500);
  }

  // initial render + settings (dark mode + currency + language)
  // dark-mode
  if (darkToggle) {
    const stored = localStorage.getItem('darkMode') === 'true';
    darkToggle.checked = stored;
    document.body.classList.toggle('dark-mode', stored);
    darkToggle.addEventListener('change', (e) => {
      document.body.classList.toggle('dark-mode', e.target.checked);
      localStorage.setItem('darkMode', e.target.checked ? 'true' : 'false');
    });
  }
  // currency
  if (currencySelect) {
    const storedC = localStorage.getItem('currency');
    if (storedC) currencySelect.value = storedC;
    currencySelect.addEventListener('change', (e) => { localStorage.setItem('currency', e.target.value); renderRows(); });
  }
  // language
  if (langSelect) {
    const storedL = localStorage.getItem('lang');
    if (storedL) langSelect.value = storedL;
    langSelect.addEventListener('change', (e) => { localStorage.setItem('lang', e.target.value); renderRows(); });
  }

  // initial load from storage (if any)
  (function initLoad(){
    // load trialSession or fallback keys
    const s = localStorage.getItem('trialSession') || localStorage.getItem('fa_session_v1') || localStorage.getItem('financialSession');
    if (s) {
      try {
        const obj = JSON.parse(s);
        if (Array.isArray(obj)) window.__trialData = normalizeRows(obj);
        else if (obj && Array.isArray(obj.trial)) window.__trialData = normalizeRows(obj.trial);
      } catch(e){}
    }
    renderRows();
  })();

}); // DOMContentLoaded end
