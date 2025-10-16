document.addEventListener('DOMContentLoaded', () => {

    // --- 1. STATE & CONFIGURATION ---
    const state = {
        trialData: [],
        statements: {}, // Will hold calculated statements
        preferences: {
            theme: localStorage.getItem('theme') || 'light',
            lang: localStorage.getItem('lang') || 'ar',
        }
    };

    // --- 2. TRANSLATION DICTIONARY ---
    const translations = {
        ar: {
            // General
            pageHeader: "القوائم المالية المفصلة",
            pageSubheader: "تقارير احترافية طبقًا للمعايير الدولية مع تعليقات تحليلية ذكية.",
            commentaryTitle: "تعليق تحليلي",
            exportPdf: "تصدير PDF",
            total: "الإجمالي",

            // Balance Sheet (BS)
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

            // Income Statement (IS)
            isTitle: "قائمة الدخل الشامل",
            isSubheader: "تلخص إيرادات ومصروفات الشركة خلال فترة زمنية محددة.",
            revenue: "الإيرادات",
            cogs: "تكلفة المبيعات",
            grossProfit: "مجمل الربح",
            expenses: "المصروفات",
            profitBeforeTax: "الربح قبل الضريبة",
            tax: "الضريبة",
            netProfit: "صافي الربح",
            
            // ... (Add more translations for CF and Equity)
        },
        en: {
            // General
            pageHeader: "Detailed Financial Statements",
            pageSubheader: "Professional IFRS-compliant reports with smart analytical commentary.",
            commentaryTitle: "Analytical Commentary",
            exportPdf: "Export PDF",
            total: "Total",

            // Balance Sheet (BS)
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

            // Income Statement (IS)
            isTitle: "Statement of Comprehensive Income",
            isSubheader: "Summarizes a company's revenues and expenses for a specific period.",
            revenue: "Revenue",
            cogs: "Cost of Goods Sold",
            grossProfit: "Gross Profit",
            expenses: "Expenses",
            profitBeforeTax: "Profit Before Tax",
            tax: "Tax",
            netProfit: "Net Profit",
            
            // ... (Add more translations for CF and Equity)
        }
    };

    // --- 3. UI ELEMENTS CACHE ---
    const UI = {
        themeToggle: document.getElementById('themeToggle'),
        languageSelect: document.getElementById('languageSelect'),
        exportPdfBtn: document.getElementById('exportPdfBtn'),
        // ... Caches for table and comment divs
    };
    
    // --- 4. FINANCIAL STATEMENT ENGINE ---
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
    const t = (key) => translations[state.preferences.lang]?.[key] || key;
    const formatCurrency = (value) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value || 0);

    const loadData = () => {
        state.trialData = JSON.parse(localStorage.getItem('trialData') || '[]');
    };

    const buildStatements = () => {
        const statements = {
            bs: { assets: { current: [], nonCurrent: [] }, liabilities: { current: [], nonCurrent: [] }, equity: [] },
            is: { revenue: [], cogs: [], expenses: [] }
        };

        state.trialData.forEach(row => {
            const value = toNum(row.Debit) - toNum(row.Credit);
            switch (row.MainType) {
                case 'الأصول':
                case 'Assets':
                    if (row.SubType === 'أصل متداول' || row.SubType === 'Current Asset') statements.bs.assets.current.push({ ...row, value });
                    else statements.bs.assets.nonCurrent.push({ ...row, value });
                    break;
                case 'الخصوم':
                case 'Liabilities':
                    if (row.SubType === 'خصم متداول' || row.SubType === 'Current Liability') statements.bs.liabilities.current.push({ ...row, value: -value });
                    else statements.bs.liabilities.nonCurrent.push({ ...row, value: -value });
                    break;
                case 'حقوق الملكية':
                case 'Equity':
                    statements.bs.equity.push({ ...row, value: -value });
                    break;
                case 'قائمة الدخل':
                case 'Income Statement':
                    if (row.SubType === 'الإيرادات' || row.SubType === 'Revenue') statements.is.revenue.push({ ...row, value: -value });
                    else if (row.SubType === 'تكلفة المبيعات' || row.SubType === 'Cost of Goods Sold (COGS)') statements.is.cogs.push({ ...row, value });
                    else statements.is.expenses.push({ ...row, value });
                    break;
            }
        });
        state.statements = statements;
    };

    // --- 5. RENDERING FUNCTIONS ---
    
    const renderStatementTable = (items, totalLabel) => {
        let total = 0;
        let html = '<table class="table table-sm"><tbody>';
        items.forEach(item => {
            html += `<tr><td>${item.Account}</td><td class="text-end">${formatCurrency(item.value)}</td></tr>`;
            total += item.value;
        });
        html += `<tr class="fw-bold"><td>${totalLabel}</td><td class="text-end">${formatCurrency(total)}</td></tr>`;
        html += '</tbody></table>';
        return { html, total };
    };
    
    const renderBalanceSheet = () => {
        const { assets, liabilities, equity } = state.statements.bs;
        let html = `<h6>${t('assets')}</h6>`;
        
        const currentAssets = renderStatementTable(assets.current, t('total') + ' ' + t('currentAssets'));
        const nonCurrentAssets = renderStatementTable(assets.nonCurrent, t('total') + ' ' + t('nonCurrentAssets'));
        const totalAssets = currentAssets.total + nonCurrentAssets.total;
        html += currentAssets.html + nonCurrentAssets.html;
        html += `<table class="table"><tr class="fw-bold table-primary"><td>${t('totalAssets')}</td><td class="text-end">${formatCurrency(totalAssets)}</td></tr></table>`;

        html += `<h6 class="mt-4">${t('liabilities')} & ${t('equity')}</h6>`;
        const currentLiabs = renderStatementTable(liabilities.current, t('total') + ' ' + t('currentLiabilities'));
        const nonCurrentLiabs = renderStatementTable(liabilities.nonCurrent, t('total') + ' ' + t('nonCurrentLiabilities'));
        const totalLiabs = currentLiabs.total + nonCurrentLiabs.total;
        html += currentLiabs.html + nonCurrentLiabs.html;
        html += `<table class="table"><tr class="fw-bold"><td>${t('totalLiabilities')}</td><td class="text-end">${formatCurrency(totalLiabs)}</td></tr></table>`;

        const totalEquity = renderStatementTable(equity, t('totalEquity'));
        html += totalEquity.html;

        const totalLiabsAndEquity = totalLiabs + totalEquity.total;
        html += `<table class="table"><tr class="fw-bold table-primary"><td>${t('totalLiabilitiesAndEquity')}</td><td class="text-end">${formatCurrency(totalLiabsAndEquity)}</td></tr></table>`;

        document.getElementById('balanceSheetTable').innerHTML = html;
        
        // Smart Comment
        const diff = totalAssets - totalLiabsAndEquity;
        const commentDiv = document.getElementById('balanceSheetComment');
        if (Math.abs(diff) < 1) {
            commentDiv.textContent = 'تحليل إيجابي: قائمة المركز المالي متوازنة، مما يعكس دقة البيانات وصحة المعادلة المحاسبية (الأصول = الخصوم + حقوق الملكية).';
        } else {
            commentDiv.textContent = `تحليل يتطلب الانتباه: القائمة غير متوازنة بفارق ${formatCurrency(diff)}. يرجى مراجعة التصنيفات والإدخالات.`;
        }
    };
    
    const renderIncomeStatement = () => {
        const { revenue, cogs, expenses } = state.statements.is;
        let html = '';
        
        const totalRevenue = renderStatementTable(revenue, t('revenue'));
        const totalCogs = renderStatementTable(cogs, t('cogs'));
        const grossProfit = totalRevenue.total - totalCogs.total;
        html += totalRevenue.html + totalCogs.html;
        html += `<table class="table"><tr class="fw-bold"><td>${t('grossProfit')}</td><td class="text-end">${formatCurrency(grossProfit)}</td></tr></table>`;
        
        const totalExpenses = renderStatementTable(expenses, t('expenses'));
        const netProfit = grossProfit - totalExpenses.total;
        html += totalExpenses.html;
        html += `<table class="table"><tr class="fw-bold table-primary"><td>${t('netProfit')}</td><td class="text-end">${formatCurrency(netProfit)}</td></tr></table>`;

        document.getElementById('incomeStatementTable').innerHTML = html;
        
        // Smart Comment
        const commentDiv = document.getElementById('incomeStatementComment');
        if (netProfit > 0) {
            const margin = (netProfit / totalRevenue.total) * 100;
            commentDiv.textContent = `أداء قوي: الشركة تحقق صافي ربح قدره ${formatCurrency(netProfit)} بهامش ربح يبلغ ${margin.toFixed(1)}%. هذا يدل على قدرة الشركة على تحقيق أرباح بعد تغطية جميع تكاليفها.`;
        } else {
            commentDiv.textContent = `تحديات في الربحية: الشركة تسجل صافي خسارة بقيمة ${formatCurrency(netProfit)}. يجب التركيز على زيادة الإيرادات أو خفض التكاليف لتحسين الأداء.`;
        }
    };

    const renderAllStatements = () => {
        renderBalanceSheet();
        renderIncomeStatement();
        // Render CF and Equity here later
    };

    // --- 6. INITIALIZATION & BINDING ---
    const init = () => {
        // ... (Theme, Language, Nav Link logic as before) ...
        UI.exportPdfBtn.addEventListener('click', () => {
            const element = document.getElementById('report-content');
            html2pdf().from(element).save('Financial_Report.pdf');
        });

        loadData();
        buildStatements();
        renderAllStatements();
    };

    init();
});
