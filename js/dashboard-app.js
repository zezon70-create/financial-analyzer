// js/dashboard-app.js 
const dashboardTranslations = {
    ar: {
        pageTitle: "لوحة التحكم — المحلل المالي",
        pageHeader: "لوحة التحكم المالية",
        pageSubheader: "نظرة عامة مرئية على أهم مؤشرات الأداء المالي لشركتك.",
        exportPdf: "تصدير PDF", // *** مُضاف ***
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
        noData: "لا توجد بيانات قوائم مالية مُجهزة. يرجى تشغيل صفحة 'التقارير' أولاً لإنشاء القوائم.", // *** مُعدل: رسالة أوضح ***
        summary_profit: "أداء جيد. الشركة تحقق ربحية ويمكنها تغطية التزاماتها قصيرة الأجل بشكل مريح.",
        summary_loss: "يتطلب الانتباه. الشركة تواجه تحديات في الربحية ويجب مراقبة وضع السيولة.",
        alert_liquidity_risk: "🔴 خطر سيولة: نسبة التداول أقل من 1.",
        alert_leverage_risk: "🟡 تنبيه: نسبة الدين إلى حقوق الملكية مرتفعة.",
        alert_profit_risk: "🔴 خطر ربحية: الشركة تحقق صافي خسارة.",
        alert_ok: "🟢 لا توجد مؤشرات خطر حرجة بناءً على النسب الأساسية.",
        zscore_safe: "منطقة آمنة",
        zscore_grey: "منطقة رمادية",
        zscore_distress: "منطقة الخطر",
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
    en: {
        // *** مُضاف: ترجمات إنجليزية كاملة ***
        pageTitle: "Dashboard — Financial Analyzer",
        pageHeader: "Financial Dashboard",
        pageSubheader: "A visual overview of your company's key financial performance indicators.",
        exportPdf: "Export PDF",
        kpi_netProfit: "Net Profit (Current)",
        kpi_netProfitMargin: "Net Profit Margin",
        kpi_currentRatio: "Current Ratio",
        kpi_roe: "Return on Equity (ROE)",
        kpi_zscore: "Z-Score (Bankruptcy Risk)",
        chartProfitTitle: "Profitability Analysis (Current)",
        chartStructureTitle: "Financial Structure (Current)",
        summaryTitle: "Smart Performance Summary (Current)",
        alertsTitle: "Alerts & Observations (Current)",
        revenue: "Revenue",
        grossProfit: "Gross Profit",
        netProfit: "Net Profit",
        assets: "Assets",
        liabilities: "Liabilities",
        equity: "Equity",
        loadingData: "Loading data...",
        noData: "No processed financial statements found. Please run the 'Report' page first to generate statements.",
        summary_profit: "Good performance. The company is profitable and can comfortably cover its short-term obligations.",
        summary_loss: "Attention required. The company faces profitability challenges and liquidity should be monitored.",
        alert_liquidity_risk: "🔴 Liquidity Risk: Current Ratio is below 1.",
        alert_leverage_risk: "🟡 Warning: Debt to Equity ratio is high.",
        alert_profit_risk: "🔴 Profitability Risk: The company is reporting a net loss.",
        alert_ok: "🟢 No critical risk indicators found based on core ratios.",
        zscore_safe: "Safe Zone",
        zscore_grey: "Grey Zone",
        zscore_distress: "Distress Zone",
        trend_kpi_netProfit: "Net Profit (Current)",
        trend_kpi_revenue: "Revenue (Current)",
        trend_kpi_currentRatio: "Current Ratio (Current)",
        chartProfitTrendTitle: "Profitability Trends Over Periods",
        chartRatiosTrendTitle: "Key Ratio Trends Over Periods",
        trend_netProfit: "Net Profit",
        trend_revenue: "Revenue",
        trend_currentRatio: "Current Ratio",
        trend_netProfitMargin: "Net Profit Margin",
        trend_zscore: "Z-Score"
    }
};
window.pageTranslations = window.pageTranslations || {};
window.pageTranslations.ar = { ...(window.pageTranslations.ar || {}), ...(dashboardTranslations.ar || {}) };
window.pageTranslations.en = { ...(window.pageTranslations.en || {}), ...(dashboardTranslations.en || {}) };
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        console.log("[DEBUG] Initializing dashboard-app.js after delay...");
        const state = {
            statementsCurrent: null,
            statementsPrevious: null,
            metricsCurrent: null, // Will hold calculated metrics for current period
            metricsPrevious: null, // Will hold calculated metrics for previous period
            charts: {},
            hasDataCurrent: false,
            hasDataPrevious: false
        };
        const lang = localStorage.getItem('lang') || 'ar';
        const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`;
        const UI = {
            loadingMessage: document.getElementById('loadingMessage'),
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
            trendAnalysisView: document.getElementById('trendAnalysisView'),
            trendNetProfit: document.getElementById('trendNetProfit'),
            trendRevenue: document.getElementById('trendRevenue'),
            trendCurrentRatio: document.getElementById('trendCurrentRatio'),
            profitTrendChart: document.getElementById('profitTrendChart')?.getContext('2d'),
            ratiosTrendChart: document.getElementById('ratiosTrendChart')?.getContext('2d'),
            exportPdfBtn: document.getElementById('exportPdfBtn') // *** مُضاف ***
        };

        const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
        const formatPercent = (value, digits = 1) => isFinite(value) && !isNaN(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
        const formatRatio = (value, digits = 2) => isFinite(value) && !isNaN(value) ? value.toFixed(digits) : "N/A";
        const formatCurrency = (value) => isFinite(value) && !isNaN(value) ? value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : "N/A";
        // --- Core Calculation Engine (Simplified) ---

        // *** مُلغى: دالة calculateMetrics القديمة ***

        // *** مُضاف: دالة جديدة لقراءة البيانات المجهزة ***
        const loadProcessedData = () => {
            console.log("[DEBUG] Loading processed data from localStorage...");
            const currentDataString = localStorage.getItem('financialDataCurrent');
            const previousDataString = localStorage.getItem('financialDataPrevious');
            
            state.hasDataCurrent = false;
            state.hasDataPrevious = false;
            state.statementsCurrent = null;
            state.statementsPrevious = null;

            if (currentDataString) {
                try {
                    state.statementsCurrent = JSON.parse(currentDataString);
                    if (state.statementsCurrent && state.statementsCurrent.totals) {
                        state.hasDataCurrent = true;
                        console.log("[DEBUG] Loaded 'financialDataCurrent' successfully.");
                    } else { console.warn("[DEBUG] 'financialDataCurrent' found but format is invalid."); }
                } catch (e) { console.error("Error parsing 'financialDataCurrent':", e); }
            } else {
                 console.warn("[DEBUG] 'financialDataCurrent' not found. Run 'Report' page first.");
            }

            if (previousDataString) {
                 try {
                    state.statementsPrevious = JSON.parse(previousDataString);
                     if (state.statementsPrevious && state.statementsPrevious.totals) {
                        state.hasDataPrevious = true;
                        console.log("[DEBUG] Loaded 'financialDataPrevious' successfully.");
                    } else { console.warn("[DEBUG] 'financialDataPrevious' found but format is invalid."); }
                } catch (e) { console.error("Error parsing 'financialDataPrevious':", e); }
            } else {
                console.warn("[DEBUG] 'financialDataPrevious' not found.");
            }
            return state.hasDataCurrent; // Return true only if current data is valid
        };

        // *** مُضاف: دالة جديدة لحساب المقاييس المطلوبة فقط ***
        const calculateDashboardMetrics = (statements) => {
            if (!statements || !statements.totals) return null;

            const f = statements.totals;
            const assets = f.totalAssets || 0;
            const equity = f.totalEquity || 0;
            const liabilities = f.totalLiabilities || 0;
            const revenue = f.totalRevenue || 0;
            const netProfit = f.netProfit || 0;
            const ebit = f.ebit || 0;
            const workingCapital = f.workingCapital || 0;
            const retainedEarnings = f.retainedEarnings || 0; // Closing RE
            const currentAssets = f.totalCurrentAssets || 0;
            const currentLiabilities = f.totalCurrentLiabilities || 0;

            // Z-Score calcs
            const x1 = assets !== 0 ? workingCapital / assets : Infinity; 
            const x2 = assets !== 0 ? retainedEarnings / assets : Infinity; 
            const x3 = assets !== 0 ? ebit / assets : Infinity; 
            const x4 = liabilities !== 0 ? equity / liabilities : Infinity; 
            const x5 = assets !== 0 ? revenue / assets : 0; 
            const zScore = (isFinite(x1) && isFinite(x2) && isFinite(x3) && isFinite(x4) && isFinite(x5)) ? (0.717 * x1) + (0.847 * x2) + (3.107 * x3) + (0.420 * x4) + (0.998 * x5) : NaN;

            const metrics = {
                // Base values for charts
                revenue: revenue,
                grossProfit: f.grossProfit || 0,
                netProfit: netProfit,
                assets: assets,
                liabilities: liabilities,
                equity: equity,
                // Ratios for gauges/alerts
                currentRatio: currentLiabilities > 0 ? currentAssets / currentLiabilities : Infinity,
                debtToEquity: equity > 0 ? liabilities / equity : Infinity,
                netProfitMargin: revenue > 0 ? netProfit / revenue : 0,
                zScore: zScore
            };
            console.log("[DEBUG] Dashboard metrics calculated:", metrics);
            return metrics;
        };
        
        // --- Gauge Chart Function ---
        const createGaugeChart = (ctx, value, max, colors) => {
            const data = { datasets: [{ data: [value, max - value], backgroundColor: [colors.value, colors.background], borderColor: [colors.value, colors.background], borderWidth: 1 }] };
            return new Chart(ctx, { type: 'doughnut', data: data, options: { responsive: true, maintainAspectRatio: false, circumference: 180, rotation: 270, cutout: '75%', plugins: { legend: { display: false }, tooltip: { enabled: false } } } });
        };

        // --- Render Functions (Adapted) ---
        const renderGaugeKPIs = (metrics) => {
            const { netProfit, netProfitMargin, currentRatio, zScore } = metrics;
            if (UI.gaugeCurrentRatio) { const crVal = isFinite(currentRatio) ? currentRatio : 0; const crMax = 3; const crColor = crVal < 1 ? '#dc3545' : (crVal < 1.8 ? '#ffc107' : '#198754'); if (state.charts.gaugeCR) state.charts.gaugeCR.destroy(); state.charts.gaugeCR = createGaugeChart(UI.gaugeCurrentRatio, Math.min(crVal, crMax), crMax, { value: crColor, background: 'var(--bs-tertiary-bg)' }); UI.gaugeCurrentRatioValue.textContent = isFinite(currentRatio) ? currentRatio.toFixed(2) : "N/A"; UI.gaugeCurrentRatioValue.style.color = crColor; }
            if (UI.gaugeNetProfitMargin) { const npmVal = isFinite(netProfitMargin) ? netProfitMargin : 0; const npmMax = 0.25; const npmColor = npmVal < 0 ? '#dc3545' : (npmVal < 0.05 ? '#ffc107' : '#198754'); if (state.charts.gaugeNPM) state.charts.gaugeNPM.destroy(); state.charts.gaugeNPM = createGaugeChart(UI.gaugeNetProfitMargin, Math.abs(npmVal), npmMax, { value: npmColor, background: 'var(--bs-tertiary-bg)' }); UI.gaugeNetProfitMarginValue.textContent = isFinite(netProfitMargin) ? `${(netProfitMargin * 100).toFixed(1)}%` : "N/A"; UI.gaugeNetProfitMarginValue.style.color = npmColor; }
            if (UI.gaugeZScore) { const zVal = isFinite(zScore) ? zScore : 0; const zMax = 4; const zColor = zVal < 1.23 ? '#dc3545' : (zVal < 2.9 ? '#ffc107' : '#198754'); if (state.charts.gaugeZ) state.charts.gaugeZ.destroy(); state.charts.gaugeZ = createGaugeChart(UI.gaugeZScore, Math.min(Math.max(zVal, 0), zMax), zMax, { value: zColor, background: 'var(--bs-tertiary-bg)' }); UI.gaugeZScoreValue.textContent = isFinite(zScore) ? zScore.toFixed(3) : "N/A"; UI.gaugeZScoreValue.style.color = zColor; }
            if (UI.kpiNetProfitValue) { UI.kpiNetProfitValue.textContent = formatCurrency(netProfit); UI.kpiNetProfitValue.style.color = netProfit < 0 ? '#dc3545' : '#198754'; }
        };
        const renderMainCharts = (metrics) => {
            const { revenue, grossProfit, netProfit, liabilities, equity } = metrics;
            if (UI.profitabilityChart) { if (state.charts.profitability) state.charts.profitability.destroy(); state.charts.profitability = new Chart(UI.profitabilityChart, { type: 'bar', data: { labels: [t_page('revenue'), t_page('grossProfit'), t_page('netProfit')], datasets: [{ data: [revenue, grossProfit, netProfit], backgroundColor: ['#0d6efd', '#6f42c1', netProfit < 0 ? '#dc3545' : '#198754'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } }); } else { console.error("[DEBUG] profitabilityChart canvas context not found."); }
            if (UI.structureChart) { if (state.charts.structure) state.charts.structure.destroy(); state.charts.structure = new Chart(UI.structureChart, { type: 'doughnut', data: { labels: [t_page('liabilities'), t_page('equity')], datasets: [{ data: [liabilities, equity], backgroundColor: ['#ffc107', '#20c997'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { tooltip: { callbacks: { label: function(context) { let label = context.label || ''; let value = context.raw || 0; let total = context.chart.getDataVisibility(0) ? context.chart.getDatasetMeta(0).total : 0; let percentage = (value / total * 100).toFixed(1) + '%'; return `${label}: ${formatCurrency(value)} (${percentage})`; } } } } } }); } else { console.error("[DEBUG] structureChart canvas context not found."); }
        };
        const renderSummaryAndAlerts = (metrics) => {
            if (!UI.performanceSummary || !UI.alertsArea) { console.error("[DEBUG] Summary or Alerts elements not found."); return; }
            const { netProfitMargin, currentRatio, debtToEquity } = metrics;
            UI.performanceSummary.textContent = netProfitMargin > 0 && currentRatio > 1.5 ? t_page('summary_profit') : t_page('summary_loss');
            const alerts = [];
            if (currentRatio < 1 && isFinite(currentRatio)) alerts.push({text: t_page('alert_liquidity_risk'), class: 'list-group-item-danger'});
            if (debtToEquity > 2 && isFinite(debtToEquity)) alerts.push({text: t_page('alert_leverage_risk'), class: 'list-group-item-warning'});
            if (netProfitMargin < 0 && isFinite(netProfitMargin)) alerts.push({text: t_page('alert_profit_risk'), class: 'list-group-item-danger'});
            
            if (alerts.length > 0) {
                 UI.alertsArea.innerHTML = alerts.map(alert => `<li class="list-group-item ${alert.class}">${alert.text}</li>`).join('');
            } else {
                 UI.alertsArea.innerHTML = `<li class="list-group-item list-group-item-success">${t_page('alert_ok')}</li>`;
            }
        };

        // --- Trend Analysis Render Functions (Adapted) ---
        const renderTrendKPIs = (metricsCurrent, metricsPrevious) => {
            const latest = metricsCurrent;
            const previous = metricsPrevious;
            const renderTrend = (currentVal, prevVal) => {
                if (!previous || !isFinite(currentVal) || !isFinite(prevVal) || prevVal === 0) return '';
                const change = (currentVal - prevVal) / Math.abs(prevVal);
                if (Math.abs(change) < 0.001) return `<span class="ms-2 text-muted small">(0%)</span>`;
                const color = change > 0 ? 'text-success' : 'text-danger';
                const icon = change > 0 ? 'bi-arrow-up' : 'bi-arrow-down';
                return `<span class="ms-2 ${color} small"><i class="bi ${icon}"></i> ${(change * 100).toFixed(1)}%</span>`;
            };
            if(UI.trendNetProfit) { UI.trendNetProfit.innerHTML = `${formatCurrency(latest.netProfit)} ${renderTrend(latest.netProfit, previous?.netProfit)}`; UI.trendNetProfit.style.color = latest.netProfit < 0 ? '#dc3545' : '#198754'; }
            if(UI.trendRevenue) UI.trendRevenue.innerHTML = `${formatCurrency(latest.revenue)} ${renderTrend(latest.revenue, previous?.revenue)}`;
            if(UI.trendCurrentRatio) { UI.trendCurrentRatio.innerHTML = `${latest.currentRatio.toFixed(2)} ${renderTrend(latest.currentRatio, previous?.currentRatio)}`; UI.trendCurrentRatio.style.color = latest.currentRatio < 1 ? '#dc3545' : 'var(--bs-primary-text-emphasis)'; }
        };
        const renderTrendCharts = (metricsCurrent, metricsPrevious) => {
            // This assumes only two periods; for multi-period, state needs to hold an array
            const labels = [t_page('thPreviousPeriod'), t_page('thCurrentPeriod')]; 
            const snapshots = [metricsPrevious, metricsCurrent]; // Create array from two points

            if (UI.profitTrendChart) {
                if (state.charts.profitTrend) state.charts.profitTrend.destroy();
                state.charts.profitTrend = new Chart(UI.profitTrendChart, {
                    type: 'line',
                    data: { labels: labels, datasets: [ { label: t_page('trend_revenue'), data: snapshots.map(s => s.revenue), borderColor: '#0d6efd', tension: 0.1 }, { label: t_page('trend_netProfit'), data: snapshots.map(s => s.netProfit), borderColor: '#198754', tension: 0.1 } ] },
                    options: { responsive: true, maintainAspectRatio: false }
                });
            }
            if (UI.ratiosTrendChart) {
                if (state.charts.ratiosTrend) state.charts.ratiosTrend.destroy();
                state.charts.ratiosTrend = new Chart(UI.ratiosTrendChart, {
                    type: 'line',
                    data: { labels: labels, datasets: [ { label: t_page('trend_currentRatio'), data: snapshots.map(s => s.currentRatio), borderColor: '#ffc107', tension: 0.1, yAxisID: 'y' }, { label: t_page('trend_netProfitMargin'), data: snapshots.map(s => s.netProfitMargin), borderColor: '#6f42c1', tension: 0.1, yAxisID: 'yPercent' }, { label: t_page('trend_zscore'), data: snapshots.map(s => s.zScore), borderColor: '#dc3545', tension: 0.1, yAxisID: 'y' } ] },
                    options: { responsive: true, maintainAspectRatio: false, scales: { y: { type: 'linear', display: true, position: 'left', title: { display: true, text: 'Ratio Value' } }, yPercent: { type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false }, title: { display: true, text: 'Percentage %' }, ticks: { callback: (value) => (value * 100).toFixed(0) + '%' } } } }
                });
            }
        };
        
        // *** مُضاف: دالة تصدير PDF ***
        const initPdfExport = () => {
             if (UI.exportPdfBtn) {
                 UI.exportPdfBtn.addEventListener('click', () => {
                    if (!state.hasDataCurrent) { alert(t_page('noData')); return; }
                    console.log("Exporting dashboard to PDF...");
                    const element = document.getElementById('dashboard-content');
                    if (typeof html2pdf === 'function') {
                        const opt = {
                            margin: [0.5, 0.5, 0.5, 0.5], // [top, left, bottom, right] in inches
                            filename: 'Dashboard_Report.pdf',
                            image: { type: 'jpeg', quality: 0.98 },
                            html2canvas: { scale: 2, useCORS: true, logging: false, windowWidth: 1400 }, // Use wider window
                            jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape' } // Landscape orientation
                        };
                        html2pdf().from(element).set(opt).save();
                    } else {
                        console.error("html2pdf library is not loaded."); 
                        alert("PDF export failed. Library not loaded.");
                    }
                 });
             } else { console.warn("Export PDF button not found"); }
        };

        // --- Main Initialization Function (Adapted) ---
        const loadAndRouteDashboard = () => {
            if (!loadProcessedData()) {
                // If loading current data fails, show error and stop
                console.log("[DEBUG] No processed data found at all.");
                if (UI.loadingMessage) {
                     UI.loadingMessage.textContent = t_page('noData');
                     UI.loadingMessage.classList.remove('alert-warning');
                     UI.loadingMessage.classList.add('alert-danger');
                }
                 if (UI.singlePeriodView) UI.singlePeriodView.style.display = 'none';
                 if (UI.trendAnalysisView) UI.trendAnalysisView.style.display = 'none';
                 return; // Stop execution
            }

            // Calculate metrics for current period
            state.metricsCurrent = calculateDashboardMetrics(state.statementsCurrent);
            if (!state.metricsCurrent) {
                 console.error("[DEBUG] Failed to calculate metrics for current period.");
                 return; // Stop if metrics calculation fails
            }

            if (state.hasDataPrevious) {
                // --- Show Trend Analysis View ---
                state.metricsPrevious = calculateDashboardMetrics(state.statementsPrevious);
                if (state.metricsPrevious) {
                    console.log("[DEBUG] Previous data found. Showing Trend Analysis View.");
                    if (UI.loadingMessage) UI.loadingMessage.style.display = 'none';
                    if (UI.singlePeriodView) UI.singlePeriodView.style.display = 'none';
                    if (UI.trendAnalysisView) UI.trendAnalysisView.style.display = 'block'; // Use block
                    renderTrendKPIs(state.metricsCurrent, state.metricsPrevious);
                    renderTrendCharts(state.metricsCurrent, state.metricsPrevious);
                } else {
                    console.warn("[DEBUG] Previous data found but failed to calculate metrics. Falling back to Single Period View.");
                    state.hasDataPrevious = false; // Treat as if no previous data
                    if (UI.singlePeriodView) UI.singlePeriodView.style.display = 'block';
                    if (UI.trendAnalysisView) UI.trendAnalysisView.style.display = 'none';
                    renderGaugeKPIs(state.metricsCurrent);
                    renderMainCharts(state.metricsCurrent);
                    renderSummaryAndAlerts(state.metricsCurrent);
                }
            } else {
                // --- Show Single Period View (Gauges) ---
                console.log("[DEBUG] Only current data found. Showing Single Period View.");
                if (UI.loadingMessage) UI.loadingMessage.style.display = 'none';
                if (UI.trendAnalysisView) UI.trendAnalysisView.style.display = 'none';
                if (UI.singlePeriodView) UI.singlePeriodView.style.display = 'block';
                renderGaugeKPIs(state.metricsCurrent);
                renderMainCharts(state.metricsCurrent);
                renderSummaryAndAlerts(state.metricsCurrent);
            }
            
            if (typeof window.applyTranslations === 'function') {
                console.log("[DEBUG] Applying translations (dashboard-app.js)...");
                window.applyTranslations();
            } else {
                console.error("[!!! DEBUG !!!] applyTranslations function not found. Check main.js");
            }
            
            initPdfExport(); // Initialize PDF export button
        };
        
        // Simplified Init (bypasses library loading wait)
        console.log("[DEBUG] Bypassing library load wait. Proceeding with dashboard logic...");
        loadAndRouteDashboard();
        
        // Load libraries in background (for PDF export)
        loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js", () => { console.log("html2pdf loaded."); }, () => {});


    }, 100); // 100ms delay
    
    // Helper function to load scripts
    const loadScript = (src, onload, onerror) => {
        let script = document.querySelector(`script[src="${src}"]`);
        if (script) {
            if (script.dataset.loaded === 'true') { onload(); }
            else if (script.dataset.loaded === 'false') { onerror(); }
            else { 
                 script.addEventListener('load', onload);
                 script.addEventListener('error', onerror);
            }
            return;
        }
        script = document.createElement('script');
        script.src = src;
        script.async = true; 
        script.onload = () => { script.dataset.loaded = 'true'; onload(); };
        script.onerror = () => { script.dataset.loaded = 'false'; console.error(`Failed to load script: ${src}`); onerror(); };
        document.head.appendChild(script);
    };

});

