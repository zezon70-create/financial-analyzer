// input.js — التعامل مع صفحة الإدخال
document.addEventListener('DOMContentLoaded', () => {
  const tbBody = document.getElementById('tbBody');
  const fileInput = document.getElementById('fileInput');
  const downloadTemplateBtn = document.getElementById('downloadTemplate');
  const parseFileBtn = document.getElementById('parseFile');
  const addRowBtn = document.getElementById('addRow');
  const validateBtn = document.getElementById('validate');
  const saveBtn = document.getElementById('saveSession');
  const loadBtn = document.getElementById('loadSession');
  const clearBtn = document.getElementById('clearAll');
  const validationResult = document.getElementById('validationResult');
  const fileMsg = document.getElementById('fileMsg');
  const alertsHere = document.getElementById('alertsHere');

  function showAlert(msg, type='success', timeout=3500) {
    const id = 'a'+Date.now();
    const div = document.createElement('div');
    div.id = id;
    div.className = `alert alert-${type} alert-dismissible`;
    div.innerHTML = `${msg} <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>`;
    alertsHere.prepend(div);
    if (timeout) setTimeout(()=>{ const el = document.getElementById(id); if (el) el.remove(); }, timeout);
  }

  function renderRows() {
    tbBody.innerHTML = '';
    const trial = window.__trialData || [];
    trial.forEach((r, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input data-idx="${idx}" data-field="account" value="${escapeHtml(r.account || '')}" /></td>
        <td><input data-idx="${idx}" data-field="code" value="${escapeHtml(r.code || '')}" /></td>
        <td><input data-idx="${idx}" data-field="debit" type="number" step="0.01" value="${r.debit != null ? r.debit : 0}" /></td>
        <td><input data-idx="${idx}" data-field="credit" type="number" step="0.01" value="${r.credit != null ? r.credit : 0}" /></td>
        <td>
          <button class="btn btn-sm btn-danger btn-del" data-idx="${idx}"><i class="fa fa-trash"></i></button>
        </td>
      `;
      tbBody.appendChild(tr);
    });
    attachRowEvents();
  }

  function attachRowEvents() {
    tbBody.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const idx = Number(e.target.dataset.idx), field = e.target.dataset.field;
        if (!window.__trialData) window.__trialData = [];
        const v = field === 'debit' || field === 'credit' ? Number(e.target.value || 0) : e.target.value;
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

  downloadTemplateBtn.addEventListener('click', () => {
    downloadCSVTemplate();
    showAlert('تم تحميل قالب الميزان (CSV).', 'info', 3000);
  });

  addRowBtn.addEventListener('click', () => {
    if (!window.__trialData) window.__trialData = [];
    window.__trialData.push({ account: '', code: '', debit: 0, credit: 0 });
    renderRows();
  });

  parseFileBtn.addEventListener('click', () => {
    const f = fileInput.files[0];
    if (!f) { fileMsg.innerText = 'لم تختَر ملفاً.'; showAlert('لم يتم اختيار ملف.', 'warning'); return; }
    const name = f.name.toLowerCase();
    if (name.endsWith('.csv')) {
      Papa.parse(f, {
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
          const parsed = parseCsvToTrial(results.data);
          window.__trialData = parsed;
          renderRows();
          fileMsg.innerText = 'تم استيراد CSV بنجاح.';
          showAlert('تم استيراد CSV بنجاح.', 'success');
        },
        error: function(err) {
          fileMsg.innerText = 'حدث خطأ أثناء قراءة CSV';
          showAlert('خطأ في قراءة CSV.', 'danger');
        }
      });
    } else {
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const data = new Uint8Array(e.target.result);
          const wb = XLSX.read(data, { type: 'array' });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const json = XLSX.utils.sheet_to_json(ws, { defval: '' });
          const parsed = parseCsvToTrial(json);
          window.__trialData = parsed;
          renderRows();
          fileMsg.innerText = 'تم استيراد Excel بنجاح.';
          showAlert('تم استيراد ملف Excel بنجاح.', 'success');
        } catch (err) {
          fileMsg.innerText = 'خطأ في قراءة ملف Excel';
          showAlert('خطأ في قراءة Excel.', 'danger');
        }
      };
      reader.readAsArrayBuffer(f);
    }
  });

  validateBtn.addEventListener('click', () => {
    const trial = window.__trialData || [];
    if (!trial.length) { validationResult.innerHTML = '<div class="alert alert-warning">لا توجد بيانات للتحقق.</div>'; return; }
    let totalDebit = 0, totalCredit = 0;
    for (const r of trial) { totalDebit += Number(r.debit || 0); totalCredit += Number(r.credit || 0); }
    if (Math.abs(totalDebit - totalCredit) < 0.009) {
      validationResult.innerHTML = `<div class="alert alert-success">ميزان المراجعة متوازن. مجموع المدين: ${fmt(totalDebit)} — مجموع الدائن: ${fmt(totalCredit)}</div>`;
      showAlert('ميزان المراجعة متوازن.', 'success');
    } else {
      validationResult.innerHTML = `<div class="alert alert-danger">ميزان المراجعة غير متوازن! مدين: ${fmt(totalDebit)} — دائن: ${fmt(totalCredit)}.</div>`;
      showAlert('ميزان المراجعة غير متوازن!', 'danger');
    }
  });

  saveBtn.addEventListener('click', () => {
    if (!window.__trialData) window.__trialData = [];
    saveSessionToLocal();
    showAlert('تم حفظ الجلسة محليًا في المتصفح.', 'success');
  });

  loadBtn.addEventListener('click', () => {
    const s = loadSession();
    if (!s) { showAlert('لا توجد جلسة محفوظة.', 'warning'); return; }
    showAlert('تم استرجاع الجلسة المحفوظة.', 'info');
    renderRows();
  });

  clearBtn.addEventListener('click', () => {
    if (!confirm('هل أنت متأكد من مسح كل البيانات؟')) return;
    clearSession();
    renderRows();
    showAlert('تم مسح الجلسة من المتصفح.', 'info');
  });

  // init
  if (!window.__trialData) window.__trialData = [];
  renderRows();

  function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
});
