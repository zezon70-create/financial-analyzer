// js/advanced-app.js (Full Version + EVA + Horizontal + CCC + Scenario Added)

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
        cccDataWarning: "بيانات غير كافية لحساب CCC (يتطلب COGS, إيرادات, مخزون, عملاء, موردين).",
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
        cccDataWarning: "Insufficient data to calculate CCC (requires COGS, Revenue, Inventory, Receivables, Payables).",
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
            financials: {}, // Stores current period financials
            financialsPrevious: {}, // *** مُضاف: لتخزين بيانات الفترة السابقة ***
            ratios: {},
            breakevenChart: null,
            baseBreakeven: { units: NaN, value: NaN }, // *** مُضاف: لتخزين قيم التعادل الأصلية للسيناريو ***
            hasValidData: false, 
            hasPreviousData: false, // *** مُضاف: لتتبع وجود بيانات سابقة ***
            rawData: { bsItems: [], isItems: [] } 
        };
        const lang = localStorage.getItem('lang') || 'ar';
        const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`; 

        const UI = { 
            // ... (existing UI elements) ...
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
        const formatChangePercent = (newValue, baseValue) => {
            if (!isFinite(newValue) || !isFinite(baseValue) || baseValue === 0) return "N/A";
            const change = ((newValue - baseValue) / Math.abs(baseValue));
            return formatPercent(change);
        };


        // ==============================================
        // === FINANCIAL CALCULATIONS (*** مُعدل ***) ===
        // ==============================================
        
        // *** مُعدل: الدالة الآن تقبل اسم المفتاح للبيانات الخام واسم الحالة لتخزين النتائج ***
        const calculateFinancials = (rawDataKey = 'trialData', stateKey = 'financials') => {
            const financialsTarget = {}; // Start with empty object
            let rawDataTarget = { bsItems: [], isItems: [] }; // Only needed for current period
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
                const tempRawData = { bsItems: [], isItems: [] }; // Temporary storage
                trialData.forEach(row => {
                    const value = (toNum(row.Debit)) - (toNum(row.Credit));
                    const mainType = row.MainType || '';
                    const subType = row.SubType || '';
                    const accountName = (row.Account || '').toLowerCase();
                    const rawItem = { account: row.Account || 'N/A', value: 0, mainType: mainType, subType: subType, rawValue: value }; // Keep raw value for horizontal

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
                // Note: This is a rough estimate. If inventory values for start/end are available, use COGS + End Inv - Start Inv.
                if (f.purchases === 0 && f.cogs !== 0) {
                     f.purchases = f.cogs; // Simplistic assumption: purchases approx = COGS if no change in inventory
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

                 // Only store rawData for the current period
                if (stateKey === 'financials') {
                    state.rawData = tempRawData; 
                    state.hasValidData = true;
                } else if (stateKey === 'financialsPrevious') {
                    state.hasPreviousData = true;
                }

                console.log(`Calculated Financials for ${stateKey}:`, f); 
                return true;
            } catch (e) { 
            console.error(`Error during financial calculations for ${stateKey}:`, e); 
            state[stateKey] = {}; // Reset on error
            if (stateKey === 'financials') state.hasValidData = false;
            if (stateKey === 'financialsPrevious') state.hasPreviousData = false;
            return false; 
        }
        };
        
        const calculateAllRatios = () => { /* ... (لا تغيير هنا) ... */ 
            state.ratios = {}; 
            if (!state.hasValidData) { console.warn("Financials invalid, skipping ratio calculation."); return false; } 
            const f = state.financials; 
            // *** مُضاف: متغيرات CCC ***
            const fPrev = state.financialsPrevious; // Get previous financials if available
            const hasPrev = state.hasPreviousData;
            
            try { 
                const assets = f.assets || 0; 
                const equity = f.equity || 0; 
                const liabilities = f.liabilities || 0; 
                const revenue = f.revenue || 0; 
                const cogs = f.cogs || 0;
                const purchases = f.purchases || 0;
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

                // *** مُعدل: يتطلب بيانات فترة سابقة لحساب المتوسطات ***
                const avgInventory = hasPrev ? (f.inventory + fPrev.inventory) / 2 : f.inventory;
                const avgReceivables = hasPrev ? (f.accountsReceivable + fPrev.accountsReceivable) / 2 : f.accountsReceivable;
                const avgPayables = hasPrev ? (f.accountsPayable + fPrev.accountsPayable) / 2 : f.accountsPayable;
                
                const inventoryTurnover = avgInventory > 0 ? cogs / avgInventory : Infinity; 
                const assetTurnover = x5; 
                const receivablesTurnover = avgReceivables > 0 ? revenue / avgReceivables : Infinity; 
                const avgCollectionPeriod = isFinite(receivablesTurnover) && receivablesTurnover !== 0 ? 365 / receivablesTurnover : Infinity; // DSO
                
                // *** مُضاف: حسابات CCC ***
                const daysInventoryOutstanding = isFinite(inventoryTurnover) && inventoryTurnover !== 0 ? 365 / inventoryTurnover : Infinity; // DIO
                const daysPayablesOutstanding = avgPayables > 0 && purchases > 0 ? (avgPayables / purchases) * 365 : Infinity; // DPO - Needs Purchases
                const cashConversionCycle = (isFinite(avgCollectionPeriod) && isFinite(daysInventoryOutstanding) && isFinite(daysPayablesOutstanding)) ? 
                                            avgCollectionPeriod + daysInventoryOutstanding - daysPayablesOutstanding : Infinity; // CCC = DSO + DIO - DPO

                
                const debtToAssets = assets !== 0 ? liabilities / assets : Infinity;
                const debtToEquity = equity !== 0 ? liabilities / equity : Infinity;
                const interestCoverageRatio = f.interestExpense !== 0 ? f.ebit / f.interestExpense : Infinity;
                const financialLeverage = (equity !== 0 && assets !== 0) ? assets / equity : Infinity; 

                const grossProfitMargin = revenue !== 0 ? f.grossProfit / revenue : 0;
                const netProfitMargin = revenue !== 0 ? f.netProfit / revenue : 0;
                const roa = assets !== 0 ? f.netProfit / assets : 0;
                const roe = roeStandard; 

                const externalInputs = { numberOfShares: 0, marketPricePerShare: 0, totalDividends: 0 };
                const eps = externalInputs.numberOfShares !== 0 ? f.netProfit / externalInputs.numberOfShares : NaN;
                const bookValuePerShare = externalInputs.numberOfShares !== 0 ? f.equity / externalInputs.numberOfShares : NaN;
                const dividendsPerShare = externalInputs.numberOfShares !== 0 ? externalInputs.totalDividends / externalInputs.numberOfShares : NaN;
                const peRatio = isFinite(eps) && eps !== 0 ? externalInputs.marketPricePerShare / eps : NaN;
                const pbRatio = isFinite(bookValuePerShare) && bookValuePerShare !== 0 ? externalInputs.marketPricePerShare / bookValuePerShare : NaN;
                const dividendYield = externalInputs.marketPricePerShare !== 0 ? dividendsPerShare / externalInputs.marketPricePerShare : NaN;
                const payoutRatio = f.netProfit > 0 ? externalInputs.totalDividends / f.netProfit : NaN;

                state.ratios = { 
                    currentRatio, quickRatio, netWorkingCapital, cashRatio,
                    inventoryTurnover, assetTurnover, receivablesTurnover, avgCollectionPeriod, // DSO
                    // *** مُضاف: CCC ومكوناته ***
                    daysInventoryOutstanding, // DIO
                    daysPayablesOutstanding, // DPO
                    cashConversionCycle, // CCC
                    debtToAssets, debtToEquity, interestCoverageRatio, financialLeverage, 
                    grossProfitMargin, netProfitMargin, roa, roe, eps, 
                    peRatio, pbRatio, dividendYield, payoutRatio,
                    zScoreX1: x1, zScoreX2: x2, zScoreX3: x3, zScoreX4: x4, zScoreX5: x5, zScore: zScore, 
                    equityMultiplier: financialLeverage, 
                    operatingCashFlowRatio: f.currentLiabilities !== 0 ? f.ocf_estimated / f.currentLiabilities : Infinity, 
                    freeCashFlow: f.freeCashFlow_estimated 
                }; 
                console.log("Calculated Ratios (Full Set with CCC):", state.ratios); return true; 
            } catch(e) { 
                console.error("Error calculating ratios:", e); 
                state.ratios = {}; state.hasValidData = false; return false; 
            }
        }

        // ==============================================
        // === RENDERING FUNCTIONS (*** مُعدل ومُضاف***) ===
        // ==============================================
        
        const getRatioComment = (key, value) => { /* ... (لا تغيير هنا) ... */ 
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
        
        const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => { /* ... (لا تغيير هنا) ... */ 
            const container = document.getElementById(divId); 
            if (!container) { console.error(`Element not found: ${divId}`); return; } 
            if (!state.hasValidData) { container.innerHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <p class="text-muted">${t_page('noDataForRatios')}</p>`; return; } 
            let tableHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <div class="table-responsive"> <table class="table table-sm table-striped"> <thead><tr><th>${t_page('thRatio')}</th><th class="text-end">${t_page('thValue')}</th><th>${t_page('thComment')}</th></tr></thead> <tbody>`; 
            ratioKeys.forEach(key => { 
                const value = state.ratios[key]; 
                let formattedValue;
                if (key === 'netWorkingCapital') { formattedValue = formatNumber(value, 0); } 
                // *** مُعدل: يشمل أيام CCC ***
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

        const renderSidebar = () => { /* ... (لا تغيير هنا) ... */ };
        const calculateAndDisplayBreakeven = () => { 
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
            // *** مُضاف: تخزين القيم الأساسية للسيناريو ***
            state.baseBreakeven = { units: bepUnits, value: bepValue };
            return state.baseBreakeven;
        };
        const renderBreakevenChart = (fixed, variable, price, bepUnits) => { /* ... (لا تغيير هنا) ... */ };
        const calculateAndDisplayDupont = () => { /* ... (لا تغيير هنا) ... */ };
        const calculateAndDisplayVerticalAnalysis = () => { /* ... (لا تغيير هنا) ... */ };
        const calculateAndDisplayZScore = () => { /* ... (لا تغيير هنا) ... */ };
        const calculateAndDisplayCashFlowAnalysis = () => { /* ... (لا تغيير هنا) ... */ };
        const calculateAndDisplayEVA = () => { /* ... (لا تغيير هنا) ... */ };

        // *** مُضاف: دالة لعرض التحليل الأفقي ***
        const calculateAndDisplayHorizontal = () => {
            console.log("[DEBUG] Attempting to display Horizontal Analysis...");
            if (!state.hasValidData || !state.hasPreviousData) {
                if(UI.horizontalDataWarning) { UI.horizontalDataWarning.textContent = t_page('horizontalDataWarning'); UI.horizontalDataWarning.style.display = 'block'; }
                if(UI.horizontalResultsContainer) UI.horizontalResultsContainer.style.display = 'none';
                return;
            }
             if(UI.horizontalDataWarning) UI.horizontalDataWarning.style.display = 'none';
             if(UI.horizontalResultsContainer) UI.horizontalResultsContainer.style.display = 'block';

             const fCurrent = state.financials;
             const fPrev = state.financialsPrevious;

             // Function to generate table rows comparing items
             const generateHorizontalRows = (itemsCurrent, itemsPrev, category) => {
                 let rowsHTML = '';
                 const prevItemsMap = new Map(itemsPrev.map(item => [item.account, item.rawValue]));

                 itemsCurrent.forEach(itemCurr => {
                     const prevValue = prevItemsMap.get(itemCurr.account) || 0;
                     const currValue = itemCurr.rawValue; // Use raw debit/credit diff
                     const changeAbs = currValue - prevValue;
                     const changePct = (prevValue !== 0) ? (changeAbs / Math.abs(prevValue)) : (currValue !== 0 ? Infinity : 0);

                     // Determine sign based on account type (Assets/Expenses are positive, others negative)
                     let displayCurr = currValue;
                     let displayPrev = prevValue;
                     if (category === 'IS' && !(itemCurr.subType.includes('الإيرادات') || itemCurr.subType.includes('Revenue'))) {
                         displayCurr = -currValue; // Expenses/COGS shown as positive
                         displayPrev = -prevValue;
                     } else if (category === 'BS' && (itemCurr.mainType.includes('الخصوم') || itemCurr.mainType.includes('Liabilities') || itemCurr.mainType.includes('حقوق الملكية') || itemCurr.mainType.includes('Equity'))) {
                         displayCurr = -currValue; // Liabilities/Equity shown as positive balances
                         displayPrev = -prevValue;
                     }

                     rowsHTML += `<tr>
                         <td>${itemCurr.account}</td>
                         <td class="text-end">${formatNumber(displayCurr)}</td>
                         <td class="text-end">${formatNumber(displayPrev)}</td>
                         <td class="text-end">${formatNumber(displayCurr - displayPrev)}</td>
                         <td class="text-end ${changeAbs > 0 ? 'text-success' : (changeAbs < 0 ? 'text-danger' : '')}">${formatPercent(changePct)}</td>
                     </tr>`;
                 });
                 return rowsHTML;
             };

            // Generate IS Table
            let isTableHTML = `<table class="table table-sm table-striped"><thead><tr>
                <th>${t_page('horizontalAccount')}</th>
                <th class="text-end">${t_page('horizontalCurrentPeriod')}</th>
                <th class="text-end">${t_page('horizontalPreviousPeriod')}</th>
                <th class="text-end">${t_page('horizontalChangeAbs')}</th>
                <th class="text-end">${t_page('horizontalChangePct')}</th>
            </tr></thead><tbody>`;
            isTableHTML += generateHorizontalRows(state.rawData.isItems, state.financialsPrevious.rawItems?.isItems || [], 'IS'); // Requires rawItems on previous data
            isTableHTML += `</tbody></table>`;
            if (UI.horizontalISTable) UI.horizontalISTable.innerHTML = isTableHTML;

             // Generate BS Table
             // NOTE: Need to adjust calculation logic if rawItems are not stored for previous period
             let bsTableHTML = `<table class="table table-sm table-striped"><thead><tr>
                <th>${t_page('horizontalAccount')}</th>
                <th class="text-end">${t_page('horizontalCurrentPeriod')}</th>
                <th class="text-end">${t_page('horizontalPreviousPeriod')}</th>
                <th class="text-end">${t_page('horizontalChangeAbs')}</th>
                <th class="text-end">${t_page('horizontalChangePct')}</th>
            </tr></thead><tbody>`;
            // Simplified BS comparison using aggregated values for now - needs refinement if rawItemsPrev stored
             const bsItemsCurrentAgg = { Assets: fCurrent.assets, Liabilities: fCurrent.liabilities, Equity: fCurrent.equity + fCurrent.netProfit }; // Approx.
             const bsItemsPrevAgg = { Assets: fPrev.assets, Liabilities: fPrev.liabilities, Equity: fPrev.equity + fPrev.netProfit }; // Approx.

             for (const account in bsItemsCurrentAgg) {
                 const currValue = bsItemsCurrentAgg[account];
                 const prevValue = bsItemsPrevAgg[account] || 0;
                 const changeAbs = currValue - prevValue;
                 const changePct = (prevValue !== 0) ? (changeAbs / Math.abs(prevValue)) : (currValue !== 0 ? Infinity : 0);
                 bsTableHTML += `<tr>
                         <td>${lang === 'ar' ? (account === 'Assets' ? 'إجمالي الأصول' : (account === 'Liabilities' ? 'إجمالي الخصوم' : 'إجمالي الحقوق')) : account}</td>
                         <td class="text-end">${formatNumber(currValue)}</td>
                         <td class="text-end">${formatNumber(prevValue)}</td>
                         <td class="text-end">${formatNumber(changeAbs)}</td>
                         <td class="text-end ${changeAbs > 0 ? 'text-success' : (changeAbs < 0 ? 'text-danger' : '')}">${formatPercent(changePct)}</td>
                     </tr>`;
             }

             bsTableHTML += `</tbody></table>`;
             if(UI.horizontalBSTable) UI.horizontalBSTable.innerHTML = bsTableHTML;

             console.log("[DEBUG] Finished displaying Horizontal Analysis.");
        };

        // *** مُضاف: دالة لعرض دورة التحول النقدي ***
        const calculateAndDisplayCCC = () => {
            console.log("[DEBUG] Attempting to display CCC...");
            const requiredData = state.hasValidData && isFinite(state.ratios.avgCollectionPeriod) && isFinite(state.ratios.daysInventoryOutstanding) && isFinite(state.ratios.daysPayablesOutstanding);

            if (!requiredData) {
                 if(UI.cccDataWarning) { UI.cccDataWarning.textContent = t_page('cccDataWarning'); UI.cccDataWarning.style.display = 'block'; }
                 if(UI.cccResultsContainer) UI.cccResultsContainer.style.display = 'none';
                 return;
            }
             if(UI.cccDataWarning) UI.cccDataWarning.style.display = 'none';
             if(UI.cccResultsContainer) UI.cccResultsContainer.style.display = 'block';

             const ccc = state.ratios.cashConversionCycle;
             const dso = state.ratios.avgCollectionPeriod;
             const dio = state.ratios.daysInventoryOutstanding;
             const dpo = state.ratios.daysPayablesOutstanding;

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
                     UI.cccInterpretation.textContent = ''; // Clear if not finite
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

             // Ensure base breakeven is calculated if not already
             if (isNaN(state.baseBreakeven.units)) {
                 if (UI.calculateBreakeven) calculateAndDisplayBreakeven(); // Calculate if missing
                 if (isNaN(state.baseBreakeven.units)) { // If still NaN after trying
                    alert(lang === 'ar' ? 'يرجى حساب نقطة التعادل الأساسية أولاً في تبويب تحليل التعادل.' : 'Please calculate the base break-even point first in the Break-even Analysis tab.');
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
        
        const runAnalysis = () => {
            console.log("Running full analysis...");
            // *** مُعدل: حساب بيانات الفترة الحالية والسابقة ***
            state.hasValidData = calculateFinancials('trialData', 'financials'); 
            state.hasPreviousData = calculateFinancials('trialDataPrevious', 'financialsPrevious'); // Assuming previous data is stored under 'trialDataPrevious'

            if (state.hasValidData) { 
                 calculateAllRatios(); 
            } else {
                 state.ratios = {}; // Clear ratios if current data is invalid
            }

            // عرض النسب (تعتمد فقط على البيانات الحالية)
            renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio', 'netWorkingCapital', 'cashRatio']);
            renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe', 'eps']);
            renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity', 'interestCoverageRatio', 'financialLeverage']);
            renderRatioCategory('efficiencyRatios', 'activityRatios', ['inventoryTurnover', 'assetTurnover', 'receivablesTurnover', 'avgCollectionPeriod']);
            renderRatioCategory('valuationRatios', 'valuationRatios', ['peRatio', 'pbRatio', 'dividendYield', 'payoutRatio']);
            
            renderSidebar(); // يعتمد فقط على البيانات الحالية
            return state.hasValidData; 
        };

        const init = () => {
            console.log("Initializing advanced page...");
            
            setTimeout(() => {
                console.log("[DEBUG] Running initial analysis after delay...");
                runAnalysis(); 
                
                // استدعاء دوال العرض الأولية (بعضها قد يعرض تحذير إذا كانت البيانات غير كافية)
                calculateAndDisplayDupont(); 
                calculateAndDisplayVerticalAnalysis();
                calculateAndDisplayZScore();
                calculateAndDisplayCashFlowAnalysis(); 
                calculateAndDisplayEVA(); 
                // *** مُضاف: استدعاء دوال العرض الجديدة ***
                calculateAndDisplayHorizontal();
                calculateAndDisplayCCC(); 
                // لا نحتاج لاستدعاء السيناريو هنا، يتم تشغيله بالزر
                
                if (typeof window.applyTranslations === 'function') { 
                    console.log("Applying translations...");
                    window.applyTranslations(); 
                } 
                else { console.warn("applyTranslations function not found."); }
                
                console.log("Advanced page initialized.");

            }, 100); 

            // Listeners
            if (UI.calculateBreakeven) UI.calculateBreakeven.addEventListener('click', calculateAndDisplayBreakeven);
            if (UI.calculateEVA) UI.calculateEVA.addEventListener('click', calculateAndDisplayEVA);
            // *** مُضاف: مستمع زر السيناريو ***
            if (UI.runScenario) UI.runScenario.addEventListener('click', calculateAndDisplayScenario);


            // Tab Change Listeners
            // *** مُضاف: تبويبات جديدة للمستمع ***
            const tabs = ['ratios', 'breakeven', 'dupont', 'vertical', 'zscore', 'cashflow', 'eva', 'horizontal', 'ccc', 'scenario']; 
            tabs.forEach(tabId => {
                const tabElement = document.getElementById(`${tabId}-tab`);
                if (tabElement) {
                    tabElement.addEventListener('shown.bs.tab', () => {
                         console.log(`${tabId} tab shown`);
                        // إعادة الحساب فقط إذا لم تكن البيانات صالحة (قد تكون الفترة السابقة مفقودة)
                         if (!state.hasValidData || (tabId === 'horizontal' && !state.hasPreviousData)) { 
                            console.log("Data potentially invalid for this tab, running analysis..."); 
                            runAnalysis(); // Re-run to ensure checks are fresh
                        }
                         
                         // استدعاء دالة العرض الخاصة بالتبويب الحالي
                         if (tabId === 'dupont') calculateAndDisplayDupont();
                         if (tabId === 'vertical') calculateAndDisplayVerticalAnalysis();
                         if (tabId === 'zscore') calculateAndDisplayZScore();
                         if (tabId === 'cashflow') calculateAndDisplayCashFlowAnalysis(); 
                         if (tabId === 'eva') calculateAndDisplayEVA(); 
                        if (tabId === 'horizontal') calculateAndDisplayHorizontal();
                        if (tabId === 'ccc') calculateAndDisplayCCC();
                        if (tabId === 'scenario') { /* لا حاجة لشيء هنا، يتم تشغيله بالزر */}
                         if (tabId === 'breakeven' && state.breakevenChart) { state.breakevenChart.resize(); }
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
