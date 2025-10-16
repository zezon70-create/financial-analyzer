document.addEventListener('DOMContentLoaded', () => {

    // --- 1. STATE & CONFIGURATION ---
    const state = {
        availableDatasets: {}, // Stores all datasets found in localStorage
        comparison: null,      // Stores the result of the comparison
        preferences: {
            theme: 'light',
            lang: 'ar'
        },
        chartInstance: null
    };

    // --- 2. TRANSLATIONS ---
    const translations = {
        ar: {
            pageTitle: "مقارنات الأداء — المحلل المالي",
            brandTitle: "المقارنات المالية",
            brandSub: "قارن الأداء عبر الفترات",
            pageHeader: "مقارنة الأداء المالي",
            labelDataset1: "اختر الفترة الأولى للمقارنة",
            labelDataset2: "اختر الفترة الثانية للمقارنة",
            compareBtn: "قارن الآن",
            summaryTitle: "جدول ملخص المقارنة",
            chartTitle: "مقارنة مرئية للمقاييس الرئيسية",
            metric: "المقياس",
            periodA: "الفترة أ",
            periodB: "الفترة ب",
            change: "التغير",
            changePercent: "التغير (%)",
            revenue: "الإيرادات",
            expense: "المصروفات",
            netProfit: "صافي الربح",
            assets: "الأصول",
            liabilities: "الخصوم",
            equity: "حقوق الملكية",
        },
        en: {
            // ... (Add English translations here)
        }
    };

    // --- 3. UI ELEMENTS CACHE ---
    const UI = {
        dataset1Select: document.getElementById('dataset1'),
        dataset2Select: document.getElementById('dataset2'),
        compareBtn: document.getElementById('compareBtn'),
        resultsSection: document.getElementById('comparisonResults'),
        summaryTable: document.getElementById('comparisonSummaryTable'),
        comparisonChart: document.getElementById('comparisonChart'),
        // ... cache other elements
    };

    // --- 4. CORE LOGIC ---

    const findAndLoadDatasets = () => {
        state.availableDatasets = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('FA_DATASET_')) {
                const name = key.replace('FA_DATASET_', '');
                state.availableDatasets[name] = JSON.parse(localStorage.getItem(key));
            }
        }
    };

    const populateSelectors = () => {
        const datasetNames = Object.keys(state.availableDatasets);
        UI.dataset1Select.innerHTML = '';
        UI.dataset2Select.innerHTML = '';
        
        if (datasetNames.length < 2) {
            UI.dataset1Select.innerHTML = '<option>تحتاج لحفظ مجموعتي بيانات على الأقل</option>';
            UI.compareBtn.disabled = true;
            return;
        }

        datasetNames.forEach(name => {
            const option1 = new Option(name, name);
            const option2 = new Option(name, name);
            UI.dataset1Select.add(option1);
            UI.dataset2Select.add(option2);
        });
        
        if (datasetNames.length >= 2) {
            UI.dataset1Select.selectedIndex = 0;
            UI.dataset2Select.selectedIndex = 1;
        }
    };

    const aggregateData = (dataset) => {
        // This is your aggregation logic from previous pages
        // It takes a raw dataset and returns { assets, liabilities, etc. }
        const agg = { assets: 0, liabilities: 0, equity: 0, revenue: 0, expense: 0 };
        dataset.forEach(r => {
            const net = (parseFloat(r.Debit) || 0) - (parseFloat(r.Credit) || 0);
            const type = (r.Type || '').toLowerCase();
            if (type.includes('asset') || type.includes('أصل')) agg.assets += net;
            else if (type.includes('liab') || type.includes('خصوم')) agg.liabilities -= net;
            else if (type.includes('equity') || type.includes('حقوق')) agg.equity -= net;
            else if (type.includes('revenue') || type.includes('إيراد')) agg.revenue -= net;
            else if (type.includes('expense') || type.includes('مصروف')) agg.expense += net;
        });
        return agg;
    };

    const runComparison = () => {
        const name1 = UI.dataset1Select.value;
        const name2 = UI.dataset2Select.value;

        if (!name1 || !name2 || name1 === name2) {
            alert('الرجاء اختيار مجموعتي بيانات مختلفتين.');
            return;
        }

        const data1 = state.availableDatasets[name1];
        const data2 = state.availableDatasets[name2];

        const agg1 = aggregateData(data1);
        const agg2 = aggregateData(data2);
        agg1.netProfit = agg1.revenue - agg1.expense;
        agg2.netProfit = agg2.revenue - agg2.expense;

        state.comparison = {
            periodA: name1,
            periodB: name2,
            metrics: {
                revenue: { valA: agg1.revenue, valB: agg2.revenue },
                expense: { valA: agg1.expense, valB: agg2.expense },
                netProfit: { valA: agg1.netProfit, valB: agg2.netProfit },
                assets: { valA: agg1.assets, valB: agg2.assets },
                liabilities: { valA: agg1.liabilities, valB: agg2.liabilities },
                equity: { valA: agg1.equity, valB: agg2.equity },
            }
        };

        renderComparison();
    };


    // --- 5. RENDERING FUNCTIONS ---
    
    const renderComparison = () => {
        renderSummaryTable();
        renderComparisonChart();
        UI.resultsSection.style.display = 'block';
    };
    
    const renderSummaryTable = () => {
        const { metrics, periodA, periodB } = state.comparison;
        let html = `<table class="table table-hover"><thead><tr>
            <th>${translations[state.preferences.lang].metric}</th>
            <th>${periodA}</th>
            <th>${periodB}</th>
            <th>${translations[state.preferences.lang].change}</th>
            <th>${translations[state.preferences.lang].changePercent}</th>
        </tr></thead><tbody>`;

        for (const key in metrics) {
            const { valA, valB } = metrics[key];
            const change = valB - valA;
            const changePercent = valA !== 0 ? (change / valA) * 100 : Infinity;
            
            html += `<tr>
                <td>${translations[state.preferences.lang][key]}</td>
                <td>${valA.toFixed(2)}</td>
                <td>${valB.toFixed(2)}</td>
                <td>${change.toFixed(2)}</td>
                <td>${isFinite(changePercent) ? changePercent.toFixed(2) + '%' : 'N/A'}</td>
            </tr>`;
        }

        html += '</tbody></table>';
        UI.summaryTable.innerHTML = html;
    };
    
    const renderComparisonChart = () => {
        const { metrics, periodA, periodB } = state.comparison;
        const labels = Object.keys(metrics).map(key => translations[state.preferences.lang][key]);
        const dataA = Object.values(metrics).map(m => m.valA);
        const dataB = Object.values(metrics).map(m => m.valB);

        if (state.chartInstance) state.chartInstance.destroy();

        state.chartInstance = new Chart(UI.comparisonChart, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: periodA,
                        data: dataA,
                        backgroundColor: 'rgba(13, 110, 253, 0.7)',
                        borderColor: 'rgba(13, 110, 253, 1)',
                        borderWidth: 1
                    },
                    {
                        label: periodB,
                        data: dataB,
                        backgroundColor: 'rgba(25, 135, 84, 0.7)',
                        borderColor: 'rgba(25, 135, 84, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    };

    // --- 6. INITIALIZATION ---
    const init = () => {
        // ... (Load preferences, apply language, etc.)
        findAndLoadDatasets();
        populateSelectors();
        UI.compareBtn.addEventListener('click', runComparison);
    };

    init();
});