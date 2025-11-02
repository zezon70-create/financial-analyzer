// js/report-app.js (MODIFIED to read classifications from upload-app.js)

window.pageTranslations = {
    ar: {
        pageTitle: "التقارير المالية المفصلة — المحلل المالي",
        pageHeader: "القوائم المالية المفصلة",
        pageSubheader: "تقارير احترافية طبقًا للمعايير الدولية مع تعليقات تحليلية ذكية.",
        commentaryTitle: "تعليق تحليلي",
        exportPdf: "تصدير PDF",
        exportExcel: "تصدير Excel",
        total: "الإجمالي",
        noDataMessage: "لا توجد بيانات مالية لعرضها من المصدر المحدد. يرجى إدخال البيانات أولاً أو تغيير المصدر.",
        noPreviousDataMessage: "لم يتم العثور على بيانات فترة سابقة. سيتم عرض بيانات الفترة الحالية فقط.",
        dataSourceTitle: "مصدر البيانات:",
        sourceTrialBalanceLabel: "استخدام ميزان المراجعة (من صفحة الإدخال)",
        sourceUploadedLabel: "استخدام القوائم المالية المرفوعة (من صفحة الرفع)",
        thAccount: "الحساب",
        thCurrentPeriod: "الفترة الحالية",
        thPreviousPeriod: "الفترة السابقة",
        thChangeAbs: "التغير ($)",
        thChangePct: "التغير (%)",
        bsTitle: "قائمة المركز المالي",
        bsSubheader: "تعرض أصول الشركة وخصومها وحقوق ملكيتها في تاريخ محدد.",
        assets: "الأصول",
        currentAssets: "الأصول المتداولة",
        cashAndEquivalents: "النقد وما في حكمه",
        accountsReceivable: "العملاء (المدينون)",
        inventory: "المخزون",
        otherCurrentAssets: "أصول متداولة أخرى",
        totalCurrentAssets: "إجمالي الأصول المتداولة",
        nonCurrentAssets: "الأصول غير المتداولة",
        propertyPlantEquipment: "العقارات والآلات والمعدات (صافي)",
        otherNonCurrentAssets: "أصول غير متداولة أخرى",
        totalNonCurrentAssets: "إجمالي الأصول غير المتداولة",
        totalAssets: "إجمالي الأصول",
        liabilities: "الخصوم",
        currentLiabilities: "الخصوم المتداولة",
        accountsPayable: "الموردون (الدائنون)",
        shortTermLoans: "قروض قصيرة الأجل",
        otherCurrentLiabilities: "خصوم متداولة أخرى",
        totalCurrentLiabilities: "إجمالي الخصوم المتداولة",
        nonCurrentLiabilities: "الخصوم غير المتداولة",
        longTermLoans: "قروض طويلة الأجل",
        otherNonCurrentLiabilities: "خصوم غير متداولة أخرى",
        totalNonCurrentLiabilities: "إجمالي الخصوم غير المتداولة",
        totalLiabilities: "إجمالي الخصوم",
        equity: "حقوق الملكية",
        paidInCapital: "رأس المال المدفوع",
        retainedEarnings: "الأرباح المحتجزة / (الخسائر المرحلة)",
        netProfitForPeriod: "صافي ربح / (خسارة) الفترة",
        totalEquity: "إجمالي حقوق الملكية",
        totalLiabilitiesAndEquity: "إجمالي الخصوم وحقوق الملكية",
        bs_comment_balanced: "تحليل إيجابي: قائمة المركز المالي متوازنة للفترة الحالية.",
        bs_comment_unbalanced: "تحليل يتطلب الانتباه: القائمة غير متوازنة بفارق {diff} للفترة الحالية.",
        bs_comment_growth: "مؤشر نمو: إجمالي الأصول زاد بنسبة {pct} عن الفترة السابقة.",
        bs_comment_decline: "مؤشر انكماش: إجمالي الأصول انخفض بنسبة {pct} عن الفترة السابقة.",
        isTitle: "قائمة الدخل الشامل",
        isSubheader: "تلخص إيرادات ومصروفات الشركة خلال فترة زمنية محددة.",
        revenue: "الإيرادات / المبيعات",
        cogs: "تكلفة الإيرادات / المبيعات",
        grossProfit: "مجمل الربح / (الخسارة)",
        operatingExpenses: "المصروفات التشغيلية",
        generalAdminExpenses: "مصروفات عمومية وإدارية",
        sellingMarketingExpenses: "مصروفات بيع وتسويق",
        depreciationAmortization: "إهلاك واستهلاك",
        otherOperatingExpenses: "مصروفات تشغيلية أخرى",
        operatingProfit: "الربح / (الخسارة) التشغيلي (EBIT)",
        interestExpense: "مصروف الفائدة",
        profitBeforeTax: "الربح / (الخسارة) قبل الضريبة (PBT)",
        taxExpense: "مصروف الضريبة",
        netProfit: "صافي الربح / (الخسارة) للفترة",
        is_comment_profit: "أداء قوي: الشركة تحقق صافي ربح قدره {profit} بهامش ربح يبلغ {margin}%.",
        is_comment_loss: "تحديات في الربحية: الشركة تسجل صافي خسارة بقيمة {profit}.",
        is_comment_revenue_growth: "نمو في الإيرادات: الإيرادات زادت بنسبة {pct} عن الفترة السابقة.",
        is_comment_profit_improvement: "تحسن في الربحية: صافي الربح زاد بشكل ملحوظ عن الفترة السابقة.",
        cfTitle: "قائمة التدفقات النقدية (الطريقة غير المباشرة - تقديرية)",
        cfSubheader: "توضح حركة النقد المقدرة من الأنشطة المختلفة.",
        operatingActivities: "التدفقات النقدية من الأنشطة التشغيلية",
        netIncomeForCF: "صافي الدخل",
        adjustments: "تسويات لبنود غير نقدية:",
        depreciationAmortizationForCF: "إهلاك واستهلاك",
        changesInWorkingCapital: "التغيرات في رأس المال العامل (تقديري)",
        cashFlowFromOperations: "صافي النقد الناتج من الأنشطة التشغيلية",
        investingActivities: "التدفقات النقدية من الأنشطة الاستثمارية",
        capitalExpenditures: "النفقات الرأسمالية (تقديري)",
        cashFlowFromInvesting: "صافي النقد المستخدم في الأنشطة الاستثمارية",
        financingActivities: "التدفقات النقدية من الأنشطة التمويلية",
        cashFlowFromFinancing: "صافي النقد من (المستخدم في) الأنشطة التمويلية",
        netCashFlow: "صافي التغير في النقد وما في حكمه",
        beginningCash: "النقد وما في حكمه أول الفترة",
        endingCash: "النقد وما في حكمه آخر الفترة",
        cf_comment_positive: "وضع نقدي جيد: تشير التقديرات إلى توليد تدفقات نقدية تشغيلية موجبة.",
        cf_comment_negative: "مؤشر خطر: تشير التقديرات إلى تدفق نقدي تشغيلي سالب.",
        cf_comment_wc_source: "رأس المال العامل كان مصدراً للنقد (مثال: تحصيل سريع للعملاء).",
        cf_comment_wc_use: "رأس المال العامل كان استخداماً للنقد (مثال: زيادة المخزون أو بطء التحصيل).",
        eqTitle: "قائمة التغيرات في حقوق الملكية",
        eqSubheader: "توضح التغيرات التي طرأت على حقوق الملكية خلال الفترة.",
        openingBalanceCapital: "رأس المال أول الفترة",
        openingBalanceRetainedEarnings: "أرباح محتجزة أول الفترة",
        totalOpeningEquity: "إجمالي حقوق الملكية أول الفترة",
        netProfitForEquity: "صافي ربح / (خسارة) الفترة",
        dividends: "توزيعات أرباح (تقديري/إن وجدت)",
        closingBalanceCapital: "رأس المال آخر الفترة",
        closingBalanceRetainedEarnings: "أرباح محتجزة آخر الفترة",
        totalClosingEquity: "إجمالي حقوق الملكية آخر الفترة",
        eq_comment_growth: "نمو في حقوق المساهمين: حقوق الملكية زادت خلال الفترة.",
        eq_comment_decline: "انخفاض في حقوق المساهمين: حقوق الملكية انخفضت.",
    },
    en: {
        // *** All English translations... ***
        pageTitle: "Detailed Financial Statements — Financial Analyzer",
        pageHeader: "Detailed Financial Statements",
        pageSubheader: "Professional IFRS-compliant reports with smart analytical commentary.",
        commentaryTitle: "Analytical Commentary",
        exportPdf: "Export PDF", exportExcel: "Export Excel", total: "Total",
        noDataMessage: "No financial data available for the selected source. Please enter data first or change the source.",
        noPreviousDataMessage: "Previous period data not found. Only current period data will be displayed.",
        dataSourceTitle: "Data Source:",
        sourceTrialBalanceLabel: "Use Trial Balance (from Input page)",
        sourceUploadedLabel: "Use Uploaded Statements (from Upload page)",
        thAccount: "Account", thCurrentPeriod: "Current Period", thPreviousPeriod: "Previous Period", thChangeAbs: "Change ($)", thChangePct: "Change (%)",
        bsTitle: "Statement of Financial Position", bsSubheader: "Shows assets, liabilities, and equity.",
        assets: "Assets", currentAssets: "Current Assets", cashAndEquivalents: "Cash & Equivalents", accountsReceivable: "Accounts Receivable", inventory: "Inventory", otherCurrentAssets: "Other Current Assets", totalCurrentAssets: "Total Current Assets", nonCurrentAssets: "Non-current Assets", propertyPlantEquipment: "Property, Plant & Equipment (Net)", otherNonCurrentAssets: "Other Non-current Assets", totalNonCurrentAssets: "Total Non-current Assets", totalAssets: "Total Assets",
        liabilities: "Liabilities", currentLiabilities: "Current Liabilities", accountsPayable: "Accounts Payable", shortTermLoans: "Short-term Loans", otherCurrentLiabilities: "Other Current Liabilities", totalCurrentLiabilities: "Total Current Liabilities", nonCurrentLiabilities: "Non-current Liabilities", longTermLoans: "Long-term Loans", otherNonCurrentLiabilities: "Other Non-current Liabilities", totalNonCurrentLiabilities: "Total Non-current Liabilities", totalLiabilities: "Total Liabilities",
        equity: "Equity", paidInCapital: "Paid-in Capital", retainedEarnings: "Retained Earnings / (Accumulated Deficit)", netProfitForPeriod: "Net Profit / (Loss) for the Period", totalEquity: "Total Equity", totalLiabilitiesAndEquity: "Total Liabilities and Equity",
        bs_comment_balanced: "Positive Analysis: Balanced statement.", bs_comment_unbalanced: "Action Required: Unbalanced by {diff}.",
        bs_comment_growth: "Growth Indicator: Total assets increased by {pct} from the prior period.",
        bs_comment_decline: "Contraction Indicator: Total assets decreased by {pct} from the prior period.",
        isTitle: "Statement of Comprehensive Income", isSubheader: "Summarizes revenues and expenses.",
        revenue: "Revenue / Sales", cogs: "Cost of Revenue / Sales", grossProfit: "Gross Profit / (Loss)", operatingExpenses: "Operating Expenses", generalAdminExpenses: "General & Administrative", sellingMarketingExpenses: "Selling & Marketing", depreciationAmortization: "Depreciation & Amortization", otherOperatingExpenses: "Other Operating Expenses", operatingProfit: "Operating Profit / (Loss) (EBIT)", interestExpense: "Interest Expense", profitBeforeTax: "Profit / (Loss) Before Tax (PBT)", taxExpense: "Tax Expense", netProfit: "Net Profit / (Loss) for the Period",
        is_comment_profit: "Strong Performance: Net profit of {profit}, margin {margin}%.", is_comment_loss: "Profitability Challenges: Net loss of {profit}.",
        is_comment_revenue_growth: "Revenue Growth: Revenue increased by {pct} from the prior period.",
        is_comment_profit_improvement: "Profitability Improvement: Net profit significantly increased from the prior period.",
        cfTitle: "Statement of Cash Flows (Indirect - Est.)", cfSubheader: "Shows estimated cash movement.",
        operatingActivities: "Cash Flows from Operating Activities", netIncomeForCF: "Net Income", adjustments: "Adjustments for non-cash items:", depreciationAmortizationForCF: "Depreciation & Amortization", changesInWorkingCapital: "Changes in Working Capital (Est.)", cashFlowFromOperations: "Net Cash from Operating Activities", investingActivities: "Cash Flows from Investing Activities", capitalExpenditures: "Capital Expenditures (Est.)", cashFlowFromInvesting: "Net Cash used in Investing Activities", financingActivities: "Cash Flows from Financing Activities", cashFlowFromFinancing: "Net Cash from (used in) Financing Activities", netCashFlow: "Net Change in Cash & Equivalents", beginningCash: "Beginning Cash & Equivalents", endingCash: "Ending Cash & Equivalents",
        cf_comment_positive: "Good Cash Position: Estimates indicate positive operating cash flow.",
        cf_comment_negative: "Risk Indicator: Estimates indicate negative operating cash flow.",
        cf_comment_wc_source: "Working capital was a source of cash (e.g., fast collections).",
        cf_comment_wc_use: "Working capital was a use of cash (e.g., inventory build-up).",
        eqTitle: "Statement of Changes in Equity", eqSubheader: "Shows changes in equity.",
        openingBalanceCapital: "Opening Capital Balance", openingBalanceRetainedEarnings: "Opening Retained Earnings", totalOpeningEquity: "Total Opening Equity", netProfitForEquity: "Net Profit / (Loss) for the Period", dividends: "Dividends (Est./If any)", closingBalanceCapital: "Closing Capital Balance", closingBalanceRetainedEarnings: "Closing Retained Earnings", totalClosingEquity: "Total Closing Equity",
        eq_comment_growth: "Shareholder Value Growth: Equity increased.", eq_comment_decline: "Shareholder Value Decline: Equity decreased.",
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("[DEBUG] report-app.js script started execution.");

    const state = {
        trialDataCurrent: null,
        trialDataPrevious: null,
        uploadedDataCurrent: null, // This will be { bs: [], is: [] }
        uploadedDataPrevious: null, // This will be { bs: [], is: [] }
        statementsCurrent: null, 
        statementsPrevious: null, 
        hasDataCurrent: false,
        hasDataPrevious: false
    };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`;
    const formatCurrency = (value, decimals = 0) => {
        if (!isFinite(value)) return "N/A";
         const roundedValue = parseFloat(value.toFixed(decimals));
         if (Math.abs(roundedValue) < Math.pow(10, -decimals) && roundedValue < 0) {
              return (0).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
         }
         return roundedValue.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    };
    const formatChangePercent = (current, previous) => {
        if (typeof current !== 'number' || typeof previous !== 'number') return "N/A";
        if (previous === 0) {
            if (current > 0) return "New";
            if (current === 0) return "0.0%";
            return "N/A";
        }
        const change = (current - previous) / Math.abs(previous);
        const sign = change > 0 ? '+' : '';
        return sign + (change * 100).toFixed(1) + '%';
    };


    // --- Data Loading and Processing Logic ---

    // --- ▼▼▼ دالة جديدة: معالجة البيانات المرفوعة بالتصنيفات ▼▼▼ ---
    const processUploadedData = (uploadedData) => {
        try {
            console.log("Processing uploaded data with classifications...");
            if (!uploadedData || (!uploadedData.bs && !uploadedData.is)) {
                 console.warn("Uploaded data is empty or invalid format.");
                 return null;
            }
            
            // دي التصنيفات اللي بنحولها من (opt_cash) لاسم الحساب الصح
            const classificationMap = {
                // BS - Assets
                'opt_cash': 'cashEquivalents',
                'opt_receivables': 'accountsReceivable',
                'opt_inventory': 'inventory',
                'opt_otherCurrentAssets': 'otherCurrentAssets',
                'opt_fixedAssets': 'propertyPlantEquipment',
                'opt_otherNonCurrentAssets': 'otherNonCurrentAssets',
                // BS - Liabilities
                'opt_payables': 'accountsPayable',
                'opt_shortTermDebt': 'shortTermLoans',
                'opt_otherCurrentLiabilities': 'otherCurrentLiabilities',
                'opt_longTermDebt': 'longTermLoans',
                'opt_otherNonCurrentLiabilities': 'otherNonCurrentLiabilities',
                // BS - Equity
                'opt_equity': 'paidInCapital', // سنفترض أن أي بند حقوق ملكية هو رأس مال
                // IS
                'opt_revenue': 'revenue',
                'opt_cogs': 'cogs',
                'opt_operatingExpense': 'operatingExpenses', // ده اسم عام
                'opt_depreciation': 'depreciationAmortization',
                'opt_interestExpense': 'interestExpense',
                'opt_taxExpense': 'taxExpense',
                'opt_otherRevenue': 'otherRevenue', // (غير مستخدم حالياً في الحسابات بس موجود)
                'opt_otherExpense': 'otherOperatingExpenses' // هنضيفه على المصروفات التشغيلية
            };

            const statements = {
                bs: { currentAssets: [], nonCurrentAssets: [], currentLiabilities: [], nonCurrentLiabilities: [], equityCapital: [], equityRetainedEarnings: 0 },
                is: { revenue: [], cogs: [], genAdminExpenses: [], sellingMarketingExpenses: [], depreciationAmortization: [], otherOperatingExpenses: [], interestExpense: [], taxExpense: [] },
                totals: {}
            };
            const totals = statements.totals;
            
            // تهيئة المجاميع بصفر
            Object.assign(totals, {
                totalCurrentAssets: 0, totalNonCurrentAssets: 0, totalAssets: 0,
                totalCurrentLiabilities: 0, totalNonCurrentLiabilities: 0, totalLiabilities: 0,
                totalEquityCapital: 0, totalEquity: 0, totalLiabilitiesAndEquity: 0,
                totalRevenue: 0, totalCogs: 0, grossProfit: 0, 
                totalOperatingExpenses: 0, operatingProfit: 0, 
                profitBeforeTax: 0, totalTax: 0, netProfit: 0,
                cashEquivalents: 0, accountsReceivable: 0, inventory: 0, accountsPayable: 0, shortTermDebt: 0,
                purchases: 0, depreciationTotal: 0, totalInterest: 0, ebit: 0, workingCapital: 0, retainedEarnings: 0
            });

            // --- معالجة الميزانية (BS) ---
            if (uploadedData.bs) {
                uploadedData.bs.forEach(item => {
                    const classification = classificationMap[item.Classification];
                    if (!classification) return; // تجاهل البنود غير المصنفة

                    const accountItem = { account: item.Account, value: item.Value || 0 };

                    switch (classification) {
                        case 'cashEquivalents':
                            statements.bs.currentAssets.push(accountItem);
                            totals.cashEquivalents += accountItem.value;
                            break;
                        case 'accountsReceivable':
                            statements.bs.currentAssets.push(accountItem);
                            totals.accountsReceivable += accountItem.value;
                            break;
                        case 'inventory':
                            statements.bs.currentAssets.push(accountItem);
                            totals.inventory += accountItem.value;
                            break;
                        case 'otherCurrentAssets':
                            statements.bs.currentAssets.push(accountItem);
                            break;
                        case 'propertyPlantEquipment':
                            statements.bs.nonCurrentAssets.push(accountItem);
                            break;
                        case 'otherNonCurrentAssets':
                            statements.bs.nonCurrentAssets.push(accountItem);
                            break;
                        case 'accountsPayable':
                            statements.bs.currentLiabilities.push(accountItem);
                            totals.accountsPayable += accountItem.value;
                            break;
                        case 'shortTermLoans':
                            statements.bs.currentLiabilities.push(accountItem);
                            totals.shortTermDebt += accountItem.value;
                            break;
                        case 'otherCurrentLiabilities':
                            statements.bs.currentLiabilities.push(accountItem);
                            break;
                        case 'longTermLoans':
                            statements.bs.nonCurrentLiabilities.push(accountItem);
                            break;
                        case 'otherNonCurrentLiabilities':
                            statements.bs.nonCurrentLiabilities.push(accountItem);
                            break;
                        case 'paidInCapital':
                            statements.bs.equityCapital.push(accountItem);
                            break;
                    }
                });
            }

            // --- معالجة قائمة الدخل (IS) ---
            if (uploadedData.is) {
                uploadedData.is.forEach(item => {
                    const classification = classificationMap[item.Classification];
                    if (!classification) return;

                    const accountItem = { account: item.Account, value: item.Value || 0 };

                    switch (classification) {
                        case 'revenue':
                            statements.is.revenue.push(accountItem);
                            break;
                        case 'cogs':
                            statements.is.cogs.push(accountItem);
                            break;
                        case 'operatingExpenses':
                            // هنقسم المصروفات التشغيلية
                            if (item.Account.toLowerCase().includes('sell') || item.Account.includes('بيع') || item.Account.includes('تسويق')) {
                                statements.is.sellingMarketingExpenses.push(accountItem);
                            } else {
                                statements.is.genAdminExpenses.push(accountItem);
                            }
                            break;
                        case 'depreciationAmortization':
                            statements.is.depreciationAmortization.push(accountItem);
                            break;
                        case 'interestExpense':
                            statements.is.interestExpense.push(accountItem);
                            break;
                        case 'taxExpense':
                            statements.is.taxExpense.push(accountItem);
                            break;
                        case 'otherOperatingExpenses':
                            statements.is.otherOperatingExpenses.push(accountItem);
                            break;
                    }
                });
            }

            // --- حساب المجاميع من البيانات المصنفة ---
            const sumValues = (arr) => arr.reduce((sum, item) => sum + (item.value || 0), 0);
            
            // مجاميع الميزانية
            totals.totalCurrentAssets = totals.cashEquivalents + totals.accountsReceivable + totals.inventory + sumValues(statements.bs.currentAssets.filter(item => !['cashEquivalents', 'accountsReceivable', 'inventory'].includes(classificationMap[item.Classification])));
            totals.totalNonCurrentAssets = sumValues(statements.bs.nonCurrentAssets);
            totals.totalAssets = totals.totalCurrentAssets + totals.totalNonCurrentAssets;

            totals.totalCurrentLiabilities = totals.accountsPayable + totals.shortTermDebt + sumValues(statements.bs.currentLiabilities.filter(item => !['accountsPayable', 'shortTermDebt'].includes(classificationMap[item.Classification])));
            totals.totalNonCurrentLiabilities = sumValues(statements.bs.nonCurrentLiabilities);
            totals.totalLiabilities = totals.totalCurrentLiabilities + totals.totalNonCurrentLiabilities;

            // مجاميع قائمة الدخل
            totals.totalRevenue = sumValues(statements.is.revenue);
            totals.totalCogs = sumValues(statements.is.cogs);
            totals.grossProfit = totals.totalRevenue - totals.totalCogs;
            
            totals.depreciationTotal = sumValues(statements.is.depreciationAmortization);
            totals.totalOperatingExpenses = 
                sumValues(statements.is.genAdminExpenses) +
                sumValues(statements.is.sellingMarketingExpenses) +
                totals.depreciationTotal +
                sumValues(statements.is.otherOperatingExpenses);

            totals.operatingProfit = totals.grossProfit - totals.totalOperatingExpenses;
            totals.ebit = totals.operatingProfit; // EBIT = Operating Profit
            
            totals.totalInterest = sumValues(statements.is.interestExpense); 
            totals.profitBeforeTax = totals.operatingProfit - totals.totalInterest;
            totals.totalTax = sumValues(statements.is.taxExpense);
            totals.netProfit = totals.profitBeforeTax - totals.totalTax;

            // مجاميع حقوق الملكية
            totals.totalEquityCapital = sumValues(statements.bs.equityCapital);
            // هنفترض إن أي حقوق ملكية تانية هي أرباح محتجزة (افتراض مبسط لغير المحاسب)
            const otherEquity = sumValues(uploadedData.bs.filter(item => item.Classification === 'opt_equity' && !classificationMap[item.Classification]));
            statements.bs.equityRetainedEarnings = otherEquity + totals.netProfit; // رصيد آخر المدة = رصيد أول + صافي الربح
            totals.retainedEarnings = statements.bs.equityRetainedEarnings; // رصيد آخر المدة
            totals.totalEquity = totals.totalEquityCapital + statements.bs.equityRetainedEarnings;
            totals.totalLiabilitiesAndEquity = totals.totalLiabilities + totals.totalEquity;

            // مجاميع إضافية للتحليلات
            totals.workingCapital = totals.totalCurrentAssets - totals.totalCurrentLiabilities;
            totals.purchases = totals.totalCogs; // افتراض مبسط لعدم وجود بيانات مخزون
            
            console.log("Successfully processed uploaded data (New Method).", statements);
            return statements; // Return the processed object
        } catch (error) {
            console.error("Error processing uploaded data:", error);
            return null; // Return null on failure
        }
    };
    // --- ▲▲▲ نهاية الدالة الجديدة ▲▲▲ ---


    const buildStatementsFromTrialData = (trialDataArray) => {
        // *** FIX: Reset statements object *before* accessing totals ***
        const statements = {
            bs: { currentAssets: [], nonCurrentAssets: [], currentLiabilities: [], nonCurrentLiabilities: [], equityCapital: [], equityRetainedEarnings: 0 },
            is: { revenue: [], cogs: [], genAdminExpenses: [], sellingMarketingExpenses: [], depreciationAmortization: [], otherOperatingExpenses: [], interestExpense: [], taxExpense: [] },
            totals: {}
        };
        const totals = statements.totals;
        
        Object.assign(totals, {
            totalCurrentAssets: 0, totalNonCurrentAssets: 0, totalAssets: 0,
            totalCurrentLiabilities: 0, totalNonCurrentLiabilities: 0, totalLiabilities: 0,
            totalEquityCapital: 0, totalEquity: 0, totalLiabilitiesAndEquity: 0,
            totalRevenue: 0, totalCogs: 0, grossProfit: 0, 
            totalOperatingExpenses: 0, operatingProfit: 0, 
            profitBeforeTax: 0, totalTax: 0, netProfit: 0,
            cashEquivalents: 0, accountsReceivable: 0, inventory: 0, accountsPayable: 0, shortTermDebt: 0,
            purchases: 0, depreciationTotal: 0, totalInterest: 0, ebit: 0, workingCapital: 0, retainedEarnings: 0
        });

        if (!trialDataArray || trialDataArray.length === 0) {
            console.error("buildStatementsFromTrialData called but trialDataArray is empty.");
            return null;
        }

        try {
            trialDataArray.forEach(row => {
                const value = (parseFloat(row.Debit) || 0) - (parseFloat(row.Credit) || 0);
                const mainType = row.MainType || '';
                const subType = row.SubType || '';
                const accountName = (row.Account || '').toLowerCase();
                const account = row.Account || 'Unknown';
                const item = { account, value }; 

                // *** FIX: Use statements.bs, not state.statements.bs ***
                if (mainType.includes('الأصول') || mainType.includes('Assets')) {
                    if (subType.includes('متداول') || subType.includes('Current')) {
                        statements.bs.currentAssets.push(item); // FIX
                        totals.totalCurrentAssets += value;
                        if (accountName.includes('cash') || accountName.includes('نقد') || accountName.includes('bank') || accountName.includes('بنك')) { totals.cashEquivalents += value; }
                        if (accountName.includes('receivable') || accountName.includes('عملاء')) { totals.accountsReceivable += value; }
                        if (accountName.includes('inventory') || accountName.includes('مخزون')) { totals.inventory += value; }
                    } else {
                        statements.bs.nonCurrentAssets.push(item); // FIX
                        totals.totalNonCurrentAssets += value;
                    }
                } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) {
                     item.value = -value;
                     if (subType.includes('متداول') || subType.includes('Current')) {
                         statements.bs.currentLiabilities.push(item); // FIX
                         totals.totalCurrentLiabilities += item.value;
                         if (accountName.includes('payable') || accountName.includes('مورد')) { totals.accountsPayable += item.value; }
                         if (accountName.includes('loan') || accountName.includes('قرض قصير')) { totals.shortTermDebt += item.value; }
                     } else {
                         statements.bs.nonCurrentLiabilities.push(item); // FIX
                         totals.totalNonCurrentLiabilities += item.value;
                     }
                } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) {
                     item.value = -value;
                     if (subType.includes('رأس المال') || subType.includes('Capital') || accountName.includes('capital') || accountName.includes('رأس المال')) {
                        statements.bs.equityCapital.push(item); // FIX
                        totals.totalEquityCapital += item.value;
                     } else if (subType.includes('الأرباح المحتجزة') || subType.includes('Retained Earnings') || accountName.includes('retained')) {
                         statements.bs.equityRetainedEarnings = item.value; // OPENING RE
                     } else {
                          statements.bs.equityCapital.push(item); // FIX
                          totals.totalEquityCapital += item.value;
                     }
                }
                else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) {
                     if (subType.includes('الإيرادات') || subType.includes('Revenue')) {
                         item.value = -value;
                         statements.is.revenue.push(item); // FIX
                         totals.totalRevenue += item.value;
                     } else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) {
                         statements.is.cogs.push(item); // FIX
                         totals.totalCogs += value;
                     } else if (subType.includes('مشتريات') || subType.includes('Purchases') || accountName.includes('purchase')) {
                         totals.purchases += value;
                     } else {
                          if (subType.includes('إهلاك') || subType.includes('Depreciation') || accountName.includes('depreciation') || accountName.includes('amortization')) {
                              statements.is.depreciationAmortization.push(item); // FIX
                              totals.depreciationTotal += value;
                          } else if (subType.includes('فائدة') || subType.includes('Interest') || accountName.includes('interest')) {
                              statements.is.interestExpense.push(item); // FIX
                              totals.totalInterest += value;
                          } else if (subType.includes('ضريب') || subType.includes('Tax') || accountName.includes('tax')) {
                               statements.is.taxExpense.push(item); // FIX
                               totals.totalTax += value;
                          } else if (subType.includes('بيع') || subType.includes('Selling') || subType.includes('Marketing') || accountName.includes('selling') || accountName.includes('marketing')) {
                              statements.is.sellingMarketingExpenses.push(item); // FIX
                          } else if (subType.includes('إداري') || subType.includes('General') || subType.includes('Admin') || accountName.includes('general') || accountName.includes('admin')) {
                              statements.is.genAdminExpenses.push(item); // FIX
                          } else {
                              statements.is.otherOperatingExpenses.push(item); // FIX
                          }
                     }
                }
            });

            // --- Calculate Totals and Subtotals ---
            totals.totalAssets = totals.totalCurrentAssets + totals.totalNonCurrentAssets;
            totals.totalLiabilities = totals.totalCurrentLiabilities + totals.totalNonCurrentLiabilities;
            totals.grossProfit = totals.totalRevenue - totals.totalCogs;
            
            totals.totalOperatingExpenses = 
                (statements.is.genAdminExpenses.reduce((s, i) => s + i.value, 0)) +
                (statements.is.sellingMarketingExpenses.reduce((s, i) => s + i.value, 0)) +
                (totals.depreciationTotal || 0) +
                (statements.is.otherOperatingExpenses.reduce((s, i) => s + i.value, 0));

            totals.operatingProfit = totals.grossProfit - totals.totalOperatingExpenses;
            totals.profitBeforeTax = totals.operatingProfit - totals.totalInterest;
            totals.netProfit = totals.profitBeforeTax - totals.totalTax;
            
            statements.bs.equityRetainedEarnings += totals.netProfit; // Closing RE = Opening RE + Net Profit
            totals.retainedEarnings = statements.bs.equityRetainedEarnings; // Save closing RE
            totals.totalEquity = totals.totalEquityCapital + statements.bs.equityRetainedEarnings;
            totals.totalLiabilitiesAndEquity = totals.totalLiabilities + totals.totalEquity;

            totals.workingCapital = totals.totalCurrentAssets - totals.totalCurrentLiabilities;
            totals.ebit = totals.operatingProfit;
            if (totals.purchases === 0 && totals.totalCogs > 0) totals.purchases = totals.totalCogs; // Proxy

            console.log("Processed Statements Data from Trial Balance:", statements);
            return statements; // Return the processed object
        } catch (e) {
            console.error("Error during trial data processing loop:", e);
            return null; // Return null on failure
        }
    };

    const loadDataAndPrepareStatements = () => {
        state.hasDataCurrent = false; 
        state.hasDataPrevious = false;
        state.statementsCurrent = null;
        state.statementsPrevious = null;
        
        const selectedSource = document.querySelector('input[name="dataSource"]:checked')?.value || 'trialData';
        console.log(`[DEBUG] Selected data source: ${selectedSource}`);

        const load = (sourceKey, processFunction) => {
            const dataString = localStorage.getItem(sourceKey);
            if (!dataString) {
                console.warn(`[DEBUG] ${sourceKey} not found in localStorage.`);
                return null;
            }
            try {
                const parsedData = JSON.parse(dataString);

                // --- ▼▼▼ تعديل: تعديل الشرط لبيانات الرفع الجديدة ▼▼▼ ---
                if (selectedSource === 'uploadedData') {
                     // الشرط الجديد: هل البيانات عبارة عن كائن يحتوي على (bs) أو (is)؟
                     if (parsedData && (Array.isArray(parsedData.bs) || Array.isArray(parsedData.is))) {
                        console.log(`[DEBUG] Found valid ${sourceKey}, processing...`);
                        return processFunction(parsedData); 
                    }
                // --- ▲▲▲ نهاية التعديل ▲▲▲ ---
                } else { // trialData
                     if (Array.isArray(parsedData) && parsedData.length > 0 && !(parsedData.length === 1 && !parsedData[0].Account && !toNum(parsedData[0].Debit) && !toNum(parsedData[0].Credit))) {
                        console.log(`[DEBUG] Found valid ${sourceKey}, building statements...`);
                        return processFunction(parsedData); 
                     }
                }
                console.warn(`[DEBUG] ${sourceKey} found but is empty or invalid.`);
                return null;
            } catch (e) {
                console.error(`Error parsing ${sourceKey}:`, e);
                return null;
            }
        };

        if (selectedSource === 'uploadedData') {
            state.statementsCurrent = load('uploadedFinancialData', processUploadedData); // <-- الدالة الجديدة
            state.statementsPrevious = load('uploadedFinancialDataPrevious', processUploadedData); // <-- الدالة الجديدة
        } else {
            state.statementsCurrent = load('trialData', buildStatementsFromTrialData);
            state.statementsPrevious = load('trialDataPrevious', buildStatementsFromTrialData);
        }

        state.hasDataCurrent = !!state.statementsCurrent; 
        state.hasDataPrevious = !!state.statementsPrevious; 

        // *** حفظ المخرجات النظيفة لصفحة advanced ***
        if (state.hasDataCurrent) {
            try {
                localStorage.setItem('financialDataCurrent', JSON.stringify(state.statementsCurrent));
                console.log("[DEBUG] Saved processed 'financialDataCurrent' to localStorage.");
            } catch (e) { console.error("Failed to save financialDataCurrent:", e); }
        } else {
            localStorage.removeItem('financialDataCurrent'); 
        }
        
        if (state.hasDataPrevious) {
             try {
                localStorage.setItem('financialDataPrevious', JSON.stringify(state.statementsPrevious));
                console.log("[DEBUG] Saved processed 'financialDataPrevious' to localStorage.");
            } catch (e) { console.error("Failed to save financialDataPrevious:", e); }
        } else {
            localStorage.removeItem('financialDataPrevious'); 
        }

        return state.hasDataCurrent; 
    };


    // --- Rendering Functions ---

    const renderComparativeSection = (itemsCurrent = [], itemsPrevious = [], sectionTitle, totalLabel, cssClass = '', decimals = 0) => {
        let sectionTotalCurrent = 0;
        let sectionTotalPrevious = 0;
        let html = '';
        if (!Array.isArray(itemsCurrent)) itemsCurrent = [];
        if (!Array.isArray(itemsPrevious)) itemsPrevious = [];
        
        const allAccountNames = new Set([
            ...itemsCurrent.map(i => i.account),
            ...itemsPrevious.map(i => i.account)
        ]);
        
        const prevItemsMap = new Map(itemsPrevious.map(item => [item.account, item.value]));

        if (allAccountNames.size > 0 || sectionTitle) {
            html += `<tr class="section-header ${cssClass}"><td colspan="${state.hasDataPrevious ? 5 : 2}"><strong>${sectionTitle || ''}</strong></td></tr>`;
        }

        allAccountNames.forEach(account => {
            const currentItem = itemsCurrent.find(i => i.account === account);
            const currentValue = currentItem ? currentItem.value : 0;
            const previousValue = prevItemsMap.get(account) || 0;
            const changeAbs = currentValue - previousValue;
            
            html += `<tr>
                        <td class="ps-3">${account}</td>
                        <td class="text-end">${formatCurrency(currentValue, decimals)}</td>
                        ${state.hasDataPrevious ? `
                        <td class="text-end">${formatCurrency(previousValue, decimals)}</td>
                        <td class="text-end">${formatCurrency(changeAbs, decimals)}</td>
                        <td class="text-end ${changeAbs > 0 ? 'text-success' : (changeAbs < 0 ? 'text-danger' : '')}">${formatChangePercent(currentValue, previousValue)}</td>
                        ` : ''}
                     </tr>`;
            sectionTotalCurrent += currentValue;
            sectionTotalPrevious += previousValue;
        });

        if (totalLabel && allAccountNames.size > 0) {
             const totalChangeAbs = sectionTotalCurrent - sectionTotalPrevious;
             const totalChangePct = formatChangePercent(sectionTotalCurrent, sectionTotalPrevious);
             html += `<tr class="subtotal-row ${cssClass}">
                        <td>${totalLabel}</td>
                        <td class="text-end">${formatCurrency(sectionTotalCurrent, decimals)}</td>
                        ${state.hasDataPrevious ? `
                        <td class="text-end">${formatCurrency(sectionTotalPrevious, decimals)}</td>
                        <td class="text-end">${formatCurrency(totalChangeAbs, decimals)}</td>
                        <td class="text-end ${totalChangeAbs > 0 ? 'text-success' : (totalChangeAbs < 0 ? 'text-danger' : '')}">${totalChangePct}</td>
                        ` : ''}
                     </tr>`;
        }
        return { html, totalCurrent: sectionTotalCurrent, totalPrevious: sectionTotalPrevious };
    };

    const renderBalanceSheet = () => {
        const stmtCurrent = state.statementsCurrent;
        const stmtPrevious = state.statementsPrevious;
        
        const bsCurrent = stmtCurrent?.bs || { currentAssets: [], nonCurrentAssets: [], currentLiabilities: [], nonCurrentLiabilities: [], equityCapital: [] };
        const totalsCurrent = stmtCurrent?.totals || {};
        const bsPrevious = stmtPrevious?.bs || { currentAssets: [], nonCurrentAssets: [], currentLiabilities: [], nonCurrentLiabilities: [], equityCapital: [] };
        const totalsPrevious = stmtPrevious?.totals || {};

        let html = '<table class="table table-sm report-table"><thead><tr>';
        html += `<th>${t_page('thAccount')}</th>`;
        html += `<th class="text-end">${t_page('thCurrentPeriod')}</th>`;
        if (state.hasDataPrevious) {
            html += `<th class="text-end">${t_page('thPreviousPeriod')}</th>`;
            html += `<th class="text-end">${t_page('thChangeAbs')}</th>`;
            html += `<th class="text-end">${t_page('thChangePct')}</th>`;
        }
        html += '</tr></thead><tbody>';

        // Assets
        // --- ▼▼▼ تعديل: استخدام المجاميع المحسوبة بدلاً من دالة renderComparativeSection ▼▼▼
        // (ده هيضمن إن البنود المصنفة تظهر صح)
        const caHtml = renderComparativeSection(bsCurrent.currentAssets, bsPrevious.currentAssets, t_page('currentAssets'), null, 'assets-section');
        const ncaHtml = renderComparativeSection(bsCurrent.nonCurrentAssets, bsPrevious.nonCurrentAssets, t_page('nonCurrentAssets'), null, 'assets-section');
        html += caHtml.html;
        html += `<tr class="subtotal-row assets-section"><td>${t_page('totalCurrentAssets')}</td><td class="text-end">${formatCurrency(totalsCurrent.totalCurrentAssets)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(totalsPrevious.totalCurrentAssets)}</td><td class="text-end">${formatCurrency(totalsCurrent.totalCurrentAssets - totalsPrevious.totalCurrentAssets)}</td><td class="text-end">${formatChangePercent(totalsCurrent.totalCurrentAssets, totalsPrevious.totalCurrentAssets)}</td>` : ''}</tr>`;
        html += ncaHtml.html;
        html += `<tr class="subtotal-row assets-section"><td>${t_page('totalNonCurrentAssets')}</td><td class="text-end">${formatCurrency(totalsCurrent.totalNonCurrentAssets)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(totalsPrevious.totalNonCurrentAssets)}</td><td class="text-end">${formatCurrency(totalsCurrent.totalNonCurrentAssets - totalsPrevious.totalNonCurrentAssets)}</td><td class="text-end">${formatChangePercent(totalsCurrent.totalNonCurrentAssets, totalsPrevious.totalNonCurrentAssets)}</td>` : ''}</tr>`;
        // --- ▲▲▲ نهاية التعديل ▲▲▲ ---
        
        html += `<tr class="total-row assets-section">
                    <td>${t_page('totalAssets')}</td>
                    <td class="text-end">${formatCurrency(totalsCurrent.totalAssets)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(totalsPrevious.totalAssets)}</td>
                    <td class="text-end">${formatCurrency((totalsCurrent.totalAssets || 0) - (totalsPrevious.totalAssets || 0))}</td>
                    <td class="text-end ${((totalsCurrent.totalAssets || 0) - (totalsPrevious.totalAssets || 0)) >= 0 ? 'text-success' : 'text-danger'}">${formatChangePercent(totalsCurrent.totalAssets, totalsPrevious.totalAssets)}</td>
                    ` : ''}
                 </tr>`;

        // Liabilities
        const clHtml = renderComparativeSection(bsCurrent.currentLiabilities, bsPrevious.currentLiabilities, t_page('currentLiabilities'), null, 'liabilities-section');
        const nclHtml = renderComparativeSection(bsCurrent.nonCurrentLiabilities, bsPrevious.nonCurrentLiabilities, t_page('nonCurrentLiabilities'), null, 'liabilities-section');
        html += clHtml.html;
        html += `<tr class="subtotal-row liabilities-section"><td>${t_page('totalCurrentLiabilities')}</td><td class="text-end">${formatCurrency(totalsCurrent.totalCurrentLiabilities)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(totalsPrevious.totalCurrentLiabilities)}</td><td class="text-end">${formatCurrency(totalsCurrent.totalCurrentLiabilities - totalsPrevious.totalCurrentLiabilities)}</td><td class="text-end">${formatChangePercent(totalsCurrent.totalCurrentLiabilities, totalsPrevious.totalCurrentLiabilities)}</td>` : ''}</tr>`;
        html += nclHtml.html;
        html += `<tr class="subtotal-row liabilities-section"><td>${t_page('totalNonCurrentLiabilities')}</td><td class="text-end">${formatCurrency(totalsCurrent.totalNonCurrentLiabilities)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(totalsPrevious.totalNonCurrentLiabilities)}</td><td class="text-end">${formatCurrency(totalsCurrent.totalNonCurrentLiabilities - totalsPrevious.totalNonCurrentLiabilities)}</td><td class="text-end">${formatChangePercent(totalsCurrent.totalNonCurrentLiabilities, totalsPrevious.totalNonCurrentLiabilities)}</td>` : ''}</tr>`;

        html += `<tr class="subtotal-row liabilities-section">
                    <td>${t_page('totalLiabilities')}</td>
                    <td class="text-end">${formatCurrency(totalsCurrent.totalLiabilities)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(totalsPrevious.totalLiabilities)}</td>
                    <td class="text-end">${formatCurrency((totalsCurrent.totalLiabilities || 0) - (totalsPrevious.totalLiabilities || 0))}</td>
                    <td class="text-end ${((totalsCurrent.totalLiabilities || 0) - (totalsPrevious.totalLiabilities || 0)) >= 0 ? 'text-danger' : 'text-success'}">${formatChangePercent(totalsCurrent.totalLiabilities, totalsPrevious.totalLiabilities)}</td>
                    ` : ''}
                 </tr>`;

        // Equity
        const eqCapHtml = renderComparativeSection(bsCurrent.equityCapital, bsPrevious.equityCapital, t_page('equity'), null, 'equity-section');
        html += eqCapHtml.html;
        const reCurrent = totalsCurrent.retainedEarnings || 0; // استخدام الرصيد المحسوب
        const rePrevious = totalsPrevious.retainedEarnings || 0; // استخدام الرصيد المحسوب
        const reChangeAbs = reCurrent - rePrevious;
        html += `<tr>
                    <td class="ps-3">${t_page('retainedEarnings')}</td>
                    <td class="text-end">${formatCurrency(reCurrent)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(rePrevious)}</td>
                    <td class="text-end">${formatCurrency(reChangeAbs)}</td>
                    <td class="text-end ${reChangeAbs >= 0 ? 'text-success' : 'text-danger'}">${formatChangePercent(reCurrent, rePrevious)}</td>
                    ` : ''}
                 </tr>`;
        html += `<tr class="subtotal-row equity-section">
                    <td>${t_page('totalEquity')}</td>
                    <td class="text-end">${formatCurrency(totalsCurrent.totalEquity)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(totalsPrevious.totalEquity)}</td>
                    <td class="text-end">${formatCurrency((totalsCurrent.totalEquity || 0) - (totalsPrevious.totalEquity || 0))}</td>
                    <td class="text-end ${((totalsCurrent.totalEquity || 0) - (totalsPrevious.totalEquity || 0)) >= 0 ? 'text-success' : 'text-danger'}">${formatChangePercent(totalsCurrent.totalEquity, totalsPrevious.totalEquity)}</td>
                    ` : ''}
                 </tr>`;
        
        html += `<tr class="total-row equity-section">
                    <td>${t_page('totalLiabilitiesAndEquity')}</td>
                    <td class="text-end">${formatCurrency(totalsCurrent.totalLiabilitiesAndEquity)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(totalsPrevious.totalLiabilitiesAndEquity)}</td>
                    <td class="text-end">${formatCurrency((totalsCurrent.totalLiabilitiesAndEquity || 0) - (totalsPrevious.totalLiabilitiesAndEquity || 0))}</td>
                    <td class="text-end ${((totalsCurrent.totalLiabilitiesAndEquity || 0) - (totalsPrevious.totalLiabilitiesAndEquity || 0)) >= 0 ? 'text-success' : 'text-danger'}">${formatChangePercent(totalsCurrent.totalLiabilitiesAndEquity, totalsPrevious.totalLiabilitiesAndEquity)}</td>
                    ` : ''}
                 </tr>`;

        html += '</tbody></table>';
        document.getElementById('balanceSheetTable').innerHTML = html;

        // Commentary
        const diff = (totalsCurrent.totalAssets || 0) - (totalsCurrent.totalLiabilitiesAndEquity || 0);
        let comment = Math.abs(diff) < 1 ? t_page('bs_comment_balanced') : t_page('bs_comment_unbalanced').replace('{diff}', formatCurrency(diff));
        if (state.hasDataPrevious && (totalsPrevious.totalAssets || 0) !== 0) {
            const assetGrowth = ((totalsCurrent.totalAssets - totalsPrevious.totalAssets) / Math.abs(totalsPrevious.totalAssets));
            if (assetGrowth > 0) {
                comment += " " + t_page('bs_comment_growth').replace('{pct}', formatChangePercent(totalsCurrent.totalAssets, totalsPrevious.totalAssets));
            } else if (assetGrowth < 0) {
                 comment += " " + t_page('bs_comment_decline').replace('{pct}', formatChangePercent(totalsCurrent.totalAssets, totalsPrevious.totalAssets));
            }
        }
        document.getElementById('balanceSheetComment').textContent = comment;
    };

    const renderIncomeStatement = () => {
        const stmtCurrent = state.statementsCurrent;
        const stmtPrevious = state.statementsPrevious;
        
        const isCurrent = stmtCurrent?.is || { revenue: [], cogs: [], genAdminExpenses: [], sellingMarketingExpenses: [], depreciationAmortization: [], otherOperatingExpenses: [], interestExpense: [], taxExpense: [] };
        const totalsCurrent = stmtCurrent?.totals || {};
        const isPrevious = stmtPrevious?.is || { revenue: [], cogs: [], genAdminExpenses: [], sellingMarketingExpenses: [], depreciationAmortization: [], otherOperatingExpenses: [], interestExpense: [], taxExpense: [] };
        const totalsPrevious = stmtPrevious?.totals || {};

        let html = '<table class="table table-sm report-table"><thead><tr>';
        html += `<th>${t_page('thAccount')}</th>`;
        html += `<th class="text-end">${t_page('thCurrentPeriod')}</th>`;
        if (state.hasDataPrevious) {
            html += `<th class="text-end">${t_page('thPreviousPeriod')}</th>`;
            html += `<th class="text-end">${t_page('thChangeAbs')}</th>`;
            html += `<th class="text-end">${t_page('thChangePct')}</th>`;
        }
        html += '</tr></thead><tbody>';

        const renderSubtotalRow = (labelKey, currentVal, prevVal, isProfit) => {
            const changeAbs = (currentVal || 0) - (prevVal || 0);
            const changePct = formatChangePercent(currentVal, prevVal);
            let changeClass = '';
            if (isFinite(changeAbs) && changeAbs !== 0) {
                 changeClass = (changeAbs > 0 ? (isProfit ? 'text-success' : 'text-danger') : (isProfit ? 'text-danger' : 'text-success'));
            }
            
            return `<td class="text-end">${formatCurrency(currentVal, 2)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(prevVal, 2)}</td>
                    <td class="text-end">${formatCurrency(changeAbs, 2)}</td>
                    <td class="text-end ${changeClass}">${changePct}</td>
                    ` : ''}`;
        };

        const revHtml = renderComparativeSection(isCurrent.revenue, isPrevious.revenue, null, t_page('revenue'), 'profit-row', 2);
        html += revHtml.html;
        const cogsHtml = renderComparativeSection(isCurrent.cogs, isPrevious.cogs, null, `(-) ${t_page('cogs')}`, 'expense-total', 2);
        html += cogsHtml.html;
        html += `<tr class="subtotal-row profit-row"><td>${t_page('grossProfit')}</td>${renderSubtotalRow('grossProfit', totalsCurrent.grossProfit, totalsPrevious.grossProfit, true)}</tr>`;
                 
        html += `<tr class="section-header"><td colspan="5"><strong>(-) ${t_page('operatingExpenses')}</strong></td></tr>`;
        const gaHtml = renderComparativeSection(isCurrent.genAdminExpenses, isPrevious.genAdminExpenses, null, null, '', 2);
        const smHtml = renderComparativeSection(isCurrent.sellingMarketingExpenses, isPrevious.sellingMarketingExpenses, null, null, '', 2);
        const depHtml = renderComparativeSection(isCurrent.depreciationAmortization, isPrevious.depreciationAmortization, null, null, '', 2);
        const opexHtml = renderComparativeSection(isCurrent.otherOperatingExpenses, isPrevious.otherOperatingExpenses, null, null, '', 2);
        html += gaHtml.html + smHtml.html + depHtml.html + opexHtml.html;
        
        html += `<tr class="subtotal-row expense-total"><td>${t_page('total')} ${t_page('operatingExpenses')}</td>${renderSubtotalRow('totalOperatingExpenses', totalsCurrent.totalOperatingExpenses, totalsPrevious.totalOperatingExpenses, false)}</tr>`;
        html += `<tr class="subtotal-row profit-row"><td>${t_page('operatingProfit')}</td>${renderSubtotalRow('operatingProfit', totalsCurrent.operatingProfit, totalsPrevious.operatingProfit, true)}</tr>`;

        const intHtml = renderComparativeSection(isCurrent.interestExpense, isPrevious.interestExpense, null, `(-) ${t_page('interestExpense')}`, 'expense-total', 2);
        html += intHtml.html;
        html += `<tr class="subtotal-row profit-row"><td>${t_page('profitBeforeTax')}</td>${renderSubtotalRow('profitBeforeTax', totalsCurrent.profitBeforeTax, totalsPrevious.profitBeforeTax, true)}</tr>`;

        const taxHtml = renderComparativeSection(isCurrent.taxExpense, isPrevious.taxExpense, null, `(-) ${t_page('taxExpense')}`, 'expense-total', 2);
        html += taxHtml.html;
        html += `<tr class="total-row profit-row"><td>${t_page('netProfit')}</td>${renderSubtotalRow('netProfit', totalsCurrent.netProfit, totalsPrevious.netProfit, true)}</tr>`;

        html += '</tbody></table>';
        document.getElementById('incomeStatementTable').innerHTML = html;

        // Commentary
        const margin = (totalsCurrent.totalRevenue || 0) !== 0 ? ((totalsCurrent.netProfit || 0) / totalsCurrent.totalRevenue) * 100 : 0;
        let comment = (totalsCurrent.netProfit || 0) >= 0 
            ? t_page('is_comment_profit').replace('{profit}', formatCurrency(totalsCurrent.netProfit, 2)).replace('{margin}', margin.toFixed(1))
            : t_page('is_comment_loss').replace('{profit}', formatCurrency(totalsCurrent.netProfit, 2));
        if (state.hasDataPrevious) {
             if (totalsCurrent.totalRevenue > (totalsPrevious.totalRevenue || 0)) {
                 comment += " " + t_page('is_comment_revenue_growth').replace('{pct}', formatChangePercent(totalsCurrent.totalRevenue, totalsPrevious.totalRevenue));
             }
             if (totalsCurrent.netProfit > (totalsPrevious.netProfit || 0)) {
                 comment += " " + t_page('is_comment_profit_improvement');
             }
        }
        document.getElementById('incomeStatementComment').textContent = comment;
     };

    const renderCashFlowStatement = () => {
        const totalsCurrent = state.statementsCurrent?.totals || {};
        const totalsPrevious = state.statementsPrevious?.totals || {};

        // Calculate CF items
        const netProfitC = totalsCurrent.netProfit || 0;
        const depreciationC = totalsCurrent.depreciationTotal || 0;
        const changeInWC_C = (totalsCurrent.workingCapital || 0) - (totalsPrevious.workingCapital || 0);
        const cashFromOpsC = netProfitC + depreciationC - (state.hasDataPrevious ? changeInWC_C : 0); 
        const cashFromInvestingC = -( (totalsCurrent.totalNonCurrentAssets || 0) - (totalsPrevious.totalNonCurrentAssets || 0) - depreciationC ); // Capex = Change in NCA + Depreciation
        const cashFromFinancingC = 0; // Proxy
        const netChangeInCashC = cashFromOpsC + cashFromInvestingC + cashFromFinancingC;
        const beginningCashC = totalsPrevious.cashEquivalents || 0;
        const endingCashCalculatedC = beginningCashC + netChangeInCashC;
        const endingCashFromBSC = totalsCurrent.cashEquivalents || 0;

        const netProfitP = totalsPrevious.netProfit || 0;
        const depreciationP = totalsPrevious.depreciationTotal || 0;
        const cashFromOpsP = netProfitP + depreciationP; // No WC change
        const cashFromInvestingP = -depreciationP; // Proxy
        const cashFromFinancingP = 0; // Proxy
        const netChangeInCashP = cashFromOpsP + cashFromInvestingP + cashFromFinancingP;
        const beginningCashP = 0; // Assumption
        const endingCashCalculatedP = beginningCashP + netChangeInCashP;
        
        let html = '<table class="table table-sm report-table"><thead><tr>';
        html += `<th>${t_page('thAccount')}</th>`;
        html += `<th class="text-end">${t_page('thCurrentPeriod')}</th>`;
        if (state.hasDataPrevious) {
            html += `<th class="text-end">${t_page('thPreviousPeriod')}</th>`;
        }
        html += '</tr></thead><tbody>';

        html += `<tr class="section-header"><td colspan="${state.hasDataPrevious ? 3 : 2}"><strong>${t_page('operatingActivities')}</strong></td></tr>`;
        html += `<tr><td>${t_page('netIncomeForCF')}</td><td class="text-end">${formatCurrency(netProfitC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(netProfitP)}</td>` : ''}</tr>`;
        html += `<tr><td colspan="${state.hasDataPrevious ? 3 : 2}">${t_page('adjustments')}</td></tr>`;
        html += `<tr><td class="ps-3">${t_page('depreciationAmortizationForCF')}</td><td class="text-end">${formatCurrency(depreciationC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(depreciationP)}</td>` : ''}</tr>`;
        html += `<tr><td class="ps-3">${t_page('changesInWorkingCapital')}</td><td class="text-end">${state.hasDataPrevious ? formatCurrency(-changeInWC_C) : 'N/A'}</td>${state.hasDataPrevious ? `<td class="text-end">N/A</td>` : ''}</tr>`;
        html += `<tr class="subtotal-row"><td>${t_page('cashFlowFromOperations')}</td><td class="text-end">${formatCurrency(cashFromOpsC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(cashFromOpsP)}</td>` : ''}</tr>`;
        
        html += `<tr class="section-header"><td colspan="${state.hasDataPrevious ? 3 : 2}"><strong>${t_page('investingActivities')}</strong></td></tr>`;
        html += `<tr><td class="ps-3">${t_page('capitalExpenditures')}</td><td class="text-end">(${formatCurrency(Math.abs(cashFromInvestingC))})</td>${state.hasDataPrevious ? `<td class="text-end">(${formatCurrency(Math.abs(cashFromInvestingP))})</td>` : ''}</tr>`;
        html += `<tr class="subtotal-row"><td>${t_page('cashFlowFromInvesting')}</td><td class="text-end">${formatCurrency(cashFromInvestingC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(cashFromInvestingP)}</td>` : ''}</tr>`;

        html += `<tr class="section-header"><td colspan="${state.hasDataPrevious ? 3 : 2}"><strong>${t_page('financingActivities')}</strong></td></tr>`;
        html += `<tr><td class="ps-3 text-muted"><em>(${t_page('financingActivities')})</em></td><td class="text-end">0</td>${state.hasDataPrevious ? `<td class="text-end">0</td>` : ''}</tr>`;
        html += `<tr class="subtotal-row"><td>${t_page('cashFlowFromFinancing')}</td><td class="text-end">${formatCurrency(cashFromFinancingC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(cashFromFinancingP)}</td>` : ''}</tr>`;

        html += `<tr class="subtotal-row"><td>${t_page('netCashFlow')}</td><td class="text-end">${formatCurrency(netChangeInCashC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(netChangeInCashP)}</td>` : ''}</tr>`;
        html += `<tr><td>${t_page('beginningCash')}</td><td class="text-end">${formatCurrency(beginningCashC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(beginningCashP)}</td>` : ''}</tr>`;
        html += `<tr class="total-row"><td>${t_page('endingCash')}</td><td class="text-end">${formatCurrency(endingCashCalculatedC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(endingCashCalculatedP)}</td>` : ''}</tr>`;
        
        const cashDiffC = endingCashCalculatedC - endingCashFromBSC;
        if (Math.abs(cashDiffC) > 1) { // Allow for small rounding
             html += `<tr class="table-warning small"><td colspan="${state.hasDataPrevious ? 3 : 2}"><em>ملاحظة (الحالية): النقدية آخر الفترة المحسوبة (${formatCurrency(endingCashCalculatedC)}) تختلف عن رصيد الميزانية (${formatCurrency(endingCashFromBSC)}). الفارق (${formatCurrency(cashDiffC)}) قد يكون بسبب بنود غير نقدية أخرى أو تغيرات في التمويل لم يتم تقديرها.</em></td></tr>`;
        }
        
        html += `</tbody></table>`;
        document.getElementById('cashFlowStatementTable').innerHTML = html;
        
        let comment = cashFromOpsC >= 0 ? t_page('cf_comment_positive') : t_page('cf_comment_negative');
        if(state.hasDataPrevious) {
            if(changeInWC_C > 0) comment += " " + t_page('cf_comment_wc_use');
            if(changeInWC_C < 0) comment += " " + t_page('cf_comment_wc_source');
        }
        document.getElementById('cashFlowStatementComment').textContent = comment;
    };

    const renderEquityStatement = () => {
        const stmtCurrent = state.statementsCurrent;
        const stmtPrevious = state.statementsPrevious;

        const totalsCurrent = stmtCurrent?.totals || {};
        const totalsPrevious = stmtPrevious?.totals || {};
        
        // Previous Period
        const capP = totalsPrevious.totalEquityCapital || 0;
        const netProfitP = totalsPrevious.netProfit || 0;
        const openingREP = totalsPrevious.retainedEarnings - netProfitP; // Opening RE = Closing RE - Net Profit
        const totalOpeningEqP = capP + openingREP;
        const totalClosingEqP = totalsPrevious.totalEquity || 0;

        // Current Period
        const capC = totalsCurrent.totalEquityCapital || 0;
        const netProfitC = totalsCurrent.netProfit || 0;
        const openingREC = state.hasDataPrevious ? (totalsPrevious.retainedEarnings || 0) : (totalsCurrent.retainedEarnings - netProfitC); // Use prev closing RE, or estimate
        const totalOpeningEqC = capC + openingREC;
        const dividendsC = 0; // Assumption
        const totalClosingEqC = totalsCurrent.totalEquity || 0; 

        let html = '<table class="table table-sm report-table"><thead><tr>';
        html += `<th>${t_page('thAccount')}</th>`;
        html += `<th class="text-end">${t_page('thCurrentPeriod')}</th>`;
        if (state.hasDataPrevious) {
            html += `<th class="text-end">${t_page('thPreviousPeriod')}</th>`;
        }
        html += '</tr></thead><tbody>';

        html += `<tr><td>${t_page('totalOpeningEquity')}</td><td class="text-end">${formatCurrency(totalOpeningEqC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(totalOpeningEqP)}</td>` : ''}</tr>`;
        html += `<tr><td>(+) ${t_page('netProfitForEquity')}</td><td class="text-end">${formatCurrency(netProfitC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(netProfitP)}</td>` : ''}</tr>`;
        html += `<tr><td>(-) ${t_page('dividends')}</td><td class="text-end">${formatCurrency(dividendsC)}</td>${state.hasDataPrevious ? `<td class="text-end">0</td>` : ''}</tr>`;
        html += `<tr class="total-row"><td>${t_page('totalClosingEquity')}</td><td class="text-end">${formatCurrency(totalClosingEqC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(totalClosingEqP)}</td>` : ''}</tr>`;
        
        html += `</tbody></table>`;
        document.getElementById('equityStatementTable').innerHTML = html;
        document.getElementById('equityStatementComment').textContent = totalClosingEqC >= totalOpeningEqC ? t_page('eq_comment_growth') : t_page('eq_comment_decline');
    };

    const reloadAndRenderData = () => {
        console.log("[DEBUG] Reloading and rendering data based on selection.");
        const noDataWarningElement = document.getElementById('noDataWarning');
        
        ['balanceSheetCard', 'incomeStatementCard', 'cashFlowStatementCard', 'equityStatementCard'].forEach(id => {
            const card = document.getElementById(id);
            if (card) card.style.display = 'none';
         });
         if(noDataWarningElement) noDataWarningElement.style.display = 'none';

        if (loadDataAndPrepareStatements()) { 
            console.log("[DEBUG] Data loaded successfully. Rendering statements...");
            renderBalanceSheet();
            renderIncomeStatement();
            renderCashFlowStatement();
            renderEquityStatement();
             ['balanceSheetCard', 'incomeStatementCard', 'cashFlowStatementCard', 'equityStatementCard'].forEach(id => {
                const card = document.getElementById(id);
                if (card) card.style.display = 'block';
             });
             if (!state.hasDataPrevious && state.hasDataCurrent && noDataWarningElement) {
                 noDataWarningElement.textContent = t_page('noPreviousDataMessage');
                 noDataWarningElement.style.display = 'block';
                 noDataWarningElement.classList.remove('alert-danger');
                 noDataWarningElement.classList.add('alert-info');
             }
        } else {
            console.log("[DEBUG] Failed to load data. Showing warning.");
             if(noDataWarningElement) {
                 noDataWarningElement.textContent = t_page('noDataMessage');
                 noDataWarningElement.style.display = 'block';
                 noDataWarningElement.classList.remove('alert-info');
                 noDataWarningElement.classList.add('alert-danger');
             }
        }
         if (typeof window.applyTranslations === 'function') {
            console.log("Applying translations after render attempt...");
            window.applyTranslations();
         }
    }

    // --- Initialization ---
    const init = () => {
        console.log("[DEBUG] Initializing report page (Simplified)...");
        
        console.log("[DEBUG] Bypassing library load wait. Proceeding with data loading...");
        reloadAndRenderData(); // Initial load and render based on default selection

        const exportPdfBtn = document.getElementById('exportPdfBtn');
        if (exportPdfBtn) {
             exportPdfBtn.addEventListener('click', () => {
                if (!state.hasDataCurrent) { alert(t_page('noDataMessage')); return; }
                if (typeof html2pdf === 'function') {
                    const element = document.getElementById('report-content');
                    const opt = { margin: 0.5, filename: 'Financial_Report.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true, logging: false }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
                    html2pdf().from(element).set(opt).save();
                } else { console.error("html2pdf library might not be loaded yet."); alert("PDF export failed. Please try again shortly."); }
             });
        } else { console.warn("Export PDF button not found"); }

        const exportExcelBtn = document.getElementById('exportExcelBtn');
        if (exportExcelBtn) {
             exportExcelBtn.addEventListener('click', () => {
                if (!state.hasDataCurrent) { alert(t_page('noDataMessage')); return; }
                 if (typeof XLSX !== 'undefined') { 
                     try {
                         const wb = XLSX.utils.book_new();
                         const extractTableData = (tableElement) => { 
                              const data = [];
                             const headers = [];
                             tableElement?.querySelectorAll('thead th').forEach(th => headers.push(th.textContent.trim()));
                             if (headers.length > 0) data.push(headers);
                             const rows = tableElement?.querySelectorAll('tbody tr');
                             if (!rows) return data;
                             rows.forEach(row => {
                                 const rowData = [];
                                 row.querySelectorAll('td').forEach(cell => {
                                     let cellValue = cell.textContent.trim();
                                     const numValue = parseFloat(cellValue.replace(/[,()]/g, ''));
                                     if (!isNaN(numValue) && (cellValue.match(/[\d,.-]+/) || cellValue === '0')) {
                                         rowData.push(numValue);
                                     } else {
                                         rowData.push(cellValue.replace(/[\(\)\-\+:%]/g, '').replace(/^[ \t]+|[ \t]+$/g,'').trim()); 
                                     }
                                 });
                                  if (rowData.length > 0) data.push(rowData);
                             });
                             return data;
                         };
                         const addSheet = (tableId, sheetName) => { 
                             const table = document.getElementById(tableId)?.querySelector('table'); 
                             if (table) {
                                 const tableData = extractTableData(table);
                                 if (tableData.length > 0) {
                                     const ws = XLSX.utils.aoa_to_sheet(tableData);
                                      const colWidths = tableData.reduce((acc, row) => {
                                            row.forEach((cell, i) => {
                                                const len = cell?.toString().length || 5;
                                                if (!acc[i] || len > acc[i]) { acc[i] = len; }
                                            }); return acc;
                                        }, []).map(w => ({ wch: w + 2 }));
                                      ws['!cols'] = colWidths;
                                     XLSX.utils.book_append_sheet(wb, ws, sheetName);
                                 } else { console.warn(`No data extracted from table: ${tableId}`); }
                             } else { console.warn(`Table element not found: ${tableId} > table`); }
                         };
                         addSheet('balanceSheetTable', 'Balance Sheet');
                         addSheet('incomeStatementTable', 'Income Statement');
                         addSheet('cashFlowStatementTable', 'Cash Flow');
                         addSheet('equityStatementTable', 'Equity');
                         if (wb.SheetNames.length > 0) { XLSX.writeFile(wb, "Financial_Statements.xlsx"); }
                         else { alert("No data found to export to Excel."); }
                     } catch (error) { console.error("Error generating Excel file:", error); alert("Error generating Excel file."); }
                 } else { console.error("XLSX library might not be loaded yet."); alert("Excel export failed. Please try again shortly."); }
             });
        } else { console.warn("Export Excel button not found"); }

        document.querySelectorAll('input[name="dataSource"]').forEach(radio => {
            radio.addEventListener('change', reloadAndRenderData); 
        });

        if (typeof window.applyTranslations === 'function') {
            console.log("Applying initial translations...");
            window.applyTranslations();
        } else { console.warn("applyTranslations function not found."); }

        console.log("[DEBUG] Report page initialization complete.");

    }; 
    
    // --- Helper function to load scripts (same as before) ---
    const loadScript = (src, onload, onerror) => {
        let script = document.querySelector(`script[src="${src}"]`);
        if (script) {
            if (script.dataset.loaded === 'true') { onload(); }
            else if (script.dataset.loaded === 'false') { onerror(); }
            else { 
                 script.addEventListener('load', onload);
                 script.addEventListener('error', onerror);
            }
            return;
        }
        script = document.createElement('script');
        script.src = src;
        script.async = true; 
        script.onload = () => { script.dataset.loaded = 'true'; onload(); };
        script.onerror = () => { script.dataset.loaded = 'false'; console.error(`Failed to load script: ${src}`); onerror(); };
        document.head.appendChild(script);
    };
    
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js", () => { console.log("html2pdf loaded."); }, () => {});
    loadScript("https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js", () => { console.log("XLSX loaded."); }, () => {});

    init(); 

}); // End of DOMContentLoaded listener
