// js/dashboard-app.js (Full Version with Gauge Charts)

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
        chartStructureTitle: "الهيكل المالي (الأصول = الخصوم + حقوق الملكية)",
        summaryTitle: "ملخص الأداء الذكي",
        alertsTitle: "تنبيهات وملاحظات",
        revenue: "الإيرادات",
        grossProfit: "مجمل الربح",
        netProfit: "صافي الربح",
        assets: "الأصول",
        liabilities: "الخصوم",
        equity: "حقوق الملكية",
        loadingData: "جاري تحميل البيانات...",
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
        chartStructureTitle: "Financial Structure (Assets = Liabilities + Equity)",
        summaryTitle: "Smart Performance Summary",
        alertsTitle: "Alerts & Notes",
        revenue: "Revenue",
        grossProfit: "Gross Profit",
        netProfit: "Net Profit",
        assets: "Assets",
        liabilities: "Liabilities",
        equity: "Equity",
        loadingData: "Loading data...",
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

    // Use setTimeout to ensure main.js and Chart.js are fully loaded
    setTimeout(() => {
        console.log("[DEBUG] Initializing dashboard-app.js after delay...");

        const state = { financials: {}, ratios: {}, charts: {} };
        const lang = localStorage.getItem('lang') || 'ar';
        const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`;

        const UI = {
            kpiRow: document.getElementById('kpiRow'),
            mainDashboardRow: document.getElementById('mainDashboardRow'),
            loadingMessage: document.getElementById('loadingMessage'),
            // Gauge Canvases
            gaugeCurrentRatio: document.getElementById('gaugeCurrentRatio')?.getContext('2d'),
            gaugeNetProfitMargin: document.getElementById('gaugeNetProfitMargin')?.getContext('2d'),
            gaugeROE: document.getElementById('gaugeROE')?.getContext('2d'),
            // Gauge Value Labels
            gaugeCurrentRatioValue: document.getElementById('gaugeCurrentRatioValue'),
            gaugeNetProfitMarginValue: document.getElementById('gaugeNetProfitMarginValue'),
            gaugeROEValue: document.getElementById('gaugeROEValue'),
            kpiNetProfitValue: document.getElementById('kpiNetProfitValue'),
            // Main Chart Canvases
            profitabilityChart: document.getElementById('profitabilityChart')?.getContext('2d'),
            structureChart: document.getElementById('structureChart')?.getContext('2d'),
            // Summary/Alerts
            performanceSummary: document.getElementById('performanceSummary'),
            alertsArea: document.getElementById('alertsArea'),
        };

        const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
        const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value || 0);

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
            
            Object.keys(f).forEach(key => f[key] = f[key] || 0);
            f.grossProfit = f.revenue - f.cogs;
            f.netProfit = f.grossProfit - f.expenses;
            f.equity += f.netProfit; // Add Net Profit to Equity
            
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

        // --- NEW GAUGE CHART FUNCTION ---
        const createGaugeChart = (ctx, value, label, max, colors, valueText) => {
            const data = {
                datasets: [{
                    data: [value, max - value], // Value vs. Remainder
                    backgroundColor: [colors.value, colors.background],
                    borderColor: [colors.value, colors.background],
                    borderWidth: 1
                }]
            };
            
            return new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    circumference: 180, // Half circle
                    rotation: 270,       // Start at the bottom
                    cutout: '75%',       // Thickness of the gauge
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    }
                }
            });
        };

        // --- NEW: Render Gauge KPIs ---
        const renderGaugeKPIs = () => {
            const { netProfit } = state.financials;
            const { netProfitMargin, currentRatio, roe } = state.ratios;
            
            // 1. Current Ratio Gauge
            if (UI.gaugeCurrentRatio) {
                const crVal = isFinite(currentRatio) ? currentRatio : 0;
                const crMax = 3; // Max value on gauge
                const crColor = crVal < 1 ? '#dc3545' : (crVal < 1.8 ? '#ffc107' : '#198754'); // Red, Yellow, Green
                if (state.charts.gaugeCR) state.charts.gaugeCR.destroy();
                state.charts.gaugeCR = createGaugeChart(UI.gaugeCurrentRatio, Math.min(crVal, crMax), 'Current Ratio', crMax, 
                    { value: crColor, background: 'var(--bs-tertiary-bg)' }
                );
                UI.gaugeCurrentRatioValue.textContent = isFinite(currentRatio) ? currentRatio.toFixed(2) : "N/A";
                UI.gaugeCurrentRatioValue.style.color = crColor;
            }

            // 2. Net Profit Margin Gauge
            if (UI.gaugeNetProfitMargin) {
                const npmVal = isFinite(netProfitMargin) ? netProfitMargin : 0;
                const npmMax = 0.25; // 25% max
                const npmColor = npmVal < 0 ? '#dc3545' : (npmVal < 0.05 ? '#ffc107' : '#198754');
                if (state.charts.gaugeNPM) state.charts.gaugeNPM.destroy();
                state.charts.gaugeNPM = createGaugeChart(UI.gaugeNetProfitMargin, Math.abs(npmVal), npmMax, 
                    { value: npmColor, background: 'var(--bs-tertiary-bg)' }
                );
                UI.gaugeNetProfitMarginValue.textContent = isFinite(netProfitMargin) ? `${(netProfitMargin * 100).toFixed(1)}%` : "N/A";
                UI.gaugeNetProfitMarginValue.style.color = npmColor;
            }

            // 3. ROE Gauge
            if (UI.gaugeROE) {
                const roeVal = isFinite(roe) ? roe : 0;
                const roeMax = 0.30; // 30% max
                const roeColor = roeVal < 0 ? '#dc3545' : (roeVal < 0.10 ? '#ffc107' : '#198754');
                if (state.charts.gaugeROE) state.charts.gaugeROE.destroy();
                state.charts.gaugeROE = createGaugeChart(UI.gaugeROE, Math.abs(roeVal), roeMax, 
                    { value: roeColor, background: 'var(--bs-tertiary-bg)' }
                );
                UI.gaugeROEValue.textContent = isFinite(roe) ? `${(roe * 100).toFixed(1)}%` : "N/A";
                UI.gaugeROEValue.style.color = roeColor;
            }
            
            // 4. Net Profit KPI
            if (UI.kpiNetProfitValue) {
                UI.kpiNetProfitValue.textContent = formatCurrency(netProfit);
                UI.kpiNetProfitValue.style.color = netProfit < 0 ? '#dc3545' : '#198754';
            }
        };

        const renderMainCharts = () => {
            const { revenue, grossProfit, netProfit, assets, liabilities, equity } = state.financials;

            // --- Profitability Chart ---
            if (UI.profitabilityChart) {
                if (state.charts.profitability) state.charts.profitability.destroy();
                state.charts.profitability = new Chart(UI.profitabilityChart, {
                    type: 'bar',
                    data: {
                        labels: [t_page('revenue'), t_page('grossProfit'), t_page('netProfit')],
                        datasets: [{ 
                            data: [revenue, grossProfit, netProfit], 
                            backgroundColor: ['#0d6efd', '#6f42c1', netProfit < 0 ? '#dc3545' : '#198754'] 
                        }]
                    },
                    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
                });
            } else { console.error("[DEBUG] profitabilityChart canvas context not found."); }

            // --- Structure Chart ---
            if (UI.structureChart) {
                if (state.charts.structure) state.charts.structure.destroy();
                // Show A = L + E
                state.charts.structure = new Chart(UI.structureChart, {
                    type: 'doughnut',
                    data: {
                        labels: [t_page('liabilities'), t_page('equity')],
                        datasets: [{ data: [liabilities, equity], backgroundColor: ['#ffc107', '#20c997'] }]
                    },
                    options: { 
                        responsive: true, 
                        maintainAspectRatio: false,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        let label = context.label || '';
                                        let value = context.raw || 0;
                                        let total = context.chart.getDataVisibility(0) ? context.chart.getDatasetMeta(0).total : 0;
                                        let percentage = (value / total * 100).toFixed(1) + '%';
                                        return `${label}: ${formatCurrency(value)} (${percentage})`;
                                    }
                                }
                            }
                        }
                    }
                });
            } else { console.error("[DEBUG] structureChart canvas context not found."); }
        };

        const renderSummaryAndAlerts = () => {
            if (!UI.performanceSummary || !UI.alertsArea) { console.error("[DEBUG] Summary or Alerts elements not found."); return; }
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
                if (UI.kpiRow) UI.kpiRow.style.display = 'none';
                if (UI.mainDashboardRow) UI.mainDashboardRow.style.display = 'none';
                return;
            }
            
            if (UI.loadingMessage) UI.loadingMessage.style.display = 'none'; // Hide loading message
            if (UI.kpiRow) UI.kpiRow.style.display = 'flex'; // Show KPI row
            if (UI.mainDashboardRow) UI.mainDashboardRow.style.display = 'flex'; // Show main row
            
            renderGaugeKPIs();
            renderMainCharts();
            renderSummaryAndAlerts();

            // Apply translations
            if (typeof window.applyTranslations === 'function') {
                console.log("[DEBUG] Applying translations (dashboard-app.js)...");
                window.applyTranslations();
            } else {
                console.error("[!!! DEBUG !!!] applyTranslations function not found in dashboard-app.js. Check main.js");
            }
        };

        updateDashboard();

    }, 100); // 100ms delay
});
