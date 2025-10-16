// js/upload-app.js

// Page-specific translations
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
        tabCF: "التدفقات النقدية",
        tabEQ: "حقوق الملكية",
        addBS: "إضافة بند للميزانية",
        addIS: "إضافة بند للدخل",
        addCF: "إضافة بند للتدفقات",
        addEQ: "إضافة بند لحقوق الملكية",
        confirmClear: "هل أنت متأكد من مسح جميع البيانات في كل الجداول؟",
        savedSuccess: "تم حفظ البيانات بنجاح!",
        noDataToSave: "لا توجد بيانات لحفظها.",
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
        tabCF: "Cash Flow",
        tabEQ: "Equity",
        addBS: "Add Balance Sheet Item",
        addIS: "Add Income Item",
        addCF: "Add Cash Flow Item",
        addEQ: "Add Equity Item",
        confirmClear: "Are you sure you want to clear all data in all tables?",
        savedSuccess: "Data saved successfully!",
        noDataToSave: "No data to save.",
    }
};

document.addEventListener('DOMContentLoaded', () => {

    const state = {
        data: { bs: [], is: [], cf: [], eq: [] },
    };

    const UI = {
        saveAsNameInput: document.getElementById('saveAsName'),
        saveAsBtn: document.getElementById('saveAsBtn'),
        saveBtn: document.getElementById('saveBtn'),
        clearBtn: document.getElementById('clearBtn'),
        tabContent: document.querySelector('.tab-content'),
        fileInput: document.getElementById('fileInput'),
    };
    
    const lang = localStorage.getItem('lang') || 'ar';
    const t_page = (key) => window.pageTranslations[lang]?.[key] || key;

    const config = {
        tables: {
            bs: { headers: {ar: ['الحساب', 'النوع', 'مدين', 'دائن', 'إجراء'], en: ['Account', 'Type', 'Debit', 'Credit', 'Action']}, fields: ['Account', 'Type', 'Debit', 'Credit'] },
            is: { headers: {ar: ['البند', 'النوع', 'القيمة', 'إجراء'], en: ['Item', 'Type', 'Value', 'Action']}, fields: ['Account', 'Type', 'Value'] },
            cf: { headers: {ar: ['البند', 'نوع التدفق', 'القيمة', 'إجراء'], en: ['Item', 'Flow Type', 'Value', 'Action']}, fields: ['Account', 'Type', 'Value'] },
            eq: { headers: {ar: ['البند', 'النوع', 'القيمة', 'إجراء'], en: ['Item', 'Type', 'Value', 'Action']}, fields: ['Account', 'Type', 'Value'] },
        }
    };

    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;

    const saveData = () => localStorage.setItem('statementData', JSON.stringify(state.data));
    const loadData = () => {
        const storedData = JSON.parse(localStorage.getItem('statementData') || '{}');
        const defaultRow = (fields) => fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
        for (const key in config.tables) {
            state.data[key] = storedData[key]?.length ? storedData[key] : [defaultRow(config.tables[key].fields)];
        }
    };

    const handleSaveAs = () => {
        const name = UI.saveAsNameInput.value.trim();
        if (!name) { alert(t_page('saveAsError')); return; }
        const { bs, is } = state.data;
        const unifiedDataset = [];

        bs.forEach(row => unifiedDataset.push({ Account: row.Account || '', Type: row.Type || 'Balance Sheet', Debit: toNum(row.Debit), Credit: toNum(row.Credit) }));
        is.forEach(row => {
            const type = (row.Type || '').toLowerCase();
            const value = toNum(row.Value);
            if (type.includes('revenue') || type.includes('إيراد')) {
                unifiedDataset.push({ Account: row.Account, Type: row.Type, Debit: 0, Credit: value });
            } else {
                unifiedDataset.push({ Account: row.Account, Type: row.Type, Debit: value, Credit: 0 });
            }
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
                const inputType = (field === 'Debit' || field === 'Credit' || field === 'Value') ? 'number' : 'text';
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
                for (const key in config.tables) localStorage.removeItem(`statementData_${key}`);
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
