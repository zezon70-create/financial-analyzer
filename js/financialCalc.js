// financialCalc.js
// Input: FA_DATA array [{account,debit,credit}]
// We will synthesize basic financial statements by mapping accounts to categories.
// In production you'd let user map accounts to categories; here we do simple rules + fallback totals.

function totals(){
  const data = FA_DATA || [];
  const totalsObj = {debit:0, credit:0};
  data.forEach(r=>{ totalsObj.debit += Number(r.debit||0); totalsObj.credit += Number(r.credit||0); });
  return totalsObj;
}

// simple mapping heuristics (extends as needed)
function classify(){
  const map = {revenue:0,cogs:0,expenses:0,assets:0,liabilities:0,equity:0};
  FA_DATA.forEach(r=>{
    const a = r.account.toLowerCase();
    const net = (Number(r.credit||0) - Number(r.debit||0)); // credit positive revenue/liability
    if(/sales|revenue|income/.test(a)) map.revenue += Math.abs(net);
    else if(/cost|cogs|inventory/.test(a)) map.cogs += Math.abs(net);
    else if(/expense|salary|rent|utility|operat/.test(a)) map.expenses += Math.abs(net);
    else if(/cash|bank|receivable|asset/.test(a)) map.assets += Number(r.debit||0) - Number(r.credit||0);
    else if(/payable|loan|liabilit|credit/.test(a)) map.liabilities += Number(r.credit||0) - Number(r.debit||0);
    else if(/equity|capital|retained/.test(a)) map.equity += Number(r.credit||0) - Number(r.debit||0);
    else {
      // fallback: put credits into revenue, debits into assets
      if(Number(r.credit||0) > Number(r.debit||0)) map.revenue += (Number(r.credit)-Number(r.debit));
      else map.assets += (Number(r.debit)-Number(r.credit));
    }
  });
  return map;
}

// Build Income Statement
function incomeStatement(){
  const c = classify();
  const grossProfit = c.revenue - c.cogs;
  const operatingProfit = grossProfit - c.expenses;
  const netProfit = operatingProfit; // taxes/interest omitted for simplicity
  return {revenue:c.revenue, cogs:c.cogs, grossProfit, expenses:c.expenses, operatingProfit, netProfit};
}

// Balance sheet (simplified)
function balanceSheet(){
  const c = classify();
  const assets = c.assets;
  const liabilities = c.liabilities;
  const equity = c.equity || (assets - liabilities);
  return {assets, liabilities, equity};
}

// Cash Flow (rough) - not precise without proper mapping; here we estimate
function cashFlow(){
  // approximate: change in cash = net of asset movements (cash) - investments omitted
  const bs = balanceSheet();
  return {cashFlowFromOperations: incomeStatement().operatingProfit, netChangeCash: bs.assets - 0};
}

// RATIOS
function ratios(){
  const inc = incomeStatement();
  const bs = balanceSheet();
  const revenue = inc.revenue || 1;
  const netProfit = inc.netProfit || 0;
  const grossMargin = revenue? (inc.grossProfit / revenue) : 0;
  const netMargin = revenue? (netProfit / revenue) : 0;
  const roa = bs.assets? (netProfit / bs.assets) : 0;
  const roe = bs.equity? (netProfit / bs.equity) : 0;
  const liquidity = bs.liabilities? (bs.assets / bs.liabilities) : 0;
  return {grossMargin, netMargin, roa, roe, liquidity, revenue, netProfit};
}

// EVA: NOPAT - WACC*Capital
function calculateEVA(WACC=0.08, capital=null){
  const inc = incomeStatement();
  const nopat = inc.operatingProfit; // approximation
  const bs = balanceSheet();
  const cap = capital || (bs.assets - bs.liabilities);
  return nopat - (cap * WACC);
}

// NPV simple: cashflows array and discount rate
function npv(cashflows, rate){
  if(!Array.isArray(cashflows)) return null;
  return cashflows.reduce((acc,cf,i)=> acc + cf / Math.pow(1+rate, i+1), 0);
}
// IRR approximate via Newton or binary search
function irr(cashflows, guess=0.1){
  // use binary search between -0.99 and 1.0
  let low=-0.99, high=1.0, mid=guess;
  function npvRate(r){
    return cashflows.reduce((s,cf,i)=> s + cf / Math.pow(1+r,i+1),0);
  }
  for(let i=0;i<60;i++){
    mid=(low+high)/2;
    const val = npvRate(mid);
    if(val>0) low=mid; else high=mid;
  }
  return mid;
}

// Break-even: fixedCosts / contributionMargin per unit (we need unit price and variable cost)
function breakEven(fixedCosts, pricePerUnit, variableCostPerUnit){
  const contrib = pricePerUnit - variableCostPerUnit;
  if(contrib<=0) return Infinity;
  return fixedCosts / contrib;
}

// Expose
window.FA = {
  totals, classify, incomeStatement, balanceSheet, cashFlow, ratios,
  calculateEVA, npv, irr, breakEven
};
