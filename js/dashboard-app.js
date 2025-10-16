document.addEventListener('DOMContentLoaded', () => {

    // --- 1. STATE & CONFIGURATION ---
    const state = {
        aggregatedData: {},
        ratios: {},
        preferences: {
            theme: localStorage.getItem('theme') || 'light',
        },
        charts: {}
    };

    // --- 2. UI ELEMENTS CACHE ---
    const UI = {
        themeToggle: document.getElementById('themeToggle'),
        kpiRow: document.getElementById('kpiRow'),
        profitabilityChart: document.getElementById('profitabilityChart'),
        structureChart: document.getElementById('structureChart'),
        performanceSummary: document.getElementById('performanceSummary'),
        alertsArea: document.getElementById('alertsArea'),
    };

    // --- 3. CORE LOGIC ---
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;

    const loadData = () => {
        // First, try to load data from the advanced page (most comprehensive)
        let rawData = localStorage.getItem('trialData') || '[]';
        let parsedData = JSON.parse(rawData);

        // --- Aggregation Logic (copied from previous pages) ---
        const agg = { assets: 0, liabilities: 0, equity: 0, revenue: 0, expense: 0, currentAssets: 0, currentLiabilities: 0 };
        parsedData.forEach(r => {
            const net = toNum(r.Debit) - toNum(r.Credit);
            const type = (r.Type || r.Account || '').toLowerCase();
            if (type.includes('asset') || type.includes('أصل')) agg.assets += net;
            else if (type.includes('liab') || type.includes('خصوم')) agg.liabilities -= net;
            else if (type.includes('equity') || type.includes('حقوق')) agg.equity -= net;
            else if (type.includes('revenue') || type.includes('إيراد')) agg.revenue -= net;
            else if (type.includes('expense') || type.includes('مصروف')) agg.expense += net;
            if (type.includes('current asset') || type.includes('أصل متداول')) agg.currentAssets += net;
            if (type.includes('current liab') || type.includes('خصوم متداولة')) agg.currentLiabilities -= net;
        });
        state.aggregatedData = agg;

        // --- Ratio Calculation Logic ---
        const netProfit = agg.revenue - agg.expense;
        state.ratios = {
            currentRatio: agg.currentLiabilities > 0 ? agg.currentAssets / agg.currentLiabilities : Infinity,
            debtToEquity: agg.equity > 0 ? agg.liabilities / agg.equity : Infinity,
            netProfitMargin: agg.revenue > 0 ? netProfit / agg.revenue : 0,
        };
    };

    // --- 4. RENDERING FUNCTIONS ---
    const formatCurrency = (value) => new Intl.NumberFormat('ar-EG', { style: 'currency', currency: 'EGP' }).format(value || 0);

    const renderKPIs = () => {
        const { revenue, expense } = state.aggregatedData;
        const { currentRatio, debtToEquity } = state.ratios;
        const netProfit = revenue - expense;

        const kpis = [
            { label: 'صافي الربح', value: formatCurrency(netProfit) },
            { label: 'نسبة التداول', value: isFinite(currentRatio) ? currentRatio.toFixed(2) : "N/A" },
            { label: 'الدين/حقوق الملكية', value: isFinite(debtToEquity) ? debtToEquity.toFixed(2) : "N/A" },
            { label: 'إجمالي الإيرادات', value: formatCurrency(revenue) },
        ];

        UI.kpiRow.innerHTML = kpis.map(kpi => `
            <div class="kpi-card">
                <div class="label">${kpi.label}</div>
                <div class="value">${kpi.value}</div>
            </div>
        `).join('');
    };

    const renderCharts = () => {
        const { revenue, expense } = state.aggregatedData;
        const { assets, liabilities, equity } = state.aggregatedData;

        if (state.charts.profitability) state.charts.profitability.destroy();
        state.charts.profitability = new Chart(UI.profitabilityChart, {
            type: 'bar',
            data: {
                labels: ['الإيرادات', 'المصروفات', 'صافي الربح'],
                datasets: [{ data: [revenue, expense, revenue - expense], backgroundColor: ['#198754', '#dc3545', '#0d6efd'] }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });

        if (state.charts.structure) state.charts.structure.destroy();
        state.charts.structure = new Chart(UI.structureChart, {
            type: 'doughnut',
            data: {
                labels: ['الخصوم', 'حقوق الملكية'],
                datasets: [{ data: [liabilities, equity], backgroundColor: ['#ffc107', '#0d6efd'] }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    };

    const renderSummaryAndAlerts = () => {
        const { currentRatio, debtToEquity, netProfitMargin } = state.ratios;
        
        // Summary
        let summary = 'يُظهر التحليل العام أن الشركة ';
        summary += netProfitMargin > 0 ? `تحقق ربحية جيدة بهامش صافي ربح يبلغ ${(netProfitMargin * 100).toFixed(1)}%. ` : 'تواجه تحديات في الربحية. ';
        summary += currentRatio > 1.5 ? 'وتتمتع بسيولة قوية. ' : 'مع وجود حاجة لمراقبة السيولة. ';
        UI.performanceSummary.textContent = summary;
        
        // Alerts
        const alerts = [];
        if (currentRatio < 1) alerts.push("🔴 خطر سيولة: نسبة التداول أقل من 1.");
        if (debtToEquity > 2) alerts.push("🟡 تنبيه: نسبة الدين إلى حقوق الملكية مرتفعة.");
        if (netProfitMargin < 0) alerts.push("🔴 خطر ربحية: الشركة تحقق صافي خسارة.");
        UI.alertsArea.innerHTML = alerts.length > 0 ? alerts.map(alert => `<div>${alert}</div>`).join('') : '<div>🟢 لا توجد مؤشرات خطر حرجة.</div>';
    };

    // --- 5. MAIN UPDATE FUNCTION ---
    const updateDashboard = () => {
        loadData();
        renderKPIs();
        renderCharts();
        renderSummaryAndAlerts();
    };

    // --- 6. EVENT LISTENERS & INITIALIZATION ---
    UI.themeToggle.addEventListener('click', () => {
        let newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        UI.themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });

    document.querySelectorAll('.main-nav .nav-link').forEach(link => {
        if (link.href.includes('dashboard.html')) link.classList.add('active');
        else link.classList.remove('active');
    });

    const init = () => {
        const theme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', theme);
        UI.themeToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        updateDashboard();
    };

    init();
});