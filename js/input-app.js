document.addEventListener('DOMContentLoaded', () => {

    // --- 1. STATE & CONFIGURATION ---
    const state = {
        trialData: [],
        preferences: {
            theme: localStorage.getItem('theme') || 'light',
            lang: 'ar' // Default language
        }
    };

    // --- 2. UI ELEMENTS CACHE ---
    const UI = {
        themeToggle: document.getElementById('themeToggle'),
        tbBody: document.getElementById('tbBody'),
        validationResult: document.getElementById('validationResult'),
        addRowBtn: document.getElementById('addRowBtn'),
        saveBtn: document.getElementById('saveBtn'),
        clearBtn: document.getElementById('clearBtn'),
        fileInput: document.getElementById('fileInput'),
        saveAsNameInput: document.getElementById('saveAsName'),
        saveAsBtn: document.getElementById('saveAsBtn'),
    };

    // --- 3. CORE LOGIC ---

    const toNum = (value) => parseFloat(String(value || '').replace(/,/g, '')) || 0;

    const saveDataToLocalStorage = () => {
        localStorage.setItem('trialData', JSON.stringify(state.trialData));
    };

    const loadDataFromLocalStorage = () => {
        state.trialData = JSON.parse(localStorage.getItem('trialData') || '[]');
        if (state.trialData.length === 0) {
            // Add one empty row for new users
            state.trialData.push({ Account: '', Type: '', Code: '', Debit: 0, Credit: 0 });
        }
    };
    
    const handleSaveAs = () => {
        const name = UI.saveAsNameInput.value.trim();
        if (!name) {
            alert('الرجاء إدخال اسم لحفظ مجموعة البيانات (مثال: بيانات 2024).');
            return;
        }
        try {
            localStorage.setItem(`FA_DATASET_${name}`, JSON.stringify(state.trialData));
            alert(`تم حفظ البيانات بنجاح باسم "${name}"!`);
            UI.saveAsNameInput.value = '';
        } catch (e) {
            console.error("Failed to save dataset:", e);
            alert("حدث خطأ أثناء حفظ البيانات.");
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            let parsedData;
            if (file.name.endsWith('.csv')) {
                parsedData = Papa.parse(data, { header: true, skipEmptyLines: true }).data;
            } else {
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                parsedData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            }
            
            state.trialData = parsedData.map(row => ({
                Account: row.Account || row['الحساب'] || '',
                Type: row.Type || row['النوع'] || '',
                Code: row.Code || row['الكود'] || '',
                Debit: toNum(row.Debit) || toNum(row['مدين']) || 0,
                Credit: toNum(row.Credit) || toNum(row['دائن']) || 0,
            }));

            renderTable();
            saveDataToLocalStorage();
        };

        if (file.name.endsWith('.csv')) {
            reader.readAsText(file);
        } else {
            reader.readAsBinaryString(file);
        }
    };

    // --- 4. RENDERING FUNCTIONS ---
    
    const renderValidation = () => {
        const totalDebit = state.trialData.reduce((sum, row) => sum + toNum(row.Debit), 0);
        const totalCredit = state.trialData.reduce((sum, row) => sum + toNum(row.Credit), 0);
        
        if (Math.abs(totalDebit - totalCredit) < 0.01) {
            UI.validationResult.textContent = `متوازن ✅ | الإجمالي: ${totalDebit.toLocaleString()}`;
            UI.validationResult.className = 'text-success fw-bold';
        } else {
            UI.validationResult.textContent = `غير متوازن ❌ | المدين: ${totalDebit.toLocaleString()} | الدائن: ${totalCredit.toLocaleString()}`;
            UI.validationResult.className = 'text-danger fw-bold';
        }
    };

    const renderTable = () => {
        UI.tbBody.innerHTML = '';
        state.trialData.forEach((row, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><input class="form-control form-control-sm" data-field="Account" value="${row.Account || ''}"></td>
                <td><input class="form-control form-control-sm" data-field="Type" value="${row.Type || ''}"></td>
                <td><input class="form-control form-control-sm" data-field="Code" value="${row.Code || ''}"></td>
                <td><input type="number" class="form-control form-control-sm text-end" data-field="Debit" value="${row.Debit || 0}"></td>
                <td><input type="number" class="form-control form-control-sm text-end" data-field="Credit" value="${row.Credit || 0}"></td>
                <td><button class="btn btn-sm btn-outline-danger btn-delete"><i class="bi bi-trash"></i></button></td>
            `;
            
            // Add event listeners for inputs in this row
            tr.querySelectorAll('input').forEach(input => {
                input.addEventListener('input', (e) => {
                    const field = e.target.dataset.field;
                    state.trialData[index][field] = e.target.type === 'number' ? toNum(e.target.value) : e.target.value;
                    renderValidation();
                });
            });

            // Add event listener for delete button
            tr.querySelector('.btn-delete').addEventListener('click', () => {
                state.trialData.splice(index, 1);
                renderTable(); // Re-render the whole table
            });

            UI.tbBody.appendChild(tr);
        });
        renderValidation();
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
        if (link.href.includes('input.html')) link.classList.add('active');
        else link.classList.remove('active');
    });

    // Page-specific Actions
    UI.addRowBtn.addEventListener('click', () => {
        state.trialData.push({ Account: '', Type: '', Code: '', Debit: 0, Credit: 0 });
        renderTable();
    });

    UI.saveBtn.addEventListener('click', () => {
        saveDataToLocalStorage();
        alert('تم حفظ البيانات الحالية بنجاح!');
    });
    
    UI.clearBtn.addEventListener('click', () => {
        if (confirm('هل أنت متأكد من أنك تريد مسح جميع البيانات في الجدول؟')) {
            state.trialData = [{ Account: '', Type: '', Code: '', Debit: 0, Credit: 0 }];
            renderTable();
        }
    });

    UI.saveAsBtn.addEventListener('click', handleSaveAs);
    UI.fileInput.addEventListener('change', handleFileUpload);
    
    // Initial Load
    const init = () => {
        const theme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', theme);
        UI.themeToggle.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        
        loadDataFromLocalStorage();
        renderTable();
    };

    init();
});