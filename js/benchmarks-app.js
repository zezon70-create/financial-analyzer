// js/benchmarks-app.js
const benchmarksTranslations = {
    ar: {
        pageTitle: "المقارنات المعيارية — المحلل المالي",
        pageHeader: "المقارنات المعيارية",
        pageSubheader: "قارن نسبك المالية بمتوسطات الصناعة والفترة السابقة لفهم وضعك التنافسي.",
        navBenchmarks: "المقارنات المعيارية",
        exportPdf: "تصدير PDF",
        
        // --- [تعديل] تم تغيير "القيمة" إلى "الحالية" و "السابقة" ---
        thRatio: "النسبة", 
        thPreviousValue: "الفترة السابقة", // <-- إضافة
        thCurrentValue: "الفترة الحالية", // <-- تعديل
        thIndustryAvg: "متوسط الصناعة", 
        thComment: "مقارنة (بالصناعة)",
        // --- نهاية التعديل ---

        noDataForRatios: "لا توجد نسب محسوبة. يرجى تشغيل صفحة 'التحليلات المتقدمة' أولاً.",
        noDataForPreviousRatios: "لم يتم العثور على بيانات فترة سابقة.",
        liquidityRatios: "مؤشرات السيولة", profitabilityRatios: "مؤشرات الربحية", leverageRatios: "مؤشرات الروافع والمديونية", activityRatios: "مؤشرات النشاط",
        currentRatio: "نسبة التداول", quickRatio: "نسبة السيولة السريعة",
        netProfitMargin: "هامش صافي الربح", grossProfitMargin: "هامش الربح الإجمالي", roa: "العائد على الأصول (ROA)", roe: "العائد على حقوق الملكية (ROE)",
        debtToEquity: "نسبة الديون لحقوق الملكية", debtToAssets: "نسبة الديون للأصول",
        inventoryTurnover: "معدل دوران المخزون",
        assetTurnover: "معدل دوران الأصول",
        receivablesTurnover: "معدل دوران العملاء",
        avgCollectionPeriod: "متوسط فترة التحصيل",
        interestCoverageRatio: "عدد مرات تغطية الفوائد",
        financialLeverage: "الرافعة المالية",
        cashRatio: "نسبة النقد",
        netWorkingCapital: "صافي راس المال العامل",
        selectIndustryLabel: "اختر قطاع الصناعة للمقارنة",
        selectIndustryDesc: "اختيار قطاع سيضيف مقارنة مع متوسطات الصناعة إلى جداول النسب.",
        industry_general: "عام / غير محدد", industry_retail: "تجارة التجزئة", industry_manufacturing: "الصناعة التحويلية", industry_services: "الخدمات", industry_construction: "المقاولات",
        comparison_better: "أفضل", comparison_worse: "أسوأ", comparison_similar: "مماثل"
    },
    en: {
        pageTitle: "Industry Benchmarks — Financial Analyzer",
        pageHeader: "Industry Benchmarks",
        pageSubheader: "Compare your financial ratios against industry averages and your prior period.",
        navBenchmarks: "Benchmarks",
        exportPdf: "Export PDF",
        
        // --- [Edit] Changed "Value" to "Current" and "Previous" ---
        thRatio: "Ratio", 
        thPreviousValue: "Previous Value", // <-- Added
        thCurrentValue: "Current Value", // <-- Edited
        thIndustryAvg: "Industry Avg.", 
        thComment: "Comparison (vs. Industry)",
        // --- End Edit ---
        
        noDataForRatios: "No calculated ratios found. Please run the 'Advanced Analytics' page first.",
        noDataForPreviousRatios: "No prior period data found.",
        liquidityRatios: "Liquidity Ratios", profitabilityRatios: "Profitability Ratios", leverageRatios: "Leverage Ratios", activityRatios: "Activity Ratios",
        currentRatio: "Current Ratio", quickRatio: "Quick Ratio",
        netProfitMargin: "Net Profit Margin", grossProfitMargin: "Gross Profit Margin", roa: "Return on Assets (ROA)", roe: "Return on Equity (ROE)",
        debtToEquity: "Debt-to-Equity Ratio", debtToAssets: "Debt-to-Assets Ratio",
        inventoryTurnover: "Inventory Turnover",
        assetTurnover: "Asset Turnover",
        receivablesTurnover: "Receivables Turnover",
        avgCollectionPeriod: "Average Collection Period",
        interestCoverageRatio: "Interest Coverage Ratio",
        financialLeverage: "Financial Leverage",
        cashRatio: "Cash Ratio",
        netWorkingCapital: "Net Working Capital",
        selectIndustryLabel: "Select Industry for Benchmarking",
        selectIndustryDesc: "Choosing an industry will add benchmark averages to the ratio tables.",
        industry_general: "General / Unspecified", industry_retail: "Retail Trade", industry_manufacturing: "Manufacturing", industry_services: "Services", industry_construction: "Construction",
        comparison_better: "Better", comparison_worse: "Worse", comparison_similar: "Similar"
    }
};
window.pageTranslations = window.pageTranslations || {};
window.pageTranslations.ar = { ...(window.pageTranslations.ar || {}), ...(benchmarksTranslations.ar || {}) };
window.pageTranslations.en = { ...(window.pageTranslations.en || {}), ...(benchmarksTranslations.en || {}) };
document.addEventListener('DOMContentLoaded', () => {
    console.log("[DEBUG] benchmarks-app.js script started execution.");
    
    // --- [تعديل] تم تحديث كائن الحالة "state" ---
    const state = {
        ratiosCurrent: {},
        ratiosPrevious: {},
        statementsPrevious: null, // <-- إضافة
        hasDataCurrent: false, // <-- تعديل
        hasDataPrevious: false, // <-- إضافة
        selectedIndustry: 'general'
    };
    // --- نهاية التعديل ---

    const lang = localStorage.getItem('lang') || 'ar';
    const t = (key) => (window.pageTranslations[lang]?.[key] || `[${key}]`);
    const UI = {
        industrySelect: document.getElementById('industrySelectBenchmark'),
        warningDiv: document.getElementById('ratiosDataWarningBenchmark'),
        exportPdfBtn: document.getElementById('exportPdfBtn')
    };
    const industryBenchmarks = {
        general: {}, 
        retail: { currentRatio: 1.5, quickRatio: 0.5, netProfitMargin: 0.03, roe: 0.15, debtToEquity: 1.2, assetTurnover: 2.0, grossProfitMargin: 0.30, avgCollectionPeriod: 15, inventoryTurnover: 8.0, interestCoverageRatio: 4.0 },
        manufacturing: { currentRatio: 1.8, quickRatio: 0.9, netProfitMargin: 0.06, roe: 0.12, debtToEquity: 0.8, assetTurnover: 1.0, grossProfitMargin: 0.35, avgCollectionPeriod: 45, inventoryTurnover: 6.0, interestCoverageRatio: 5.0 },
        services: { currentRatio: 1.2, quickRatio: 1.0, netProfitMargin: 0.08, roe: 0.18, debtToEquity: 1.0, assetTurnover: 1.2, grossProfitMargin: 0.50, avgCollectionPeriod: 35, inventoryTurnover: 20.0, interestCoverageRatio: 6.0 },
        construction: { currentRatio: 1.3, quickRatio: 0.8, netProfitMargin: 0.04, roe: 0.14, debtToEquity: 1.5, assetTurnover: 1.5, grossProfitMargin: 0.20, avgCollectionPeriod: 60, inventoryTurnover: 10.0, interestCoverageRatio: 3.5 }
    };
    // 3. Helper Functions
    const formatPercent = (value, digits = 1) => isFinite(value) && !isNaN(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
    const formatRatio = (value, digits = 2) => isFinite(value) && !isNaN(value) ? value.toFixed(digits) : "N/A";
    const formatDays = (value) => isFinite(value) && !isNaN(value) ? `${value.toFixed(0)} ${lang === 'ar' ? 'يوم' : 'Days'}` : "N/A";
    const formatNumber = (value, digits = 0) => isFinite(value) && !isNaN(value) ? value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "N/A";

    // --- [إضافة] دالة جديدة لحساب نسب الفترة السابقة ---
    // هذه الدالة تحسب النسب المطلوبة بناءً على بيانات الفترة السابقة فقط
    const calculatePreviousRatios = () => {
        if (!state.statementsPrevious || !state.statementsPrevious.totals) {
            state.hasDataPrevious = false;
            return false;
        }
        const fPrev = state.statementsPrevious.totals;
        try {
            const assets = fPrev.totalAssets || 0;
            const equity = fPrev.totalEquity || 0;
            const liabilities = fPrev.totalLiabilities || 0;
            const revenue = fPrev.totalRevenue || 0;
            const netProfit = fPrev.netProfit || 0;
            const cogs = fPrev.totalCogs || 0;
            const ebit = fPrev.ebit || 0;
            const interestExpense = fPrev.totalInterest || 0;
            const inventory = fPrev.inventory || 0;
            const accountsReceivable = fPrev.accountsReceivable || 0;
            const currentAssets = fPrev.totalCurrentAssets || 0;
            const currentLiabilities = fPrev.totalCurrentLiabilities || 0;
            const cashEquivalents = fPrev.cashEquivalents || 0;
            const grossProfit = fPrev.grossProfit || 0;
            
            // حساب النسب (باستخدام بيانات الفترة السابقة فقط)
            // ملاحظة: هذه النسب لا تستخدم "متوسط" فترتين، بل هي نقطة زمنية للفترة السابقة
            state.ratiosPrevious = {
                currentRatio: currentLiabilities !== 0 ? currentAssets / currentLiabilities : Infinity,
                quickRatio: currentLiabilities !== 0 ? (currentAssets - inventory) / currentLiabilities : Infinity,
                netWorkingCapital: fPrev.workingCapital || 0,
                cashRatio: currentLiabilities !== 0 ? cashEquivalents / currentLiabilities : Infinity,
                inventoryTurnover: cogs > 0 && inventory > 0 ? cogs / inventory : Infinity,
                assetTurnover: assets > 0 ? revenue / assets : 0,
                receivablesTurnover: accountsReceivable > 0 ? revenue / accountsReceivable : Infinity,
                avgCollectionPeriod: (accountsReceivable > 0 && revenue > 0) ? (accountsReceivable / revenue) * 365 : Infinity,
                debtToAssets: assets > 0 ? liabilities / assets : Infinity,
                debtToEquity: equity > 0 ? liabilities / equity : Infinity,
                interestCoverageRatio: interestExpense !== 0 ? ebit / interestExpense : Infinity,
                financialLeverage: (equity !== 0 && assets !== 0) ? assets / equity : Infinity,
                grossProfitMargin: revenue !== 0 ? grossProfit / revenue : 0,
                netProfitMargin: revenue !== 0 ? netProfit / revenue : 0,
                roa: assets > 0 ? netProfit / assets : 0,
                roe: equity > 0 ? netProfit / equity : 0
            };
            
            state.hasDataPrevious = true;
            console.log("[DEBUG] Successfully calculated Previous Ratios:", state.ratiosPrevious);
            return true;
        } catch (e) {
            console.error("Error calculating PREVIOUS ratios:", e);
            state.hasDataPrevious = false;
            return false;
        }
    };
    // --- [نهاية الإضافة] ---

    // --- [تعديل] دالة تحميل البيانات (تحمل الآن الحالية والسابقة) ---
    const loadAllData = () => {
        state.hasDataCurrent = false;
        state.hasDataPrevious = false;
        
        // 1. تحميل النسب الحالية (المحسوبة من صفحة "التحليلات المتقدمة")
        try {
            const rawDataString = localStorage.getItem('calculatedRatios'); 
            if (!rawDataString) throw new Error("localStorage 'calculatedRatios' is missing. Run 'Advanced' page first.");       
            const parsedData = JSON.parse(rawDataString);
            if (typeof parsedData !== 'object' || parsedData === null) throw new Error("Parsed 'calculatedRatios' is not a valid object.");            
            state.ratiosCurrent = parsedData;
            state.hasDataCurrent = true;
            console.log("[DEBUG] Successfully loaded calculatedRatios (Current):", state.ratiosCurrent);
        } catch (e) { 
            console.error("Benchmark Component Error (Current Ratios):", e); 
        }

        // 2. تحميل بيانات الفترة السابقة (لحساب نسب الفترة السابقة)
        try {
            const previousDataString = localStorage.getItem('financialDataPrevious');
            if (previousDataString) {
                state.statementsPrevious = JSON.parse(previousDataString);
                if (state.statementsPrevious && state.statementsPrevious.totals) {
                    calculatePreviousRatios(); // هذه الدالة تضبط state.hasDataPrevious
                }
            } else {
                console.warn("[DEBUG] 'financialDataPrevious' not found. No previous ratios will be shown.");
            }
        } catch (e) {
            console.error("Error parsing 'financialDataPrevious':", e);
        }
        
        return state.hasDataCurrent; // الصفحة لا تزال تعمل طالما النسب الحالية موجودة
    };    
    // --- [نهاية التعديل] ---

    // --- [تعديل] دالة عرض الجداول (تم تطويرها بالكامل) ---
    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => {
        const container = document.getElementById(divId);
        if (!container) return;
        
        if (!state.hasDataCurrent) { // تم التعديل
            container.innerHTML = `<h5 class="mb-3">${t(categoryTitleKey)}</h5> <p class="text-muted">${t('noDataForRatios')}</p>`; return;
        }
        
        const benchmarks = industryBenchmarks[state.selectedIndustry] || {};
        const showBenchmarks = state.selectedIndustry !== 'general';
        const showPrevious = state.hasDataPrevious; // <-- إضافة

        // تعديل رأس الجدول
        let tableHTML = `<h5 class="mb-3">${t(categoryTitleKey)}</h5> <div class="table-responsive"> <table class="table table-sm table-striped"> <thead><tr> 
            <th>${t('thRatio')}</th> 
            ${showPrevious ? `<th class="text-end">${t('thPreviousValue')}</th>` : ''}
            <th class="text-end">${t('thCurrentValue')}</th> 
            ${showBenchmarks ? `<th class="text-end">${t('thIndustryAvg')}</th>` : ''} 
            <th>${t('thComment')}</th> 
            </tr></thead> <tbody>`;
            
        ratioKeys.forEach(key => {
            if (typeof state.ratiosCurrent[key] === 'undefined') return; 
            
            const valueCurrent = state.ratiosCurrent[key];
            const valuePrevious = state.ratiosPrevious[key]; // <-- إضافة
            const benchmarkValue = benchmarks[key]; 
            
            const isPercentage = key.includes('Margin') || key.includes('roa') || key.includes('roe');
            const isDays = key.includes('avgCollectionPeriod');
            const isNumber = key === 'netWorkingCapital';
            
            // تنسيق القيمة الحالية
            let formattedValueCurrent;
            if (isDays) formattedValueCurrent = formatDays(valueCurrent);
            else if (isPercentage) formattedValueCurrent = formatPercent(valueCurrent);
            else if (isNumber) formattedValueCurrent = formatNumber(valueCurrent, 0);
            else formattedValueCurrent = formatRatio(valueCurrent);
            
            // تنسيق القيمة السابقة
            let formattedValuePrevious = '-';
            if (showPrevious && typeof valuePrevious !== 'undefined' && isFinite(valuePrevious)) {
                if (isDays) formattedValuePrevious = formatDays(valuePrevious);
                else if (isPercentage) formattedValuePrevious = formatPercent(valuePrevious);
                else if (isNumber) formattedValuePrevious = formatNumber(valuePrevious, 0);
                else formattedValuePrevious = formatRatio(valuePrevious);
            }

            // تنسيق قيمة الصناعة
            let formattedBenchmark = '-';
            if (showBenchmarks && typeof benchmarkValue !== 'undefined' && isFinite(benchmarkValue)) {
                if (isDays) formattedBenchmark = formatDays(benchmarkValue);
                else if (isPercentage) formattedBenchmark = formatPercent(benchmarkValue);
                else if (isNumber) formattedBenchmark = formatNumber(benchmarkValue, 0);
                else formattedBenchmark = formatRatio(benchmarkValue);
            }
            
            // مؤشر "الطفرة" (مقارنة الحالية بالسابقة)
            let leapIndicator = '';
            if (showPrevious && isFinite(valueCurrent) && isFinite(valuePrevious) && valuePrevious !== 0) {
                const isLowerBetter = key === 'debtToEquity' || key === 'debtToAssets' || key === 'avgCollectionPeriod';
                let improved;
                if (isLowerBetter) {
                    improved = valueCurrent < valuePrevious;
                } else { // 'higher is better'
                    improved = valueCurrent > valuePrevious;
                }
                
                if (valueCurrent !== valuePrevious) {
                     leapIndicator = improved ? 
                        `<i class="bi bi-graph-up-arrow text-success ms-1" title="${lang === 'ar' ? 'تحسن عن الفترة السابقة' : 'Improved vs. Prior'}"></i>` :
                        `<i class="bi bi-graph-down-arrow text-danger ms-1" title="${lang === 'ar' ? 'تراجع عن الفترة السابقة' : 'Declined vs. Prior'}"></i>`;
                }
            }

            // مؤشر المقارنة (مقارنة الحالية بالصناعة)
            let comparisonIndicator = ''; 
            let comparisonText = '';
            if (showBenchmarks && typeof benchmarkValue !== 'undefined' && isFinite(valueCurrent) && isFinite(benchmarkValue)) { 
                const tolerance = 0.1 * Math.abs(benchmarkValue); 
                const isLowerBetter = key === 'debtToEquity' || key === 'debtToAssets' || key === 'avgCollectionPeriod';                
                let isBetter, isWorse;
                if (isLowerBetter) {
                    isBetter = valueCurrent < benchmarkValue - tolerance;
                    isWorse = valueCurrent > benchmarkValue + tolerance;
                } else { // 'higher is better'
                    isBetter = valueCurrent > benchmarkValue + tolerance;
                    isWorse = valueCurrent < benchmarkValue + tolerance;
                }
                if (isBetter) { 
                    comparisonIndicator = '<i class="bi bi-arrow-up-circle-fill text-success ms-1"></i>'; 
                    comparisonText = `(${t('comparison_better')})`; 
                } else if (isWorse) { 
                    comparisonIndicator = '<i class="bi bi-arrow-down-circle-fill text-danger ms-1"></i>'; 
                    comparisonText = `(${t('comparison_worse')})`; 
                } else { 
                    comparisonIndicator = '<i class="bi bi-arrow-left-right text-warning ms-1"></i>'; 
                    comparisonText = `(${t('comparison_similar')})`; 
                } 
            }            
            
            // بناء صف الجدول
            tableHTML += `<tr> 
                <td>${t(key)}</td> 
                ${showPrevious ? `<td class="text-end">${formattedValuePrevious}</td>` : ''}
                <td class="text-end"><strong>${formattedValueCurrent}</strong> ${leapIndicator} ${comparisonIndicator}</td> 
                ${showBenchmarks ? `<td class="text-end">${formattedBenchmark}</td>` : ''} 
                <td class="text-muted small">${comparisonText}</td> 
                </tr>`;
        });
        container.innerHTML = tableHTML + `</tbody></table></div>`;
    };
    // --- [نهاية التعديل] ---

    const renderAllRatios = () => {
        renderRatioCategory('liquidityRatiosBenchmark', 'liquidityRatios', ['currentRatio', 'quickRatio', 'cashRatio', 'netWorkingCapital']);
        renderRatioCategory('profitabilityRatiosBenchmark', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
        renderRatioCategory('leverageRatiosBenchmark', 'leverageRatios', ['debtToAssets', 'debtToEquity', 'interestCoverageRatio', 'financialLeverage']);
        renderRatioCategory('activityRatiosBenchmark', 'activityRatios', ['assetTurnover', 'inventoryTurnover', 'receivablesTurnover', 'avgCollectionPeriod']);
    };    
    
    // --- [تفعيل PDF] ---
    // هذا الكود هو النسخة المطورة التي طلبتها، والتي تتجاهل الأيقونات لتصدير سليم.
    const initPdfExport = () => {
         if (UI.exportPdfBtn) {
             UI.exportPdfBtn.addEventListener('click', () => {
                
                if (!state.hasDataCurrent) { // تم التعديل
                    alert(t('noDataForRatios')); 
                    return; 
                }
                
                console.log("Exporting benchmarks to PDF...");
                UI.exportPdfBtn.disabled = true; // تعطيل الزر
                const element = document.getElementById('benchmarks-content');

                if (typeof html2pdf === 'function') {
                    const opt = {
                        margin: 0.5,
                        filename: 'Benchmarks_Report.pdf',
                        image: { type: 'jpeg', quality: 0.98 },
                        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
                        
                        // هذا هو الكود المطور لتجاهل الأيقونات التي تسبب مشاكل
                        html2canvas: { 
                            scale: 2, 
                            useCORS: true, 
                            logging: false,
                            ignoreElements: (element) => {
                                // تجاهل كل وسوم <i> (الأيقونات)
                                const ignores = ['I']; 
                                if (element.classList.contains('watermark-logo')) {
                                    return true; // تجاهل العلامة المائية
                                }
                                return ignores.includes(element.tagName);
                            }
                        }
                    };
                    
                    html2pdf().from(element).set(opt).save().then(() => {
                        UI.exportPdfBtn.disabled = false; // إعادة تفعيل الزر
                    }).catch(err => {
                        console.error("PDF Export Error:", err);
                        alert("حدث خطأ أثناء إنشاء الـ PDF: " + err.message);
                        UI.exportPdfBtn.disabled = false; // إعادة تفعيل الزر
                    });

                } else {
                    console.error("html2pdf library is not loaded."); 
                    alert("PDF export failed. Library not loaded.");
                    UI.exportPdfBtn.disabled = false; // إعادة تفعيل الزر
                }
             });
         } else { console.warn("Export PDF button not found"); }
    };
    // --- [نهاية تفعيل PDF] ---

    // 6. Initialization
    const init = () => {
        console.log("[DEBUG] Initializing benchmarks page...");
        if (!UI.industrySelect || !UI.warningDiv) {
            console.error("Benchmark component critical elements not found."); return;
        }        
        if (typeof window.applyTranslations === 'function') {
            console.log("[DEBUG] Calling global applyTranslations...");
            window.applyTranslations();
        } else {
            console.warn("[DEBUG] global applyTranslations not found.");
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

        // --- [تعديل] استخدام الدالة الجديدة لتحميل البيانات ---
        if (loadAllData()) {
            UI.warningDiv.style.display = 'none';
            renderAllRatios();
            
            // إضافة تحذير إذا لم يتم العثور على بيانات سابقة
            if (!state.hasDataPrevious) {
                // يمكنك إضافة رسالة في مكان آخر إذا أردت
                console.warn(t('noDataForPreviousRatios'));
            }

        } else {
            UI.warningDiv.textContent = t('noDataForRatios');
            UI.warningDiv.style.display = 'block';
        }        
        // --- [نهاية التعديل] ---
        
        initPdfExport(); // ربط زر PDF
        console.log("[DEBUG] Benchmarks page initialization finished.");
    };    
    
    init(); // Call init immediately
    
});
