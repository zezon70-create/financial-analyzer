/* main.js - نسخة مطورة ومتكاملة
   متوافقة مع reports.html و dashboard/input المعدلة.
   المتطلبات: PapaParse (للـ CSV)، SheetJS (XLSX)، html2pdf.js (لـ PDF)
*/

/* ---------- إعدادات عامة / حالة تطبيق بسيطة ---------- */
const FA = {
  sessionKey: 'fa_session_v1',
  currency: localStorage.getItem('fa_currency') || 'EGP',
  // أسعار صرف تقريبية (يمكن استبدالها بAPI لاحقاً)
  fx: { EGP: 1, USD: 30.9, EUR: 33.8 },
  numberOptions: { maximumFractionDigits: 2 },
};

/* ---------- مساعدة: تنسيقات و helpers ---------- */
function formatCurrency(value, currency = FA.currency) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return '-';
  const v = Number(value) / (FA.fx[currency] || 1); // افتراض: القيم مخزنة بوحدة EGP، هذا يسهّل التبديل - عدل حسب حاجتك
  return new Intl.NumberFormat('ar-EG', { style: 'currency', currency }).format(v);
}

function safeNum(x) { return Number(x || 0); }

/* ---------- قراءة / حفظ الجلسة ---------- */
function saveSessionToLocal(sessionName = FA.sessionKey) {
  try {
    const trial = window.__trialData || [];
    const session = { trial, savedAt: new Date().toISOString() };
    localStorage.setItem(sessionName, JSON.stringify(session));
    return true;
  } catch (e) { console.error(e); return false; }
}
function loadSession(sessionName = FA.sessionKey) {
  try {
    const raw = localStorage.getItem(sessionName);
    if (!raw) return null;
    const obj = JSON.parse(raw);
    window.__trialData = obj.trial || [];
    return obj;
  } catch (e) { console.error(e); return null; }
}
function clearSession(sessionName = FA.sessionKey) {
  localStorage.removeItem(sessionName);
  window.__trialData = [];
}

/* ---------- Normalize trial rows (يدعم رؤوس مختلفة) ---------- */
function normalizeRows(rows) {
  // rows: array of objects (from papa or sheetjs) or arrays
  const out = [];
  for (const r of rows) {
    if (!r) continue;
    if (Array.isArray(r)) {
      // assume [account, code, debit, credit] or [account, debit, credit]
      const account = r[0] || '';
      const code = r[1] || '';
      const debit = safeNum(r[2]) || 0;
      const credit = safeNum(r[3]) || 0;
      if (!account) continue;
      out.push({ account: account.toString(), code: code.toString(), debit, credit });
    } else {
      // object keys may vary - try multiple possibilities
      const account = r['account'] || r['الحساب'] || r['Account'] || r['اسم'] || r['name'] || '';
      const code = r['code'] || r['رقم الحساب'] || r['Code'] || '';
      // some files may have value column instead of debit/credit
      const debit = safeNum(r['debit'] || r['مدين'] || r['Debit'] || r['Dr'] || 0);
      const credit = safeNum(r['credit'] || r['دائن'] || r['Credit'] || r['Cr'] || 0);
      // sometimes single column 'value' with sign convention: positive = debit
      const value = r['value'] || r['القيمة'] || r['Value'];
      if (value !== undefined && (debit === 0 && credit === 0)) {
        const v = Number(value || 0);
        if (v >= 0) out.push({ account: account.toString(), code: code.toString(), debit: v, credit: 0 });
        else out.push({ account: account.toString(), code: code.toString(), debit: 0, credit: Math.abs(v) });
      } else {
        if (!account) continue;
        out.push({ account: account.toString(), code: code.toString(), debit, credit });
      }
    }
  }
  return out;
}

/* ---------- تصنيف الحسابات إلى بنوك / أصول / خصوم / إيرادات / مصروفات (قواعد Heuristics بسيطة) ---------- */
function classifyAccountName(name) {
  // يطبّق قواعد كلمات مفتاحية لاتخاذ القرار - يمكن توسيعها لاحقًا
  if (!name) return 'other';
  const s = name.toString().toLowerCase();

  // Assets current
  if (/(صندوق|نقد|بنك|بنكي|مدينون|مدينين|مديونية|حسابات مدينة|مدين)/i.test(s)) return 'asset_current';
  if (/(مخزون|بضاعة|مخزون|مخزونات)/i.test(s)) return 'asset_current';
  // Non current assets
  if (/(أصل ثابت|أصول ثابتة|مبان|معدات|ممتلكات|استثمارات)/i.test(s)) return 'asset_noncurrent';

  // Liabilities
  if (/(دائنون|موردون|مستحقات|التزامات قصيرة|قروض قصيرة|ذمم دائنة)/i.test(s)) return 'liability_current';
  if (/(قروض طويلة|قرض طويل|التزامات طويلة|سندات)/i.test(s)) return 'liability_noncurrent';

  // Equity
  if (/(رأس المال|أرباح محتجزة|حقوق الملكية|رأس المال|احتياطيات)/i.test(s)) return 'equity';

  // Revenue / Sales
  if (/(مبيعات|إيراد|revenue|sales|إيرادات)/i.test(s)) return 'revenue';

  // COGS
  if (/(تكلفة المبيعات|تكلفة البضاعة|COGS|تكاليف مباشرة)/i.test(s)) return 'cogs';

  // Operating expenses
  if (/(مصاريف|مصروف|تكاليف|رواتب|أجور|إيجار|إعلانات|صيانة|مصاريف تشغيلية|عمومية|إدارية|إدارية)/i.test(s)) {
    // distinguish finance expenses vs operating by keywords
    if (/(مصاريف فوائد|فوائد|مصاريف تمويلية|تكلفة التمويل)/i.test(s)) return 'expense_finance';
    return 'expense_operating';
  }

  // Tax
  if (/(ضريبة|ضريبة الدخل|ضرائب)/i.test(s)) return 'tax';

  // other income/expenses
  if (/(إيرادات أخرى|دخل آخر|عوائد)/i.test(s)) return 'other_income';
  if (/(مصاريف أخرى)/i.test(s)) return 'other_expense';

  return 'other';
}

/* ---------- بناء مجموعة مصنفة من ميزان المراجعة ---------- */
function buildClassifiedTrial(trialRows) {
  const rows = normalizeRows(trialRows);
  // aggregate by account name + classification
  const map = {}; // key -> { account, code, debit, credit, class }
  for (const r of rows) {
    const account = (r.account || '').toString().trim();
    const code = (r.code || '').toString().trim();
    const classKey = classifyAccountName(account);
    const key = `${classKey}||${account}||${code}`;
    if (!map[key]) map[key] = { account, code, debit: 0, credit: 0, classKey };
    map[key].debit += safeNum(r.debit);
    map[key].credit += safeNum(r.credit);
  }
  // return as array
  return Object.values(map);
}

/* ---------- توليد القوائم المالية المفصلة ---------- */
function generateTrialBalanceDetailed(trialRows) {
  // simply return classified rows with net balance (debit - credit)
  const classified = buildClassifiedTrial(trialRows);
  return classified.map(r => ({
    account: r.account,
    code: r.code,
    classKey: r.classKey,
    debit: r.debit,
    credit: r.credit,
    balance: r.debit - r.credit
  }));
}

function generateIncomeStatementDetailed(trialRows) {
  const classified = buildClassifiedTrial(trialRows);
  // sum by categories
  const sumBy = (cats) => classified.filter(r => cats.includes(r.classKey)).reduce((s, x) => s + (x.credit - x.debit), 0);
  // Note: revenues typically credits > debits; expenses debits > credits -> we use (credit - debit) for revenues, (debit - credit) for expenses
  const sales = sumBy(['revenue']);
  const cogs = sumBy(['cogs']);
  const grossProfit = sales - cogs;
  const operatingExpenses = sumBy(['expense_operating']);
  const operatingProfit = grossProfit - operatingExpenses;
  const financeExpenses = sumBy(['expense_finance']); // note: this may be negative (credit > debit) depending on entry convention
  const otherIncome = sumBy(['other_income']);
  const otherExpenses = sumBy(['other_expense']);
  const netBeforeTax = operatingProfit + otherIncome - otherExpenses - financeExpenses;
  const tax = sumBy(['tax']); // tax usually credit? depends on entries; we take credit - debit
  const netAfterTax = netBeforeTax - tax;
  return {
    sales, cogs, grossProfit,
    operatingExpenses, operatingProfit,
    financeExpenses, otherIncome, otherExpenses,
    netBeforeTax, tax, netAfterTax
  };
}

function generateBalanceSheetDetailed(trialRows) {
  const classified = buildClassifiedTrial(trialRows);
  const sum = (cat) => classified.filter(r => r.classKey === cat).reduce((s, x) => s + (x.debit - x.credit), 0);

  const currentAssets = sum('asset_current');
  const nonCurrentAssets = sum('asset_noncurrent');
  const totalAssets = currentAssets + nonCurrentAssets;

  const currentLiabilities = sum('liability_current');
  const nonCurrentLiabilities = sum('liability_noncurrent');
  const totalLiabilities = currentLiabilities + nonCurrentLiabilities;

  const equity = sum('equity');

  return {
    currentAssets, nonCurrentAssets, totalAssets,
    currentLiabilities, nonCurrentLiabilities, totalLiabilities,
    equity
  };
}

/* تقدير قائمة التدفقات النقدية (heuristic من ميزان المراجعة فقط) */
function generateCashFlowEstimated(trialRows) {
  // مبسطة: تدفقات التشغيل = صافي الربح بعد الضريبة + (تغير في عناصر التشغيل غير نقدية) -- لكن من ميزان المراجعة وحده سهل نخمن:
  const is = generateIncomeStatementDetailed(trialRows);
  const bs = generateBalanceSheetDetailed(trialRows);

  // Incoming cash approximated by revenues (credits) and outgoing by expenses (debits)
  const operating = is.netAfterTax; // تبسيط: Net income ≈ operating cash (تحذير: تخمين)
  // investing: التغير في الاصول غير المتداولة (نفترض شراء/بيع أصول = -nonCurrentAssets)
  const investing = -bs.nonCurrentAssets;
  // financing: قروض + تغير حقوق ملكية (نعتبر equity and loans)
  const financing = bs.currentLiabilities + bs.nonCurrentLiabilities + bs.equity;

  return { operating, investing, financing, netChange: operating + investing + financing };
}

/* ---------- دوال Render HTML للتقارير (تُستخدم داخل reports.html) ---------- */
function renderTrialBalance(trialRows) {
  const tb = generateTrialBalanceDetailed(trialRows);
  let html = '<table class="table table-sm"><thead class="table-light"><tr><th>الحساب</th><th>رمز</th><th>الفئة</th><th>مدين</th><th>دائن</th><th>الرصيد</th></tr></thead><tbody>';
  for (const r of tb) {
    html += `<tr>
      <td>${escapeHtml(r.account)}</td>
      <td>${escapeHtml(r.code)}</td>
      <td>${escapeHtml(r.classKey)}</td>
      <td>${formatCurrency(r.debit)}</td>
      <td>${formatCurrency(r.credit)}</td>
      <td>${formatCurrency(r.balance)}</td>
    </tr>`;
  }
  html += '</tbody></table>';
  return html;
}

function renderIncomeStatement(trialRows) {
  const s = generateIncomeStatementDetailed(trialRows);
  let html = '<table class="table table-sm"><tbody>';
  html += rowPair('إجمالي المبيعات', formatCurrency(s.sales));
  html += rowPair('تكلفة المبيعات', formatCurrency(s.cogs));
  html += rowPair('مجمل الربح', formatCurrency(s.grossProfit));
  html += rowPair('المصروفات التشغيلية', formatCurrency(s.operatingExpenses));
  html += rowPair('الربح التشغيلي', formatCurrency(s.operatingProfit));
  html += rowPair('إيرادات أخرى', formatCurrency(s.otherIncome));
  html += rowPair('مصاريف أخرى', formatCurrency(s.otherExpenses));
  html += rowPair('مصاريف تمويلية', formatCurrency(s.financeExpenses));
  html += rowPair('صافي الربح قبل الضريبة', formatCurrency(s.netBeforeTax));
  html += rowPair('الضريبة', formatCurrency(s.tax));
  html += `<tr class="table-primary"><td><b>صافي الربح بعد الضريبة</b></td><td><b>${formatCurrency(s.netAfterTax)}</b></td></tr>`;
  html += '</tbody></table>';
  return html;
}

function renderBalanceSheet(trialRows) {
  const b = generateBalanceSheetDetailed(trialRows);
  let html = '<table class="table table-sm"><tbody>';
  html += rowPair('الأصول المتداولة', formatCurrency(b.currentAssets));
  html += rowPair('الأصول غير المتداولة', formatCurrency(b.nonCurrentAssets));
  html += `<tr class="table-success"><td><b>إجمالي الأصول</b></td><td><b>${formatCurrency(b.totalAssets)}</b></td></tr>`;
  html += rowPair('الخصوم المتداولة', formatCurrency(b.currentLiabilities));
  html += rowPair('الخصوم طويلة الأجل', formatCurrency(b.nonCurrentLiabilities));
  html += `<tr class="table-danger"><td><b>إجمالي الخصوم</b></td><td><b>${formatCurrency(b.totalLiabilities)}</b></td></tr>`;
  html += rowPair('حقوق الملكية', formatCurrency(b.equity));
  html += '</tbody></table>';
  return html;
}

function renderCashFlow(trialRows) {
  const cf = generateCashFlowEstimated(trialRows);
  let html = '<table class="table table-sm"><tbody>';
  html += rowPair('التدفقات التشغيلية (تقديري)', formatCurrency(cf.operating));
  html += rowPair('التدفقات الاستثمارية (تقديري)', formatCurrency(cf.investing));
  html += rowPair('التدفقات التمويلية (تقديري)', formatCurrency(cf.financing));
  html += `<tr class="table-primary"><td><b>صافي التغير النقدي</b></td><td><b>${formatCurrency(cf.netChange)}</b></td></tr>`;
  html += '</tbody></table>';
  return html;
}

/* ---------- تجهيزة تصدير: تحويل لصفائف JSON مناسبة للـ XLSX ---------- */
function exportTrialBalance(trialRows) {
  return generateTrialBalanceDetailed(trialRows).map(r => ({
    الحساب: r.account, رمز: r.code, الفئة: r.classKey, مدين: r.debit, دائن: r.credit, رصيد: r.balance
  }));
}
function exportIncomeStatement(trialRows) {
  const s = generateIncomeStatementDetailed(trialRows);
  return [
    { بند: 'المبيعات', قيمة: s.sales },
    { بند: 'تكلفة المبيعات', قيمة: s.cogs },
    { بند: 'مجمل الربح', قيمة: s.grossProfit },
    { بند: 'مصاريف تشغيلية', قيمة: s.operatingExpenses },
    { بند: 'الربح التشغيلي', قيمة: s.operatingProfit },
    { بند: 'مصاريف تمويلية', قيمة: s.financeExpenses },
    { بند: 'إيرادات أخرى', قيمة: s.otherIncome },
    { بند: 'مصاريف أخرى', قيمة: s.otherExpenses },
    { بند: 'صافي قبل الضريبة', قيمة: s.netBeforeTax },
    { بند: 'ضريبة', قيمة: s.tax },
    { بند: 'صافي بعد الضريبة', قيمة: s.netAfterTax }
  ];
}
function exportBalanceSheet(trialRows) {
  const b = generateBalanceSheetDetailed(trialRows);
  return [
    { بند: 'الأصول المتداولة', قيمة: b.currentAssets },
    { بند: 'الأصول غير المتداولة', قيمة: b.nonCurrentAssets },
    { بند: 'إجمالي الأصول', قيمة: b.totalAssets },
    { بند: 'الخصوم المتداولة', قيمة: b.currentLiabilities },
    { بند: 'الخصوم طويلة الأجل', قيمة: b.nonCurrentLiabilities },
    { بند: 'إجمالي الخصوم', قيمة: b.totalLiabilities },
    { بند: 'حقوق الملكية', قيمة: b.equity }
  ];
}
function exportCashFlow(trialRows) {
  const cf = generateCashFlowEstimated(trialRows);
  return [
    { بند: 'التشغيل', قيمة: cf.operating },
    { بند: 'الاستثمار', قيمة: cf.investing },
    { بند: 'التمويل', قيمة: cf.financing },
    { بند: 'صافي التغير', قيمة: cf.netChange }
  ];
}

/* ---------- دوال مساعدة صغيرة ---------- */
function rowPair(left, right) {
  return `<tr><td style="text-align:right">${escapeHtml(left)}</td><td style="text-align:left">${escapeHtml(right)}</td></tr>`;
}
function escapeHtml(s) {
  if (s === null || s === undefined) return '';
  return String(s).replace(/[&<>"'`=\/]/g, function (c) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
  });
}

/* ---------- Export PDF (يعتمد على html2pdf أو window.print) ---------- */
function exportReportToPdf(domId = 'report-area', filename = 'financial-report.pdf') {
  const el = document.getElementById(domId);
  if (!el) {
    alert('عنصر التقرير غير موجود للطباعة');
    return;
  }
  // options html2pdf
  const opt = {
    margin: [10, 10, 10, 10],
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };
  // call html2pdf; العلامة المائية و الهيدر موجودين في DOM لذلك سيأخذها
  html2pdf().set(opt).from(el).save();
}

/* ---------- Export Excel شامل ---------- */
function exportAllToExcel(filename = 'financial-report.xlsx') {
  const session = loadSession();
  if (!session || !session.trial) { alert('لا توجد بيانات للتصدير'); return; }
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(exportTrialBalance(session.trial)), 'ميزان المراجعة');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(exportIncomeStatement(session.trial)), 'قائمة الدخل');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(exportBalanceSheet(session.trial)), 'الميزانية');
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(exportCashFlow(session.trial)), 'التدفقات النقدية');
  XLSX.writeFile(wb, filename);
}

/* ---------- عرض تلقائي عند تحميل صفحة التقارير (إذا وُجدت) ---------- */
function renderReportsIfNeeded() {
  const session = loadSession();
  if (!session || !session.trial) {
    // nothing to render
    return;
  }
  const trial = session.trial;
  // inject into DOM blocks if موجودة
  if (document.getElementById('trialBalanceReport')) document.getElementById('trialBalanceReport').innerHTML = renderTrialBalance(trial);
  if (document.getElementById('incomeStatementReport')) document.getElementById('incomeStatementReport').innerHTML = renderIncomeStatement(trial);
  if (document.getElementById('balanceSheetReport')) document.getElementById('balanceSheetReport').innerHTML = renderBalanceSheet(trial);
  if (document.getElementById('cashFlowReport')) document.getElementById('cashFlowReport').innerHTML = renderCashFlow(trial);
}

/* ---------- تعيين وظائف للوصول الخارجي (reports.html يعتمد عليها) ---------- */
window.renderTrialBalance = renderTrialBalance;
window.renderIncomeStatement = renderIncomeStatement;
window.renderBalanceSheet = renderBalanceSheet;
window.renderCashFlow = renderCashFlow;
window.exportTrialBalance = exportTrialBalance;
window.exportIncomeStatement = exportIncomeStatement;
window.exportBalanceSheet = exportBalanceSheet;
window.exportCashFlow = exportCashFlow;
window.exportReportToPdf = exportReportToPdf;
window.exportActiveReportExcel = exportAllToExcel;
window.generateTrialBalanceDetailed = generateTrialBalanceDetailed;
window.generateIncomeStatementDetailed = generateIncomeStatementDetailed;
window.generateBalanceSheetDetailed = generateBalanceSheetDetailed;
window.generateCashFlowEstimated = generateCashFlowEstimated;

/* ---------- DOMContentLoaded: توصيل عناصر الإدخال (إن وُجدت) ---------- */
document.addEventListener('DOMContentLoaded', () => {
  // File input parsers: يدعم PapaParse و XLSX
  const fileInput = document.getElementById('fileInput');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const f = e.target.files[0];
      if (!f) return;
      const name = f.name.toLowerCase();
      if (name.endsWith('.csv')) {
        Papa.parse(f, {
          header: true,
          skipEmptyLines: true,
          complete: (res) => {
            const normalized = normalizeRows(res.data);
            window.__trialData = normalized;
            saveSessionToLocal();
            renderReportsIfNeeded();
          }
        });
      } else {
        // try XLSX
        const reader = new FileReader();
        reader.onload = (ev) => {
          const data = new Uint8Array(ev.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const first = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(first, { defval: '' });
          const normalized = normalizeRows(json);
          window.__trialData = normalized;
          saveSessionToLocal();
          renderReportsIfNeeded();
        };
        reader.readAsArrayBuffer(f);
      }
    });
  }

  // export buttons if present on page
  const exportAllBtn = document.getElementById('exportAll');
  if (exportAllBtn) exportAllBtn.addEventListener('click', () => exportAllToExcel());

  const printBtn = document.getElementById('printReport');
  if (printBtn) printBtn.addEventListener('click', () => {
    // print via window.print (page has watermark via CSS)
    window.print();
  });

  // currency switcher (إن وجد)
  const currencySelect = document.getElementById('currencySelect');
  if (currencySelect) {
    currencySelect.value = FA.currency;
    currencySelect.addEventListener('change', (e) => {
      FA.currency = e.target.value;
      localStorage.setItem('fa_currency', FA.currency);
      renderReportsIfNeeded();
    });
  }

  // dark mode toggle if present (يتوقع وجود class 'dark-mode' changes in CSS)
  const darkToggle = document.getElementById('darkModeToggle') || document.getElementById('darkToggle');
  if (darkToggle) {
    // set initial state
    if (localStorage.getItem('fa_theme') === 'dark') {
      document.body.classList.add('dark-mode');
      darkToggle.checked = true;
    }
    darkToggle.addEventListener('change', (e) => {
      document.body.classList.toggle('dark-mode', e.target.checked);
      localStorage.setItem('fa_theme', e.target.checked ? 'dark' : 'light');
    });
  }

  // render if on reports page
  renderReportsIfNeeded();
});

/* ---------- إضافات صغيرة: حساب مؤشرات إضافية لو احتجنا لاحقاً ---------- */
// (يمكن إضافة دوال مثل inventory turnover, receivables turnover، تحليل الحساسية...)

/* ---------- نهاية الملف ---------- */
