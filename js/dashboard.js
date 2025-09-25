document.addEventListener('DOMContentLoaded', () => {
  const noData = document.getElementById('noData');
  const content = document.getElementById('dashboardContent');
  const refreshBtn = document.getElementById('refreshBtn');
  const netProfitEl = document.getElementById('netProfit');
  const roaEl = document.getElementById('roa');
  const roeEl = document.getElementById('roe');
  const evaEl = document.getElementById('eva');
  const revExpCtx = document.getElementById('revExpChart');
  const ratiosCtx = document.getElementById('ratiosChart');
  const darkToggle = document.getElementById('darkModeToggle');
  const currencySelect = document.getElementById('currencySelect');
  const languageSelect = document.getElementById('languageSelect');
  const exportPdfBtn = document.getElementById('exportPdfBtn');
  const exportExcelBtn = document.getElementById('exportExcelBtn');

  let revExpChart = null, ratiosChart = null;
  let currentCurrency = localStorage.getItem('currency') || 'EGP';
  let currentLang = localStorage.getItem('lang') || 'ar';
  currencySelect.value = currentCurrency;
  languageSelect.value = currentLang;
  darkToggle.checked = localStorage.getItem('darkMode')==='true';
  if(darkToggle.checked) document.body.classList.add('dark-mode');

  function fmt(num){
    return new Intl.NumberFormat(currentLang==='ar'?'ar-EG':'en-US',{
      style:'currency', currency: currentCurrency
    }).format(num);
  }

  function loadSession(){
    try{ return JSON.parse(localStorage.getItem('trialSession'))||[]; }catch(e){ return []; }
  }

  function generateIncomeStatement(trial){
    const revenueItems = trial.filter(r=>r.type==='revenue');
    const expenseItems = trial.filter(r=>r.type==='expense');
    const totalRevenue = revenueItems.reduce((a,b)=>a+b.value,0);
    const totalExpense = expenseItems.reduce((a,b)=>a+b.value,0);
    return [
      ...revenueItems.map(r=>({ بند:r.account, قيمة:r.value })),
      { بند:'إجمالي الإيرادات', قيمة:totalRevenue },
      ...expenseItems.map(r=>({ بند:r.account, قيمة:r.value })),
      { بند:'إجمالي المصروفات', قيمة:totalExpense },
      { بند:'صافي الربح', قيمة:totalRevenue-totalExpense }
    ];
  }

  function generateBalanceSheet(trial){
    const assets = trial.filter(r=>r.type==='asset');
    const liabilities = trial.filter(r=>r.type==='liability');
    const equity = trial.filter(r=>r.type==='equity');
    const totalAssets = assets.reduce((a,b)=>a+b.value,0);
    const totalLiabilities = liabilities.reduce((a,b)=>a+b.value,0);
    const totalEquity = equity.reduce((a,b)=>a+b.value,0);
    return [
      { بند:'الأصول', قيمة:totalAssets },
      ...assets.map(a=>({ بند:a.account, قيمة:a.value })),
      { بند:'الخصوم', قيمة:totalLiabilities },
      ...liabilities.map(l=>({ بند:l.account, قيمة:l.value })),
      { بند:'حقوق الملكية', قيمة:totalEquity },
      ...equity.map(e=>({ بند:e.account, قيمة:e.value }))
    ];
  }

  function computeRatios(trial){
    const inc = generateIncomeStatement(trial);
    const bs = generateBalanceSheet(trial);
    const revenue = inc.find(r=>r.بند==='إجمالي الإيرادات')?.قيمة||0;
    const expense = inc.find(r=>r.بند==='إجمالي المصروفات')?.قيمة||0;
    const net = revenue-expense;
    const assets = bs.find(r=>r.بند==='الأصول')?.قيمة||0;
    const equity = bs.find(r=>r.بند==='حقوق الملكية')?.قيمة||0;
    const roa = assets?((net/assets)*100).toFixed(2):null;
    const roe = equity?((net/equity)*100).toFixed(2):null;
    const eva = net-(equity*0.08);
    return { net, roa, roe, eva };
  }

  function render(){
    const trial = loadSession();
    if(!trial.length){ noData.style.display='block'; content.style.display='none'; return; }
    noData.style.display='none'; content.style.display='block';

    const inc = generateIncomeStatement(trial);
    const bs = generateBalanceSheet(trial);
    const ratios = computeRatios(trial);

    netProfitEl.innerText = fmt(ratios.net);
    roaEl.innerText = ratios.roa!==null?ratios.roa+' %':'-';
    roeEl.innerText = ratios.roe!==null?ratios.roe+' %':'-';
    evaEl.innerText = fmt(ratios.eva);

    document.getElementById('incomeStatement').innerHTML =
      `<table class="table table-sm"><tbody>${inc.map(r=>`<tr><td>${r.بند}</td><td>${fmt(r.قيمة)}</td></tr>`).join('')}</tbody></table>`;
    document.getElementById('balanceSheet').innerHTML =
      `<table class="table table-sm"><tbody>${bs.map(r=>`<tr><td>${r.بند}</td><td>${fmt(r.قيمة)}</td></tr>`).join('')}</tbody></table>`;

    updateCharts(inc, ratios);
  }

  function updateCharts(inc, ratios){
    const revenue = inc.find(r=>r.بند==='إجمالي الإيرادات')?.قيمة||0;
    const expense = inc.find(r=>r.بند==='إجمالي المصروفات')?.قيمة||0;
    if(revExpChart) revExpChart.destroy();
    revExpChart = new Chart(revExpCtx,{type:'pie',data:{labels:['إيرادات','مصروفات'],datasets:[{data:[revenue,expense],backgroundColor:['#28a745','#dc3545']}] }});
    if(ratiosChart) ratiosChart.destroy();
    ratiosChart = new Chart(ratiosCtx,{type:'bar',data:{labels:['ROA','ROE','EVA'],datasets:[{label:'النسب',data:[ratios.roa||0,ratios.roe||0,ratios.eva],backgroundColor:['#007bff','#ffc107','#17a2b8']}] }});
  }

  darkToggle.addEventListener('change', ()=>{ document.body.classList.toggle('dark-mode', darkToggle.checked); localStorage.setItem('darkMode', darkToggle.checked); });
  currencySelect.addEventListener('change', ()=>{ currentCurrency = currencySelect.value; localStorage.setItem('currency', currentCurrency); render(); });
  languageSelect.addEventListener('change', ()=>{ currentLang = languageSelect.value; localStorage.setItem('lang', currentLang); render(); });
  refreshBtn.addEventListener('click', render);

  exportPdfBtn.addEventListener('click', ()=>{ html2pdf().set({filename:'financial-report.pdf', jsPDF:{orientation:'landscape'}}).from(document.body).save(); });
  exportExcelBtn.addEventListener('click', ()=>{
    const trial = loadSession();
    if(!trial.length){ alert('لا توجد بيانات للتصدير'); return; }
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(trial.map(r=>({ حساب:r.account, نوع:r.type, مدين:r.debit, دائن:r.credit }))), 'ميزان المراجعة');
    const inc = generateIncomeStatement(trial);
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(inc), 'قائمة الدخل');
    const bs = generateBalanceSheet(trial);
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(bs), 'الميزانية');
    XLSX.writeFile(wb, 'financial-export.xlsx');
  });

  render();
});
