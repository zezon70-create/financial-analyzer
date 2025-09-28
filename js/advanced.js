// advanced.js

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------
  // إعدادات عامة
  // ----------------------
  const body = document.body;
  const currencySelect = document.getElementById('currencySelect');
  const toggleDarkMode = document.getElementById('toggleDarkMode');
  const toggleLanguage = document.getElementById('toggleLanguage');

  // ----------------------
  // بيانات وهمية مبدئية (يمكن ربطها بملف ميزان المراجعة لاحقًا)
  // ----------------------
  const ratiosData = {
    liquidity: [
      { name: "نسبة السيولة الحالية", value: 1.8, explanation: "النسبة جيدة وتدل على قدرة الشركة على تغطية الالتزامات قصيرة الأجل" },
      { name: "النسبة السريعة", value: 1.2, explanation: "تدل على كفاءة السيولة بدون المخزون" },
    ],
    profitability: [
      { name: "هامش الربح الصافي", value: 0.25, explanation: "ربحية ممتازة مقارنة بالصناعة" },
      { name: "العائد على الأصول", value: 0.12, explanation: "تعكس كفاءة استخدام الأصول" },
    ],
    activity: [
      { name: "دوران المخزون", value: 5.2, explanation: "فعالية جيدة لإدارة المخزون" },
      { name: "دوران الأصول", value: 1.5, explanation: "توضح الاستخدام العام للأصول" },
    ],
    debt: [
      { name: "نسبة الدين إلى حقوق الملكية", value: 0.45, explanation: "مستوى ديون معتدل مقارنة برأس المال" },
      { name: "نسبة تغطية الفوائد", value: 4.8, explanation: "القدرة على سداد الفوائد ممتازة" },
    ],
    advanced: [
      { name: "مؤشر المخاطر المتقدم", value: 0.18, explanation: "مؤشر مخصص يقيس تقلب الأداء المالي مع عوامل غير تقليدية" },
      { name: "مؤشر العائد المتوقع", value: 0.22, explanation: "عائد متوقع استنادًا إلى نماذج التنبؤ الفائقة" },
      { name: "مؤشر القيمة المضافة", value: 0.3, explanation: "يمثل القيمة الاقتصادية المضافة من العمليات المالية غير التقليدية" }
    ]
  };

  // ----------------------
  // دالة عرض الجداول
  // ----------------------
  function populateTable(tbodyId, data) {
    const tbody = document.getElementById(tbodyId);
    tbody.innerHTML = '';
    data.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${item.name}</td><td>${item.value}</td><td>${item.explanation}</td>`;
      tbody.appendChild(tr);
    });
  }

  populateTable('liquidityRatios', ratiosData.liquidity);
  populateTable('profitabilityRatios', ratiosData.profitability);
  populateTable('activityRatios', ratiosData.activity);
  populateTable('debtRatios', ratiosData.debt);
  populateTable('advancedIndicators', ratiosData.advanced);

  // ----------------------
  // إعداد الرسوم البيانية
  // ----------------------
  function createChart(canvasId, label, dataArr, color) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dataArr.map(d => d.name),
        datasets: [{
          label: label,
          data: dataArr.map(d => d.value),
          backgroundColor: color,
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => `${ctx.raw} ${currencySelect.value}` } }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  const liquidityChart = createChart('liquidityChart', 'السيولة', ratiosData.liquidity, '#0d6efd');
  const profitabilityChart = createChart('profitabilityChart', 'الربحية', ratiosData.profitability, '#198754');
  const activityChart = createChart('activityChart', 'النشاط', ratiosData.activity, '#ffc107');
  const debtChart = createChart('debtChart', 'المديونية', ratiosData.debt, '#dc3545');
  const advancedChart = createChart('advancedChart', 'المؤشرات المتقدمة', ratiosData.advanced, '#0dcaf0');

  // ----------------------
  // الداكن/النهاري
  // ----------------------
  toggleDarkMode.addEventListener('click', () => {
    body.dataset.theme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  });

  // ----------------------
  // تبديل العملة
  // ----------------------
  currencySelect.addEventListener('change', () => {
    // تحديث الرسم البياني والقيم
    [liquidityChart, profitabilityChart, activityChart, debtChart, advancedChart].forEach(chart => chart.update());
  });

  // ----------------------
  // تبديل اللغة
  // ----------------------
  toggleLanguage.addEventListener('click', () => {
    const elements = {
      '📊 التحليلات المالية الفائقة': '📊 Advanced Financial Analytics',
      'عرض جميع المؤشرات المالية، التفسيرات، المخاطر، العائدات، والنسب المخصصة المتقدمة.': 'Displaying all financial indicators, explanations, risks, returns, and advanced customized ratios.'
    };
    const h1 = document.querySelector('main h1');
    const p = document.querySelector('main p.lead');
    if (toggleLanguage.textContent.includes('EN')) {
      h1.textContent = elements[h1.textContent] || h1.textContent;
      p.textContent = elements[p.textContent] || p.textContent;
      toggleLanguage.textContent = 'AR / EN';
    } else {
      h1.textContent = '📊 التحليلات المالية الفائقة';
      p.textContent = 'عرض جميع المؤشرات المالية، التفسيرات، المخاطر، العائدات، والنسب المخصصة المتقدمة.';
      toggleLanguage.textContent = 'EN / AR';
    }
  });

  // ----------------------
  // تنبيهات ذكية (Toast)
  // ----------------------
  function showToast(message, type='info') {
    const container = document.querySelector('.toast-container') || (() => {
      const div = document.createElement('div');
      div.className = 'toast-container';
      document.body.appendChild(div);
      return div;
    })();
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }

  // مثال على تنبيه عند تحميل الصفحة
  showToast('الصفحة جاهزة للتحليلات الفائقة ✅', 'success');

});
