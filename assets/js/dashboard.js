document.addEventListener('DOMContentLoaded',()=>{
    const accounts = JSON.parse(localStorage.getItem('accounts')||'[]');
    const statements = generateFinancialStatements(accounts);

    // Revenue Chart
    const ctx1 = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctx1,{type:'bar',data:{
        labels:['Revenue','Expenses','Net Profit'],
        datasets:[{label:'Amount',data:[statements.incomeStatement.revenue,statements.incomeStatement.expenses,statements.incomeStatement.netProfit],backgroundColor:['#28a745','#dc3545','#007BFF']}]}});

    // Cash Flow Chart example
    const ctx2 = document.getElementById('cashFlowChart').getContext('2d');
    new Chart(ctx2,{type:'line',data:{
        labels:['Month1','Month2','Month3','Month4'],
        datasets:[{label:'Net Profit Trend',data:[10,20,15,25],borderColor:'#007BFF',fill:false}]}});

    // Ratio Chart placeholder
    const ctx3 = document.getElementById('ratioChart').getContext('2d');
    new Chart(ctx3,{type:'radar',data:{
        labels:['Liquidity','Profitability','Efficiency','Debt'],
        datasets:[{label:'Ratios',data:[0.8,0.6,0.7,0.5],backgroundColor:'rgba(0,123,255,0.2)',borderColor:'#007BFF'}]}});

    // Trend Chart placeholder
    const ctx4 = document.getElementById('trendChart').getContext('2d');
    new Chart(ctx4,{type:'line',data:{
        labels:['Q1','Q2','Q3','Q4'],
        datasets:[{label:'Revenue Trend',data:[100,150,130,180],borderColor:'#28a745',fill:false}]}});

});
