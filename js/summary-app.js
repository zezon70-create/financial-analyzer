// js/summary-app.js
const summaryTranslations = {
    ar: {
        pageTitle: "الملخص الذكي — المحلل المالي",
        pageHeader: "الملخص التنفيذي الذكي",
        pageSubheader: "تحليل آلي لنقاط القوة والضعف والفرص بناءً على بياناتك المالية.",
        loadingTitle: "جاري تحميل التحليل...",
        loadingText: "يقوم المحلل الذكي بمعالجة بياناتك. إذا استمر هذا طويلاً، تأكد من تشغيل صفحة 'التقارير' وصفحة 'التحليلات المتقدمة' أولاً.",
        noDataTitle: "❌ خطأ في البيانات",
        noDataText: "لا يمكن إنشاء الملخص. لم يتم العثور على 'calculatedRatios' أو 'financialDataCurrent'. يرجى تشغيل صفحة 'التقارير' ثم صفحة 'التحليلات المتقدمة' أولاً.",
        overallSummaryTitle: "الملخص العام",
        strengthsTitle: "🟢 نقاط القوة",
        weaknessesTitle: "🔴 نقاط الضعف والتحذير",
        solutionsTitle: "💡 الحلول والفرص المقترحة",
        loadingItems: "جاري التحليل...",
        noStrengths: "لم يتم رصد نقاط قوة تشغيلية واضحة في هذه المرحلة.",
        noWeaknesses: "تهانينا! لم يتم رصد أي مؤشرات خطر حرجة.",
        noSolutions: "لا توجد توصيات تلقائية حالياً. حافظ على الأداء الجيد.",
        exportPdf: "تصدير PDF", // (تمت إضافة زر التصدير)
        summary_strong: "الأداء المالي العام قوي. الشركة تظهر ربحية ممتازة مع هيكل مالي متوازن، مما يوفر أساساً متيناً للنمو.",
        summary_stable: "الأداء المالي مستقر. توجد ربحية جيدة ولكن يجب مراقبة كفاءة الأصول والسيولة لضمان استمرار الأداء الإيجابي.",
        summary_weak: "الأداء المالي يواجه تحديات. توجد ضغوط واضحة على الربحية والسيولة، مما يتطلب إجراءات تصحيحية عاجلة.",
        strength_roe_leveraged: "تحقيق عائد مرتفع على حقوق الملكية (ROE) بنسبة {val}، مدفوعاً بشكل أساسي بالرافعة المالية العالية. (انتبه: هذه القوة قد تحمل مخاطر).",
        strength_roe_efficient: "أداء استثنائي! تحقيق عائد مرتفع على حقوق الملكية (ROE) بنسبة {val}، ناتج عن كفاءة تشغيلية عالية (ربحية جيدة) مع مستوى ديون آمن.",
        strength_high_npm: "ربحية ممتازة: هامش صافي الربح مرتفع جداً ويبلغ {val}. هذا يدل على تحكم قوي في التكاليف أو قوة تسعيرية.",
        strength_high_liquidity: "سيولة ممتازة: نسبة التداول {val} مرتفعة جداً، مما يعني أن الشركة ليس لديها أي مشكلة في سداد التزاماتها قصيرة الأجل.",
        weakness_low_npm: "خطر ربحية: الشركة تعمل بهامش صافي ربح منخفض جداً ({val}) أو تحقق خسائر. هذا يضعف قدرتها على تحمل أي صدمات.",
        weakness_low_liquidity: "خطر سيولة حرج: نسبة التداول منخفضة ({val}). الشركة قد تواجه صعوبة في سداد الالتزامات قصيرة الأجل.",
        weakness_high_leverage: "خطر مديونية مرتفع: نسبة الديون إلى حقوق الملكية تبلغ {val}. الاعتماد الكبير على الديون يزيد من المخاطر المالية وتكلفة الفوائد.",
        weakness_slow_collection: "دورة نقدية ضعيفة: متوسط فترة التحصيل من العملاء طويل جداً ({val} يوم)، مما 'يحبس' النقدية ويضعف السيولة.",
        weakness_slow_inventory: "مخزون راكد: معدل دوران المخزون بطيء ({val} مرة سنوياً)، مما يعني أن البضاعة لا تباع بالكفاءة المطلوبة وتربط جزءاً كبيراً من رأس المال.",
        solution_slow_collection: "الحل (لضعف السيولة): يجب تطبيق سياسة ائتمان أكثر صرامة. فكر في تقديم خصم (مثلاً 2%) للعملاء الذين يدفعون مبكراً لتسريع التحصيل.",
        solution_slow_inventory_margin: "الحل (لركود المخزون): بما أن هامش الربح الإجمالي لديك مرتفع ({val})، لديك مساحة لتقديم عروض ترويجية أو خصومات لتصفية المخزون البطيء وتحويله إلى نقد فوري.",
        solution_slow_inventory_no_margin: "الحل (لركود المخزون): هامش الربح لديك منخفض. يجب مراجعة سياسة التسعير أو البحث عن طرق لتقليل تكلفة المخزون دون التأثير على الجودة.",
        solution_high_leverage: "الحل (للمديونية المرتفعة): يجب التركيز على سداد الديون الحالية من الأرباح التشغيلية بدلاً من توزيعها، أو التفكير في إعادة جدولة الديون طويلة الأجل لتقليل عبء الفوائد.",
    },
    en: {
        // ... (يمكن إضافة الترجمات الإنجليزية هنا بنفس الطريقة) ...
        pageTitle: "Smart Summary — Financial Analyzer",
        pageHeader: "Smart Executive Summary",
        pageSubheader: "Automated analysis of strengths, weaknesses, and opportunities based on your data.",
        loadingTitle: "Loading Analysis...",
        loadingText: "The Smart Analyst is processing your data. If this takes long, ensure you have run the 'Report' and 'Advanced Analytics' pages first.",
        noDataTitle: "❌ Data Error",
        noDataText: "Cannot generate summary. 'calculatedRatios' or 'financialDataCurrent' not found. Please run the 'Report' page then the 'Advanced Analytics' page first.",
        overallSummaryTitle: "Overall Summary",
        strengthsTitle: "🟢 Strengths",
        weaknessesTitle: "🔴 Weaknesses & Warnings",
        solutionsTitle: "💡 Suggested Solutions & Opportunities",
        loadingItems: "Analyzing...",
        noStrengths: "No clear operational strengths identified at this stage.",
        noWeaknesses: "Congratulations! No critical risk indicators found.",
        noSolutions: "No automated recommendations at this time. Maintain good performance.",
        exportPdf: "Export PDF",
        summary_strong: "Overall financial performance is strong. The company shows excellent profitability with a balanced financial structure, providing a solid foundation for growth.",
        summary_stable: "Financial performance is stable. Profitability is good, but asset efficiency and liquidity should be monitored to ensure continued positive performance.",
        summary_weak: "Financial performance faces challenges. There are clear pressures on profitability and liquidity, requiring immediate corrective actions.",        
        strength_roe_leveraged: "High Return on Equity (ROE) of {val} achieved, primarily driven by high financial leverage. (Note: This strength may carry risk).",
        strength_roe_efficient: "Exceptional performance! High Return on Equity (ROE) of {val} achieved, resulting from high operational efficiency (good profitability) with a safe debt level.",
        strength_high_npm: "Excellent profitability: Net Profit Margin is very high at {val}. This indicates strong cost control or pricing power.",
        strength_high_liquidity: "Excellent liquidity: Current Ratio is very high ({val}), meaning the company has no issue meeting its short-term obligations.",
        weakness_low_npm: "Profitability Risk: The company is operating on a very low Net Profit Margin ({val}) or incurring losses. This weakens its ability to absorb shocks.",
        weakness_low_liquidity: "Critical Liquidity Risk: Current Ratio is low ({val}). The company may face difficulty meeting short-term obligations.",
        weakness_high_leverage: "High Leverage Risk: Debt to Equity ratio is {val}. High reliance on debt increases financial risk and interest burden.",
        weakness_slow_collection: "Weak Cash Cycle: Average collection period is very long ({val} days), 'locking up' cash and weakening liquidity.",
        weakness_slow_inventory: "Stagnant Inventory: Inventory turnover is slow ({val} times/year), meaning goods are not sold efficiently, tying up significant capital.",
        solution_slow_collection: "Solution (for weak liquidity): A stricter credit policy must be implemented. Consider offering a discount (e.g., 2%) for early payments to accelerate collections.",
        solution_slow_inventory_margin: "Solution (for stagnant inventory): Since your Gross Profit Margin is high ({val}), you have room to offer promotions or discounts to clear slow-moving inventory and convert it to cash.",
        solution_slow_inventory_no_margin: "Solution (for stagnant inventory): Your profit margin is low. Pricing must be reviewed, or seek ways to reduce inventory cost without sacrificing quality.",
        solution_high_leverage: "Solution (for high debt): Focus on repaying existing debt from operating profits rather than distributing dividends, or consider refinancing long-term debt to reduce the interest burden.",
    }
};
// --- 2. دمج الترجمات مع النظام الأساسي ---
window.pageTranslations = window.pageTranslations || {};
window.pageTranslations.ar = { ...window.pageTranslations.ar || {}, ...summaryTranslations.ar || {} };
window.pageTranslations.en = { ...window.pageTranslations.en || {}, ...summaryTranslations.en || {} };
// --- 3. بدء تشغيل الكود ---
document.addEventListener("DOMContentLoaded", () => {    
    // تأكد من تشغيل main.js (أو أجزاء منه) إذا لم يتم تحميله
    if (typeof window.applyTranslations !== 'function') {
        console.warn("main.js's applyTranslations function not found! Running local minimal version.");
        // (وضع احتياطي بسيط جداً لو فشل main.js في التحميل)
        window.applyTranslations = () => {
             document.querySelectorAll("[data-translate-key]").forEach(el => {
                 const key = el.dataset.translateKey;
                 const lang = localStorage.getItem('lang') || 'ar';
                 const text = window.pageTranslations[lang]?.[key] || `[${key}]`;
                 el.textContent = text;
             });
        };
    }    
    const lang = localStorage.getItem('lang') || 'ar';
    const t = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`;    
    // دالة مساعدة لترقيم النتائج
    const i18n_num = (val, type = 'percent') => {
        if (!isFinite(val)) return 'N/A';
        if (type === 'percent') return `${(val * 100).toFixed(1)}%`;
        if (type === 'days') return `${val.toFixed(0)} ${lang === 'ar' ? 'يوم' : 'Days'}`;
        if (type === 'times') return `${val.toFixed(1)} ${lang === 'ar' ? 'مرة' : 'Times'}`;
        return val.toFixed(2); // 'ratio'
    };

    // --- 4. تحديد عناصر الصفحة ---
    const ui = {
        loadingMessage: document.getElementById('loadingMessage'),
        summaryContent: document.getElementById('summaryContent'),
        overallSummaryText: document.getElementById('overallSummaryText'),
        strengthsList: document.getElementById('strengthsList'),
        weaknessesList: document.getElementById('weaknessesList'),
        solutionsList: document.getElementById('solutionsList'),
        loadingTitle: document.querySelector('#loadingMessage .alert-heading'),
        loadingText: document.querySelector('#loadingMessage p'),
        exportPdfBtn: document.getElementById('exportPdfBtn')
    };

    // --- 5. تحميل البيانات الأساسية ---
    function loadData() {
        try {
            const ratiosData = localStorage.getItem('calculatedRatios');
            const statementsData = localStorage.getItem('financialDataCurrent');

            if (!ratiosData || !statementsData) {
                console.error("Data missing. 'calculatedRatios' or 'financialDataCurrent' not found.");
                ui.loadingTitle.textContent = t('noDataTitle');
                ui.loadingText.textContent = t('noDataText');
                ui.loadingMessage.classList.remove('alert-warning');
                ui.loadingMessage.classList.add('alert-danger');
                ui.loadingMessage.querySelector('.spinner-border').style.display = 'none'; // إخفاء علامة التحميل
                return null;
            }

            const ratios = JSON.parse(ratiosData);
            const statements = JSON.parse(statementsData);

            // التحقق من أن البيانات ليست فارغة
            if (Object.keys(ratios).length === 0) {
                 throw new Error("'calculatedRatios' is an empty object.");
            }

            return { ratios, statements };
            
        } catch (error) {
            console.error("Failed to parse data from localStorage:", error);
            ui.loadingTitle.textContent = t('noDataTitle');
            ui.loadingText.textContent = t('noDataText');
            ui.loadingMessage.classList.remove('alert-warning');
            ui.loadingMessage.classList.add('alert-danger');
            ui.loadingMessage.querySelector('.spinner-border').style.display = 'none';
            return null;
        }
    }

    // --- 6. 🧠 العقل المفكر (محرك القواعد) ---
    function runAnalysisEngine(ratios, statements) {
        const analysis = {
            strengths: [],
            weaknesses: [],
            solutions: []
        };

        // --- القاعدة 1: الربحية ---
        if (isFinite(ratios.netProfitMargin)) {
            if (ratios.netProfitMargin < 0.02 && ratios.netProfitMargin >= 0) {
                analysis.weaknesses.push(t('weakness_low_npm').replace('{val}', i18n_num(ratios.netProfitMargin)));
            } else if (ratios.netProfitMargin < 0) {
                 analysis.weaknesses.push(t('weakness_low_npm').replace('{val}', i18n_num(ratios.netProfitMargin)));
            }
            if (ratios.netProfitMargin > 0.15) {
                analysis.strengths.push(t('strength_high_npm').replace('{val}', i18n_num(ratios.netProfitMargin)));
            }
        }
        
        // --- القاعدة 2: السيولة ---
        if (isFinite(ratios.currentRatio)) {
            if (ratios.currentRatio < 1.2) {
                analysis.weaknesses.push(t('weakness_low_liquidity').replace('{val}', i18n_num(ratios.currentRatio, 'ratio')));
            }
            if (ratios.currentRatio > 2.5) {
                analysis.strengths.push(t('strength_high_liquidity').replace('{val}', i18n_num(ratios.currentRatio, 'ratio')));
            }
        }

        // --- القاعدة 3: المديونية ---
        if (isFinite(ratios.debtToEquity) && ratios.debtToEquity > 2.0) {
            analysis.weaknesses.push(t('weakness_high_leverage').replace('{val}', i18n_num(ratios.debtToEquity, 'ratio')));
            analysis.solutions.push(t('solution_high_leverage'));
        }
        
        // --- القاعدة 4: تحليل العائد على حقوق الملكية (ROE) ---
        if (isFinite(ratios.roe) && ratios.roe > 0.20) {
            if (isFinite(ratios.debtToEquity) && ratios.debtToEquity > 1.5) {
                analysis.strengths.push(t('strength_roe_leveraged').replace('{val}', i18n_num(ratios.roe)));
            } else {
                analysis.strengths.push(t('strength_roe_efficient').replace('{val}', i18n_num(ratios.roe)));
            }
        }

        // --- القاعدة 5: تحليل الدورة النقدية (الكفاءة) ---
        if (isFinite(ratios.avgCollectionPeriod) && ratios.avgCollectionPeriod > 60) {
            analysis.weaknesses.push(t('weakness_slow_collection').replace('{val}', i18n_num(ratios.avgCollectionPeriod, 'days')));
            // حل مقترن
            analysis.solutions.push(t('solution_slow_collection'));
        }
        
        if (isFinite(ratios.inventoryTurnover) && ratios.inventoryTurnover < 3) {
            analysis.weaknesses.push(t('weakness_slow_inventory').replace('{val}', i18n_num(ratios.inventoryTurnover, 'times')));
            // حل مقترن ذكي
            if (isFinite(ratios.grossProfitMargin) && ratios.grossProfitMargin > 0.40) {
                 analysis.solutions.push(t('solution_slow_inventory_margin').replace('{val}', i18n_num(ratios.grossProfitMargin)));
            } else {
                 analysis.solutions.push(t('solution_slow_inventory_no_margin'));
            }
        }

        // --- الملخص العام (يعتمد على الربحية والسيولة) ---
        let overallSummary = t('summary_stable');
        if (isFinite(ratios.netProfitMargin) && isFinite(ratios.currentRatio)) {
            if (ratios.netProfitMargin > 0.10 && ratios.currentRatio > 1.5) {
                overallSummary = t('summary_strong');
            } else if (ratios.netProfitMargin < 0 || ratios.currentRatio < 1.0) {
                overallSummary = t('summary_weak');
            }
        }
        analysis.overall = overallSummary;
        
        return analysis;
    }

    // --- 7. عرض النتائج على الصفحة ---
    function renderAnalysis(analysis) {
        
        ui.overallSummaryText.textContent = analysis.overall;

        // ملء نقاط القوة
        if (analysis.strengths.length > 0) {
            ui.strengthsList.innerHTML = analysis.strengths.map(item => `<li class="list-group-item border-0 px-0">${item}</li>`).join('');
        } else {
            ui.strengthsList.innerHTML = `<li class="list-group-item border-0 px-0 text-muted">${t('noStrengths')}</li>`;
        }

        // ملء نقاط الضعف
        if (analysis.weaknesses.length > 0) {
            ui.weaknessesList.innerHTML = analysis.weaknesses.map(item => `<li class="list-group-item border-0 px-0">${item}</li>`).join('');
        } else {
            ui.weaknessesList.innerHTML = `<li class="list-group-item border-0 px-0 text-success">${t('noWeaknesses')}</li>`;
        }

        // ملء الحلول
        if (analysis.solutions.length > 0) {
            ui.solutionsList.innerHTML = analysis.solutions.map(item => `<li class="list-group-item border-0 px-0">${item}</li>`).join('');
        } else {
            ui.solutionsList.innerHTML = `<li class="list-group-item border-0 px-0 text-muted">${t('noSolutions')}</li>`;
        }
        
        // إظهار المحتوى وإخفاء رسالة التحميل
        ui.loadingMessage.style.display = 'none';
        ui.summaryContent.style.display = 'block';
        ui.exportPdfBtn.disabled = false; // تفعيل زر التصدير
    }

    // --- 8. وظيفة تصدير PDF ---
    function setupPdfExport() {
        if (!ui.exportPdfBtn) return;
        ui.exportPdfBtn.addEventListener("click", () => {
            console.log("Exporting executive summary to PDF...");
            const element = document.getElementById("summary-content-exportable");
            const opt = {
                margin: 0.75,
                filename: "Executive_Summary.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, logging: false },
                jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
            };
            
            // إضافة عنوان للـ PDF
            const header = document.querySelector('header h1').textContent;
            const subheader = document.querySelector('header p').textContent;
            const headerHtml = `<div style="text-align: center; margin: 20px;">
                                    <h1>${header}</h1>
                                    <p>${subheader}</p>
                                </div>`;
            
            html2pdf().from(headerHtml + element.innerHTML).set(opt).save();
        });
    }

    // --- 9. التشغيل ---
    // (استخدام setTimeout لمنح main.js فرصة للتحميل والترجمة أولاً)
    setTimeout(() => {
        const data = loadData();
        if (data) {
            console.log("Data loaded successfully. Running Smart Analysis...");
            const analysisResults = runAnalysisEngine(data.ratios, data.statements);
            console.log("Analysis Complete:", analysisResults);
            renderAnalysis(analysisResults);
            setupPdfExport();
        }

        // تطبيق الترجمة النهائية بعد ملء كل شيء
        if (typeof window.applyTranslations === 'function') {
            console.log("Applying final translations for summary page...");
            window.applyTranslations();
        }
    }, 100); // تأخير بسيط لإعطاء فرصة للترجمات الأساسية

});
