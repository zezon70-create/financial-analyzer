// public/app.js (final)
const ui = {
  lang: localStorage.getItem('lang') || 'en',
  rows: [],
  userMap: {},
  statements: null,
  ratios: null,
  init(){
    this.cache();
    this.bind();
    this.setLang(this.lang);
    this.show('home');
    this.fetchCoa();
  },
  cache(){
    this.fileInput = document.getElementById('fileInput');
    this.uploadBtn = document.getElementById('uploadBtn');
    this.downloadTemplateBtn = document.getElementById('downloadTemplateBtn');
    this.coaSelect = document.getElementById('coaSelect');
    this.manualAccount = document.getElementById('manualAccount');
    this.manualDebit = document.getElementById('manualDebit');
    this.manualCredit = document.getElementById('manualCredit');
    this.addRowBtn = document.getElementById('addRowBtn');
    this.manualInput = document.getElementById('manualInput');
    this.processManualBtn = document.getElementById('processManualBtn');
    this.preview = document.getElementById('preview');
    this.mappingContainer = document.getElementById('mappingContainer');
    this.saveMappingBtn = document.getElementById('saveMappingBtn');
    this.yearSelect = document.getElementById('yearSelect');
    this.income = document.getElementById('income');
    this.balance = document.getElementById('balance');
    this.cash = document.getElementById('cash');
    this.kpis = document.getElementById('kpis');
    this.ratiosBox = document.getElementById('ratios');
    this.evaBox = document.getElementById('eva');
    this.waccInput = document.getElementById('wacc');
    this.compareYears = document.getElementById('compareYears');
    this.compareMetric = document.getElementById('compareMetric');
    this.compareChart = document.getElementById('compareChart');
    this.chartRevenue = document.getElementById('chartRevenue');
    this.chartProfit = document.getElementById('chartProfit');
    this.chartStructure = document.getElementById('chartStructure');
    this.growthRate = document.getElementById('growthRate');
    this.forecastResult = document.getElementById('forecastResult');
    this.exportExcelClient = document.getElementById('exportExcelClient');
    this.exportPdfClient = document.getElementById('exportPdfClient');
    this.doCompareBtn = document.getElementById('doCompare');
    this.genForecastBtn = document.getElementById('genForecast');
  },
  bind(){
    if(this.uploadBtn) this.uploadBtn.addEventListener('click', ()=> this.uploadFile());
    if(this.downloadTemplateBtn) this.downloadTemplateBtn.addEventListener('click', ()=> this.downloadTemplate());
    if(this.addRowBtn) this.addRowBtn.addEventListener('click', ()=> this.addManualRow());
    if(this.processManualBtn) this.processManualBtn.addEventListener('click', ()=> this.processManual());
    if(this.saveMappingBtn) this.saveMappingBtn.addEventListener('click', ()=> this.saveMapping());
    if(this.yearSelect) this.yearSelect.addEventListener('change', ()=> this.renderStatements());
    if(this.waccInput) this.waccInput.addEventListener('change', ()=> this.renderEVA());
    if(this.exportExcelClient) this.exportExcelClient.addEventListener('click', ()=> this.exportExcel());
    if(this.exportPdfClient) this.exportPdfClient.addEventListener('click', ()=> this.exportPdf());
    if(this.doCompareBtn) this.doCompareBtn.addEventListener('click', ()=> this.doCompare());
    if(this.genForecastBtn) this.genForecastBtn.addEventListener('click', ()=> this.generateForecast());
  },
  show(viewId){
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
  },
  setLang(lang){
    this.lang = lang; localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.dataset.i18n;
      if(key && I18N[lang] && I18N[lang][key]) el.innerText = I18N[lang][key];
    });
    document.documentElement.dir = (lang==='ar') ? 'rtl' : 'ltr';
  },
  async fetchCoa(){
    try{
      const res = await fetch('/api/coa'); this.coa = await res.json();
      // fill select
      if(this.coaSelect && this.coa && this.coa.categories){
        this.coaSelect.innerHTML = '<option value="">-- choose account --</option>';
        this.coa.categories.forEach(c=>{
          const opt = document.createElement('option');
          opt.value = c.name;
          opt.textContent = `${c.code} — ${c.name}`;
          this.coaSelect.appendChild(opt);
        });
        this.coaSelect.addEventListener('change', ()=> {
          this.manualAccount.value = this.coaSelect.value;
        });
      }
    }catch(e){ console.error('COA load', e); }
  },
  async uploadFile(){
    const f = this.fileInput.files[0];
    if(!f) return alert('Select a file first');
    const fd = new FormData(); fd.append('file', f);
    const res = await fetch('/api/upload', { method:'POST', body: fd });
    const data = await res.json();
    if(data.error) return alert(data.error);
    this.rows = data.rows; this.statements = data.statements; // initial statements (auto)
    this.showPreview(); this.populateYearSelect();
  },
  downloadTemplate(){
    // create simple CSV template and download
    const csv = "Account,Debit,Credit,Year\nCash,1000,0,2024\nSales,0,5000,2024\nCOGS,2000,0,2024\n";
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'trialbalance_template.csv'; a.click();
  },
  addManualRow(){
    const acc = this.manualAccount.value.trim();
    const debit = Number(this.manualDebit.value) || 0;
    const credit = Number(this.manualCredit.value) || 0;
    if(!acc) return alert('Enter account name');
    this.rows.push({ account: acc, debit, credit });
    this.showPreview();
  },
  showPreview(){
    if(!this.rows || this.rows.length===0){ this.preview.innerHTML = '<div class="small">No data</div>'; return; }
    let html = '<table><thead><tr><th>Account</th><th>Debit</th><th>Credit</th><th>Year</th></tr></thead><tbody>';
    this.rows.forEach(r=> html += `<tr><td>${escapeHtml(r.account)}</td><td>${r.debit}</td><td>${r.credit}</td><td>${r.year||''}</td></tr>`);
    html += '</tbody></table>';
    this.preview.innerHTML = html;
  },
  async processManual(){
    const text = this.manualInput.value.trim();
    if(!text && (!this.rows || this.rows.length===0)) return alert('Paste data or add rows first');
    if(text){
      const res = await fetch('/api/manual', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ text })});
      const data = await res.json();
      if(data.error) return alert(data.error);
      this.rows = data.rows; this.statements = data.statements;
      this.showPreview(); this.populateYearSelect();
    } else {
      // build locally then send build for mapping
      const res = await fetch('/api/build', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ rows: this.rows, userMap: this.userMap })});
      const data = await res.json();
      if(data.error) return alert(data.error);
      this.statements = data.statements; this.ratios = data.ratios;
      this.showPreview(); this.populateYearSelect();
    }
  },
  populateYearSelect(){
    const years = Object.keys(this.statements.statements);
    if(this.yearSelect){
      this.yearSelect.innerHTML = '';
      years.forEach(y => this.yearSelect.innerHTML += `<option value="${y}">${y}</option>`);
    }
    this.renderMapping();
    // update compare years
    if(this.compareYears){
      this.compareYears.innerHTML = '';
      years.forEach(y => this.compareYears.innerHTML += `<option value="${y}">${y}</option>`);
    }
    this.renderStatements();
  },
  renderMapping(){
    if(!this.rows || this.rows.length===0){ this.mappingContainer.innerHTML = '<div class="small">No data</div>'; return; }
    const accounts = Array.from(new Set(this.rows.map(r=>r.account)));
    let html = '<table><thead><tr><th>Account</th><th>Assign</th></tr></thead><tbody>';
    accounts.forEach(acc=>{
      const defaultVal = classifyClientSide(acc);
      html += `<tr><td>${escapeHtml(acc)}</td><td>
        <select data-acc="${encodeURIComponent(acc)}">
          <option value="asset" ${defaultVal==='asset'?'selected':''}>Asset</option>
          <option value="liability" ${defaultVal==='liability'?'selected':''}>Liability</option>
          <option value="equity" ${defaultVal==='equity'?'selected':''}>Equity</option>
          <option value="revenue" ${defaultVal==='revenue'?'selected':''}>Revenue</option>
          <option value="expense" ${defaultVal==='expense'?'selected':''}>Expense</option>
          <option value="other" ${defaultVal==='other'?'selected':''}>Other</option>
        </select>
      </td></tr>`;
    });
    html += '</tbody></table>';
    this.mappingContainer.innerHTML = html;
  },
  async saveMapping(){
    const selects = this.mappingContainer.querySelectorAll('select');
    selects.forEach(s=>{
      const acc = decodeURIComponent(s.dataset.acc);
      this.userMap[acc] = s.value;
    });
    // rebuild on server with mapping
    const res = await fetch('/api/build', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ rows: this.rows, userMap: this.userMap, wacc: Number(this.waccInput.value)||10 })});
    const data = await res.json();
    if(data.error) return alert(data.error);
    this.statements = data.statements; this.ratios = data.ratios;
    alert('Mapping saved and statements rebuilt');
    this.populateYearSelect();
  },
  renderStatements(){
    if(!this.statements) return;
    const year = this.yearSelect.value || Object.keys(this.statements.statements)[0];
    const s = this.statements.statements[year];
    this.income.innerHTML = `<h3>Income</h3><p>Revenue: ${s.revenue}</p><p>Expenses: ${s.expenses}</p><p><strong>Net Income: ${s.netIncome}</strong></p>`;
    this.balance.innerHTML = `<h3>Balance</h3><p>Assets: ${s.assets}</p><p>Liabilities: ${s.liabilities}</p><p>Equity: ${s.equity}</p>`;
    this.cash.innerHTML = `<h3>Cash Flow (simplified)</h3><p>Net cash (proxy): ${s.netIncome}</p>`;
    this.renderAnalysisForYear(year);
    renderDashboardClient(this.statements);
  },
  renderAnalysisForYear(year){
    const r = (this.ratios && this.ratios[year]) ? this.ratios[year] : computeRatiosClient(this.statements.statements[year]);
    this.kpis.innerHTML = `<div class="kpi"><strong>Net Income</strong><div>${this.statements.statements[year].netIncome}</div></div>
      <div class="kpi"><strong>Revenue</strong><div>${this.statements.statements[year].revenue}</div></div>
      <div class="kpi"><strong>Assets</strong><div>${this.statements.statements[year].assets}</div></div>`;
    this.ratiosBox.innerHTML = `<p>Current Ratio: ${r.currentRatio}</p><p>Debt/Equity: ${r.debtToEquity}</p><p>ROA: ${r.roa}%</p><p>ROE: ${r.roe}%</p><p>Net Margin: ${r.netMargin}%</p>`;
    this.renderEVA();
  },
  renderEVA(){
    const year = this.yearSelect.value;
    const wacc = Number(this.waccInput.value) || 10;
    const s = this.statements.statements[year];
    const eva = computeEVAClient(s, wacc);
    this.evaBox.innerText = `EVA: ${eva}`;
  },
  doCompare(){
    const selected = Array.from(this.compareYears.selectedOptions).map(o=>o.value);
    if(selected.length < 2) return alert('Select 2+ years');
    const metric = this.compareMetric.value;
    const values = selected.map(y=> this.statements.statements[y][metric]);
    renderComparisonClient(selected, values, metric);
  },
  generateForecast(){
    const rate = Number(this.growthRate.value) || 5;
    const years = Object.keys(this.statements.statements);
    const latest = this.statements.statements[years[years.length-1]];
    fetch('/api/forecast', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ baseSeries:[latest.revenue], growthRate: rate, years:5 })})
      .then(r=>r.json()).then(data=>{
        this.forecastResult.innerHTML = '<h4>Forecast</h4>' + data.forecast.map((v,i)=>`<p>Year +${i+1}: ${v}</p>`).join('');
      });
  },
  async exportExcel(){
    const resp = await fetch('/api/export/excel', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ statements: this.statements })});
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'financial_statements.xlsx'; a.click();
  },
  async exportPdf(){
    const resp = await fetch('/api/export/pdf', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ statements: this.statements })});
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'financial_statements.pdf'; a.click();
  }
};

// Client helper classification (same logic as server)
function classifyClientSide(name){
  const n = (name||'').toLowerCase();
  if(/cash|bank|inventory|receiv|asset|accounts receivable|stock|deposit|petty cash/.test(n)) return 'asset';
  if(/payable|liab|loan|debt|accounts payable|creditor|liability|mortgage/.test(n)) return 'liability';
  if(/equity|capital|retained|owner|share/.test(n)) return 'equity';
  if(/revenue|sales|income|turnover|fees|service/.test(n)) return 'revenue';
  if(/cost|cogs|expense|expenses|salar|wages|rent|utility|tax|depreciation|amortization/.test(n)) return 'expense';
  return 'other';
}
function escapeHtml(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function computeRatiosClient(stmt){
  const currentRatio = (stmt.assets && stmt.liabilities) ? (stmt.assets/stmt.liabilities) : 0;
  const debtToEquity = (stmt.equity) ? (stmt.liabilities/stmt.equity) : 0;
  const roa = (stmt.assets) ? (stmt.netIncome/stmt.assets*100) : 0;
  const roe = (stmt.equity) ? (stmt.netIncome/stmt.equity*100) : 0;
  const netMargin = (stmt.revenue) ? (stmt.netIncome/stmt.revenue*100) : 0;
  return { currentRatio: currentRatio.toFixed(2), debtToEquity: debtToEquity.toFixed(2), roa: roa.toFixed(2), roe: roe.toFixed(2), netMargin: netMargin.toFixed(2) };
}
function computeEVAClient(stmt, wacc){ return (stmt.netIncome - (stmt.assets * (wacc/100))).toFixed(2); }

function renderDashboardClient(statementsObj){
  const years = Object.keys(statementsObj.statements);
  const revenues = years.map(y=>statementsObj.statements[y].revenue);
  const profits = years.map(y=>statementsObj.statements[y].netIncome);
  const latest = years[years.length-1];
  const st = statementsObj.statements[latest];

  // revenue
  if(ui.chartRevenueCtx) ui.chartRevenueCtx.destroy();
  const ctxR = document.getElementById('chartRevenue').getContext('2d');
  ui.chartRevenueCtx = new Chart(ctxR, { type:'bar', data:{ labels:years, datasets:[{ label:'Revenue', data:revenues }] }});

  // profit
  if(ui.chartProfitCtx) ui.chartProfitCtx.destroy();
  const ctxP = document.getElementById('chartProfit').getContext('2d');
  ui.chartProfitCtx = new Chart(ctxP, { type:'line', data:{ labels:years, datasets:[{ label:'Net Profit', data:profits, fill:false }] }});

  // structure
  if(ui.chartStructureCtx) ui.chartStructureCtx.destroy();
  const ctxS = document.getElementById('chartStructure').getContext('2d');
  ui.chartStructureCtx = new Chart(ctxS, { type:'doughnut', data:{ labels:['Assets','Liabilities','Equity'], datasets:[{ data:[st.assets, st.liabilities, st.equity] }] }});
}

function renderComparisonClient(years, values, label){
  const container = document.getElementById('compareChart');
  container.innerHTML = '<canvas id="compCanvas"></canvas>';
  const ctx = document.getElementById('compCanvas').getContext('2d');
  new Chart(ctx, { type:'bar', data:{ labels: years, datasets:[{ label, data: values }] }});
}

window.addEventListener('DOMContentLoaded', ()=> ui.init());
