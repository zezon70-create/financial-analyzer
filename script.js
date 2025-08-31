// ======== Global Settings ========
let currentLanguage = 'ar';
let trialBalanceData = []; // بيانات ميزان المراجعة
let financialStatements = {}; // تخزين القوائم المالية
let analysisResults = {}; // تخزين نتائج التحليل المالي

// ======== Language Switch ========
function switchLanguage(lang) {
  currentLanguage = lang;
  // مثال تبسيطي لتغيير النصوص، يمكن إضافة ترجمة لكل عنصر
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
}

// ======== Data Entry Handling ========
document.getElementById('trialBalanceForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // جمع البيانات من الجدول
  trialBalanceData = [];
  const rows = document.querySelectorAll('#trialBalanceTable tbody tr');
  rows.forEach(row => {
    const account = row.querySelector('.account').value;
    const debit = parseFloat(row.querySelector('.debit').value.replace(/,/g, '')) || 0;
    const credit = parseFloat(row.querySelector('.credit').value.replace(/,/g, '')) || 0;
    trialBalanceData.push({ account, debit, credit });
  });

  alert('تم حفظ البيانات!');
  
  // إنشاء القوائم المالية تلقائيًا
  generateStatements();
  // تحديث التحليل المالي
  generateAnalysis();
  // تحديث الداشبورد
  updateDashboard();
});

// ======== Generate Financial Statements ========
function generateStatements() {
  const assets = trialBalanceData.filter(a => a.account.toLowerCase().includes('أصول')).reduce((sum,a)=>sum+a.debit-a.credit,0);
  const liabilities = trialBalanceData.filter(a => a.account.toLowerCase().includes('خصوم')).reduce((sum,a)=>sum+a.credit-a.debit,0);
  const equity = trialBalanceData.filter(a => a.account.toLowerCase().includes('رأس المال')).reduce((sum,a)=>sum+a.credit-a.debit,0);
  const revenues = trialBalanceData.filter(a => a.account.toLowerCase().includes('إيراد')).reduce((sum,a)=>sum+a.credit-a.debit,0);
  const expenses = trialBalanceData.filter(a => a.account.toLowerCase().includes('مصروف')).reduce((sum,a)=>sum+a.debit-a.credit,0);

  financialStatements = {
    balanceSheet: { assets, liabilities, equity },
    incomeStatement: { revenues, expenses, netIncome: revenues - expenses },
    cashFlow: { cashIn: revenues, cashOut: expenses, netCash: revenues - expenses }
  };

  // عرض النتائج في صفحة statements.html
  if(document.getElementById('balanceSheet')) {
    document.getElementById('balanceSheet').innerHTML = `
      <h3>الميزانية</h3>
      <p>الأصول: ${assets.toLocaleString()}</p>
      <p>الخصوم: ${liabilities.toLocaleString()}</p>
      <p>رأس المال: ${equity.toLocaleString()}</p>
    `;
  }

  if(document.getElementById('incomeStatement')) {
    document.getElementById('incomeStatement').innerHTML = `
      <h3>قائمة الدخل</h3>
      <p>الإيرادات: ${revenues.toLocaleString()}</p>
      <p>المصاريف: ${expenses.toLocaleString()}</p>
      <p>صافي الربح: ${(revenues - expenses).toLocaleString()}</p>
    `;
  }

  if(document.getElementById('cashFlow')) {
    document.getElementById('cashFlow').innerHTML = `
      <h3>قائمة التدفقات النقدية</h3>
      <p>التدفقات الداخلة: ${revenues.toLocaleString()}</p>
      <p>التدفقات الخارجة: ${expenses.toLocaleString()}</p>
      <p>صافي التدفقات: ${(revenues - expenses).toLocaleString()}</p>
    `;
  }
}

// ======== Financial Analysis ========
function generateAnalysis() {
  const { balanceSheet, incomeStatement } = financialStatements;
  const currentRatio = balanceSheet.assets && balanceSheet.liabilities ? (balanceSheet.assets / balanceSheet.liabilities).toFixed(2) : 0;
  const netProfitMargin = incomeStatement.revenues ? (incomeStatement.netIncome / incomeStatement.revenues * 100).toFixed(2) : 0;
  const EVA = incomeStatement.netIncome - (0.1 * balanceSheet.assets); // مثال على القيمة الاقتصادية المضافة
  const risk = Math.random().toFixed(2); // مؤقت: يمكن استبداله بمعادلة المخاطر الحقيقية

  analysisResults = {
    currentRatio,
    netProfitMargin,
    EVA,
    risk
  };

  // عرض النتائج في analysis.html
  if(document.getElementById('financialRatios')) {
    document.getElementById('financialRatios').innerHTML = `
      <h3>النسب المالية</h3>
      <p>النسبة الحالية: ${currentRatio}</p>
      <p>هامش صافي الربح: ${netProfitMargin}%</p>
    `;
  }

  if(document.getElementById('modernAnalysis')) {
    document.getElementById('modernAnalysis').innerHTML = `
      <h3>التحليل الحديث</h3>
      <p>القيمة الاقتصادية المضافة (EVA): ${EVA.toLocaleString()}</p>
      <p>مؤشر المخاطر: ${risk}</p>
    `;
  }

  // التنبؤ المالي (توقع نمو بسيط 5%)
  if(document.getElementById('forecastResults')) {
    const forecastRevenue = (incomeStatement.revenues * 1.05).toFixed(2);
    const forecastNetIncome = (incomeStatement.netIncome * 1.05).toFixed(2);
    document.getElementById('forecastResults').innerHTML = `
      <h3>التنبؤ المالي</h3>
      <p>الإيرادات المتوقعة للعام القادم: ${parseFloat(forecastRevenue).toLocaleString()}</p>
      <p>صافي الربح المتوقع: ${parseFloat(forecastNetIncome).toLocaleString()}</p>
    `;
  }
}

// ======== Dashboard Charts ========
function updateDashboard() {
  if(document.getElementById('barChart')) {
    const ctx = document.getElementById('barChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['الأصول', 'الخصوم', 'الإيرادات', 'المصاريف'],
        datasets: [{
          label: 'القيم المالية',
          data: [
            financialStatements.balanceSheet.assets,
            financialStatements.balanceSheet.liabilities,
            financialStatements.incomeStatement.revenues,
            financialStatements.incomeStatement.expenses
          ],
          backgroundColor: ['#4CAF50', '#FF5722', '#2196F3', '#FFC107']
        }]
      }
    });
  }

  if(document.getElementById('pieChart')) {
    const ctx = document.getElementById('pieChart').getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['الأصول', 'الخصوم', 'الإيرادات', 'المصاريف'],
        datasets: [{
          data: [
            financialStatements.balanceSheet.assets,
            financialStatements.balanceSheet.liabilities,
            financialStatements.incomeStatement.revenues,
            financialStatements.incomeStatement.expenses
          ],
          backgroundColor: ['#4CAF50', '#FF5722', '#2196F3', '#FFC107']
        }]
      }
    });
  }
}

// ======== Export Functions ========
function exportToExcel() {
  // مثال مبسط: يمكن استبداله بمكتبة XLSX لملف Excel حقيقي
  alert('تصدير Excel جاهز!');
}

function exportToPDF() {
  // مثال مبسط: يمكن استبداله بمكتبة jsPDF لتصدير PDF حقيقي
  alert('تصدير PDF جاهز!');
}
