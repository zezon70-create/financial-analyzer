// js/advanced-app.js

window.pageTranslations = {
    ar: {
        pageTitle: "التحليلات المتقدمة — المحلل المالي",
        pageHeader: "التحليلات المتقدمة",
        pageSubheader: "استخدم أدوات تحليلية متخصصة للحصول على رؤى أعمق حول أداء عملك.",
        tabRatios: "النسب المالية",
        tabBreakeven: "تحليل التعادل",
        tabDupont: "تحليل دوبونت",
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
        noDataForRatios: "لا توجد بيانات كافية لحساب النسب. يرجى إدخال ميزان المراجعة أولاً.",
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
        errorPositiveValues: "الرجاء إدخال قيم موجبة.",
        dupontTitle: "تحليل دوبونت للعائد على حقوق الملكية",
        dupontDesc: "يساعد هذا التحليل على تفكيك العائد على حقوق الملكية (ROE) إلى مكوناته الرئيسية: كفاءة التشغيل (هامش صافي الربح)، كفاءة استخدام الأصول (دوران الأصول)، والرفع المالي (مضاعف حقوق الملكية).",
        dupontEquation: "معادلة دوبونت:",
        dupontCompNPM: "هامش صافي الربح",
        dupontCompAT: "دوران الأصول",
        dupontCompEM: "مضاعف حقوق الملكية",
        dupontCompROE: "العائد على حقوق الملكية",
        dupontDataWarning: "لا توجد بيانات كافية (من ميزان المراجعة) لإجراء تحليل دوبونت.",
        dupontInterpretationHighROE: "🟢 العائد المرتفع على حقوق الملكية مدفوع بشكل أساسي بـ:",
        dupontInterpretationLowROE: "🟡 العائد المنخفض على حقوق الملكية قد يكون بسبب:",
        dupontFactorProfitability: "ربحية تشغيلية قوية (هامش صافي ربح مرتفع).",
        dupontFactorEfficiency: "كفاءة عالية في استخدام الأصول (دوران أصول مرتفع).",
        dupontFactorLeverage: "استخدام الرفع المالي (مضاعف حقوق ملكية مرتفع - قد يزيد المخاطر).",
        dupontFactorLowProfitability: "ربحية تشغيلية ضعيفة (هامش صافي ربح منخفض).",
        dupontFactorLowEfficiency: "كفاءة منخفضة في استخدام الأصول (دوران أصول منخفض).",
        dupontFactorLowLeverage: "اعتماد منخفض على الديون (مضاعف حقوق ملكية منخفض - أكثر أمانًا ولكن قد يحد من العائد).",
        // Additional keys for BE chart labels if needed
        revenue: 'الإيرادات',
        totalCosts: 'إجمالي التكاليف',
        fixedCosts: 'التكاليف الثابتة',
        unitsSold: 'الوحدات المباعة',
        value: 'القيمة'
    },
    en: {
        pageTitle: "Advanced Analytics — Financial Analyzer",
        pageHeader: "Advanced Analytics", 
        pageSubheader: "Use specialized analytical tools to gain deeper insights into your business performance.", 
        tabRatios: "Financial Ratios",
        tabBreakeven: "Break-even Analysis",
        tabDupont: "DuPont Analysis",
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
        noDataForRatios: "Insufficient data to calculate ratios. Please enter trial balance data first.",
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
        errorPositiveValues: "Please enter positive values.",
        dupontTitle: "DuPont Analysis for ROE",
        dupontDesc: "This analysis breaks down Return on Equity (ROE) into its key components: operating efficiency (Net Profit Margin), asset use efficiency (Asset Turnover), and financial leverage (Equity Multiplier).",
        dupontEquation: "DuPont Equation:",
        dupontCompNPM: "Net Profit Margin",
        dupontCompAT: "Asset Turnover",
        dupontCompEM: "Equity Multiplier",
        dupontCompROE: "Return on Equity",
        dupontDataWarning: "Insufficient data (from Trial Balance) available to perform DuPont analysis.",
        dupontInterpretationHighROE: "🟢 High ROE is primarily driven by:",
        dupontInterpretationLowROE: "🟡 Low ROE may be due to:",
        dupontFactorProfitability: "Strong operating profitability (high Net Profit Margin).",
        dupontFactorEfficiency: "High asset efficiency (high Asset Turnover).",
        dupontFactorLeverage: "Use of financial leverage (high Equity Multiplier - potentially risky).",
        dupontFactorLowProfitability: "Weak operating profitability (low Net Profit Margin).",
        dupontFactorLowEfficiency: "Low asset efficiency (low Asset Turnover).",
        dupontFactorLowLeverage: "Low reliance on debt (low Equity Multiplier - safer but may limit returns).",
        // Additional keys for BE chart labels if needed
        revenue: 'Revenue',
        totalCosts: 'Total Costs',
        fixedCosts: 'Fixed Costs',
        unitsSold: 'Units Sold',
        value: 'Value'
    }
};

document.addEventListener('DOMContentLoaded', () => {

    const state = { 
        financials: {}, 
        ratios: {},
        breakevenChart: null 
    };
    const lang = localStorage.getItem('lang') || 'ar';
    // Ensure t_page handles potential missing keys gracefully
    const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`; // Show key if missing

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
        // DuPont UI elements
        dupontResultsContainer: document.getElementById('dupontResultsContainer'),
        dupontDataWarning: document.getElementById('dupontDataWarning'),
        dupontFormulaDisplay: document.getElementById('dupontFormulaDisplay'),
        dupontROE: document.getElementById('dupontROE'),
        dupontNPM: document.getElementById('dupontNPM'),
        dupontAT: document.getElementById('dupontAT'),
        dupontEM: document.getElementById('dupontEM'),
        dupontValueNPM: document.getElementById('dupontValueNPM'),
        dupontValueAT: document.getElementById('dupontValueAT'),
        dupontValueEM: document.getElementById('dupontValueEM'),
        dupontValueROE: document.getElementById('dupontValueROE'),
        dupontInterpretation: document.getElementById('dupontInterpretation')
    };
    
    // Helper functions
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
    const formatPercent = (value) => isFinite(value) ? `${(value * 100).toFixed(1)}%` : "N/A";
    const formatRatio = (value) => isFinite(value) ? value.toFixed(2) : "N/A";

    // ==============================================
    // === FINANCIAL RATIO FUNCTIONS (Original + Refined) ===
    // ==============================================

    const calculateFinancials = () => {
        state.financials = {}; // Reset financials
        const trialData = JSON.parse(localStorage.getItem('trialData') || '[]');
        // Check for valid data (more than just an empty array or array with one empty row)
        if (trialData.length === 0 || (trialData.length === 1 && !trialData[0].Account && !toNum(trialData[0].Debit) && !toNum(trialData[0].Credit))) {
             console.warn("No valid trialData found for ratio calculation.");
             return false; // Indicate failure
        }

        const f = {
            assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0, netProfit: 0, grossProfit: 0,
            currentAssets: 0, inventory: 0, currentLiabilities: 0
        };
        trialData.forEach(row => {
            const value = (toNum(row.Debit)) - (toNum(row.Credit));
            const mainType = row.MainType || '';
            const subType = row.SubType || '';
            const accountName = (row.Account || '').toLowerCase();

            if (mainType.includes('الأصول') || mainType.includes('Assets')) {
                f.assets += value;
                if (subType.includes('متداول') || subType.includes('Current')) {
                    f.currentAssets += value;
                    if (subType.includes('المخزون') || subType.includes('Inventory') || accountName.includes('inventory') || accountName.includes('مخزون')) {
                         f.inventory += value;
                    }
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
        
        // Ensure values are numbers, default to 0
        Object.keys(f).forEach(key => f[key] = f[key] || 0);

        f.grossProfit = f.revenue - f.cogs;
        f.netProfit = f.grossProfit - f.expenses;
        
        // Balance Sheet Check (A = L + E + Current Period Profit/Loss)
        const balanceCheck = f.assets - (f.liabilities + f.equity + f.netProfit);
        if (Math.abs(balanceCheck) > 1) { // Allow for small rounding diffs
             console.warn(`Balance sheet check failed: Assets (${f.assets.toFixed(2)}) != L+E+NP (${(f.liabilities + f.equity + f.netProfit).toFixed(2)}). Difference: ${balanceCheck.toFixed(2)}`);
             // Maybe display a warning to the user if the difference is significant
        }

        state.financials = f;
        console.log("Calculated Financials:", f);
        return true; // Indicate success
    };

    const calculateAllRatios = () => {
        state.ratios = {}; // Reset ratios
        const f = state.financials;
        if (!f || Object.keys(f).length === 0) {
             console.warn("Financials not calculated, skipping ratio calculation.");
             return false; // Indicate failure
        }
        
        // Calculate Equity Multiplier (Leverage for DuPont) - Handle zero or negative equity
        const equityMultiplier = (f.equity !== 0 && f.assets !== 0) ? f.assets / f.equity : Infinity; 
        
        // Calculate standard ROE - Handle zero or negative equity
        const roeStandard = (f.equity !== 0) ? f.netProfit / f.equity : Infinity; 

        state.ratios = {
            currentRatio: f.currentLiabilities !== 0 ? f.currentAssets / f.currentLiabilities : Infinity,
            quickRatio: f.currentLiabilities !== 0 ? (f.currentAssets - f.inventory) / f.currentLiabilities : Infinity,
            grossProfitMargin: f.revenue !== 0 ? f.grossProfit / f.revenue : 0,
            netProfitMargin: f.revenue !== 0 ? f.netProfit / f.revenue : 0,
            roa: f.assets !== 0 ? f.netProfit / f.assets : 0,
            roe: roeStandard, // Standard ROE calculation
            debtToAssets: f.assets !== 0 ? f.liabilities / f.assets : Infinity,
            debtToEquity: f.equity !== 0 ? f.liabilities / f.equity : Infinity,
            assetTurnover: f.assets !== 0 ? f.revenue / f.assets : 0,
            equityMultiplier: equityMultiplier // Assets / Equity
        };
        console.log("Calculated Ratios (incl. EM):", state.ratios);
        return true; // Indicate success
    };

    const getRatioComment = (key, value) => {
        if (!isFinite(value)) return "N/A";
        // (Original comment logic remains unchanged)
        if (key === 'currentRatio') { if (value >= 2) return t_page('currentRatio_comment_high'); if (value >= 1) return t_page('currentRatio_comment_good'); return t_page('currentRatio_comment_low'); }
        if (key === 'quickRatio') { if (value >= 1) return t_page('quickRatio_comment_good'); return t_page('quickRatio_comment_low'); }
        if (key === 'netProfitMargin') { if (value >= 0.15) return t_page('netProfitMargin_comment_high'); if (value > 0) return t_page('netProfitMargin_comment_avg'); return t_page('netProfitMargin_comment_low'); }
        if (key === 'grossProfitMargin') { return value >= 0.4 ? t_page('grossProfitMargin_comment_high') : t_page('grossProfitMargin_comment_low'); }
        if (key === 'roa') { return value >= 0.05 ? t_page('roa_comment_high') : t_page('roa_comment_low'); }
        if (key === 'roe') { return value >= 0.15 ? t_page('roe_comment_high') : t_page('roe_comment_low'); }
        if (key === 'debtToEquity') { if (value < 0.5) return t_page('debtToEquity_comment_low'); if (value <= 1.5) return t_page('debtToEquity_comment_good'); return t_page('debtToEquity_comment_high'); }
        if (key === 'debtToAssets') { return value < 0.4 ? t_page('debtToAssets_comment_low') : t_page('debtToAssets_comment_high'); }
        if (key === 'assetTurnover') { return value >= 1 ? t_page('assetTurnover_comment_high') : t_page('assetTurnover_comment_low'); }
        return "";
    };

    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => {
        const container = document.getElementById(divId);
        if (!container) { console.error(`Element not found: ${divId}`); return; }
        
        // Use state.hasRatioData flag set by runAnalysis
        if (!state.hasRatioData) {
             container.innerHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <p class="text-muted">${t_page('noDataForRatios')}</p>`;
             return;
        }

        let tableHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5>
            <div class="table-responsive">
            <table class="table table-sm table-striped">
                <thead><tr><th>${t_page('thRatio')}</th><th>${t_page('thValue')}</th><th>${t_page('thComment')}</th></tr></thead>
                <tbody>`;
        ratioKeys.forEach(key => {
            const value = state.ratios[key];
            // Refined formatting logic
            const isPercentage = key.includes('Margin') || key.includes('roa') || key.includes('roe');
            const formattedValue = isPercentage ? formatPercent(value) : formatRatio(value);
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
        // Use state.hasRatioData flag
        if (!state.hasRatioData) {
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
        state.hasRatioData = false; // Reset flag
        if (!calculateFinancials()) {
             // Clear displays if financials calculation failed
             renderRatioCategory('liquidityRatios', 'liquidityRatios', []);
             renderRatioCategory('profitabilityRatios', 'profitabilityRatios', []);
             renderRatioCategory('leverageRatios', 'leverageRatios', []);
             renderRatioCategory('efficiencyRatios', 'efficiencyRatios', []);
             renderSidebar(); 
             return false; 
        }
        if (!calculateAllRatios()) {
             // Clear displays if ratio calculation failed
             renderRatioCategory('liquidityRatios', 'liquidityRatios', []);
             renderRatioCategory('profitabilityRatios', 'profitabilityRatios', []);
             renderRatioCategory('leverageRatios', 'leverageRatios', []);
             renderRatioCategory('efficiencyRatios', 'efficiencyRatios', []);
             renderSidebar();
             return false; 
        }

        // If both succeeded, set flag and render
        state.hasRatioData = true; 
        renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
        renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
        renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
        renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);
        renderSidebar();
        return true; // Indicate success
    };

    // ==============================================
    // === BREAKEVEN ANALYSIS FUNCTIONS (NEW) ===
    // ==============================================

    const calculateAndDisplayBreakeven = () => {
        const fixed = toNum(UI.fixedCosts.value);
        const variable = toNum(UI.variableCost.value);
        const price = toNum(UI.sellingPrice.value);

        if (price <= 0 || variable < 0 || fixed < 0) {
             alert(t_page('errorPositiveValues'));
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
        if (!UI.breakevenChartCanvas) return; // Exit if canvas not found
        if (state.breakevenChart) {
            state.breakevenChart.destroy();
        }
        let maxUnits = 100; 
        if (bepUnits > 0 && isFinite(bepUnits)) {
             maxUnits = Math.max(100, Math.ceil(bepUnits * 2 / 10) * 10);
        } else if (fixed === 0 && price > variable) { // If BEP is 0 because no fixed costs
            maxUnits = 100; // Show a default range anyway
        } else if (price <= variable) { // Should not happen due to check, but safety
            maxUnits = 100; 
        }
        
        const step = maxUnits / 10;
        const labels = Array.from({ length: 11 }, (_, i) => Math.round(step * i)); 
        const fixedCostsData = labels.map(() => fixed);
        const totalCostsData = labels.map(unit => fixed + (variable * unit));
        const revenueData = labels.map(unit => price * unit);

        const ctx = UI.breakevenChartCanvas.getContext('2d');
        state.breakevenChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    { label: t_page('revenue'), data: revenueData, borderColor: 'rgba(75, 192, 192, 1)', fill: false, tension: 0.1 },
                    { label: t_page('totalCosts'), data: totalCostsData, borderColor: 'rgba(255, 99, 132, 1)', fill: false, tension: 0.1 },
                    { label: t_page('fixedCosts'), data: fixedCostsData, borderColor: 'rgba(255, 159, 64, 1)', borderDash: [5, 5], fill: false, tension: 0.1 }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false, interaction: { intersect: false, mode: 'index', },
                scales: { x: { title: { display: true, text: t_page('unitsSold') } }, y: { title: { display: true, text: t_page('value') }, beginAtZero: true } },
                plugins: { tooltip: { callbacks: { label: function(context) { return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`; } } } }
            }
        });
    };
    
    // ==============================================
    // === DUPONT ANALYSIS FUNCTIONS (NEW + Refined) ===
    // ==============================================
    
    const calculateAndDisplayDupont = () => {
         // Use state.hasRatioData flag set by runAnalysis
         if (!state.hasRatioData) {
             if(UI.dupontDataWarning) {
                 UI.dupontDataWarning.textContent = t_page('dupontDataWarning');
                 UI.dupontDataWarning.style.display = 'block';
             }
             if(UI.dupontFormulaDisplay) UI.dupontFormulaDisplay.style.display = 'none';
             if(UI.dupontInterpretation) UI.dupontInterpretation.innerHTML = '';
             // Ensure cards show N/A
             if(UI.dupontValueNPM) UI.dupontValueNPM.textContent = 'N/A';
             if(UI.dupontValueAT) UI.dupontValueAT.textContent = 'N/A';
             if(UI.dupontValueEM) UI.dupontValueEM.textContent = 'N/A';
             if(UI.dupontValueROE) UI.dupontValueROE.textContent = 'N/A';
             return; // Stop execution
         }

        // --- Data is available ---
        if(UI.dupontDataWarning) UI.dupontDataWarning.style.display = 'none';
        if(UI.dupontFormulaDisplay) UI.dupontFormulaDisplay.style.display = 'block';

        const npm = state.ratios.netProfitMargin;
        const at = state.ratios.assetTurnover;
        const em = state.ratios.equityMultiplier; 
        
        // Calculate ROE using DuPont components 
        const dupontROE = (isFinite(npm) && isFinite(at) && isFinite(em)) ? npm * at * em : Infinity;

        // Display formula components
        if(UI.dupontROE) UI.dupontROE.textContent = formatPercent(dupontROE);
        if(UI.dupontNPM) UI.dupontNPM.textContent = formatPercent(npm);
        if(UI.dupontAT) UI.dupontAT.textContent = formatRatio(at);
        if(UI.dupontEM) UI.dupontEM.textContent = formatRatio(em);

        // Display individual component values in cards
        if(UI.dupontValueNPM) UI.dupontValueNPM.textContent = formatPercent(npm);
        if(UI.dupontValueAT) UI.dupontValueAT.textContent = formatRatio(at);
        if(UI.dupontValueEM) UI.dupontValueEM.textContent = formatRatio(em);
        if(UI.dupontValueROE) UI.dupontValueROE.textContent = formatPercent(dupontROE); // Use DuPont calculated ROE

        // Basic Interpretation - only if dupontROE is a valid number
        let interpretation = '';
        if (isFinite(dupontROE)) {
            const highROE = dupontROE >= 0.15; 
            interpretation += highROE ? `<p>${t_page('dupontInterpretationHighROE')}</p><ul>` : `<p>${t_page('dupontInterpretationLowROE')}</p><ul>`;
            
            // Check individual factors only if they are valid numbers
            if (isFinite(npm)) {
                if (npm >= 0.10) interpretation += `<li>${t_page('dupontFactorProfitability')}</li>`;
                else if (npm < 0.05) interpretation += `<li>${t_page('dupontFactorLowProfitability')}</li>`;
            }
            if (isFinite(at)) {
                if (at >= 1.0) interpretation += `<li>${t_page('dupontFactorEfficiency')}</li>`;
                else if (at < 0.5) interpretation += `<li>${t_page('dupontFactorLowEfficiency')}</li>`;
            }
             if (isFinite(em)) {
                if (em > 2.5) interpretation += `<li>${t_page('dupontFactorLeverage')}</li>`;
                else if (em < 1.5) interpretation += `<li>${t_page('dupontFactorLowLeverage')}</li>`;
             }
            
            interpretation += `</ul>`;
            if (interpretation.endsWith('<ul></ul>')) { // Handle cases where no specific factor stood out
                 interpretation = `<p>${lang === 'ar' ? 'العوامل متوازنة أو البيانات غير كافية لتقييم دقيق.' : 'Factors appear balanced or data insufficient for precise assessment.'}</p>`;
            }
        } else {
             interpretation = `<p class="text-danger">${lang === 'ar' ? 'لا يمكن حساب التفسير بسبب قيم غير صالحة (قد يكون بسبب حقوق ملكية صفرية أو سالبة).' : 'Interpretation cannot be calculated due to invalid values (possibly zero or negative equity).'}</p>`;
        }
        
        if(UI.dupontInterpretation) UI.dupontInterpretation.innerHTML = interpretation;
    };

    // ==============================================
    // === INITIALIZATION ===
    // ==============================================

    const init = () => {
        // Run analysis initially to get data for all tabs
        runAnalysis(); 

        // Add event listener for Breakeven calculation
        if (UI.calculateBreakeven) {
             UI.calculateBreakeven.addEventListener('click', calculateAndDisplayBreakeven);
        }

        // --- Tab Change Listeners ---
        const ratiosTab = document.getElementById('ratios-tab');
        const breakevenTab = document.getElementById('breakeven-tab');
        const dupontTab = document.getElementById('dupont-tab');

        if (ratiosTab) {
            ratiosTab.addEventListener('shown.bs.tab', () => {
                console.log("Ratios tab shown");
                // Maybe re-run analysis if data could have been updated elsewhere
                // runAnalysis(); 
                // calculateAndDisplayDupont(); // Keep DuPont updated
            });
        }
        if (breakevenTab) {
            breakevenTab.addEventListener('shown.bs.tab', () => {
                console.log("Breakeven tab shown");
                 // Re-render chart maybe if needed
                // if(state.breakevenChart) state.breakevenChart.resize();
            });
        }
         if (dupontTab) {
            dupontTab.addEventListener('shown.bs.tab', () => {
                 console.log("DuPont tab shown");
                 // Ensure analysis data is fresh before displaying DuPont
                 runAnalysis(); // Re-run analysis to get latest financials/ratios
                 calculateAndDisplayDupont(); // Then display DuPont
            });
         }
         
         // Initial calculation for DuPont (will show warning if runAnalysis failed)
         calculateAndDisplayDupont(); 
         
         // Apply translations after initial content rendering
         // Assuming applyTranslations is globally available from main.js
         if (typeof applyTranslations === 'function') {
            applyTranslations();
         }
    };

    // Ensure necessary UI elements exist before running init
    if (UI.smartSummary && UI.fixedCosts && UI.dupontResultsContainer) {
        init();
    } else {
        console.error("One or more critical UI elements for advanced-app.js were not found. Initialization stopped.");
    }
});
