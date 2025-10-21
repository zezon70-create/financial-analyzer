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
        // ... (all other upload translations as before) ...

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
        currencies: { /* ... (as before) ... */ },
        accountTypes: { /* ... (as before) ... */ },
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
    const t_page = (key) => window.pageTranslations[lang]?.[key] || key;
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

    const updateFxRate = () => { /* ... (Function as before) ... */ };
    const renderValidation = () => { /* ... (Function as before, auto-save is still triggered) ... */ };
    const renderTable = () => { /* ... (Function as before) ... */ };
    
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
        UI.marketPrice.addEventListener('change', () => saveData());
        UI.outstandingShares.addEventListener('change', () => saveData());
        UI.dividendsPaid.addEventListener('change', () => saveData());

        // --- NEW UPLOAD EVENT LISTENERS (as before) ---
        UI.browseButton.addEventListener('click', () => UI.fileUploader.click());
        UI.fileDropArea.addEventListener('click', () => UI.fileUploader.click()); 
        UI.processFileBtn.addEventListener('click', processFile);
        UI.fileUploader.addEventListener('change', (e) => { /* ... (as before) ... */ });
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => { /* ... (as before) ... */ });
        ['dragenter', 'dragover'].forEach(eventName => { /* ... (as before) ... */ });
        ['dragleave', 'drop'].forEach(eventName => { /* ... (as before) ... */ });
        UI.fileDropArea.addEventListener('drop', (e) => { /* ... (as before) ... */ });
    };

    init();
});
