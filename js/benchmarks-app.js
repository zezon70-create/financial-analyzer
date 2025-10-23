// js/benchmarks-app.js
const benchmarksTranslations = {
    ar: {
        pageTitle: "المقارنات المعيارية — المحلل المالي",
        pageHeader: "المقارنات المعيارية (Industry Benchmarks)",
        pageSubheader: "قارن نسبك المالية بمتوسطات الصناعة لفهم وضعك التنافسي.",
        navBenchmarks: "المقارنات المعيارية",
        exportPdf: "تصدير PDF",
        thRatio: "النسبة", thValue: "القيمة", thIndustryAvg: "متوسط الصناعة", thComment: "مقارنة",
        noDataForRatios: "لا توجد نسب محسوبة. يرجى تشغيل صفحة 'التحليلات المتقدمة' أولاً.",
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
        pageSubheader: "Compare your financial ratios against industry averages to understand your competitive position.",
        navBenchmarks: "Benchmarks",
        exportPdf: "Export PDF",
        thRatio: "Ratio", thValue: "Value", thIndustryAvg: "Industry Avg.", thComment: "Comparison",
        noDataForRatios: "No calculated ratios found. Please run the 'Advanced Analytics' page first.",
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

// دمج الترجمات مع الترجمات العامة (إذا وجدت)
window.pageTranslations = window.pageTranslations || {};
window.pageTranslations.ar = { ...(window.pageTranslations.ar || {}), ...(benchmarksTranslations.ar || {}) };
window.pageTranslations.en = { ...(window.pageTranslations.en || {}), ...(benchmarksTranslations.en || {}) };

document.addEventListener('DOMContentLoaded', () => {
    console.log("[DEBUG] benchmarks-app.js script started execution.");

    const state = {
        ratios: {},
        hasData: false,
        selectedIndustry: 'general',
        industryBenchmarks: {} // سيتم ملؤه من ملف JSON
    };

    const lang = localStorage.getItem('lang') || 'ar';
    const t = (key) => (window.pageTranslations[lang]?.[key] || `[${key}]`);

    const UI = {
        industrySelect: document.getElementById('industrySelectBenchmark'),
        warningDiv: document.getElementById('ratiosDataWarningBenchmark'),
        exportPdfBtn: document.getElementById('exportPdfBtn')
        // يمكنك إضافة عناصر واجهة المستخدم الأخرى هنا إذا لزم الأمر
    };

    // --- Helper Functions ---
    const formatPercent = (value, digits = 1) => isFinite(value) && !isNaN(value) ? `${(value * 100).toFixed(digits)}%` : "N/A";
    const formatRatio = (value, digits = 2) => isFinite(value) && !isNaN(value) ? value.toFixed(digits) : "N/A";
    const formatDays = (value) => isFinite(value) && !isNaN(value) ? `${value.toFixed(0)} ${lang === 'ar' ? 'يوم' : 'Days'}` : "N/A";
    const formatNumber = (value, digits = 0) => isFinite(value) && !isNaN(value) ? value.toLocaleString(undefined, { minimumFractionDigits: digits, maximumFractionDigits: digits }) : "N/A";

    const loadProcessedRatios = () => {
        state.ratios = {};
        state.hasData = false;
        console.log("[DEBUG] Loading calculatedRatios from localStorage...");
        try {
            const rawDataString = localStorage.getItem('calculatedRatios');
            if (!rawDataString) throw new Error("localStorage 'calculatedRatios' is missing. Run 'Advanced' page first.");
            const parsedData = JSON.parse(rawDataString);
            if (typeof parsedData !== 'object' || parsedData === null) throw new Error("Parsed 'calculatedRatios' is not a valid object.");
            state.ratios = parsedData;
            state.hasData = true;
            console.log("[DEBUG] Successfully loaded calculatedRatios:", state.ratios);
            return true;
        } catch (e) {
            console.error("Benchmark Component Error:", e);
            return false;
        }
    };

    // --- Rendering Functions ---
    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => {
        const container = document.getElementById(divId);
        if (!container) {
            console.error(`Element with ID ${divId} not found.`);
            return;
        }

        if (!state.hasData) {
            container.innerHTML = `<h5 class="mb-3">${t(categoryTitleKey)}</h5> <p class="text-muted">${t('noDataForRatios')}</p>`;
            return;
        }

        const benchmarks = state.industryBenchmarks[state.selectedIndustry] || {};
        const showBenchmarks = state.selectedIndustry !== 'general' && Object.keys(benchmarks).length > 0;

        let tableHTML = `<h5 class="mb-3">${t(categoryTitleKey)}</h5>
                         <div class="table-responsive">
                             <table class="table table-sm table-striped">
                                 <thead>
                                     <tr>
                                         <th>${t('thRatio')}</th>
                                         <th class="text-end">${t('thValue')}</th>
                                         ${showBenchmarks ? `<th class="text-end">${t('thIndustryAvg')}</th>` : ''}
                                         <th>${t('thComment')}</th>
                                     </tr>
                                 </thead>
                                 <tbody>`;

        ratioKeys.forEach(key => {
            // تحقق من وجود النسبة في البيانات المحملة قبل عرضها
            if (typeof state.ratios[key] === 'undefined' || state.ratios[key] === null) return;

            const value = state.ratios[key];
            const benchmarkValue = benchmarks[key];
            const isPercentage = key.includes('Margin') || key.includes('roa') || key.includes('roe');
            const isDays = key.includes('avgCollectionPeriod');
            const isNumber = key === 'netWorkingCapital';

            let formattedValue;
            if (isDays) formattedValue = formatDays(value);
            else if (isPercentage) formattedValue = formatPercent(value);
            else if (isNumber) formattedValue = formatNumber(value, 0);
            else formattedValue = formatRatio(value);

            let formattedBenchmark = '-';
            if (showBenchmarks && typeof benchmarkValue !== 'undefined' && isFinite(benchmarkValue)) {
                if (isDays) formattedBenchmark = formatDays(benchmarkValue);
                else if (isPercentage) formattedBenchmark = formatPercent(benchmarkValue);
                else if (isNumber) formattedBenchmark = formatNumber(benchmarkValue, 0);
                else formattedBenchmark = formatRatio(benchmarkValue);
            }

            // Comparison logic
            let comparisonIndicator = '';
            let comparisonText = '';
            if (showBenchmarks && typeof benchmarkValue !== 'undefined' && isFinite(value) && isFinite(benchmarkValue)) {
                const tolerance = 0.1 * Math.abs(benchmarkValue); // نسبة تسامح 10%
                const isLowerBetter = key === 'debtToEquity' || key === 'debtToAssets' || key === 'avgCollectionPeriod';

                let isBetter, isWorse;
                if (isLowerBetter) {
                    isBetter = value < benchmarkValue - tolerance;
                    isWorse = value > benchmarkValue + tolerance;
                } else { // 'higher is better' for most ratios
                    isBetter = value > benchmarkValue + tolerance;
                    isWorse = value < benchmarkValue - tolerance;
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

            tableHTML += `<tr>
                            <td>${t(key)}</td>
                            <td class="text-end"><strong>${formattedValue}</strong> ${comparisonIndicator}</td>
                            ${showBenchmarks ? `<td class="text-end">${formattedBenchmark}</td>` : ''}
                            <td class="text-muted small">${comparisonText}</td>
                          </tr>`;
        });

        tableHTML += `</tbody></table></div>`;
        container.innerHTML = tableHTML;
    };

    const renderAllRatios = () => {
        renderRatioCategory('liquidityRatiosBenchmark', 'liquidityRatios', ['currentRatio', 'quickRatio', 'cashRatio', 'netWorkingCapital']);
        renderRatioCategory('profitabilityRatiosBenchmark', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
        renderRatioCategory('leverageRatiosBenchmark', 'leverageRatios', ['debtToAssets', 'debtToEquity', 'interestCoverageRatio', 'financialLeverage']);
        renderRatioCategory('activityRatiosBenchmark', 'activityRatios', ['assetTurnover', 'inventoryTurnover', 'receivablesTurnover', 'avgCollectionPeriod']);
    };

    // --- PDF Export ---
    const initPdfExport = () => {
         if (UI.exportPdfBtn) {
             UI.exportPdfBtn.addEventListener('click', () => {
                if (!state.hasData) {
                    alert(t('noDataForRatios'));
                    return;
                }
                console.log("Exporting benchmarks to PDF...");
                UI.exportPdfBtn.disabled = true; // تعطيل الزر مؤقتاً
                const element = document.getElementById('benchmarks-content');

                if (typeof html2pdf === 'function') {
                    const opt = {
                        margin: 0.5,
                        filename: 'Benchmarks_Report.pdf',
                        image: { type: 'jpeg', quality: 0.98 },
                        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
                        html2canvas: {
                            scale: 2,
                            useCORS: true,
                            logging: false,
                            ignoreElements: (element) => {
                                // تجاهل أيقونات المقارنة (<i>) والعلامة المائية إذا كانت موجودة كـ HTML
                                const ignores = ['I'];
                                if (element.classList.contains('watermark-logo')) {
                                    return true;
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
                        UI.exportPdfBtn.disabled = false; // إعادة تفعيل الزر في حالة الخطأ
                    });

                } else {
                    console.error("html2pdf library is not loaded.");
                    alert("PDF export failed. Library not loaded.");
                    UI.exportPdfBtn.disabled = false; // إعادة تفعيل الزر
                }
             });
         } else { console.warn("Export PDF button not found"); }
    };

    // --- Initialization ---
    const init = async () => { // جعل الدالة async لانتظار fetch
        console.log("[DEBUG] Initializing benchmarks page...");
        if (!UI.industrySelect || !UI.warningDiv) {
            console.error("Benchmark component critical elements not found. Initialization aborted.");
            return;
        }

        // 1. جلب بيانات المقارنات المعيارية أولاً
        try {
            const response = await fetch('data/benchmarks.json'); // جلب ملف JSON
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            state.industryBenchmarks = await response.json(); // تخزين البيانات في state
            console.log("[DEBUG] Successfully fetched and parsed industry benchmarks.", state.industryBenchmarks);
        } catch (error) {
            console.error("Failed to fetch or parse benchmarks data:", error);
            // يمكنك وضع رسالة للمستخدم هنا أو استخدام بيانات افتراضية
            UI.warningDiv.textContent = "فشل تحميل بيانات المقارنات المعيارية.";
            UI.warningDiv.style.display = 'block';
            // يمكنك اختيار إكمال التحميل بباقي البيانات أو التوقف
        }

        // 2. تطبيق الترجمات
        if (typeof window.applyTranslations === 'function') {
            console.log("[DEBUG] Calling global applyTranslations...");
            window.applyTranslations();
        } else {
            console.warn("[DEBUG] global applyTranslations function not found.");
        }

        // 3. إعداد قائمة اختيار الصناعة
        const industries = ['general', 'retail', 'manufacturing', 'services', 'construction'];
        UI.industrySelect.innerHTML = industries.map(key => `<option value="${key}">${t(`industry_${key}`)}</option>`).join('');

        // 4. استعادة الاختيار المحفوظ وربط حدث التغيير
        state.selectedIndustry = localStorage.getItem('selectedIndustry') || 'general';
        UI.industrySelect.value = state.selectedIndustry;
        UI.industrySelect.addEventListener('change', (e) => {
            state.selectedIndustry = e.target.value;
            localStorage.setItem('selectedIndustry', state.selectedIndustry);
            renderAllRatios(); // إعادة عرض الجداول عند تغيير الصناعة
        });

        // 5. تحميل النسب المحسوبة وعرض الجداول
        if (loadProcessedRatios()) {
            UI.warningDiv.style.display = 'none';
            renderAllRatios();
        } else {
            UI.warningDiv.textContent = t('noDataForRatios');
            UI.warningDiv.style.display = 'block';
            // إخفاء جداول النسب إذا لم تكن هناك بيانات
             document.getElementById('liquidityRatiosBenchmark')?.innerHTML = '';
             document.getElementById('profitabilityRatiosBenchmark')?.innerHTML = '';
             document.getElementById('leverageRatiosBenchmark')?.innerHTML = '';
             document.getElementById('activityRatiosBenchmark')?.innerHTML = '';
        }

        // 6. تهيئة زر تصدير PDF
        initPdfExport();

        console.log("[DEBUG] Benchmarks page initialization finished.");
    };

    // --- Run Initialization ---
    init(); // استدعاء دالة التهيئة الرئيسية

}); // End DOMContentLoaded