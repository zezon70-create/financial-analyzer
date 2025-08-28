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
  loadData();
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

let lineChart, barChart;
function updateCharts(){
  const labels=financialData.map(d=>d.companyName);
  const revenueData=financialData.map(d=>d.revenue);
  const netIncomeData=financialData.map(d=>d.netIncome);

  const ctxLine=document.getElementById('lineChart')?.getContext('2d');
  if(ctxLine){
    if(lineChart) lineChart.destroy();
    lineChart=new Chart(ctxLine,{
      type:'line',
      data:{labels, datasets:[{label:'Revenue', data:revenueData, borderColor:'#0d6efd',fill:false},{label:'Net Income', data:netIncomeData,borderColor:'#6610f2',fill:false}]},
      options:{responsive:true}
    });
  }

  const ctxBar=document.getElementById('barChart')?.getContext('2d');
  if(ctxBar){
    if(barChart) barChart.destroy();
    barChart=new Chart(ctxBar,{
      type:'bar',
      data:{labels,datasets:[{label:'Revenue', data:revenueData, backgroundColor:'#0d6efd'},{label:'Net Income', data:netIncomeData, backgroundColor:'#6610f2'}]},
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
    option.value=i;
    option.text=d.companyName;
    select.appendChild(option);
  });
}

function compareRecords(){
  const select=document.getElementById('compareSelect');
  const selected=[...select.selectedOptions].map(o=>financialData[o.value]);
  if(selected.length<2){alert("Select at least 2 records to compare"); return;}
  let msg="Comparison:\n";
  selected.forEach(d=>{
    msg+=`${d.companyName}: ROE ${d.equity? (d.netIncome/d.equity*100).toFixed(2):'N/A'}%, Net Income ${formatNumber(d.netIncome)}\n`;
  });
  alert(msg);
}

function exportCSV(){
  if(!financialData.length){alert("No data to export");return;}
  const headers=Object.keys(financialData[0]);
  const csv=[headers.join(',')];
  financialData.forEach(d=>csv.push(headers.map(h=>d[h]).join(',')));
  const blob=new Blob([csv.join('\n')],{type:'text/csv'});
  const link=document.createElement('a');
  link.href=URL.createObjectURL(blob);
  link.download="financial_data.csv";
  link.click();
}

function exportPDF(){ alert("PDF export coming soon!"); }
