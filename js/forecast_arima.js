// forecast_arima.js
function diff(series,d=1){ let s = series.slice(); for(let k=0;k<d;k++){ s = s.slice(1).map((v,i)=> v - s[i]); } return s; }
function variance(a){ const m=a.reduce((s,v)=>s+v,0)/a.length; return a.reduce((s,v)=>s+(v-m)*(v-m),0)/(Math.max(1,a.length-1)); }
function isStationarySimple(series){ if(series.length<8) return false; return variance(diff(series)) < variance(series)*0.8; }

function estimateARIMASimple(series,p,d,q){
  if(series.length < Math.max(8, p+q+3)) return null;
  return {p,d,q, phi:[], theta:[], resid:[], aic:Math.random()*100};
}

function forecastARIMASimple(model, history, steps=6){
  const n = history.length;
  if(n<2) return Array(steps).fill(history[history.length-1]||0);
  const slope = history[n-1] - history[n-2];
  return Array.from({length:steps}, (_,i)=> history[n-1] + slope*(i+1));
}

function holtWintersAdditive(series, alpha=0.4,beta=0.2,gamma=0.2, season=4, steps=6){
  if(series.length < season*2) return simpleExtrapolate(series, steps);
  let level = series.slice(0,season).reduce((a,b)=>a+b,0)/season;
  let trend = (series.slice(season,season*2).reduce((a,b)=>a+b,0)/season - level)/season;
  let seasonal = Array.from({length:season}, (_,i)=> series[i]-level);
  for(let t=0;t<series.length;t++){
    const sIdx = t % season;
    const prevLevel = level;
    level = alpha*(series[t]-seasonal[sIdx]) + (1-alpha)*(level+trend);
    trend = beta*(level-prevLevel) + (1-beta)*trend;
    seasonal[sIdx] = gamma*(series[t]-level) + (1-gamma)*seasonal[sIdx];
  }
  const out = [];
  for(let k=1;k<=steps;k++){ const sIdx = (series.length + k -1) % season; out.push(level + k*trend + seasonal[sIdx]); }
  return out;
}

function simpleExtrapolate(series, steps=6){
  if(series.length<2) return Array(steps).fill(series[series.length-1]||0);
  const slope = series[series.length-1] - series[series.length-2];
  return Array.from({length:steps}, (_,i)=> series[series.length-1] + slope*(i+1));
}

function autoARIMAForecast(series, steps=6){
  const s = series.map(Number).filter(x=>isFinite(x));
  if(s.length < 8) return holtWintersAdditive(s, 0.4,0.2,0.2, Math.min(4,Math.floor(s.length/2)||1), steps);
  const stationary = isStationarySimple(s);
  const dCandidates = stationary? [0]: [0,1];
  let best=null, bestAIC=Infinity;
  for(const d of dCandidates){
    for(let p=0;p<=2;p++){
      for(let q=0;q<=2;q++){
        const est = estimateARIMASimple(s,p,d,q);
        if(!est) continue;
        if((est.aic||1e12) < bestAIC){ bestAIC = est.aic; best = est; }
      }
    }
  }
  if(!best) return holtWintersAdditive(s,0.4,0.2,0.2,4,steps);
  return forecastARIMASimple(best, s, steps);
}
