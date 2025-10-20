// js/report-app.js (Corrected Version: Added toNum and checks applyTranslations)

window.pageTranslations = { /* ... (All translations as before) ... */ };

document.addEventListener('DOMContentLoaded', () => {
    const state = {
        trialData: [], statements: {}, financials: {}, ratios: {},
        hasValidData: false, selectedIndustry: 'general'
    };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`;

    // *** ADDED: Helper functions from advanced-app.js ***
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
    const formatPercent = (value, digits = 1) => isFinite(value) && !isNaN(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
    const formatRatio = (value, digits = 2) => isFinite(value) && !isNaN(value) ? value.toFixed(digits) : "N/A";
    const formatCurrency = (value) => isFinite(value) && !isNaN(value) ? value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : "N/A"; // Using original formatCurrency as number

    // Benchmark Data (Unchanged)
    const industryBenchmarks = { /* ... benchmark data ... */ };

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
            const financials = { /* ... (financials object definition as before) ... */ };
            const statements = { /* ... (statements object definition as before) ... */ };

            state.trialData.forEach(row => {
                 // *** CRITICAL: Use the defined toNum function ***
                 const value = (toNum(row.Debit)) - (toNum(row.Credit));
                 const mainType = row.MainType || '';
                 const subType = row.SubType || '';
                 const accountName = (row.Account || '').toLowerCase();
                 const item = { Account: row.Account || 'N/A', value: 0 };

                 // ... (rest of the processing logic remains the same) ...
                 if (mainType.includes('الأصول') || mainType.includes('Assets')) { financials.assets += value; item.value = value; if (subType.includes('متداول') || subType.includes('Current')) { financials.currentAssets += value; statements.assets.current.push(item); if (subType.includes('المخزون') || subType.includes('Inventory') || accountName.includes('inventory') || accountName.includes('مخزون')) financials.inventory += value; if (subType.includes('النقد') || subType.includes('Cash') || accountName.includes('cash') || accountName.includes('نقد')) financials.cashEquivalents += value; } else { financials.ppeNet += (accountName.includes('ppe') || accountName.includes('fixed asset') || accountName.includes('أصول ثابتة'))? value : 0; statements.assets.nonCurrent.push(item); } } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) { financials.liabilities -= value; item.value = -value; if (subType.includes('متداول') || subType.includes('Current')) { financials.currentLiabilities -= value; statements.liabilities.current.push(item); if(subType.includes('قروض قصيرة') || subType.includes('Short-term Loans') || accountName.includes('short term debt') || accountName.includes('قرض قصير')) financials.shortTermDebt -=value; } else { financials.longTermDebt += (subType.includes('قروض طويلة') || subType.includes('Long-term Loans') || accountName.includes('long term debt') || accountName.includes('قرض طويل'))? -value : 0; statements.liabilities.nonCurrent.push(item); } } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) { financials.equity -= value; item.value = -value; if (subType.includes('رأس المال') || subType.includes('Capital')) statements.equity.capital.push(item); else { financials.retainedEarnings -= (subType.includes('الأرباح المحتجزة') || subType.includes('Retained Earnings') || accountName.includes('retained earnings') || accountName.includes('أرباح محتجزة'))? value : 0; statements.equity.retainedEarningsItems.push(item); } } else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) { if (subType.includes('الإيرادات') || subType.includes('Revenue')) { financials.revenue -= value; item.value = -value; statements.income.revenue.push(item); } else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) { financials.cogs += value; item.value = value; statements.income.cogs.push(item); } else { financials.expenses += value; item.value = value; statements.income.expenses.push(item); if (subType.includes('فائدة') || subType.includes('Interest') || accountName.includes('interest')) financials.interestExpense += value; if (subType.includes('ضريبية') || subType.includes('Tax') || accountName.includes('tax')) financials.taxExpense += value; if (subType.includes('إهلاك') || subType.includes('Depreciation') || accountName.includes('depreciation') || accountName.includes('amortization') || accountName.includes('إهلاك') || accountName.includes('استهلاك')) financials.depreciationAmortization += value; } }
            });

            Object.keys(financials).forEach(key => financials[key] = financials[key] || 0);
            financials.grossProfit = financials.revenue - financials.cogs;
            financials.netProfit = financials.grossProfit - financials.expenses;
            financials.ebit = financials.netProfit + financials.interestExpense + financials.taxExpense;
            financials.workingCapital = financials.currentAssets - financials.currentLiabilities;

            const balanceCheck = financials.assets - (financials.liabilities + financials.equity + financials.netProfit);
            if (Math.abs(balanceCheck) > 1) console.warn(`Balance sheet check failed... Diff: ${balanceCheck.toFixed(2)}`);

            state.statements = statements;
            state.financials = financials;
            state.hasValidData = true;
            console.log("Built Statements:", statements);
            console.log("Calculated Financials:", financials);
            return true;
        } catch (e) { console.error("Error during statement building:", e); state.hasValidData = false; return false; }
    };

     // Calculate Ratios Function (Unchanged)
     const calculateAllRatios = () => { /* ... (Function as before) ... */ };

    // Render Statement Section Function (Unchanged)
    const renderStatementSection = (items, totalLabel, isSubSection = false) => { /* ... (Function as before) ... */ };

    // --- Rendering functions for each statement (Unchanged) ---
    const renderBalanceSheet = () => { /* ... (Function as before) ... */ };
    const renderIncomeStatement = () => { /* ... (Function as before) ... */ };
    const renderCashFlowStatement = () => { /* ... (Function as before - simplified CF) ... */ };
    const renderEquityStatement = () => { /* ... (Function as before - simplified EQ) ... */ };


    // --- Render Ratio Category Function (Unchanged) ---
    const getRatioComment = (key, value) => { /* ... (Function as before) ... */ };
    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => { /* ... (Function as before, including benchmarks) ... */ };

     // --- Populate Industry Select Function (Unchanged) ---
     const populateIndustrySelect = () => { /* ... (Function as before) ... */ };


    const init = () => {
        console.log("Initializing report page..."); // Add log
        const pdfBtn = document.getElementById('exportPdfBtn');
        const excelBtn = document.getElementById('exportExcelBtn');
        const industrySelect = document.getElementById('industrySelect');

        if (pdfBtn) { pdfBtn.addEventListener('click', () => { /* ... PDF export logic ... */ }); }
        if (excelBtn) { excelBtn.addEventListener('click', () => { /* ... Excel export logic ... */ }); }

        if (buildStatementsAndFinancials()) {
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
                    console.log(`Industry changed to: ${state.selectedIndustry}`);
                    // Re-render ratio tables only
                    renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
                    renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
                    renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
                    renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);
                    // *** Check and call applyTranslations ***
                    if (typeof window.applyTranslations === 'function') { window.applyTranslations(); }
                    else { console.warn("applyTranslations not found when changing industry in report-app.js"); }
                });
            }

        } else {
            // Show warnings if data is invalid (Ensure elements exist before setting text)
            const bsCommentEl = document.getElementById('balanceSheetComment');
            const isCommentEl = document.getElementById('incomeStatementComment');
            const cfCommentEl = document.getElementById('cashFlowStatementComment');
            const eqCommentEl = document.getElementById('equityStatementComment');
            const ratiosWarningEl = document.getElementById('ratiosDataWarning');

            if(bsCommentEl) bsCommentEl.textContent = t_page('bs_comment_unbalanced').replace('{diff}', 'N/A');
            if(isCommentEl) isCommentEl.textContent = t_page('is_comment_loss').replace('{profit}', 'N/A');
            if(cfCommentEl) cfCommentEl.textContent = t_page('cf_comment_negative');
            if(eqCommentEl) eqCommentEl.textContent = t_page('eq_comment_decline');
            if(ratiosWarningEl) { ratiosWarningEl.textContent = t_page('noDataForRatios'); ratiosWarningEl.style.display = 'block'; }
        }

         // Apply translations using the globally available function
         if (typeof window.applyTranslations === 'function') {
             console.log("Applying translations during init (report-app.js)...");
             window.applyTranslations(); // Use window.applyTranslations
         } else {
             // Log the error that the user was seeing
             console.error("applyTranslations function not found in report-app.js init. Check main.js and script order.");
         }
         console.log("Report page initialized."); // Add log
    };

    // Ensure critical elements exist before running init
    if (document.getElementById('balanceSheetTable') && document.getElementById('financialRatiosSection')) {
        init();
    } else {
        console.error("Critical elements for report-app.js were not found. Initialization stopped.");
    }
});
