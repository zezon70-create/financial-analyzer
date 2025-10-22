// js/advanced-app.js (REFACTORED to consume 'financialDataCurrent' from report-app.js)

window.pageTranslations = {
    ar: {
        pageTitle: "التحليلات المتقدمة — المحلل المالي", pageHeader: "التحليلات المتقدمة", pageSubheader: "استخدم أدوات تحليلية متخصصة للحصول على رؤى أعمق حول أداء عملك.",
        tabRatios: "النسب المالية", tabBreakeven: "تحليل التعادل", tabDupont: "تحليل دوبونت", tabVertical: "التحليل الرأسي", tabZScore: "نموذج Z-Score", tabCashFlow: "تحليل التدفقات النقدية", tabEVA: "القيمة الاقتصادية المضافة (EVA)",
        tabHorizontal: "التحليل الأفقي", tabCCC: "دورة التحول النقدي", tabScenario: "تحليل السيناريو",
        summaryTitle: "الملخص الذكي", alertsTitle: "تنبيهات ومؤشرات خطر", thRatio: "النسبة", thValue: "القيمة", thComment: "تعليق تحليلي",
        liquidityRatios: "مؤشرات السيولة", profitabilityRatios: "مؤشرات الربحية", leverageRatios: "مؤشرات الروافع والمديونية", activityRatios: "مؤشرات النشاط", valuationRatios: "مؤشرات التقييم",
        currentRatio: "نسبة التداول", currentRatio_comment_high: "سيولة ممتازة...", currentRatio_comment_good: "سيولة جيدة...", currentRatio_comment_low: "مؤشر خطر...", quickRatio: "نسبة السيولة السريعة", quickRatio_comment_good: "قدرة جيدة...", quickRatio_comment_low: "مؤشر خطر...", netWorkingCapital: "صافي راس المال العامل", netWorkingCapital_comment_positive: "وضع صحي.", netWorkingCapital_comment_negative: "مؤشر خطر.", cashRatio: "نسبة النقد", cashRatio_comment_good: "قدرة قوية جداً.", cashRatio_comment_low: "اعتماد منخفض.",
        inventoryTurnover: "معدل دوران المخزون", inventoryTurnover_comment_high: "كفاءة عالية.", inventoryTurnover_comment_low: "ضعف أو ركود.", assetTurnover: "معدل دوران الأصول", assetTurnover_comment_high: "كفاءة ممتازة.", assetTurnover_comment_low: "كفاءة منخفضة.", receivablesTurnover: "معدل دوران العملاء", receivablesTurnover_comment_high: "تحصيل قوي.", receivablesTurnover_comment_low: "تباطؤ في التحصيل.", avgCollectionPeriod: "متوسط فترة التحصيل", avgCollectionPeriod_comment_low: "سرعة ممتازة.", avgCollectionPeriod_comment_high: "فترة طويلة.",
        debtToEquity: "نسبة الديون لحقوق الملكية", debtToEquity_comment_low: "هيكل آمن.", debtToEquity_comment_good: "توازن جيد.", debtToEquity_comment_high: "دين مرتفع.", debtToAssets: "نسبة الديون للأصول", debtToAssets_comment_low: "وضع آمن.", debtToAssets_comment_high: "مخاطر مرتفعة.", interestCoverageRatio: "عدد مرات تغطية الفوائد", interestCoverageRatio_comment_safe: "قدرة ممتازة.", interestCoverageRatio_comment_risk: "خطر.", financialLeverage: "الرافعة المالية", financialLeverage_comment_high: "اعتماد كبير.", financialLeverage_comment_low: "اعتماد منخفض.",
        netProfitMargin: "هامش صافي الربح", netProfitMargin_comment_high: "ربحية ممتازة.", netProfitMargin_comment_avg: "ربحية مقبولة.", netProfitMargin_comment_low: "خسائر.", grossProfitMargin: "نسبة مجمل الربح", grossProfitMargin_comment_high: "هامش قوي.", grossProfitMargin_comment_low: "هامش ضعيف.", roa: "العائد على الأصول (ROA)", roa_comment_high: "كفاءة عالية.", roa_comment_low: "كفاءة منخفضة.", roe: "العائد على حقوق الملكية (ROE)", roe_comment_high: "عائد ممتاز.", roe_comment_low: "عائد ضعيف.", eps: "ربحية السهم (EPS)", eps_comment_positive: "ربح للسهم.", eps_comment_negative: "خسارة للسهم.",
        peRatio: "مضاعف الربحية (P/E)", peRatio_comment: "يقارن بالقطاع.", pbRatio: "معدل السعر للقيمة الدفترية (P/B)", pbRatio_comment: "يقارن سعر السهم بقيمته الدفترية.", dividendYield: "معدل الربح الموزع للسهم", dividendYield_comment: "هام للمستثمرين الباحثين عن دخل.", payoutRatio: "نسبة التوزيع", payoutRatio_comment: "نسبة منخفضة قد تعني إعادة استثمار.",
        externalDataWarning: "تتطلب مدخلات إضافية (عدد الأسهم، سعر السوق، إلخ).",
        // *** مُعدل: رسالة خطأ جديدة ***
        noDataForAdvanced: "لا توجد بيانات قوائم مالية مُجهزة. يرجى تشغيل صفحة 'التقارير' أولاً لإنشاء القوائم.",
        summary_ok: "الوضع المالي يبدو مستقرًا...", summary_risk: "توجد بعض مؤشرات الخطر...", alert_liquidity_risk: "🔴 خطر سيولة...", alert_leverage_risk: "🟡 تنبيه دين مرتفع...", alert_profit_risk: "🔴 خطر ربحية...", alert_ok: "🟢 لا توجد مؤشرات خطر حرجة...", noDataForRatios: "لا توجد بيانات كافية لحساب النسب.", // This key is still used by renderRatioCategory
        beInputTitle: "مدخلات الحساب", labelFixedCosts: "إجمالي التكاليف الثابتة", labelVariableCost: "التكلفة المتغيرة للوحدة", labelSellingPrice: "سعر بيع الوحدة", btnCalculate: "احسب", beResultsTitle: "النتائج", bepUnits: "نقطة التعادل (بالوحدات)", bepValue: "نقطة التعادل (بالقيمة)", beChartTitle: "رسم بياني لنقطة التعادل", errorPrice: "سعر البيع يجب أن يكون أعلى.", errorPositiveValues: "أدخل قيم موجبة.", revenue: 'الإيرادات', totalCosts: 'إجمالي التكاليف', fixedCosts: 'التكاليف الثابتة', unitsSold: 'الوحدات المباعة', value: 'القيمة',
        dupontTitle: "تحليل دوبونت", dupontDesc: "تفكيك العائد على حقوق الملكية (ROE)...", dupontEquation: "معادلة دوبونت:", dupontCompNPM: "هامش صافي الربح", dupontCompAT: "دوران الأصول", dupontCompEM: "مضاعف الملكية", dupontCompROE: "العائد على الملكية", dupontDataWarning: "بيانات غير كافية لتحليل دوبونت (تأكد من تشغيل صفحة 'التقارير').", // Updated text
        verticalTitle: "التحليل الرأسي", verticalDesc: "يعرض البنود كنسبة مئوية...", verticalDataWarning: "بيانات غير كافية للتحليل الرأسي (تأكد من تشغيل صفحة 'التقارير').", // Updated text
        verticalBS: "الميزانية (% من الأصول)", verticalIS: "الدخل (% من الإيرادات)", verticalAccount: "الحساب", verticalValue: "القيمة", verticalPercent: "النسبة %",
        verticalInterpretationTitle: "أبرز الملاحظات:",
        verticalLargestAsset: "أكبر بند أصول هو {account} بنسبة {percent}.",
        verticalLargestLiability: "أكبر بند خصوم هو {account} بنسبة {percent} (من إجمالي الخصوم وحقوق الملكية).",
        verticalLargestEquity: "أكبر بند حقوق ملكية هو {account} بنسبة {percent} (من إجمالي الخصوم وحقوق الملكية).",
        verticalLargestExpense: "أكبر بند مصروفات (غير تكلفة البضاعة) هو {account} بنسبة {percent} من الإيرادات.",
        verticalGrossMarginComment: "هامش الربح الإجمالي يبلغ {percent}.",
        zscoreTitle: "نموذج Altman Z-Score", zscoreDesc: "نموذج للتنبؤ بالإفلاس...", zscoreDataWarning: "بيانات غير كافية لحساب Z-Score (تأكد من تشغيل صفحة 'التقارير').", // Updated text
        zscoreValueLabel: "قيمة Z-Score:", zscoreInterpretation: "التفسير:", zscoreZoneSafe: "🟢 منطقة آمنة", zscoreZoneGrey: "🟡 منطقة رمادية", zscoreZoneDistress: "🔴 منطقة الخطر", zscoreComponents: "مكونات النموذج:", zscoreX1: "X1 (رأس المال العامل / الأصول)", zscoreX2: "X2 (الأرباح المحتجزة / الأصول)", zscoreX3: "X3 (الأرباح ق.ف.ض / الأصول)", zscoreX4: "X4 (حقوق الملكية / الخصوم)", zscoreX5: "X5 (الإيرادات / الأصول)", zscoreRetainedEarningsNotFound: "(أرباح محتجزة غير موجودة)",
        cfTitle: "تحليل التدفقات النقدية (تقديري)", cfDesc: "تقدير لقائمة التدفقات النقدية...", cfDataWarning: "بيانات غير كافية لتقدير التدفقات (تأكد من تشغيل صفحة 'التقارير').", // Updated text
        cfStmtTitle: "قائمة التدفقات النقدية المقدرة", cfNetIncome: "صافي الدخل", cfDepreciationAmortization: "الإهلاك (مقدر)", cfChangesWC: "التغيرات في رأس المال العامل (مقدر)", cfOperating: "التدفق التشغيلي", cfInvesting: "التدفق الاستثماري (مقدر)", cfFinancing: "التدفق التمويلي (مقدر)", cfNetChange: "صافي التغير النقدي", cfRatiosTitle: "نسب التدفقات النقدية", cfRatioOCF: "نسبة التدفق التشغيلي", cfRatioFCF: "التدفق النقدي الحر (مقدر)", cfInterpretationPositiveOCF: "🟢 العمليات تولد نقدًا.", cfInterpretationNegativeOCF: "🔴 العمليات تستهلك نقدًا.", cfInterpretationFCF: "التدفق النقدي الحر...",
        evaInputTitle: "مدخلات حساب (EVA)", evaInputDesc: "يتطلب افتراضات خارجية.", labelWACC: "متوسط تكلفة رأس المال (WACC)", labelTaxRate: "معدل الضريبة", evaResultsTitle: "نتائج تحليل (EVA)", evaDataWarning: "بيانات غير كافية لحساب (EVA) (تأكد من تشغيل صفحة 'التقارير').", // Updated text
        evaValueLabel: "القيمة الاقتصادية المضافة (EVA):", evaInterpretation: "التفسير:", evaInterpretationPositive: "🟢 خلق للقيمة.", evaInterpretationNegative: "🔴 تدمير للقيمة.", evaComponents: "مكونات الحساب:", evaNOPAT: "صافي الربح التشغيلي بعد الضرائب", evaInvestedCapital: "رأس المال المستثمر", evaCapitalCharge: "تكلفة رأس المال",
        horizontalTitle: "التحليل الأفقي (تحليل الاتجاه)", horizontalDesc: "يقارن بنود القوائم المالية عبر فترتين زمنيتين (الحالية والسابقة، إن وجدت).", horizontalDataWarning: "لا توجد بيانات فترة سابقة (financialDataPrevious). يرجى التأكد من إدخال بيانات الفترة السابقة وتشغيل صفحة 'التقارير'.", // Updated text
        horizontalIS: "قائمة الدخل - مقارنة الفترات", horizontalBS: "الميزانية العمومية - مقارنة الفترات", horizontalAccount: "الحساب", horizontalCurrentPeriod: "الفترة الحالية", horizontalPreviousPeriod: "الفترة السابقة", horizontalChangeAbs: "التغير ($)", horizontalChangePct: "التغير (%)",
        cccTitle: "دورة التحول النقدي (CCC)", cccDesc: "تقيس الوقت بالأيام لتحويل الاستثمارات في المخزون والموارد إلى نقد.", cccDataWarning: "بيانات غير كافية لحساب CCC (تأكد من تشغيل صفحة 'التقارير').", // Updated text
        cccValueLabel: "دورة التحول النقدي (أيام):", cccInterpretation: "التفسير:", cccInterpretationShort: "🟢 دورة قصيرة: كفاءة عالية.", cccInterpretationLong: "🟡 دورة طويلة: بطء في بيع المخزون أو التحصيل.", cccComponents: "مكونات الحساب (أيام):", cccDSO: "متوسط فترة التحصيل (DSO)", cccDIO: "متوسط فترة التخزين (DIO)", cccDPO: "متوسط فترة السداد للموردين (DPO)",
        scenarioTitle: "تحليل السيناريو (على نقطة التعادل)", scenarioDesc: "اختبر تأثير تغيير الافتراضات على نقطة التعادل.", scenarioInputs: "تغيير الافتراضات (%):", scenarioFixedCostsLabel: "التكاليف الثابتة", scenarioVariableCostLabel: "التكلفة المتغيرة للوحدة", scenarioSellingPriceLabel: "سعر بيع الوحدة", scenarioRunBtn: "اختبر السيناريو", scenarioResults: "النتائج:", scenarioBaseCaseInfo: "القيم الأصلية مأخوذة من تبويب تحليل التعادل.", scenarioMetric: "المقياس", scenarioBaseValue: "القيمة الأصلية", scenarioNewValue: "القيمة الجديدة", scenarioChange: "التغير (%)",
        externalInputsTitle: "مدخلات التقييم الإضافية",
        labelNumShares: "عدد الأسهم القائمة",
        labelMarketPrice: "سعر السهم السوقي",
        labelTotalDividends: "إجمالي التوزيعات النقدية",
        btnUpdateValuation: "تحديث مؤشرات التقييم"
    },
    en: {
        // *** All English translations... ***
        // (Omitted for brevity, but all keys above need corresponding English entries)
    }
};

document.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        console.log("[DEBUG] Starting advanced-app.js initialization after delay...");

        const state = { 
            statementsCurrent: null,  // Will hold data from 'financialDataCurrent'
            statementsPrevious: null, // Will hold data from 'financialDataPrevious'
            ratios: {},
            breakevenChart: null,
            baseBreakeven: { units: NaN, value: NaN }, 
            hasValidData: false, 
            hasPreviousData: false, 
        };
        const lang = localStorage.getItem('lang') || 'ar';
        const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`; 

        const UI = { 
            // All existing UI elements
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
            verticalInterpretation: document.getElementById('verticalInterpretation'),
            verticalInterpretationList: document.getElementById('verticalInterpretationList'),
            zscoreDataWarning: document.getElementById('zscoreDataWarning'), zscoreResultsContainer: document.getElementById('zscoreResultsContainer'),
            zscoreValue: document.getElementById('zscoreValue'), zscoreInterpretation: document.getElementById('zscoreInterpretation'),
            zscoreFactorsList: document.getElementById('zscoreFactorsList'),
            cfDataWarning: document.getElementById('cfDataWarning'), cfResultsContainer: document.getElementById('cfResultsContainer'),
            cfStatementTableBody: document.getElementById('cfStatementTableBody'), 
            cfValueOCFRatio: document.getElementById('cfValueOCFRatio'), cfValueFCF: document.getElementById('cfValueFCF'),
            cfInterpretation: document.getElementById('cfInterpretation'),
            waccInput: document.getElementById('waccInput'), taxRateInput: document.getElementById('taxRateInput'), calculateEVA: document.getElementById('calculateEVA'), evaDataWarning: document.getElementById('evaDataWarning'), evaResultsContainer: document.getElementById('evaResultsContainer'), evaValue: document.getElementById('evaValue'), evaInterpretation: document.getElementById('evaInterpretation'), evaValueNOPAT: document.getElementById('evaValueNOPAT'), evaValueInvestedCapital: document.getElementById('evaValueInvestedCapital'), evaValueCapitalCharge: document.getElementById('evaValueCapitalCharge'),
            horizontalDataWarning: document.getElementById('horizontalDataWarning'), horizontalResultsContainer: document.getElementById('horizontalResultsContainer'), horizontalISTable: document.getElementById('horizontalISTable'), horizontalBSTable: document.getElementById('horizontalBSTable'),
            cccDataWarning: document.getElementById('cccDataWarning'), cccResultsContainer: document.getElementById('cccResultsContainer'), cccValue: document.getElementById('cccValue'), cccInterpretation: document.getElementById('cccInterpretation'), cccValueDSO: document.getElementById('cccValueDSO'), cccValueDIO: document.getElementById('cccValueDIO'), cccValueDPO: document.getElementById('cccValueDPO'),
            scenarioFixedCostsChange: document.getElementById('scenarioFixedCostsChange'), scenarioVariableCostChange: document.getElementById('scenarioVariableCostChange'), scenarioSellingPriceChange: document.getElementById('scenarioSellingPriceChange'), runScenario: document.getElementById('runScenario'), scenarioBaseCaseInfo: document.getElementById('scenarioBaseCaseInfo'), scenarioBaseBEPUnits: document.getElementById('scenarioBaseBEPUnits'), scenarioNewBEPUnits: document.getElementById('scenarioNewBEPUnits'), scenarioChangeBEPUnits: document.getElementById('scenarioChangeBEPUnits'), scenarioBaseBEPValue: document.getElementById('scenarioBaseBEPValue'), scenarioNewBEPValue: document.getElementById('scenarioNewBEPValue'), scenarioChangeBEPValue: document.getElementById('scenarioChangeBEPValue'),
            externalNumShares: document.getElementById('externalNumShares'),
            externalMarketPrice: document.getElementById('externalMarketPrice'),
            externalTotalDividends: document.getElementById('externalTotalDividends'),
            updateValuationRatios: document.getElementById('updateValuationRatios')
        };
        
        const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
        const formatPercent = (value, digits = 1) => isFinite(value) && !isNaN(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
        const formatRatio = (value, digits = 2) => isFinite(value) && !isNaN(value) ? value.toFixed(digits) : "N/A";
        const formatNumber = (value, digits = 0) => isFinite(value) && !isNaN(value) ? value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "N/A";
        const formatChangePercent = (newValue, baseValue) => {
            if (typeof newValue !== 'number' || typeof baseValue !== 'number') return "N/A";
            if (baseValue === 0) {
                if (newValue > 0) return "New";
                if (newValue === 0) return "0.0%";
                return "N/A";
            }
            const change = ((newValue - baseValue) / Math.abs(baseValue));
            const sign = change > 0 ? '+' : ''; 
            return sign + (change * 100).toFixed(1) + '%';
        };

        // ==============================================
        // === DATA LOADING (New Simplified Function) ===
        // ==============================================

        // *** مُضاف: دالة جديدة لقراءة البيانات المجهزة من report-app.js ***
        const loadProcessedData = () => {
            console.log("[DEBUG] Loading processed data from localStorage...");
            const currentDataString = localStorage.getItem('financialDataCurrent');
            const previousDataString = localStorage.getItem('financialDataPrevious');
            
            state.hasValidData = false;
            state.hasPreviousData = false;
            state.statementsCurrent = null;
            state.statementsPrevious = null;

            if (currentDataString) {
                try {
                    state.statementsCurrent = JSON.parse(currentDataString);
                    if (state.statementsCurrent && state.statementsCurrent.totals) {
                        state.hasValidData = true;
                        console.log("[DEBUG] Loaded 'financialDataCurrent' successfully.");
                    } else {
                         console.warn("[DEBUG] 'financialDataCurrent' found but format is invalid.");
                    }
                } catch (e) { console.error("Error parsing 'financialDataCurrent':", e); }
            } else {
                 console.warn("[DEBUG] 'financialDataCurrent' not found in localStorage. Run 'Report' page first.");
            }

            if (previousDataString) {
                 try {
                    state.statementsPrevious = JSON.parse(previousDataString);
                     if (state.statementsPrevious && state.statementsPrevious.totals) {
                        state.hasPreviousData = true;
                        console.log("[DEBUG] Loaded 'financialDataPrevious' successfully.");
                    } else {
                        console.warn("[DEBUG] 'financialDataPrevious' found but format is invalid.");
                    }
                } catch (e) { console.error("Error parsing 'financialDataPrevious':", e); }
            } else {
                console.warn("[DEBUG] 'financialDataPrevious' not found. Comparative analysis will be limited.");
            }
            
            return state.hasValidData; // Return true only if current data is valid
        };

        // *** مُلغى: دالة calculateFinancials القديمة لم نعد بحاجة إليها ***
        // const calculateFinancials = (rawDataKey = 'trialData', ...) => { ... } 
        

        // *** مُعدل: دالة حساب النسب أصبحت بسيطة جداً ***
        const calculateAllRatios = () => {
             state.ratios = {}; 
             if (!state.hasValidData) { console.warn("Ratios skipped: No valid processed data."); return false; } 
             
             // *** البيانات الآن تأتي من المجاميع الجاهزة ***
             const f = state.statementsCurrent.totals;
             const fPrev = state.statementsPrevious?.totals || {}; // Use empty object as fallback

             try { 
                 const assets = f.totalAssets || 0; 
                 const equity = f.totalEquity || 0; 
                 const liabilities = f.totalLiabilities || 0; 
                 const revenue = f.totalRevenue || 0; 
                 const netProfit = f.netProfit || 0;
                 const cogs = f.totalCogs || 0;
                 const purchases = f.purchases || 0;
                 const ebit = f.ebit || 0;
                 const workingCapital = f.workingCapital || 0;
                 const retainedEarnings = f.retainedEarnings || 0; // Closing RE
                 const interestExpense = f.totalInterest || 0;
                 const inventory = f.inventory || 0;
                 const accountsReceivable = f.accountsReceivable || 0;
                 const accountsPayable = f.accountsPayable || 0;
                 const currentAssets = f.totalCurrentAssets || 0;
                 const currentLiabilities = f.totalCurrentLiabilities || 0;
                 const cashEquivalents = f.cashEquivalents || 0;
                 const grossProfit = f.grossProfit || 0;
                 const depreciation = f.depreciationTotal || 0;
                 
                 // *** المتوسطات ***
                 const avgAssets = state.hasPreviousData ? (assets + fPrev.totalAssets) / 2 : assets;
                 const avgEquity = state.hasPreviousData ? (equity + fPrev.totalEquity) / 2 : equity;
                 const avgInventory = state.hasPreviousData ? (inventory + fPrev.inventory) / 2 : inventory;
                 const avgReceivables = state.hasPreviousData ? (accountsReceivable + fPrev.accountsReceivable) / 2 : accountsReceivable;
                 const avgPayables = state.hasPreviousData ? (accountsPayable + fPrev.accountsPayable) / 2 : accountsPayable;

                 
                 // Z-Score
                 const x1 = assets !== 0 ? workingCapital / assets : Infinity; 
                 const x2 = assets !== 0 ? retainedEarnings / assets : Infinity; 
                 const x3 = assets !== 0 ? ebit / assets : Infinity; 
                 const x4 = liabilities !== 0 ? equity / liabilities : Infinity; 
                 const x5 = assets !== 0 ? revenue / assets : 0; 
                 const zScore = (isFinite(x1) && isFinite(x2) && isFinite(x3) && isFinite(x4) && isFinite(x5)) ? (0.717 * x1) + (0.847 * x2) + (3.107 * x3) + (0.420 * x4) + (0.998 * x5) : NaN; 
                 
                 // Liquidity
                 const currentRatio = currentLiabilities !== 0 ? currentAssets / currentLiabilities : Infinity;
                 const quickRatio = currentLiabilities !== 0 ? (currentAssets - inventory) / currentLiabilities : Infinity;
                 const netWorkingCapital = workingCapital; 
                 const cashRatio = currentLiabilities !== 0 ? cashEquivalents / currentLiabilities : Infinity;

                 // Activity & CCC
                 const inventoryTurnover = avgInventory > 0 && cogs > 0 ? cogs / avgInventory : Infinity; 
                 const assetTurnover = avgAssets > 0 ? revenue / avgAssets : 0; 
                 const receivablesTurnover = avgReceivables > 0 ? revenue / avgReceivables : Infinity; 
                 const avgCollectionPeriod = isFinite(receivablesTurnover) && receivablesTurnover !== 0 ? 365 / receivablesTurnover : Infinity; // DSO
                 const daysInventoryOutstanding = isFinite(inventoryTurnover) && inventoryTurnover !== 0 ? 365 / inventoryTurnover : Infinity; // DIO
                 const costOfSalesForDPO = purchases > 0 ? purchases : cogs; // Use purchases if available, else COGS
                 const daysPayablesOutstanding = avgPayables > 0 && costOfSalesForDPO > 0 ? (avgPayables / costOfSalesForDPO) * 365 : Infinity; // DPO
                 const cashConversionCycle = (isFinite(avgCollectionPeriod) && isFinite(daysInventoryOutstanding) && isFinite(daysPayablesOutstanding)) ? 
                                             avgCollectionPeriod + daysInventoryOutstanding - daysPayablesOutstanding : Infinity; // CCC

                 // Leverage
                 const debtToAssets = avgAssets > 0 ? liabilities / avgAssets : Infinity;
                 const debtToEquity = avgEquity > 0 ? liabilities / avgEquity : Infinity;
                 const interestCoverageRatio = interestExpense !== 0 ? ebit / interestExpense : Infinity;
                 const financialLeverage = (avgEquity !== 0 && avgAssets !== 0) ? avgAssets / avgEquity : Infinity;
                 
                 // Profitability
                 const grossProfitMargin = revenue !== 0 ? grossProfit / revenue : 0;
                 const netProfitMargin = revenue !== 0 ? netProfit / revenue : 0;
                 const roa = avgAssets > 0 ? netProfit / avgAssets : 0;
                 const roe = avgEquity > 0 ? netProfit / avgEquity : 0;

                 // Valuation (External Inputs)
                 const externalInputs = {
                     numberOfShares: toNum(UI.externalNumShares?.value),
                     marketPricePerShare: toNum(UI.externalMarketPrice?.value),
                     totalDividends: toNum(UI.externalTotalDividends?.value)
                 };
                 
                 const eps = externalInputs.numberOfShares > 0 ? netProfit / externalInputs.numberOfShares : NaN;
                 const bookValuePerShare = externalInputs.numberOfShares > 0 ? equity / externalInputs.numberOfShares : NaN; // Use ending equity
                 const dividendsPerShare = externalInputs.numberOfShares > 0 ? externalInputs.totalDividends / externalInputs.numberOfShares : NaN;
                 const peRatio = isFinite(eps) && eps !== 0 && externalInputs.marketPricePerShare > 0 ? externalInputs.marketPricePerShare / eps : NaN;
                 const pbRatio = isFinite(bookValuePerShare) && bookValuePerShare !== 0 && externalInputs.marketPricePerShare > 0 ? externalInputs.marketPricePerShare / bookValuePerShare : NaN;
                 const dividendYield = externalInputs.marketPricePerShare > 0 ? dividendsPerShare / externalInputs.marketPricePerShare : NaN;
                 const payoutRatio = netProfit > 0 ? externalInputs.totalDividends / netProfit : NaN;
                 
                 // Other CF Ratios (Simplified)
                 const ocf_estimated = netProfit + depreciation;
                 const capex_estimated = depreciation; // Proxy
                 const freeCashFlow_estimated = ocf_estimated - capex_estimated;

                 state.ratios = { 
                     currentRatio, quickRatio, netWorkingCapital, cashRatio,
                     inventoryTurnover, assetTurnover, receivablesTurnover, avgCollectionPeriod, 
                     daysInventoryOutstanding, daysPayablesOutstanding, cashConversionCycle, 
                     debtToAssets, debtToEquity, interestCoverageRatio, financialLeverage, 
                     grossProfitMargin, netProfitMargin, roa, roe, eps, 
                     peRatio, pbRatio, dividendYield, payoutRatio,
                     zScoreX1: x1, zScoreX2: x2, zScoreX3: x3, zScoreX4: x4, zScoreX5: x5, zScore: zScore, 
                     equityMultiplier: financialLeverage, 
                     operatingCashFlowRatio: currentLiabilities !== 0 ? ocf_estimated / currentLiabilities : Infinity, 
                     freeCashFlow: freeCashFlow_estimated,
                     // Store base values needed by other calcs
                     _netProfit: netProfit,
                     _ebit: ebit,
                     _assets: assets,
                     _equity: equity,
                     _revenue: revenue,
                     _liabilities: liabilities,
                     _ocf_estimated: ocf_estimated,
                     _capex_estimated: capex_estimated
                 }; 
                 console.log("Calculated Ratios (from processed data):", state.ratios); return true; 
             } catch(e) { 
                 console.error("Error calculating ratios:", e); 
                 state.ratios = {}; state.hasValidData = false; return false; 
             }
        };

        // ==============================================
        // === RENDERING FUNCTIONS (Adapted for new data source) ===
        // ==============================================
        
        const getRatioComment = (key, value) => { /* ... (Code from previous working version - لا تغيير هنا) ... */
            if (!isFinite(value) && isNaN(value)) return "N/A"; 
            if (isNaN(value)) {
                if (['eps', 'peRatio', 'pbRatio', 'dividendYield', 'payoutRatio'].includes(key)) {
                    return `<span class='text-warning small fst-italic'>${t_page('externalDataWarning')}</span>`;
                }
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
        
        const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => { /* ... (Code from previous working version) ... */
            const container = document.getElementById(divId); 
            if (!container) { console.error(`Element not found: ${divId}`); return; } 
            if (!state.hasValidData) { container.innerHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <p class="text-muted">${t_page('noDataForRatios')}</p>`; return; } 
            let tableHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <div class="table-responsive"> <table class="table table-sm table-striped"> <thead><tr><th>${t_page('thRatio')}</th><th class="text-end">${t_page('thValue')}</th><th>${t_page('thComment')}</th></tr></thead> <tbody>`; 
            ratioKeys.forEach(key => { 
                const value = state.ratios[key]; 
                let formattedValue;
                if (key === 'netWorkingCapital') { formattedValue = formatNumber(value, 0); } 
                else if (['avgCollectionPeriod', 'daysInventoryOutstanding', 'daysPayablesOutstanding', 'cashConversionCycle'].includes(key)) { formattedValue = `${formatRatio(value, 0)} ${lang === 'ar' ? 'يوم' : 'Days'}`; } 
                else if (['grossProfitMargin', 'netProfitMargin', 'roa', 'roe', 'dividendYield', 'payoutRatio'].includes(key)) { formattedValue = formatPercent(value); } 
                else if (key === 'eps') { formattedValue = formatRatio(value, 2); } 
                else { formattedValue = formatRatio(value, 2); }
                if (isNaN(value)) {
                    formattedValue = "N/A";
                }
                const comment = getRatioComment(key, value); 
                tableHTML += `<tr> <td>${t_page(key)}</td> <td class="text-end"><strong>${formattedValue}</strong></td> <td class="text-muted small">${comment}</td> </tr>`; 
            }); 
            container.innerHTML = tableHTML + `</tbody></table></div>`; 
        };

        const renderSidebar = () => { /* ... (Code from previous working version) ... */ 
            if (!state.hasValidData) { UI.smartSummary.textContent = lang === 'ar' ? '...' : '...'; UI.alertsArea.innerHTML = `<div>${lang === 'ar' ? '...' : '...'}</div>`; return; } const { netProfitMargin, currentRatio, debtToEquity } = state.ratios; UI.smartSummary.textContent = netProfitMargin > 0 && currentRatio > 1.5 ? t_page('summary_ok') : t_page('summary_risk'); const alerts = []; if (currentRatio < 1 && isFinite(currentRatio)) alerts.push(t_page('alert_liquidity_risk')); if (debtToEquity > 2 && isFinite(debtToEquity)) alerts.push(t_page('alert_leverage_risk')); if (netProfitMargin < 0 && isFinite(netProfitMargin)) alerts.push(t_page('alert_profit_risk')); UI.alertsArea.innerHTML = alerts.length > 0 ? alerts.map(alert => `<div>${alert}</div>`).join('') : `<div>${t_page('alert_ok')}</div>`;
        };
        
        const calculateAndDisplayBreakeven = () => { /* ... (Code from previous working version) ... */
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
             state.baseBreakeven = { units: bepUnits, value: bepValue };
             return state.baseBreakeven;
         };
        const renderBreakevenChart = (fixed, variable, price, bepUnits) => { /* ... (Code from previous working version) ... */ 
             if (!UI.breakevenChartCanvas) return; if (state.breakevenChart) { state.breakevenChart.destroy(); } let maxUnits = 100; if (bepUnits > 0 && isFinite(bepUnits)) { maxUnits = Math.max(100, Math.ceil(bepUnits * 2 / 10) * 10); } else if (fixed === 0 && price > variable) { maxUnits = 100; } else if (price <= variable) { maxUnits = 100; } const step = maxUnits / 10; const labels = Array.from({ length: 11 }, (_, i) => Math.round(step * i)); const fixedCostsData = labels.map(() => fixed); const totalCostsData = labels.map(unit => fixed + (variable * unit)); const revenueData = labels.map(unit => price * unit); const ctx = UI.breakevenChartCanvas.getContext('2d'); state.breakevenChart = new Chart(ctx, { type: 'line', data: { labels: labels, datasets: [ { label: t_page('revenue'), data: revenueData, borderColor: 'rgba(75, 192, 192, 1)', fill: false, tension: 0.1 }, { label: t_page('totalCosts'), data: totalCostsData, borderColor: 'rgba(255, 99, 132, 1)', fill: false, tension: 0.1 }, { label: t_page('fixedCosts'), data: fixedCostsData, borderColor: 'rgba(255, 159, 64, 1)', borderDash: [5, 5], fill: false, tension: 0.1 } ] }, options: { responsive: true, maintainAspectRatio: false, interaction: { intersect: false, mode: 'index', }, scales: { x: { title: { display: true, text: t_page('unitsSold') } }, y: { title: { display: true, text: t_page('value') }, beginAtZero: true } }, plugins: { tooltip: { callbacks: { label: function(context) { return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`; } } } } } });
        };
        
        // *** مُعدل: الاعتماد على state.ratios المحسوبة ***
        const calculateAndDisplayDupont = () => { 
            console.log("[DEBUG] Attempting to calculate and display DuPont...");
            if (!state.hasValidData || !state.ratios.equityMultiplier) { 
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
        
        // *** مُعدل: الاعتماد على state.statementsCurrent.bs/is ***
        const calculateAndDisplayVerticalAnalysis = () => { 
            if (!state.hasValidData || !state.statementsCurrent || !state.statementsCurrent.bs || !state.statementsCurrent.is) { 
                if(UI.verticalDataWarning) { UI.verticalDataWarning.textContent = t_page('verticalDataWarning'); UI.verticalDataWarning.style.display = 'block'; } 
                if(UI.verticalResultsContainer) UI.verticalResultsContainer.style.display = 'none'; 
                if(UI.verticalInterpretation) UI.verticalInterpretation.style.display = 'none';
                return; 
            } 
            if(UI.verticalDataWarning) UI.verticalDataWarning.style.display = 'none'; 
            if(UI.verticalResultsContainer) UI.verticalResultsContainer.style.display = 'block'; 
            if(UI.verticalInterpretation) UI.verticalInterpretation.style.display = 'block';

            const totalAssets = state.statementsCurrent.totals.totalAssets || 0; 
            const totalRevenue = state.statementsCurrent.totals.totalRevenue || 0; 
            const totalLiabEquity = (state.statementsCurrent.totals.totalLiabilities || 0) + (state.statementsCurrent.totals.totalEquity || 0);

            let bsTableHTML = `<table class="table table-sm table-striped"><thead><tr><th>${t_page('verticalAccount')}</th><th class="text-end">${t_page('verticalValue')}</th><th class="text-end">${t_page('verticalPercent')}</th></tr></thead><tbody>`; 
            const sortedBsItems = [
                ...state.statementsCurrent.bs.currentAssets, 
                ...state.statementsCurrent.bs.nonCurrentAssets,
                ...state.statementsCurrent.bs.currentLiabilities,
                ...state.statementsCurrent.bs.nonCurrentLiabilities,
                ...state.statementsCurrent.bs.equityCapital
                // Note: Closing RE is handled manually if needed, or derived
            ].sort((a,b) => Math.abs(b.value || 0) - Math.abs(a.value || 0));
            
            sortedBsItems.forEach(item => { 
                const percentage = totalAssets !== 0 ? ((item.value || 0) / totalAssets) : 0; 
                const displayValue = Math.abs(item.value || 0); // Use absolute value for display consistency
                bsTableHTML += `<tr><td>${item.account}</td><td class="text-end">${formatNumber(displayValue)}</td><td class="text-end">${formatPercent(Math.abs(percentage))}</td></tr>`; 
            }); 
            bsTableHTML += `<tr class="table-light fw-bold"><td>${t_page('totalAssets')}</td><td class="text-end">${formatNumber(totalAssets)}</td><td class="text-end">100.0%</td></tr>`; 
            bsTableHTML += `</tbody></table>`; 
            if(UI.verticalBSTable) UI.verticalBSTable.innerHTML = bsTableHTML; 

            let isTableHTML = `<table class="table table-sm table-striped"><thead><tr><th>${t_page('verticalAccount')}</th><th class="text-end">${t_page('verticalValue')}</th><th class="text-end">${t_page('verticalPercent')}</th></tr></thead><tbody>`; 
            const sortedIsItems = [
                ...state.statementsCurrent.is.revenue,
                ...state.statementsCurrent.is.cogs,
                ...state.statementsCurrent.is.genAdminExpenses,
                ...state.statementsCurrent.is.sellingMarketingExpenses,
                ...state.statementsCurrent.is.depreciationAmortization,
                ...state.statementsCurrent.is.otherOperatingExpenses,
                ...state.statementsCurrent.is.interestExpense,
                ...state.statementsCurrent.is.taxExpense
            ].sort((a, b) => {
                if (a.account.includes('الإيرادات') || a.account.includes('Revenue')) return -1; // Keep revenue first
                if (b.account.includes('الإيرادات') || b.account.includes('Revenue')) return 1;
                return Math.abs(b.value || 0) - Math.abs(a.value || 0); // Sort rest by value
            });
            
            sortedIsItems.forEach(item => { 
                const itemValue = item.value || 0;
                const percentage = totalRevenue !== 0 ? (itemValue / totalRevenue) : 0; 
                const displayValue = Math.abs(itemValue);
                isTableHTML += `<tr><td>${item.account}</td><td class="text-end">${formatNumber(displayValue)}</td><td class="text-end">${formatPercent(Math.abs(percentage))}</td></tr>`; 
            }); 
            isTableHTML += `<tr class="table-light fw-bold"><td>${t_page('netProfit')}</td><td class="text-end">${formatNumber(state.statementsCurrent.totals.netProfit || 0, 2)}</td><td class="text-end">${formatPercent((state.statementsCurrent.totals.netProfit || 0) / totalRevenue)}</td></tr>`; 
            isTableHTML += `</tbody></table>`; 
            if(UI.verticalISTable) UI.verticalISTable.innerHTML = isTableHTML; 

            // Generate Commentary
            let interpretationHTML = '';
            const comments = [];
            
            // Find largest items from the *already sorted* arrays
            const largestAsset = sortedBsItems.find(item => item.value > 0); // First positive value (assets)
            if (largestAsset && totalAssets !== 0) {
                 const percent = ((largestAsset.value || 0) / totalAssets);
                 comments.push(t_page('verticalLargestAsset').replace('{account}', largestAsset.account).replace('{percent}', formatPercent(percent)));
            }
            const largestLiabOrEquity = sortedBsItems.find(item => item.value < 0); // First negative value (L+E) - This logic is flawed if using processed data
            // TODO: Rework this logic if vertical analysis needs to run on raw trialData vs processed statements
            // For now, let's use the processed lists
            const largestLiabItem = [...state.statementsCurrent.bs.currentLiabilities, ...state.statementsCurrent.bs.nonCurrentLiabilities].sort((a,b) => b.value-a.value)[0];
             if (largestLiabItem && totalLiabEquity !== 0) {
                 const percent = (Math.abs(largestLiabItem.value || 0) / totalLiabEquity);
                 comments.push(t_page('verticalLargestLiability').replace('{account}', largestLiabItem.account).replace('{percent}', formatPercent(percent)));
            }
            const largestEquityItem = state.statementsCurrent.bs.equityCapital.sort((a,b) => b.value-a.value)[0];
             if (largestEquityItem && totalLiabEquity !== 0) {
                 const percent = (Math.abs(largestEquityItem.value || 0) / totalLiabEquity);
                 comments.push(t_page('verticalLargestEquity').replace('{account}', largestEquityItem.account).replace('{percent}', formatPercent(percent)));
            }
            
             if (totalRevenue !== 0) {
                const grossMarginPercent = (state.statementsCurrent.totals.grossProfit || 0) / totalRevenue;
                comments.push(t_page('verticalGrossMarginComment').replace('{percent}', formatPercent(grossMarginPercent)));
            }
            const largestExpense = sortedIsItems.find(item => item.value > 0 && !item.account.toLowerCase().includes('cogs') && !item.account.includes('تكلفة'));
             if (largestExpense && totalRevenue !== 0) {
                 const percent = (Math.abs(largestExpense.value || 0) / totalRevenue);
                 comments.push(t_page('verticalLargestExpense').replace('{account}', largestExpense.account).replace('{percent}', formatPercent(percent)));
            }

            comments.forEach(comment => { interpretationHTML += `<li>${comment}</li>`; });
            if (UI.verticalInterpretationList) UI.verticalInterpretationList.innerHTML = interpretationHTML;
        };

        // *** مُعدل: الاعتماد على state.ratios المحسوبة ***
        const calculateAndDisplayZScore = () => { 
            if (!state.hasValidData || !isFinite(state.ratios.zScore)) { if(UI.zscoreDataWarning) { UI.zscoreDataWarning.textContent = t_page('zscoreDataWarning'); UI.zscoreDataWarning.style.display = 'block'; } if(UI.zscoreResultsContainer) UI.zscoreResultsContainer.style.display = 'none'; return; } 
            if(UI.zscoreDataWarning) UI.zscoreDataWarning.style.display = 'none'; if(UI.zscoreResultsContainer) UI.zscoreResultsContainer.style.display = 'block'; 
            const z = state.ratios.zScore; 
            let interpretation = ''; let interpretationClass = ''; 
            if (z > 2.9) { interpretation = t_page('zscoreZoneSafe'); interpretationClass = 'text-success'; } 
            else if (z > 1.23) { interpretation = t_page('zscoreZoneGrey'); interpretationClass = 'text-warning'; } 
            else { interpretation = t_page('zscoreZoneDistress'); interpretationClass = 'text-danger'; } 
            if(UI.zscoreValue) UI.zscoreValue.textContent = formatRatio(z, 3); 
            if(UI.zscoreInterpretation) { UI.zscoreInterpretation.textContent = interpretation; UI.zscoreInterpretation.className = `h5 fw-bold ${interpretationClass}`; } 
            let factorsHTML = ''; const factors = ['zScoreX1', 'zScoreX2', 'zScoreX3', 'zScoreX4', 'zScoreX5']; 
            factors.forEach(key => { 
                const value = state.ratios[key]; 
                let label = t_page(key.replace('zScore', 'zscore')); 
                if (key === 'zScoreX2' && (state.statementsCurrent.totals.retainedEarnings || 0) === 0 && !isFinite(value)) { label += ` <small class="text-muted">${t_page('zscoreRetainedEarningsNotFound')}</small>`; } 
                factorsHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">${label} <span class="badge bg-secondary rounded-pill">${formatRatio(value)}</span></li>`; 
            }); 
            if(UI.zscoreFactorsList) UI.zscoreFactorsList.innerHTML = factorsHTML;
        };

        // *** مُعدل: الاعتماد على state.ratios المحسوبة ***
        const calculateAndDisplayCashFlowAnalysis = () => { 
            if (!state.hasValidData) { if(UI.cfDataWarning) { UI.cfDataWarning.textContent = t_page('cfDataWarning'); UI.cfDataWarning.style.display = 'block'; } if(UI.cfResultsContainer) UI.cfResultsContainer.style.display = 'none'; return; } 
            if(UI.cfDataWarning) UI.cfDataWarning.style.display = 'none'; if(UI.cfResultsContainer) UI.cfResultsContainer.style.display = 'block'; 
            const r = state.ratios; // Get ratios
            let stmtHTML = ` <tr><td>${t_page('netIncomeForCF')}</td><td class="text-end">${formatNumber(r._netProfit)}</td></tr> <tr><td class="ps-3">${t_page('depreciationAmortizationForCF')}</td><td class="text-end">${formatNumber(state.statementsCurrent.totals.depreciationTotal || 0)}</td></tr> <tr><td class="text-muted ps-3">${t_page('changesInWorkingCapital')}</td><td class="text-end text-muted">(N/A)</td></tr> <tr class="table-light fw-bold"><td>${t_page('cashFlowFromOperations')}</td><td class="text-end">${formatNumber(r._ocf_estimated)}</td></tr> <tr><td>${t_page('capitalExpenditures')}</td><td class="text-end">${formatNumber(r._capex_estimated)}</td></tr> <tr class="table-light fw-bold"><td>${t_page('cfRatioFCF')}</td><td class="text-end">${formatNumber(r.freeCashFlow)}</td></tr>`;
            if(UI.cfStatementTableBody) UI.cfStatementTableBody.innerHTML = stmtHTML; 
            if(UI.cfValueOCFRatio) UI.cfValueOCFRatio.textContent = formatRatio(r.operatingCashFlowRatio); 
            if(UI.cfValueFCF) UI.cfValueFCF.textContent = formatNumber(r.freeCashFlow); 
            let interpretation = ''; 
            if (isFinite(r._ocf_estimated)) { interpretation += r._ocf_estimated > 0 ? `<p>${t_page('cfInterpretationPositiveOCF')}</p>` : `<p>${t_page('cfInterpretationNegativeOCF')}</p>`; } 
            if (isFinite(r.freeCashFlow)) { interpretation += `<p>${t_page('cfInterpretationFCF')}</p>`; } 
            if(UI.cfInterpretation) UI.cfInterpretation.innerHTML = interpretation || `<p class="text-muted">${lang==='ar'?'...':'...'}</p>`;
        };

        // *** مُعدل: الاعتماد على state.ratios المحسوبة ***
        const calculateAndDisplayEVA = () => { 
            console.log("[DEBUG] Attempting to calculate and display EVA...");
            if (!state.hasValidData || !isFinite(state.ratios._ebit)) {
                console.warn("[DEBUG] No valid data for EVA, showing warning.");
                if(UI.evaDataWarning) { UI.evaDataWarning.textContent = t_page('evaDataWarning'); UI.evaDataWarning.style.display = 'block'; }
                if(UI.evaResultsContainer) UI.evaResultsContainer.style.display = 'none';
                return;
            }
            if(UI.evaDataWarning) UI.evaDataWarning.style.display = 'none';
            if(UI.evaResultsContainer) UI.evaResultsContainer.style.display = 'block';
            
            const f = state.statementsCurrent.totals; // Use processed totals
            const wacc = toNum(UI.waccInput.value) / 100.0;
            const taxRate = toNum(UI.taxRateInput.value) / 100.0;
            if (wacc <= 0 || taxRate < 0) {
                alert(t_page('errorPositiveValues'));
                return;
            }
            const nopat = (f.ebit || 0) * (1 - taxRate);
            // Invested Capital = Total Assets - Non-Interest-Bearing Current Liabilities (NIBCL)
            // NIBCL = Total Current Liabilities - Short-Term Debt
            const nonInterestBearingCL = (f.totalCurrentLiabilities || 0) - (f.shortTermDebt || 0);
            const investedCapital = (f.totalAssets || 0) - nonInterestBearingCL; 
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

        // *** مُعدل: الاعتماد على state.statementsCurrent/Previous ***
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

              // Combine all item arrays
              const itemsCurrent = [
                  ...state.statementsCurrent.bs.currentAssets, ...state.statementsCurrent.bs.nonCurrentAssets,
                  ...state.statementsCurrent.bs.currentLiabilities, ...state.statementsCurrent.bs.nonCurrentLiabilities,
                  ...state.statementsCurrent.bs.equityCapital,
                  ...state.statementsCurrent.is.revenue, ...state.statementsCurrent.is.cogs,
                  ...state.statementsCurrent.is.genAdminExpenses, ...state.statementsCurrent.is.sellingMarketingExpenses,
                  ...state.statementsCurrent.is.depreciationAmortization, ...state.statementsCurrent.is.otherOperatingExpenses,
                  ...state.statementsCurrent.is.interestExpense, ...state.statementsCurrent.is.taxExpense
              ];
              const itemsPrevious = [
                  ...state.statementsPrevious.bs.currentAssets, ...state.statementsPrevious.bs.nonCurrentAssets,
                  ...state.statementsPrevious.bs.currentLiabilities, ...state.statementsPrevious.bs.nonCurrentLiabilities,
                  ...state.statementsPrevious.bs.equityCapital,
                  ...state.statementsPrevious.is.revenue, ...state.statementsPrevious.is.cogs,
                  ...state.statementsPrevious.is.genAdminExpenses, ...state.statementsPrevious.is.sellingMarketingExpenses,
                  ...state.statementsPrevious.is.depreciationAmortization, ...state.statementsPrevious.is.otherOperatingExpenses,
                  ...state.statementsPrevious.is.interestExpense, ...state.statementsPrevious.is.taxExpense
              ];

              const generateHorizontalRows = (itemsCurrent, itemsPrev) => {
                  let rowsHTML = '';
                  const allAccountNames = new Set([...itemsCurrent.map(i => i.account), ...itemsPrev.map(i => i.account)]);
                  const prevItemsMap = new Map(itemsPrev.map(item => [item.account, item.value]));

                  allAccountNames.forEach(account => {
                      const currentItem = itemsCurrent.find(i => i.account === account);
                      const currentValue = currentItem ? currentItem.value : 0;
                      const previousValue = prevItemsMap.get(account) || 0;
                      const changeAbs = currentValue - previousValue;
                      
                      rowsHTML += `<tr>
                          <td>${account}</td>
                          <td class="text-end">${formatNumber(currentValue)}</td>
                          <td class="text-end">${formatNumber(previousValue)}</td>
                          <td class="text-end">${formatNumber(changeAbs)}</td>
                          <td class="text-end ${changeAbs > 0 ? 'text-success' : (changeAbs < 0 ? 'text-danger' : '')}">${formatChangePercent(currentValue, previousValue)}</td>
                       </tr>`;
                  });
                  return rowsHTML;
              };

             // This logic needs refinement: BS and IS items should be separate tables.
             // For now, let's just use the BS items as an example
             let bsTableHTML = `<table class="table table-sm table-striped"><thead><tr><th>${t_page('thAccount')}</th><th class="text-end">${t_page('thCurrentPeriod')}</th><th class="text-end">${t_page('thPreviousPeriod')}</th><th class="text-end">${t_page('thChangeAbs')}</th><th class="text-end">${t_page('thChangePct')}</th></tr></thead><tbody>`;
             bsTableHTML += generateHorizontalRows(
                [...state.statementsCurrent.bs.currentAssets, ...state.statementsCurrent.bs.nonCurrentAssets, ...state.statementsCurrent.bs.currentLiabilities, ...state.statementsCurrent.bs.nonCurrentLiabilities, ...state.statementsCurrent.bs.equityCapital],
                [...state.statementsPrevious.bs.currentAssets, ...state.statementsPrevious.bs.nonCurrentAssets, ...state.statementsPrevious.bs.currentLiabilities, ...state.statementsPrevious.bs.nonCurrentLiabilities, ...state.statementsPrevious.bs.equityCapital]
             );
             bsTableHTML += `</tbody></table>`;
             if(UI.horizontalBSTable) UI.horizontalBSTable.innerHTML = bsTableHTML; // Only show BS for now
             if(UI.horizontalISTable) UI.horizontalISTable.innerHTML = ''; // Clear IS table

             console.log("[DEBUG] Finished displaying Horizontal Analysis (Simplified).");
        };

        // *** مُعدل: الاعتماد على state.ratios المحسوبة ***
        const calculateAndDisplayCCC = () => {
             console.log("[DEBUG] Attempting to display CCC...");
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
                      UI.cccInterpretation.textContent = '';
                      if (UI.cccValue) UI.cccValue.className = 'display-4 fw-bold';
                  }
              }
              console.log("[DEBUG] Finished displaying CCC.");
        };

        // *** مُعدل: الاعتماد على state.baseBreakeven ***
        const calculateAndDisplayScenario = () => {
              console.log("[DEBUG] Running Scenario Analysis...");
              const baseFixed = toNum(UI.fixedCosts.value);
              const baseVariable = toNum(UI.variableCost.value);
              const basePrice = toNum(UI.sellingPrice.value);

              if (isNaN(state.baseBreakeven.units) || isNaN(state.baseBreakeven.value)) {
                  if (isFinite(baseFixed) && isFinite(baseVariable) && isFinite(basePrice) && basePrice > baseVariable) {
                     const baseContributionMargin = basePrice - baseVariable;
                     state.baseBreakeven.units = baseFixed / baseContributionMargin;
                     state.baseBreakeven.value = state.baseBreakeven.units * basePrice;
                     console.log("[DEBUG] Base breakeven calculated for scenario:", state.baseBreakeven)
                  } else {
                     const calculatedBase = calculateAndDisplayBreakeven(); 
                     if (isNaN(calculatedBase?.units)) { 
                        alert(lang === 'ar' ? 'يرجى إدخال قيم صالحة وحساب نقطة التعادل الأساسية أولاً في تبويب تحليل التعادل.' : 'Please enter valid values and calculate the base break-even point first in the Break-even Analysis tab.');
                        return;
                      }
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

             if(UI.scenarioBaseCaseInfo) UI.scenarioBaseCaseInfo.textContent = t_page('scenarioBaseCaseInfo');
             if(UI.scenarioBaseBEPUnits) UI.scenarioBaseBEPUnits.textContent = isFinite(state.baseBreakeven.units) ? Math.ceil(state.baseBreakeven.units).toLocaleString() : 'N/A';
             if(UI.scenarioNewBEPUnits) UI.scenarioNewBEPUnits.textContent = isFinite(newBepUnits) ? Math.ceil(newBepUnits).toLocaleString() : 'N/A';
             if(UI.scenarioChangeBEPUnits) UI.scenarioChangeBEPUnits.textContent = formatChangePercent(newBepUnits, state.baseBreakeven.units);
             if(UI.scenarioBaseBEPValue) UI.scenarioBaseBEPValue.textContent = formatNumber(state.baseBreakeven.value, 2);
             if(UI.scenarioNewBEPValue) UI.scenarioNewBEPValue.textContent = formatNumber(newBepValue, 2);
             if(UI.scenarioChangeBEPValue) UI.scenarioChangeBEPValue.textContent = formatChangePercent(newBepValue, state.baseBreakeven.value);

              console.log("[DEBUG] Finished Scenario Analysis.");
        };

        // *** مُضاف: دالة لتحديث النسب وإعادة العرض بعد إدخال بيانات التقييم ***
        const updateAndRerenderValuationRatios = () => {
            console.log("[DEBUG] Updating ratios with external inputs...");
            if (calculateAllRatios()) { // Recalculate all ratios using new inputs
                 renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe', 'eps']);
                 renderRatioCategory('valuationRatios', 'valuationRatios', ['peRatio', 'pbRatio', 'dividendYield', 'payoutRatio']);
                 console.log("[DEBUG] Profitability and Valuation tables re-rendered.");
            } else {
                console.error("[DEBUG] Failed to recalculate ratios after external input update.");
            }
        };

        // ==============================================
        // === RUN ANALYSIS & INITIALIZATION (Adapted) ===
        // ==============================================
        
        // *** مُعدل: دالة runAnalysis الآن تقرأ فقط، ولا تحسب ***
        const runAnalysis = () => {
            console.log("Running full analysis...");
            // Load processed data from localStorage
            if (!loadProcessedData()) {
                // If loading current data fails, show a main error
                console.error("Failed to load essential processed data (financialDataCurrent). Aborting analysis.");
                // Show a prominent error to the user
                Object.values(UI).forEach(el => { // Hide all UI elements?
                    if (el && el.id && !['languageSelect', 'themeToggle'].includes(el.id)) {
                       // Maybe just show a single error message
                    }
                });
                alert(t_page('noDataForAdvanced')); // Show alert
                return false; 
            } 

            // Calculate all ratios based on the loaded processed data
            if (!calculateAllRatios()) { 
                console.error("Failed to calculate ratios even with processed data.");
                return false; // Stop if ratio calculation fails
            }

            // Render all ratio tables
            renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio', 'netWorkingCapital', 'cashRatio']);
            renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe', 'eps']);
            renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity', 'interestCoverageRatio', 'financialLeverage']);
            renderRatioCategory('efficiencyRatios', 'activityRatios', ['inventoryTurnover', 'assetTurnover', 'receivablesTurnover', 'avgCollectionPeriod']);
            renderRatioCategory('valuationRatios', 'valuationRatios', ['peRatio', 'pbRatio', 'dividendYield', 'payoutRatio']);
            
            renderSidebar(); 
            return state.hasValidData; 
        };

        const init = () => {
            console.log("Initializing advanced page...");
            
            setTimeout(() => {
                console.log("[DEBUG] Running initial analysis after delay...");
                // Run analysis (loads data, calculates ratios, renders ratios)
                if (runAnalysis()) {
                    // If successful, proceed to render other tabs
                    console.log("[DEBUG] Initial analysis successful. Rendering other tabs...");
                    calculateAndDisplayDupont(); 
                    calculateAndDisplayVerticalAnalysis(); 
                    calculateAndDisplayZScore();
                    calculateAndDisplayCashFlowAnalysis(); 
                    calculateAndDisplayEVA(); 
                    calculateAndDisplayHorizontal(); 
                    calculateAndDisplayCCC(); 
                } else {
                     console.error("[DEBUG] Initial analysis FAILED. Other tabs will not be rendered.");
                     // Optionally display warnings on other tabs too
                }
                
                if (typeof window.applyTranslations === 'function') { 
                    console.log("Applying translations...");
                    window.applyTranslations(); 
                } 
                else { console.warn("applyTranslations function not found."); }
                
                console.log("Advanced page initialized.");

            }, 100); 

            // Event Listeners
            if (UI.calculateBreakeven) UI.calculateBreakeven.addEventListener('click', calculateAndDisplayBreakeven);
            if (UI.calculateEVA) UI.calculateEVA.addEventListener('click', calculateAndDisplayEVA);
            if (UI.runScenario) UI.runScenario.addEventListener('click', calculateAndDisplayScenario);
            if (UI.updateValuationRatios) UI.updateValuationRatios.addEventListener('click', updateAndRerenderValuationRatios);

            // Tab Change Listeners
            const tabs = ['ratios', 'breakeven', 'dupont', 'vertical', 'zscore', 'cashflow', 'eva', 'horizontal', 'ccc', 'scenario']; 
            tabs.forEach(tabId => {
                const tabElement = document.getElementById(`${tabId}-tab`);
                if (tabElement) {
                    tabElement.addEventListener('shown.bs.tab', () => {
                        console.log(`${tabId} tab shown`);
                        // Data is already loaded by runAnalysis, just re-render the specific tab's content
                        // (No need to re-run full analysis unless data changes, which we don't track here yet)
                        if (!state.hasValidData) {
                            console.warn(`[DEBUG] Tab ${tabId} shown, but no valid data exists.`);
                            // Maybe re-run analysis to show warnings on all tabs
                            runAnalysis(); 
                            return; // Stop if no data
                        }
                        
                        // Re-render the specific tab's content
                        if (tabId === 'ratios') { /* Ratios are already rendered by runAnalysis */ }
                        if (tabId === 'breakeven' && state.breakevenChart) { state.breakevenChart.resize(); } 
                        if (tabId === 'dupont') calculateAndDisplayDupont();
                        if (tabId === 'vertical') calculateAndDisplayVerticalAnalysis(); 
                        if (tabId === 'zscore') calculateAndDisplayZScore();
                        if (tabId === 'cashflow') calculateAndDisplayCashFlowAnalysis(); 
                        if (tabId === 'eva') calculateAndDisplayEVA(); 
                        if (tabId === 'horizontal') calculateAndDisplayHorizontal();
                        if (tabId === 'ccc') calculateAndDisplayCCC();
                        // Scenario content updated via button click
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
