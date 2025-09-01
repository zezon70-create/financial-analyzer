// advanced_irr.js
function npvRate(cashflows, rate){
  return cashflows.reduce((s,cf,i)=> s + cf / Math.pow(1+rate, i), 0);
}
function irrRobust(cashflows){
  function derivative(cashflows, r){ let sum=0; for(let t=1;t<cashflows.length;t++) sum += -t * cashflows[t] / Math.pow(1+r,t+1); return sum; }
  function newton(g){
    let r=g;
    for(let i=0;i<80;i++){ const f = npvRate(cashflows,r); const d = derivative(cashflows,r) || 1e-8; const r1 = r - f/d; if(!isFinite(r1)) break; if(Math.abs(r1-r) < 1e-9) return r1; r = Math.max(-0.99, Math.min(10, r1)); }
    return null;
  }
  const guesses = [-0.5,-0.2,0,0.05,0.1,0.2];
  let best=null, bestAbs=Infinity;
  for(const g of guesses){ const r = newton(g); if(r===null) continue; const val=Math.abs(npvRate(cashflows,r)); if(val < bestAbs){ bestAbs=val; best=r; } }
  if(best!==null) return best;
  let lo=-0.9999, hi=10, flo=npvRate(cashflows,lo), fhi=npvRate(cashflows,hi);
  for(let i=0;i<200;i++){ const mid=(lo+hi)/2, fm=npvRate(cashflows,mid); if(Math.abs(fm) < 1e-8) return mid; if(Math.sign(fm)===Math.sign(flo)){ lo = mid; flo = fm; } else { hi = mid; fhi = fm; } }
  return (lo+hi)/2;
}

function xnpv(cashflows, rate){
  const t0 = cashflows[0].date.getTime();
  return cashflows.reduce((s,cf)=> s + cf.amount / Math.pow(1+rate, (cf.date.getTime()-t0)/(365.25*24*3600*1000)), 0);
}
function xirrRobust(cashflows){
  function f(r){ return xnpv(cashflows, r); }
  function dfdx(r){ const t0 = cashflows[0].date.getTime(); return cashflows.reduce((s,cf)=>{ const years=(cf.date.getTime()-t0)/(365.25*24*3600*1000); return s + (-years)*cf.amount / Math.pow(1+r, years+1); }, 0); }
  function newton(g){ let r=g; for(let i=0;i<60;i++){ const fr=f(r); const d=dfdx(r)||1e-8; const r1 = r - fr/d; if(!isFinite(r1)) break; r = Math.max(-0.99, Math.min(10, r1)); if(Math.abs(fr) < 1e-9) break; } return r; }
  const guesses=[-0.5,0,0.05,0.1];
  let best=null, bestAbs=Infinity;
  for(const g of guesses){ const r=newton(g); const val=Math.abs(f(r)); if(val < bestAbs){ bestAbs = val; best = r; } }
  return best;
}

function mirr(cashflows, financeRate=0.1, reinvestRate=0.1){
  const n = cashflows.length-1;
  let pvNeg=0, fvPos=0;
  for(let t=0;t<=n;t++){
    const cf = cashflows[t];
    if(cf < 0) pvNeg += cf / Math.pow(1+financeRate, t);
    else fvPos += cf * Math.pow(1+reinvestRate, n-t);
  }
  return Math.pow(-fvPos/pvNeg, 1/n)-1;
}

window.FA_IRR = { irrRobust, xirrRobust, mirr };
