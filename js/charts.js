// Dashboard Chart
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

// Compare Chart
let compareCtx = document.getElementById('compareChart');
if(compareCtx){
    new Chart(compareCtx, {
        type: 'line',
        data: {
            labels: ['2022','2023','2024'],
            datasets: [
                {label:'الأرباح', data:[100000,120000,150000], borderColor:'#1e90ff'},
                {label:'النفقات', data:[80000,90000,100000], borderColor:'#ff4500'}
            ]
        },
        options: {responsive:true}
    });
}
