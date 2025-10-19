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

        // *** NEW TRANSLATIONS ***
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
        fileProcessingSuccess: "تمت معالجة الملف بنجاح! تم ملء جدول الإدخال اليدوي بالبيانات."
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
        // *** NEW TRANSLATIONS ***
        manualEntryTab: "Manual Entry",
        uploadFileTab: "Upload File",
        uploadFileTitle: "Upload Trial Balance (Excel or CSV)",
        uploadDragDrop: "Drag & drop your file here, or click to browse",
        uploadSupportedFiles: "Supported files: .xlsx, .xls, .csv",
        uploadBrowseButton: "Browse Files",
        uploadFileReady: "File is ready to be processed",
        loadingPreview: "Loading preview...",
        dataPreview: "Preview of first 5 rows:",
        columnMappingTitle: "Column Mapping",
        columnMappingSubtitle: "Please match the columns from your file to the required fields in the system.",
        processFileButton: "Process File and Populate Table",
        confirmClearUpload: "This will clear any existing data in the table. Do you want to continue?",
        fileReadError: "An error occurred reading the file. Please ensure it's a valid Excel or CSV file.",
        fileProcessingSuccess: "File processed successfully! The manual entry table has been populated."
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
        // *** NEW: Required fields for mapping ***
        requiredFields: ['Account', 'MainType', 'SubType', 'Debit', 'Credit']
    };
    const state = { 
        trialData: [],
        // *** NEW: State for file data ***
        fileData: [],
        fileHeaders: []
    };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || key;
    const t_fields = (key) => window.pageTranslations[lang]?.[`th${key}`] || key;
    const UI = {
        // Original UI Elements
        currencySelect: document.getElementById('currencySelect'),
        fxRateInput: document.getElementById('fxRateInput'),
        tbBody: document.getElementById('tbBody'),
        validationResult: document.getElementById('validationResult'),
        addRowBtn: document.getElementById('addRowBtn'),
        saveBtn: document.getElementById('saveBtn'),
        clearBtn: document.getElementById('clearBtn'),
        saveAsNameInput: document.getElementById('saveAsName'),
        saveAsBtn: document.getElementById('saveAsBtn'),

        // *** NEW: Upload UI Elements ***
        fileDropArea: document.getElementById('fileDropArea'),
        fileUploader: document.getElementById('fileUploader'),
        browseButton: document.getElementById('browseButton'),
        fileNameDisplay: document.getElementById('fileNameDisplay'),
        filePreviewArea: document.getElementById('filePreviewArea'),
        previewSpinner: document.getElementById('previewSpinner'),
        filePreviewTable: document.getElementById('filePreviewTable'),
        columnMapper: document.getElementById('columnMapper'),
        processFileBtn: document.getElementById('processFileBtn'),
        manualTab: document.getElementById('manual-tab') // To switch back
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

    // ========================================================
    // *** NEW FILE UPLOAD FUNCTIONS (START) ***
    // ========================================================

    /**
     * Tries to guess the correct header from the file
     */
    const guessHeader = (fieldKey, headers) => {
        const fieldName = fieldKey.toLowerCase();
        const arName = (t_fields(fieldKey) || '').toLowerCase();
        
        for (const header of headers) {
            const lowerHeader = String(header || '').toLowerCase().trim();
            if (lowerHeader === fieldName || lowerHeader === arName) {
                return header;
            }
        }
        // Fallback guesses
        if (fieldName === 'debit' && headers.find(h => String(h).toLowerCase().trim() === 'مدين')) return headers.find(h => String(h).toLowerCase().trim() === 'مدين');
        if (fieldName === 'credit' && headers.find(h => String(h).toLowerCase().trim() === 'دائن')) return headers.find(h => String(h).toLowerCase().trim() === 'دائن');
        if (fieldName === 'account' && headers.find(h => String(h).toLowerCase().trim() === 'الحساب')) return headers.find(h => String(h).toLowerCase().trim() === 'الحساب');

        return "";
    };

    /**
     * Renders the column mapping UI
     */
    const renderColumnMapper = () => {
        const optionsHTML = state.fileHeaders.map(h => `<option value="${h}">${h}</option>`).join('');
        
        UI.columnMapper.innerHTML = config.requiredFields.map(fieldKey => {
            const guessedHeader = guessHeader(fieldKey, state.fileHeaders);
            return `
            <div class="col-md-4 col-sm-6">
                <label for="map-${fieldKey}" class="form-label fw-bold">${t_fields(fieldKey)}</label>
                <select id="map-${fieldKey}" class="form-select form-select-sm" data-field-key="${fieldKey}">
                    <option value="">-- ${lang === 'ar' ? 'تجاهل' : 'Ignore'} --</option>
                    ${state.fileHeaders.map(h => `<option value="${h}" ${h === guessedHeader ? 'selected' : ''}>${h}</option>`).join('')}
                </select>
            </div>`;
        }).join('');
    };

    /**
     * Renders a preview table of the first 5 rows
     */
    const renderPreviewTable = () => {
        if (state.fileData.length === 0) {
            UI.filePreviewTable.innerHTML = `<p class="text-danger">${lang === 'ar' ? 'الملف فارغ أو لا يمكن قراءته.' : 'File is empty or unreadable.'}</p>`;
            return;
        }

        const headers = state.fileHeaders;
        const rows = state.fileData.slice(0, 5); // Get first 5 data rows

        let table = '<table class="table table-sm table-bordered table-striped small">';
        // Headers
        table += '<thead class="table-light">';
        table += `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
        table += '</thead>';
        // Body
        table += '<tbody>';
        rows.forEach(row => {
            table += `<tr>${headers.map(h => `<td>${row[h] || ''}</td>`).join('')}</tr>`;
        });
        table += '</tbody>';
        table += '</table>';
        
        UI.filePreviewTable.innerHTML = table;
    };

    /**
     * Main function to handle the file once selected or dropped
     */
    const handleFile = (file) => {
        if (!file) return;

        UI.fileNameDisplay.textContent = `File: ${file.name} | Size: ${(file.size / 1024).toFixed(2)} KB`;
        UI.filePreviewArea.classList.remove('d-none');
        UI.fileDropArea.classList.add('d-none');
        UI.previewSpinner.classList.remove('d-none');
        UI.filePreviewTable.innerHTML = '';
        UI.columnMapper.innerHTML = '';

        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                
                // Convert to array of objects
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 0 }); // header: 0 creates objects
                
                if (jsonData.length === 0) {
                    throw new Error("No data found in file.");
                }

                state.fileData = jsonData;
                state.fileHeaders = Object.keys(jsonData[0]); // Get headers from the first object

                renderPreviewTable();
                renderColumnMapper();
                UI.previewSpinner.classList.add('d-none');
            } catch (err) {
                console.error(err);
                alert(t_page('fileReadError'));
                resetUploadUI();
            }
        };

        reader.onerror = () => {
            alert(t_page('fileReadError'));
            resetUploadUI();
        };

        reader.readAsArrayBuffer(file);
    };

    /**
     * Resets the upload UI to its initial state
     */
    const resetUploadUI = () => {
        UI.filePreviewArea.classList.add('d-none');
        UI.fileDropArea.classList.remove('d-none');
        UI.fileUploader.value = ''; // Clear the file input
        state.fileData = [];
        state.fileHeaders = [];
    };

    /**
     * Processes the file data based on user's column mapping
     */
    const processFile = () => {
        if (!confirm(t_page('confirmClearUpload'))) {
            return;
        }

        const mapping = {};
        UI.columnMapper.querySelectorAll('select').forEach(sel => {
            mapping[sel.dataset.fieldKey] = sel.value; // e.g., mapping['Account'] = 'اسم الحساب'
        });

        // Clear existing data
        state.trialData = [];

        // Loop through file data and populate state.trialData
        state.fileData.forEach(row => {
            const newRow = {
                Account:  row[mapping.Account] || '',
                MainType: row[mapping.MainType] || '',
                SubType:  row[mapping.SubType] || '',
                Debit:    toNum(row[mapping.Debit]),
                Credit:   toNum(row[mapping.Credit])
            };
            state.trialData.push(newRow);
        });

        // If trialData is empty after processing, add a blank row
        if (state.trialData.length === 0) {
            state.trialData.push({ Account: '', MainType: '', SubType: '', Debit: 0, Credit: 0 });
        }

        // CRITICAL: Render the main table with the new data
        renderTable();
        
        // Switch user back to the manual tab to see the result
        // Use Bootstrap's built-in Tab API
        const manualTabTrigger = new bootstrap.Tab(UI.manualTab);
        manualTabTrigger.show();

        // Reset the upload UI
        resetUploadUI();

        alert(t_page('fileProcessingSuccess'));
    };

    // ========================================================
    // *** NEW FILE UPLOAD FUNCTIONS (END) ***
    // ========================================================


    const init = () => {
        // --- Original Init ---
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

        // ========================================================
        // *** NEW UPLOAD EVENT LISTENERS ***
        // ========================================================
        
        // --- Button Clicks ---
        UI.browseButton.addEventListener('click', () => UI.fileUploader.click());
        UI.fileDropArea.addEventListener('click', () => UI.fileUploader.click()); // Make whole area clickable
        UI.processFileBtn.addEventListener('click', processFile);

        // --- File Input Change ---
        UI.fileUploader.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFile(e.target.files[0]);
            }
        });

        // --- Drag and Drop Events ---
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            UI.fileDropArea.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, false);
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
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length > 0) {
                UI.fileUploader.files = files; // Assign to hidden input
                handleFile(files[0]);
            }
        }, false);
    };

    init();
});

