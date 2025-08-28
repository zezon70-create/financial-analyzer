const CH = { revenue:null, profit:null, structure:null, compare:null };

function renderDashboardCharts(statementsObj){
  if(!statementsObj) return;
  const years = Object.keys(statementsObj.statements);
  const revenues = years.map(y=>statementsObj.statements[y].revenue);
  const profits = years.map(y=>statementsObj.statements[y].netIncome);

  // revenue
  const ctxR = document.getElementById('chartRevenue')?.getContext('2d');
  if(ctxR){
    if(CH.revenue) CH.revenue.destroy();
    CH.revenue = new Chart(ctxR, { type:'bar', data:{ labels:years, datasets:[{label:'Revenue',data:revenues, backgroundColor:'#1f6feb'}] }});
  }

  // profit
  const ctxP = document.getElementById('chartProfit')?.getContext('2d');
  if(ctxP){
    if(CH.profit) CH.profit.destroy();
    CH.profit = new Chart(ctxP, { type:'line', data:{ labels:years, datasets:[{label:'Net Profit',data:profits, borderColor:'#ff8a65', fill:false}] }});
  }

  // structure latest
  const latest = years[years.length-1];
  const st = statementsObj.statements[latest];
  const ctxS = document.getElementById('chartStructure')?.getContext('2d');
  if(ctxS){
    if(CH.structure) CH.structure.destroy();
    CH.structure = new Chart(ctxS, { type:'doughnut', data:{ labels:['Assets','Liabilities','Equity'], datasets:[{ data:[st.assets, st.liabilities, st.equity], backgroundColor:['#1f6feb','#ff8a65','#9ad17d'] }] }});
  }
}

function renderComparisonChart(years, values, label){
  const container = document.getElementById('compareChart');
  if(!container) return;
  container.innerHTML = '<canvas id="comparisonCanvas"></canvas>';
  const ctx = document.getElementById('comparisonCanvas').getContext('2d');
  if(CH.compare) CH.compare.destroy();
  CH.compare = new Chart(ctx, { type:'bar', data:{ labels:years, datasets:[{ label: label || 'Metric', data: values, backgroundColor:'#7b61ff'}] }});
}
