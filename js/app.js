// app.js
// رئيسي - تواصل بين الواجهة وملفات الحساب والرسم والتصدير

// short selectors
const $ = id => document.getElementById(id);
const q = sel => document.querySelector(sel);
const qAll = sel => Array.from(document.querySelectorAll(sel));

const STORAGE_KEY = 'FA_SESSION_v1';
const SCENARIOS_KEY = 'FA_SCENARIOS_v1';
const CF_KEY = 'FA_CF_v1';
const HIST_KEY = 'FA_HIST_REVENUE';

// state
let FA_DATA = JSON.parse(localStorage.getItem('FA_DATA_v1') || '[]'); // array {account,debit,credit,custom:{}}
let CUSTOM_FIELDS = JSON.parse(localStorage.getItem(CF_KEY) || '[]');
let SCENARIOS = JSON.parse(localStorage.getItem(SCENARIOS_KEY) || '[]');

// init
document.addEventListener('DOMContentLoaded', () => {
  $('year').textContent = new Date().getFullYear();
  bindTabs();
  renderCustomFields();
  renderTable();
  renderScenarios();
  refreshDashboard();
  bindUI();
  // set language/currency if saved
  const lang = localStorage.getItem('fa_lang') || 'ar';
  $('langSelect').value = lang;
  const cur = localStorage.getItem('fa_cur') || 'EGP';
  $('currencySelect').value = cur;
  // events for lang/currency
  $('langSelect').addEventListener('change', (e)=>{ localStorage.setItem('fa_lang', e.target.value); applyLang(e.target.value); });
  $('currencySelect').addEventListener('change', (e)=>{ localStorage.setItem('fa_cur', e.target.value); window.dispatchEvent(new Event('currencyChanged')); });
  applyLang(lang);
});

// ------- UI binding -------
function bindUI(){
  // file import
  $('btnImport')?.addEventListener('click', ()=> {
    const f = $('fileInput').files[0];
    if(!f){ alert('اختر ملفًا'); return; }
    const reader = new FileReader();
    reader.onload = e => {
      try{
        const raw = e.target.result;
        // parse using XLSX (binary string)
        const wb = XLSX.read(raw, {type:'binary'});
        const sheet = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, {defval:''});
        let added = 0;
        json.forEach(row => {
          const keys = Object.keys(row);
          const account = row['Account'] || row['الحساب'] || row[keys[0]] || '';
          const debit = Number(row['Debit'] || row['مدين'] || row[keys[1]] || 0) || 0;
          const credit = Number(row['Credit'] || row['دائن'] || row[keys[2]] || 0) || 0;
          if(account){
            const custom = {};
            CUSTOM_FIELDS.forEach(cf => custom[cf] = row[cf] || '');
            FA_DATA.push({account:String(account), debit:Math.abs(debit), credit:Math.abs(credit), custom});
            added++;
          }
        });
        localStorage.setItem('FA_DATA_v1', JSON.stringify(FA_DATA));
        renderTable(); refreshDashboard();
        alert(`تم استيراد ${added} صف`);
      }catch(err){
        console.error(err); alert('فشل قراءة الملف — تأكد من صيغة Excel/CSV');
      }
    };
    reader.readAsBinaryString(f);
  });

  // manual input
  $('btnManual')?.addEventListener('click', ()=> {
    const txt = $('manualInput').value.trim();
    if(!txt) { alert('لا بيانات يدوية'); return; }
    const lines = txt.split(/\r?\n/).map(l=>l.trim()).filter(Boolean);
    let added = 0;
    lines.forEach(line=>{
      let parts = line.split(/\||,|\t|;/).map(p=>p.trim()).filter(Boolean);
      if(parts.length < 3) parts = line.split(/\s{2,}/).map(p=>p.trim()).filter(Boolean);
      const acc = parts[0] || `Account_${Date.now()}`;
      const debit = Number(parts[1]||0);
      const credit = Number(parts[2]||0);
      const custom = {};
      CUSTOM_FIELDS.forEach(cf=> custom[cf]='');
      FA_DATA.push({account:acc, debit:Math.abs(debit), credit:Math.abs(credit), custom});
      added++;
    });
    $('manualInput').value='';
    localStorage.setItem('FA_DATA_v1', JSON.stringify(FA_DATA));
    renderTable(); refreshDashboard();
    alert(`أضيف ${added} صف`);
  });

  // custom fields
  $('addCF')?.addEventListener('click', ()=> {
    const v = $('newCF').value.trim();
    if(!v) return alert('اكتب اسم الحقل'); CUSTOM_FIELDS.push(v); $('newCF').value=''; localStorage.setItem(CF_KEY, JSON.stringify(CUSTOM_FIELDS)); renderCustomFields(); renderTable();
  });
  $('removeCF')?.addEventListener('click', ()=> {
    if(!CUSTOM_FIELDS.length) return alert('لا يوجد'); CUSTOM_FIELDS.pop(); localStorage.setItem(CF_KEY, JSON.stringify(CUSTOM_FIELDS)); renderCustomFields(); renderTable();
  });

  // session
  $('saveSession')?.addEventListener('click', ()=> {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({data:FA_DATA, custom:CUSTOM_FIELDS, savedAt:new Date().toISOString()}));
    alert('تم حفظ الجلسة محليًا');
  });
  $('loadSession')?.addEventListener('click', ()=> {
    const s = localStorage.getItem(STORAGE_KEY);
    if(!s) return alert('لا توجد جلسة محفوظة');
    const pack = JSON.parse(s); FA_DATA = pack.data || []; CUSTOM_FIELDS = pack.custom || []; localStorage.setItem('FA_DATA_v1', JSON.stringify(FA_DATA)); localStorage.setItem(CF_KEY, JSON.stringify(CUSTOM_FIELDS)); renderCustomFields(); renderTable(); refreshDashboard(); alert('تم تحميل الجلسة');
  });
  $('exportSession')?.addEventListener('click', ()=> {
    const blob = new Blob([JSON.stringify({data:FA_DATA, custom:CUSTOM_FIELDS, exportedAt:new Date().toISOString()}, null,2)], {type:'application/json'});
    saveAs(blob, `FA_session_${Date.now()}.json`);
  });
  $('importSession')?.addEventListener('change', (e)=> {
    const f = e.target.files[0]; if(!f) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try{
        const pack = JSON.parse(ev.target.result);
        FA_DATA = pack.data || []; CUSTOM_FIELDS = pack.custom || []; localStorage.setItem('FA_DATA_v1', JSON.stringify(FA_DATA)); localStorage.setItem(CF_KEY, JSON.stringify(CUSTOM_FIELDS)); renderCustomFields(); renderTable(); refreshDashboard(); alert('تم استيراد الجلسة');
      }catch(err){ alert('ملف JSON غير صالح'); }
    };
    reader.readAsText(f);
  });

  // clear all
  $('btnClearAll')?.addEventListener('click', ()=> {
    if(!confirm('مسح كل البيانات؟')) return;
    FA_DATA = []; localStorage.removeItem('FA_DATA_v1'); renderTable(); refreshDashboard();
  });

  // forecast
  $('runForecast')?.addEventListener('click', ()=> {
    // history: try stored revenue history or derive from data
    let hist = JSON.parse(localStorage.getItem(HIST_KEY) || 'null');
    if(!hist || !hist.length){
      // derive simple history as repeated revenue with mild growth
      const rev = (typeof computeIncome === 'function') ? computeIncome(FA_DATA).revenue : computeIncomeLocal(FA_DATA).revenue;
      hist = Array.from({length:8}, (_,i)=> rev * Math.pow(1.03, i));
    }
    const model = $('forecastModel').value;
    const horizon = Number($('forecastHorizon').value||6);
    let forecast = [];
    if(model === 'holt') forecast = holtWintersAdditive(hist, 0.4,0.2,0.2,4,horizon);
    else if(model === 'linear') forecast = linearForecast(hist,horizon);
    else forecast = autoForecast(hist,horizon);
    renderForecastChart(hist, forecast);
  });

  // Monte Carlo
  $('runMC')?.addEventListener('click', ()=> {
    runMonteCarlo(1000);
  });
  $('downloadMC')?.addEventListener('click', ()=> {
    // export last MC results if present (charts.js maintains)
    if(window.MC_RESULTS && window.MC_RESULTS.length){
      const rows = [['simIndex','value'], ...window.MC_RESULTS.map((v,i)=>[i+1,v])];
      const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(rows), 'MC'); XLSX.writeFile(wb, `MC_${Date.now()}.xlsx`);
    } else alert('لا نتائج للمحاكاة بعد');
  });

  // reports export
  $('exportExcel')?.addEventListener('click', ()=> {
    const tb = buildTrialRows(); const inc = computeIncome(FA_DATA); const bs = computeBalance(FA_DATA); const cf = computeCash(FA_DATA); const ratios = computeRatios(inc,bs);
    const incomeRows = [['Item','Value'], ['Revenue',inc.revenue], ['COGS',inc.cogs], ['GrossProfit',inc.grossProfit], ['Expenses',inc.expenses], ['OperatingProfit',inc.operatingProfit], ['NetProfit',inc.netProfit]];
    const balanceRows = [['Item','Value'], ['Assets',bs.assets], ['Liabilities',bs.liabilities], ['Equity',bs.equity]];
    const cashRows = [['Item','Value'], ['CashFromOps',cf.cashOps], ['NetChange',cf.netChange]];
    const ratiosRows = [['Ratio','Value'], ...Object.entries(ratios).map(r=>[r[0], String(r[1])])];
    exportExcelPackage({trialRows:tb, incomeRows, balanceRows, cashRows, ratiosRows, notesRows:[['Notes'], [ $('reportNotes').value || '' ]]});
    alert('تم تصدير Excel');
  });

  $('exportPDF')?.addEventListener('click', async ()=> {
    const inc = computeIncome(FA_DATA); const bs = computeBalance(FA_DATA); const ratios = computeRatios(inc,bs);
    const previewEl = await buildReportPreview({logo:$('reportLogo').value || '', notes:$('reportNotes').value || '', inc, bs, ratios});
    // show preview
    $('reportPreview').innerHTML = ''; $('reportPreview').appendChild(previewEl);
    // export pdf
    await exportPDFFromElement(previewEl, `Financial_Report_${Date.now()}.pdf`);
    alert('تم تصدير PDF');
  });

  $('printReport')?.addEventListener('click', ()=> {
    window.print();
  });

  // scenarios
  $('saveScenario')?.addEventListener('click', ()=> {
    const name = prompt('اسم السيناريو (مثال: FY2024)') || `scenario_${Date.now()}`;
    SCENARIOS.push({name, data: JSON.parse(JSON.stringify(FA_DATA)), createdAt:new Date().toISOString()});
    localStorage.setItem(SCENARIOS_KEY, JSON.stringify(SCENARIOS));
    renderScenarios();
    alert('تم حفظ السيناريو');
  });
  $('clearScenarios')?.addEventListener('click', ()=> {
    if(!confirm('مسح كل السيناريوهات؟')) return;
    SCENARIOS = []; localStorage.removeItem(SCENARIOS_KEY); renderScenarios();
  });
}

// ------- Table & Custom fields rendering -------
function renderCustomFields(){
  const wrap = $('customFieldsContainer');
  wrap.innerHTML = '';
  CUSTOM_FIELDS.forEach(cf=>{
    const el = document.createElement('div'); el.className='row';
    el.innerHTML = `<label style="width:120px">${cf}</label><input disabled placeholder="${cf}"/>`;
    wrap.appendChild(el);
  });
}

function renderTable(){
  const wrap = $('tableWrapper');
  if(!wrap) return;
  if(!FA_DATA.length){ wrap.innerHTML = '<p class="hint">لا توجد بيانات — ارفع ملف أو أدخل يدويًا.</p>'; return; }
  const headers = ['الحساب','مدين','دائن', ...CUSTOM_FIELDS, 'إجراء'];
  let html = `<table class="table"><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>`;
  FA_DATA.forEach((r,i)=>{
    html += `<tr data-i="${i}">
      <td contenteditable="true" data-field="account">${escapeHtml(r.account)}</td>
      <td contenteditable="true" data-field="debit">${r.debit}</td>
      <td contenteditable="true" data-field="credit">${r.credit}</td>`;
    CUSTOM_FIELDS.forEach(cf=>{
      const v = r.custom?.[cf] || '';
      html += `<td contenteditable="true" data-field="cf:${escapeHtml(cf)}">${escapeHtml(v)}</td>`;
    });
    html += `<td><button class="btn ghost" data-action="del">حذف</button></td></tr>`;
  });
  html += '</tbody></table>';
  wrap.innerHTML = html;

  // attach edit listeners
  wrap.querySelectorAll('[contenteditable]').forEach(cell=>{
    cell.addEventListener('blur', (e)=>{
      const tr = e.target.closest('tr'); const idx = Number(tr.dataset.i);
      const field = e.target.dataset.field; let val = e.target.textContent.trim();
      if(field === 'account') FA_DATA[idx].account = val;
      else if(field === 'debit') FA_DATA[idx].debit = Number(val||0);
      else if(field === 'credit') FA_DATA[idx].credit = Number(val||0);
      else if(field.startsWith('cf:')){ const cfName = field.slice(3); FA_DATA[idx].custom = FA_DATA[idx].custom || {}; FA_DATA[idx].custom[cfName] = val; }
      localStorage.setItem('FA_DATA_v1', JSON.stringify(FA_DATA));
      refreshDashboard();
    });
  });

  // delete row
  wrap.querySelectorAll('button[data-action="del"]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const tr = e.target.closest('tr'); const idx = Number(tr.dataset.i);
      FA_DATA.splice(idx,1); localStorage.setItem('FA_DATA_v1', JSON.stringify(FA_DATA)); renderTable(); refreshDashboard();
    });
  });
}

// ------- Scenarios list -------
function renderScenarios(){
  const wrap = $('scenarioList'); wrap.innerHTML = '';
  if(!SCENARIOS.length){ wrap.innerHTML = '<p class="hint">لا توجد سيناريوهات محفوظة</p>'; return; }
  SCENARIOS.forEach((s,idx)=>{
    const d = document.createElement('div'); d.className='row';
    d.innerHTML = `<strong style="flex:1">${escapeHtml(s.name)}</strong>
      <button class="btn ghost" data-idx="${idx}" data-action="load">تحميل</button>
      <button class="btn ghost" data-idx="${idx}" data-action="compare">مقارنة</button>
      <button class="btn danger" data-idx="${idx}" data-action="del">حذف</button>`;
    wrap.appendChild(d);
  });
  wrap.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const idx = Number(e.target.dataset.idx); const action = e.target.dataset.action;
      if(action === 'load'){ FA_DATA = JSON.parse(JSON.stringify(SCENARIOS[idx].data)); localStorage.setItem('FA_DATA_v1', JSON.stringify(FA_DATA)); renderTable(); refreshDashboard(); alert('تم تحميل السيناريو'); }
      else if(action === 'del'){ if(confirm('حذف؟')){ SCENARIOS.splice(idx,1); localStorage.setItem(SCENARIOS_KEY, JSON.stringify(SCENARIOS)); renderScenarios(); } }
      else if(action === 'compare'){ compareScenario(idx); }
    });
  });
}

function compareScenario(idx){
  const s = SCENARIOS[idx];
  const metric = $('compareMetric').value;
  const curVal = metricValue(FA_DATA, metric);
  const otherVal = metricValue(s.data, metric);
  const ctx = $('compareChart').getContext('2d');
  if(window.compareChart) window.compareChart.destroy();
  window.compareChart = new Chart(ctx, {type:'bar', data:{labels:['الحالي', s.name], datasets:[{label:metric, data:[curVal, otherVal]}]}});
}
function metricValue(data, metric){
  const inc = computeIncome(data);
  const bs = computeBalance(data);
  if(metric === 'revenue') return inc.revenue;
  if(metric === 'netProfit') return inc.netProfit;
  if(metric === 'assets') return bs.assets;
  return 0;
}

// ------- Dashboard refresh -------
function refreshDashboard(){
  renderStatements();
  renderRatios();
  // any charts re-render
  // (charts.js provides renderForecastChart and renderSensitivity)
  // ensure stats visible
}

// statements and ratios use calculations.js (exposed functions)
function renderStatements(){
  const el = $('statements'); if(!el) return;
  if(!FA_DATA.length){ el.innerHTML = '<p class="hint">لا توجد بيانات لعرض القوائم.</p>'; return; }
  const inc = computeIncome(FA_DATA);
  const bs = computeBalance(FA_DATA);
  const cf = computeCash(FA_DATA);
  el.innerHTML = `
    <div class="kv"><span>الإيرادات</span><span>${fmt(inc.revenue)}</span></div>
    <div class="kv"><span>COGS</span><span>${fmt(inc.cogs)}</span></div>
    <div class="kv"><span>صافي الربح</span><span>${fmt(inc.netProfit)}</span></div>
    <hr/>
    <div class="kv"><span>الأصول</span><span>${fmt(bs.assets)}</span></div>
    <div class="kv"><span>الخصوم</span><span>${fmt(bs.liabilities)}</span></div>
    <div class="kv"><span>حقوق الملكية</span><span>${fmt(bs.equity)}</span></div>
  `;
}
function renderRatios(){
  const el = $('keyRatios'); if(!el) return;
  const inc = computeIncome(FA_DATA);
  const bs = computeBalance(FA_DATA);
  const r = computeRatios(inc,bs);
  el.innerHTML = `
    <li>Gross Margin: ${(r.grossMargin*100).toFixed(2)}%</li>
    <li>Net Margin: ${(r.netMargin*100).toFixed(2)}%</li>
    <li>ROA: ${(r.roa*100).toFixed(2)}%</li>
    <li>ROE: ${(r.roe*100).toFixed(2)}%</li>
    <li>Liquidity: ${r.liquidity.toFixed(2)}</li>
  `;
}

// ------- helpers used in templates -------
function escapeHtml(s){ return (''+s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function fmt(n){ return Number(n||0).toLocaleString(); }

// ------- Tabs -------
function bindTabs(){
  qAll('.tab').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      qAll('.tab').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const t = btn.dataset.target;
      qAll('.tab-pane').forEach(p=> p.id === t ? p.classList.add('active') : p.classList.remove('active'));
    });
  });
}

// ------- small wrappers to call calculations.js functions if present, else fallback local implementations ------
function computeIncome(data){ return (typeof computeIncomeStatement === 'function') ? computeIncomeStatement(data) : computeIncomeLocal(data); }
function computeBalance(data){ return (typeof computeBalanceSheet === 'function') ? computeBalanceSheet(data) : computeBalanceLocal(data); }
function computeCash(data){ return (typeof computeCashFlow === 'function') ? computeCashFlow(data) : computeCashLocal(data); }
function computeRatios(inc, bs){ return (typeof computeRatiosAll === 'function') ? computeRatiosAll(inc, bs) : computeRatiosLocal(inc, bs); }

// Local fallback (should be consistent with calculations.js)
function computeIncomeLocal(data){
  const map = classifyLocal(data);
  const revenue = map.revenue, cogs = map.cogs, grossProfit = revenue - cogs, expenses = map.expenses, operatingProfit = grossProfit - expenses, netProfit = operatingProfit;
  return {revenue,cogs,grossProfit,expenses,operatingProfit,netProfit};
}
function computeBalanceLocal(data){
  const map = classifyLocal(data);
  const assets = map.assets, liabilities = map.liabilities, equity = map.equity || (assets - liabilities);
  return {assets,liabilities,equity};
}
function computeCashLocal(data){
  const inc = computeIncomeLocal(data); const bs = computeBalanceLocal(data); return {cashOps: inc.operatingProfit, netChange: bs.assets};
}
function computeRatiosLocal(inc, bs){
  const revenue = inc.revenue || 1, netProfit = inc.netProfit || 0;
  const grossMargin = revenue ? (inc.grossProfit / revenue) : 0;
  const netMargin = revenue ? (netProfit / revenue) : 0;
  const roa = bs.assets ? (netProfit / bs.assets) : 0;
  const roe = bs.equity ? (netProfit / bs.equity) : 0;
  const liquidity = bs.liabilities ? (bs.assets / bs.liabilities) : 0;
  return {grossMargin, netMargin, roa, roe, liquidity, revenue, netProfit};
}
function classifyLocal(data){
  const map = {revenue:0,cogs:0,expenses:0,assets:0,liabilities:0,equity:0};
  data.forEach(r=>{
    const a = (r.account||'').toLowerCase();
    const debit = Number(r.debit||0), credit = Number(r.credit||0);
    const net = credit - debit;
    if(/sale|revenue|income|مبيعات|ايراد|إيراد/.test(a)) map.revenue += Math.abs(net);
    else if(/cost|cogs|inventory|تكلفة|مخزون/.test(a)) map.cogs += Math.abs(net);
    else if(/expense|salary|rent|مصروف|مصاريف|أجور|إيجار/.test(a)) map.expenses += Math.abs(net);
    else if(/cash|bank|receivable|asset|نقد|بنك|مدين/.test(a)) map.assets += (debit - credit);
    else if(/payable|loan|liabilit|credit|دائن|قروض|مطلوبات/.test(a)) map.liabilities += (credit - debit);
    else if(/equity|capital|retained|رأس المال|احتياطي/.test(a)) map.equity += (credit - debit);
    else { if(credit > debit) map.revenue += (credit - debit); else map.assets += (debit - credit); }
  });
  Object.keys(map).forEach(k=> map[k] = Number(map[k] || 0));
  return map;
}

// ------- helpers that other modules may expect -------
function buildTrialRows(){
  const header = ['Account','Debit','Credit', ...CUSTOM_FIELDS];
  const rows = FA_DATA.map(r => [r.account, Number(r.debit||0), Number(r.credit||0), ...CUSTOM_FIELDS.map(cf => r.custom?.[cf] || '')]);
  return [header, ...rows];
}

// Expose for other modules if loaded after
window.FA_APP = {
  getData: () => FA_DATA,
  setData: d => { FA_DATA = d; localStorage.setItem('FA_DATA_v1', JSON.stringify(FA_DATA)); renderTable(); refreshDashboard(); },
  buildTrialRows,
  computeIncome,
  computeBalance
};
