let ctx = document.getElementById('financialChart');
if(ctx){
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['الأرباح', 'النفقات', 'الأصول', 'الخصوم'],
            datasets: [{
                label: 'القيم المالية',
                data: [120000, 90000, 250000, 150000],
                backgroundColor: ['#ff7f50','#1e90ff','#32cd32','#ffa500']
            }]
        },
        options: {responsive: true}
    });
}
