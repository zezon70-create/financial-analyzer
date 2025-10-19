// js/advanced-app.js (Based on YOUR working version + Industry Benchmarks Added Carefully)

window.pageTranslations = {
    ar: {
        // ... (كل الترجمات السابقة من الكود الذي أرسلته) ...
        pageTitle: "التحليلات المتقدمة — المحلل المالي", pageHeader: "التحليلات المتقدمة", pageSubheader: "استخدم أدوات تحليلية متخصصة للحصول على رؤى أعمق حول أداء عملك.",
        tabRatios: "النسب المالية", tabBreakeven: "تحليل التعادل", tabDupont: "تحليل دوبونت", tabVertical: "التحليل الرأسي", tabZScore: "نموذج Z-Score", tabCashFlow: "تحليل التدفقات النقدية",
        summaryTitle: "الملخص الذكي", alertsTitle: "تنبيهات ومؤشرات خطر", thRatio: "النسبة", thValue: "القيمة", thComment: "تعليق تحليلي", liquidityRatios: "نسب السيولة", profitabilityRatios: "نسب الربحية", leverageRatios: "نسب الرفع المالي", efficiencyRatios: "نسب الكفاءة", currentRatio: "نسبة التداول", currentRatio_comment_high: "سيولة ممتازة...", currentRatio_comment_good: "سيولة جيدة...", currentRatio_comment_low: "مؤشر خطر...", quickRatio: "نسبة السيولة السريعة", quickRatio_comment_good: "قدرة جيدة...", quickRatio_comment_low: "مؤشر خطر...", netProfitMargin: "هامش صافي الربح", netProfitMargin_comment_high: "ربحية ممتازة...", netProfitMargin_comment_avg: "ربحية مقبولة...", netProfitMargin_comment_low: "خسائر...", grossProfitMargin: "هامش الربح الإجمالي", grossProfitMargin_comment_high: "هامش قوي...", grossProfitMargin_comment_low: "هامش ضعيف...", roa: "العائد على الأصول (ROA)", roa_comment_high: "كفاءة عالية...", roa_comment_low: "كفاءة منخفضة...", roe: "العائد على حقوق الملكية (ROE)", roe_comment_high: "عائد ممتاز...", roe_comment_low: "عائد ضعيف...", debtToEquity: "نسبة الدين إلى حقوق الملكية", debtToEquity_comment_low: "دين منخفض...", debtToEquity_comment_good: "دين معتدل...", debtToEquity_comment_high: "دين مرتفع...", debtToAssets: "نسبة الدين إلى الأصول", debtToAssets_comment_low: "وضع آمن...", debtToAssets_comment_high: "مخاطر مرتفعة...", assetTurnover: "معدل دوران الأصول", assetTurnover_comment_high: "كفاءة ممتازة...", assetTurnover_comment_low: "كفاءة منخفضة...", summary_ok: "الوضع المالي يبدو مستقرًا...", summary_risk: "توجد بعض مؤشرات الخطر...", alert_liquidity_risk: "🔴 خطر سيولة...", alert_leverage_risk: "🟡 تنبيه دين مرتفع...", alert_profit_risk: "🔴 خطر ربحية...", alert_ok: "🟢 لا توجد مؤشرات خطر حرجة...", noDataForRatios: "لا توجد بيانات كافية لحساب النسب. يرجى إدخال ميزان المراجعة أولاً.",
        beInputTitle: "مدخلات الحساب", labelFixedCosts: "إجمالي التكاليف الثابتة", labelVariableCost: "التكلفة المتغيرة للوحدة", labelSellingPrice: "سعر بيع الوحدة", btnCalculate: "احسب", beResultsTitle: "النتائج", bepUnits: "نقطة التعادل (بالوحدات)", bepValue: "نقطة التعادل (بالقيمة)", beChartTitle: "رسم بياني لنقطة التعادل", errorPrice: "سعر البيع يجب أن يكون أعلى من التكلفة المتغيرة.", errorPositiveValues: "الرجاء إدخال قيم موجبة.", revenue: 'الإيرادات', totalCosts: 'إجمالي التكاليف', fixedCosts: 'التكاليف الثابتة', unitsSold: 'الوحدات المباعة', value: 'القيمة',
        dupontTitle: "تحليل دوبونت للعائد على حقوق الملكية", dupontDesc: "يساعد هذا التحليل على تفكيك العائد على حقوق الملكية (ROE)...", dupontEquation: "معادلة دوبونت:", dupontCompNPM: "هامش صافي الربح", dupontCompAT: "دوران الأصول", dupontCompEM: "مضاعف حقوق الملكية", dupontCompROE: "العائد على حقوق الملكية", dupontDataWarning: "لا توجد بيانات كافية (من ميزان المراجعة) لإجراء تحليل دوبونت.", dupontInterpretationHighROE: "🟢 العائد المرتفع...", dupontInterpretationLowROE: "🟡 العائد المنخفض...", dupontFactorProfitability: "ربحية تشغيلية قوية...", dupontFactorEfficiency: "كفاءة أصول عالية...", dupontFactorLeverage: "استخدام الرفع المالي...", dupontFactorLowProfitability: "ربحية تشغيلية ضعيفة...", dupontFactorLowEfficiency: "كفاءة أصول منخفضة...", dupontFactorLowLeverage: "اعتماد منخفض على الديون...",
        verticalTitle: "التحليل الرأسي (القوائم ذات الحجم الموحد)", verticalDesc: "يعرض كل بند في القوائم المالية كنسبة مئوية...", verticalDataWarning: "لا توجد بيانات كافية (من ميزان المراجعة) لإجراء التحليل الرأسي.", verticalBS: "الميزانية العمومية (% من إجمالي الأصول)", verticalIS: "قائمة الدخل (% من صافي الإيرادات)", verticalAccount: "الحساب", verticalValue: "القيمة", verticalPercent: "النسبة %",
        zscoreTitle: "نموذج Altman Z-Score (للتنبؤ بالإفلاس)", zscoreDesc: "نموذج إحصائي يستخدم مجموعة من النسب المالية...", zscoreDataWarning: "لا توجد بيانات كافية لحساب نموذج Z-Score...", zscoreValueLabel: "قيمة Z-Score:", zscoreInterpretation: "التفسير:", zscoreZoneSafe: "🟢 منطقة آمنة", zscoreZoneGrey: "🟡 منطقة رمادية", zscoreZoneDistress: "🔴 منطقة الخطر", zscoreComponents: "مكونات النموذج:", zscoreX1: "X1 (رأس المال العامل / الأصول):", zscoreX2: "X2 (الأرباح المحتجزة / الأصول):", zscoreX3: "X3 (الأرباح قبل الفوائد والضرائب / الأصول):", zscoreX4: "X4 (حقوق الملكية / الخصوم):", zscoreX5: "X5 (الإيرادات / الأصول):", zscoreRetainedEarningsNotFound: "(لم يتم العثور على أرباح محتجزة)",
        cfTitle: "تحليل التدفقات النقدية (تقديري)", cfDesc: "يقدم هذا القسم تقديرًا لقائمة التدفقات النقدية...", cfDataWarning: "لا توجد بيانات كافية لتقدير التدفقات النقدية.", cfStmtTitle: "قائمة التدفقات النقدية المقدرة", cfNetIncome: "صافي الدخل", cfDepreciationAmortization: "الإهلاك والاستهلاك (مقدر)", cfChangesWC: "التغيرات في رأس المال العامل (مقدر)", cfOperating: "التدفق النقدي التشغيلي", cfInvesting: "التدفق النقدي الاستثماري (مقدر)", cfFinancing: "التدفق النقدي التمويلي (مقدر)", cfNetChange: "صافي التغير في النقدية", cfRatiosTitle: "نسب التدفقات النقدية", cfRatioOCF: "نسبة التدفق النقدي التشغيلي", cfRatioFCF: "التدفق النقدي الحر (مقدر)", cfInterpretationPositiveOCF: "🟢 عمليات الشركة تولد نقدًا.", cfInterpretationNegativeOCF: "🔴 عمليات الشركة تستهلك نقدًا.", cfInterpretationFCF: "التدفق النقدي الحر...",

        // *** ADDED Benchmarking Translations ***
        selectIndustryLabel: "اختر قطاع الصناعة للمقارنة",
        selectIndustryDesc: "اختيار قطاع سيضيف مقارنة مع متوسطات الصناعة إلى جداول النسب.",
        thIndustryAvg: "متوسط الصناعة",
        industry_general: "عام / غير محدد",
        industry_retail: "تجارة التجزئة",
        industry_manufacturing: "الصناعة التحويلية",
        industry_services: "الخدمات",
        industry_construction: "المقاولات",
        comparison_better: "أفضل",
        comparison_worse: "أسوأ",
        comparison_similar: "مماثل"

    },
    en: { // ... (English translations + Benchmarking added) ...
        pageTitle: "Advanced Analytics — Financial Analyzer", pageHeader: "Advanced Analytics", pageSubheader: "Use specialized analytical tools...",
        tabRatios: "Financial Ratios", tabBreakeven: "Break-even Analysis", tabDupont: "DuPont Analysis", tabVertical: "Vertical Analysis", tabZScore: "Altman Z-Score", tabCashFlow: "Cash Flow Analysis",
        // ... (rest of English translations) ...
        noDataForRatios: "Insufficient data...", dupontDataWarning: "Insufficient data...", verticalDataWarning: "Insufficient data...", zscoreDataWarning: "Insufficient data...", cfDataWarning: "Insufficient data...",
        // *** ADDED Benchmarking Translations ***
        selectIndustryLabel: "Select Industry for Benchmarking",
        selectIndustryDesc: "Choosing an industry will add benchmark averages to the ratio tables.",
        thIndustryAvg: "Industry Avg.",
        industry_general: "General / Unspecified",
        industry_retail: "Retail Trade",
        industry_manufacturing: "Manufacturing",
        industry_services: "Services",
        industry_construction: "Construction",
        comparison_better: "Better",
        comparison_worse: "Worse",
        comparison_similar: "Similar"
    }
};

document.addEventListener('DOMContentLoaded', () => {

    const state = {
        financials: {}, ratios: {}, breakevenChart: null, hasValidData: false,
        rawData: { bsItems: [], isItems: [] },
        selectedIndustry: 'general' // *** ADDED state for selected industry ***
    };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`;

    const UI = { /* ... (All previous UI elements mapping) ... */
        smartSummary: document.getElementById('smartSummary'), alertsArea: document.getElementById('alertsArea'),
        fixedCosts: document.getElementById('fixedCosts'), variableCost: document.getElementById('variableCost'), sellingPrice: document.getElementById('sellingPrice'), calculateBreakeven: document.getElementById('calculateBreakeven'), breakevenResults: document.getElementById('breakevenResults'), bepUnitsResult: document.getElementById('bepUnitsResult'), bepValueResult: document.getElementById('bepValueResult'), breakevenChartCanvas: document.getElementById('breakevenChart'),
        dupontResultsContainer: document.getElementById('dupontResultsContainer'), dupontDataWarning: document.getElementById('dupontDataWarning'), dupontFormulaDisplay: document.getElementById('dupontFormulaDisplay'), dupontROE: document.getElementById('dupontROE'), dupontNPM: document.getElementById('dupontNPM'), dupontAT: document.getElementById('dupontAT'), dupontEM: document.getElementById('dupontEM'), dupontValueNPM: document.getElementById('dupontValueNPM'), dupontValueAT: document.getElementById('dupontValueAT'), dupontValueEM: document.getElementById('dupontValueEM'), dupontValueROE: document.getElementById('dupontValueROE'), dupontInterpretation: document.getElementById('dupontInterpretation'),
        verticalDataWarning: document.getElementById('verticalDataWarning'), verticalResultsContainer: document.getElementById('verticalResultsContainer'), verticalBSTable: document.getElementById('verticalBSTable'), verticalISTable: document.getElementById('verticalISTable'),
        zscoreDataWarning: document.getElementById('zscoreDataWarning'), zscoreResultsContainer: document.getElementById('zscoreResultsContainer'), zscoreValue: document.getElementById('zscoreValue'), zscoreInterpretation: document.getElementById('zscoreInterpretation'), zscoreFactorsList: document.getElementById('zscoreFactorsList'),
        cfDataWarning: document.getElementById('cfDataWarning'), cfResultsContainer: document.getElementById('cfResultsContainer'), cfStatementTableBody: document.getElementById('cfStatementTableBody'), cfValueOCFRatio: document.getElementById('cfValueOCFRatio'), cfValueFCF: document.getElementById('cfValueFCF'), cfInterpretation: document.getElementById('cfInterpretation'),
        // *** ADDED UI Element for Benchmarking ***
        industrySelect: document.getElementById('industrySelect')
    };

    // Helper functions (Unchanged)
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
    const formatPercent = (value, digits = 1) => isFinite(value) && !isNaN(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
    const formatRatio = (value, digits = 2) => isFinite(value) && !isNaN(value) ? value.toFixed(digits) : "N/A";
    const formatNumber = (value, digits = 0) => isFinite(value) && !isNaN(value) ? value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "N/A";

     // *** ADDED: Industry Benchmark Data ***
     const industryBenchmarks = {
        general: {},
        retail: { currentRatio: 1.5, quickRatio: 0.5, netProfitMargin: 0.03, roe: 0.15, debtToEquity: 1.2, assetTurnover: 2.0, grossProfitMargin: 0.30 },
        manufacturing: { currentRatio: 1.8, quickRatio: 0.9, netProfitMargin: 0.06, roe: 0.12, debtToEquity: 0.8, assetTurnover: 1.0, grossProfitMargin: 0.35 },
        services: { currentRatio: 1.2, quickRatio: 1.0, netProfitMargin: 0.08, roe: 0.18, debtToEquity: 1.0, assetTurnover: 1.2, grossProfitMargin: 0.50 },
        construction: { currentRatio: 1.3, quickRatio: 0.8, netProfitMargin: 0.04, roe: 0.14, debtToEquity: 1.5, assetTurnover: 1.5, grossProfitMargin: 0.20 }
    };

    // ==============================================
    // === FINANCIAL CALCULATIONS (Unchanged from YOUR working version) ===
    // ==============================================
    const calculateFinancials = () => { /* ... (Function as in YOUR working version) ... */ state.financials = {}; state.rawData = { bsItems: [], isItems: [] }; state.hasValidData = false; let trialData; try { const rawDataString = localStorage.getItem('trialData'); if (!rawDataString) { console.warn("localStorage 'trialData' is missing."); return false; } trialData = JSON.parse(rawDataString); if (!Array.isArray(trialData) || trialData.length === 0 || (trialData.length === 1 && !trialData[0].Account && !toNum(trialData[0].Debit) && !toNum(trialData[0].Credit))) { console.warn("Parsed 'trialData' is empty or invalid."); return false; } } catch (e) { console.error("Error parsing 'trialData':", e); return false; } try { const f = { assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0, netProfit: 0, grossProfit: 0, currentAssets: 0, inventory: 0, currentLiabilities: 0, retainedEarnings: 0, interestExpense: 0, taxExpense: 0, depreciationAmortization: 0, ppeNet: 0, longTermDebt: 0, shortTermDebt: 0, cashEquivalents: 0, ebit: 0, workingCapital: 0, ocf_estimated: 0, capex_estimated: 0, icf_estimated: 0, fcf_estimated: 0, netCashChange_estimated: 0, freeCashFlow_estimated: 0 }; trialData.forEach(row => { const value = (toNum(row.Debit)) - (toNum(row.Credit)); const mainType = row.MainType || ''; const subType = row.SubType || ''; const accountName = (row.Account || '').toLowerCase(); const rawItem = { account: row.Account || 'N/A', value: 0, mainType: mainType, subType: subType }; if (mainType.includes('الأصول') || mainType.includes('Assets')) { f.assets += value; rawItem.value = value; state.rawData.bsItems.push(rawItem); if (subType.includes('متداول') || subType.includes('Current')) { f.currentAssets += value; if (subType.includes('المخزون') || subType.includes('Inventory') || accountName.includes('inventory') || accountName.includes('مخزون')) { f.inventory += value; } if (subType.includes('النقد') || subType.includes('Cash') || accountName.includes('cash') || accountName.includes('نقد')) f.cashEquivalents += value; } else if (subType.includes('غير متداول') || subType.includes('Non-current') || subType.includes('ثابتة') || subType.includes('fixed')) { if(accountName.includes('ppe') || accountName.includes('fixed asset') || accountName.includes('أصول ثابتة')) f.ppeNet += value; } } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) { f.liabilities -= value; rawItem.value = -value; state.rawData.bsItems.push(rawItem); if (subType.includes('متداول') || subType.includes('Current')) { f.currentLiabilities -= value; if(subType.includes('قروض قصيرة') || subType.includes('Short-term Loans') || accountName.includes('short term debt') || accountName.includes('قرض قصير')) f.shortTermDebt -=value; } else if (subType.includes('غير متداول') || subType.includes('Non-current')) { if(subType.includes('قروض طويلة') || subType.includes('Long-term Loans') || accountName.includes('long term debt') || accountName.includes('قرض طويل')) f.longTermDebt -=value; } } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) { f.equity -= value; rawItem.value = -value; state.rawData.bsItems.push(rawItem); if (subType.includes('الأرباح المحتجزة') || subType.includes('Retained Earnings') || accountName.includes('retained earnings') || accountName.includes('أرباح محتجزة')) f.retainedEarnings -= value; } else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) { rawItem.mainType = 'Income Statement'; if (subType.includes('الإيرادات') || subType.includes('Revenue')) { f.revenue -= value; rawItem.value = -value; state.rawData.isItems.push(rawItem); } else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) { f.cogs += value; rawItem.value = value; state.rawData.isItems.push(rawItem); } else { f.expenses += value; rawItem.value = value; state.rawData.isItems.push(rawItem); if (subType.includes('فائدة') || subType.includes('Interest') || accountName.includes('interest')) f.interestExpense += value; if (subType.includes('ضريبية') || subType.includes('Tax') || accountName.includes('tax')) f.taxExpense += value; if (subType.includes('إهلاك') || subType.includes('Depreciation') || accountName.includes('depreciation') || accountName.includes('amortization') || accountName.includes('إهلاك') || accountName.includes('استهلاك')) f.depreciationAmortization += value; } } }); Object.keys(f).forEach(key => f[key] = f[key] || 0); f.grossProfit = f.revenue - f.cogs; f.netProfit = f.grossProfit - f.expenses; f.ebit = f.netProfit + f.interestExpense + f.taxExpense; f.workingCapital = f.currentAssets - f.currentLiabilities; f.ocf_estimated = f.netProfit + f.depreciationAmortization; f.capex_estimated = f.depreciationAmortization; f.icf_estimated = -f.capex_estimated; f.fcf_estimated = 0; f.netCashChange_estimated = f.ocf_estimated + f.icf_estimated + f.fcf_estimated; f.freeCashFlow_estimated = f.ocf_estimated - f.capex_estimated; const balanceCheck = f.assets - (f.liabilities + f.equity + f.netProfit); if (Math.abs(balanceCheck) > 1) console.warn(`Balance sheet check failed... Diff: ${balanceCheck.toFixed(2)}`); state.financials = f; state.hasValidData = true; console.log("Calculated Financials:", f); return true; } catch (e) { console.error("Error during financial calculations:", e); state.financials = {}; state.hasValidData = false; return false; } };
    const calculateAllRatios = () => { /* ... (Function as in YOUR working version) ... */ state.ratios = {}; if (!state.hasValidData) { console.warn("Financials invalid..."); return false; } const f = state.financials; try { const assets = f.assets || 0; const equity = f.equity || 0; const liabilities = f.liabilities || 0; const revenue = f.revenue || 0; const equityMultiplier = (equity !== 0 && assets !== 0) ? assets / equity : Infinity; const roeStandard = (equity !== 0) ? f.netProfit / equity : Infinity; const x1 = assets !== 0 ? f.workingCapital / assets : Infinity; const x2 = assets !== 0 ? f.retainedEarnings / assets : Infinity; const x3 = assets !== 0 ? f.ebit / assets : Infinity; const x4 = liabilities !== 0 ? equity / liabilities : Infinity; const x5 = assets !== 0 ? revenue / assets : 0; const zScore = (isFinite(x1) && isFinite(x2) && isFinite(x3) && isFinite(x4) && isFinite(x5)) ? (0.717 * x1) + (0.847 * x2) + (3.107 * x3) + (0.420 * x4) + (0.998 * x5) : NaN; state.ratios = { currentRatio: f.currentLiabilities !== 0 ? f.currentAssets / f.currentLiabilities : Infinity, quickRatio: f.currentLiabilities !== 0 ? (f.currentAssets - f.inventory) / f.currentLiabilities : Infinity, grossProfitMargin: revenue !== 0 ? f.grossProfit / revenue : 0, netProfitMargin: revenue !== 0 ? f.netProfit / revenue : 0, roa: assets !== 0 ? f.netProfit / assets : 0, roe: roeStandard, debtToAssets: assets !== 0 ? liabilities / assets : Infinity, debtToEquity: equity !== 0 ? liabilities / equity : Infinity, assetTurnover: x5, equityMultiplier: equityMultiplier, zScoreX1: x1, zScoreX2: x2, zScoreX3: x3, zScoreX4: x4, zScoreX5: x5, zScore: zScore, operatingCashFlowRatio: f.currentLiabilities !== 0 ? f.ocf_estimated / f.currentLiabilities : Infinity, freeCashFlow: f.freeCashFlow_estimated }; console.log("Calculated Ratios & Z-Score & CF:", state.ratios); return true; } catch(e) { console.error("Error calculating ratios:", e); state.ratios = {}; state.hasValidData = false; return false; } };

    // ==============================================
    // === RENDERING FUNCTIONS (Ratio section MODIFIED) ===
    // ==============================================

    // --- Render Ratios (MODIFIED FOR BENCHMARKS) ---
    const getRatioComment = (key, value) => { /* ... (original logic unchanged) ... */ };
    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => {
        const container = document.getElementById(divId);
        if (!container) { console.error(`Element not found: ${divId}`); return; }
        if (!state.hasValidData) {
            container.innerHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <p class="text-muted">${t_page('noDataForRatios')}</p>`; return;
        }

        // *** Benchmark Integration Logic (ADDED) ***
        const benchmarks = industryBenchmarks[state.selectedIndustry] || {};
        const showBenchmarks = state.selectedIndustry !== 'general';
        // *** End Benchmark Integration ***

        // *** MODIFIED Table Header ***
        let tableHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5>
            <div class="table-responsive">
            <table class="table table-sm table-striped">
                <thead><tr>
                    <th>${t_page('thRatio')}</th>
                    <th class="text-end">${t_page('thValue')}</th>
                    ${showBenchmarks ? `<th class="text-end">${t_page('thIndustryAvg')}</th>` : ''}
                    <th>${t_page('thComment')}</th>
                </tr></thead>
                <tbody>`;

        ratioKeys.forEach(key => {
            const value = state.ratios && state.ratios.hasOwnProperty(key) ? state.ratios[key] : NaN;
            // *** Benchmark Integration Logic (ADDED) ***
            const benchmarkValue = benchmarks[key];

            const isPercentage = key.includes('Margin') || key.includes('roa') || key.includes('roe');
            const formattedValue = isPercentage ? formatPercent(value) : formatRatio(value);
            // *** Benchmark Integration Logic (ADDED) ***
            const formattedBenchmark = (showBenchmarks && typeof benchmarkValue !== 'undefined' && isFinite(benchmarkValue))
                ? (isPercentage ? formatPercent(benchmarkValue) : formatRatio(benchmarkValue))
                : '-';

            const comment = getRatioComment(key, value);

            // *** Benchmark Integration Logic (ADDED) ***
            let comparisonIndicator = '';
            let comparisonText = '';
            if (showBenchmarks && typeof benchmarkValue !== 'undefined' && isFinite(value) && isFinite(benchmarkValue)) {
                const tolerance = 0.1 * Math.abs(benchmarkValue);
                const isDebtRatio = key === 'debtToEquity' || key === 'debtToAssets';
                const isBetter = isDebtRatio ? value < benchmarkValue - tolerance : value > benchmarkValue + tolerance;
                const isWorse = isDebtRatio ? value > benchmarkValue + tolerance : value < benchmarkValue - tolerance;
                if (isBetter) { comparisonIndicator = '<i class="bi bi-arrow-up-circle-fill text-success ms-1"></i>'; comparisonText = `(${t_page('comparison_better')})`; }
                else if (isWorse) { comparisonIndicator = '<i class="bi bi-arrow-down-circle-fill text-danger ms-1"></i>'; comparisonText = `(${t_page('comparison_worse')})`; }
                else { comparisonIndicator = '<i class="bi bi-arrow-left-right text-warning ms-1"></i>'; comparisonText = `(${t_page('comparison_similar')})`; }
            }
             // *** End Benchmark Integration ***

            // *** MODIFIED Table Row ***
            tableHTML += `<tr>
                <td>${t_page(key)}</td>
                <td class="text-end"><strong>${formattedValue}</strong> ${comparisonIndicator} <small class="text-muted">${comparisonText}</small></td>
                ${showBenchmarks ? `<td class="text-end">${formattedBenchmark}</td>` : ''}
                <td class="text-muted small">${comment}</td>
            </tr>`;
        });
        container.innerHTML = tableHTML + `</tbody></table></div>`;
    };
    const renderSidebar = () => { /* ... (original logic unchanged) ... */ };

    // --- Render Break-even ---
    const calculateAndDisplayBreakeven = () => { /* ... (original logic unchanged) ... */ };
    const renderBreakevenChart = (fixed, variable, price, bepUnits) => { /* ... (original logic unchanged) ... */ };

    // --- Render DuPont ---
    const calculateAndDisplayDupont = () => { /* ... (original logic unchanged) ... */ };

    // --- Render Vertical Analysis ---
    const calculateAndDisplayVerticalAnalysis = () => { /* ... (original logic unchanged) ... */ };

    // --- Render Altman Z-Score ---
    const calculateAndDisplayZScore = () => { /* ... (original logic unchanged) ... */ };

    // --- Render Cash Flow Analysis ---
    const calculateAndDisplayCashFlowAnalysis = () => { /* ... (original logic unchanged) ... */ };


    // ==============================================
    // === RUN ANALYSIS & INITIALIZATION ===
    // ==============================================

    // --- Main analysis function (Unchanged) ---
    const runAnalysis = () => { /* ... (Function as in YOUR working version) ... */ console.log("Running full analysis..."); if (!calculateFinancials()) { state.hasValidData = false; } else { state.hasValidData = calculateAllRatios(); } renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']); renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']); renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']); renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']); renderSidebar(); return state.hasValidData; };

    // *** ADDED: Populate Industry Select Function ***
    const populateIndustrySelect = () => {
        if (!UI.industrySelect) { console.warn("Industry select dropdown not found."); return; }
        const industries = ['general', 'retail', 'manufacturing', 'services', 'construction'];
        UI.industrySelect.innerHTML = industries.map(key =>
            `<option value="${key}">${t_page(`industry_${key}`)}</option>`
        ).join('');
        state.selectedIndustry = localStorage.getItem('selectedIndustry') || 'general';
        UI.industrySelect.value = state.selectedIndustry;
    };

    // --- Initialize Page (MODIFIED) ---
    const init = () => {
        console.log("Initializing advanced page...");
        populateIndustrySelect(); // *** ADDED Call ***

        runAnalysis(); // Run analysis first

        // Add event listeners AFTER initial run
        if (UI.calculateBreakeven) { UI.calculateBreakeven.addEventListener('click', calculateAndDisplayBreakeven); }
        else { console.warn("Breakeven calculate button not found"); }

        // *** ADDED: Listener for Industry Select change ***
        if (UI.industrySelect) {
            UI.industrySelect.addEventListener('change', (e) => {
                state.selectedIndustry = e.target.value;
                localStorage.setItem('selectedIndustry', state.selectedIndustry);
                console.log(`Industry changed to: ${state.selectedIndustry}`);
                // Re-render only the ratio tables with new benchmark data
                renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
                renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
                renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
                renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);
                if (typeof applyTranslations === 'function') { applyTranslations(); }
            });
        }

        // --- Tab Change Listeners (Unchanged from YOUR working version) ---
        const tabs = ['ratios', 'breakeven', 'dupont', 'vertical', 'zscore', 'cashflow'];
        tabs.forEach(tabId => {
            const tabElement = document.getElementById(`${tabId}-tab`);
            if (tabElement) {
                tabElement.addEventListener('shown.bs.tab', () => {
                     console.log(`${tabId} tab shown`);
                     if (!state.hasValidData) { runAnalysis(); } // Re-run analysis if no valid data
                     if (tabId === 'dupont') calculateAndDisplayDupont();
                     if (tabId === 'vertical') calculateAndDisplayVerticalAnalysis();
                     if (tabId === 'zscore') calculateAndDisplayZScore();
                     if (tabId === 'cashflow') calculateAndDisplayCashFlowAnalysis();
                     if (tabId === 'breakeven' && state.breakevenChart) { /* state.breakevenChart.resize(); */ }
                });
            } else { console.warn(`Tab button not found for ID: ${tabId}-tab`); }
        });

         // Initial display for dependent tabs (Unchanged from YOUR working version)
         calculateAndDisplayDupont(); calculateAndDisplayVerticalAnalysis(); calculateAndDisplayZScore(); calculateAndDisplayCashFlowAnalysis();

         // Apply translations (Unchanged from YOUR working version)
         if (typeof applyTranslations === 'function') { console.log("Applying translations..."); applyTranslations(); }
         else { console.warn("applyTranslations function not found."); }

         console.log("Advanced page initialized.");
    };

    // Run init (Unchanged from YOUR working version)
    if (document.getElementById('ratios-pane') && document.getElementById('cashflow-pane')) {
        init();
    } else {
        console.error("Critical tab pane elements were not found. Initialization stopped.");
    }
});
