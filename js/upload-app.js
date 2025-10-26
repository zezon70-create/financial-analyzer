// js/upload-app.js

window.pageTranslations = {
    ar: {
        pageTitle: "رفع وإدخال القوائم — المحلل المالي",
        pageHeader: "رفع وإدخال القوائم المالية",
        pageSubheader: "هذه الصفحة مخصصة لغير المتخصصين لرفع القوائم المالية الجاهزة أو إدخالها بسهولة.",
        actionsTitle: "أدوات التحكم",
        // *** تعديل: تغيير نص الزر ليعكس الحفظ التلقائي ***
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
        // *** تعديل: رسالة التأكيد توضح الحفظ التلقائي ***
        savedSuccess: "تم تأكيد الحفظ! (ملاحظة: يتم حفظ بياناتك تلقائياً عند كل تغيير)",
        noDataToSave: "لا توجد بيانات لحفظها.",
        saveAsSuccess: "تم حفظ البيانات بنجاح باسم",
        saveAsError: "الرجاء إدخال اسم لحفظ مجموعة البيانات.",

        // *** إضافة ترجمات جديدة ***
        savePrevious: "حفظ كفترة سابقة",
        savedPreviousSuccess: "تم حفظ بيانات الفترة السابقة بنجاح!",

        manualEntryTab: "إدخال يدوي",
        uploadFileTab: "رفع ملف",
        uploadFileTitle: "رفع ملف القوائم المالية (Excel أو CSV)",
        uploadFileSubtitle: "يجب أن يحتوي الملف على عمود لـ 'البند' وعمود لـ 'القيمة'.",
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
        fileProcessingSuccess: "تمت معالجة الملف بنجاح! تم ملء الجدول المحدد بالبيانات.",
        fieldAccount: "الحساب/البند",
        fieldValue: "القيمة",
        mapToStatement: "هذه البيانات تخص أي قائمة؟"
    },
    en: {
        pageTitle: "Upload & Enter Statements — Financial Analyzer",
        pageHeader: "Upload & Enter Financial Statements",
        pageSubheader: "This page is for non-specialists to easily upload ready-made financial statements or enter them manually.",
        actionsTitle: "Controls",
        // *** MODIFIED: Button text reflects auto-save ***
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
        // *** MODIFIED: Confirmation message explains auto-save ***
        savedSuccess: "Save Confirmed! (Note: Your data auto-saves on every change)",
        noDataToSave: "No data to save.",
        saveAsSuccess: "Data saved successfully as",
        saveAsError: "Please enter a name to save the dataset.",

        // *** إضافة ترجمات جديدة ***
        savePrevious: "Save as Previous Period",
        savedPreviousSuccess: "Previous period data saved successfully!",

        manualEntryTab: "Manual Entry",
        uploadFileTab: "Upload File",
        uploadFileTitle: "Upload Financial Statements (Excel or CSV)",
        uploadFileSubtitle: "The file should have a column for 'Item' and a column for 'Value'.",
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
        mapToStatement: "Which statement does this data belong to?"
    }
};

document.addEventListener('DOMContentLoaded', () => {

    const state = { 
        data: { bs: [], is: [] },
        fileData: [],
        fileHeaders: []
    };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || key;
    const t_field = (key) => window.pageTranslations[lang]?.[`field${key}`] || key;

    const UI = {
        saveAsNameInput: document.getElementById('saveAsName'),
        saveAsBtn: document.getElementById('saveAsBtn'),
        saveBtn: document.getElementById('saveBtn'),
        clearBtn: document.getElementById('clearBtn'),
        savePreviousBtn: document.getElementById('savePreviousBtn'), // *** إضافة الزر هنا ***
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
            bs: { headers: {ar: ['الحساب', 'القيمة', 'إجراء'], en: ['Account', 'Value', 'Action']}, fields: ['Account', 'Value'] },
            is: { headers: {ar: ['البند', 'القيمة', 'إجراء'], en: ['Item', 'Value', 'Action']}, fields: ['Account', 'Value'] },
        },
        requiredFields: ['Account', 'Value']
    };

    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;

    // *** تعديل: هذه الدالة أصبحت هي المسؤولة عن الحفظ التلقائي ***
    const saveData = () => {
        // *** تصحيح: تغيير المفتاح من 'statementData' إلى 'uploadedFinancialData' ***
        localStorage.setItem('uploadedFinancialData', JSON.stringify(state.data));
        console.log("Auto-save successful!"); // For testing
    };

    const loadData = () => {
        // *** تصحيح: تغيير المفتاح من 'statementData' إلى 'uploadedFinancialData' ***
        const storedData = JSON.parse(localStorage.getItem('uploadedFinancialData') || '{}');
        const defaultRow = (fields) => fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
        for (const key in config.tables) {
            state.data[key] = storedData[key]?.length > 0 ? storedData[key] : [defaultRow(config.tables[key].fields)];
        }
    };
    
    const handleSaveAs = () => {
        const name = UI.saveAsNameInput.value.trim();
        if (!name) { alert(t_page('saveAsError')); return; }
        const unifiedDataset = [];
        state.data.bs.forEach(row => {
            unifiedDataset.push({ Account: row.Account, Debit: toNum(row.Value), Credit: 0, MainType: 'Assets', SubType: 'Current Asset' });
        });
        state.data.is.forEach(row => {
            unifiedDataset.push({ Account: row.Account, Debit: toNum(row.Value), Credit: 0, MainType: 'Income Statement', SubType: 'Revenue' });
        });
        if (unifiedDataset.length === 0) { alert(t_page('noDataToSave')); return; }
        try {
            localStorage.setItem(`FA_DATASET_${name}`, JSON.stringify(unifiedDataset));
            alert(`${t_page('saveAsSuccess')} "${name}"!`);
            UI.saveAsNameInput.value = '';
        } catch (e) { alert("Error saving data."); }
    };

    // *** إضافة دالة جديدة لحفظ الفترة السابقة ***
    const handleSavePrevious = () => {
        if (state.data.bs.length === 0 && state.data.is.length === 0) {
            alert(t_page('noDataToSave'));
            return;
        }
        try {
            // *** هذا هو المفتاح الذي يبحث عنه ملف report-app.js ***
            localStorage.setItem('uploadedFinancialDataPrevious', JSON.stringify(state.data));
            alert(t_page('savedPreviousSuccess'));
        } catch (e) {
            alert("Error saving previous period data.");
        }
    };
    // *** نهاية الإضافة ***
    
    const renderTable = (tableKey) => {
        const tableEl = document.getElementById(`${tableKey}Table`);
        const tableConfig = config.tables[tableKey];
        const tableData = state.data[tableKey];
        const headers = tableConfig.headers[lang];
        
        tableEl.innerHTML = `<thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody></tbody>`;
        const tbody = tableEl.querySelector('tbody');

        tableData.forEach((row, index) => {
            const tr = document.createElement('tr');
            let cellsHTML = '';
            tableConfig.fields.forEach(field => {
                const value = row[field] || '';
                const inputType = field === 'Value' ? 'number' : 'text';
                cellsHTML += `<td><input class="form-control form-control-sm" type="${inputType}" data-field="${field}" value="${value}"></td>`;
            });
            cellsHTML += `<td><button class="btn btn-sm btn-outline-danger btn-delete"><i class="bi bi-trash"></i></button></td>`;
            tr.innerHTML = cellsHTML;
            
            tr.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', (e) => {
                    tableData[index][e.target.dataset.field] = e.target.type === 'number' ? toNum(e.target.value) : e.target.value;
                    // *** تعديل: إضافة الحفظ التلقائي هنا ***
                    saveData(); 
                });
            });

            tr.querySelector('.btn-delete').addEventListener('click', () => {
                tableData.splice(index, 1);
                // *** تعديل: إضافة الحفظ التلقائي هنا ***
                saveData(); 
                renderTable(tableKey);
            });

            tbody.appendChild(tr);
        });
    };

    const renderAllTables = () => Object.keys(config.tables).forEach(key => renderTable(key));

    // ========================================================
    // *** FILE UPLOAD FUNCTIONS (No changes here) ***
    // ========================================================

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
                Value:    toNum(row[mapping.Value])
            };
            const finalRow = {};
            config.tables[statementKey].fields.forEach(f => finalRow[f] = newRow[f]);
            state.data[statementKey].push(finalRow);
        });

        if (state.data[statementKey].length === 0) {
             const defaultRow = (fields) => fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
             state.data[statementKey] = [defaultRow(config.tables[statementKey].fields)];
        }
        
        // *** تعديل: إضافة الحفظ التلقائي هنا ***
        saveData(); 
        renderAllTables();
        
        const manualTabTrigger = new bootstrap.Tab(UI.manualTab);
        manualTabTrigger.show();

        const specificTabTrigger = document.getElementById(`${statementKey}-tab`);
        if (specificTabTrigger) {
            const tab = new bootstrap.Tab(specificTabTrigger);
            tab.show();
        }
        resetUploadUI();
        alert(t_page('fileProcessingSuccess'));
    };
    
    // ========================================================
    // *** (END) FILE UPLOAD FUNCTIONS ***
    // ========================================================
    
    const init = () => {
        // --- Original Init ---
        // *** تعديل: زر الحفظ أصبح للتأكيد فقط ***
        UI.saveBtn.addEventListener('click', () => { 
            saveData(); // Save again just in case
            alert(t_page('savedSuccess')); 
        });
        
        UI.clearBtn.addEventListener('click', () => {
            if (confirm(t_page('confirmClear'))) {
                // *** تصحيح: تغيير المفتاح من 'statementData' إلى 'uploadedFinancialData' ***
                localStorage.removeItem('uploadedFinancialData');
                loadData();
                // *** تعديل: إضافة الحفظ التلقائي هنا ***
                saveData(); // Save the new empty state
                renderAllTables();
            }
        });

        UI.saveAsBtn.addEventListener('click', handleSaveAs);
        UI.savePreviousBtn.addEventListener('click', handleSavePrevious); // *** إضافة مستمع الحدث ***
        
        UI.tabContent.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-table]');
            if (btn) {
                const tableKey = btn.dataset.table;
                const newRow = config.tables[tableKey].fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
                state.data[tableKey].push(newRow);
                // *** تعديل: إضافة الحفظ التلقائي هنا ***
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
