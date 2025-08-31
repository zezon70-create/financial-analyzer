function renderOverviewChart(){
    const ctx = document.getElementById('overviewChart')?.getContext('2d');
    if(!ctx) return;
    const labels = financialData.map(d => d.account);
    const debits = financialData.map(d => d.debit);
    const credits = financialData.map(d => d.credit);
    new Chart(ctx, {
        type: 'bar',
        data: { labels, datasets: [{label:'Debit',data:debits,backgroundColor:'rgba(54,162,235,0.5)'},{label:'Credit',data:credits,backgroundColor:'rgba(255,99,132,0.5)'}] }
    });
}