let chartInstance;
function updateDashboard(data){
    const ctx = document.getElementById('dashboardChart').getContext('2d');
    if(chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx,{
        type:'bar',
        data:{
            labels:['الإيرادات','المصروفات','الأصول','الخصوم','صافي الربح'],
            datasets:[{
                label:'قيم',
                data:[data.revenue,data.expenses,data.assets,data.liabilities,data.profit],
                backgroundColor:['#004080','#cc0000','#0066cc','#ff6600','#00cc66']
            }]
        },
        options:{ responsive:true }
    });
}
