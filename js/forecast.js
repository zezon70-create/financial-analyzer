// forecast.js
// Provide function to generate multi-year forecast given growth rates per scenario
function generateForecast(years=5, startRevenue=null, scenarioRates=[0.07]){
  const base = startRevenue || (FA.ratios().revenue||0);
  const out = [];
  for(let i=0;i<years;i++){
    const rate = scenarioRates[i] ?? scenarioRates[scenarioRates.length-1];
    const val = i===0 ? base*(1+rate) : out[i-1]*(1+rate);
    out.push(val);
  }
  return out;
}
