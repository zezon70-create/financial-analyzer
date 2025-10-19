// js/advanced-app.js (Version with Industry Benchmarks)

window.pageTranslations = {
    ar: {
        // ... (All previous translations remain) ...
        pageTitle: "التحليلات المتقدمة — المحلل المالي", pageHeader: "التحليلات المتقدمة", pageSubheader: "استخدم أدوات تحليلية متخصصة للحصول على رؤى أعمق حول أداء عملك.",
        tabRatios: "النسب المالية", tabBreakeven: "تحليل التعادل", tabDupont: "تحليل دوبونت", tabVertical: "التحليل الرأسي", tabZScore: "نموذج Z-Score", tabCashFlow: "تحليل التدفقات النقدية", 
        summaryTitle: "الملخص الذكي", alertsTitle: "تنبيهات ومؤشرات خطر", thRatio: "النسبة", thValue: "القيمة", thComment: "تعليق تحليلي", liquidityRatios: "نسب السيولة", profitabilityRatios: "نسب الربحية", leverageRatios: "نسب الرفع المالي", efficiencyRatios: "نسب الكفاءة", currentRatio: "نسبة التداول", currentRatio_comment_high: "سيولة ممتازة...", currentRatio_comment_good: "سيولة جيدة...", currentRatio_comment_low: "مؤشر خطر...", quickRatio: "نسبة السيولة السريعة", quickRatio_comment_good: "قدرة جيدة...", quickRatio_comment_low: "مؤشر خطر...", netProfitMargin: "هامش صافي الربح", netProfitMargin_comment_high: "ربحية ممتازة...", netProfitMargin_comment_avg: "ربحية مقبولة...", netProfitMargin_comment_low: "خسائر...", grossProfitMargin: "هامش الربح الإجمالي", grossProfitMargin_comment_high: "هامش قوي...", grossProfitMargin_comment_low: "هامش ضعيف...", roa: "العائد على الأصول (ROA)", roa_comment_high: "كفاءة عالية...", roa_comment_low: "كفاءة منخفضة...", roe: "العائد على حقوق الملكية (ROE)", roe_comment_high: "عائد ممتاز...", roe_comment_low: "عائد ضعيف...", debtToEquity: "نسبة الدين إلى حقوق الملكية", debtToEquity_comment_low: "دين منخفض...", debtToEquity_comment_good: "دين معتدل...", debtToEquity_comment_high: "دين مرتفع...", debtToAssets: "نسبة الدين إلى الأصول", debtToAssets_comment_low: "وضع آمن...", debtToAssets_comment_high: "مخاطر مرتفعة...", assetTurnover: "معدل دوران الأصول", assetTurnover_comment_high: "كفاءة ممتازة...", assetTurnover_comment_low: "كفاءة منخفضة...", summary_ok: "الوضع المالي يبدو مستقرًا...", summary_risk: "توجد بعض مؤشرات الخطر...", alert_liquidity_risk: "🔴 خطر سيولة...", alert_leverage_risk: "🟡 تنبيه دين مرتفع...", alert_profit_risk: "🔴 خطر ربحية...", alert_ok: "🟢 لا توجد مؤشرات خطر حرجة...", noDataForRatios: "لا توجد بيانات كافية لحساب النسب. يرجى إدخال ميزان المراجعة أولاً.",
        beInputTitle: "مدخلات الحساب", labelFixedCosts: "إجمالي التكاليف الثابتة", labelVariableCost: "التكلفة المتغيرة للوحدة", labelSellingPrice: "سعر بيع الوحدة", btnCalculate: "احسب", beResultsTitle: "النتائج", bepUnits: "نقطة التعادل (بالوحدات)", bepValue: "نقطة التعادل (بالقيمة)", beChartTitle: "رسم بياني لنقطة التعادل", errorPrice: "سعر البيع يجب أن يكون أعلى من التكلفة المتغيرة.", errorPositiveValues: "الرجاء إدخال قيم موجبة.", revenue: 'الإيرادات', totalCosts: 'إجمالي التكاليف', fixedCosts: 'التكاليف الثابتة', unitsSold: 'الوحدات المباعة', value: 'القيمة',
        dupontTitle: "تحليل دوبونت...", dupontDesc: "...", dupontEquation: "...", dupontCompNPM: "...", dupontCompAT: "...", dupontCompEM: "...", dupontCompROE: "...", dupontDataWarning: "...", dupontInterpretationHighROE: "...", dupontInterpretationLowROE: "...", dupontFactorProfitability: "...", dupontFactorEfficiency: "...", dupontFactorLeverage: "...", dupontFactorLowProfitability: "...", dupontFactorLowEfficiency: "...", dupontFactorLowLeverage: "...",
        verticalTitle: "التحليل الرأسي...", verticalDesc: "...", verticalDataWarning: "...", verticalBS: "...", verticalIS: "...", verticalAccount: "...", verticalValue: "...", verticalPercent: "...",
        zscoreTitle: "نموذج Altman Z-Score...", zscoreDesc: "...", zscoreDataWarning: "...", zscoreValueLabel: "...", zscoreInterpretation: "...", zscoreZoneSafe: "...", zscoreZoneGrey: "...", zscoreZoneDistress: "...", zscoreComponents: "...", zscoreX1: "...", zscoreX2: "...", zscoreX3: "...", zscoreX4: "...", zscoreX5: "...", zscoreRetainedEarningsNotFound: "...",
        cfTitle: "تحليل التدفقات النقدية...", cfDesc: "...", cfDataWarning: "...", cfStmtTitle: "...", cfNetIncome: "...", cfDepreciationAmortization: "...", cfChangesWC: "...", cfOperating: "...", cfInvesting: "...", cfFinancing: "...", cfNetChange: "...", cfRatiosTitle: "...", cfRatioOCF: "...", cfRatioFCF: "...", cfInterpretationPositiveOCF: "...", cfInterpretationNegativeOCF: "...", cfInterpretationFCF: "...",

        // *** NEW Benchmarking Translations ***
        selectIndustryLabel: "اختر قطاع الصناعة للمقارنة",
        selectIndustryDesc: "اختيار قطاع سيضيف مقارنة مع متوسطات الصناعة إلى جداول النسب.",
        thIndustryAvg: "متوسط الصناعة",
        industry_general: "عام / غير محدد",
        industry_retail: "تجارة التجزئة",
        industry_manufacturing: "الصناعة التحويلية",
        industry_services: "الخدمات",
        industry_construction: "المقاولات",
        comparison_better: "أفضل",
        comparison_worse: "أسوأ",
        comparison_similar: "مماثل"

    },
    en: { // ... (English translations including Benchmarking) ...
        pageTitle: "Advanced Analytics — Financial Analyzer", pageHeader: "Advanced Analytics", pageSubheader: "Use specialized analytical tools...", 
        tabRatios: "Financial Ratios", tabBreakeven: "Break-even Analysis", tabDupont: "DuPont Analysis", tabVertical: "Vertical Analysis", tabZScore: "Altman Z-Score", tabCashFlow: "Cash Flow Analysis", 
        // ... (rest of English translations) ...
        noDataForRatios: "Insufficient data to calculate ratios. Please enter trial balance data first.",
        dupontDataWarning: "Insufficient data (from Trial Balance) available to perform DuPont analysis.",
        verticalDataWarning: "Insufficient data (from Trial Balance) available to perform Vertical Analysis.",
        zscoreDataWarning: "Insufficient data to calculate the Z-Score...",
        cfDataWarning: "Insufficient data to estimate Cash Flows.",
        // *** NEW Benchmarking Translations ***
        selectIndustryLabel: "Select Industry for Benchmarking",
        selectIndustryDesc: "Choosing an industry will add benchmark averages to the ratio tables.",
        thIndustryAvg: "Industry Avg.",
        industry_general: "General / Unspecified",
        industry_retail: "Retail Trade",
        industry_manufacturing: "Manufacturing",
        industry_services: "Services",
        industry_construction: "Construction",
        comparison_better: "Better",
        comparison_worse: "Worse",
        comparison_similar: "Similar"
    }
};

document.addEventListener('DOMContentLoaded', () => {

    const state = { 
        financials: {}, ratios: {}, breakevenChart: null, hasValidData: false, 
        rawData: { bsItems: [], isItems: [] },
        selectedIndustry: 'general' // Default industry
    };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`; 

    const UI = { /* ... (UI elements mapping as before) ... */
        smartSummary: document.getElementById('smartSummary'), alertsArea: document.getElementById('alertsArea'),
        fixedCosts: document.getElementById('fixedCosts'), variableCost: document.getElementById('variableCost'), sellingPrice: document.getElementById('sellingPrice'), calculateBreakeven: document.getElementById('calculateBreakeven'), breakevenResults: document.getElementById('breakevenResults'), bepUnitsResult: document.getElementById('bepUnitsResult'), bepValueResult: document.getElementById('bepValueResult'), breakevenChartCanvas: document.getElementById('breakevenChart'),
        dupontResultsContainer: document.getElementById('dupontResultsContainer'), dupontDataWarning: document.getElementById('dupontDataWarning'), dupontFormulaDisplay: document.getElementById('dupontFormulaDisplay'), dupontROE: document.getElementById('dupontROE'), dupontNPM: document.getElementById('dupontNPM'), dupontAT: document.getElementById('dupontAT'), dupontEM: document.getElementById('dupontEM'), dupontValueNPM: document.getElementById('dupontValueNPM'), dupontValueAT: document.getElementById('dupontValueAT'), dupontValueEM: document.getElementById('dupontValueEM'), dupontValueROE: document.getElementById('dupontValueROE'), dupontInterpretation: document.getElementById('dupontInterpretation'),
        verticalDataWarning: document.getElementById('verticalDataWarning'), verticalResultsContainer: document.getElementById('verticalResultsContainer'), verticalBSTable: document.getElementById('verticalBSTable'), verticalISTable: document.getElementById('verticalISTable'),
        zscoreDataWarning: document.getElementById('zscoreDataWarning'), zscoreResultsContainer: document.getElementById('zscoreResultsContainer'), zscoreValue: document.getElementById('zscoreValue'), zscoreInterpretation: document.getElementById('zscoreInterpretation'), zscoreFactorsList: document.getElementById('zscoreFactorsList'),
        cfDataWarning: document.getElementById('cfDataWarning'), cfResultsContainer: document.getElementById('cfResultsContainer'), cfStatementTableBody: document.getElementById('cfStatementTableBody'), cfValueOCFRatio: document.getElementById('cfValueOCFRatio'), cfValueFCF: document.getElementById('cfValueFCF'), cfInterpretation: document.getElementById('cfInterpretation'),
        // *** NEW UI Element ***
        industrySelect: document.getElementById('industrySelect')
    };
    
    // Helper functions (Unchanged)
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
    const formatPercent = (value, digits = 1) => isFinite(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
    const formatRatio = (value, digits = 2) => isFinite(value) ? value.toFixed(digits) : "N/A";
    const formatNumber = (value, digits = 0) => isFinite(value) ? value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "N/A"; 

    // *** NEW: Industry Benchmark Data (Example - Needs real data) ***
    const industryBenchmarks = {
        general: { /* Default/fallback values if needed */ },
        retail: { currentRatio: 1.5, quickRatio: 0.5, netProfitMargin: 0.03, roe: 0.15, debtToEquity: 1.2, assetTurnover: 2.0 },
        manufacturing: { currentRatio: 1.8, quickRatio: 0.9, netProfitMargin: 0.06, roe: 0.12, debtToEquity: 0.8, assetTurnover: 1.0 },
        services: { currentRatio: 1.2, quickRatio: 1.0, netProfitMargin: 0.08, roe: 0.18, debtToEquity: 1.0, assetTurnover: 1.2 },
        construction: { currentRatio: 1.3, quickRatio: 0.8, netProfitMargin: 0.04, roe: 0.14, debtToEquity: 1.5, assetTurnover: 1.5 }
    };

    // ==============================================
    // === FINANCIAL CALCULATIONS (Unchanged) ===
    // ==============================================
    const calculateFinancials = () => { /* ... (Function as before) ... */ state.financials = {}; state.rawData = { bsItems: [], isItems: [] }; state.hasValidData = false; let trialData; try { const rawDataString = localStorage.getItem('trialData'); if (!rawDataString) { console.warn("localStorage 'trialData' is missing."); return false; } trialData = JSON.parse(rawDataString); if (!Array.isArray(trialData) || trialData.length === 0 || (trialData.length === 1 && !trialData[0].Account && !toNum(trialData[0].Debit) && !toNum(trialData[0].Credit))) { console.warn("Parsed 'trialData' is empty or invalid."); return false; } } catch (e) { console.error("Error parsing 'trialData':", e); return false; } try { const f = { assets: 0, liabilities: 0, equity: 0, revenue: 0, cogs: 0, expenses: 0, netProfit: 0, grossProfit: 0, currentAssets: 0, inventory: 0, currentLiabilities: 0, retainedEarnings: 0, interestExpense: 0, taxExpense: 0, depreciationAmortization: 0, ppeNet: 0, longTermDebt: 0, shortTermDebt: 0, cashEquivalents: 0, ebit: 0, workingCapital: 0, ocf_estimated: 0, capex_estimated: 0, icf_estimated: 0, fcf_estimated: 0, netCashChange_estimated: 0, freeCashFlow_estimated: 0 }; trialData.forEach(row => { const value = (toNum(row.Debit)) - (toNum(row.Credit)); const mainType = row.MainType || ''; const subType = row.SubType || ''; const accountName = (row.Account || '').toLowerCase(); const rawItem = { account: row.Account || 'N/A', value: 0, mainType: mainType, subType: subType }; if (mainType.includes('الأصول') || mainType.includes('Assets')) { f.assets += value; rawItem.value = value; state.rawData.bsItems.push(rawItem); if (subType.includes('متداول') || subType.includes('Current')) { f.currentAssets += value; if (subType.includes('المخزون') || subType.includes('Inventory') || accountName.includes('inventory') || accountName.includes('مخزون')) { f.inventory += value; } if (subType.includes('النقد') || subType.includes('Cash') || accountName.includes('cash') || accountName.includes('نقد')) f.cashEquivalents += value; } else if (subType.includes('غير متداول') || subType.includes('Non-current') || subType.includes('ثابتة') || subType.includes('fixed')) { if(accountName.includes('ppe') || accountName.includes('fixed asset') || accountName.includes('أصول ثابتة')) f.ppeNet += value; } } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) { f.liabilities -= value; rawItem.value = -value; state.rawData.bsItems.push(rawItem); if (subType.includes('متداول') || subType.includes('Current')) { f.currentLiabilities -= value; if(subType.includes('قروض قصيرة') || subType.includes('Short-term Loans') || accountName.includes('short term debt') || accountName.includes('قرض قصير')) f.shortTermDebt -=value; } else if (subType.includes('غير متداول') || subType.includes('Non-current')) { if(subType.includes('قروض طويلة') || subType.includes('Long-term Loans') || accountName.includes('long term debt') || accountName.includes('قرض طويل')) f.longTermDebt -=value; } } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) { f.equity -= value; rawItem.value = -value; state.rawData.bsItems.push(rawItem); if (subType.includes('الأرباح المحتجزة') || subType.includes('Retained Earnings') || accountName.includes('retained earnings') || accountName.includes('أرباح محتجزة')) f.retainedEarnings -= value; } else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) { rawItem.mainType = 'Income Statement'; if (subType.includes('الإيرادات') || subType.includes('Revenue')) { f.revenue -= value; rawItem.value = -value; state.rawData.isItems.push(rawItem); } else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) { f.cogs += value; rawItem.value = value; state.rawData.isItems.push(rawItem); } else { f.expenses += value; rawItem.value = value; state.rawData.isItems.push(rawItem); if (subType.includes('فائدة') || subType.includes('Interest') || accountName.includes('interest')) f.interestExpense += value; if (subType.includes('ضريبية') || subType.includes('Tax') || accountName.includes('tax')) f.taxExpense += value; if (subType.includes('إهلاك') || subType.includes('Depreciation') || accountName.includes('depreciation') || accountName.includes('amortization') || accountName.includes('إهلاك') || accountName.includes('استهلاك')) f.depreciationAmortization += value; } } }); Object.keys(f).forEach(key => f[key] = f[key] || 0); f.grossProfit = f.revenue - f.cogs; f.netProfit = f.grossProfit - f.expenses; f.ebit = f.netProfit + f.interestExpense + f.taxExpense; f.workingCapital = f.currentAssets - f.currentLiabilities; f.ocf_estimated = f.netProfit + f.depreciationAmortization; f.capex_estimated = f.depreciationAmortization; f.icf_estimated = -f.capex_estimated; f.fcf_estimated = 0; f.netCashChange_estimated = f.ocf_estimated + f.icf_estimated + f.fcf_estimated; f.freeCashFlow_estimated = f.ocf_estimated - f.capex_estimated; const balanceCheck = f.assets - (f.liabilities + f.equity + f.netProfit); if (Math.abs(balanceCheck) > 1) console.warn(`Balance sheet check failed... Diff: ${balanceCheck.toFixed(2)}`); state.financials = f; state.hasValidData = true; console.log("Calculated Financials:", f); return true; } catch (e) { console.error("Error during financial calculations:", e); state.financials = {}; state.hasValidData = false; return false; } };
    const calculateAllRatios = () => { /* ... (Function as before) ... */ state.ratios = {}; if (!state.hasValidData) { console.warn("Financials invalid, skipping ratio calculation."); return false; } const f = state.financials; try { const assets = f.assets || 0; const equity = f.equity || 0; const liabilities = f.liabilities || 0; const revenue = f.revenue || 0; const equityMultiplier = (equity !== 0 && assets !== 0) ? assets / equity : Infinity; const roeStandard = (equity !== 0) ? f.netProfit / equity : Infinity; const x1 = assets !== 0 ? f.workingCapital / assets : Infinity; const x2 = assets !== 0 ? f.retainedEarnings / assets : Infinity; const x3 = assets !== 0 ? f.ebit / assets : Infinity; const x4 = liabilities !== 0 ? equity / liabilities : Infinity; const x5 = assets !== 0 ? revenue / assets : 0; const zScore = (isFinite(x1) && isFinite(x2) && isFinite(x3) && isFinite(x4) && isFinite(x5)) ? (0.717 * x1) + (0.847 * x2) + (3.107 * x3) + (0.420 * x4) + (0.998 * x5) : NaN; state.ratios = { currentRatio: f.currentLiabilities !== 0 ? f.currentAssets / f.currentLiabilities : Infinity, quickRatio: f.currentLiabilities !== 0 ? (f.currentAssets - f.inventory) / f.currentLiabilities : Infinity, grossProfitMargin: revenue !== 0 ? f.grossProfit / revenue : 0, netProfitMargin: revenue !== 0 ? f.netProfit / revenue : 0, roa: assets !== 0 ? f.netProfit / assets : 0, roe: roeStandard, debtToAssets: assets !== 0 ? liabilities / assets : Infinity, debtToEquity: equity !== 0 ? liabilities / equity : Infinity, assetTurnover: x5, equityMultiplier: equityMultiplier, zScoreX1: x1, zScoreX2: x2, zScoreX3: x3, zScoreX4: x4, zScoreX5: x5, zScore: zScore, operatingCashFlowRatio: f.currentLiabilities !== 0 ? f.ocf_estimated / f.currentLiabilities : Infinity, freeCashFlow: f.freeCashFlow_estimated }; console.log("Calculated Ratios & Z-Score & CF:", state.ratios); return true; } catch(e) { console.error("Error calculating ratios:", e); state.ratios = {}; state.hasValidData = false; return false; } };

    // ==============================================
    // === RENDERING FUNCTIONS (Ratio section updated) ===
    // ==============================================
    
    // --- Render Ratios (MODIFIED FOR BENCHMARKS) ---
    const getRatioComment = (key, value) => { /* ... (original logic) ... */ if (!isFinite(value)) return "N/A"; if (key === 'currentRatio') { if (value >= 2) return t_page('currentRatio_comment_high'); if (value >= 1) return t_page('currentRatio_comment_good'); return t_page('currentRatio_comment_low'); } if (key === 'quickRatio') { if (value >= 1) return t_page('quickRatio_comment_good'); return t_page('quickRatio_comment_low'); } if (key === 'netProfitMargin') { if (value >= 0.15) return t_page('netProfitMargin_comment_high'); if (value > 0) return t_page('netProfitMargin_comment_avg'); return t_page('netProfitMargin_comment_low'); } if (key === 'grossProfitMargin') { return value >= 0.4 ? t_page('grossProfitMargin_comment_high') : t_page('grossProfitMargin_comment_low'); } if (key === 'roa') { return value >= 0.05 ? t_page('roa_comment_high') : t_page('roa_comment_low'); } if (key === 'roe') { return value >= 0.15 ? t_page('roe_comment_high') : t_page('roe_comment_low'); } if (key === 'debtToEquity') { if (value < 0.5) return t_page('debtToEquity_comment_low'); if (value <= 1.5) return t_page('debtToEquity_comment_good'); return t_page('debtToEquity_comment_high'); } if (key === 'debtToAssets') { return value < 0.4 ? t_page('debtToAssets_comment_low') : t_page('debtToAssets_comment_high'); } if (key === 'assetTurnover') { return value >= 1 ? t_page('assetTurnover_comment_high') : t_page('assetTurnover_comment_low'); } return ""; };
    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => { 
        const container = document.getElementById(divId); 
        if (!container) { console.error(`Element not found: ${divId}`); return; } 
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
                    <th>${t_page('thValue')}</th>
                    ${showBenchmarks ? `<th>${t_page('thIndustryAvg')}</th>` : ''} 
                    <th>${t_page('thComment')}</th>
                </tr></thead> 
                <tbody>`; 
        
        ratioKeys.forEach(key => { 
            const value = state.ratios[key]; 
            const benchmarkValue = benchmarks[key];
            
            const isPercentage = key.includes('Margin') || key.includes('roa') || key.includes('roe');
            const formattedValue = isPercentage ? formatPercent(value) : formatRatio(value); 
            const formattedBenchmark = typeof benchmarkValue !== 'undefined' 
                ? (isPercentage ? formatPercent(benchmarkValue) : formatRatio(benchmarkValue)) 
                : '-';

            const comment = getRatioComment(key, value); 
            
            // Comparison Logic (Simple: higher is better for most, lower for leverage)
            let comparisonIndicator = '';
            let comparisonText = '';
            if (showBenchmarks && typeof benchmarkValue !== 'undefined' && isFinite(value)) {
                const tolerance = 0.1 * Math.abs(benchmarkValue); // 10% tolerance
                const isBetter = (key === 'debtToEquity' || key === 'debtToAssets') 
                    ? value < benchmarkValue - tolerance // Lower is better for debt
                    : value > benchmarkValue + tolerance; // Higher is better for others
                const isWorse = (key === 'debtToEquity' || key === 'debtToAssets')
                    ? value > benchmarkValue + tolerance 
                    : value < benchmarkValue - tolerance;

                if (isBetter) {
                    comparisonIndicator = '<i class="bi bi-arrow-up-circle-fill text-success ms-1"></i>';
                    comparisonText = `(${t_page('comparison_better')})`;
                } else if (isWorse) {
                    comparisonIndicator = '<i class="bi bi-arrow-down-circle-fill text-danger ms-1"></i>';
                    comparisonText = `(${t_page('comparison_worse')})`;
                } else {
                     comparisonIndicator = '<i class="bi bi-arrow-left-right text-warning ms-1"></i>'; // Similar
                     comparisonText = `(${t_page('comparison_similar')})`;
                }
            }

            tableHTML += `<tr> 
                <td>${t_page(key)}</td> 
                <td><strong>${formattedValue}</strong> ${comparisonIndicator} <small class="text-muted">${comparisonText}</small></td> 
                ${showBenchmarks ? `<td>${formattedBenchmark}</td>` : ''}
                <td class="text-muted small">${comment}</td> 
            </tr>`; 
        }); 
        container.innerHTML = tableHTML + `</tbody></table></div>`; 
    };
    const renderSidebar = () => { /* ... (original logic unchanged) ... */ if (!state.hasValidData) { UI.smartSummary.textContent = lang === 'ar' ? '...' : '...'; UI.alertsArea.innerHTML = `<div>${lang === 'ar' ? '...' : '...'}</div>`; return; } const { netProfitMargin, currentRatio, debtToEquity } = state.ratios; UI.smartSummary.textContent = netProfitMargin > 0 && currentRatio > 1.5 ? t_page('summary_ok') : t_page('summary_risk'); const alerts = []; if (currentRatio < 1 && isFinite(currentRatio)) alerts.push(t_page('alert_liquidity_risk')); if (debtToEquity > 2 && isFinite(debtToEquity)) alerts.push(t_page('alert_leverage_risk')); if (netProfitMargin < 0 && isFinite(netProfitMargin)) alerts.push(t_page('alert_profit_risk')); UI.alertsArea.innerHTML = alerts.length > 0 ? alerts.map(alert => `<div>${alert}</div>`).join('') : `<div>${t_page('alert_ok')}</div>`; };

    // --- Render Break-even ---
    const calculateAndDisplayBreakeven = () => { /* ... (original logic) ... */ const fixed = toNum(UI.fixedCosts.value); const variable = toNum(UI.variableCost.value); const price = toNum(UI.sellingPrice.value); if (price <= 0 || variable < 0 || fixed < 0) { alert(t_page('errorPositiveValues')); return; } if (price <= variable) { alert(t_page('errorPrice')); return; } const contributionMargin = price - variable; const bepUnits = fixed / contributionMargin; const bepValue = bepUnits * price; UI.bepUnitsResult.textContent = Math.ceil(bepUnits).toLocaleString(); UI.bepValueResult.textContent = formatNumber(bepValue, 2); UI.breakevenResults.style.display = 'block'; renderBreakevenChart(fixed, variable, price, bepUnits); };
    const renderBreakevenChart = (fixed, variable, price, bepUnits) => { /* ... (original logic) ... */ if (!UI.breakevenChartCanvas) return; if (state.breakevenChart) { state.breakevenChart.destroy(); } let maxUnits = 100; if (bepUnits > 0 && isFinite(bepUnits)) { maxUnits = Math.max(100, Math.ceil(bepUnits * 2 / 10) * 10); } else if (fixed === 0 && price > variable) { maxUnits = 100; } else if (price <= variable) { maxUnits = 100; } const step = maxUnits / 10; const labels = Array.from({ length: 11 }, (_, i) => Math.round(step * i)); const fixedCostsData = labels.map(() => fixed); const totalCostsData = labels.map(unit => fixed + (variable * unit)); const revenueData = labels.map(unit => price * unit); const ctx = UI.breakevenChartCanvas.getContext('2d'); state.breakevenChart = new Chart(ctx, { type: 'line', data: { labels: labels, datasets: [ { label: t_page('revenue'), data: revenueData, borderColor: 'rgba(75, 192, 192, 1)', fill: false, tension: 0.1 }, { label: t_page('totalCosts'), data: totalCostsData, borderColor: 'rgba(255, 99, 132, 1)', fill: false, tension: 0.1 }, { label: t_page('fixedCosts'), data: fixedCostsData, borderColor: 'rgba(255, 159, 64, 1)', borderDash: [5, 5], fill: false, tension: 0.1 } ] }, options: { responsive: true, maintainAspectRatio: false, interaction: { intersect: false, mode: 'index', }, scales: { x: { title: { display: true, text: t_page('unitsSold') } }, y: { title: { display: true, text: t_page('value') }, beginAtZero: true } }, plugins: { tooltip: { callbacks: { label: function(context) { return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`; } } } } } }); };

    // --- Render DuPont ---
    const calculateAndDisplayDupont = () => { /* ... (original logic unchanged) ... */ if (!state.hasValidData) { if(UI.dupontDataWarning) { UI.dupontDataWarning.textContent = t_page('dupontDataWarning'); UI.dupontDataWarning.style.display = 'block'; } if(UI.dupontFormulaDisplay) UI.dupontFormulaDisplay.style.display = 'none'; if(UI.dupontInterpretation) UI.dupontInterpretation.innerHTML = ''; if(UI.dupontValueNPM) UI.dupontValueNPM.textContent = 'N/A'; if(UI.dupontValueAT) UI.dupontValueAT.textContent = 'N/A'; if(UI.dupontValueEM) UI.dupontValueEM.textContent = 'N/A'; if(UI.dupontValueROE) UI.dupontValueROE.textContent = 'N/A'; return; } if(UI.dupontDataWarning) UI.dupontDataWarning.style.display = 'none'; if(UI.dupontFormulaDisplay) UI.dupontFormulaDisplay.style.display = 'block'; const npm = state.ratios.netProfitMargin; const at = state.ratios.assetTurnover; const em = state.ratios.equityMultiplier; const dupontROE = (isFinite(npm) && isFinite(at) && isFinite(em)) ? npm * at * em : Infinity; if(UI.dupontROE) UI.dupontROE.textContent = formatPercent(dupontROE); if(UI.dupontNPM) UI.dupontNPM.textContent = formatPercent(npm); if(UI.dupontAT) UI.dupontAT.textContent = formatRatio(at); if(UI.dupontEM) UI.dupontEM.textContent = formatRatio(em); if(UI.dupontValueNPM) UI.dupontValueNPM.textContent = formatPercent(npm); if(UI.dupontValueAT) UI.dupontValueAT.textContent = formatRatio(at); if(UI.dupontValueEM) UI.dupontValueEM.textContent = formatRatio(em); if(UI.dupontValueROE) UI.dupontValueROE.textContent = formatPercent(dupontROE); let interpretation = ''; if (isFinite(dupontROE)) { const highROE = dupontROE >= 0.15; interpretation += highROE ? `<p>${t_page('dupontInterpretationHighROE')}</p><ul>` : `<p>${t_page('dupontInterpretationLowROE')}</p><ul>`; if (isFinite(npm)) { if (npm >= 0.10) interpretation += `<li>${t_page('dupontFactorProfitability')}</li>`; else if (npm < 0.05) interpretation += `<li>${t_page('dupontFactorLowProfitability')}</li>`; } if (isFinite(at)) { if (at >= 1.0) interpretation += `<li>${t_page('dupontFactorEfficiency')}</li>`; else if (at < 0.5) interpretation += `<li>${t_page('dupontFactorLowEfficiency')}</li>`; } if (isFinite(em)) { if (em > 2.5) interpretation += `<li>${t_page('dupontFactorLeverage')}</li>`; else if (em < 1.5) interpretation += `<li>${t_page('dupontFactorLowLeverage')}</li>`; } interpretation += `</ul>`; if (interpretation.endsWith('<ul></ul>')) { interpretation = `<p>${lang === 'ar' ? '...' : '...'}</p>`; } } else { interpretation = `<p class="text-danger">${lang === 'ar' ? '...' : '...'}</p>`; } if(UI.dupontInterpretation) UI.dupontInterpretation.innerHTML = interpretation; };
    
    // --- Render Vertical Analysis ---
    const calculateAndDisplayVerticalAnalysis = () => { /* ... (original logic unchanged) ... */ if (!state.hasValidData || !state.rawData || (!state.rawData.bsItems.length && !state.rawData.isItems.length)) { if(UI.verticalDataWarning) { UI.verticalDataWarning.textContent = t_page('verticalDataWarning'); UI.verticalDataWarning.style.display = 'block'; } if(UI.verticalResultsContainer) UI.verticalResultsContainer.style.display = 'none'; return; } if(UI.verticalDataWarning) UI.verticalDataWarning.style.display = 'none'; if(UI.verticalResultsContainer) UI.verticalResultsContainer.style.display = 'block'; const totalAssets = state.financials.assets || 0; const totalRevenue = state.financials.revenue || 0; let bsTableHTML = `<table class="table table-sm table-striped"><thead>...</thead><tbody>`; state.rawData.bsItems.sort((a,b) => b.value - a.value).forEach(item => { const percentage = totalAssets !== 0 ? (item.value / totalAssets) : 0; bsTableHTML += `<tr><td>${item.account}</td><td class="text-end">${formatNumber(item.value)}</td><td class="text-end">${formatPercent(percentage, 1)}</td></tr>`; }); bsTableHTML += `<tr class="table-light fw-bold"><td>${lang === 'ar' ? 'الإجمالي' : 'Total'}</td><td class="text-end">${formatNumber(totalAssets)}</td><td class="text-end">100.0%</td></tr>`; bsTableHTML += `</tbody></table>`; if(UI.verticalBSTable) UI.verticalBSTable.innerHTML = bsTableHTML; let isTableHTML = `<table class="table table-sm table-striped"><thead>...</thead><tbody>`; state.rawData.isItems.sort((a,b) => b.value - a.value).forEach(item => { const percentage = totalRevenue !== 0 ? (item.value / totalRevenue) : 0; const displayValue = item.value; isTableHTML += `<tr><td>${item.account}</td><td class="text-end">${formatNumber(displayValue)}</td><td class="text-end">${formatPercent(percentage, 1)}</td></tr>`; }); isTableHTML += `<tr class="table-light fw-bold"><td>${lang === 'ar' ? 'صافي الإيرادات' : 'Net Revenue'}</td><td class="text-end">${formatNumber(totalRevenue)}</td><td class="text-end">100.0%</td></tr>`; isTableHTML += `</tbody></table>`; if(UI.verticalISTable) UI.verticalISTable.innerHTML = isTableHTML; };

    // --- Render Altman Z-Score ---
    const calculateAndDisplayZScore = () => { /* ... (original logic unchanged) ... */ if (!state.hasValidData || !isFinite(state.ratios.zScore)) { if(UI.zscoreDataWarning) { UI.zscoreDataWarning.textContent = t_page('zscoreDataWarning'); UI.zscoreDataWarning.style.display = 'block'; } if(UI.zscoreResultsContainer) UI.zscoreResultsContainer.style.display = 'none'; return; } if(UI.zscoreDataWarning) UI.zscoreDataWarning.style.display = 'none'; if(UI.zscoreResultsContainer) UI.zscoreResultsContainer.style.display = 'block'; const z = state.ratios.zScore; let interpretation = ''; let interpretationClass = ''; if (z > 2.9) { interpretation = t_page('zscoreZoneSafe'); interpretationClass = 'text-success'; } else if (z > 1.23) { interpretation = t_page('zscoreZoneGrey'); interpretationClass = 'text-warning'; } else { interpretation = t_page('zscoreZoneDistress'); interpretationClass = 'text-danger'; } if(UI.zscoreValue) UI.zscoreValue.textContent = formatRatio(z, 3); if(UI.zscoreInterpretation) { UI.zscoreInterpretation.textContent = interpretation; UI.zscoreInterpretation.className = `h5 fw-bold ${interpretationClass}`; } let factorsHTML = ''; const factors = ['zScoreX1', 'zScoreX2', 'zScoreX3', 'zScoreX4', 'zScoreX5']; factors.forEach(key => { const value = state.ratios[key]; let label = t_page(key.replace('zScore', 'zscore')); if (key === 'zScoreX2' && state.financials.retainedEarnings === 0 && !isFinite(value)) { label += ` <small class="text-muted">${t_page('zscoreRetainedEarningsNotFound')}</small>`; } factorsHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">${label} <span class="badge bg-secondary rounded-pill">${formatRatio(value)}</span></li>`; }); if(UI.zscoreFactorsList) UI.zscoreFactorsList.innerHTML = factorsHTML; };
    
    // --- Render Cash Flow Analysis ---
    const calculateAndDisplayCashFlowAnalysis = () => { /* ... (original logic unchanged) ... */ if (!state.hasValidData) { if(UI.cfDataWarning) { UI.cfDataWarning.textContent = t_page('cfDataWarning'); UI.cfDataWarning.style.display = 'block'; } if(UI.cfResultsContainer) UI.cfResultsContainer.style.display = 'none'; return; } if(UI.cfDataWarning) UI.cfDataWarning.style.display = 'none'; if(UI.cfResultsContainer) UI.cfResultsContainer.style.display = 'block'; const f = state.financials; const r = state.ratios; let stmtHTML = `<tr><td>${t_page('cfNetIncome')}</td><td class="text-end">${formatNumber(f.netProfit)}</td></tr> <tr><td class="ps-3">${t_page('cfDepreciationAmortization')}</td><td class="text-end">${formatNumber(f.depreciationAmortization)}</td></tr> <tr><td class="text-muted ps-3">${t_page('cfChangesWC')}</td><td class="text-end text-muted">(N/A)</td></tr> <tr class="table-light fw-bold"><td>${t_page('cfOperating')}</td><td class="text-end">${formatNumber(f.ocf_estimated)}</td></tr> <tr><td>${t_page('cfInvesting')}</td><td class="text-end">${formatNumber(f.icf_estimated)}</td></tr> <tr><td>${t_page('cfFinancing')}</td><td class="text-end">${formatNumber(f.fcf_estimated)}</td></tr> <tr class="table-light fw-bold border-top"><td>${t_page('cfNetChange')}</td><td class="text-end">${formatNumber(f.netCashChange_estimated)}</td></tr> `; if(UI.cfStatementTableBody) UI.cfStatementTableBody.innerHTML = stmtHTML; if(UI.cfValueOCFRatio) UI.cfValueOCFRatio.textContent = formatRatio(r.operatingCashFlowRatio); if(UI.cfValueFCF) UI.cfValueFCF.textContent = formatNumber(r.freeCashFlow); let interpretation = ''; if (isFinite(f.ocf_estimated)) { interpretation += f.ocf_estimated > 0 ? `<p>${t_page('cfInterpretationPositiveOCF')}</p>` : `<p>${t_page('cfInterpretationNegativeOCF')}</p>`; } if (isFinite(r.freeCashFlow)) { interpretation += `<p>${t_page('cfInterpretationFCF')}</p>`; } if(UI.cfInterpretation) UI.cfInterpretation.innerHTML = interpretation || `<p class="text-muted">...</p>`; };


    // ==============================================
    // === RUN ANALYSIS & INITIALIZATION ===
    // ==============================================
    
    // --- Main analysis function ---
    const runAnalysis = (renderOnlyRatios = false) => { 
        console.log("Running analysis...");
        if (!calculateFinancials()) {
             state.hasValidData = false;
        } else {
             state.hasValidData = calculateAllRatios(); 
        }

        // Always render ratios and sidebar as they are in the first tab
        renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
        renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
        renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
        renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);
        renderSidebar();
        
        // Render other tabs only if not explicitly told otherwise (e.g., during init)
        if (!renderOnlyRatios) {
             console.log("Rendering all dependent tabs after analysis run...");
             calculateAndDisplayDupont(); 
             calculateAndDisplayVerticalAnalysis();
             calculateAndDisplayZScore();
             calculateAndDisplayCashFlowAnalysis();
        }
        
        return state.hasValidData; 
    };

    // --- Populate Industry Select ---
    const populateIndustrySelect = () => {
        if (!UI.industrySelect) return;
        const industries = ['general', 'retail', 'manufacturing', 'services', 'construction']; // Match keys in benchmark data
        UI.industrySelect.innerHTML = industries.map(key => 
            `<option value="${key}">${t_page(`industry_${key}`)}</option>`
        ).join('');
        UI.industrySelect.value = state.selectedIndustry; // Set initial value
    };

    // --- Initialize Page ---
    const init = () => { 
        console.log("Initializing advanced page...");
        populateIndustrySelect(); // Populate the dropdown first

        runAnalysis(true); // Run initial analysis, but only render ratios for now

        // Add event listeners AFTER initial run
        if (UI.calculateBreakeven) { UI.calculateBreakeven.addEventListener('click', calculateAndDisplayBreakeven); } 
        else { console.warn("Breakeven calculate button not found"); }

        // *** NEW: Listener for Industry Select change ***
        if (UI.industrySelect) {
            UI.industrySelect.addEventListener('change', (e) => {
                state.selectedIndustry = e.target.value;
                console.log(`Industry changed to: ${state.selectedIndustry}`);
                // Re-render only the ratio tables with new benchmark data
                renderRatioCategory('liquidityRatios', 'liquidityRatios', ['currentRatio', 'quickRatio']);
                renderRatioCategory('profitabilityRatios', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
                renderRatioCategory('leverageRatios', 'leverageRatios', ['debtToAssets', 'debtToEquity']);
                renderRatioCategory('efficiencyRatios', 'efficiencyRatios', ['assetTurnover']);
                applyTranslations(); // Re-apply translations if needed for dynamic text
            });
        }

        // --- Tab Change Listeners ---
        const tabs = ['ratios', 'breakeven', 'dupont', 'vertical', 'zscore', 'cashflow']; 
        tabs.forEach(tabId => {
            const tabElement = document.getElementById(`${tabId}-tab`);
            if (tabElement) {
                tabElement.addEventListener('shown.bs.tab', () => {
                     console.log(`${tabId} tab shown`);
                     // Ensure data is calculated before displaying dependent tabs
                     if (!state.hasValidData) {
                          console.log("Tab shown but no valid data, attempting to re-run analysis...");
                          runAnalysis(); // Try to re-calculate if data was missing
                     }
                     
                     // Trigger display functions for specific tabs (if data is valid)
                     if (state.hasValidData) {
                         if (tabId === 'dupont') calculateAndDisplayDupont();
                         if (tabId === 'vertical') calculateAndDisplayVerticalAnalysis();
                         if (tabId === 'zscore') calculateAndDisplayZScore();
                         if (tabId === 'cashflow') calculateAndDisplayCashFlowAnalysis(); 
                     } else {
                         // Ensure warnings are displayed if tab is shown and data is invalid
                          if (tabId === 'dupont') calculateAndDisplayDupont(); // Will show warning
                          if (tabId === 'vertical') calculateAndDisplayVerticalAnalysis(); // Will show warning
                          if (tabId === 'zscore') calculateAndDisplayZScore(); // Will show warning
                          if (tabId === 'cashflow') calculateAndDisplayCashFlowAnalysis(); // Will show warning
                     }
                     
                     if (tabId === 'breakeven' && state.breakevenChart) { /* state.breakevenChart.resize(); */ }
                });
            } else { console.warn(`Tab button not found for ID: ${tabId}-tab`); }
        });
         
         // Initial calculations/display for all dependent tabs (called within runAnalysis or tab listeners)
         // calculateAndDisplayDupont(); // No, let tab listener handle it
         // calculateAndDisplayVerticalAnalysis(); // No, let tab listener handle it
         // calculateAndDisplayZScore(); // No, let tab listener handle it
         // calculateAndDisplayCashFlowAnalysis(); // No, let tab listener handle it
         
         // Apply translations
         if (typeof applyTranslations === 'function') { 
              console.log("Applying translations...");
              applyTranslations(); 
         } 
         else { console.warn("applyTranslations function not found."); }
         
         console.log("Advanced page initialized.");
    };

    // Run init 
    if (document.getElementById('ratios-pane') && document.getElementById('cashflow-pane')) { 
        init();
    } else {
        console.error("Critical tab pane elements were not found. Initialization stopped.");
    }
});
