function classifyAccount(name, userMap={}){
  const n = (name||"").toLowerCase();
  // If user mapped manually, prefer that
  if(userMap && userMap[name]) return userMap[name];
  if(/cash|bank|inventory|receiv|asset|accounts receivable|stock|deposit/.test(n)) return 'asset';
  if(/payable|liab|loan|debt|accounts payable|creditor|liability|mortgage/.test(n)) return 'liability';
  if(/equity|capital|retained|owner|share/.test(n)) return 'equity';
  if(/revenue|sales|income|turnover|fees/.test(n)) return 'revenue';
  if(/cost|cogs|expense|expenses|salar|rent|utility|tax|depreciation/.test(n)) return 'expense';
  return 'other';
}

function buildStatements(trial, userMap={}, defaultYear='no-year'){
  const years = Array.from(new Set(trial.map(r=>r.year).filter(Boolean)));
  const result = {years: years.length ? years : [defaultYear], statements:{}};

  function processForYear(y){
    const rows = y===defaultYear ? trial : trial.filter(r=>String(r.year)==String(y));
    let assets=0, liabilities=0, equity=0, revenue=0, expenses=0;
    rows.forEach(r=>{
      const cls = classifyAccount(r.account, userMap);
      const net = (r.debit||0) - (r.credit||0);
      if(cls==='asset') assets += net;
      else if(cls==='liability') liabilities += -net;
      else if(cls==='equity') equity += -net;
      else if(cls==='revenue') revenue += -net;
      else if(cls==='expense') expenses += net;
    });
    const netIncome = revenue - expenses;
    return {
      assets: round(assets),
      liabilities: round(liabilities),
      equity: round(equity),
      revenue: round(revenue),
      expenses: round(expenses),
      netIncome: round(netIncome)
    };
  }

  if(result.years[0]===defaultYear) result.statements[defaultYear]=processForYear(defaultYear);
  else result.years.forEach(y=> result.statements[y]=processForYear(y));

  return result;
}

function computeRatios(stmt){
  const currentRatio = safeDiv(stmt.assets, stmt.liabilities);
  const debtToEquity = safeDiv(stmt.liabilities, stmt.equity);
  const roa = safeDiv(stmt.netIncome, stmt.assets) * 100;
  const roe = safeDiv(stmt.netIncome, stmt.equity) * 100;
  const profitMargin = safeDiv(stmt.netIncome, stmt.revenue) * 100;
  return {
    currentRatio: round(currentRatio,2),
    debtToEquity: round(debtToEquity,2),
    roa: round(roa,2),
    roe: round(roe,2),
    profitMargin: round(profitMargin,2)
  };
}

function computeEVA(stmt, waccPct=10){
  const nopat = stmt.netIncome; 
  const capital = stmt.assets;
  const wacc = waccPct/100;
  const eva = nopat - (capital * wacc);
  return round(eva,2);
}

function computeRiskReturnFromSeries(series){
  if(!series || series.length===0) return {mean:0,std:0};
  const mean = series.reduce((a,b)=>a+b,0)/series.length;
  const varr = series.reduce((s,x)=>s + Math.pow(x-mean,2),0)/series.length;
  const std = Math.sqrt(varr);
  return {mean: round(mean,2), std: round(std,2)};
}

function forecastSeriesLinear(values, yearsAhead, growthRate=null){
  // If growthRate provided use it, else compute average growth from values
  let base = values[values.length-1] || 0;
  let rate = growthRate;
  if(rate===null && values.length>1){
    const grows = [];
    for(let i=1;i<values.length;i++){
      const prev=values[i-1]||1; grows.push((values[i]-prev)/Math.abs(prev));
    }
    rate = grows.reduce((a,b)=>a+b,0)/grows.length;
  }
  if(!rate) rate = 0.05;
  const res=[];
  for(let i=1;i<=yearsAhead;i++){
    base = base*(1+rate);
    res.push(round(base,2));
  }
  return res;
}

/* Helpers */
function safeDiv(a,b){ if(!b || b===0) return 0; return a/b; }
function round(v,dec=0){ return Number((Number(v)||0).toFixed(dec)); }
