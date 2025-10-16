document.addEventListener('DOMContentLoaded', () => {

    // --- 1. STATE & CONFIG ---
    const state = {
        trialData: [],
        financials: {}, // Will hold all calculated financial figures
        ratios: {},
        preferences: {
            theme: localStorage.getItem('theme') || 'light',
            lang: localStorage.getItem('lang') || 'ar',
        }
    };

    // --- 2. TRANSLATIONS (Comprehensive) ---
    const translations = {
        ar: {
            // General
            pageHeader: "التحليلات المالية المتقدمة",
            pageSubheader: "مكتبة شاملة من النسب المالية والتحليلات لمساعدتك على فهم أداء شركتك بعمق.",
            summaryTitle: "الملخص الذكي",
            alertsTitle: "تنبيهات ومؤشرات خطر",
            thRatio: "النسبة",
            thValue: "القيمة",
            thComment: "تعليق تحليلي",
            // Categories
            liquidityRatios: "نسب السيولة",
            profitabilityRatios: "نسب الربحية",
            leverageRatios: "نسب الرفع المالي",
            efficiencyRatios: "نسب الكفاءة",
            // Ratios & Comments
            currentRatio: "نسبة التداول",
            currentRatio_comment_high: "سيولة ممتازة. قدرة عالية على سداد الالتزامات قصيرة الأجل.",
            currentRatio_comment_good: "سيولة جيدة. الوضع آمن في المدى القصير.",
            currentRatio_comment_low: "مؤشر خطر. قد تواجه الشركة صعوبة في سداد ديونها قصيرة الأجل.",
            quickRatio: "نسبة السيولة السريعة",
            quickRatio_comment_good: "قدرة جيدة على تغطية الالتزامات العاجلة دون الاعتماد على المخزون.",
            quickRatio_comment_low: "مؤشر خطر. اعتماد كبير على بيع المخزون لتغطية الديون العاجلة.",
            netProfitMargin: "هامش صافي الربح",
            netProfitMargin_comment_high: "ربحية ممتازة. كفاءة عالية في تحويل الإيرادات إلى أرباح.",
            netProfitMargin_comment_avg: "الشركة تحقق أرباحًا ولكن يمكن تحسين الهامش.",
            netProfitMargin_comment_low: "الشركة تحقق خسائر. يجب مراجعة هيكل التكاليف والتسعير.",
            grossProfitMargin: "هامش الربح الإجمالي",
            roa: "العائد على الأصول (ROA)",
            roe: "العائد على حقوق الملكية (ROE)",
            debtToEquity: "نسبة الدين إلى حقوق الملكية",
            debtToEquity_comment_low: "مستوى دين منخفض ومحافظ. تعتمد الشركة على التمويل الذاتي.",
            debtToEquity_comment_good: "مستوى دين معتدل ومتوازن.",
            debtToEquity_comment_high: "مستوى دين مرتفع. قد يشير إلى مخاطر مالية عالية.",
            debtToAssets: "نسبة الدين إلى الأصول",
            assetTurnover: "معدل دوران الأصول",
        },
        en: {
            // General
            pageHeader: "Advanced Financial Analytics",
            pageSubheader: "A comprehensive library of financial ratios and analyses to deeply understand your company's performance.",
            summaryTitle: "Smart Summary",
            alertsTitle: "Alerts & Risk Indicators",
            thRatio: "Ratio",
            thValue: "Value",
            thComment: "Analytical Commentary",
            // Categories
            liquidityRatios: "Liquidity Ratios",
            profitabilityRatios: "Profitability Ratios",
            leverageRatios: "Leverage Ratios",
            efficiencyRatios: "Efficiency Ratios",
            // Ratios & Comments
            currentRatio: "Current Ratio",
            currentRatio_comment_high: "Excellent liquidity. High ability to meet short-term obligations.",
            currentRatio_comment_good: "Good liquidity. The situation is safe in the short term.",
            currentRatio_comment_low: "Risk indicator. The company may face difficulty paying its short-term debts.",
            quickRatio: "Quick Ratio (Acid-Test)",
            quickRatio_comment_good: "Good ability to cover immediate liabilities without relying on inventory.",
            quickRatio_comment_low: "Risk indicator. Heavy reliance on selling inventory to cover urgent debts.",
            netProfitMargin: "Net Profit Margin",
            netProfitMargin_comment_high: "Excellent profitability. High efficiency in converting revenue into profit.",
            netProfitMargin_comment_avg: "The company is profitable, but the margin can be improved.",
            netProfitMargin_comment_low: "The company is incurring losses. Cost structure and pricing must be reviewed.",
            grossProfitMargin: "Gross Profit Margin",
            roa: "Return on Assets (ROA)",
            roe: "Return on Equity (ROE)",
            debtToEquity: "Debt-to-Equity Ratio",
            debtToEquity_comment_low: "Low and conservative debt level. The company relies on self-financing.",
            debtToEquity_comment_good: "Moderate and balanced debt level.",
            debtToEquity_comment_high: "High debt level. May indicate high financial risk.",
            debtToAssets: "Debt-to-Assets Ratio",
            assetTurnover: "Asset Turnover Ratio",
        }
    };

    // --- 3. UI ELEMENTS CACHE ---
    const UI = {
        themeToggle: document.getElementById('themeToggle'),
        languageSelect: document.getElementById('languageSelect'),
        smartSummary: document.getElementById('smartSummary'),
        alertsArea: document.getElementById('alertsArea'),
    };

    // --- 4. FINANCIAL ENGINE ---
    const toNum = (val) => parseFloat(String(val || '').replace(/,/g, '')) || 0;
    const t = (key) => translations[state.preferences.lang]?.[key] || key;

    const calculateFinancials = () => {
        state.trialData = JSON.parse(localStorage.getItem('trialData') || '[]');
        const financials = {
            assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0,
            currentAssets: 0, inventory: 0, currentLiabilities: 0
        };

        state.trialData.forEach(row => {
            const value = toNum(row.Debit) - toNum(row.Credit);
            const mainType = row.MainType || '';
            const subType = row.SubType || '';

            if (mainType.includes('الأصول') || mainType.includes('Assets')) {
                financials.assets += value;
                if (subType.includes('متداول') || subType.includes('Current')) {
                    financials.currentAssets += value;
                    if (subType.includes('المخزون') || subType.includes('Inventory')) financials.inventory += value;
                }
            } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) {
                financials.liabilities -= value;
                if (subType.includes('متداول') || subType.includes('Current')) financials.currentLiabilities -= value;
            } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) {
                financials.equity -= value;
            } else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) {
                if (subType.includes('الإيرادات') || subType.includes('Revenue')) financials.revenue -= value;
                else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) financials.cogs += value;
                else financials.expenses += value;
            }
        });
        
        financials.grossProfit = financials.revenue - financials.cogs;
        financials.netProfit = financials.grossProfit - financials.expenses;
        state.financials = financials;
    };

    const calculateAllRatios = () => {
        const f = state.financials;
        state.ratios = {
            // Liquidity
            currentRatio: f.currentLiabilities > 0 ? f.currentAssets / f.currentLiabilities : Infinity,
            quickRatio: f.currentLiabilities > 0 ? (f.currentAssets - f.inventory) / f.currentLiabilities : Infinity,
            // Profitability
            grossProfitMargin: f.revenue > 0 ? f.grossProfit / f.revenue : 0,
            netProfitMargin: f.revenue > 0 ? f.netProfit / f.revenue : 0,
            roa: f.assets > 0 ? f.netProfit / f.assets : 0,
            roe: f.equity > 0 ? f.netProfit / f.equity : 0,
            // Leverage
            debtToAssets: f.assets > 0 ? f.liabilities / f.assets : Infinity,
            debtToEquity: f.equity > 0 ? f.liabilities / f.equity : Infinity,
            // Efficiency
            assetTurnover: f.assets > 0 ? f.revenue / f.assets : 0,
        };
    };

    // --- 5. RENDERING ---
    
    const getRatioComment = (key, value) => {
        if (!isFinite(value)) return "N/A";
        // Simple example for currentRatio
        if (key === 'currentRatio') {
            if (value >= 2) return t('currentRatio_comment_high');
            if (value >= 1) return t('currentRatio_comment_good');
            return t('currentRatio_comment_low');
        }
        if (key === 'quickRatio') {
            if (value >= 1) return t('quickRatio_comment_good');
            return t('quickRatio_comment_low');
        }
        if (key === 'netProfitMargin') {
            if (value >= 0.15) return t('netProfitMargin_comment_high');
            if (value > 0) return t('netProfitMargin_comment_avg');
            return t('netProfitMargin_comment_low');
        }
        if (key === 'debtToEquity') {
            if (value < 0.5) return t('debtToEquity_comment_low');
            if (value <= 1.5) return t('debtToEquity_comment_good');
            return t('debtToEquity_comment_high');
        }
        return ""; // Default empty comment
    };

    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => {
        const container = document.getElementById(divId);
        let tableHTML = `<h5 class="mb-3">${t(categoryTitleKey)}</h5>
            <div class="table-responsive">
            <table class="table table-sm table-striped">
                <thead><tr><th>${t('thRatio')}</th><th>${t('thValue')}</th><th>${t('thComment')}</th></tr></thead>
                <tbody>`;
        
        ratioKeys.forEach(key => {
            const value = state.ratios[key];
            const formattedValue = isFinite(value) 
                ? (key.includes('Margin') || key.includes('roa') || key.includes('roe') ? `${(value * 100).toFixed(1)}%` : value.toFixed(2))
                : "N/A";
            const comment = getRatioComment(key, value);
            tableHTML += `<tr>
                <td>${t(key)}</td>
                <td><strong>${formattedValue}</strong></td>
                <td class="text-muted small">${comment}</td>
            </tr>`;
        });

        tableHTML += `</tbody></table></div>`;
        container.innerHTML = tableHTML;
    };
    
    const renderAllAnalyses = () => {
        renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
        renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
        renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
        renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);
        // ... (Render other analyses)
    };

    // --- 6. INITIALIZATION & BINDING ---
    const init = () => {
        // ... (Theme, Language, and Nav Link logic as before) ...
        UI.languageSelect.innerHTML = `<option value="ar">العربية</option><option value="en">English</option>`;
        UI.languageSelect.value = state.preferences.lang;
        UI.languageSelect.addEventListener('change', (e) => {
            state.preferences.lang = e.target.value;
            localStorage.setItem('lang', state.preferences.lang);
            // Re-run all calculations and renderings after language change
            runAnalysis();
        });
        
        function runAnalysis() {
            // Apply translations to static elements first
            document.querySelectorAll('[data-translate-key]').forEach(el => el.textContent = t(el.dataset.translateKey));
            document.documentElement.lang = state.preferences.lang;
            document.documentElement.dir = state.preferences.lang === 'ar' ? 'rtl' : 'ltr';
            
            calculateFinancials();
            calculateAllRatios();
            renderAllAnalyses();
        }

        runAnalysis();
    };

    init();
});
