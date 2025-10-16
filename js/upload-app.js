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
            theme: localStorage.getItem('theme') || 'light'
        }
    };
    
    const config = {
        tables: {
            bs: { headers: ['الحساب', 'النوع', 'مدين', 'دائن', 'إجراء'], fields: ['Account', 'Type', 'Debit', 'Credit'] },
            is: { headers: ['البند', 'النوع', 'القيمة', 'إجراء'], fields: ['Account', 'Type', 'Value'] },
            cf: { headers: ['البند', 'نوع التدفق', 'القيمة', 'إجراء'], fields: ['Account', 'Type', 'Value'] },
            eq: { headers: ['البند', 'النوع', 'القيمة', 'إجراء'], fields: ['Account', 'Type', 'Value'] },
        }
    };

    // --- 2. UI ELEMENTS CACHE ---
    const UI = {
        themeToggle: document.getElementById('themeToggle'),
        saveAsNameInput: document.getElementById('saveAsName'),
        saveAsBtn: document.getElementById('saveAsBtn'),
        saveBtn: document.getElementById('saveBtn'),
        clearBtn: document.getElementById('clearBtn'),
        tabContent: document.querySelector('.tab-content'),
    };

    // --- 3. CORE LOGIC ---
    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;

    const saveData = () => {
        localStorage.setItem('statementData', JSON.stringify(state.data));
    };

    const loadData = () => {
        const storedData = JSON.parse(localStorage.getItem('statementData') || '{}');
        state.data.bs = storedData.bs || [{ Account: '', Type: '', Debit: 0, Credit: 0 }];
        state.data.is = storedData.is || [{ Account: '', Type: '', Value: 0 }];
        state.data.cf = storedData.cf || [{ Account: '', Type: '', Value: 0 }];
        state.data.eq = storedData.eq || [{ Account: '', Type: '', Value: 0 }];
    };

    const handleSaveAs = () => {
        const name = UI.saveAsNameInput.value.trim();
        if (!name) {
            alert('الرجاء إدخال اسم لحفظ مجموعة البيانات.');
            return;
        }
        const { bs, is } = state.data;
        const unifiedDataset = [];
        bs.forEach(row => unifiedDataset.push({ Account: row.Account, Type: row.Type, Debit: row.Debit, Credit: row.Credit }));
        is.forEach(row => {
            const type = (row.Type || '').toLowerCase();
            const value = toNum(row.Value);
            if (type.includes('revenue') || type.includes('إيراد')) {
                unifiedDataset.push({ Account: row.Account, Type: row.Type, Debit: 0, Credit: value });
            } else {
                unifiedDataset.push({ Account: row.Account, Type: row.Type, Debit: value, Credit: 0 });
            }
        });
        if (unifiedDataset.length === 0) {
            alert("لا توجد بيانات لحفظها.");
            return;
        }
        try {
            localStorage.setItem(`FA_DATASET_${name}`, JSON.stringify(unifiedDataset));
            alert(`تم حفظ البيانات الموحدة بنجاح باسم "${name}"!`);
            UI.saveAsNameInput.value = '';
        } catch (e) {
            alert("حدث خطأ أثناء حفظ البيانات.");
        }
    };
    
    // --- 4. RENDERING FUNCTIONS ---
    const renderTable = (tableKey) => {
        const tableEl = document.getElementById(`${tableKey}Table`);
        const tableConfig = config.tables[tableKey];
        const tableData = state.data[tableKey];
        
        tableEl.innerHTML = `
            <thead><tr>${tableConfig.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
            <tbody></tbody>
        `;
        const tbody = tableEl.querySelector('tbody');

        tableData.forEach((row, index) => {
            const tr = document.createElement('tr');
            let cellsHTML = '';
            tableConfig.fields.forEach(field => {
                const value = row[field] || (field === 'Debit' || field === 'Credit' || field === 'Value' ? 0 : '');
                const inputType = (field === 'Debit' || field === 'Credit' || field === 'Value') ? 'number' : 'text';
                cellsHTML += `<td><input class="form-control form-control-sm" type="${inputType}" data-field="${field}" value="${value}"></td>`;
            });
            cellsHTML += `<td><button class="btn btn-sm btn-outline-danger btn-delete"><i class="bi bi-trash"></i></button></td>`;
            tr.innerHTML = cellsHTML;
            
            tr.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', (e) => {
                    const field = e.target.dataset.field;
                    tableData[index][field] = e.target.type === 'number' ? toNum(e.target.value) : e.target.value;
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

    // --- 5. EVENT LISTENERS & INITIALIZATION ---

    // Theme Switcher
    UI.themeToggle.addEventListener('click', () => {
        let newTheme = document.body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        UI.themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    });

    // Active Navigation Link
    document.querySelectorAll('.main-nav .nav-link').forEach(link => {
        if (link.href.includes('upload.html')) link.classList.add('active');
        else link.classList.remove('active');
    });
    
    // Page-specific Actions
    UI.saveBtn.addEventListener('click', () => {
        saveData();
        alert('تم حفظ البيانات بنجاح!');
    });

    UI.clearBtn.addEventListener('click', () => {
        if (confirm('هل أنت متأكد من مسح جميع البيانات في كل الجداول؟')) {
            loadData(); // This will reset to default empty rows
            renderAllTables();
        }
    });
    
    UI.saveAsBtn.addEventListener('click', handleSaveAs);

    UI.tabContent.addEventListener('click', (e) => {
        if (e.target.matches('[data-table]')) {
            const tableKey = e.target.dataset.table;
            const newRow = config.tables[tableKey].fields.reduce((acc, field) => {
                acc[field] = (field === 'Debit' || field === 'Credit' || field === 'Value') ? 0 : '';
                return acc;
            }, {});
            state.data[tableKey].push(newRow);
            renderTable(tableKey);
        }
    });

    // Initial Load
    const init = () => {
        const theme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', theme);
        UI.themeToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        
        loadData();
        renderAllTables();
    };

    init();
});