document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURATION & STATE ---
    const config = {
        languages: {
            ar: 'العربية',
            en: 'English'
        },
        currencies: {
            EGP: { name: 'جنيه مصري', rate: 1 },
            USD: { name: 'دولار أمريكي', rate: 48.5 },
            EUR: { name: 'يورو', rate: 52.0 },
            SAR: { name: 'ريال سعودي', rate: 12.9 },
            AED: { name: 'درهم إماراتي', rate: 13.2 }
        },
        accountTypes: {
            // IFRS Based Classification
            ar: {
                'الأصول': {
                    'أصل متداول': ['النقد وما في حكمه', 'استثمارات قصيرة الأجل', 'العملاء والمدينون', 'المخزون', 'مصروفات مدفوعة مقدماً'],
                    'أصل غير متداول': ['أصول ثابتة (صافي)', 'استثمارات طويلة الأجل', 'أصول غير ملموسة', 'شهرة']
                },
                'الخصوم': {
                    'خصم متداول': ['الموردون والدائنون', 'قروض قصيرة الأجل', 'مستحقات ضريبية', 'إيرادات مؤجلة'],
                    'خصم غير متداول': ['قروض طويلة الأجل', 'التزامات ضريبية مؤجلة']
                },
                'حقوق الملكية': {
                    'رأس المال': ['رأس المال المدفوع', 'الأسهم', 'علاوة إصدار'],
                    'الأرباح المحتجزة والاحتياطيات': ['الأرباح المحتجزة', 'احتياطيات قانونية', 'احتياطيات أخرى']
                },
                'قائمة الدخل': {
                    'الإيرادات': ['إيرادات النشاط الرئيسي', 'إيرادات أخرى'],
                    'تكلفة المبيعات': ['تكلفة البضاعة المباعة'],
                    'المصروفات': ['مصروفات بيع وتسويق', 'مصروفات عمومية وإدارية', 'مصروفات تشغيل أخرى', 'مصروفات فائدة', 'مصروفات ضريبية']
                }
            },
            en: {
                'Assets': {
                    'Current Asset': ['Cash and Equivalents', 'Short-term Investments', 'Accounts Receivable', 'Inventory', 'Prepaid Expenses'],
                    'Non-current Asset': ['Property, Plant, and Equipment (Net)', 'Long-term Investments', 'Intangible Assets', 'Goodwill']
                },
                'Liabilities': {
                    'Current Liability': ['Accounts Payable', 'Short-term Loans', 'Taxes Payable', 'Deferred Revenue'],
                    'Non-current Liability': ['Long-term Loans', 'Deferred Tax Liabilities']
                },
                'Equity': {
                    'Capital': ['Paid-in Capital', 'Common Stock', 'Additional Paid-in Capital'],
                    'Retained Earnings & Reserves': ['Retained Earnings', 'Legal Reserves', 'Other Reserves']
                },
                'Income Statement': {
                    'Revenue': ['Main Revenue', 'Other Income'],
                    'Cost of Goods Sold (COGS)': ['Cost of Goods Sold'],
                    'Expenses': ['Selling & Marketing Expenses', 'General & Administrative Expenses', 'Other Operating Expenses', 'Interest Expense', 'Tax Expense']
                }
            }
        }
    };

    const state = {
        trialData: [],
        preferences: {
            theme: localStorage.getItem('theme') || 'light',
            lang: localStorage.getItem('lang') || 'ar',
            currency: localStorage.getItem('currency') || 'EGP',
        }
    };

    // --- 2. UI ELEMENTS CACHE ---
    const UI = {
        themeToggle: document.getElementById('themeToggle'),
        languageSelect: document.getElementById('languageSelect'),
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
    
    // --- 3. TRANSLATION SYSTEM ---
    const translations = {
        ar: { /* All Arabic keys */ },
        en: { /* All English keys */ }
    };
    const t = (key) => translations[state.preferences.lang][key] || key;

    const applyTranslations = () => {
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            el.textContent = t(el.dataset.translateKey);
        });
        document.documentElement.lang = state.preferences.lang;
        document.documentElement.dir = state.preferences.lang === 'ar' ? 'rtl' : 'ltr';
        // Re-render table to update dropdowns
        renderTable();
    };

    // --- 4. CORE LOGIC ---
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;

    const saveData = () => {
        localStorage.setItem('trialData', JSON.stringify(state.trialData));
        localStorage.setItem('currency', state.preferences.currency);
        config.currencies[state.preferences.currency].rate = toNum(UI.fxRateInput.value);
        localStorage.setItem('fxRates', JSON.stringify(config.currencies));
    };

    const loadData = () => {
        state.trialData = JSON.parse(localStorage.getItem('trialData') || '[]');
        if (state.trialData.length === 0) {
            state.trialData.push({ Account: '', MainType: '', SubType: '', Debit: 0, Credit: 0 });
        }
        const savedRates = JSON.parse(localStorage.getItem('fxRates') || '{}');
        for (const code in savedRates) {
            if (config.currencies[code]) {
                config.currencies[code].rate = savedRates[code].rate;
            }
        }
    };

    const handleSaveAs = () => { /* ... (Same as before) ... */ };
    
    const updateFxRate = () => {
        const currency = config.currencies[state.preferences.currency];
        UI.fxRateInput.value = currency.rate;
        UI.fxRateInput.disabled = state.preferences.currency === 'EGP';
    };

    // --- 5. RENDERING ---
    const renderValidation = () => { /* ... (Same as before) ... */ };

    const renderTable = () => {
        UI.tbBody.innerHTML = '';
        const currentLangTypes = config.accountTypes[state.preferences.lang];

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
                    const field = e.target.dataset.field;
                    state.trialData[index][field] = e.target.value;
                    if (field === "MainType") {
                        // Reset sub-type when main type changes and re-render the whole table
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

    // --- 6. INITIALIZATION & BINDING ---
    const init = () => {
        // Populate Language & Currency Selectors
        for (const [code, name] of Object.entries(config.languages)) {
            UI.languageSelect.add(new Option(name, code));
        }
        for (const code in config.currencies) {
            UI.currencySelect.add(new Option(`${config.currencies[code].name} (${code})`, code));
        }
        
        // Load Preferences & Data
        document.body.setAttribute('data-theme', state.preferences.theme);
        UI.languageSelect.value = state.preferences.lang;
        UI.currencySelect.value = state.preferences.currency;
        loadData();
        updateFxRate();
        
        // Initial Render
        applyTranslations(); // This will also call renderTable
        
        // Bind Events
        UI.themeToggle.addEventListener('click', () => { /* ... */ });
        UI.languageSelect.addEventListener('change', (e) => {
            state.preferences.lang = e.target.value;
            localStorage.setItem('lang', state.preferences.lang);
            applyTranslations();
        });
        UI.currencySelect.addEventListener('change', (e) => {
            state.preferences.currency = e.target.value;
            localStorage.setItem('currency', state.preferences.currency);
            updateFxRate();
        });
        UI.fxRateInput.addEventListener('change', (e) => {
            config.currencies[state.preferences.currency].rate = toNum(e.target.value);
        });

        UI.addRowBtn.addEventListener('click', () => {
            state.trialData.push({ Account: '', MainType: '', SubType: '', Debit: 0, Credit: 0 });
            renderTable();
        });

        UI.saveBtn.addEventListener('click', () => { saveData(); alert('تم الحفظ بنجاح!'); });
        UI.clearBtn.addEventListener('click', () => { /* ... */ });
        UI.saveAsBtn.addEventListener('click', handleSaveAs);
        
        document.querySelectorAll('.main-nav .nav-link').forEach(link => {
            if (link.href.includes('input.html')) link.classList.add('active');
        });
    };

    init();
});
