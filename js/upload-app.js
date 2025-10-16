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
            theme: 'light',
            lang: 'ar'
        }
    };

    // --- 2. TRANSLATIONS ---
    const translations = {
        // ... (translations for the upload page)
    };

    // --- 3. UI ELEMENTS CACHE ---
    const UI = {
        saveAsBtnUpload: document.getElementById('saveAsBtnUpload'),
        saveAsNameInputUpload: document.getElementById('saveAsNameUpload'),
        // ... cache other elements
    };

    // --- 4. CORE LOGIC ---

    const handleSaveAs = () => {
        const name = UI.saveAsNameInputUpload.value.trim();
        if (!name) {
            alert('الرجاء إدخال اسم لحفظ مجموعة البيانات.');
            return;
        }

        const { bs, is } = state.data;
        const unifiedDataset = [];

        bs.forEach(row => unifiedDataset.push({
            Account: row.Account || '',
            Type: row.Type || 'Balance Sheet',
            Code: row.Code || '',
            Debit: row.Debit || 0,
            Credit: row.Credit || 0
        }));

        is.forEach(row => {
            const type = (row.Type || '').toLowerCase();
            const value = parseFloat(row.Value) || 0;
            if (type.includes('revenue') || type.includes('إيراد')) {
                unifiedDataset.push({ Account: row.Account, Type: row.Type, Code: row.Code, Debit: 0, Credit: value });
            } else { // Expenses
                unifiedDataset.push({ Account: row.Account, Type: row.Type, Code: row.Code, Debit: value, Credit: 0 });
            }
        });

        if (unifiedDataset.length === 0) {
            alert("لا توجد بيانات لحفظها.");
            return;
        }

        try {
            localStorage.setItem(`FA_DATASET_${name}`, JSON.stringify(unifiedDataset));
            alert(`تم حفظ البيانات الموحدة بنجاح باسم "${name}"!`);
            UI.saveAsNameInputUpload.value = '';
        } catch (e) {
            console.error("Failed to save unified dataset:", e);
            alert("حدث خطأ أثناء حفظ البيانات.");
        }
    };

    // --- 5. BIND EVENT LISTENERS ---
    const bindEventListeners = () => {
        UI.saveAsBtnUpload.addEventListener('click', handleSaveAs);
        // ... bind other event listeners
    };

    // --- 6. INITIALIZATION ---
    const init = () => {
        // ... (load data, apply translations, render tables, etc.)
        bindEventListeners();
    };

    init();
});