// scripts/main.js

// تحميل الجلسة: يجرب secureLoad ثم fallback على localStorage
async function loadSession(){
  // محاولة القراءة بدون كلمة مرور أولاً
  try {
    const raw = localStorage.getItem('fa:data:v1');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.trial) return parsed;
    // otherwise return raw if already array or obj
    return parsed;
  } catch(e){ console.warn('loadSession fallback parse failed', e); return null; }
}

// تنسيق/تلخيص الـ trial إلى مؤشرات رئيسية
function normalizeTrial(trial){
  // trial قد يكون كائن يحتوي على حقول مباشرة أو مصفوفة صفوف
  // نتيجة: {revenues, expenses, assets, liabilities, equity, profit}
  const result = {revenues:0, expenses:0, assets:0, liabilities:0, equity:0, profit:0};

  if (!trial) return result;

  // إذا كان trial يحتوي على الحقول مباشرة، استخدمها
  if (typeof trial === 'object' && !Array.isArray(trial)) {
    // detected fields
    result.revenues = Number(trial.revenues ?? trial.Revenues ?? trial.sales ?? 0) || 0;
    result.expenses = Number(trial.expenses ?? trial.Expenses ?? trial.costs ?? 0) || 0;
    result.assets = Number(trial.assets ?? 0) || 0;
    result.liabilities = Number(trial.liabilities ?? trial.liability ?? 0) || 0;
    result.equity = Number(trial.equity ?? trial.equityValue ?? 0) || 0;
    result.profit = Number(trial.profit ?? result.revenues - result.expenses) || (result.revenues - result.expenses);
    // If trial is object with 'rows' or array inside, handle below
    if (Array.isArray(trial.rows)) return aggregateFromRows(trial.rows);
    if (Array.isArray(trial)) return aggregateFromRows(trial);
  }

  // إذا كانت البيانات صفوفاً (مصفوفة)
  if (Array.isArray(trial)) {
    return aggregateFromRows(trial);
  }

  return result;
}

// محاولات ذكية لاستخراج القيم من صفوف ميزان المراجعة
function aggregateFromRows(rows){
  const r = {revenues:0, expenses:0, assets:0, liabilities:0, equity:0, profit:0};
  if (!rows || !rows.length) return r;

  const revKeywords = ['sales','revenue','income','إيراد','مبيعات','إيرادات'];
  const expKeywords = ['expense','cost','مصروف','مصاريف','تكلفة'];
  const assetKeywords = ['asset','الأصول','موجودات','اصل'];
  const liabKeywords = ['liabil','الدين','الخصوم','قرض'];
  const equityKeywords = ['equity','حقوق','ملكية','رأس المال'];

  rows.forEach(row=>{
    // row may have account, debit, credit
    const acc = (row.account ?? row.Account ?? row.AccountName ?? '').toString().toLowerCase();
    const debit = Number(row.debit ?? row.Debit ?? row.Dr ?? 0) || 0;
    const credit = Number(row.credit ?? row.Credit ?? row.Cr ?? 0) || 0;

    // simple heuristic: credits to revenue, debits to expense (common in some charts)
    // but better to check keywords
    if (revKeywords.some(k=>acc.includes(k))) {
      r.revenues += credit || debit;
    } else if (expKeywords.some(k=>acc.includes(k))) {
      r.expenses += debit || credit;
    } else if (assetKeywords.some(k=>acc.includes(k))) {
      r.assets += debit || credit;
    } else if (liabKeywords.some(k=>acc.includes(k))) {
      r.liabilities += credit || debit;
    } else if (equityKeywords.some(k=>acc.includes(k))) {
      r.equity += credit || debit;
    } else {
      // fallback: if debit>0 consider expense placeholder, if credit>0 consider revenue
      if (credit>0) r.revenues += credit;
      if (debit>0) r.expenses += debit;
    }
  });

  r.profit = r.revenues - r.expenses;
  return r;
}

function formatNumber(n){
  try { return Number(n).toLocaleString(); } catch(e){ return n; }
}
