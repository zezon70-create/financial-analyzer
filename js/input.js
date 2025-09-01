// التعامل مع صفحة الادخال
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

  // عرض صف جديد في الجدول
  function renderRows() {
    tbBody.innerHTML = '';
    const trial = window.__trialData || [];
    trial.forEach((r, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><input data-idx="${idx}" data-field="account" value="${escapeHtml(r.account || '')}" /></td>
        <td><input data-idx="${idx}" data-field="code" value="${escapeHtml(r.code || '')}" /></td>
        <td><input data-idx="${idx}" data-field="debit" value="${r.debit != null ? r.debit : 0}" /></td>
        <td><input data-idx="${idx}" data-field="credit" value="${r.credit != null ? r.credit : 0}" /></td>
        <td>
          <button class="btn btn-sm btn-danger btn-del" data-idx="${idx}">حذف</button>
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

  downloadTemplateBtn.addEventListener('click', () => downloadCSVTemplate());

  addRowBtn.addEventListener('click', () => {
    if (!window.__trialData) window.__trialData = [];
    window.__trialData.push({ account: '', code: '', debit: 0, credit: 0 });
    renderRows();
  });

  parseFileBtn.addEventListener('click', () => {
    const f = fileInput.files[0];
    if (!f) { fileMsg.innerText = 'لم تختَر ملفاً.'; return; }
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
        }
      });
    } else {
      // حاول قراءة Excel عبر SheetJS
      const reader = new FileReader();
      reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, { type: 'array' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const json = XLSX.utils.sheet_to_json(ws, { defval: '' });
        const parsed = parseCsvToTrial(json);
        window.__trialData = parsed;
        renderRows();
        fileMsg.innerText = 'تم استيراد Excel بنجاح.';
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
    } else {
      validationResult.innerHTML = `<div class="alert alert-danger">ميزان المراجعة غير متوازن! مدين: ${fmt(totalDebit)} — دائن: ${fmt(totalCredit)}.</div>`;
    }
  });

  saveBtn.addEventListener('click', () => {
    if (!window.__trialData) window.__trialData = [];
    saveSessionToLocal();
    alert('تم حفظ الجلسة محليًا في المتصفح.');
  });

  loadBtn.addEventListener('click', () => {
    const s = loadSession();
    if (!s) return alert('لا توجد جلسة محفوظة.');
    alert('تم استرجاع الجلسة المحفوظة.');
    renderRows();
  });

  clearBtn.addEventListener('click', () => {
    if (!confirm('هل أنت متأكد من مسح كل البيانات؟')) return;
    clearSession();
    renderRows();
  });

  // init
  if (!window.__trialData) window.__trialData = [];
  renderRows();

  // attach dynamic inputs from table
  // helpers
  function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }
});
