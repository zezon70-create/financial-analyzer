// js/dashboard-app.js

window.pageTranslations = {
    ar: {
        pageTitle: "لوحة التحكم — المحلل المالي",
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
        noData: "لا توجد بيانات كافية لعرض لوحة التحكم. يرجى إدخال البيانات أولاً في صفحة الإدخال.",
        summary_profit: "أداء جيد. الشركة تحقق ربحية ويمكنها تغطية التزاماتها قصيرة الأجل بشكل مريح.",
        summary_loss: "يتطلب الانتباه. الشركة تواجه تحديات في الربحية ويجب مراقبة وضع السيولة.",
        alert_liquidity_risk: "🔴 خطر سيولة: نسبة التداول أقل من 1.",
        alert_leverage_risk: "🟡 تنبيه: نسبة الدين إلى حقوق الملكية مرتفعة.",
        alert_profit_risk: "🔴 خطر ربحية: الشركة تحقق صافي خسارة.",
        alert_ok: "🟢 لا توجد مؤشرات خطر حرجة بناءً على النسب الأساسية.",
    },
    en: {
        pageTitle: "Dashboard — Financial Analyzer",
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
        noData: "Not enough data to display the dashboard. Please enter data in the Input page first.",
        summary_profit: "Good performance. The company is profitable and can comfortably meet its short-term obligations.",
        summary_loss: "Attention required. The company faces profitability challenges and liquidity should be monitored.",
        alert_liquidity_risk: "🔴 Liquidity Risk: Current ratio is less than 1.",
        alert_leverage_risk: "🟡 Warning: Debt-to-Equity ratio is high.",
        alert_profit_risk: "🔴 Profitability Risk: The company is recording a net loss.",
        alert_ok: "🟢 No critical risk indicators based on key ratios.",
    }
};

document.addEventListener('DOMContentLoaded', () => {

    const state = { financials: {}, ratios: {}, charts: {} };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || key;
    
    const UI = {
        kpiRow: document.getElementById('kpiRow'),
        profitabilityChart: document.getElementById('profitabilityChart'),
        structureChart: document.getElementById('structureChart'),
        performanceSummary: document.getElementById('performanceSummary'),
        alertsArea: document.getElementById('alertsArea'),
    };

    const calculateAllFinancials = () => {
        const trialData = JSON.parse(localStorage.getItem('trialData') || '[]');
        if (trialData.length === 0) return false;

        const f = { assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0, currentAssets: 0, inventory: 0, currentLiabilities: 0 };
        trialData.forEach(row => {
            const value = (parseFloat(row.Debit) || 0) - (parseFloat(row.Credit) || 0);
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
        return true;
    };

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
                <div class="label">${t_page(kpi.key)}</div>
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
                labels: [t_page('revenue'), t_page('grossProfit'), t_page('netProfit')],
                datasets: [{ data: [revenue, grossProfit, netProfit], backgroundColor: ['#0d6efd', '#6f42c1', '#198754'] }]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });

        if (state.charts.structure) state.charts.structure.destroy();
        state.charts.structure = new Chart(UI.structureChart, {
            type: 'doughnut',
            data: {
                labels: [t_page('assets'), t_page('liabilities'), t_page('equity')],
                datasets: [{ data: [assets, liabilities, equity], backgroundColor: ['#0d6efd', '#ffc107', '#20c997'] }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    };

    const renderSummaryAndAlerts = () => {
        const { netProfitMargin, currentRatio, debtToEquity } = state.ratios;
        UI.performanceSummary.textContent = netProfitMargin > 0 && currentRatio > 1.5 ? t_page('summary_profit') : t_page('summary_loss');
        
        const alerts = [];
        if (currentRatio < 1) alerts.push(t_page('alert_liquidity_risk'));
        if (debtToEquity > 2) alerts.push(t_page('alert_leverage_risk'));
        if (netProfitMargin < 0) alerts.push(t_page('alert_profit_risk'));
        UI.alertsArea.innerHTML = alerts.length > 0 ? alerts.map(alert => `<div>${alert}</div>`).join('') : `<div>${t_page('alert_ok')}</div>`;
    };

    const updateDashboard = () => {
        const hasData = calculateAllFinancials();
        if (!hasData) {
            document.querySelector('.dashboard-grid').innerHTML = `<div class="alert alert-warning">${t_page('noData')}</div>`;
            document.getElementById('kpiRow').innerHTML = ''; // Clear KPIs too
            return;
        }
        renderKPIs();
        renderCharts();
        renderSummaryAndAlerts();
    };

    updateDashboard();
});
