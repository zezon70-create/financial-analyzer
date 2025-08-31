function renderFinancialChart(){
    let ctx = document.getElementById('financialChart');
    if(!ctx) return;
    new Chart(ctx, {
        type:'bar',
        data: {
            labels:data.map(d=>d.account),
            datasets:[
                {label:'مدين', data:data.map(d=>d.debit), backgroundColor:'#1f77b4'},
                {label:'دائن', data:data.map(d=>d.credit), backgroundColor:'#ff7f0e'}
            ]
        }
    });
}
window.onload = renderFinancialChart;
