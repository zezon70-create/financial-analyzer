// js/report-app.js (Upgraded to handle Comparative (2-Period) Statements and save processed data for other pages)

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
        noPreviousDataMessage: "لم يتم العثور على بيانات فترة سابقة. سيتم عرض بيانات الفترة الحالية فقط.", // *** مُضاف ***
        dataSourceTitle: "مصدر البيانات:",
        sourceTrialBalanceLabel: "استخدام ميزان المراجعة (من صفحة الإدخال)",
        sourceUploadedLabel: "استخدام القوائم المالية المرفوعة (من صفحة الرفع)",
        // *** مُضاف: أعمدة الجدول المقارن ***
        thAccount: "الحساب",
        thCurrentPeriod: "الفترة الحالية",
        thPreviousPeriod: "الفترة السابقة",
        thChangeAbs: "التغير ($)",
        thChangePct: "التغير (%)",
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
        bs_comment_balanced: "تحليل إيجابي: قائمة المركز المالي متوازنة للفترة الحالية.",
        bs_comment_unbalanced: "تحليل يتطلب الانتباه: القائمة غير متوازنة بفارق {diff} للفترة الحالية.",
        bs_comment_growth: "مؤشر نمو: إجمالي الأصول زاد بنسبة {pct} عن الفترة السابقة.", // *** مُضاف ***
        bs_comment_decline: "مؤشر انكماش: إجمالي الأصول انخفض بنسبة {pct} عن الفترة السابقة.", // *** مُضاف ***
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
        is_comment_revenue_growth: "نمو في الإيرادات: الإيرادات زادت بنسبة {pct} عن الفترة السابقة.", // *** مُضاف ***
        is_comment_profit_improvement: "تحسن في الربحية: صافي الربح زاد بشكل ملحوظ عن الفترة السابقة.", // *** مُضاف ***
        // CF Translations
        cfTitle: "قائمة التدفقات النقدية (الطريقة غير المباشرة - تقديرية)",
        cfSubheader: "توضح حركة النقد المقدرة من الأنشطة المختلفة.",
        operatingActivities: "التدفقات النقدية من الأنشطة التشغيلية",
        netIncomeForCF: "صافي الدخل",
        adjustments: "تسويات لبنود غير نقدية:",
        depreciationAmortizationForCF: "إهلاك واستهلاك",
        changesInWorkingCapital: "التغيرات في رأس المال العامل (تقديري)", // *** مُضاف ***
        cashFlowFromOperations: "صافي النقد الناتج من الأنشطة التشغيلية",
        investingActivities: "التدفقات النقدية من الأنشطة الاستثمارية",
        capitalExpenditures: "النفقات الرأسمالية (تقديري)",
        cashFlowFromInvesting: "صافي النقد المستخدم في الأنشطة الاستثمارية",
        financingActivities: "التدفقات النقدية من الأنشطة التمويلية",
        cashFlowFromFinancing: "صافي النقد من (المستخدم في) الأنشطة التمويلية",
        netCashFlow: "صافي التغير في النقد وما في حكمه",
        beginningCash: "النقد وما في حكمه أول الفترة", // *** مُعدل ***
        endingCash: "النقد وما في حكمه آخر الفترة",
        cf_comment_positive: "وضع نقدي جيد: تشير التقديرات إلى توليد تدفقات نقدية تشغيلية موجبة.",
        cf_comment_negative: "مؤشر خطر: تشير التقديرات إلى تدفق نقدي تشغيلي سالب.",
        cf_comment_wc_source: "رأس المال العامل كان مصدراً للنقد (مثال: تحصيل سريع للعملاء).", // *** مُضاف ***
        cf_comment_wc_use: "رأس المال العامل كان استخداماً للنقد (مثال: زيادة المخزون أو بطء التحصيل).", // *** مُضاف ***
        // EQ Translations
        eqTitle: "قائمة التغيرات في حقوق الملكية",
        eqSubheader: "توضح التغيرات التي طرأت على حقوق الملكية خلال الفترة.",
        openingBalanceCapital: "رأس المال أول الفترة",
        openingBalanceRetainedEarnings: "أرباح محتجزة أول الفترة",
        totalOpeningEquity: "إجمالي حقوق الملكية أول الفترة",
        netProfitForEquity: "صافي ربح / (خسارة) الفترة",
        dividends: "توزيعات أرباح (تقديري/إن وجدت)", // *** مُضاف ***
        closingBalanceCapital: "رأس المال آخر الفترة",
        closingBalanceRetainedEarnings: "أرباح محتجزة آخر الفترة",
        totalClosingEquity: "إجمالي حقوق الملكية آخر الفترة",
        eq_comment_growth: "نمو في حقوق المساهمين: حقوق الملكية زادت خلال الفترة.",
        eq_comment_decline: "انخفاض في حقوق المساهمين: حقوق الملكية انخفضت.",
    },
    en: {
        // *** Please fill in ALL English translations corresponding to the Arabic ones above ***
        // ... (translations omitted for brevity, but all new keys should be added here) ...
        noDataMessage: "No financial data available for the selected source. Please enter data first or change the source.",
        noPreviousDataMessage: "Previous period data not found. Only current period data will be displayed.",
        dataSourceTitle: "Data Source:",
        sourceTrialBalanceLabel: "Use Trial Balance (from Input page)",
        sourceUploadedLabel: "Use Uploaded Statements (from Upload page)",
        thAccount: "Account", thCurrentPeriod: "Current Period", thPreviousPeriod: "Previous Period", thChangeAbs: "Change ($)", thChangePct: "Change (%)",
        // ... (all other en translations) ...
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("[DEBUG] report-app.js script started execution.");

    const state = {
        trialDataCurrent: [],
        trialDataPrevious: [],
        uploadedDataCurrent: null,
        uploadedDataPrevious: null,
        // *** مُعدل: فصل بيانات الفترتين ***
        statementsCurrent: null, // Will hold processed data for Current Period
        statementsPrevious: null, // Will hold processed data for Previous Period
        hasDataCurrent: false,
        hasDataPrevious: false
    };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`;
    const formatCurrency = (value, decimals = 0) => { /* ... (same as before) ... */
        if (!isFinite(value)) return "N/A";
         const roundedValue = parseFloat(value.toFixed(decimals));
         if (Math.abs(roundedValue) < Math.pow(10, -decimals) && roundedValue < 0) {
              return (0).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
         }
         return roundedValue.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    };
     // *** مُضاف: دالة مساعدة لتنسيق نسبة التغير ***
    const formatChangePercent = (current, previous) => {
        if (!isFinite(current) || !isFinite(previous) || previous === 0) {
            if (current > 0) return "New"; // Or 100% if preferred
            if (current === 0 && previous === 0) return "0.0%";
            return "N/A";
        }
        const change = (current - previous) / Math.abs(previous);
        const sign = change > 0 ? '+' : '';
        return sign + (change * 100).toFixed(1) + '%';
    };


    // --- Data Loading and Processing Logic ---

    // *** مُعدل: هذه الدالة الآن تعالج بيانات مرفوعة لفترة واحدة وتعيدها ***
    const processUploadedData = (uploadedData) => {
        try {
            console.log("Processing uploaded data (Placeholder Logic)...");
            // *** هذا المنطق افتراضي ويجب تعديله ليطابق الهيكل الفعلي لبيانات الرفع ***
            if (!uploadedData || (!uploadedData.balanceSheet && !uploadedData.incomeStatement)) {
                 console.warn("Uploaded data is empty or invalid format.");
                 return null;
            }
            
            const bsData = uploadedData.balanceSheet || {};
            const isData = uploadedData.incomeStatement || {};
            const statements = { // Create a new statements object
                bs: { currentAssets: [], nonCurrentAssets: [], currentLiabilities: [], nonCurrentLiabilities: [], equityCapital: [], equityRetainedEarnings: 0 },
                is: { revenue: [], cogs: [], genAdminExpenses: [], sellingMarketingExpenses: [], depreciationAmortization: [], otherOperatingExpenses: [], interestExpense: [], taxExpense: [] },
                totals: {}
            };
            const totals = statements.totals;

            // Map BS items
            statements.bs.currentAssets = bsData.currentAssets || [];
            statements.bs.nonCurrentAssets = bsData.nonCurrentAssets || [];
            statements.bs.currentLiabilities = bsData.currentLiabilities || [];
            statements.bs.nonCurrentLiabilities = bsData.nonCurrentLiabilities || [];
            statements.bs.equityCapital = bsData.equity?.filter(item => item.account.toLowerCase().includes('capital') || item.account.includes('رأس المال')) || [];
            const openingREItem = bsData.equity?.find(item => item.account.toLowerCase().includes('retained') || item.account.includes('أرباح'));
            statements.bs.equityRetainedEarnings = openingREItem ? openingREItem.value : 0; // *Assumes* this is opening RE

            // Map IS items
            statements.is.revenue = isData.revenue || [];
            statements.is.cogs = isData.cogs || [];
            statements.is.genAdminExpenses = isData.expenses?.filter(e => e.type === 'genAdmin') || [];
            statements.is.sellingMarketingExpenses = isData.expenses?.filter(e => e.type === 'sellingMarketing') || [];
            statements.is.depreciationAmortization = isData.expenses?.filter(e => e.type === 'depreciation') || [];
            statements.is.interestExpense = isData.expenses?.filter(e => e.type === 'interest') || [];
            statements.is.taxExpense = isData.expenses?.filter(e => e.type === 'tax') || [];
            statements.is.otherOperatingExpenses = isData.expenses?.filter(e => !e.type || !['genAdmin', 'sellingMarketing', 'depreciation', 'interest', 'tax'].includes(e.type)) || [];

            // Calculate Totals
            const sumValues = (arr) => arr.reduce((sum, item) => sum + (item.value || 0), 0);
            totals.totalCurrentAssets = sumValues(statements.bs.currentAssets);
            totals.totalNonCurrentAssets = sumValues(statements.bs.nonCurrentAssets);
            totals.totalAssets = totals.totalCurrentAssets + totals.totalNonCurrentAssets;
            totals.totalCurrentLiabilities = sumValues(statements.bs.currentLiabilities);
            totals.totalNonCurrentLiabilities = sumValues(statements.bs.nonCurrentLiabilities);
            totals.totalLiabilities = totals.totalCurrentLiabilities + totals.totalNonCurrentLiabilities;
            totals.totalRevenue = sumValues(statements.is.revenue);
            totals.totalCogs = sumValues(statements.is.cogs);
            totals.grossProfit = totals.totalRevenue - totals.totalCogs;
            totals.depreciationTotal = sumValues(statements.is.depreciationAmortization);
            totals.totalOperatingExpenses = sumValues(statements.is.genAdminExpenses) + sumValues(statements.is.sellingMarketingExpenses) + totals.depreciationTotal + sumValues(statements.is.otherOperatingExpenses);
            totals.operatingProfit = totals.grossProfit - totals.totalOperatingExpenses; // EBIT approx.
            totals.totalInterest = sumValues(statements.is.interestExpense); // *** مُضاف: حفظ إجمالي الفائدة ***
            totals.profitBeforeTax = totals.operatingProfit - totals.totalInterest;
            totals.totalTax = sumValues(statements.is.taxExpense);
            totals.netProfit = totals.profitBeforeTax - totals.totalTax;
            totals.totalEquityCapital = sumValues(statements.bs.equityCapital);
            statements.bs.equityRetainedEarnings += totals.netProfit; // Calculate closing RE
            totals.totalEquity = totals.totalEquityCapital + statements.bs.equityRetainedEarnings;
            totals.totalLiabilitiesAndEquity = totals.totalLiabilities + totals.totalEquity;
            
            // *** مُضاف: حساب المجاميع الفرعية لصفحة advanced ***
            const cashItem = statements.bs.currentAssets.find(item => item.account.toLowerCase().includes('cash') || item.account.includes('نقد') || item.account.includes('bank') || item.account.includes('بنك'));
            totals.cashEquivalents = cashItem ? cashItem.value : 0;
            totals.accountsReceivable = sumValues(statements.bs.currentAssets.filter(item => item.account.toLowerCase().includes('receivable') || item.account.includes('عملاء')));
            totals.inventory = sumValues(statements.bs.currentAssets.filter(item => item.account.toLowerCase().includes('inventory') || item.account.includes('مخزون')));
            totals.accountsPayable = sumValues(statements.bs.currentLiabilities.filter(item => item.account.toLowerCase().includes('payable') || item.account.includes('مورد')));
            totals.shortTermDebt = sumValues(statements.bs.currentLiabilities.filter(item => item.account.toLowerCase().includes('loan') || item.account.includes('قرض قصير')));
            totals.workingCapital = totals.totalCurrentAssets - totals.totalCurrentLiabilities;
            totals.ebit = totals.operatingProfit; // Use Operating Profit as EBIT
            totals.purchases = totals.totalCogs; // Simplified proxy
            totals.retainedEarnings = statements.bs.equityRetainedEarnings; // Closing RE
            
            console.log("Successfully processed uploaded data chunk.");
            return statements; // Return the processed object
        } catch (error) {
            console.error("Error processing uploaded data:", error);
            return null; // Return null on failure
        }
    };

    // *** مُعدل: هذه الدالة الآن تعالج ميزان مراجعة واحد وتعيده ***
    const buildStatementsFromTrialData = (trialDataArray) => {
        const statements = {
            bs: { currentAssets: [], nonCurrentAssets: [], currentLiabilities: [], nonCurrentLiabilities: [], equityCapital: [], equityRetainedEarnings: 0 },
            is: { revenue: [], cogs: [], genAdminExpenses: [], sellingMarketingExpenses: [], depreciationAmortization: [], otherOperatingExpenses: [], interestExpense: [], taxExpense: [] },
            totals: {}
        };
        const totals = statements.totals;

        // Initialize totals
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

        trialDataArray.forEach(row => {
            const value = (parseFloat(row.Debit) || 0) - (parseFloat(row.Credit) || 0);
            const mainType = row.MainType || '';
            const subType = row.SubType || '';
            const accountName = (row.Account || '').toLowerCase();
            const account = row.Account || 'Unknown';
            const item = { account, value }; // Use positive value for Assets/Expenses

            if (mainType.includes('الأصول') || mainType.includes('Assets')) {
                if (subType.includes('متداول') || subType.includes('Current')) {
                    statements.bs.currentAssets.push(item);
                    totals.totalCurrentAssets += value;
                    if (accountName.includes('cash') || accountName.includes('نقد') || accountName.includes('bank') || accountName.includes('بنك')) { totals.cashEquivalents += value; }
                    if (accountName.includes('receivable') || accountName.includes('عملاء')) { totals.accountsReceivable += value; }
                    if (accountName.includes('inventory') || accountName.includes('مخزون')) { totals.inventory += value; }
                } else {
                    statements.bs.nonCurrentAssets.push(item);
                    totals.totalNonCurrentAssets += value;
                }
            } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) {
                 item.value = -value; // Store liabilities as positive balances
                 if (subType.includes('متداول') || subType.includes('Current')) {
                     statements.bs.currentLiabilities.push(item);
                     totals.totalCurrentLiabilities += item.value;
                     if (accountName.includes('payable') || accountName.includes('مورد')) { totals.accountsPayable += item.value; }
                     if (accountName.includes('loan') || accountName.includes('قرض قصير')) { totals.shortTermDebt += item.value; }
                 } else {
                     statements.bs.nonCurrentLiabilities.push(item);
                     totals.totalNonCurrentLiabilities += item.value;
                 }
            } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) {
                 item.value = -value; // Store equity as positive balances
                 if (subType.includes('رأس المال') || subType.includes('Capital') || accountName.includes('capital') || accountName.includes('رأس المال')) {
                    statements.bs.equityCapital.push(item);
                    totals.totalEquityCapital += item.value;
                 } else if (subType.includes('الأرباح المحتجزة') || subType.includes('Retained Earnings') || accountName.includes('retained')) {
                     statements.bs.equityRetainedEarnings = item.value; // This is OPENING RE
                 } else {
                      statements.bs.equityCapital.push(item); // Add other equity to capital
                      totals.totalEquityCapital += item.value;
                 }
            }
            else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) {
                 if (subType.includes('الإيرادات') || subType.includes('Revenue')) {
                     item.value = -value; // Store revenue as positive
                     statements.is.revenue.push(item);
                     totals.totalRevenue += item.value;
                 } else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) {
                     statements.is.cogs.push(item);
                     totals.totalCogs += value;
                 } else if (subType.includes('مشتريات') || subType.includes('Purchases') || accountName.includes('purchase')) {
                     statements.is.otherOperatingExpenses.push(item); // Treat as expense
                     totals.purchases += value; // Track purchases for CCC
                     totals.totalOperatingExpenses += value;
                 } else {
                      if (subType.includes('إهلاك') || subType.includes('Depreciation') || accountName.includes('depreciation') || accountName.includes('amortization')) {
                          statements.is.depreciationAmortization.push(item);
                          totals.depreciationTotal += value;
                      } else if (subType.includes('فائدة') || subType.includes('Interest') || accountName.includes('interest')) {
                          statements.is.interestExpense.push(item);
                          totals.totalInterest += value;
                      } else if (subType.includes('ضريب') || subType.includes('Tax') || accountName.includes('tax')) {
                           statements.is.taxExpense.push(item);
                           totals.totalTax += value;
                      } else if (subType.includes('بيع') || subType.includes('Selling') || subType.includes('Marketing') || accountName.includes('selling') || accountName.includes('marketing')) {
                          statements.is.sellingMarketingExpenses.push(item);
                      } else if (subType.includes('إداري') || subType.includes('General') || subType.includes('Admin') || accountName.includes('general') || accountName.includes('admin')) {
                          statements.is.genAdminExpenses.push(item);
                      } else {
                          statements.is.otherOperatingExpenses.push(item);
                      }
                 }
            }
        });

        // --- Calculate Totals and Subtotals ---
        totals.totalAssets = totals.totalCurrentAssets + totals.totalNonCurrentAssets;
        totals.totalLiabilities = totals.totalCurrentLiabilities + totals.totalNonCurrentLiabilities;
        totals.grossProfit = totals.totalRevenue - totals.totalCogs;
        
        // Sum all op-ex categories
        totals.totalOperatingExpenses = 
            (state.statements.is.genAdminExpenses.reduce((s, i) => s + i.value, 0)) +
            (state.statements.is.sellingMarketingExpenses.reduce((s, i) => s + i.value, 0)) +
            (totals.depreciationTotal || 0) +
            (state.statements.is.otherOperatingExpenses.reduce((s, i) => s + i.value, 0));

        totals.operatingProfit = totals.grossProfit - totals.totalOperatingExpenses; // EBIT approx.
        totals.profitBeforeTax = totals.operatingProfit - totals.totalInterest;
        totals.netProfit = totals.profitBeforeTax - totals.totalTax;
        
        // Calculate closing equity
        statements.bs.equityRetainedEarnings += totals.netProfit; // Closing RE = Opening RE + Net Profit
        totals.retainedEarnings = statements.bs.equityRetainedEarnings; // Save closing RE for advanced
        totals.totalEquity = totals.totalEquityCapital + statements.bs.equityRetainedEarnings;
        totals.totalLiabilitiesAndEquity = totals.totalLiabilities + totals.totalEquity;

        // Final totals for advanced
        totals.workingCapital = totals.totalCurrentAssets - totals.totalCurrentLiabilities;
        totals.ebit = totals.operatingProfit;
        if (totals.purchases === 0) totals.purchases = totals.totalCogs; // Proxy if purchases not found

        console.log("Processed Statements Data from Trial Balance:", statements);
        console.log("Calculated Totals from Trial Balance:", totals);
        return statements; // Return the processed object
    };

    // Main function to load data based on selected source
    const loadDataAndPrepareStatements = () => {
        state.hasDataCurrent = false; // Reset flags
        state.hasDataPrevious = false;
        state.statementsCurrent = null;
        state.statementsPrevious = null;
        
        const selectedSource = document.querySelector('input[name="dataSource"]:checked')?.value || 'trialData';
        console.log(`[DEBUG] Selected data source: ${selectedSource}`);

        const load = (sourceKey, stateKey, rawDataKey) => {
            const dataString = localStorage.getItem(sourceKey);
            if (!dataString) {
                console.warn(`[DEBUG] ${sourceKey} not found in localStorage.`);
                return false;
            }
            try {
                const parsedData = JSON.parse(dataString);
                if (selectedSource === 'uploadedData') {
                    // *** Logic for uploaded data ***
                    // (Assuming uploadedDataCurrent and uploadedDataPrevious are keys)
                    if (parsedData && (parsedData.balanceSheet || parsedData.incomeStatement)) {
                        console.log(`[DEBUG] Found valid ${sourceKey}, processing...`);
                        state[stateKey] = processUploadedData(parsedData); // Process and store
                        return !!state[stateKey]; // Return true if processing succeeded
                    }
                } else {
                    // *** Logic for trialData ***
                    if (Array.isArray(parsedData) && parsedData.length > 0 && !(parsedData.length === 1 && !parsedData[0].Account && !toNum(parsedData[0].Debit) && !toNum(parsedData[0].Credit))) {
                        console.log(`[DEBUG] Found valid ${sourceKey}, building statements...`);
                        state[stateKey] = buildStatementsFromTrialData(parsedData); // Process and store
                        return !!state[stateKey]; // Return true if processing succeeded
                    }
                }
                console.warn(`[DEBUG] ${sourceKey} found but is empty or invalid.`);
                return false;
            } catch (e) {
                console.error(`Error parsing ${sourceKey}:`, e);
                return false;
            }
        };

        // Try loading both current and previous periods
        if (selectedSource === 'uploadedData') {
            state.hasDataCurrent = load('uploadedFinancialData', 'statementsCurrent');
            state.hasDataPrevious = load('uploadedFinancialDataPrevious', 'statementsPrevious'); // Assumes this key exists
        } else {
            state.hasDataCurrent = load('trialData', 'statementsCurrent', 'rawData');
            state.hasDataPrevious = load('trialDataPrevious', 'statementsPrevious', 'rawDataPrevious');
        }

        // *** حفظ المخرجات النظيفة لصفحة advanced ***
        if (state.hasDataCurrent) {
            try {
                localStorage.setItem('financialDataCurrent', JSON.stringify(state.statementsCurrent));
                console.log("[DEBUG] Saved processed 'financialDataCurrent' to localStorage.");
            } catch (e) { console.error("Failed to save financialDataCurrent:", e); }
        } else {
            localStorage.removeItem('financialDataCurrent'); // Clear if no data
        }
        
        if (state.hasDataPrevious) {
             try {
                localStorage.setItem('financialDataPrevious', JSON.stringify(state.statementsPrevious));
                console.log("[DEBUG] Saved processed 'financialDataPrevious' to localStorage.");
            } catch (e) { console.error("Failed to save financialDataPrevious:", e); }
        } else {
            localStorage.removeItem('financialDataPrevious'); // Clear if no data
        }

        return state.hasDataCurrent; // Return true if *at least* current data is loaded
    };


    // --- Rendering Functions ---

    // *** مُعدل: دالة عرض قسم واحدة تتعامل مع المقارنات ***
    const renderComparativeSection = (itemsCurrent = [], itemsPrevious = [], sectionTitle, totalLabel, cssClass = '', decimals = 0) => {
        let sectionTotalCurrent = 0;
        let sectionTotalPrevious = 0;
        let html = '';

        // Create a map of all unique accounts from both periods
        const allAccountNames = new Set([
            ...itemsCurrent.map(i => i.account),
            ...itemsPrevious.map(i => i.account)
        ]);
        
        const prevItemsMap = new Map(itemsPrevious.map(item => [item.account, item.value]));

        if (allAccountNames.size > 0 || sectionTitle) {
            html += `<tr class="section-header ${cssClass}"><td colspan="5"><strong>${sectionTitle || ''}</strong></td></tr>`;
        }

        allAccountNames.forEach(account => {
            const currentItem = itemsCurrent.find(i => i.account === account);
            const currentValue = currentItem ? currentItem.value : 0;
            const previousValue = prevItemsMap.get(account) || 0;
            const changeAbs = currentValue - previousValue;
            const changePct = formatChangePercent(currentValue, previousValue);
            
            html += `<tr>
                        <td class="ps-3">${account}</td>
                        <td class="text-end">${formatCurrency(currentValue, decimals)}</td>
                        <td class="text-end">${formatCurrency(previousValue, decimals)}</td>
                        <td class="text-end">${formatCurrency(changeAbs, decimals)}</td>
                        <td class="text-end ${changeAbs > 0 ? 'text-success' : (changeAbs < 0 ? 'text-danger' : '')}">${changePct}</td>
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
                        <td class="text-end">${formatCurrency(sectionTotalPrevious, decimals)}</td>
                        <td class="text-end">${formatCurrency(totalChangeAbs, decimals)}</td>
                        <td class="text-end ${totalChangeAbs > 0 ? 'text-success' : (totalChangeAbs < 0 ? 'text-danger' : '')}">${totalChangePct}</td>
                     </tr>`;
        }
        return { html, totalCurrent: sectionTotalCurrent, totalPrevious: sectionTotalPrevious };
    };

    // *** مُعدل: دالة عرض الميزانية المقارنة ***
    const renderBalanceSheet = () => {
        const stmtCurrent = state.statementsCurrent;
        const stmtPrevious = state.statementsPrevious;
        
        // Use empty objects as fallback if data is missing
        const bsCurrent = stmtCurrent?.bs || { currentAssets: [], nonCurrentAssets: [], currentLiabilities: [], nonCurrentLiabilities: [], equityCapital: [] };
        const totalsCurrent = stmtCurrent?.totals || {};
        const bsPrevious = stmtPrevious?.bs || { currentAssets: [], nonCurrentAssets: [], currentLiabilities: [], nonCurrentLiabilities: [], equityCapital: [] };
        const totalsPrevious = stmtPrevious?.totals || {};

        let html = '<table class="table table-sm report-table"><thead><tr>';
        html += `<th>${t_page('thAccount')}</th>`;
        html += `<th class="text-end">${t_page('thCurrentPeriod')}</th>`;
        if (state.hasDataPrevious) { // Only show previous columns if data exists
            html += `<th class="text-end">${t_page('thPreviousPeriod')}</th>`;
            html += `<th class="text-end">${t_page('thChangeAbs')}</th>`;
            html += `<th class="text-end">${t_page('thChangePct')}</th>`;
        }
        html += '</tr></thead><tbody>';

        // Assets
        const caHtml = renderComparativeSection(bsCurrent.currentAssets, bsPrevious.currentAssets, t_page('currentAssets'), t_page('totalCurrentAssets'), 'assets-section');
        const ncaHtml = renderComparativeSection(bsCurrent.nonCurrentAssets, bsPrevious.nonCurrentAssets, t_page('nonCurrentAssets'), t_page('totalNonCurrentAssets'), 'assets-section');
        html += caHtml.html + ncaHtml.html;
        html += `<tr class="total-row assets-section">
                    <td>${t_page('totalAssets')}</td>
                    <td class="text-end">${formatCurrency(totalsCurrent.totalAssets)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(totalsPrevious.totalAssets)}</td>
                    <td class="text-end">${formatCurrency((totalsCurrent.totalAssets || 0) - (totalsPrevious.totalAssets || 0))}</td>
                    <td class="text-end ${((totalsCurrent.totalAssets || 0) - (totalsPrevious.totalAssets || 0)) > 0 ? 'text-success' : 'text-danger'}">${formatChangePercent(totalsCurrent.totalAssets, totalsPrevious.totalAssets)}</td>
                    ` : ''}
                 </tr>`;

        // Liabilities
        const clHtml = renderComparativeSection(bsCurrent.currentLiabilities, bsPrevious.currentLiabilities, t_page('currentLiabilities'), t_page('totalCurrentLiabilities'), 'liabilities-section');
        const nclHtml = renderComparativeSection(bsCurrent.nonCurrentLiabilities, bsPrevious.nonCurrentLiabilities, t_page('nonCurrentLiabilities'), t_page('totalNonCurrentLiabilities'), 'liabilities-section');
        html += clHtml.html + nclHtml.html;
        html += `<tr class="subtotal-row liabilities-section">
                    <td>${t_page('totalLiabilities')}</td>
                    <td class="text-end">${formatCurrency(totalsCurrent.totalLiabilities)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(totalsPrevious.totalLiabilities)}</td>
                    <td class="text-end">${formatCurrency((totalsCurrent.totalLiabilities || 0) - (totalsPrevious.totalLiabilities || 0))}</td>
                    <td class="text-end ${((totalsCurrent.totalLiabilities || 0) - (totalsPrevious.totalLiabilities || 0)) > 0 ? 'text-danger' : 'text-success'}">${formatChangePercent(totalsCurrent.totalLiabilities, totalsPrevious.totalLiabilities)}</td>
                    ` : ''}
                 </tr>`;

        // Equity
        const eqCapHtml = renderComparativeSection(bsCurrent.equityCapital, bsPrevious.equityCapital, t_page('equity'), null, 'equity-section');
        html += eqCapHtml.html;
        // Manual row for Retained Earnings (Closing)
        const reCurrent = bsCurrent.equityRetainedEarnings || 0;
        const rePrevious = bsPrevious.equityRetainedEarnings || 0;
        const reChangeAbs = reCurrent - rePrevious;
        html += `<tr>
                    <td class="ps-3">${t_page('retainedEarnings')}</td>
                    <td class="text-end">${formatCurrency(reCurrent)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(rePrevious)}</td>
                    <td class="text-end">${formatCurrency(reChangeAbs)}</td>
                    <td class="text-end ${reChangeAbs > 0 ? 'text-success' : 'text-danger'}">${formatChangePercent(reCurrent, rePrevious)}</td>
                    ` : ''}
                 </tr>`;
        html += `<tr class="subtotal-row equity-section">
                    <td>${t_page('totalEquity')}</td>
                    <td class="text-end">${formatCurrency(totalsCurrent.totalEquity)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(totalsPrevious.totalEquity)}</td>
                    <td class="text-end">${formatCurrency((totalsCurrent.totalEquity || 0) - (totalsPrevious.totalEquity || 0))}</td>
                    <td class="text-end ${((totalsCurrent.totalEquity || 0) - (totalsPrevious.totalEquity || 0)) > 0 ? 'text-success' : 'text-danger'}">${formatChangePercent(totalsCurrent.totalEquity, totalsPrevious.totalEquity)}</td>
                    ` : ''}
                 </tr>`;
        
        // Final Total L+E
        html += `<tr class="total-row equity-section">
                    <td>${t_page('totalLiabilitiesAndEquity')}</td>
                    <td class="text-end">${formatCurrency(totalsCurrent.totalLiabilitiesAndEquity)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(totalsPrevious.totalLiabilitiesAndEquity)}</td>
                    <td class="text-end">${formatCurrency((totalsCurrent.totalLiabilitiesAndEquity || 0) - (totalsPrevious.totalLiabilitiesAndEquity || 0))}</td>
                    <td class="text-end ${((totalsCurrent.totalLiabilitiesAndEquity || 0) - (totalsPrevious.totalLiabilitiesAndEquity || 0)) > 0 ? 'text-success' : 'text-danger'}">${formatChangePercent(totalsCurrent.totalLiabilitiesAndEquity, totalsPrevious.totalLiabilitiesAndEquity)}</td>
                    ` : ''}
                 </tr>`;

        html += '</tbody></table>';
        document.getElementById('balanceSheetTable').innerHTML = html;

        // Commentary
        const diff = (totalsCurrent.totalAssets || 0) - (totalsCurrent.totalLiabilitiesAndEquity || 0);
        let comment = Math.abs(diff) < 1 ? t_page('bs_comment_balanced') : t_page('bs_comment_unbalanced').replace('{diff}', formatCurrency(diff));
        if (state.hasDataPrevious && totalsPrevious.totalAssets !== 0) {
            const assetGrowth = ((totalsCurrent.totalAssets - totalsPrevious.totalAssets) / Math.abs(totalsPrevious.totalAssets));
            if (assetGrowth > 0) {
                comment += " " + t_page('bs_comment_growth').replace('{pct}', formatChangePercent(totalsCurrent.totalAssets, totalsPrevious.totalAssets));
            } else if (assetGrowth < 0) {
                 comment += " " + t_page('bs_comment_decline').replace('{pct}', formatChangePercent(totalsCurrent.totalAssets, totalsPrevious.totalAssets));
            }
        }
        document.getElementById('balanceSheetComment').textContent = comment;
    };

    // *** مُعدل: دالة عرض قائمة الدخل المقارنة ***
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

        // Revenue
        const revHtml = renderComparativeSection(isCurrent.revenue, isPrevious.revenue, null, t_page('revenue'), 'profit-row', 2);
        html += revHtml.html;

        // COGS
        const cogsHtml = renderComparativeSection(isCurrent.cogs, isPrevious.cogs, null, `(-) ${t_page('cogs')}`, 'expense-total', 2);
        html += cogsHtml.html;

        // Gross Profit
        html += `<tr class="subtotal-row profit-row">
                    <td>${t_page('grossProfit')}</td>
                    <td class="text-end">${formatCurrency(totalsCurrent.grossProfit, 2)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(totalsPrevious.grossProfit, 2)}</td>
                    <td class="text-end">${formatCurrency((totalsCurrent.grossProfit || 0) - (totalsPrevious.grossProfit || 0), 2)}</td>
                    <td class="text-end ${((totalsCurrent.grossProfit || 0) - (totalsPrevious.grossProfit || 0)) > 0 ? 'text-success' : 'text-danger'}">${formatChangePercent(totalsCurrent.grossProfit, totalsPrevious.grossProfit)}</td>
                    ` : ''}
                 </tr>`;
                 
        // Operating Expenses
        html += `<tr class="section-header"><td colspan="5"><strong>(-) ${t_page('operatingExpenses')}</strong></td></tr>`;
        const gaHtml = renderComparativeSection(isCurrent.genAdminExpenses, isPrevious.genAdminExpenses, null, null, '', 2);
        const smHtml = renderComparativeSection(isCurrent.sellingMarketingExpenses, isPrevious.sellingMarketingExpenses, null, null, '', 2);
        const depHtml = renderComparativeSection(isCurrent.depreciationAmortization, isPrevious.depreciationAmortization, null, null, '', 2);
        const opexHtml = renderComparativeSection(isCurrent.otherOperatingExpenses, isPrevious.otherOperatingExpenses, null, null, '', 2);
        html += gaHtml.html + smHtml.html + depHtml.html + opexHtml.html;
        
        // Total Operating Expenses
        html += `<tr class="subtotal-row expense-total">
                    <td>${t_page('total')} ${t_page('operatingExpenses')}</td>
                    <td class="text-end">${formatCurrency(totalsCurrent.totalOperatingExpenses, 2)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(totalsPrevious.totalOperatingExpenses, 2)}</td>
                    <td class="text-end">${formatCurrency((totalsCurrent.totalOperatingExpenses || 0) - (totalsPrevious.totalOperatingExpenses || 0), 2)}</td>
                    <td class="text-end ${((totalsCurrent.totalOperatingExpenses || 0) - (totalsPrevious.totalOperatingExpenses || 0)) > 0 ? 'text-danger' : 'text-success'}">${formatChangePercent(totalsCurrent.totalOperatingExpenses, totalsPrevious.totalOperatingExpenses)}</td>
                    ` : ''}
                 </tr>`;

        // Operating Profit
        html += `<tr class="subtotal-row profit-row">
                    <td>${t_page('operatingProfit')}</td>
                    <td class="text-end">${formatCurrency(totalsCurrent.operatingProfit, 2)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(totalsPrevious.operatingProfit, 2)}</td>
                    <td class="text-end">${formatCurrency((totalsCurrent.operatingProfit || 0) - (totalsPrevious.operatingProfit || 0), 2)}</td>
                    <td class="text-end ${((totalsCurrent.operatingProfit || 0) - (totalsPrevious.operatingProfit || 0)) > 0 ? 'text-success' : 'text-danger'}">${formatChangePercent(totalsCurrent.operatingProfit, totalsPrevious.operatingProfit)}</td>
                    ` : ''}
                 </tr>`;

        // Interest
        const intHtml = renderComparativeSection(isCurrent.interestExpense, isPrevious.interestExpense, null, `(-) ${t_page('interestExpense')}`, 'expense-total', 2);
        html += intHtml.html;
        
        // PBT
        html += `<tr class="subtotal-row profit-row">
                    <td>${t_page('profitBeforeTax')}</td>
                    <td class="text-end">${formatCurrency(totalsCurrent.profitBeforeTax, 2)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(totalsPrevious.profitBeforeTax, 2)}</td>
                    <td class="text-end">${formatCurrency((totalsCurrent.profitBeforeTax || 0) - (totalsPrevious.profitBeforeTax || 0), 2)}</td>
                    <td class="text-end ${((totalsCurrent.profitBeforeTax || 0) - (totalsPrevious.profitBeforeTax || 0)) > 0 ? 'text-success' : 'text-danger'}">${formatChangePercent(totalsCurrent.profitBeforeTax, totalsPrevious.profitBeforeTax)}</td>
                    ` : ''}
                 </tr>`;

        // Tax
        const taxHtml = renderComparativeSection(isCurrent.taxExpense, isPrevious.taxExpense, null, `(-) ${t_page('taxExpense')}`, 'expense-total', 2);
        html += taxHtml.html;

        // Net Profit
        html += `<tr class="total-row profit-row">
                    <td>${t_page('netProfit')}</td>
                    <td class="text-end">${formatCurrency(totalsCurrent.netProfit, 2)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(totalsPrevious.netProfit, 2)}</td>
                    <td class="text-end">${formatCurrency((totalsCurrent.netProfit || 0) - (totalsPrevious.netProfit || 0), 2)}</td>
                    <td class="text-end ${((totalsCurrent.netProfit || 0) - (totalsPrevious.netProfit || 0)) > 0 ? 'text-success' : 'text-danger'}">${formatChangePercent(totalsCurrent.netProfit, totalsPrevious.netProfit)}</td>
                    ` : ''}
                 </tr>`;

        html += '</tbody></table>';
        document.getElementById('incomeStatementTable').innerHTML = html;

        // Commentary
        const margin = totalsCurrent.totalRevenue !== 0 ? (totalsCurrent.netProfit / totalsCurrent.totalRevenue) * 100 : 0;
        let comment = totalsCurrent.netProfit >= 0 
            ? t_page('is_comment_profit').replace('{profit}', formatCurrency(totalsCurrent.netProfit, 2)).replace('{margin}', margin.toFixed(1))
            : t_page('is_comment_loss').replace('{profit}', formatCurrency(totalsCurrent.netProfit, 2));
            
        if (state.hasDataPrevious) {
             if (totalsCurrent.totalRevenue > totalsPrevious.totalRevenue) {
                 comment += " " + t_page('is_comment_revenue_growth').replace('{pct}', formatChangePercent(totalsCurrent.totalRevenue, totalsPrevious.totalRevenue));
             }
             if (totalsCurrent.netProfit > totalsPrevious.netProfit && totalsPrevious.netProfit > 0) { // Check if previous was also profit
                 comment += " " + t_page('is_comment_profit_improvement');
             }
        }
        document.getElementById('incomeStatementComment').textContent = comment;
     };

    // *** مُعدل: دالة عرض قائمة التدفقات المقارنة ***
    const renderCashFlowStatement = () => {
        const totalsCurrent = state.statementsCurrent?.totals || {};
        const totalsPrevious = state.statementsPrevious?.totals || {};

        // Calculate CF items for Current Period
        const netProfitC = totalsCurrent.netProfit || 0;
        const depreciationC = totalsCurrent.depreciationTotal || 0;
        const changeInWC_C = (totalsCurrent.workingCapital || 0) - (totalsPrevious.workingCapital || 0); // Requires previous data
        const cashFromOpsC = netProfitC + depreciationC - (state.hasDataPrevious ? changeInWC_C : 0); // Only adjust WC if prev data exists
        const cashFromInvestingC = -depreciationC; // Proxy
        const cashFromFinancingC = 0; // Proxy
        const netChangeInCashC = cashFromOpsC + cashFromInvestingC + cashFromFinancingC;
        const beginningCashC = totalsPrevious.cashEquivalents || 0; // Use previous period's ending cash
        const endingCashCalculatedC = beginningCashC + netChangeInCashC;
        const endingCashFromBSC = totalsCurrent.cashEquivalents || 0;

         // Calculate CF items for Previous Period (simpler, as it has no "previous" for WC change)
        const netProfitP = totalsPrevious.netProfit || 0;
        const depreciationP = totalsPrevious.depreciationTotal || 0;
        const cashFromOpsP = netProfitP + depreciationP; // No WC change calculated
        const cashFromInvestingP = -depreciationP; // Proxy
        const cashFromFinancingP = 0; // Proxy
        const netChangeInCashP = cashFromOpsP + cashFromInvestingP + cashFromFinancingP;
        const beginningCashP = 0; // Assumption for the oldest period
        const endingCashCalculatedP = beginningCashP + netChangeInCashP;
        
        let html = '<table class="table table-sm report-table"><thead><tr>';
        html += `<th>${t_page('thAccount')}</th>`;
        html += `<th class="text-end">${t_page('thCurrentPeriod')}</th>`;
        if (state.hasDataPrevious) {
            html += `<th class="text-end">${t_page('thPreviousPeriod')}</th>`;
        }
        html += '</tr></thead><tbody>';

        // Operating
        html += `<tr class="section-header"><td colspan="3"><strong>${t_page('operatingActivities')}</strong></td></tr>`;
        html += `<tr><td>${t_page('netIncomeForCF')}</td><td class="text-end">${formatCurrency(netProfitC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(netProfitP)}</td>` : ''}</tr>`;
        html += `<tr><td colspan="3">${t_page('adjustments')}</td></tr>`;
        html += `<tr><td class="ps-3">${t_page('depreciationAmortizationForCF')}</td><td class="text-end">${formatCurrency(depreciationC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(depreciationP)}</td>` : ''}</tr>`;
        html += `<tr><td class="ps-3">${t_page('changesInWorkingCapital')}</td><td class="text-end">${state.hasDataPrevious ? formatCurrency(-changeInWC_C) : 'N/A'}</td>${state.hasDataPrevious ? `<td class="text-end">N/A</td>` : ''}</tr>`;
        html += `<tr class="subtotal-row"><td>${t_page('cashFlowFromOperations')}</td><td class="text-end">${formatCurrency(cashFromOpsC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(cashFromOpsP)}</td>` : ''}</tr>`;
        
        // Investing
        html += `<tr class="section-header"><td colspan="3"><strong>${t_page('investingActivities')}</strong></td></tr>`;
        html += `<tr><td class="ps-3">${t_page('capitalExpenditures')}</td><td class="text-end">${formatCurrency(Math.abs(cashFromInvestingC))}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(Math.abs(cashFromInvestingP))}</td>` : ''}</tr>`;
        html += `<tr class="subtotal-row"><td>${t_page('cashFlowFromInvesting')}</td><td class="text-end">${formatCurrency(cashFromInvestingC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(cashFromInvestingP)}</td>` : ''}</tr>`;

        // Financing
        html += `<tr class="section-header"><td colspan="3"><strong>${t_page('financingActivities')}</strong></td></tr>`;
        html += `<tr><td class="ps-3 text-muted"><em>(أنشطة تمويلية)</em></td><td class="text-end">0</td>${state.hasDataPrevious ? `<td class="text-end">0</td>` : ''}</tr>`;
        html += `<tr class="subtotal-row"><td>${t_page('cashFlowFromFinancing')}</td><td class="text-end">${formatCurrency(cashFromFinancingC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(cashFromFinancingP)}</td>` : ''}</tr>`;

        // Totals
        html += `<tr class="subtotal-row"><td>${t_page('netCashFlow')}</td><td class="text-end">${formatCurrency(netChangeInCashC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(netChangeInCashP)}</td>` : ''}</tr>`;
        html += `<tr><td>${t_page('beginningCash')}</td><td class="text-end">${formatCurrency(beginningCashC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(beginningCashP)}</td>` : ''}</tr>`;
        html += `<tr class="total-row"><td>${t_page('endingCash')}</td><td class="text-end">${formatCurrency(endingCashCalculatedC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(endingCashCalculatedP)}</td>` : ''}</tr>`;
        
        // Reconciliation Check
        const cashDiffC = endingCashCalculatedC - endingCashFromBSC;
        if (Math.abs(cashDiffC) > 1) {
             html += `<tr class="table-warning small"><td colspan="3"><em>ملاحظة (الحالية): النقدية آخر الفترة المحسوبة (${formatCurrency(endingCashCalculatedC)}) تختلف عن رصيد الميزانية (${formatCurrency(endingCashFromBSC)}).</em></td></tr>`;
        }
        
        html += `</tbody></table>`;
        document.getElementById('cashFlowStatementTable').innerHTML = html;
        
        // Commentary
        let comment = cashFromOpsC >= 0 ? t_page('cf_comment_positive') : t_page('cf_comment_negative');
        if(state.hasDataPrevious) {
            if(changeInWC_C > 0) comment += " " + t_page('cf_comment_wc_use');
            if(changeInWC_C < 0) comment += " " + t_page('cf_comment_wc_source');
        }
        document.getElementById('cashFlowStatementComment').textContent = comment;
    };

    // *** مُعدل: دالة عرض قائمة حقوق الملكية المقارنة ***
    const renderEquityStatement = () => {
        const stmtCurrent = state.statementsCurrent;
        const stmtPrevious = state.statementsPrevious;

        const totalsCurrent = stmtCurrent?.totals || {};
        const totalsPrevious = stmtPrevious?.totals || {};
        const bsCurrent = stmtCurrent?.bs || {};
        const bsPrevious = stmtPrevious?.bs || {};
        
        // Calculate Previous Period
        const capP = totalsPrevious.totalEquityCapital || 0;
        const netProfitP = totalsPrevious.netProfit || 0;
        const openingREP = (typeof bsPrevious.equityRetainedEarnings === 'number' && typeof netProfitP === 'number') ? bsPrevious.equityRetainedEarnings - netProfitP : 0;
        const totalOpeningEqP = capP + openingREP;
        const totalClosingEqP = totalsPrevious.totalEquity || 0;

        // Calculate Current Period
        const capC = totalsCurrent.totalEquityCapital || 0;
        const netProfitC = totalsCurrent.netProfit || 0;
        // Opening RE for Current Period *is* the Closing RE from Previous Period
        const openingREC = state.hasDataPrevious ? (bsPrevious.equityRetainedEarnings || 0) : 0; // Use 0 if no prev data
        const totalOpeningEqC = capC + openingREC;
        // Dividends (Assume 0 for now)
        const dividendsC = 0; 
        // Calculated Closing RE = Opening RE + Net Profit - Dividends
        const calcClosingREC = openingREC + netProfitC - dividendsC;
        // Use Closing RE from BS calculation (which is Opening RE + Net Profit)
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

    // *** مُعدل: دالة لإعادة تحميل وعرض البيانات ***
    const reloadAndRenderData = () => {
        console.log("[DEBUG] Reloading and rendering data based on selection.");
        const noDataWarningElement = document.getElementById('noDataWarning');
        const reportContentElement = document.getElementById('report-content');
        
        // Hide previous statements and warning while loading
        ['balanceSheetCard', 'incomeStatementCard', 'cashFlowStatementCard', 'equityStatementCard'].forEach(id => {
            const card = document.getElementById(id);
            if (card) card.style.display = 'none';
         });
         if(noDataWarningElement) noDataWarningElement.style.display = 'none';
         if(reportContentElement) reportContentElement.style.display = 'none'; // Hide all content

        if (loadDataAndPrepareStatements()) { // This loads data AND saves to localStorage
            console.log("[DEBUG] Data loaded successfully. Rendering statements...");
            renderBalanceSheet();
            renderIncomeStatement();
            renderCashFlowStatement();
            renderEquityStatement();
             // Show content sections
             if(reportContentElement) reportContentElement.style.display = 'block';
             ['balanceSheetCard', 'incomeStatementCard', 'cashFlowStatementCard', 'equityStatementCard'].forEach(id => {
                const card = document.getElementById(id);
                if (card) card.style.display = 'block';
             });
             // Show previous data warning if only current data was found
             if (!state.hasDataPrevious && noDataWarningElement) {
                 noDataWarningElement.textContent = t_page('noPreviousDataMessage');
                 noDataWarningElement.style.display = 'block'; // Show as info/warning
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
         // Re-apply translations after rendering attempt
         if (typeof window.applyTranslations === 'function') {
            console.log("Applying translations after render attempt...");
            window.applyTranslations();
         }
    }

    // --- Initialization ---
    const init = () => {
        console.log("[DEBUG] Initializing report page...");
        
        // Run main logic *after* libraries are confirmed or failed
        const runMainLogic = () => {
            console.log("[DEBUG] External libraries check complete. Proceeding...");
            reloadAndRenderData(); // Initial load and render based on default selection

            // Attach export button listeners
            const exportPdfBtn = document.getElementById('exportPdfBtn');
            if (exportPdfBtn) {
                 exportPdfBtn.addEventListener('click', () => {
                    if (!state.hasDataCurrent) { alert(t_page('noDataMessage')); return; }
                    if (typeof html2pdf === 'function') {
                        const element = document.getElementById('report-content');
                        const opt = { margin: 0.5, filename: 'Financial_Report.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true, logging: false }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
                        html2pdf().from(element).set(opt).save();
                    } else { console.error("html2pdf library is not loaded."); alert("PDF export failed."); }
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
                                 // Get Headers
                                 tableElement?.querySelectorAll('thead th').forEach(th => headers.push(th.textContent.trim()));
                                 if (headers.length > 0) data.push(headers);
                                 // Get Body Rows
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
                                             rowData.push(cellValue.replace(/[\(\)\-\+:]/g, '').replace(/^[ \t]+|[ \t]+$/g,'').trim());
                                         }
                                     });
                                      if (rowData.length > 0) data.push(rowData);
                                 });
                                 return data;
                             };
                             const addSheet = (tableId, sheetName) => { 
                                 const table = document.getElementById(tableId)?.querySelector('table'); // Select the table inside the div
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
                     } else { console.error("XLSX library is not loaded."); alert("Excel export failed."); }
                 });
            } else { console.warn("Export Excel button not found"); }

            // *** مستمع حدث لأزرار اختيار المصدر ***
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
        };
        
        // This simplified init bypasses the library loading check to run the main logic
        // This is based on the user's report that the previous version stalled
        runMainLogic();

    }; // End of init

    // Helper function to load scripts (still available but not blocking init)
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

    // Load libraries asynchronously in the background
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js", () => { console.log("html2pdf loaded."); }, () => {});
    loadScript("https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js", () => { console.log("XLSX loaded."); }, () => {});

    init(); // Start the initialization process

}); // End of DOMContentLoaded listener
