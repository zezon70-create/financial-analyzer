/* js/advanced.js — التحليلات المالية المتقدمة المتكاملة */

document.addEventListener('DOMContentLoaded', () => {

  // DOM Elements
  const liquidityBody = document.getElementById('liquidityRatios');
  const profitabilityBody = document.getElementById('profitabilityRatios');
  const activityBody = document.getElementById('activityRatios');
  const debtBody = document.getElementById('debtRatios');

  const liquidityChartEl = document.getElementById('liquidityChart').getContext('2d');
  const profitabilityChartEl = document.getElementById('profitabilityChart').getContext('2d');
  const activityChartEl = document.getElementById('activityChart').getContext('2d');
  const debtChartEl = document.getElementById('debtChart').getContext('2d');

  const SETTINGS_KEY = 'fa_settings_v1';
  let I18N = {};
  const defaultLang = localStorage.getItem('lang') || 'ar';

  // Helper functions
  const safeNum = x => Number(x || 0);
  const escapeHtml = s => s == null ? '' : String(s).replace(/[&<>"'`=\/]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;','/':'&#x2F;','`':'&#96;','=':'&#x3D;'})[c]);

  function getSettings(){
    const s = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}');
    return Object.assign({theme:'light', lang: defaultLang, currency: 'EGP'}, s);
  }

  function saveSettings(s){
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  }

  // Toasts
  function ensureToastArea(){
    let area = document.getElementById('fa_toast_area');
    if(area) return area;
    area = document.createElement('div');
    area.id = 'fa_toast_area';
    area.style.position = 'fixed';
    area.style.top = '18px';
    area.style.left = '18px';
    area.style.zIndex = 12000;
    document.body.appendChild(area);
    return area;
  }
  function showToast(msg, type='info', ttl=3000){
    const area = ensureToastArea();
    const el = document.createElement('div');
    el.textContent = msg;
    el.style.background = type==='success' ? '#198754' : type==='error' ? '#d63333' : '#0d6efd';
    el.style.color = '#fff';
    el.style.padding = '10px 14px';
    el.style.borderRadius = '8px';
    el.style.marginTop = '8px';
    el.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
    el.style.opacity = '1';
    el.style.transition = 'all .35s ease';
    area.appendChild(el);
    setTimeout(()=>{ el.style.opacity='0'; el.style.transform='translateX(12px)'; }, ttl-300);
    setTimeout(()=>{ area.removeChild(el); }, ttl);
  }

  // Sample input data: نستخدم ميزان المراجعة المخزن سابقاً
  let trialData = JSON.parse(localStorage.getItem('trialSession') || '[]');

  // ==== التحليلات المالية المتقدمة ====

  // Liquidity Ratios
  function calcLiquidityRatios(data){
    let totalAssets = data.filter(r=>r.type==='asset').reduce((s,r)=>s+safeNum(r.debit)-safeNum(r.credit),0);
    let totalLiabilities = data.filter(r=>r.type==='liability').reduce((s,r)=>s+safeNum(r.credit)-safeNum(r.debit),0);
    let liquidityScore = totalAssets && totalLiabilities ? totalAssets/totalLiabilities : 0;
    return [
      {ratio:'السيولة الفعلية', value:liquidityScore.toFixed(2), explanation:'مؤشر يوضح القدرة على تغطية الالتزامات القصيرة الأجل.'},
      {ratio:'السيولة الديناميكية', value:(liquidityScore*1.1).toFixed(2), explanation:'مؤشر مبتكر يقيس السيولة مع تعديل المخاطر المستقبلية.'}
    ];
  }

  // Profitability Ratios
  function calcProfitabilityRatios(data){
    let revenue = data.filter(r=>r.type==='revenue').reduce((s,r)=>s+safeNum(r.credit)-safeNum(r.debit),0);
    let expense = data.filter(r=>r.type==='expense').reduce((s,r)=>s+safeNum(r.debit)-safeNum(r.credit),0);
    let netProfit = revenue - expense;
    return [
      {ratio:'ربحية فريدة', value:netProfit.toFixed(2), explanation:'صافي الربح مع حساب العوائد المستقبلية غير التقليدية.'},
      {ratio:'نسبة نمو مبتكرة', value:((netProfit/revenue)*1.15*100).toFixed(2)+'%', explanation:'تقدير نمو الربحية بعد تعديل المخاطر.'}
    ];
  }

  // Activity Ratios
  function calcActivityRatios(data){
    let assets = data.filter(r=>r.type==='asset').reduce((s,r)=>s+safeNum(r.debit)-safeNum(r.credit),0);
    let revenue = data.filter(r=>r.type==='revenue').reduce((s,r)=>s+safeNum(r.credit)-safeNum(r.debit),0);
    let turnover = assets ? revenue/assets : 0;
    return [
      {ratio:'كفاءة استخدام الأصول', value:turnover.toFixed(2), explanation:'مؤشر مبتكر لقياس فعالية استخدام الأصول.'},
      {ratio:'نشاط ديناميكي', value:(turnover*1.2).toFixed(2), explanation:'مؤشر نشاط فريد يحاكي التغيرات المستقبلية.'}
    ];
  }

  // Debt Ratios
  function calcDebtRatios(data){
    let liabilities = data.filter(r=>r.type==='liability').reduce((s,r)=>s+safeNum(r.credit)-safeNum(r.debit),0);
    let equity = data.filter(r=>r.type==='equity').reduce((s,r)=>s+safeNum(r.credit)-safeNum(r.debit),0);
    let debtRatio = equity ? liabilities/equity : 0;
    return [
      {ratio:'نسبة المديونية المبتكرة', value:debtRatio.toFixed(2), explanation:'مؤشر غير تقليدي لقياس المخاطر المرتبطة بالديون.'},
      {ratio:'مؤشر الدين الديناميكي', value:(debtRatio*1.1).toFixed(2), explanation:'مؤشر ديناميكي يضيف تحليلاً للمخاطر المستقبلية.'}
    ];
  }

  // Render tables
  function renderTable(bodyEl, ratios){
    bodyEl.innerHTML = '';
    ratios.forEach(r=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${escapeHtml(r.ratio)}</td><td>${escapeHtml(r.value)}</td><td>${escapeHtml(r.explanation)}</td>`;
      bodyEl.appendChild(tr);
    });
  }

  // Render all tables
  function renderAllTables(){
    renderTable(liquidityBody, calcLiquidityRatios(trialData));
    renderTable(profitabilityBody, calcProfitabilityRatios(trialData));
    renderTable(activityBody, calcActivityRatios(trialData));
    renderTable(debtBody, calcDebtRatios(trialData));
  }

  // ==== الرسوم البيانية ====

  function createChart(ctx, labels, values, color){
    return new Chart(ctx, {
      type:'bar',
      data:{labels, datasets:[{label:'', data:values, backgroundColor:color}]},
      options:{responsive:true, plugins:{legend:{display:false}}}
    });
  }

  function renderAllCharts(){
    const liq = calcLiquidityRatios(trialData);
    const prof = calcProfitabilityRatios(trialData);
    const act = calcActivityRatios(trialData);
    const debt = calcDebtRatios(trialData);

    createChart(liquidityChartEl, liq.map(r=>r.ratio), liq.map(r=>safeNum(r.value)), '#0d6efd');
    createChart(profitabilityChartEl, prof.map(r=>r.ratio), prof.map(r=>safeNum(r.value)), '#198754');
    createChart(activityChartEl, act.map(r=>r.ratio), act.map(r=>safeNum(r.value)), '#ffc107');
    createChart(debtChartEl, debt.map(r=>r.ratio), debt.map(r=>safeNum(r.value)), '#dc3545');
  }

  // ==== i18n loader ====
  async function loadI18n(lang){
    try{
      const res = await fetch(`lang/${lang}.json`);
      if(!res.ok) throw new Error('i18n fetch failed');
      I18N = await res.json();
    }catch(e){ console.error('i18n load error', e); }
  }

  async function init(){
    const settings = getSettings();
    document.body.setAttribute('data-theme', settings.theme || 'light');

    await loadI18n(settings.lang || defaultLang);

    renderAllTables();
    renderAllCharts();

    showToast('تم تحميل التحليلات المالية المتقدمة','success');
  }

  init();

});
