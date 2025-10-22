// js/advanced-app.js (Working Version + Vertical Analysis Commentary Added)

window.pageTranslations = {
    ar: { 
        pageTitle: "التحليلات المتقدمة — المحلل المالي", pageHeader: "التحليلات المتقدمة", pageSubheader: "استخدم أدوات تحليلية متخصصة للحصول على رؤى أعمق حول أداء عملك.",
        tabRatios: "النسب المالية", tabBreakeven: "تحليل التعادل", tabDupont: "تحليل دوبونت", tabVertical: "التحليل الرأسي", tabZScore: "نموذج Z-Score", tabCashFlow: "تحليل التدفقات النقدية",
        tabEVA: "القيمة الاقتصادية المضافة (EVA)",
        summaryTitle: "الملخص الذكي", alertsTitle: "تنبيهات ومؤشرات خطر", thRatio: "النسبة", thValue: "القيمة", thComment: "تعليق تحليلي", 
        liquidityRatios: "مؤشرات السيولة", profitabilityRatios: "مؤشرات الربحية", leverageRatios: "مؤشرات الروافع والمديونية", activityRatios: "مؤشرات النشاط", valuationRatios: "مؤشرات التقييم",
        currentRatio: "نسبة التداول", currentRatio_comment_high: "سيولة ممتازة...", currentRatio_comment_good: "سيولة جيدة...", currentRatio_comment_low: "مؤشر خطر...", quickRatio: "نسبة السيولة السريعة", quickRatio_comment_good: "قدرة جيدة...", quickRatio_comment_low: "مؤشر خطر...", netWorkingCapital: "صافي راس المال العامل", netWorkingCapital_comment_positive: "وضع صحي.", netWorkingCapital_comment_negative: "مؤشر خطر.", cashRatio: "نسبة النقد", cashRatio_comment_good: "قدرة قوية جداً.", cashRatio_comment_low: "اعتماد منخفض.",
        inventoryTurnover: "معدل دوران المخزون", inventoryTurnover_comment_high: "كفاءة عالية.", inventoryTurnover_comment_low: "ضعف أو ركود.", assetTurnover: "معدل دوران الأصول", assetTurnover_comment_high: "كفاءة ممتازة.", assetTurnover_comment_low: "كفاءة منخفضة.", receivablesTurnover: "معدل دوران العملاء", receivablesTurnover_comment_high: "تحصيل قوي.", receivablesTurnover_comment_low: "تباطؤ في التحصيل.", avgCollectionPeriod: "متوسط فترة التحصيل", avgCollectionPeriod_comment_low: "سرعة ممتازة.", avgCollectionPeriod_comment_high: "فترة طويلة.",
        debtToEquity: "نسبة الديون لحقوق الملكية", debtToEquity_comment_low: "هيكل آمن.", debtToEquity_comment_good: "توازن جيد.", debtToEquity_comment_high: "دين مرتفع.", debtToAssets: "نسبة الديون للأصول", debtToAssets_comment_low: "وضع آمن.", debtToAssets_comment_high: "مخاطر مرتفعة.", interestCoverageRatio: "عدد مرات تغطية الفوائد", interestCoverageRatio_comment_safe: "قدرة ممتازة.", interestCoverageRatio_comment_risk: "خطر.", financialLeverage: "الرافعة المالية", financialLeverage_comment_high: "اعتماد كبير.", financialLeverage_comment_low: "اعتماد منخفض.",
        netProfitMargin: "هامش صافي الربح", netProfitMargin_comment_high: "ربحية ممتازة.", netProfitMargin_comment_avg: "ربحية مقبولة.", netProfitMargin_comment_low: "خسائر.", grossProfitMargin: "نسبة مجمل الربح", grossProfitMargin_comment_high: "هامش قوي.", grossProfitMargin_comment_low: "هامش ضعيف.", roa: "العائد على الأصول (ROA)", roa_comment_high: "كفاءة عالية.", roa_comment_low: "كفاءة منخفضة.", roe: "العائد على حقوق الملكية (ROE)", roe_comment_high: "عائد ممتاز.", roe_comment_low: "عائد ضعيف.", eps: "ربحية السهم (EPS)", eps_comment_positive: "ربح للسهم.", eps_comment_negative: "خسارة للسهم.",
        peRatio: "مضاعف الربحية (P/E)", peRatio_comment: "يقارن بالقطاع.", pbRatio: "معدل السعر للقيمة الدفترية (P/B)", pbRatio_comment: "يقارن سعر السهم بقيمته الدفترية.", dividendYield: "معدل الربح الموزع للسهم", dividendYield_comment: "هام للمستثمرين الباحثين عن دخل.", payoutRatio: "نسبة التوزيع", payoutRatio_comment: "نسبة منخفضة قد تعني إعادة استثمار.",
        externalDataWarning: "تتطلب مدخلات إضافية.",
        summary_ok: "الوضع المالي يبدو مستقرًا...", summary_risk: "توجد بعض مؤشرات الخطر...", alert_liquidity_risk: "🔴 خطر سيولة...", alert_leverage_risk: "🟡 تنبيه دين مرتفع...", alert_profit_risk: "🔴 خطر ربحية...", alert_ok: "🟢 لا توجد مؤشرات خطر حرجة...", noDataForRatios: "لا توجد بيانات كافية لحساب النسب. يرجى إدخال ميزان المراجعة أولاً.",
        beInputTitle: "مدخلات الحساب", labelFixedCosts: "إجمالي التكاليف الثابتة", labelVariableCost: "التكلفة المتغيرة للوحدة", labelSellingPrice: "سعر بيع الوحدة", btnCalculate: "احسب", beResultsTitle: "النتائج", bepUnits: "نقطة التعادل (بالوحدات)", bepValue: "نقطة التعادل (بالقيمة)", beChartTitle: "رسم بياني لنقطة التعادل", errorPrice: "سعر البيع يجب أن يكون أعلى من التكلفة المتغيرة.", errorPositiveValues: "الرجاء إدخال قيم موجبة.", revenue: 'الإيرادات', totalCosts: 'إجمالي التكاليف', fixedCosts: 'التكاليف الثابتة', unitsSold: 'الوحدات المباعة', value: 'القيمة',
        dupontTitle: "تحليل دوبونت للعائد على حقوق الملكية", dupontDesc: "يساعد هذا التحليل على تفكيك العائد على حقوق الملكية (ROE)...", dupontEquation: "معادلة دوبونت:", dupontCompNPM: "هامش صافي الربح", dupontCompAT: "دوران الأصول", dupontCompEM: "مضاعف حقوق الملكية", dupontCompROE: "العائد على حقوق الملكية", dupontDataWarning: "لا توجد بيانات كافية (من ميزان المراجعة) لإجراء تحليل دوبونت.", dupontInterpretationHighROE: "🟢 العائد المرتفع...", dupontInterpretationLowROE: "🟡 العائد المنخفض...", dupontFactorProfitability: "ربحية تشغيلية قوية...", dupontFactorEfficiency: "كفاءة أصول عالية...", dupontFactorLeverage: "استخدام الرفع المالي...", dupontFactorLowProfitability: "ربحية تشغيلية ضعيفة...", dupontFactorLowEfficiency: "كفاءة أصول منخفضة...", dupontFactorLowLeverage: "اعتماد منخفض على الديون...",
        verticalTitle: "التحليل الرأسي (القوائم ذات الحجم الموحد)", verticalDesc: "يعرض كل بند في القوائم المالية كنسبة مئوية...", verticalDataWarning: "لا توجد بيانات كافية (من ميزان المراجعة) لإجراء التحليل الرأسي.", verticalBS: "الميزانية العمومية (% من إجمالي الأصول)", verticalIS: "قائمة الدخل (% من صافي الإيرادات)", verticalAccount: "الحساب", verticalValue: "القيمة", verticalPercent: "النسبة %",
        // *** مُضاف: ترجمات تعليق التحليل الرأسي ***
        verticalInterpretationTitle: "أبرز الملاحظات:",
        verticalLargestAsset: "أكبر بند أصول هو {account} بنسبة {percent}.",
        verticalLargestLiability: "أكبر بند خصوم هو {account} بنسبة {percent} (من إجمالي الخصوم وحقوق الملكية).",
        verticalLargestEquity: "أكبر بند حقوق ملكية هو {account} بنسبة {percent} (من إجمالي الخصوم وحقوق الملكية).",
        verticalLargestExpense: "أكبر بند مصروفات هو {account} بنسبة {percent} من الإيرادات.",
        verticalGrossMarginComment: "هامش الربح الإجمالي يبلغ {percent}.",
        // *** نهاية الإضافة ***
        zscoreTitle: "نموذج Altman Z-Score (للتنبؤ بالإفلاس)", zscoreDesc: "نموذج إحصائي يستخدم مجموعة من النسب المالية...", zscoreDataWarning: "لا توجد بيانات كافية لحساب نموذج Z-Score...", zscoreValueLabel: "قيمة Z-Score:", zscoreInterpretation: "التفسير:", zscoreZoneSafe: "🟢 منطقة آمنة", zscoreZoneGrey: "🟡 منطقة رمادية", zscoreZoneDistress: "🔴 منطقة الخطر", zscoreComponents: "مكونات النموذج:", zscoreX1: "X1 (رأس المال العامل / الأصول):", zscoreX2: "X2 (الأرباح المحتجزة / الأصول):", zscoreX3: "X3 (الأرباح قبل الفوائد والضرائب / الأصول):", zscoreX4: "X4 (حقوق الملكية / الخصوم):", zscoreX5: "X5 (الإيرادات / الأصول):", zscoreRetainedEarningsNotFound: "(لم يتم العثور على أرباح محتجزة)",
        cfTitle: "تحليل التدفقات النقدية (تقديري)", cfDesc: "يقدم هذا القسم تقديرًا لقائمة التدفقات النقدية...", cfDataWarning: "لا توجد بيانات كافية لتقدير التدفقات النقدية.", cfStmtTitle: "قائمة التدفقات النقدية المقدرة", cfNetIncome: "صافي الدخل", cfDepreciationAmortization: "الإهلاك والاستهلاك (مقدر)", cfChangesWC: "التغيرات في رأس المال العامل (مقدر)", cfOperating: "التدفق النقدي التشغيلي", cfInvesting: "التدفق النقدي الاستثماري (مقدر)", cfFinancing: "التدفق النقدي التمويلي (مقدر)", cfNetChange: "صافي التغير في النقدية", cfRatiosTitle: "نسب التدفقات النقدية", cfRatioOCF: "نسبة التدفق النقدي التشغيلي", cfRatioFCF: "التدفق النقدي الحر (مقدر)", cfInterpretationPositiveOCF: "🟢 عمليات الشركة تولد نقدًا.", cfInterpretationNegativeOCF: "🔴 عمليات الشركة تستهلك نقدًا.", cfInterpretationFCF: "التدفق النقدي الحر...",
        evaInputTitle: "مدخلات حساب (EVA)", evaInputDesc: "لحساب القيمة الاقتصادية المضافة، نحتاج إلى افتراضات خارجية.", labelWACC: "متوسط تكلفة رأس المال (WACC)", labelTaxRate: "معدل الضريبة الفعلي", evaResultsTitle: "نتائج تحليل القيمة الاقتصادية المضافة (EVA)", evaDataWarning: "لا توجد بيانات كافية من ميزان المراجعة لحساب (EVA). تأكد من وجود أصول، وخصوم، وأرباح قبل الفوائد والضرائب.", evaValueLabel: "القيمة الاقتصادية المضافة (EVA):", evaInterpretation: "التفسير:", evaInterpretationPositive: "🟢 خلق للقيمة: الشركة تحقق عائداً أعلى من تكلفة رأس المال، مما يزيد من ثروة المساهمين.", evaInterpretationNegative: "🔴 تدمير للقيمة: الشركة تحقق عائداً أقل من تكلفة رأس المال، مما يقلل من ثروة المساهمين.", evaComponents: "مكونات الحساب:", evaNOPAT: "صافي الربح التشغيلي بعد الضرائب (NOPAT)", evaInvestedCapital: "رأس المال المستثمر (IC)", evaCapitalCharge: "تكلفة رأس المال (IC x WACC)"
    },
    en: { 
        pageTitle: "Advanced Analytics — Financial Analyzer", pageHeader: "Advanced Analytics", pageSubheader: "Use specialized analytical tools...", 
        tabRatios: "Financial Ratios", tabBreakeven: "Break-even Analysis", tabDupont: "DuPont Analysis", tabVertical: "Vertical Analysis", tabZScore: "Altman Z-Score", tabCashFlow: "Cash Flow Analysis",
        tabEVA: "Economic Value Added (EVA)",
        liquidityRatios: "Liquidity Indicators", profitabilityRatios: "Profitability Indicators", leverageRatios: "Leverage & Indebtedness Indicators", activityRatios: "Activity Indicators", valuationRatios: "Valuation Indicators",
        currentRatio: "Current Ratio", currentRatio_comment_high: "Excellent liquidity...", currentRatio_comment_good: "Good liquidity...", currentRatio_comment_low: "Risk indicator...", quickRatio: "Quick Ratio", quickRatio_comment_good: "Good ability...", quickRatio_comment_low: "Risk indicator...", netWorkingCapital: "Net Working Capital", netWorkingCapital_comment_positive: "Healthy position.", netWorkingCapital_comment_negative: "Risk indicator.", cashRatio: "Cash Ratio", cashRatio_comment_good: "Very strong ability.", cashRatio_comment_low: "Low reliance.",
        inventoryTurnover: "Inventory Turnover", inventoryTurnover_comment_high: "High efficiency.", inventoryTurnover_comment_low: "Weak or obsolete.", assetTurnover: "Asset Turnover", assetTurnover_comment_high: "Excellent efficiency.", assetTurnover_comment_low: "Low efficiency.", receivablesTurnover: "Receivables Turnover", receivablesTurnover_comment_high: "Strong collection.", receivablesTurnover_comment_low: "Slowness in collecting.", avgCollectionPeriod: "Average Collection Period", avgCollectionPeriod_comment_low: "Excellent speed.", avgCollectionPeriod_comment_high: "Long period.",
        debtToEquity: "Debt to Equity Ratio", debtToEquity_comment_low: "Safe structure.", debtToEquity_comment_good: "Good balance.", debtToEquity_comment_high: "High debt.", debtToAssets: "Debt to Assets Ratio", debtToAssets_comment_low: "Safe position.", debtToAssets_comment_high: "High risk.", interestCoverageRatio: "Interest Coverage Ratio", interestCoverageRatio_comment_safe: "Excellent ability.", interestCoverageRatio_comment_risk: "Risk.", financialLeverage: "Financial Leverage", financialLeverage_comment_high: "High reliance.", financialLeverage_comment_low: "Low reliance.",
        grossProfitMargin: "Gross Profit Margin", grossProfitMargin_comment_high: "Strong margin.", grossProfitMargin_comment_low: "Weak margin.", netProfitMargin: "Net Profit Margin", netProfitMargin_comment_high: "Excellent profitability.", netProfitMargin_comment_avg: "Acceptable profitability.", netProfitMargin_comment_low: "Losses.", roa: "Return on Assets (ROA)", roa_comment_high: "High efficiency.", roa_comment_low: "Low efficiency.", roe: "Return on Equity (ROE)", roe_comment_high: "Excellent return.", roe_comment_low: "Weak return.", eps: "Earnings Per Share (EPS)", eps_comment_positive: "Profit per share.", eps_comment_negative: "Loss per share.",
        peRatio: "P/E Ratio", peRatio_comment: "Compare to industry.", pbRatio: "Price-to-Book (P/B) Ratio", pbRatio_comment: "Compares market price to book value.", dividendYield: "Dividend Yield", dividendYield_comment: "Important for income investors.", payoutRatio: "Payout Ratio", payoutRatio_comment: "Low ratio may mean reinvesting.",
        externalDataWarning: "Requires additional inputs.",
        summary_ok: "Financial situation appears stable...", summary_risk: "Some risk indicators are present...", alert_liquidity_risk: "🔴 Liquidity Risk...", alert_leverage_risk: "🟡 High Debt Warning...", alert_profit_risk: "🔴 Profitability Risk...", alert_ok: "🟢 No critical risk indicators found...", noDataForRatios: "Not enough data to calculate ratios. Please enter Trial Balance data first.",
        beInputTitle: "Calculation Inputs", labelFixedCosts: "Total Fixed Costs", labelVariableCost: "Variable Cost per Unit", labelSellingPrice: "Selling Price per Unit", btnCalculate: "Calculate", beResultsTitle: "Results", bepUnits: "Break-even Point (Units)", bepValue: "Break-even Point (Value)", beChartTitle: "Break-even Chart", errorPrice: "Selling price must be higher than variable cost.", errorPositiveValues: "Please enter positive values.", revenue: 'Revenue', totalCosts: 'Total Costs', fixedCosts: 'Fixed Costs', unitsSold: 'Units Sold', value: 'Value',
        dupontTitle: "DuPont Analysis for ROE", dupontDesc: "This analysis helps break down the Return on Equity (ROE)...", dupontEquation: "DuPont Equation:", dupontCompNPM: "Net Profit Margin", dupontCompAT: "Asset Turnover", dupontCompEM: "Equity Multiplier", dupontCompROE: "Return on Equity", dupontDataWarning: "Insufficient data from Trial Balance to perform DuPont analysis.", dupontInterpretationHighROE: "🟢 High ROE...", dupontInterpretationLowROE: "🟡 Low ROE...", dupontFactorProfitability: "Strong operating profitability...", dupontFactorEfficiency: "High asset efficiency...", dupontFactorLeverage: "Use of financial leverage...", dupontFactorLowProfitability: "Weak operating profitability...", dupontFactorLowEfficiency: "Low asset efficiency...", dupontFactorLowLeverage: "Low reliance on debt...",
        verticalTitle: "Vertical Analysis (Common-Size Statements)", verticalDesc: "Displays each item on the financial statements as a percentage...", verticalDataWarning: "Insufficient data from Trial Balance to perform vertical analysis.", verticalBS: "Balance Sheet (% of Total Assets)", verticalIS: "Income Statement (% of Net Revenue)", verticalAccount: "Account", verticalValue: "Value", verticalPercent: "Percent %",
        // *** مُضاف: ترجمات تعليق التحليل الرأسي ***
        verticalInterpretationTitle: "Key Observations:",
        verticalLargestAsset: "The largest asset item is {account} at {percent}.",
        verticalLargestLiability: "The largest liability item is {account} at {percent} (of Total L+E).",
        verticalLargestEquity: "The largest equity item is {account} at {percent} (of Total L+E).",
        verticalLargestExpense: "The largest expense item is {account} at {percent} of Revenue.",
        verticalGrossMarginComment: "Gross Profit Margin is {percent}.",
        // *** نهاية الإضافة ***
        zscoreTitle: "Altman Z-Score (Bankruptcy Prediction)", zscoreDesc: "A statistical model that uses a combination of financial ratios...", zscoreDataWarning: "Insufficient data to calculate the Z-Score...", zscoreValueLabel: "Z-Score Value:", zscoreInterpretation: "Interpretation:", zscoreZoneSafe: "🟢 Safe Zone", zscoreZoneGrey: "🟡 Grey Zone", zscoreZoneDistress: "🔴 Distress Zone", zscoreComponents: "Model Components:", zscoreX1: "X1 (Working Capital / Assets):", zscoreX2: "X2 (Retained Earnings / Assets):", zscoreX3: "X3 (EBIT / Assets):", zscoreX4: "X4 (Equity / Liabilities):", zscoreX5: "X5 (Revenue / Assets):", zscoreRetainedEarningsNotFound: "(Retained Earnings not found)",
        cfTitle: "Cash Flow Analysis (Estimated)", cfDesc: "This section provides an estimation of the cash flow statement...", cfDataWarning: "Insufficient data to estimate cash flows.", cfStmtTitle: "Estimated Cash Flow Statement", cfNetIncome: "Net Income", cfDepreciationAmortization: "Depreciation & Amortization (Est.)", cfChangesWC: "Changes in Working Capital (Est.)", cfOperating: "Operating Cash Flow", cfInvesting: "Investing Cash Flow (Est.)", cfFinancing: "Financing Cash Flow (Est.)", cfNetChange: "Net Change in Cash", cfRatiosTitle: "Cash Flow Ratios", cfRatioOCF: "Operating Cash Flow Ratio", cfRatioFCF: "Free Cash Flow (Est.)", cfInterpretationPositiveOCF: "🟢 Company operations are generating cash.", cfInterpretationNegativeOCF: "🔴 Company operations are consuming cash.", cfInterpretationFCF: "Free Cash Flow...",
        evaInputTitle: "EVA Calculation Inputs", evaInputDesc: "To calculate Economic Value Added, we need external assumptions.", labelWACC: "Weighted Average Cost of Capital (WACC)", labelTaxRate: "Effective Tax Rate", evaResultsTitle: "Economic Value Added (EVA) Analysis", evaDataWarning: "Insufficient data from Trial Balance to calculate EVA. Ensure Assets, Liabilities, and EBIT components are available.", evaValueLabel: "Economic Value Added (EVA):", evaInterpretation: "Interpretation:", evaInterpretationPositive: "🟢 Value Creation...", evaInterpretationNegative: "🔴 Value Destruction...", evaComponents: "Calculation Components:", evaNOPAT: "Net Operating Profit After Tax (NOPAT)", evaInvestedCapital: "Invested Capital (IC)", evaCapitalCharge: "Capital Charge (IC x WACC)"
    }
};

document.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        console.log("[DEBUG] Starting advanced-app.js initialization after delay...");

        const state = { 
            financials: {}, 
            ratios: {},
            breakevenChart: null,
            hasValidData: false, 
            rawData: { bsItems: [], isItems: [] } 
        };
        const lang = localStorage.getItem('lang') || 'ar';
        const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`; 

        const UI = { 
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
            // *** مُضاف: عناصر UI لتعليق التحليل الرأسي ***
            verticalInterpretation: document.getElementById('verticalInterpretation'),
            verticalInterpretationList: document.getElementById('verticalInterpretationList'),
            // *** نهاية الإضافة ***
            zscoreDataWarning: document.getElementById('zscoreDataWarning'), zscoreResultsContainer: document.getElementById('zscoreResultsContainer'),
            zscoreValue: document.getElementById('zscoreValue'), zscoreInterpretation: document.getElementById('zscoreInterpretation'),
            zscoreFactorsList: document.getElementById('zscoreFactorsList'),
            cfDataWarning: document.getElementById('cfDataWarning'), cfResultsContainer: document.getElementById('cfResultsContainer'),
            cfStatementTableBody: document.getElementById('cfStatementTableBody'), 
            cfValueOCFRatio: document.getElementById('cfValueOCFRatio'), cfValueFCF: document.getElementById('cfValueFCF'),
            cfInterpretation: document.getElementById('cfInterpretation'),
            waccInput: document.getElementById('waccInput'),
            taxRateInput: document.getElementById('taxRateInput'),
            calculateEVA: document.getElementById('calculateEVA'),
            evaDataWarning: document.getElementById('evaDataWarning'),
            evaResultsContainer: document.getElementById('evaResultsContainer'),
            evaValue: document.getElementById('evaValue'),
            evaInterpretation: document.getElementById('evaInterpretation'),
            evaValueNOPAT: document.getElementById('evaValueNOPAT'),
            evaValueInvestedCapital: document.getElementById('evaValueInvestedCapital'),
            evaValueCapitalCharge: document.getElementById('evaValueCapitalCharge')
        };
        
        const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
        const formatPercent = (value, digits = 1) => isFinite(value) && !isNaN(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
        const formatRatio = (value, digits = 2) => isFinite(value) && !isNaN(value) ? value.toFixed(digits) : "N/A";
        const formatNumber = (value, digits = 0) => isFinite(value) && !isNaN(value) ? value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "N/A";

        // ==============================================
        // === FINANCIAL CALCULATIONS (*** لا تغيير هنا عن النسخة العاملة ***) ===
        // ==============================================
        const calculateFinancials = () => {
            state.financials = {}; state.rawData = { bsItems: [], isItems: [] }; state.hasValidData = false;
            let trialData;
            try {
                const rawDataString = localStorage.getItem('trialData');
                if (!rawDataString) { console.warn("localStorage 'trialData' is missing."); return false; }
                trialData = JSON.parse(rawDataString);
                if (!Array.isArray(trialData) || trialData.length === 0 || (trialData.length === 1 && !trialData[0].Account && !toNum(trialData[0].Debit) && !toNum(trialData[0].Credit))) {
                    console.warn("Parsed 'trialData' is empty or invalid."); return false;
                }
            } catch (e) { console.error("Error parsing 'trialData':", e); return false; }

            try {
                const f = { assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0, netProfit: 0, grossProfit: 0, currentAssets: 0, inventory: 0, currentLiabilities: 0, retainedEarnings: 0, interestExpense: 0, taxExpense: 0, depreciationAmortization: 0, ppeNet: 0, longTermDebt: 0, shortTermDebt: 0, cashEquivalents: 0, accountsReceivable: 0, ebit: 0, workingCapital: 0, ocf_estimated: 0, capex_estimated: 0, icf_estimated: 0, fcf_estimated: 0, netCashChange_estimated: 0, freeCashFlow_estimated: 0 };
                trialData.forEach(row => {
                    const value = (toNum(row.Debit)) - (toNum(row.Credit));
                    const mainType = row.MainType || '';
                    const subType = row.SubType || '';
                    const accountName = (row.Account || '').toLowerCase();
                    const rawItem = { account: row.Account || 'N/A', value: 0, mainType: mainType, subType: subType };

                    if (mainType.includes('الأصول') || mainType.includes('Assets')) {
                        f.assets += value; rawItem.value = value; state.rawData.bsItems.push(rawItem);
                        if (subType.includes('متداول') || subType.includes('Current')) {
                            f.currentAssets += value;
                            if (subType.includes('المخزون') || subType.includes('Inventory') || accountName.includes('inventory') || accountName.includes('مخزون')) { f.inventory += value; }
                            if (subType.includes('النقد') || subType.includes('Cash') || accountName.includes('cash') || accountName.includes('نقد')) { f.cashEquivalents += value; }
                            if (subType.includes('عملاء') || subType.includes('Receivables') || accountName.includes('receivable') || accountName.includes('عملاء')) { f.accountsReceivable += value; }
                        } else if (subType.includes('غير متداول') || subType.includes('Non-current') || subType.includes('ثابتة') || subType.includes('fixed')) {
                            if (accountName.includes('ppe') || accountName.includes('fixed asset') || accountName.includes('أصول ثابتة')) f.ppeNet += value;
                        }
                    } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) {
                        f.liabilities -= value; rawItem.value = -value; state.rawData.bsItems.push(rawItem);
                        if (subType.includes('متداول') || subType.includes('Current')) {
                            f.currentLiabilities -= value;
                            if (subType.includes('قروض قصيرة') || subType.includes('Short-term Loans') || accountName.includes('short term debt') || accountName.includes('قرض قصير')) f.shortTermDebt -= value;
                        } else if (subType.includes('غير متداول') || subType.includes('Non-current')) {
                            if (subType.includes('قروض طويلة') || subType.includes('Long-term Loans') || accountName.includes('long term debt') || accountName.includes('قرض طويل')) f.longTermDebt -= value;
                        }
                    } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) {
                        f.equity -= value; rawItem.value = -value; state.rawData.bsItems.push(rawItem);
                        if (subType.includes('الأرباح المحتجزة') || subType.includes('Retained Earnings') || accountName.includes('retained earnings') || accountName.includes('أرباح محتجزة')) f.retainedEarnings -= value;
                    } else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) {
                        rawItem.mainType = 'Income Statement';
                        if (subType.includes('الإيرادات') || subType.includes('Revenue')) { f.revenue -= value; rawItem.value = -value; state.rawData.isItems.push(rawItem); }
                        else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) { f.cogs += value; rawItem.value = value; state.rawData.isItems.push(rawItem); }
                        else {
                            f.expenses += value; rawItem.value = value; state.rawData.isItems.push(rawItem);
                            if (subType.includes('فائدة') || subType.includes('Interest') || accountName.includes('interest')) f.interestExpense += value;
                            if (subType.includes('ضريبية') || subType.includes('Tax') || accountName.includes('tax')) f.taxExpense += value;
                            if (subType.includes('إهلاك') || subType.includes('Depreciation') || accountName.includes('depreciation') || accountName.includes('amortization') || accountName.includes('إهلاك') || accountName.includes('استهلاك')) f.depreciationAmortization += value;
                        }
                    }
                });
                Object.keys(f).forEach(key => f[key] = f[key] || 0);
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
                if (Math.abs(balanceCheck) > 1) console.warn(`Balance sheet check failed... Diff: ${balanceCheck.toFixed(2)}`);
                state.financials = f; state.hasValidData = true; console.log("Calculated Financials (Updated):", f); return true;
            } catch (e) { console.error("Error during financial calculations:", e); state.financials = {}; state.hasValidData = false; return false; }
        };
        
        const calculateAllRatios = () => { /* ... (Code from previous working version - لا تغيير هنا) ... */
          state.ratios = {}; 
          if (!state.hasValidData) { console.warn("Financials invalid, skipping ratio calculation."); return false; } 
          const f = state.financials; 
          try { 
              const assets = f.assets || 0; 
              const equity = f.equity || 0; 
              const liabilities = f.liabilities || 0; 
              const revenue = f.revenue || 0; 
              const roeStandard = (equity !== 0) ? f.netProfit / equity : Infinity;
              
              const x1 = assets !== 0 ? f.workingCapital / assets : Infinity; 
              const x2 = assets !== 0 ? f.retainedEarnings / assets : Infinity; 
              const x3 = assets !== 0 ? f.ebit / assets : Infinity; 
              const x4 = liabilities !== 0 ? equity / liabilities : Infinity; 
              const x5 = assets !== 0 ? revenue / assets : 0; // Asset Turnover
              const zScore = (isFinite(x1) && isFinite(x2) && isFinite(x3) && isFinite(x4) && isFinite(x5)) ? (0.717 * x1) + (0.847 * x2) + (3.107 * x3) + (0.420 * x4) + (0.998 * x5) : NaN; 
              
              const currentRatio = f.currentLiabilities !== 0 ? f.currentAssets / f.currentLiabilities : Infinity;
              const quickRatio = f.currentLiabilities !== 0 ? (f.currentAssets - f.inventory) / f.currentLiabilities : Infinity;
              const netWorkingCapital = f.workingCapital;
              const cashRatio = f.currentLiabilities !== 0 ? f.cashEquivalents / f.currentLiabilities : Infinity;
              const inventoryTurnover = f.inventory > 0 ? f.cogs / f.inventory : Infinity; 
              const assetTurnover = x5; 
              const receivablesTurnover = f.accountsReceivable > 0 ? f.revenue / f.accountsReceivable : Infinity; 
              const avgCollectionPeriod = isFinite(receivablesTurnover) && receivablesTurnover !== 0 ? 365 / receivablesTurnover : Infinity;
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
                  inventoryTurnover, assetTurnover, receivablesTurnover, avgCollectionPeriod,
                  debtToAssets, debtToEquity, interestCoverageRatio, financialLeverage, 
                  grossProfitMargin, netProfitMargin, roa, roe, eps, 
                  peRatio, pbRatio, dividendYield, payoutRatio,
                  zScoreX1: x1, zScoreX2: x2, zScoreX3: x3, zScoreX4: x4, zScoreX5: x5, zScore: zScore, 
                  equityMultiplier: financialLeverage, 
                  operatingCashFlowRatio: f.currentLiabilities !== 0 ? f.ocf_estimated / f.currentLiabilities : Infinity, 
                  freeCashFlow: f.freeCashFlow_estimated 
              }; 
              console.log("Calculated Ratios (Full Set):", state.ratios); return true; 
          } catch(e) { 
              console.error("Error calculating ratios:", e); 
              state.ratios = {}; state.hasValidData = false; return false; 
          }
      };

        // ==============================================
        // === RENDERING FUNCTIONS (*** Existing + Vertical Commentary Added ***) ===
        // ==============================================
        
        const getRatioComment = (key, value) => { /* ... (Code from previous working version - لا تغيير هنا) ... */
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
        
        const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => { /* ... (Code from previous working version - لا تغيير هنا) ... */
          const container = document.getElementById(divId); 
          if (!container) { console.error(`Element not found: ${divId}`); return; } 
          if (!state.hasValidData) { container.innerHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <p class="text-muted">${t_page('noDataForRatios')}</p>`; return; } 
          let tableHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <div class="table-responsive"> <table class="table table-sm table-striped"> <thead><tr><th>${t_page('thRatio')}</th><th class="text-end">${t_page('thValue')}</th><th>${t_page('thComment')}</th></tr></thead> <tbody>`; 
          ratioKeys.forEach(key => { 
              const value = state.ratios[key]; 
              let formattedValue;
              if (key === 'netWorkingCapital') { formattedValue = formatNumber(value, 0); } 
              else if (key === 'avgCollectionPeriod') { formattedValue = `${formatRatio(value, 0)} ${lang === 'ar' ? 'يوم' : 'Days'}`; } 
              else if (['grossProfitMargin', 'netProfitMargin', 'roa', 'roe', 'dividendYield', 'payoutRatio'].includes(key)) { formattedValue = formatPercent(value); } 
              else if (key === 'eps') { formattedValue = formatRatio(value, 2); } 
              else { formattedValue = formatRatio(value, 2); }
              if (isNaN(value) && ['eps', 'peRatio', 'pbRatio', 'dividendYield', 'payoutRatio'].includes(key)) { formattedValue = "N/A"; }
              const comment = getRatioComment(key, value); 
              tableHTML += `<tr> <td>${t_page(key)}</td> <td class="text-end"><strong>${formattedValue}</strong></td> <td class="text-muted small">${comment}</td> </tr>`; 
          }); 
          container.innerHTML = tableHTML + `</tbody></table></div>`; 
      };

        const renderSidebar = () => { /* ... (Code from previous working version - لا تغيير هنا) ... */
          if (!state.hasValidData) { UI.smartSummary.textContent = lang === 'ar' ? '...' : '...'; UI.alertsArea.innerHTML = `<div>${lang === 'ar' ? '...' : '...'}</div>`; return; } const { netProfitMargin, currentRatio, debtToEquity } = state.ratios; UI.smartSummary.textContent = netProfitMargin > 0 && currentRatio > 1.5 ? t_page('summary_ok') : t_page('summary_risk'); const alerts = []; if (currentRatio < 1 && isFinite(currentRatio)) alerts.push(t_page('alert_liquidity_risk')); if (debtToEquity > 2 && isFinite(debtToEquity)) alerts.push(t_page('alert_leverage_risk')); if (netProfitMargin < 0 && isFinite(netProfitMargin)) alerts.push(t_page('alert_profit_risk')); UI.alertsArea.innerHTML = alerts.length > 0 ? alerts.map(alert => `<div>${alert}</div>`).join('') : `<div>${t_page('alert_ok')}</div>`;
      };
        const calculateAndDisplayBreakeven = () => { /* ... (Code from previous working version - لا تغيير هنا) ... */
          const fixed = toNum(UI.fixedCosts.value); const variable = toNum(UI.variableCost.value); const price = toNum(UI.sellingPrice.value); if (price <= 0 || variable < 0 || fixed < 0) { alert(t_page('errorPositiveValues')); return; } if (price <= variable) { alert(t_page('errorPrice')); return; } const contributionMargin = price - variable; const bepUnits = fixed / contributionMargin; const bepValue = bepUnits * price; UI.bepUnitsResult.textContent = Math.ceil(bepUnits).toLocaleString(); UI.bepValueResult.textContent = formatNumber(bepValue, 2); UI.breakevenResults.style.display = 'block'; renderBreakevenChart(fixed, variable, price, bepUnits);
      };
        const renderBreakevenChart = (fixed, variable, price, bepUnits) => { /* ... (Code from previous working version - لا تغيير هنا) ... */
          if (!UI.breakevenChartCanvas) return; if (state.breakevenChart) { state.breakevenChart.destroy(); } let maxUnits = 100; if (bepUnits > 0 && isFinite(bepUnits)) { maxUnits = Math.max(100, Math.ceil(bepUnits * 2 / 10) * 10); } else if (fixed === 0 && price > variable) { maxUnits = 100; } else if (price <= variable) { maxUnits = 100; } const step = maxUnits / 10; const labels = Array.from({ length: 11 }, (_, i) => Math.round(step * i)); const fixedCostsData = labels.map(() => fixed); const totalCostsData = labels.map(unit => fixed + (variable * unit)); const revenueData = labels.map(unit => price * unit); const ctx = UI.breakevenChartCanvas.getContext('2d'); state.breakevenChart = new Chart(ctx, { type: 'line', data: { labels: labels, datasets: [ { label: t_page('revenue'), data: revenueData, borderColor: 'rgba(75, 192, 192, 1)', fill: false, tension: 0.1 }, { label: t_page('totalCosts'), data: totalCostsData, borderColor: 'rgba(255, 99, 132, 1)', fill: false, tension: 0.1 }, { label: t_page('fixedCosts'), data: fixedCostsData, borderColor: 'rgba(255, 159, 64, 1)', borderDash: [5, 5], fill: false, tension: 0.1 } ] }, options: { responsive: true, maintainAspectRatio: false, interaction: { intersect: false, mode: 'index', }, scales: { x: { title: { display: true, text: t_page('unitsSold') } }, y: { title: { display: true, text: t_page('value') }, beginAtZero: true } }, plugins: { tooltip: { callbacks: { label: function(context) { return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`; } } } } } });
      };
        
        const calculateAndDisplayDupont = () => { /* ... (Code from previous working version - لا تغيير هنا) ... */
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
        
        // *** مُعدل: تم إضافة منطق توليد وعرض التعليقات ***
        const calculateAndDisplayVerticalAnalysis = () => { 
            if (!state.hasValidData || !state.rawData || (!state.rawData.bsItems.length && !state.rawData.isItems.length)) { 
                if(UI.verticalDataWarning) { UI.verticalDataWarning.textContent = t_page('verticalDataWarning'); UI.verticalDataWarning.style.display = 'block'; } 
                if(UI.verticalResultsContainer) UI.verticalResultsContainer.style.display = 'none'; 
                if(UI.verticalInterpretation) UI.verticalInterpretation.style.display = 'none'; // إخفاء التعليق أيضاً
                return; 
            } 
            if(UI.verticalDataWarning) UI.verticalDataWarning.style.display = 'none'; 
            if(UI.verticalResultsContainer) UI.verticalResultsContainer.style.display = 'block'; 
            if(UI.verticalInterpretation) UI.verticalInterpretation.style.display = 'block'; // إظهار قسم التعليق

            const totalAssets = state.financials.assets || 0; 
            const totalRevenue = state.financials.revenue || 0; 
            const totalLiabEquity = (state.financials.liabilities || 0) + (state.financials.equity || 0) + (state.financials.netProfit || 0); // لحساب نسب الخصوم/الملكية

            let bsTableHTML = `<table class="table table-sm table-striped"><thead><tr><th>${t_page('verticalAccount')}</th><th class="text-end">${t_page('verticalValue')}</th><th class="text-end">${t_page('verticalPercent')}</th></tr></thead><tbody>`; 
            const sortedBsItems = [...state.rawData.bsItems].sort((a,b) => Math.abs(b.value || 0) - Math.abs(a.value || 0));
            sortedBsItems.forEach(item => { 
                const percentage = totalAssets !== 0 ? ((item.value || 0) / totalAssets) : 0; 
                const displayValue = Math.abs(item.value || 0);
                bsTableHTML += `<tr><td>${item.account}</td><td class="text-end">${formatNumber(displayValue)}</td><td class="text-end">${formatPercent(Math.abs(percentage))}</td></tr>`; 
            }); 
            bsTableHTML += `<tr class="table-light fw-bold"><td>${lang === 'ar' ? 'الإجمالي' : 'Total'}</td><td class="text-end">${formatNumber(totalAssets)}</td><td class="text-end">100.0%</td></tr>`; 
            bsTableHTML += `</tbody></table>`; 
            if(UI.verticalBSTable) UI.verticalBSTable.innerHTML = bsTableHTML; 

            let isTableHTML = `<table class="table table-sm table-striped"><thead><tr><th>${t_page('verticalAccount')}</th><th class="text-end">${t_page('verticalValue')}</th><th class="text-end">${t_page('verticalPercent')}</th></tr></thead><tbody>`; 
            const sortedIsItems = [...state.rawData.isItems].sort((a, b) => {
                if (a.subType.includes('الإيرادات') || a.subType.includes('Revenue')) return -1;
                if (b.subType.includes('الإيرادات') || b.subType.includes('Revenue')) return 1;
                return Math.abs(b.value || 0) - Math.abs(a.value || 0);
            });
            let grossProfit = 0; // Will be calculated for commentary
            sortedIsItems.forEach(item => { 
                const itemValue = item.value || 0;
                const percentage = totalRevenue !== 0 ? (itemValue / totalRevenue) : 0; 
                const displayValue = Math.abs(itemValue);
                // Calculate gross profit for commentary
                if (item.subType.includes('الإيرادات') || item.subType.includes('Revenue')) grossProfit += displayValue;
                if (item.subType.includes('تكلفة المبيعات') || item.subType.includes('COGS')) grossProfit -= displayValue;

                isTableHTML += `<tr><td>${item.account}</td><td class="text-end">${formatNumber(displayValue)}</td><td class="text-end">${formatPercent(Math.abs(percentage))}</td></tr>`; 
            }); 
            isTableHTML += `<tr class="table-light fw-bold"><td>${lang === 'ar' ? 'صافي الإيرادات' : 'Net Revenue'}</td><td class="text-end">${formatNumber(totalRevenue)}</td><td class="text-end">100.0%</td></tr>`; 
            isTableHTML += `</tbody></table>`; 
            if(UI.verticalISTable) UI.verticalISTable.innerHTML = isTableHTML; 

            // *** توليد التعليقات ***
            let interpretationHTML = '';
            const comments = [];

            // أكبر أصل
            const largestAsset = sortedBsItems.find(item => item.mainType.includes('الأصول') || item.mainType.includes('Assets'));
            if (largestAsset && totalAssets !== 0) {
                 const percent = ((largestAsset.value || 0) / totalAssets);
                 comments.push(t_page('verticalLargestAsset').replace('{account}', largestAsset.account).replace('{percent}', formatPercent(percent)));
            }

            // أكبر خصم
            const largestLiability = sortedBsItems.find(item => item.mainType.includes('الخصوم') || item.mainType.includes('Liabilities'));
             if (largestLiability && totalLiabEquity !== 0) {
                 const percent = (Math.abs(largestLiability.value || 0) / totalLiabEquity);
                 comments.push(t_page('verticalLargestLiability').replace('{account}', largestLiability.account).replace('{percent}', formatPercent(percent)));
            }
            
            // أكبر حق ملكية
            const largestEquity = sortedBsItems.find(item => item.mainType.includes('حقوق الملكية') || item.mainType.includes('Equity'));
             if (largestEquity && totalLiabEquity !== 0) {
                 const percent = (Math.abs(largestEquity.value || 0) / totalLiabEquity);
                 comments.push(t_page('verticalLargestEquity').replace('{account}', largestEquity.account).replace('{percent}', formatPercent(percent)));
            }

            // هامش الربح الإجمالي
             if (totalRevenue !== 0) {
                const grossMarginPercent = grossProfit / totalRevenue;
                comments.push(t_page('verticalGrossMarginComment').replace('{percent}', formatPercent(grossMarginPercent)));
            }

            // أكبر مصروف (غير الإيرادات وتكلفة البضاعة)
            const largestExpense = sortedIsItems.find(item => 
                !(item.subType.includes('الإيرادات') || item.subType.includes('Revenue') || item.subType.includes('تكلفة المبيعات') || item.subType.includes('COGS'))
            );
             if (largestExpense && totalRevenue !== 0) {
                 const percent = (Math.abs(largestExpense.value || 0) / totalRevenue);
                 comments.push(t_page('verticalLargestExpense').replace('{account}', largestExpense.account).replace('{percent}', formatPercent(percent)));
            }

            comments.forEach(comment => {
                interpretationHTML += `<li>${comment}</li>`;
            });

            if (UI.verticalInterpretationList) {
                UI.verticalInterpretationList.innerHTML = interpretationHTML;
            } else {
                console.warn("Element 'verticalInterpretationList' not found for commentary.");
            }
        };
        const calculateAndDisplayZScore = () => { /* ... (Code from previous working version - لا تغيير هنا) ... */
           if (!state.hasValidData || !isFinite(state.ratios.zScore)) { if(UI.zscoreDataWarning) { UI.zscoreDataWarning.textContent = t_page('zscoreDataWarning'); UI.zscoreDataWarning.style.display = 'block'; } if(UI.zscoreResultsContainer) UI.zscoreResultsContainer.style.display = 'none'; return; } if(UI.zscoreDataWarning) UI.zscoreDataWarning.style.display = 'none'; if(UI.zscoreResultsContainer) UI.zscoreResultsContainer.style.display = 'block'; const z = state.ratios.zScore; let interpretation = ''; let interpretationClass = ''; if (z > 2.9) { interpretation = t_page('zscoreZoneSafe'); interpretationClass = 'text-success'; } else if (z > 1.23) { interpretation = t_page('zscoreZoneGrey'); interpretationClass = 'text-warning'; } else { interpretation = t_page('zscoreZoneDistress'); interpretationClass = 'text-danger'; } if(UI.zscoreValue) UI.zscoreValue.textContent = formatRatio(z, 3); if(UI.zscoreInterpretation) { UI.zscoreInterpretation.textContent = interpretation; UI.zscoreInterpretation.className = `h5 fw-bold ${interpretationClass}`; } let factorsHTML = ''; const factors = ['zScoreX1', 'zScoreX2', 'zScoreX3', 'zScoreX4', 'zScoreX5']; factors.forEach(key => { const value = state.ratios[key]; let label = t_page(key.replace('zScore', 'zscore')); if (key === 'zScoreX2' && state.financials.retainedEarnings === 0 && !isFinite(value)) { label += ` <small class="text-muted">${t_page('zscoreRetainedEarningsNotFound')}</small>`; } factorsHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">${label} <span class="badge bg-secondary rounded-pill">${formatRatio(value)}</span></li>`; }); if(UI.zscoreFactorsList) UI.zscoreFactorsList.innerHTML = factorsHTML;
      };
        const calculateAndDisplayCashFlowAnalysis = () => { /* ... (Code from previous working version - لا تغيير هنا) ... */
          if (!state.hasValidData) { if(UI.cfDataWarning) { UI.cfDataWarning.textContent = t_page('cfDataWarning'); UI.cfDataWarning.style.display = 'block'; } if(UI.cfResultsContainer) UI.cfResultsContainer.style.display = 'none'; return; } if(UI.cfDataWarning) UI.cfDataWarning.style.display = 'none'; if(UI.cfResultsContainer) UI.cfResultsContainer.style.display = 'block'; const f = state.financials; const r = state.ratios; let stmtHTML = ` <tr><td>${t_page('cfNetIncome')}</td><td class="text-end">${formatNumber(f.netProfit)}</td></tr> <tr><td class="ps-3">${t_page('cfDepreciationAmortization')}</td><td class="text-end">${formatNumber(f.depreciationAmortization)}</td></tr> <tr><td class="text-muted ps-3">${t_page('cfChangesWC')}</td><td class="text-end text-muted">(N/A)</td></tr> <tr class="table-light fw-bold"><td>${t_page('cfOperating')}</td><td class="text-end">${formatNumber(f.ocf_estimated)}</td></tr> <tr><td>${t_page('cfInvesting')}</td><td class="text-end">${formatNumber(f.icf_estimated)}</td></tr> <tr><td>${t_page('cfFinancing')}</td><td class="text-end">${formatNumber(f.fcf_estimated)}</td></tr> <tr class="table-light fw-bold border-top"><td>${t_page('cfNetChange')}</td><td class="text-end">${formatNumber(f.netCashChange_estimated)}</td></tr> `; if(UI.cfStatementTableBody) UI.cfStatementTableBody.innerHTML = stmtHTML; if(UI.cfValueOCFRatio) UI.cfValueOCFRatio.textContent = formatRatio(r.operatingCashFlowRatio); if(UI.cfValueFCF) UI.cfValueFCF.textContent = formatNumber(r.freeCashFlow); let interpretation = ''; if (isFinite(f.ocf_estimated)) { interpretation += f.ocf_estimated > 0 ? `<p>${t_page('cfInterpretationPositiveOCF')}</p>` : `<p>${t_page('cfInterpretationNegativeOCF')}</p>`; } if (isFinite(r.freeCashFlow)) { interpretation += `<p>${t_page('cfInterpretationFCF')}</p>`; } if(UI.cfInterpretation) UI.cfInterpretation.innerHTML = interpretation || `<p class="text-muted">${lang==='ar'?'...':'...'}</p>`;
      };
        const calculateAndDisplayEVA = () => { /* ... (Code from previous working version - لا تغيير هنا) ... */
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
          const investedCapital = f.assets - nonInterestBearingCL;
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

        // ==============================================
        // === RUN ANALYSIS & INITIALIZATION (*** لا تغيير هنا عن النسخة العاملة ***) ===
        // ==============================================
        
        const runAnalysis = () => {
            console.log("Running full analysis...");
            if (!calculateFinancials()) { state.hasValidData = false; } 
            else { state.hasValidData = calculateAllRatios(); }

            renderRatioCategory('liquidityRatios', 'liquidityRatios', 
                ['currentRatio', 'quickRatio', 'netWorkingCapital', 'cashRatio']);
            renderRatioCategory('profitabilityRatios', 'profitabilityRatios', 
                ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe', 'eps']);
            renderRatioCategory('leverageRatios', 'leverageRatios', 
                ['debtToAssets', 'debtToEquity', 'interestCoverageRatio', 'financialLeverage']);
            renderRatioCategory('efficiencyRatios', 'activityRatios', 
                ['inventoryTurnover', 'assetTurnover', 'receivablesTurnover', 'avgCollectionPeriod']);
            renderRatioCategory('valuationRatios', 'valuationRatios', 
                ['peRatio', 'pbRatio', 'dividendYield', 'payoutRatio']);
            
            renderSidebar();
            return state.hasValidData; 
        };

        const init = () => {
            console.log("Initializing advanced page...");
            
            setTimeout(() => {
                console.log("[DEBUG] Running initial analysis after delay...");
                runAnalysis(); // Run once on load after delay
                
                // Initial calculations/display for all tabs
                calculateAndDisplayDupont(); 
                calculateAndDisplayVerticalAnalysis(); // سيعرض التعليقات الآن
                calculateAndDisplayZScore();
                calculateAndDisplayCashFlowAnalysis(); 
                calculateAndDisplayEVA(); 
                
                if (typeof window.applyTranslations === 'function') { 
                    console.log("Applying translations...");
                    window.applyTranslations(); 
                } 
                else { console.warn("applyTranslations function not found."); }
                
                console.log("Advanced page initialized.");

            }, 100); 

            if (UI.calculateBreakeven) {
                UI.calculateBreakeven.addEventListener('click', calculateAndDisplayBreakeven);
            } else { console.warn("Breakeven calculate button not found"); }

            if (UI.calculateEVA) {
                UI.calculateEVA.addEventListener('click', calculateAndDisplayEVA);
            } else { console.warn("EVA calculate button not found"); }

            // Tab Change Listeners (*** مُعدل: تحديث استدعاء vertical analysis ***)
            const tabs = ['ratios', 'breakeven', 'dupont', 'vertical', 'zscore', 'cashflow', 'eva']; 
            tabs.forEach(tabId => {
                const tabElement = document.getElementById(`${tabId}-tab`);
                if (tabElement) {
                    tabElement.addEventListener('shown.bs.tab', () => {
                         console.log(`${tabId} tab shown`);
                         if (!state.hasValidData) { console.log("No valid data..."); runAnalysis(); } // Re-run if data was missing
                         
                        // استدعاء دوال العرض للتأكد من تحديث المحتوى عند التنقل بين التبويبات
                         if (tabId === 'ratios') runAnalysis(); // Refresh ratios if needed
                         if (tabId === 'breakeven' && state.breakevenChart) { state.breakevenChart.resize(); }
                         if (tabId === 'dupont') calculateAndDisplayDupont();
                         if (tabId === 'vertical') calculateAndDisplayVerticalAnalysis(); // Refresh vertical analysis + commentary
                         if (tabId === 'zscore') calculateAndDisplayZScore();
                         if (tabId === 'cashflow') calculateAndDisplayCashFlowAnalysis(); 
                         if (tabId === 'eva') calculateAndDisplayEVA(); 
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
