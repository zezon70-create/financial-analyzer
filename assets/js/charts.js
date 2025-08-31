/* charts.js - Chart.js rendering with zoom/pan support */
let chart1, chart2, chart3, compChart;

function initChartsIfNeeded(){
  const ctx1 = document.getElementById('chart1')?.getContext('2d');
  const ctx2 = document.getElementById('chart2')?.getContext('2d');
  const ctx3 = document.getElementById('chart3')?.getContext('2d');
  if(ctx1 && !chart1){
    chart1 = new Chart(ctx1, {
      type: 'doughnut',
      data: { labels:['Assets','Liabilities','Equity'], datasets:[{ data:[1,1,1]}] },
      options: { responsive:true, plugins:{legend:{position:'bottom'}, zoom:{zoom:{wheel:{enabled:true},mode:'xy'}}} }
    });
  }
  if(ctx2 && !chart2){
    chart2 = new Chart(ctx2, {
      type: 'bar',
      data: { labels:[], datasets:[{ label:'Revenue', data:[] }, { label:'Expenses', data:[] }] },
      options: { responsive:true, plugins:{zoom:{pan:{enabled:true,mode:'x'},zoom:{wheel:{enabled:true},mode:'x'}}} }
    });
  }
  if(ctx3 && !chart3){
    chart3 = new Chart(ctx3, {
      type: 'line',
      data: { labels:[], datasets:[{ label:'Net Income', data:[], tension:0.3 }] },
      options: { responsive:true, plugins:{zoom:{pan:{enabled:true,mode:'x'},zoom:{wheel:{enabled:true},mode:'x'}}} }
    });
  }
}

function updateCharts(data){
  initChartsIfNeeded();
  if(!data) return;
  if(chart1){
    chart1.data.datasets[0].data = [data.totalAssets||0, data.totalLiabilities||0, data.totalEquity||0];
    chart1.update();
  }
  const years = Object.keys(data.revByYear || {});
  if(chart2){
    chart2.data.labels = years.length ? years : ['No Data'];
    chart2.data.datasets[0].data = years.map(y => Math.abs(data.revByYear[y]||0));
    chart2.data.datasets[1].data = years.map(_ => 0);
    chart2.update();
  }
  if(chart3){
    chart3.data.labels = years.length ? years : ['No Data'];
    chart3.data.datasets[0].data = years.map(y => (data.revByYear[y]||0));
    chart3.update();
  }
}

function initComparisonChart(){
  const ctx = document.getElementById('compChart')?.getContext('2d');
  if(!ctx) return;
  compChart = new Chart(ctx, {
    type: 'bar',
    data: { labels: [], datasets: [] },
    options: { responsive:true, plugins:{legend:{position:'bottom'}} }
  });
}

function renderComparison(years, revByYear){
  initComparisonChart();
  if(!compChart) return;
  const labels = Object.keys(revByYear);
  compChart.data.labels = labels;
  compChart.data.datasets = years.map((yr,idx)=>{
    return {
      label: yr,
      data: labels.map(l => (l === String(yr) ? (revByYear[l]||0) : 0)),
      backgroundColor: `hsl(${(idx*60) % 360} 70% 50%)`
    };
  });
  compChart.update();
}

document.addEventListener('DOMContentLoaded', ()=>{
  initChartsIfNeeded();
  if(location.pathname.endsWith('comparison.html')){
    const tb = loadTB();
    const revByYear = {};
    tb.forEach(r=>{
      if((r.code||'').toString().startsWith('4')){
        const m = (r.name||'').match(/(\d{4})$/);
        if(m){ revByYear[m[1]] = (revByYear[m[1]]||0) + (Number(r.credit)||0) - (Number(r.debit)||0); }
      }
    });
    const years = Object.keys(revByYear).sort();
    const sel = document.getElementById('yearsSelect');
    years.forEach(y => {
      const o = document.createElement('option'); o.value = y; o.textContent = y; sel.appendChild(o);
    });

    document.getElementById('compareBtn')?.addEventListener('click', ()=>{
      const selected = Array.from(sel.selectedOptions).map(o=>o.value);
      if(selected.length === 0){ alert('Select years'); return; }
      const fullRev = {};
      years.forEach(y => fullRev[y] = revByYear[y] || 0);
      renderComparison(selected, fullRev);
      const summary = selected.map(y => `${y}: ${(fullRev[y]||0).toLocaleString()}`).join('\n');
      document.getElementById('compSummary').textContent = summary;
    });

    document.getElementById('clearCompareBtn')?.addEventListener('click', ()=> sel.selectedIndex = -1);
  }
});