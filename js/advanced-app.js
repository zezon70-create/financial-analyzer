// js/advanced-app.js

window.pageTranslations = {
    ar: {
        pageTitle: "التحليلات المتقدمة — المحلل المالي",
        pageHeader: "التحليلات المتقدمة", // تم تعديل النص ليكون عاماً
        pageSubheader: "استخدم أدوات تحليلية متخصصة للحصول على رؤى أعمق حول أداء عملك.", // تم تعديل النص ليكون عاماً
                // Tab Names
        tabRatios: "النسب المالية",
        tabBreakeven: "تحليل التعادل",
        tabDupont: "تحليل دوبونت",
        // Ratios Pane (Original)
        summaryTitle: "الملخص الذكي",
        alertsTitle: "تنبيهات ومؤشرات خطر",
        thRatio: "النسبة",
        thValue: "القيمة",
        thComment: "تعليق تحليلي",
        liquidityRatios: "نسب السيولة",
        profitabilityRatios: "نسب الربحية",
        leverageRatios: "نسب الرفع المالي",
        efficiencyRatios: "نسب الكفاءة",
        currentRatio: "نسبة التداول",
        currentRatio_comment_high: "سيولة ممتازة. قدرة عالية على سداد الالتزامات قصيرة الأجل.",
        currentRatio_comment_good: "سيولة جيدة. الوضع آمن في المدى القصير.",
        currentRatio_comment_low: "مؤشر خطر. قد تواجه الشركة صعوبة في سداد ديونها قصيرة الأجل.",
        quickRatio: "نسبة السيولة السريعة",
        quickRatio_comment_good: "قدرة جيدة على تغطية الالتزامات العاجلة دون الاعتماد على المخزون.",
        quickRatio_comment_low: "مؤشر خطر. اعتماد كبير على بيع المخزون لتغطية الديون العاجلة.",
        netProfitMargin: "هامش صافي الربح",
        netProfitMargin_comment_high: "ربحية ممتازة. كفاءة عالية في تحويل الإيرادات إلى أرباح.",
        netProfitMargin_comment_avg: "الشركة تحقق أرباحًا ولكن يمكن تحسين الهامش.",
        netProfitMargin_comment_low: "الشركة تحقق خسائر. يجب مراجعة هيكل التكاليف والتسعير.",
        grossProfitMargin: "هامش الربح الإجمالي",
        grossProfitMargin_comment_high: "هامش قوي. تحكم ممتاز في تكلفة المبيعات.",
        grossProfitMargin_comment_low: "هامش ضعيف. يجب مراجعة تكلفة البضاعة المباعة أو استراتيجية التسعير.",
        roa: "العائد على الأصول (ROA)",
        roa_comment_high: "كفاءة عالية في استخدام الأصول لتوليد الأرباح.",
        roa_comment_low: "كفاءة منخفضة. الأصول لا تولد أرباحًا كافية.",
        roe: "العائد على حقوق الملكية (ROE)",
        roe_comment_high: "عائد ممتاز للمساهمين. الشركة تستخدم استثماراتهم بفعالية عالية.",
        roe_comment_low: "عائد ضعيف للمساهمين. يجب تحسين الربحية أو كفاءة رأس المال.",
        debtToEquity: "نسبة الدين إلى حقوق الملكية",
        debtToEquity_comment_low: "مستوى دين منخفض ومحافظ. تعتمد الشركة على التمويل الذاتي.",
        debtToEquity_comment_good: "مستوى دين معتدل ومتوازن.",
        debtToEquity_comment_high: "مستوى دين مرتفع. قد يشير إلى مخاطر مالية عالية.",
        debtToAssets: "نسبة الدين إلى الأصول",
        debtToAssets_comment_low: "جزء صغير من الأصول ممول بالديون. وضع آمن.",
        debtToAssets_comment_high: "جزء كبير من الأصول ممول بالديون. مخاطر مرتفعة.",
        assetTurnover: "معدل دوران الأصول",
        assetTurnover_comment_high: "كفاءة ممتازة في استخدام الأصول لتوليد المبيعات.",
        assetTurnover_comment_low: "كفاءة منخفضة. قد تكون هناك أصول عاطلة أو ضعف في المبيعات.",
        summary_ok: "الوضع المالي يبدو مستقرًا. الربحية والسيولة ضمن النطاقات المقبولة.",
        summary_risk: "توجد بعض مؤشرات الخطر. الربحية أو السيولة قد تحتاج إلى اهتمام فوري.",
        alert_liquidity_risk: "🔴 خطر سيولة: نسبة التداول أقل من 1.",
        alert_leverage_risk: "🟡 تنبيه: نسبة الدين إلى حقوق الملكية مرتفعة.",
        alert_profit_risk: "🔴 خطر ربحية: الشركة تحقق صافي خسارة.",
        alert_ok: "🟢 لا توجد مؤشرات خطر حرجة بناءً على النسب الأساسية.",

        // Breakeven Pane (NEW)
        beInputTitle: "مدخلات الحساب",
        labelFixedCosts: "إجمالي التكاليف الثابتة",
        labelVariableCost: "التكلفة المتغيرة للوحدة",
        labelSellingPrice: "سعر بيع الوحدة",
        btnCalculate: "احسب",
        beResultsTitle: "النتائج",
        bepUnits: "نقطة التعادل (بالوحدات)",
        bepValue: "نقطة التعادل (بالقيمة)",
        beChartTitle: "رسم بياني لنقطة التعادل",
        errorPrice: "يجب أن يكون سعر البيع أعلى من التكلفة المتغيرة.",

        // DuPont Pane (Placeholder)
        dupontWipTitle: "تحليل دوبونت - قيد التطوير",
        dupontWipDesc: "هذه الميزة ستكون متاحة قريباً لتحليل العائد على حقوق الملكية."
    },
    en: {
        pageTitle: "Advanced Analytics — Financial Analyzer",
        pageHeader: "Advanced Analytics", // Made generic
        pageSubheader: "Use specialized analytical tools to gain deeper insights into your business performance.", // Made generic

        // Tab Names
        tabRatios: "Financial Ratios",
        tabBreakeven: "Break-even Analysis",
        tabDupont: "DuPont Analysis",

        // Ratios Pane (Original)
        summaryTitle: "Smart Summary",
        alertsTitle: "Alerts & Risk Indicators",
        thRatio: "Ratio",
        thValue: "Value",
        thComment: "Analytical Commentary",
        liquidityRatios: "Liquidity Ratios",
        profitabilityRatios: "Profitability Ratios",
        leverageRatios: "Leverage Ratios",
        efficiencyRatios: "Efficiency Ratios",
        currentRatio: "Current Ratio",
        currentRatio_comment_high: "Excellent liquidity. High ability to meet short-term obligations.",
        currentRatio_comment_good: "Good liquidity. The situation is safe in the short term.",
        currentRatio_comment_low: "Risk indicator. The company may face difficulty paying its short-term debts.",
        quickRatio: "Quick Ratio (Acid-Test)",
        quickRatio_comment_good: "Good ability to cover immediate liabilities without relying on inventory.",
        quickRatio_comment_low: "Risk indicator. Heavy reliance on selling inventory to cover urgent debts.",
        netProfitMargin: "Net Profit Margin",
        netProfitMargin_comment_high: "Excellent profitability. High efficiency in converting revenue into profit.",
        netProfitMargin_comment_avg: "The company is profitable, but the margin can be improved.",
        netProfitMargin_comment_low: "The company is incurring losses. Cost structure and pricing must be reviewed.",
        grossProfitMargin: "Gross Profit Margin",
        grossProfitMargin_comment_high: "Strong margin. Excellent control over cost of sales.",
        grossProfitMargin_comment_low: "Weak margin. Cost of goods sold or pricing strategy must be reviewed.",
        roa: "Return on Assets (ROA)",
        roa_comment_high: "High efficiency in using assets to generate profits.",
        roa_comment_low: "Low efficiency. Assets are not generating enough profit.",
        roe: "Return on Equity (ROE)",
        roe_comment_high: "Excellent return for shareholders. The company is using their investment very effectively.",
        roe_comment_low: "Weak return for shareholders. Profitability or capital efficiency needs improvement.",
        debtToEquity: "Debt-to-Equity Ratio",
        debtToEquity_comment_low: "Low and conservative debt level. The company relies on self-financing.",
        debtToEquity_comment_good: "Moderate and balanced debt level.",
        debtToEquity_comment_high: "High debt level. May indicate high financial risk.",
        debtToAssets: "Debt-to-Assets Ratio",
        debtToAssets_comment_low: "A small portion of assets is financed by debt. Safe position.",
        debtToAssets_comment_high: "A large portion of assets is financed by debt. High risk.",
        assetTurnover: "Asset Turnover Ratio",
        assetTurnover_comment_high: "Excellent efficiency in using assets to generate sales.",
        assetTurnover_comment_low: "Low efficiency. There might be idle assets or weak sales.",
        summary_ok: "The financial position appears stable. Profitability and liquidity are within acceptable ranges.",
        summary_risk: "Some risk indicators are present. Profitability or liquidity may require immediate attention.",
        alert_liquidity_risk: "🔴 Liquidity Risk: Current ratio is less than 1.",
        alert_leverage_risk: "🟡 Warning: Debt-to-Equity ratio is high.",
        alert_profit_risk: "🔴 Profitability Risk: The company is recording a net loss.",
        alert_ok: "🟢 No critical risk indicators based on key ratios.",
        
        // Breakeven Pane (NEW)
        beInputTitle: "Calculation Inputs",
        labelFixedCosts: "Total Fixed Costs",
        labelVariableCost: "Variable Cost Per Unit",
        labelSellingPrice: "Selling Price Per Unit",
        btnCalculate: "Calculate",
        beResultsTitle: "Results",
        bepUnits: "Break-even Point (Units)",
        bepValue: "Break-even Point (Value)",
        beChartTitle: "Break-even Point Chart",
        errorPrice: "Selling price must be higher than variable cost.",
        
        // DuPont Pane (Placeholder)
        dupontWipTitle: "DuPont Analysis - Work in Progress",
        dupontWipDesc: "This feature will be available soon to analyze Return on Equity."
    }
};

document.addEventListener('DOMContentLoaded', () => {

    const state = { 
        financials: {}, 
        ratios: {},
        breakevenChart: null // Moved chart state here
    };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || key;

    const UI = {
        // Ratio UI elements
        smartSummary: document.getElementById('smartSummary'),
        alertsArea: document.getElementById('alertsArea'),
        // Breakeven UI elements
        fixedCosts: document.getElementById('fixedCosts'),
        variableCost: document.getElementById('variableCost'),
        sellingPrice: document.getElementById('sellingPrice'),
        calculateBreakeven: document.getElementById('calculateBreakeven'),
        breakevenResults: document.getElementById('breakevenResults'),
        bepUnitsResult: document.getElementById('bepUnitsResult'),
        bepValueResult: document.getElementById('bepValueResult'),
        breakevenChartCanvas: document.getElementById('breakevenChart'),
    };
    
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;

    // ==============================================
    // === FINANCIAL RATIO FUNCTIONS (Original) ===
    // ==============================================

    const calculateFinancials = () => {
        const trialData = JSON.parse(localStorage.getItem('trialData') || '[]');
        // Fallback: If trialData is empty, try statementData (more complex mapping needed here potentially)
        // For now, we assume trialData is the primary source for ratios.
        if (trialData.length === 0) {
            console.warn("No trialData found for ratio calculation.");
            // You might want to display a message to the user here.
            return; // Stop if no data
        }

        const f = {
            assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0,
            currentAssets: 0, inventory: 0, currentLiabilities: 0
        };
        trialData.forEach(row => {
            const value = (parseFloat(row.Debit) || 0) - (parseFloat(row.Credit) || 0);
            const mainType = row.MainType || '';
            const subType = row.SubType || '';

            if (mainType.includes('الأصول') || mainType.includes('Assets')) {
                f.assets += value;
                if (subType.includes('متداول') || subType.includes('Current')) {
                    f.currentAssets += value;
                    if ((row.Account || '').includes('المخزون') || (row.Account || '').toLowerCase().includes('inventory')) f.inventory += value; // Better check
                }
            } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) {
                f.liabilities -= value; // Liabilities have credit nature, so subtract the value
                if (subType.includes('متداول') || subType.includes('Current')) f.currentLiabilities -= value;
            } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) {
                f.equity -= value; // Equity has credit nature
            } else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) {
                if (subType.includes('الإيرادات') || subType.includes('Revenue')) f.revenue -= value; // Revenue has credit nature
                else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) f.cogs += value; // COGS is an expense (debit)
                else f.expenses += value; // Other expenses (debit)
            }
        });
        f.grossProfit = f.revenue - f.cogs;
        f.netProfit = f.grossProfit - f.expenses;
        state.financials = f;
        console.log("Calculated Financials:", f); // For debugging
    };

    const calculateAllRatios = () => {
        const f = state.financials;
        if (!f || Object.keys(f).length === 0) {
             console.warn("Financials not calculated, skipping ratio calculation.");
             state.ratios = {}; // Reset ratios
             return; // Don't calculate if financials aren't ready
        }
        state.ratios = {
            currentRatio: f.currentLiabilities > 0 ? f.currentAssets / f.currentLiabilities : Infinity,
            quickRatio: f.currentLiabilities > 0 ? (f.currentAssets - f.inventory) / f.currentLiabilities : Infinity,
            grossProfitMargin: f.revenue > 0 ? f.grossProfit / f.revenue : 0,
            netProfitMargin: f.revenue > 0 ? f.netProfit / f.revenue : 0,
            roa: f.assets > 0 ? f.netProfit / f.assets : 0,
            roe: f.equity > 0 ? f.netProfit / f.equity : 0,
            debtToAssets: f.assets > 0 ? f.liabilities / f.assets : Infinity,
            debtToEquity: f.equity > 0 ? f.liabilities / f.equity : Infinity,
            assetTurnover: f.assets > 0 ? f.revenue / f.assets : 0,
        };
        console.log("Calculated Ratios:", state.ratios); // For debugging
    };

    const getRatioComment = (key, value) => {
        if (!isFinite(value)) return "N/A";
        // (Original comment logic remains unchanged)
        if (key === 'currentRatio') {
            if (value >= 2) return t_page('currentRatio_comment_high');
            if (value >= 1) return t_page('currentRatio_comment_good');
            return t_page('currentRatio_comment_low');
        }
        if (key === 'quickRatio') {
            if (value >= 1) return t_page('quickRatio_comment_good');
            return t_page('quickRatio_comment_low');
        }
        if (key === 'netProfitMargin') {
            if (value >= 0.15) return t_page('netProfitMargin_comment_high');
            if (value > 0) return t_page('netProfitMargin_comment_avg');
            return t_page('netProfitMargin_comment_low');
        }
        if (key === 'grossProfitMargin') {
            return value >= 0.4 ? t_page('grossProfitMargin_comment_high') : t_page('grossProfitMargin_comment_low');
        }
        if (key === 'roa') {
            return value >= 0.05 ? t_page('roa_comment_high') : t_page('roa_comment_low');
        }
        if (key === 'roe') {
            return value >= 0.15 ? t_page('roe_comment_high') : t_page('roe_comment_low');
        }
        if (key === 'debtToEquity') {
            if (value < 0.5) return t_page('debtToEquity_comment_low');
            if (value <= 1.5) return t_page('debtToEquity_comment_good');
            return t_page('debtToEquity_comment_high');
        }
        if (key === 'debtToAssets') {
            return value < 0.4 ? t_page('debtToAssets_comment_low') : t_page('debtToAssets_comment_high');
        }
        if (key === 'assetTurnover') {
            return value >= 1 ? t_page('assetTurnover_comment_high') : t_page('assetTurnover_comment_low');
        }
        return "";
    };

    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => {
        const container = document.getElementById(divId);
        if (!container) return; // Exit if container not found
        
        // Check if ratios have been calculated
        if (Object.keys(state.ratios).length === 0) {
             container.innerHTML = `
                <h5 class="mb-3">${t_page(categoryTitleKey)}</h5>
                <p class="text-muted">${lang === 'ar' ? 'لا توجد بيانات كافية لحساب هذه النسب. يرجى إدخال ميزان المراجعة أولاً.' : 'Insufficient data to calculate these ratios. Please enter trial balance data first.'}</p>
             `;
             return;
        }

        let tableHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5>
            <div class="table-responsive">
            <table class="table table-sm table-striped">
                <thead><tr><th>${t_page('thRatio')}</th><th>${t_page('thValue')}</th><th>${t_page('thComment')}</th></tr></thead>
                <tbody>`;
        ratioKeys.forEach(key => {
            const value = state.ratios[key];
            const formattedValue = isFinite(value)
                ? (key.includes('Margin') || key.includes('roa') || key.includes('roe') ? `${(value * 100).toFixed(1)}%` : value.toFixed(2))
                : "N/A";
            const comment = getRatioComment(key, value);
            tableHTML += `<tr>
                <td>${t_page(key)}</td>
                <td><strong>${formattedValue}</strong></td>
                <td class="text-muted small">${comment}</td>
            </tr>`;
        });
        container.innerHTML = tableHTML + `</tbody></table></div>`;
    };

    const renderSidebar = () => {
         // Check if ratios have been calculated
        if (Object.keys(state.ratios).length === 0) {
            UI.smartSummary.textContent = lang === 'ar' ? 'يرجى إدخال بيانات لحساب الملخص.' : 'Please enter data to calculate summary.';
            UI.alertsArea.innerHTML = `<div>${lang === 'ar' ? 'لا توجد بيانات كافية للتنبيهات.' : 'Insufficient data for alerts.'}</div>`;
            return;
        }

        const { netProfitMargin, currentRatio, debtToEquity } = state.ratios;
        UI.smartSummary.textContent = netProfitMargin > 0 && currentRatio > 1.5 ? t_page('summary_ok') : t_page('summary_risk');

        const alerts = [];
        if (currentRatio < 1 && isFinite(currentRatio)) alerts.push(t_page('alert_liquidity_risk'));
        if (debtToEquity > 2 && isFinite(debtToEquity)) alerts.push(t_page('alert_leverage_risk'));
        if (netProfitMargin < 0 && isFinite(netProfitMargin)) alerts.push(t_page('alert_profit_risk'));
        UI.alertsArea.innerHTML = alerts.length > 0 ? alerts.map(alert => `<div>${alert}</div>`).join('') : `<div>${t_page('alert_ok')}</div>`;
    };

    const runAnalysis = () => {
        calculateFinancials();
        calculateAllRatios();
        renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
        renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
        renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
        renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);
        renderSidebar();
    };

    // ==============================================
    // === BREAKEVEN ANALYSIS FUNCTIONS (NEW) ===
    // ==============================================

    const calculateAndDisplayBreakeven = () => {
        const fixed = toNum(UI.fixedCosts.value);
        const variable = toNum(UI.variableCost.value);
        const price = toNum(UI.sellingPrice.value);

        if (price <= 0 || variable < 0 || fixed < 0) {
             alert(lang === 'ar' ? 'الرجاء إدخال قيم موجبة.' : 'Please enter positive values.');
             return;
        }

        if (price <= variable) {
            alert(t_page('errorPrice'));
            return;
        }

        const contributionMargin = price - variable;
        const bepUnits = fixed / contributionMargin;
        const bepValue = bepUnits * price;

        UI.bepUnitsResult.textContent = Math.ceil(bepUnits).toLocaleString();
        UI.bepValueResult.textContent = bepValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        UI.breakevenResults.style.display = 'block';

        renderBreakevenChart(fixed, variable, price, bepUnits);
    };

    const renderBreakevenChart = (fixed, variable, price, bepUnits) => {
        if (state.breakevenChart) {
            state.breakevenChart.destroy();
        }

        // Adjust chart range based on BEP units
        let maxUnits = 100; // Default max units if BEP is very low or zero
        if (bepUnits > 0 && isFinite(bepUnits)) {
             maxUnits = Math.max(100, Math.ceil(bepUnits * 2 / 10) * 10); // Ensure maxUnits is reasonable and a multiple of 10
        } else if (fixed === 0) {
             maxUnits = 100; // If no fixed costs, BEP is 0, show a standard range
        }
        
        const step = maxUnits / 10;
        const labels = Array.from({ length: 11 }, (_, i) => Math.round(step * i)); // Rounded labels
        
        const fixedCostsData = labels.map(() => fixed);
        const totalCostsData = labels.map(unit => fixed + (variable * unit));
        const revenueData = labels.map(unit => price * unit);

        const ctx = UI.breakevenChartCanvas.getContext('2d');
        state.breakevenChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: lang === 'ar' ? 'الإيرادات' : 'Revenue',
                        data: revenueData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        fill: false,
                        tension: 0.1
                    },
                    {
                        label: lang === 'ar' ? 'إجمالي التكاليف' : 'Total Costs',
                        data: totalCostsData,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        fill: false,
                        tension: 0.1
                    },
                    {
                        label: lang === 'ar' ? 'التكاليف الثابتة' : 'Fixed Costs',
                        data: fixedCostsData,
                        borderColor: 'rgba(255, 159, 64, 1)',
                        borderDash: [5, 5],
                        fill: false,
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    intersect: false,
                    mode: 'index',
                },
                scales: {
                    x: {
                        title: { display: true, text: lang === 'ar' ? 'الوحدات المباعة' : 'Units Sold' }
                    },
                    y: {
                        title: { display: true, text: lang === 'ar' ? 'القيمة' : 'Value' },
                        beginAtZero: true
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
                            }
                        }
                    },
                    // Add annotation for BEP point maybe later
                }
            }
        });
    };
    
    // ==============================================
    // === INITIALIZATION ===
    // ==============================================

    const init = () => {
        // Initialize the default active tab (Ratios)
        runAnalysis();

        // Add event listener for Breakeven calculation
        if (UI.calculateBreakeven) { // Check if element exists
             UI.calculateBreakeven.addEventListener('click', calculateAndDisplayBreakeven);
        }

        // Listen for tab changes if needed (e.g., to refresh ratio data if underlying data changed)
        const ratiosTab = document.getElementById('ratios-tab');
        if (ratiosTab) {
            ratiosTab.addEventListener('shown.bs.tab', () => {
                console.log("Ratios tab shown");
                // Optionally re-run analysis if data might have changed elsewhere
                // runAnalysis(); 
            });
        }
        const breakevenTab = document.getElementById('breakeven-tab');
        if (breakevenTab) {
            breakevenTab.addEventListener('shown.bs.tab', () => {
                console.log("Breakeven tab shown");
                // If chart needs redraw on show (usually not needed with Chart.js 4)
                // if(state.breakevenChart) state.breakevenChart.resize();
            });
        }
    };

    init();
});


