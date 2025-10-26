// js/comparisons-app.js 
const comparisonsTranslations = {
    ar: {
        pageTitle: "مقارنة الفترات — المحلل المالي",
        pageHeader: "مقارنة الأداء المالي",
        pageSubheader: "قارن بين بيانات الفترة الحالية والسابقة لاكتشاف الاتجاهات والتغيرات.",
        exportPdf: "تصدير PDF", // *** مُضاف ***
        // *** تم حذف الترجمات القديمة (manageTitle, noDatasets, setupTitle, etc.) ***
        summaryTitle: "جدول المقارنة المفصل",
        chartTitleIS: "مقارنة بنود قائمة الدخل",
        chartTitleBS: "مقارنة بنود المركز المالي",
        tableHdrAccount: "البند",
        tableHdrChange: "التغير ($)",
        tableHdrChangePercent: "التغير (%)",
        // *** مُضاف: رسائل خطأ جديدة ***
        noDataCurrent: "لا توجد بيانات للفترة الحالية. يرجى تشغيل صفحة 'التقارير' أولاً.",
        noDataPrevious: "لا توجد بيانات للفترة السابقة. لا يمكن إجراء مقارنة.",
        thPreviousPeriod: "الفترة السابقة",
        thCurrentPeriod: "الفترة الحالية",
        // *** مُضاف: بنود للرسوم البيانية ***
        revenue: "الإيرادات",
        grossProfit: "مجمل الربح",
        netProfit: "صافي الربح",
        assets: "الأصول",
        liabilities: "الخصوم",
        equity: "حقوق الملكية"
    },
    en: {
        // *** مُضاف: ترجمات إنجليزية كاملة ***
        pageTitle: "Period Comparisons — Financial Analyzer",
        pageHeader: "Financial Performance Comparison",
        pageSubheader: "Compare current vs. prior period data to discover trends and changes.",
        exportPdf: "Export PDF",
        summaryTitle: "Detailed Comparison Table",
        chartTitleIS: "Income Statement Comparison",
        chartTitleBS: "Balance Sheet Comparison",
        tableHdrAccount: "Item",
        tableHdrChange: "Change ($)",
        tableHdrChangePercent: "Change (%)",
        noDataCurrent: "No data found for the current period. Please run the 'Report' page first.",
        noDataPrevious: "No data found for the previous period. Comparison cannot be performed.",
        thPreviousPeriod: "Previous Period",
        thCurrentPeriod: "Current Period",
        revenue: "Revenue",
        grossProfit: "Gross Profit",
        netProfit: "Net Profit",
        assets: "Assets",
        liabilities: "Liabilities",
        equity: "Equity"
    }
};
window.pageTranslations = window.pageTranslations || {};
window.pageTranslations.ar = { ...(window.pageTranslations.ar || {}), ...(comparisonsTranslations.ar || {}) };
window.pageTranslations.en = { ...(window.pageTranslations.en || {}), ...(comparisonsTranslations.en || {}) };
document.addEventListener('DOMContentLoaded', () => {
    const state = {
        statementsCurrent: null,
        statementsPrevious: null,
        hasDataCurrent: false,
        hasDataPrevious: false,
        charts: {} // Store chart instances
    };
    const lang = localStorage.getItem('lang') || 'ar';
    // *** مُعدل: التأكد من أن t_page يستخدم الكائن المدمج ***
    const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`;

    const UI = {
        loadingContainer: document.getElementById('loadingContainer'),
        comparisonResults: document.getElementById('comparisonResults'),
        comparisonSummaryTable: document.getElementById('comparisonSummaryTable'),
        comparisonChartISCanvas: document.getElementById('comparisonChartIS')?.getContext('2d'),
        comparisonChartBSCanvas: document.getElementById('comparisonChartBS')?.getContext('2d'),
        exportPdfBtn: document.getElementById('exportPdfBtn')
    };

    const formatCurrency = (value, decimals = 0) => {
        if (!isFinite(value)) return "N/A";
         const roundedValue = parseFloat(value.toFixed(decimals));
         if (Math.abs(roundedValue) < Math.pow(10, -decimals) && roundedValue < 0) {
              return (0).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
         }
         return roundedValue.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    };
    const formatChangePercent = (current, previous) => {
        if (typeof current !== 'number' || typeof previous !== 'number') return "N/A";
        if (previous === 0) {
            if (current > 0) return "New";
            if (current === 0) return "0.0%";
            return "N/A";
        }
        const change = (current - previous) / Math.abs(previous);
        const sign = change > 0 ? '+' : '';
        return sign + (change * 100).toFixed(1) + '%';
    };

    // *** دالة جديدة: قراءة البيانات المجهزة ***
    const loadProcessedData = () => {
        console.log("[DEBUG] Loading processed data for comparison...");
        const currentDataString = localStorage.getItem('financialDataCurrent');
        const previousDataString = localStorage.getItem('financialDataPrevious');
        
        if (currentDataString) {
            try {
                state.statementsCurrent = JSON.parse(currentDataString);
                state.hasDataCurrent = !!(state.statementsCurrent && state.statementsCurrent.totals);
            } catch (e) { console.error("Error parsing 'financialDataCurrent':", e); }
        }

        if (previousDataString) {
             try {
                state.statementsPrevious = JSON.parse(previousDataString);
                state.hasDataPrevious = !!(state.statementsPrevious && state.statementsPrevious.totals);
            } catch (e) { console.error("Error parsing 'financialDataPrevious':", e); }
        }
        
        return state.hasDataCurrent && state.hasDataPrevious; // Return true only if *both* periods exist
    };
    
    // *** دالة جديدة: إنشاء بيانات المقارنة ***
    const createComparisonData = () => {
        const data = [];
        const totalsC = state.statementsCurrent.totals;
        const totalsP = state.statementsPrevious.totals;
        
        // Key metrics to compare
        const metrics = [
            { key: 'revenue', label: t_page('revenue'), isProfit: true },
            { key: 'grossProfit', label: t_page('grossProfit'), isProfit: true },
            { key: 'netProfit', label: t_page('netProfit'), isProfit: true },
            { key: 'totalAssets', label: t_page('assets'), isProfit: true },
            { key: 'totalLiabilities', label: t_page('liabilities'), isProfit: false }, // Higher is 'danger'
            { key: 'totalEquity', label: t_page('equity'), isProfit: true }
        ];

        metrics.forEach(metric => {
            const valC = totalsC[metric.key] || 0;
            const valP = totalsP[metric.key] || 0;
            const change = valC - valP;
            const changePercent = formatChangePercent(valC, valP);
            const changeClass = (change >= 0 ? (metric.isProfit ? 'text-success' : 'text-danger') : (metric.isProfit ? 'text-danger' : 'text-success'));

            data.push({
                account: metric.label,
                val1: valP, // Base Period
                val2: valC, // Comparison Period
                change,
                changePercent,
                changeClass
            });
        });

        return data;
    };


    // *** دالة مُعدلة: عرض جدول المقارنة ***
    const renderComparisonTable = (data, name1, name2) => {
        let tableHTML = `
            <table class="table table-sm table-bordered table-striped align-middle">
                <thead class="table-light">
                    <tr>
                        <th>${t_page('tableHdrAccount')}</th>
                        <th class="text-end">${name1} (${t_page('thPreviousPeriod')})</th>
                        <th class="text-end">${name2} (${t_page('thCurrentPeriod')})</th>
                        <th class="text-end">${t_page('tableHdrChange')}</th>
                        <th class="text-end">${t_page('tableHdrChangePercent')}</th>
                    </tr>
                </thead>
                <tbody>
        `;
        data.forEach(item => {
            tableHTML += `
                <tr>
                    <td>${item.account}</td>
                    <td class="text-end">${formatCurrency(item.val1, 2)}</td>
                    <td class="text-end">${formatCurrency(item.val2, 2)}</td>
                    <td class="text-end ${item.changeClass}">${formatCurrency(item.change, 2)}</td>
                    <td class="text-end ${item.changeClass}">
                        ${item.change > 0 ? '▲' : (item.change < 0 ? '▼' : '')} 
                        ${item.changePercent.replace('+','')}
                    </td>
                </tr>
            `;
        });
        tableHTML += `</tbody></table>`;
        UI.comparisonSummaryTable.innerHTML = tableHTML;
    };
    
    // *** دالة مُعدلة: عرض الرسوم البيانية للمقارنة ***
    const renderComparisonCharts = (data, name1, name2) => {
        // --- Income Statement Chart ---
        const isData = data.filter(item => [t_page('revenue'), t_page('grossProfit'), t_page('netProfit')].includes(item.account));
        const isLabels = isData.map(item => item.account);
        const isData1 = isData.map(item => item.val1);
        const isData2 = isData.map(item => item.val2);

        if (UI.comparisonChartISCanvas) {
            if (state.charts.isChart) state.charts.isChart.destroy();
            state.charts.isChart = new Chart(UI.comparisonChartISCanvas, {
                type: 'bar',
                data: {
                    labels: isLabels,
                    datasets: [
                        { label: name1, data: isData1, backgroundColor: 'rgba(54, 162, 235, 0.6)' },
                        { label: name2, data: isData2, backgroundColor: 'rgba(75, 192, 192, 0.6)' }
                    ]
                },
                options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
            });
        }
        
        // --- Balance Sheet Chart ---
        const bsData = data.filter(item => [t_page('assets'), t_page('liabilities'), t_page('equity')].includes(item.account));
        const bsLabels = bsData.map(item => item.account);
        const bsData1 = bsData.map(item => item.val1);
        const bsData2 = bsData.map(item => item.val2);
        
        if (UI.comparisonChartBSCanvas) {
            if (state.charts.bsChart) state.charts.bsChart.destroy();
            state.charts.bsChart = new Chart(UI.comparisonChartBSCanvas, {
                type: 'bar',
                data: {
                    labels: bsLabels,
                    datasets: [
                        { label: name1, data: bsData1, backgroundColor: 'rgba(255, 159, 64, 0.6)' },
                        { label: name2, data: bsData2, backgroundColor: 'rgba(153, 102, 255, 0.6)' }
                    ]
                },
                options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
            });
        }
    };
    
    // *** دالة مُضافة: تصدير PDF ***
    const initPdfExport = () => {
         if (UI.exportPdfBtn) {
             UI.exportPdfBtn.addEventListener('click', () => {
                if (!state.hasDataCurrent) { alert(t_page('noDataCurrent')); return; }
                console.log("Exporting comparison to PDF...");
                const element = document.getElementById('comparison-content');
                if (typeof html2pdf === 'function') {
                    const opt = {
                        margin: 0.5,
                        filename: 'Comparison_Report.pdf',
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { scale: 2, useCORS: true, logging: false },
                        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                    };
                    html2pdf().from(element).set(opt).save();
                } else {
                    console.error("html2pdf library is not loaded."); 
                    alert("PDF export failed. Library not loaded.");
                }
             });
         }
    };


    const init = () => {
        // *** مُعدل: منطق التحميل الرئيسي ***
        console.log("[DEBUG] Initializing comparisons page...");
        
        if (typeof window.applyTranslations === 'function') {
            console.log("Applying translations...");
            window.applyTranslations();
        } else { console.warn("applyTranslations function not found."); }
        
        // 1. Load data
        if (!loadProcessedData()) {
            // Check failed, show appropriate error
            if (!state.hasDataCurrent) {
                UI.loadingContainer.textContent = t_page('noDataCurrent');
            } else if (!state.hasDataPrevious) {
                UI.loadingContainer.textContent = t_page('noDataPrevious');
            }
            UI.loadingContainer.style.display = 'block';
            UI.loadingContainer.classList.remove('alert-warning');
            UI.loadingContainer.classList.add('alert-danger');
            return; // Stop
        }

        // 2. If data is loaded, hide loading and proceed
        UI.loadingContainer.style.display = 'none';
        UI.comparisonResults.style.display = 'block';

        // 3. Create comparison data
        const comparisonData = createComparisonData();
        const period1Name = state.statementsPrevious.totals.periodName || t_page('thPreviousPeriod'); // Fallback names
        const period2Name = state.statementsCurrent.totals.periodName || t_page('thCurrentPeriod');

        // 4. Render results
        renderComparisonTable(comparisonData, period1Name, period2Name);
        renderComparisonCharts(comparisonData, period1Name, period2Name);

        // 5. Init PDF export
        initPdfExport();
        
        console.log("[DEBUG] Comparison page initialization complete.");
    };

    init();
});


