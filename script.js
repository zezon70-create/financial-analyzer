const form = document.getElementById('financial-form');
const resultsDiv = document.getElementById('analysis-results');
const chartCanvas = document.getElementById('financial-chart');
let financialChart;

// Generate report
function generateFullReport() {
    const revenue = parseFloat(document.getElementById('revenue')?.value || 0);
    const expenses = parseFloat(document.getElementById('expenses')?.value || 0);
    const assets = parseFloat(document.getElementById('assets')?.value || 0);
    const liabilities = parseFloat(document.getElementById('liabilities')?.value || 0);
    const equity = parseFloat(document.getElementById('equity')?.value || 0);
    const salesIncrease = parseFloat(document.getElementById('sales-increase')?.value || 0);

    const netIncome = revenue - expenses;
    const roi = ((netIncome / (assets || 1)) * 100).toFixed(2);
    const debtRatio = ((liabilities / (assets || 1)) * 100).toFixed(2);
    const predictedRevenue = (revenue * (1 + salesIncrease/100)).toFixed(2);

    const reportData = {
        "Revenue": revenue,
        "Expenses": expenses,
        "Net Income": netIncome,
        "Assets": assets,
        "Liabilities": liabilities,
        "Equity": equity,
        "ROI (%)": roi,
        "Debt Ratio (%)": debtRatio,
        "Predicted Revenue": predictedRevenue,
        "Sales Increase (%)": salesIncrease
    };
    return reportData;
}

// Update dashboard
if(form){
    form.addEventListener('submit', e => {
        e.preventDefault();
        const report = generateFullReport();
        if(resultsDiv) resultsDiv.innerHTML = "";
        for(const key in report){
            const p = document.createElement('p');
            p.innerText = `${key}: ${report[key]}`;
            resultsDiv.appendChild(p);
        }

        // Chart
        if(chartCanvas){
            if(financialChart) financialChart.destroy();
            financialChart = new Chart(chartCanvas, {
                type: 'bar',
                data: {
                    labels: ['Revenue','Expenses','Net Income','Assets','Liabilities','Equity'],
                    datasets: [{
                        label: 'Financial Data',
                        data: [report.Revenue, report.Expenses, report['Net Income'], report.Assets, report.Liabilities, report.Equity],
                        backgroundColor: ['#0a3d62','#3c6382','#f7b731','#4b7bec','#fd9644','#a5b1c2']
                    }]
                },
                options: { responsive: true, plugins: { legend: { display: false } } }
            });
        }
    });
}

// Excel Import
const importExcel = document.getElementById('import-excel');
if(importExcel){
    importExcel.addEventListener('change', e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            const data = evt.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const sheetData = XLSX.utils.sheet_to_json(firstSheet, { header:1 });
            document.getElementById('revenue').value = sheetData[1][0] || 0;
            document.getElementById('expenses').value = sheetData[1][1] || 0;
            document.getElementById('assets').value = sheetData[1][2] || 0;
            document.getElementById('liabilities').value = sheetData[1][3] || 0;
            document.getElementById('equity').value = sheetData[1][4] || 0;
        };
        reader.readAsBinaryString(file);
    });
}

// Excel Export
const exportExcel = document.getElementById('export-excel');
if(exportExcel){
    exportExcel.addEventListener('click', () => {
        const report = generateFullReport();
        const wb = XLSX.utils.book_new();
        const wsData = [["Item","Value"]];
        for(const key in report) wsData.push([key, report[key]]);
        const ws = XLSX.utils.aoa_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, 'Financial Report');
        XLSX.writeFile(wb, 'FinancialReport.xlsx');
    });
}

// PDF Export
const exportPdf = document.getElementById('export-pdf');
if(exportPdf){
    exportPdf.addEventListener('click', () => {
        import('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js').then(jsPDF => {
            const { jsPDF: JSPDF } = jsPDF;
            const doc = new JSPDF();
            const report = generateFullReport();
            let y = 10;
            doc.setFontSize(12);
            doc.text("Financial Report", 10, y);
            y += 10;
            for(const key in report){
                doc.text(`${key}: ${report[key]}`, 10, y);
                y += 10;
            }
            doc.save('FinancialReport.pdf');
        });
    });
}

// Language switch
const languageSelect = document.getElementById('language-select');
if(languageSelect){
    languageSelect.addEventListener('change', e => {
        const lang = e.target.value;
        if(lang === 'ar'){
            document.body.dir = 'rtl';
            document.getElementById('site-title').innerText = 'محلل مالي';
            const entryTitle = document.getElementById('data-entry-title');
            if(entryTitle) entryTitle.innerText = 'أدخل البيانات المالية';
            const labels = {
                'label-revenue':'الإيرادات:',
                'label-expenses':'المصروفات:',
                'label-assets':'الأصول:',
                'label-liabilities':'الخصوم:',
                'label-equity':'حقوق الملكية:',
                'label-sales-increase':'نسبة زيادة المبيعات المتوقعة:'
            };
            for(const id in labels){
                const el = document.getElementById(id);
                if(el) el.innerText = labels[id];
            }
            const btn = document.getElementById('calculate-btn');
            if(btn) btn.innerText = 'احسب';
            const dashTitle = document.getElementById('dashboard-title');
            if(dashTitle) dashTitle.innerText = 'لوحة التحكم';
        } else {
            document.body.dir = 'ltr';
            document.getElementById('site-title').innerText = 'Financial Analyzer';
            const entryTitle = document.getElementById('data-entry-title');
            if(entryTitle) entryTitle.innerText = 'Enter Financial Data';
            const labels = {
                'label-revenue':'Revenue:',
                'label-expenses':'Expenses:',
                'label-assets':'Assets:',
                'label-liabilities':'Liabilities:',
                'label-equity':'Equity:',
                'label-sales-increase':'Expected Sales Increase %:'
            };
            for(const id in labels){
                const el = document.getElementById(id);
                if(el) el.innerText = labels[id];
            }
            const btn = document.getElementById('calculate-btn');
            if(btn) btn.innerText = 'Calculate';
            const dashTitle = document.getElementById('dashboard-title');
            if(dashTitle) dashTitle.innerText = 'Dashboard';
        }
    });
}
