// sensitivityAnalysis.js
function monteCarloRevenueSim(iterations=500, meanGrowth=0.07, stdDev=0.05){
  // simulate revenue for next year
  const base = FA.ratios().revenue || 0;
  const results = [];
  for(let i=0;i<iterations;i++){
    const shock = gaussianRandom(meanGrowth, stdDev);
    results.push(base*(1+shock));
  }
  return results;
}
function gaussianRandom(mu=0, sigma=1){
  // Box-Muller
  let u=0,v=0; while(u===0) u=Math.random(); while(v===0) v=Math.random();
  return mu + sigma * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0*Math.PI*v);
}
