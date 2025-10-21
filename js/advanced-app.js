// js/advanced-app.js (Version with enhanced error checking and logging - PDF Button Added)

window.pageTranslations = {
    ar: { 
        // ... (كل الترجمات كما هي، سيتم استخدام 'exportPdf' من main.js) ...
        pageTitle: "التحليلات المتقدمة — المحلل المالي", pageHeader: "التحليلات المتقدمة", pageSubheader: "استخدم أدوات تحليلية متخصصة للحصول على رؤى أعمق حول أداء عملك.",
        tabRatios: "النسب المالية", tabBreakeven: "تحليل التعادل", tabDupont: "تحليل دوبونت", tabVertical: "التحليل الرأسي", tabZScore: "نموذج Z-Score", tabCashFlow: "تحليل التدفقات النقدية",
        summaryTitle: "الملخص الذكي", alertsTitle: "تنبيهات ومؤشرات خطر", thRatio: "النسبة", thValue: "القيمة", thComment: "تعليق تحليلي", liquidityRatios: "نسب السيولة", profitabilityRatios: "نسب الربحية", leverageRatios: "نسب الرفع المالي", efficiencyRatios: "نسب الكفاءة", currentRatio: "نسبة التداول", currentRatio_comment_high: "سيولة ممتازة...", currentRatio_comment_good: "سيولة جيدة...", currentRatio_comment_low: "مؤشر خطر...", quickRatio: "نسبة السيولة السريعة", quickRatio_comment_good: "قدرة جيدة...", quickRatio_comment_low: "مؤشر خطر...", netProfitMargin: "هامش صافي الربح", netProfitMargin_comment_high: "ربحية ممتازة...", netProfitMargin_comment_avg: "ربحية مقبولة...", netProfitMargin_comment_low: "خسائر...", grossProfitMargin: "هامش الربح الإجمالي", grossProfitMargin_comment_high: "هامش قوي...", grossProfitMargin_comment_low: "هامش ضعيف...", roa: "العائد على الأصول (ROA)", roa_comment_high: "كفاءة عالية...", roa_comment_low: "كفاءة منخفضة...", roe: "العائد على حقوق الملكية (ROE)", roe_comment_high: "عائد ممتاز...", roe_comment_low: "عائد ضعيف...", debtToEquity: "نسبة الدين إلى حقوق الملكية", debtToEquity_comment_low: "دين منخفض...", debtToEquity_comment_good: "دين معتدل...", debtToEquity_comment_high: "دين مرتفع...", debtToAssets: "نسبة الدين إلى الأصول", debtToAssets_comment_low: "وضع آمن...", debtToAssets_comment_high: "مخاطر مرتفعة...", assetTurnover: "معدل دوران الأصول", assetTurnover_comment_high: "كفاءة ممتازة...", assetTurnover_comment_low: "كفاءة منخفضة...", summary_ok: "الوضع المالي يبدو مستقرًا...", summary_risk: "توجد بعض مؤشرات الخطر...", alert_liquidity_risk: "🔴 خطر سيولة...", alert_leverage_risk: "🟡 تنبيه دين مرتفع...", alert_profit_risk: "🔴 خطر ربحية...", alert_ok: "🟢 لا توجد مؤشرات خطر حرجة...", noDataForRatios: "لا توجد بيانات كافية لحساب النسب. يرجى إدخال ميزان المراجعة أولاً.",
        beInputTitle: "مدخلات الحساب", labelFixedCosts: "إجمالي التكاليف الثابتة", labelVariableCost: "التكلفة المتغيرة للوحدة", labelSellingPrice: "سعر بيع الوحدة", btnCalculate: "احسب", beResultsTitle: "النتائج", bepUnits: "نقطة التعادل (بالوحدات)", bepValue: "نقطة التعادل (بالقيمة)", beChartTitle: "رسم بياني لنقطة التعادل", errorPrice: "سعر البيع يجب أن يكون أعلى من التكلفة المتغيرة.", errorPositiveValues: "الرجاء إدخال قيم موجبة.", revenue: 'الإيرادات', totalCosts: 'إجمالي التكاليف', fixedCosts: 'التكاليف الثابتة', unitsSold: 'الوحدات المباعة', value: 'القيمة',
        dupontTitle: "تحليل دوبونت للعائد على حقوق الملكية", dupontDesc: "يساعد هذا التحليل على تفكيك العائد على حقوق الملكية (ROE)...", dupontEquation: "معادلة دوبونت:", dupontCompNPM: "هامش صافي الربح", dupontCompAT: "دوران الأصول", dupontCompEM: "مضاعف حقوق الملكية", dupontCompROE: "العائد على حقوق الملكية", dupontDataWarning: "لا توجد بيانات كافية (من ميزان المراجعة) لإجراء تحليل دوبونت.", dupontInterpretationHighROE: "🟢 العائد المرتفع...", dupontInterpretationLowROE: "🟡 العائد المنخفض...", dupontFactorProfitability: "ربحية تشغيلية قوية...", dupontFactorEfficiency: "كفاءة أصول عالية...", dupontFactorLeverage: "استخدام الرفع المالي...", dupontFactorLowProfitability: "ربحية تشغيلية ضعيفة...", dupontFactorLowEfficiency: "كفاءة أصول منخفضة...", dupontFactorLowLeverage: "اعتماد منخفض على الديون...",
        verticalTitle: "التحليل الرأسي (القوائم ذات الحجم الموحد)", verticalDesc: "يعرض كل بند في القوائم المالية كنسبة مئوية...", verticalDataWarning: "لا توجد بيانات كافية (من ميزان المراجعة) لإجراء التحليل الرأسي.", verticalBS: "الميزانية العمومية (% من إجمالي الأصول)", verticalIS: "قائمة الدخل (% من صافي الإيرادات)", verticalAccount: "الحساب", verticalValue: "القيمة", verticalPercent: "النسبة %",
        zscoreTitle: "نموذج Altman Z-Score (للتنبؤ بالإفلاس)", zscoreDesc: "نموذج إحصائي يستخدم مجموعة من النسب المالية...", zscoreDataWarning: "لا توجد بيانات كافية لحساب نموذج Z-Score...", zscoreValueLabel: "قيمة Z-Score:", zscoreInterpretation: "التفسير:", zscoreZoneSafe: "🟢 منطقة آمنة", zscoreZoneGrey: "🟡 منطقة رمادية", zscoreZoneDistress: "🔴 منطقة الخطر", zscoreComponents: "مكونات النموذج:", zscoreX1: "X1 (رأس المال العامل / الأصول):", zscoreX2: "X2 (الأرباح المحتجزة / الأصول):", zscoreX3: "X3 (الأرباح قبل الفوائد والضرائب / الأصول):", zscoreX4: "X4 (حقوق الملكية / الخصوم):", zscoreX5: "X5 (الإيرادات / الأصول):", zscoreRetainedEarningsNotFound: "(لم يتم العثور على أرباح محتجزة)",
        cfTitle: "تحليل التدفقات النقدية (تقديري)", cfDesc: "يقدم هذا القسم تقديرًا لقائمة التدفقات النقدية...", cfDataWarning: "لا توجد بيانات كافية لتقدير التدفقات النقدية.", cfStmtTitle: "قائمة التدفقات النقدية المقدرة", cfNetIncome: "صافي الدخل", cfDepreciationAmortization: "الإهلاك والاستهلاك (مقدر)", cfChangesWC: "التغيرات في رأس المال العامل (مقدر)", cfOperating: "التدفق النقدي التشغيلي", cfInvesting: "التدفق النقدي الاستثماري (مقدر)", cfFinancing: "التدفق النقدي التمويلي (مقدر)", cfNetChange: "صافي التغير في النقدية", cfRatiosTitle: "نسب التدفقات النقدية", cfRatioOCF: "نسبة التدفق النقدي التشغيلي", cfRatioFCF: "التدفق النقدي الحر (مقدر)", cfInterpretationPositiveOCF: "🟢 عمليات الشركة تولد نقدًا.", cfInterpretationNegativeOCF: "🔴 عمليات الشركة تستهلك نقدًا.", cfInterpretationFCF: "التدفق النقدي الحر..."
    },
    en: { /* ... (English translations as before) ... */ }
};
document.addEventListener('DOMContentLoaded', () => {
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
        // *** ADDED: PDF Button ***
        exportPdfBtn: document.getElementById('exportAdvancedPdfBtn') 
    };
    
    // Helper functions (Unchanged)
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
    const formatPercent = (value, digits = 1) => isFinite(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
    const formatRatio = (value, digits = 2) => isFinite(value) ? value.toFixed(digits) : "N/A";
    const formatNumber = (value, digits = 0) => isFinite(value) ? value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "N/A";
    // ==============================================
    // === FINANCIAL CALCULATIONS (Full working version) ===
    // ==============================================
    const calculateFinancials = () => { /* ... (Your full working function) ... */ };
    const calculateAllRatios = () => { /* ... (Your full working function) ... */ };
    // ==============================================
    // === RENDERING FUNCTIONS (Full working versions) ===
    // ==============================================
    const getRatioComment = (key, value) => { /* ... (Your full working function) ... */ };
    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => { /* ... (Your full working function) ... */ };
    const renderSidebar = () => { /* ... (Your full working function) ... */ };
    const calculateAndDisplayBreakeven = () => { /* ... (Your full working function) ... */ };
    const renderBreakevenChart = (fixed, variable, price, bepUnits) => { /* ... (Your full working function) ... */ };
    const calculateAndDisplayDupont = () => { /* ... (Your full working function) ... */ };
    const calculateAndDisplayVerticalAnalysis = () => { /* ... (Your full working function) ... */ };
    const calculateAndDisplayZScore = () => { /* ... (Your full working function) ... */ };
    const calculateAndDisplayCashFlowAnalysis = () => { /* ... (Your full working function) ... */ };

    // ==============================================
    // === RUN ANALYSIS & INITIALIZATION ===
    // ==============================================
    
    // --- Main analysis function ---
    const runAnalysis = () => {
        console.log("Running full analysis...");
        if (!calculateFinancials()) {
            state.hasValidData = false;
        } else {
            state.hasValidData = calculateAllRatios(); 
        }
        renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
        renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
        renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
        renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);
        renderSidebar();
        return state.hasValidData; 
    };

    // --- Initialize Page ---
    const init = () => {
        console.log("Initializing advanced page...");
        runAnalysis(); // Run once on load

        // Breakeven Listener
        if (UI.calculateBreakeven) {
            UI.calculateBreakeven.addEventListener('click', calculateAndDisplayBreakeven);
        } else { console.warn("Breakeven calculate button not found"); }

        // Tab Change Listeners
        const tabs = ['ratios', 'breakeven', 'dupont', 'vertical', 'zscore', 'cashflow']; 
        tabs.forEach(tabId => {
            const tabElement = document.getElementById(`${tabId}-tab`);
            if (tabElement) {
                tabElement.addEventListener('shown.bs.tab', () => {
                     console.log(`${tabId} tab shown`);
                     if (!state.hasValidData) { console.log("No valid data..."); runAnalysis(); }
                     if (tabId === 'dupont') calculateAndDisplayDupont();
                     if (tabId === 'vertical') calculateAndDisplayVerticalAnalysis();
                     if (tabId === 'zscore') calculateAndDisplayZScore();
                     if (tabId === 'cashflow') calculateAndDisplayCashFlowAnalysis(); 
                     if (tabId === 'breakeven' && state.breakevenChart) { /* state.breakevenChart.resize(); */ }
                });
            } else { console.warn(`Tab button not found for ID: ${tabId}-tab`); }
        });
        
        // Initial calculations/display for all tabs
        calculateAndDisplayDupont(); 
        calculateAndDisplayVerticalAnalysis();
        calculateAndDisplayZScore();
        calculateAndDisplayCashFlowAnalysis(); 
        
        // *** START: ADDED PDF Button Listener ***
        if (UI.exportPdfBtn) {
            UI.exportPdfBtn.addEventListener('click', () => {
                console.log("PDF Export clicked...");
                // Check if the global function exists (it should, from main.js)
                if (typeof window.exportPageToPDF === 'function') {
                    // Call the global function with the ID of the wrapper div
                    window.exportPageToPDF('pdfExportArea', 'Advanced_Analytics_Report');
                } else {
                    console.error("PDF Export Error: 'exportPageToPDF' function not found on window object. Check main.js");
                    alert("PDF export functionality is unavailable. Please check console.");
                }
            });
        } else {
            console.warn("Export PDF button 'exportAdvancedPdfBtn' not found.");
        }
        // *** END: ADDED PDF Button Listener ***
        
        // Apply translations
        if (typeof window.applyTranslations === 'function') { 
            console.log("Applying translations...");
            window.applyTranslations(); // Use window.applyTranslations
        } 
        else { console.warn("applyTranslations function not found."); }
        
        console.log("Advanced page initialized.");
    };

    // Run init only if critical elements exist
    if (document.getElementById('ratios-pane') && document.getElementById('breakeven-pane') && document.getElementById('dupont-pane') && document.getElementById('vertical-pane') && document.getElementById('zscore-pane') && document.getElementById('cashflow-pane')) {
        init();
    } else {
        console.error("One or more critical tab pane elements were not found. Initialization stopped.");
    }
});


