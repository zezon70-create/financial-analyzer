// js/report-app.js (Working Version + Ratios & Benchmarks Added)

window.pageTranslations = {
    ar: {
        pageTitle: "التقارير المالية المفصلة — المحلل المالي",
        pageHeader: "القوائم المالية المفصلة",
        pageSubheader: "تقارير احترافية طبقًا للمعايير الدولية مع تعليقات تحليلية ذكية.",
        commentaryTitle: "تعليق تحليلي", exportPdf: "تصدير PDF", exportExcel: "تصدير Excel", total: "الإجمالي",
        bsTitle: "قائمة المركز المالي", bsSubheader: "تعرض أصول الشركة وخصومها وحقوق ملكيتها...", assets: "الأصول", currentAssets: "الأصول المتداولة", nonCurrentAssets: "الأصول غير المتداولة", totalAssets: "إجمالي الأصول", liabilities: "الخصوم", currentLiabilities: "الخصوم المتداولة", nonCurrentLiabilities: "الخصوم غير المتداولة", totalLiabilities: "إجمالي الخصوم", equity: "حقوق الملكية", totalEquity: "إجمالي حقوق الملكية", totalLiabilitiesAndEquity: "إجمالي الخصوم وحقوق الملكية", bs_comment_balanced: "تحليل إيجابي: قائمة المركز المالي متوازنة...", bs_comment_unbalanced: "تحليل يتطلب الانتباه: القائمة غير متوازنة بفارق {diff}...",
        isTitle: "قائمة الدخل الشامل", isSubheader: "تلخص إيرادات ومصروفات الشركة...", revenue: "الإيرادات", cogs: "تكلفة المبيعات", grossProfit: "مجمل الربح", operatingExpenses: "المصروفات التشغيلية", operatingProfit: "الربح التشغيلي", /* Added if needed */ netProfit: "صافي الربح", is_comment_profit: "أداء قوي: الشركة تحقق صافي ربح...", is_comment_loss: "تحديات في الربحية: الشركة تسجل صافي خسارة...",
        cfTitle: "قائمة التدفقات النقدية (تقديري)", cfSubheader: "توضح حركة النقد...", operatingActivities: "التدفقات النقدية التشغيلية", investingActivities: "التدفقات النقدية الاستثمارية", financingActivities: "التدفقات النقدية التمويلية", netCashFlow: "صافي التغير في النقد", cf_comment_positive: "وضع نقدي جيد...", cf_comment_negative: "مؤشر خطر...",
        eqTitle: "قائمة التغيرات في حقوق الملكية", eqSubheader: "توضح التغيرات التي طرأت...", openingBalance: "الرصيد الافتتاحي", closingBalance: "الرصيد الختامي", eq_comment_growth: "نمو في حقوق المساهمين...", eq_comment_decline: "انخفاض في حقوق المساهمين...",

        // *** ADDED Ratios & Benchmarking Translations ***
        ratiosTitle: "النسب المالية الرئيسية والمقارنات المعيارية",
        ratiosSubheader: "تحليل لأهم النسب المالية مقارنة بمتوسطات الصناعة.",
        selectIndustryLabel: "اختر قطاع الصناعة للمقارنة",
        selectIndustryDesc: "اختيار قطاع سيضيف مقارنة مع متوسطات الصناعة إلى جداول النسب.",
        thRatio: "النسبة", thValue: "القيمة", thIndustryAvg: "متوسط الصناعة", thComment: "تعليق تحليلي",
        noDataForRatios: "لا توجد بيانات كافية لحساب النسب. يرجى إدخال ميزان المراجعة أولاً.",
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
        industry_general: "عام / غير محدد", industry_retail: "تجارة التجزئة", industry_manufacturing: "الصناعة التحويلية", industry_services: "الخدمات", industry_construction: "المقاولات",
        comparison_better: "أفضل", comparison_worse: "أسوأ", comparison_similar: "مماثل"

    },
    en: { // ... (English translations including Ratios & Benchmarking) ...
        pageTitle: "Detailed Financial Statements — Financial Analyzer", pageHeader: "Detailed Financial Statements", pageSubheader: "Professional IFRS-compliant reports...", commentaryTitle: "Analytical Commentary", exportPdf: "Export PDF", exportExcel: "Export Excel", total: "Total",
        bsTitle: "Statement of Financial Position", bsSubheader: "Shows the company's assets...", assets: "Assets", currentAssets: "Current Assets", nonCurrentAssets: "Non-current Assets", totalAssets: "Total Assets", liabilities: "Liabilities", currentLiabilities: "Current Liabilities", nonCurrentLiabilities: "Non-current Liabilities", totalLiabilities: "Total Liabilities", equity: "Equity", totalEquity: "Total Equity", totalLiabilitiesAndEquity: "Total Liabilities and Equity", bs_comment_balanced: "Positive Analysis...", bs_comment_unbalanced: "Action Required...",
        isTitle: "Statement of Comprehensive Income", isSubheader: "Summarizes revenues and expenses...", revenue: "Revenue", cogs: "Cost of Goods Sold", grossProfit: "Gross Profit", operatingExpenses: "Operating Expenses", operatingProfit: "Operating Profit", netProfit: "Net Profit", is_comment_profit: "Strong Performance...", is_comment_loss: "Profitability Challenges...",
        cfTitle: "Statement of Cash Flows (Est.)", cfSubheader: "Shows cash movement...", operatingActivities: "Operating Activities", investingActivities: "Investing Activities", financingActivities: "Financing Activities", netCashFlow: "Net Change in Cash", cf_comment_positive: "Good Cash Position...", cf_comment_negative: "Risk Indicator...",
        eqTitle: "Statement of Changes in Equity", eqSubheader: "Shows the changes in equity...", openingBalance: "Opening Equity", closingBalance: "Closing Equity", eq_comment_growth: "Shareholder Value Growth...", eq_comment_decline: "Shareholder Value Decline...",

        // *** ADDED Ratios & Benchmarking Translations ***
        ratiosTitle: "Key Financial Ratios & Benchmarks",
        ratiosSubheader: "Analysis of key financial ratios compared to industry averages.",
        selectIndustryLabel: "Select Industry for Benchmarking",
        selectIndustryDesc: "Choosing an industry will add benchmark averages to the ratio tables.",
        thRatio: "Ratio", thValue: "Value", thIndustryAvg: "Industry Avg.", thComment: "Commentary",
        noDataForRatios: "Insufficient data...", liquidityRatios: "Liquidity Ratios", profitabilityRatios: "Profitability Ratios", leverageRatios: "Leverage Ratios", efficiencyRatios: "Efficiency Ratios",
        // ... (Ratio names and comments) ...
        industry_general: "General / Unspecified", industry_retail: "Retail Trade", industry_manufacturing: "Manufacturing", industry_services: "Services", industry_construction: "Construction",
        comparison_better: "Better", comparison_worse: "Worse", comparison_similar: "Similar"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const state = {
        trialData: [],
        statements: {}, // Holds grouped data for statements
        financials: {}, // Holds calculated totals (Assets, Rev, NP etc.)
        ratios: {},     // Holds calculated ratios
        hasValidData: false, // Flag for data validity
        selectedIndustry: 'general' // For benchmarks
    };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`;
    const formatCurrency = (value) => isFinite(value) && !isNaN(value) ? value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : "N/A";
    // Add formatters from advanced-app.js
    const formatPercent = (value, digits = 1) => isFinite(value) && !isNaN(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
    const formatRatio = (value, digits = 2) => isFinite(value) && !isNaN(value) ? value.toFixed(digits) : "N/A";

    // *** ADDED: Industry Benchmark Data ***
    const industryBenchmarks = { /* ... (benchmark data as before) ... */ general: {}, retail: { currentRatio: 1.5, quickRatio: 0.5, netProfitMargin: 0.03, roe: 0.15, debtToEquity: 1.2, assetTurnover: 2.0, grossProfitMargin: 0.30 }, manufacturing: { currentRatio: 1.8, quickRatio: 0.9, netProfitMargin: 0.06, roe: 0.12, debtToEquity: 0.8, assetTurnover: 1.0, grossProfitMargin: 0.35 }, services: { currentRatio: 1.2, quickRatio: 1.0, netProfitMargin: 0.08, roe: 0.18, debtToEquity: 1.0, assetTurnover: 1.2, grossProfitMargin: 0.50 }, construction: { currentRatio: 1.3, quickRatio: 0.8, netProfitMargin: 0.04, roe: 0.14, debtToEquity: 1.5, assetTurnover: 1.5, grossProfitMargin: 0.20 } };


    // Function to group trial balance data and calculate totals
    const buildStatementsAndFinancials = () => {
        state.statements = {}; state.financials = {}; state.hasValidData = false;
        try {
            const rawDataString = localStorage.getItem('trialData');
            if (!rawDataString) throw new Error("localStorage 'trialData' is missing.");
            state.trialData = JSON.parse(rawDataString);
            if (!Array.isArray(state.trialData) || state.trialData.length === 0 || (state.trialData.length === 1 && !state.trialData[0].Account && !toNum(state.trialData[0].Debit) && !toNum(state.trialData[0].Credit))) {
                throw new Error("Parsed 'trialData' is empty or invalid.");
            }
        } catch (e) { console.error("Error loading/parsing 'trialData':", e); return false; }

        try {
            const financials = { /* Aggregated totals */ assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0, netProfit: 0, grossProfit: 0, currentAssets: 0, inventory: 0, currentLiabilities: 0, retainedEarnings: 0, interestExpense: 0, taxExpense: 0, depreciationAmortization: 0, ppeNet: 0, longTermDebt: 0, shortTermDebt: 0, cashEquivalents: 0, ebit: 0, workingCapital: 0 };
            const statements = { /* Grouped items */ assets: { current: [], nonCurrent: [] }, liabilities: { current: [], nonCurrent: [] }, equity: { capital: [], retainedEarningsItems: [] }, income: { revenue: [], cogs: [], expenses: [] } };

            state.trialData.forEach(row => {
                 const value = (toNum(row.Debit)) - (toNum(row.Credit)); const mainType = row.MainType || ''; const subType = row.SubType || ''; const accountName = (row.Account || '').toLowerCase(); const item = { Account: row.Account || 'N/A', value: 0 }; // Simplified item for statements

                 if (mainType.includes('الأصول') || mainType.includes('Assets')) {
                     financials.assets += value; item.value = value;
                     if (subType.includes('متداول') || subType.includes('Current')) { financials.currentAssets += value; statements.assets.current.push(item); if (subType.includes('المخزون') || subType.includes('Inventory') || accountName.includes('inventory') || accountName.includes('مخزون')) financials.inventory += value; if (subType.includes('النقد') || subType.includes('Cash') || accountName.includes('cash') || accountName.includes('نقد')) financials.cashEquivalents += value; }
                     else { financials.ppeNet += (accountName.includes('ppe') || accountName.includes('fixed asset') || accountName.includes('أصول ثابتة'))? value : 0; statements.assets.nonCurrent.push(item); }
                 } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) {
                     financials.liabilities -= value; item.value = -value;
                     if (subType.includes('متداول') || subType.includes('Current')) { financials.currentLiabilities -= value; statements.liabilities.current.push(item); if(subType.includes('قروض قصيرة') || subType.includes('Short-term Loans') || accountName.includes('short term debt') || accountName.includes('قرض قصير')) financials.shortTermDebt -=value; }
                     else { financials.longTermDebt += (subType.includes('قروض طويلة') || subType.includes('Long-term Loans') || accountName.includes('long term debt') || accountName.includes('قرض طويل'))? -value : 0; statements.liabilities.nonCurrent.push(item); }
                 } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) {
                     financials.equity -= value; item.value = -value;
                     if (subType.includes('رأس المال') || subType.includes('Capital')) statements.equity.capital.push(item);
                     else { financials.retainedEarnings -= (subType.includes('الأرباح المحتجزة') || subType.includes('Retained Earnings') || accountName.includes('retained earnings') || accountName.includes('أرباح محتجزة'))? value : 0; statements.equity.retainedEarningsItems.push(item); } // Group all non-capital equity here
                 } else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) {
                     if (subType.includes('الإيرادات') || subType.includes('Revenue')) { financials.revenue -= value; item.value = -value; statements.income.revenue.push(item); }
                     else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) { financials.cogs += value; item.value = value; statements.income.cogs.push(item); }
                     else { financials.expenses += value; item.value = value; statements.income.expenses.push(item); if (subType.includes('فائدة') || subType.includes('Interest') || accountName.includes('interest')) financials.interestExpense += value; if (subType.includes('ضريبية') || subType.includes('Tax') || accountName.includes('tax')) financials.taxExpense += value; if (subType.includes('إهلاك') || subType.includes('Depreciation') || accountName.includes('depreciation') || accountName.includes('amortization') || accountName.includes('إهلاك') || accountName.includes('استهلاك')) financials.depreciationAmortization += value; }
                 }
             });

            Object.keys(financials).forEach(key => financials[key] = financials[key] || 0);
            financials.grossProfit = financials.revenue - financials.cogs;
            financials.netProfit = financials.grossProfit - financials.expenses;
            financials.ebit = financials.netProfit + financials.interestExpense + financials.taxExpense;
            financials.workingCapital = financials.currentAssets - financials.currentLiabilities;

            // Simple Balance Sheet check
            const balanceCheck = financials.assets - (financials.liabilities + financials.equity + financials.netProfit);
            if (Math.abs(balanceCheck) > 1) console.warn(`Balance sheet check failed... Diff: ${balanceCheck.toFixed(2)}`);

            state.statements = statements;
            state.financials = financials;
            state.hasValidData = true;
            console.log("Built Statements:", statements);
            console.log("Calculated Financials:", financials);
            return true;
        } catch (e) {
            console.error("Error during statement building:", e);
            state.hasValidData = false;
            return false;
        }
    };

     // *** ADDED: Calculate Ratios Function (from advanced-app.js) ***
     const calculateAllRatios = () => {
        state.ratios = {};
        if (!state.hasValidData) { console.warn("Financials invalid, skipping ratio calculation."); return false; }
        const f = state.financials;
        try {
            const assets = f.assets || 0; const equity = f.equity || 0; const liabilities = f.liabilities || 0; const revenue = f.revenue || 0;
            const equityMultiplier = (equity !== 0 && assets !== 0) ? assets / equity : Infinity;
            const roeStandard = (equity !== 0) ? f.netProfit / equity : Infinity;
            state.ratios = {
                currentRatio: f.currentLiabilities !== 0 ? f.currentAssets / f.currentLiabilities : Infinity,
                quickRatio: f.currentLiabilities !== 0 ? (f.currentAssets - f.inventory) / f.currentLiabilities : Infinity,
                grossProfitMargin: revenue !== 0 ? f.grossProfit / revenue : 0,
                netProfitMargin: revenue !== 0 ? f.netProfit / revenue : 0,
                roa: assets !== 0 ? f.netProfit / assets : 0,
                roe: roeStandard,
                debtToAssets: assets !== 0 ? liabilities / assets : Infinity,
                debtToEquity: equity !== 0 ? liabilities / equity : Infinity,
                assetTurnover: assets !== 0 ? revenue / assets : 0,
                equityMultiplier: equityMultiplier // Needed for potential future DuPont on this page
            };
            console.log("Calculated Ratios:", state.ratios);
            return true;
        } catch(e) { console.error("Error calculating ratios:", e); state.ratios = {}; state.hasValidData = false; return false; }
    };


    // Function to render a section of a statement (like current assets)
    const renderStatementSection = (items, totalLabel, isSubSection = false) => {
        let total = 0;
        let html = `<table class="table table-sm report-table ${isSubSection ? 'mb-0' : ''}"><tbody>`; // Removed mb-3 for subsection
        items.forEach(item => {
            // Ensure item.value is a number before formatting
            const itemValue = typeof item.value === 'number' ? item.value : 0;
            html += `<tr><td>${item.Account}</td><td class="text-end">${formatCurrency(itemValue)}</td></tr>`;
            total += itemValue;
        });
        if (totalLabel) {
            html += `<tr class="subtotal-row"><td>${totalLabel}</td><td class="text-end">${formatCurrency(total)}</td></tr>`;
        }
        html += '</tbody></table>';
        return { html, total };
    };

    // --- Rendering functions for each statement ---
    const renderBalanceSheet = () => { /* ... (original logic unchanged) ... */ };
    const renderIncomeStatement = () => { /* ... (original logic unchanged) ... */ };
    const renderCashFlowStatement = () => { /* ... (original logic - simplified CF) ... */ };
    const renderEquityStatement = () => { /* ... (original logic - simplified EQ) ... */ };


    // *** ADDED: Render Ratio Category Function (from advanced-app.js + Benchmarks) ***
    const getRatioComment = (key, value) => { /* ... (comment logic from advanced-app.js) ... */ };
    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => {
        const container = document.getElementById(divId);
        if (!container) { console.error(`Ratio container not found: ${divId}`); return; }
        if (!state.hasValidData) {
            container.innerHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <p class="text-muted">${t_page('noDataForRatios')}</p>`; return;
        }

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
            let comparisonIndicator = ''; let comparisonText = '';
            if (showBenchmarks && typeof benchmarkValue !== 'undefined' && isFinite(value) && isFinite(benchmarkValue)) {
                const tolerance = 0.1 * Math.abs(benchmarkValue); const isDebtRatio = key === 'debtToEquity' || key === 'debtToAssets';
                const isBetter = isDebtRatio ? value < benchmarkValue - tolerance : value > benchmarkValue + tolerance;
                const isWorse = isDebtRatio ? value > benchmarkValue + tolerance : value < benchmarkValue - tolerance;
                if (isBetter) { comparisonIndicator = '<i class="bi bi-arrow-up-circle-fill text-success ms-1"></i>'; comparisonText = `(${t_page('comparison_better')})`; }
                else if (isWorse) { comparisonIndicator = '<i class="bi bi-arrow-down-circle-fill text-danger ms-1"></i>'; comparisonText = `(${t_page('comparison_worse')})`; }
                else { comparisonIndicator = '<i class="bi bi-arrow-left-right text-warning ms-1"></i>'; comparisonText = `(${t_page('comparison_similar')})`; }
            }
            tableHTML += `<tr>
                <td>${t_page(key)}</td>
                <td class="text-end"><strong>${formattedValue}</strong> ${comparisonIndicator} <small class="text-muted">${comparisonText}</small></td>
                ${showBenchmarks ? `<td class="text-end">${formattedBenchmark}</td>` : ''}
                <td class="text-muted small">${comment}</td>
            </tr>`;
        });
        container.innerHTML = tableHTML + `</tbody></table></div>`;
    };

     // *** ADDED: Populate Industry Select Function ***
     const populateIndustrySelect = () => {
        const industrySelect = document.getElementById('industrySelect'); // Get inside function
        if (!industrySelect) { console.warn("Industry select dropdown not found in report page."); return; }
        const industries = ['general', 'retail', 'manufacturing', 'services', 'construction'];
        industrySelect.innerHTML = industries.map(key =>
            `<option value="${key}">${t_page(`industry_${key}`)}</option>`
        ).join('');
        state.selectedIndustry = localStorage.getItem('selectedIndustry') || 'general';
        industrySelect.value = state.selectedIndustry;
    };


    const init = () => {
        const pdfBtn = document.getElementById('exportPdfBtn');
        const excelBtn = document.getElementById('exportExcelBtn');
        // *** ADDED: Get Industry Select Element ***
        const industrySelect = document.getElementById('industrySelect');

        if (pdfBtn) { pdfBtn.addEventListener('click', () => { /* ... PDF export logic ... */ }); }
        if (excelBtn) { excelBtn.addEventListener('click', () => { /* ... Excel export logic ... */ }); }

        // Build statements and calculate financials first
        if (buildStatementsAndFinancials()) {
            state.hasValidData = true; // Set flag if successful
            calculateAllRatios(); // Calculate ratios if data is valid

            renderBalanceSheet();
            renderIncomeStatement();
            renderCashFlowStatement();
            renderEquityStatement();

            // *** ADDED: Populate select and render ratio tables ***
            populateIndustrySelect();
            renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
            renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
            renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
            renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);

            // *** ADDED: Listener for Industry Select change ***
            if (industrySelect) {
                industrySelect.addEventListener('change', (e) => {
                    state.selectedIndustry = e.target.value;
                    localStorage.setItem('selectedIndustry', state.selectedIndustry);
                    console.log(`Industry changed to: ${state.selectedIndustry}`);
                    // Re-render ratio tables only
                    renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
                    renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
                    renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
                    renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);
                    if (typeof applyTranslations === 'function') { applyTranslations(); } // Ensure text like "Better/Worse" is updated
                });
            }

        } else {
             // Show warnings if data is invalid
             document.getElementById('balanceSheetComment').textContent = t_page('bs_comment_unbalanced').replace('{diff}', 'N/A');
             document.getElementById('incomeStatementComment').textContent = t_page('is_comment_loss').replace('{profit}', 'N/A');
             document.getElementById('cashFlowStatementComment').textContent = t_page('cf_comment_negative');
             document.getElementById('equityStatementComment').textContent = t_page('eq_comment_decline');
             // *** ADDED: Show warning for ratios too ***
             const ratiosWarningEl = document.getElementById('ratiosDataWarning');
             if(ratiosWarningEl) {
                 ratiosWarningEl.textContent = t_page('noDataForRatios');
                 ratiosWarningEl.style.display = 'block';
             }
        }
         // Apply translations regardless of data validity
         if (typeof applyTranslations === 'function') { applyTranslations(); }
         else { console.warn("applyTranslations function not found in report-app.js init.");}

    };

    init();
});
