document.addEventListener('DOMContentLoaded', () => {

    // --- 1. STATE & CONFIG ---
    const state = {
        availableDatasets: {},
        comparisonResult: null,
        preferences: {
            theme: localStorage.getItem('theme') || 'light',
            lang: localStorage.getItem('lang') || 'ar',
        },
        chartInstance: null
    };

    // --- 2. TRANSLATIONS ---
    const translations = {
        ar: {
            // General
            pageHeader: "مقارنة الأداء المالي",
            pageSubheader: "قارن بين فترتين ماليتين مختلفتين لاكتشاف اتجاهات النمو وتغيرات الأداء.",
            setupTitle: "إعداد المقارنة",
            setupDesc: "اختر مجموعتي البيانات التي قمت بحفظها مسبقًا من صفحات الإدخال أو الرفع.",
            labelDataset1: "الفترة الأولى (أ)",
            labelDataset2: "الفترة الثانية (ب)",
            compareBtn: "قارن",
            summaryTitle: "جدول ملخص المقارنة",
            chartTitle: "مقارنة مرئية للمؤشرات الرئيسية",
            // Table
            metric: "المؤشر",
            changeValue: "التغير (قيمة)",
            changePercent: "التغير (نسبة)",
            // Metrics
            revenue: "الإيرادات",
            expense: "المصروفات",
            netProfit: "صافي الربح",
            assets: "الأصول",
            liabilities: "الخصوم",
            equity: "حقوق الملكية",
        },
        en: {
            // General
            pageHeader: "Financial Performance Comparison",
            pageSubheader: "Compare two different financial periods to discover growth trends and performance changes.",
            setupTitle: "Comparison Setup",
            setupDesc: "Select two datasets you have previously saved from the input or upload pages.",
            labelDataset1: "First Period (A)",
            labelDataset2: "Second Period (B)",
            compareBtn: "Compare",
            summaryTitle: "Comparison Summary Table",
            chartTitle: "Visual Comparison of Key Metrics",
            // Table
            metric: "Metric",
            changeValue: "Change (Value)",
            changePercent: "Change (%)",
            // Metrics
            revenue: "Revenue",
            expense: "Expenses",
            netProfit: "Net Profit",
            assets: "Assets",
            liabilities: "Liabilities",
            equity: "Equity",
        }
    };

    // --- 3. UI ELEMENTS CACHE ---
    const UI = {
        themeToggle: document.getElementById('themeToggle'),
        languageSelect: document.getElementById('languageSelect'),
        dataset1Select: document.getElementById('dataset1'),
        dataset2Select: document.getElementById('dataset2'),
        compareBtn: document.getElementById('compareBtn'),
        resultsSection: document.getElementById('comparisonResults'),
        summaryTable: document.getElementById('comparisonSummaryTable'),
        comparisonChart: document.getElementById('comparisonChart'),
    };

    // --- 4. FINANCIAL ENGINE ---
    const toNum = (val) => parseFloat(String(val || '').replace(/,/g, '')) || 0;
    const t = (key) => translations[state.preferences.lang]?.[key] || key;

    const aggregateDataset = (dataset) => {
        const f = { assets: 0, liabilities: 0, equity: 0, revenue: 0, expense: 0 };
        dataset.forEach(row => {
            const value = toNum(row.Debit) - toNum(row.Credit);
            const mainType = row.MainType || '';
            if (mainType.includes('الأصول') || mainType.includes('Assets')) f.assets += value;
            else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) f.liabilities -= value;
            else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) f.equity -= value;
            else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) {
                if ((row.SubType || '').includes('الإيرادات') || (row.SubType || '').includes('Revenue')) f.revenue -= value;
                else f.expense += value; // Covers COGS and other expenses
            }
        });
        f.netProfit = f.revenue - f.expense;
        return f;
    };

    // --- 5. CORE PAGE LOGIC ---
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
            UI.dataset1Select.add(new Option('تحتاج لحفظ مجموعتي بيانات على الأقل للمقارنة', '', true, true));
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
            alert('الرجاء اختيار مجموعتي بيانات مختلفتين.');
            return;
        }
        const agg1 = aggregateDataset(state.availableDatasets[name1]);
        const agg2 = aggregateDataset(state.availableDatasets[name2]);
        state.comparisonResult = {
            periodA: { name: name1, ...agg1 },
            periodB: { name: name2, ...agg2 },
        };
        renderResults();
    };

    // --- 6. RENDERING ---
    const renderSummaryTable = () => {
        const { periodA, periodB } = state.comparisonResult;
        const metrics = ['revenue', 'expense', 'netProfit', 'assets', 'liabilities', 'equity'];
        
        let tableHTML = `<table class="table table-hover"><thead><tr>
            <th>${t('metric')}</th>
            <th>${periodA.name}</th>
            <th>${periodB.name}</th>
            <th>${t('changeValue')}</th>
            <th>${t('changePercent')}</th>
        </tr></thead><tbody>`;

        metrics.forEach(key => {
            const valA = periodA[key];
            const valB = periodB[key];
            const change = valB - valA;
            const percentChange = valA !== 0 ? (change / Math.abs(valA)) * 100 : Infinity;
            
            tableHTML += `<tr>
                <td>${t(key)}</td>
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
                labels: [t('revenue'), t('expense'), t('netProfit')],
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
    
    // --- 7. INITIALIZATION & BINDING ---
    const init = () => {
        const applyTranslations = () => {
            document.querySelectorAll('[data-translate-key]').forEach(el => el.textContent = t(el.dataset.translateKey));
            document.documentElement.lang = state.preferences.lang;
            document.documentElement.dir = state.preferences.lang === 'ar' ? 'rtl' : 'ltr';
            if (state.comparisonResult) renderResults(); // Re-render results on lang change
        };
        
        // --- Event Listeners ---
        UI.themeToggle.addEventListener('click', () => { /* Theme logic */ });
        UI.languageSelect.innerHTML = `<option value="ar">العربية</option><option value="en">English</option>`;
        UI.languageSelect.value = state.preferences.lang;
        UI.languageSelect.addEventListener('change', (e) => {
            state.preferences.lang = e.target.value;
            localStorage.setItem('lang', state.preferences.lang);
            applyTranslations();
        });
        
        document.querySelectorAll('.main-nav .nav-link').forEach(link => {
            if (link.href.includes('comparisons.html')) link.classList.add('active');
        });

        UI.compareBtn.addEventListener('click', runComparison);
        
        // --- Initial Load ---
        document.body.setAttribute('data-theme', state.preferences.theme);
        applyTranslations();
        findAndLoadDatasets();
        populateSelectors();
    };

    init();
});
