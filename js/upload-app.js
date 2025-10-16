document.addEventListener('DOMContentLoaded', () => {

    // --- 1. STATE & CONFIGURATION ---
    const state = {
        data: {
            bs: [], // Balance Sheet
            is: [], // Income Statement
            cf: [], // Cash Flow
            eq: []  // Equity
        },
        preferences: {
            theme: localStorage.getItem('theme') || 'light',
            lang: localStorage.getItem('lang') || 'ar'
        }
    };
    
    // --- 2. CONFIG & TRANSLATIONS (Example) ---
    // (This should be expanded with all your text)
    const translations = {
        ar: {
            pageHeader: "إدخال القوائم المالية",
            pageSubheader: "هذه الصفحة مخصصة لغير المتخصصين وأصحاب الأعمال لرفع القوائم المالية الجاهزة أو إدخالها بسهولة.",
            actionsTitle: "أدوات التحكم",
            // ... more keys
        },
        en: {
            pageHeader: "Financial Statement Entry",
            pageSubheader: "This page is for non-specialists and business owners to easily upload or enter financial statements.",
            actionsTitle: "Controls",
            // ... more keys
        }
    };

    const config = {
        tables: {
            bs: { headers: {ar: ['الحساب', 'النوع', 'مدين', 'دائن', 'إجراء'], en: ['Account', 'Type', 'Debit', 'Credit', 'Action']}, fields: ['Account', 'Type', 'Debit', 'Credit'] },
            is: { headers: {ar: ['البند', 'النوع', 'القيمة', 'إجراء'], en: ['Item', 'Type', 'Value', 'Action']}, fields: ['Account', 'Type', 'Value'] },
            cf: { headers: {ar: ['البند', 'نوع التدفق', 'القيمة', 'إجراء'], en: ['Item', 'Flow Type', 'Value', 'Action']}, fields: ['Account', 'Type', 'Value'] },
            eq: { headers: {ar: ['البند', 'النوع', 'القيمة', 'إجراء'], en: ['Item', 'Type', 'Value', 'Action']}, fields: ['Account', 'Type', 'Value'] },
        }
    };

    // --- 3. UI ELEMENTS CACHE ---
    const UI = {
        themeToggle: document.getElementById('themeToggle'),
        languageSelect: document.getElementById('languageSelect'),
        saveAsNameInput: document.getElementById('saveAsName'),
        saveAsBtn: document.getElementById('saveAsBtn'),
        saveBtn: document.getElementById('saveBtn'),
        clearBtn: document.getElementById('clearBtn'),
        tabContent: document.querySelector('.tab-content'),
        fileInput: document.getElementById('fileInput'),
    };

    // --- 4. CORE LOGIC ---
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;
    const t = (key) => translations[state.preferences.lang]?.[key] || key;

    const applyTranslations = () => {
        document.querySelectorAll('[data-translate-key]').forEach(el => el.textContent = t(el.dataset.translateKey));
        document.documentElement.lang = state.preferences.lang;
        document.documentElement.dir = state.preferences.lang === 'ar' ? 'rtl' : 'ltr';
        renderAllTables(); // Re-render tables to update headers
    };

    const saveData = () => {
        localStorage.setItem('statementData', JSON.stringify(state.data));
    };

    const loadData = () => {
        const storedData = JSON.parse(localStorage.getItem('statementData') || '{}');
        const defaultRow = (fields) => fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
        
        for (const key in config.tables) {
            state.data[key] = storedData[key]?.length > 0 ? storedData[key] : [defaultRow(config.tables[key].fields)];
        }
    };

    const handleSaveAs = () => { /* ... (Same logic as before to unify and save) ... */ };
    
    // --- 5. RENDERING FUNCTIONS ---
    const renderTable = (tableKey) => {
        const tableEl = document.getElementById(`${tableKey}Table`);
        const tableConfig = config.tables[tableKey];
        const tableData = state.data[tableKey];
        const headers = tableConfig.headers[state.preferences.lang];
        
        tableEl.innerHTML = `
            <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody></tbody>
        `;
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

    const renderAllTables = () => {
        Object.keys(config.tables).forEach(key => renderTable(key));
    };

    // --- 6. EVENT LISTENERS & INITIALIZATION ---
    const init = () => {
        // Theme
        const theme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', theme);
        UI.themeToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        UI.themeToggle.addEventListener('click', () => { /* ... (Theme toggle logic) ... */ });
        
        // Language
        UI.languageSelect.innerHTML = `<option value="ar">العربية</option><option value="en">English</option>`;
        UI.languageSelect.value = state.preferences.lang;
        UI.languageSelect.addEventListener('change', (e) => {
            state.preferences.lang = e.target.value;
            localStorage.setItem('lang', state.preferences.lang);
            applyTranslations();
        });

        // Nav Link
        document.querySelectorAll('.main-nav .nav-link').forEach(link => {
            if (link.href.includes('upload.html')) link.classList.add('active');
        });

        // Page Actions
        UI.saveBtn.addEventListener('click', () => { saveData(); alert(t('saved')); });
        UI.clearBtn.addEventListener('click', () => { /* ... (Clear logic) ... */ });
        UI.saveAsBtn.addEventListener('click', handleSaveAs);
        UI.tabContent.addEventListener('click', (e) => {
            if (e.target.matches('[data-table]')) {
                const tableKey = e.target.dataset.table;
                const newRow = config.tables[tableKey].fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
                state.data[tableKey].push(newRow);
                renderTable(tableKey);
            }
        });
        
        // Initial Load
        loadData();
        applyTranslations();
    };

    init();
});
