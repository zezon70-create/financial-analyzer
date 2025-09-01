// compare.js
document.getElementById('compareMetric')?.addEventListener('change', ()=>{
  const metric = document.getElementById('compareMetric').value;
  // here we simulate different years by re-loading different saved sessions if present
  // For demo: create sample years from current data with simple multipliers
  const base = FA.ratios().revenue || 0;
  const years = [base*0.9, base*1.0, base*1.12];
  const ctx = document.getElementById('compareChart')?.getContext('2d');
  if(!ctx) return;
  new Chart(ctx,{type:'line', data:{labels:['2022','2023','2024'], datasets:[{label:metric, data:years}] }});
});
