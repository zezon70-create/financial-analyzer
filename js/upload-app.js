// js/upload-app.js

window.pageTranslations = {
    ar: {
        pageTitle: "رفع وإدخال القوائم — المحلل المالي",
        pageHeader: "رفع وإدخال القوائم المالية",
        pageSubheader: "هذه الصفحة مخصصة لغير المتخصصين لرفع القوائم المالية الجاهزة أو إدخالها بسهولة.",
        actionsTitle: "أدوات التحكم",
        save: "حفظ العمل",
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
        savedSuccess: "تم حفظ البيانات بنجاح!",
        noDataToSave: "لا توجد بيانات لحفظها.",
        saveAsSuccess: "تم حفظ البيانات بنجاح باسم",
        saveAsError: "الرجاء إدخال اسم لحفظ مجموعة البيانات.",
    },
    en: {
        pageTitle: "Upload & Enter Statements — Financial Analyzer",
        pageHeader: "Upload & Enter Financial Statements",
        pageSubheader: "This page is for non-specialists to easily upload ready-made financial statements or enter them manually.",
        actionsTitle: "Controls",
        save: "Save Work",
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
        savedSuccess: "Data saved successfully!",
        noDataToSave: "No data to save.",
        saveAsSuccess: "Data saved successfully as",
        saveAsError: "Please enter a name to save the dataset.",
    }
};

document.addEventListener('DOMContentLoaded', () => {

    const state = { data: { bs: [], is: [] } };
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || key;
    
    const UI = {
        saveAsNameInput: document.getElementById('saveAsName'),
        saveAsBtn: document.getElementById('saveAsBtn'),
        saveBtn: document.getElementById('saveBtn'),
        clearBtn: document.getElementById('clearBtn'),
        tabContent: document.querySelector('.tab-content'),
        fileInput: document.getElementById('fileInput'),
    };
    
    const config = {
        tables: {
            bs: { headers: {ar: ['الحساب', 'القيمة', 'إجراء'], en: ['Account', 'Value', 'Action']}, fields: ['Account', 'Value'] },
            is: { headers: {ar: ['البند', 'القيمة', 'إجراء'], en: ['Item', 'Value', 'Action']}, fields: ['Account', 'Value'] },
        }
    };

    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;

    const saveData = () => localStorage.setItem('statementData', JSON.stringify(state.data));

    const loadData = () => {
        const storedData = JSON.parse(localStorage.getItem('statementData') || '{}');
        const defaultRow = (fields) => fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
        for (const key in config.tables) {
            state.data[key] = storedData[key]?.length > 0 ? storedData[key] : [defaultRow(config.tables[key].fields)];
        }
    };
    
    const handleSaveAs = () => {
        const name = UI.saveAsNameInput.value.trim();
        if (!name) { alert(t_page('saveAsError')); return; }

        const unifiedDataset = [];
        // A simplified logic to unify data for trialData format
        // This logic needs to be robust based on how you want to interpret these simplified statements
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
                });
            });

            tr.querySelector('.btn-delete').addEventListener('click', () => {
                tableData.splice(index, 1);
                renderTable(tableKey);
            });

            tbody.appendChild(tr);
        });
    };

    const renderAllTables = () => Object.keys(config.tables).forEach(key => renderTable(key));
    
    const init = () => {
        UI.saveBtn.addEventListener('click', () => { saveData(); alert(t_page('savedSuccess')); });
        UI.clearBtn.addEventListener('click', () => {
            if (confirm(t_page('confirmClear'))) {
                localStorage.removeItem('statementData');
                loadData();
                renderAllTables();
            }
        });
        UI.saveAsBtn.addEventListener('click', handleSaveAs);
        UI.tabContent.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-table]');
            if (btn) {
                const tableKey = btn.dataset.table;
                const newRow = config.tables[tableKey].fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
                state.data[tableKey].push(newRow);
                renderTable(tableKey);
            }
        });
        
        loadData();
        renderAllTables();
    };

    init();
});
