// js/report-app.js (v2.2 - Detailed Statements + Credit Sales + Currency Conversion)

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
        
        additionalDataTitle: "بيانات إضافية",
        creditSalesLabel: "المبيعات الآجلة (Credit Sales)",
        creditSalesHint: "أدخل المبيعات الآجلة للفترة",
        
        // --- ✅✅✅ بداية الإضافة ✅✅✅ ---
        reportCurrencyTitle: "إعدادات عملة العرض",
        reportCurrencyLabel: "عرض التقرير بعملة:",
        reportFxRateLabel: "سعر الصرف (مقابل العملة الأساسية):",
        currency_base: "العملة الأساسية",
        // --- ✅✅✅ نهاية الإضافة ✅✅✅ ---

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
        otherRevenue: "إيرادات أخرى", // (جديد)
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
        pageTitle: "Detailed Financial Statements — Financial Analyzer",
        pageHeader: "Detailed Financial Statements",
        pageSubheader: "Professional reports based on international standards with smart analytical comments.",
        commentaryTitle: "Analytical Commentary",
        exportPdf: "Export PDF",
        exportExcel: "Export Excel",
        total: "Total",
        noDataMessage: "No financial data found from the selected source. Please enter data first or change the source.",
        noPreviousDataMessage: "No previous period data found. Only current period data will be displayed.",
        dataSourceTitle: "Data Source:",
        sourceTrialBalanceLabel: "Use Trial Balance (from Input page)",
        sourceUploadedLabel: "Use Uploaded Statements (from Upload page)",
        
        additionalDataTitle: "Additional Data",
        creditSalesLabel: "Credit Sales",
        creditSalesHint: "Enter total credit sales for the period",
        
        // --- ✅✅✅ بداية الإضافة ✅✅✅ ---
        reportCurrencyTitle: "Report Currency Settings",
        reportCurrencyLabel: "View report in:",
        reportFxRateLabel: "Exchange Rate (vs. Base):",
        currency_base: "Base Currency",
        // --- ✅✅✅ نهاية الإضافة ✅✅✅ ---
        
        thAccount: "Account",
        thCurrentPeriod: "Current Period",
        thPreviousPeriod: "Previous Period",
        thChangeAbs: "Change ($)",
        thChangePct: "Change (%)",
        bsTitle: "Balance Sheet",
        bsSubheader: "Shows the company's assets, liabilities, and equity at a specific date.",
        assets: "Assets",
        currentAssets: "Current Assets",
        cashAndEquivalents: "Cash and Equivalents",
        accountsReceivable: "Accounts Receivable",
        inventory: "Inventory",
        otherCurrentAssets: "Other Current Assets",
        totalCurrentAssets: "Total Current Assets",
        nonCurrentAssets: "Non-Current Assets",
        propertyPlantEquipment: "Property, Plant & Equipment (Net)",
        otherNonCurrentAssets: "Other Non-Current Assets",
        totalNonCurrentAssets: "Total Non-Current Assets",
        totalAssets: "Total Assets",
        liabilities: "Liabilities",
        currentLiabilities: "Current Liabilities",
        accountsPayable: "Accounts Payable",
        shortTermLoans: "Short-term Loans",
        otherCurrentLiabilities: "Other Current Liabilities",
        totalCurrentLiabilities: "Total Current Liabilities",
        nonCurrentLiabilities: "Non-Current Liabilities",
        longTermLoans: "Long-term Loans",
        otherNonCurrentLiabilities: "Other Non-Current Liabilities",
        totalNonCurrentLiabilities: "Total Non-Current Liabilities",
        totalLiabilities: "Total Liabilities",
        equity: "Equity",
        paidInCapital: "Paid-in Capital",
        retainedEarnings: "Retained Earnings / (Accumulated Losses)",
        netProfitForPeriod: "Net Profit / (Loss) for the Period",
        totalEquity: "Total Equity",
        totalLiabilitiesAndEquity: "Total Liabilities and Equity",
        bs_comment_balanced: "Positive Analysis: The Balance Sheet is balanced for the current period.",
        bs_comment_unbalanced: "Attention Required: The Balance Sheet is unbalanced by {diff} for the current period.",
        bs_comment_growth: "Growth Indicator: Total assets increased by {pct} from the previous period.",
        bs_comment_decline: "Contraction Indicator: Total assets decreased by {pct} from the previous period.",
        isTitle: "Income Statement",
        isSubheader: "Summarizes company revenues and expenses over a specific period.",
        revenue: "Revenue / Sales",
        cogs: "Cost of Goods Sold (COGS)",
        grossProfit: "Gross Profit / (Loss)",
        operatingExpenses: "Operating Expenses",
        generalAdminExpenses: "General & Administrative Expenses",
        sellingMarketingExpenses: "Selling & Marketing Expenses",
        depreciationAmortization: "Depreciation & Amortization",
        otherOperatingExpenses: "Other Operating Expenses",
        otherRevenue: "Other Revenue", // (New)
        operatingProfit: "Operating Profit / (Loss) (EBIT)",
        interestExpense: "Interest Expense",
        profitBeforeTax: "Profit / (Loss) Before Tax (PBT)",
        taxExpense: "Tax Expense",
        netProfit: "Net Profit / (Loss) for the Period",
        is_comment_profit: "Strong Performance: The company achieved a net profit of {profit} with a profit margin of {margin}%.",
        is_comment_loss: "Profitability Challenge: The company reported a net loss of {profit}.",
        is_comment_revenue_growth: "Revenue Growth: Revenue increased by {pct} from the previous period.",
        is_comment_profit_improvement: "Profitability Improvement: Net profit significantly increased from the previous period.",
        cfTitle: "Cash Flow Statement (Indirect - Estimated)",
        cfSubheader: "Shows the estimated cash movement from different activities.",
        operatingActivities: "Cash Flows from Operating Activities",
        netIncomeForCF: "Net Income",
        adjustments: "Adjustments for non-cash items:",
        depreciationAmortizationForCF: "Depreciation & Amortization",
        changesInWorkingCapital: "Changes in Working Capital (Est.)",
        cashFlowFromOperations: "Net Cash from Operating Activities",
        investingActivities: "Cash Flows from Investing Activities",
        capitalExpenditures: "Capital Expenditures (Est.)",
        cashFlowFromInvesting: "Net Cash used in Investing Activities",
        financingActivities: "Cash Flows from Financing Activities",
        cashFlowFromFinancing: "Net Cash from (used in) Financing Activities",
        netCashFlow: "Net Change in Cash",
        beginningCash: "Beginning Cash",
        endingCash: "Ending Cash",
        cf_comment_positive: "Good Cash Position: Estimates indicate positive operating cash flow generation.",
        cf_comment_negative: "Risk Indicator: Estimates indicate negative operating cash flow.",
        cf_comment_wc_source: "Working capital was a source of cash (e.g., fast collections).",
        cf_comment_wc_use: "Working capital was a use of cash (e.g., inventory increase).",
        eqTitle: "Statement of Changes in Equity",
        eqSubheader: "Shows the changes in equity during the period.",
        openingBalanceCapital: "Opening Balance - Capital",
        openingBalanceRetainedEarnings: "Opening Balance - Retained Earnings",
        totalOpeningEquity: "Total Opening Equity",
        netProfitForEquity: "Net Profit / (Loss) for Period",
        dividends: "Dividends (Est./if any)",
        closingBalanceCapital: "Closing Balance - Capital",
        closingBalanceRetainedEarnings: "Closing Balance - Retained Earnings",
        totalClosingEquity: "Total Closing Equity",
        eq_comment_growth: "Shareholder Value Growth: Equity increased during the period.",
        eq_comment_decline: "Shareholder Value Decline: Equity decreased.",
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("[DEBUG] report-app.js script started execution (v2.2 - Detailed + Currency Conversion).");

    const state = {
        statementsCurrent: null, 
        statementsPrevious: null, 
        hasDataCurrent: false,
        hasDataPrevious: false,
        // --- ✅✅✅ بداية الإضافة ✅✅✅ ---
        currentDisplayRate: 1.0, // سعر الصرف الحالي للعرض
        baseCurrency: "EGP", // العملة الأساسية (سيتم قراءتها)
        displayCurrencies: { 
            // قائمة بالعملات المتاحة للعرض
            // (ملاحظة: هذه قائمة مبسطة، الأفضل قراءتها من fxRates المحفوظة)
            EGP: { name: "Egyptian Pound", rate: 1 },
            USD: { name: "US Dollar", rate: 48.5 },
            EUR: { name: "Euro", rate: 52 },
            SAR: { name: "Saudi Riyal", rate: 12.9 },
            AED: { name: "UAE Dirham", rate: 13.2 }
        }
        // --- ✅✅✅ نهاية الإضافة ✅✅✅ ---
    };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`;
    
    // --- ✅✅✅ بداية التطوير (دالة formatCurrency) ✅✅✅ ---
    // تم تعديل الدالة لتقوم بالضرب في سعر الصرف
    const formatCurrency = (value, decimals = 0) => {
        if (!isFinite(value)) return "N/A";

        // التطوير: اضرب القيمة في سعر الصرف المحدد قبل العرض
        const displayValue = value * state.currentDisplayRate;

         const roundedValue = parseFloat(displayValue.toFixed(decimals));
         if (Math.abs(roundedValue) < Math.pow(10, -decimals) && roundedValue < 0) {
              return (0).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
         }
         return roundedValue.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    };
    // --- ✅✅✅ نهاية التطوير ✅✅✅ ---

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
    const sumValues = (arr) => arr.reduce((sum, item) => sum + (item.value || 0), 0);
    const toNum = (val) => parseFloat(String(val || 0).replace(/,/g, '')) || 0;


    // --- (جديد) Helper to initialize the detailed statements structure ---
    const getNewStatementShell = () => ({
        bs: {
            currentAssets: {
                cashEquivalents: [],
                accountsReceivable: [],
                inventory: [],
                otherCurrentAssets: []
            },
            nonCurrentAssets: {
                propertyPlantEquipment: [],
                otherNonCurrentAssets: []
            },
            currentLiabilities: {
                accountsPayable: [],
                shortTermLoans: [],
                otherCurrentLiabilities: []
            },
            nonCurrentLiabilities: {
                longTermLoans: [],
                otherNonCurrentLiabilities: []
            },
            equity: {
                paidInCapital: [],
                retainedEarningsItems: [] // For other equity items + net profit
            }
        },
        is: {
            revenue: [],
            cogs: [],
            operatingExpenses: {
                generalAdminExpenses: [],
                sellingMarketingExpenses: [],
                otherOperatingExpenses: []
            },
            depreciationAmortization: [],
            interestExpense: [],
            taxExpense: [],
            otherRevenue: [],
            otherExpense: [] // This one is not currently used but good to have
        },
        totals: {
            // Initialize all totals to 0
            totalCurrentAssets: 0, totalNonCurrentAssets: 0, totalAssets: 0,
            totalCurrentLiabilities: 0, totalNonCurrentLiabilities: 0, totalLiabilities: 0,
            totalEquityCapital: 0, totalEquity: 0, totalLiabilitiesAndEquity: 0,
            totalRevenue: 0, totalCogs: 0, grossProfit: 0, 
            totalOperatingExpenses: 0, operatingProfit: 0, 
            profitBeforeTax: 0, totalTax: 0, netProfit: 0,
            cashEquivalents: 0, accountsReceivable: 0, inventory: 0, otherCurrentAssets: 0,
            propertyPlantEquipment: 0, otherNonCurrentAssets: 0,
            accountsPayable: 0, shortTermDebt: 0, otherCurrentLiabilities: 0,
            longTermLoans: 0, otherNonCurrentLiabilities: 0,
            paidInCapital: 0, retainedEarnings: 0, // retainedEarnings will be calculated
            totalGenAdmin: 0, totalSellingMarketing: 0, totalOtherOpex: 0,
            depreciationTotal: 0, totalInterest: 0,
            totalOtherRevenue: 0, totalOtherExpense: 0,
            ebit: 0, workingCapital: 0, purchases: 0
        }
    });


    // --- (مطور) دالة معالجة البيانات المرفوعة بالتصنيفات ---
    const processUploadedData = (uploadedData) => {
        try {
            console.log("Processing uploaded data with classifications (v2 - Detailed)...");
            if (!uploadedData || (!uploadedData.bs && !uploadedData.is)) {
                 console.warn("Uploaded data is empty or invalid format.");
                 return null;
            }
            
            const classificationMap = {
                'opt_cash': 'cashEquivalents',
                'opt_receivables': 'accountsReceivable',
                'opt_inventory': 'inventory',
                'opt_otherCurrentAssets': 'otherCurrentAssets',
                'opt_fixedAssets': 'propertyPlantEquipment',
                'opt_otherNonCurrentAssets': 'otherNonCurrentAssets',
                'opt_payables': 'accountsPayable',
                'opt_shortTermDebt': 'shortTermLoans',
                'opt_otherCurrentLiabilities': 'otherCurrentLiabilities',
                'opt_longTermDebt': 'longTermLoans',
                'opt_otherNonCurrentLiabilities': 'otherNonCurrentLiabilities',
                'opt_equity': 'paidInCapital', // Main capital items
                'opt_revenue': 'revenue',
                'opt_cogs': 'cogs',
                'opt_operatingExpense': 'operatingExpenses', // Needs sub-routing
                'opt_depreciation': 'depreciationAmortization',
                'opt_interestExpense': 'interestExpense',
                'opt_taxExpense': 'taxExpense',
                'opt_otherRevenue': 'otherRevenue',
                'opt_otherExpense': 'otherOperatingExpenses' // Mapped to other opex
            };

            const statements = getNewStatementShell();
            const totals = statements.totals;
            
            // --- معالجة الميزانية (BS) ---
            if (uploadedData.bs) {
                uploadedData.bs.forEach(item => {
                    const classificationKey = item.Classification;
                    const classification = classificationMap[classificationKey];
                    if (!classification) return; 

                    const accountItem = { account: item.Account, value: toNum(item.Value) || 0 };
                    if (accountItem.value === 0) return;

                    switch (classification) {
                        case 'cashEquivalents':
                            statements.bs.currentAssets.cashEquivalents.push(accountItem);
                            totals.cashEquivalents += accountItem.value;
                            break;
                        case 'accountsReceivable':
                            statements.bs.currentAssets.accountsReceivable.push(accountItem);
                            totals.accountsReceivable += accountItem.value;
                            break;
                        case 'inventory':
                            statements.bs.currentAssets.inventory.push(accountItem);
                            totals.inventory += accountItem.value;
                            break;
                        case 'otherCurrentAssets':
                            statements.bs.currentAssets.otherCurrentAssets.push(accountItem);
                            totals.otherCurrentAssets += accountItem.value; 
                            break;
                        case 'propertyPlantEquipment':
                            statements.bs.nonCurrentAssets.propertyPlantEquipment.push(accountItem);
                            totals.propertyPlantEquipment += accountItem.value; 
                            break;
                        case 'otherNonCurrentAssets':
                            statements.bs.nonCurrentAssets.otherNonCurrentAssets.push(accountItem);
                            totals.otherNonCurrentAssets += accountItem.value; 
                            break;
                        case 'accountsPayable':
                            statements.bs.currentLiabilities.accountsPayable.push(accountItem);
                            totals.accountsPayable += accountItem.value;
                            break;
                        case 'shortTermLoans':
                            statements.bs.currentLiabilities.shortTermLoans.push(accountItem);
                            totals.shortTermDebt += accountItem.value;
                            break;
                        case 'otherCurrentLiabilities':
                            statements.bs.currentLiabilities.otherCurrentLiabilities.push(accountItem);
                            totals.otherCurrentLiabilities += accountItem.value; 
                            break;
                        case 'longTermLoans':
                            statements.bs.nonCurrentLiabilities.longTermLoans.push(accountItem);
                            totals.longTermLoans += accountItem.value; 
                            break;
                        case 'otherNonCurrentLiabilities':
                            statements.bs.nonCurrentLiabilities.otherNonCurrentLiabilities.push(accountItem);
                            totals.otherNonCurrentLiabilities += accountItem.value; 
                            break;
                        case 'paidInCapital':
                            // This now correctly handles *all* items marked 'opt_equity'
                            statements.bs.equity.paidInCapital.push(accountItem);
                            totals.paidInCapital += accountItem.value; 
                            break;
                    }
                });
            }

            // --- معالجة قائمة الدخل (IS) ---
            if (uploadedData.is) {
                uploadedData.is.forEach(item => {
                    const classificationKey = item.Classification;
                    const classification = classificationMap[classificationKey];
                    if (!classification) return;

                    const accountItem = { account: item.Account, value: toNum(item.Value) || 0 };
                    const accountName = (item.Account || '').toLowerCase();
                    if (accountItem.value === 0) return;

                    switch (classification) {
                        case 'revenue':
                            statements.is.revenue.push(accountItem);
                            totals.totalRevenue += accountItem.value; 
                            break;
                        case 'cogs':
                            statements.is.cogs.push(accountItem);
                            totals.totalCogs += accountItem.value; 
                            break;
                        case 'operatingExpenses':
                            // Sub-routing for operating expenses
                            if (accountName.includes('sell') || accountName.includes('بيع') || accountName.includes('تسويق') || accountName.includes('marketing')) {
                                statements.is.operatingExpenses.sellingMarketingExpenses.push(accountItem);
                                totals.totalSellingMarketing += accountItem.value;
                            } else {
                                // Default to G&A
                                statements.is.operatingExpenses.generalAdminExpenses.push(accountItem);
                                totals.totalGenAdmin += accountItem.value;
                            }
                            break;
                        case 'depreciationAmortization':
                            statements.is.depreciationAmortization.push(accountItem);
                            totals.depreciationTotal += accountItem.value; 
                            break;
                        case 'interestExpense':
                            statements.is.interestExpense.push(accountItem);
                            totals.totalInterest += accountItem.value; 
                            break;
                        case 'taxExpense':
                            statements.is.taxExpense.push(accountItem);
                            totals.totalTax += accountItem.value; 
                            break;
                        case 'otherRevenue':
                            statements.is.otherRevenue.push(accountItem);
                            totals.totalOtherRevenue += accountItem.value;
                            break;
                        case 'otherOperatingExpenses':
                            statements.is.operatingExpenses.otherOperatingExpenses.push(accountItem);
                            totals.totalOtherOpex += accountItem.value;
                            break;
                    }
                });
            }

            // --- حساب المجاميع من البيانات المصنفة ---
            
            // مجاميع الميزانية
            totals.totalCurrentAssets = totals.cashEquivalents + totals.accountsReceivable + totals.inventory + totals.otherCurrentAssets;
            totals.totalNonCurrentAssets = totals.propertyPlantEquipment + totals.otherNonCurrentAssets;
            totals.totalAssets = totals.totalCurrentAssets + totals.totalNonCurrentAssets;

            totals.totalCurrentLiabilities = totals.accountsPayable + totals.shortTermDebt + totals.otherCurrentLiabilities;
            totals.totalNonCurrentLiabilities = totals.longTermLoans + totals.otherNonCurrentLiabilities;
            totals.totalLiabilities = totals.totalCurrentLiabilities + totals.totalNonCurrentLiabilities;

            // مجاميع قائمة الدخل
            totals.grossProfit = totals.totalRevenue - totals.totalCogs;
            
            totals.totalOperatingExpenses = 
                totals.totalGenAdmin +
                totals.totalSellingMarketing +
                totals.depreciationTotal + // Depreciation is added here as an OpEx
                totals.totalOtherOpex;

            totals.operatingProfit = totals.grossProfit - totals.totalOperatingExpenses;
            totals.ebit = totals.operatingProfit;
            
            totals.profitBeforeTax = totals.operatingProfit - totals.totalInterest + totals.totalOtherRevenue; 
            totals.netProfit = totals.profitBeforeTax - totals.totalTax;

            // مجاميع حقوق الملكية
            totals.totalEquityCapital = totals.paidInCapital; 
            
            // This is an estimation for uploaded data:
            // We assume 'opt_equity' items are Opening RE + Capital.
            // We add the calculated Net Profit to the list.
            statements.bs.equity.retainedEarningsItems.push({ 
                account: t_page('netProfitForPeriod'), 
                value: totals.netProfit 
            });

            totals.retainedEarnings = sumValues(statements.bs.equity.retainedEarningsItems);
            
            totals.totalEquity = totals.totalEquityCapital + totals.retainedEarnings;
            totals.totalLiabilitiesAndEquity = totals.totalLiabilities + totals.totalEquity;

            // مجاميع إضافية للتحليلات
            totals.workingCapital = totals.totalCurrentAssets - totals.totalCurrentLiabilities;
            totals.purchases = totals.totalCogs; // Estimation
            
            console.log("Successfully processed uploaded data (v2.2 - Detailed).", statements);
            return statements; 
        } catch (error) {
            console.error("Error processing uploaded data:", error);
            return null; 
        }
    };
    // --- (نهاية الدالة المُصلحة) ---


    // --- (مطور) دالة بناء القوائم من ميزان المراجعة ---
    const buildStatementsFromTrialData = (trialDataArray) => {
        
        const statements = getNewStatementShell();
        const totals = statements.totals;

        if (!trialDataArray || trialDataArray.length === 0) {
            console.error("buildStatementsFromTrialData called but trialDataArray is empty.");
            return null;
        }

        try {
            let openingRetainedEarnings = 0;

            trialDataArray.forEach(row => {
                const value = (toNum(row.Debit) || 0) - (toNum(row.Credit) || 0);
                const mainType = row.MainType || '';
                const subType = row.SubType || '';
                const accountName = (row.Account || '').toLowerCase();
                const account = row.Account || 'Unknown';
                const item = { account, value }; 
                const itemNegative = { account, value: -value }; // For L/E/R

                if (mainType.includes('الأصول') || mainType.includes('Assets')) {
                    if (subType.includes('متداول') || subType.includes('Current')) {
                        // Detailed routing for Current Assets
                        if (accountName.includes('cash') || accountName.includes('نقد') || accountName.includes('bank') || accountName.includes('بنك') || subType.includes('النقد')) {
                            statements.bs.currentAssets.cashEquivalents.push(item);
                            totals.cashEquivalents += value;
                        } else if (accountName.includes('receivable') || accountName.includes('عملاء') || accountName.includes('مدينون') || subType.includes('العملاء')) {
                            statements.bs.currentAssets.accountsReceivable.push(item);
                            totals.accountsReceivable += value;
                        } else if (accountName.includes('inventory') || accountName.includes('مخزون') || subType.includes('المخزون')) {
                            statements.bs.currentAssets.inventory.push(item);
                            totals.inventory += value;
                        } else {
                            statements.bs.currentAssets.otherCurrentAssets.push(item);
                            totals.otherCurrentAssets += value;
                        }
                    } else { // Non-Current Assets
                         if (accountName.includes('fixed') || accountName.includes('أصول ثابتة') || accountName.includes('property') || accountName.includes('plant') || accountName.includes('equipment') || subType.includes('أصول ثابتة')) {
                            statements.bs.nonCurrentAssets.propertyPlantEquipment.push(item);
                            totals.propertyPlantEquipment += value;
                         } else {
                            statements.bs.nonCurrentAssets.otherNonCurrentAssets.push(item);
                            totals.otherNonCurrentAssets += value;
                         }
                    }
                } else if (mainType.includes('الخصوم') || mainType.includes('Liabilities')) {
                     if (subType.includes('متداول') || subType.includes('Current')) {
                         if (accountName.includes('payable') || accountName.includes('مورد') || accountName.includes('دائنون') || subType.includes('الموردون')) {
                            statements.bs.currentLiabilities.accountsPayable.push(itemNegative);
                            totals.accountsPayable += itemNegative.value;
                         } else if (accountName.includes('loan') || accountName.includes('قرض قصير') || accountName.includes('short term') || subType.includes('قروض قصيرة')) {
                            statements.bs.currentLiabilities.shortTermLoans.push(itemNegative);
                            totals.shortTermDebt += itemNegative.value;
                         } else {
                            statements.bs.currentLiabilities.otherCurrentLiabilities.push(itemNegative);
                            totals.otherCurrentLiabilities += itemNegative.value;
                         }
                     } else { // Non-Current Liabilities
                         if (accountName.includes('loan') || accountName.includes('قرض طويل') || accountName.includes('long term') || subType.includes('قروض طويلة')) {
                            statements.bs.nonCurrentLiabilities.longTermLoans.push(itemNegative);
                            totals.longTermLoans += itemNegative.value;
                         } else {
                             statements.bs.nonCurrentLiabilities.otherNonCurrentLiabilities.push(itemNegative);
                             totals.otherNonCurrentLiabilities += itemNegative.value;
                         }
                     }
                } else if (mainType.includes('حقوق الملكية') || mainType.includes('Equity')) {
                     if (subType.includes('رأس المال') || subType.includes('Capital') || accountName.includes('capital') || accountName.includes('رأس المال')) {
                        statements.bs.equity.paidInCapital.push(itemNegative); 
                        totals.paidInCapital += itemNegative.value;
                     } else if (subType.includes('الأرباح المحتجزة') || subType.includes('Retained Earnings') || accountName.includes('retained')) {
                         openingRetainedEarnings += itemNegative.value; // Capture opening RE
                     } else {
                        // Add other equity items (like reserves) to the capital section
                        statements.bs.equity.paidInCapital.push(itemNegative); 
                        totals.paidInCapital += itemNegative.value;
                     }
                }
                else if (mainType.includes('قائمة الدخل') || mainType.includes('Income Statement')) {
                     if (subType.includes('الإيرادات') || subType.includes('Revenue')) {
                         if (accountName.includes('other') || accountName.includes('أخرى')) {
                            statements.is.otherRevenue.push(itemNegative);
                            totals.totalOtherRevenue += itemNegative.value;
                         } else {
                            statements.is.revenue.push(itemNegative); 
                            totals.totalRevenue += itemNegative.value;
                         }
                     } else if (subType.includes('تكلفة المبيعات') || subType.includes('COGS')) {
                         statements.is.cogs.push(item); 
                         totals.totalCogs += value;
                     } else if (subType.includes('مشتريات') || subType.includes('Purchases') || accountName.includes('purchase')) {
                         totals.purchases += value; // Capture purchases for ratio analysis
                     } else { // Expenses
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
                              statements.is.operatingExpenses.sellingMarketingExpenses.push(item); 
                              totals.totalSellingMarketing += value;
                          } else if (subType.includes('إداري') || subType.includes('General') || subType.includes('Admin') || accountName.includes('general') || accountName.includes('admin')) {
                              statements.is.operatingExpenses.generalAdminExpenses.push(item); 
                              totals.totalGenAdmin += value;
                          } else {
                              statements.is.operatingExpenses.otherOperatingExpenses.push(item); 
                              totals.totalOtherOpex += value;
                          }
                     }
                }
            });

            // --- (جديد) Calculate totals from the detailed sub-totals ---

            // BS Totals
            totals.totalCurrentAssets = totals.cashEquivalents + totals.accountsReceivable + totals.inventory + totals.otherCurrentAssets;
            totals.totalNonCurrentAssets = totals.propertyPlantEquipment + totals.otherNonCurrentAssets;
            totals.totalAssets = totals.totalCurrentAssets + totals.totalNonCurrentAssets;

            totals.totalCurrentLiabilities = totals.accountsPayable + totals.shortTermDebt + totals.otherCurrentLiabilities;
            totals.totalNonCurrentLiabilities = totals.longTermLoans + totals.otherNonCurrentLiabilities;
            totals.totalLiabilities = totals.totalCurrentLiabilities + totals.totalNonCurrentLiabilities;
            
            // IS Totals
            totals.grossProfit = totals.totalRevenue - totals.totalCogs;
            
            totals.totalOperatingExpenses = 
                totals.totalGenAdmin +
                totals.totalSellingMarketing +
                totals.depreciationTotal + // Depreciation is added here as an OpEx
                totals.totalOtherOpex;
            
            totals.operatingProfit = totals.grossProfit - totals.totalOperatingExpenses;
            
            totals.profitBeforeTax = totals.operatingProfit - totals.totalInterest + totals.totalOtherRevenue;
            totals.netProfit = totals.profitBeforeTax - totals.totalTax;
            
            // Equity Totals (NEW LOGIC)
            if (openingRetainedEarnings !== 0) {
                 statements.bs.equity.retainedEarningsItems.push({ 
                    account: t_page('retainedEarnings'), // "الأرباح المحتجزة"
                    value: openingRetainedEarnings 
                });
            }
            statements.bs.equity.retainedEarningsItems.push({ 
                account: t_page('netProfitForPeriod'), // "صافي ربح الفترة"
                value: totals.netProfit 
            });

            totals.retainedEarnings = sumValues(statements.bs.equity.retainedEarningsItems);
            
            totals.totalEquityCapital = totals.paidInCapital;
            totals.totalEquity = totals.totalEquityCapital + totals.retainedEarnings;
            totals.totalLiabilitiesAndEquity = totals.totalLiabilities + totals.totalEquity;

            // Other Totals
            totals.workingCapital = totals.totalCurrentAssets - totals.totalCurrentLiabilities;
            totals.ebit = totals.operatingProfit;
            if (totals.purchases === 0 && totals.totalCogs > 0) totals.purchases = totals.totalCogs; 

            console.log("Processed Statements Data from Trial Balance (v2.2 - Detailed):", statements);
            return statements;
        } catch (e) {
            console.error("Error during trial data processing loop:", e);
            return null; 
        }
    };

    // --- (قياسي) Data Loading and Preparation ---
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

                if (selectedSource === 'uploadedData') {
                     if (parsedData && (Array.isArray(parsedData.bs) || Array.isArray(parsedData.is))) {
                        console.log(`[DEBUG] Found valid ${sourceKey}, processing...`);
                        return processFunction(parsedData); 
                    }
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
            state.statementsCurrent = load('uploadedFinancialData', processUploadedData); 
            state.statementsPrevious = load('uploadedFinancialDataPrevious', processUploadedData); 
        } else {
            state.statementsCurrent = load('trialData', buildStatementsFromTrialData);
            state.statementsPrevious = load('trialDataPrevious', buildStatementsFromTrialData);
        }

        state.hasDataCurrent = !!state.statementsCurrent; 
        state.hasDataPrevious = !!state.statementsPrevious; 

        // Save processed data for other pages (like dashboard)
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


    // --- (مطور) Rendering Functions ---
    // (لا تغيير هنا، ستستخدم formatCurrency المحدثة)
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

        // (جديد) sectionTitle = null means "don't print a header, just items"
        if (sectionTitle) {
            html += `<tr class="section-header ${cssClass}"><td colspan="${state.hasDataPrevious ? 5 : 2}"><strong>${sectionTitle || ''}</strong></td></tr>`;
        }

        allAccountNames.forEach(account => {
            const currentItem = itemsCurrent.find(i => i.account === account);
            const currentValue = currentItem ? currentItem.value : 0;
            const previousValue = prevItemsMap.get(account) || 0;
            const changeAbs = currentValue - previousValue;
            
            const paddingClass = sectionTitle ? "ps-3 sub-item" : "";

            html += `<tr class="${paddingClass}">
                        <td>${account}</td>
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

        if (totalLabel) {
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

    // (مطور)
    const renderBalanceSheet = () => {
        const stmtCurrent = state.statementsCurrent;
        const stmtPrevious = state.statementsPrevious;
        
        const bsCurrent = stmtCurrent?.bs || getNewStatementShell().bs;
        const totalsCurrent = stmtCurrent?.totals || {};
        const bsPrevious = stmtPrevious?.bs || getNewStatementShell().bs;
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

        // --- (جديد) Detailed Asset Rendering ---
        html += `<tr class="section-header assets-section"><td colspan="5"><strong>${t_page('currentAssets')}</strong></td></tr>`;
        const cashHtml = renderComparativeSection(bsCurrent.currentAssets.cashEquivalents, bsPrevious.currentAssets?.cashEquivalents, t_page('cashAndEquivalents'), null, 'assets-section');
        const arHtml = renderComparativeSection(bsCurrent.currentAssets.accountsReceivable, bsPrevious.currentAssets?.accountsReceivable, t_page('accountsReceivable'), null, 'assets-section');
        const invHtml = renderComparativeSection(bsCurrent.currentAssets.inventory, bsPrevious.currentAssets?.inventory, t_page('inventory'), null, 'assets-section');
        const ocaHtml = renderComparativeSection(bsCurrent.currentAssets.otherCurrentAssets, bsPrevious.currentAssets?.otherCurrentAssets, t_page('otherCurrentAssets'), null, 'assets-section');
        html += cashHtml.html + arHtml.html + invHtml.html + ocaHtml.html;
        
        // Total Current Assets
        html += `<tr class="subtotal-row assets-section"><td>${t_page('totalCurrentAssets')}</td><td class="text-end">${formatCurrency(totalsCurrent.totalCurrentAssets)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(totalsPrevious.totalCurrentAssets)}</td><td class="text-end">${formatCurrency(totalsCurrent.totalCurrentAssets - totalsPrevious.totalCurrentAssets)}</td><td class="text-end">${formatChangePercent(totalsCurrent.totalCurrentAssets, totalsPrevious.totalCurrentAssets)}</td>` : ''}</tr>`;
        
        html += `<tr class="section-header assets-section"><td colspan="5"><strong>${t_page('nonCurrentAssets')}</strong></td></tr>`;
        const ppeHtml = renderComparativeSection(bsCurrent.nonCurrentAssets.propertyPlantEquipment, bsPrevious.nonCurrentAssets?.propertyPlantEquipment, t_page('propertyPlantEquipment'), null, 'assets-section');
        const oncaHtml = renderComparativeSection(bsCurrent.nonCurrentAssets.otherNonCurrentAssets, bsPrevious.nonCurrentAssets?.otherNonCurrentAssets, t_page('otherNonCurrentAssets'), null, 'assets-section');
        html += ppeHtml.html + oncaHtml.html;

        // Total Non-Current Assets
        html += `<tr class="subtotal-row assets-section"><td>${t_page('totalNonCurrentAssets')}</td><td class="text-end">${formatCurrency(totalsCurrent.totalNonCurrentAssets)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(totalsPrevious.totalNonCurrentAssets)}</td><td class="text-end">${formatCurrency(totalsCurrent.totalNonCurrentAssets - totalsPrevious.totalNonCurrentAssets)}</td><td class="text-end">${formatChangePercent(totalsCurrent.totalNonCurrentAssets, totalsPrevious.totalNonCurrentAssets)}</td>` : ''}</tr>`;
        
        // Total Assets
        html += `<tr class="total-row assets-section">
                    <td>${t_page('totalAssets')}</td>
                    <td class="text-end">${formatCurrency(totalsCurrent.totalAssets)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(totalsPrevious.totalAssets)}</td>
                    <td class="text-end">${formatCurrency((totalsCurrent.totalAssets || 0) - (totalsPrevious.totalAssets || 0))}</td>
                    <td class="text-end ${((totalsCurrent.totalAssets || 0) - (totalsPrevious.totalAssets || 0)) >= 0 ? 'text-success' : 'text-danger'}">${formatChangePercent(totalsCurrent.totalAssets, totalsPrevious.totalAssets)}</td>
                    ` : ''}
                 </tr>`;

        // --- (جديد) Detailed Liabilities Rendering ---
        html += `<tr class="section-header liabilities-section"><td colspan="5"><strong>${t_page('currentLiabilities')}</strong></td></tr>`;
        const apHtml = renderComparativeSection(bsCurrent.currentLiabilities.accountsPayable, bsPrevious.currentLiabilities?.accountsPayable, t_page('accountsPayable'), null, 'liabilities-section');
        const stdHtml = renderComparativeSection(bsCurrent.currentLiabilities.shortTermLoans, bsPrevious.currentLiabilities?.shortTermLoans, t_page('shortTermLoans'), null, 'liabilities-section');
        const oclHtml = renderComparativeSection(bsCurrent.currentLiabilities.otherCurrentLiabilities, bsPrevious.currentLiabilities?.otherCurrentLiabilities, t_page('otherCurrentLiabilities'), null, 'liabilities-section');
        html += apHtml.html + stdHtml.html + oclHtml.html;
        
        // Total Current Liabilities
        html += `<tr class="subtotal-row liabilities-section"><td>${t_page('totalCurrentLiabilities')}</td><td class="text-end">${formatCurrency(totalsCurrent.totalCurrentLiabilities)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(totalsPrevious.totalCurrentLiabilities)}</td><td class="text-end">${formatCurrency(totalsCurrent.totalCurrentLiabilities - totalsPrevious.totalCurrentLiabilities)}</td><td class="text-end">${formatChangePercent(totalsCurrent.totalCurrentLiabilities, totalsPrevious.totalCurrentLiabilities)}</td>` : ''}</tr>`;
        
        html += `<tr class="section-header liabilities-section"><td colspan="5"><strong>${t_page('nonCurrentLiabilities')}</strong></td></tr>`;
        const ltdHtml = renderComparativeSection(bsCurrent.nonCurrentLiabilities.longTermLoans, bsPrevious.nonCurrentLiabilities?.longTermLoans, t_page('longTermLoans'), null, 'liabilities-section');
        const onclHtml = renderComparativeSection(bsCurrent.nonCurrentLiabilities.otherNonCurrentLiabilities, bsPrevious.nonCurrentLiabilities?.otherNonCurrentLiabilities, t_page('otherNonCurrentLiabilities'), null, 'liabilities-section');
        html += ltdHtml.html + onclHtml.html;
        
        // Total Non-Current Liabilities
        html += `<tr class="subtotal-row liabilities-section"><td>${t_page('totalNonCurrentLiabilities')}</td><td class="text-end">${formatCurrency(totalsCurrent.totalNonCurrentLiabilities)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(totalsPrevious.totalNonCurrentLiabilities)}</td><td class="text-end">${formatCurrency(totalsCurrent.totalNonCurrentLiabilities - totalsPrevious.totalNonCurrentLiabilities)}</td><td class="text-end">${formatChangePercent(totalsCurrent.totalNonCurrentLiabilities, totalsPrevious.totalNonCurrentLiabilities)}</td>` : ''}</tr>`;

        // Total Liabilities
        html += `<tr class="subtotal-row liabilities-section">
                    <td>${t_page('totalLiabilities')}</td>
                    <td class="text-end">${formatCurrency(totalsCurrent.totalLiabilities)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(totalsPrevious.totalLiabilities)}</td>
                    <td class="text-end">${formatCurrency((totalsCurrent.totalLiabilities || 0) - (totalsPrevious.totalLiabilities || 0))}</td>
                    <td class="text-end ${((totalsCurrent.totalLiabilities || 0) - (totalsPrevious.totalLiabilities || 0)) >= 0 ? 'text-danger' : 'text-success'}">${formatChangePercent(totalsCurrent.totalLiabilities, totalsPrevious.totalLiabilities)}</td>
                    ` : ''}
                 </tr>`;

        // --- (جديد) Detailed Equity Rendering ---
        html += `<tr class="section-header equity-section"><td colspan="5"><strong>${t_page('equity')}</strong></td></tr>`;
        const capHtml = renderComparativeSection(bsCurrent.equity.paidInCapital, bsPrevious.equity?.paidInCapital, t_page('paidInCapital'), null, 'equity-section');
        const reHtml = renderComparativeSection(bsCurrent.equity.retainedEarningsItems, bsPrevious.equity?.retainedEarningsItems, t_page('retainedEarnings'), null, 'equity-section');
        html += capHtml.html + reHtml.html;
        
        // Total Equity
        html += `<tr class="subtotal-row equity-section">
                    <td>${t_page('totalEquity')}</td>
                    <td class="text-end">${formatCurrency(totalsCurrent.totalEquity)}</td>
                    ${state.hasDataPrevious ? `
                    <td class="text-end">${formatCurrency(totalsPrevious.totalEquity)}</td>
                    <td class="text-end">${formatCurrency((totalsCurrent.totalEquity || 0) - (totalsPrevious.totalEquity || 0))}</td>
                    <td class="text-end ${((totalsCurrent.totalEquity || 0) - (totalsPrevious.totalEquity || 0)) >= 0 ? 'text-success' : 'text-danger'}">${formatChangePercent(totalsCurrent.totalEquity, totalsPrevious.totalEquity)}</td>
                    ` : ''}
                 </tr>`;
        
        // Total Liabilities & Equity
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

        // --- (قياسي) Commentary ---
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

    // (مطور)
    const renderIncomeStatement = () => {
        const stmtCurrent = state.statementsCurrent;
        const stmtPrevious = state.statementsPrevious;
        
        const isCurrent = stmtCurrent?.is || getNewStatementShell().is;
        const totalsCurrent = stmtCurrent?.totals || {};
        const isPrevious = stmtPrevious?.is || getNewStatementShell().is;
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

        // --- (جديد) Detailed IS Rendering ---
        const revHtml = renderComparativeSection(isCurrent.revenue, isPrevious.revenue, t_page('revenue'), null, 'profit-row', 2);
        html += revHtml.html;
        const cogsHtml = renderComparativeSection(isCurrent.cogs, isPrevious.cogs, `(-) ${t_page('cogs')}`, null, 'expense-row', 2);
        html += cogsHtml.html;
        html += `<tr class="subtotal-row profit-row"><td>${t_page('grossProfit')}</td>${renderSubtotalRow('grossProfit', totalsCurrent.grossProfit, totalsPrevious.grossProfit, true)}</tr>`;
                 
        html += `<tr class="section-header"><td colspan="5"><strong>(-) ${t_page('operatingExpenses')}</strong></td></tr>`;
        const gaHtml = renderComparativeSection(isCurrent.operatingExpenses.generalAdminExpenses, isPrevious.operatingExpenses?.generalAdminExpenses, t_page('generalAdminExpenses'), null, 'expense-row', 2);
        const smHtml = renderComparativeSection(isCurrent.operatingExpenses.sellingMarketingExpenses, isPrevious.operatingExpenses?.sellingMarketingExpenses, t_page('sellingMarketingExpenses'), null, 'expense-row', 2);
        const depHtml = renderComparativeSection(isCurrent.depreciationAmortization, isPrevious.depreciationAmortization, t_page('depreciationAmortization'), null, 'expense-row', 2);
        const opexHtml = renderComparativeSection(isCurrent.operatingExpenses.otherOperatingExpenses, isPrevious.operatingExpenses?.otherOperatingExpenses, t_page('otherOperatingExpenses'), null, 'expense-row', 2);
        html += gaHtml.html + smHtml.html + depHtml.html + opexHtml.html;
        
        // Total OpEx
        html += `<tr class="subtotal-row expense-total"><td>${t_page('total')} ${t_page('operatingExpenses')}</td>${renderSubtotalRow('totalOperatingExpenses', totalsCurrent.totalOperatingExpenses, totalsPrevious.totalOperatingExpenses, false)}</tr>`;
        // Operating Profit
        html += `<tr class="subtotal-row profit-row"><td>${t_page('operatingProfit')}</td>${renderSubtotalRow('operatingProfit', totalsCurrent.operatingProfit, totalsPrevious.operatingProfit, true)}</tr>`;

        // (جديد) Other Revenue / Interest
        const otherRevHtml = renderComparativeSection(isCurrent.otherRevenue, isPrevious.otherRevenue, `(+) ${t_page('otherRevenue')}`, null, 'profit-row', 2);
        html += otherRevHtml.html;
        const intHtml = renderComparativeSection(isCurrent.interestExpense, isPrevious.interestExpense, `(-) ${t_page('interestExpense')}`, null, 'expense-row', 2);
        html += intHtml.html;
        
        // PBT
        html += `<tr class="subtotal-row profit-row"><td>${t_page('profitBeforeTax')}</td>${renderSubtotalRow('profitBeforeTax', totalsCurrent.profitBeforeTax, totalsPrevious.profitBeforeTax, true)}</tr>`;

        const taxHtml = renderComparativeSection(isCurrent.taxExpense, isPrevious.taxExpense, `(-) ${t_page('taxExpense')}`, null, 'expense-row', 2);
        html += taxHtml.html;
        html += `<tr class="total-row profit-row"><td>${t_page('netProfit')}</td>${renderSubtotalRow('netProfit', totalsCurrent.netProfit, totalsPrevious.netProfit, true)}</tr>`;

        html += '</tbody></table>';
        document.getElementById('incomeStatementTable').innerHTML = html;

        // --- (قياسي) Commentary ---
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

    // --- (قياسي) Cash Flow Statement ---
    const renderCashFlowStatement = () => {
        const totalsCurrent = state.statementsCurrent?.totals || {};
        const totalsPrevious = state.statementsPrevious?.totals || {};

        const netProfitC = totalsCurrent.netProfit || 0;
        const depreciationC = totalsCurrent.depreciationTotal || 0;
        const changeInWC_C = (totalsCurrent.workingCapital || 0) - (totalsPrevious.workingCapital || 0);
        const cashFromOpsC = netProfitC + depreciationC - (state.hasDataPrevious ? changeInWC_C : 0); 
        const cashFromInvestingC = -( (totalsCurrent.totalNonCurrentAssets || 0) - (totalsPrevious.totalNonCurrentAssets || 0) - depreciationC ); 
        const cashFromFinancingC = 0; // (Estimation)
        const netChangeInCashC = cashFromOpsC + cashFromInvestingC + cashFromFinancingC;
        const beginningCashC = totalsPrevious.cashEquivalents || 0;
        const endingCashCalculatedC = beginningCashC + netChangeInCashC;
        const endingCashFromBSC = totalsCurrent.cashEquivalents || 0;

        const netProfitP = totalsPrevious.netProfit || 0;
        const depreciationP = totalsPrevious.depreciationTotal || 0;
        const cashFromOpsP = netProfitP + depreciationP; 
        const cashFromInvestingP = -depreciationP; // (Estimation)
        const cashFromFinancingP = 0; // (Estimation)
        const netChangeInCashP = cashFromOpsP + cashFromInvestingP + cashFromFinancingP;
        const beginningCashP = 0; 
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
        html += `<tr class="ps-3 sub-item"><td>${t_page('depreciationAmortizationForCF')}</td><td class="text-end">${formatCurrency(depreciationC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(depreciationP)}</td>` : ''}</tr>`;
        html += `<tr class="ps-3 sub-item"><td>${t_page('changesInWorkingCapital')}</td><td class="text-end">${state.hasDataPrevious ? formatCurrency(-changeInWC_C) : 'N/A'}</td>${state.hasDataPrevious ? `<td class="text-end">N/A</td>` : ''}</tr>`;
        html += `<tr class="subtotal-row"><td>${t_page('cashFlowFromOperations')}</td><td class="text-end">${formatCurrency(cashFromOpsC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(cashFromOpsP)}</td>` : ''}</tr>`;
        
        html += `<tr class="section-header"><td colspan="${state.hasDataPrevious ? 3 : 2}"><strong>${t_page('investingActivities')}</strong></td></tr>`;
        html += `<tr class="ps-3 sub-item"><td>${t_page('capitalExpenditures')}</td><td class="text-end">(${formatCurrency(Math.abs(cashFromInvestingC))})</td>${state.hasDataPrevious ? `<td class="text-end">(${formatCurrency(Math.abs(cashFromInvestingP))})</td>` : ''}</tr>`;
        html += `<tr class="subtotal-row"><td>${t_page('cashFlowFromInvesting')}</td><td class="text-end">${formatCurrency(cashFromInvestingC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(cashFromInvestingP)}</td>` : ''}</tr>`;

        html += `<tr class="section-header"><td colspan="${state.hasDataPrevious ? 3 : 2}"><strong>${t_page('financingActivities')}</strong></td></tr>`;
        html += `<tr class="ps-3 sub-item text-muted"><td><em>(${t_page('financingActivities')})</em></td><td class="text-end">0</td>${state.hasDataPrevious ? `<td class="text-end">0</td>` : ''}</tr>`;
        html += `<tr class="subtotal-row"><td>${t_page('cashFlowFromFinancing')}</td><td class="text-end">${formatCurrency(cashFromFinancingC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(cashFromFinancingP)}</td>` : ''}</tr>`;

        html += `<tr class="subtotal-row"><td>${t_page('netCashFlow')}</td><td class="text-end">${formatCurrency(netChangeInCashC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(netChangeInCashP)}</td>` : ''}</tr>`;
        html += `<tr><td>${t_page('beginningCash')}</td><td class="text-end">${formatCurrency(beginningCashC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(beginningCashP)}</td>` : ''}</tr>`;
        html += `<tr class="total-row"><td>${t_page('endingCash')}</td><td class="text-end">${formatCurrency(endingCashCalculatedC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(endingCashCalculatedP)}</td>` : ''}</tr>`;
        
        const cashDiffC = endingCashCalculatedC - endingCashFromBSC;
        if (Math.abs(cashDiffC) > 1) { 
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

    // --- (قياسي) Equity Statement ---
    const renderEquityStatement = () => {
        const stmtCurrent = state.statementsCurrent;
        const stmtPrevious = state.statementsPrevious;

        const totalsCurrent = stmtCurrent?.totals || {};
        const totalsPrevious = stmtPrevious?.totals || {};
        
        const capP = totalsPrevious.totalEquityCapital || 0;
        const netProfitP = totalsPrevious.netProfit || 0;
        const openingREP = totalsPrevious.retainedEarnings - netProfitP; 
        const totalOpeningEqP = capP + openingREP;
        const totalClosingEqP = totalsPrevious.totalEquity || 0;

        const capC = totalsCurrent.totalEquityCapital || 0;
        const netProfitC = totalsCurrent.netProfit || 0;
        const openingREC = state.hasDataPrevious ? (totalsPrevious.retainedEarnings || 0) : (totalsCurrent.retainedEarnings - netProfitC); 
        const totalOpeningEqC = capC + openingREC;
        const dividendsC = 0; // (Estimation)
        const totalClosingEqC = totalsCurrent.totalEquity || 0; 

        let html = '<table class="table table-sm report-table"><thead><tr>';
        html += `<th>${t_page('thAccount')}</th>`;
        html += `<th class="text-end">${t_page('thCurrentPeriod')}</th>`;
        if (state.hasDataPrevious) {
            html += `<th class="text-end">${t_page('thPreviousPeriod')}</th>`;
        }
        html += '</tr></thead><tbody>';

        html += `<tr><td>${t_page('totalOpeningEquity')}</td><td class="text-end">${formatCurrency(totalOpeningEqC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(totalOpeningEqP)}</td>` : ''}</tr>`;
        html += `<tr class="ps-3 sub-item"><td>(+) ${t_page('netProfitForEquity')}</td><td class="text-end">${formatCurrency(netProfitC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(netProfitP)}</td>` : ''}</tr>`;
        html += `<tr class="ps-3 sub-item"><td>(-) ${t_page('dividends')}</td><td class="text-end">${formatCurrency(dividendsC)}</td>${state.hasDataPrevious ? `<td class="text-end">0</td>` : ''}</tr>`;
        html += `<tr class="total-row"><td>${t_page('totalClosingEquity')}</td><td class="text-end">${formatCurrency(totalClosingEqC)}</td>${state.hasDataPrevious ? `<td class="text-end">${formatCurrency(totalClosingEqP)}</td>` : ''}</tr>`;
        
        html += `</tbody></table>`;
        document.getElementById('equityStatementTable').innerHTML = html;
        document.getElementById('equityStatementComment').textContent = totalClosingEqC >= totalOpeningEqC ? t_page('eq_comment_growth') : t_page('eq_comment_decline');
    };

    // --- (مطور) Main Rendering Orchestrator ---
    const reloadAndRenderData = () => {
        console.log("[DEBUG] Reloading and rendering data based on selection.");
        const noDataWarningElement = document.getElementById('noDataWarning');
        
        ['balanceSheetCard', 'incomeStatementCard', 'cashFlowStatementCard', 'equityStatementCard'].forEach(id => {
            const card = document.getElementById(id);
            if (card) card.style.display = 'none';
         });
         if(noDataWarningElement) noDataWarningElement.style.display = 'none';

        if (loadDataAndPrepareStatements()) { 
            console.log("[DEBUG] Data loaded successfully. Rendering statements (v2.2)...");
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

    // --- (قياسي) Initialization ---
    const init = () => {
        console.log("[DEBUG] Initializing report page (v2.2 - Detailed)...");
        
        // --- ✅✅✅ بداية إضافة العملة ✅✅✅ ---
        const reportCurrencySelect = document.getElementById('reportCurrencySelect');
        const reportFxRateInput = document.getElementById('reportFxRateInput');

        const baseCurrency = localStorage.getItem('currency') || 'EGP';
        state.baseCurrency = baseCurrency;

        // جلب أسعار الصرف المحفوظة من صفحة الإدخال
        const savedFxRates = JSON.parse(localStorage.getItem('fxRates') || '{}');
        if (Object.keys(savedFxRates).length > 0) {
            state.displayCurrencies = savedFxRates;
        }

        // ملء قائمة العملات
        if (reportCurrencySelect) {
            reportCurrencySelect.innerHTML = ''; // مسح الخيارات الافتراضية
            // إضافة العملة الأساسية أولاً
            reportCurrencySelect.add(new Option(`${t_page('currency_base')} (${baseCurrency})`, baseCurrency));
            
            // إضافة باقي العملات
            for (const currency in state.displayCurrencies) {
                if (currency !== baseCurrency) { // لا تضف العملة الأساسية مرة أخرى
                    reportCurrencySelect.add(new Option(currency, currency));
                }
            }
        }

        // دالة لإعادة الرسم
        const rerenderWithNewRate = () => {
            if (state.hasDataCurrent) {
                console.log(`[DEBUG] Rerendering reports with new FX rate: ${state.currentDisplayRate}`);
                renderBalanceSheet();
                renderIncomeStatement();
                renderCashFlowStatement();
                renderEquityStatement();
            }
        };

        // ربط الأحداث
        if (reportCurrencySelect) {
            reportCurrencySelect.addEventListener('change', () => {
                const selectedCurrency = reportCurrencySelect.value;
                let newRate = 1.0;
                
                if (selectedCurrency === state.baseCurrency) {
                    newRate = 1.0;
                } else if (state.displayCurrencies[selectedCurrency]) {
                    // *** منطق معدل: ***
                    // المستخدم يختار العملة، ونحن نضع السعر الافتراضي، وهو يعدله
                    let defaultRate = 1.0;
                    if (selectedCurrency !== state.baseCurrency) {
                        const baseRate = state.displayCurrencies[state.baseCurrency]?.rate || 1; // (e.g., 1 for EGP)
                        const targetRate = state.displayCurrencies[selectedCurrency]?.rate || 1; // (e.g., 48.5 for USD)
                        defaultRate = (baseRate / targetRate).toFixed(5); // (e.g., 1 / 48.5)
                    }
                    newRate = defaultRate;
                }
                
                reportFxRateInput.value = newRate;
                state.currentDisplayRate = newRate;
                rerenderWithNewRate();
            });
        }
        
        if(reportFxRateInput) {
            reportFxRateInput.addEventListener('change', (e) => {
                state.currentDisplayRate = parseFloat(e.target.value) || 1.0;
                // عند تغيير سعر الصرف يدوياً، أعد القائمة إلى "العملة الأساسية" كإشارة
                // أو يمكننا تركها كما هي، لنعتمد السعر اليدوي
                // (سنتركها كما هي)
                rerenderWithNewRate();
            });
        }
        // --- ✅✅✅ نهاية إضافة العملة ✅✅✅ ---


        reloadAndRenderData(); // التشغيل الأولي

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
                                     // (تعديل) تحسين استخراج الأرقام
                                     const numValue = parseFloat(cellValue.replace(/[,()]/g, ''));
                                     
                                     if (!isNaN(numValue) && (cellValue.match(/[\d,.-]+/) || cellValue === '0')) {
                                         // Handle negative numbers in parentheses
                                         if (cellValue.startsWith('(') && cellValue.endsWith(')')) {
                                             rowData.push(-numValue);
                                         } else {
                                             rowData.push(numValue);
                                         }
                                     } else {
                                         // إزالة المسافات البادئة للبنود الفرعية
                                         rowData.push(cell.textContent.trim()); 
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

        // --- (قياسي) Credit Sales Input Logic ---
        const creditSalesInput = document.getElementById('creditSalesInput');
        if (creditSalesInput) {
            creditSalesInput.value = localStorage.getItem('creditSalesCurrent') || '';
            creditSalesInput.addEventListener('change', (e) => {
                const value = parseFloat(e.target.value) || 0;
                localStorage.setItem('creditSalesCurrent', value);
                console.log(`[DEBUG] Saved Credit Sales: ${value}`);
            });
            
            // --- ✅✅✅ بداية التعديل ✅✅✅ ---
            // (حذف السطر الذي كان يتحكم في العملة التي أزلناها)
            // --- ✅✅✅ نهاية التعديل ✅✅✅ ---
        }
        // --- End Credit Sales ---

        if (typeof window.applyTranslations === 'function') {
            console.log("Applying initial translations...");
            window.applyTranslations();
        } else { console.warn("applyTranslations function not found."); }

        console.log("[DEBUG] Report page initialization complete.");

    }; 
    
    // --- (قياسي) Script Loaders ---
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
