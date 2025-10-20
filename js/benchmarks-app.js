// js/benchmarks-app.js (Self-contained script for benchmarks.html - Dark Mode Fix)

// --- 1. Page-Specific Translations ---
window.pageTranslations = {
    ar: {
        pageTitle: "المقارنات المعيارية — المحلل المالي",
        pageHeader: "المقارنات المعيارية (Industry Benchmarks)",
        pageSubheader: "قارن نسبك المالية بمتوسطات الصناعة لفهم وضعك التنافسي.",
        thRatio: "النسبة", thValue: "القيمة", thIndustryAvg: "متوسط الصناعة", thComment: "تعليق تحليلي",
        noDataForRatios: "لا توجد بيانات كافية (من ميزان المراجعة) لحساب النسب. يرجى إدخال بيانات في صفحة 'الإدخال' أولاً.",
        liquidityRatios: "نسب السيولة", profitabilityRatios: "نسب الربحية", leverageRatios: "نسب الرفع المالي", efficiencyRatios: "نسب الكفاءة",
        currentRatio: "نسبة التداول", quickRatio: "نسبة السيولة السريعة",
        netProfitMargin: "هامش صافي الربح", grossProfitMargin: "هامش الربح الإجمالي", roa: "العائد على الأصول (ROA)", roe: "العائد على حقوق الملكية (ROE)",
        debtToEquity: "نسبة الدين إلى حقوق الملكية", debtToAssets: "نسبة الدين إلى الأصول",
        assetTurnover: "معدل دوران الأصول",
        selectIndustryLabel: "اختر قطاع الصناعة للمقارنة",
        selectIndustryDesc: "اختيار قطاع سيضيف مقارنة مع متوسطات الصناعة إلى جداول النسب.",
        industry_general: "عام / غير محدد", industry_retail: "تجارة التجزئة", industry_manufacturing: "الصناعة التحويلية", industry_services: "الخدمات", industry_construction: "المقاولات",
        comparison_better: "أفضل", comparison_worse: "أسوأ", comparison_similar: "مماثل"
    },
    en: {
        pageTitle: "Industry Benchmarks — Financial Analyzer",
        pageHeader: "Industry Benchmarks",
        pageSubheader: "Compare your financial ratios against industry averages to understand your competitive position.",
        thRatio: "Ratio", thValue: "Value", thIndustryAvg: "Industry Avg.", thComment: "Commentary",
        noDataForRatios: "Insufficient data (from Trial Balance) to calculate ratios. Please enter data on the 'Input' page first.",
        liquidityRatios: "Liquidity Ratios", profitabilityRatios: "Profitability Ratios", leverageRatios: "Leverage Ratios", efficiencyRatios: "Efficiency Ratios",
        currentRatio: "Current Ratio", quickRatio: "Quick Ratio",
        netProfitMargin: "Net Profit Margin", grossProfitMargin: "Gross Profit Margin", roa: "Return on Assets (ROA)", roe: "Return on Equity (ROE)",
        debtToEquity: "Debt-to-Equity Ratio", debtToAssets: "Debt-to-Assets Ratio",
        assetTurnover: "Asset Turnover Ratio",
        selectIndustryLabel: "Select Industry for Benchmarking",
        selectIndustryDesc: "Choosing an industry will add benchmark averages to the ratio tables.",
        industry_general: "General / Unspecified", industry_retail: "Retail Trade", industry_manufacturing: "Manufacturing", industry_services: "Services", industry_construction: "Construction",
        comparison_better: "Better", comparison_worse: "Worse", comparison_similar: "Similar"
    }
};
// --- 2. Self-Contained Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const state = {
        financials: {}, ratios: {}, hasValidData: false,
        selectedIndustry: 'general'
    };
    const lang = localStorage.getItem('lang') || 'ar';
    // Use window.pageTranslations defined above
    const t = (key) => (window.pageTranslations[lang]?.[key] || `[${key}]`);
    const UI = {
        industrySelect: document.getElementById('industrySelectBenchmark'),
        warningDiv: document.getElementById('ratiosDataWarningBenchmark')
    };
    const industryBenchmarks = {
        general: {},
        retail: { currentRatio: 1.5, quickRatio: 0.5, netProfitMargin: 0.03, roe: 0.15, debtToEquity: 1.2, assetTurnover: 2.0, grossProfitMargin: 0.30 },
        manufacturing: { currentRatio: 1.8, quickRatio: 0.9, netProfitMargin: 0.06, roe: 0.12, debtToEquity: 0.8, assetTurnover: 1.0, grossProfitMargin: 0.35 },
        services: { currentRatio: 1.2, quickRatio: 1.0, netProfitMargin: 0.08, roe: 0.18, debtToEquity: 1.0, assetTurnover: 1.2, grossProfitMargin: 0.50 },
        construction: { currentRatio: 1.3, quickRatio: 0.8, netProfitMargin: 0.04, roe: 0.14, debtToEquity: 1.5, assetTurnover: 1.5, grossProfitMargin: 0.20 }
    };
    // 3. Helper Functions
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
    const formatPercent = (value, digits = 1) => isFinite(value) && !isNaN(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
    const formatRatio = (value, digits = 2) => isFinite(value) && !isNaN(value) ? value.toFixed(digits) : "N/A";
    // 4. Calculation Functions (Self-contained)
    const calculateData = () => {
        state.financials = {}; state.ratios = {}; state.hasValidData = false;
        let trialData;
        try {
            const rawDataString = localStorage.getItem('trialData');
            if (!rawDataString) throw new Error("localStorage 'trialData' is missing.");
            trialData = JSON.parse(rawDataString);
            if (!Array.isArray(trialData) || trialData.length === 0) throw new Error("Parsed 'trialData' is empty.");
        } catch (e) { console.error("Benchmark Component Error:", e); return false; }
        try {
            const f = { assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0, netProfit: 0, currentAssets: 0, inventory: 0, currentLiabilities: 0 };
            trialData.forEach(row => {
                const value = (toNum(row.Debit)) - (toNum(row.Credit));
                const mainType = row.MainType || ''; const subType = row.SubType || ''; const accountName = (row.Account || '').toLowerCase();
                if (mainType.includes('الأصول') || mainType.includes('Assets')) { f.assets += value; if (subType.includes('متداول') || subType.includes('Current')) { f.currentAssets += value; if (subType.includes('المخزون') || subType.includes('Inventory') || accountName.includes('inventory') || accountName.includes('مخزون')) f.inventory += value; } }
                else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) { f.liabilities -= value; if (subType.includes('متداول') || subType.includes('Current')) f.currentLiabilities -= value; }
                else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) { f.equity -= value; }
                else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) { if (subType.includes('الإيرادات') || subType.includes('Revenue')) { f.revenue -= value; } else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) { f.cogs += value; } else { f.expenses += value; } }
            });
            Object.keys(f).forEach(key => f[key] = f[key] || 0);
            f.netProfit = f.revenue - f.cogs - f.expenses;
            state.financials = f; state.hasValidData = true;
            const assets = f.assets || 0; const equity = f.equity || 0; const liabilities = f.liabilities || 0; const revenue = f.revenue || 0;
            const roeStandard = (equity !== 0) ? f.netProfit / equity : Infinity;
            state.ratios = {
                currentRatio: f.currentLiabilities !== 0 ? f.currentAssets / f.currentLiabilities : Infinity,
                quickRatio: f.currentLiabilities !== 0 ? (f.currentAssets - f.inventory) / f.currentLiabilities : Infinity,
                grossProfitMargin: revenue !== 0 ? (f.revenue - f.cogs) / revenue : 0,
                netProfitMargin: revenue !== 0 ? f.netProfit / revenue : 0,
                roa: assets !== 0 ? f.netProfit / assets : 0,
                roe: roeStandard,
                debtToAssets: assets !== 0 ? liabilities / assets : Infinity,
                debtToEquity: equity !== 0 ? liabilities / equity : Infinity,
                assetTurnover: assets !== 0 ? revenue / assets : 0,
            };
            return true;
        } catch (e) { console.error("Benchmark Component Error during calculation:", e); return false; }
    };
    // 5. Rendering Functions
    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => {
        const container = document.getElementById(divId);
        if (!container) return;
        if (!state.hasValidData) {
            container.innerHTML = `<h5 class="mb-3">${t(categoryTitleKey)}</h5> <p class="text-muted">${t('noDataForRatios')}</p>`; return;
        }
        const benchmarks = industryBenchmarks[state.selectedIndustry] || {};
        const showBenchmarks = state.selectedIndustry !== 'general';
        
        // *** DARK MODE FIX: Removed "table-light" class from thead ***
        let tableHTML = `<h5 class="mb-3">${t(categoryTitleKey)}</h5> <div class="table-responsive"> <table class="table table-sm table-striped"> <thead><tr> <th>${t('thRatio')}</th> <th class="text-end">${t('thValue')}</th> ${showBenchmarks ? `<th class="text-end">${t('thIndustryAvg')}</th>` : ''} <th>${t('thComment')}</th> </tr></thead> <tbody>`;
             ratioKeys.forEach(key => {
            const value = state.ratios[key]; const benchmarkValue = benchmarks[key]; const isPercentage = key.includes('Margin') || key.includes('roa') || key.includes('roe');
            const formattedValue = isPercentage ? formatPercent(value) : formatRatio(value);
            const formattedBenchmark = (showBenchmarks && typeof benchmarkValue !== 'undefined' && isFinite(benchmarkValue)) ? (isPercentage ? formatPercent(benchmarkValue) : formatRatio(benchmarkValue)) : '-';
            let comparisonIndicator = ''; let comparisonText = '';
            if (showBenchmarks && typeof benchmarkValue !== 'undefined' && isFinite(value) && isFinite(benchmarkValue)) { const tolerance = 0.1 * Math.abs(benchmarkValue); const isDebtRatio = key === 'debtToEquity' || key === 'debtToAssets'; const isBetter = isDebtRatio ? value < benchmarkValue - tolerance : value > benchmarkValue + tolerance; const isWorse = isDebtRatio ? value > benchmarkValue + tolerance : value < benchmarkValue - tolerance; if (isBetter) { comparisonIndicator = '<i class="bi bi-arrow-up-circle-fill text-success ms-1"></i>'; comparisonText = `(${t('comparison_better')})`; } else if (isWorse) { comparisonIndicator = '<i class="bi bi-arrow-down-circle-fill text-danger ms-1"></i>'; comparisonText = `(${t('comparison_worse')})`; } else { comparisonIndicator = '<i class="bi bi-arrow-left-right text-warning ms-1"></i>'; comparisonText = `(${t('comparison_similar')})`; } }
            tableHTML += `<tr> <td>${t(key)}</td> <td class="text-end"><strong>${formattedValue}</strong> ${comparisonIndicator} <small class="text-muted">${comparisonText}</small></td> ${showBenchmarks ? `<td class="text-end">${formattedBenchmark}</td>` : ''} <td class="text-muted small"></td> </tr>`;
        });
        container.innerHTML = tableHTML + `</tbody></table></div>`;
    };
    const renderAllRatios = () => {
        renderRatioCategory('liquidityRatiosBenchmark', 'liquidityRatios', ['currentRatio', 'quickRatio']);
        renderRatioCategory('profitabilityRatiosBenchmark', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
        renderRatioCategory('leverageRatiosBenchmark', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
        renderRatioCategory('efficiencyRatiosBenchmark', 'efficiencyRatios', ['assetTurnover']);
    };
        // 6. Initialization
    const init = () => {
        console.log("[DEBUG] Initializing benchmarks page...");
        if (!UI.industrySelect || !UI.warningDiv) {
            console.error("Benchmark component critical elements not found."); return;
        }
        const industries = ['general', 'retail', 'manufacturing', 'services', 'construction'];
        UI.industrySelect.innerHTML = industries.map(key => `<option value="${key}">${t(`industry_${key}`)}</option>`).join('');
        state.selectedIndustry = localStorage.getItem('selectedIndustry') || 'general';
        UI.industrySelect.value = state.selectedIndustry;
        UI.industrySelect.addEventListener('change', (e) => {
            state.selectedIndustry = e.target.value;
            localStorage.setItem('selectedIndustry', state.selectedIndustry);
            renderAllRatios(); 
        });
        if (calculateData()) {
            UI.warningDiv.style.display = 'none';
            renderAllRatios();
        } else {
            UI.warningDiv.textContent = t('noDataForRatios');
            UI.warningDiv.style.display = 'block';
        }
        // Use setTimeout to ensure main.js translation has run first
        setTimeout(() => {
            if (typeof window.applyTranslations === 'function') {
                console.log("[DEBUG] Calling global applyTranslations for header/footer...");
                window.applyTranslations();
            } else {
                console.warn("[DEBUG] global applyTranslations not found, header/footer may not be translated.");
            }
        }, 100); // 100ms delay to be safe
              console.log("[DEBUG] Benchmarks page initialization finished.");
    };
    
    init();
});
