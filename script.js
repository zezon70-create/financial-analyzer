let financialData = [];
let lineChart, pieChart, barChart;

function toggleMode() {
    document.body.classList.toggle("dark-mode");
}

function addData() {
    const year = parseInt(document.getElementById('year').value);
    const totalAssets = parseFloat(document.getElementById('totalAssets').value);
    const totalLiabilities = parseFloat(document.getElementById('totalLiabilities').value);
    const equity = parseFloat(document.getElementById('equity').value);
    const revenue = parseFloat(document.getElementById('revenue').value);
    const cogs = parseFloat(document.getElementById('cogs').value);
    const opExpenses = parseFloat(document.getElementById('opExpenses').value);
    const netIncome = parseFloat(document.getElementById('netIncome').value);
    const opCF = parseFloat(document.getElementById('opCF').value);
    const freeCF = parseFloat(document.getElementById('freeCF').value);
    const shares = parseFloat(document.getElementById('shares').value);
    const stockPrice = parseFloat(document.getElementById('stockPrice').value);

    const data = { year, totalAssets, totalLiabilities, equity, revenue, cogs, opExpenses, netIncome, opCF, freeCF, shares, stockPrice };
    financialData.push(data);
    updateAnalysis();
    updateCharts();
}

function updateAnalysis() {
    const container = document.getElementById('ratios');
    container.innerHTML = '';
    financialData.forEach(d => {
        const currentRatio = (d.totalAssets / d.totalLiabilities).toFixed(2);
        const quickRatio = ((d.totalAssets - d.cogs)/d.totalLiabilities).toFixed(2);
        const equityRatio = (d.equity / d.totalAssets).toFixed(2);
        const grossMargin = ((d.revenue - d.cogs)/d.revenue*100).toFixed(2);
        const netMargin = (d.netIncome/d.revenue*100).toFixed(2);
        const roe = (d.netIncome/d.equity*100).toFixed(2);
        const roa = (d.netIncome/d.totalAssets*100).toFixed(2);
        const eps = (d.netIncome/d.shares).toFixed(2);
        const marketCap = (d.shares*d.stockPrice).toFixed(2);
        const duPontROE = ((d.netIncome/d.revenue)*(d.revenue/d.totalAssets)*(d.totalAssets/d.equity)*100).toFixed(2);

        const html = `
            <h3>Year: ${d.year}</h3>
            <ul>
                <li>Current Ratio: ${currentRatio}</li>
                <li>Quick Ratio: ${quickRatio}</li>
                <li>Equity Ratio: ${equityRatio}</li>
                <li>Gross Margin (%): ${grossMargin}</li>
                <li>Net Margin (%): ${netMargin}</li>
                <li>ROE (%): ${roe}</li>
                <li>ROA (%): ${roa}</li>
                <li>EPS: ${eps}</li>
                <li>Market Cap: ${marketCap}</li>
                <li>DuPont ROE (%): ${duPontROE}</li>
            </ul>
        `;
        container.innerHTML += html;
    });
}

function updateCharts() {
    const labels = financialData.map(d=>d.year);
    const revenueData = financialData.map(d=>d.revenue);
    const netIncomeData = financialData.map(d=>d.netIncome);

    if(lineChart) lineChart.destroy();
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    lineChart = new Chart(ctxLine,{
        type:'line',
        data:{labels:labels,datasets:[
            {label:'Revenue',data:revenueData,borderColor:'blue',fill:false},
            {label:'Net Income',data:netIncomeData,borderColor:'green',fill:false}
        ]},
        options:{responsive:true,plugins:{legend:{position:'top'}}}
    });

    if(pieChart) pieChart.destroy();
    const latest = financialData[financialData.length-1];
    const ctxPie = document.getElementById('pieChart').getContext('2d');
    pieChart = new Chart(ctxPie,{
        type:'pie',
        data:{
            labels:['COGS','Operating Expenses','Net Income'],
            datasets:[{data:[latest.cogs,latest.opExpenses,latest.netIncome],
            backgroundColor:['#ff6384','#36a2eb','#4bc0c0']}]},
        options:{responsive:true}
    });

    if(barChart) barChart.destroy();
    const ctxBar = document.getElementById('barChart').getContext('2d');
    barChart = new Chart(ctxBar,{
        type:'bar',
        data:{
            labels:labels,
            datasets:[
                {label:'ROE %',data:financialData.map(d=>(d.netIncome/d.equity*100).toFixed(2)),backgroundColor:'#6610f2'},
                {label:'ROA %',data:financialData.map(d=>(d.netIncome/d.totalAssets*100).toFixed(2)),backgroundColor:'#0d6efd'}
            ]
        },
        options:{responsive:true,plugins:{legend:{position:'top'}}}
    });
}

function exportCSV(){
    let csvContent="data:text/csv;charset=utf-8,";
    csvContent+="Year,Total Assets,Total Liabilities,Equity,Revenue,COGS,Operating Expenses,Net Income,Operating CF,Free CF,Shares,Stock Price\n";
    financialData.forEach(d=>{
        csvContent+=`${d.year},${d.totalAssets},${d.totalLiabilities},${d.equity},${d.revenue},${d.cogs},${d.opExpenses},${d.netIncome},${d.opCF},${d.freeCF},${d.shares},${d.stockPrice}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href",encodedUri);
    link.setAttribute("download","financial_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportPDF(){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;
    financialData.forEach(d=>{
        doc.text(`Year: ${d.year}`,10,y); y+=10;
        doc.text(`Revenue: ${d.revenue}, Net Income: ${d.netIncome}, ROE: ${(d.netIncome/d.equity*100).toFixed(2)}%`,10,y); y+=10;
    });
    doc.save("financial_report.pdf");
}
