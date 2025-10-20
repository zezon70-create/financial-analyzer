// js/advanced-app.js (Working Version + Benchmarks + ADDED Debug Logs)

window.pageTranslations = {
    ar: {
        // ... (كل الترجمات السابقة بما فيها ترجمات النسب، التعادل، دوبونت، الرأسي، Z-Score، التدفقات، والمقارنات) ...
        pageTitle: "التحليلات المتقدمة — المحلل المالي", pageHeader: "التحليلات المتقدمة", pageSubheader: "استخدم أدوات تحليلية متخصصة للحصول على رؤى أعمق حول أداء عملك.",
        tabRatios: "النسب المالية", tabBreakeven: "تحليل التعادل", tabDupont: "تحليل دوبونت", tabVertical: "التحليل الرأسي", tabZScore: "نموذج Z-Score", tabCashFlow: "تحليل التدفقات النقدية",
        summaryTitle: "الملخص الذكي", alertsTitle: "تنبيهات ومؤشرات خطر", thRatio: "النسبة", thValue: "القيمة", thComment: "تعليق تحليلي", liquidityRatios: "نسب السيولة", profitabilityRatios: "نسب الربحية", leverageRatios: "نسب الرفع المالي", efficiencyRatios: "نسب الكفاءة", currentRatio: "نسبة التداول", currentRatio_comment_high: "سيولة ممتازة...", currentRatio_comment_good: "سيولة جيدة...", currentRatio_comment_low: "مؤشر خطر...", quickRatio: "نسبة السيولة السريعة", quickRatio_comment_good: "قدرة جيدة...", quickRatio_comment_low: "مؤشر خطر...", netProfitMargin: "هامش صافي الربح", netProfitMargin_comment_high: "ربحية ممتازة...", netProfitMargin_comment_avg: "ربحية مقبولة...", netProfitMargin_comment_low: "خسائر...", grossProfitMargin: "هامش الربح الإجمالي", grossProfitMargin_comment_high: "هامش قوي...", grossProfitMargin_comment_low: "هامش ضعيف...", roa: "العائد على الأصول (ROA)", roa_comment_high: "كفاءة عالية...", roa_comment_low: "كفاءة منخفضة...", roe: "العائد على حقوق الملكية (ROE)", roe_comment_high: "عائد ممتاز...", roe_comment_low: "عائد ضعيف...", debtToEquity: "نسبة الدين إلى حقوق الملكية", debtToEquity_comment_low: "دين منخفض...", debtToEquity_comment_good: "دين معتدل...", debtToEquity_comment_high: "دين مرتفع...", debtToAssets: "نسبة الدين إلى الأصول", debtToAssets_comment_low: "وضع آمن...", debtToAssets_comment_high: "مخاطر مرتفعة...", assetTurnover: "معدل دوران الأصول", assetTurnover_comment_high: "كفاءة ممتازة...", assetTurnover_comment_low: "كفاءة منخفضة...", summary_ok: "الوضع المالي يبدو مستقرًا...", summary_risk: "توجد بعض مؤشرات الخطر...", alert_liquidity_risk: "🔴 خطر سيولة...", alert_leverage_risk: "🟡 تنبيه دين مرتفع...", alert_profit_risk: "🔴 خطر ربحية...", alert_ok: "🟢 لا توجد مؤشرات خطر حرجة...", noDataForRatios: "لا توجد بيانات كافية لحساب النسب. يرجى إدخال ميزان المراجعة أولاً.",
        beInputTitle: "مدخلات الحساب", labelFixedCosts: "إجمالي التكاليف الثابتة", labelVariableCost: "التكلفة المتغيرة للوحدة", labelSellingPrice: "سعر بيع الوحدة", btnCalculate: "احسب", beResultsTitle: "النتائج", bepUnits: "نقطة التعادل (بالوحدات)", bepValue: "نقطة التعادل (بالقيمة)", beChartTitle: "رسم بياني لنقطة التعادل", errorPrice: "سعر البيع يجب أن يكون أعلى من التكلفة المتغيرة.", errorPositiveValues: "الرجاء إدخال قيم موجبة.", revenue: 'الإيرادات', totalCosts: 'إجمالي التكاليف', fixedCosts: 'التكاليف الثابتة', unitsSold: 'الوحدات المباعة', value: 'القيمة',
        dupontTitle: "تحليل دوبونت...", dupontDesc: "...", dupontEquation: "...", dupontCompNPM: "...", dupontCompAT: "...", dupontCompEM: "...", dupontCompROE: "...", dupontDataWarning: "...", dupontInterpretationHighROE: "...", dupontInterpretationLowROE: "...", dupontFactorProfitability: "...", dupontFactorEfficiency: "...", dupontFactorLeverage: "...", dupontFactorLowProfitability: "...", dupontFactorLowEfficiency: "...", dupontFactorLowLeverage: "...",
        verticalTitle: "التحليل الرأسي...", verticalDesc: "...", verticalDataWarning: "...", verticalBS: "...", verticalIS: "...", verticalAccount: "...", verticalValue: "...", verticalPercent: "...",
        zscoreTitle: "نموذج Altman Z-Score...", zscoreDesc: "...", zscoreDataWarning: "...", zscoreValueLabel: "...", zscoreInterpretation: "...", zscoreZoneSafe: "...", zscoreZoneGrey: "...", zscoreZoneDistress: "...", zscoreComponents: "...", zscoreX1: "...", zscoreX2: "...", zscoreX3: "...", zscoreX4: "...", zscoreX5: "...", zscoreRetainedEarningsNotFound: "...",
        cfTitle: "تحليل التدفقات النقدية...", cfDesc: "...", cfDataWarning: "...", cfStmtTitle: "...", cfNetIncome: "...", cfDepreciationAmortization: "...", cfChangesWC: "...", cfOperating: "...", cfInvesting: "...", cfFinancing: "...", cfNetChange: "...", cfRatiosTitle: "...", cfRatioOCF: "...", cfRatioFCF: "...", cfInterpretationPositiveOCF: "...", cfInterpretationNegativeOCF: "...", cfInterpretationFCF: "...",
        selectIndustryLabel: "اختر قطاع الصناعة للمقارنة", selectIndustryDesc: "اختيار قطاع سيضيف مقارنة مع متوسطات الصناعة...", thIndustryAvg: "متوسط الصناعة", industry_general: "عام / غير محدد", industry_retail: "تجارة التجزئة", industry_manufacturing: "الصناعة التحويلية", industry_services: "الخدمات", industry_construction: "المقاولات", comparison_better: "أفضل", comparison_worse: "أسوأ", comparison_similar: "مماثل"
    },
    en: { /* ... English translations ... */ }
};

document.addEventListener('DOMContentLoaded', () => {

    const state = {
        financials: {}, ratios: {}, breakevenChart: null, hasValidData: false,
        rawData: { bsItems: [], isItems: [] },
        selectedIndustry: 'general'
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
        industrySelect: document.getElementById('industrySelect')
    };

    // Helper functions (Unchanged)
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
    const formatPercent = (value, digits = 1) => isFinite(value) && !isNaN(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
    const formatRatio = (value, digits = 2) => isFinite(value) && !isNaN(value) ? value.toFixed(digits) : "N/A";
    const formatNumber = (value, digits = 0) => isFinite(value) && !isNaN(value) ? value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "N/A";

     // Industry Benchmark Data (Unchanged)
     const industryBenchmarks = { /* ... benchmark data ... */ };

    // ==============================================
    // === FINANCIAL CALCULATIONS (Unchanged) ===
    // ==============================================
    const calculateFinancials = () => { /* ... (Function as before) ... */ };
    const calculateAllRatios = () => { /* ... (Function as before) ... */ };

    // ==============================================
    // === RENDERING FUNCTIONS (Ratio section MODIFIED) ===
    // ==============================================

    // --- Render Ratios (MODIFIED FOR BENCHMARKS + Debug Logs Added) ---
    const getRatioComment = (key, value) => { /* ... (original logic) ... */ };
    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => {
        console.log(`[DEBUG] Attempting to render ratio category: ${categoryTitleKey} into div: ${divId}`); // <<<--- ADDED LOG
        const container = document.getElementById(divId);
        if (!container) { console.error(`[DEBUG] Element not found: ${divId}`); return; }
        if (!state.hasValidData) {
            console.warn(`[DEBUG] No valid data for ${categoryTitleKey}, showing warning.`); // <<<--- ADDED LOG
            container.innerHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <p class="text-muted">${t_page('noDataForRatios')}</p>`; return;
        }
        console.log(`[DEBUG] Rendering ${categoryTitleKey} with data:`, JSON.parse(JSON.stringify(state.ratios))); // <<<--- ADDED LOG (stringify to avoid object mutation issues in console)

        const benchmarks = industryBenchmarks[state.selectedIndustry] || {};
        const showBenchmarks = state.selectedIndustry !== 'general';

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
            const benchmarkValue = benchmarks[key];
            const isPercentage = key.includes('Margin') || key.includes('roa') || key.includes('roe');
            const formattedValue = isPercentage ? formatPercent(value) : formatRatio(value);
            const formattedBenchmark = (showBenchmarks && typeof benchmarkValue !== 'undefined' && isFinite(benchmarkValue))
                ? (isPercentage ? formatPercent(benchmarkValue) : formatRatio(benchmarkValue)) : '-';
            const comment = getRatioComment(key, value);
            let comparisonIndicator = '';
            let comparisonText = '';
            // ... (comparison logic as before) ...
            if (showBenchmarks && typeof benchmarkValue !== 'undefined' && isFinite(value) && isFinite(benchmarkValue)) { const tolerance = 0.1 * Math.abs(benchmarkValue); const isDebtRatio = key === 'debtToEquity' || key === 'debtToAssets'; const isBetter = isDebtRatio ? value < benchmarkValue - tolerance : value > benchmarkValue + tolerance; const isWorse = isDebtRatio ? value > benchmarkValue + tolerance : value < benchmarkValue - tolerance; if (isBetter) { comparisonIndicator = '<i class="bi bi-arrow-up-circle-fill text-success ms-1"></i>'; comparisonText = `(${t_page('comparison_better')})`; } else if (isWorse) { comparisonIndicator = '<i class="bi bi-arrow-down-circle-fill text-danger ms-1"></i>'; comparisonText = `(${t_page('comparison_worse')})`; } else { comparisonIndicator = '<i class="bi bi-arrow-left-right text-warning ms-1"></i>'; comparisonText = `(${t_page('comparison_similar')})`; } }

            tableHTML += `<tr>
                <td>${t_page(key)}</td>
                <td class="text-end"><strong>${formattedValue}</strong> ${comparisonIndicator} <small class="text-muted">${comparisonText}</small></td>
                ${showBenchmarks ? `<td class="text-end">${formattedBenchmark}</td>` : ''}
                <td class="text-muted small">${comment}</td>
            </tr>`;
        });
        container.innerHTML = tableHTML + `</tbody></table></div>`;
        console.log(`[DEBUG] Finished rendering ${categoryTitleKey}.`); // <<<--- ADDED LOG
    };
    const renderSidebar = () => { /* ... (original logic unchanged) ... */ };

    // --- Render Break-even ---
    const calculateAndDisplayBreakeven = () => { /* ... (original logic unchanged) ... */ };
    const renderBreakevenChart = (fixed, variable, price, bepUnits) => { /* ... (original logic unchanged) ... */ };

    // --- Render DuPont (Debug Logs Added) ---
    const calculateAndDisplayDupont = () => {
        console.log("[DEBUG] Attempting to calculate and display DuPont..."); // <<<--- ADDED LOG
        if (!state.hasValidData) {
            console.warn("[DEBUG] No valid data for DuPont, showing warning."); // <<<--- ADDED LOG
            if(UI.dupontDataWarning) { UI.dupontDataWarning.textContent = t_page('dupontDataWarning'); UI.dupontDataWarning.style.display = 'block'; }
            if(UI.dupontFormulaDisplay) UI.dupontFormulaDisplay.style.display = 'none';
            if(UI.dupontInterpretation) UI.dupontInterpretation.innerHTML = '';
            // Ensure cards show N/A
            if(UI.dupontValueNPM) UI.dupontValueNPM.textContent = 'N/A';
            if(UI.dupontValueAT) UI.dupontValueAT.textContent = 'N/A';
            if(UI.dupontValueEM) UI.dupontValueEM.textContent = 'N/A';
            if(UI.dupontValueROE) UI.dupontValueROE.textContent = 'N/A';
            return;
        }
        console.log("[DEBUG] Rendering DuPont with data:", JSON.parse(JSON.stringify(state.ratios))); // <<<--- ADDED LOG
        if(UI.dupontDataWarning) UI.dupontDataWarning.style.display = 'none';
        if(UI.dupontFormulaDisplay) UI.dupontFormulaDisplay.style.display = 'block';

        const npm = state.ratios.netProfitMargin;
        const at = state.ratios.assetTurnover;
        const em = state.ratios.equityMultiplier;
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
        if(UI.dupontValueROE) UI.dupontValueROE.textContent = formatPercent(dupontROE);

        // Interpretation logic (as before)
        let interpretation = ''; /* ... (interpretation logic as before) ... */ if (isFinite(dupontROE)) { const highROE = dupontROE >= 0.15; interpretation += highROE ? `<p>${t_page('dupontInterpretationHighROE')}</p><ul>` : `<p>${t_page('dupontInterpretationLowROE')}</p><ul>`; if (isFinite(npm)) { if (npm >= 0.10) interpretation += `<li>${t_page('dupontFactorProfitability')}</li>`; else if (npm < 0.05) interpretation += `<li>${t_page('dupontFactorLowProfitability')}</li>`; } if (isFinite(at)) { if (at >= 1.0) interpretation += `<li>${t_page('dupontFactorEfficiency')}</li>`; else if (at < 0.5) interpretation += `<li>${t_page('dupontFactorLowEfficiency')}</li>`; } if (isFinite(em)) { if (em > 2.5) interpretation += `<li>${t_page('dupontFactorLeverage')}</li>`; else if (em < 1.5) interpretation += `<li>${t_page('dupontFactorLowLeverage')}</li>`; } interpretation += `</ul>`; if (interpretation.endsWith('<ul></ul>')) { interpretation = `<p>${lang === 'ar' ? 'العوامل متوازنة أو البيانات غير كافية لتقييم دقيق.' : 'Factors appear balanced or data insufficient for precise assessment.'}</p>`; } } else { interpretation = `<p class="text-danger">${lang === 'ar' ? 'لا يمكن حساب التفسير بسبب قيم غير صالحة.' : 'Interpretation cannot be calculated due to invalid values.'}</p>`; }
        if(UI.dupontInterpretation) UI.dupontInterpretation.innerHTML = interpretation;
        console.log("[DEBUG] Finished displaying DuPont."); // <<<--- ADDED LOG
    };

    // --- Render Vertical Analysis (Add Logs) ---
    const calculateAndDisplayVerticalAnalysis = () => {
        console.log("[DEBUG] Attempting to display Vertical Analysis..."); // <<<--- ADDED LOG
        if (!state.hasValidData || !state.rawData || (!state.rawData.bsItems.length && !state.rawData.isItems.length)) {
             console.warn("[DEBUG] No valid data for Vertical Analysis, showing warning."); // <<<--- ADDED LOG
             if(UI.verticalDataWarning) { UI.verticalDataWarning.textContent = t_page('verticalDataWarning'); UI.verticalDataWarning.style.display = 'block'; }
             if(UI.verticalResultsContainer) UI.verticalResultsContainer.style.display = 'none';
             return;
        }
        console.log("[DEBUG] Rendering Vertical Analysis..."); // <<<--- ADDED LOG
        /* ... (rest of rendering logic as before) ... */
        if(UI.verticalDataWarning) UI.verticalDataWarning.style.display = 'none'; if(UI.verticalResultsContainer) UI.verticalResultsContainer.style.display = 'block'; const totalAssets = state.financials.assets || 0; const totalRevenue = state.financials.revenue || 0; let bsTableHTML = `<table class="table table-sm table-striped"><thead><tr><th>${t_page('verticalAccount')}</th><th class="text-end">${t_page('verticalValue')}</th><th class="text-end">${t_page('verticalPercent')}</th></tr></thead><tbody>`; state.rawData.bsItems.sort((a,b) => b.value - a.value).forEach(item => { const percentage = totalAssets !== 0 ? (item.value / totalAssets) : 0; bsTableHTML += `<tr><td>${item.account}</td><td class="text-end">${formatNumber(item.value)}</td><td class="text-end">${formatPercent(percentage, 1)}</td></tr>`; }); bsTableHTML += `<tr class="table-light fw-bold"><td>${lang === 'ar' ? 'الإجمالي' : 'Total'}</td><td class="text-end">${formatNumber(totalAssets)}</td><td class="text-end">100.0%</td></tr>`; bsTableHTML += `</tbody></table>`; if(UI.verticalBSTable) UI.verticalBSTable.innerHTML = bsTableHTML; let isTableHTML = `<table class="table table-sm table-striped"><thead><tr><th>${t_page('verticalAccount')}</th><th class="text-end">${t_page('verticalValue')}</th><th class="text-end">${t_page('verticalPercent')}</th></tr></thead><tbody>`; state.rawData.isItems.sort((a,b) => b.value - a.value).forEach(item => { const percentage = totalRevenue !== 0 ? (item.value / totalRevenue) : 0; const displayValue = item.value; isTableHTML += `<tr><td>${item.account}</td><td class="text-end">${formatNumber(displayValue)}</td><td class="text-end">${formatPercent(percentage, 1)}</td></tr>`; }); isTableHTML += `<tr class="table-light fw-bold"><td>${lang === 'ar' ? 'صافي الإيرادات' : 'Net Revenue'}</td><td class="text-end">${formatNumber(totalRevenue)}</td><td class="text-end">100.0%</td></tr>`; isTableHTML += `</tbody></table>`; if(UI.verticalISTable) UI.verticalISTable.innerHTML = isTableHTML;
        console.log("[DEBUG] Finished displaying Vertical Analysis."); // <<<--- ADDED LOG
     };

    // --- Render Altman Z-Score (Add Logs) ---
    const calculateAndDisplayZScore = () => {
         console.log("[DEBUG] Attempting to display Z-Score..."); // <<<--- ADDED LOG
         if (!state.hasValidData || !isFinite(state.ratios.zScore)) {
              console.warn("[DEBUG] No valid data for Z-Score, showing warning."); // <<<--- ADDED LOG
              if(UI.zscoreDataWarning) { UI.zscoreDataWarning.textContent = t_page('zscoreDataWarning'); UI.zscoreDataWarning.style.display = 'block'; }
              if(UI.zscoreResultsContainer) UI.zscoreResultsContainer.style.display = 'none';
              return;
         }
         console.log("[DEBUG] Rendering Z-Score..."); // <<<--- ADDED LOG
         /* ... (rest of rendering logic as before) ... */
         if(UI.zscoreDataWarning) UI.zscoreDataWarning.style.display = 'none'; if(UI.zscoreResultsContainer) UI.zscoreResultsContainer.style.display = 'block'; const z = state.ratios.zScore; let interpretation = ''; let interpretationClass = ''; if (z > 2.9) { interpretation = t_page('zscoreZoneSafe'); interpretationClass = 'text-success'; } else if (z > 1.23) { interpretation = t_page('zscoreZoneGrey'); interpretationClass = 'text-warning'; } else { interpretation = t_page('zscoreZoneDistress'); interpretationClass = 'text-danger'; } if(UI.zscoreValue) UI.zscoreValue.textContent = formatRatio(z, 3); if(UI.zscoreInterpretation) { UI.zscoreInterpretation.textContent = interpretation; UI.zscoreInterpretation.className = `h5 fw-bold ${interpretationClass}`; } let factorsHTML = ''; const factors = ['zScoreX1', 'zScoreX2', 'zScoreX3', 'zScoreX4', 'zScoreX5']; factors.forEach(key => { const value = state.ratios[key]; let label = t_page(key.replace('zScore', 'zscore')); if (key === 'zScoreX2' && state.financials.retainedEarnings === 0 && !isFinite(value)) { label += ` <small class="text-muted">${t_page('zscoreRetainedEarningsNotFound')}</small>`; } factorsHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">${label} <span class="badge bg-secondary rounded-pill">${formatRatio(value)}</span></li>`; }); if(UI.zscoreFactorsList) UI.zscoreFactorsList.innerHTML = factorsHTML;
         console.log("[DEBUG] Finished displaying Z-Score."); // <<<--- ADDED LOG
      };

    // --- Render Cash Flow Analysis (Add Logs) ---
    const calculateAndDisplayCashFlowAnalysis = () => {
        console.log("[DEBUG] Attempting to display Cash Flow Analysis..."); // <<<--- ADDED LOG
        if (!state.hasValidData) {
            console.warn("[DEBUG] No valid data for Cash Flow, showing warning."); // <<<--- ADDED LOG
            if(UI.cfDataWarning) { UI.cfDataWarning.textContent = t_page('cfDataWarning'); UI.cfDataWarning.style.display = 'block'; }
            if(UI.cfResultsContainer) UI.cfResultsContainer.style.display = 'none';
            return;
        }
        console.log("[DEBUG] Rendering Cash Flow Analysis..."); // <<<--- ADDED LOG
        /* ... (rest of rendering logic as before) ... */
        if(UI.cfDataWarning) UI.cfDataWarning.style.display = 'none'; if(UI.cfResultsContainer) UI.cfResultsContainer.style.display = 'block'; const f = state.financials; const r = state.ratios; let stmtHTML = `<tr><td>${t_page('cfNetIncome')}</td><td class="text-end">${formatNumber(f.netProfit)}</td></tr> <tr><td class="ps-3">${t_page('cfDepreciationAmortization')}</td><td class="text-end">${formatNumber(f.depreciationAmortization)}</td></tr> <tr><td class="text-muted ps-3">${t_page('cfChangesWC')}</td><td class="text-end text-muted">(N/A)</td></tr> <tr class="table-light fw-bold"><td>${t_page('cfOperating')}</td><td class="text-end">${formatNumber(f.ocf_estimated)}</td></tr> <tr><td>${t_page('cfInvesting')}</td><td class="text-end">${formatNumber(f.icf_estimated)}</td></tr> <tr><td>${t_page('cfFinancing')}</td><td class="text-end">${formatNumber(f.fcf_estimated)}</td></tr> <tr class="table-light fw-bold border-top"><td>${t_page('cfNetChange')}</td><td class="text-end">${formatNumber(f.netCashChange_estimated)}</td></tr> `; if(UI.cfStatementTableBody) UI.cfStatementTableBody.innerHTML = stmtHTML; if(UI.cfValueOCFRatio) UI.cfValueOCFRatio.textContent = formatRatio(r.operatingCashFlowRatio); if(UI.cfValueFCF) UI.cfValueFCF.textContent = formatNumber(r.freeCashFlow); let interpretation = ''; if (isFinite(f.ocf_estimated)) { interpretation += f.ocf_estimated > 0 ? `<p>${t_page('cfInterpretationPositiveOCF')}</p>` : `<p>${t_page('cfInterpretationNegativeOCF')}</p>`; } if (isFinite(r.freeCashFlow)) { interpretation += `<p>${t_page('cfInterpretationFCF')}</p>`; } if(UI.cfInterpretation) UI.cfInterpretation.innerHTML = interpretation || `<p class="text-muted">${lang==='ar'?'...':'...'}</p>`;
        console.log("[DEBUG] Finished displaying Cash Flow Analysis."); // <<<--- ADDED LOG
    };


    // ==============================================
    // === RUN ANALYSIS & INITIALIZATION (Unchanged logic, just added logs) ===
    // ==============================================

    const runAnalysis = (renderOnlyRatios = false) => {
        console.log("[DEBUG] Running full analysis...");
        // *** Added explicit check for calculation success ***
        const financialsOk = calculateFinancials();
        const ratiosOk = financialsOk && calculateAllRatios();
        state.hasValidData = financialsOk && ratiosOk; // Update main flag

        console.log(`[DEBUG] Analysis complete. hasValidData: ${state.hasValidData}`);

        // Always attempt to render ratios and sidebar (they handle the hasValidData flag internally)
        renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
        renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
        renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
        renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);
        renderSidebar();

        // Render other tabs only if not explicitly told otherwise
        // The display functions themselves check state.hasValidData
        if (!renderOnlyRatios) {
             console.log("[DEBUG] Triggering render for all dependent tabs...");
             calculateAndDisplayDupont();
             calculateAndDisplayVerticalAnalysis();
             calculateAndDisplayZScore();
             calculateAndDisplayCashFlowAnalysis();
        }

        return state.hasValidData;
    };

    const populateIndustrySelect = () => { /* ... (logic unchanged) ... */ };

    const init = () => {
        console.log("[DEBUG] Initializing advanced page...");
        populateIndustrySelect();

        runAnalysis(true); // Run initial analysis, render only ratios for now

        if (UI.calculateBreakeven) { UI.calculateBreakeven.addEventListener('click', calculateAndDisplayBreakeven); }
        else { console.warn("[DEBUG] Breakeven calculate button not found"); }

        if (UI.industrySelect) {
            UI.industrySelect.addEventListener('change', (e) => {
                state.selectedIndustry = e.target.value;
                localStorage.setItem('selectedIndustry', state.selectedIndustry);
                console.log(`[DEBUG] Industry changed to: ${state.selectedIndustry}`);
                // Re-render ratio tables only
                renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
                renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
                renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
                renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);
                if (typeof window.applyTranslations === 'function') { window.applyTranslations(); }
                else { console.warn("[DEBUG] applyTranslations not found when changing industry"); }
            });
        }

        const tabs = ['ratios', 'breakeven', 'dupont', 'vertical', 'zscore', 'cashflow'];
        tabs.forEach(tabId => {
            const tabElement = document.getElementById(`${tabId}-tab`);
            if (tabElement) {
                tabElement.addEventListener('shown.bs.tab', () => {
                     console.log(`[DEBUG] ${tabId} tab shown`);
                     // No need to run full analysis again, just display the specific section
                     // Display functions check state.hasValidData internally
                     if (tabId === 'dupont') calculateAndDisplayDupont();
                     if (tabId === 'vertical') calculateAndDisplayVerticalAnalysis();
                     if (tabId === 'zscore') calculateAndDisplayZScore();
                     if (tabId === 'cashflow') calculateAndDisplayCashFlowAnalysis();
                     if (tabId === 'breakeven' && state.breakevenChart) { /* state.breakevenChart.resize(); */ }
                });
            } else { console.warn(`[DEBUG] Tab button not found for ID: ${tabId}-tab`); }
        });

         // Initial display for dependent tabs
         console.log("[DEBUG] Triggering initial display for dependent tabs...");
         calculateAndDisplayDupont();
         calculateAndDisplayVerticalAnalysis();
         calculateAndDisplayZScore();
         calculateAndDisplayCashFlowAnalysis();

         // Apply translations
         if (typeof window.applyTranslations === 'function') {
              console.log("[DEBUG] Applying translations during init...");
              window.applyTranslations();
         }
         else { console.warn("[DEBUG] applyTranslations function not found during init."); }

         console.log("[DEBUG] Advanced page initialized.");
    };

    // Run init
    if (document.getElementById('ratios-pane') && document.getElementById('cashflow-pane')) {
        init();
    } else {
        console.error("[DEBUG] Critical tab pane elements were not found. Initialization stopped.");
    }
}); // End DOMContentLoaded
