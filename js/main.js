// main.js - نسخة معدلة

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileInput");
  const parseFileBtn = document.getElementById("parseFile");
  const downloadTemplateBtn = document.getElementById("downloadTemplate");
  const exportPdfBtn = document.getElementById("exportPdf");
  const exportExcelBtn = document.getElementById("exportExcel");

  let trialBalance = [];
  let reportsData = {};

  // تحميل قالب ميزان المراجعة
  downloadTemplateBtn.addEventListener("click", () => {
    const headers = ["الحساب", "النوع", "القيمة"];
    const csv = [headers.join(",")].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "trial_balance_template.csv");
    link.click();
  });

  // قراءة ملف ميزان المراجعة
  parseFileBtn.addEventListener("click", () => {
    const file = fileInput.files[0];
    if (!file) {
      alert("من فضلك اختر ملف ميزان مراجعة أولاً");
      return;
    }

    Papa.parse(file, {
      header: true,
      complete: function (results) {
        trialBalance = results.data;
        generateReports();
      },
    });
  });

  // توليد التقارير المالية المفصلة
  function generateReports() {
    reportsData = {
      incomeStatement: generateIncomeStatement(trialBalance),
      balanceSheet: generateBalanceSheet(trialBalance),
      ratios: calculateRatios(trialBalance),
    };
    renderReports(reportsData);
  }

  // قائمة الدخل مفصلة
  function generateIncomeStatement(data) {
    let sales = sumAccounts(data, ["إيرادات", "مبيعات"]);
    let cogs = sumAccounts(data, ["تكلفة المبيعات"]);
    let operatingExp = sumAccounts(data, ["مصاريف عمومية", "مصاريف تشغيلية"]);
    let otherRev = sumAccounts(data, ["إيرادات أخرى"]);
    let otherExp = sumAccounts(data, ["مصاريف أخرى"]);
    let tax = sumAccounts(data, ["ضريبة"]);

    let grossProfit = sales - cogs;
    let operatingProfit = grossProfit - operatingExp;
    let netBeforeTax = operatingProfit + otherRev - otherExp;
    let netAfterTax = netBeforeTax - tax;

    return {
      sales,
      cogs,
      grossProfit,
      operatingExp,
      operatingProfit,
      otherRev,
      otherExp,
      netBeforeTax,
      tax,
      netAfterTax,
    };
  }

  // الميزانية العمومية مفصلة
  function generateBalanceSheet(data) {
    let currentAssets = sumAccounts(data, ["نقدية", "بنك", "مدينون", "مخزون"]);
    let nonCurrentAssets = sumAccounts(data, ["أصول ثابتة", "استثمارات"]);
    let currentLiabilities = sumAccounts(data, ["دائنون", "موردون", "التزامات قصيرة"]);
    let nonCurrentLiabilities = sumAccounts(data, ["قروض طويلة"]);
    let equity = sumAccounts(data, ["رأس المال", "أرباح محتجزة"]);

    let totalAssets = currentAssets + nonCurrentAssets;
    let totalLiabilities = currentLiabilities + nonCurrentLiabilities;
    let totalEquity = equity;

    return {
      currentAssets,
      nonCurrentAssets,
      totalAssets,
      currentLiabilities,
      nonCurrentLiabilities,
      totalLiabilities,
      equity: totalEquity,
    };
  }

  // حساب المؤشرات المالية
  function calculateRatios(data) {
    let is = generateIncomeStatement(data);
    let bs = generateBalanceSheet(data);

    return {
      grossMargin: is.sales ? (is.grossProfit / is.sales) * 100 : 0,
      netMargin: is.sales ? (is.netAfterTax / is.sales) * 100 : 0,
      roa: bs.totalAssets ? (is.netAfterTax / bs.totalAssets) * 100 : 0,
      roe: bs.equity ? (is.netAfterTax / bs.equity) * 100 : 0,
      debtRatio: bs.totalAssets ? (bs.totalLiabilities / bs.totalAssets) * 100 : 0,
    };
  }

  // دوال مساعدة لجمع الحسابات
  function sumAccounts(data, keywords) {
    return data
      .filter((row) => keywords.some((kw) => row["الحساب"]?.includes(kw)))
      .reduce((sum, row) => sum + parseFloat(row["القيمة"] || 0), 0);
  }

  // عرض التقارير على reports.html
  function renderReports(reports) {
    if (document.getElementById("incomeStatement")) {
      document.getElementById("incomeStatement").innerHTML = `
        <h3>قائمة الدخل</h3>
        <ul>
          <li>المبيعات: ${reports.incomeStatement.sales}</li>
          <li>تكلفة المبيعات: ${reports.incomeStatement.cogs}</li>
          <li>مجمل الربح: ${reports.incomeStatement.grossProfit}</li>
          <li>مصاريف تشغيلية: ${reports.incomeStatement.operatingExp}</li>
          <li>الربح التشغيلي: ${reports.incomeStatement.operatingProfit}</li>
          <li>إيرادات أخرى: ${reports.incomeStatement.otherRev}</li>
          <li>مصاريف أخرى: ${reports.incomeStatement.otherExp}</li>
          <li>صافي الربح قبل الضريبة: ${reports.incomeStatement.netBeforeTax}</li>
          <li>ضريبة: ${reports.incomeStatement.tax}</li>
          <li><b>صافي الربح بعد الضريبة: ${reports.incomeStatement.netAfterTax}</b></li>
        </ul>
      `;
    }

    if (document.getElementById("balanceSheet")) {
      document.getElementById("balanceSheet").innerHTML = `
        <h3>الميزانية العمومية</h3>
        <ul>
          <li>الأصول المتداولة: ${reports.balanceSheet.currentAssets}</li>
          <li>الأصول غير المتداولة: ${reports.balanceSheet.nonCurrentAssets}</li>
          <li><b>إجمالي الأصول: ${reports.balanceSheet.totalAssets}</b></li>
          <li>الخصوم المتداولة: ${reports.balanceSheet.currentLiabilities}</li>
          <li>الخصوم طويلة الأجل: ${reports.balanceSheet.nonCurrentLiabilities}</li>
          <li><b>إجمالي الخصوم: ${reports.balanceSheet.totalLiabilities}</b></li>
          <li><b>حقوق الملكية: ${reports.balanceSheet.equity}</b></li>
        </ul>
      `;
    }

    if (document.getElementById("ratios")) {
      document.getElementById("ratios").innerHTML = `
        <h3>المؤشرات المالية</h3>
        <ul>
          <li>هامش مجمل الربح: ${reports.ratios.grossMargin.toFixed(2)}%</li>
          <li>هامش صافي الربح: ${reports.ratios.netMargin.toFixed(2)}%</li>
          <li>العائد على الأصول (ROA): ${reports.ratios.roa.toFixed(2)}%</li>
          <li>العائد على حقوق الملكية (ROE): ${reports.ratios.roe.toFixed(2)}%</li>
          <li>نسبة المديونية: ${reports.ratios.debtRatio.toFixed(2)}%</li>
        </ul>
      `;
    }
  }

  // تصدير PDF
  exportPdfBtn?.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("التقارير المالية", 10, 10);

    doc.text("قائمة الدخل:", 10, 20);
    Object.entries(reportsData.incomeStatement).forEach(([k, v], i) => {
      doc.text(`${k}: ${v}`, 10, 30 + i * 10);
    });

    doc.text("الميزانية العمومية:", 100, 20);
    Object.entries(reportsData.balanceSheet).forEach(([k, v], i) => {
      doc.text(`${k}: ${v}`, 100, 30 + i * 10);
    });

    doc.save("financial_reports.pdf");
  });

  // تصدير Excel
  exportExcelBtn?.addEventListener("click", () => {
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet([reportsData.incomeStatement]),
      "Income Statement"
    );
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet([reportsData.balanceSheet]),
      "Balance Sheet"
    );
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet([reportsData.ratios]),
      "Ratios"
    );
    XLSX.writeFile(wb, "financial_reports.xlsx");
  });
});
