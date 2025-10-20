// js/dashboard-app.js (Corrected and Linked Version)

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

    // *** Use setTimeout to ensure main.js and Chart.js are loaded ***
    setTimeout(() => {
        console.log("[DEBUG] Initializing dashboard-app.js after delay...");

        const state = { financials: {}, ratios: {}, charts: {} };
        const lang = localStorage.getItem('lang') || 'ar';
        const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`;

        const UI = {
            kpiRow: document.getElementById('kpiRow'),
            // *** Use getContext('2d') for Chart.js ***
            profitabilityChart: document.getElementById('profitabilityChart')?.getContext('2d'),
            structureChart: document.getElementById('structureChart')?.getContext('2d'),
            performanceSummary: document.getElementById('performanceSummary'),
            alertsArea: document.getElementById('alertsArea'),
            loadingMessage: document.getElementById('loadingMessage') // Get loading message
        };

        // *** Helper function toNum (was missing) ***
        const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;

        const calculateAllFinancials = () => {
            let trialData;
            try {
                 const rawDataString = localStorage.getItem('trialData');
                 if (!rawDataString) throw new Error("localStorage 'trialData' is missing.");
                 trialData = JSON.parse(rawDataString);
                 if (!Array.isArray(trialData) || trialData.length === 0) throw new Error("Parsed 'trialData' is empty.");
            } catch (e) {
                 console.warn("[DEBUG] No valid trialData found.", e.message);
                 return false;
            }

            const f = { assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0, currentAssets: 0, inventory: 0, currentLiabilities: 0, netProfit: 0, grossProfit: 0 };
            
            trialData.forEach(row => {
                const value = (toNum(row.Debit)) - (toNum(row.Credit));
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
            
            Object.keys(f).forEach(key => f[key] = f[key] || 0); // Ensure all are numbers
            f.grossProfit = f.revenue - f.cogs;
            f.netProfit = f.grossProfit - f.expenses;
            
            // Add Net Profit to Equity for correct BS structure (A = L + E + NP)
            f.equity += f.netProfit; 

            state.financials = f;

            state.ratios = {
                currentRatio: f.currentLiabilities > 0 ? f.currentAssets / f.currentLiabilities : Infinity,
                debtToEquity: f.equity > 0 ? f.liabilities / f.equity : Infinity,
                netProfitMargin: f.revenue > 0 ? f.netProfit / f.revenue : 0,
                roe: f.equity > 0 ? f.netProfit / f.equity : 0,
            };
            console.log("[DEBUG] Dashboard financials calculated:", state.financials);
            console.log("[DEBUG] Dashboard ratios calculated:", state.ratios);
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

            if (UI.kpiRow) {
                 // *** Modify to create cards inside the row ***
                 UI.kpiRow.innerHTML = kpis.map(kpi => `
                    <div class="col-lg-3 col-md-6">
                        <div class="kpi-card">
                            <div class="label">${t_page(kpi.key)}</div>
                            <div class="value">${kpi.value}</div>
                        </div>
                    </div>
                `).join('');
            } else {
                 console.error("[DEBUG] kpiRow element not found.");
            }
        };

        const renderCharts = () => {
            const { revenue, grossProfit, netProfit, assets, liabilities, equity } = state.financials;

            // --- Profitability Chart ---
            if (UI.profitabilityChart) {
                if (state.charts.profitability) state.charts.profitability.destroy();
                state.charts.profitability = new Chart(UI.profitabilityChart, {
                    type: 'bar',
                    data: {
                        labels: [t_page('revenue'), t_page('grossProfit'), t_page('netProfit')],
                        datasets: [{ data: [revenue, grossProfit, netProfit], backgroundColor: ['#0d6efd', '#6f42c1', '#198754'] }]
                    },
                    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
                });
            } else {
                 console.error("[DEBUG] profitabilityChart canvas context not found.");
            }

            // --- Structure Chart ---
            if (UI.structureChart) {
                if (state.charts.structure) state.charts.structure.destroy();
                // Use correct BS equation: A = L + E
                state.charts.structure = new Chart(UI.structureChart, {
                    type: 'doughnut',
                    data: {
                        labels: [t_page('liabilities'), t_page('equity')], // Show A = L + E structure
                        datasets: [{ data: [liabilities, equity], backgroundColor: ['#ffc107', '#20c997'] }]
                    },
                    options: { responsive: true, maintainAspectRatio: false }
                });
            } else {
                 console.error("[DEBUG] structureChart canvas context not found.");
            }
        };

        const renderSummaryAndAlerts = () => {
            if (!UI.performanceSummary || !UI.alertsArea) {
                 console.error("[DEBUG] Summary or Alerts elements not found.");
                 return;
            }
            const { netProfitMargin, currentRatio, debtToEquity } = state.ratios;
            UI.performanceSummary.textContent = netProfitMargin > 0 && currentRatio > 1.5 ? t_page('summary_profit') : t_page('summary_loss');
            
            const alerts = [];
            if (currentRatio < 1 && isFinite(currentRatio)) alerts.push(t_page('alert_liquidity_risk'));
            if (debtToEquity > 2 && isFinite(debtToEquity)) alerts.push(t_page('alert_leverage_risk'));
            if (netProfitMargin < 0 && isFinite(netProfitMargin)) alerts.push(t_page('alert_profit_risk'));
            UI.alertsArea.innerHTML = alerts.length > 0 ? alerts.map(alert => `<div>${alert}</div>`).join('') : `<div>${t_page('alert_ok')}</div>`;
        };

        const updateDashboard = () => {
            const hasData = calculateAllFinancials();
            if (!hasData) {
                if (UI.loadingMessage) {
                     UI.loadingMessage.textContent = t_page('noData');
                     UI.loadingMessage.classList.remove('alert-warning');
                     UI.loadingMessage.classList.add('alert-danger');
                }
                // Hide chart/summary sections if no data
                document.querySelector('.dashboard-grid')?.classList.add('d-none'); // Hide if exists
                document.querySelector('.row.g-4')?.classList.add('d-none'); // Hide charts/summary
                return;
            }
            
            if (UI.loadingMessage) UI.loadingMessage.parentElement.remove(); // Remove loading message div
            
            renderKPIs();
            renderCharts();
            renderSummaryAndAlerts();

            // *** Apply translations ***
            if (typeof window.applyTranslations === 'function') {
                console.log("[DEBUG] Applying translations (dashboard-app.js)...");
                window.applyTranslations();
            } else {
                console.error("[!!! DEBUG !!!] applyTranslations function not found in dashboard-app.js. Check main.js");
            }
        };

        updateDashboard();

    }, 100); // 100ms delay to ensure main.js/Chart.js are loaded
});
