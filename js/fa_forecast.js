
// Simple forecasting utilities: linear regression and metrics
function linearRegressionForecast(series, steps=3){
  // series: array of numbers (chronological)
  const n = series.length;
  if(n<2) return {forecast:[], model:null};
  // x = 0..n-1
  const x = Array.from({length:n}, (_,i)=>i);
  const y = series.map(v=>Number(v));
  const xmean = x.reduce((a,b)=>a+b,0)/n;
  const ymean = y.reduce((a,b)=>a+b,0)/n;
  let num=0, den=0;
  for(let i=0;i<n;i++){
    num += (x[i]-xmean)*(y[i]-ymean);
    den += (x[i]-xmean)*(x[i]-xmean);
  }
  const slope = num/den;
  const intercept = ymean - slope*xmean;
  const forecast = [];
  for(let s=1;s<=steps;s++){
    const xf = n-1 + s;
    forecast.push(intercept + slope*xf);
  }
  return {forecast, model:{slope, intercept}};
}
function computeMAPE(actual, predicted){
  if(actual.length!==predicted.length) return null;
  let sum=0;
  for(let i=0;i<actual.length;i++){
    const a = Number(actual[i]); const p = Number(predicted[i]);
    if(a===0) continue;
    sum += Math.abs((a-p)/a);
  }
  return (sum/actual.length)*100;
}
function computeRMSE(actual, predicted){
  if(actual.length!==predicted.length) return null;
  let sum=0;
  for(let i=0;i<actual.length;i++){
    const a = Number(actual[i]); const p = Number(predicted[i]);
    sum += (a-p)*(a-p);
  }
  return Math.sqrt(sum/actual.length);
}
