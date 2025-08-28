// =================== Global Variables ===================
let financialData = [];

// =================== Utility Functions ===================
function formatNumber(num){
    if(num===undefined || isNaN(num)) return '0';
    return Number(num).toLocaleString();
}

function evalInput(value){
    try{
        // السماح بالمعادلات الحسابية البسيطة
        return Number(eval(value));
    } catch(e){
        return NaN;
    }
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
          <table border="1" cellspacing="0" cellpadding="5">
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
          </table><br/>
        `;
    });
}

function exportStatementsCSV(){
    if(!financialData.length){alert('لا توجد بيانات'); return;}
    let csv='Company,Total Assets,Total Liabilities,Equity,Revenue,COGS,OpExpenses,NetIncome,OpCF,InvCF,FinCF,FreeCF\n';
    financialData.forEach(d=>{
        csv+=`${d.companyName},${d.totalAssets},${d.totalLiabilities},${d.equity},${d.revenue},${d.cogs},${d.opExpenses},${d.netIncome},${d.opCF},${d.invCF},${d.finCF},${d.freeCF}\n`;
    });
    const blob=new Blob([csv],{type:'text/csv'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='financial_statements.csv';
    a.click();
}

// =================== Financial Analysis ===================
function updateAnalysis(){
    if(!financialData.length) return;
    const container=document.getElementById('ratios');
    container.innerHTML='';
    financialData.forEach(d=>{
        const currentRatio = (d.totalAssets/d.totalLiabilities).toFixed(2);
        const roe = ((d.netIncome/d.equity)*100).toFixed(2);
        const roa = ((d.netIncome/d.totalAssets)*100).toFixed(2);
        const grossMargin = ((d.revenue - d.cogs)/d.revenue*100).toFixed(2);
        const netMargin = ((d.netIncome/d.revenue)*100).toFixed(2);
        const EVA = (d.netIncome - 0.1*d.equity).toFixed(2); // تكلفة رأس المال 10% كمثال
        container.innerHTML+=`
        <h3>${d.companyName}</h3>
        <ul>
            <li>Current Ratio: ${currentRatio}</li>
            <li>ROE: ${roe}%</li>
            <li>ROA: ${roa}%</li>
            <li>Gross Margin: ${grossMargin}%</li>
            <li>Net Margin: ${netMargin}%</li>
            <li>Economic Value Added (EVA): ${formatNumber(EVA)}</li>
        </ul>
        `;
    });
}

// =================== Comparison ===================
function updateCompareOptions(){
    const select=document.getElementById('compareSelect');
    if(!select) return;
    select.innerHTML='';
    financialData.forEach((d,i)=>{
        select.innerHTML+=`<option value="${i}">${d.companyName}</option>`;
    });
}

function compareRecords(){
    const select=document.getElementById('compareSelect');
    const indices=Array.from(select.selectedOptions).map(o=>parseInt(o.value));
    if(indices.length<2){alert('اختر على الأقل سجلين للمقارنة'); return;}
    let msg='Comparison:\n';
    indices.forEach(i=>{
        const d=financialData[i];
        msg+=`${d.companyName}: Net Income ${formatNumber(d.netIncome)}, ROE ${((d.netIncome/d.equity)*100).toFixed(2)}%\n`;
    });
    alert(msg);
}

// =================== Dashboard Charts ===================
function updateCharts(){
    if(!financialData.length) return;
    const labels = financialData.map(d=>d.companyName);
    const revenues = financialData.map(d=>d.revenue);
    const netIncomes = financialData.map(d=>d.netIncome);
    const ctxLine = document.getElementById('lineChart').getContext('2d');
    new Chart(ctxLine,{
        type:'line',
        data:{
            labels:labels,
            datasets:[
                {label:'Revenue',data:revenues,borderColor:'blue',fill:false},
                {label:'Net Income',data:netIncomes,borderColor:'green',fill:false}
            ]
        },
        options:{responsive:true}
    });
    const ctxBar = document.getElementById('barChart').getContext('2d');
    new Chart(ctxBar,{
        type:'bar',
        data:{
            labels:labels,
            datasets:[
                {label:'Revenue',data:revenues,backgroundColor:'rgba(0,123,255,0.5)'},
                {label:'Net Income',data:netIncomes,backgroundColor:'rgba(40,167,69,0.5)'}
            ]
        },
        options:{responsive:true}
    });
}

// =================== Export Dashboard ===================
function exportCSV(){
    if(!financialData.length){alert('لا توجد بيانات'); return;}
    let csv='Company,Revenue,Net Income,Equity,Total Assets\n';
    financialData.forEach(d=>{
        csv+=`${d.companyName},${d.revenue},${d.netIncome},${d.equity},${d.totalAssets}\n`;
    });
    const blob=new Blob([csv],{type:'text/csv'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='financial_dashboard.csv';
    a.click();
}

function exportPDF(){
    alert('سيتم إضافة تصدير PDF لاحقاً.');
}

// =================== Initialize ===================
window.onload = function(){
    loadData();
    updateCompareOptions();
    updateAnalysis();
    generateStatements();
    updateCharts();
}
