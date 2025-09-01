// الحسابات الأساسية والتحليلات
const dataForm = document.getElementById('dataForm');
const resultsSection = document.getElementById('results');

dataForm?.addEventListener('submit', function(e){
    e.preventDefault();
    const revenue = Number(document.getElementById('revenue').value);
    const expenses = Number(document.getElementById('expenses').value);
    const assets = Number(document.getElementById('assets').value);
    const liabilities = Number(document.getElementById('liabilities').value);

    const profit = revenue - expenses;
    const roi = (profit / assets * 100).toFixed(2);
    const deRatio = (liabilities / assets *100).toFixed(2);

    document.getElementById('profit').textContent = "صافي الربح: "+profit;
    document.getElementById('roi').textContent = "العائد على الاستثمار: "+roi+"%";
    document.getElementById('deRatio').textContent = "نسبة الدين للأصول: "+deRatio+"%";

    resultsSection.classList.remove('hidden');

    // Sensitivity Analysis Example
    const sensitivity = {
        revenue10: (revenue*1.1 - expenses),
        revenueMinus10: (revenue*0.9 - expenses)
    };
    console.log("تحليل الحساسية:", sensitivity);

    updateDashboard({revenue, expenses, assets, liabilities, profit});
});
