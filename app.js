const app = {
  lang: localStorage.getItem('lang') || 'en',
  data: [], userMap: {}, statementsObj: null,

  init(){
    this.bindUI();
    this.setLang(this.lang);
    this.showView('home');
  },

  bindUI(){
    const fileInput = document.getElementById('fileInput');
    if(fileInput) fileInput.addEventListener('change', e=> this.handleFile(e.target.files[0]));
    const processManual = document.getElementById('processManual');
    if(processManual) processManual.addEventListener('click', ()=> this.handleManual());
    const downloadTemplateBtn = document.getElementById('downloadTemplate');
    if(downloadTemplateBtn) downloadTemplateBtn.addEventListener('click', ()=> downloadTemplate());
    const clearInput = document.getElementById('clearInput');
    if(clearInput) clearInput.addEventListener('click', ()=> { document.getElementById('manualInput').value=''; document.getElementById('previewTable').innerHTML=''; this.data=[]; this.statementsObj=null; });
    const exportExcelBtn = document.getElementById('exportExcelBtn');
    if(exportExcelBtn) exportExcelBtn.addEventListener('click', ()=> exportStatementsToExcel(this.statementsObj));
    const exportPdfBtn = document.getElementById('exportPdfBtn');
    if(exportPdfBtn) exportPdfBtn.addEventListener('click', ()=> exportStatementsToPDF(this.statementsObj));
    const genForecast = document.getElementById('generateForecast');
    if(genForecast) genForecast.addEventListener('click', ()=> this.generateForecast());
    const yearSelect = document.getElementById('yearSelect');
    if(yearSelect) yearSelect.addEventListener('change', ()=> this.renderStatements());
    // safe init for buttons that may not exist yet
  },

  showView(id){
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    const view = document.getElementById('view-'+id);
    if(view) view.classList.add('active');
    if(id==='dashboard' && this.statementsObj) renderDashboardCharts(this.statementsObj);
    if(id==='analysis' && this.statementsObj) this.renderAnalysis();
    if(id==='mapping') this.renderMapping();
    if(id==='statements' && this.statementsObj) this.renderStatements();
    if(id==='compare' && this.statementsObj) this.populateCompareYears();
  },

  setLang(lang){
    this.lang = lang; localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.dataset.i18n;
      if(key && I18N[lang] && I18N[lang][key]) el.innerText = I18N[lang][key];
    });
    if(lang==='ar'){ document.documentElement.dir='rtl'; document.body.style.fontFamily='Tajawal, Arial, sans-serif'; }
    else { document.documentElement.dir='ltr'; document.body.style.fontFamily='Inter, Arial, sans-serif'; }
  },

  async handleFile(file){
    if(!file) return;
    const name = file.name.toLowerCase();
    if(name.endsWith('.csv')){
      const text = await file.text();
      this.parseCSV(text);
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type:'array'});
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, {header:1});
        this.parseArrayRows(json);
      };
      reader.readAsArrayBuffer(file);
    }
  },

  parseCSV(text){
    const lines = text.split(/\r?\n/).filter(l=>l.trim());
    const rows = lines.map(l=> l.split(',').map(s=>s.trim()));
    this.parseArrayRows(rows);
  },

  parseArrayRows(rows){
    const parsed=[];
    for(let i=0;i<rows.length;i++){
      const row = rows[i];
      if(row.length<2) continue;
      if(i===0 && /account|debit|credit|acc|حساب/i.test(row.join(' '))) continue;
      const account = row[0]||'';
      const debit = Number(row[1]||0)||0;
      const credit = Number(row[2]||0)||0;
      const year = row[3] ? String(row[3]) : undefined;
      parsed.push({account:account.trim(), debit, credit, year});
    }
    this.data = parsed;
    this.showPreview();
    this.buildStatements();
  },

  handleManual(){
    const text = document.getElementById('manualInput').value.trim();
    if(!text) return alert('Paste data first');
    const lines = text.split(/\r?\n/).filter(l=>l.trim());
    const rows = lines.map(l=>{
      const parts = l.split(',').map(p=>p.trim());
      return {account: parts[0]||'', debit: Number(parts[1]||0), credit: Number(parts[2]||0), year: parts[3]};
    });
    this.data = rows;
    this.showPreview();
    this.buildStatements();
  },

  showPreview(){
    const container = document.getElementById('previewTable');
    if(!this.data || this.data.length===0){ container.innerHTML = '<div class="small">No data</div>'; return; }
    let html = '<table><thead><tr><th>Account</th><th>Debit</th><th>Credit</th><th>Year</th></tr></thead><tbody>';
    this.data.forEach(r=> html += `<tr><td>${escapeHtml(r.account)}</td><td>${r.debit}</td><td>${r.credit}</td><td>${r.year||''}</td></tr>`);
    html += '</tbody></table>';
    container.innerHTML = html;
    const years = Array.from(new Set(this.data.map(d=>d.year).filter(Boolean)));
    const ysel = document.getElementById('yearSelect');
    if(ysel){
      ysel.innerHTML = '';
      if(years.length===0) ysel.innerHTML = `<option value="no-year">All</option>`;
      else years.forEach(y=> ysel.innerHTML += `<option value="${y}">${y}</option>`);
    }
  },

  buildStatements(){
    this.statementsObj = buildStatements(this.data, this.userMap);
    this.renderStatements();
  },

  renderMapping(){
    const cont = document.getElementById('mappingContainer');
    if(!this.data || this.data.length===0){ cont.innerHTML='<div class="small">No data to map</div>'; return; }
    const accounts = Array.from(new Set(this.data.map(d=>d.account)));
    let html = '<table><thead><tr><th>Account</th><th>Assign</th></tr></thead><tbody>';
    accounts.forEach(acc=>{
      const val = this.userMap[acc]|| classifyAccount(acc);
      html += `<tr><td>${escapeHtml(acc)}</td><td>
        <select data-acc="${encodeURIComponent(acc)}">
          <option value="asset" ${val==='asset'?'selected':''}>Asset</option>
          <option value="liability" ${val==='liability'?'selected':''}>Liability</option>
          <option value="equity" ${val==='equity'?'selected':''}>Equity</option>
          <option value="revenue" ${val==='revenue'?'selected':''}>Revenue</option>
          <option value="expense" ${val==='expense'?'selected':''}>Expense</option>
          <option value="other" ${val==='other'?'selected':''}>Other</option>
        </select>
      </td></tr>`;
    });
    html += '</tbody></table>';
    cont.innerHTML = html;
  },

  saveMapping(){
    const selects = document.querySelectorAll('#mappingContainer select');
    selects.forEach(s=>{
      const acc = decodeURIComponent(s.dataset.acc);
      this.userMap[acc] = s.value;
    });
    alert('Mapping saved');
    this.buildStatements();
  },

  renderStatements(){
    if(!this.statementsObj) return;
    const years = Object.keys(this.statementsObj.statements);
    const sel = document.getElementById('yearSelect');
    if(sel && sel.options.length===0){
      years.forEach(y=> sel.innerHTML += `<option value="${y}">${y}</option>`);
    }
    const year = document.getElementById('yearSelect')?.value || years[years.length-1];
    const s = this.statementsObj.statements[year];
    document.getElementById('incomeStatement').innerHTML = `<table><tr><td>Revenue</td><td>${s.revenue}</td></tr><tr><td>Expenses</td><td>${s.expenses}</td></tr><tr><td><strong>Net Income</strong></td><td><strong>${s.netIncome}</strong></td></tr></table>`;
    document.getElementById('balanceSheet').innerHTML = `<table><tr><td>Assets</td><td>${s.assets}</td></tr><tr><td>Liabilities</td><td>${s.liabilities}</td></tr><tr><td>Equity</td><td>${s.equity}</td></tr></table>`;
    document.getElementById('cashFlow').innerHTML = `<p class="small">Simplified cash: Net Income as proxy</p><p>Net cash (approx): ${s.netIncome}</p>`;
    renderDashboardCharts(this.statementsObj);
  },

  renderAnalysis(){
    if(!this.statementsObj) return;
    const years = Object.keys(this.statementsObj.statements);
    const latest = years[years.length-1];
    const stmt = this.statementsObj.statements[latest];
    const ratios = computeRatios(stmt);
    document.getElementById('kpis').innerHTML = `<div class="kpi"><strong>Net Income</strong><div>${stmt.netIncome}</div></div><div class="kpi"><strong>Revenue</strong><div>${stmt.revenue}</div></div><div class="kpi"><strong>Assets</strong><div>${stmt.assets}</div></div>`;
    document.getElementById('ratios').innerHTML = `<p>Current Ratio: ${ratios.currentRatio}</p><p>Debt/Equity: ${ratios.debtToEquity}</p><p>ROA: ${ratios.roa}%</p><p>ROE: ${ratios.roe}%</p><p>Net Margin: ${ratios.profitMargin}%</p>`;
    const wacc = Number(document.getElementById('waccInput').value||10);
    document.getElementById('eva').innerText = computeEVA(stmt, wacc);
    const rr = computeRiskReturnFromSeries([]); // placeholder
    document.getElementById('riskReturn').innerHTML = `<p>Expected Return: ${rr.mean}%</p><p>Std Dev: ${rr.std}%</p>`;
  },

  populateCompareYears(){
    const sel = document.getElementById('compareYears');
    sel.innerHTML='';
    const years = Object.keys(this.statementsObj.statements);
    years.forEach(y=> sel.innerHTML += `<option value="${y}">${y}</option>`);
  },

  doCompare(){
    const sel = document.getElementById('compareYears');
    const selected = Array.from(sel.selectedOptions).map(o=>o.value);
    if(selected.length<2) return alert('Select two or more years');
    const metric = document.getElementById('compareMetric').value;
    const values = selected.map(y=> this.statementsObj.statements[y][metric]);
    renderComparisonChart(selected, values, metric);
  },

  generateForecast(){
    const rate = Number(document.getElementById('growthRate').value)/100 || 0.05;
    const years = Object.keys(this.statementsObj.statements);
    const latest = this.statementsObj.statements[years[years.length-1]];
    const series = forecastSeriesLinear([latest.revenue], 5, rate);
    const div = document.getElementById('forecastResults');
    div.innerHTML = "<h4>5-year forecast (Revenue)</h4>" + series.map((v,i)=>`<p>Year +${i+1}: ${v}</p>`).join('');
  }
};

window.addEventListener('DOMContentLoaded', ()=> app.init());

/* small helper */
function escapeHtml(unsafe) {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
