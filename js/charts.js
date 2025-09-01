// charts.js
let bsChart, forecastChart, sensitivityChart;

function renderBSChart(){
  const ctx = document.getElementById('bsChart')?.getContext('2d');
  if(!ctx) return;
  const bs = FA.balanceSheet();
  if(bsChart) bsChart.destroy();
  bsChart = new Chart(ctx, { type:'doughnut', data:{ labels:['Assets','Liabilities','Equity'], datasets:[{data:[bs.assets, bs.liabilities, bs.equity]}] }});
}

function renderRatios(){
  const ul = document.getElementById('keyRatios'); if(!ul) return;
  const r = FA.ratios();
  ul.innerHTML = `<li>Gross Margin: ${(r.grossMargin*100).toFixed(2)}%</li><li>Net Margin: ${(r.netMargin*100).toFixed(2)}%</li><li>ROA: ${(r.roa*100).toFixed(2)}%</li><li>ROE: ${(r.roe*100).toFixed(2)}%</li><li>Liquidity: ${r.liquidity.toFixed(2)}</li>`;
}

function renderForecastHistoryAndForecast(hist, forecast){
  const ctx = document.getElementById('forecastChart')?.getContext('2d'); if(!ctx) return;
  const labels = hist.map((_,i)=>`t${i+1}`).concat(forecast.map((_,i)=>`f${i+1}`));
  const dataHist = hist.concat(Array(forecast.length).fill(null));
  const dataFc = Array(hist.length).fill(null).concat(forecast);
  if(forecastChart) forecastChart.destroy();
  forecastChart = new Chart(ctx, { type:'line', data:{ labels, datasets:[{label:'History',data:dataHist},{label:'Forecast',data:dataFc}] }});
}

function renderSensitivity(){
  const ctx = document.getElementById('sensitivityChart')?.getContext('2d'); if(!ctx) return;
  const r = FA.ratios();
  const baseProfit = r.netProfit || 0;
  const impacts = [0.9,0.95,1,1.05,1.1].map(f=> baseProfit * f);
  if(sensitivityChart) sensitivityChart.destroy();
  sensitivityChart = new Chart(ctx, { type:'bar', data:{ labels:['-10%','-5%','Base','+5%','+10%'], datasets:[{label:'Net Profit Sensitivity', data:impacts}] }});
}

function refreshAll(){
  renderTable?.(); renderBSChart(); renderRatios(); renderSensitivity();
  const hist = JSON.parse(localStorage.getItem('FA_HIST_REVENUE')) || Array.from({length:8},(_,i)=> FA.ratios().revenue * Math.pow(1.03,i));
  const forecast = autoARIMAForecast(hist, 6);
  renderForecastHistoryAndForecast(hist, forecast);
  const ar = document.getElementById('analysisReports');
  if(ar){ const inc = FA.incomeStatement(); const bs = FA.balanceSheet(); ar.innerHTML = `<div class="card"><h4>Income Statement</h4><p>Revenue: ${formatMoney(inc.revenue)} | Net Profit: ${formatMoney(inc.netProfit)}</p></div><div class="card"><h4>Balance Sheet</h4><p>Assets: ${formatMoney(bs.assets)} | Liabilities: ${formatMoney(bs.liabilities)}</p></div>`; }
}

window.addEventListener('storage', ()=> refreshAll());
window.addEventListener('currencyChanged', ()=> refreshAll());
document.addEventListener('DOMContentLoaded', ()=> refreshAll());
