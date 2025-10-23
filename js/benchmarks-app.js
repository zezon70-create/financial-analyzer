// js/benchmarks-app.js
const benchmarksTranslations = {
    ar: {
        pageTitle: "المقارنات المعيارية — المحلل المالي",
        pageHeader: "المقارنات المعيارية (Industry Benchmarks)",
        pageSubheader: "قارن نسبك المالية بمتوسطات الصناعة لفهم وضعك التنافسي.",
        navBenchmarks: "المقارنات المعيارية",
        exportPdf: "تصدير PDF", // *** مُضاف ***
        thRatio: "النسبة", thValue: "القيمة", thIndustryAvg: "متوسط الصناعة", thComment: "مقارنة", // *** مُعدل: تعليق تحليلي -> مقارنة ***
        noDataForRatios: "لا توجد نسب محسوبة. يرجى تشغيل صفحة 'التحليلات المتقدمة' أولاً.", // *** مُعدل: رسالة أوضح ***
        liquidityRatios: "مؤشرات السيولة", profitabilityRatios: "مؤشرات الربحية", leverageRatios: "مؤشرات الروافع والمديونية", activityRatios: "مؤشرات النشاط", // *** مُعدل: efficiencyRatios -> activityRatios ***
        currentRatio: "نسبة التداول", quickRatio: "نسبة السيولة السريعة",
        netProfitMargin: "هامش صافي الربح", grossProfitMargin: "هامش الربح الإجمالي", roa: "العائد على الأصول (ROA)", roe: "العائد على حقوق الملكية (ROE)",
        debtToEquity: "نسبة الديون لحقوق الملكية", debtToAssets: "نسبة الديون للأصول",
        // *** مُضاف: استخدام نفس المفاتيح من advanced-app.js ***
        inventoryTurnover: "معدل دوران المخزون",
        assetTurnover: "معدل دوران الأصول",
        receivablesTurnover: "معدل دوران العملاء",
        avgCollectionPeriod: "متوسط فترة التحصيل",
        interestCoverageRatio: "عدد مرات تغطية الفوائد",
        financialLeverage: "الرافعة المالية",
        cashRatio: "نسبة النقد",
        netWorkingCapital: "صافي راس المال العامل",
        // *** نهاية الإضافة ***
        selectIndustryLabel: "اختر قطاع الصناعة للمقارنة",
        selectIndustryDesc: "اختيار قطاع سيضيف مقارنة مع متوسطات الصناعة إلى جداول النسب.",
        industry_general: "عام / غير محدد", industry_retail: "تجارة التجزئة", industry_manufacturing: "الصناعة التحويلية", industry_services: "الخدمات", industry_construction: "المقاولات",
        comparison_better: "أفضل", comparison_worse: "أسوأ", comparison_similar: "مماثل"
    },
    en: {
        // *** مُضاف: ترجمات إنجليزية كاملة ***
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

// *** مُضاف: منطق دمج الترجمات ***
window.pageTranslations = window.pageTranslations || {};
window.pageTranslations.ar = { ...(window.pageTranslations.ar || {}), ...(benchmarksTranslations.ar || {}) };
window.pageTranslations.en = { ...(window.pageTranslations.en || {}), ...(benchmarksTranslations.en || {}) };
// *** نهاية الإضافة ***


document.addEventListener('DOMContentLoaded', () => {

    const state = {
        ratios: {}, // سيتم ملؤها من localStorage
        hasData: false,
        selectedIndustry: 'general'
    };
    const lang = localStorage.getItem('lang') || 'ar';
    // *** مُعدل: التأكد من أن t_page يستخدم الكائن المدمج ***
    const t = (key) => (window.pageTranslations[lang]?.[key] || `[${key}]`);

    const UI = {
        industrySelect: document.getElementById('industrySelectBenchmark'),
        warningDiv: document.getElementById('ratiosDataWarningBenchmark'),
        exportPdfBtn: document.getElementById('exportPdfBtn') // *** مُضاف ***
    };

    // بيانات المقارنة المعيارية (يمكن توسيعها لتشمل كل النسب)
    const industryBenchmarks = {
        general: {}, // لا مقارنات
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


    // 4. *** مُعدل: دالة قراءة النسب الجاهزة ***
    const loadProcessedRatios = () => {
        state.ratios = {}; state.hasData = false;
        console.log("[DEBUG] Loading calculatedRatios from localStorage...");
        try {
            // *** تم التعديل: القراءة من calculatedRatios ***
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
    
    // *** مُلغى: دالة calculateData القديمة ***

    // 5. Rendering Functions
    const renderRatioCategory = (divId, categoryTitleKey, ratioKeys) => {
        const container = document.getElementById(divId);
        if (!container) return;
        if (!state.hasData) {
            container.innerHTML = `<h5 class="mb-3">${t(categoryTitleKey)}</h5> <p class="text-muted">${t('noDataForRatios')}</p>`; return;
        }
        const benchmarks = industryBenchmarks[state.selectedIndustry] || {};
        const showBenchmarks = state.selectedIndustry !== 'general';
        
        // *** مُعدل: إزالة table-light من thead لإصلاح الوضع الليلي ***
        let tableHTML = `<h5 class="mb-3">${t(categoryTitleKey)}</h5> <div class="table-responsive"> <table class="table table-sm table-striped"> <thead><tr> <th>${t('thRatio')}</th> <th class="text-end">${t('thValue')}</th> ${showBenchmarks ? `<th class="text-end">${t('thIndustryAvg')}</th>` : ''} <th>${t('thComment')}</th> </tr></thead> <tbody>`;
        
        ratioKeys.forEach(key => {
            if (typeof state.ratios[key] === 'undefined') return; // تخطي النسبة إذا لم تكن موجودة

            const value = state.ratios[key]; 
            const benchmarkValue = benchmarks[key]; 
            // *** مُعدل: تحديد التنسيق بناءً على نوع النسبة ***
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
                const tolerance = 0.1 * Math.abs(benchmarkValue); 
                // Ratios where 'lower is better'
                const isLowerBetter = key === 'debtToEquity' || key === 'debtToAssets' || key === 'avgCollectionPeriod';
                
                let isBetter, isWorse;
                if (isLowerBetter) {
                    isBetter = value < benchmarkValue - tolerance;
                    isWorse = value > benchmarkValue + tolerance;
                } else { // 'higher is better'
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
            
            tableHTML += `<tr> <td>${t(key)}</td> <td class="text-end"><strong>${formattedValue}</strong> ${comparisonIndicator}</td> ${showBenchmarks ? `<td class="text-end">${formattedBenchmark}</td>` : ''} <td class="text-muted small">${comparisonText}</td> </tr>`;
        });
        container.innerHTML = tableHTML + `</tbody></table></div>`;
    };

    const renderAllRatios = () => {
        // *** مُعدل: استخدام المفاتيح الجديدة للنسب ***
        renderRatioCategory('liquidityRatiosBenchmark', 'liquidityRatios', ['currentRatio', 'quickRatio', 'cashRatio', 'netWorkingCapital']);
        renderRatioCategory('profitabilityRatiosBenchmark', 'profitabilityRatios', ['grossProfitMargin', 'netProfitMargin', 'roa', 'roe']);
        renderRatioCategory('leverageRatiosBenchmark', 'leverageRatios', ['debtToAssets', 'debtToEquity', 'interestCoverageRatio', 'financialLeverage']);
        renderRatioCategory('activityRatiosBenchmark', 'activityRatios', ['assetTurnover', 'inventoryTurnover', 'receivablesTurnover', 'avgCollectionPeriod']);
    };
    
    // *** مُضاف: دالة تصدير PDF ***
    const initPdfExport = () => {
         if (UI.exportPdfBtn) {
             UI.exportPdfBtn.addEventListener('click', () => {
                if (!state.hasData) { alert(t('noDataForRatios')); return; }
                console.log("Exporting benchmarks to PDF...");
                const element = document.getElementById('benchmarks-content');
                if (typeof html2pdf === 'function') {
                    const opt = {
                        margin: 0.5,
                        filename: 'Benchmarks_Report.pdf',
                        image: { type: 'jpeg', quality: 0.98 },
                        html2canvas: { scale: 2, useCORS: true, logging: false },
                        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                    };
                    html2pdf().from(element).set(opt).save();
                } else {
                    console.error("html2pdf library is not loaded."); 
                    alert("PDF export failed. Library not loaded. Please try again in a moment.");
                }
             });
         } else { console.warn("Export PDF Button not found"); }
    };
    
    // 6. Initialization
    const init = () => {
        console.log("[DEBUG] Initializing benchmarks page...");
        if (!UI.industrySelect || !UI.warningDiv) {
            console.error("Benchmark component critical elements not found."); return;
        }
        
        // *** مُعدل: استدعاء الترجمة أولاً ***
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

        // *** مُعدل: التحميل من المصدر الجديد ***
        if (loadProcessedRatios()) {
            UI.warningDiv.style.display = 'none';
            renderAllRatios();
        } else {
            UI.warningDiv.textContent = t('noDataForRatios');
            UI.warningDiv.style.display = 'block';
        }
        
        initPdfExport(); // ربط زر PDF

        console.log("[DEBUG] Benchmarks page initialization finished.");
    };
    
    // Helper function to load scripts (needed for PDF export)
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

    // Load PDF library in background and then init
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js", init, init); // Call init regardless
    
});
