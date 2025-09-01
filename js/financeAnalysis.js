function movingAverage(data, period = 3) {
  const result = [];
  for (let i = 0; i <= data.length - period; i++) {
    const sum = data.slice(i, i + period).reduce((a,b)=>a+b,0);
    result.push(sum / period);
  }
  return result;
}

function calculateRiskReturn(profits, riskFreeRate=0) {
  const n = profits.length;
  const avg = profits.reduce((a,b)=>a+b,0)/n;
  const variance = profits.reduce((a,b)=>a+Math.pow(b-avg,2),0)/n;
  const stdDev = Math.sqrt(variance);
  const sharpe = (avg - riskFreeRate)/stdDev;
  return { avg, stdDev, sharpe };
}

function breakEvenPoint(fixedCosts, pricePerUnit, variableCostPerUnit) {
  return fixedCosts / (pricePerUnit - variableCostPerUnit);
}

window.financeAnalysis = { movingAverage, calculateRiskReturn, breakEvenPoint };
