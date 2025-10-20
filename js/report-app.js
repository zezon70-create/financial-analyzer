// js/report-app.js (Corrected Version 3)
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
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
    const formatPercent = (value, digits = 1) => isFinite(value) && !isNaN(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
    const formatRatio = (value, digits = 2) => isFinite(value) && !isNaN(value) ? value.toFixed(digits) : "N/A";
    const formatCurrency = (value) => isFinite(value) && !isNaN(value) ? value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : "N/A";
    const industryBenchmarks = { /* ... (benchmark data) ... */ };
    const buildStatementsAndFinancials = () => { /* ... (function as before) ... */ };
    const calculateAllRatios = () => { /* ... (function as before) ... */ };
    const renderStatementSection = (items, totalLabel, isSubSection = false) => { /* ... (function as before) ... */ };
    const renderBalanceSheet = () => { /* ... (function as before) ... */ };
    const renderIncomeStatement = () => { /* ... (function as before) ... */ };
    const renderCashFlowStatement = () => { /* ... (function as before) ... */ };
    const renderEquityStatement = () => { /* ... (function as before) ... */ };
    const getRatioComment = (key, value) => { /* ... (function as before) ... */ };
    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => { /* ... (function as before) ... */ };
    const populateIndustrySelect = () => { /* ... (function as before) ... */ };
    
    const init = () => {
        console.log("[DEBUG] Initializing report page...");
        // ... (pdfBtn, excelBtn, industrySelect setup as before) ...
        
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
            // ... (industrySelect listener as before) ...
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

    // *** CRITICAL: Check if ALL required elements exist ***
    if (document.getElementById('balanceSheetTable') && document.getElementById('financialRatiosSection')) {
        init();
    } else {
        console.error("[DEBUG] Critical elements 'balanceSheetTable' or 'financialRatiosSection' were not found. Initialization stopped.");
    }
});
