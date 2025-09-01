// charts.js
let bsChart, forecastChart, sensitivityChart;

function renderBSChart(){
  const ctx = document.getElementById('bsChart')?.getContext('2d');
  if(!ctx) return;
  const bs = FA.balanceSheet();
  if(bsChart) bsChart.destroy();
  bsChart = new Chart(ctx, {
    type:'doughnut',
    data: {
      labels:['Assets','Liabilities','Equity'],
      datasets:[{data:[bs.assets, bs.liabilities, bs.equity], backgroundColor:['#1f77b4','#ff7f0e','#2ca02c']}]
    }
  });
}

function renderRatios(){
  const ul = document.getElementById('keyRatios');
  if(!ul) return;
  const r = FA.ratios();
  ul.innerHTML = `
    <li>Gross Margin: ${ (r.grossMargin*100).toFixed(2) }%</li>
    <li>Net Margin: ${ (r.netMargin*100).toFixed(2) }%</li>
    <li>ROA: ${ (r.roa*100).toFixed(2) }%</li>
    <li>ROE: ${ (r.roe*100).toFixed(2) }%</li>
    <li>Liquidity (A/L): ${ (r.liquidity).toFixed(2) }</li>
  `;
}

function renderForecast(){
  const ctx = document.getElementById('forecastChart')?.getContext('2d'); if(!ctx) return;
  const r = FA.ratios();
  const base = r.revenue;
  // simple growth scenarios: conservative 3%, base 7%, optimistic 12%
  const labels = ['Year1','Year2','Year3'];
  const cons = [base*1.03, base*1.03*1.03, base*1.03*1.03*1.03];
  const baseArr = [base*1.07, base*Math.pow(1.07,2), base*Math.pow(1.07,3)];
  const opt = [base*1.12, base*Math.pow(1.12,2), base*Math.pow(1.12,3)];
  if(forecastChart) forecastChart.destroy();
  forecastChart = new Chart(ctx, {
    type:'line',
    data:{labels, datasets:[
      {label:'Conservative', data:cons, borderColor:'#999'},
      {label:'Base', data:baseArr, borderColor:'#1f77b4'},
      {label:'Optimistic', data:opt, borderColor:'#2ca02c'}
    ]}
  });
}

function renderSensitivity(){
  const ctx = document.getElementById('sensitivityChart')?.getContext('2d'); if(!ctx) return;
  const r = FA.ratios();
  const baseProfit = r.netProfit;
  const impacts = [0.9,0.95,1,1.05,1.1].map(f=> baseProfit * f);
  if(sensitivityChart) sensitivityChart.destroy();
  sensitivityChart = new Chart(ctx, {
    type:'bar',
    data:{
      labels:['-10%','-5%','Base','+5%','+10%'],
      datasets:[{label:'Net Profit Sensitivity', data:impacts, backgroundColor:'#1f77b4'}]
    }
  });
}

function refreshAll(){
  renderTable(); // from dataHandler
  renderBSChart();
  renderRatios();
  renderForecast();
  renderSensitivity();
  // update analysis area
  const ar = document.getElementById('analysisReports');
  if(ar){
    const inc = FA.incomeStatement(), bs = FA.balanceSheet();
    ar.innerHTML = `<div class="card">
      <h4>Income Statement</h4>
      <p>Revenue: ${formatMoney(inc.revenue)} | Net Profit: ${formatMoney(inc.netProfit)}</p>
    </div>
    <div class="card">
      <h4>Balance Sheet</h4>
      <p>Assets: ${formatMoney(bs.assets)} | Liabilities: ${formatMoney(bs.liabilities)}</p>
    </div>`;
  }
}

window.addEventListener('DOMContentLoaded', ()=>{ refreshAll(); });
window.addEventListener('storage', ()=>{ refreshAll(); });
window.addEventListener('currencyChanged', ()=>{ refreshAll(); });
