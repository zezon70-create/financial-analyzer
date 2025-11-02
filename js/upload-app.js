// js/upload-app.js (MODIFIED to include Classification)

window.pageTranslations = {
    ar: {
        pageTitle: "رفع وإدخال القوائم — المحلل المالي",
        pageHeader: "رفع وإدخال القوائم المالية",
        pageSubheader: "هذه الصفحة مخصصة لغير المتخصصين لرفع القوائم المالية الجاهزة أو إدخالها بسهولة.",
        actionsTitle: "أدوات التحكم",
        save: "تأكيد الحفظ", 
        clear: "مسح الكل",
        saveForComparison: "حفظ نسخة للمقارنات",
        saveAsPlaceholder: "مثال: بيانات 2025",
        saveAs: "حفظ باسم",
        uploadTitle: "رفع ملف جاهز",
        uploadLabel: "يمكنك رفع ملف Excel أو CSV يحتوي على أي من القوائم المالية.",
        entryTitle: "إدخال البيانات اليدوي",
        tabBS: "الميزانية العمومية",
        tabIS: "قائمة الدخل",
        addBS: "إضافة بند للميزانية",
        addIS: "إضافة بند للدخل",
        confirmClear: "هل أنت متأكد من مسح جميع البيانات في كل الجداول؟",
        savedSuccess: "تم تأكيد الحفظ! (ملاحظة: يتم حفظ بياناتك تلقائياً عند كل تغيير)",
        noDataToSave: "لا توجد بيانات لحفظها.",
        saveAsSuccess: "تم حفظ البيانات بنجاح باسم",
        saveAsError: "الرجاء إدخال اسم لحفظ مجموعة البيانات.",
        savePrevious: "حفظ كفترة سابقة",
        savedPreviousSuccess: "تم حفظ بيانات الفترة السابقة بنجاح!",

        // --- تعديلات وإضافات للـ Classification ---
        thClassification: "التصنيف (مهم جداً)", // <-- إضافة جديدة
        uploadFileSubtitle: "سيقوم النظام بتحليل الأعمدة. ستحتاج لتصنيف البنود يدوياً بعد الرفع.", // <-- تعديل
        fileProcessingSuccess: "تمت معالجة الملف بنجاح! يرجى مراجعة البيانات وتصنيف البنود في جدول الإدخال اليدوي.", // <-- تعديل
        // --- نهاية الإضافات ---

        manualEntryTab: "إدخال يدوي",
        uploadFileTab: "رفع ملف",
        uploadFileTitle: "رفع ملف القوائم المالية (Excel أو CSV)",
        uploadDragDrop: "اسحب وأفلت ملفك هنا، أو اضغط للاختيار",
        uploadSupportedFiles: "الملفات المدعومة: .xlsx, .xls, .csv",
        uploadBrowseButton: "تصفح الملفات",
        uploadFileReady: "الملف جاهز للمعالجة",
        loadingPreview: "جاري تحميل المعاينة...",
        dataPreview: "معاينة أول 5 صفوف:",
        columnMappingTitle: "مطابقة الأعمدة",
        columnMappingSubtitle: "الرجاء مطابقة الأعمدة من ملفك مع الحقول المطلوبة.",
        processFileButton: "معالجة الملف وملء الجداول",
        confirmClearUpload: "سيقوم هذا بمسح البيانات في الجدول الذي ستختاره. هل تريد المتابعة؟",
        fileReadError: "حدث خطأ أثناء قراءة الملف. الرجاء التأكد من أنه ملف Excel أو CSV صالح.",
        fieldAccount: "الحساب/البند",
        fieldValue: "القيمة",
        mapToStatement: "هذه البيانات تخص أي قائمة؟",

        // --- قائمة التصنيفات المبسطة ---
        opt_select: "-- اختر التصنيف --",
        opt_cash: "النقدية وما في حكمها",
        opt_receivables: "العملاء والمدينون",
        opt_inventory: "المخزون",
        opt_otherCurrentAssets: "أصول متداولة أخرى",
        opt_fixedAssets: "أصول ثابتة (صافي)",
        opt_otherNonCurrentAssets: "أصول غير متداولة أخرى",
        opt_payables: "الموردون والدائنون",
        opt_shortTermDebt: "قروض قصيرة الأجل",
        opt_otherCurrentLiabilities: "خصوم متداولة أخرى",
        opt_longTermDebt: "قروض طويلة الأجل",
        opt_otherNonCurrentLiabilities: "خصوم غير متداولة أخرى",
        opt_equity: "حقوق الملكية",
        opt_revenue: "الإيرادات",
        opt_cogs: "تكلفة البضاعة المباعة (COGS)",
        opt_operatingExpense: "مصروفات تشغيلية (عمومية وإدارية وبيع)",
        opt_depreciation: "مصروف الإهلاك (يضاف هنا لو منفصل)",
        opt_interestExpense: "مصروفات فائدة",
        opt_taxExpense: "مصروفات ضريبية",
        opt_otherRevenue: "إيرادات أخرى",
        opt_otherExpense: "مصروفات أخرى"
        // --- نهاية قائمة التصنيفات ---
    },
    en: {
        pageTitle: "Upload & Enter Statements — Financial Analyzer",
        pageHeader: "Upload & Enter Financial Statements",
        pageSubheader: "This page is for non-specialists to easily upload ready-made financial statements or enter them manually.",
        actionsTitle: "Controls",
        save: "Confirm Save",
        clear: "Clear All",
        saveForComparison: "Save a copy for comparisons",
        saveAsPlaceholder: "e.g., Data 2025",
        saveAs: "Save As",
        uploadTitle: "Upload a File",
        uploadLabel: "You can upload an Excel or CSV file containing any of the financial statements.",
        entryTitle: "Manual Data Entry",
        tabBS: "Balance Sheet",
        tabIS: "Income Statement",
        addBS: "Add Balance Sheet Item",
        addIS: "Add Income Item",
        confirmClear: "Are you sure you want to clear all data in all tables?",
        savedSuccess: "Save Confirmed! (Note: Your data auto-saves on every change)",
        noDataToSave: "No data to save.",
        saveAsSuccess: "Data saved successfully as",
        saveAsError: "Please enter a name to save the dataset.",
        savePrevious: "Save as Previous Period",
        savedPreviousSuccess: "Previous period data saved successfully!",

        // --- Modifications & Additions for Classification ---
        thClassification: "Classification (Very Important)", // <-- New
        uploadFileSubtitle: "The system will analyze columns. You will need to manually classify items after uploading.", // <-- Modified
        fileProcessingSuccess: "File processed successfully! Please review the data and classify the items in the manual entry table.", // <-- Modified
        // --- End of Additions ---

        manualEntryTab: "Manual Entry",
        uploadFileTab: "Upload File",
        uploadFileTitle: "Upload Financial Statements (Excel or CSV)",
        uploadDragDrop: "Drag & drop your file here, or click to browse",
        uploadSupportedFiles: "Supported files: .xlsx, .xls, .csv",
        uploadBrowseButton: "Browse Files",
        uploadFileReady: "File is ready to be processed",
        loadingPreview: "Loading preview...",
        dataPreview: "Preview of first 5 rows:",
        columnMappingTitle: "Column Mapping",
        columnMappingSubtitle: "Please match the columns from your file to the required fields.",
        processFileButton: "Process File and Populate Tables",
        confirmClearUpload: "This will clear the data in the selected table. Do you want to continue?",
        fileReadError: "An error occurred reading the file. Please ensure it's a valid Excel or CSV file.",
        fileProcessingSuccess: "File processed successfully! The selected table has been populated.",
        fieldAccount: "Account/Item",
        fieldValue: "Value",
        mapToStatement: "Which statement does this data belong to?",

        // --- Simplified Classification List ---
        opt_select: "-- Select Classification --",
        opt_cash: "Cash and Equivalents",
        opt_receivables: "Accounts Receivable",
        opt_inventory: "Inventory",
        opt_otherCurrentAssets: "Other Current Assets",
        opt_fixedAssets: "Fixed Assets (Net)",
        opt_otherNonCurrentAssets: "Other Non-Current Assets",
        opt_payables: "Accounts Payable",
        opt_shortTermDebt: "Short-term Debt",
        opt_otherCurrentLiabilities: "Other Current Liabilities",
        opt_longTermDebt: "Long-term Debt",
        opt_otherNonCurrentLiabilities: "Other Non-Current Liabilities",
        opt_equity: "Equity",
        opt_revenue: "Revenue",
        opt_cogs: "Cost of Goods Sold (COGS)",
        opt_operatingExpense: "Operating Expenses (SG&A)",
        opt_depreciation: "Depreciation Expense (if separate)",
        opt_interestExpense: "Interest Expense",
        opt_taxExpense: "Tax Expense",
        opt_otherRevenue: "Other Revenue",
        opt_otherExpense: "Other Expense"
        // --- End of List ---
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // --- ▼▼▼ إضافة جديدة: تعريف التصنيفات ▼▼▼ ---
    const classificationOptions = {
        bs: [
            'opt_cash', 'opt_receivables', 'opt_inventory', 'opt_otherCurrentAssets', 
            'opt_fixedAssets', 'opt_otherNonCurrentAssets', 
            'opt_payables', 'opt_shortTermDebt', 'opt_otherCurrentLiabilities',
            'opt_longTermDebt', 'opt_otherNonCurrentLiabilities', 'opt_equity'
        ],
        is: [
            'opt_revenue', 'opt_cogs', 'opt_operatingExpense', 'opt_depreciation',
            'opt_interestExpense', 'opt_taxExpense', 'opt_otherRevenue', 'opt_otherExpense'
        ]
    };
    // --- ▲▲▲ نهاية الإضافة ▲▲▲ ---


    const state = { 
        // --- ▼▼▼ تعديل: إضافة التصنيف للـ state ▼▼▼ ---
        data: { bs: [], is: [] }, // Rows will be { Account: '', Value: 0, Classification: '' }
        // --- ▲▲▲ نهاية التعديل ▲▲▲ ---
        fileData: [],
        fileHeaders: []
    };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || key;
    const t_field = (key) => window.pageTranslations[lang]?.[`field${key}`] || key;
    const t_opt = (key) => window.pageTranslations[lang]?.[key] || key; // لترجمة التصنيفات

    const UI = {
        saveAsNameInput: document.getElementById('saveAsName'),
        saveAsBtn: document.getElementById('saveAsBtn'),
        saveBtn: document.getElementById('saveBtn'),
        clearBtn: document.getElementById('clearBtn'),
        savePreviousBtn: document.getElementById('savePreviousBtn'),
        tabContent: document.querySelector('.tab-content'),
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
    
    const config = {
        tables: {
            // --- ▼▼▼ تعديل: إضافة عمود وحقل التصنيف ▼▼▼ ---
            bs: { 
                headers: {ar: ['الحساب', 'القيمة', 'التصنيف (مهم جداً)', 'إجراء'], en: ['Account', 'Value', 'Classification (Important)', 'Action']}, 
                fields: ['Account', 'Value', 'Classification'] 
            },
            is: { 
                headers: {ar: ['البند', 'القيمة', 'التصنيف (مهم جداً)', 'إجراء'], en: ['Item', 'Value', 'Classification (Important)', 'Action']}, 
                fields: ['Account', 'Value', 'Classification'] 
            },
            // --- ▲▲▲ نهاية التعديل ▲▲▲ ---
        },
        requiredFields: ['Account', 'Value'] // الحقول المطلوبة من الملف (لسه زي ما هي)
    };

    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;

    const saveData = () => {
        localStorage.setItem('uploadedFinancialData', JSON.stringify(state.data));
        console.log("Auto-save successful!");
    };

    const loadData = () => {
        const storedData = JSON.parse(localStorage.getItem('uploadedFinancialData') || '{}');
        // --- ▼▼▼ تعديل: الدالة الافتراضية تضيف التصنيف كـ '' ▼▼▼ ---
        const defaultRow = (fields) => fields.reduce((acc, field) => ({ ...acc, [field]: (field === 'Value' ? 0 : '') }), {});
        // --- ▲▲▲ نهاية التعديل ▲▲▲ ---
        
        for (const key in config.tables) {
            state.data[key] = storedData[key]?.length > 0 ? storedData[key] : [defaultRow(config.tables[key].fields)];
            // التأكد من أن البيانات القديمة تحتوي على حقل التصنيف
            state.data[key].forEach(row => {
                if (row.Classification === undefined) {
                    row.Classification = '';
                }
            });
        }
    };
    
    const handleSaveAs = () => {
        // ... (دالة handleSaveAs تبقى كما هي، لكنها ستكون غير دقيقة) ...
        // ... (تحتاج لإعادة كتابة كاملة لتعمل صح مع التصنيفات الجديدة، لكنها خارج نطاق الطلب الحالي) ...
        alert("Save As function needs to be updated to support classifications.");
    };

    const handleSavePrevious = () => {
        if (state.data.bs.length === 0 && state.data.is.length === 0) {
            alert(t_page('noDataToSave'));
            return;
        }
        try {
            localStorage.setItem('uploadedFinancialDataPrevious', JSON.stringify(state.data));
            alert(t_page('savedPreviousSuccess'));
        } catch (e) {
            alert("Error saving previous period data.");
        }
    };
    
    // --- ▼▼▼ تعديل: renderTable لإضافة dropdown التصنيف ▼▼▼ ---
    const renderTable = (tableKey) => {
        const tableEl = document.getElementById(`${tableKey}Table`);
        const tableConfig = config.tables[tableKey];
        const tableData = state.data[tableKey];
        const headers = tableConfig.headers[lang];
        
        tableEl.innerHTML = `<thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody></tbody>`;
        const tbody = tableEl.querySelector('tbody');

        // إنشاء قايمة <option> للتصنيفات
        const optionsHTML = classificationOptions[tableKey].map(optKey => 
            `<option value="${optKey}">${t_opt(optKey)}</option>`
        ).join('');

        tableData.forEach((row, index) => {
            const tr = document.createElement('tr');
            let cellsHTML = '';
            tableConfig.fields.forEach(field => {
                const value = row[field] || (field === 'Value' ? 0 : '');
                
                if (field === 'Classification') {
                    // --- هذا هو عمود التصنيف الجديد ---
                    cellsHTML += `
                        <td>
                            <select class="form-select form-select-sm" data-field="Classification">
                                <option value="">${t_opt('opt_select')}</option>
                                ${optionsHTML}
                            </select>
                        </td>`;
                } else {
                    // --- هذه هي الأعمدة القديمة (الحساب والقيمة) ---
                    const inputType = field === 'Value' ? 'number' : 'text';
                    cellsHTML += `<td><input class="form-control form-control-sm" type="${inputType}" data-field="${field}" value="${value}"></td>`;
                }
            });
            cellsHTML += `<td><button class="btn btn-sm btn-outline-danger btn-delete"><i class="bi bi-trash"></i></button></td>`;
            tr.innerHTML = cellsHTML;
            
            // ضبط القيمة المختارة للـ dropdown
            const selectEl = tr.querySelector('select[data-field="Classification"]');
            if (selectEl) {
                selectEl.value = row.Classification || "";
            }

            tr.querySelectorAll('input, select').forEach(input => {
                // استخدام 'change' لضمان الحفظ بعد الاختيار
                input.addEventListener('change', (e) => {
                    const field = e.target.dataset.field;
                    tableData[index][field] = e.target.type === 'number' ? toNum(e.target.value) : e.target.value;
                    saveData(); 
                });
            });

            tr.querySelector('.btn-delete').addEventListener('click', () => {
                tableData.splice(index, 1);
                saveData(); 
                renderTable(tableKey);
            });

            tbody.appendChild(tr);
        });
    };
    // --- ▲▲▲ نهاية التعديل ▲▲▲ ---

    const renderAllTables = () => Object.keys(config.tables).forEach(key => renderTable(key));

    // ========================================================
    // *** FILE UPLOAD FUNCTIONS (تم تعديلها) ***
    // ========================================================

    // ... (دوال guessHeader, renderPreviewTable, handleFile, resetUploadUI تبقى كما هي) ...
    // (النسخ من الملف الأصلي)
        const guessHeader = (fieldKey, headers) => {
        const fieldName = fieldKey.toLowerCase();
        const arName = (t_field(fieldKey) || '').toLowerCase();
        
        for (const header of headers) {
            const lowerHeader = String(header || '').toLowerCase().trim();
            if (lowerHeader === fieldName || lowerHeader === arName) return header;
        }
        if (fieldName === 'account' && headers.find(h => String(h).toLowerCase().trim().includes('item'))) return headers.find(h => String(h).toLowerCase().trim().includes('item'));
        if (fieldName === 'account' && headers.find(h => String(h).toLowerCase().trim().includes('البند'))) return headers.find(h => String(h).toLowerCase().trim().includes('البند'));
        if (fieldName === 'value' && headers.find(h => String(h).toLowerCase().trim().includes('amount'))) return headers.find(h => String(h).toLowerCase().trim().includes('amount'));
        if (fieldName === 'value' && headers.find(h => String(h).toLowerCase().trim().includes('القيمة'))) return headers.find(h => String(h).toLowerCase().trim().includes('القيمة'));
        return "";
    };

    const renderColumnMapper = () => {
        let fieldsHTML = config.requiredFields.map(fieldKey => {
            const fieldName = t_field(fieldKey);
            const guessedHeader = guessHeader(fieldKey, state.fileHeaders);
            return `
            <div class="col-md-6 col-sm-12">
                <label for="map-${fieldKey}" class="form-label fw-bold">${fieldName}</label>
                <select id="map-${fieldKey}" class="form-select form-select-sm" data-field-key="${fieldKey}">
                    <option value="">-- ${lang === 'ar' ? 'تجاهل' : 'Ignore'} --</option>
                    ${state.fileHeaders.map(h => `<option value="${h}" ${h === guessedHeader ? 'selected' : ''}>${h}</option>`).join('')}
                </select>
            </div>`;
        }).join('');

        const typeSelectorHTML = `
        <div class="col-md-12 col-sm-12 mt-3 pt-3 border-top">
            <label for="map-StatementType" class="form-label fw-bold">${t_page('mapToStatement')}</label>
            <select id="map-StatementType" class="form-select form-select">
                <option value="bs">${t_page('tabBS')}</option>
                <option value="is">${t_page('tabIS')}</option>
            </select>
        </div>`;
        
        UI.columnMapper.innerHTML = fieldsHTML + typeSelectorHTML;
    };

    const renderPreviewTable = () => {
        if (state.fileData.length === 0) {
            UI.filePreviewTable.innerHTML = `<p class="text-danger">${lang === 'ar' ? 'الملف فارغ أو لا يمكن قراءته.' : 'File is empty or unreadable.'}</p>`;
            return;
        }
        const headers = state.fileHeaders;
        const rows = state.fileData.slice(0, 5);
        let table = '<table class="table table-sm table-bordered table-striped small">';
        table += `<thead class="table-light"><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>`;
        table += '<tbody>';
        rows.forEach(row => {
            table += `<tr>${headers.map(h => `<td>${row[h] || ''}</td>`).join('')}</tr>`;
        });
        table += '</tbody></table>';
        UI.filePreviewTable.innerHTML = table;
    };

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
                
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 0 }); 
                
                if (jsonData.length === 0) throw new Error("No data found in file.");

                state.fileData = jsonData;
                state.fileHeaders = Object.keys(jsonData[0]); 

                renderPreviewTable();
                renderColumnMapper();
                UI.previewSpinner.classList.add('d-none');
            } catch (err) {
                console.error(err);
                alert(t_page('fileReadError'));
                resetUploadUI();
            }
        };

        reader.onerror = () => { alert(t_page('fileReadError')); resetUploadUI(); };
        reader.readAsArrayBuffer(file);
    };

    const resetUploadUI = () => {
        UI.filePreviewArea.classList.add('d-none');
        UI.fileDropArea.classList.remove('d-none');
        UI.fileUploader.value = '';
        state.fileData = [];
        state.fileHeaders = [];
    };

    // --- ▼▼▼ تعديل: processFile ليضيف تصنيف فارغ ▼▼▼ ---
    const processFile = () => {
        if (!confirm(t_page('confirmClearUpload'))) return;

        const mapping = {};
        UI.columnMapper.querySelectorAll('select[data-field-key]').forEach(sel => {
            mapping[sel.dataset.fieldKey] = sel.value;
        });
        const statementKey = document.getElementById('map-StatementType').value;

        state.data[statementKey] = []; // Clear only the selected table

        state.fileData.forEach(row => {
            const newRow = {
                Account:  row[mapping.Account] || '',
                Value:    toNum(row[mapping.Value]),
                Classification: '' // <-- إضافة مهمة: نبدأ بتصنيف فارغ
            };
            // نتأكد من إضافة الحقول المطلوبة فقط
            const finalRow = {};
            config.tables[statementKey].fields.forEach(f => finalRow[f] = newRow[f]);
            state.data[statementKey].push(finalRow);
        });

        if (state.data[statementKey].length === 0) {
             const defaultRow = (fields) => fields.reduce((acc, field) => ({ ...acc, [field]: (field === 'Value' ? 0 : '') }), {});
             state.data[statementKey] = [defaultRow(config.tables[statementKey].fields)];
        }
        
        saveData(); 
        renderAllTables();
        
        // الانتقال لتاب الإدخال اليدوي لإجبار المستخدم على مراجعة وتصنيف البنود
        const manualTabTrigger = new bootstrap.Tab(UI.manualTab);
        manualTabTrigger.show();

        const specificTabTrigger = document.getElementById(`${statementKey}-tab`);
        if (specificTabTrigger) {
            const tab = new bootstrap.Tab(specificTabTrigger);
            tab.show();
        }
        resetUploadUI();
        alert(t_page('fileProcessingSuccess')); // الرسالة الجديدة هتطلب منه يراجع ويصنف
    };
    // --- ▲▲▲ نهاية التعديل ▲▲▲ ---
    
    // ========================================================
    // *** (END) FILE UPLOAD FUNCTIONS ***
    // ========================================================
    
    const init = () => {
        // --- Original Init ---
        UI.saveBtn.addEventListener('click', () => { 
            saveData(); 
            alert(t_page('savedSuccess')); 
        });
        
        UI.clearBtn.addEventListener('click', () => {
            if (confirm(t_page('confirmClear'))) {
                localStorage.removeItem('uploadedFinancialData');
                loadData();
                saveData(); // Save the new empty state
                renderAllTables();
            }
        });

        UI.saveAsBtn.addEventListener('click', handleSaveAs);
        UI.savePreviousBtn.addEventListener('click', handleSavePrevious); 
        
        UI.tabContent.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-table]');
            if (btn) {
                const tableKey = btn.dataset.table;
                // --- ▼▼▼ تعديل: الصف الجديد يتضمن تصنيف فارغ ▼▼▼ ---
                const newRow = config.tables[tableKey].fields.reduce((acc, field) => ({ ...acc, [field]: (field === 'Value' ? 0 : '') }), {});
                // --- ▲▲▲ نهاية التعديل ▲▲▲ ---
                state.data[tableKey].push(newRow);
                saveData(); 
                renderTable(tableKey);
            }
        });
        
        loadData();
        renderAllTables();
        
        // --- NEW UPLOAD EVENT LISTENERS ---
        if (UI.browseButton) {
            UI.browseButton.addEventListener('click', () => UI.fileUploader.click());
            UI.fileDropArea.addEventListener('click', () => UI.fileUploader.click());
            UI.processFileBtn.addEventListener('click', processFile);
            UI.fileUploader.addEventListener('change', (e) => {
                if (e.target.files.length > 0) handleFile(e.target.files[0]);
            });

            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                UI.fileDropArea.addEventListener(eventName, (e) => {
                    e.preventDefault(); e.stopPropagation();
                }, false);
            });
            ['dragenter', 'dragover'].forEach(eventName => {
                UI.fileDropArea.addEventListener(eventName, () => UI.fileDropArea.classList.add('border-success'), false);
            });
            ['dragleave', 'drop'].forEach(eventName => {
                UI.fileDropArea.addEventListener(eventName, () => UI.fileDropArea.classList.remove('border-success'), false);
            });
            UI.fileDropArea.addEventListener('drop', (e) => {
                const dt = e.dataTransfer;
                const files = dt.files;
                if (files.length > 0) {
                    UI.fileUploader.files = files;
                    handleFile(files[0]);
                }
            }, false);
        }
    };

    init();
});
