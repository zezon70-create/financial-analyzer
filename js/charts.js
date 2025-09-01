// charts.js - rendering charts: forecast, sensitivity, compare
let forecastChart = null;
let sensitivityChart = null;
let compareChart = null;
window.MC_RESULTS = [];

function renderForecastChart(history, forecast){
  const ctx = document.getElementById('forecastChart').getContext('2d');
  const labels = history.map((_,i)=>`t${i+1}`).concat(forecast.map((_,i)=>`f${i+1}`));
  const dataHist = history.concat(Array(forecast.length).fill(null));
  const dataFc = Array(history.length).fill(null).concat(forecast);
  if(forecastChart) forecastChart.destroy();
  forecastChart = new Chart(ctx, {
    type:'line',
    data:{ labels, datasets:[
      {label:'History', data:dataHist, borderColor:'#999', backgroundColor:'rgba(0,0,0,0)', tension:0.2},
      {label:'Forecast', data:dataFc, borderColor:'#1f77b4', backgroundColor:'rgba(31,119,180,0.06)', tension:0.2}
    ]},
    options:{responsive:true, maintainAspectRatio:false}
  });
}

function renderSensitivityHistogram(results){
  window.MC_RESULTS = results;
  const buckets = 12;
  const min = Math.min(...results), max = Math.max(...results);
  const step = (max - min)/buckets || 1;
  const counts = Array(buckets).fill(0);
  results.forEach(v=>{
    let idx = Math.floor((v - min)/step); if(idx<0) idx=0; if(idx>=buckets) idx=buckets-1; counts[idx]++;
  });
  const labels = counts.map((_,i)=> Math.round(min + i*step));
  const ctx = document.getElementById('sensitivityChart').getContext('2d');
  if(sensitivityChart) sensitivityChart.destroy();
  sensitivityChart = new Chart(ctx, { type:'bar', data:{ labels, datasets:[{label:'Simulated Net Profit', data:counts}]}, options:{responsive:true} });
}

function renderCompareChart(values, labels){
  const ctx = document.getElementById('compareChart').getContext('2d');
  if(compareChart) compareChart.destroy();
  compareChart = new Chart(ctx, { type:'bar', data:{ labels, datasets:[{label:'Comparison', data:values}]}, options:{responsive:true} });
}
