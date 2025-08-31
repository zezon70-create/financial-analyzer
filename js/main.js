// التعامل مع اللغة
document.getElementById('languageSwitch')?.addEventListener('change', function() {
    const lang = this.value;
    localStorage.setItem('lang', lang);
    location.reload();
});

// استرجاع البيانات من LocalStorage
let financialData = JSON.parse(localStorage.getItem('financialData')) || [];

function saveData() {
    localStorage.setItem('financialData', JSON.stringify(financialData));
}

// إضافة بيانات جديدة مع التحقق من الصحة
document.getElementById('dataForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const accountName = document.getElementById('accountName').value.trim();
    const debit = parseFloat(document.getElementById('debit').value);
    const credit = parseFloat(document.getElementById('credit').value);

    if (!accountName || isNaN(debit) || isNaN(credit)) {
        alert('يرجى إدخال جميع الحقول بشكل صحيح.');
        return;
    }

    financialData.push({ accountName, debit, credit });
    saveData();
    renderTable();
});

// مسح البيانات
document.getElementById('clearData')?.addEventListener('click', function() {
    if(confirm('هل تريد مسح جميع البيانات؟')) {
        financialData = [];
        saveData();
        renderTable();
    }
});

// عرض البيانات في جدول
function renderTable() {
    const container = document.getElementById('dataTable');
    if(!container) return;
    if(financialData.length === 0) {
        container.innerHTML = '<p>لا توجد بيانات بعد.</p>';
        return;
    }
    let html = '<table><tr><th>الحساب</th><th>مدين</th><th>دائن</th></tr>';
    financialData.forEach(d => {
        html += `<tr><td>${d.accountName}</td><td>${d.debit}</td><td>${d.credit}</td></tr>`;
    });
    html += '</table>';
    container.innerHTML = html;
}

renderTable();
