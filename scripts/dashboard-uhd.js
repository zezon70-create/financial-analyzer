// scripts/dashboard-uhd.js

function loadSession() {
  try {
    const raw = localStorage.getItem('fa:data:v1');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch(e) { return null; }
}

function normalizeTrial(trial){
  const result = {revenues:0, expenses:0, assets:0, liabilities:0, equity:0, profit:0};
  if (!trial) return result;

  if (Array.isArray(trial)) return aggregateFromRows(trial);

  if (typeof trial === 'object') {
    result.revenues = Number(trial.revenues || 0);
    result.expenses = Number(trial.expenses || 0);
    result.assets = Number(trial.assets || 0);
    result.liabilities = Number(trial.liabilities || 0);
    result.equity = Number(trial.equity || 0);
    result.profit = result.revenues - result.expenses;
    if (Array.isArray(trial.rows)) return aggregateFromRows(trial.rows);
  }
  return result;
}

function aggregateFromRows(rows){
  const r = {revenues:0, expenses:0, assets:0, liabilities:0, equity:0, profit:0};
  const revKeywords = ['sales','revenue','income','إيراد','مبيعات'];
  const expKeywords = ['expense','cost','مصروف','مصاريف','تكلفة'];
  const assetKeywords = ['asset','الأصول','موجودات','اصل'];
  const liabKeywords = ['liabil','الدين','الخصوم','قرض'];
  const equityKeywords = ['equity','حقوق','ملكية','رأس المال'];

  rows.forEach(row=>{
    const acc = (row.account || '').toString().toLowerCase();
    const debit = Number(row.debit || 0);
    const credit = Number(row.credit || 0);

    if (revKeywords.some(k=>acc.includes(k))) r.revenues += credit||debit;
    else if (expKeywords.some(k=>acc.includes(k))) r.expenses += debit||credit;
    else if (assetKeywords.some(k=>acc.includes(k))) r.assets += debit||credit;
    else if (liabKeywords.some(k=>acc.includes(k))) r.liabilities += credit||debit;
    else if (equityKeywords.some(k=>acc.includes(k))) r.equity += credit||debit;
    else { if(credit>0) r.revenues += credit; if(debit>0) r.expenses += debit; }
  });

  r.profit = r.revenues - r.expenses;
  return r;
}

function prepareDashboardData(data){
  if (!data) return null;
  const netProfit = data.revenues - data.expenses;
  const roa = data.assets ? ((netProfit / data.assets) * 100).toFixed(2) : 0;
  const roe = data.equity ? ((netProfit / data.equity) * 100).toFixed(2) : 0;
  const eva = netProfit - (data.costOfCapital || 0);

  return {
    netProfit, roa, roe, eva,
    currentRevenue: data.revenues, currentExpenses: data.expenses,
    prevRevenue: data.previous?.revenues || 0,
    prevExpenses: data.previous?.expenses || 0,
    history: data.history || [],
    incomeStatement: { revenues: data.revenues, expenses: data.expenses, netProfit },
    balanceSheet: { assets: data.assets, liabilities: data.liabilities, equity: data.equity }
  };
}

function renderDashboard(data){
  if(!data){ document.getElementById('noData').style.display='block'; return; }
  document.getElementById('dashboardContent').style.display='block';
  document.getElementById('noData').style.display='none';

  document.getElementById('netProfit').textContent = data.netProfit.toLocaleString();
  document.getElementById('roa').textContent = data.roa + '%';
  document.getElementById('roe').textContent = data.roe + '%';
  document.getElementById('eva').textContent = data.eva.toLocaleString();

  document.getElementById('currentRevenue').textContent = data.currentRevenue.toLocaleString();
  document.getElementById('currentExpenses').textContent = data.currentExpenses.toLocaleString();
  document.getElementById('prevRevenue').textContent = data.prevRevenue.toLocaleString();
  document.getElementById('prevExpenses').textContent = data.prevExpenses.toLocaleString();
  document.getElementById('balanceAlert').style.display = (data.currentRevenue < data.currentExpenses) ? 'block':'none';

  renderRevExpChart(data.history);
  renderRatiosChart(data.roa,data.roe,data.eva);

  document.getElementById('incomeStatement').innerHTML = `
    <p>إيرادات: ${data.incomeStatement.revenues.toLocaleString()}</p>
    <p>مصروفات: ${data.incomeStatement.expenses.toLocaleString()}</p>
    <p>صافي الربح: ${data.incomeStatement.netProfit.toLocaleString()}</p>
  `;
  document.getElementById('balanceSheet').innerHTML = `
    <p>أصول: ${data.balanceSheet.assets.toLocaleString()}</p>
    <p>خصوم: ${data.balanceSheet.liabilities.toLocaleString()}</p>
    <p>حقوق الملكية: ${data.balanceSheet.equity.toLocaleString()}</p>
  `;
}

function renderRevExpChart(history){
  const ctx = document.getElementById('revExpChart'); if(!ctx) return;
  new Chart(ctx,{
    type:'line',
    data:{ labels: history.map(h=>h.month), datasets:[
      { label:'الإيرادات', data: history.map(h=>h.revenues), borderColor:'#0d6efd', fill:false, tension:0.3 },
      { label:'المصروفات', data: history.map(h=>h.expenses), borderColor:'#dc3545', fill:false, tension:0.3 }
    ]},
    options:{ responsive:true, plugins:{ legend:{ position:'top' } } }
  });
}

function renderRatiosChart(roa,roe,eva){
  const ctx = document.getElementById('ratiosChart'); if(!ctx) return;
  new Chart(ctx,{
    type:'bar',
    data:{ labels:['ROA','ROE','EVA'], datasets:[{ label:'القيم', data:[roa,roe,eva], backgroundColor:['#0d6efd','#ffc107','#198754'] }] },
    options:{ responsive:true, plugins:{ legend:{ display:false } }, scales:{ y:{ beginAtZero:true } } }
  });
}

document.getElementById('refreshBtn')?.addEventListener('click',()=>{
  const rawData = loadSession();
  const data = prepareDashboardData(rawData);
  renderDashboard(data);
});

// عند فتح الصفحة
(() => {
  const rawData = loadSession();
  const data = prepareDashboardData(rawData);
  renderDashboard(data);
})();
