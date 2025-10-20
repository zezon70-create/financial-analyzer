// js/report-app.js (Corrected Version 4: Renamed formatCurrency to formatNumber)

window.pageTranslations = { /* ... (All translations as before) ... */ };

document.addEventListener('DOMContentLoaded', () => {
    console.log("[DEBUG] DOM Loaded for report-app.js");

    const state = {
        trialData: [],
        statements: { assets: { current: [], nonCurrent: [] }, liabilities: { current: [], nonCurrent: [] }, equity: { capital: [], retainedEarningsItems: [] }, income: { revenue: [], cogs: [], expenses: [] } },
        financials: {}, ratios: {}, hasValidData: false, selectedIndustry: 'general'
    };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`;

    // *** HELPER FUNCTIONS (formatCurrency renamed to formatNumber) ***
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
    const formatPercent = (value, digits = 1) => isFinite(value) && !isNaN(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
    const formatRatio = (value, digits = 2) => isFinite(value) && !isNaN(value) ? value.toFixed(digits) : "N/A";
    // *** THIS LINE IS CORRECTED ***
    const formatNumber = (value, digits = 0) => isFinite(value) && !isNaN(value) ? value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "N/A";

    // Benchmark Data
    const industryBenchmarks = { /* ... (benchmark data as before) ... */ };

    // Function to group trial balance data and calculate totals
    const buildStatementsAndFinancials = () => { /* ... (Function as before) ... */ };

     // Calculate Ratios Function
     const calculateAllRatios = () => { /* ... (Function as before) ... */ };

    // Render Statement Section Function (Corrected to use formatNumber)
    const renderStatementSection = (items, totalLabel, isSubSection = false) => {
        let total = 0;
        let html = `<table class="table table-sm report-table ${isSubSection ? 'mb-0' : ''}"><tbody>`;
        if (!Array.isArray(items)) {
            console.error(`[DEBUG] renderStatementSection received non-array for items with label: ${totalLabel}`, items);
            items = []; 
        }
        items.forEach(item => {
            const itemValue = typeof item.value === 'number' ? item.value : 0;
            html += `<tr><td>${item.Account}</td><td class="text-end">${formatNumber(itemValue)}</td></tr>`; // Use formatNumber
            total += itemValue;
        });
        if (totalLabel) {
            html += `<tr class="subtotal-row"><td>${totalLabel}</td><td class="text-end">${formatNumber(total)}</td></tr>`; // Use formatNumber
        }
        html += '</tbody></table>';
        return { html, total };
    };

    // --- Rendering functions for each statement (Corrected to use formatNumber) ---
    const renderBalanceSheet = () => {
        const container = document.getElementById('balanceSheetTable');
        const commentContainer = document.getElementById('balanceSheetComment');
        if (!container || !commentContainer) { console.error("[DEBUG] Balance Sheet container or comment element not found."); return; }
        if (!state.hasValidData || !state.statements || !state.statements.assets || !state.statements.liabilities || !state.statements.equity) {
             console.warn("[DEBUG] No valid data for Balance Sheet rendering.");
             container.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`;
             commentContainer.textContent = t_page('bs_comment_unbalanced').replace('{diff}', 'N/A');
             return;
        }
        console.log("[DEBUG] Rendering Balance Sheet...");
        const { assets, liabilities, equity } = state.statements;
        let html = `<h6>${t_page('assets')}</h6>`;
        const currentAssetsResult = renderStatementSection(assets.current, `${t_page('total')} ${t_page('currentAssets')}`, true);
        const nonCurrentAssetsResult = renderStatementSection(assets.nonCurrent, `${t_page('total')} ${t_page('nonCurrentAssets')}`, true);
        const totalAssets = (currentAssetsResult?.total || 0) + (nonCurrentAssetsResult?.total || 0);
        html += (currentAssetsResult?.html || '') + (nonCurrentAssetsResult?.html || '');
        html += `<table class="table report-table"><tbody class="total-row"><tr><td>${t_page('totalAssets')}</td><td class="text-end">${formatNumber(totalAssets)}</td></tr></tbody></table>`; // Use formatNumber
        html += `<h6 class="mt-4">${t_page('liabilities')} & ${t_page('equity')}</h6>`;
        const currentLiabsResult = renderStatementSection(liabilities.current, `${t_page('total')} ${t_page('currentLiabilities')}`, true);
        const nonCurrentLiabsResult = renderStatementSection(liabilities.nonCurrent, `${t_page('total')} ${t_page('nonCurrentLiabilities')}`, true);
        const totalLiabs = (currentLiabsResult?.total || 0) + (nonCurrentLiabsResult?.total || 0);
        html += (currentLiabsResult?.html || '') + (nonCurrentLiabsResult?.html || '');
        html += `<table class="table report-table"><tbody class="subtotal-row"><tr><td>${t_page('totalLiabilities')}</td><td class="text-end">${formatNumber(totalLiabs)}</td></tr></tbody></table>`; // Use formatNumber
        const equityItems = (equity.capital || []).concat(equity.retainedEarningsItems || []);
        const totalEquityResult = renderStatementSection(equityItems, t_page('totalEquity'), true);
        const totalEquityValue = totalEquityResult?.total || 0;
        html += (totalEquityResult?.html || '');
        const netProfitForBalance = state.financials.netProfit || 0;
        html += `<table class="table report-table"><tbody><tr><td>${t_page('netProfit')}</td><td class="text-end">${formatNumber(netProfitForBalance)}</td></tr></tbody></table>`; // Use formatNumber
        const totalLiabsAndEquity = totalLiabs + totalEquityValue + netProfitForBalance;
        html += `<table class="table report-table"><tbody class="total-row"><tr><td>${t_page('totalLiabilitiesAndEquity')}</td><td class="text-end">${formatNumber(totalLiabsAndEquity)}</td></tr></tbody></table>`; // Use formatNumber
        container.innerHTML = html;
        const diff = totalAssets - totalLiabsAndEquity;
        const comment = Math.abs(diff) < 1 ? t_page('bs_comment_balanced') : t_page('bs_comment_unbalanced').replace('{diff}', formatNumber(diff)); // Use formatNumber
        commentContainer.textContent = comment;
        console.log("[DEBUG] Finished rendering Balance Sheet.");
    };
    const renderIncomeStatement = () => {
        const container = document.getElementById('incomeStatementTable');
        const commentContainer = document.getElementById('incomeStatementComment');
        if (!container || !commentContainer) { console.error("[DEBUG] Income Statement elements not found."); return; }
        if (!state.hasValidData || !state.statements || !state.statements.income) {
             console.warn("[DEBUG] No valid data for Income Statement rendering.");
             container.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`;
             commentContainer.textContent = t_page('is_comment_loss').replace('{profit}', 'N/A');
             return;
        }
        console.log("[DEBUG] Rendering Income Statement...");
        const { revenue, cogs, expenses } = state.statements.income;
        let html = '<table class="table table-sm report-table"><tbody>';
        const totalRevenue = renderStatementSection(revenue, t_page('revenue'), true);
        const totalCogs = renderStatementSection(cogs, `(-) ${t_page('cogs')}`, true);
        const grossProfit = totalRevenue.total - totalCogs.total;
        html += totalRevenue.html + totalCogs.html + `<tr class="subtotal-row"><td>${t_page('grossProfit')}</td><td class="text-end">${formatNumber(grossProfit)}</td></tr>`; // Use formatNumber
        const totalExpenses = renderStatementSection(expenses, `(-) ${t_page('operatingExpenses')}`, true);
        const netProfit = grossProfit - totalExpenses.total;
        html += totalExpenses.html + `</tbody></table><table class="table report-table"><tbody class="total-row"><tr><td>${t_page('netProfit')}</td><td class="text-end">${formatNumber(netProfit)}</td></tr></tbody></table>`; // Use formatNumber
        container.innerHTML = html;
        const margin = totalRevenue.total !== 0 ? (netProfit / totalRevenue.total) * 100 : 0;
        const comment = netProfit > 0 
            ? t_page('is_comment_profit').replace('{profit}', formatNumber(netProfit)).replace('{margin}', margin.toFixed(1)) // Use formatNumber
            : t_page('is_comment_loss').replace('{profit}', formatNumber(netProfit)); // Use formatNumber
        commentContainer.textContent = comment;
        console.log("[DEBUG] Finished rendering Income Statement.");
    };
    const renderCashFlowStatement = () => {
        const container = document.getElementById('cashFlowStatementTable');
        const commentContainer = document.getElementById('cashFlowStatementComment');
        if (!container || !commentContainer) { console.error("[DEBUG] Cash Flow elements not found."); return; }
        if (!state.hasValidData || !state.financials) {
            console.warn("[DEBUG] No valid data for Cash Flow rendering.");
            container.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`;
            commentContainer.textContent = t_page('cf_comment_negative');
            return;
        }
        console.log("[DEBUG] Rendering Cash Flow Statement...");
        const f = state.financials;
        let html = `<table class="table table-sm report-table"><tbody>
            <tr><td>${t_page('cfNetIncome')}</td><td class="text-end">${formatNumber(f.netProfit)}</td></tr>
            <tr><td class="ps-3">${t_page('cfDepreciationAmortization')}</td><td class="text-end">${formatNumber(f.depreciationAmortization)}</td></tr>
            <tr><td class="text-muted ps-3">${t_page('cfChangesWC')}</td><td class="text-end text-muted">(N/A)</td></tr>
            <tr class="table-light fw-bold"><td>${t_page('cfOperating')}</td><td class="text-end">${formatNumber(f.ocf_estimated)}</td></tr>
            <tr><td>${t_page('cfInvesting')}</td><td class="text-end">${formatNumber(f.icf_estimated)}</td></tr>
            <tr><td>${t_page('cfFinancing')}</td><td class="text-end">${formatNumber(f.fcf_estimated)}</td></tr>
            </tbody></table><table class="table report-table"><tbody class="total-row"><tr><td>${t_page('netCashFlow')}</td><td class="text-end">${formatNumber(f.netCashChange_estimated)}</td></tr></tbody></table>`; // All use formatNumber
        container.innerHTML = html;
        commentContainer.textContent = (f.ocf_estimated || 0) > 0 ? t_page('cf_comment_positive') : t_page('cf_comment_negative');
        console.log("[DEBUG] Finished rendering Cash Flow Statement.");
    };
    const renderEquityStatement = () => {
        const container = document.getElementById('equityStatementTable');
        const commentContainer = document.getElementById('equityStatementComment');
        if (!container || !commentContainer) { console.error("[DEBUG] Equity Statement elements not found."); return; }
        if (!state.hasValidData || !state.statements || !state.statements.equity || !state.financials) {
             console.warn("[DEBUG] No valid data for Equity Statement rendering.");
             container.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`;
             commentContainer.textContent = t_page('eq_comment_decline');
             return;
        }
        console.log("[DEBUG] Rendering Equity Statement...");
        const openingEquity = state.financials.equity || 0; 
        const netProfit = state.financials.netProfit || 0;
        const closingEquity = openingEquity + netProfit;
        let html = `<table class="table table-sm report-table"><tbody>`;
        html += `<tr><td>${t_page('openingBalance')}</td><td class="text-end">${formatNumber(openingEquity)}</td></tr>`; // Use formatNumber
        html += `<tr><td>(+) ${t_page('netProfit')}</td><td class="text-end">${formatNumber(netProfit)}</td></tr>`; // Use formatNumber
        html += `<tr class="total-row"><td>${t_page('closingBalance')}</td><td class="text-end">${formatNumber(closingEquity)}</td></tr>`; // Use formatNumber
        html += `</tbody></table>`;
        container.innerHTML = html;
        commentContainer.textContent = netProfit > 0 ? t_page('eq_comment_growth') : t_page('eq_comment_decline');
        console.log("[DEBUG] Finished rendering Equity Statement.");
    };

    // --- Render Ratio Category Function (Corrected to use formatNumber) ---
    const getRatioComment = (key, value) => { /* ... (function as before) ... */ };
    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => {
        const container = document.getElementById(divId);
        if (!container) { console.error(`[DEBUG] Ratio container not found: ${divId}`); return; }
        if (!state.hasValidData) {
            container.innerHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <p class="text-muted">${t_page('noDataForRatios')}</p>`; return;
        }
        console.log(`[DEBUG] Rendering ratio category: ${categoryTitleKey}`);
        const benchmarks = industryBenchmarks[state.selectedIndustry] || {};
        const showBenchmarks = state.selectedIndustry !== 'general';
        let tableHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <div class="table-responsive"> <table class="table table-sm table-striped"> <thead><tr> <th>${t_page('thRatio')}</th> <th class="text-end">${t_page('thValue')}</th> ${showBenchmarks ? `<th class="text-end">${t_page('thIndustryAvg')}</th>` : ''} <th>${t_page('thComment')}</th> </tr></thead> <tbody>`;
        ratioKeys.forEach(key => {
            const value = state.ratios && state.ratios.hasOwnProperty(key) ? state.ratios[key] : NaN;
            const benchmarkValue = benchmarks[key];
            const isPercentage = key.includes('Margin') || key.includes('roa') || key.includes('roe');
            const formattedValue = isPercentage ? formatPercent(value) : formatRatio(value);
            const formattedBenchmark = (showBenchmarks && typeof benchmarkValue !== 'undefined' && isFinite(benchmarkValue)) ? (isPercentage ? formatPercent(benchmarkValue) : formatRatio(benchmarkValue)) : '-';
            const comment = getRatioComment(key, value);
            let comparisonIndicator = ''; let comparisonText = '';
            if (showBenchmarks && typeof benchmarkValue !== 'undefined' && isFinite(value) && isFinite(benchmarkValue)) { const tolerance = 0.1 * Math.abs(benchmarkValue); const isDebtRatio = key === 'debtToEquity' || key === 'debtToAssets'; const isBetter = isDebtRatio ? value < benchmarkValue - tolerance : value > benchmarkValue + tolerance; const isWorse = isDebtRatio ? value > benchmarkValue + tolerance : value < benchmarkValue - tolerance; if (isBetter) { comparisonIndicator = '<i class="bi bi-arrow-up-circle-fill text-success ms-1"></i>'; comparisonText = `(${t_page('comparison_better')})`; } else if (isWorse) { comparisonIndicator = '<i class="bi bi-arrow-down-circle-fill text-danger ms-1"></i>'; comparisonText = `(${t_page('comparison_worse')})`; } else { comparisonIndicator = '<i class="bi bi-arrow-left-right text-warning ms-1"></i>'; comparisonText = `(${t_page('comparison_similar')})`; } }
            tableHTML += `<tr> <td>${t_page(key)}</td> <td class="text-end"><strong>${formattedValue}</strong> ${comparisonIndicator} <small class="text-muted">${comparisonText}</small></td> ${showBenchmarks ? `<td class="text-end">${formattedBenchmark}</td>` : ''} <td class="text-muted small">${comment}</td> </tr>`;
        });
        container.innerHTML = tableHTML + `</tbody></table></div>`;
        console.log(`[DEBUG] Finished rendering ratio category: ${categoryTitleKey}`);
    };
    
     // --- Populate Industry Select Function ---
     const populateIndustrySelect = () => { /* ... (function as before) ... */ };

    const init = () => {
        console.log("[DEBUG] Initializing report page...");
        const pdfBtn = document.getElementById('exportPdfBtn');
        const excelBtn = document.getElementById('exportExcelBtn');
        const industrySelect = document.getElementById('industrySelect');

        if (pdfBtn) { pdfBtn.addEventListener('click', () => { /* ... PDF export logic ... */ }); }
        if (excelBtn) { excelBtn.addEventListener('click', () => { /* ... Excel export logic ... */ }); }

        buildStatementsAndFinancials(); // Sets state.hasValidData

        if (state.hasValidData) {
            console.log("[DEBUG] Data is valid, calculating ratios and rendering...");
            calculateAllRatios(); 
            renderBalanceSheet(); renderIncomeStatement(); renderCashFlowStatement(); renderEquityStatement();
            populateIndustrySelect();
            renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
            renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
            renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
            renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);
            if (industrySelect) {
                industrySelect.addEventListener('change', (e) => {
                    state.selectedIndustry = e.target.value; localStorage.setItem('selectedIndustry', state.selectedIndustry);
                    console.log(`[DEBUG] Industry changed to: ${state.selectedIndustry}`);
                    renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
                    renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
                    renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
                    renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);
                    if (typeof window.applyTranslations === 'function') { window.applyTranslations(); }
                    else { console.warn("[DEBUG] applyTranslations not found on industry change"); }
                });
            }
        } else {
             console.warn("[DEBUG] Data is invalid or missing, showing warnings only.");
             // ... (warning display logic as before) ...
        }

         setTimeout(() => {
             if (typeof window.applyTranslations === 'function') {
                 console.log("[DEBUG] Applying translations (report-app.js) via setTimeout...");
                 window.applyTranslations();
             } else {
                 console.error("[!!! DEBUG !!!] applyTranslations function is NOT DEFINED. Check main.js and script order in report.html!");
             }
         }, 100); 

         console.log("[DEBUG] Report page initialization finished.");
    };

    if (document.getElementById('balanceSheetTable') && document.getElementById('financialRatiosSection')) {
        init();
    } else {
        console.error("[DEBUG] Critical elements 'balanceSheetTable' or 'financialRatiosSection' were not found. Initialization stopped.");
    }
});
