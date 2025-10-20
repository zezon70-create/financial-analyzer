// js/report-app.js (Corrected Version 3: Fixed initialization, added deeper try/catch, delayed translation call)

window.pageTranslations = { /* ... (All translations as before) ... */ };

document.addEventListener('DOMContentLoaded', () => {
    console.log("[DEBUG] DOM Loaded for report-app.js");

    const state = {
        trialData: [],
        statements: { // Explicit initial structure
            assets: { current: [], nonCurrent: [] },
            liabilities: { current: [], nonCurrent: [] },
            equity: { capital: [], retainedEarningsItems: [] },
            income: { revenue: [], cogs: [], expenses: [] }
        },
        financials: {},
        ratios: {},
        hasValidData: false,
        selectedIndustry: 'general'
    };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`;

    // Helper functions
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
    const formatPercent = (value, digits = 1) => isFinite(value) && !isNaN(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
    const formatRatio = (value, digits = 2) => isFinite(value) && !isNaN(value) ? value.toFixed(digits) : "N/A";
    const formatCurrency = (value) => isFinite(value) && !isNaN(value) ? value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : "N/A";

    // Benchmark Data
    const industryBenchmarks = { /* ... benchmark data ... */ };

    // Function to group trial balance data and calculate totals
    const buildStatementsAndFinancials = () => {
        // *** Ensure proper reset ***
        state.statements = { assets: { current: [], nonCurrent: [] }, liabilities: { current: [], nonCurrent: [] }, equity: { capital: [], retainedEarningsItems: [] }, income: { revenue: [], cogs: [], expenses: [] } };
        state.financials = {};
        state.hasValidData = false;
        console.log("[DEBUG] Attempting to build statements...");

        let trialData;
        try {
            const rawDataString = localStorage.getItem('trialData');
            if (!rawDataString) throw new Error("localStorage 'trialData' is missing.");
            trialData = JSON.parse(rawDataString);
            if (!Array.isArray(trialData) || trialData.length === 0 || (trialData.length === 1 && !trialData[0].Account && !toNum(trialData[0].Debit) && !toNum(trialData[0].Credit))) {
                throw new Error("Parsed 'trialData' is empty or invalid.");
            }
        } catch (e) { console.error("[DEBUG] Error loading/parsing 'trialData':", e); return false; }

        try {
            const financials = { assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0, netProfit: 0, grossProfit: 0, currentAssets: 0, inventory: 0, currentLiabilities: 0, retainedEarnings: 0, interestExpense: 0, taxExpense: 0, depreciationAmortization: 0, ppeNet: 0, longTermDebt: 0, shortTermDebt: 0, cashEquivalents: 0, ebit: 0, workingCapital: 0 };
            const statements = state.statements; // Use the freshly reset structure

            // *** Added deeper try...catch for the loop itself ***
             try {
                trialData.forEach(row => {
                    const value = (toNum(row.Debit)) - (toNum(row.Credit));
                    const mainType = row.MainType || '';
                    const subType = row.SubType || '';
                    const accountName = (row.Account || '').toLowerCase();
                    const item = { Account: row.Account || 'N/A', value: 0 };

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
                        else { financials.retainedEarnings -= (subType.includes('الأرباح المحتجزة') || subType.includes('Retained Earnings') || accountName.includes('retained earnings') || accountName.includes('أرباح محتجزة'))? value : 0; statements.equity.retainedEarningsItems.push(item); }
                    } else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) {
                        if (subType.includes('الإيرادات') || subType.includes('Revenue')) { financials.revenue -= value; item.value = -value; statements.income.revenue.push(item); }
                        else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) { financials.cogs += value; item.value = value; statements.income.cogs.push(item); }
                        else { financials.expenses += value; item.value = value; statements.income.expenses.push(item); if (subType.includes('فائدة') || subType.includes('Interest') || accountName.includes('interest')) financials.interestExpense += value; if (subType.includes('ضريبية') || subType.includes('Tax') || accountName.includes('tax')) financials.taxExpense += value; if (subType.includes('إهلاك') || subType.includes('Depreciation') || accountName.includes('depreciation') || accountName.includes('amortization') || accountName.includes('إهلاك') || accountName.includes('استهلاك')) financials.depreciationAmortization += value; }
                    }
                });
             } catch(loopError) {
                 console.error("[DEBUG] Error inside trialData processing loop:", loopError);
                 throw loopError; // Re-throw to be caught by outer catch
             }

            Object.keys(financials).forEach(key => financials[key] = financials[key] || 0);
            financials.grossProfit = financials.revenue - financials.cogs;
            financials.netProfit = financials.grossProfit - financials.expenses;
            financials.ebit = financials.netProfit + financials.interestExpense + financials.taxExpense;
            financials.workingCapital = financials.currentAssets - financials.currentLiabilities;
            // Simplified CF estimates
            financials.ocf_estimated = financials.netProfit + financials.depreciationAmortization;
            financials.capex_estimated = financials.depreciationAmortization;
            financials.icf_estimated = -financials.capex_estimated;
            financials.fcf_estimated = 0;
            financials.netCashChange_estimated = financials.ocf_estimated + financials.icf_estimated + financials.fcf_estimated;
            financials.freeCashFlow_estimated = financials.ocf_estimated - financials.capex_estimated;

            const balanceCheck = financials.assets - (financials.liabilities + financials.equity + financials.netProfit);
            if (Math.abs(balanceCheck) > 1) console.warn(`Balance sheet check failed... Diff: ${balanceCheck.toFixed(2)}`);

            state.financials = financials;
            state.statements = statements; // Ensure the populated statements are saved back
            state.hasValidData = true;
            console.log("[DEBUG] Successfully built statements and financials.");
            return true;
        } catch (e) {
            console.error("[DEBUG] Error during statement building main try/catch:", e);
            state.hasValidData = false;
            return false;
        }
    };

     // Calculate Ratios Function (Unchanged)
     const calculateAllRatios = () => { /* ... Function as before ... */ };

    // Render Statement Section Function (Added array check)
    const renderStatementSection = (items, totalLabel, isSubSection = false) => {
        let total = 0;
        let html = `<table class="table table-sm report-table ${isSubSection ? 'mb-0' : ''}"><tbody>`;
        // *** Add a check if 'items' is actually an array ***
        if (!Array.isArray(items)) {
            console.error(`[DEBUG] renderStatementSection received non-array for items with label: ${totalLabel}`, items);
            items = []; // Prevent error, render empty section
        }
        items.forEach(item => {
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

    // --- Rendering functions for each statement (Add checks) ---
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
        html += `<table class="table report-table"><tbody class="total-row"><tr><td>${t_page('totalAssets')}</td><td class="text-end">${formatCurrency(totalAssets)}</td></tr></tbody></table>`;

        html += `<h6 class="mt-4">${t_page('liabilities')} & ${t_page('equity')}</h6>`;
        const currentLiabsResult = renderStatementSection(liabilities.current, `${t_page('total')} ${t_page('currentLiabilities')}`, true);
        const nonCurrentLiabsResult = renderStatementSection(liabilities.nonCurrent, `${t_page('total')} ${t_page('nonCurrentLiabilities')}`, true);
        const totalLiabs = (currentLiabsResult?.total || 0) + (nonCurrentLiabsResult?.total || 0);
        html += (currentLiabsResult?.html || '') + (nonCurrentLiabsResult?.html || '');
        html += `<table class="table report-table"><tbody class="subtotal-row"><tr><td>${t_page('totalLiabilities')}</td><td class="text-end">${formatCurrency(totalLiabs)}</td></tr></tbody></table>`;

        const equityItems = (equity.capital || []).concat(equity.retainedEarningsItems || []);
        const totalEquityResult = renderStatementSection(equityItems, t_page('totalEquity'), true);
        const totalEquityValue = totalEquityResult?.total || 0;
        html += (totalEquityResult?.html || '');

        const totalLiabsAndEquity = totalLiabs + totalEquityValue;
        html += `<table class="table report-table"><tbody class="total-row"><tr><td>${t_page('totalLiabilitiesAndEquity')}</td><td class="text-end">${formatCurrency(totalLiabsAndEquity)}</td></tr></tbody></table>`;

        container.innerHTML = html;
        const diff = totalAssets - totalLiabsAndEquity;
        const comment = Math.abs(diff) < 1 ? t_page('bs_comment_balanced') : t_page('bs_comment_unbalanced').replace('{diff}', formatCurrency(diff));
        commentContainer.textContent = comment;
        console.log("[DEBUG] Finished rendering Balance Sheet.");
    };
    const renderIncomeStatement = () => { /* ... (Add similar data checks before accessing state.statements.income) ... */ };
    const renderCashFlowStatement = () => { /* ... (Add similar data checks before accessing state.financials) ... */ };
    const renderEquityStatement = () => { /* ... (Add similar data checks before accessing state.statements.equity and state.financials) ... */ };


    // --- Render Ratio Category Function (Unchanged) ---
    const getRatioComment = (key, value) => { /* ... Function as before ... */ };
    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => { /* ... Function as before ... */ };

     // --- Populate Industry Select Function (Unchanged) ---
     const populateIndustrySelect = () => { /* ... Function as before ... */ };


    const init = () => {
        console.log("[DEBUG] Initializing report page...");
        const pdfBtn = document.getElementById('exportPdfBtn');
        const excelBtn = document.getElementById('exportExcelBtn');
        const industrySelect = document.getElementById('industrySelect');

        if (pdfBtn) { pdfBtn.addEventListener('click', () => { /* ... PDF export logic ... */ }); }
        if (excelBtn) { excelBtn.addEventListener('click', () => { /* ... Excel export logic ... */ }); }

        // Build statements and calculate financials first
        buildStatementsAndFinancials(); // Sets state.hasValidData

        // Only proceed if data is valid
        if (state.hasValidData) {
            console.log("[DEBUG] Data is valid, calculating ratios and rendering...");
            calculateAllRatios();

            renderBalanceSheet();
            renderIncomeStatement();
            renderCashFlowStatement();
            renderEquityStatement();

            populateIndustrySelect();
            renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
            renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
            renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
            renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);

            if (industrySelect) {
                industrySelect.addEventListener('change', (e) => {
                    state.selectedIndustry = e.target.value;
                    localStorage.setItem('selectedIndustry', state.selectedIndustry);
                    console.log(`[DEBUG] Industry changed to: ${state.selectedIndustry}`);
                    // Re-render ratio tables only
                    renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
                    renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
                    renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
                    renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);
                    // Check and call applyTranslations
                    if (typeof window.applyTranslations === 'function') { window.applyTranslations(); }
                    else { console.warn("[DEBUG] applyTranslations not found when changing industry in report-app.js"); }
                });
            }

        } else {
             console.warn("[DEBUG] Data is invalid or missing, showing warnings only.");
             // Show warnings if data is invalid (Ensure elements exist before setting text)
             const bsCommentEl = document.getElementById('balanceSheetComment');
             const isCommentEl = document.getElementById('incomeStatementComment');
             const cfCommentEl = document.getElementById('cashFlowStatementComment');
             const eqCommentEl = document.getElementById('equityStatementComment');
             const ratiosWarningEl = document.getElementById('ratiosDataWarning');
             // Clear tables and show warnings
             const bsTableEl = document.getElementById('balanceSheetTable');
             const isTableEl = document.getElementById('incomeStatementTable');
             const cfTableEl = document.getElementById('cashFlowStatementTable');
             const eqTableEl = document.getElementById('equityStatementTable');
             if(bsTableEl) bsTableEl.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`; else console.error("bsTableEl not found");
             if(isTableEl) isTableEl.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`; else console.error("isTableEl not found");
             if(cfTableEl) cfTableEl.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`; else console.error("cfTableEl not found");
             if(eqTableEl) eqTableEl.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`; else console.error("eqTableEl not found");
             if(bsCommentEl) bsCommentEl.textContent = t_page('bs_comment_unbalanced').replace('{diff}', 'N/A');
             if(isCommentEl) isCommentEl.textContent = t_page('is_comment_loss').replace('{profit}', 'N/A');
             if(cfCommentEl) cfCommentEl.textContent = t_page('cf_comment_negative');
             if(eqCommentEl) eqCommentEl.textContent = t_page('eq_comment_decline');
             if(ratiosWarningEl) { ratiosWarningEl.textContent = t_page('noDataForRatios'); ratiosWarningEl.style.display = 'block'; }
             ['liquidityRatios', 'profitabilityRatios', 'leverageRatios', 'efficiencyRatios'].forEach(id => { const el = document.getElementById(id); if(el) el.innerHTML = ''; });
        }

         // Apply translations using the globally available function - **Use setTimeout**
         setTimeout(() => {
             if (typeof window.applyTranslations === 'function') {
                 console.log("[DEBUG] Applying translations during init (report-app.js) via setTimeout...");
                 window.applyTranslations();
             } else {
                 console.error("[!!! DEBUG !!!] applyTranslations function is NOT DEFINED when report-app.js setTimeout runs. Check main.js and script order in report.html!");
             }
         }, 0); // Delay of 0 pushes to end of execution queue

         console.log("[DEBUG] Report page initialization finished.");
    };

    // Ensure critical elements exist before running init
    if (document.getElementById('balanceSheetTable') && document.getElementById('financialRatiosSection')) {
        init();
    } else {
        console.error("[DEBUG] Critical elements for report-app.js were not found. Initialization stopped.");
    }
});
