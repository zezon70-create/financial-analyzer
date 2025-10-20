// js/report-app.js (Corrected Version 4: Renamed formatCurrency to formatNumber)

window.pageTranslations = {
    ar: {
        pageTitle: "التقارير المالية المفصلة — المحلل المالي",
        pageHeader: "القوائم المالية المفصلة",
        pageSubheader: "تقارير احترافية طبقًا للمعايير الدولية مع تعليقات تحليلية ذكية.",
        commentaryTitle: "تعليق تحليلي", exportPdf: "تصدير PDF", exportExcel: "تصدير Excel", total: "الإجمالي",
        bsTitle: "قائمة المركز المالي", bsSubheader: "تعرض أصول الشركة وخصومها وحقوق ملكيتها...", assets: "الأصول", currentAssets: "الأصول المتداولة", nonCurrentAssets: "الأصول غير المتداولة", totalAssets: "إجمالي الأصول", liabilities: "الخصوم", currentLiabilities: "الخصوم المتداولة", nonCurrentLiabilities: "الخصوم غير المتداولة", totalLiabilities: "إجمالي الخصوم", equity: "حقوق الملكية", totalEquity: "إجمالي حقوق الملكية", totalLiabilitiesAndEquity: "إجمالي الخصوم وحقوق الملكية", bs_comment_balanced: "تحليل إيجابي: قائمة المركز المالي متوازنة...", bs_comment_unbalanced: "تحليل يتطلب الانتباه: القائمة غير متوازنة بفارق {diff}...",
        isTitle: "قائمة الدخل الشامل", isSubheader: "تلخص إيرادات ومصروفات الشركة...", revenue: "الإيرادات", cogs: "تكلفة المبيعات", grossProfit: "مجمل الربح", operatingExpenses: "المصروفات التشغيلية", operatingProfit: "الربح التشغيلي", netProfit: "صافي الربح", is_comment_profit: "أداء قوي: الشركة تحقق صافي ربح...", is_comment_loss: "تحديات في الربحية: الشركة تسجل صافي خسارة...",
        cfTitle: "قائمة التدفقات النقدية (تقديري)", cfSubheader: "توضح حركة النقد...", operatingActivities: "التدفقات النقدية التشغيلية", investingActivities: "التدفقات النقدية الاستثمارية", financingActivities: "التدفقات النقدية التمويلية", netCashFlow: "صافي التغير في النقد", cf_comment_positive: "وضع نقدي جيد...", cf_comment_negative: "مؤشر خطر...",
        eqTitle: "قائمة التغيرات في حقوق الملكية", eqSubheader: "توضح التغيرات التي طرأت...", openingBalance: "الرصيد الافتتاحي", closingBalance: "الرصيد الختامي", eq_comment_growth: "نمو في حقوق المساهمين...", eq_comment_decline: "انخفاض في حقوق المساهمين...",
        ratiosTitle: "النسب المالية الرئيسية والمقارنات المعيارية",
        ratiosSubheader: "تحليل لأهم النسب المالية مقارنة بمتوسطات الصناعة.",
        selectIndustryLabel: "اختر قطاع الصناعة للمقارنة",
        selectIndustryDesc: "اختيار قطاع سيضيف مقارنة مع متوسطات الصناعة إلى جداول النسب.",
        thRatio: "النسبة", thValue: "القيمة", thIndustryAvg: "متوسط الصناعة", thComment: "تعليق تحليلي",
        noDataForRatios: "لا توجد بيانات كافية لحساب النسب. يرجى إدخال ميزان المراجعة أولاً.",
        liquidityRatios: "نسب السيولة", profitabilityRatios: "نسب الربحية", leverageRatios: "نسب الرفع المالي", efficiencyRatios: "نسب الكفاءة",
        currentRatio: "نسبة التداول", currentRatio_comment_high: "سيولة ممتازة...", currentRatio_comment_good: "سيولة جيدة...", currentRatio_comment_low: "مؤشر خطر...",
        quickRatio: "نسبة السيولة السريعة", quickRatio_comment_good: "قدرة جيدة...", quickRatio_comment_low: "مؤشر خطر...",
        netProfitMargin: "هامش صافي الربح", netProfitMargin_comment_high: "ربحية ممتازة...", netProfitMargin_comment_avg: "ربحية مقبولة...", netProfitMargin_comment_low: "خسائر...",
        grossProfitMargin: "هامش الربح الإجمالي", grossProfitMargin_comment_high: "هامش قوي...", grossProfitMargin_comment_low: "هامش ضعيف...",
        roa: "العائد على الأصول (ROA)", roa_comment_high: "كفاءة عالية...", roa_comment_low: "كفاءة منخفضة...",
        roe: "العائد على حقوق الملكية (ROE)", roe_comment_high: "عائد ممتاز...", roe_comment_low: "عائد ضعيف...",
        debtToEquity: "نسبة الدين إلى حقوق الملكية", debtToEquity_comment_low: "دين منخفض...", debtToEquity_comment_good: "دين معتدل...", debtToEquity_comment_high: "دين مرتفع...",
        debtToAssets: "نسبة الدين إلى الأصول", debtToAssets_comment_low: "وضع آمن...", debtToAssets_comment_high: "مخاطر مرتفعة...",
        assetTurnover: "معدل دوران الأصول", assetTurnover_comment_high: "كفاءة ممتازة...", assetTurnover_comment_low: "كفاءة منخفضة...",
        industry_general: "عام / غير محدد", industry_retail: "تجارة التجزئة", industry_manufacturing: "الصناعة التحويلية", industry_services: "الخدمات", industry_construction: "المقاولات",
        comparison_better: "أفضل", comparison_worse: "أسوأ", comparison_similar: "مماثل"
    },
    en: { /* ... (English translations as before) ... */ }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("[DEBUG] DOM Loaded for report-app.js");

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

    // *** HELPER FUNCTIONS ***
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
    const formatPercent = (value, digits = 1) => isFinite(value) && !isNaN(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
    const formatRatio = (value, digits = 2) => isFinite(value) && !isNaN(value) ? value.toFixed(digits) : "N/A";
    const formatNumber = (value, digits = 0) => isFinite(value) && !isNaN(value) ? value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "N/A";

    // Benchmark Data
    const industryBenchmarks = {
        general: {},
        retail: { currentRatio: 1.5, quickRatio: 0.5, netProfitMargin: 0.03, roe: 0.15, debtToEquity: 1.2, assetTurnover: 2.0, grossProfitMargin: 0.30 },
        manufacturing: { currentRatio: 1.8, quickRatio: 0.9, netProfitMargin: 0.06, roe: 0.12, debtToEquity: 0.8, assetTurnover: 1.0, grossProfitMargin: 0.35 },
        services: { currentRatio: 1.2, quickRatio: 1.0, netProfitMargin: 0.08, roe: 0.18, debtToEquity: 1.0, assetTurnover: 1.2, grossProfitMargin: 0.50 },
        construction: { currentRatio: 1.3, quickRatio: 0.8, netProfitMargin: 0.04, roe: 0.14, debtToEquity: 1.5, assetTurnover: 1.5, grossProfitMargin: 0.20 }
    };

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
                    const value = (toNum(row.Debit)) - (toNum(row.Credit)); const mainType = row.MainType || ''; const subType = row.SubType || ''; const accountName = (row.Account || '').toLowerCase(); const item = { Account: row.Account || 'N/A', value: 0 };
                    if (mainType.includes('الأصول') || mainType.includes('Assets')) { financials.assets += value; item.value = value; if (subType.includes('متداول') || subType.includes('Current')) { financials.currentAssets += value; statements.assets.current.push(item); if (subType.includes('المخزون') || subType.includes('Inventory') || accountName.includes('inventory') || accountName.includes('مخزون')) financials.inventory += value; if (subType.includes('النقد') || subType.includes('Cash') || accountName.includes('cash') || accountName.includes('نقد')) financials.cashEquivalents += value; } else { financials.ppeNet += (accountName.includes('ppe') || accountName.includes('fixed asset') || accountName.includes('أصول ثابتة'))? value : 0; statements.assets.nonCurrent.push(item); } } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) { financials.liabilities -= value; item.value = -value; if (subType.includes('متداول') || subType.includes('Current')) { financials.currentLiabilities -= value; statements.liabilities.current.push(item); if(subType.includes('قروض قصيرة') || subType.includes('Short-term Loans') || accountName.includes('short term debt') || accountName.includes('قرض قصير')) financials.shortTermDebt -=value; } else { financials.longTermDebt += (subType.includes('قروض طويلة') || subType.includes('Long-term Loans') || accountName.includes('long term debt') || accountName.includes('قرض طويل'))? -value : 0; statements.liabilities.nonCurrent.push(item); } } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) { financials.equity -= value; item.value = -value; if (subType.includes('رأس المال') || subType.includes('Capital')) statements.equity.capital.push(item); else { financials.retainedEarnings -= (subType.includes('الأرباح المحتجزة') || subType.includes('Retained Earnings') || accountName.includes('retained earnings') || accountName.includes('أرباح محتجزة'))? value : 0; statements.equity.retainedEarningsItems.push(item); } } else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) { if (subType.includes('الإيرادات') || subType.includes('Revenue')) { financials.revenue -= value; item.value = -value; statements.income.revenue.push(item); } else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) { financials.cogs += value; item.value = value; statements.income.cogs.push(item); } else { financials.expenses += value; item.value = value; statements.income.expenses.push(item); if (subType.includes('فائدة') || subType.includes('Interest') || accountName.includes('interest')) financials.interestExpense += value; if (subType.includes('ضريبية') || subType.includes('Tax') || accountName.includes('tax')) financials.taxExpense += value; if (subType.includes('إهلاك') || subType.includes('Depreciation') || accountName.includes('depreciation') || accountName.includes('amortization') || accountName.includes('إهلاك') || accountName.includes('استهلاك')) financials.depreciationAmortization += value; } }
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
     const calculateAllRatios = () => {
        state.ratios = {};
        if (!state.hasValidData) { console.warn("Financials invalid, skipping ratio calculation."); return false; }
        const f = state.financials;
        try {
            const assets = f.assets || 0; const equity = f.equity || 0; const liabilities = f.liabilities || 0; const revenue = f.revenue || 0;
            const equityMultiplier = (equity !== 0 && assets !== 0) ? assets / equity : Infinity;
            const roeStandard = (equity !== 0) ? f.netProfit / equity : Infinity;
            state.ratios = {
                currentRatio: f.currentLiabilities !== 0 ? f.currentAssets / f.currentLiabilities : Infinity,
                quickRatio: f.currentLiabilities !== 0 ? (f.currentAssets - f.inventory) / f.currentLiabilities : Infinity,
                grossProfitMargin: revenue !== 0 ? f.grossProfit / revenue : 0,
                netProfitMargin: revenue !== 0 ? f.netProfit / revenue : 0,
                roa: assets !== 0 ? f.netProfit / assets : 0,
                roe: roeStandard,
                debtToAssets: assets !== 0 ? liabilities / assets : Infinity,
                debtToEquity: equity !== 0 ? liabilities / equity : Infinity,
                assetTurnover: assets !== 0 ? revenue / assets : 0,
                equityMultiplier: equityMultiplier,
                operatingCashFlowRatio: f.currentLiabilities !== 0 ? f.ocf_estimated / f.currentLiabilities : Infinity,
                freeCashFlow: f.freeCashFlow_estimated
            };
            console.log("Calculated Ratios:", state.ratios);
            return true;
        } catch(e) { console.error("Error calculating ratios:", e); state.ratios = {}; state.hasValidData = false; return false; }
    };

    // Render Statement Section Function
    const renderStatementSection = (items, totalLabel, isSubSection = false) => {
        let total = 0;
        let html = `<table class="table table-sm report-table ${isSubSection ? 'mb-0' : ''}"><tbody>`;
        if (!Array.isArray(items)) {
            console.error(`[DEBUG] renderStatementSection received non-array for items with label: ${totalLabel}`, items);
            items = []; 
        }
        items.forEach(item => {
            const itemValue = typeof item.value === 'number' ? item.value : 0;
            html += `<tr><td>${item.Account}</td><td class="text-end">${formatNumber(itemValue)}</td></tr>`;
            total += itemValue;
        });
        if (totalLabel) {
            html += `<tr class="subtotal-row"><td>${totalLabel}</td><td class="text-end">${formatNumber(total)}</td></tr>`;
        }
        html += '</tbody></table>';
        return { html, total };
    };

    // --- Rendering functions for each statement ---
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
        html += `<table class="table report-table"><tbody class="total-row"><tr><td>${t_page('totalAssets')}</td><td class="text-end">${formatNumber(totalAssets)}</td></tr></tbody></table>`;
        html += `<h6 class="mt-4">${t_page('liabilities')} & ${t_page('equity')}</h6>`;
        const currentLiabsResult = renderStatementSection(liabilities.current, `${t_page('total')} ${t_page('currentLiabilities')}`, true);
        const nonCurrentLiabsResult = renderStatementSection(liabilities.nonCurrent, `${t_page('total')} ${t_page('nonCurrentLiabilities')}`, true);
        const totalLiabs = (currentLiabsResult?.total || 0) + (nonCurrentLiabsResult?.total || 0);
        html += (currentLiabsResult?.html || '') + (nonCurrentLiabsResult?.html || '');
        html += `<table class="table report-table"><tbody class="subtotal-row"><tr><td>${t_page('totalLiabilities')}</td><td class="text-end">${formatNumber(totalLiabs)}</td></tr></tbody></table>`;
        const equityItems = (equity.capital || []).concat(equity.retainedEarningsItems || []);
        const totalEquityResult = renderStatementSection(equityItems, t_page('totalEquity'), true);
        const totalEquityValue = totalEquityResult?.total || 0;
        html += (totalEquityResult?.html || '');
        const netProfitForBalance = state.financials.netProfit || 0;
        html += `<table class="table report-table"><tbody><tr><td>${t_page('netProfit')}</td><td class="text-end">${formatNumber(netProfitForBalance)}</td></tr></tbody></table>`;
        const totalLiabsAndEquity = totalLiabs + totalEquityValue + netProfitForBalance;
        html += `<table class="table report-table"><tbody class="total-row"><tr><td>${t_page('totalLiabilitiesAndEquity')}</td><td class="text-end">${formatNumber(totalLiabsAndEquity)}</td></tr></tbody></table>`;
        container.innerHTML = html;
        const diff = totalAssets - totalLiabsAndEquity;
        const comment = Math.abs(diff) < 1 ? t_page('bs_comment_balanced') : t_page('bs_comment_unbalanced').replace('{diff}', formatNumber(diff));
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
        html += totalRevenue.html + totalCogs.html + `<tr class="subtotal-row"><td>${t_page('grossProfit')}</td><td class="text-end">${formatNumber(grossProfit)}</td></tr>`;
        const totalExpenses = renderStatementSection(expenses, `(-) ${t_page('operatingExpenses')}`, true);
        const netProfit = grossProfit - totalExpenses.total;
        html += totalExpenses.html + `</tbody></table><table class="table report-table"><tbody class="total-row"><tr><td>${t_page('netProfit')}</td><td class="text-end">${formatNumber(netProfit)}</td></tr></tbody></table>`;
        container.innerHTML = html;
        const margin = totalRevenue.total !== 0 ? (netProfit / totalRevenue.total) * 100 : 0;
        const comment = netProfit > 0 
            ? t_page('is_comment_profit').replace('{profit}', formatNumber(netProfit)).replace('{margin}', margin.toFixed(1))
            : t_page('is_comment_loss').replace('{profit}', formatNumber(netProfit));
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
            </tbody></table><table class="table report-table"><tbody class="total-row"><tr><td>${t_page('netCashFlow')}</td><td class="text-end">${formatNumber(f.netCashChange_estimated)}</td></tr></tbody></table>`;
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
        html += `<tr><td>${t_page('openingBalance')}</td><td class="text-end">${formatNumber(openingEquity)}</td></tr>`;
        html += `<tr><td>(+) ${t_page('netProfit')}</td><td class="text-end">${formatNumber(netProfit)}</td></tr>`;
        html += `<tr class="total-row"><td>${t_page('closingBalance')}</td><td class="text-end">${formatNumber(closingEquity)}</td></tr>`;
        html += `</tbody></table>`;
        container.innerHTML = html;
        commentContainer.textContent = netProfit > 0 ? t_page('eq_comment_growth') : t_page('eq_comment_decline');
        console.log("[DEBUG] Finished rendering Equity Statement.");
    };

    // --- Render Ratio Category Function ---
    const getRatioComment = (key, value) => {
        if (!isFinite(value) || isNaN(value)) return "N/A";
        if (key === 'currentRatio') { if (value >= 2) return t_page('currentRatio_comment_high'); if (value >= 1) return t_page('currentRatio_comment_good'); return t_page('currentRatio_comment_low'); }
        if (key === 'quickRatio') { if (value >= 1) return t_page('quickRatio_comment_good'); return t_page('quickRatio_comment_low'); }
        if (key === 'netProfitMargin') { if (value >= 0.15) return t_page('netProfitMargin_comment_high'); if (value > 0) return t_page('netProfitMargin_comment_avg'); return t_page('netProfitMargin_comment_low'); }
        if (key === 'grossProfitMargin') { return value >= 0.4 ? t_page('grossProfitMargin_comment_high') : t_page('grossProfitMargin_comment_low'); }
        if (key === 'roa') { return value >= 0.05 ? t_page('roa_comment_high') : t_page('roa_comment_low'); }
        if (key === 'roe') { return value >= 0.15 ? t_page('roe_comment_high') : t_page('roe_comment_low'); }
        if (key === 'debtToEquity') { if (value < 0.5) return t_page('debtToEquity_comment_low'); if (value <= 1.5) return t_page('debtToEquity_comment_good'); return t_page('debtToEquity_comment_high'); }
        if (key === 'debtToAssets') { return value < 0.4 ? t_page('debtToAssets_comment_low') : t_page('debtToAssets_comment_high'); }
        if (key === 'assetTurnover') { return value >= 1 ? t_page('assetTurnover_comment_high') : t_page('assetTurnover_comment_low'); }
        return "";
    };
    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => {
        const container = document.getElementById(divId);
        if (!container) { console.error(`[DEBUG] Ratio container not found: ${divId}`); return; }
        if (!state.hasValidData) {
            container.innerHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5> <p class="text-muted">${t_page('noDataForRatios')}</p>`; return;
        }
        console.log(`[DEBUG] Rendering ratio category: ${categoryTitleKey}`);
        const benchmarks = industryBenchmarks[state.selectedIndustry] || {};
        const showBenchmarks = state.selectedIndustry !== 'general';
        let tableHTML = `<h5 class="mb-3">${t_page(categoryTitleKey)}</h5>
            <div class="table-responsive">
            <table class="table table-sm table-striped">
                <thead><tr>
                    <th>${t_page('thRatio')}</th>
                    <th class="text-end">${t_page('thValue')}</th>
                    ${showBenchmarks ? `<th class="text-end">${t_page('thIndustryAvg')}</th>` : ''}
                    <th>${t_page('thComment')}</th>
                </tr></thead>
                <tbody>`;
        ratioKeys.forEach(key => {
            const value = state.ratios && state.ratios.hasOwnProperty(key) ? state.ratios[key] : NaN;
            const benchmarkValue = benchmarks[key];
            const isPercentage = key.includes('Margin') || key.includes('roa') || key.includes('roe');
            const formattedValue = isPercentage ? formatPercent(value) : formatRatio(value);
            const formattedBenchmark = (showBenchmarks && typeof benchmarkValue !== 'undefined' && isFinite(benchmarkValue)) ? (isPercentage ? formatPercent(benchmarkValue) : formatRatio(benchmarkValue)) : '-';
            const comment = getRatioComment(key, value);
            let comparisonIndicator = ''; let comparisonText = '';
            if (showBenchmarks && typeof benchmarkValue !== 'undefined' && isFinite(value) && isFinite(benchmarkValue)) { const tolerance = 0.1 * Math.abs(benchmarkValue); const isDebtRatio = key === 'debtToEquity' || key === 'debtToAssets'; const isBetter = isDebtRatio ? value < benchmarkValue - tolerance : value > benchmarkValue + tolerance; const isWorse = isDebtRatio ? value > benchmarkValue + tolerance : value < benchmarkValue - tolerance; if (isBetter) { comparisonIndicator = '<i class="bi bi-arrow-up-circle-fill text-success ms-1"></i>'; comparisonText = `(${t_page('comparison_better')})`; } else if (isWorse) { comparisonIndicator = '<i class="bi bi-arrow-down-circle-fill text-danger ms-1"></i>'; comparisonText = `(${t_page('comparison_worse')})`; } else { comparisonIndicator = '<i class="bi bi-arrow-left-right text-warning ms-1"></i>'; comparisonText = `(${t_page('comparison_similar')})`; } }
            tableHTML += `<tr>
                <td>${t_page(key)}</td>
                <td class="text-end"><strong>${formattedValue}</strong> ${comparisonIndicator} <small class="text-muted">${comparisonText}</small></td>
                ${showBenchmarks ? `<td class="text-end">${formattedBenchmark}</td>` : ''}
                <td class="text-muted small">${comment}</td>
            </tr>`;
        });
        container.innerHTML = tableHTML + `</tbody></table></div>`;
        console.log(`[DEBUG] Finished rendering ratio category: ${categoryTitleKey}`);
    };

     // --- Populate Industry Select Function ---
     const populateIndustrySelect = () => {
        const industrySelect = document.getElementById('industrySelect');
        if (!industrySelect) { console.warn("[DEBUG] Industry select dropdown not found in report page."); return; }
        const industries = ['general', 'retail', 'manufacturing', 'services', 'construction'];
        industrySelect.innerHTML = industries.map(key =>
            `<option value="${key}">${t_page(`industry_${key}`)}</option>`
        ).join('');
        state.selectedIndustry = localStorage.getItem('selectedIndustry') || 'general';
        industrySelect.value = state.selectedIndustry;
        console.log("[DEBUG] Industry select populated.");
    };


    const init = () => {
        console.log("[DEBUG] Initializing report page...");
        const pdfBtn = document.getElementById('exportPdfBtn');
        const excelBtn = document.getElementById('exportExcelBtn');
        const industrySelect = document.getElementById('industrySelect');

        if (pdfBtn) { pdfBtn.addEventListener('click', () => { /* ... PDF export logic ... */ }); }
        if (excelBtn) { excelBtn.addEventListener('click', () => { /* ... Excel export logic ... */ }); }

        // Build statements and calculate financials first
        buildStatementsAndFinancials(); // Sets state.hasValidData

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
             const bsCommentEl = document.getElementById('balanceSheetComment');
             const isCommentEl = document.getElementById('incomeStatementComment');
             const cfCommentEl = document.getElementById('cashFlowStatementComment');
             const eqCommentEl = document.getElementById('equityStatementComment');
             const ratiosWarningEl = document.getElementById('ratiosDataWarning');
             const bsTableEl = document.getElementById('balanceSheetTable');
             const isTableEl = document.getElementById('incomeStatementTable');
             const cfTableEl = document.getElementById('cashFlowStatementTable');
             const eqTableEl = document.getElementById('equityStatementTable');
             
             if(bsTableEl) bsTableEl.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`; else console.error("[DEBUG] bsTableEl not found");
             if(isTableEl) isTableEl.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`; else console.error("[DEBUG] isTableEl not found");
             if(cfTableEl) cfTableEl.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`; else console.error("[DEBUG] cfTableEl not found");
             if(eqTableEl) eqTableEl.innerHTML = `<p class="text-danger">${t_page('noDataForRatios')}</p>`; else console.error("[DEBUG] eqTableEl not found");
             
             if(bsCommentEl) bsCommentEl.textContent = t_page('bs_comment_unbalanced').replace('{diff}', 'N/A');
             if(isCommentEl) isCommentEl.textContent = t_page('is_comment_loss').replace('{profit}', 'N/A');
             if(cfCommentEl) cfCommentEl.textContent = t_page('cf_comment_negative');
             if(eqCommentEl) eqCommentEl.textContent = t_page('eq_comment_decline');
             
             if(ratiosWarningEl) { ratiosWarningEl.textContent = t_page('noDataForRatios'); ratiosWarningEl.style.display = 'block'; }
             ['liquidityRatios', 'profitabilityRatios', 'leverageRatios', 'efficiencyRatios'].forEach(id => { const el = document.getElementById(id); if(el) el.innerHTML = ''; });
        }

         // *** MODIFIED: Use setTimeout to delay translation call ***
         setTimeout(() => {
             if (typeof window.applyTranslations === 'function') {
                 console.log("[DEBUG] Applying translations (report-app.js) via setTimeout...");
                 window.applyTranslations();
             } else {
                 console.error("[!!! DEBUG !!!] applyTranslations function is NOT DEFINED. Check main.js and script order in report.html!");
             }
         }, 100); // Delay of 100ms

         console.log("[DEBUG] Report page initialization finished.");
    };

    // Critical elements check
    if (document.getElementById('balanceSheetTable') && document.getElementById('financialRatiosSection')) {
        init();
    } else {
        console.error("[DEBUG] Critical elements 'balanceSheetTable' or 'financialRatiosSection' were not found. Initialization stopped.");
    }
});
