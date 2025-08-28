// =============== Tabs Navigation ===============
function openTab(evt, tabName){
  const tabcontents = document.getElementsByClassName("tabcontent");
  for(let i=0;i<tabcontents.length;i++) tabcontents[i].style.display="none";
  const tabs = document.getElementsByClassName("tablink");
  for(let i=0;i<tabs.length;i++) tabs[i].classList.remove("active");
  document.getElementById(tabName).style.display="block";
  evt.currentTarget.classList.add("active");
}
window.onload=function(){document.querySelector(".tablink").click(); loadData(); updateCompareOptions(); updateAnalysis(); generateStatements(); updateCharts();}

// =================== Global Variables ===================
let financialData = [];

// =================== Utility Functions ===================
function formatNumber(num){
    if(num===undefined || isNaN(num)) return '0';
    return Number(num).toLocaleString();
}
function evalInput(value){
    try{ return Number(eval(value)); }
    catch(e){ return NaN; }
}

// =================== Data Handling ===================
function loadData(){
    const data = localStorage.getItem('financialData');
    financialData = data ? JSON.parse(data) : [];
}
function saveData(){
    const d={
        companyName: document.getElementById('companyName').value,
        totalAssets: evalInput(document.getElementById('totalAssets').value),
        totalLiabilities: evalInput(document.getElementById('totalLiabilities').value),
        equity: evalInput(document.getElementById('equity').value),
        revenue: evalInput(document.getElementById('revenue').value),
        cogs: evalInput(document.getElementById('cogs').value),
        opExpenses: evalInput(document.getElementById('opExpenses').value),
        netIncome: evalInput(document.getElementById('netIncome').value),
        opCF: evalInput(document.getElementById('opCF').value)||0,
        invCF: evalInput(document.getElementById('invCF').value)||0,
        finCF: evalInput(document.getElementById('finCF').value)||0,
        freeCF: evalInput(document.getElementById('freeCF').value)||0,
        shares: evalInput(document.getElementById('shares').value)||0,
        stockPrice: evalInput(document.getElementById('stockPrice').value)||0
    };
    financialData.push(d);
    localStorage.setItem('financialData', JSON.stringify(financialData));
    document.getElementById('statusMsg').innerText='تم حفظ البيانات بنجاح!';
    document.getElementById('dataForm').reset();
    updateCompareOptions();
}

// =================== Clear Data ===================
function clearData(){
    if(confirm('هل تريد مسح جميع البيانات؟')){
        financialData=[];
        localStorage.removeItem('financialData');
        document.getElementById('statusMsg').innerText='تم مسح جميع البيانات!';
        updateCompareOptions();
    }
}

// =================== Financial Statements ===================
function generateStatements(){
    const container=document.getElementById('statementsContainer');
    container.innerHTML='';
    financialData.forEach(d=>{
        container.innerHTML+=`
          <h3>${d.companyName}</h3>
          <table>
            <tr><th colspan="2">Balance Sheet</th></tr>
            <tr><td>Total Assets</td><td>${formatNumber(d.totalAssets)}</td></tr>
            <tr><td>Total Liabilities</td><td>${formatNumber(d.totalLiabilities)}</td></tr>
            <tr><td>Equity</td><td>${formatNumber(d.equity)}</td></tr>
            <tr><th colspan="2">Income Statement</th></tr>
            <tr><td>Revenue</td><td>${formatNumber(d.revenue)}</td></tr>
            <tr><td>COGS</td><td>${formatNumber(d.cogs)}</td></tr>
            <tr><td>Operating Expenses</td><td>${formatNumber(d.opExpenses)}</td></tr>
            <tr><td>Net Income</td><td>${formatNumber(d.netIncome)}</td></tr>
            <tr><th colspan="2">Cash Flow Statement</th></tr>
            <tr><td>Operating CF</td><td>${formatNumber(d.opCF)}</td></tr>
            <tr><td>Investing CF</td><td>${formatNumber(d.invCF)}</td></tr>
            <tr><td>Financing CF</td><td>${formatNumber(d.finCF)}</td></tr>
            <tr><td>Free CF</td><td>${formatNumber(d.freeCF)}</td></tr>
          </table>`;
    });
}

// =================== Ratios and Analysis ===================
function updateAnalysis(){
    const ratiosDiv=document.getElementById('ratios');
    ratiosDiv.innerHTML='';
    financialData.forEach(d=>{
        const roa=(d.netIncome/d.totalAssets)*100;
        const roe=(d.netIncome/d.equity)*100;
        const grossMargin=((d.revenue-d.cogs)/d.revenue)*100;
        const opMargin=((d.revenue-d.cogs-d.opExpenses)/d.revenue)*100;
        const eva=(d.netIncome-(d.totalAssets*0.1))*1; // example cost of capital 10%
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

// =================== Comparison ===================
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
    alert('ميزة المقارنة ستظهر في الـ Dashboard قريباً');
}

// =================== Export CSV ===================
function exportStatementsCSV(){
    let csv='Company,Total Assets,Total Liabilities,Equity,Revenue,COGS,OpExpenses,Net Income,OpCF,InvCF,FinCF,FreeCF,Shares,StockPrice\n';
    financialData.forEach(d=>{
        csv+=`${d.companyName},${d.totalAssets},${d.totalLiabilities},${d.equity},${d.revenue},${d.cogs},${d.opExpenses},${d.netIncome},${d.opCF},${d.invCF},${d.finCF},${d.freeCF},${d.shares},${d.stockPrice}\n`;
    });
    const blob=new Blob([csv], {type:'text/csv'});
    const link=document.createElement('a');
    link.href=URL.createObjectURL(blob);
    link.download='financial_statements.csv';
    link.click();
}

// =================== Charts ===================
function updateCharts(){
    const ctxLine=document.getElementById('lineChart').getContext('2d');
    const ctxBar=document.getElementById('barChart').getContext('2d');
    const labels=financialData.map(d=>d.companyName);
    const netIncomes=financialData.map(d=>d.netIncome);
    const revenues=financialData.map(d=>d.revenue);

    new Chart(ctxLine,{type:'line', data:{labels, datasets:[{label:'Net Income', data:netIncomes, borderColor:'blue', fill:false}]}});
    new Chart(ctxBar,{type:'bar', data:{labels, datasets:[{label:'Revenue', data:revenues, backgroundColor:'green'}]}});
}
