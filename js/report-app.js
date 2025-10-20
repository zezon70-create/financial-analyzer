// js/report-app.js

window.pageTranslations = {
    ar: {
        pageTitle: "التقارير المالية المفصلة — المحلل المالي",
        pageHeader: "القوائم المالية المفصلة",
        pageSubheader: "تقارير احترافية طبقًا للمعايير الدولية مع تعليقات تحليلية ذكية.",
        commentaryTitle: "تعليق تحليلي",
        exportPdf: "تصدير PDF",
        exportExcel: "تصدير Excel",
        total: "الإجمالي",
        bsTitle: "قائمة المركز المالي",
        bsSubheader: "تعرض أصول الشركة وخصومها وحقوق ملكيتها في تاريخ محدد.",
        assets: "الأصول",
        currentAssets: "الأصول المتداولة",
        nonCurrentAssets: "الأصول غير المتداولة",
        totalAssets: "إجمالي الأصول",
        liabilities: "الخصوم",
        currentLiabilities: "الخصوم المتداولة",
        nonCurrentLiabilities: "الخصوم غير المتداولة",
        totalLiabilities: "إجمالي الخصوم",
        equity: "حقوق الملكية",
        totalEquity: "إجمالي حقوق الملكية",
        totalLiabilitiesAndEquity: "إجمالي الخصوم وحقوق الملكية",
        bs_comment_balanced: "تحليل إيجابي: قائمة المركز المالي متوازنة، مما يعكس دقة البيانات وصحة المعادلة المحاسبية (الأصول = الخصوم + حقوق الملكية).",
        bs_comment_unbalanced: "تحليل يتطلب الانتباه: القائمة غير متوازنة بفارق {diff}. يرجى مراجعة التصنيفات والإدخالات.",
                isTitle: "قائمة الدخل الشامل",
        isSubheader: "تلخص إيرادات ومصروفات الشركة خلال فترة زمنية محددة.",
        revenue: "الإيرادات",
        cogs: "تكلفة المبيعات",
        grossProfit: "مجمل الربح",
        operatingExpenses: "المصروفات التشغيلية",
        operatingProfit: "الربح التشغيلي",
        netProfit: "صافي الربح",
        is_comment_profit: "أداء قوي: الشركة تحقق صافي ربح قدره {profit} بهامش ربح يبلغ {margin}%. هذا يدل على قدرة الشركة على تحقيق أرباح بعد تغطية جميع تكاليفها.",
        is_comment_loss: "تحديات في الربحية: الشركة تسجل صافي خسارة بقيمة {profit}. يجب التركيز على زيادة الإيرادات أو خفض التكاليف لتحسين الأداء.",
                cfTitle: "قائمة التدفقات النقدية (الطريقة غير المباشرة)",
        cfSubheader: "توضح حركة النقد من الأنشطة التشغيلية والاستثمارية والتمويلية.",
        operatingActivities: "التدفقات النقدية من الأنشطة التشغيلية",
        investingActivities: "التدفقات النقدية من الأنشطة الاستثمارية",
        financingActivities: "التدفقات النقدية من الأنشطة التمويلية",
        netCashFlow: "صافي التغير في النقد",
        cf_comment_positive: "وضع نقدي جيد: الشركة تولد تدفقات نقدية موجبة، مما يعزز سيولتها وقدرتها على الاستثمار وسداد الديون.",
        cf_comment_negative: "مؤشر خطر: صافي التدفق النقدي سالب، مما قد يشير إلى وجود تحديات في السيولة على المدى القصير.",
        eqTitle: "قائمة التغيرات في حقوق الملكية",
        eqSubheader: "توضح التغيرات التي طرأت على حقوق الملكية خلال الفترة.",
        openingBalance: "الرصيد الافتتاحي لحقوق الملكية",
        closingBalance: "الرصيد الختامي لحقوق الملكية",
        eq_comment_growth: "نمو في حقوق المساهمين: حقوق الملكية زادت خلال الفترة، وهو مؤشر إيجابي يعكس نمو قيمة الشركة للمالكين.",
        eq_comment_decline: "انخفاض في حقوق المساهمين: حقوق الملكية انخفضت، وقد يكون ذلك بسبب الخسائر أو توزيعات الأرباح. يتطلب مراجعة.",
    },
    en: {
        pageTitle: "Detailed Financial Statements — Financial Analyzer",
        pageHeader: "Detailed Financial Statements",
        pageSubheader: "Professional IFRS-compliant reports with smart analytical commentary.",
        commentaryTitle: "Analytical Commentary",
        exportPdf: "Export PDF",
        exportExcel: "Export Excel",
        total: "Total",
        bsTitle: "Statement of Financial Position",
        bsSubheader: "Shows the company's assets, liabilities, and equity at a specific date.",
        assets: "Assets",
        currentAssets: "Current Assets",
        nonCurrentAssets: "Non-current Assets",
        totalAssets: "Total Assets",
        liabilities: "Liabilities",
        currentLiabilities: "Current Liabilities",
        nonCurrentLiabilities: "Non-current Liabilities",
        totalLiabilities: "Total Liabilities",
        equity: "Equity",
        totalEquity: "Total Equity",
        totalLiabilitiesAndEquity: "Total Liabilities and Equity",
        bs_comment_balanced: "Positive Analysis: The Statement of Financial Position is balanced, reflecting data accuracy and the validity of the accounting equation.",
        bs_comment_unbalanced: "Action Required: The statement is unbalanced by {diff}. Please review classifications and entries.",
        isTitle: "Statement of Comprehensive Income",
        isSubheader: "Summarizes a company's revenues and expenses for a specific period.",
        revenue: "Revenue",
        cogs: "Cost of Goods Sold",
        grossProfit: "Gross Profit",
        operatingExpenses: "Operating Expenses",
        operatingProfit: "Operating Profit",
        netProfit: "Net Profit",
        is_comment_profit: "Strong Performance: The company achieved a net profit of {profit} with a profit margin of {margin}%. This indicates an ability to generate profit after covering all costs.",
        is_comment_loss: "Profitability Challenges: The company recorded a net loss of {profit}. Focus should be on increasing revenue or reducing costs to improve performance.",
        cfTitle: "Statement of Cash Flows (Indirect Method)",
        cfSubheader: "Shows cash movement from operating, investing, and financing activities.",
        operatingActivities: "Cash Flows from Operating Activities",
        investingActivities: "Cash Flows from Investing Activities",
        financingActivities: "Cash Flows from Financing Activities",
        netCashFlow: "Net Change in Cash",
        cf_comment_positive: "Good Cash Position: The company is generating positive cash flow, enhancing its liquidity, investment capacity, and debt repayment ability.",
        cf_comment_negative: "Risk Indicator: Net cash flow is negative, which may indicate short-term liquidity challenges.",

        eqTitle: "Statement of Changes in Equity",
        eqSubheader: "Shows the changes in equity over the period.",
        openingBalance: "Opening Equity Balance",
        closingBalance: "Closing Equity Balance",
        eq_comment_growth: "Shareholder Value Growth: Equity increased during the period, a positive indicator reflecting growth in the company's value for its owners.",
        eq_comment_decline: "Shareholder Value Decline: Equity has decreased, which could be due to losses or dividend distributions. Requires review.",
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const state = { trialData: [], statements: {} };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || key;
    const formatCurrency = (value) => new Intl.NumberFormat('en-US').format(Math.round(value || 0));
    const buildStatements = () => {
        state.trialData = JSON.parse(localStorage.getItem('trialData') || '[]');
        const financials = {
            assets: { current: [], nonCurrent: [] },
            liabilities: { current: [], nonCurrent: [] },
            equity: { capital: [], retainedEarnings: [] },
            income: { revenue: [], cogs: [], expenses: [] },
        };
        state.trialData.forEach(row => {
            const value = (parseFloat(row.Debit) || 0) - (parseFloat(row.Credit) || 0);
            const mainType = row.MainType || '';
            const subType = row.SubType || '';
            if (mainType.includes('الأصول') || mainType.includes('Assets')) {
                if (subType.includes('متداول') || subType.includes('Current')) financials.assets.current.push({ ...row, value });
                else financials.assets.nonCurrent.push({ ...row, value });
            } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) {
                if (subType.includes('متداول') || subType.includes('Current')) financials.liabilities.current.push({ ...row, value: -value });
                else financials.liabilities.nonCurrent.push({ ...row, value: -value });
            } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) {
                if (subType.includes('رأس المال') || subType.includes('Capital')) financials.equity.capital.push({ ...row, value: -value });
                else financials.equity.retainedEarnings.push({ ...row, value: -value });
            } else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) {
                if (subType.includes('الإيرادات') || subType.includes('Revenue')) financials.income.revenue.push({ ...row, value: -value });
                else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) financials.income.cogs.push({ ...row, value });
                else financials.income.expenses.push({ ...row, value });
            }
        });
        state.statements = financials;
    };
    const renderStatementSection = (items, totalLabel) => {
        let total = 0;
        let html = '<table class="table table-sm report-table"><tbody>';
        items.forEach(item => {
            html += `<tr><td>${item.Account}</td><td class="text-end">${formatCurrency(item.value)}</td></tr>`;
            total += item.value;
        });
        if (totalLabel) {
            html += `<tr class="subtotal-row"><td>${totalLabel}</td><td class="text-end">${formatCurrency(total)}</td></tr>`;
        }
        html += '</tbody></table>';
        return { html, total };
    };
    const renderBalanceSheet = () => {
        const { assets, liabilities, equity } = state.statements;
        let html = `<h6>${t_page('assets')}</h6>`;
        const currentAssets = renderStatementSection(assets.current, `${t_page('total')} ${t_page('currentAssets')}`);
        const nonCurrentAssets = renderStatementSection(assets.nonCurrent, `${t_page('total')} ${t_page('nonCurrentAssets')}`);
        const totalAssets = currentAssets.total + nonCurrentAssets.total;
        html += currentAssets.html + nonCurrentAssets.html;
        html += `<table class="table report-table"><tbody class="total-row"><tr><td>${t_page('totalAssets')}</td><td class="text-end">${formatCurrency(totalAssets)}</td></tr></tbody></table>`;
        html += `<h6 class="mt-4">${t_page('liabilities')} & ${t_page('equity')}</h6>`;
        const currentLiabs = renderStatementSection(liabilities.current, `${t_page('total')} ${t_page('currentLiabilities')}`);
        const nonCurrentLiabs = renderStatementSection(liabilities.nonCurrent, `${t_page('total')} ${t_page('nonCurrentLiabilities')}`);
        const totalLiabs = currentLiabs.total + nonCurrentLiabs.total;
        html += currentLiabs.html + nonCurrentLiabs.html;
        html += `<table class="table report-table"><tbody class="subtotal-row"><tr><td>${t_page('totalLiabilities')}</td><td class="text-end">${formatCurrency(totalLiabs)}</td></tr></tbody></table>`;
              const totalEquity = renderStatementSection(equity.capital.concat(equity.retainedEarnings), t_page('totalEquity'));
        html += totalEquity.html;
        const totalLiabsAndEquity = totalLiabs + totalEquity.total;
        html += `<table class="table report-table"><tbody class="total-row"><tr><td>${t_page('totalLiabilitiesAndEquity')}</td><td class="text-end">${formatCurrency(totalLiabsAndEquity)}</td></tr></tbody></table>`;
        document.getElementById('balanceSheetTable').innerHTML = html;
        const diff = totalAssets - totalLiabsAndEquity;
        const comment = Math.abs(diff) < 1 ? t_page('bs_comment_balanced') : t_page('bs_comment_unbalanced').replace('{diff}', formatCurrency(diff));
        document.getElementById('balanceSheetComment').textContent = comment;
    };
    const renderIncomeStatement = () => {
        const { revenue, cogs, expenses } = state.statements.income;
        let html = '<table class="table table-sm report-table"><tbody>';
        const totalRevenue = renderStatementSection(revenue, t_page('revenue'), true);
        const totalCogs = renderStatementSection(cogs, `(-) ${t_page('cogs')}`, true);
        const grossProfit = totalRevenue.total - totalCogs.total;
        html += totalRevenue.html + totalCogs.html + `<tr class="subtotal-row"><td>${t_page('grossProfit')}</td><td class="text-end">${formatCurrency(grossProfit)}</td></tr>`;    
        const totalExpenses = renderStatementSection(expenses, `(-) ${t_page('operatingExpenses')}`, true);
        const netProfit = grossProfit - totalExpenses.total;
        html += totalExpenses.html + `</tbody></table><table class="table report-table"><tbody class="total-row"><tr><td>${t_page('netProfit')}</td><td class="text-end">${formatCurrency(netProfit)}</td></tr></tbody></table>`;
        document.getElementById('incomeStatementTable').innerHTML = html;
        const margin = totalRevenue.total !== 0 ? (netProfit / totalRevenue.total) * 100 : 0;
        const comment = netProfit > 0 
            ? t_page('is_comment_profit').replace('{profit}', formatCurrency(netProfit)).replace('{margin}', margin.toFixed(1))
            : t_page('is_comment_loss').replace('{profit}', formatCurrency(netProfit));
        document.getElementById('incomeStatementComment').textContent = comment;
    };
     const renderCashFlowStatement = () => {
        const netProfit = (state.statements.income.revenue.reduce((s,r)=>s+r.value,0)) - (state.statements.income.cogs.reduce((s,r)=>s+r.value,0)) - (state.statements.income.expenses.reduce((s,r)=>s+r.value,0));
        let html = `<table class="table table-sm report-table"><tbody><tr><td>${t_page('netProfit')}</td><td class="text-end">${formatCurrency(netProfit)}</td></tr>`;
        html += `<tr class="subtotal-row"><td>${t_page('operatingActivities')}</td><td class="text-end">${formatCurrency(netProfit)}</td></tr>`;
        html += `<tr><td>${t_page('investingActivities')}</td><td class="text-end">0</td></tr>`;
        html += `<tr><td>${t_page('financingActivities')}</td><td class="text-end">0</td></tr>`;
        html += `</tbody></table><table class="table report-table"><tbody class="total-row"><tr><td>${t_page('netCashFlow')}</td><td class="text-end">${formatCurrency(netProfit)}</td></tr></tbody></table>`;
        
        document.getElementById('cashFlowStatementTable').innerHTML = html;
        document.getElementById('cashFlowStatementComment').textContent = netProfit > 0 ? t_page('cf_comment_positive') : t_page('cf_comment_negative');
    };
      const renderEquityStatement = () => {
        const openingEquity = state.statements.equity.capital.reduce((s,r)=>s+r.value, 0);
        const netProfit = (state.statements.income.revenue.reduce((s,r)=>s-r.value,0)) - (state.statements.income.cogs.reduce((s,r)=>s+r.value,0)) - (state.statements.income.expenses.reduce((s,r)=>s+r.value,0));
        const closingEquity = openingEquity + netProfit;
              let html = `<table class="table table-sm report-table"><tbody>`;
        html += `<tr><td>${t_page('openingBalance')}</td><td class="text-end">${formatCurrency(openingEquity)}</td></tr>`;
        html += `<tr><td>(+) ${t_page('netProfit')}</td><td class="text-end">${formatCurrency(netProfit)}</td></tr>`;
        html += `<tr class="total-row"><td>${t_page('closingBalance')}</td><td class="text-end">${formatCurrency(closingEquity)}</td></tr>`;
        html += `</tbody></table>`;
               document.getElementById('equityStatementTable').innerHTML = html;
        document.getElementById('equityStatementComment').textContent = netProfit > 0 ? t_page('eq_comment_growth') : t_page('eq_comment_decline');
    };
    const init = () => {
        document.getElementById('exportPdfBtn').addEventListener('click', () => {
            const element = document.getElementById('report-content');
            const opt = { 
                margin:       0.5,
                filename:     'Financial_Report.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true },
                jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
            };
            html2pdf().from(element).set(opt).save();
        });
        document.getElementById('exportExcelBtn').addEventListener('click', () => {
            const wb = XLSX.utils.book_new();
            const addSheet = (element, sheetName) => {
                if (element) {
                    const ws = XLSX.utils.table_to_sheet(element.querySelector('table'));
                    XLSX.utils.book_append_sheet(wb, ws, sheetName);
                }
            };
            addSheet(document.getElementById('balanceSheetTable'), 'Balance Sheet');
            addSheet(document.getElementById('incomeStatementTable'), 'Income Statement');
            addSheet(document.getElementById('cashFlowStatementTable'), 'Cash Flow');
            addSheet(document.getElementById('equityStatementTable'), 'Equity');
            XLSX.writeFile(wb, "Financial_Statements.xlsx");
        });
              buildStatements();
        renderBalanceSheet();
        renderIncomeStatement();
        renderCashFlowStatement();
        renderEquityStatement();
    };
    init();
});
