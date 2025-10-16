// js/input-app.js

// Page-specific translations
window.pageTranslations = {
    ar: {
        pageTitle: "إدخال ميزان المراجعة — المحلل المالي",
        pageHeader: "إدخال بيانات ميزان المراجعة",
        pageSubheader: "هذه الصفحة مخصصة للمحاسبين لإدخال البيانات الدقيقة وتصنيفها طبقًا للمعايير الدولية.",
        actionsTitle: "أدوات التحكم",
        add: "إضافة صف",
        save: "حفظ العمل",
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
        savedSuccess: "تم حفظ البيانات الحالية بنجاح!",
        saveAsSuccess: "تم حفظ البيانات بنجاح باسم",
        saveAsError: "الرجاء إدخال اسم لحفظ مجموعة البيانات.",
    },
    en: {
        pageTitle: "Trial Balance Input — Financial Analyzer",
        pageHeader: "Trial Balance Data Entry",
        pageSubheader: "This page is for accountants to enter precise data classified according to international standards.",
        actionsTitle: "Controls",
        add: "Add Row",
        save: "Save Work",
        clear: "Clear All",
        saveForComparison: "Save a copy for comparisons",
        saveAsPlaceholder: "e.g., Data 2024",
        saveAs: "Save As",
        currencyTitle: "Currency Settings",
        currencyLabel: "Base Currency",
        fxRateLabel: "Exchange Rate",
        tableTitle: "Data Table",
        thAccount: "Account",
        thMainType: "Main Classification",
        thSubType: "Sub Classification",
        thDebit: "Debit",
        thCredit: "Credit",
        thAction: "Action",
        balanced: "Balanced",
        unbalanced: "Unbalanced",
        total: "Total",
        debit: "Debit",
        credit: "Credit",
        confirmClear: "Are you sure you want to clear all data in the table?",
        savedSuccess: "Current data saved successfully!",
        saveAsSuccess: "Data saved successfully as",
        saveAsError: "Please enter a name to save the dataset.",
    }
};

document.addEventListener('DOMContentLoaded', () => {

    const state = {
        trialData: [],
    };
    
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
    };

    const config = { /* ... (IFRS classifications from previous turn) ... */ };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || key;
    
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;

    const saveData = () => { /* ... */ };
    const loadData = () => { /* ... */ };
    const handleSaveAs = () => { /* ... */ };
    
    const updateFxRate = () => { /* ... */ };

    const renderValidation = () => {
        const totalDebit = state.trialData.reduce((sum, row) => sum + toNum(row.Debit), 0);
        const totalCredit = state.trialData.reduce((sum, row) => sum + toNum(row.Credit), 0);
        
        if (Math.abs(totalDebit - totalCredit) < 0.01) {
            UI.validationResult.textContent = `${t_page('balanced')} ✅ | ${t_page('total')}: ${totalDebit.toLocaleString()}`;
            UI.validationResult.className = 'text-success fw-bold';
        } else {
            UI.validationResult.textContent = `${t_page('unbalanced')} ❌ | ${t_page('debit')}: ${totalDebit.toLocaleString()} | ${t_page('credit')}: ${totalCredit.toLocaleString()}`;
            UI.validationResult.className = 'text-danger fw-bold';
        }
    };
    
    const renderTable = () => {
        UI.tbBody.innerHTML = '';
        const currentLangTypes = config.accountTypes[lang];

        state.trialData.forEach((row, index) => {
            const tr = document.createElement('tr');
            
            const mainTypesOptions = Object.keys(currentLangTypes).map(mainType => 
                `<option value="${mainType}" ${row.MainType === mainType ? 'selected' : ''}>${mainType}</option>`
            ).join('');

            let subTypesOptions = '';
            if (row.MainType && currentLangTypes[row.MainType]) {
                subTypesOptions = Object.keys(currentLangTypes[row.MainType]).map(subType => 
                    `<option value="${subType}" ${row.SubType === subType ? 'selected' : ''}>${subType}</option>`
                ).join('');
            }
            
            tr.innerHTML = `
                <td><input class="form-control form-control-sm" data-field="Account" value="${row.Account || ''}"></td>
                <td><select class="form-select form-select-sm" data-field="MainType"><option value="">--</option>${mainTypesOptions}</select></td>
                <td><select class="form-select form-select-sm" data-field="SubType"><option value="">--</option>${subTypesOptions}</select></td>
                <td><input type="number" class="form-control form-control-sm text-end" data-field="Debit" value="${row.Debit || 0}"></td>
                <td><input type="number" class="form-control form-control-sm text-end" data-field="Credit" value="${row.Credit || 0}"></td>
                <td><button class="btn btn-sm btn-outline-danger btn-delete"><i class="bi bi-trash"></i></button></td>
            `;

            tr.querySelectorAll('input, select').forEach(el => {
                el.addEventListener('change', (e) => {
                    state.trialData[index][e.target.dataset.field] = e.target.value;
                    if (e.target.dataset.field === "MainType") {
                        state.trialData[index]["SubType"] = "";
                        renderTable();
                    }
                    renderValidation();
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

    const init = () => {
        // ... (The rest of the JS code from the previous turn)
        // Ensure all bindings and initial loads are here
        // The global `main.js` will handle the initial theme and language application
    };

    init();
});
