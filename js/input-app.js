// js/input-app.js (Upgraded to include Market Data)

window.pageTranslations = {
    ar: {
        pageTitle: "إدخال ميزان المراجعة — المحلل المالي",
        pageHeader: "إدخال بيانات ميزان المراجعة",
        pageSubheader: "هذه الصفحة مخصصة للمحاسبين لإدخال البيانات الدقيقة وتصنيفها طبقًا للمعايير الدولية.",
        actionsTitle: "أدوات التحكم",
        add: "إضافة صف",
        save: "تأكيد الحفظ", 
        clear: "مسح الكل",
        saveForComparison: "حفظ نسخة للمقارنات",
        saveAsPlaceholder: "مثال: بيانات 2024",
        saveAs: "حفظ باسم",
        currencyTitle: "إعدادات العملة",
        currencyLabel: "العملة الأساسية",
        fxRateLabel: "سعر الصرف",
        tableTitle: "جدول البيانات",
        thAccount: "الحساب",
        thMainType: "التصنيف الرئيسي",
        thSubType: "التصنيف الفرعي",
        thDebit: "مدين",
        thCredit: "دائن",
        thAction: "إجراء",
        balanced: "متوازن",
        unbalanced: "غير متوازن",
        total: "الإجمالي",
        debit: "المدين",
        credit: "الدائن",
        confirmClear: "هل أنت متأكد من أنك تريد مسح جميع البيانات في الجدول؟",
        savedSuccess: "تم تأكيد الحفظ! (ملاحظة: يتم حفظ بياناتك تلقائياً عند كل تغيير)", 
        saveAsSuccess: "تم حفظ البيانات بنجاح باسم",
        saveAsError: "الرجاء إدخال اسم لحفظ مجموعة البيانات.",

        // --- File Upload Translations ---
        manualEntryTab: "إدخال يدوي",
        uploadFileTab: "رفع ملف",
        uploadFileTitle: "رفع ملف ميزان المراجعة (Excel أو CSV)",
        uploadDragDrop: "اسحب وأفلت ملفك هنا، أو اضغط للاختيار",
        uploadSupportedFiles: "الملفات المدعومة: .xlsx, .xls, .csv",
        uploadBrowseButton: "تصفح الملفات",
        uploadFileReady: "الملف جاهز للمعالجة",
        loadingPreview: "جاري تحميل المعاينة...",
        dataPreview: "معاينة أول 5 صفوف:",
        columnMappingTitle: "مطابقة الأعمدة",
        columnMappingSubtitle: "الرجاء مطابقة الأعمدة من ملفك مع الحقول المطلوبة في النظام.",
        processFileButton: "معالجة الملف وملء الجدول",
        confirmClearUpload: "سيقوم هذا بمسح أي بيانات موجودة في الجدول. هل تريد المتابعة؟",
        fileReadError: "حدث خطأ أثناء قراءة الملف. الرجاء التأكد من أنه ملف Excel أو CSV صالح.",
        fileProcessingSuccess: "تمت معالجة الملف بنجاح! تم ملء جدول الإدخال اليدوي بالبيانات.",

        // *** ADDED: Market Data Translations ***
        marketDataTitle: "بيانات السوق (اختياري)",
        marketDataSubheader: "أدخل هذه البيانات لحساب مؤشرات التقييم وربحية السهم.",
        labelMarketPrice: "سعر السهم الحالي",
        labelOutstandingShares: "عدد الأسهم القائمة",
        labelDividendsPaid: "إجمالي التوزيعات النقدية"
    },
    en: {
        pageTitle: "Trial Balance Input — Financial Analyzer",
        pageHeader: "Trial Balance Data Entry",
        pageSubheader: "This page is for accountants to enter precise data classified according to international standards.",
        // ... (all other English translations as before) ...
        
        // *** ADDED: Market Data Translations ***
        marketDataTitle: "Market Data (Optional)",
        marketDataSubheader: "Enter this data to calculate valuation ratios and EPS.",
        labelMarketPrice: "Market Price per Share",
        labelOutstandingShares: "Number of Outstanding Shares",
        labelDividendsPaid: "Total Dividends Paid"
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const config = {
        currencies: {
            EGP: { name: 'Egyptian Pound', rate: 1 },
            USD: { name: 'US Dollar', rate: 48.5 },
            EUR: { name: 'Euro', rate: 52.0 },
            SAR: { name: 'Saudi Riyal', rate: 12.9 },
            AED: { name: 'UAE Dirham', rate: 13.2 }
        },
        accountTypes: {
            ar: {
                'الأصول': { 'أصل متداول': ['النقد وما في حكمه', 'العملاء والمدينون', 'المخزون'], 'أصل غير متداول': ['أصول ثابتة (صافي)', 'استثمارات طويلة الأجل'] },
                'الخصوم': { 'خصم متداول': ['الموردون والدائنون', 'قروض قصيرة الأجل'], 'خصم غير متداول': ['قروض طويلة الأجل'] },
                'حقوق الملكية': { 'رأس المال': ['رأس المال المدفوع'], 'الأرباح المحتجزة والاحتياطيات': ['الأرباح المحتجزة'] },
                'قائمة الدخل': { 'الإيرادات': ['إيرادات النشاط الرئيسي'], 'تكلفة المبيعات': ['تكلفة البضاعة المباعة'], 'المصروفات': ['مصروفات تشغيلية', 'مصروفات فائدة', 'مصروفات ضريبية'] }
            },
            en: {
                'Assets': { 'Current Asset': ['Cash and Equivalents', 'Accounts Receivable', 'Inventory'], 'Non-current Asset': ['Property, Plant, and Equipment (Net)', 'Long-term Investments'] },
                'Liabilities': { 'Current Liability': ['Accounts Payable', 'Short-term Loans'], 'Non-current Liability': ['Long-term Loans'] },
                'Equity': { 'Capital': ['Paid-in Capital'], 'Retained Earnings & Reserves': ['Retained Earnings'] },
                'Income Statement': { 'Revenue': ['Main Revenue'], 'Cost of Goods Sold (COGS)': ['Cost of Goods Sold'], 'Expenses': ['Operating Expenses', 'Interest Expense', 'Tax Expense'] }
            }
        },
        requiredFields: ['Account', 'MainType', 'SubType', 'Debit', 'Credit']
    };
    
    const state = { 
        trialData: [],
        fileData: [],
        fileHeaders: [],
        // *** ADDED: Market Data State ***
        marketData: {
            marketPrice: 0,
            outstandingShares: 0,
            dividendsPaid: 0
        }
    };
    
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || `[${key}]`;
    const t_fields = (key) => window.pageTranslations[lang]?.[`th${key}`] || key;
    
    const UI = {
        currencySelect: document.getElementById('currencySelect'),
        fxRateInput: document.getElementById('fxRateInput'),
        tbBody: document.getElementById('tbBody'),
        validationResult: document.getElementById('validationResult'),
        addRowBtn: document.getElementById('addRowBtn'),
        saveBtn: document.getElementById('saveBtn'),
        clearBtn: document.getElementById('clearBtn'),
        saveAsNameInput: document.getElementById('saveAsName'),
        saveAsBtn: document.getElementById('saveAsBtn'),
        // *** ADDED: Market Data UI ***
        marketPrice: document.getElementById('marketPrice'),
        outstandingShares: document.getElementById('outstandingShares'),
        dividendsPaid: document.getElementById('dividendsPaid'),
        // ... (File Upload UI as before) ...
        fileDropArea: document.getElementById('fileDropArea'),
        fileUploader: document.getElementById('fileUploader'),
        browseButton: document.getElementById('browseButton'),
        fileNameDisplay: document.getElementById('fileNameDisplay'),
        filePreviewArea: document.getElementById('filePreviewArea'),
        previewSpinner: document.getElementById('previewSpinner'),
        filePreviewTable: document.getElementById('filePreviewTable'),
        columnMapper: document.getElementById('columnMapper'),
        processFileBtn: document.getElementById('processFileBtn'),
        manualTab: document.getElementById('manual-tab')
    };
    
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;

    // *** UPDATED: saveData to include marketData ***
    const saveData = () => {
        // 1. Save Trial Data
        localStorage.setItem('trialData', JSON.stringify(state.trialData));
        
        // 2. Save Market Data
        state.marketData.marketPrice = toNum(UI.marketPrice.value);
        state.marketData.outstandingShares = toNum(UI.outstandingShares.value);
        state.marketData.dividendsPaid = toNum(UI.dividendsPaid.value);
        localStorage.setItem('marketData', JSON.stringify(state.marketData));
        
        // 3. Save FX Rates
        const currentCurrency = UI.currencySelect.value;
        config.currencies[currentCurrency].rate = toNum(UI.fxRateInput.value) || 1;
        localStorage.setItem('fxRates', JSON.stringify(config.currencies));
        
        console.log("Auto-save successful! (Trial Data + Market Data)");
    };

    // *** UPDATED: loadData to include marketData ***
    const loadData = () => {
        // 1. Load Trial Data
        state.trialData = JSON.parse(localStorage.getItem('trialData') || '[]');
        if (state.trialData.length === 0) {
            state.trialData.push({ Account: '', MainType: '', SubType: '', Debit: 0, Credit: 0 });
        }
        
        // 2. Load Market Data
        state.marketData = JSON.parse(localStorage.getItem('marketData') || '{"marketPrice":0, "outstandingShares":0, "dividendsPaid":0}');
        UI.marketPrice.value = state.marketData.marketPrice || '';
        UI.outstandingShares.value = state.marketData.outstandingShares || '';
        UI.dividendsPaid.value = state.marketData.dividendsPaid || '';
        
        // 3. Load FX Rates
        const savedRates = JSON.parse(localStorage.getItem('fxRates') || '{}');
        for (const code in savedRates) {
            if (config.currencies[code]) config.currencies[code].rate = savedRates[code].rate;
        }
    };

    // *** UPDATED: handleSaveAs to include marketData ***
    const handleSaveAs = () => {
        const name = UI.saveAsNameInput.value.trim();
        if (!name) { alert(t_page('saveAsError')); return; }
        
        // Save current data (including market data) before creating snapshot
        saveData(); 
        
        // Create a combined object for the snapshot
        const snapshotData = {
            trialData: state.trialData,
            marketData: state.marketData
        };
        
        try {
            localStorage.setItem(`FA_DATASET_${name}`, JSON.stringify(snapshotData));
            alert(`${t_page('saveAsSuccess')} "${name}"!`);
            UI.saveAsNameInput.value = '';
        } catch (e) { alert("Error saving data."); }
    };

    const updateFxRate = () => {
        const currencyCode = UI.currencySelect.value;
        const currency = config.currencies[currencyCode];
        UI.fxRateInput.value = currency.rate;
        UI.fxRateInput.disabled = currencyCode === 'EGP';
    };
    
    const renderValidation = () => {
        const totals = state.trialData.reduce((acc, row) => {
            acc.debit += toNum(row.Debit);
            acc.credit += toNum(row.Credit);
            return acc;
        }, { debit: 0, credit: 0 });

        if (Math.abs(totals.debit - totals.credit) < 0.01) {
            UI.validationResult.textContent = `${t_page('balanced')} ✅ | ${t_page('total')}: ${totals.debit.toLocaleString()}`;
            UI.validationResult.className = 'text-success fw-bold';
        } else {
            UI.validationResult.textContent = `${t_page('unbalanced')} ❌ | ${t_page('debit')}: ${totals.debit.toLocaleString()} | ${t_page('credit')}: ${totals.credit.toLocaleString()}`;
            UI.validationResult.className = 'text-danger fw-bold';
        }
        saveData();
    };
    
    const renderTable = () => {
        UI.tbBody.innerHTML = '';
        const currentLangTypes = config.accountTypes[lang];
        state.trialData.forEach((row, index) => {
            const tr = document.createElement('tr');
            const mainTypesOptions = Object.keys(currentLangTypes).map(mainType => 
                `<option value="${mainType}" ${row.MainType === mainType ? 'selected' : ''}>${mainType}</option>`).join('');

            let subTypesOptions = '';
            if (row.MainType && currentLangTypes[row.MainType]) {
                subTypesOptions = Object.keys(currentLangTypes[row.MainType]).map(subType => 
                    `<option value="${subType}" ${row.SubType === subType ? 'selected' : ''}>${subType}</option>`).join('');
            }
            
            tr.innerHTML = `
                <td><input class="form-control form-control-sm" data-field="Account" value="${row.Account || ''}"></td>
                <td><select class="form-select form-select-sm" data-field="MainType"><option value="">--</option>${mainTypesOptions}</select></td>
                <td><select class="form-select form-select-sm" data-field="SubType"><option value="">--</option>${subTypesOptions}</select></td>
                <td><input type="number" step="any" class="form-control form-control-sm text-end" data-field="Debit" value="${row.Debit || 0}"></td>
                <td><input type="number" step="any" class="form-control form-control-sm text-end" data-field="Credit" value="${row.Credit || 0}"></td>
                <td><button class="btn btn-sm btn-outline-danger btn-delete"><i class="bi bi-trash"></i></button></td>`;

            tr.querySelectorAll('input, select').forEach(el => {
                const eventType = (el.tagName === 'SELECT' || el.type === 'number') ? 'change' : 'input';
                el.addEventListener(eventType, (e) => {
                    state.trialData[index][e.target.dataset.field] = e.target.type === 'number' ? toNum(e.target.value) : e.target.value;
                    if (e.target.dataset.field === "MainType") {
                        state.trialData[index]["SubType"] = "";
                        renderTable();
                    } else {
                        renderValidation();
                    }
                });
            });

            tr.querySelector('.btn-delete').addEventListener('click', () => {
                state.trialData.splice(index, 1);
                renderTable(); 
            });
            UI.tbBody.appendChild(tr);
        });
        renderValidation();
    };

    // --- File Upload Functions ---
    const guessHeader = (fieldKey, headers) => { /* ... (Function as before) ... */ };
    const renderColumnMapper = () => { /* ... (Function as before) ... */ };
    const renderPreviewTable = () => { /* ... (Function as before) ... */ };
    const handleFile = (file) => { /* ... (Function as before) ... */ };
    const resetUploadUI = () => { /* ... (Function as before) ... */ };
    const processFile = () => { /* ... (Function as before) ... */ };
    
    // ========================================================
    // *** INITIALIZATION ***
    // ========================================================

    const init = () => {
        // --- Original Init ---
        for (const code in config.currencies) {
            UI.currencySelect.add(new Option(`${config.currencies[code].name} (${code})`, code));
        }
        
        loadData(); // This now loads trialData AND marketData
        UI.currencySelect.value = localStorage.getItem('currency') || 'EGP';
        updateFxRate();
        renderTable();
        
        UI.addRowBtn.addEventListener('click', () => {
            state.trialData.push({ Account: '', MainType: '', SubType: '', Debit: 0, Credit: 0 });
            renderTable();
        });

        UI.saveBtn.addEventListener('click', () => { 
            saveData(); 
            alert(t_page('savedSuccess')); 
        });
        
        UI.clearBtn.addEventListener('click', () => {
            if (confirm(t_page('confirmClear'))) {
                state.trialData = [];
                // *** Clear market data as well ***
                state.marketData = { marketPrice: 0, outstandingShares: 0, dividendsPaid: 0 };
                localStorage.removeItem('trialData');
                localStorage.removeItem('marketData');
                loadData(); // Reloads empty state
                renderTable(); // This will auto-save the new empty state
            }
        });
        UI.saveAsBtn.addEventListener('click', handleSaveAs);
        UI.currencySelect.addEventListener('change', updateFxRate);

        UI.fxRateInput.addEventListener('change', (e) => {
            config.currencies[UI.currencySelect.value].rate = toNum(e.target.value);
            saveData(); // Auto-save
        });

        // *** ADDED: Event listeners for new Market Data inputs ***
        UI.marketPrice.addEventListener('input', () => saveData());
        UI.outstandingShares.addEventListener('input', () => saveData());
        UI.dividendsPaid.addEventListener('input', () => saveData());

        // --- NEW UPLOAD EVENT LISTENERS (as before) ---
        UI.browseButton.addEventListener('click', () => UI.fileUploader.click());
        UI.fileDropArea.addEventListener('click', () => UI.fileUploader.click()); 
        UI.processFileBtn.addEventListener('click', processFile);
        UI.fileUploader.addEventListener('change', (e) => {
             if (e.target.files.length > 0) { handleFile(e.target.files[0]); }
        });
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            UI.fileDropArea.addEventListener(eventName, (e) => { e.preventDefault(); e.stopPropagation(); }, false);
        });
        ['dragenter', 'dragover'].forEach(eventName => {
            UI.fileDropArea.addEventListener(eventName, () => {
                 UI.fileDropArea.classList.add('border-success');
                 UI.fileDropArea.classList.remove('border-primary-subtle');
            }, false);
        });
        ['dragleave', 'drop'].forEach(eventName => {
            UI.fileDropArea.addEventListener(eventName, () => {
                 UI.fileDropArea.classList.remove('border-success');
                 UI.fileDropArea.classList.add('border-primary-subtle');
            }, false);
        });
        UI.fileDropArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer; const files = dt.files;
            if (files.length > 0) { UI.fileUploader.files = files; handleFile(files[0]); }
        }, false);
    };

    init();
});
