// financialCalc.js
function classify(){
  const map = {revenue:0,cogs:0,expenses:0,assets:0,liabilities:0,equity:0};
  const data = (typeof FA_DATA !== 'undefined') ? FA_DATA : (JSON.parse(localStorage.getItem('FA_DATA_v1'))||[]);
  data.forEach(r=>{
    const a = (r.account||'').toString().toLowerCase();
    const net = (Number(r.credit||0) - Number(r.debit||0));
    if(/sale|revenue|income|مبيعات|ايراد|إيراد/.test(a)) map.revenue += Math.abs(net);
    else if(/cost|cogs|inventory|تكلفة|مخزون/.test(a)) map.cogs += Math.abs(net);
    else if(/expense|salary|rent|utility|مصروف|مصاريف|أجور|إيجار/.test(a)) map.expenses += Math.abs(net);
    else if(/cash|bank|receivable|asset|نقد|بنك|مدين|اوراق قبض/.test(a)) map.assets += Number(r.debit||0) - Number(r.credit||0);
    else if(/payable|loan|liabilit|credit|دائن|قروض|مطلوبات/.test(a)) map.liabilities += Number(r.credit||0) - Number(r.debit||0);
    else if(/equity|capital|retained|رأس المال|احتياطي/.test(a)) map.equity += Number(r.credit||0) - Number(r.debit||0);
    else { if(Number(r.credit||0) > Number(r.debit||0)) map.revenue += (Number(r.credit)-Number(r.debit)); else map.assets += (Number(r.debit)-Number(r.credit)); }
  });
  Object.keys(map).forEach(k=> map[k] = Number(map[k] || 0));
  return map;
}

function incomeStatement(){
  const c = classify();
  const revenue = c.revenue, cogs = c.cogs, grossProfit = revenue - cogs, expenses = c.expenses, operatingProfit = grossProfit - expenses, netProfit = operatingProfit;
  return {revenue,cogs,grossProfit,expenses,operatingProfit,netProfit};
}

function balanceSheet(){
  const c = classify();
  const assets = c.assets, liabilities = c.liabilities, equity = c.equity || (assets-liabilities);
  return {assets,liabilities,equity};
}

function cashFlow(){
  const inc = incomeStatement(); const bs = balanceSheet();
  return {cashFlowFromOperations: inc.operatingProfit, netChangeCash: bs.assets};
}

function ratios(){
  const inc = incomeStatement(), bs = balanceSheet();
  const revenue = inc.revenue || 1; const netProfit = inc.netProfit || 0;
  const grossMargin = revenue? (inc.grossProfit / revenue) : 0;
  const netMargin = revenue? (netProfit / revenue) : 0;
  const roa = bs.assets? (netProfit / bs.assets) : 0;
  const roe = bs.equity? (netProfit / bs.equity) : 0;
  const liquidity = bs.liabilities? (bs.assets / bs.liabilities) : 0;
  return {grossMargin, netMargin, roa, roe, liquidity, revenue, netProfit};
}

function calculateEVA(WACC=0.08, capital=null){
  const inc = incomeStatement(); const nopat = inc.operatingProfit; const bs = balanceSheet(); const cap = capital || (bs.assets - bs.liabilities);
  return nopat - (cap * WACC);
}

function npv(cashflows, rate){
  if(!Array.isArray(cashflows)) return null;
  return cashflows.reduce((acc,cf,i)=> acc + cf / Math.pow(1+rate, i+1), 0);
}

function irrSimple(cashflows){
  let low=-0.9999, high=10, mid=0;
  function f(r){ return cashflows.reduce((s,cf,i)=> s + cf / Math.pow(1+r,i), 0); }
  for(let i=0;i<100;i++){ mid=(low+high)/2; if(f(mid) > 0) low=mid; else high=mid; }
  return mid;
}

window.FA = { classify, incomeStatement, balanceSheet, cashFlow, ratios, calculateEVA, npv, irrSimple };
