/* script.js
   كامل: واجهة لإدخال قوائم مالية متعددة السنوات، استيراد CSV/XLSX، حساب عشرات النسب، common-size, trend, DuPont، ورسوم Charts
   ملاحظات: يحسب – بحذر – القيم بحيث إذا المقسوم عليه = 0 يتجنب القسمة ويعطي "-" .
*/

// ---------- Utilities ----------
function safeDiv(a, b) {
  if (b === 0 || b === null || b === undefined || Number.isNaN(b)) return null;
  if (a === null || a === undefined || Number.isNaN(a)) a = 0;
  return a / b;
}
function pct(x) { return x===null ? "-" : ( (x*100).toFixed(2) + "%" ); }
function num(x) { return x===null ? "-" : Number(x).toLocaleString(); }
function toNum(v){ const n = Number(v); return Number.isNaN(n) ? 0 : n; }

// ---------- State ----------
let years = [new Date().getFullYear()-1, new Date().getFullYear()];
let statements = {}; // year => {income:{...}, balance:{...}, cash:{...}}
let chartInstances = {};

// init default empty
function initState() {
  years.forEach(y=>{
    if(!statements[y]) statements[y] = {
      income: {
        revenue:0, cogs:0, operating_expenses:0, ebitda:0, depreciation:0, ebit:0, interest:0, taxes:0, net_income:0
      },
      balance: {
        assets:0, current_assets:0, cash:0, receivables:0, inventory:0,
        liabilities:0, current_liabilities:0, short_term_debt:0, long_term_debt:0, equity:0
      },
      cashflow: {
        operating:0, investing:0, financing:0, capex:0, free_cash_flow:0
      }
    };
  });
}

// ---------- DOM helpers ----------
const tablesArea = document.getElementById("tablesArea");
const ratiosArea = document.getElementById("ratiosArea");
const addYearBtn = document.getElementById("addYearBtn");
const removeYearBtn = document.getElementById("removeYearBtn");
const importBtn = document.getElementById("importBtn");
const fileInput = document.getElementById("fileInput");
const computeBtn = document.getElementById("computeBtn");
const exportCsvBtn = document.getElementById("exportCsvBtn");
const marketPriceInput = document.getElementById("marketPrice");
const sharesInput = document.getElementById("shares");

addYearBtn.addEventListener("click", ()=>{
  const max = Math.max(...years);
  const ny = max + 1;
  years.push(ny);
  initState(); renderTables();
});
removeYearBtn.addEventListener("click", ()=>{
  if(years.length<=1) return alert("يجب أن يبقى سنة واحدة على الأقل");
  const y = years.pop();
  delete statements[y];
  renderTables();
});

importBtn.addEventListener("click", ()=>{
  const f = fileInput.files[0];
  if(!f) return alert("اختر ملف CSV أو Excel أولاً");
  const name = f.name.toLowerCase();
  if(name.endsWith(".csv")) {
    const reader = new FileReader();
    reader.onload = e=>{
      parseCSV(e.target.result);
    };
    reader.readAsText(f);
  } else {
    const reader = new FileReader();
    reader.onload = e=>{
      const data = new Uint8Array(e.target.result);
      const wb = XLSX.read(data, {type:'array'});
      // heuristic: try sheets named Income, Balance, Cash or general table with year column
      const json = {};
      wb.SheetNames.forEach((sName)=>{
        const arr = XLSX.utils.sheet_to_json(wb.Sheets[sName], {defval:0});
        json[sName] = arr;
      });
      // simple heuristic: if there's a sheet with 'year' column, map it
      let mapped=false;
      Object.values(json).forEach(sheet=>{
        if(sheet.length && sheet[0].year!==undefined){
          sheet.forEach(row=>{
            const y = row.year;
            if(!years.includes(y)) years.push(Number(y));
            if(!statements[y]) initState();
            // copy matching keys (lower-case)
            Object.keys(row).forEach(k=>{
              const key = k.toString().trim().toLowerCase().replace(/\s+/g,'_');
              // try to place in income/balance/cash based on known keys:
              const v = Number(row[k]) || 0;
              if(['revenue','sales'].includes(key)) statements[y].income.revenue = v;
              if(['cogs','cost_of_goods_sold','cost'].includes(key)) statements[y].income.cogs = v;
              if(['operating_expenses','opex','operating_expense'].includes(key)) statements[y].income.operating_expenses = v;
              if(['net_income','net_profit','profit'].includes(key)) statements[y].income.net_income = v;
              if(['assets','total_assets'].includes(key)) statements[y].balance.assets = v;
              if(['liabilities','total_liabilities'].includes(key)) statements[y].balance.liabilities = v;
              if(['equity','shareholders_equity','owners_equity'].includes(key)) statements[y].balance.equity = v;
              if(['cash','cash_and_equivalents'].includes(key)) statements[y].balance.cash = v;
              if(['operating','cash_from_operating','operating_cash_flow'].includes(key)) statements[y].cashflow.operating = v;
            });
          });
          mapped=true;
        }
      });
      if(!mapped){
        alert("ملف Excel تم قراءته لكن لم يتم العثور على عمود 'year'. تأكد من وجود عمود year أو استخدم CSV منسق.");
      }
      initState();
      renderTables();
    };
    reader.readAsArrayBuffer(f);
  }
});

// very simple CSV parser for expected format: first column = field, following columns = years
function parseCSV(text){
  const rows = text.trim().split(/\r?\n/).map(r=>r.split(','));
  // expect header: field,YYYY,YYYY,...
  const header = rows[0].map(h=>h.trim());
  const yearCols = header.slice(1).map(h=>Number(h));
  years = yearCols;
  initState();
  for(let r=1;r<rows.length;r++){
    const field = rows[r][0].trim().toLowerCase().replace(/\s+/g,'_');
    for(let c=1;c<header.length;c++){
      const y = header[c].trim();
      const v = Number(rows[r][c]) || 0;
      const year = Number(y);
      if(!statements[year]) statements[year] = {income:{},balance:{},cashflow:{}};
      // assign heuristics
      if(['revenue','sales'].includes(field)) statements[year].income.revenue = v;
      else if(['cogs','cost_of_goods_sold'].includes(field)) statements[year].income.cogs = v;
      else if(['operating_expenses','opex'].includes(field)) statements[year].income.operating_expenses = v;
      else if(['net_income','net_profit'].includes(field)) statements[year].income.net_income = v;
      else if(['assets','total_assets'].includes(field)) statements[year].balance.assets = v;
      else if(['liabilities','total_liabilities'].includes(field)) statements[year].balance.liabilities = v;
      else if(['equity','shareholders_equity'].includes(field)) statements[year].balance.equity = v;
      else if(['cash','cash_and_equivalents'].includes(field)) statements[year].balance.cash = v;
      else {
        // fallback: try place in income if common field names
        statements[year].income[field] = v;
      }
    }
  }
  renderTables();
}

// ---------- Render Input Tables ----------
function renderTables(){
  tablesArea.innerHTML = "";
  // create three card sections: Income, Balance, Cash Flow with columns per year
  // For user-friendliness we render per-year cards (easier mobile)
  years.forEach(y=>{
    const card = document.createElement("div");
    card.className = "statement-card";
    card.innerHTML = `<h3>السنة ${y}</h3>`;
    // income fields
    const inc = statements[y] && statements[y].income ? statements[y].income : {};
    const bal = statements[y] && statements[y].balance ? statements[y].balance : {};
    const cf  = statements[y] && statements[y].cashflow ? statements[y].cashflow : {};
    const html = `
      <div class="grid cols-3">
        <div class="input-field"><label>الإيرادات (Revenue)</label><input data-year="${y}" data-section="income" data-field="revenue" value="${inc.revenue||0}"/></div>
        <div class="input-field"><label>تكلفة البضاعة المباعة (COGS)</label><input data-year="${y}" data-section="income" data-field="cogs" value="${inc.cogs||0}"/></div>
        <div class="input-field"><label>المصروفات التشغيلية (OpEx)</label><input data-year="${y}" data-section="income" data-field="operating_expenses" value="${inc.operating_expenses||0}"/></div>
        <div class="input-field"><label>الاستهلاك (Depreciation)</label><input data-year="${y}" data-section="income" data-field="depreciation" value="${inc.depreciation||0}"/></div>
        <div class="input-field"><label>صافي الربح (Net Income)</label><input data-year="${y}" data-section="income" data-field="net_income" value="${inc.net_income||0}"/></div>

        <div class="input-field"><label>إجمالي الأصول (Assets)</label><input data-year="${y}" data-section="balance" data-field="assets" value="${bal.assets||0}"/></div>
        <div class="input-field"><label>النقد (Cash)</label><input data-year="${y}" data-section="balance" data-field="cash" value="${bal.cash||0}"/></div>
        <div class="input-field"><label>المديونيات (Liabilities)</label><input data-year="${y}" data-section="balance" data-field="liabilities" value="${bal.liabilities||0}"/></div>
        <div class="input-field"><label>الالتزامات المتداولة (Current Liabilities)</label><input data-year="${y}" data-section="balance" data-field="current_liabilities" value="${bal.current_liabilities||0}"/></div>
        <div class="input-field"><label>حقوق الملكية (Equity)</label><input data-year="${y}" data-section="balance" data-field="equity" value="${bal.equity||0}"/></div>

        <div class="input-field"><label>التدفقات التشغيلية (Operating CF)</label><input data-year="${y}" data-section="cashflow" data-field="operating" value="${cf.operating||0}"/></div>
        <div class="input-field"><label>التدفقات الاستثمارية (Investing CF)</label><input data-year="${y}" data-section="cashflow" data-field="investing" value="${cf.investing||0}"/></div>
        <div class="input-field"><label>التدفقات التمويلية (Financing CF)</label><input data-year="${y}" data-section="cashflow" data-field="financing" value="${cf.financing||0}"/></div>
        <div class="input-field"><label>CapEx</label><input data-year="${y}" data-section="cashflow" data-field="capex" value="${cf.capex||0}"/></div>
        <div class="input-field"><label>Free Cash Flow</label><input data-year="${y}" data-section="cashflow" data-field="free_cash_flow" value="${cf.free_cash_flow||0}"/></div>
      </div>
    `;
    card.innerHTML += html;
    tablesArea.appendChild(card);
  });

  // wire up inputs
  const inputs = tablesArea.querySelectorAll("input[data-year]");
  inputs.forEach(inp=>{
    inp.addEventListener("change", (e)=>{
      const y = e.target.dataset.year;
      const sec = e.target.dataset.section;
      const field = e.target.dataset.field;
      const v = toNum(e.target.value);
      if(!statements[y]) statements[y]={income:{},balance:{},cashflow:{}};
      statements[y][sec][field] = v;
    });
  });
}

// ---------- Computation of ratios ----------
function computeRatiosForYear(y) {
  const s = statements[y] || {income:{},balance:{},cashflow:{}};
  const income = s.income || {};
  const bal = s.balance || {};
  const cf = s.cashflow || {};

  const R = {}; // results

  // Liquidity
  R.current_ratio = safeDiv(bal.current_assets || 0, bal.current_liabilities || 0);
  R.quick_ratio = safeDiv( ( (bal.current_assets || 0) - (bal.inventory || 0) ), bal.current_liabilities || 0);
  R.cash_ratio = safeDiv(bal.cash || 0, bal.current_liabilities || 0);
  R.working_capital = (bal.current_assets || 0) - (bal.current_liabilities || 0);

  // Profitability
  R.gross_profit = (income.revenue || 0) - (income.cogs || 0);
  R.gross_margin = safeDiv(R.gross_profit, income.revenue || 0);
  R.ebitda_margin = safeDiv(income.ebitda || income.ebit || 0, income.revenue || 0);
  R.net_margin = safeDiv(income.net_income || 0, income.revenue || 0);
  R.roa = safeDiv(income.net_income || 0, bal.assets || 0);
  R.roe = safeDiv(income.net_income || 0, bal.equity || 0);

  // Efficiency
  R.asset_turnover = safeDiv(income.revenue || 0, bal.assets || 0);
  R.inventory_turnover = safeDiv(income.cogs || 0, bal.inventory || 0);
  R.receivables_turnover = safeDiv(income.revenue || 0, bal.receivables || 0);
  R.days_sales_outstanding = R.receivables_turnover ? (365 / R.receivables_turnover) : null;
  R.days_inventory = R.inventory_turnover ? (365 / R.inventory_turnover) : null;

  // Leverage
  const total_debt = (bal.long_term_debt || 0) + (bal.short_term_debt || 0);
  R.debt_to_equity = safeDiv(total_debt, bal.equity || 0);
  R.debt_ratio = safeDiv(bal.liabilities || 0, bal.assets || 0);

  // Coverage
  const ebit = income.ebit || ( (income.revenue||0) - (income.cogs||0) - (income.operating_expenses||0) + (income.depreciation||0) );
  R.interest_coverage = safeDiv(ebit, Math.abs(income.interest || 0));

  // Cash
  R.operating_cf_margin = safeDiv(cf.operating || 0, income.revenue || 0);
  R.free_cash_flow = cf.free_cash_flow || ( (cf.operating||0) - (cf.capex||0) );

  // Market (need shares & price)
  const shares = Number(sharesInput && sharesInput.value) || 0;
  const price = Number(marketPriceInput && marketPriceInput.value) || 0;
  R.eps = safeDiv(income.net_income || 0, shares);
  R.pe = (R.eps && price) ? safeDiv(price, R.eps) : null;
  R.market_cap = (shares && price) ? (shares * price) : null;

  // DuPont (ROE breakdown): ROE = NetProfit/Equity = (NetProfit/Revenue)*(Revenue/Assets)*(Assets/Equity)
  const profit = income.net_income || 0;
  R.dupont = {
    net_profit_margin: safeDiv(profit, income.revenue || 0),
    asset_turnover: safeDiv(income.revenue || 0, bal.assets || 0),
    equity_multiplier: safeDiv(bal.assets || 0, bal.equity || 0),
    roe_calc: null
  };
  if(R.dupont.net_profit_margin!==null && R.dupont.asset_turnover!==null && R.dupont.equity_multiplier!==null){
    R.dupont.roe_calc = R.dupont.net_profit_margin * R.dupont.asset_turnover * R.dupont.equity_multiplier;
  }

  // Common-size (income statement vertical %)
  R.common_size_income = {};
  if(income.revenue && income.revenue!==0){
    const rev = income.revenue;
    R.common_size_income = {
      revenue: 1,
      cogs: safeDiv(income.cogs||0, rev),
      gross_profit: safeDiv(R.gross_profit, rev),
      operating_expenses: safeDiv(income.operating_expenses||0, rev),
      ebitda: safeDiv(income.ebitda||0, rev),
      net_income: safeDiv(income.net_income||0, rev)
    };
  }

  return R;
}

function computeAll() {
  const res = {};
  years.forEach(y=>{
    res[y] = computeRatiosForYear(y);
  });
  return res;
}

// ---------- Render Ratios ----------
function renderRatios() {
  ratiosArea.innerHTML = "";
  const all = computeAll();
  years.forEach(y=>{
    const r = all[y];
    const card = document.createElement("div");
    card.className = "ratio-card";
    card.innerHTML = `<h4>النسب — ${y}</h4>`;
    let html = "";
    html += `<div class="ratio-row"><div>Current Ratio</div><div>${r.current_ratio!==null? r.current_ratio.toFixed(2): "-"}</div></div>`;
    html += `<div class="ratio-row"><div>Quick Ratio</div><div>${r.quick_ratio!==null? r.quick_ratio.toFixed(2): "-"}</div></div>`;
    html += `<div class="ratio-row"><div>Cash Ratio</div><div>${r.cash_ratio!==null? r.cash_ratio.toFixed(2): "-"}</div></div>`;

    html += `<div class="ratio-row"><div>Gross Margin</div><div>${r.gross_margin!==null? pct(r.gross_margin): "-"}</div></div>`;
    html += `<div class="ratio-row"><div>EBITDA Margin</div><div>${r.ebitda_margin!==null? pct(r.ebitda_margin): "-"}</div></div>`;
    html += `<div class="ratio-row"><div>Net Margin</div><div>${r.net_margin!==null? pct(r.net_margin): "-"}</div></div>`;

    html += `<div class="ratio-row"><div>ROA</div><div>${r.roa!==null? pct(r.roa): "-"}</div></div>`;
    html += `<div class="ratio-row"><div>ROE</div><div>${r.roe!==null? pct(r.roe): "-"}</div></div>`;

    html += `<div class="ratio-row"><div>Asset Turnover</div><div>${r.asset_turnover!==null? r.asset_turnover.toFixed(2): "-"}</div></div>`;
    html += `<div class="ratio-row"><div>Inventory Turnover</div><div>${r.inventory_turnover!==null? r.inventory_turnover.toFixed(2): "-"}</div></div>`;
    html += `<div class="ratio-row"><div>DSO (days)</div><div>${r.days_sales_outstanding!==null? Math.round(r.days_sales_outstanding) : "-"}</div></div>`;

    html += `<div class="ratio-row"><div>Debt / Equity</div><div>${r.debt_to_equity!==null? r.debt_to_equity.toFixed(2): "-"}</div></div>`;
    html += `<div class="ratio-row"><div>Debt Ratio</div><div>${r.debt_ratio!==null? r.debt_ratio.toFixed(2): "-"}</div></div>`;
    html += `<div class="ratio-row"><div>Interest Coverage</div><div>${r.interest_coverage!==null? r.interest_coverage.toFixed(2): "-"}</div></div>`;

    html += `<div class="ratio-row"><div>Operating CF Margin</div><div>${r.operating_cf_margin!==null? pct(r.operating_cf_margin): "-"}</div></div>`;
    html += `<div class="ratio-row"><div>Free Cash Flow</div><div>${r.free_cash_flow!==null? num(r.free_cash_flow): "-"}</div></div>`;

    // DuPont
    html += `<div style="margin-top:8px;border-top:1px solid #f1f5f9;padding-top:8px"><div style="font-weight:600">DuPont decomposition</div>
      <div>Net Profit Margin: ${r.dupont.net_profit_margin!==null? pct(r.dupont.net_profit_margin): "-"}</div>
      <div>Asset Turnover: ${r.dupont.asset_turnover!==null? r.dupont.asset_turnover.toFixed(2): "-"}</div>
      <div>Equity Multiplier: ${r.dupont.equity_multiplier!==null? r.dupont.equity_multiplier.toFixed(2): "-"}</div>
      <div>Implied ROE: ${r.dupont.roe_calc!==null? pct(r.dupont.roe_calc): "-"}</div>
    </div>`;

    // common size (show if exists)
    if(Object.keys(r.common_size_income||{}).length){
      html += `<div style="margin-top:8px;border-top:1px dashed #eef2f6;padding-top:6px"><div style="font-weight:600">Common-Size (Income)</div>`;
      const cs = r.common_size_income;
      Object.keys(cs).forEach(k=>{
        html += `<div>${k}: ${cs[k]!==null? pct(cs[k]): "-"}</div>`;
      });
      html += `</div>`;
    }

    card.innerHTML += html;
    ratiosArea.appendChild(card);
  });
}

// ---------- Charts ----------
function renderCharts() {
  // destroy existing charts
  Object.values(chartInstances).forEach(ch=>{ try{ ch.destroy(); }catch(e){}});
  chartInstances = {};
  const trendCtx = document.getElementById("trendChart").getContext("2d");
  const balanceCtx = document.getElementById("balanceChart").getContext("2d");
  const pieCtx = document.getElementById("pieChart").getContext("2d");

  const labels = years.map(y=>y.toString());
  const revenueData = years.map(y => statements[y] ? (statements[y].income.revenue||0) : 0);
  const netData = years.map(y => statements[y] ? (statements[y].income.net_income||0) : 0);
  const assetsData = years.map(y => statements[y] ? (statements[y].balance.assets||0) : 0);
  const liabilitiesData = years.map(y => statements[y] ? (statements[y].balance.liabilities||0) : 0);

  chartInstances.trend = new Chart(trendCtx, {
    type:'line',
    data:{
      labels, datasets:[
        {label:'Revenue', data:revenueData, borderColor:'#0f62fe', tension:0.2},
        {label:'Net Income', data:netData, borderColor:'#10b981', tension:0.2}
      ]
    },
    options:{ responsive:true }
  });

  chartInstances.balance = new Chart(balanceCtx, {
    type:'bar',
    data:{
      labels, datasets:[
        {label:'Assets', data:assetsData, backgroundColor:'#7c3aed'},
        {label:'Liabilities', data:liabilitiesData, backgroundColor:'#ef4444'}
      ]
    },
    options:{ responsive:true }
  });

  // pie for latest year's expense split
  const latestYear = years[years.length-1];
  const latest = statements[latestYear] || {income:{}, balance:{}, cashflow:{}};
  const pieData = [
    latest.income.cogs||0, latest.income.operating_expenses||0, latest.income.depreciation||0, latest.income.interest||0, latest.income.taxes||0
  ];
  chartInstances.pie = new Chart(pieCtx, {
    type:'pie',
    data:{
      labels:['COGS','OpEx','Depreciation','Interest','Taxes'],
      datasets:[{ data: pieData, backgroundColor: ['#4f46e5','#06b6d4','#10b981','#f59e0b','#ef4444'] }]
    },
    options:{ responsive:true }
  });
}

// ---------- Export ratios CSV ----------
function exportCSV() {
  const all = computeAll();
  const keys = new Set();
  Object.values(all).forEach(obj=>{
    Object.keys(obj).forEach(k=>keys.add(k));
  });
  const header = ['year', ...Array.from(keys)];
  let csv = header.join(',') + '\n';
  years.forEach(y=>{
    const row = [y];
    Array.from(keys).forEach(k=>{
      const v = all[y][k];
      // if object (dupont/common_size), stringify
      if(typeof v === 'object' && v!==null) row.push(JSON.stringify(v));
      else row.push(v===null? '': v);
    });
    csv += row.join(',') + '\n';
  });
  const blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'ratios.csv'; a.click();
  URL.revokeObjectURL(url);
}

// ---------- Main compute/render ----------
function computeAndRender(){
  renderRatios();
  renderCharts();
}

// wire compute button
computeBtn.addEventListener("click", ()=> {
  // ensure statements initialized for all years
  initState();
  computeAndRender();
});

// export csv
exportCsvBtn.addEventListener("click", exportCSV);

// initial
initState();
renderTables();
computeAndRender();
