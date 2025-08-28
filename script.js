let financialData=[];

function saveData(){
  const data={
    companyName: document.getElementById('companyName').value || `Record ${financialData.length+1}`,
    totalAssets: parseFloat(document.getElementById('totalAssets')?.value)||0,
    totalLiabilities: parseFloat(document.getElementById('totalLiabilities')?.value)||0,
    equity: parseFloat(document.getElementById('equity')?.value)||0,
    revenue: parseFloat(document.getElementById('revenue')?.value)||0,
    cogs: parseFloat(document.getElementById('cogs')?.value)||0,
    opExpenses: parseFloat(document.getElementById('opExpenses')?.value)||0,
    netIncome: parseFloat(document.getElementById('netIncome')?.value)||0,
    opCF: parseFloat(document.getElementById('opCF')?.value)||0,
    invCF: parseFloat(document.getElementById('invCF')?.value)||0,
    finCF: parseFloat(document.getElementById('finCF')?.value)||0,
    freeCF: parseFloat(document.getElementById('freeCF')?.value)||0,
    shares: parseFloat(document.getElementById('shares')?.value)||0,
    stockPrice: parseFloat(document.getElementById('stockPrice')?.value)||0
  };
  let stored=JSON.parse(localStorage.getItem('financialData'))||[];
  stored.push(data);
  localStorage.setItem('financialData',JSON.stringify(stored));
  document.getElementById('statusMsg').innerText="Data saved successfully!";
  document.getElementById('dataForm').reset();
}

function loadData(){
  financialData=JSON.parse(localStorage.getItem('financialData'))||[];
}

function clearData(){
  financialData=[];
  localStorage.removeItem('financialData');
  alert("All data cleared!");
  location.reload();
}

function formatNumber(num){ return num? num.toLocaleString():"0"; }

function updateAnalysis(){
  const container=document.getElementById('ratios');
  if(!container) return;
  container.innerHTML='';
  financialData.forEach(d=>{
    const currentRatio=d.totalLiabilities? (d.totalAssets/d.totalLiabilities).toFixed(2):'N/A';
    const roe=d.equity? (d.netIncome/d.equity*100).toFixed(2):'N/A';
    const roa=d.totalAssets? (d.netIncome/d.totalAssets*100).toFixed(2):'N/A';
    const grossMargin=d.revenue? ((d.revenue-d.cogs)/d.revenue*100).toFixed(2):'N/A';
    const netMargin=d.revenue? (d.netIncome/d.revenue*100).toFixed(2):'N/A';
    const eva=d.equity? (d.netIncome - 0.08*d.equity).toFixed(2):'N/A';
    container.innerHTML+=`
      <h3>${d.companyName}</h3>
      <ul>
        <li>Current Ratio: ${currentRatio}</li>
        <li>ROE (%): ${roe}</li>
        <li>ROA (%): ${roa}</li>
        <li>Gross Margin (%): ${grossMargin}</li>
        <li>Net Margin (%): ${netMargin}</li>
        <li>EVA: ${formatNumber(eva)}</li>
      </ul>
    `;
  });
}

let lineChart, barChart, pieChart;
function updateCharts(){
  const labels=financialData.map(d=>d.companyName);
  const revenueData=financialData.map(d=>d.revenue);
  const netIncomeData=financialData.map(d=>d.netIncome);

  if(lineChart) lineChart.destroy();
  const ctxLine=document.getElementById('lineChart')?.getContext('2d');
  if(ctxLine){
    lineChart=new Chart(ctxLine,{type:'line',
      data:{labels, datasets:[
        {label:'Revenue', data:revenueData,borderColor:'blue',fill:false},
        {label:'Net Income', data:netIncomeData,borderColor:'green',fill:false}
      ]},
      options:{responsive:true}
    });
  }
}

function updateCompareOptions(){
  const select=document.getElementById('compareSelect');
  if(!select) return;
  select.innerHTML='';
  financialData.forEach((d,i)=>{
    const option=document.createElement('option');
    option.value=i; option.text=d.companyName;
    select.appendChild(option);
  });
}

function compareRecords(){
  const selected=Array.from(document.getElementById('compareSelect').selectedOptions).map(o=>parseInt(o.value));
  if(selected.length<2 || selected.length>3){alert('Select 2 or 3 records'); return;}
  const labels=selected.map(i=>financialData[i].companyName);
  const roeData=selected.map(i=>(financialData[i].equity? (financialData[i].netIncome/financialData[i].equity*100).toFixed(2):0));
  const netMarginData=selected.map(i=>(financialData[i].revenue? (financialData[i].netIncome/financialData[i].revenue*100).toFixed(2):0));
  
  if(barChart) barChart.destroy();
  const ctxBar=document.getElementById('barChart')?.getContext('2d');
  if(ctxBar){
    barChart=new Chart(ctxBar,{
      type:'bar',
      data:{labels, datasets:[
        {label:'ROE %', data:roeData, backgroundColor:'#6610f2'},
        {label:'Net Margin %', data:netMarginData, backgroundColor:'#0d6efd'}
      ]},
      options:{responsive:true,plugins:{legend:{position:'top'}}}
    });
  }
}

function exportCSV(){
  let csv="Company,Assets,Liabilities,Equity,Revenue,COGS,OpEx,NetIncome\n";
  financialData.forEach(d=>{
    csv+=`${d.companyName},${d.totalAssets},${d.totalLiabilities},${d.equity},${d.revenue},${d.cogs},${d.opExpenses},${d.netIncome}\n`;
  });
  const blob=new Blob([csv],{type:'text/csv'});
  const link=document.createElement('a');
  link.href=URL.createObjectURL(blob);
  link.download="financial_data.csv";
  link.click();
}

function exportPDF(){
  alert("PDF export feature coming soon!"); // يمكنك استبدالها بمكتبة jsPDF لاحقًا
}
