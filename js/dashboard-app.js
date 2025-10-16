document.addEventListener('DOMContentLoaded', () => {

    // --- 1. STATE & CONFIG ---
    const state = {
        financials: {},
        ratios: {},
        preferences: {
            theme: localStorage.getItem('theme') || 'light',
            lang: localStorage.getItem('lang') || 'ar',
        },
        charts: {}
    };

    // --- 2. TRANSLATIONS ---
    const translations = {
        ar: {
            pageHeader: "لوحة التحكم المالية",
            pageSubheader: "نظرة عامة مرئية على أهم مؤشرات الأداء المالي لشركتك.",
            kpi_netProfit: "صافي الربح",
            kpi_netProfitMargin: "هامش صافي الربح",
            kpi_currentRatio: "نسبة التداول",
            kpi_roe: "العائد على حقوق الملكية",
            chartProfitTitle: "تحليل الربحية",
            chartStructureTitle: "الهيكل المالي",
            summaryTitle: "ملخص الأداء الذكي",
            alertsTitle: "تنبيهات وملاحظات",
            revenue: "الإيرادات",
            grossProfit: "مجمل الربح",
            netProfit: "صافي الربح",
            assets: "الأصول",
            liabilities: "الخصوم",
            equity: "حقوق الملكية",
        },
        en: {
            pageHeader: "Financial Dashboard",
            pageSubheader: "A visual overview of your company's key financial performance indicators.",
            kpi_netProfit: "Net Profit",
            kpi_netProfitMargin: "Net Profit Margin",
            kpi_currentRatio: "Current Ratio",
            kpi_roe: "Return on Equity (ROE)",
            chartProfitTitle: "Profitability Analysis",
            chartStructureTitle: "Financial Structure",
            summaryTitle: "Smart Performance Summary",
            alertsTitle: "Alerts & Notes",
            revenue: "Revenue",
            grossProfit: "Gross Profit",
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
        kpiRow: document.getElementById('kpiRow'),
        profitabilityChart: document.getElementById('profitabilityChart'),
        structureChart: document.getElementById('structureChart'),
        performanceSummary: document.getElementById('performanceSummary'),
        alertsArea: document.getElementById('alertsArea'),
    };

    // --- 4. FINANCIAL ENGINE (Copied from advanced-app.js) ---
    const toNum = (val) => parseFloat(String(val || '').replace(/,/g, '')) || 0;
    const t = (key) => translations[state.preferences.lang]?.[key] || key;

    const calculateAllFinancials = () => {
        const trialData = JSON.parse(localStorage.getItem('trialData') || '[]');
        const f = { assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0, currentAssets: 0, inventory: 0, currentLiabilities: 0 };
        trialData.forEach(row => {
            const value = toNum(row.Debit) - toNum(row.Credit);
            const mainType = row.MainType || '';
            const subType = row.SubType || '';
            if (mainType.includes('الأصول') || mainType.includes('Assets')) {
                f.assets += value;
                if (subType.includes('متداول') || subType.includes('Current')) {
                    f.currentAssets += value;
                    if (subType.includes('المخزون') || subType.includes('Inventory')) f.inventory += value;
                }
            } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) {
                f.liabilities -= value;
                if (subType.includes('متداول') || subType.includes('Current')) f.currentLiabilities -= value;
            } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) {
                f.equity -= value;
            } else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) {
                if (subType.includes('الإيرادات') || subType.includes('Revenue')) f.revenue -= value;
                else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) f.cogs += value;
                else f.expenses += value;
            }
        });
        f.grossProfit = f.revenue - f.cogs;
        f.netProfit = f.grossProfit - f.expenses;
        state.financials = f;
        state.ratios = {
            currentRatio: f.currentLiabilities > 0 ? f.currentAssets / f.currentLiabilities : Infinity,
            debtToEquity: f.equity > 0 ? f.liabilities / f.equity : Infinity,
            netProfitMargin: f.revenue > 0 ? f.netProfit / f.revenue : 0,
            roe: f.equity > 0 ? f.netProfit / f.equity : 0,
        };
    };

    // --- 5. RENDERING FUNCTIONS ---
    const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value || 0);
    
    const renderKPIs = () => {
        const { netProfit } = state.financials;
        const { netProfitMargin, currentRatio, roe } = state.ratios;
        const kpis = [
            { key: 'kpi_netProfit', value: formatCurrency(netProfit) },
            { key: 'kpi_netProfitMargin', value: isFinite(netProfitMargin) ? `${(netProfitMargin * 100).toFixed(1)}%` : "N/A" },
            { key: 'kpi_currentRatio', value: isFinite(currentRatio) ? currentRatio.toFixed(2) : "N/A" },
            { key: 'kpi_roe', value: isFinite(roe) ? `${(roe * 100).toFixed(1)}%` : "N/A" },
        ];
        UI.kpiRow.innerHTML = kpis.map(kpi => `
            <div class="kpi-card">
                <div class="label">${t(kpi.key)}</div>
                <div class="value">${kpi.value}</div>
            </div>
        `).join('');
    };

    const renderCharts = () => {
        const { revenue, grossProfit, netProfit, assets, liabilities, equity } = state.financials;

        if (state.charts.profitability) state.charts.profitability.destroy();
        state.charts.profitability = new Chart(UI.profitabilityChart, {
            type: 'bar',
            data: {
                labels: [t('revenue'), t('grossProfit'), t('netProfit')],
                datasets: [{ data: [revenue, grossProfit, netProfit], backgroundColor: ['#0d6efd', '#6f42c1', '#198754'] }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });

        if (state.charts.structure) state.charts.structure.destroy();
        state.charts.structure = new Chart(UI.structureChart, {
            type: 'doughnut',
            data: {
                labels: [t('liabilities'), t('equity')],
                datasets: [{ data: [liabilities, equity], backgroundColor: ['#ffc107', '#0d6efd'] }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    };
    
    // ... (renderSummaryAndAlerts function would also go here)

    // --- 6. INITIALIZATION & BINDING ---
    const init = () => {
        const applyTranslations = () => {
            document.querySelectorAll('[data-translate-key]').forEach(el => el.textContent = t(el.dataset.translateKey));
            document.documentElement.lang = state.preferences.lang;
            document.documentElement.dir = state.preferences.lang === 'ar' ? 'rtl' : 'ltr';
            updateDashboard(); // Re-render with new language
        };
        
        const updateDashboard = () => {
            calculateAllFinancials();
            renderKPIs();
            renderCharts();
            // renderSummaryAndAlerts();
        };

        // --- Event Listeners ---
        UI.themeToggle.addEventListener('click', () => { /* ... (Theme toggle logic) ... */ });
        UI.languageSelect.innerHTML = `<option value="ar">العربية</option><option value="en">English</option>`;
        UI.languageSelect.value = state.preferences.lang;
        UI.languageSelect.addEventListener('change', (e) => {
            state.preferences.lang = e.target.value;
            localStorage.setItem('lang', state.preferences.lang);
            applyTranslations();
        });
        
        // --- Initial Load ---
        document.body.setAttribute('data-theme', state.preferences.theme);
        document.querySelectorAll('.main-nav .nav-link').forEach(link => {
            if (link.href.includes('dashboard.html')) link.classList.add('active');
        });
        
        applyTranslations();
    };

    init();
});
