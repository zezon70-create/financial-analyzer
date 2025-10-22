// js/advanced-app.js (Based on working version + Re-integrated Horizontal, CCC, Scenario)

window.pageTranslations = {
    ar: { 
        pageTitle: "التحليلات المتقدمة — المحلل المالي", pageHeader: "التحليلات المتقدمة", pageSubheader: "استخدم أدوات تحليلية متخصصة للحصول على رؤى أعمق حول أداء عملك.",
        tabRatios: "النسب المالية", tabBreakeven: "تحليل التعادل", tabDupont: "تحليل دوبونت", tabVertical: "التحليل الرأسي", tabZScore: "نموذج Z-Score", tabCashFlow: "تحليل التدفقات النقدية", tabEVA: "القيمة الاقتصادية المضافة (EVA)",
        // *** مُضاف: تبويبات جديدة ***
        tabHorizontal: "التحليل الأفقي", tabCCC: "دورة التحول النقدي", tabScenario: "تحليل السيناريو",

        summaryTitle: "الملخص الذكي", alertsTitle: "تنبيهات ومؤشرات خطر", thRatio: "النسبة", thValue: "القيمة", thComment: "تعليق تحليلي", 
        liquidityRatios: "مؤشرات السيولة", profitabilityRatios: "مؤشرات الربحية", leverageRatios: "مؤشرات الروافع والمديونية", activityRatios: "مؤشرات النشاط", valuationRatios: "مؤشرات التقييم",
        currentRatio: "نسبة التداول", currentRatio_comment_high: "سيولة ممتازة...", currentRatio_comment_good: "سيولة جيدة...", currentRatio_comment_low: "مؤشر خطر...", quickRatio: "نسبة السيولة السريعة", quickRatio_comment_good: "قدرة جيدة...", quickRatio_comment_low: "مؤشر خطر...", netWorkingCapital: "صافي راس المال العامل", netWorkingCapital_comment_positive: "وضع صحي.", netWorkingCapital_comment_negative: "مؤشر خطر.", cashRatio: "نسبة النقد", cashRatio_comment_good: "قدرة قوية جداً.", cashRatio_comment_low: "اعتماد منخفض.",
        inventoryTurnover: "معدل دوران المخزون", inventoryTurnover_comment_high: "كفاءة عالية.", inventoryTurnover_comment_low: "ضعف أو ركود.", assetTurnover: "معدل دوران الأصول", assetTurnover_comment_high: "كفاءة ممتازة.", assetTurnover_comment_low: "كفاءة منخفضة.", receivablesTurnover: "معدل دوران العملاء", receivablesTurnover_comment_high: "تحصيل قوي.", receivablesTurnover_comment_low: "تباطؤ في التحصيل.", avgCollectionPeriod: "متوسط فترة التحصيل", avgCollectionPeriod_comment_low: "سرعة ممتازة.", avgCollectionPeriod_comment_high: "فترة طويلة.",
        debtToEquity: "نسبة الديون لحقوق الملكية", debtToEquity_comment_low: "هيكل آمن.", debtToEquity_comment_good: "توازن جيد.", debtToEquity_comment_high: "دين مرتفع.", debtToAssets: "نسبة الديون للأصول", debtToAssets_comment_low: "وضع آمن.", debtToAssets_comment_high: "مخاطر مرتفعة.", interestCoverageRatio: "عدد مرات تغطية الفوائد", interestCoverageRatio_comment_safe: "قدرة ممتازة.", interestCoverageRatio_comment_risk: "خطر.", financialLeverage: "الرافعة المالية", financialLeverage_comment_high: "اعتماد كبير.", financialLeverage_comment_low: "اعتماد منخفض.",
        netProfitMargin: "هامش صافي الربح", netProfitMargin_comment_high: "ربحية ممتازة.", netProfitMargin_comment_avg: "ربحية مقبولة.", netProfitMargin_comment_low: "خسائر.", grossProfitMargin: "نسبة مجمل الربح", grossProfitMargin_comment_high: "هامش قوي.", grossProfitMargin_comment_low: "هامش ضعيف.", roa: "العائد على الأصول (ROA)", roa_comment_high: "كفاءة عالية.", roa_comment_low: "كفاءة منخفضة.", roe: "العائد على حقوق الملكية (ROE)", roe_comment_high: "عائد ممتاز.", roe_comment_low: "عائد ضعيف.", eps: "ربحية السهم (EPS)", eps_comment_positive: "ربح للسهم.", eps_comment_negative: "خسارة للسهم.",
        peRatio: "مضاعف الربحية (P/E)", peRatio_comment: "يقارن بالقطاع.", pbRatio: "معدل السعر للقيمة الدفترية (P/B)", pbRatio_comment: "يقارن سعر السهم بقيمته الدفترية.", dividendYield: "معدل الربح الموزع للسهم", dividendYield_comment: "هام للمستثمرين الباحثين عن دخل.", payoutRatio: "نسبة التوزيع", payoutRatio_comment: "نسبة منخفضة قد تعني إعادة استثمار.",
        externalDataWarning: "تتطلب مدخلات إضافية.",
        summary_ok: "الوضع المالي يبدو مستقرًا...", summary_risk: "توجد بعض مؤشرات الخطر...", alert_liquidity_risk: "🔴 خطر سيولة...", alert_leverage_risk: "🟡 تنبيه دين مرتفع...", alert_profit_risk: "🔴 خطر ربحية...", alert_ok: "🟢 لا توجد مؤشرات خطر حرجة...", noDataForRatios: "لا توجد بيانات كافية لحساب النسب.",
        beInputTitle: "مدخلات الحساب", labelFixedCosts: "إجمالي التكاليف الثابتة", labelVariableCost: "التكلفة المتغيرة للوحدة", labelSellingPrice: "سعر بيع الوحدة", btnCalculate: "احسب", beResultsTitle: "النتائج", bepUnits: "نقطة التعادل (بالوحدات)", bepValue: "نقطة التعادل (بالقيمة)", beChartTitle: "رسم بياني لنقطة التعادل", errorPrice: "سعر البيع يجب أن يكون أعلى.", errorPositiveValues: "أدخل قيم موجبة.", revenue: 'الإيرادات', totalCosts: 'إجمالي التكاليف', fixedCosts: 'التكاليف الثابتة', unitsSold: 'الوحدات المباعة', value: 'القيمة',
        dupontTitle: "تحليل دوبونت", dupontDesc: "تفكيك العائد على حقوق الملكية (ROE)...", dupontEquation: "معادلة دوبونت:", dupontCompNPM: "هامش صافي الربح", dupontCompAT: "دوران الأصول", dupontCompEM: "مضاعف الملكية", dupontCompROE: "العائد على الملكية", dupontDataWarning: "بيانات غير كافية لتحليل دوبونت.", dupontInterpretationHighROE: "🟢 عائد مرتفع...", dupontInterpretationLowROE: "🟡 عائد منخفض...", dupontFactorProfitability: "ربحية قوية...", dupontFactorEfficiency: "كفاءة أصول عالية...", dupontFactorLeverage: "استخدام الرفع...", dupontFactorLowProfitability: "ربحية ضعيفة...", dupontFactorLowEfficiency: "كفاءة أصول منخفضة...", dupontFactorLowLeverage: "اعتماد منخفض على الديون...",
        verticalTitle: "التحليل الرأسي", verticalDesc: "يعرض البنود كنسبة مئوية...", verticalDataWarning: "بيانات غير كافية للتحليل الرأسي.", verticalBS: "الميزانية (% من الأصول)", verticalIS: "الدخل (% من الإيرادات)", verticalAccount: "الحساب", verticalValue: "القيمة", verticalPercent: "النسبة %",
        zscoreTitle: "نموذج Altman Z-Score", zscoreDesc: "نموذج للتنبؤ بالإفلاس...", zscoreDataWarning: "بيانات غير كافية لحساب Z-Score.", zscoreValueLabel: "قيمة Z-Score:", zscoreInterpretation: "التفسير:", zscoreZoneSafe: "🟢 منطقة آمنة", zscoreZoneGrey: "🟡 منطقة رمادية", zscoreZoneDistress: "🔴 منطقة الخطر", zscoreComponents: "مكونات النموذج:", zscoreX1: "X1 (رأس المال العامل / الأصول)", zscoreX2: "X2 (الأرباح المحتجزة / الأصول)", zscoreX3: "X3 (الأرباح ق.ف.ض / الأصول)", zscoreX4: "X4 (حقوق الملكية / الخصوم)", zscoreX5: "X5 (الإيرادات / الأصول)", zscoreRetainedEarningsNotFound: "(أرباح محتجزة غير موجودة)",
        cfTitle: "تحليل التدفقات النقدية (تقديري)", cfDesc: "تقدير لقائمة التدفقات النقدية...", cfDataWarning: "بيانات غير كافية لتقدير التدفقات.", cfStmtTitle: "قائمة التدفقات النقدية المقدرة", cfNetIncome: "صافي الدخل", cfDepreciationAmortization: "الإهلاك (مقدر)", cfChangesWC: "تغيرات رأس المال العامل (مقدر)", cfOperating: "التدفق التشغيلي", cfInvesting: "التدفق الاستثماري (مقدر)", cfFinancing: "التدفق التمويلي (مقدر)", cfNetChange: "صافي التغير النقدي", cfRatiosTitle: "نسب التدفقات النقدية", cfRatioOCF: "نسبة التدفق التشغيلي", cfRatioFCF: "التدفق النقدي الحر (مقدر)", cfInterpretationPositiveOCF: "🟢 العمليات تولد نقدًا.", cfInterpretationNegativeOCF: "🔴 العمليات تستهلك نقدًا.", cfInterpretationFCF: "التدفق النقدي الحر...",
        evaInputTitle: "مدخلات حساب (EVA)", evaInputDesc: "يتطلب افتراضات خارجية.", labelWACC: "متوسط تكلفة رأس المال (WACC)", labelTaxRate: "معدل الضريبة", evaResultsTitle: "نتائج تحليل (EVA)", evaDataWarning: "بيانات غير كافية لحساب (EVA).", evaValueLabel: "القيمة الاقتصادية المضافة (EVA):", evaInterpretation: "التفسير:", evaInterpretationPositive: "🟢 خلق للقيمة.", evaInterpretationNegative: "🔴 تدمير للقيمة.", evaComponents: "مكونات الحساب:", evaNOPAT: "صافي الربح التشغيلي بعد الضرائب", evaInvestedCapital: "رأس المال المستثمر", evaCapitalCharge: "تكلفة رأس المال",

        // *** مُضاف: ترجمات التحليل الأفقي ***
        horizontalTitle: "التحليل الأفقي (تحليل الاتجاه)",
        horizontalDesc: "يقارن بنود القوائم المالية عبر فترتين زمنيتين (الحالية والسابقة، إن وجدت).",
        horizontalDataWarning: "لا توجد بيانات كافية لفترتين لإجراء التحليل الأفقي. يجب تحميل بيانات فترة سابقة.",
        horizontalIS: "قائمة الدخل - مقارنة الفترات",
        horizontalBS: "الميزانية العمومية - مقارنة الفترات",
        horizontalAccount: "الحساب",
        horizontalCurrentPeriod: "الفترة الحالية",
        horizontalPreviousPeriod: "الفترة السابقة",
        horizontalChangeAbs: "التغير ($)",
        horizontalChangePct: "التغير (%)",
        
        // *** مُضاف: ترجمات دورة التحول النقدي ***
        cccTitle: "دورة التحول النقدي (CCC)",
        cccDesc: "تقيس الوقت بالأيام لتحويل الاستثمارات في المخزون والموارد إلى نقد.",
        cccDataWarning: "بيانات غير كافية لحساب CCC (يتطلب COGS, إيرادات, مخزون, عملاء, موردين - ويفضل بيانات فترتين للمتوسطات).",
        cccValueLabel: "دورة التحول النقدي (أيام):",
        cccInterpretation: "التفسير:",
        cccInterpretationShort: "🟢 دورة قصيرة: كفاءة عالية في إدارة رأس المال العامل.",
        cccInterpretationLong: "🟡 دورة طويلة: قد يشير إلى بطء في بيع المخزون أو تحصيل الديون.",
        cccComponents: "مكونات الحساب (أيام):",
        cccDSO: "متوسط فترة التحصيل (DSO)",
        cccDIO: "متوسط فترة التخزين (DIO)",
        cccDPO: "متوسط فترة السداد للموردين (DPO)",

        // *** مُضاف: ترجمات تحليل السيناريو ***
        scenarioTitle: "تحليل السيناريو (على نقطة التعادل)",
        scenarioDesc: "اختبر تأثير تغيير الافتراضات على نقطة التعادل.",
        scenarioInputs: "تغيير الافتراضات (%):",
        scenarioFixedCostsLabel: "التكاليف الثابتة",
        scenarioVariableCostLabel: "التكلفة المتغيرة للوحدة",
        scenarioSellingPriceLabel: "سعر بيع الوحدة",
        scenarioRunBtn: "اختبر السيناريو",
        scenarioResults: "النتائج:",
        scenarioBaseCaseInfo: "القيم الأصلية مأخوذة من تبويب تحليل التعادل.",
        scenarioMetric: "المقياس",
        scenarioBaseValue: "القيمة الأصلية",
        scenarioNewValue: "القيمة الجديدة",
        scenarioChange: "التغير (%)"
    },
    en: {  // *** Note: Add corresponding English translations here ***
        // ... (existing translations) ...
        tabHorizontal: "Horizontal Analysis", tabCCC: "Cash Conversion Cycle", tabScenario: "Scenario Analysis",
        horizontalTitle: "Horizontal Analysis (Trend Analysis)",
        horizontalDesc: "Compares financial statement items across two periods (current and previous, if available).",
        horizontalDataWarning: "Insufficient data for two periods to perform horizontal analysis. Previous period data must be loaded.",
        horizontalIS: "Income Statement - Period Comparison",
        horizontalBS: "Balance Sheet - Period Comparison",
        horizontalAccount: "Account",
        horizontalCurrentPeriod: "Current Period",
        horizontalPreviousPeriod: "Previous Period",
        horizontalChangeAbs: "Change ($)",
        horizontalChangePct: "Change (%)",
        cccTitle: "Cash Conversion Cycle (CCC)",
        cccDesc: "Measures the time (in days) it takes to convert inventory and resource investments into cash.",
        cccDataWarning: "Insufficient data to calculate CCC (requires COGS, Revenue, Inventory, Receivables, Payables - preferably data from two periods for averages).",
        cccValueLabel: "Cash Conversion Cycle (Days):",
        cccInterpretation: "Interpretation:",
        cccInterpretationShort: "🟢 Short cycle: High efficiency in working capital management.",
        cccInterpretationLong: "🟡 Long cycle: May indicate slowness in selling inventory or collecting receivables.",
        cccComponents: "Calculation Components (Days):",
        cccDSO: "Days Sales Outstanding (DSO)",
        cccDIO: "Days Inventory Outstanding (DIO)",
        cccDPO: "Days Payables Outstanding (DPO)",
        scenarioTitle: "Scenario Analysis (on Break-even)",
        scenarioDesc: "Test the impact of changing assumptions on the break-even point.",
        scenarioInputs: "Change Assumptions (%):",
        scenarioFixedCostsLabel: "Fixed Costs",
        scenarioVariableCostLabel: "Variable Cost/Unit",
        scenarioSellingPriceLabel: "Selling Price/Unit",
        scenarioRunBtn: "Run Scenario",
        scenarioResults: "Results:",
        scenarioBaseCaseInfo: "Base values are taken from the Break-even Analysis tab.",
        scenarioMetric: "Metric",
        scenarioBaseValue: "Base Value",
        scenarioNewValue: "New Value",
        scenarioChange: "Change (%)"
        // ... (rest of English translations) ...
    }
};

document.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        console.log("[DEBUG] Starting advanced-app.js initialization after delay...");

        const state = { 
            financials: {}, 
            financialsPrevious: {}, // *** مُضاف: لتخزين بيانات الفترة السابقة ***
            ratios: {},
            breakevenChart: null,
            baseBreakeven: { units: NaN, value: NaN }, // *** مُضاف: لتخزين قيم التعادل الأصلية للسيناريو ***
            hasValidData: false, 
            hasPreviousData: false, // *** مُضاف: لتتبع وجود بيانات سابقة ***
            rawData: { bsItems: [], isItems: [] }, // Stores only current period raw items
            rawDataPrevious: { bsItems: [], isItems: [] } // *** مُضاف: لتخزين بيانات خام سابقة ***
        };
        const lang = localStorage.getItem('lang') || 'ar';
        const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`; 

        const UI = { 
            // Existing UI elements from the working version
            smartSummary: document.getElementById('smartSummary'), alertsArea: document.getElementById('alertsArea'),
            fixedCosts: document.getElementById('fixedCosts'), variableCost: document.getElementById('variableCost'), sellingPrice: document.getElementById('sellingPrice'),
            calculateBreakeven: document.getElementById('calculateBreakeven'), breakevenResults: document.getElementById('breakevenResults'),
            bepUnitsResult: document.getElementById('bepUnitsResult'), bepValueResult: document.getElementById('bepValueResult'), breakevenChartCanvas: document.getElementById('breakevenChart'),
            dupontResultsContainer: document.getElementById('dupontResultsContainer'), dupontDataWarning: document.getElementById('dupontDataWarning'),
            dupontFormulaDisplay: document.getElementById('dupontFormulaDisplay'), dupontROE: document.getElementById('dupontROE'),
            dupontNPM: document.getElementById('dupontNPM'), dupontAT: document.getElementById('dupontAT'), dupontEM: document.getElementById('dupontEM'),
            dupontValueNPM: document.getElementById('dupontValueNPM'), dupontValueAT: document.getElementById('dupontValueAT'),
            dupontValueEM: document.getElementById('dupontValueEM'), dupontValueROE: document.getElementById('dupontValueROE'), dupontInterpretation: document.getElementById('dupontInterpretation'),
            verticalDataWarning: document.getElementById('verticalDataWarning'), verticalResultsContainer: document.getElementById('verticalResultsContainer'),
            verticalBSTable: document.getElementById('verticalBSTable'), verticalISTable: document.getElementById('verticalISTable'),
            zscoreDataWarning: document.getElementById('zscoreDataWarning'), zscoreResultsContainer: document.getElementById('zscoreResultsContainer'),
            zscoreValue: document.getElementById('zscoreValue'), zscoreInterpretation: document.getElementById('zscoreInterpretation'),
            zscoreFactorsList: document.getElementById('zscoreFactorsList'),
            cfDataWarning: document.getElementById('cfDataWarning'), cfResultsContainer: document.getElementById('cfResultsContainer'),
            cfStatementTableBody: document.getElementById('cfStatementTableBody'), 
            cfValueOCFRatio: document.getElementById('cfValueOCFRatio'), cfValueFCF: document.getElementById('cfValueFCF'),
            cfInterpretation: document.getElementById('cfInterpretation'),
            waccInput: document.getElementById('waccInput'), taxRateInput: document.getElementById('taxRateInput'), calculateEVA: document.getElementById('calculateEVA'), evaDataWarning: document.getElementById('evaDataWarning'), evaResultsContainer: document.getElementById('evaResultsContainer'), evaValue: document.getElementById('evaValue'), evaInterpretation: document.getElementById('evaInterpretation'), evaValueNOPAT: document.getElementById('evaValueNOPAT'), evaValueInvestedCapital: document.getElementById('evaValueInvestedCapital'), evaValueCapitalCharge: document.getElementById('evaValueCapitalCharge'),

            // *** مُضاف: عناصر UI للتبويبات الجديدة ***
            horizontalDataWarning: document.getElementById('horizontalDataWarning'), horizontalResultsContainer: document.getElementById('horizontalResultsContainer'), horizontalISTable: document.getElementById('horizontalISTable'), horizontalBSTable: document.getElementById('horizontalBSTable'),
            cccDataWarning: document.getElementById('cccDataWarning'), cccResultsContainer: document.getElementById('cccResultsContainer'), cccValue: document.getElementById('cccValue'), cccInterpretation: document.getElementById('cccInterpretation'), cccValueDSO: document.getElementById('cccValueDSO'), cccValueDIO: document.getElementById('cccValueDIO'), cccValueDPO: document.getElementById('cccValueDPO'),
            scenarioFixedCostsChange: document.getElementById('scenarioFixedCostsChange'), scenarioVariableCostChange: document.getElementById('scenarioVariableCostChange'), scenarioSellingPriceChange: document.getElementById('scenarioSellingPriceChange'), runScenario: document.getElementById('runScenario'), scenarioBaseCaseInfo: document.getElementById('scenarioBaseCaseInfo'), scenarioBaseBEPUnits: document.getElementById('scenarioBaseBEPUnits'), scenarioNewBEPUnits: document.getElementById('scenarioNewBEPUnits'), scenarioChangeBEPUnits: document.getElementById('scenarioChangeBEPUnits'), scenarioBaseBEPValue: document.getElementById('scenarioBaseBEPValue'), scenarioNewBEPValue: document.getElementById('scenarioNewBEPValue'), scenarioChangeBEPValue: document.getElementById('scenarioChangeBEPValue')
        };
        
        const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
        const formatPercent = (value, digits = 1) => isFinite(value) && !isNaN(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
        const formatRatio = (value, digits = 2) => isFinite(value) && !isNaN(value) ? value.toFixed(digits) : "N/A";
        const formatNumber = (value, digits = 0) => isFinite(value) && !isNaN(value) ? value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "N/A";
        // *** مُضاف: دالة مساعدة لتنسيق نسبة التغير ***
        const formatChangePercent = (newValue, baseValue) => {
            if (!isFinite(newValue) || !isFinite(baseValue) || baseValue === 0) return "N/A";
            const change = ((newValue - baseValue) / Math.abs(baseValue));
            // Show + sign for positive changes
            const sign = change > 0 ? '+' : '';
            return sign + formatPercent(change);
        };

        // ==============================================
        // === FINANCIAL CALCULATIONS (*** مُعدل ***) ===
        // ==============================================

        // *** مُعدل: الدالة الآن تقبل اسم المفتاح للبيانات الخام واسم الحالة لتخزين النتائج ***
        // *** ومكان لتخزين البيانات الخام إذا لزم الأمر ***
        const calculateFinancials = (rawDataKey = 'trialData', stateKey = 'financials', rawDataTargetKey = null) => {
            const financialsTarget = {}; // Start with empty object
            const tempRawData = { bsItems: [], isItems: [] }; // Temporary storage for raw items
            let hasData = false;
            let trialData;
            try {
                const rawDataString = localStorage.getItem(rawDataKey);
                if (!rawDataString) { console.warn(`localStorage '${rawDataKey}' is missing.`); return false; }
                trialData = JSON.parse(rawDataString);
                if (!Array.isArray(trialData) || trialData.length === 0 || (trialData.length === 1 && !trialData[0].Account && !toNum(trialData[0].Debit) && !toNum(trialData[0].Credit))) {
                    console.warn(`Parsed '${rawDataKey}' is empty or invalid.`); return false;
                }
            } catch (e) { console.error(`Error parsing '${rawDataKey}':`, e); return false; }

            try {
                // *** مُضاف: purchases, accountsPayable لحساب CCC ***
                const f = { assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0, netProfit: 0, grossProfit: 0, currentAssets: 0, inventory: 0, currentLiabilities: 0, retainedEarnings: 0, interestExpense: 0, taxExpense: 0, depreciationAmortization: 0, ppeNet: 0, longTermDebt: 0, shortTermDebt: 0, cashEquivalents: 0, accountsReceivable: 0, accountsPayable: 0, purchases: 0, ebit: 0, workingCapital: 0, ocf_estimated: 0, capex_estimated: 0, icf_estimated: 0, fcf_estimated: 0, netCashChange_estimated: 0, freeCashFlow_estimated: 0 };
                trialData.forEach(row => {
                    const value = (toNum(row.Debit)) - (toNum(row.Credit));
                    const mainType = row.MainType || '';
                    const subType = row.SubType || '';
                    const accountName = (row.Account || '').toLowerCase();
                    // *** مُعدل: تخزين القيمة الخام للتحليل الأفقي ***
                    const rawItem = { account: row.Account || 'N/A', value: 0, mainType: mainType, subType: subType, rawValue: value };

                    if (mainType.includes('الأصول') || mainType.includes('Assets')) {
                        f.assets += value; rawItem.value = value; tempRawData.bsItems.push(rawItem);
                        if (subType.includes('متداول') || subType.includes('Current')) {
                            f.currentAssets += value;
                            if (subType.includes('المخزون') || subType.includes('Inventory') || accountName.includes('inventory') || accountName.includes('مخزون')) { f.inventory += value; }
                            if (subType.includes('النقد') || subType.includes('Cash') || accountName.includes('cash') || accountName.includes('نقد')) { f.cashEquivalents += value; }
                            if (subType.includes('عملاء') || subType.includes('Receivables') || accountName.includes('receivable') || accountName.includes('عملاء')) { f.accountsReceivable += value; }
                        } else if (subType.includes('غير متداول') || subType.includes('Non-current') || subType.includes('ثابتة') || subType.includes('fixed')) {
                            if (accountName.includes('ppe') || accountName.includes('fixed asset') || accountName.includes('أصول ثابتة')) f.ppeNet += value;
                        }
                    } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) {
                        f.liabilities -= value; rawItem.value = -value; tempRawData.bsItems.push(rawItem);
                        if (subType.includes('متداول') || subType.includes('Current')) {
                            f.currentLiabilities -= value;
                            if (subType.includes('قروض قصيرة') || subType.includes('Short-term Loans') || accountName.includes('short term debt') || accountName.includes('قرض قصير')) f.shortTermDebt -= value;
                             // *** مُضاف: منطق حساب الموردين ***
                             if (subType.includes('موردين') || subType.includes('Payables') || accountName.includes('payable') || accountName.includes('مورد')) { f.accountsPayable -= value; }
                        } else if (subType.includes('غير متداول') || subType.includes('Non-current')) {
                            if (subType.includes('قروض طويلة') || subType.includes('Long-term Loans') || accountName.includes('long term debt') || accountName.includes('قرض طويل')) f.longTermDebt -= value;
                        }
                    } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) {
                        f.equity -= value; rawItem.value = -value; tempRawData.bsItems.push(rawItem);
                        if (subType.includes('الأرباح المحتجزة') || subType.includes('Retained Earnings') || accountName.includes('retained earnings') || accountName.includes('أرباح محتجزة')) f.retainedEarnings -= value;
                    } else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) {
                        rawItem.mainType = 'Income Statement';
                        if (subType.includes('الإيرادات') || subType.includes('Revenue')) { f.revenue -= value; rawItem.value = -value; tempRawData.isItems.push(rawItem); }
                        else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) { f.cogs += value; rawItem.value = value; tempRawData.isItems.push(rawItem); }
                          // *** مُضاف: تقدير المشتريات (إذا لم تكن موجودة بشكل صريح) ***
                          else if (subType.includes('مشتريات') || subType.includes('Purchases') || accountName.includes('purchase')) { f.purchases += value; rawItem.value = value; tempRawData.isItems.push(rawItem); }
                        else {
                            f.expenses += value; rawItem.value = value; tempRawData.isItems.push(rawItem);
                            if (subType.includes('فائدة') || subType.includes('Interest') || accountName.includes('interest')) f.interestExpense += value;
                            if (subType.includes('ضريبية') || subType.includes('Tax') || accountName.includes('tax')) f.taxExpense += value;
                            if (subType.includes('إهلاك') || subType.includes('Depreciation') || accountName.includes('depreciation') || accountName.includes('amortization') || accountName.includes('إهلاك') || accountName.includes('استهلاك')) f.depreciationAmortization += value;
                        }
                    }
                });
                Object.keys(f).forEach(key => f[key] = f[key] || 0);

                // *** مُضاف: تقدير المشتريات إذا لم تكن موجودة ***
                // Note: Simplified estimate. Better: COGS + End Inv - Start Inv (requires previous inv).
                if (f.purchases === 0 && f.cogs !== 0) {
                     f.purchases = f.cogs; // Simplistic assumption
                     console.warn("Purchases not found, estimated using COGS for CCC calculation.");
                }

                f.grossProfit = f.revenue - f.cogs;
                f.netProfit = f.grossProfit - f.expenses;
                f.ebit = f.netProfit + f.interestExpense + f.taxExpense;
                f.workingCapital = f.currentAssets - f.currentLiabilities;
                f.ocf_estimated = f.netProfit + f.depreciationAmortization;
                f.capex_estimated = f.depreciationAmortization; 
                f.icf_estimated = -f.capex_estimated;
                f.fcf_estimated = 0; 
                f.netCashChange_estimated = f.ocf_estimated + f.icf_estimated + f.fcf_estimated;
                f.freeCashFlow_estimated = f.ocf_estimated - f.capex_estimated;
                const balanceCheck = f.assets - (f.liabilities + f.equity + f.netProfit);
                if (Math.abs(balanceCheck) > 1) console.warn(`Balance sheet check failed for ${stateKey}... Diff: ${balanceCheck.toFixed(2)}`);
                
                // Store calculated financials in the designated state key
                state[stateKey] = f; 
                hasData = true;

                // *** مُعدل: تخزين البيانات الخام فقط إذا تم تحديد مفتاح لها ***
                if (rawDataTargetKey) {
                    state[rawDataTargetKey] = tempRawData;
                }

                 // Update flags based on which period was calculated
                if (stateKey === 'financials') state.hasValidData = true;
                if (stateKey === 'financialsPrevious') state.hasPreviousData = true;

                console.log(`Calculated Financials for ${stateKey}:`, f); 
                return true;
            } catch (e) { 
            console.error(`Error during financial calculations for ${stateKey}:`, e); 
            state[stateKey] = {}; // Reset on error
            if (stateKey === 'financials') state.hasValidData = false;
            if (stateKey === 'financialsPrevious') state.hasPreviousData = false;
            if (rawDataTargetKey) state[rawDataTargetKey] = { bsItems: [], isItems: [] }; // Clear raw data too
            return false; 
        }
        };
        
        // *** مُعدل: تم إعادة دمج حسابات CCC ***
        const calculateAllRatios = () => {
            state.ratios = {}; 
            if (!state.hasValidData) { console.warn("Financials invalid, skipping ratio calculation."); return false; } 
            const f = state.financials; 
            const fPrev = state.financialsPrevious; // Get previous financials
            const hasPrev = state.hasPreviousData; // Check if previous data exists

            try { 
                const assets = f.assets || 0; 
                const equity = f.equity || 0; 
                const liabilities = f.liabilities || 0; 
                const revenue = f.revenue || 0; 
                const cogs = f.cogs || 0;
                const purchases = f.purchases || 0; // Uses estimated value if actual is 0
                const roeStandard = (equity !== 0) ? f.netProfit / equity : Infinity;
                
                const x1 = assets !== 0 ? f.workingCapital / assets : Infinity; 
                const x2 = assets !== 0 ? f.retainedEarnings / assets : Infinity; 
                const x3 = assets !== 0 ? f.ebit / assets : Infinity; 
                const x4 = liabilities !== 0 ? equity / liabilities : Infinity; 
                const x5 = assets !== 0 ? revenue / assets : 0; 
                const zScore = (isFinite(x1) && isFinite(x2) && isFinite(x3) && isFinite(x4) && isFinite(x5)) ? (0.717 * x1) + (0.847 * x2) + (3.107 * x3) + (0.420 * x4) + (0.998 * x5) : NaN; 
                
                const currentRatio = f.currentLiabilities !== 0 ? f.currentAssets / f.currentLiabilities : Infinity;
                const quickRatio = f.currentLiabilities !== 0 ? (f.currentAssets - f.inventory) / f.currentLiabilities : Infinity;
                const netWorkingCapital = f.workingCapital; 
                const cashRatio = f.currentLiabilities !== 0 ? f.cashEquivalents / f.currentLiabilities : Infinity;

                // *** مُعدل: استخدام المتوسطات إذا كانت بيانات الفترة السابقة متاحة ***
                const avgInventory = hasPrev ? (f.inventory + fPrev.inventory) / 2 : f.inventory;
                const avgReceivables = hasPrev ? (f.accountsReceivable + fPrev.accountsReceivable) / 2 : f.accountsReceivable;
                const avgPayables = hasPrev ? (f.accountsPayable + fPrev.accountsPayable) / 2 : f.accountsPayable;
                // Use average assets/equity for ROA/ROE/Leverage if previous data available
                const avgAssets = hasPrev ? (f.assets + fPrev.assets) / 2 : assets;
                const avgEquity = hasPrev ? (f.equity + fPrev.equity) / 2 : equity;


                const inventoryTurnover = avgInventory > 0 && cogs > 0 ? cogs / avgInventory : (f.inventory > 0 && cogs > 0 ? cogs / f.inventory : Infinity);
                const assetTurnover = avgAssets > 0 ? revenue / avgAssets : (assets > 0 ? revenue / assets : 0); // Use average if possible
                const receivablesTurnover = avgReceivables > 0 ? revenue / avgReceivables : (f.accountsReceivable > 0 ? revenue / f.accountsReceivable : Infinity); 
                const avgCollectionPeriod = isFinite(receivablesTurnover) && receivablesTurnover !== 0 ? 365 / receivablesTurnover : Infinity; // DSO
                
                // *** مُضاف: حسابات CCC مع المتوسطات ***
                const daysInventoryOutstanding = isFinite(inventoryTurnover) && inventoryTurnover !== 0 ? 365 / inventoryTurnover : Infinity; // DIO
                // Use COGS as proxy for purchases if purchases is 0 or unavailable
                const costOfSalesForDPO = purchases > 0 ? purchases : cogs;
                const daysPayablesOutstanding = avgPayables > 0 && costOfSalesForDPO > 0 ? (avgPayables / costOfSalesForDPO) * 365 : (f.accountsPayable > 0 && costOfSalesForDPO > 0 ? (f.accountsPayable / costOfSalesForDPO) * 365 : Infinity) ; // DPO
                const cashConversionCycle = (isFinite(avgCollectionPeriod) && isFinite(daysInventoryOutstanding) && isFinite(daysPayablesOutstanding)) ? 
                                            avgCollectionPeriod + daysInventoryOutstanding - daysPayablesOutstanding : Infinity; // CCC = DSO + DIO - DPO

                const debtToAssets = avgAssets > 0 ? liabilities / avgAssets : (assets > 0 ? liabilities / assets : Infinity); // Use average if possible
                const debtToEquity = avgEquity > 0 ? liabilities / avgEquity : (equity > 0 ? liabilities / equity : Infinity); // Use average if possible
                const interestCoverageRatio = f.interestExpense !== 0 ? f.ebit / f.interestExpense : Infinity;
                const financialLeverage = (avgEquity !== 0 && avgAssets !== 0) ? avgAssets / avgEquity : ((equity !== 0 && assets !== 0) ? assets / equity : Infinity); // Use average if possible
                
                const grossProfitMargin = revenue !== 0 ? f.grossProfit / revenue : 0;
                const netProfitMargin = revenue !== 0 ? f.netProfit / revenue : 0;
                const roa = avgAssets > 0 ? f.netProfit / avgAssets : (assets > 0 ? f.netProfit / assets : 0); // Use average if possible
                const roe = avgEquity > 0 ? f.netProfit / avgEquity : roeStandard; // Use average if possible

                const externalInputs = { numberOfShares: 0, marketPricePerShare: 0, totalDividends: 0 };
                const eps = externalInputs.numberOfShares !== 0 ? f.netProfit / externalInputs.numberOfShares : NaN;
                const bookValuePerShare = externalInputs.numberOfShares !== 0 ? equity / externalInputs.numberOfShares : NaN; // Use ending equity for BVPS
                const dividendsPerShare = externalInputs.numberOfShares !== 0 ? externalInputs.totalDividends / externalInputs.numberOfShares : NaN;
                const peRatio = isFinite(eps) && eps !== 0 ? externalInputs.marketPricePerShare / eps : NaN;
                const pbRatio = isFinite(bookValuePerShare) && bookValuePerShare !== 0 ? externalInputs.marketPricePerShare / bookValuePerShare : NaN;
                const dividendYield = externalInputs.marketPricePerShare !== 0 ? dividendsPerShare / externalInputs.marketPricePerShare : NaN;
                const payoutRatio = f.netProfit > 0 ? externalInputs.totalDividends / f.netProfit : NaN;

                state.ratios = { 
                    currentRatio, quickRatio, netWorkingCapital, cashRatio,
                    inventoryTurnover, assetTurnover, receivablesTurnover, avgCollectionPeriod, // DSO
                    daysInventoryOutstanding, // DIO
                    daysPayablesOutstanding, // DPO
                    cashConversionCycle, // CCC
                    debtToAssets, debtToEquity, interestCoverageRatio, financialLeverage, 
                    grossProfitMargin, netProfitMargin, roa, roe, eps, 
                    peRatio, pbRatio, dividendYield, payoutRatio,
                    zScoreX1: x1, zScoreX2: x2, zScoreX3: x3, zScoreX4: x4, zScoreX5: x5, zScore: zScore, 
                    equityMultiplier: financialLeverage, // Use calculated leverage
                    operatingCashFlowRatio: f.currentLiabilities !== 0 ? f.ocf_estimated / f.currentLiabilities : Infinity, 
                    freeCashFlow: f.freeCashFlow_estimated 
                }; 
                console.log("Calculated Ratios (Full Set with CCC):", state.ratios); return true; 
            } catch(e) { 
                console.error("Error calculating ratios:", e); 
                state.ratios = {}; state.hasValidData = false; return false; 
            }
        };

        // ==============================================
        // === RENDERING FUNCTIONS (*** Existing + Added ***) ===
        // ==============================================
        
        const getRatioComment = (key, value) => { /* ... (Code from previous working version) ... */
          if (!isFinite(value) && isNaN(value)) return "N/A"; 
          if (isNaN(value)) {
              if (['eps', 'peRatio', 'pbRatio', 'dividendYield', 'payoutRatio'].includes(key)) { return t_page('externalDataWarning'); }
          }
          if (key === 'currentRatio') { if (value >= 2) return t_page('currentRatio_comment_high'); if (value >= 1) return t_page('currentRatio_comment_good'); return t_page('currentRatio_comment_low'); } 
          if (key === 'quickRatio') { if (value >= 1) return t_page('quickRatio_comment_good'); return t_page('quickRatio_comment_low'); } 
          if (key === 'netWorkingCapital') { return value > 0 ? t_page('netWorkingCapital_comment_positive') : t_page('netWorkingCapital_comment_negative'); }
          if (key === 'cashRatio') { return value >= 0.4 ? t_page('cashRatio_comment_good') : t_page('cashRatio_comment_low'); }
          if (key === 'inventoryTurnover') { return value >= 8 ? t_page('inventoryTurnover_comment_high') : t_page('inventoryTurnover_comment_low'); }
          if (key === 'assetTurnover') { return value >= 1 ? t_page('assetTurnover_comment_high') : t_page('assetTurnover_comment_low'); }
          if (key === 'receivablesTurnover') { return value >= 10 ? t_page('receivablesTurnover_comment_high') : t_page('receivablesTurnover_comment_low'); }
          if (key === 'avgCollectionPeriod') { return value <= 45 ? t_page('avgCollectionPeriod_comment_low') : t_page('avgCollectionPeriod_comment_high'); }
          if (key === 'debtToEquity') { if (value < 0.5) return t_page('debtToEquity_comment_low'); if (value <= 1.5) return t_page('debtToEquity_comment_good'); return t_page('debtToEquity_comment_high'); } 
          if (key === 'debtToAssets') { return value < 0.4 ? t_page('debtToAssets_comment_low') : t_page('debtToAssets_comment_high'); } 
          if (key === 'interestCoverageRatio') { return value >= 3 ? t_page('interestCoverageRatio_comment_safe') : t_page('interestCoverageRatio_comment_risk'); }
          if (key === 'financialLeverage') { return value > 2.5 ? t_page('financialLeverage_comment_high') : t_page('financialLeverage_comment_low'); }
          if (key === 'netProfitMargin') { if (value >= 0.15) return t_page('netProfitMargin_comment_high'); if (value > 0) return t_page('netProfitMargin_comment_avg'); return t_page('netProfitMargin_comment_low'); } 
          if (key === 'grossProfitMargin') { return value >= 0.4 ? t_page('grossProfitMargin_comment_high') : t_page('grossProfitMargin_comment_low'); } 
          if (key === 'roa') { return value >= 0.05 ? t_page('roa_comment_high') : t_page('roa_comment_low'); } 
          if (key === 'roe') { return value >= 0.15 ? t_page('roe_comment_high') : t_page('roe_comment_low'); } 
          if (key === 'eps') { return value > 0 ? t_page('eps_comment_positive') : t_page('eps_comment_negative'); }
          if (key === 'peRatio') { return t_page('peRatio_comment'); }
          if (key === 'pbRatio') { return t_page('pbRatio_comment'); }
          if (key === 'dividendYield') { return t_page('dividendYield_comment'); }
          if (key === 'payoutRatio') { return t_page('payoutRatio_comment'); }
          return ""; 
      };
        
        const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => { /* ... (Code from previous working version, including CCC days formatting) ... */
          const container = document.getElementById(divId); 
          if (!container) { console.error(`Element not found: ${divId}`); return; } 
          if (!state.hasValidData) { container.innerHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <p class="text-muted">${t_page('noDataForRatios')}</p>`; return; } 
          let tableHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <div class="table-responsive"> <table class="table table-sm table-striped"> <thead><tr><th>${t_page('thRatio')}</th><th class="text-end">${t_page('thValue')}</th><th>${t_page('thComment')}</th></tr></thead> <tbody>`; 
          ratioKeys.forEach(key => { 
              const value = state.ratios[key]; 
              let formattedValue;
              if (key === 'netWorkingCapital') { formattedValue = formatNumber(value, 0); } 
              // *** Include CCC days formatting ***
              else if (['avgCollectionPeriod', 'daysInventoryOutstanding', 'daysPayablesOutstanding', 'cashConversionCycle'].includes(key)) { formattedValue = `${formatRatio(value, 0)} ${lang === 'ar' ? 'يوم' : 'Days'}`; } 
              else if (['grossProfitMargin', 'netProfitMargin', 'roa', 'roe', 'dividendYield', 'payoutRatio'].includes(key)) { formattedValue = formatPercent(value); } 
              else if (key === 'eps') { formattedValue = formatRatio(value, 2); } 
              else { formattedValue = formatRatio(value, 2); }
              if (isNaN(value) && ['eps', 'peRatio', 'pbRatio', 'dividendYield', 'payoutRatio'].includes(key)) { formattedValue = "N/A"; }
              const comment = getRatioComment(key, value); 
              tableHTML += `<tr> <td>${t_page(key)}</td> <td class="text-end"><strong>${formattedValue}</strong></td> <td class="text-muted small">${comment}</td> </tr>`; 
          }); 
          container.innerHTML = tableHTML + `</tbody></table></div>`; 
      };

        const renderSidebar = () => { /* ... (Code from previous working version) ... */
          if (!state.hasValidData) { UI.smartSummary.textContent = lang === 'ar' ? '...' : '...'; UI.alertsArea.innerHTML = `<div>${lang === 'ar' ? '...' : '...'}</div>`; return; } const { netProfitMargin, currentRatio, debtToEquity } = state.ratios; UI.smartSummary.textContent = netProfitMargin > 0 && currentRatio > 1.5 ? t_page('summary_ok') : t_page('summary_risk'); const alerts = []; if (currentRatio < 1 && isFinite(currentRatio)) alerts.push(t_page('alert_liquidity_risk')); if (debtToEquity > 2 && isFinite(debtToEquity)) alerts.push(t_page('alert_leverage_risk')); if (netProfitMargin < 0 && isFinite(netProfitMargin)) alerts.push(t_page('alert_profit_risk')); UI.alertsArea.innerHTML = alerts.length > 0 ? alerts.map(alert => `<div>${alert}</div>`).join('') : `<div>${t_page('alert_ok')}</div>`;
      };
      
        const calculateAndDisplayBreakeven = () => { /* ... (Code from previous version + state.baseBreakeven update) ... */
          const fixed = toNum(UI.fixedCosts.value); 
          const variable = toNum(UI.variableCost.value); 
          const price = toNum(UI.sellingPrice.value); 
          if (price <= 0 || variable < 0 || fixed < 0) { alert(t_page('errorPositiveValues')); return { units: NaN, value: NaN }; } 
          if (price <= variable) { alert(t_page('errorPrice')); return { units: NaN, value: NaN }; } 
          const contributionMargin = price - variable; 
          const bepUnits = fixed / contributionMargin; 
          const bepValue = bepUnits * price; 
          UI.bepUnitsResult.textContent = Math.ceil(bepUnits).toLocaleString(); 
          UI.bepValueResult.textContent = formatNumber(bepValue, 2); 
          UI.breakevenResults.style.display = 'block'; 
          renderBreakevenChart(fixed, variable, price, bepUnits); 
          // Store base values for scenario analysis
          state.baseBreakeven = { units: bepUnits, value: bepValue };
          return state.baseBreakeven;
       };
        const renderBreakevenChart = (fixed, variable, price, bepUnits) => { /* ... (Code from previous working version) ... */
          if (!UI.breakevenChartCanvas) return; if (state.breakevenChart) { state.breakevenChart.destroy(); } let maxUnits = 100; if (bepUnits > 0 && isFinite(bepUnits)) { maxUnits = Math.max(100, Math.ceil(bepUnits * 2 / 10) * 10); } else if (fixed === 0 && price > variable) { maxUnits = 100; } else if (price <= variable) { maxUnits = 100; } const step = maxUnits / 10; const labels = Array.from({ length: 11 }, (_, i) => Math.round(step * i)); const fixedCostsData = labels.map(() => fixed); const totalCostsData = labels.map(unit => fixed + (variable * unit)); const revenueData = labels.map(unit => price * unit); const ctx = UI.breakevenChartCanvas.getContext('2d'); state.breakevenChart = new Chart(ctx, { type: 'line', data: { labels: labels, datasets: [ { label: t_page('revenue'), data: revenueData, borderColor: 'rgba(75, 192, 192, 1)', fill: false, tension: 0.1 }, { label: t_page('totalCosts'), data: totalCostsData, borderColor: 'rgba(255, 99, 132, 1)', fill: false, tension: 0.1 }, { label: t_page('fixedCosts'), data: fixedCostsData, borderColor: 'rgba(255, 159, 64, 1)', borderDash: [5, 5], fill: false, tension: 0.1 } ] }, options: { responsive: true, maintainAspectRatio: false, interaction: { intersect: false, mode: 'index', }, scales: { x: { title: { display: true, text: t_page('unitsSold') } }, y: { title: { display: true, text: t_page('value') }, beginAtZero: true } }, plugins: { tooltip: { callbacks: { label: function(context) { return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`; } } } } } });
       };
        
        const calculateAndDisplayDupont = () => { /* ... (Code from previous working version) ... */
          console.log("[DEBUG] Attempting to calculate and display DuPont...");
          if (!state.hasValidData || !state.ratios.equityMultiplier) { // Check dependency
              console.warn("[DEBUG] No valid data for DuPont, showing warning.");
              if(UI.dupontDataWarning) { UI.dupontDataWarning.textContent = t_page('dupontDataWarning'); UI.dupontDataWarning.style.display = 'block'; }
              if(UI.dupontFormulaDisplay) UI.dupontFormulaDisplay.style.display = 'none';
              if(UI.dupontInterpretation) UI.dupontInterpretation.innerHTML = '';
              if(UI.dupontValueNPM) UI.dupontValueNPM.textContent = 'N/A'; if(UI.dupontValueAT) UI.dupontValueAT.textContent = 'N/A'; if(UI.dupontValueEM) UI.dupontValueEM.textContent = 'N/A'; if(UI.dupontValueROE) UI.dupontValueROE.textContent = 'N/A';
              return;
          }
          console.log("[DEBUG] Rendering DuPont with data...");
          if(UI.dupontDataWarning) UI.dupontDataWarning.style.display = 'none'; if(UI.dupontFormulaDisplay) UI.dupontFormulaDisplay.style.display = 'block';
          const npm = state.ratios.netProfitMargin; const at = state.ratios.assetTurnover; const em = state.ratios.equityMultiplier;
          const dupontROE = (isFinite(npm) && isFinite(at) && isFinite(em)) ? npm * at * em : Infinity;
          if(UI.dupontROE) UI.dupontROE.textContent = formatPercent(dupontROE); if(UI.dupontNPM) UI.dupontNPM.textContent = formatPercent(npm); if(UI.dupontAT) UI.dupontAT.textContent = formatRatio(at); if(UI.dupontEM) UI.dupontEM.textContent = formatRatio(em);
          if(UI.dupontValueNPM) UI.dupontValueNPM.textContent = formatPercent(npm); if(UI.dupontValueAT) UI.dupontValueAT.textContent = formatRatio(at); if(UI.dupontValueEM) UI.dupontValueEM.textContent = formatRatio(em); if(UI.dupontValueROE) UI.dupontValueROE.textContent = formatPercent(dupontROE);
          let interpretation = '';
          if (isFinite(dupontROE)) {
              const highROE = dupontROE >= 0.15; interpretation += highROE ? `<p>${t_page('dupontInterpretationHighROE')}</p><ul>` : `<p>${t_page('dupontInterpretationLowROE')}</p><ul>`;
              if (isFinite(npm)) { if (npm >= 0.10) interpretation += `<li>${t_page('dupontFactorProfitability')}</li>`; else if (npm < 0.05) interpretation += `<li>${t_page('dupontFactorLowProfitability')}</li>`; }
              if (isFinite(at)) { if (at >= 1.0) interpretation += `<li>${t_page('dupontFactorEfficiency')}</li>`; else if (at < 0.5) interpretation += `<li>${t_page('dupontFactorLowEfficiency')}</li>`; }
              if (isFinite(em)) { if (em > 2.5) interpretation += `<li>${t_page('dupontFactorLeverage')}</li>`; else if (em < 1.5) interpretation += `<li>${t_page('dupontFactorLowLeverage')}</li>`; }
              interpretation += `</ul>`; 
              if (interpretation.endsWith('<ul></ul>')) { interpretation = `<p>${lang === 'ar' ? 'العوامل متوازنة...' : 'Factors appear balanced...'}</p>`; } 
          } else { 
              interpretation = `<p class="text-danger">${lang === 'ar' ? 'لا يمكن حساب التفسير...' : 'Interpretation cannot be calculated...'}</p>`; 
          } 
          if(UI.dupontInterpretation) UI.dupontInterpretation.innerHTML = interpretation;
          console.log("[DEBUG] Finished displaying DuPont.");
      };
        
        const calculateAndDisplayVerticalAnalysis = () => { /* ... (Code from previous working version) ... */
          if (!state.hasValidData || !state.rawData || (!state.rawData.bsItems.length && !state.rawData.isItems.length)) { if(UI.verticalDataWarning) { UI.verticalDataWarning.textContent = t_page('verticalDataWarning'); UI.verticalDataWarning.style.display = 'block'; } if(UI.verticalResultsContainer) UI.verticalResultsContainer.style.display = 'none'; return; } if(UI.verticalDataWarning) UI.verticalDataWarning.style.display = 'none'; if(UI.verticalResultsContainer) UI.verticalResultsContainer.style.display = 'block'; const totalAssets = state.financials.assets || 0; const totalRevenue = state.financials.revenue || 0; let bsTableHTML = `<table class="table table-sm table-striped"><thead><tr><th>${t_page('verticalAccount')}</th><th class="text-end">${t_page('verticalValue')}</th><th class="text-end">${t_page('verticalPercent')}</th></tr></thead><tbody>`; state.rawData.bsItems.sort((a,b) => (b.value || 0) - (a.value || 0)).forEach(item => { const percentage = totalAssets !== 0 ? ((item.value || 0) / totalAssets) : 0; bsTableHTML += `<tr><td>${item.account}</td><td class="text-end">${formatNumber(item.value || 0)}</td><td class="text-end">${formatPercent(percentage)}</td></tr>`; }); bsTableHTML += `<tr class="table-light fw-bold"><td>${lang === 'ar' ? 'الإجمالي' : 'Total'}</td><td class="text-end">${formatNumber(totalAssets)}</td><td class="text-end">100.0%</td></tr>`; bsTableHTML += `</tbody></table>`; if(UI.verticalBSTable) UI.verticalBSTable.innerHTML = bsTableHTML; let isTableHTML = `<table class="table table-sm table-striped"><thead><tr><th>${t_page('verticalAccount')}</th><th class="text-end">${t_page('verticalValue')}</th><th class="text-end">${t_page('verticalPercent')}</th></tr></thead><tbody>`; state.rawData.isItems.sort((a,b) => (b.value || 0) - (a.value || 0)).forEach(item => { const itemValue = item.value || 0; const percentage = totalRevenue !== 0 ? (itemValue / totalRevenue) : 0; const displayValue = (item.mainType === 'Income Statement' && (item.subType.includes('الإيرادات') || item.subType.includes('Revenue'))) ? Math.abs(itemValue) : itemValue; isTableHTML += `<tr><td>${item.account}</td><td class="text-end">${formatNumber(displayValue)}</td><td class="text-end">${formatPercent(Math.abs(percentage))}</td></tr>`; }); isTableHTML += `<tr class="table-light fw-bold"><td>${lang === 'ar' ? 'صافي الإيرادات' : 'Net Revenue'}</td><td class="text-end">${formatNumber(totalRevenue)}</td><td class="text-end">100.0%</td></tr>`; isTableHTML += `</tbody></table>`; if(UI.verticalISTable) UI.verticalISTable.innerHTML = isTableHTML;
      };
        const calculateAndDisplayZScore = () => { /* ... (Code from previous working version) ... */
          if (!state.hasValidData || !isFinite(state.ratios.zScore)) { if(UI.zscoreDataWarning) { UI.zscoreDataWarning.textContent = t_page('zscoreDataWarning'); UI.zscoreDataWarning.style.display = 'block'; } if(UI.zscoreResultsContainer) UI.zscoreResultsContainer.style.display = 'none'; return; } if(UI.zscoreDataWarning) UI.zscoreDataWarning.style.display = 'none'; if(UI.zscoreResultsContainer) UI.zscoreResultsContainer.style.display = 'block'; const z = state.ratios.zScore; let interpretation = ''; let interpretationClass = ''; if (z > 2.9) { interpretation = t_page('zscoreZoneSafe'); interpretationClass = 'text-success'; } else if (z > 1.23) { interpretation = t_page('zscoreZoneGrey'); interpretationClass = 'text-warning'; } else { interpretation = t_page('zscoreZoneDistress'); interpretationClass = 'text-danger'; } if(UI.zscoreValue) UI.zscoreValue.textContent = formatRatio(z, 3); if(UI.zscoreInterpretation) { UI.zscoreInterpretation.textContent = interpretation; UI.zscoreInterpretation.className = `h5 fw-bold ${interpretationClass}`; } let factorsHTML = ''; const factors = ['zScoreX1', 'zScoreX2', 'zScoreX3', 'zScoreX4', 'zScoreX5']; factors.forEach(key => { const value = state.ratios[key]; let label = t_page(key.replace('zScore', 'zscore')); if (key === 'zScoreX2' && state.financials.retainedEarnings === 0 && !isFinite(value)) { label += ` <small class="text-muted">${t_page('zscoreRetainedEarningsNotFound')}</small>`; } factorsHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">${label} <span class="badge bg-secondary rounded-pill">${formatRatio(value)}</span></li>`; }); if(UI.zscoreFactorsList) UI.zscoreFactorsList.innerHTML = factorsHTML;
      };
        const calculateAndDisplayCashFlowAnalysis = () => { /* ... (Code from previous working version) ... */
          if (!state.hasValidData) { if(UI.cfDataWarning) { UI.cfDataWarning.textContent = t_page('cfDataWarning'); UI.cfDataWarning.style.display = 'block'; } if(UI.cfResultsContainer) UI.cfResultsContainer.style.display = 'none'; return; } if(UI.cfDataWarning) UI.cfDataWarning.style.display = 'none'; if(UI.cfResultsContainer) UI.cfResultsContainer.style.display = 'block'; const f = state.financials; const r = state.ratios; let stmtHTML = ` <tr><td>${t_page('cfNetIncome')}</td><td class="text-end">${formatNumber(f.netProfit)}</td></tr> <tr><td class="ps-3">${t_page('cfDepreciationAmortization')}</td><td class="text-end">${formatNumber(f.depreciationAmortization)}</td></tr> <tr><td class="text-muted ps-3">${t_page('cfChangesWC')}</td><td class="text-end text-muted">(N/A)</td></tr> <tr class="table-light fw-bold"><td>${t_page('cfOperating')}</td><td class="text-end">${formatNumber(f.ocf_estimated)}</td></tr> <tr><td>${t_page('cfInvesting')}</td><td class="text-end">${formatNumber(f.icf_estimated)}</td></tr> <tr><td>${t_page('cfFinancing')}</td><td class="text-end">${formatNumber(f.fcf_estimated)}</td></tr> <tr class="table-light fw-bold border-top"><td>${t_page('cfNetChange')}</td><td class="text-end">${formatNumber(f.netCashChange_estimated)}</td></tr> `; if(UI.cfStatementTableBody) UI.cfStatementTableBody.innerHTML = stmtHTML; if(UI.cfValueOCFRatio) UI.cfValueOCFRatio.textContent = formatRatio(r.operatingCashFlowRatio); if(UI.cfValueFCF) UI.cfValueFCF.textContent = formatNumber(r.freeCashFlow); let interpretation = ''; if (isFinite(f.ocf_estimated)) { interpretation += f.ocf_estimated > 0 ? `<p>${t_page('cfInterpretationPositiveOCF')}</p>` : `<p>${t_page('cfInterpretationNegativeOCF')}</p>`; } if (isFinite(r.freeCashFlow)) { interpretation += `<p>${t_page('cfInterpretationFCF')}</p>`; } if(UI.cfInterpretation) UI.cfInterpretation.innerHTML = interpretation || `<p class="text-muted">${lang==='ar'?'...':'...'}</p>`;
      };
        const calculateAndDisplayEVA = () => { /* ... (Code from previous working version) ... */
          console.log("[DEBUG] Attempting to calculate and display EVA...");
          if (!state.hasValidData || !isFinite(state.financials.ebit)) {
              console.warn("[DEBUG] No valid data for EVA, showing warning.");
              if(UI.evaDataWarning) { UI.evaDataWarning.textContent = t_page('evaDataWarning'); UI.evaDataWarning.style.display = 'block'; }
              if(UI.evaResultsContainer) UI.evaResultsContainer.style.display = 'none';
              return;
          }
          if(UI.evaDataWarning) UI.evaDataWarning.style.display = 'none';
          if(UI.evaResultsContainer) UI.evaResultsContainer.style.display = 'block';
          const f = state.financials;
          const wacc = toNum(UI.waccInput.value) / 100.0;
          const taxRate = toNum(UI.taxRateInput.value) / 100.0;
          if (wacc <= 0 || taxRate < 0) {
              alert(t_page('errorPositiveValues'));
              return;
          }
          const nopat = f.ebit * (1 - taxRate);
          const nonInterestBearingCL = f.currentLiabilities - f.shortTermDebt;
          const investedCapital = f.assets - nonInterestBearingCL; // Approximation
          const capitalCharge = investedCapital * wacc;
          const eva = nopat - capitalCharge;
          if(UI.evaValue) UI.evaValue.textContent = formatNumber(eva, 0);
          if(UI.evaValueNOPAT) UI.evaValueNOPAT.textContent = formatNumber(nopat, 0);
          if(UI.evaValueInvestedCapital) UI.evaValueInvestedCapital.textContent = formatNumber(investedCapital, 0);
          if(UI.evaValueCapitalCharge) UI.evaValueCapitalCharge.textContent = formatNumber(capitalCharge, 0);
          if(UI.evaInterpretation) {
              if (eva > 0) {
                  UI.evaInterpretation.textContent = t_page('evaInterpretationPositive');
                  UI.evaInterpretation.className = 'h5 fw-bold text-success';
                  UI.evaValue.className = 'display-4 fw-bold text-success';
              } else {
                  UI.evaInterpretation.textContent = t_page('evaInterpretationNegative');
                  UI.evaInterpretation.className = 'h5 fw-bold text-danger';
                  UI.evaValue.className = 'display-4 fw-bold text-danger';
              }
          }
          console.log("[DEBUG] Finished displaying EVA.");
      };

        // *** مُضاف: دالة لعرض التحليل الأفقي ***
        const calculateAndDisplayHorizontal = () => {
            console.log("[DEBUG] Attempting to display Horizontal Analysis...");
            if (!state.hasValidData || !state.hasPreviousData) {
                if(UI.horizontalDataWarning) { UI.horizontalDataWarning.textContent = t_page('horizontalDataWarning'); UI.horizontalDataWarning.style.display = 'block'; }
                if(UI.horizontalResultsContainer) UI.horizontalResultsContainer.style.display = 'none';
                console.warn("[DEBUG] Insufficient data for Horizontal Analysis.");
                return;
            }
             if(UI.horizontalDataWarning) UI.horizontalDataWarning.style.display = 'none';
             if(UI.horizontalResultsContainer) UI.horizontalResultsContainer.style.display = 'block';

             // Function to generate table rows comparing raw items
             const generateHorizontalRows = (itemsCurrent, itemsPrev, category) => {
                 let rowsHTML = '';
                 const prevItemsMap = new Map(itemsPrev.map(item => [item.account, item.rawValue])); // Map previous raw values by account name

                 itemsCurrent.forEach(itemCurr => {
                     const prevValue = prevItemsMap.get(itemCurr.account) || 0; // Find corresponding previous value
                     const currValue = itemCurr.rawValue; // Use raw debit/credit diff for comparison
                     const changeAbs = currValue - prevValue;
                     const changePct = (prevValue !== 0) ? (changeAbs / Math.abs(prevValue)) : (currValue !== 0 ? Infinity : 0);

                     // Determine display values (positive for assets/expenses, negative converted to positive for liabilities/equity/revenue)
                     let displayCurr = itemCurr.value; // Use the calculated balance value for display
                     let displayPrev = 0;
                     const prevRawItem = itemsPrev.find(item => item.account === itemCurr.account);
                     if (prevRawItem) {
                         displayPrev = prevRawItem.value; // Use the calculated balance value for display
                     }


                     // Adjust changeAbs to reflect change in displayed positive values
                     const displayChangeAbs = displayCurr - displayPrev;

                     rowsHTML += `<tr>
                         <td>${itemCurr.account}</td>
                         <td class="text-end">${formatNumber(displayCurr)}</td>
                         <td class="text-end">${formatNumber(displayPrev)}</td>
                         <td class="text-end">${formatNumber(displayChangeAbs)}</td>
                         <td class="text-end ${displayChangeAbs > 0 ? 'text-success' : (displayChangeAbs < 0 ? 'text-danger' : '')}">${formatPercent(changePct)}</td>
                     </tr>`;
                 });
                 return rowsHTML;
             };

            // Generate IS Table using rawData and rawDataPrevious
            let isTableHTML = `<table class="table table-sm table-striped"><thead><tr>
                <th>${t_page('horizontalAccount')}</th>
                <th class="text-end">${t_page('horizontalCurrentPeriod')}</th>
                <th class="text-end">${t_page('horizontalPreviousPeriod')}</th>
                <th class="text-end">${t_page('horizontalChangeAbs')}</th>
                <th class="text-end">${t_page('horizontalChangePct')}</th>
            </tr></thead><tbody>`;
            isTableHTML += generateHorizontalRows(state.rawData.isItems, state.rawDataPrevious.isItems || [], 'IS');
            isTableHTML += `</tbody></table>`;
            if (UI.horizontalISTable) UI.horizontalISTable.innerHTML = isTableHTML;

             // Generate BS Table using rawData and rawDataPrevious
             let bsTableHTML = `<table class="table table-sm table-striped"><thead><tr>
                <th>${t_page('horizontalAccount')}</th>
                <th class="text-end">${t_page('horizontalCurrentPeriod')}</th>
                <th class="text-end">${t_page('horizontalPreviousPeriod')}</th>
                <th class="text-end">${t_page('horizontalChangeAbs')}</th>
                <th class="text-end">${t_page('horizontalChangePct')}</th>
            </tr></thead><tbody>`;
             bsTableHTML += generateHorizontalRows(state.rawData.bsItems, state.rawDataPrevious.bsItems || [], 'BS');
             bsTableHTML += `</tbody></table>`;
             if(UI.horizontalBSTable) UI.horizontalBSTable.innerHTML = bsTableHTML;

             console.log("[DEBUG] Finished displaying Horizontal Analysis.");
        };

        // *** مُضاف: دالة لعرض دورة التحول النقدي ***
        const calculateAndDisplayCCC = () => {
            console.log("[DEBUG] Attempting to display CCC...");
            // CCC requires DSO, DIO, DPO which are calculated in calculateAllRatios
            const requiredData = state.hasValidData && state.ratios && isFinite(state.ratios.cashConversionCycle);

            if (!requiredData) {
                 if(UI.cccDataWarning) { UI.cccDataWarning.textContent = t_page('cccDataWarning'); UI.cccDataWarning.style.display = 'block'; }
                 if(UI.cccResultsContainer) UI.cccResultsContainer.style.display = 'none';
                 console.warn("[DEBUG] Insufficient data for CCC display.");
                 return;
            }
             if(UI.cccDataWarning) UI.cccDataWarning.style.display = 'none';
             if(UI.cccResultsContainer) UI.cccResultsContainer.style.display = 'block';

             const ccc = state.ratios.cashConversionCycle;
             const dso = state.ratios.avgCollectionPeriod; // DSO
             const dio = state.ratios.daysInventoryOutstanding; // DIO
             const dpo = state.ratios.daysPayablesOutstanding; // DPO

             if(UI.cccValue) UI.cccValue.textContent = formatRatio(ccc, 0);
             if(UI.cccValueDSO) UI.cccValueDSO.textContent = formatRatio(dso, 0);
             if(UI.cccValueDIO) UI.cccValueDIO.textContent = formatRatio(dio, 0);
             if(UI.cccValueDPO) UI.cccValueDPO.textContent = formatRatio(dpo, 0);

             if(UI.cccInterpretation) {
                 if (ccc <= 30 && isFinite(ccc)) {
                     UI.cccInterpretation.textContent = t_page('cccInterpretationShort');
                     UI.cccInterpretation.className = 'h5 text-success';
                     if (UI.cccValue) UI.cccValue.className = 'display-4 fw-bold text-success';
                 } else if (isFinite(ccc)) {
                     UI.cccInterpretation.textContent = t_page('cccInterpretationLong');
                     UI.cccInterpretation.className = 'h5 text-warning';
                     if (UI.cccValue) UI.cccValue.className = 'display-4 fw-bold text-warning';
                 } else {
                     UI.cccInterpretation.textContent = '';
                     if (UI.cccValue) UI.cccValue.className = 'display-4 fw-bold';
                 }
             }
             console.log("[DEBUG] Finished displaying CCC.");
        };

        // *** مُضاف: دالة لعرض تحليل السيناريو ***
        const calculateAndDisplayScenario = () => {
             console.log("[DEBUG] Running Scenario Analysis...");
             const baseFixed = toNum(UI.fixedCosts.value);
             const baseVariable = toNum(UI.variableCost.value);
             const basePrice = toNum(UI.sellingPrice.value);

             // Ensure base breakeven is calculated from the BE tab if not already stored
             if (isNaN(state.baseBreakeven.units) || isNaN(state.baseBreakeven.value)) {
                 if (isFinite(baseFixed) && isFinite(baseVariable) && isFinite(basePrice) && basePrice > baseVariable) {
                    const baseContributionMargin = basePrice - baseVariable;
                    state.baseBreakeven.units = baseFixed / baseContributionMargin;
                    state.baseBreakeven.value = state.baseBreakeven.units * basePrice;
                    console.log("[DEBUG] Base breakeven calculated for scenario:", state.baseBreakeven)
                 } else {
                     alert(lang === 'ar' ? 'يرجى إدخال قيم صالحة في تبويب تحليل التعادل أولاً.' : 'Please enter valid values in the Break-even Analysis tab first.');
                     return;
                 }
             }

             const changeFixedPct = toNum(UI.scenarioFixedCostsChange.value) / 100;
             const changeVariablePct = toNum(UI.scenarioVariableCostChange.value) / 100;
             const changePricePct = toNum(UI.scenarioSellingPriceChange.value) / 100;

             const newFixed = baseFixed * (1 + changeFixedPct);
             const newVariable = baseVariable * (1 + changeVariablePct);
             const newPrice = basePrice * (1 + changePricePct);

             let newBepUnits = NaN;
             let newBepValue = NaN;

             if (newPrice <= 0 || newVariable < 0 || newFixed < 0) {
                 alert(t_page('errorPositiveValues'));
             } else if (newPrice <= newVariable) {
                 alert(t_page('errorPrice'));
             } else {
                 const newContributionMargin = newPrice - newVariable;
                 newBepUnits = newFixed / newContributionMargin;
                 newBepValue = newBepUnits * newPrice;
             }

            // Display results
            if(UI.scenarioBaseCaseInfo) UI.scenarioBaseCaseInfo.textContent = t_page('scenarioBaseCaseInfo');

            if(UI.scenarioBaseBEPUnits) UI.scenarioBaseBEPUnits.textContent = isFinite(state.baseBreakeven.units) ? Math.ceil(state.baseBreakeven.units).toLocaleString() : 'N/A';
            if(UI.scenarioNewBEPUnits) UI.scenarioNewBEPUnits.textContent = isFinite(newBepUnits) ? Math.ceil(newBepUnits).toLocaleString() : 'N/A';
            if(UI.scenarioChangeBEPUnits) UI.scenarioChangeBEPUnits.textContent = formatChangePercent(newBepUnits, state.baseBreakeven.units);

            if(UI.scenarioBaseBEPValue) UI.scenarioBaseBEPValue.textContent = formatNumber(state.baseBreakeven.value, 2);
            if(UI.scenarioNewBEPValue) UI.scenarioNewBEPValue.textContent = formatNumber(newBepValue, 2);
            if(UI.scenarioChangeBEPValue) UI.scenarioChangeBEPValue.textContent = formatChangePercent(newBepValue, state.baseBreakeven.value);

             console.log("[DEBUG] Finished Scenario Analysis.");
        };

        // ==============================================
        // === RUN ANALYSIS & INITIALIZATION (*** مُعدل ***) ===
        // ==============================================
        
        // *** مُعدل: حساب الفترتين وتخزين البيانات الخام ***
        const runAnalysis = () => {
            console.log("Running full analysis...");
            // Calculate current period, store raw data in state.rawData
            state.hasValidData = calculateFinancials('trialData', 'financials', 'rawData'); 
            // Calculate previous period, store raw data in state.rawDataPrevious
            state.hasPreviousData = calculateFinancials('trialDataPrevious', 'financialsPrevious', 'rawDataPrevious'); 

            if (state.hasValidData) { 
                calculateAllRatios(); // Ratios calculation now uses avg if hasPreviousData is true
            } else {
                state.ratios = {}; // Clear ratios if current data is invalid
            }

            // Render ratios based on current data (and averages if prev data exists)
            renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio', 'netWorkingCapital', 'cashRatio']);
            renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe', 'eps']);
            renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity', 'interestCoverageRatio', 'financialLeverage']);
            renderRatioCategory('efficiencyRatios', 'activityRatios', ['inventoryTurnover', 'assetTurnover', 'receivablesTurnover', 'avgCollectionPeriod']);
            renderRatioCategory('valuationRatios', 'valuationRatios', ['peRatio', 'pbRatio', 'dividendYield', 'payoutRatio']);
            
            renderSidebar(); // Depends only on current data ratios
            return state.hasValidData; 
        };

        const init = () => {
            console.log("Initializing advanced page...");
            
            setTimeout(() => {
                console.log("[DEBUG] Running initial analysis after delay...");
                runAnalysis(); // Run once on load to process both periods and calculate ratios
                
                // Initial display calls for existing tabs (will show warnings if data insufficient)
                calculateAndDisplayDupont(); 
                calculateAndDisplayVerticalAnalysis();
                calculateAndDisplayZScore();
                calculateAndDisplayCashFlowAnalysis(); 
                calculateAndDisplayEVA(); 
                // *** مُضاف: استدعاء دوال العرض الجديدة ***
                calculateAndDisplayHorizontal(); // Will show warning if no previous data
                calculateAndDisplayCCC(); // Will show warning if missing data or only one period
                // Scenario analysis is triggered by button, no initial call needed
                
                // Apply translations after initial renders attempt
                if (typeof window.applyTranslations === 'function') { 
                    console.log("Applying translations...");
                    window.applyTranslations(); 
                } 
                else { console.warn("applyTranslations function not found."); }
                
                console.log("Advanced page initialized.");

            }, 100); 

            // Existing Listeners
            if (UI.calculateBreakeven) UI.calculateBreakeven.addEventListener('click', calculateAndDisplayBreakeven);
            if (UI.calculateEVA) UI.calculateEVA.addEventListener('click', calculateAndDisplayEVA);
            // *** مُضاف: مستمع زر السيناريو ***
            if (UI.runScenario) UI.runScenario.addEventListener('click', calculateAndDisplayScenario);


            // Tab Change Listeners - Refreshes tab content on view
            // *** مُضاف: تبويبات جديدة للمستمع ***
            const tabs = ['ratios', 'breakeven', 'dupont', 'vertical', 'zscore', 'cashflow', 'eva', 'horizontal', 'ccc', 'scenario']; 
            tabs.forEach(tabId => {
                const tabElement = document.getElementById(`${tabId}-tab`);
                if (tabElement) {
                    tabElement.addEventListener('shown.bs.tab', () => {
                         console.log(`${tabId} tab shown`);
                        // Re-check data validity specific to the tab needs
                         if (!state.hasValidData || (tabId === 'horizontal' && !state.hasPreviousData)) { 
                            console.log("Data potentially invalid for this tab, attempting re-run analysis..."); 
                            runAnalysis(); // Re-run analysis if data seems missing for the tab
                        }
                         
                         // Re-render the specific tab's content
                        // Existing tabs
                         if (tabId === 'ratios') runAnalysis(); // Re-render ratios if data might have changed
                         if (tabId === 'breakeven' && state.breakevenChart) { state.breakevenChart.resize(); } // Just resize chart
                         if (tabId === 'dupont') calculateAndDisplayDupont();
                         if (tabId === 'vertical') calculateAndDisplayVerticalAnalysis();
                         if (tabId === 'zscore') calculateAndDisplayZScore();
                         if (tabId === 'cashflow') calculateAndDisplayCashFlowAnalysis(); 
                         if (tabId === 'eva') calculateAndDisplayEVA(); 
                        // New tabs
                        if (tabId === 'horizontal') calculateAndDisplayHorizontal();
                        if (tabId === 'ccc') calculateAndDisplayCCC();
                        if (tabId === 'scenario') { /* Content updated via button click */ }
                    });
                } else { console.warn(`Tab button not found for ID: ${tabId}-tab`); }
            });
        };

        // Run init
        if (document.getElementById('ratios-pane') && document.getElementById('cashflow-pane')) {
            init();
        } else {
            console.error("One or more critical tab pane elements were not found. Initialization stopped.");
        }
        
    }, 0); 
});
