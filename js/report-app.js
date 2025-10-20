// js/report-app.js (Corrected Version 2: Fixed initialization and applyTranslations check)

window.pageTranslations = { /* ... (All translations as before) ... */ };

document.addEventListener('DOMContentLoaded', () => {
    console.log("[DEBUG] DOM Loaded for report-app.js"); // Added Log

    const state = {
        trialData: [],
        statements: { // *** Initialize structure explicitly ***
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
        // Reset state
        state.statements = { assets: { current: [], nonCurrent: [] }, liabilities: { current: [], nonCurrent: [] }, equity: { capital: [], retainedEarningsItems: [] }, income: { revenue: [], cogs: [], expenses: [] } };
        state.financials = {};
        state.hasValidData = false;
        console.log("[DEBUG] Attempting to build statements..."); // Added Log

        try {
            const rawDataString = localStorage.getItem('trialData');
            if (!rawDataString) throw new Error("localStorage 'trialData' is missing.");
            state.trialData = JSON.parse(rawDataString);
            if (!Array.isArray(state.trialData) || state.trialData.length === 0 || (state.trialData.length === 1 && !state.trialData[0].Account && !toNum(state.trialData[0].Debit) && !toNum(state.trialData[0].Credit))) {
                throw new Error("Parsed 'trialData' is empty or invalid.");
            }
        } catch (e) { console.error("[DEBUG] Error loading/parsing 'trialData':", e); return false; }

        try {
            const financials = { assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0, netProfit: 0, grossProfit: 0, currentAssets: 0, inventory: 0, currentLiabilities: 0, retainedEarnings: 0, interestExpense: 0, taxExpense: 0, depreciationAmortization: 0, ppeNet: 0, longTermDebt: 0, shortTermDebt: 0, cashEquivalents: 0, ebit: 0, workingCapital: 0 };
            const statements = state.statements; // Use the already initialized structure

            state.trialData.forEach(row => {
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

            Object.keys(financials).forEach(key => financials[key] = financials[key] || 0);
            financials.grossProfit = financials.revenue - financials.cogs;
            financials.netProfit = financials.grossProfit - financials.expenses;
            financials.ebit = financials.netProfit + financials.interestExpense + financials.taxExpense;
            financials.workingCapital = financials.currentAssets - financials.currentLiabilities;

            const balanceCheck = financials.assets - (financials.liabilities + financials.equity + financials.netProfit);
            if (Math.abs(balanceCheck) > 1) console.warn(`Balance sheet check failed... Diff: ${balanceCheck.toFixed(2)}`);

            state.financials = financials;
            state.hasValidData = true; // Set flag only on success
            console.log("[DEBUG] Successfully built statements and financials."); // Added Log
            return true;
        } catch (e) {
            console.error("[DEBUG] Error during statement building loop:", e); // Added Log
            state.hasValidData = false;
            return false;
        }
    };

     // Calculate Ratios Function (Unchanged)
     const calculateAllRatios = () => { /* ... Function as before ... */ };

    // Render Statement Section Function (Unchanged)
    const renderStatementSection = (items, totalLabel, isSubSection = false) => { /* ... Function as before ... */ };

    // --- Rendering functions for each statement (Add checks for data validity) ---
    const renderBalanceSheet = () => {
        const container = document.getElementById('balanceSheetTable');
        const commentContainer = document.getElementById('balanceSheetComment');
        if (!container || !commentContainer) return; // Exit if elements not found

        if (!state.hasValidData || !state.statements.assets) {
             container.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`; // Use a generic no data message
             commentContainer.textContent = t_page('bs_comment_unbalanced').replace('{diff}', 'N/A');
             return;
        }
        // ... (Original rendering logic) ...
        const { assets, liabilities, equity } = state.statements; let html = `<h6>${t_page('assets')}</h6>`; const currentAssets = renderStatementSection(assets.current, `${t_page('total')} ${t_page('currentAssets')}`, true); const nonCurrentAssets = renderStatementSection(assets.nonCurrent, `${t_page('total')} ${t_page('nonCurrentAssets')}`, true); const totalAssets = currentAssets.total + nonCurrentAssets.total; html += currentAssets.html + nonCurrentAssets.html; html += `<table class="table report-table"><tbody class="total-row"><tr><td>${t_page('totalAssets')}</td><td class="text-end">${formatCurrency(totalAssets)}</td></tr></tbody></table>`; html += `<h6 class="mt-4">${t_page('liabilities')} & ${t_page('equity')}</h6>`; const currentLiabs = renderStatementSection(liabilities.current, `${t_page('total')} ${t_page('currentLiabilities')}`, true); const nonCurrentLiabs = renderStatementSection(liabilities.nonCurrent, `${t_page('total')} ${t_page('nonCurrentLiabilities')}`, true); const totalLiabs = currentLiabs.total + nonCurrentLiabs.total; html += currentLiabs.html + nonCurrentLiabs.html; html += `<table class="table report-table"><tbody class="subtotal-row"><tr><td>${t_page('totalLiabilities')}</td><td class="text-end">${formatCurrency(totalLiabs)}</td></tr></tbody></table>`; const equityItems = (statements.equity.capital || []).concat(statements.equity.retainedEarningsItems || []); const totalEquity = renderStatementSection(equityItems, t_page('totalEquity'), true); html += totalEquity.html; const totalLiabsAndEquity = totalLiabs + totalEquity.total; html += `<table class="table report-table"><tbody class="total-row"><tr><td>${t_page('totalLiabilitiesAndEquity')}</td><td class="text-end">${formatCurrency(totalLiabsAndEquity)}</td></tr></tbody></table>`; container.innerHTML = html; const diff = totalAssets - totalLiabsAndEquity; const comment = Math.abs(diff) < 1 ? t_page('bs_comment_balanced') : t_page('bs_comment_unbalanced').replace('{diff}', formatCurrency(diff)); commentContainer.textContent = comment;
    };
    const renderIncomeStatement = () => { /* ... (Add similar data checks) ... */ };
    const renderCashFlowStatement = () => { /* ... (Add similar data checks) ... */ };
    const renderEquityStatement = () => { /* ... (Add similar data checks) ... */ };


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
        buildStatementsAndFinancials(); // This now sets state.hasValidData

        if (state.hasValidData) {
            console.log("[DEBUG] Data is valid, calculating ratios and rendering..."); // Added Log
            calculateAllRatios(); // Calculate ratios needed for display

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
             console.warn("[DEBUG] Data is invalid or missing, showing warnings only."); // Added Log
             // Show warnings if data is invalid (Ensure elements exist before setting text)
             const bsCommentEl = document.getElementById('balanceSheetComment');
             const isCommentEl = document.getElementById('incomeStatementComment');
             const cfCommentEl = document.getElementById('cashFlowStatementComment');
             const eqCommentEl = document.getElementById('equityStatementComment');
             const ratiosWarningEl = document.getElementById('ratiosDataWarning');

             if(bsCommentEl) bsCommentEl.textContent = t_page('bs_comment_unbalanced').replace('{diff}', 'N/A');
             if(isCommentEl) isCommentEl.textContent = t_page('is_comment_loss').replace('{profit}', 'N/A');
             // Clear tables as well if data is invalid
             const bsTableEl = document.getElementById('balanceSheetTable');
             const isTableEl = document.getElementById('incomeStatementTable');
             const cfTableEl = document.getElementById('cashFlowStatementTable');
             const eqTableEl = document.getElementById('equityStatementTable');
             if(bsTableEl) bsTableEl.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`;
             if(isTableEl) isTableEl.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`;
             if(cfTableEl) cfTableEl.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`;
             if(eqTableEl) eqTableEl.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`;


             if(cfCommentEl) cfCommentEl.textContent = t_page('cf_comment_negative');
             if(eqCommentEl) eqCommentEl.textContent = t_page('eq_comment_decline');
             if(ratiosWarningEl) { ratiosWarningEl.textContent = t_page('noDataForRatios'); ratiosWarningEl.style.display = 'block'; }
              // Also hide ratio tables if warning is shown
             ['liquidityRatios', 'profitabilityRatios', 'leverageRatios', 'efficiencyRatios'].forEach(id => {
                const el = document.getElementById(id);
                if(el) el.innerHTML = ''; // Clear content
             });
        }

         // Apply translations using the globally available function - **Crucial Check**
         if (typeof window.applyTranslations === 'function') {
             console.log("[DEBUG] Applying translations during init (report-app.js)...");
             window.applyTranslations(); // Use window.applyTranslations
         } else {
             // Log the error more prominently if still happening
             console.error("[!!! DEBUG !!!] applyTranslations function is NOT DEFINED when report-app.js init runs. Check main.js and script order in report.html!");
         }
         console.log("[DEBUG] Report page initialization finished."); // Added Log
    };

    // Ensure critical elements exist before running init
    if (document.getElementById('balanceSheetTable') && document.getElementById('financialRatiosSection')) {
        init();
    } else {
        console.error("[DEBUG] Critical elements for report-app.js were not found. Initialization stopped.");
    }
});
