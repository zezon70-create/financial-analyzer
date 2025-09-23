// scripts/input.js
// إدارة صفحة إدخال ميزان المراجعة:
// - رفع CSV / XLSX
// - إدخال يدوي (إضافة سطر، حذف سطر، تحرير الحقول)
// - حفظ الجلسة إلى localStorage
// - استرجاع جلسة محفوظة
// - تحقق توازن (مدين = دائن)
// - تصدير CSV / XLSX (يعتمد على export.js إذا موجود)

// ---------- helper: map row from parsed file ----------
function mapRowToInternal(r) {
  return {
    account: (r.account || r.Account || r['الحساب'] || r['Account'] || '').toString(),
    accountNumber: (r.accountNumber || r['رقم الحساب'] || r.AccountNumber || '').toString(),
    debit: Number(r.debit ?? r.Debit ?? r.Dr ?? r['مدين'] ?? 0) || 0,
    credit: Number(r.credit ?? r.Credit ?? r.Cr ?? r['دائن'] ?? 0) || 0
  };
}

// ---------- Storage integration (يعتمد على storage.js الموجود) ----------
function saveCurrentTrial(rows) {
  // rows: array of {account, accountNumber, debit, credit}
  try {
    // حافظ على بنية متوافقة مع dashboard.js (trial)
    const payload = { trial: rows, updatedAt: new Date().toISOString() };
    if (typeof saveCurrentData === 'function') {
      saveCurrentData(payload); // storage.js
    } else {
      localStorage.setItem('financialData', JSON.stringify(payload));
    }
    showFileMsg((stateLang==='ar' ? 'تم حفظ البيانات محلياً' : 'Saved locally'), 'success');
  } catch (e) {
    console.error('saveCurrentTrial error', e);
    showFileMsg((stateLang==='ar' ? 'فشل حفظ البيانات' : 'Save failed'), 'danger');
  }
}

function loadCurrentTrial() {
  try {
    if (typeof loadCurrentData === 'function') {
      const p = loadCurrentData();
      if (!p) return null;
      return p.trial ?? p.data ?? p;
    }
    const raw = localStorage.getItem('financialData') || localStorage.getItem('fa:data:v1');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed.trial ?? parsed.data ?? parsed;
  } catch (e) {
    console.warn('loadCurrentTrial error', e);
    return null;
  }
}

// ---------- UI helpers ----------
const tbBody = () => document.getElementById('tbBody');
const fileMsgEl = () => document.getElementById('fileMsg');
const validationResultEl = () => document.getElementById('validationResult');

function showFileMsg(text, type='info') {
  const el = fileMsgEl();
  if (!el) return;
  el.textContent = text;
  el.className = (type === 'success') ? 'small text-success' : (type === 'danger') ? 'small text-danger' : 'small text-muted';
}

function showValidation(msg, ok = true) {
  const el = validationResultEl();
  if (!el) return;
  el.innerHTML = `<div class="card ${ok ? 'card-ok' : 'card-bad'} p-2">${msg}</div>`;
}

// ---------- render rows in editable table ----------
function renderRows(rows) {
  const body = tbBody();
  if(!body) return;
  body.innerHTML = '';
  rows.forEach((r, idx) => {
    const tr = document.createElement('tr');
    tr.dataset.index = idx;
    tr.innerHTML = `
      <td><input class="form-input account-input" value="${escapeHtml(r.account)}" /></td>
      <td><input class="form-input accno-input" value="${escapeHtml(r.accountNumber)}" /></td>
      <td><input class="form-input debit-input" type="number" min="0" value="${Number(r.debit) || 0}" /></td>
      <td><input class="form-input credit-input" type="number" min="0" value="${Number(r.credit) || 0}" /></td>
      <td><button class="btn btn-sm btn-danger delete-row">حذف</button></td>
    `;
    body.appendChild(tr);
  });
  attachRowEvents();
}

// attach events to inputs and delete buttons
function attachRowEvents() {
  const deleteBtns = document.querySelectorAll('#tbBody .delete-row');
  deleteBtns.forEach(b => b.addEventListener('click', (e) => {
    const tr = e.target.closest('tr');
    if (!tr) return;
    tr.remove();
    saveFromTableToStorage();
  }));

  const inputs = document.querySelectorAll('#tbBody input');
  inputs.forEach(inp => {
    inp.addEventListener('change', () => saveFromTableToStorage());
    inp.addEventListener('input', () => {
      // if auto-save enabled we will save on change (handled by change event)
    });
  });
}

// read rows from table DOM
function readRowsFromTable() {
  const rows = [];
  const trs = document.querySelectorAll('#tbBody tr');
  trs.forEach(tr => {
    const account = tr.querySelector('.account-input')?.value?.trim() || '';
    const accountNumber = tr.querySelector('.accno-input')?.value?.trim() || '';
    const debit = Number(tr.querySelector('.debit-input')?.value || 0) || 0;
    const credit = Number(tr.querySelector('.credit-input')?.value || 0) || 0;
    rows.push({ account, accountNumber, debit, credit });
  });
  return rows;
}

function saveFromTableToStorage() {
  const rows = readRowsFromTable();
  saveCurrentTrial(rows);
  if (autoSaveEnabled) showFileMsg((stateLang==='ar' ? 'تم الحفظ تلقائياً' : 'Auto-saved'), 'success');
}

// ---------- CSV / XLSX parsing ----------
function handleFileImport(file) {
  const ext = (file.name.split('.').pop() || '').toLowerCase();
  if (ext === 'csv') {
    parseCSVFile(file, (mapped, err) => {
      if (err) {
        console.error(err);
        showFileMsg((stateLang==='ar' ? 'فشل قراءة CSV' : 'Failed to parse CSV'), 'danger');
        return;
      }
      // دمج البيانات
      const rows = mapped.map(mapRowToInternal);
      renderRows(rows);
      saveCurrentTrial(rows);
      showFileMsg((stateLang==='ar' ? 'تم استيراد CSV' : 'CSV imported'), 'success');
    });
  } else if (ext === 'xlsx' || ext === 'xls') {
    parseExcelFile(file, (mapped, err) => {
      if (err) {
        console.error(err);
        showFileMsg((stateLang==='ar' ? 'فشل قراءة Excel' : 'Failed to parse Excel'), 'danger');
        return;
      }
      const rows = mapped.map(mapRowToInternal);
      renderRows(rows);
      saveCurrentTrial(rows);
      showFileMsg((stateLang==='ar' ? 'تم استيراد Excel' : 'Excel imported'), 'success');
    });
  } else {
    showFileMsg((stateLang==='ar' ? 'نوع ملف غير مدعوم' : 'Unsupported file type'), 'danger');
  }
}

// ---------- validation: check debit == credit ----------
function validateTrial() {
  const rows = readRowsFromTable();
  const totalDebit = rows.reduce((s,r) => s + Number(r.debit||0), 0);
  const totalCredit = rows.reduce((s,r) => s + Number(r.credit||0), 0);
  const balanced = Math.abs(totalDebit - totalCredit) < 0.0001;
  if (balanced) {
    showValidation((stateLang==='ar' ? `ميزان المراجعة متوازن — المدين = ${formatNumber(totalDebit)} ، الدائن = ${formatNumber(totalCredit)}` : `Trial balance is balanced — Debit = ${formatNumber(totalDebit)}, Credit = ${formatNumber(totalCredit)}`), true);
  } else {
    showValidation((stateLang==='ar' ? `غير متوازن — المدين = ${formatNumber(totalDebit)} ، الدائن = ${formatNumber(totalCredit)} (الفرق ${formatNumber(totalDebit-totalCredit)})` : `Not balanced — Debit = ${formatNumber(totalDebit)}, Credit = ${formatNumber(totalCredit)} (Diff ${formatNumber(totalDebit-totalCredit)})`), false);
  }
  return balanced;
}

// ---------- utility formatting ----------
function formatNumber(n){
  try { return Number(n).toLocaleString(); } catch(e){ return n; }
}

function escapeHtml(s){
  return (''+s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ---------- download template ----------
function downloadTemplateCSV() {
  const csv = `الحساب,رقم الحساب,مدين,دائن
مبيعات,4000,0,100000
مصاريف رواتب,5000,20000,0
أصول ثابتة,100,50000,0
قروض,200,0,20000
حقوق ملكية,300,0,30000
`;
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'trial_balance_template.csv';
  a.click();
}

// ---------- export CSV / XLSX (fallback to simple CSV if export.js absent) ----------
function exportCSVFromTable() {
  const rows = readRowsFromTable();
  if (typeof exportTrialCSV === 'function') {
    exportTrialCSV(rows, 'trial_balance_export.csv');
    return;
  }
  // fallback
  const header = ['الحساب','رقم الحساب','مدين','دائن'];
  const lines = [header.join(',')];
  rows.forEach(r => {
    lines.push([r.account, r.accountNumber, r.debit, r.credit].map(v => `"${String(v).replace(/"/g,'""')}"`).join(','));
  });
  const blob = new Blob([lines.join('\n')], {type:'text/csv;charset=utf-8;'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'trial_balance_export.csv';
  a.click();
}

function exportXLSXFromTable() {
  const rows = readRowsFromTable();
  if (typeof exportTrialXLSX === 'function') {
    exportTrialXLSX(rows, 'trial_balance_export.xlsx');
    return;
  }
  // fallback: use SheetJS if available
  if (typeof XLSX !== 'undefined') {
    const ws_data = [['الحساب','رقم الحساب','مدين','دائن'], ...rows.map(r=>[r.account,r.accountNumber,r.debit,r.credit])];
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, 'trial');
    XLSX.writeFile(wb, 'trial_balance_export.xlsx');
    return;
  }
  alert((stateLang==='ar' ? 'لا يوجد دعم لتصدير XLSX' : 'XLSX export not available'));
}

// ---------- sessions: حفظ و استرجاع ----------
function saveSessionSnapshot() {
  const name = prompt(stateLang==='ar' ? 'اسم الجلسة للحفظ:' : 'Session name:');
  if (!name) return;
  const rows = readRowsFromTable();
  const snapshot = { id: Date.now().toString(), name, data: { trial: rows, created: new Date().toISOString() } };
  // use storage.js addSessionSnapshot if exists
  if (typeof addSessionSnapshot === 'function') {
    // ensure current data saved first
    saveCurrentTrial(rows);
    // addSessionSnapshot will use saveCurrentData internally in storage.js; but we can push custom snapshot:
    // call addSessionSnapshot(name) is provided earlier — but that stores the currently saved 'fa:data:v1'
    addSessionSnapshot(name);
    showFileMsg((stateLang==='ar' ? 'تم حفظ الجلسة' : 'Session saved'), 'success');
    return;
  }
  // fallback: store sessions list manually
  const listRaw = localStorage.getItem('fa:sessions:v1');
  const list = listRaw ? JSON.parse(listRaw) : [];
  list.push(snapshot);
  localStorage.setItem('fa:sessions:v1', JSON.stringify(list));
  showFileMsg((stateLang==='ar' ? 'تم حفظ الجلسة' : 'Session saved'), 'success');
}

function loadSessionPrompt() {
  // load sessions list
  const listRaw = localStorage.getItem('fa:sessions:v1');
  const list = listRaw ? JSON.parse(listRaw) : [];
  if (!list.length) {
    alert(stateLang==='ar' ? 'لا توجد جلسات محفوظة' : 'No saved sessions');
    return;
  }
  // build quick selector prompt
  let msg = (stateLang==='ar' ? 'اختر رقم الجلسة للتحميل:\n' : 'Choose session index to load:\n');
  list.forEach((s,i)=> {
    msg += `${i}: ${s.name} (${new Date(s.created || s.data?.created || Date.now()).toLocaleString()})\n`;
  });
  const idx = prompt(msg);
  if (idx === null) return;
  const n = Number(idx);
  if (isNaN(n) || n < 0 || n >= list.length) {
    alert(stateLang==='ar' ? 'قيمة غير صحيحة' : 'Invalid index');
    return;
  }
  const picked = list[n];
  const rows = (picked.data && picked.data.trial) ? picked.data.trial : (picked.trial || []);
  renderRows(rows);
  saveCurrentTrial(rows);
  showFileMsg((stateLang==='ar' ? 'تم تحميل الجلسة' : 'Session loaded'), 'success');
}

// ---------- Auto-save toggle ----------
let autoSaveEnabled = false;
function toggleAutoSave(btn) {
  autoSaveEnabled = !autoSaveEnabled;
  btn.textContent = (autoSaveEnabled ? (stateLang==='ar' ? 'Auto-save: ON' : 'Auto-save: ON') : (stateLang==='ar' ? 'Auto-save: OFF' : 'Auto-save: OFF'));
}

// ---------- Utilities: CSV parse wrapper & Excel parse wrapper
// parseCSVFile and parseExcelFile are expected to exist (papaparse & xlsx). If not, show error.

function initInputPage() {
  // detect page language button if exists
  window.stateLang = (localStorage.getItem('fa:lang') || 'ar'); // used for messages

  const fileInput = document.getElementById('fileInput') || document.getElementById('file-input');
  const parseBtn = document.getElementById('parseFile') || document.getElementById('parseFileBtn');
  const clearBtn = document.getElementById('clearAll');
  const addRowBtn = document.getElementById('addRow');
  const validateBtn = document.getElementById('validate');
  const saveSessionBtn = document.getElementById('saveSession');
  const loadSessionBtn = document.getElementById('loadSession') || document.getElementById('loadSessionBtn');
  const exportCSVBtn = document.getElementById('exportCSV');
  const exportXLSXBtn = document.getElementById('exportXLSX');
  const downloadTemplateBtn = document.getElementById('downloadTemplate');
  const autoSaveBtn = document.getElementById('autoSaveToggle');

  // load existing trial if exists
  const existing = loadCurrentTrial();
  if (existing && existing.length) {
    renderRows(existing);
    showFileMsg(stateLang==='ar' ? 'تم تحميل البيانات المحفوظة' : 'Loaded saved data', 'success');
  } else {
    // start with one empty row
    renderRows([{account:'',accountNumber:'',debit:0,credit:0}]);
  }

  // events
  if (addRowBtn) {
    addRowBtn.addEventListener('click', () => {
      const rows = readRowsFromTable();
      rows.push({account:'',accountNumber:'',debit:0,credit:0});
      renderRows(rows);
      saveFromTableToStorage();
    });
  }

  if (parseBtn && fileInput) {
    parseBtn.addEventListener('click', () => {
      const f = fileInput.files && fileInput.files[0];
      if (!f) {
        showFileMsg(stateLang==='ar' ? 'اختر ملف أولا' : 'Choose a file first', 'danger');
        return;
      }
      handleFileImport(f);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (!confirm(stateLang==='ar' ? 'هل تريد حذف كل البيانات المحلية؟' : 'Clear all local data?')) return;
      // حذف المفاتيح الشائعة
      ['financialData','fa:data:v1','fa:data','fa_sessions_data'].forEach(k=>localStorage.removeItem(k));
      // افرغ الجدول
      renderRows([{account:'',accountNumber:'',debit:0,credit:0}]);
      showFileMsg(stateLang==='ar' ? 'تم المسح' : 'Cleared', 'success');
    });
  }

  if (validateBtn) {
    validateBtn.addEventListener('click', () => validateTrial());
  }

  if (saveSessionBtn) {
    saveSessionBtn.addEventListener('click', () => saveSessionSnapshot());
  }

  if (loadSessionBtn) {
    loadSessionBtn.addEventListener('click', () => loadSessionPrompt());
  }

  if (exportCSVBtn) {
    exportCSVBtn.addEventListener('click', () => exportCSVFromTable());
  }

  if (exportXLSXBtn) {
    exportXLSXBtn.addEventListener('click', () => exportXLSXFromTable());
  }

  if (downloadTemplateBtn) {
    downloadTemplateBtn.addEventListener('click', () => downloadTemplateCSV());
  }

  if (autoSaveBtn) {
    autoSaveBtn.addEventListener('click', () => toggleAutoSave(autoSaveBtn));
  }

  // keyboard: add new row on Ctrl+Enter in last row
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      const rows = readRowsFromTable();
      rows.push({account:'',accountNumber:'',debit:0,credit:0});
      renderRows(rows);
    }
  });
}

// ---------- Initialize when DOM ready ----------
document.addEventListener('DOMContentLoaded', () => {
  try {
    initInputPage();
  } catch (e) {
    console.error('initInputPage error', e);
  }
});
