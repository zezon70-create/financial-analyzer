let financialData = [];
let lineChart, pieChart, barChart;

function toggleMode(){
document.body.classList.toggle("dark-mode");
}

function formatNumber(num){
return num ? num.toLocaleString() : "0";
}

function addData(){
const data = {
companyName: document.getElementById('companyName').value || `Record ${financialData.length+1}`,
totalAssets: parseFloat(document.getElementById('totalAssets').value) || 0,
totalLiabilities: parseFloat(document.getElementById('totalLiabilities').value) || 0,
equity: parseFloat(document.getElementById('equity').value) || 0,
revenue: parseFloat(document.getElementById('revenue').value) || 0,
cogs: parseFloat(document.getElementById('cogs').value) || 0,
opExpenses: parseFloat(document.getElementById('opExpenses').value) || 0,
netIncome: parseFloat(document.getElementById('netIncome').value) || 0,
opCF: parseFloat(document.getElementById('opCF').value) || 0,
invCF: parseFloat(document.getElementById('invCF').value) || 0,
finCF: parseFloat(document.getElementById('finCF').value) || 0,
freeCF: parseFloat(document.getElementById('freeCF').value) || 0,
shares: parseFloat(document.getElementById('shares').value) || 0,
stockPrice: parseFloat(document.getElementById('stockPrice').value) || 0
};
financialData.push(data);
updateAnalysis();
updateCharts();
updateCompareOptions();
}

function clearData(){
financialData=[];
document.getElementById('ratios').innerHTML='';
updateCharts();
updateCompareOptions();
}

function updateAnalysis(){
const container=document.getElementById('ratios');
container.innerHTML='';
financialData.forEach(d=>{
const currentRatio=d.totalLiabilities? (d.totalAssets/d.totalLiabilities).toFixed(2):'N/A';
const quickRatio=d.totalLiabilities? ((d.totalAssets-d.cogs)/d.totalLiabilities).toFixed(2):'N/A';
const equityRatio=d.totalAssets? (d.equity/d.totalAssets).toFixed(2):'N/A';
const grossMargin=d.revenue? ((d.revenue-d.cogs)/d.revenue*100).toFixed(2):'N/A';
const netMargin=d.revenue? (d.netIncome/d.revenue*100).toFixed(2):'N/A';
const roe=d.equity? (d.netIncome/d.equity*100).toFixed(2):'N/A';
const roa=d.totalAssets? (d.netIncome/d.totalAssets*100).toFixed(2):'N/A';
const eps=d.shares? (d.netIncome/d.shares).toFixed(2):'N/A';
const marketCap=d.shares && d.stockPrice? (d.shares*d.stockPrice).toFixed(2):'N/A';
const duPontROE=d.revenue && d.totalAssets && d.equity? ((d.netIncome/d.revenue)*(d.revenue/d.totalAssets)*(d.totalAssets/d.equity)*100).toFixed(2):'N/A';

container.innerHTML+=`
<h3>${d.companyName}</h3>
<ul>
<li>Current Ratio: ${currentRatio}</li>
<li>Quick Ratio: ${quickRatio}</li>
<li>Equity Ratio: ${equityRatio}</li>
<li>Gross Margin (%): ${grossMargin}</li>
<li>Net Margin (%): ${netMargin}</li>
<li>ROE (%): ${roe}</li>
<li>ROA (%): ${roa}</li>
<li>EPS: ${formatNumber(eps)}</li>
<li>Market Cap: ${formatNumber(marketCap)}</li>
<li>DuPont ROE (%): ${duPontROE}</li>
</ul>`;
});
}

function updateCompareOptions(){
const select=document.getElementById('compareSelect');
select.innerHTML='';
financialData.forEach((d,i)=>{
const option=document.createElement('option');
option.value=i;
option.text=d.companyName;
select.appendChild(option);
});
}

function compareRecords(){
const selected=Array.from(document.getElementById('compareSelect').selectedOptions).map(o=>parseInt(o.value));
if(selected.length<2||selected.length>3){alert('Select 2 or 3 records only');return;}
const labels=selected.map(i=>financialData[i].companyName);
const roeData=selected.map(i=>(financialData[i].equity? (financialData[i].netIncome/financialData[i].equity*100).toFixed(2):0));
const roaData=selected.map(i=>(financialData[i].totalAssets? (financialData[i].netIncome/financialData[i].totalAssets*100).toFixed(2):0));
const netMarginData=selected.map(i=>(financialData[i].revenue? (financialData[i].netIncome/financialData[i].revenue*100).toFixed(2):0));

if(barChart) barChart.destroy();
const ctxBar=document.getElementById('barChart').getContext('2d');
barChart=new Chart(ctxBar,{
type:'bar',
data:{labels:labels,datasets:[
{label:'ROE %',data:roeData,backgroundColor:'#6610f2'},
{label:'ROA %',data:roaData,backgroundColor:'#0d6efd'},
{label:'Net Margin %',data:netMarginData,backgroundColor:'#36a2eb'}
]},
options:{responsive:true,plugins:{legend:{position:'top'}}}
});
}

function updateCharts(){
const labels=financialData.map(d=>d.companyName);
const revenueData=financialData.map(d=>d.revenue);
const netIncomeData=financialData.map(d=>d.netIncome);

if(lineChart) lineChart.destroy();
const ctxLine=document.getElementById('lineChart').getContext('2d');
lineChart=new Chart(ctxLine,{
type:'line',
data:{labels:labels,datasets:[
{label:'Revenue',data:revenueData,borderColor:'blue',fill:false},
{label:'Net Income',data:netIncomeData,borderColor:'green',fill:false}
]},
options:{responsive:true,plugins:{legend:{position:'top'}}}
});

if(pieChart) pieChart.destroy();
if(financialData.length>0){
const latest=financialData[financialData.length-1];
const ctxPie=document.getElementById('pieChart').getContext('2d');
pieChart=new Chart(ctxPie,{
type:'pie',
data:{labels:['COGS','Operating Expenses','Net Income'],datasets:[{data:[latest.cogs,latest.opExpenses,latest.netIncome],backgroundColor:['#ff6384','#36a2eb','#4bc0c0']}]},
options:{responsive:true}
});
}

if(barChart) barChart.destroy();
}

function exportCSV(){
let csvContent="data:text/csv;charset=utf-8,";
csvContent+="Company/Year,Total Assets,Total Liabilities,Equity,Revenue,COGS,Operating Expenses,Net Income,Operating CF,Investing CF,Financing CF,Free CF,Shares,Stock Price\n";
financialData.forEach(d=>{
csvContent+=`${d.companyName},${d.totalAssets},${d.totalLiabilities},${d.equity},${d.revenue},${d.cogs},${d.opExpenses},${d.netIncome},${d.opCF},${d.invCF},${d.finCF},${d.freeCF},${d.shares},${d.stockPrice}\n`;
});
const encodedUri=encodeURI(csvContent);
const link=document.createElement("a");
link.setAttribute("href",encodedUri);
link.setAttribute("download","financial_data.csv");
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
}

function exportPDF(){
const { jsPDF } = window.jspdf;
const doc = new jsPDF();
let y=10;
financialData.forEach(d=>{
doc.text(`Company/Year: ${d.companyName}`,10,y); y+=10;
doc.text(`Revenue: ${formatNumber(d.revenue)}, Net Income: ${formatNumber(d.netIncome)}, ROE: ${d.equity? (d.netIncome/d.equity*100).toFixed(2):'N/A'}%`,10,y); y+=10;
});
doc.save("financial_report.pdf");
}
