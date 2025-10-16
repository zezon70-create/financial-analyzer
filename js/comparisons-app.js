// js/comparisons-app.js

window.pageTranslations = {
    ar: {
        pageTitle: "مقارنات الأداء — المحلل المالي",
        pageHeader: "مقارنة الأداء المالي",
        pageSubheader: "قارن بين فترتين ماليتين مختلفتين لاكتشاف اتجاهات النمو وتغيرات الأداء.",
        setupTitle: "إعداد المقارنة",
        setupDesc: "اختر مجموعتي البيانات التي قمت بحفظها مسبقًا باستخدام ميزة 'حفظ باسم'.",
        labelDataset1: "الفترة الأولى (أ)",
        labelDataset2: "الفترة الثانية (ب)",
        compareBtn: "قارن",
        summaryTitle: "جدول ملخص المقارنة",
        chartTitle: "مقارنة مرئية للمؤشرات الرئيسية",
        metric: "المؤشر",
        changeValue: "التغير (قيمة)",
        changePercent: "التغير (نسبة)",
        revenue: "الإيرادات",
        expense: "المصروفات",
        netProfit: "صافي الربح",
        assets: "الأصول",
        liabilities: "الخصوم",
        equity: "حقوق الملكية",
        noDatasets: "تحتاج لحفظ مجموعتي بيانات على الأقل باستخدام ميزة 'حفظ باسم' لتتمكن من المقارنة.",
        selectDifferent: "الرجاء اختيار مجموعتي بيانات مختلفتين.",
    },
    en: {
        pageTitle: "Performance Comparisons — Financial Analyzer",
        pageHeader: "Financial Performance Comparison",
        pageSubheader: "Compare two different financial periods to discover growth trends and performance changes.",
        setupTitle: "Comparison Setup",
        setupDesc: "Select two datasets you have previously saved using the 'Save As' feature.",
        labelDataset1: "First Period (A)",
        labelDataset2: "Second Period (B)",
        compareBtn: "Compare",
        summaryTitle: "Comparison Summary Table",
        chartTitle: "Visual Comparison of Key Metrics",
        metric: "Metric",
        changeValue: "Change (Value)",
        changePercent: "Change (%)",
        revenue: "Revenue",
        expense: "Expenses",
        netProfit: "Net Profit",
        assets: "Assets",
        liabilities: "Liabilities",
        equity: "Equity",
        noDatasets: "You need to save at least two datasets using the 'Save As' feature to be able to compare.",
        selectDifferent: "Please select two different datasets.",
    }
};

document.addEventListener('DOMContentLoaded', () => {

    const state = { availableDatasets: {}, comparisonResult: null, chartInstance: null };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || key;
    
    const UI = {
        dataset1Select: document.getElementById('dataset1'),
        dataset2Select: document.getElementById('dataset2'),
        compareBtn: document.getElementById('compareBtn'),
        resultsSection: document.getElementById('comparisonResults'),
        summaryTable: document.getElementById('comparisonSummaryTable'),
        comparisonChart: document.getElementById('comparisonChart'),
    };

    const aggregateDataset = (dataset) => {
        const f = { assets: 0, liabilities: 0, equity: 0, revenue: 0, expense: 0 };
        dataset.forEach(row => {
            const value = (parseFloat(row.Debit) || 0) - (parseFloat(row.Credit) || 0);
            const mainType = row.MainType || '';
            if (mainType.includes('الأصول') || mainType.includes('Assets')) f.assets += value;
            else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) f.liabilities -= value;
            else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) f.equity -= value;
            else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) {
                if ((row.SubType || '').includes('الإيرادات') || (row.SubType || '').includes('Revenue')) f.revenue -= value;
                else f.expense += value;
            }
        });
        f.netProfit = f.revenue - f.expense;
        return f;
    };

    const findAndLoadDatasets = () => {
        state.availableDatasets = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('FA_DATASET_')) {
                const name = key.replace('FA_DATASET_', '');
                try { state.availableDatasets[name] = JSON.parse(localStorage.getItem(key)); } 
                catch (e) { console.error(`Could not parse dataset: ${name}`); }
            }
        }
    };

    const populateSelectors = () => {
        const datasetNames = Object.keys(state.availableDatasets);
        UI.dataset1Select.innerHTML = UI.dataset2Select.innerHTML = '';
        if (datasetNames.length < 2) {
            UI.dataset1Select.add(new Option(t_page('noDatasets'), '', true, true));
            UI.compareBtn.disabled = true;
            return;
        }
        datasetNames.forEach(name => {
            UI.dataset1Select.add(new Option(name, name));
            UI.dataset2Select.add(new Option(name, name));
        });
        if (datasetNames.length >= 2) {
            UI.dataset1Select.selectedIndex = 0;
            UI.dataset2Select.selectedIndex = 1;
        }
        UI.compareBtn.disabled = false;
    };

    const runComparison = () => {
        const name1 = UI.dataset1Select.value;
        const name2 = UI.dataset2Select.value;
        if (!name1 || !name2 || name1 === name2) {
            alert(t_page('selectDifferent'));
            return;
        }
        state.comparisonResult = {
            periodA: { name: name1, ...aggregateDataset(state.availableDatasets[name1]) },
            periodB: { name: name2, ...aggregateDataset(state.availableDatasets[name2]) },
        };
        renderResults();
    };

    const renderSummaryTable = () => {
        const { periodA, periodB } = state.comparisonResult;
        const metrics = ['revenue', 'expense', 'netProfit', 'assets', 'liabilities', 'equity'];
        
        let tableHTML = `<table class="table table-hover"><thead><tr>
            <th>${t_page('metric')}</th><th>${periodA.name}</th><th>${periodB.name}</th>
            <th>${t_page('changeValue')}</th><th>${t_page('changePercent')}</th>
        </tr></thead><tbody>`;

        metrics.forEach(key => {
            const valA = periodA[key];
            const valB = periodB[key];
            const change = valB - valA;
            const percentChange = valA !== 0 ? (change / Math.abs(valA)) * 100 : Infinity;
            tableHTML += `<tr>
                <td>${t_page(key)}</td>
                <td>${valA.toLocaleString()}</td>
                <td>${valB.toLocaleString()}</td>
                <td class="${change >= 0 ? 'text-success' : 'text-danger'}">${change.toLocaleString()}</td>
                <td class="${change >= 0 ? 'text-success' : 'text-danger'}">${isFinite(percentChange) ? `${percentChange.toFixed(1)}%` : 'N/A'}</td>
            </tr>`;
        });
        UI.summaryTable.innerHTML = tableHTML + '</tbody></table>';
    };

    const renderComparisonChart = () => {
        if (state.chartInstance) state.chartInstance.destroy();
        const { periodA, periodB } = state.comparisonResult;
        
        state.chartInstance = new Chart(UI.comparisonChart, {
            type: 'bar',
            data: {
                labels: [t_page('revenue'), t_page('expense'), t_page('netProfit')],
                datasets: [
                    { label: periodA.name, data: [periodA.revenue, periodA.expense, periodA.netProfit], backgroundColor: 'rgba(13, 110, 253, 0.7)' },
                    { label: periodB.name, data: [periodB.revenue, periodB.expense, periodB.netProfit], backgroundColor: 'rgba(25, 135, 84, 0.7)' }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true } } }
        });
    };

    const renderResults = () => {
        renderSummaryTable();
        renderComparisonChart();
        UI.resultsSection.style.display = 'block';
    };

    UI.compareBtn.addEventListener('click', runComparison);
    findAndLoadDatasets();
    populateSelectors();
});
