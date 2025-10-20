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
        financials: {}, ratios: {}, hasValidData: false, selectedIndustry: 'general'
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
        state.statements = { assets: { current: [], nonCurrent: [] }, liabilities: { current: [], nonCurrent: [] }, equity: { capital: [], retainedEarningsItems: [] }, income: { revenue: [], cogs: [], expenses: [] } };
        state.financials = {}; state.hasValidData = false;
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
            const statements = state.statements; 
             try {
                trialData.forEach(row => {
                    const value = (toNum(row.Debit)) - (toNum(row.Credit));
                    const mainType = row.MainType || ''; const subType = row.SubType || '';
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
             } catch(loopError) { console.error("[DEBUG] Error inside trialData processing loop:", loopError); throw loopError; }
            Object.keys(financials).forEach(key => financials[key] = financials[key] || 0);
            financials.grossProfit = financials.revenue - financials.cogs;
            financials.netProfit = financials.grossProfit - financials.expenses;
            financials.ebit = financials.netProfit + financials.interestExpense + financials.taxExpense;
            financials.workingCapital = financials.currentAssets - financials.currentLiabilities;
            financials.ocf_estimated = financials.netProfit + financials.depreciationAmortization;
            financials.capex_estimated = financials.depreciationAmortization;
            financials.icf_estimated = -financials.capex_estimated;
            financials.fcf_estimated = 0;
            financials.netCashChange_estimated = financials.ocf_estimated + financials.icf_estimated + financials.fcf_estimated;
            financials.freeCashFlow_estimated = financials.ocf_estimated - financials.capex_estimated;
            const balanceCheck = financials.assets - (financials.liabilities + financials.equity + financials.netProfit);
            if (Math.abs(balanceCheck) > 1) console.warn(`Balance sheet check failed... Diff: ${balanceCheck.toFixed(2)}`);
            state.financials = financials; state.statements = statements; state.hasValidData = true;
            console.log("[DEBUG] Successfully built statements and financials.");
            return true;
        } catch (e) { console.error("[DEBUG] Error during statement building main try/catch:", e); state.hasValidData = false; return false; }
    };

     // Calculate Ratios Function
     const calculateAllRatios = () => { /* ... (Function as before) ... */ };
    // Render Statement Section Function
    const renderStatementSection = (items, totalLabel, isSubSection = false) => { /* ... (Function as before, with array check) ... */ };
    // Rendering functions for each statement
    const renderBalanceSheet = () => { /* ... (Function as before, with data checks) ... */ };
    const renderIncomeStatement = () => { /* ... (Function as before, with data checks) ... */ };
    const renderCashFlowStatement = () => { /* ... (Function as before, with data checks) ... */ };
    const renderEquityStatement = () => { /* ... (Function as before, with data checks) ... */ };
    // Render Ratio Category Function
    const getRatioComment = (key, value) => { /* ... (Function as before) ... */ };
    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => { /* ... (Function as before, with benchmarks) ... */ };
     // Populate Industry Select Function
     const populateIndustrySelect = () => { /* ... (Function as before) ... */ };

    const init = () => {
        console.log("[DEBUG] Initializing report page...");
        const pdfBtn = document.getElementById('exportPdfBtn');
        const excelBtn = document.getElementById('exportExcelBtn');
        const industrySelect = document.getElementById('industrySelect');

        if (pdfBtn) { /* ... (PDF export logic) ... */ }
        if (excelBtn) { /* ... (Excel export logic) ... */ }

        if (buildStatementsAndFinancials()) {
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
             console.warn("[DEBUG] Data is invalid, showing warnings only.");
             const bsCommentEl = document.getElementById('balanceSheetComment');
             const isCommentEl = document.getElementById('incomeStatementComment');
             // ... (rest of warning display logic as before) ...
        }

         setTimeout(() => {
             if (typeof window.applyTranslations === 'function') {
                 console.log("[DEBUG] Applying translations (report-app.js) via setTimeout...");
                 window.applyTranslations();
             } else {
                 console.error("[!!! DEBUG !!!] applyTranslations function is NOT DEFINED. Check main.js and script order in report.html!");
             }
         }, 100); // Increased delay slightly

         console.log("[DEBUG] Report page initialization finished.");
    };

    // Critical elements check
    if (document.getElementById('balanceSheetTable') && document.getElementById('financialRatiosSection')) {
        init();
    } else {
        console.error("[DEBUG] Critical elements 'balanceSheetTable' or 'financialRatiosSection' were not found. Initialization stopped.");
    }
});
