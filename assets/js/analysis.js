/* analysis.js - generate statements, ratios, EVA, projections */
function categorizeAccounts(tb){
  const assets=[], liabilities=[], equity=[], revenue=[], expenses=[];
  tb.forEach(r=>{
    const code = (r.code||'').toString();
    const bal = (Number(r.debit)||0) - (Number(r.credit)||0);
    if(code.startsWith('1')) assets.push({...r, bal});
    else if(code.startsWith('2')) liabilities.push({...r, bal});
    else if(code.startsWith('3')) expenses.push({...r, bal});
    else if(code.startsWith('4')) revenue.push({...r, bal});
    else if(code.startsWith('5')) equity.push({...r, bal});
    else { if(bal>0) assets.push({...r, bal}); else liabilities.push({...r, bal}); }
  });
  return {assets, liabilities, equity, revenue, expenses};
}

function generateStatementsAndAnalysis(){
  const tb = loadTB();
  const cat = categorizeAccounts(tb);
  const totalRevenue = cat.revenue.reduce((s,a)=> s + ((Number(a.credit)||0) - (Number(a.debit)||0)),0) * -1;
  const totalExpenses = cat.expenses.reduce((s,a)=> s + ((Number(a.debit)||0) - (Number(a.credit)||0)),0);
  const netIncome = totalRevenue - totalExpenses;

  const totalAssets = cat.assets.reduce((s,a)=> s + Math.abs(Number(a.bal)||0),0);
  const totalLiabilities = cat.liabilities.reduce((s,a)=> s + Math.abs(Number(a.bal)||0),0);
  const totalEquity = cat.equity.reduce((s,a)=> s + Math.abs(Number(a.bal)||0),0);

  const cashFromOps = netIncome, cashFromInvest = 0, cashFromFin = 0, netChange = cashFromOps + cashFromInvest + cashFromFin;

  const bsText = `Assets:\n${cat.assets.map(a=>` ${a.code} ${a.name} : ${Number(a.bal).toLocaleString()}`).join('\n')}\nTotal Assets: ${totalAssets.toLocaleString()}\n\nLiabilities:\n${cat.liabilities.map(a=>` ${a.code} ${a.name} : ${Number(a.bal).toLocaleString()}`).join('\n')}\nTotal Liabilities: ${totalLiabilities.toLocaleString()}\n\nEquity:\n${cat.equity.map(a=>` ${a.code} ${a.name} : ${Number(a.bal).toLocaleString()}`).join('\n')}\nTotal Equity: ${totalEquity.toLocaleString()}`;

  const isText = `Revenue: ${totalRevenue.toLocaleString()}\nExpenses: ${totalExpenses.toLocaleString()}\nNet Income: ${netIncome.toLocaleString()}`;
  const cfText = `Cash from Operations: ${cashFromOps.toLocaleString()}\nCash from Investing: ${cashFromInvest}\nCash from Financing: ${cashFromFin}\nNet Change: ${netChange.toLocaleString()}`;

  document.getElementById('balanceSheet')?.textContent = bsText;
  document.getElementById('incomeStatement')?.textContent = isText;
  document.getElementById('cashFlow')?.textContent = cfText;

  const roa = (netIncome / (totalAssets||1)) * 100;
  const roe = (netIncome / (totalEquity||1)) * 100;
  const debtToEquity = (totalLiabilities / (totalEquity||1));
  const profitMargin = (totalRevenue ? (netIncome/totalRevenue) * 100 : 0);
  const ratiosText = `ROA: ${roa.toFixed(2)}%\nROE: ${roe.toFixed(2)}%\nDebt/Equity: ${debtToEquity.toFixed(2)}\nProfit Margin: ${profitMargin.toFixed(2)}%`;
  document.getElementById('ratiosOut')?.textContent = ratiosText;

  const wacc = Number(document.getElementById('wacc')?.value || 10) / 100;
  const nopat = netIncome * 0.85;
  const capital = totalAssets - totalLiabilities;
  const eva = nopat - (wacc * capital);
  document.getElementById('evaOut')?.textContent = `NOPAT: ${nopat.toLocaleString()}\nCapital: ${capital.toLocaleString()}\nWACC: ${(wacc*100).toFixed(2)}%\nEVA: ${eva.toLocaleString()}`;

  const revByYear = {};
  cat.revenue.forEach(r=>{
    const m = (r.name||'').match(/(\d{4})$/);
    if(m){ const y = m[1]; revByYear[y] = (revByYear[y]||0) + ((Number(r.credit)||0) - (Number(r.debit)||0)); }
  });

  const years = Object.keys(revByYear).sort();
  const returns = [];
  for(let i=1;i<years.length;i++){ const a=revByYear[years[i-1]]; const b=revByYear[years[i]]; returns.push((b-a)/Math.abs(a||1)); }
  const avgReturn = (returns.reduce((s,x)=>s+x,0) / (returns.length||1));
  const stdDev = Math.sqrt(returns.reduce((s,x)=>s + Math.pow(x-avgReturn,2),0)/(returns.length||1));
  const rf = Number(document.getElementById('rf')?.value || 3) / 100;
  const sharpe = (avgReturn - rf) / (stdDev || 1);
  document.getElementById('rrOut')?.textContent = `Avg Return: ${(avgReturn*100).toFixed(2)}%\nStd Dev: ${(stdDev*100).toFixed(2)}%\nSharpe (approx): ${sharpe.toFixed(2)}`;

  // projections
  const projText = computeProjections(revByYear);
  document.getElementById('incomeStatement')?.textContent += '\n\n' + projText;

  // update dashboard numbers
  document.getElementById('stat-netincome')?.textContent = formatMoney(netIncome);
  document.getElementById('stat-assets')?.textContent = formatMoney(totalAssets);
  document.getElementById('stat-liab')?.textContent = formatMoney(totalLiabilities);

  window.__lastAnalysis = { totalAssets, totalLiabilities, totalEquity, totalRevenue, totalExpenses, netIncome, revByYear };
  updateCharts(window.__lastAnalysis);
  return window.__lastAnalysis;
}

function computeProjections(revByYear){
  const years = Object.keys(revByYear).map(y=>+y).sort();
  if(years.length < 2) return 'Projection: Insufficient historical series (provide revenue with year suffix in account names e.g. "Sales 2022")';
  const xs = years.map((y,i)=>i+1);
  const ys = years.map(y=>revByYear[y]||0);
  const reg = linearRegression(xs, ys);
  const projYears = Number(document.getElementById('projY')?.value || 3);
  const lastYear = years[years.length-1];
  let projText = 'Projections:\n';
  for(let i=1;i<=projYears;i++){
    const x = xs[xs.length-1] + i;
    const y = reg.intercept + reg.slope * x;
    projText += `${lastYear + i}: ${Math.round(y).toLocaleString()}\n`;
  }
  return projText;
}

function linearRegression(xs, ys){
  const n = xs.length;
  const sumX = xs.reduce((a,b)=>a+b,0);
  const sumY = ys.reduce((a,b)=>a+b,0);
  const sumXY = xs.reduce((s,x,i)=>s + x*ys[i],0);
  const sumX2 = xs.reduce((s,x)=>s + x*x,0);
  const denom = (n*sumX2 - sumX*sumX) || 1;
  const slope = (n*sumXY - sumX*sumY) / denom;
  const intercept = (sumY - slope*sumX) / n;
  return { slope, intercept };
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('generateBtn')?.addEventListener('click', ()=> generateStatementsAndAnalysis());
  if(location.pathname.endsWith('reports.html')) generateStatementsAndAnalysis();
});
