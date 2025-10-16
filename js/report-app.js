document.addEventListener('DOMContentLoaded', () => {

    // --- 1. STATE & CONFIGURATION ---
    const state = {
        rawData: [],
        aggregatedData: {},
        preferences: {
            theme: localStorage.getItem('theme') || 'light',
            source: 'trialData', // Default source
            currency: 'EGP'
        },
        charts: {} // To hold chart instances for proper destruction
    };

    // --- 2. UI ELEMENTS CACHE ---
    const UI = {
        themeToggle: document.getElementById('themeToggle'),
        dataSource: document.getElementById('dataSource'),
        currencySelect: document.getElementById('currencySelect'),
        kpiRow: document.getElementById('kpiRow'),
        balanceChart: document.getElementById('balanceChart'),
        incomeChart: document.getElementById('incomeChart'),
        balanceComment: document.getElementById('balanceComment'),
        incomeComment: document.getElementById('incomeComment'),
    };

    // --- 3. CORE LOGIC ---

    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;

    const loadDataFromStorage = () => {
        const sourceKey = state.preferences.source;
        const rawData = localStorage.getItem(sourceKey) || '[]';
        
        // Unify data structure on the fly
        let parsedData = JSON.parse(rawData);
        if (sourceKey === 'statementData') {
            // Data from upload page needs unification
            const { bs = [], is = [] } = parsedData;
            const unified = [];
            bs.forEach(r => unified.push({ Account: r.Account, Type: r.Type, Debit: r.Debit, Credit: r.Credit }));
            is.forEach(r => {
                const type = (r.Type || '').toLowerCase();
                const value = toNum(r.Value);
                if (type.includes('revenue') || type.includes('إيراد')) {
                    unified.push({ Account: r.Account, Type: r.Type, Debit: 0, Credit: value });
                } else {
                    unified.push({ Account: r.Account, Type: r.Type, Debit: value, Credit: 0 });
                }
            });
            state.rawData = unified;
        } else {
            // Data from input page is already in the correct format
            state.rawData = parsedData;
        }
    };

    const aggregateData = () => {
        const agg = { assets: 0, liabilities: 0, equity: 0, revenue: 0, expense: 0 };
        state.rawData.forEach(r => {
            const net = toNum(r.Debit) - toNum(r.Credit);
            const type = (r.Type || r.Account || '').toLowerCase();
            if (type.includes('asset') || type.includes('أصل')) agg.assets += net;
            else if (type.includes('liab') || type.includes('خصوم')) agg.liabilities -= net;
            else if (type.includes('equity') || type.includes('حقوق')) agg.equity -= net;
            else if (type.includes('revenue') || type.includes('إيراد')) agg.revenue -= net;
            else if (type.includes('expense') || type.includes('مصروف')) agg.expense += net;
        });
        state.aggregatedData = agg;
    };

    // --- 4. RENDERING FUNCTIONS ---

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('ar-EG', {
            style: 'currency',
            currency: state.preferences.currency,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value || 0);
    };

    const renderKPIs = () => {
        const { assets, liabilities, equity, revenue, expense } = state.aggregatedData;
        const netProfit = revenue - expense;
        const kpis = [
            { label: 'إجمالي الأصول', value: formatCurrency(assets) },
            { label: 'إجمالي الخصوم', value: formatCurrency(liabilities) },
            { label: 'صافي حقوق الملكية', value: formatCurrency(equity) },
            { label: 'إجمالي الإيرادات', value: formatCurrency(revenue) },
            { label: 'إجمالي المصروفات', value: formatCurrency(expense) },
            { label: 'صافي الربح', value: formatCurrency(netProfit) },
        ];
        
        UI.kpiRow.innerHTML = kpis.map(kpi => `
            <div class="kpi">
                <div class="label">${kpi.label}</div>
                <div class="num">${kpi.value}</div>
            </div>
        `).join('');
    };

    const renderCharts = () => {
        const { assets, liabilities, equity, revenue, expense } = state.aggregatedData;

        // Destroy previous charts if they exist
        if (state.charts.balance) state.charts.balance.destroy();
        if (state.charts.income) state.charts.income.destroy();
        
        // Balance Sheet Chart
        state.charts.balance = new Chart(UI.balanceChart, {
            type: 'doughnut',
            data: {
                labels: ['الأصول', 'الخصوم', 'حقوق الملكية'],
                datasets: [{ data: [assets, liabilities, equity], backgroundColor: ['#0d6efd', '#ffc107', '#198754'] }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
        });

        // Income Statement Chart
        state.charts.income = new Chart(UI.incomeChart, {
            type: 'bar',
            data: {
                labels: ['الإيرادات', 'المصروفات', 'صافي الربح'],
                datasets: [{ 
                    data: [revenue, expense, revenue - expense], 
                    backgroundColor: ['#198754', '#dc3545', '#0d6efd'] 
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
    };
    
    const renderComments = () => {
        const { assets, liabilities, revenue, expense } = state.aggregatedData;
        
        // Balance Sheet Comment
        if (assets > liabilities) {
            UI.balanceComment.textContent = 'تحليل إيجابي: إجمالي الأصول يتجاوز إجمالي الخصوم، مما يشير إلى مركز مالي قوي.';
        } else {
            UI.balanceComment.textContent = 'تحليل يتطلب الانتباه: إجمالي الخصوم يتجاوز إجمالي الأصول. يجب مراجعة هيكل الديون والالتزامات.';
        }
        
        // Income Statement Comment
        if (revenue > expense) {
            UI.incomeComment.textContent = 'تحليل إيجابي: الشركة تحقق ربحية حيث أن الإيرادات أعلى من المصروفات.';
        } else {
            UI.incomeComment.textContent = 'تحليل يتطلب الانتباه: الشركة تواجه خسائر حيث أن المصروفات أعلى من الإيرادات. يجب مراجعة هيكل التكاليف.';
        }
    };
    
    // --- 5. MAIN UPDATE FUNCTION ---
    const updateReport = () => {
        loadDataFromStorage();
        aggregateData();
        renderKPIs();
        renderCharts();
        renderComments();
    };

    // --- 6. EVENT LISTENERS & INITIALIZATION ---

    // Theme Switcher
    UI.themeToggle.addEventListener('click', () => {
        let newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        UI.themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });

    // Active Navigation Link
    document.querySelectorAll('.main-nav .nav-link').forEach(link => {
        if (link.href.includes('report.html')) link.classList.add('active');
        else link.classList.remove('active');
    });

    // Control Listeners
    UI.dataSource.addEventListener('change', (e) => {
        state.preferences.source = e.target.value;
        updateReport();
    });
    
    UI.currencySelect.addEventListener('change', (e) => {
        state.preferences.currency = e.target.value;
        updateReport();
    });

    // Initial Load
    const init = () => {
        const theme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', theme);
        UI.themeToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        
        updateReport();
    };

    init();
});