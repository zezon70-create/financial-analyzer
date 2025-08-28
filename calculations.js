// calculations.js
function classifyAccount(name, userMap={}){
  const n = (name||'').toLowerCase();
  if(userMap && userMap[name]) return userMap[name];
  if(/cash|bank|inventory|receiv|asset|accounts receivable|stock|deposit|petty cash/.test(n)) return 'asset';
  if(/payable|liab|loan|debt|accounts payable|creditor|liability|mortgage/.test(n)) return 'liability';
  if(/equity|capital|retained|owner|share/.test(n)) return 'equity';
  if(/revenue|sales|income|turnover|fees|service/.test(n)) return 'revenue';
  if(/cost|cogs|expense|expenses|salar|wages|rent|utility|tax|depreciation|amortization/.test(n)) return 'expense';
  return 'other';
}

function buildStatementsFromRows(rows, userMap = {}){
  const years = Array.from(new Set(rows.map(r=>r.year).filter(Boolean))).sort();
  const yearsList = years.length ? years : ['no-year'];
  const statements = {};
  yearsList.forEach(y=>{
    const rowsFor = (y === 'no-year') ? rows : rows.filter(r=>String(r.year)===String(y));
    let assets=0, liabilities=0, equity=0, revenue=0, expenses=0;
    rowsFor.forEach(r=>{
      const cls = classifyAccount(r.account, userMap);
      const net = Number(r.debit||0) - Number(r.credit||0);
      if(cls === 'asset') assets += net;
      else if(cls === 'liability') liabilities += -net;
      else if(cls === 'equity') equity += -net;
      else if(cls === 'revenue') revenue += -net;
      else if(cls === 'expense') expenses += net;
    });
    const netIncome = revenue - expenses;
    statements[y] = { assets: round(assets), liabilities: round(liabilities), equity: round(equity), revenue: round(revenue), expenses: round(expenses), netIncome: round(netIncome) };
  });
  return { years: yearsList, statements };
}

function computeRatios(stmt){
  const currentRatio = safeDiv(stmt.assets, stmt.liabilities);
  const debtToEquity = safeDiv(stmt.liabilities, stmt.equity);
  const roa = safeDiv(stmt.netIncome, stmt.assets) * 100;
  const roe = safeDiv(stmt.netIncome, stmt.equity) * 100;
  const netMargin = safeDiv(stmt.netIncome, stmt.revenue) * 100;
  return { currentRatio: round(currentRatio,2), debtToEquity: round(debtToEquity,2), roa: round(roa,2), roe: round(roe,2), netMargin: round(netMargin,2) };
}

function computeEVA(stmt, waccPct=10){
  const nopat = stmt.netIncome;
  const capital = stmt.assets;
  const wacc = waccPct/100;
  const eva = nopat - (capital * wacc);
  return round(eva,2);
}

function forecastSeriesLinear(values, yearsAhead, growthRate=null){
  let base = values[values.length-1] || 0;
  let rate = growthRate;
  if(rate === null && values.length > 1){
    const grows = [];
    for(let i=1;i<values.length;i++){
      const prev = values[i-1]||1;
      grows.push((values[i]-prev)/Math.max(Math.abs(prev),1));
    }
    rate = grows.reduce((a,b)=>a+b,0)/grows.length;
  }
  if(!rate) rate = 0.05;
  const out = [];
  for(let i=1;i<=yearsAhead;i++){
    base = base * (1 + rate);
    out.push(round(base,2));
  }
  return out;
}

/* helpers */
function safeDiv(a,b){ if(!b || b===0) return 0; return a/b; }
function round(v,dec=0){ return Number((Number(v)||0).toFixed(dec)); }

module.exports = { classifyAccount, buildStatementsFromRows, computeRatios, computeEVA, computeRiskReturnFromSeries:()=>({mean:0,std:0}), forecastSeriesLinear };
