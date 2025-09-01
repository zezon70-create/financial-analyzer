// calculations.js
// Functions: computeIncomeStatement(data), computeBalanceSheet(data), computeCashFlow(data), computeRatiosAll(inc, bs)
// plus financial helpers: irr, xirr, mirr, npv, calculateEVA, breakEven

function computeIncomeStatement(data){
  // data: [{account,debit,credit,custom}]
  const map = classify(data);
  const revenue = map.revenue || 0;
  const cogs = map.cogs || 0;
  const grossProfit = revenue - cogs;
  const expenses = map.expenses || 0;
  const operatingProfit = grossProfit - expenses;
  const netProfit = operatingProfit;
  return {revenue,cogs,grossProfit,expenses,operatingProfit,netProfit};
}

function computeBalanceSheet(data){
  const map = classify(data);
  const assets = map.assets || 0;
  const liabilities = map.liabilities || 0;
  const equity = map.equity || (assets - liabilities);
  return {assets,liabilities,equity};
}

function computeCashFlow(data){
  const inc = computeIncomeStatement(data);
  const bs = computeBalanceSheet(data);
  // simplified: operations = operatingProfit; investing & financing not derived from TB automatically
  return {cashOps: inc.operatingProfit, netChange: bs.assets};
}

function computeRatiosAll(inc, bs){
  const revenue = inc.revenue || 1;
  const netProfit = inc.netProfit || 0;
  const grossMargin = revenue ? (inc.grossProfit / revenue) : 0;
  const netMargin = revenue ? (netProfit / revenue) : 0;
  const roa = bs.assets ? (netProfit / bs.assets) : 0;
  const roe = bs.equity ? (netProfit / bs.equity) : 0;
  const liquidity = bs.liabilities ? (bs.assets / bs.liabilities) : 0;
  return {grossMargin, netMargin, roa, roe, liquidity, revenue, netProfit};
}

// classify helper (same heuristics)
function classify(data){
  const map = {revenue:0,cogs:0,expenses:0,assets:0,liabilities:0,equity:0};
  data.forEach(r=>{
    const a = (r.account||'').toString().toLowerCase();
    const debit = Number(r.debit||0), credit = Number(r.credit||0);
    const net = credit - debit;
    if(/sale|revenue|income|مبيعات|ايراد|إيراد/.test(a)) map.revenue += Math.abs(net);
    else if(/cost|cogs|inventory|تكلفة|مخزون/.test(a)) map.cogs += Math.abs(net);
    else if(/expense|salary|rent|utility|مصروف|مصاريف|أجور|إيجار/.test(a)) map.expenses += Math.abs(net);
    else if(/cash|bank|receivable|asset|نقد|بنك|مدين/.test(a)) map.assets += (debit - credit);
    else if(/payable|loan|liabilit|credit|دائن|قروض|مطلوبات/.test(a)) map.liabilities += (credit - debit);
    else if(/equity|capital|retained|رأس المال|احتياطي/.test(a)) map.equity += (credit - debit);
    else { if(credit > debit) map.revenue += (credit - debit); else map.assets += (debit - credit); }
  });
  Object.keys(map).forEach(k=> map[k] = Number(map[k] || 0));
  return map;
}

// Financial helpers
function npv(cashflows, rate){
  return cashflows.reduce((acc, cf, i)=> acc + cf / Math.pow(1+rate, i), 0);
}
function irrRobust(cashflows){
  // Newton-Raphson with multiple guesses + bisection fallback
  function f(r){ return npv(cashflows, r); }
  function derivative(r){ let s=0; for(let i=1;i<cashflows.length;i++) s += -i * cashflows[i] / Math.pow(1+r, i+1); return s; }
  function newton(guess){
    let r = guess;
    for(let i=0;i<80;i++){
      const val = f(r); const d = derivative(r) || 1e-8;
      const r1 = r - val/d;
      if(!isFinite(r1)) break;
      if(Math.abs(r1-r) < 1e-9) return r1;
      r = Math.max(-0.9999, Math.min(10, r1));
    }
    return null;
  }
  const guesses = [-0.5,-0.2,0,0.05,0.1,0.2];
  let best = null, bestAbs = Infinity;
  for(const g of guesses){ const r = newton(g); if(r===null) continue; const val = Math.abs(f(r)); if(val < bestAbs){ bestAbs = val; best = r; } }
  if(best !== null) return best;
  // bisection fallback
  let lo = -0.9999, hi = 10, flo = f(lo), fhi = f(hi);
  for(let i=0;i<200;i++){
    const mid = (lo+hi)/2; const fm = f(mid);
    if(Math.abs(fm) < 1e-8) return mid;
    if(Math.sign(fm) === Math.sign(flo)){ lo = mid; flo = fm; } else { hi = mid; fhi = fm; }
  }
  return (lo+hi)/2;
}

// xirr: cashflows is [{date:Date, amount:Number}]
function xnpv(cashflows, rate){
  const t0 = cashflows[0].date.getTime();
  return cashflows.reduce((s,cf)=> s + cf.amount / Math.pow(1+rate, (cf.date.getTime()-t0)/(365.25*24*3600*1000)), 0);
}
function xirr(cashflows){
  function f(r){ return xnpv(cashflows, r); }
  function dfdx(r){ const t0 = cashflows[0].date.getTime(); return cashflows.reduce((s,cf)=> { const yrs = (cf.date.getTime()-t0)/(365.25*24*3600*1000); return s + (-yrs) * cf.amount / Math.pow(1+r, yrs+1); }, 0); }
  function newton(guess){
    let r = guess; for(let i=0;i<80;i++){ const fr = f(r); const d = dfdx(r) || 1e-8; const r1 = r - fr/d; if(!isFinite(r1)) break; if(Math.abs(fr) < 1e-9) return r; r = Math.max(-0.9999, Math.min(10, r1)); } return null;
  }
  const guesses = [-0.5,0,0.05,0.1];
  let best=null, bestAbs=Infinity;
  for(const g of guesses){ const r=newton(g); if(r===null) continue; const val=Math.abs(f(r)); if(val < bestAbs){ bestAbs = val; best = r; } }
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

function calculateEVA(nopat, capital, wacc=0.08){
  return nopat - (capital * wacc);
}

function breakEven(fixedCosts, pricePerUnit, varCostPerUnit){
  if(pricePerUnit - varCostPerUnit === 0) return Infinity;
  return fixedCosts / (pricePerUnit - varCostPerUnit);
}

// export functions
window.computeIncomeStatement = computeIncomeStatement;
window.computeBalanceSheet = computeBalanceSheet;
window.computeCashFlow = computeCashFlow;
window.computeRatiosAll = computeRatiosAll;
window.irrRobust = irrRobust;
window.xirr = xirr;
window.mirr = mirr;
window.calculateEVA = calculateEVA;
window.breakEven = breakEven;
