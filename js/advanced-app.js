// js/advanced-app.js

window.pageTranslations = {
    ar: {
        pageTitle: "التحليلات المتقدمة — المحلل المالي",
        pageHeader: "التحليلات المالية المتقدمة",
        pageSubheader: "مكتبة شاملة من النسب المالية والتحليلات لمساعدتك على فهم أداء شركتك بعمق.",
        summaryTitle: "الملخص الذكي",
        alertsTitle: "تنبيهات ومؤشرات خطر",
        thRatio: "النسبة",
        thValue: "القيمة",
        thComment: "تعليق تحليلي",
        liquidityRatios: "نسب السيولة",
        profitabilityRatios: "نسب الربحية",
        leverageRatios: "نسب الرفع المالي",
        efficiencyRatios: "نسب الكفاءة",

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
        grossProfitMargin_comment_high: "هامش قوي. تحكم ممتاز في تكلفة المبيعات.",
        grossProfitMargin_comment_low: "هامش ضعيف. يجب مراجعة تكلفة البضاعة المباعة أو استراتيجية التسعير.",

        roa: "العائد على الأصول (ROA)",
        roa_comment_high: "كفاءة عالية في استخدام الأصول لتوليد الأرباح.",
        roa_comment_low: "كفاءة منخفضة. الأصول لا تولد أرباحًا كافية.",

        roe: "العائد على حقوق الملكية (ROE)",
        roe_comment_high: "عائد ممتاز للمساهمين. الشركة تستخدم استثماراتهم بفعالية عالية.",
        roe_comment_low: "عائد ضعيف للمساهمين. يجب تحسين الربحية أو كفاءة رأس المال.",

        debtToEquity: "نسبة الدين إلى حقوق الملكية",
        debtToEquity_comment_low: "مستوى دين منخفض ومحافظ. تعتمد الشركة على التمويل الذاتي.",
        debtToEquity_comment_good: "مستوى دين معتدل ومتوازن.",
        debtToEquity_comment_high: "مستوى دين مرتفع. قد يشير إلى مخاطر مالية عالية.",

        debtToAssets: "نسبة الدين إلى الأصول",
        debtToAssets_comment_low: "جزء صغير من الأصول ممول بالديون. وضع آمن.",
        debtToAssets_comment_high: "جزء كبير من الأصول ممول بالديون. مخاطر مرتفعة.",

        assetTurnover: "معدل دوران الأصول",
        assetTurnover_comment_high: "كفاءة ممتازة في استخدام الأصول لتوليد المبيعات.",
        assetTurnover_comment_low: "كفاءة منخفضة. قد تكون هناك أصول عاطلة أو ضعف في المبيعات.",
        
        summary_ok: "الوضع المالي يبدو مستقرًا. الربحية والسيولة ضمن النطاقات المقبولة.",
        summary_risk: "توجد بعض مؤشرات الخطر. الربحية أو السيولة قد تحتاج إلى اهتمام فوري.",
        alert_liquidity_risk: "🔴 خطر سيولة: نسبة التداول أقل من 1.",
        alert_leverage_risk: "🟡 تنبيه: نسبة الدين إلى حقوق الملكية مرتفعة.",
        alert_profit_risk: "🔴 خطر ربحية: الشركة تحقق صافي خسارة.",
        alert_ok: "🟢 لا توجد مؤشرات خطر حرجة بناءً على النسب الأساسية.",
    },
    en: {
        pageTitle: "Advanced Analytics — Financial Analyzer",
        pageHeader: "Advanced Financial Analytics",
        pageSubheader: "A comprehensive library of financial ratios and analyses to deeply understand your company's performance.",
        summaryTitle: "Smart Summary",
        alertsTitle: "Alerts & Risk Indicators",
        thRatio: "Ratio",
        thValue: "Value",
        thComment: "Analytical Commentary",
        liquidityRatios: "Liquidity Ratios",
        profitabilityRatios: "Profitability Ratios",
        leverageRatios: "Leverage Ratios",
        efficiencyRatios: "Efficiency Ratios",

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
        grossProfitMargin_comment_high: "Strong margin. Excellent control over cost of sales.",
        grossProfitMargin_comment_low: "Weak margin. Cost of goods sold or pricing strategy must be reviewed.",

        roa: "Return on Assets (ROA)",
        roa_comment_high: "High efficiency in using assets to generate profits.",
        roa_comment_low: "Low efficiency. Assets are not generating enough profit.",

        roe: "Return on Equity (ROE)",
        roe_comment_high: "Excellent return for shareholders. The company is using their investment very effectively.",
        roe_comment_low: "Weak return for shareholders. Profitability or capital efficiency needs improvement.",

        debtToEquity: "Debt-to-Equity Ratio",
        debtToEquity_comment_low: "Low and conservative debt level. The company relies on self-financing.",
        debtToEquity_comment_good: "Moderate and balanced debt level.",
        debtToEquity_comment_high: "High debt level. May indicate high financial risk.",
        
        debtToAssets: "Debt-to-Assets Ratio",
        debtToAssets_comment_low: "A small portion of assets is financed by debt. Safe position.",
        debtToAssets_comment_high: "A large portion of assets is financed by debt. High risk.",

        assetTurnover: "Asset Turnover Ratio",
        assetTurnover_comment_high: "Excellent efficiency in using assets to generate sales.",
        assetTurnover_comment_low: "Low efficiency. There might be idle assets or weak sales.",
        
        summary_ok: "The financial position appears stable. Profitability and liquidity are within acceptable ranges.",
        summary_risk: "Some risk indicators are present. Profitability or liquidity may require immediate attention.",
        alert_liquidity_risk: "🔴 Liquidity Risk: Current ratio is less than 1.",
        alert_leverage_risk: "🟡 Warning: Debt-to-Equity ratio is high.",
        alert_profit_risk: "🔴 Profitability Risk: The company is recording a net loss.",
        alert_ok: "🟢 No critical risk indicators based on key ratios.",
    }
};

document.addEventListener('DOMContentLoaded', () => {

    const state = { financials: {}, ratios: {} };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || key;
    const UI = {
        smartSummary: document.getElementById('smartSummary'),
        alertsArea: document.getElementById('alertsArea'),
    };

    const calculateFinancials = () => {
        const trialData = JSON.parse(localStorage.getItem('trialData') || '[]');
        const f = {
            assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0,
            currentAssets: 0, inventory: 0, currentLiabilities: 0
        };
        trialData.forEach(row => {
            const value = (parseFloat(row.Debit) || 0) - (parseFloat(row.Credit) || 0);
            const mainType = row.MainType || '';
            const subType = row.SubType || '';

            if (mainType.includes('الأصول') || mainType.includes('Assets')) {
                f.assets += value;
                if (subType.includes('متداول') || subType.includes('Current')) {
                    f.currentAssets += value;
                    if (subType.includes('المخزون') || subType.includes('Inventory')) f.inventory += value;
                }
            } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) {
                f.liabilities -= value;
                if (subType.includes('متداول') || subType.includes('Current')) f.currentLiabilities -= value;
            } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) {
                f.equity -= value;
            } else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) {
                if (subType.includes('الإيرادات') || subType.includes('Revenue')) f.revenue -= value;
                else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) f.cogs += value;
                else f.expenses += value;
            }
        });
        f.grossProfit = f.revenue - f.cogs;
        f.netProfit = f.grossProfit - f.expenses;
        state.financials = f;
    };

    const calculateAllRatios = () => {
        const f = state.financials;
        state.ratios = {
            currentRatio: f.currentLiabilities > 0 ? f.currentAssets / f.currentLiabilities : Infinity,
            quickRatio: f.currentLiabilities > 0 ? (f.currentAssets - f.inventory) / f.currentLiabilities : Infinity,
            grossProfitMargin: f.revenue > 0 ? f.grossProfit / f.revenue : 0,
            netProfitMargin: f.revenue > 0 ? f.netProfit / f.revenue : 0,
            roa: f.assets > 0 ? f.netProfit / f.assets : 0,
            roe: f.equity > 0 ? f.netProfit / f.equity : 0,
            debtToAssets: f.assets > 0 ? f.liabilities / f.assets : Infinity,
            debtToEquity: f.equity > 0 ? f.liabilities / f.equity : Infinity,
            assetTurnover: f.assets > 0 ? f.revenue / f.assets : 0,
        };
    };

    const getRatioComment = (key, value) => {
        if (!isFinite(value)) return "N/A";
        if (key === 'currentRatio') {
            if (value >= 2) return t_page('currentRatio_comment_high');
            if (value >= 1) return t_page('currentRatio_comment_good');
            return t_page('currentRatio_comment_low');
        }
        if (key === 'quickRatio') {
            if (value >= 1) return t_page('quickRatio_comment_good');
            return t_page('quickRatio_comment_low');
        }
        if (key === 'netProfitMargin') {
            if (value >= 0.15) return t_page('netProfitMargin_comment_high');
            if (value > 0) return t_page('netProfitMargin_comment_avg');
            return t_page('netProfitMargin_comment_low');
        }
        if (key === 'grossProfitMargin') {
            return value >= 0.4 ? t_page('grossProfitMargin_comment_high') : t_page('grossProfitMargin_comment_low');
        }
        if (key === 'roa') {
            return value >= 0.05 ? t_page('roa_comment_high') : t_page('roa_comment_low');
        }
        if (key === 'roe') {
            return value >= 0.15 ? t_page('roe_comment_high') : t_page('roe_comment_low');
        }
        if (key === 'debtToEquity') {
            if (value < 0.5) return t_page('debtToEquity_comment_low');
            if (value <= 1.5) return t_page('debtToEquity_comment_good');
            return t_page('debtToEquity_comment_high');
        }
        if (key === 'debtToAssets') {
            return value < 0.4 ? t_page('debtToAssets_comment_low') : t_page('debtToAssets_comment_high');
        }
        if (key === 'assetTurnover') {
            return value >= 1 ? t_page('assetTurnover_comment_high') : t_page('assetTurnover_comment_low');
        }
        return "";
    };

    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => {
        const container = document.getElementById(divId);
        let tableHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5>
            <div class="table-responsive">
            <table class="table table-sm table-striped">
                <thead><tr><th>${t_page('thRatio')}</th><th>${t_page('thValue')}</th><th>${t_page('thComment')}</th></tr></thead>
                <tbody>`;
        ratioKeys.forEach(key => {
            const value = state.ratios[key];
            const formattedValue = isFinite(value)
                ? (key.includes('Margin') || key.includes('roa') || key.includes('roe') ? `${(value * 100).toFixed(1)}%` : value.toFixed(2))
                : "N/A";
            const comment = getRatioComment(key, value);
            tableHTML += `<tr>
                <td>${t_page(key)}</td>
                <td><strong>${formattedValue}</strong></td>
                <td class="text-muted small">${comment}</td>
            </tr>`;
        });
        container.innerHTML = tableHTML + `</tbody></table></div>`;
    };

    const renderSidebar = () => {
        const { netProfitMargin, currentRatio, debtToEquity } = state.ratios;
        UI.smartSummary.textContent = netProfitMargin > 0 && currentRatio > 1.5 ? t_page('summary_ok') : t_page('summary_risk');

        const alerts = [];
        if (currentRatio < 1) alerts.push(t_page('alert_liquidity_risk'));
        if (debtToEquity > 2) alerts.push(t_page('alert_leverage_risk'));
        if (netProfitMargin < 0) alerts.push(t_page('alert_profit_risk'));
        UI.alertsArea.innerHTML = alerts.length > 0 ? alerts.map(alert => `<div>${alert}</div>`).join('') : `<div>${t_page('alert_ok')}</div>`;
    };

    const runAnalysis = () => {
        calculateFinancials();
        calculateAllRatios();
        renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
        renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
        renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
        renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);
        renderSidebar();
    };

    runAnalysis();
});
