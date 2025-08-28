// Tabs Navigation
function openTab(evt, tabName){
  const tabcontents=document.getElementsByClassName("tabcontent");
  for(let i=0;i<tabcontents.length;i++) tabcontents[i].style.display="none";
  const tabs=document.getElementsByClassName("tablink");
  for(let i=0;i<tabs.length;i++) tabs[i].classList.remove("active");
  document.getElementById(tabName).style.display="block";
  evt.currentTarget.classList.add("active");
}
window.onload=function(){
  document.querySelector(".tablink").click();
  loadData();
  updateCompareOptions();
  updateAnalysis();
  generateStatements();
  updateCharts();
};

// Global Variables
let financialData=[];

// Utilities
function formatNumber(num){ return (num && !isNaN(num)) ? Number(num).toLocaleString() : '0'; }
function evalInput(value){ try{ return Number(eval(value)); } catch(e){ return NaN; } }

// Data Handling
function loadData(){
  const data=localStorage.getItem('financialData');
  financialData=data ? JSON.parse(data) : [];
}
function saveData(){
  const d={
    companyName: document.getElementById('companyName').value,
    currentAssets: evalInput(document.getElementById('currentAssets').value),
    fixedAssets: evalInput(document.getElementById('fixedAssets').value),
    currentLiabilities: evalInput(document.getElementById('currentLiabilities').value),
    longLiabilities: evalInput(document.getElementById('longLiabilities').value),
    equity: evalInput(document.getElementById('equity').value),
    revenue: evalInput(document.getElementById('revenue').value),
    cogs: evalInput(document.getElementById('cogs').value),
    opExpenses: evalInput(document.getElementById('opExpenses').value),
    otherExpenses: evalInput(document.getElementById('otherExpenses').value),
    opCF: evalInput(document.getElementById('opCF').value)||0,
    invCF: evalInput(document.getElementById('invCF').value)||0,
    finCF: evalInput(document.getElementById('finCF').value)||0,
    shares: evalInput(document.getElementById('shares').value)||0,
    stockPrice: evalInput(document.getElementById('stockPrice').value)||0
  };
  financialData.push(d);
  localStorage.setItem('financialData', JSON.stringify(financialData));
  document.getElementById('statusMsg').innerText='تم حفظ البيانات بنجاح!';
  document.getElementById('dataForm').reset();
  updateCompareOptions();
  generateStatements();
  updateAnalysis();
  updateCharts();
}

// Clear Data
function clearData(){
  if(confirm('هل تريد مسح جميع البيانات؟')){
    financialData=[];
    localStorage.removeItem('financialData');
    document.getElementById('statusMsg').innerText='تم مسح جميع البيانات!';
    updateCompareOptions();
    generateStatements();
    updateAnalysis();
    updateCharts();
  }
}

// Generate Statements
function generateStatements(){
  const container=document.getElementById('statementsContainer');
  container.innerHTML='';
  financialData.forEach(d=>{
    const totalAssets=d.currentAssets+d.fixedAssets;
    const totalLiabilities=d.currentLiabilities+d.longLiabilities;
    const netIncome=d.revenue-d.cogs-d.opExpenses-d.otherExpenses;
    container.innerHTML+=`
      <h3>${d.companyName}</h3>
      <table>
        <tr><th colspan="2">Balance Sheet</th></tr>
        <tr><td>Total Assets</td><td>${formatNumber(totalAssets)}</td></tr>
        <tr><td>Total Liabilities</td><td>${formatNumber(totalLiabilities)}</td></tr>
        <tr><td>Equity</td><td>${formatNumber(d.equity)}</td></tr>
        <tr><th colspan="2">Income Statement</th></tr>
        <tr><td>Revenue</td><td>${formatNumber(d.revenue)}</td></tr>
        <tr><td>COGS</td><td>${formatNumber(d.cogs)}</td></tr>
        <tr><td>Operating Expenses</td><td>${formatNumber(d.opExpenses)}</td></tr>
        <tr><td>Other Expenses</td><td>${formatNumber(d.otherExpenses)}</td></tr>
        <tr><td>Net Income</td><td>${formatNumber(netIncome)}</td></tr>
        <tr><th colspan="2">Cash Flows</th></tr>
        <tr><td>Op CF</td><td>${formatNumber(d.opCF)}</td></tr>
        <tr><td>Inv CF</td><td>${formatNumber(d.invCF)}</td></tr>
        <tr><td>Fin CF</td><td>${formatNumber(d.finCF)}</td></tr>
      </table>
    `;
  });
}

// Ratios & Analysis
function updateAnalysis(){
  const ratiosDiv=document.getElementById('ratios');
  ratiosDiv.innerHTML='';
  financialData.forEach(d=>{
    const totalAssets=d.currentAssets+d.fixedAssets;
    const netIncome=d.revenue-d.cogs-d.opExpenses-d.otherExpenses;
    const roa=(netIncome/totalAssets)*100;
    const roe=(netIncome/d.equity)*100;
    const grossMargin=((d.revenue-d.cogs)/d.revenue)*100;
    const opMargin=((d.revenue-d.cogs-d.opExpenses)/d.revenue)*100;
    const eva=(netIncome-(totalAssets*0.1));
    ratiosDiv.innerHTML+=`
      <h3>${d.companyName}</h3>
      <ul>
        <li>ROA: ${roa.toFixed(2)}%</li>
        <li>ROE: ${roe.toFixed(2)}%</li>
        <li>Gross Margin: ${grossMargin.toFixed(2)}%</li>
        <li>Operating Margin: ${opMargin.toFixed(2)}%</li>
        <li>EVA: ${formatNumber(eva)}</li>
      </ul>
    `;
  });
}

// Comparison
function updateCompareOptions(){
  const select=document.getElementById('compareSelect');
  select.innerHTML='';
  financialData.forEach((d,i)=>{
    const opt=document.createElement('option');
    opt.value=i; opt.text=d.companyName;
    select.appendChild(opt);
  });
}
function compareRecords(){
  const select=document.getElementById('compareSelect');
  const indices=Array.from(select.selectedOptions).map(o=>o.value);
  if(indices.length<2){alert('اختر على الأقل شركتين للمقارنة'); return;}
  alert('ميزة المقارنة ستظهر قريباً');
}

// Export CSV
function exportStatementsCSV(){
  let csv='Company,Total Assets,Total Liabilities,Equity,Revenue,COGS,OpExpenses,OtherExpenses,Net Income,OpCF,InvCF,FinCF,Shares,StockPrice\n';
  financialData.forEach(d=>{
    const totalAssets=d.currentAssets+d.fixedAssets;
    const totalLiabilities=d.currentLiabilities+d.longLiabilities;
    const netIncome=d.revenue-d.cogs-d.opExpenses-d.otherExpenses;
    csv+=`${d.companyName},${totalAssets},${totalLiabilities},${d.equity},${d.revenue},${d.cogs},${d.opExpenses},${d.otherExpenses},${netIncome},${d.opCF},${d.invCF},${d.finCF},${d.shares},${d.stockPrice}\n`;
  });
  const blob=new Blob([csv], {type:'text/csv'});
  const link=document.createElement('a');
  link.href=URL.createObjectURL(blob);
  link.download='financial_statements.csv';
  link.click();
}

// Charts
function updateCharts(){
  const ctxLine=document.getElementById('lineChart').getContext('2d');
  const ctxBar=document.getElementById('barChart').getContext('2d');
  const labels=financialData.map(d=>d.companyName);
  const netIncomes=financialData.map(d=>d.revenue-d.cogs-d.opExpenses-d.otherExpenses);
  const revenues=financialData.map(d=>d.revenue);

  new Chart(ctxLine,{type:'line', data:{labels, datasets:[{label:'Net Income', data:netIncomes, borderColor:'blue', fill:false}]}});
  new Chart(ctxBar,{type:'bar', data:{labels, datasets:[{label:'Revenue', data:revenues, backgroundColor:'green'}]}});
}
