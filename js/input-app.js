// js/input-app.js

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
        }
    };

    const state = { trialData: [] };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || key;

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
    
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;

    const saveData = () => {
        localStorage.setItem('trialData', JSON.stringify(state.trialData));
        const currentCurrency = UI.currencySelect.value;
        config.currencies[currentCurrency].rate = toNum(UI.fxRateInput.value) || 1;
        localStorage.setItem('fxRates', JSON.stringify(config.currencies));
    };

    const loadData = () => {
        state.trialData = JSON.parse(localStorage.getItem('trialData') || '[]');
        if (state.trialData.length === 0) {
            state.trialData.push({ Account: '', MainType: '', SubType: '', Debit: 0, Credit: 0 });
        }
        const savedRates = JSON.parse(localStorage.getItem('fxRates') || '{}');
        for (const code in savedRates) {
            if (config.currencies[code]) config.currencies[code].rate = savedRates[code].rate;
        }
    };

    const handleSaveAs = () => {
        const name = UI.saveAsNameInput.value.trim();
        if (!name) { alert(t_page('saveAsError')); return; }
        try {
            localStorage.setItem(`FA_DATASET_${name}`, JSON.stringify(state.trialData));
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
                el.addEventListener('change', (e) => {
                    state.trialData[index][e.target.dataset.field] = e.target.type === 'number' ? toNum(e.target.value) : e.target.value;
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
        for (const code in config.currencies) {
            UI.currencySelect.add(new Option(`${config.currencies[code].name} (${code})`, code));
        }
        
        loadData();
        UI.currencySelect.value = localStorage.getItem('currency') || 'EGP';
        updateFxRate();
        renderTable();
        
        UI.addRowBtn.addEventListener('click', () => {
            state.trialData.push({ Account: '', MainType: '', SubType: '', Debit: 0, Credit: 0 });
            renderTable();
        });
        UI.saveBtn.addEventListener('click', () => { saveData(); alert(t_page('savedSuccess')); });
        UI.clearBtn.addEventListener('click', () => {
            if (confirm(t_page('confirmClear'))) {
                state.trialData = [];
                localStorage.removeItem('trialData');
                loadData();
                renderTable();
            }
        });
        UI.saveAsBtn.addEventListener('click', handleSaveAs);
        UI.currencySelect.addEventListener('change', updateFxRate);
        UI.fxRateInput.addEventListener('change', (e) => {
            config.currencies[UI.currencySelect.value].rate = toNum(e.target.value);
        });
    };

    init();
});
