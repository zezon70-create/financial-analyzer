// js/advanced-app.js (Full Version + EVA Tab + 20 Comprehensive Ratios Added)

window.pageTranslations = {
    ar: { 
        pageTitle: "التحليلات المتقدمة — المحلل المالي", pageHeader: "التحليلات المتقدمة", pageSubheader: "استخدم أدوات تحليلية متخصصة للحصول على رؤى أعمق حول أداء عملك.",
        tabRatios: "النسب المالية", tabBreakeven: "تحليل التعادل", tabDupont: "تحليل دوبونت", tabVertical: "التحليل الرأسي", tabZScore: "نموذج Z-Score", tabCashFlow: "تحليل التدفقات النقدية",
        tabEVA: "القيمة الاقتصادية المضافة (EVA)",
        summaryTitle: "الملخص الذكي", alertsTitle: "تنبيهات ومؤشرات خطر", thRatio: "النسبة", thValue: "القيمة", thComment: "تعليق تحليلي", 
        
        // *** مُعدل: تحديث أسماء الفئات ***
        liquidityRatios: "مؤشرات السيولة", 
        profitabilityRatios: "مؤشرات الربحية", 
        leverageRatios: "مؤشرات الروافع والمديونية", 
        activityRatios: "مؤشرات النشاط", // *** مُعدل: (كانت efficiencyRatios) ***
        valuationRatios: "مؤشرات التقييم", // *** مُضاف ***

        // *** مُعدل: تحديث التعليقات الحالية ***
        currentRatio: "نسبة التداول", 
        currentRatio_comment_high: "سيولة ممتازة. الشركة قادرة على تغطية التزاماتها القصيرة بسهولة.", 
        currentRatio_comment_good: "سيولة جيدة. وضع آمن لتغطية الالتزامات.", 
        currentRatio_comment_low: "مؤشر خطر. قد تواجه الشركة صعوبة في سداد ديونها القصيرة.", 
        quickRatio: "نسبة السيولة السريعة", 
        quickRatio_comment_good: "قدرة جيدة على الدفع الفوري (بدون الاعتماد على المخزون).", 
        quickRatio_comment_low: "مؤشر خطر. اعتماد كبير على بيع المخزون لتغطية الديون.", 
        netProfitMargin: "هامش صافي الربح", 
        netProfitMargin_comment_high: "ربحية ممتازة. كفاءة عالية في تحويل المبيعات إلى ربح صافي.", 
        netProfitMargin_comment_avg: "ربحية مقبولة. الشركة تحقق أرباحاً ولكن يمكن تحسين الكفاءة.", 
        netProfitMargin_comment_low: "خسائر. الشركة تنفق أكثر مما تكسب من المبيعات.", 
        grossProfitMargin: "نسبة مجمل الربح", 
        grossProfitMargin_comment_high: "هامش قوي. كفاءة عالية في الإنتاج والتسعير.", 
        grossProfitMargin_comment_low: "هامش ضعيف. تكلفة البضاعة مرتفعة مقارنة بالمبيعات.", 
        roa: "العائد على الأصول (ROA)", 
        roa_comment_high: "كفاءة عالية في استخدام الأصول لتوليد الأرباح.", 
        roa_comment_low: "كفاءة منخفضة. الأصول لا تولد عائداً كافياً.", 
        roe: "العائد على حقوق الملكية (ROE)", 
        roe_comment_high: "عائد ممتاز للملاك والمستثمرين.", 
        roe_comment_low: "عائد ضعيف. استثمارات الملاك لا تحقق الربح الكافي.", 
        debtToEquity: "نسبة الديون لحقوق الملكية", 
        debtToEquity_comment_low: "هيكل تمويل آمن يعتمد على الملاك بشكل كبير.", 
        debtToEquity_comment_good: "توازن جيد بين تمويل الملاك والديون.", 
        debtToEquity_comment_high: "دين مرتفع. مخاطر مالية عالية واعتماد كبير على الاقتراض.", 
        debtToAssets: "نسبة الديون للأصول", 
        debtToAssets_comment_low: "وضع آمن. معظم الأصول ممولة من حقوق الملكية.", 
        debtToAssets_comment_high: "مخاطر مرتفعة. جزء كبير من الأصول ممول بالديون.", 
        
        // *** مُضاف: نسب السيولة الجديدة ***
        netWorkingCapital: "صافي راس المال العامل",
        netWorkingCapital_comment_positive: "لديك رصيد كافي لتمويل عملياتك اليومية بعد تغطية التزاماتك. وضع صحي.",
        netWorkingCapital_comment_negative: "مؤشر خطر. الالتزامات المتداولة أعلى من الأصول المتداولة.",
        cashRatio: "نسبة النقد",
        cashRatio_comment_good: "قدرة قوية جداً على السداد الفوري. نسبة عالية جداً قد تعني عدم استغلال النقد.",
        cashRatio_comment_low: "اعتماد منخفض على النقد الفوري لتغطية الديون.",

        // *** مُضاف: نسب النشاط الجديدة (تحل محل الكفاءة) ***
        inventoryTurnover: "معدل دوران المخزون",
        inventoryTurnover_comment_high: "كفاءة عالية في بيع المخزون ومبيعات قوية.",
        inventoryTurnover_comment_low: "ضعف في المبيعات أو وجود مخزون راكد.",
        assetTurnover: "معدل دوران الأصول",
        assetTurnover_comment_high: "كفاءة ممتازة في استخدام الأصول لتوليد المبيعات.",
        assetTurnover_comment_low: "كفاءة منخفضة. الأصول لا تولد مبيعات كافية.",
        receivablesTurnover: "معدل دوران العملاء",
        receivablesTurnover_comment_high: "سياسة تحصيل قوية وفعالة.",
        receivablesTurnover_comment_low: "تباطؤ في التحصيل من العملاء، قد يؤثر على السيولة.",
        avgCollectionPeriod: "متوسط فترة التحصيل",
        avgCollectionPeriod_comment_low: "سرعة ممتازة في تحصيل الديون.",
        avgCollectionPeriod_comment_high: "فترة تحصيل طويلة، قد تسبب ضغطاً على السيولة.",

        // *** مُضاف: نسب الروافع الجديدة ***
        interestCoverageRatio: "عدد مرات تغطية الفوائد",
        interestCoverageRatio_comment_safe: "قدرة ممتازة على تغطية الفوائد. هامش أمان مرتفع.",
        interestCoverageRatio_comment_risk: "خطر في تغطية الفوائد. الأرباح بالكاد تغطي الديون.",
        financialLeverage: "الرافعة المالية",
        financialLeverage_comment_high: "اعتماد كبير على الديون لتضخيم العائد. يزيد الأرباح والمخاطر.",
        financialLeverage_comment_low: "اعتماد منخفض على الديون. مخاطر أقل وعائد أبطأ.",
        
        // *** مُضاف: نسب الربحية الجديدة ***
        eps: "ربحية السهم (EPS)",
        eps_comment_positive: "الشركة تحقق ربحاً لكل سهم.",
        eps_comment_negative: "الشركة تحقق خسارة لكل سهم.",
        
        // *** مُضاف: نسب التقييم الجديدة ***
        peRatio: "مضاعف الربحية (P/E)",
        peRatio_comment: "كم يدفع المستثمرون مقابل كل جنيه ربح. يُقارن بالقطاع.",
        pbRatio: "معدل السعر للقيمة الدفترية (P/B)",
        pbRatio_comment: "يقارن سعر السهم السوقي بقيمته الدفترية.",
        dividendYield: "معدل الربح الموزع للسهم",
        dividendYield_comment: "العائد النقدي كنسبة من سعر السهم. هام للمستثمرين الباحثين عن دخل.",
        payoutRatio: "نسبة التوزيع",
        payoutRatio_comment: "كم من الأرباح يتم توزيعه. نسبة منخفضة قد تعني إعادة استثمار للنمو.",
        
        // *** مُضاف: تحذير للبيانات الخارجية ***
        externalDataWarning: "تتطلب هذه النسبة مدخلات إضافية (مثل سعر السهم أو عدد الأسهم) غير موجودة في ميزان المراجعة.",

        // ... (باقي الترجمات الحالية لـ Breakeven, Dupont, ZScore, EVA, etc.) ...
        summary_ok: "الوضع المالي يبدو مستقرًا...", summary_risk: "توجد بعض مؤشرات الخطر...", alert_liquidity_risk: "🔴 خطر سيولة...", alert_leverage_risk: "🟡 تنبيه دين مرتفع...", alert_profit_risk: "🔴 خطر ربحية...", alert_ok: "🟢 لا توجد مؤشرات خطر حرجة...", noDataForRatios: "لا توجد بيانات كافية لحساب النسب. يرجى إدخال ميزان المراجعة أولاً.",
        beInputTitle: "مدخلات الحساب", labelFixedCosts: "إجمالي التكاليف الثابتة", labelVariableCost: "التكلفة المتغيرة للوحدة", labelSellingPrice: "سعر بيع الوحدة", btnCalculate: "احسب", beResultsTitle: "النتائج", bepUnits: "نقطة التعادل (بالوحدات)", bepValue: "نقطة التعادل (بالقيمة)", beChartTitle: "رسم بياني لنقطة التعادل", errorPrice: "سعر البيع يجب أن يكون أعلى من التكلفة المتغيرة.", errorPositiveValues: "الرجاء إدخال قيم موجبة.", revenue: 'الإيرادات', totalCosts: 'إجمالي التكاليف', fixedCosts: 'التكاليف الثابتة', unitsSold: 'الوحدات المباعة', value: 'القيمة',
        dupontTitle: "تحليل دوبونت للعائد على حقوق الملكية", dupontDesc: "يساعد هذا التحليل على تفكيك العائد على حقوق الملكية (ROE)...", dupontEquation: "معادلة دوبونت:", dupontCompNPM: "هامش صافي الربح", dupontCompAT: "دوران الأصول", dupontCompEM: "مضاعف حقوق الملكية", dupontCompROE: "العائد على حقوق الملكية", dupontDataWarning: "لا توجد بيانات كافية (من ميزان المراجعة) لإجراء تحليل دوبونت.", dupontInterpretationHighROE: "🟢 العائد المرتفع...", dupontInterpretationLowROE: "🟡 العائد المنخفض...", dupontFactorProfitability: "ربحية تشغيلية قوية...", dupontFactorEfficiency: "كفاءة أصول عالية...", dupontFactorLeverage: "استخدام الرفع المالي...", dupontFactorLowProfitability: "ربحية تشغيلية ضعيفة...", dupontFactorLowEfficiency: "كفاءة أصول منخفضة...", dupontFactorLowLeverage: "اعتماد منخفض على الديون...",
        verticalTitle: "التحليل الرأسي (القوائم ذات الحجم الموحد)", verticalDesc: "يعرض كل بند في القوائم المالية كنسبة مئوية...", verticalDataWarning: "لا توجد بيانات كافية (من ميزان المراجعة) لإجراء التحليل الرأسي.", verticalBS: "الميزانية العمومية (% من إجمالي الأصول)", verticalIS: "قائمة الدخل (% من صافي الإيرادات)", verticalAccount: "الحساب", verticalValue: "القيمة", verticalPercent: "النسبة %",
        zscoreTitle: "نموذج Altman Z-Score (للتنبؤ بالإفلاس)", zscoreDesc: "نموذج إحصائي يستخدم مجموعة من النسب المالية...", zscoreDataWarning: "لا توجد بيانات كافية لحساب نموذج Z-Score...", zscoreValueLabel: "قيمة Z-Score:", zscoreInterpretation: "التفسير:", zscoreZoneSafe: "🟢 منطقة آمنة", zscoreZoneGrey: "🟡 منطقة رمادية", zscoreZoneDistress: "🔴 منطقة الخطر", zscoreComponents: "مكونات النموذج:", zscoreX1: "X1 (رأس المال العامل / الأصول):", zscoreX2: "X2 (الأرباح المحتجزة / الأصول):", zscoreX3: "X3 (الأرباح قبل الفوائد والضرائب / الأصول):", zscoreX4: "X4 (حقوق الملكية / الخصوم):", zscoreX5: "X5 (الإيرادات / الأصول):", zscoreRetainedEarningsNotFound: "(لم يتم العثور على أرباح محتجزة)",
        cfTitle: "تحليل التدفقات النقدية (تقديري)", cfDesc: "يقدم هذا القسم تقديرًا لقائمة التدفقات النقدية...", cfDataWarning: "لا توجد بيانات كافية لتقدير التدفقات النقدية.", cfStmtTitle: "قائمة التدفقات النقدية المقدرة", cfNetIncome: "صافي الدخل", cfDepreciationAmortization: "الإهلاك والاستهلاك (مقدر)", cfChangesWC: "التغيرات في رأس المال العامل (مقدر)", cfOperating: "التدفق النقدي التشغيلي", cfInvesting: "التدفق النقدي الاستثماري (مقدر)", cfFinancing: "التدفق النقدي التمويلي (مقدر)", cfNetChange: "صافي التغير في النقدية", cfRatiosTitle: "نسب التدفقات النقدية", cfRatioOCF: "نسبة التدفق النقدي التشغيلي", cfRatioFCF: "التدفق النقدي الحر (مقدر)", cfInterpretationPositiveOCF: "🟢 عمليات الشركة تولد نقدًا.", cfInterpretationNegativeOCF: "🔴 عمليات الشركة تستهلك نقدًا.", cfInterpretationFCF: "التدفق النقدي الحر...",
        evaInputTitle: "مدخلات حساب (EVA)", evaInputDesc: "لحساب القيمة الاقتصادية المضافة، نحتاج إلى افتراضات خارجية.", labelWACC: "متوسط تكلفة رأس المال (WACC)", labelTaxRate: "معدل الضريبة الفعلي", evaResultsTitle: "نتائج تحليل القيمة الاقتصادية المضافة (EVA)", evaDataWarning: "لا توجد بيانات كافية من ميزان المراجعة لحساب (EVA). تأكد من وجود أصول، وخصوم، وأرباح قبل الفوائد والضرائب.", evaValueLabel: "القيمة الاقتصادية المضافة (EVA):", evaInterpretation: "التفسير:", evaInterpretationPositive: "🟢 خلق للقيمة: الشركة تحقق عائداً أعلى من تكلفة رأس المال، مما يزيد من ثروة المساهمين.", evaInterpretationNegative: "🔴 تدمير للقيمة: الشركة تحقق عائداً أقل من تكلفة رأس المال، مما يقلل من ثروة المساهمين.", evaComponents: "مكونات الحساب:", evaNOPAT: "صافي الربح التشغيلي بعد الضرائب (NOPAT)", evaInvestedCapital: "رأس المال المستثمر (IC)", evaCapitalCharge: "تكلفة رأس المال (IC x WACC)"
    },
    en: { 
        pageTitle: "Advanced Analytics — Financial Analyzer", pageHeader: "Advanced Analytics", pageSubheader: "Use specialized analytical tools...", 
        tabRatios: "Financial Ratios", tabBreakeven: "Break-even Analysis", tabDupont: "DuPont Analysis", tabVertical: "Vertical Analysis", tabZScore: "Altman Z-Score", tabCashFlow: "Cash Flow Analysis",
        tabEVA: "Economic Value Added (EVA)",

        // *** ADDED: English translations for all new ratios and categories ***
        liquidityRatios: "Liquidity Indicators",
        profitabilityRatios: "Profitability Indicators",
        leverageRatios: "Leverage & Indebtedness Indicators",
        activityRatios: "Activity Indicators",
        valuationRatios: "Valuation Indicators",

        currentRatio: "Current Ratio",
        currentRatio_comment_high: "Excellent liquidity. Company can easily cover short-term obligations.",
        currentRatio_comment_good: "Good liquidity. Safe position to cover obligations.",
        currentRatio_comment_low: "Risk indicator. The company might struggle to pay its short-term debts.",
        quickRatio: "Quick Ratio",
        quickRatio_comment_good: "Good ability to make immediate payments (without relying on inventory).",
        quickRatio_comment_low: "Risk indicator. High reliance on selling inventory to cover debts.",
        
        netWorkingCapital: "Net Working Capital",
        netWorkingCapital_comment_positive: "Sufficient funds for daily operations after covering liabilities. Healthy position.",
        netWorkingCapital_comment_negative: "Risk indicator. Current liabilities exceed current assets.",
        cashRatio: "Cash Ratio",
        cashRatio_comment_good: "Very strong immediate payment ability. Very high ratio might mean idle cash.",
        cashRatio_comment_low: "Low reliance on immediate cash to cover debts.",

        inventoryTurnover: "Inventory Turnover",
        inventoryTurnover_comment_high: "High efficiency in selling inventory and strong sales.",
        inventoryTurnover_comment_low: "Weak sales or presence of obsolete inventory.",
        assetTurnover: "Asset Turnover",
        assetTurnover_comment_high: "Excellent efficiency in using assets to generate sales.",
        assetTurnover_comment_low: "Low efficiency. Assets are not generating enough sales.",
        receivablesTurnover: "Receivables Turnover",
        receivablesTurnover_comment_high: "Strong and effective collection policy.",
        receivablesTurnover_comment_low: "Slowness in collecting from customers, may affect liquidity.",
        avgCollectionPeriod: "Average Collection Period",
        avgCollectionPeriod_comment_low: "Excellent speed in collecting debts.",
        avgCollectionPeriod_comment_high: "Long collection period, may cause cash flow pressure.",

        debtToEquity: "Debt to Equity Ratio",
        debtToEquity_comment_low: "Safe financing structure, relies heavily on owners.",
        debtToEquity_comment_good: "Good balance between owner financing and debt.",
        debtToEquity_comment_high: "High debt. High financial risk and heavy reliance on borrowing.",
        debtToAssets: "Debt to Assets Ratio",
        debtToAssets_comment_low: "Safe position. Most assets are financed by equity.",
        debtToAssets_comment_high: "High risk. A large portion of assets is financed by debt.",
        interestCoverageRatio: "Interest Coverage Ratio",
        interestCoverageRatio_comment_safe: "Excellent ability to cover interest payments. High safety margin.",
        interestCoverageRatio_comment_risk: "Risk in covering interest. Earnings barely cover debts.",
        financialLeverage: "Financial Leverage",
        financialLeverage_comment_high: "High reliance on debt to magnify returns. Increases profits and risks.",
        financialLeverage_comment_low: "Low reliance on debt. Lower risk and slower returns.",

        grossProfitMargin: "Gross Profit Margin",
        grossProfitMargin_comment_high: "Strong margin. High efficiency in production and pricing.",
        grossProfitMargin_comment_low: "Weak margin. Cost of goods is high compared to sales.",
        netProfitMargin: "Net Profit Margin",
        netProfitMargin_comment_high: "Excellent profitability. High efficiency in converting sales to net profit.",
        netProfitMargin_comment_avg: "Acceptable profitability. The company is profitable but efficiency can be improved.",
        netProfitMargin_comment_low: "Losses. The company is spending more than it earns from sales.",
        roa: "Return on Assets (ROA)",
        roa_comment_high: "High efficiency in using assets to generate profit.",
        roa_comment_low: "Low efficiency. Assets are not generating sufficient returns.",
        roe: "Return on Equity (ROE)",
        roe_comment_high: "Excellent return for owners and investors.",
        roe_comment_low: "Weak return. Owners' investments are not generating enough profit.",
        eps: "Earnings Per Share (EPS)",
        eps_comment_positive: "The company is generating a profit for each share.",
        eps_comment_negative: "The company is generating a loss for each share.",

        peRatio: "P/E Ratio",
        peRatio_comment: "How much investors are willing to pay per dollar of earnings. Compare to industry.",
        pbRatio: "Price-to-Book (P/B) Ratio",
        pbRatio_comment: "Compares the market price of a share to its book value.",
        dividendYield: "Dividend Yield",
        dividendYield_comment: "The cash return as a percentage of the share price. Important for income investors.",
        payoutRatio: "Payout Ratio",
        payoutRatio_comment: "How much of the net profit is paid out. A low ratio may mean reinvesting for growth.",

        externalDataWarning: "This ratio requires additional inputs (like stock price or number of shares) not found in the trial balance.",

        // ... (rest of English translations for all 6 tabs) ...
        // ... (EVA Translations) ...
        summary_ok: "Financial situation appears stable...", summary_risk: "Some risk indicators are present...", alert_liquidity_risk: "🔴 Liquidity Risk...", alert_leverage_risk: "🟡 High Debt Warning...", alert_profit_risk: "🔴 Profitability Risk...", alert_ok: "🟢 No critical risk indicators found...", noDataForRatios: "Not enough data to calculate ratios. Please enter Trial Balance data first.",
        beInputTitle: "Calculation Inputs", labelFixedCosts: "Total Fixed Costs", labelVariableCost: "Variable Cost per Unit", labelSellingPrice: "Selling Price per Unit", btnCalculate: "Calculate", beResultsTitle: "Results", bepUnits: "Break-even Point (Units)", bepValue: "Break-even Point (Value)", beChartTitle: "Break-even Chart", errorPrice: "Selling price must be higher than variable cost.", errorPositiveValues: "Please enter positive values.", revenue: 'Revenue', totalCosts: 'Total Costs', fixedCosts: 'Fixed Costs', unitsSold: 'Units Sold', value: 'Value',
        dupontTitle: "DuPont Analysis for ROE", dupontDesc: "This analysis helps break down the Return on Equity (ROE)...", dupontEquation: "DuPont Equation:", dupontCompNPM: "Net Profit Margin", dupontCompAT: "Asset Turnover", dupontCompEM: "Equity Multiplier", dupontCompROE: "Return on Equity", dupontDataWarning: "Insufficient data from Trial Balance to perform DuPont analysis.", dupontInterpretationHighROE: "🟢 High ROE...", dupontInterpretationLowROE: "🟡 Low ROE...", dupontFactorProfitability: "Strong operating profitability...", dupontFactorEfficiency: "High asset efficiency...", dupontFactorLeverage: "Use of financial leverage...", dupontFactorLowProfitability: "Weak operating profitability...", dupontFactorLowEfficiency: "Low asset efficiency...", dupontFactorLowLeverage: "Low reliance on debt...",
        verticalTitle: "Vertical Analysis (Common-Size Statements)", verticalDesc: "Displays each item on the financial statements as a percentage...", verticalDataWarning: "Insufficient data from Trial Balance to perform vertical analysis.", verticalBS: "Balance Sheet (% of Total Assets)", verticalIS: "Income Statement (% of Net Revenue)", verticalAccount: "Account", verticalValue: "Value", verticalPercent: "Percent %",
        zscoreTitle: "Altman Z-Score (Bankruptcy Prediction)", zscoreDesc: "A statistical model that uses a combination of financial ratios...", zscoreDataWarning: "Insufficient data to calculate the Z-Score...", zscoreValueLabel: "Z-Score Value:", zscoreInterpretation: "Interpretation:", zscoreZoneSafe: "🟢 Safe Zone", zscoreZoneGrey: "🟡 Grey Zone", zscoreZoneDistress: "🔴 Distress Zone", zscoreComponents: "Model Components:", zscoreX1: "X1 (Working Capital / Assets):", zscoreX2: "X2 (Retained Earnings / Assets):", zscoreX3: "X3 (EBIT / Assets):", zscoreX4: "X4 (Equity / Liabilities):", zscoreX5: "X5 (Revenue / Assets):", zscoreRetainedEarningsNotFound: "(Retained Earnings not found)",
        cfTitle: "Cash Flow Analysis (Estimated)", cfDesc: "This section provides an estimation of the cash flow statement...", cfDataWarning: "Insufficient data to estimate cash flows.", cfStmtTitle: "Estimated Cash Flow Statement", cfNetIncome: "Net Income", cfDepreciationAmortization: "Depreciation & Amortization (Est.)", cfChangesWC: "Changes in Working Capital (Est.)", cfOperating: "Operating Cash Flow", cfInvesting: "Investing Cash Flow (Est.)", cfFinancing: "Financing Cash Flow (Est.)", cfNetChange: "Net Change in Cash", cfRatiosTitle: "Cash Flow Ratios", cfRatioOCF: "Operating Cash Flow Ratio", cfRatioFCF: "Free Cash Flow (Est.)", cfInterpretationPositiveOCF: "🟢 Company operations are generating cash.", cfInterpretationNegativeOCF: "🔴 Company operations are consuming cash.", cfInterpretationFCF: "Free Cash Flow...",
        evaInputTitle: "EVA Calculation Inputs", evaInputDesc: "To calculate Economic Value Added, we need external assumptions.", labelWACC: "Weighted Average Cost of Capital (WACC)", labelTaxRate: "Effective Tax Rate", evaResultsTitle: "Economic Value Added (EVA) Analysis", evaDataWarning: "Insufficient data from Trial Balance to calculate EVA. Ensure Assets, Liabilities, and EBIT components are available.", evaValueLabel: "Economic Value Added (EVA):", evaInterpretation: "Interpretation:", evaInterpretationPositive: "🟢 Value Creation: The company is generating returns higher than its cost of capital, increasing shareholder wealth.", evaInterpretationNegative: "🔴 Value Destruction: The company is generating returns lower than its cost of capital, diminishing shareholder wealth.", evaComponents: "Calculation Components:", evaNOPAT: "Net Operating Profit After Tax (NOPAT)", evaInvestedCapital: "Invested Capital (IC)", evaCapitalCharge: "Capital Charge (IC x WACC)"
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
        // === FINANCIAL CALCULATIONS (*** مُعدل ***) ===
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
                // *** مُضاف: accountsReceivable ***
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
                            // *** مُضاف: منطق حساب العملاء ***
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
                f.capex_estimated = f.depreciationAmortization; // Simple proxy
                f.icf_estimated = -f.capex_estimated;
                f.fcf_estimated = 0; // Financing flow estimate is complex, leave 0
                f.netCashChange_estimated = f.ocf_estimated + f.icf_estimated + f.fcf_estimated;
                f.freeCashFlow_estimated = f.ocf_estimated - f.capex_estimated;
                const balanceCheck = f.assets - (f.liabilities + f.equity + f.netProfit);
                if (Math.abs(balanceCheck) > 1) console.warn(`Balance sheet check failed... Diff: ${balanceCheck.toFixed(2)}`);
                state.financials = f; state.hasValidData = true; console.log("Calculated Financials (Updated):", f); return true;
            } catch (e) { console.error("Error during financial calculations:", e); state.financials = {}; state.hasValidData = false; return false; }
        };
        
        // *** مُعدل: تم إعادة كتابة الدالة بالكامل لتشمل جميع النسب ***
        const calculateAllRatios = () => {
            state.ratios = {}; 
            if (!state.hasValidData) { console.warn("Financials invalid, skipping ratio calculation."); return false; } 
            const f = state.financials; 
            try { 
                const assets = f.assets || 0; 
                const equity = f.equity || 0; 
                const liabilities = f.liabilities || 0; 
                const revenue = f.revenue || 0; 
                const roeStandard = (equity !== 0) ? f.netProfit / equity : Infinity;
                
                // === حسابات Z-Score (من الكود الأصلي) ===
                const x1 = assets !== 0 ? f.workingCapital / assets : Infinity; 
                const x2 = assets !== 0 ? f.retainedEarnings / assets : Infinity; 
                const x3 = assets !== 0 ? f.ebit / assets : Infinity; 
                const x4 = liabilities !== 0 ? equity / liabilities : Infinity; 
                const x5 = assets !== 0 ? revenue / assets : 0; // This is Asset Turnover
                const zScore = (isFinite(x1) && isFinite(x2) && isFinite(x3) && isFinite(x4) && isFinite(x5)) ? (0.717 * x1) + (0.847 * x2) + (3.107 * x3) + (0.420 * x4) + (0.998 * x5) : NaN; 
                
                // === حسابات النسب الجديدة ===

                // 1. السيولة
                const currentRatio = f.currentLiabilities !== 0 ? f.currentAssets / f.currentLiabilities : Infinity;
                const quickRatio = f.currentLiabilities !== 0 ? (f.currentAssets - f.inventory) / f.currentLiabilities : Infinity;
                const netWorkingCapital = f.workingCapital; // تم حسابها بالفعل في calculateFinancials
                const cashRatio = f.currentLiabilities !== 0 ? f.cashEquivalents / f.currentLiabilities : Infinity;

                // 2. النشاط
                const inventoryTurnover = f.inventory > 0 ? f.cogs / f.inventory : Infinity; // الأفضل > 0
                const assetTurnover = x5; // (revenue / assets) محسوبة بالفعل في zScore
                const receivablesTurnover = f.accountsReceivable > 0 ? f.revenue / f.accountsReceivable : Infinity; // الأفضل > 0
                const avgCollectionPeriod = isFinite(receivablesTurnover) && receivablesTurnover !== 0 ? 365 / receivablesTurnover : Infinity;
                
                // 3. الروافع
                const debtToAssets = assets !== 0 ? liabilities / assets : Infinity;
                const debtToEquity = equity !== 0 ? liabilities / equity : Infinity;
                const interestCoverageRatio = f.interestExpense !== 0 ? f.ebit / f.interestExpense : Infinity;
                const financialLeverage = (equity !== 0 && assets !== 0) ? assets / equity : Infinity; // (نفسها Equity Multiplier)

                // 4. الربحية
                const grossProfitMargin = revenue !== 0 ? f.grossProfit / revenue : 0;
                const netProfitMargin = revenue !== 0 ? f.netProfit / revenue : 0;
                const roa = assets !== 0 ? f.netProfit / assets : 0;
                const roe = roeStandard; // (netProfit / equity)

                // === نسب تتطلب مدخلات خارجية (مثل عدد الأسهم، سعر السوق) ===
                // سيتم ضبطها على NaN حالياً وستعرض تعليق "بحاجة لمدخلات"
                const externalInputs = {
                    numberOfShares: 0, // Placeholder
                    marketPricePerShare: 0, // Placeholder
                    totalDividends: 0 // Placeholder
                };
                
                const eps = externalInputs.numberOfShares !== 0 ? f.netProfit / externalInputs.numberOfShares : NaN;
                const bookValuePerShare = externalInputs.numberOfShares !== 0 ? f.equity / externalInputs.numberOfShares : NaN;
                const dividendsPerShare = externalInputs.numberOfShares !== 0 ? externalInputs.totalDividends / externalInputs.numberOfShares : NaN;
                
                const peRatio = isFinite(eps) && eps !== 0 ? externalInputs.marketPricePerShare / eps : NaN;
                const pbRatio = isFinite(bookValuePerShare) && bookValuePerShare !== 0 ? externalInputs.marketPricePerShare / bookValuePerShare : NaN;
                const dividendYield = externalInputs.marketPricePerShare !== 0 ? dividendsPerShare / externalInputs.marketPricePerShare : NaN;
                const payoutRatio = f.netProfit > 0 ? externalInputs.totalDividends / f.netProfit : NaN;

                // === تجميع كل النسب في state.ratios ===
                state.ratios = { 
                    // السيولة
                    currentRatio: currentRatio, 
                    quickRatio: quickRatio, 
                    netWorkingCapital: netWorkingCapital,
                    cashRatio: cashRatio,
                    
                    // النشاط
                    inventoryTurnover: inventoryTurnover,
                    assetTurnover: assetTurnover, 
                    receivablesTurnover: receivablesTurnover,
                    avgCollectionPeriod: avgCollectionPeriod,

                    // الروافع
                    debtToAssets: debtToAssets, 
                    debtToEquity: debtToEquity, 
                    interestCoverageRatio: interestCoverageRatio,
                    financialLeverage: financialLeverage, // (Equity Multiplier)

                    // الربحية
                    grossProfitMargin: grossProfitMargin, 
                    netProfitMargin: netProfitMargin, 
                    roa: roa, 
                    roe: roe, 
                    eps: eps, // (NaN for now)

                    // التقييم (كلها NaN for now)
                    peRatio: peRatio,
                    pbRatio: pbRatio,
                    dividendYield: dividendYield,
                    payoutRatio: payoutRatio,

                    // نسب داخلية أخرى (Z-Score, CF)
                    zScoreX1: x1, zScoreX2: x2, zScoreX3: x3, zScoreX4: x4, zScoreX5: x5, zScore: zScore, 
                    equityMultiplier: financialLeverage, // (من الكود الأصلي، نستخدمه لـ Dupont)
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
        // === RENDERING FUNCTIONS (*** مُعدل ***) ===
        // ==============================================
        
        // *** مُعدل: تم توسيع الدالة لتشمل جميع التعليقات الجديدة ***
        const getRatioComment = (key, value) => { 
            if (!isFinite(value) && isNaN(value)) return "N/A"; // Standard N/A
            
            // *** مُضاف: معالجة خاصة للنسب التي تتطلب مدخلات خارجية ***
            if (isNaN(value)) {
                if (['eps', 'peRatio', 'pbRatio', 'dividendYield', 'payoutRatio'].includes(key)) {
                    return t_page('externalDataWarning');
                }
            }
        
            // Existing Liquidity
            if (key === 'currentRatio') { if (value >= 2) return t_page('currentRatio_comment_high'); if (value >= 1) return t_page('currentRatio_comment_good'); return t_page('currentRatio_comment_low'); } 
            if (key === 'quickRatio') { if (value >= 1) return t_page('quickRatio_comment_good'); return t_page('quickRatio_comment_low'); } 
            
            // *** مُضاف: تعليقات السيولة الجديدة ***
            if (key === 'netWorkingCapital') { return value > 0 ? t_page('netWorkingCapital_comment_positive') : t_page('netWorkingCapital_comment_negative'); }
            if (key === 'cashRatio') { return value >= 0.4 ? t_page('cashRatio_comment_good') : t_page('cashRatio_comment_low'); }

            // *** مُضاف: تعليقات النشاط ***
            if (key === 'inventoryTurnover') { return value >= 8 ? t_page('inventoryTurnover_comment_high') : t_page('inventoryTurnover_comment_low'); }
            if (key === 'assetTurnover') { return value >= 1 ? t_page('assetTurnover_comment_high') : t_page('assetTurnover_comment_low'); }
            if (key === 'receivablesTurnover') { return value >= 10 ? t_page('receivablesTurnover_comment_high') : t_page('receivablesTurnover_comment_low'); }
            if (key === 'avgCollectionPeriod') { return value <= 45 ? t_page('avgCollectionPeriod_comment_low') : t_page('avgCollectionPeriod_comment_high'); }

            // Existing Leverage
            if (key === 'debtToEquity') { if (value < 0.5) return t_page('debtToEquity_comment_low'); if (value <= 1.5) return t_page('debtToEquity_comment_good'); return t_page('debtToEquity_comment_high'); } 
            if (key === 'debtToAssets') { return value < 0.4 ? t_page('debtToAssets_comment_low') : t_page('debtToAssets_comment_high'); } 
            
            // *** مُضاف: تعليقات الروافع الجديدة ***
            if (key === 'interestCoverageRatio') { return value >= 3 ? t_page('interestCoverageRatio_comment_safe') : t_page('interestCoverageRatio_comment_risk'); }
            if (key === 'financialLeverage') { return value > 2.5 ? t_page('financialLeverage_comment_high') : t_page('financialLeverage_comment_low'); }

            // Existing Profitability
            if (key === 'netProfitMargin') { if (value >= 0.15) return t_page('netProfitMargin_comment_high'); if (value > 0) return t_page('netProfitMargin_comment_avg'); return t_page('netProfitMargin_comment_low'); } 
            if (key === 'grossProfitMargin') { return value >= 0.4 ? t_page('grossProfitMargin_comment_high') : t_page('grossProfitMargin_comment_low'); } 
            if (key === 'roa') { return value >= 0.05 ? t_page('roa_comment_high') : t_page('roa_comment_low'); } 
            if (key === 'roe') { return value >= 0.15 ? t_page('roe_comment_high') : t_page('roe_comment_low'); } 

            // *** مُضاف: تعليقات الربحية الجديدة ***
            if (key === 'eps') { return value > 0 ? t_page('eps_comment_positive') : t_page('eps_comment_negative'); }

            // *** مُضاف: تعليقات التقييم ***
            if (key === 'peRatio') { return t_page('peRatio_comment'); }
            if (key === 'pbRatio') { return t_page('pbRatio_comment'); }
            if (key === 'dividendYield') { return t_page('dividendYield_comment'); }
            if (key === 'payoutRatio') { return t_page('payoutRatio_comment'); }
            
            return ""; 
        };
        
        // *** مُعدل: تم تحديث الدالة لتنسيق الأرقام والأيام والنسب المئوية بشكل صحيح ***
        const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => { 
            const container = document.getElementById(divId); 
            if (!container) { console.error(`Element not found: ${divId}`); return; } 
            
            if (!state.hasValidData) { 
                container.innerHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <p class="text-muted">${t_page('noDataForRatios')}</p>`; return; 
            } 
            
            let tableHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <div class="table-responsive"> <table class="table table-sm table-striped"> <thead><tr><th>${t_page('thRatio')}</th><th class="text-end">${t_page('thValue')}</th><th>${t_page('thComment')}</th></tr></thead> <tbody>`; 
            
            ratioKeys.forEach(key => { 
                const value = state.ratios[key]; 
                
                let formattedValue;
                
                if (key === 'netWorkingCapital') {
                    formattedValue = formatNumber(value, 0); // تنسيق كرقم صحيح
                } else if (key === 'avgCollectionPeriod') {
                    formattedValue = `${formatRatio(value, 0)} ${lang === 'ar' ? 'يوم' : 'Days'}`; // تنسيق كأيام
                } else if (['grossProfitMargin', 'netProfitMargin', 'roa', 'roe', 'dividendYield', 'payoutRatio'].includes(key)) {
                    formattedValue = formatPercent(value); // تنسيق كنسبة مئوية
                } else if (key === 'eps') {
                    formattedValue = formatRatio(value, 2); // تنسيق كعملة
                } else {
                    formattedValue = formatRatio(value, 2); // تنسيق كنسبة (مثل 1.25)
                }

                // إذا كانت القيمة NaN بسبب بيانات خارجية، أظهر "N/A"
                if (isNaN(value) && ['eps', 'peRatio', 'pbRatio', 'dividendYield', 'payoutRatio'].includes(key)) {
                    formattedValue = "N/A";
                }
                
                const comment = getRatioComment(key, value); 
                
                tableHTML += `<tr> 
                                <td>${t_page(key)}</td> 
                                <td class="text-end"><strong>${formattedValue}</strong></td> 
                                <td class="text-muted small">${comment}</td> 
                             </tr>`; 
            }); 
            container.innerHTML = tableHTML + `</tbody></table></div>`; 
        };

        const renderSidebar = () => { if (!state.hasValidData) { UI.smartSummary.textContent = lang === 'ar' ? '...' : '...'; UI.alertsArea.innerHTML = `<div>${lang === 'ar' ? '...' : '...'}</div>`; return; } const { netProfitMargin, currentRatio, debtToEquity } = state.ratios; UI.smartSummary.textContent = netProfitMargin > 0 && currentRatio > 1.5 ? t_page('summary_ok') : t_page('summary_risk'); const alerts = []; if (currentRatio < 1 && isFinite(currentRatio)) alerts.push(t_page('alert_liquidity_risk')); if (debtToEquity > 2 && isFinite(debtToEquity)) alerts.push(t_page('alert_leverage_risk')); if (netProfitMargin < 0 && isFinite(netProfitMargin)) alerts.push(t_page('alert_profit_risk')); UI.alertsArea.innerHTML = alerts.length > 0 ? alerts.map(alert => `<div>${alert}</div>`).join('') : `<div>${t_page('alert_ok')}</div>`; };
        const calculateAndDisplayBreakeven = () => { const fixed = toNum(UI.fixedCosts.value); const variable = toNum(UI.variableCost.value); const price = toNum(UI.sellingPrice.value); if (price <= 0 || variable < 0 || fixed < 0) { alert(t_page('errorPositiveValues')); return; } if (price <= variable) { alert(t_page('errorPrice')); return; } const contributionMargin = price - variable; const bepUnits = fixed / contributionMargin; const bepValue = bepUnits * price; UI.bepUnitsResult.textContent = Math.ceil(bepUnits).toLocaleString(); UI.bepValueResult.textContent = formatNumber(bepValue, 2); UI.breakevenResults.style.display = 'block'; renderBreakevenChart(fixed, variable, price, bepUnits); };
        const renderBreakevenChart = (fixed, variable, price, bepUnits) => { if (!UI.breakevenChartCanvas) return; if (state.breakevenChart) { state.breakevenChart.destroy(); } let maxUnits = 100; if (bepUnits > 0 && isFinite(bepUnits)) { maxUnits = Math.max(100, Math.ceil(bepUnits * 2 / 10) * 10); } else if (fixed === 0 && price > variable) { maxUnits = 100; } else if (price <= variable) { maxUnits = 100; } const step = maxUnits / 10; const labels = Array.from({ length: 11 }, (_, i) => Math.round(step * i)); const fixedCostsData = labels.map(() => fixed); const totalCostsData = labels.map(unit => fixed + (variable * unit)); const revenueData = labels.map(unit => price * unit); const ctx = UI.breakevenChartCanvas.getContext('2d'); state.breakevenChart = new Chart(ctx, { type: 'line', data: { labels: labels, datasets: [ { label: t_page('revenue'), data: revenueData, borderColor: 'rgba(75, 192, 192, 1)', fill: false, tension: 0.1 }, { label: t_page('totalCosts'), data: totalCostsData, borderColor: 'rgba(255, 99, 132, 1)', fill: false, tension: 0.1 }, { label: t_page('fixedCosts'), data: fixedCostsData, borderColor: 'rgba(255, 159, 64, 1)', borderDash: [5, 5], fill: false, tension: 0.1 } ] }, options: { responsive: true, maintainAspectRatio: false, interaction: { intersect: false, mode: 'index', }, scales: { x: { title: { display: true, text: t_page('unitsSold') } }, y: { title: { display: true, text: t_page('value') }, beginAtZero: true } }, plugins: { tooltip: { callbacks: { label: function(context) { return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`; } } } } } }); };
        
        const calculateAndDisplayDupont = () => {
            console.log("[DEBUG] Attempting to calculate and display DuPont...");
            if (!state.hasValidData) {
                console.warn("[DEBUG] No valid data for DuPont, showing warning.");
                if(UI.dupontDataWarning) { UI.dupontDataWarning.textContent = t_page('dupontDataWarning'); UI.dupontDataWarning.style.display = 'block'; }
                if(UI.dupontFormulaDisplay) UI.dupontFormulaDisplay.style.display = 'none';
                if(UI.dupontInterpretation) UI.dupontInterpretation.innerHTML = '';
                if(UI.dupontValueNPM) UI.dupontValueNPM.textContent = 'N/A'; if(UI.dupontValueAT) UI.dupontValueAT.textContent = 'N/A'; if(UI.dupontValueEM) UI.dupontValueEM.textContent = 'N/A'; if(UI.dupontValueROE) UI.dupontValueROE.textContent = 'N/A';
                return;
            }
            console.log("[DEBUG] Rendering DuPont with data...");
            if(UI.dupontDataWarning) UI.dupontDataWarning.style.display = 'none'; if(UI.dupontFormulaDisplay) UI.dupontFormulaDisplay.style.display = 'block';
            const npm = state.ratios.netProfitMargin; const at = state.ratios.assetTurnover; const em = state.ratios.equityMultiplier; // (equityMultiplier is used by Dupont)
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
        
        const calculateAndDisplayVerticalAnalysis = () => { if (!state.hasValidData || !state.rawData || (!state.rawData.bsItems.length && !state.rawData.isItems.length)) { if(UI.verticalDataWarning) { UI.verticalDataWarning.textContent = t_page('verticalDataWarning'); UI.verticalDataWarning.style.display = 'block'; } if(UI.verticalResultsContainer) UI.verticalResultsContainer.style.display = 'none'; return; } if(UI.verticalDataWarning) UI.verticalDataWarning.style.display = 'none'; if(UI.verticalResultsContainer) UI.verticalResultsContainer.style.display = 'block'; const totalAssets = state.financials.assets || 0; const totalRevenue = state.financials.revenue || 0; let bsTableHTML = `<table class="table table-sm table-striped"><thead><tr><th>${t_page('verticalAccount')}</th><th class="text-end">${t_page('verticalValue')}</th><th class="text-end">${t_page('verticalPercent')}</th></tr></thead><tbody>`; state.rawData.bsItems.sort((a,b) => b.value - a.value).forEach(item => { const percentage = totalAssets !== 0 ? (item.value / totalAssets) : 0; bsTableHTML += `<tr><td>${item.account}</td><td class="text-end">${formatNumber(item.value)}</td><td class="text-end">${formatPercent(percentage)}</td></tr>`; }); bsTableHTML += `<tr class="table-light fw-bold"><td>${lang === 'ar' ? 'الإجمالي' : 'Total'}</td><td class="text-end">${formatNumber(totalAssets)}</td><td class="text-end">100.0%</td></tr>`; bsTableHTML += `</tbody></table>`; if(UI.verticalBSTable) UI.verticalBSTable.innerHTML = bsTableHTML; let isTableHTML = `<table class="table table-sm table-striped"><thead><tr><th>${t_page('verticalAccount')}</th><th class="text-end">${t_page('verticalValue')}</th><th class="text-end">${t_page('verticalPercent')}</th></tr></thead><tbody>`; state.rawData.isItems.sort((a,b) => b.value - a.value).forEach(item => { const percentage = totalRevenue !== 0 ? (item.value / totalRevenue) : 0; const displayValue = (item.mainType === 'Income Statement' && (item.subType.includes('الإيرادات') || item.subType.includes('Revenue'))) ? item.value : -item.value; isTableHTML += `<tr><td>${item.account}</td><td class="text-end">${formatNumber(displayValue)}</td><td class="text-end">${formatPercent(percentage)}</td></tr>`; }); isTableHTML += `<tr class="table-light fw-bold"><td>${lang === 'ar' ? 'صافي الإيرادات' : 'Net Revenue'}</td><td class="text-end">${formatNumber(totalRevenue)}</td><td class="text-end">100.0%</td></tr>`; isTableHTML += `</tbody></table>`; if(UI.verticalISTable) UI.verticalISTable.innerHTML = isTableHTML; };
        const calculateAndDisplayZScore = () => { if (!state.hasValidData || !isFinite(state.ratios.zScore)) { if(UI.zscoreDataWarning) { UI.zscoreDataWarning.textContent = t_page('zscoreDataWarning'); UI.zscoreDataWarning.style.display = 'block'; } if(UI.zscoreResultsContainer) UI.zscoreResultsContainer.style.display = 'none'; return; } if(UI.zscoreDataWarning) UI.zscoreDataWarning.style.display = 'none'; if(UI.zscoreResultsContainer) UI.zscoreResultsContainer.style.display = 'block'; const z = state.ratios.zScore; let interpretation = ''; let interpretationClass = ''; if (z > 2.9) { interpretation = t_page('zscoreZoneSafe'); interpretationClass = 'text-success'; } else if (z > 1.23) { interpretation = t_page('zscoreZoneGrey'); interpretationClass = 'text-warning'; } else { interpretation = t_page('zscoreZoneDistress'); interpretationClass = 'text-danger'; } if(UI.zscoreValue) UI.zscoreValue.textContent = formatRatio(z, 3); if(UI.zscoreInterpretation) { UI.zscoreInterpretation.textContent = interpretation; UI.zscoreInterpretation.className = `h5 fw-bold ${interpretationClass}`; } let factorsHTML = ''; const factors = ['zScoreX1', 'zScoreX2', 'zScoreX3', 'zScoreX4', 'zScoreX5']; factors.forEach(key => { const value = state.ratios[key]; let label = t_page(key.replace('zScore', 'zscore')); if (key === 'zScoreX2' && state.financials.retainedEarnings === 0 && !isFinite(value)) { label += ` <small class="text-muted">${t_page('zscoreRetainedEarningsNotFound')}</small>`; } factorsHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">${label} <span class="badge bg-secondary rounded-pill">${formatRatio(value)}</span></li>`; }); if(UI.zscoreFactorsList) UI.zscoreFactorsList.innerHTML = factorsHTML; };
        const calculateAndDisplayCashFlowAnalysis = () => { if (!state.hasValidData) { if(UI.cfDataWarning) { UI.cfDataWarning.textContent = t_page('cfDataWarning'); UI.cfDataWarning.style.display = 'block'; } if(UI.cfResultsContainer) UI.cfResultsContainer.style.display = 'none'; return; } if(UI.cfDataWarning) UI.cfDataWarning.style.display = 'none'; if(UI.cfResultsContainer) UI.cfResultsContainer.style.display = 'block'; const f = state.financials; const r = state.ratios; let stmtHTML = ` <tr><td>${t_page('cfNetIncome')}</td><td class="text-end">${formatNumber(f.netProfit)}</td></tr> <tr><td class="ps-3">${t_page('cfDepreciationAmortization')}</td><td class="text-end">${formatNumber(f.depreciationAmortization)}</td></tr> <tr><td class="text-muted ps-3">${t_page('cfChangesWC')}</td><td class="text-end text-muted">(N/A)</td></tr> <tr class="table-light fw-bold"><td>${t_page('cfOperating')}</td><td class="text-end">${formatNumber(f.ocf_estimated)}</td></tr> <tr><td>${t_page('cfInvesting')}</td><td class="text-end">${formatNumber(f.icf_estimated)}</td></tr> <tr><td>${t_page('cfFinancing')}</td><td class="text-end">${formatNumber(f.fcf_estimated)}</td></tr> <tr class="table-light fw-bold border-top"><td>${t_page('cfNetChange')}</td><td class="text-end">${formatNumber(f.netCashChange_estimated)}</td></tr> `; if(UI.cfStatementTableBody) UI.cfStatementTableBody.innerHTML = stmtHTML; if(UI.cfValueOCFRatio) UI.cfValueOCFRatio.textContent = formatRatio(r.operatingCashFlowRatio); if(UI.cfValueFCF) UI.cfValueFCF.textContent = formatNumber(r.freeCashFlow); let interpretation = ''; if (isFinite(f.ocf_estimated)) { interpretation += f.ocf_estimated > 0 ? `<p>${t_page('cfInterpretationPositiveOCF')}</p>` : `<p>${t_page('cfInterpretationNegativeOCF')}</p>`; } if (isFinite(r.freeCashFlow)) { interpretation += `<p>${t_page('cfInterpretationFCF')}</p>`; } if(UI.cfInterpretation) UI.cfInterpretation.innerHTML = interpretation || `<p class="text-muted">${lang==='ar'?'...':'...'}</p>`; };

        const calculateAndDisplayEVA = () => {
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
        // === RUN ANALYSIS & INITIALIZATION (*** مُعدل ***) ===
        // ==============================================
        
        // *** مُعدل: تحديث الدالة لعرض جميع الفئات الخمس ***
        const runAnalysis = () => {
            console.log("Running full analysis...");
            if (!calculateFinancials()) { state.hasValidData = false; } 
            else { state.hasValidData = calculateAllRatios(); }

            // 1. عرض مؤشرات السيولة
            renderRatioCategory('liquidityRatios', 'liquidityRatios', 
                ['currentRatio', 'quickRatio', 'netWorkingCapital', 'cashRatio']);
            
            // 2. عرض مؤشرات الربحية
            renderRatioCategory('profitabilityRatios', 'profitabilityRatios', 
                ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe', 'eps']);
            
            // 3. عرض مؤشرات الروافع
            renderRatioCategory('leverageRatios', 'leverageRatios', 
                ['debtToAssets', 'debtToEquity', 'interestCoverageRatio', 'financialLeverage']);
            
            // 4. عرض مؤشرات النشاط (في حاوية 'efficiencyRatios' الموجودة)
            renderRatioCategory('efficiencyRatios', 'activityRatios', 
                ['inventoryTurnover', 'assetTurnover', 'receivablesTurnover', 'avgCollectionPeriod']);

            // 5. عرض مؤشرات التقييم (في الحاوية الجديدة 'valuationRatios')
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
                calculateAndDisplayVerticalAnalysis();
                calculateAndDisplayZScore();
-               calculateAndDisplayCashFlowAnalysis(); 
+               calculateAndDisplayCashFlowAnalysis();
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

            // Tab Change Listeners
            const tabs = ['ratios', 'breakeven', 'dupont', 'vertical', 'zscore', 'cashflow', 'eva']; 
            tabs.forEach(tabId => {
                const tabElement = document.getElementById(`${tabId}-tab`);
                if (tabElement) {
                    tabElement.addEventListener('shown.bs.tab', () => {
                         console.log(`${tabId} tab shown`);
                         if (!state.hasValidData) { console.log("No valid data..."); runAnalysis(); }
                         
                        m if (tabId === 'dupont') calculateAndDisplayDupont();
                         if (tabId === 'vertical') calculateAndDisplayVerticalAnalysis();
                         if (tabId === 'zscore') calculateAndDisplayZScore();
                         if (tabId === 'cashflow') calculateAndDisplayCashFlowAnalysis(); 
                         if (tabId === 'eva') calculateAndDisplayEVA(); 
                         if (tabId === 'breakeven' && state.breakevenChart) { state.breakevenChart.resize(); }
                    });
                } else { console.warn(`Tab button not found for ID: ${tabId}-tab`); }
            });
        };

        if (document.getElementById('ratios-pane') && document.getElementById('cashflow-pane')) {
            init();
        } else {
            console.error("One or more critical tab pane elements were not found. Initialization stopped.");
        }
        
    }, 0); 
});
