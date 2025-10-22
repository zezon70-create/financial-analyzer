// js/report-app.js (FIX for ReferenceError: statements is not defined)

window.pageTranslations = {
    ar: {
        pageTitle: "التقارير المالية المفصلة — المحلل المالي",
        pageHeader: "القوائم المالية المفصلة",
        pageSubheader: "تقارير احترافية طبقًا للمعايير الدولية مع تعليقات تحليلية ذكية.",
        commentaryTitle: "تعليق تحليلي",
        exportPdf: "تصدير PDF",
        exportExcel: "تصدير Excel",
        total: "الإجمالي",
        noDataMessage: "لا توجد بيانات مالية لعرضها من المصدر المحدد. يرجى إدخال البيانات أولاً أو تغيير المصدر.", // تعديل الرسالة
        // *** مُضاف: ترجمات اختيار المصدر ***
        dataSourceTitle: "مصدر البيانات:",
        sourceTrialBalanceLabel: "استخدام ميزان المراجعة (من صفحة الإدخال)",
        sourceUploadedLabel: "استخدام القوائم المالية المرفوعة (من صفحة الرفع)",
        // *** نهاية الإضافة ***
        // BS Translations
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
        bs_comment_balanced: "تحليل إيجابي: قائمة المركز المالي متوازنة، مما يعكس دقة البيانات وصحة المعادلة المحاسبية.",
        bs_comment_unbalanced: "تحليل يتطلب الانتباه: القائمة غير متوازنة بفارق {diff}. يرجى مراجعة التصنيفات والإدخالات.",
        // IS Translations
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
        // CF Translations
        cfTitle: "قائمة التدفقات النقدية (الطريقة غير المباشرة - تقديرية)",
        cfSubheader: "توضح حركة النقد المقدرة من الأنشطة المختلفة.",
        operatingActivities: "التدفقات النقدية من الأنشطة التشغيلية",
        netIncomeForCF: "صافي الدخل",
        adjustments: "تسويات لبنود غير نقدية:",
        depreciationAmortizationForCF: "إهلاك واستهلاك",
        cashFlowFromOperations: "صافي النقد الناتج من الأنشطة التشغيلية",
        investingActivities: "التدفقات النقدية من الأنشطة الاستثمارية",
        capitalExpenditures: "النفقات الرأسمالية (تقديري)",
        cashFlowFromInvesting: "صافي النقد المستخدم في الأنشطة الاستثمارية",
        financingActivities: "التدفقات النقدية من الأنشطة التمويلية",
        cashFlowFromFinancing: "صافي النقد من (المستخدم في) الأنشطة التمويلية",
        netCashFlow: "صافي التغير في النقد وما في حكمه",
        beginningCash: "النقد وما في حكمه أول الفترة (مفترض 0)",
        endingCash: "النقد وما في حكمه آخر الفترة",
        cf_comment_positive: "وضع نقدي جيد: تشير التقديرات إلى توليد تدفقات نقدية موجبة.",
        cf_comment_negative: "مؤشر خطر: تشير التقديرات إلى صافي تدفق نقدي سالب.",
        // EQ Translations
        eqTitle: "قائمة التغيرات في حقوق الملكية",
        eqSubheader: "توضح التغيرات التي طرأت على حقوق الملكية خلال الفترة.",
        openingBalanceCapital: "رأس المال أول الفترة",
        openingBalanceRetainedEarnings: "أرباح محتجزة أول الفترة (مفترض 0)",
        totalOpeningEquity: "إجمالي حقوق الملكية أول الفترة",
        netProfitForEquity: "صافي ربح / (خسارة) الفترة",
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
        dataSourceTitle: "Data Source:",
        sourceTrialBalanceLabel: "Use Trial Balance (from Input page)",
        sourceUploadedLabel: "Use Uploaded Statements (from Upload page)",
        bsTitle: "Statement of Financial Position", bsSubheader: "Shows assets, liabilities, and equity.",
        assets: "Assets", currentAssets: "Current Assets", cashAndEquivalents: "Cash & Equivalents", accountsReceivable: "Accounts Receivable", inventory: "Inventory", otherCurrentAssets: "Other Current Assets", totalCurrentAssets: "Total Current Assets", nonCurrentAssets: "Non-current Assets", propertyPlantEquipment: "Property, Plant & Equipment (Net)", otherNonCurrentAssets: "Other Non-current Assets", totalNonCurrentAssets: "Total Non-current Assets", totalAssets: "Total Assets",
        liabilities: "Liabilities", currentLiabilities: "Current Liabilities", accountsPayable: "Accounts Payable", shortTermLoans: "Short-term Loans", otherCurrentLiabilities: "Other Current Liabilities", totalCurrentLiabilities: "Total Current Liabilities", nonCurrentLiabilities: "Non-current Liabilities", longTermLoans: "Long-term Loans", otherNonCurrentLiabilities: "Other Non-current Liabilities", totalNonCurrentLiabilities: "Total Non-current Liabilities", totalLiabilities: "Total Liabilities",
        equity: "Equity", paidInCapital: "Paid-in Capital", retainedEarnings: "Retained Earnings / (Accumulated Deficit)", netProfitForPeriod: "Net Profit / (Loss) for the Period", totalEquity: "Total Equity", totalLiabilitiesAndEquity: "Total Liabilities and Equity",
        bs_comment_balanced: "Positive Analysis: Balanced statement.", bs_comment_unbalanced: "Action Required: Unbalanced by {diff}.",
        isTitle: "Statement of Comprehensive Income", isSubheader: "Summarizes revenues and expenses.",
        revenue: "Revenue / Sales", cogs: "Cost of Revenue / Sales", grossProfit: "Gross Profit / (Loss)", operatingExpenses: "Operating Expenses", generalAdminExpenses: "General & Administrative", sellingMarketingExpenses: "Selling & Marketing", depreciationAmortization: "Depreciation & Amortization", otherOperatingExpenses: "Other Operating Expenses", operatingProfit: "Operating Profit / (Loss) (EBIT)", interestExpense: "Interest Expense", profitBeforeTax: "Profit / (Loss) Before Tax (PBT)", taxExpense: "Tax Expense", netProfit: "Net Profit / (Loss) for the Period",
        is_comment_profit: "Strong Performance: Net profit of {profit}, margin {margin}%.", is_comment_loss: "Profitability Challenges: Net loss of {profit}.",
        cfTitle: "Statement of Cash Flows (Indirect - Est.)", cfSubheader: "Shows estimated cash movement.",
        operatingActivities: "Cash Flows from Operating Activities", netIncomeForCF: "Net Income", adjustments: "Adjustments for non-cash items:", depreciationAmortizationForCF: "Depreciation & Amortization", cashFlowFromOperations: "Net Cash from Operating Activities", investingActivities: "Cash Flows from Investing Activities", capitalExpenditures: "Capital Expenditures (Est.)", cashFlowFromInvesting: "Net Cash used in Investing Activities", financingActivities: "Cash Flows from Financing Activities", cashFlowFromFinancing: "Net Cash from (used in) Financing Activities", netCashFlow: "Net Change in Cash & Equivalents", beginningCash: "Beginning Cash & Equivalents (Assumed 0)", endingCash: "Ending Cash & Equivalents",
        cf_comment_positive: "Good Cash Position: Estimates indicate positive cash flow.", cf_comment_negative: "Risk Indicator: Estimates indicate negative net cash flow.",
        eqTitle: "Statement of Changes in Equity", eqSubheader: "Shows changes in equity.",
        openingBalanceCapital: "Opening Capital Balance", openingBalanceRetainedEarnings: "Opening Retained Earnings (Assumed 0)", totalOpeningEquity: "Total Opening Equity", netProfitForEquity: "Net Profit / (Loss) for the Period", closingBalanceCapital: "Closing Capital Balance", closingBalanceRetainedEarnings: "Closing Retained Earnings", totalClosingEquity: "Total Closing Equity",
        eq_comment_growth: "Shareholder Value Growth: Equity increased.", eq_comment_decline: "Shareholder Value Decline: Equity decreased.",
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("[DEBUG] report-app.js script started execution."); 

    const state = {
        trialData: [],
        uploadedData: null,
        statements: { /* Initial structure */ }, 
        hasData: false
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

    // --- Data Loading and Processing Logic ---

    const processUploadedData = () => { 
        try {
            console.log("Processing data from upload.html (Placeholder Logic)...");
            // *** This section NEEDS to be adapted based on the ACTUAL structure saved by upload.html ***
            const bsData = state.uploadedData.balanceSheet || {};
            const isData = state.uploadedData.incomeStatement || {};
            
            // *** FIX: Reset state.statements here ***
            state.statements = { 
                bs: { currentAssets: [], nonCurrentAssets: [], currentLiabilities: [], nonCurrentLiabilities: [], equityCapital: [], equityRetainedEarnings: 0 },
                is: { revenue: [], cogs: [], genAdminExpenses: [], sellingMarketingExpenses: [], depreciationAmortization: [], otherOperatingExpenses: [], interestExpense: [], taxExpense: [] },
                totals: {}
            };
            const totals = state.statements.totals; // Get shortcut *after* reset

            // Map Balance Sheet items
            state.statements.bs.currentAssets = bsData.currentAssets || [];
            state.statements.bs.nonCurrentAssets = bsData.nonCurrentAssets || [];
            state.statements.bs.currentLiabilities = bsData.currentLiabilities || [];
            state.statements.bs.nonCurrentLiabilities = bsData.nonCurrentLiabilities || [];
            state.statements.bs.equityCapital = bsData.equity?.filter(item => item.account.toLowerCase().includes('capital') || item.account.includes('رأس المال')) || [];
            const openingREItem = bsData.equity?.find(item => item.account.toLowerCase().includes('retained') || item.account.includes('أرباح'));
            state.statements.bs.equityRetainedEarnings = openingREItem ? openingREItem.value : 0; 

            // Map Income Statement items
            state.statements.is.revenue = isData.revenue || [];
            state.statements.is.cogs = isData.cogs || [];
            state.statements.is.genAdminExpenses = isData.expenses?.filter(e => e.type === 'genAdmin') || [];
            state.statements.is.sellingMarketingExpenses = isData.expenses?.filter(e => e.type === 'sellingMarketing') || [];
            state.statements.is.depreciationAmortization = isData.expenses?.filter(e => e.type === 'depreciation') || [];
            state.statements.is.interestExpense = isData.expenses?.filter(e => e.type === 'interest') || [];
            state.statements.is.taxExpense = isData.expenses?.filter(e => e.type === 'tax') || [];
            state.statements.is.otherOperatingExpenses = isData.expenses?.filter(e => !e.type || !['genAdmin', 'sellingMarketing', 'depreciation', 'interest', 'tax'].includes(e.type)) || [];

            // Calculate Totals from Uploaded Data
            const sumValues = (arr) => arr.reduce((sum, item) => sum + (item.value || 0), 0);
            totals.totalCurrentAssets = sumValues(state.statements.bs.currentAssets);
            totals.totalNonCurrentAssets = sumValues(state.statements.bs.nonCurrentAssets);
            totals.totalAssets = totals.totalCurrentAssets + totals.totalNonCurrentAssets;
            totals.totalCurrentLiabilities = sumValues(state.statements.bs.currentLiabilities);
            totals.totalNonCurrentLiabilities = sumValues(state.statements.bs.nonCurrentLiabilities);
            totals.totalLiabilities = totals.totalCurrentLiabilities + totals.totalNonCurrentLiabilities;
            totals.totalRevenue = sumValues(state.statements.is.revenue);
            totals.totalCogs = sumValues(state.statements.is.cogs);
            totals.grossProfit = totals.totalRevenue - totals.totalCogs;
            totals.depreciationTotal = sumValues(state.statements.is.depreciationAmortization);
            totals.totalOperatingExpenses = sumValues(state.statements.is.genAdminExpenses) + sumValues(state.statements.is.sellingMarketingExpenses) + totals.depreciationTotal + sumValues(state.statements.is.otherOperatingExpenses);
            totals.operatingProfit = totals.grossProfit - totals.totalOperatingExpenses;
            const totalInterest = sumValues(state.statements.is.interestExpense);
            totals.profitBeforeTax = totals.operatingProfit - totalInterest;
            totals.totalTax = sumValues(state.statements.is.taxExpense);
            totals.netProfit = totals.profitBeforeTax - totals.totalTax;
            totals.totalEquityCapital = sumValues(state.statements.bs.equityCapital);
            state.statements.bs.equityRetainedEarnings += totals.netProfit;
            totals.totalEquity = totals.totalEquityCapital + state.statements.bs.equityRetainedEarnings;
            totals.totalLiabilitiesAndEquity = totals.totalLiabilities + totals.totalEquity;
            const cashItem = state.statements.bs.currentAssets.find(item => item.account.toLowerCase().includes('cash') || item.account.includes('نقد') || item.account.includes('bank') || item.account.includes('بنك'));
            totals.cashEquivalents = cashItem ? cashItem.value : 0;
            
            // *** Add missing totals for advanced-app ***
            totals.accountsReceivable = sumValues(state.statements.bs.currentAssets.filter(item => item.account.toLowerCase().includes('receivable') || item.account.includes('عملاء')));
            totals.inventory = sumValues(state.statements.bs.currentAssets.filter(item => item.account.toLowerCase().includes('inventory') || item.account.includes('مخزون')));
            totals.accountsPayable = sumValues(state.statements.bs.currentLiabilities.filter(item => item.account.toLowerCase().includes('payable') || item.account.includes('مورد')));
            totals.shortTermDebt = sumValues(state.statements.bs.currentLiabilities.filter(item => item.account.toLowerCase().includes('loan') || item.account.includes('قرض قصير')));
            totals.workingCapital = totals.totalCurrentAssets - totals.totalCurrentLiabilities;
            totals.ebit = totals.operatingProfit; 
            totals.purchases = totals.totalCogs; // Simplified proxy
            totals.retainedEarnings = state.statements.bs.equityRetainedEarnings; // Closing RE
            
            state.statements.totals = totals;
            state.hasData = true;
            console.log("Successfully processed data from upload.html");
            return true;
        } catch (error) {
            console.error("Error processing uploaded data:", error);
            state.hasData = false;
            return false;
        }
    };

    // Builds statements from Trial Balance
    const buildStatementsFromTrialData = () => {
        // *** FIX: Reset state.statements *before* accessing state.statements.totals ***
        state.statements = {
            bs: { currentAssets: [], nonCurrentAssets: [], currentLiabilities: [], nonCurrentLiabilities: [], equityCapital: [], equityRetainedEarnings: 0 },
            is: { revenue: [], cogs: [], genAdminExpenses: [], sellingMarketingExpenses: [], depreciationAmortization: [], otherOperatingExpenses: [], interestExpense: [], taxExpense: [] },
            totals: {}
        };
        const totals = state.statements.totals; // Get shortcut *after* reset
        
        // Initialize totals to 0
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

        if (!state.trialData || state.trialData.length === 0) {
            console.error("buildStatementsFromTrialData called but state.trialData is empty.");
            return false; 
        }

        try {
            state.trialData.forEach(row => {
                const value = (parseFloat(row.Debit) || 0) - (parseFloat(row.Credit) || 0);
                const mainType = row.MainType || '';
                const subType = row.SubType || '';
                const accountName = (row.Account || '').toLowerCase();
                const account = row.Account || 'Unknown';
                const item = { account, value }; 

                // *** FIX: Use state.statements, not statements ***
                if (mainType.includes('الأصول') || mainType.includes('Assets')) {
                    if (subType.includes('متداول') || subType.includes('Current')) {
                        state.statements.bs.currentAssets.push(item); // FIX
                        totals.totalCurrentAssets += value;
                        if (accountName.includes('cash') || accountName.includes('نقد') || accountName.includes('bank') || accountName.includes('بنك')) { totals.cashEquivalents += value; }
                        if (accountName.includes('receivable') || accountName.includes('عملاء')) { totals.accountsReceivable += value; }
                        if (accountName.includes('inventory') || accountName.includes('مخزون')) { totals.inventory += value; }
                    } else {
                        state.statements.bs.nonCurrentAssets.push(item); // FIX
                        totals.totalNonCurrentAssets += value;
                    }
                } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) {
                     item.value = -value; 
                     if (subType.includes('متداول') || subType.includes('Current')) {
                         state.statements.bs.currentLiabilities.push(item); // FIX
                         totals.totalCurrentLiabilities += item.value;
                         if (accountName.includes('payable') || accountName.includes('مورد')) { totals.accountsPayable += item.value; }
                         if (accountName.includes('loan') || accountName.includes('قرض قصير')) { totals.shortTermDebt += item.value; }
                     } else {
                         state.statements.bs.nonCurrentLiabilities.push(item); // FIX
                         totals.totalNonCurrentLiabilities += item.value;
                     }
                } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) {
                     item.value = -value; 
                     if (subType.includes('رأس المال') || subType.includes('Capital') || accountName.includes('capital') || accountName.includes('رأس المال')) {
                        state.statements.bs.equityCapital.push(item); // FIX
                        totals.totalEquityCapital += item.value;
                     } else if (subType.includes('الأرباح المحتجزة') || subType.includes('Retained Earnings') || accountName.includes('retained')) {
                         state.statements.bs.equityRetainedEarnings = item.value; // OPENING RE
                     } else {
                          state.statements.bs.equityCapital.push(item); // FIX
                          totals.totalEquityCapital += item.value;
                     }
                }
                else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) {
                     if (subType.includes('الإيرادات') || subType.includes('Revenue')) {
                         item.value = -value; 
                         state.statements.is.revenue.push(item); // FIX
                         totals.totalRevenue += item.value;
                     } else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) {
                         state.statements.is.cogs.push(item); // FIX
                         totals.totalCogs += value;
                     } else if (subType.includes('مشتريات') || subType.includes('Purchases') || accountName.includes('purchase')) {
                         totals.purchases += value; // Track purchases
                         // Don't add to OpEx if it's part of COGS calculation, else add it:
                         // state.statements.is.otherOperatingExpenses.push(item); 
                         // totals.totalOperatingExpenses += value;
                     } else {
                          if (subType.includes('إهلاك') || subType.includes('Depreciation') || accountName.includes('depreciation') || accountName.includes('amortization')) {
                              state.statements.is.depreciationAmortization.push(item); // FIX
                              totals.depreciationTotal += value;
                          } else if (subType.includes('فائدة') || subType.includes('Interest') || accountName.includes('interest')) {
                              state.statements.is.interestExpense.push(item); // FIX
                              totals.totalInterest += value;
                          } else if (subType.includes('ضريب') || subType.includes('Tax') || accountName.includes('tax')) {
                               state.statements.is.taxExpense.push(item); // FIX
                               totals.totalTax += value;
                          } else if (subType.includes('بيع') || subType.includes('Selling') || subType.includes('Marketing') || accountName.includes('selling') || accountName.includes('marketing')) {
                              state.statements.is.sellingMarketingExpenses.push(item); // FIX
                          } else if (subType.includes('إداري') || subType.includes('General') || subType.includes('Admin') || accountName.includes('general') || accountName.includes('admin')) {
                              state.statements.is.genAdminExpenses.push(item); // FIX
                          } else {
                              state.statements.is.otherOperatingExpenses.push(item); // FIX
                          }
                     }
                }
            });

            // --- Calculate Totals and Subtotals ---
            totals.totalAssets = totals.totalCurrentAssets + totals.totalNonCurrentAssets;
            totals.totalLiabilities = totals.totalCurrentLiabilities + totals.totalNonCurrentLiabilities;
            totals.grossProfit = totals.totalRevenue - totals.totalCogs;
            
            totals.totalOperatingExpenses = 
                (state.statements.is.genAdminExpenses.reduce((s, i) => s + i.value, 0)) +
                (state.statements.is.sellingMarketingExpenses.reduce((s, i) => s + i.value, 0)) +
                (totals.depreciationTotal || 0) +
                (state.statements.is.otherOperatingExpenses.reduce((s, i) => s + i.value, 0));

            totals.operatingProfit = totals.grossProfit - totals.totalOperatingExpenses;
            totals.profitBeforeTax = totals.operatingProfit - totals.totalInterest;
            totals.netProfit = totals.profitBeforeTax - totals.totalTax;
            
            state.statements.bs.equityRetainedEarnings += totals.netProfit; // Closing RE = Opening RE + Net Profit
            totals.retainedEarnings = state.statements.bs.equityRetainedEarnings; // Save closing RE
            totals.totalEquity = totals.totalEquityCapital + state.statements.bs.equityRetainedEarnings;
            totals.totalLiabilitiesAndEquity = totals.totalLiabilities + totals.totalEquity;

            totals.workingCapital = totals.totalCurrentAssets - totals.totalCurrentLiabilities;
            totals.ebit = totals.operatingProfit;
            if (totals.purchases === 0 && totals.totalCogs > 0) totals.purchases = totals.totalCogs; // Proxy

            state.statements.totals = totals;
            state.hasData = true;
            console.log("Processed Statements Data from Trial Balance:", state.statements);
            console.log("Calculated Totals from Trial Balance:", totals);
            return true; 
        } catch (e) {
            console.error("Error during trial data processing loop:", e);
            state.hasData = false;
            return false; 
        }
    };

    // Main function to load data based on selected source
    const loadDataAndPrepareStatements = () => {
        state.hasData = false; 
        // Reset statements *before* loading
        state.statements = {
            bs: { currentAssets: [], nonCurrentAssets: [], currentLiabilities: [], nonCurrentLiabilities: [], equityCapital: [], equityRetainedEarnings: 0 },
            is: { revenue: [], cogs: [], genAdminExpenses: [], sellingMarketingExpenses: [], depreciationAmortization: [], otherOperatingExpenses: [], interestExpense: [], taxExpense: [] },
            totals: {}
        };
        
        const selectedSource = document.querySelector('input[name="dataSource"]:checked')?.value || 'trialData';
        console.log(`[DEBUG] Selected data source: ${selectedSource}`);

        if (selectedSource === 'uploadedData') {
            const uploadedDataString = localStorage.getItem('uploadedFinancialData');
            if (uploadedDataString) {
                try {
                    state.uploadedData = JSON.parse(uploadedDataString);
                    if (state.uploadedData && (state.uploadedData.balanceSheet || state.uploadedData.incomeStatement)) {
                        console.log("Found potentially valid pre-formatted data from upload.html");
                        return processUploadedData(); // Returns true on success
                    } else {
                         console.warn("uploadedFinancialData found but seems invalid or empty.");
                         return false;
                    }
                } catch (e) {
                    console.error("Error parsing uploadedFinancialData:", e);
                    state.uploadedData = null;
                    return false;
                }
            } else {
                console.warn("Selected source is 'uploadedData', but 'uploadedFinancialData' not found in localStorage.");
                return false;
            }
        } else { // Handle 'trialData' source
            const trialDataString = localStorage.getItem('trialData');
            if (trialDataString) {
                 try {
                    state.trialData = JSON.parse(trialDataString);
                     if (Array.isArray(state.trialData) && state.trialData.length > 0 && !(state.trialData.length === 1 && !state.trialData[0].Account && !toNum(state.trialData[0].Debit) && !toNum(state.trialData[0].Credit))) {
                        console.log("Found trialData from input.html, building statements...");
                        return buildStatementsFromTrialData(); // Returns true on success
                     } else {
                         console.warn("trialData found but is empty or invalid.");
                         state.trialData = [];
                         return false;
                     }
                } catch(e) {
                     console.error("Error parsing trialData:", e);
                     state.trialData = [];
                     return false;
                }
            } else {
                console.warn("Selected source is 'trialData', but 'trialData' not found in localStorage.");
                return false;
            }
        }
    };


    // --- Rendering Functions --- (No changes needed)
    const renderStatementSection = (items = [], sectionTitle, totalLabel, cssClass = '', decimals = 0) => { /* ... (Code from previous working version) ... */
        let sectionTotal = 0;
        let html = '';
        if (!Array.isArray(items)) items = [];
        if (items.length > 0 || sectionTitle) {
            html += `<tr class="section-header ${cssClass}"><td colspan="2"><strong>${sectionTitle || ''}</strong></td></tr>`;
        }
        items.forEach(item => {
            const valueToFormat = typeof item.value === 'number' ? item.value : 0;
            html += `<tr><td class="ps-3">${item.account}</td><td class="text-end">${formatCurrency(valueToFormat, decimals)}</td></tr>`;
            sectionTotal += valueToFormat;
        });
        if (totalLabel && items.length > 0) {
             html += `<tr class="subtotal-row ${cssClass}"><td>${totalLabel}</td><td class="text-end">${formatCurrency(sectionTotal, decimals)}</td></tr>`;
        }
        return { html, total: sectionTotal };
    };
    const renderBalanceSheet = () => { /* ... (Code from previous working version) ... */
        const { bs, totals } = state.statements;
        if (!totals || !bs) { console.error("Statement data incomplete for Balance Sheet rendering."); return; }
        let html = '<table class="table table-sm report-table"><tbody>';
        const currentAssetsHtml = renderStatementSection(bs.currentAssets, t_page('currentAssets'), t_page('totalCurrentAssets'), 'assets-section');
        const nonCurrentAssetsHtml = renderStatementSection(bs.nonCurrentAssets, t_page('nonCurrentAssets'), t_page('totalNonCurrentAssets'), 'assets-section');
        html += currentAssetsHtml.html + nonCurrentAssetsHtml.html;
        html += `<tr class="total-row assets-section"><td>${t_page('totalAssets')}</td><td class="text-end">${formatCurrency(totals.totalAssets)}</td></tr>`;
        const currentLiabsHtml = renderStatementSection(bs.currentLiabilities, t_page('currentLiabilities'), t_page('totalCurrentLiabilities'), 'liabilities-section');
        const nonCurrentLiabsHtml = renderStatementSection(bs.nonCurrentLiabilities, t_page('nonCurrentLiabilities'), t_page('totalNonCurrentLiabilities'), 'liabilities-section');
        html += currentLiabsHtml.html + nonCurrentLiabsHtml.html;
        html += `<tr class="subtotal-row liabilities-section"><td>${t_page('totalLiabilities')}</td><td class="text-end">${formatCurrency(totals.totalLiabilities)}</td></tr>`;
        const equityCapitalHtml = renderStatementSection(bs.equityCapital, t_page('equity'), null, 'equity-section');
        html += equityCapitalHtml.html;
        html += `<tr><td class="ps-3">${t_page('retainedEarnings')}</td><td class="text-end">${formatCurrency(bs.equityRetainedEarnings)}</td></tr>`;
        html += `<tr class="subtotal-row equity-section"><td>${t_page('totalEquity')}</td><td class="text-end">${formatCurrency(totals.totalEquity)}</td></tr>`;
        html += `<tr class="total-row equity-section"><td>${t_page('totalLiabilitiesAndEquity')}</td><td class="text-end">${formatCurrency(totals.totalLiabilitiesAndEquity)}</td></tr>`;
        html += '</tbody></table>';
        const bsTableElement = document.getElementById('balanceSheetTable');
        if (bsTableElement) bsTableElement.innerHTML = html;
        const diff = (totals.totalAssets || 0) - (totals.totalLiabilitiesAndEquity || 0);
        const comment = Math.abs(diff) < 1 ? t_page('bs_comment_balanced') : t_page('bs_comment_unbalanced').replace('{diff}', formatCurrency(diff));
        const bsCommentElement = document.getElementById('balanceSheetComment');
        if(bsCommentElement) bsCommentElement.textContent = comment;
    };
    const renderIncomeStatement = () => { /* ... (Code from previous working version) ... */
        const { is: income, totals } = state.statements;
        if (!totals || !income) { console.error("Statement data incomplete for Income Statement rendering."); return; }
        let html = '<table class="table table-sm report-table"><tbody>';
        const revenueHtml = renderStatementSection(income.revenue, null, t_page('revenue'), '', 2);
        const cogsHtml = renderStatementSection(income.cogs, null, `(-) ${t_page('cogs')}`, '', 2);
        html += revenueHtml.html + cogsHtml.html;
        html += `<tr class="subtotal-row"><td>${t_page('grossProfit')}</td><td class="text-end">${formatCurrency(totals.grossProfit, 2)}</td></tr>`;
        html += `<tr class="section-header"><td colspan="2"><strong>(-) ${t_page('operatingExpenses')}</strong></td></tr>`;
        const genAdminHtml = renderStatementSection(income.genAdminExpenses, null, null, '', 2);
        const sellingMarketingHtml = renderStatementSection(income.sellingMarketingExpenses, null, null, '', 2);
        const depreciationHtml = renderStatementSection(income.depreciationAmortization, null, null, '', 2);
        const otherOpExHtml = renderStatementSection(income.otherOperatingExpenses, null, null, '', 2);
        html += genAdminHtml.html + sellingMarketingHtml.html + depreciationHtml.html + otherOpExHtml.html;
        html += `<tr class="subtotal-row expense-total"><td>${t_page('total')} ${t_page('operatingExpenses')}</td><td class="text-end">${formatCurrency(totals.totalOperatingExpenses, 2)}</td></tr>`;
        html += `<tr class="subtotal-row profit-row"><td>${t_page('operatingProfit')}</td><td class="text-end">${formatCurrency(totals.operatingProfit, 2)}</td></tr>`;
        const interestHtml = renderStatementSection(income.interestExpense, null, `(-) ${t_page('interestExpense')}`, '', 2);
        html += interestHtml.html;
        html += `<tr class="subtotal-row profit-row"><td>${t_page('profitBeforeTax')}</td><td class="text-end">${formatCurrency(totals.profitBeforeTax, 2)}</td></tr>`;
        const taxHtml = renderStatementSection(income.taxExpense, null, `(-) ${t_page('taxExpense')}`, '', 2);
        html += taxHtml.html;
        html += `<tr class="total-row profit-row"><td>${t_page('netProfit')}</td><td class="text-end">${formatCurrency(totals.netProfit, 2)}</td></tr>`;
        html += '</tbody></table>';
        const isTableElement = document.getElementById('incomeStatementTable');
        if(isTableElement) isTableElement.innerHTML = html;
        const margin = totals.totalRevenue !== 0 ? (totals.netProfit / totals.totalRevenue) * 100 : 0;
        const comment = totals.netProfit >= 0
            ? t_page('is_comment_profit').replace('{profit}', formatCurrency(totals.netProfit, 2)).replace('{margin}', margin.toFixed(1))
            : t_page('is_comment_loss').replace('{profit}', formatCurrency(totals.netProfit, 2));
        const isCommentElement = document.getElementById('incomeStatementComment');
        if(isCommentElement) isCommentElement.textContent = comment;
     };
    const renderCashFlowStatement = () => { /* ... (Code from previous working version) ... */
        const { totals } = state.statements;
        if (!totals) { console.error("Totals not calculated for Cash Flow Statement."); return; }
        const netProfit = totals.netProfit || 0;
        const depreciation = totals.depreciationTotal || 0;
        const cashFromOps = netProfit + depreciation;
        const cashFromInvesting = -depreciation;
        const cashFromFinancing = 0;
        const netChangeInCash = cashFromOps + cashFromInvesting + cashFromFinancing;
        const beginningCash = 0;
        const endingCashCalculated = beginningCash + netChangeInCash;
        const endingCashFromBS = totals.cashEquivalents || 0;
        let html = `<table class="table table-sm report-table"><tbody>`;
        html += `<tr class="section-header"><td colspan="2"><strong>${t_page('operatingActivities')}</strong></td></tr>`;
        html += `<tr><td>${t_page('netIncomeForCF')}</td><td class="text-end">${formatCurrency(netProfit)}</td></tr>`;
        html += `<tr><td colspan="2">${t_page('adjustments')}</td></tr>`;
        html += `<tr><td class="ps-3">${t_page('depreciationAmortizationForCF')}</td><td class="text-end">${formatCurrency(depreciation)}</td></tr>`;
        html += `<tr><td class="ps-3 text-muted"><em>(التغيرات في رأس المال العامل)</em></td><td class="text-end text-muted"><em>N/A</em></td></tr>`;
        html += `<tr class="subtotal-row"><td>${t_page('cashFlowFromOperations')}</td><td class="text-end">${formatCurrency(cashFromOps)}</td></tr>`;
        html += `<tr class="section-header"><td colspan="2"><strong>${t_page('investingActivities')}</strong></td></tr>`;
        html += `<tr><td class="ps-3">${t_page('capitalExpenditures')}</td><td class="text-end">${formatCurrency(Math.abs(cashFromInvesting))}</td></tr>`;
        html += `<tr class="subtotal-row"><td>${t_page('cashFlowFromInvesting')}</td><td class="text-end">${formatCurrency(cashFromInvesting)}</td></tr>`;
        html += `<tr class="section-header"><td colspan="2"><strong>${t_page('financingActivities')}</strong></td></tr>`;
        html += `<tr><td class="ps-3 text-muted"><em>(أنشطة تمويلية)</em></td><td class="text-end text-muted"><em>N/A</em></td></tr>`;
        html += `<tr class="subtotal-row"><td>${t_page('cashFlowFromFinancing')}</td><td class="text-end">${formatCurrency(cashFromFinancing)}</td></tr>`;
        html += `<tr class="subtotal-row"><td>${t_page('netCashFlow')}</td><td class="text-end">${formatCurrency(netChangeInCash)}</td></tr>`;
        html += `<tr><td>${t_page('beginningCash')}</td><td class="text-end">${formatCurrency(beginningCash)}</td></tr>`;
        html += `<tr class="total-row"><td>${t_page('endingCash')}</td><td class="text-end">${formatCurrency(endingCashCalculated)}</td></tr>`;
        const cashDiff = endingCashCalculated - endingCashFromBS;
        if (Math.abs(cashDiff) > 1) {
             html += `<tr class="table-warning small"><td colspan="2"><em>ملاحظة: النقدية آخر الفترة المحسوبة (${formatCurrency(endingCashCalculated)}) تختلف عن رصيد النقدية في الميزانية (${formatCurrency(endingCashFromBS)}) بفارق ${formatCurrency(cashDiff)}.</em></td></tr>`;
        }
        html += `</tbody></table>`;
        const cfTableElement = document.getElementById('cashFlowStatementTable');
        if(cfTableElement) cfTableElement.innerHTML = html;
        const cfCommentElement = document.getElementById('cashFlowStatementComment');
        if(cfCommentElement) cfCommentElement.textContent = netChangeInCash >= 0 ? t_page('cf_comment_positive') : t_page('cf_comment_negative');
    };
    const renderEquityStatement = () => { /* ... (Code from previous working version) ... */
        const { bs, totals } = state.statements;
        if (!totals || !bs) { console.error("Statement data incomplete for Equity Statement rendering."); return; }
        const openingCapital = totals.totalEquityCapital || 0;
        const netProfit = totals.netProfit || 0;
        const openingRE = (typeof bs.equityRetainedEarnings === 'number' && typeof netProfit === 'number')
                          ? bs.equityRetainedEarnings - netProfit
                          : 0;
        const openingTotalEquity = openingCapital + openingRE;
        const closingCapital = openingCapital;
        const closingRE = bs.equityRetainedEarnings;
        const closingTotalEquity = totals.totalEquity || 0;
        let html = `<table class="table table-sm report-table">`;
        html += `<tbody>`;
        html += `<tr><td>${t_page('totalOpeningEquity')}</td><td class="text-end">${formatCurrency(openingTotalEquity)}</td></tr>`;
        html += `<tr><td>(+) ${t_page('netProfitForEquity')}</td><td class="text-end">${formatCurrency(netProfit)}</td></tr>`;
        html += `<tr class="total-row"><td>${t_page('totalClosingEquity')}</td><td class="text-end">${formatCurrency(closingTotalEquity)}</td></tr>`;
        html += `</tbody></table>`;
        const eqTableElement = document.getElementById('equityStatementTable');
        if(eqTableElement) eqTableElement.innerHTML = html;
        const eqCommentElement = document.getElementById('equityStatementComment');
        if(eqCommentElement) eqCommentElement.textContent = closingTotalEquity >= openingTotalEquity ? t_page('eq_comment_growth') : t_page('eq_comment_decline');
    };

    // *** مُضاف: دالة لإعادة تحميل وعرض البيانات ***
    const reloadAndRenderData = () => {
        console.log("[DEBUG] Reloading and rendering data based on selection.");
        const noDataWarningElement = document.getElementById('noDataWarning');
        // Hide previous statements and warning while loading
        ['balanceSheetCard', 'incomeStatementCard', 'cashFlowStatementCard', 'equityStatementCard'].forEach(id => {
            const card = document.getElementById(id);
            if (card) card.style.display = 'none';
         });
         if(noDataWarningElement) noDataWarningElement.style.display = 'none';

        if (loadDataAndPrepareStatements()) { // Load data based on selection
            console.log("[DEBUG] Data loaded successfully. Rendering statements...");
            // Render statements if data loaded
            renderBalanceSheet();
            renderIncomeStatement();
            renderCashFlowStatement();
            renderEquityStatement();
             // Ensure statement sections are visible
             ['balanceSheetCard', 'incomeStatementCard', 'cashFlowStatementCard', 'equityStatementCard'].forEach(id => {
                const card = document.getElementById(id);
                if (card) card.style.display = 'block';
             });
        } else {
            console.log("[DEBUG] Failed to load data. Showing warning.");
             // Show warning if no data found for selected source
             if(noDataWarningElement) {
                 noDataWarningElement.textContent = t_page('noDataMessage');
                 noDataWarningElement.style.display = 'block';
             }
             // Keep statement sections hidden
        }
         // Re-apply translations after rendering attempt
         if (typeof window.applyTranslations === 'function') {
            console.log("Applying translations after render attempt...");
            window.applyTranslations();
         }
    }

    // --- Initialization ---
    const init = () => {
        console.log("[DEBUG] Initializing report page (Simplified)...");
        
        // Directly call the main logic
        console.log("[DEBUG] Bypassing library load wait. Proceeding with data loading...");
        reloadAndRenderData(); // Initial load and render based on default selection

        // Attach export button listeners
        const exportPdfBtn = document.getElementById('exportPdfBtn');
        if (exportPdfBtn) {
             exportPdfBtn.addEventListener('click', () => {
                if (!state.hasData) { alert(t_page('noDataMessage')); return; }
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
                if (!state.hasData) { alert(t_page('noDataMessage')); return; }
                 if (typeof XLSX !== 'undefined') { 
                     try {
                         const wb = XLSX.utils.book_new();
                         const extractTableData = (tableElement) => { 
                              const data = [];
                             const rows = tableElement?.querySelectorAll('tbody tr');
                             if (!rows) return data;
                             rows.forEach(row => {
                                 const rowData = [];
                                 if(row.cells.length === 2 && !row.classList.contains('section-header')) {
                                     row.querySelectorAll('td').forEach(cell => {
                                         let cellValue = cell.textContent.trim();
                                         const numValue = parseFloat(cellValue.replace(/[,()]/g, ''));
                                         if (!isNaN(numValue) && (cellValue.match(/[\d,.-]+/) || cellValue === '0')) {
                                             rowData.push(numValue);
                                         } else {
                                             rowData.push(cellValue.replace(/[\(\)\-\+:]/g, '').replace(/^[ \t]+|[ \t]+$/g,'').trim());
                                         }
                                     });
                                      if (rowData.length > 0) data.push(rowData);
                                 } else if (row.cells.length > 0 && (row.classList.contains('section-header') || row.classList.contains('total-row') || row.classList.contains('subtotal-row'))) {
                                    rowData.push(row.cells[0].textContent.trim().replace(/[\(\)\-\+:]/g, ''));
                                    if (row.cells.length > 1) {
                                        let cellValue = row.cells[1].textContent.trim();
                                        const numValue = parseFloat(cellValue.replace(/[,()]/g, ''));
                                        if (!isNaN(numValue) && (cellValue.match(/[\d,.-]+/) || cellValue === '0')) {
                                            rowData.push(numValue);
                                        } else {
                                            rowData.push(cellValue);
                                        }
                                    }
                                    if (rowData.length > 0) data.push(rowData);
                                 }
                             });
                             return data;
                         };
                         const addSheet = (tableId, sheetName) => { 
                             const table = document.getElementById(tableId);
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
                             } else { console.warn(`Table element not found: ${tableId}`); }
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

        // *** مُضاف: مستمع حدث لأزرار اختيار المصدر ***
        document.querySelectorAll('input[name="dataSource"]').forEach(radio => {
            radio.addEventListener('change', reloadAndRenderData); // Reload data when selection changes
        });
        // *** نهاية الإضافة ***

        // Apply translations initially
        if (typeof window.applyTranslations === 'function') {
            console.log("Applying initial translations...");
            window.applyTranslations();
        } else { console.warn("applyTranslations function not found."); }

        console.log("[DEBUG] Report page initialization complete.");

    }; // End of simplified init

    // *** Keep loadScript function for potential future use (though not called by simplified init) ***
    const loadScript = (src, onload, onerror) => {
        // ... (Code for loadScript remains the same) ...
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
    
    // Load libraries in background
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js", () => { console.log("html2pdf loaded."); }, () => {});
    loadScript("https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js", () => { console.log("XLSX loaded."); }, () => {});

    init(); // Start the initialization process

}); // End of DOMContentLoaded listener
