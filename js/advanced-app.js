// js/advanced-app.js

window.pageTranslations = {
    ar: {
        pageTitle: "التحليلات المتقدمة — المحلل المالي",
        pageHeader: "التحليلات المتقدمة",
        pageSubheader: "استخدم أدوات تحليلية متخصصة للحصول على رؤى أعمق حول أداء عملك.",
        tabRatios: "النسب المالية",
        tabBreakeven: "تحليل التعادل",
        tabDupont: "تحليل دوبونت",
        tabVertical: "التحليل الرأسي", // New
        tabZScore: "نموذج Z-Score", // New

        // Ratios Pane
        summaryTitle: "الملخص الذكي",
        alertsTitle: "تنبيهات ومؤشرات خطر",
        thRatio: "النسبة", thValue: "القيمة", thComment: "تعليق تحليلي",
        liquidityRatios: "نسب السيولة", profitabilityRatios: "نسب الربحية", leverageRatios: "نسب الرفع المالي", efficiencyRatios: "نسب الكفاءة",
        currentRatio: "نسبة التداول", currentRatio_comment_high: "سيولة ممتازة...", currentRatio_comment_good: "سيولة جيدة...", currentRatio_comment_low: "مؤشر خطر...",
        quickRatio: "نسبة السيولة السريعة", quickRatio_comment_good: "قدرة جيدة...", quickRatio_comment_low: "مؤشر خطر...",
        netProfitMargin: "هامش صافي الربح", netProfitMargin_comment_high: "ربحية ممتازة...", netProfitMargin_comment_avg: "ربحية مقبولة...", netProfitMargin_comment_low: "خسائر...",
        grossProfitMargin: "هامش الربح الإجمالي", grossProfitMargin_comment_high: "هامش قوي...", grossProfitMargin_comment_low: "هامش ضعيف...",
        roa: "العائد على الأصول (ROA)", roa_comment_high: "كفاءة عالية...", roa_comment_low: "كفاءة منخفضة...",
        roe: "العائد على حقوق الملكية (ROE)", roe_comment_high: "عائد ممتاز...", roe_comment_low: "عائد ضعيف...",
        debtToEquity: "نسبة الدين إلى حقوق الملكية", debtToEquity_comment_low: "دين منخفض...", debtToEquity_comment_good: "دين معتدل...", debtToEquity_comment_high: "دين مرتفع...",
        debtToAssets: "نسبة الدين إلى الأصول", debtToAssets_comment_low: "وضع آمن...", debtToAssets_comment_high: "مخاطر مرتفعة...",
        assetTurnover: "معدل دوران الأصول", assetTurnover_comment_high: "كفاءة ممتازة...", assetTurnover_comment_low: "كفاءة منخفضة...",
        summary_ok: "الوضع المالي يبدو مستقرًا...", summary_risk: "توجد بعض مؤشرات الخطر...",
        alert_liquidity_risk: "🔴 خطر سيولة...", alert_leverage_risk: "🟡 تنبيه دين مرتفع...", alert_profit_risk: "🔴 خطر ربحية...", alert_ok: "🟢 لا توجد مؤشرات خطر حرجة...",
        noDataForRatios: "لا توجد بيانات كافية لحساب النسب. يرجى إدخال ميزان المراجعة أولاً.",

        // Breakeven Pane
        beInputTitle: "مدخلات الحساب", labelFixedCosts: "إجمالي التكاليف الثابتة", labelVariableCost: "التكلفة المتغيرة للوحدة", labelSellingPrice: "سعر بيع الوحدة",
        btnCalculate: "احسب", beResultsTitle: "النتائج", bepUnits: "نقطة التعادل (بالوحدات)", bepValue: "نقطة التعادل (بالقيمة)",
        beChartTitle: "رسم بياني لنقطة التعادل", errorPrice: "سعر البيع يجب أن يكون أعلى من التكلفة المتغيرة.", errorPositiveValues: "الرجاء إدخال قيم موجبة.",
        revenue: 'الإيرادات', totalCosts: 'إجمالي التكاليف', fixedCosts: 'التكاليف الثابتة', unitsSold: 'الوحدات المباعة', value: 'القيمة',

        // DuPont Pane
        dupontTitle: "تحليل دوبونت للعائد على حقوق الملكية", dupontDesc: "يساعد هذا التحليل على تفكيك العائد على حقوق الملكية (ROE)...",
        dupontEquation: "معادلة دوبونت:", dupontCompNPM: "هامش صافي الربح", dupontCompAT: "دوران الأصول", dupontCompEM: "مضاعف حقوق الملكية", dupontCompROE: "العائد على حقوق الملكية",
        dupontDataWarning: "لا توجد بيانات كافية (من ميزان المراجعة) لإجراء تحليل دوبونت.",
        dupontInterpretationHighROE: "🟢 العائد المرتفع على حقوق الملكية مدفوع بـ:", dupontInterpretationLowROE: "🟡 العائد المنخفض قد يكون بسبب:",
        dupontFactorProfitability: "ربحية تشغيلية قوية...", dupontFactorEfficiency: "كفاءة أصول عالية...", dupontFactorLeverage: "استخدام الرفع المالي...",
        dupontFactorLowProfitability: "ربحية تشغيلية ضعيفة...", dupontFactorLowEfficiency: "كفاءة أصول منخفضة...", dupontFactorLowLeverage: "اعتماد منخفض على الديون...",

        // Vertical Analysis Pane (NEW)
        verticalTitle: "التحليل الرأسي (القوائم ذات الحجم الموحد)",
        verticalDesc: "يعرض كل بند في القوائم المالية كنسبة مئوية من إجمالي أساسي (إجمالي الأصول للميزانية، وصافي الإيرادات للدخل)، مما يسهل فهم الهيكل والمقارنة.",
        verticalDataWarning: "لا توجد بيانات كافية (من ميزان المراجعة) لإجراء التحليل الرأسي.",
        verticalBS: "الميزانية العمومية (كنسبة من إجمالي الأصول)",
        verticalIS: "قائمة الدخل (كنسبة من صافي الإيرادات)",
        verticalAccount: "الحساب", verticalValue: "القيمة", verticalPercent: "النسبة %",

        // Altman Z-Score Pane (NEW)
        zscoreTitle: "نموذج Altman Z-Score (للتنبؤ بالإفلاس)",
        zscoreDesc: "نموذج إحصائي يستخدم مجموعة من النسب المالية لتقدير احتمالية تعرض الشركة لصعوبات مالية أو إفلاس خلال العامين القادمين (معدل للشركات الخاصة).",
        zscoreDataWarning: "لا توجد بيانات كافية لحساب نموذج Z-Score. تأكد من إدخال بنود الأصول، الخصوم، حقوق الملكية، الإيرادات، والأرباح/الخسائر.",
        zscoreValueLabel: "قيمة Z-Score:",
        zscoreInterpretation: "التفسير:",
        zscoreZoneSafe: "🟢 منطقة آمنة (احتمالية إفلاس منخفضة)",
        zscoreZoneGrey: "🟡 منطقة رمادية (مؤشرات مختلطة، تتطلب الحذر)",
        zscoreZoneDistress: "🔴 منطقة الخطر (احتمالية إفلاس مرتفعة)",
        zscoreComponents: "مكونات النموذج:",
        zscoreX1: "X1 (رأس المال العامل / إجمالي الأصول):",
        zscoreX2: "X2 (الأرباح المحتجزة / إجمالي الأصول):",
        zscoreX3: "X3 (الأرباح قبل الفوائد والضرائب / إجمالي الأصول):",
        zscoreX4: "X4 (القيمة الدفترية لحقوق الملكية / إجمالي الخصوم):",
        zscoreX5: "X5 (صافي الإيرادات / إجمالي الأصول):",
        zscoreRetainedEarningsNotFound: "(لم يتم العثور على بند أرباح محتجزة واضح)" // Helper text
    },
    en: { // English translations omitted for brevity, but should follow the same structure
        pageTitle: "Advanced Analytics — Financial Analyzer",
        pageHeader: "Advanced Analytics", 
        pageSubheader: "Use specialized analytical tools...", 
        tabRatios: "Financial Ratios", tabBreakeven: "Break-even Analysis", tabDupont: "DuPont Analysis", tabVertical: "Vertical Analysis", tabZScore: "Altman Z-Score",
        // ... (rest of English translations) ...
        verticalTitle: "Vertical Analysis (Common-Size Statements)",
        verticalDesc: "Displays each financial statement item as a percentage of a base total (Total Assets for Balance Sheet, Net Revenue for Income Statement), facilitating structural understanding and comparison.",
        verticalDataWarning: "Insufficient data (from Trial Balance) available to perform Vertical Analysis.",
        verticalBS: "Balance Sheet (% of Total Assets)",
        verticalIS: "Income Statement (% of Net Revenue)",
        verticalAccount: "Account", verticalValue: "Value", verticalPercent: "%",
        zscoreTitle: "Altman Z-Score (Bankruptcy Prediction)",
        zscoreDesc: "A statistical model using several financial ratios to estimate the probability of a company experiencing financial distress or bankruptcy within the next two years (modified for private companies).",
        zscoreDataWarning: "Insufficient data to calculate the Z-Score. Ensure assets, liabilities, equity, revenue, and profit/loss items are entered.",
        zscoreValueLabel: "Z-Score Value:",
        zscoreInterpretation: "Interpretation:",
        zscoreZoneSafe: "🟢 Safe Zone (Low bankruptcy probability)",
        zscoreZoneGrey: "🟡 Grey Zone (Mixed signals, caution advised)",
        zscoreZoneDistress: "🔴 Distress Zone (High bankruptcy probability)",
        zscoreComponents: "Model Components:",
        zscoreX1: "X1 (Working Capital / Total Assets):",
        zscoreX2: "X2 (Retained Earnings / Total Assets):",
        zscoreX3: "X3 (EBIT / Total Assets):",
        zscoreX4: "X4 (Book Value of Equity / Total Liabilities):",
        zscoreX5: "X5 (Net Revenue / Total Assets):",
        zscoreRetainedEarningsNotFound: "(Explicit Retained Earnings item not found)"
    }
};

document.addEventListener('DOMContentLoaded', () => {

    const state = { 
        financials: {}, 
        ratios: {},
        breakevenChart: null,
        hasRatioData: false // Flag to track if ratio data is available
    };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`; 

    const UI = {
        // Ratio UI
        smartSummary: document.getElementById('smartSummary'), alertsArea: document.getElementById('alertsArea'),
        // Breakeven UI
        fixedCosts: document.getElementById('fixedCosts'), variableCost: document.getElementById('variableCost'), sellingPrice: document.getElementById('sellingPrice'),
        calculateBreakeven: document.getElementById('calculateBreakeven'), breakevenResults: document.getElementById('breakevenResults'),
        bepUnitsResult: document.getElementById('bepUnitsResult'), bepValueResult: document.getElementById('bepValueResult'), breakevenChartCanvas: document.getElementById('breakevenChart'),
        // DuPont UI
        dupontResultsContainer: document.getElementById('dupontResultsContainer'), dupontDataWarning: document.getElementById('dupontDataWarning'),
        dupontFormulaDisplay: document.getElementById('dupontFormulaDisplay'), dupontROE: document.getElementById('dupontROE'),
        dupontNPM: document.getElementById('dupontNPM'), dupontAT: document.getElementById('dupontAT'), dupontEM: document.getElementById('dupontEM'),
        dupontValueNPM: document.getElementById('dupontValueNPM'), dupontValueAT: document.getElementById('dupontValueAT'),
        dupontValueEM: document.getElementById('dupontValueEM'), dupontValueROE: document.getElementById('dupontValueROE'), dupontInterpretation: document.getElementById('dupontInterpretation'),
        // Vertical Analysis UI (NEW)
        verticalDataWarning: document.getElementById('verticalDataWarning'), verticalResultsContainer: document.getElementById('verticalResultsContainer'),
        verticalBSTable: document.getElementById('verticalBSTable'), verticalISTable: document.getElementById('verticalISTable'),
        // Z-Score UI (NEW)
        zscoreDataWarning: document.getElementById('zscoreDataWarning'), zscoreResultsContainer: document.getElementById('zscoreResultsContainer'),
        zscoreValue: document.getElementById('zscoreValue'), zscoreInterpretation: document.getElementById('zscoreInterpretation'),
        zscoreFactorsList: document.getElementById('zscoreFactorsList')
    };
    
    // Helper functions
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
    const formatPercent = (value, digits = 1) => isFinite(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
    const formatRatio = (value, digits = 2) => isFinite(value) ? value.toFixed(digits) : "N/A";
    const formatNumber = (value, digits = 2) => isFinite(value) ? value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "N/A";


    // ==============================================
    // === FINANCIAL CALCULATIONS (RATIOS, VERTICAL, Z-SCORE) ===
    // ==============================================

    // --- Refined calculateFinancials to capture more detail ---
    const calculateFinancials = () => {
        state.financials = {}; // Reset financials
        state.rawData = { bsItems: [], isItems: [] }; // Store items for vertical analysis
        const trialData = JSON.parse(localStorage.getItem('trialData') || '[]');
        if (trialData.length === 0 || (trialData.length === 1 && !trialData[0].Account && !toNum(trialData[0].Debit) && !toNum(trialData[0].Credit))) {
             console.warn("No valid trialData found.");
             return false; 
        }

        const f = { // Aggregated financials
            assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0, netProfit: 0, grossProfit: 0,
            currentAssets: 0, inventory: 0, currentLiabilities: 0, 
            retainedEarnings: 0, // For Z-Score
            interestExpense: 0, taxExpense: 0 // For EBIT approximation
        };
        
        trialData.forEach(row => {
            const value = (toNum(row.Debit)) - (toNum(row.Credit));
            const mainType = row.MainType || '';
            const subType = row.SubType || '';
            const accountName = (row.Account || '').toLowerCase();
            const rawItem = { account: row.Account || 'N/A', value: 0 }; // For vertical analysis

            if (mainType.includes('الأصول') || mainType.includes('Assets')) {
                f.assets += value;
                rawItem.value = value; // Asset value is positive
                state.rawData.bsItems.push(rawItem);
                if (subType.includes('متداول') || subType.includes('Current')) {
                    f.currentAssets += value;
                    if (subType.includes('المخزون') || subType.includes('Inventory') || accountName.includes('inventory') || accountName.includes('مخزون')) {
                         f.inventory += value;
                    }
                }
            } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) {
                f.liabilities -= value; // Liabilities have credit nature, store as positive number
                rawItem.value = -value; // Store positive value
                state.rawData.bsItems.push(rawItem);
                if (subType.includes('متداول') || subType.includes('Current')) f.currentLiabilities -= value;
            } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) {
                f.equity -= value; // Equity has credit nature, store as positive number
                 rawItem.value = -value; // Store positive value
                 state.rawData.bsItems.push(rawItem);
                 // Try to identify Retained Earnings for Z-Score
                 if (subType.includes('الأرباح المحتجزة') || subType.includes('Retained Earnings') || accountName.includes('retained earnings') || accountName.includes('أرباح محتجزة')) {
                      f.retainedEarnings -= value;
                 }
            } else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) {
                if (subType.includes('الإيرادات') || subType.includes('Revenue')) {
                    f.revenue -= value; // Revenue has credit nature, store as positive
                    rawItem.value = -value; // Store positive value
                    state.rawData.isItems.push(rawItem);
                } else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) {
                    f.cogs += value; // COGS is an expense (debit), store as positive
                    rawItem.value = value; // Store positive value
                    state.rawData.isItems.push(rawItem);
                } else {
                    f.expenses += value; // Other expenses (debit), store as positive
                    rawItem.value = value; // Store positive value
                    state.rawData.isItems.push(rawItem);
                    // Try to identify Interest and Tax for EBIT approximation
                    if (subType.includes('فائدة') || subType.includes('Interest') || accountName.includes('interest')) f.interestExpense += value;
                    if (subType.includes('ضريبية') || subType.includes('Tax') || accountName.includes('tax')) f.taxExpense += value;
                }
            }
        });
        
        Object.keys(f).forEach(key => f[key] = f[key] || 0); // Ensure all are numbers
        f.grossProfit = f.revenue - f.cogs;
        f.netProfit = f.grossProfit - f.expenses;
        // EBIT Approximation: Net Profit + Interest + Tax
        f.ebit = f.netProfit + f.interestExpense + f.taxExpense; 
        // Working Capital for Z-Score
        f.workingCapital = f.currentAssets - f.currentLiabilities;

        // Balance Sheet Check (A = L + E + Current Period Profit/Loss)
        const balanceCheck = f.assets - (f.liabilities + f.equity + f.netProfit);
        if (Math.abs(balanceCheck) > 1) { 
             console.warn(`Balance sheet check failed: Assets (${f.assets.toFixed(2)}) != L+E+NP (${(f.liabilities + f.equity + f.netProfit).toFixed(2)}). Diff: ${balanceCheck.toFixed(2)}`);
        }

        state.financials = f;
        console.log("Calculated Financials (Detailed):", f);
        console.log("Raw BS Items:", state.rawData.bsItems);
        console.log("Raw IS Items:", state.rawData.isItems);
        return true; 
    };

    // --- Calculate All Ratios (Including Z-Score components) ---
    const calculateAllRatios = () => {
        state.ratios = {};
        const f = state.financials;
        if (!f || Object.keys(f).length === 0) { return false; }
        
        const assets = f.assets || 0;
        const equity = f.equity || 0;
        const liabilities = f.liabilities || 0;
        const revenue = f.revenue || 0;

        const equityMultiplier = (equity !== 0 && assets !== 0) ? assets / equity : Infinity; 
        const roeStandard = (equity !== 0) ? f.netProfit / equity : Infinity; 

        // Z-Score Ratios
        const x1 = assets !== 0 ? f.workingCapital / assets : Infinity;
        const x2 = assets !== 0 ? f.retainedEarnings / assets : Infinity;
        const x3 = assets !== 0 ? f.ebit / assets : Infinity;
        const x4 = liabilities !== 0 ? equity / liabilities : Infinity; // Book Value Equity / Book Liabilities
        const x5 = assets !== 0 ? revenue / assets : 0; // Use revenue (Sales)

        // Altman Z-Score (Private Company Version)
        const zScore = (isFinite(x1) && isFinite(x2) && isFinite(x3) && isFinite(x4) && isFinite(x5))
            ? (0.717 * x1) + (0.847 * x2) + (3.107 * x3) + (0.420 * x4) + (0.998 * x5)
            : NaN; // Use NaN if any component is invalid

        state.ratios = {
            currentRatio: f.currentLiabilities !== 0 ? f.currentAssets / f.currentLiabilities : Infinity,
            quickRatio: f.currentLiabilities !== 0 ? (f.currentAssets - f.inventory) / f.currentLiabilities : Infinity,
            grossProfitMargin: revenue !== 0 ? f.grossProfit / revenue : 0,
            netProfitMargin: revenue !== 0 ? f.netProfit / revenue : 0,
            roa: assets !== 0 ? f.netProfit / assets : 0,
            roe: roeStandard, 
            debtToAssets: assets !== 0 ? liabilities / assets : Infinity,
            debtToEquity: equity !== 0 ? liabilities / equity : Infinity,
            assetTurnover: x5, // Same as Z-Score X5
            equityMultiplier: equityMultiplier,
            // Z-Score Components
            zScoreX1: x1, zScoreX2: x2, zScoreX3: x3, zScoreX4: x4, zScoreX5: x5,
            zScore: zScore 
        };
        console.log("Calculated Ratios & Z-Score:", state.ratios);
        return true;
    };

    // ==============================================
    // === RENDERING FUNCTIONS (RATIOS, BE, DUPONT, VERTICAL, Z-SCORE) ===
    // ==============================================
    
    // --- Render Ratios (Unchanged except formatting) ---
    const getRatioComment = (key, value) => { /* ... (original logic) ... */ if (!isFinite(value)) return "N/A"; if (key === 'currentRatio') { if (value >= 2) return t_page('currentRatio_comment_high'); if (value >= 1) return t_page('currentRatio_comment_good'); return t_page('currentRatio_comment_low'); } if (key === 'quickRatio') { if (value >= 1) return t_page('quickRatio_comment_good'); return t_page('quickRatio_comment_low'); } if (key === 'netProfitMargin') { if (value >= 0.15) return t_page('netProfitMargin_comment_high'); if (value > 0) return t_page('netProfitMargin_comment_avg'); return t_page('netProfitMargin_comment_low'); } if (key === 'grossProfitMargin') { return value >= 0.4 ? t_page('grossProfitMargin_comment_high') : t_page('grossProfitMargin_comment_low'); } if (key === 'roa') { return value >= 0.05 ? t_page('roa_comment_high') : t_page('roa_comment_low'); } if (key === 'roe') { return value >= 0.15 ? t_page('roe_comment_high') : t_page('roe_comment_low'); } if (key === 'debtToEquity') { if (value < 0.5) return t_page('debtToEquity_comment_low'); if (value <= 1.5) return t_page('debtToEquity_comment_good'); return t_page('debtToEquity_comment_high'); } if (key === 'debtToAssets') { return value < 0.4 ? t_page('debtToAssets_comment_low') : t_page('debtToAssets_comment_high'); } if (key === 'assetTurnover') { return value >= 1 ? t_page('assetTurnover_comment_high') : t_page('assetTurnover_comment_low'); } return ""; };
    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => { /* ... (original logic + check state.hasRatioData) ... */ const container = document.getElementById(divId); if (!container) { console.error(`Element not found: ${divId}`); return; } if (!state.hasRatioData) { container.innerHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <p class="text-muted">${t_page('noDataForRatios')}</p>`; return; } let tableHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <div class="table-responsive"> <table class="table table-sm table-striped"> <thead><tr><th>${t_page('thRatio')}</th><th>${t_page('thValue')}</th><th>${t_page('thComment')}</th></tr></thead> <tbody>`; ratioKeys.forEach(key => { const value = state.ratios[key]; const isPercentage = key.includes('Margin') || key.includes('roa') || key.includes('roe'); const formattedValue = isPercentage ? formatPercent(value) : formatRatio(value); const comment = getRatioComment(key, value); tableHTML += `<tr> <td>${t_page(key)}</td> <td><strong>${formattedValue}</strong></td> <td class="text-muted small">${comment}</td> </tr>`; }); container.innerHTML = tableHTML + `</tbody></table></div>`; };
    const renderSidebar = () => { /* ... (original logic + check state.hasRatioData) ... */ if (!state.hasRatioData) { UI.smartSummary.textContent = lang === 'ar' ? 'يرجى إدخال بيانات لحساب الملخص.' : 'Please enter data to calculate summary.'; UI.alertsArea.innerHTML = `<div>${lang === 'ar' ? 'لا توجد بيانات كافية للتنبيهات.' : 'Insufficient data for alerts.'}</div>`; return; } const { netProfitMargin, currentRatio, debtToEquity } = state.ratios; UI.smartSummary.textContent = netProfitMargin > 0 && currentRatio > 1.5 ? t_page('summary_ok') : t_page('summary_risk'); const alerts = []; if (currentRatio < 1 && isFinite(currentRatio)) alerts.push(t_page('alert_liquidity_risk')); if (debtToEquity > 2 && isFinite(debtToEquity)) alerts.push(t_page('alert_leverage_risk')); if (netProfitMargin < 0 && isFinite(netProfitMargin)) alerts.push(t_page('alert_profit_risk')); UI.alertsArea.innerHTML = alerts.length > 0 ? alerts.map(alert => `<div>${alert}</div>`).join('') : `<div>${t_page('alert_ok')}</div>`; };

    // --- Render Break-even (Unchanged) ---
    const calculateAndDisplayBreakeven = () => { /* ... (original logic) ... */ const fixed = toNum(UI.fixedCosts.value); const variable = toNum(UI.variableCost.value); const price = toNum(UI.sellingPrice.value); if (price <= 0 || variable < 0 || fixed < 0) { alert(t_page('errorPositiveValues')); return; } if (price <= variable) { alert(t_page('errorPrice')); return; } const contributionMargin = price - variable; const bepUnits = fixed / contributionMargin; const bepValue = bepUnits * price; UI.bepUnitsResult.textContent = Math.ceil(bepUnits).toLocaleString(); UI.bepValueResult.textContent = formatNumber(bepValue); UI.breakevenResults.style.display = 'block'; renderBreakevenChart(fixed, variable, price, bepUnits); };
    const renderBreakevenChart = (fixed, variable, price, bepUnits) => { /* ... (original logic) ... */ if (!UI.breakevenChartCanvas) return; if (state.breakevenChart) { state.breakevenChart.destroy(); } let maxUnits = 100; if (bepUnits > 0 && isFinite(bepUnits)) { maxUnits = Math.max(100, Math.ceil(bepUnits * 2 / 10) * 10); } else if (fixed === 0 && price > variable) { maxUnits = 100; } else if (price <= variable) { maxUnits = 100; } const step = maxUnits / 10; const labels = Array.from({ length: 11 }, (_, i) => Math.round(step * i)); const fixedCostsData = labels.map(() => fixed); const totalCostsData = labels.map(unit => fixed + (variable * unit)); const revenueData = labels.map(unit => price * unit); const ctx = UI.breakevenChartCanvas.getContext('2d'); state.breakevenChart = new Chart(ctx, { type: 'line', data: { labels: labels, datasets: [ { label: t_page('revenue'), data: revenueData, borderColor: 'rgba(75, 192, 192, 1)', fill: false, tension: 0.1 }, { label: t_page('totalCosts'), data: totalCostsData, borderColor: 'rgba(255, 99, 132, 1)', fill: false, tension: 0.1 }, { label: t_page('fixedCosts'), data: fixedCostsData, borderColor: 'rgba(255, 159, 64, 1)', borderDash: [5, 5], fill: false, tension: 0.1 } ] }, options: { responsive: true, maintainAspectRatio: false, interaction: { intersect: false, mode: 'index', }, scales: { x: { title: { display: true, text: t_page('unitsSold') } }, y: { title: { display: true, text: t_page('value') }, beginAtZero: true } }, plugins: { tooltip: { callbacks: { label: function(context) { return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`; } } } } } }); };

    // --- Render DuPont (Unchanged) ---
    const calculateAndDisplayDupont = () => { /* ... (original logic + check state.hasRatioData) ... */ if (!state.hasRatioData) { if(UI.dupontDataWarning) { UI.dupontDataWarning.textContent = t_page('dupontDataWarning'); UI.dupontDataWarning.style.display = 'block'; } if(UI.dupontFormulaDisplay) UI.dupontFormulaDisplay.style.display = 'none'; if(UI.dupontInterpretation) UI.dupontInterpretation.innerHTML = ''; if(UI.dupontValueNPM) UI.dupontValueNPM.textContent = 'N/A'; if(UI.dupontValueAT) UI.dupontValueAT.textContent = 'N/A'; if(UI.dupontValueEM) UI.dupontValueEM.textContent = 'N/A'; if(UI.dupontValueROE) UI.dupontValueROE.textContent = 'N/A'; return; } if(UI.dupontDataWarning) UI.dupontDataWarning.style.display = 'none'; if(UI.dupontFormulaDisplay) UI.dupontFormulaDisplay.style.display = 'block'; const npm = state.ratios.netProfitMargin; const at = state.ratios.assetTurnover; const em = state.ratios.equityMultiplier; const dupontROE = (isFinite(npm) && isFinite(at) && isFinite(em)) ? npm * at * em : Infinity; if(UI.dupontROE) UI.dupontROE.textContent = formatPercent(dupontROE); if(UI.dupontNPM) UI.dupontNPM.textContent = formatPercent(npm); if(UI.dupontAT) UI.dupontAT.textContent = formatRatio(at); if(UI.dupontEM) UI.dupontEM.textContent = formatRatio(em); if(UI.dupontValueNPM) UI.dupontValueNPM.textContent = formatPercent(npm); if(UI.dupontValueAT) UI.dupontValueAT.textContent = formatRatio(at); if(UI.dupontValueEM) UI.dupontValueEM.textContent = formatRatio(em); if(UI.dupontValueROE) UI.dupontValueROE.textContent = formatPercent(dupontROE); let interpretation = ''; if (isFinite(dupontROE)) { const highROE = dupontROE >= 0.15; interpretation += highROE ? `<p>${t_page('dupontInterpretationHighROE')}</p><ul>` : `<p>${t_page('dupontInterpretationLowROE')}</p><ul>`; if (isFinite(npm)) { if (npm >= 0.10) interpretation += `<li>${t_page('dupontFactorProfitability')}</li>`; else if (npm < 0.05) interpretation += `<li>${t_page('dupontFactorLowProfitability')}</li>`; } if (isFinite(at)) { if (at >= 1.0) interpretation += `<li>${t_page('dupontFactorEfficiency')}</li>`; else if (at < 0.5) interpretation += `<li>${t_page('dupontFactorLowEfficiency')}</li>`; } if (isFinite(em)) { if (em > 2.5) interpretation += `<li>${t_page('dupontFactorLeverage')}</li>`; else if (em < 1.5) interpretation += `<li>${t_page('dupontFactorLowLeverage')}</li>`; } interpretation += `</ul>`; if (interpretation.endsWith('<ul></ul>')) { interpretation = `<p>${lang === 'ar' ? 'العوامل متوازنة أو البيانات غير كافية لتقييم دقيق.' : 'Factors appear balanced or data insufficient for precise assessment.'}</p>`; } } else { interpretation = `<p class="text-danger">${lang === 'ar' ? 'لا يمكن حساب التفسير بسبب قيم غير صالحة (قد يكون بسبب حقوق ملكية صفرية أو سالبة).' : 'Interpretation cannot be calculated due to invalid values (possibly zero or negative equity).'}</p>`; } if(UI.dupontInterpretation) UI.dupontInterpretation.innerHTML = interpretation; };

    // --- Render Vertical Analysis (NEW) ---
    const calculateAndDisplayVerticalAnalysis = () => {
        if (!state.financials || Object.keys(state.financials).length === 0 || !state.rawData || (!state.rawData.bsItems.length && !state.rawData.isItems.length)) {
             if(UI.verticalDataWarning) {
                 UI.verticalDataWarning.textContent = t_page('verticalDataWarning');
                 UI.verticalDataWarning.style.display = 'block';
             }
             if(UI.verticalResultsContainer) UI.verticalResultsContainer.style.display = 'none';
             return;
        }

        if(UI.verticalDataWarning) UI.verticalDataWarning.style.display = 'none';
        if(UI.verticalResultsContainer) UI.verticalResultsContainer.style.display = 'block';

        const totalAssets = state.financials.assets || 0;
        const totalRevenue = state.financials.revenue || 0;

        // Balance Sheet Table
        let bsTableHTML = `<table class="table table-sm table-striped"><thead><tr><th>${t_page('verticalAccount')}</th><th class="text-end">${t_page('verticalValue')}</th><th class="text-end">${t_page('verticalPercent')}</th></tr></thead><tbody>`;
        state.rawData.bsItems.forEach(item => {
             const percentage = totalAssets !== 0 ? (item.value / totalAssets) : 0;
             bsTableHTML += `<tr><td>${item.account}</td><td class="text-end">${formatNumber(item.value)}</td><td class="text-end">${formatPercent(percentage)}</td></tr>`;
        });
         bsTableHTML += `<tr class="table-light fw-bold"><td>${lang === 'ar' ? 'إجمالي الأصول/الخصوم+حقوق الملكية' : 'Total Assets/Liabilities+Equity'}</td><td class="text-end">${formatNumber(totalAssets)}</td><td class="text-end">100.0%</td></tr>`;
        bsTableHTML += `</tbody></table>`;
        if(UI.verticalBSTable) UI.verticalBSTable.innerHTML = bsTableHTML;

        // Income Statement Table
        let isTableHTML = `<table class="table table-sm table-striped"><thead><tr><th>${t_page('verticalAccount')}</th><th class="text-end">${t_page('verticalValue')}</th><th class="text-end">${t_page('verticalPercent')}</th></tr></thead><tbody>`;
        state.rawData.isItems.forEach(item => {
             const percentage = totalRevenue !== 0 ? (item.value / totalRevenue) : 0;
             // Determine sign based on revenue/expense nature
             const displayValue = (item.account.toLowerCase().includes('revenue') || item.account.includes('إيراد')) ? item.value : -item.value; // Show expenses as negative intuitively in vertical IS
             isTableHTML += `<tr><td>${item.account}</td><td class="text-end">${formatNumber(displayValue)}</td><td class="text-end">${formatPercent(percentage)}</td></tr>`;
        });
         isTableHTML += `<tr class="table-light fw-bold"><td>${lang === 'ar' ? 'صافي الإيرادات' : 'Net Revenue'}</td><td class="text-end">${formatNumber(totalRevenue)}</td><td class="text-end">100.0%</td></tr>`;
        isTableHTML += `</tbody></table>`;
         if(UI.verticalISTable) UI.verticalISTable.innerHTML = isTableHTML;
    };

    // --- Render Altman Z-Score (NEW) ---
    const calculateAndDisplayZScore = () => {
         if (!state.hasRatioData || !isFinite(state.ratios.zScore)) {
              if(UI.zscoreDataWarning) {
                 UI.zscoreDataWarning.textContent = t_page('zscoreDataWarning');
                 UI.zscoreDataWarning.style.display = 'block';
             }
              if(UI.zscoreResultsContainer) UI.zscoreResultsContainer.style.display = 'none';
              return; // Stop execution
         }

         if(UI.zscoreDataWarning) UI.zscoreDataWarning.style.display = 'none';
         if(UI.zscoreResultsContainer) UI.zscoreResultsContainer.style.display = 'block';

         const z = state.ratios.zScore;
         let interpretation = '';
         let interpretationClass = '';

         if (z > 2.9) {
             interpretation = t_page('zscoreZoneSafe');
             interpretationClass = 'text-success';
         } else if (z > 1.23) {
             interpretation = t_page('zscoreZoneGrey');
              interpretationClass = 'text-warning';
         } else {
              interpretation = t_page('zscoreZoneDistress');
              interpretationClass = 'text-danger';
         }

         if(UI.zscoreValue) UI.zscoreValue.textContent = formatRatio(z);
         if(UI.zscoreInterpretation) {
             UI.zscoreInterpretation.textContent = interpretation;
             UI.zscoreInterpretation.className = `h5 fw-bold ${interpretationClass}`; // Apply color class
         }

         // Display components
         let factorsHTML = '';
         const factors = ['zScoreX1', 'zScoreX2', 'zScoreX3', 'zScoreX4', 'zScoreX5'];
         factors.forEach(key => {
              const value = state.ratios[key];
              let label = t_page(key.replace('zScore', 'zscore')); // Match translation key format
              // Add note if Retained Earnings was not found
              if (key === 'zScoreX2' && state.financials.retainedEarnings === 0 && !isFinite(value)) {
                 label += ` <small class="text-muted">${t_page('zscoreRetainedEarningsNotFound')}</small>`;
              }
              factorsHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">${label} <span class="badge bg-secondary rounded-pill">${formatRatio(value)}</span></li>`;
         });
         if(UI.zscoreFactorsList) UI.zscoreFactorsList.innerHTML = factorsHTML;
    };


    // ==============================================
    // === INITIALIZATION ===
    // ==============================================

    const init = () => {
        // Run analysis initially to get data for all tabs that depend on it
        runAnalysis(); 

        // Add event listener for Breakeven calculation
        if (UI.calculateBreakeven) {
             UI.calculateBreakeven.addEventListener('click', calculateAndDisplayBreakeven);
        }

        // --- Tab Change Listeners ---
        const tabs = ['ratios', 'breakeven', 'dupont', 'vertical', 'zscore'];
        tabs.forEach(tabId => {
            const tabElement = document.getElementById(`${tabId}-tab`);
            if (tabElement) {
                tabElement.addEventListener('shown.bs.tab', () => {
                     console.log(`${tabId} tab shown`);
                     // Re-run analysis or specific calculations if needed when tab becomes visible
                     if (tabId === 'ratios' || tabId === 'dupont' || tabId === 'vertical' || tabId === 'zscore') {
                          // Ensure data is fresh before displaying dependent tabs
                           if (!state.hasRatioData) runAnalysis(); // Try to recalculate if no data flag
                           
                           // Display specific analysis for the shown tab
                           if (tabId === 'dupont') calculateAndDisplayDupont();
                           if (tabId === 'vertical') calculateAndDisplayVerticalAnalysis();
                           if (tabId === 'zscore') calculateAndDisplayZScore();
                     }
                     // Optional: Resize charts if they render weirdly when hidden
                     if (tabId === 'breakeven' && state.breakevenChart) {
                         // state.breakevenChart.resize(); 
                     }
                });
            }
        });
         
         // Initial calculations for tabs that depend on analysis results
         calculateAndDisplayDupont(); 
         calculateAndDisplayVerticalAnalysis();
         calculateAndDisplayZScore();
         
         // Apply translations after initial content rendering
         if (typeof applyTranslations === 'function') {
            applyTranslations();
         } else {
            console.warn("applyTranslations function not found. Ensure main.js is loaded correctly.");
         }
    };

    // Run init only if critical elements for the *first* tab exist
    if (UI.smartSummary && UI.alertsArea) {
        init();
    } else {
        console.error("Critical UI elements for the Ratios tab were not found. Initialization stopped.");
    }
});
