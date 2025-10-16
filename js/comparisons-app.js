document.addEventListener('DOMContentLoaded', () => {

    // --- 1. STATE & CONFIGURATION ---
    const state = {
        availableDatasets: {},
        comparisonResult: null,
        preferences: {
            theme: localStorage.getItem('theme') || 'light',
        },
        chartInstance: null
    };

    // --- 2. UI ELEMENTS CACHE ---
    const UI = {
        themeToggle: document.getElementById('themeToggle'),
        dataset1Select: document.getElementById('dataset1'),
        dataset2Select: document.getElementById('dataset2'),
        compareBtn: document.getElementById('compareBtn'),
        resultsSection: document.getElementById('comparisonResults'),
        summaryTable: document.getElementById('comparisonSummaryTable'),
        comparisonChart: document.getElementById('comparisonChart'),
    };

    // --- 3. CORE LOGIC ---
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;

    const findAndLoadDatasets = () => {
        state.availableDatasets = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('FA_DATASET_')) {
                const name = key.replace('FA_DATASET_', '');
                try {
                    state.availableDatasets[name] = JSON.parse(localStorage.getItem(key));
                } catch (e) {
                    console.error(`Could not parse dataset: ${name}`);
                }
            }
        }
    };

    const populateSelectors = () => {
        const datasetNames = Object.keys(state.availableDatasets);
        UI.dataset1Select.innerHTML = '';
        UI.dataset2Select.innerHTML = '';

        if (datasetNames.length < 2) {
            const option = new Option('تحتاج لحفظ مجموعتي بيانات على الأقل للمقارنة', '', true, true);
            option.disabled = true;
            UI.dataset1Select.add(option);
            UI.compareBtn.disabled = true;
            return;
        }

        datasetNames.forEach(name => {
            UI.dataset1Select.add(new Option(name, name));
            UI.dataset2Select.add(new Option(name, name));
        });

        UI.dataset1Select.selectedIndex = 0;
        UI.dataset2Select.selectedIndex = 1;
        UI.compareBtn.disabled = false;
    };

    const aggregateDataset = (dataset) => {
        const agg = { assets: 0, liabilities: 0, equity: 0, revenue: 0, expense: 0 };
        dataset.forEach(r => {
            const net = toNum(r.Debit) - toNum(r.Credit);
            const type = (r.Type || r.Account || '').toLowerCase();
            if (type.includes('asset') || type.includes('أصل')) agg.assets += net;
            else if (type.includes('liab') || type.includes('خصوم')) agg.liabilities -= net;
            else if (type.includes('equity') || type.includes('حقوق')) agg.equity -= net;
            else if (type.includes('revenue') || type.includes('إيراد')) agg.revenue -= net;
            else if (type.includes('expense') || type.includes('مصروف')) agg.expense += net;
        });
        agg.netProfit = agg.revenue - agg.expense;
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

        const agg1 = aggregateDataset(data1);
        const agg2 = aggregateDataset(data2);

        state.comparisonResult = {
            periodA: { name: name1, ...agg1 },
            periodB: { name: name2, ...agg2 },
        };

        renderResults();
    };

    // --- 4. RENDERING FUNCTIONS ---
    const renderSummaryTable = () => {
        const { periodA, periodB } = state.comparisonResult;
        const metrics = ['revenue', 'expense', 'netProfit', 'assets', 'liabilities', 'equity'];
        const metricLabels = {
            revenue: 'الإيرادات', expense: 'المصروفات', netProfit: 'صافي الربح',
            assets: 'الأصول', liabilities: 'الخصوم', equity: 'حقوق الملكية'
        };

        let tableHTML = `<table class="table table-hover"><thead><tr>
            <th>المؤشر</th>
            <th>${periodA.name}</th>
            <th>${periodB.name}</th>
            <th>التغير (قيمة)</th>
            <th>التغير (نسبة)</th>
        </tr></thead><tbody>`;

        metrics.forEach(key => {
            const valA = periodA[key];
            const valB = periodB[key];
            const change = valB - valA;
            const percentChange = valA !== 0 ? (change / valA) * 100 : Infinity;
            
            tableHTML += `<tr>
                <td>${metricLabels[key]}</td>
                <td>${valA.toFixed(0)}</td>
                <td>${valB.toFixed(0)}</td>
                <td class="${change >= 0 ? 'text-success' : 'text-danger'}">${change.toFixed(0)}</td>
                <td class="${change >= 0 ? 'text-success' : 'text-danger'}">${isFinite(percentChange) ? `${percentChange.toFixed(1)}%` : 'N/A'}</td>
            </tr>`;
        });

        tableHTML += '</tbody></table>';
        UI.summaryTable.innerHTML = tableHTML;
    };

    const renderComparisonChart = () => {
        if (state.chartInstance) state.chartInstance.destroy();
        
        const { periodA, periodB } = state.comparisonResult;
        const labels = ['الإيرادات', 'المصروفات', 'صافي الربح'];
        
        state.chartInstance = new Chart(UI.comparisonChart, {
            type: 'bar',
            data: {
                labels,
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

    // --- 5. EVENT LISTENERS & INITIALIZATION ---
    UI.themeToggle.addEventListener('click', () => {
        let newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        UI.themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });

    document.querySelectorAll('.main-nav .nav-link').forEach(link => {
        if (link.href.includes('comparisons.html')) link.classList.add('active');
        else link.classList.remove('active');
    });

    UI.compareBtn.addEventListener('click', runComparison);

    const init = () => {
        const theme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', theme);
        UI.themeToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        
        findAndLoadDatasets();
        populateSelectors();
    };

    init();
});