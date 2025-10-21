// js/dashboard-app.js (Upgraded Version with Dynamic View Router and Trend Analysis)

window.pageTranslations = {
    ar: {
        pageTitle: "لوحة التحكم — المحلل المالي",
        pageHeader: "لوحة التحكم المالية",
        pageSubheader: "نظرة عامة مرئية على أهم مؤشرات الأداء المالي لشركتك.",
        kpi_netProfit: "صافي الربح (آخر فترة)",
        kpi_netProfitMargin: "هامش صافي الربح",
        kpi_currentRatio: "نسبة التداول",
        kpi_roe: "العائد على حقوق الملكية",
        kpi_zscore: "مؤشر Z-Score (خطر الإفلاس)",
        chartProfitTitle: "تحليل الربحية (آخر فترة)",
        chartStructureTitle: "الهيكل المالي (آخر فترة)",
        summaryTitle: "ملخص الأداء الذكي (آخر فترة)",
        alertsTitle: "تنبيهات وملاحظات (آخر فترة)",
        revenue: "الإيرادات",
        grossProfit: "مجمل الربح",
        netProfit: "صافي الربح",
        assets: "الأصول",
        liabilities: "الخصوم",
        equity: "حقوق الملكية",
        loadingData: "جاري تحميل البيانات...",
        noData: "لا توجد بيانات كافية لعرض لوحة التحكم. يرجى إدخال بيانات (أو حفظ نسخة واحدة على الأقل) أولاً.",
        summary_profit: "أداء جيد. الشركة تحقق ربحية ويمكنها تغطية التزاماتها قصيرة الأجل بشكل مريح.",
        summary_loss: "يتطلب الانتباه. الشركة تواجه تحديات في الربحية ويجب مراقبة وضع السيولة.",
        alert_liquidity_risk: "🔴 خطر سيولة: نسبة التداول أقل من 1.",
        alert_leverage_risk: "🟡 تنبيه: نسبة الدين إلى حقوق الملكية مرتفعة.",
        alert_profit_risk: "🔴 خطر ربحية: الشركة تحقق صافي خسارة.",
        alert_ok: "🟢 لا توجد مؤشرات خطر حرجة بناءً على النسب الأساسية.",
        zscore_safe: "منطقة آمنة",
        zscore_grey: "منطقة رمادية",
        zscore_distress: "منطقة الخطر",
        // --- NEW Trend Translations ---
        trend_kpi_netProfit: "صافي الربح (آخر فترة)",
        trend_kpi_revenue: "الإيرادات (آخر فترة)",
        trend_kpi_currentRatio: "نسبة التداول (آخر فترة)",
        chartProfitTrendTitle: "اتجاهات الربحية عبر الفترات",
        chartRatiosTrendTitle: "اتجاهات النسب الرئيسية عبر الفترات",
        trend_netProfit: "صافي الربح",
        trend_revenue: "الإيرادات",
        trend_currentRatio: "نسبة التداول",
        trend_netProfitMargin: "هامش صافي الربح",
        trend_zscore: "مؤشر Z-Score"
    },
    en: { // ... (English translations as before, add new trend keys) ...
    }
};

document.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        console.log("[DEBUG] Initializing dashboard-app.js after delay...");

        const state = { 
            snapshots: [], // Array to hold all calculated snapshot data
            charts: {} 
        };
        const lang = localStorage.getItem('lang') || 'ar';
        const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`;

        const UI = {
            loadingMessage: document.getElementById('loadingMessage'),
            // Single Period View
            singlePeriodView: document.getElementById('singlePeriodView'),
            gaugeCurrentRatio: document.getElementById('gaugeCurrentRatio')?.getContext('2d'),
            gaugeNetProfitMargin: document.getElementById('gaugeNetProfitMargin')?.getContext('2d'),
            gaugeZScore: document.getElementById('gaugeZScore')?.getContext('2d'),
            gaugeCurrentRatioValue: document.getElementById('gaugeCurrentRatioValue'),
            gaugeNetProfitMarginValue: document.getElementById('gaugeNetProfitMarginValue'),
            gaugeZScoreValue: document.getElementById('gaugeZScoreValue'),
            kpiNetProfitValue: document.getElementById('kpiNetProfitValue'),
            profitabilityChart: document.getElementById('profitabilityChart')?.getContext('2d'),
            structureChart: document.getElementById('structureChart')?.getContext('2d'),
            performanceSummary: document.getElementById('performanceSummary'),
            alertsArea: document.getElementById('alertsArea'),
            // Trend Analysis View
            trendAnalysisView: document.getElementById('trendAnalysisView'),
            trendNetProfit: document.getElementById('trendNetProfit'),
            trendRevenue: document.getElementById('trendRevenue'),
            trendCurrentRatio: document.getElementById('trendCurrentRatio'),
            profitTrendChart: document.getElementById('profitTrendChart')?.getContext('2d'),
            ratiosTrendChart: document.getElementById('ratiosTrendChart')?.getContext('2d'),
        };

        const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
        const formatCurrency = (value) => new Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value || 0);

        // --- Core Calculation Engine ---
        // This function now takes data as an argument
        const calculateMetrics = (trialData) => {
            if (!Array.isArray(trialData) || trialData.length === 0) {
                 return null; // Return null if data is invalid
            }
            const f = { assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0, netProfit: 0, grossProfit: 0, currentAssets: 0, inventory: 0, currentLiabilities: 0, retainedEarnings: 0, interestExpense: 0, taxExpense: 0, ebit: 0, workingCapital: 0 };
            trialData.forEach(row => {
                const value = (toNum(row.Debit)) - (toNum(row.Credit));
                const mainType = row.MainType || ''; const subType = row.SubType || ''; const accountName = (row.Account || '').toLowerCase();
                if (mainType.includes('الأصول') || mainType.includes('Assets')) { f.assets += value; if (subType.includes('متداول') || subType.includes('Current')) { f.currentAssets += value; if (subType.includes('المخزون') || subType.includes('Inventory') || accountName.includes('inventory') || accountName.includes('مخزون')) f.inventory += value; } } 
                else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) { f.liabilities -= value; if (subType.includes('متداول') || subType.includes('Current')) f.currentLiabilities -= value; } 
                else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) { f.equity -= value; if (subType.includes('الأرباح المحتجزة') || subType.includes('Retained Earnings') || accountName.includes('retained earnings') || accountName.includes('أرباح محتجزة')) f.retainedEarnings -= value; } 
                else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) { if (subType.includes('الإيرادات') || subType.includes('Revenue')) { f.revenue -= value; } else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) { f.cogs += value; } else { f.expenses += value; if (subType.includes('فائدة') || subType.includes('Interest') || accountName.includes('interest')) f.interestExpense += value; if (subType.includes('ضريبية') || subType.includes('Tax') || accountName.includes('tax')) f.taxExpense += value; } }
            });
            Object.keys(f).forEach(key => f[key] = f[key] || 0);
            f.grossProfit = f.revenue - f.cogs; f.netProfit = f.grossProfit - f.expenses; f.ebit = f.netProfit + f.interestExpense + f.taxExpense; f.workingCapital = f.currentAssets - f.currentLiabilities; f.equity += f.netProfit;
            
            // Calculate Ratios
            const assets = f.assets || 0; const equity = f.equity || 0; const liabilities = f.liabilities || 0; const revenue = f.revenue || 0;
            const x1 = assets !== 0 ? f.workingCapital / assets : Infinity; const x2 = assets !== 0 ? f.retainedEarnings / assets : Infinity; const x3 = assets !== 0 ? f.ebit / assets : Infinity; const x4 = liabilities !== 0 ? equity / liabilities : Infinity; const x5 = assets !== 0 ? revenue / assets : 0;
            const zScore = (isFinite(x1) && isFinite(x2) && isFinite(x3) && isFinite(x4) && isFinite(x5)) ? (0.717 * x1) + (0.847 * x2) + (3.107 * x3) + (0.420 * x4) + (0.998 * x5) : NaN;
            const ratios = {
                currentRatio: f.currentLiabilities > 0 ? f.currentAssets / f.currentLiabilities : Infinity,
                debtToEquity: f.equity > 0 ? f.liabilities / f.equity : Infinity,
                netProfitMargin: f.revenue > 0 ? f.netProfit / f.revenue : 0,
                roe: f.equity > 0 ? f.netProfit / f.equity : 0,
                zScore: zScore
            };
            return { financials: f, ratios: ratios };
        };
        
        // --- Gauge Chart Function ---
        const createGaugeChart = (ctx, value, max, colors) => { /* ... (Gauge function as before) ... */ };

        // --- Single Period Render Functions ---
        const renderGaugeKPIs = (financials, ratios) => {
            const { netProfit } = financials;
            const { netProfitMargin, currentRatio, roe, zScore } = ratios;
            if (UI.gaugeCurrentRatio) { const crVal = isFinite(currentRatio) ? currentRatio : 0; const crMax = 3; const crColor = crVal < 1 ? '#dc3545' : (crVal < 1.8 ? '#ffc107' : '#198754'); if (state.charts.gaugeCR) state.charts.gaugeCR.destroy(); state.charts.gaugeCR = createGaugeChart(UI.gaugeCurrentRatio, Math.min(crVal, crMax), crMax, { value: crColor, background: 'var(--bs-tertiary-bg)' }); UI.gaugeCurrentRatioValue.textContent = isFinite(currentRatio) ? currentRatio.toFixed(2) : "N/A"; UI.gaugeCurrentRatioValue.style.color = crColor; }
            if (UI.gaugeNetProfitMargin) { const npmVal = isFinite(netProfitMargin) ? netProfitMargin : 0; const npmMax = 0.25; const npmColor = npmVal < 0 ? '#dc3545' : (npmVal < 0.05 ? '#ffc107' : '#198754'); if (state.charts.gaugeNPM) state.charts.gaugeNPM.destroy(); state.charts.gaugeNPM = createGaugeChart(UI.gaugeNetProfitMargin, Math.abs(npmVal), npmMax, { value: npmColor, background: 'var(--bs-tertiary-bg)' }); UI.gaugeNetProfitMarginValue.textContent = isFinite(netProfitMargin) ? `${(netProfitMargin * 100).toFixed(1)}%` : "N/A"; UI.gaugeNetProfitMarginValue.style.color = npmColor; }
            if (UI.gaugeZScore) { const zVal = isFinite(zScore) ? zScore : 0; const zMax = 4; const zColor = zVal < 1.23 ? '#dc3545' : (zVal < 2.9 ? '#ffc107' : '#198754'); if (state.charts.gaugeZ) state.charts.gaugeZ.destroy(); state.charts.gaugeZ = createGaugeChart(UI.gaugeZScore, Math.min(zVal, zMax), zMax, { value: zColor, background: 'var(--bs-tertiary-bg)' }); UI.gaugeZScoreValue.textContent = isFinite(zScore) ? zScore.toFixed(3) : "N/A"; UI.gaugeZScoreValue.style.color = zColor; }
            if (UI.kpiNetProfitValue) { UI.kpiNetProfitValue.textContent = formatCurrency(netProfit); UI.kpiNetProfitValue.style.color = netProfit < 0 ? '#dc3545' : '#198754'; }
        };
        const renderMainCharts = (financials) => {
            const { revenue, grossProfit, netProfit, liabilities, equity } = financials;
            if (UI.profitabilityChart) { if (state.charts.profitability) state.charts.profitability.destroy(); state.charts.profitability = new Chart(UI.profitabilityChart, { type: 'bar', data: { labels: [t_page('revenue'), t_page('grossProfit'), t_page('netProfit')], datasets: [{ data: [revenue, grossProfit, netProfit], backgroundColor: ['#0d6efd', '#6f42c1', netProfit < 0 ? '#dc3545' : '#198754'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } }); } else { console.error("[DEBUG] profitabilityChart canvas context not found."); }
            if (UI.structureChart) { if (state.charts.structure) state.charts.structure.destroy(); state.charts.structure = new Chart(UI.structureChart, { type: 'doughnut', data: { labels: [t_page('liabilities'), t_page('equity')], datasets: [{ data: [liabilities, equity], backgroundColor: ['#ffc107', '#20c997'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { tooltip: { callbacks: { label: function(context) { let label = context.label || ''; let value = context.raw || 0; let total = context.chart.getDataVisibility(0) ? context.chart.getDatasetMeta(0).total : 0; let percentage = (value / total * 100).toFixed(1) + '%'; return `${label}: ${formatCurrency(value)} (${percentage})`; } } } } } }); } else { console.error("[DEBUG] structureChart canvas context not found."); }
        };
        const renderSummaryAndAlerts = (ratios) => {
            if (!UI.performanceSummary || !UI.alertsArea) { console.error("[DEBUG] Summary or Alerts elements not found."); return; }
            const { netProfitMargin, currentRatio, debtToEquity } = ratios;
            UI.performanceSummary.textContent = netProfitMargin > 0 && currentRatio > 1.5 ? t_page('summary_profit') : t_page('summary_loss');
            const alerts = [];
            if (currentRatio < 1 && isFinite(currentRatio)) alerts.push(t_page('alert_liquidity_risk'));
            if (debtToEquity > 2 && isFinite(debtToEquity)) alerts.push(t_page('alert_leverage_risk'));
            if (netProfitMargin < 0 && isFinite(netProfitMargin)) alerts.push(t_page('alert_profit_risk'));
            UI.alertsArea.innerHTML = alerts.length > 0 ? alerts.map(alert => `<div>${alert}</div>`).join('') : `<div>${t_page('alert_ok')}</div>`;
        };

        // --- NEW: Trend Analysis Render Functions ---
        const renderTrendKPIs = (snapshots) => {
            const latest = snapshots[snapshots.length - 1]; // Get the most recent data
            const previous = snapshots.length > 1 ? snapshots[snapshots.length - 2] : null;

            // Helper to render KPI with trend arrow
            const renderTrend = (currentVal, prevVal) => {
                if (!prevVal || !isFinite(currentVal) || !isFinite(prevVal) || prevVal === 0) {
                    return ''; // No previous data or cannot calculate change
                }
                const change = (currentVal - prevVal) / Math.abs(prevVal);
                if (Math.abs(change) < 0.001) return `<span class="ms-2 text-muted small">(0%)</span>`;
                const color = change > 0 ? 'text-success' : 'text-danger';
                const icon = change > 0 ? 'bi-arrow-up' : 'bi-arrow-down';
                return `<span class="ms-2 ${color} small"><i class="bi ${icon}"></i> ${(change * 100).toFixed(1)}%</span>`;
            };

            // Net Profit
            UI.trendNetProfit.innerHTML = `${formatCurrency(latest.financials.netProfit)} ${renderTrend(latest.financials.netProfit, previous?.financials.netProfit)}`;
            UI.trendNetProfit.style.color = latest.financials.netProfit < 0 ? '#dc3545' : '#198754';
            
            // Revenue
            UI.trendRevenue.innerHTML = `${formatCurrency(latest.financials.revenue)} ${renderTrend(latest.financials.revenue, previous?.financials.revenue)}`;
            
            // Current Ratio
            UI.trendCurrentRatio.innerHTML = `${latest.ratios.currentRatio.toFixed(2)} ${renderTrend(latest.ratios.currentRatio, previous?.ratios.currentRatio)}`;
            UI.trendCurrentRatio.style.color = latest.ratios.currentRatio < 1 ? '#dc3545' : 'var(--bs-primary-text-emphasis)';
        };

        const renderTrendCharts = (snapshots) => {
            const labels = snapshots.map(s => s.name);
            
            // Profitability Trend Chart
            if (UI.profitTrendChart) {
                if (state.charts.profitTrend) state.charts.profitTrend.destroy();
                state.charts.profitTrend = new Chart(UI.profitTrendChart, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            { label: t_page('trend_revenue'), data: snapshots.map(s => s.financials.revenue), borderColor: '#0d6efd', tension: 0.1 },
                            { label: t_page('trend_netProfit'), data: snapshots.map(s => s.financials.netProfit), borderColor: '#198754', tension: 0.1 }
                        ]
                    },
                    options: { responsive: true, maintainAspectRatio: false }
                });
            }

            // Ratios Trend Chart
            if (UI.ratiosTrendChart) {
                if (state.charts.ratiosTrend) state.charts.ratiosTrend.destroy();
                state.charts.ratiosTrend = new Chart(UI.ratiosTrendChart, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            { label: t_page('trend_currentRatio'), data: snapshots.map(s => s.ratios.currentRatio), borderColor: '#ffc107', tension: 0.1, yAxisID: 'y' },
                            { label: t_page('trend_netProfitMargin'), data: snapshots.map(s => s.ratios.netProfitMargin), borderColor: '#6f42c1', tension: 0.1, yAxisID: 'yPercent' },
                            { label: t_page('trend_zscore'), data: snapshots.map(s => s.ratios.zScore), borderColor: '#dc3545', tension: 0.1, yAxisID: 'y' }
                        ]
                    },
                    options: { 
                        responsive: true, 
                        maintainAspectRatio: false,
                        scales: {
                            y: { type: 'linear', display: true, position: 'left', title: { display: true, text: 'Ratio Value' } },
                            yPercent: { type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: 'Percentage %' }, 
                                ticks: { callback: (value) => (value * 100).toFixed(0) + '%' } 
                            }
                        }
                    }
                });
            }
        };

        // --- Main Initialization Function ---
        const loadAndRouteDashboard = () => {
            // 1. Load all snapshot data
            state.snapshots = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('FA_DATASET_')) {
                    try {
                        const name = key.replace('FA_DATASET_', '');
                        const data = JSON.parse(localStorage.getItem(key));
                        const metrics = calculateMetrics(data);
                        if (metrics) {
                            state.snapshots.push({ name, ...metrics });
                        }
                    } catch (e) {
                        console.warn(`Could not parse dataset ${key}:`, e);
                    }
                }
            }
            // Sort snapshots by name (e.g., "2023", "2024")
            state.snapshots.sort((a, b) => a.name.localeCompare(b.name));
            
            console.log(`[DEBUG] Found ${state.snapshots.length} snapshots.`);

            // 2. Decide which view to show
            if (state.snapshots.length > 1) {
                // --- Show Trend Analysis View ---
                console.log("[DEBUG] More than 1 snapshot found. Showing Trend Analysis View.");
                if (UI.loadingMessage) UI.loadingMessage.style.display = 'none';
                if (UI.singlePeriodView) UI.singlePeriodView.style.display = 'none';
                if (UI.trendAnalysisView) UI.trendAnalysisView.style.display = 'block';

                renderTrendKPIs(state.snapshots);
                renderTrendCharts(state.snapshots);

            } else {
                // --- Show Single Period View (Gauges) ---
                console.log("[DEBUG] 1 or 0 snapshots found. Showing Single Period View.");
                if (UI.trendAnalysisView) UI.trendAnalysisView.style.display = 'none';

                let dataToAnalyze = null;
                if (state.snapshots.length === 1) {
                    console.log("[DEBUG] Using the 1 saved snapshot.");
                    // Use the single snapshot's data
                    dataToAnalyze = state.snapshots[0]; 
                } else {
                    // No snapshots, try to find 'trialData'
                    console.log("[DEBUG] No snapshots. Trying to load 'trialData'.");
                    const trialData = JSON.parse(localStorage.getItem('trialData') || '[]');
                    if (trialData.length > 0) {
                        dataToAnalyze = calculateMetrics(trialData);
                    }
                }

                if (dataToAnalyze && dataToAnalyze.financials && dataToAnalyze.ratios) {
                    if (UI.loadingMessage) UI.loadingMessage.style.display = 'none';
                    if (UI.singlePeriodView) UI.singlePeriodView.style.display = 'flex'; // Use flex for row
                    
                    renderGaugeKPIs(dataToAnalyze.financials, dataToAnalyze.ratios);
                    renderMainCharts(dataToAnalyze.financials);
                    renderSummaryAndAlerts(dataToAnalyze.ratios);
                } else {
                    // No data found at all
                    console.log("[DEBUG] No data found at all.");
                    if (UI.loadingMessage) {
                        UI.loadingMessage.textContent = t_page('noData');
                        UI.loadingMessage.classList.remove('alert-warning');
                        UI.loadingMessage.classList.add('alert-danger');
                    }
                }
            }
            
            // 3. Apply Translations
            if (typeof window.applyTranslations === 'function') {
                console.log("[DEBUG] Applying translations (dashboard-app.js)...");
                window.applyTranslations();
            } else {
                console.error("[!!! DEBUG !!!] applyTranslations function not found. Check main.js");
            }
        };

        loadAndRouteDashboard();

    }, 100); // 100ms delay
});
