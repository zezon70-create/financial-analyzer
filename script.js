/* ==========================
   i18n
   ========================== */
const i18n = {
  en: {
    title: 'Financial Analyzer', tbTitle: 'Trial Balance', thName: 'Account Name', addRow: '+ Add Row', generate: 'Generate Statements & Analysis',
    bs: 'Balance Sheet', is: 'Income Statement', cf: 'Cash Flow Statement', ratios: 'Financial Ratios', eva: 'Economic Value Added (EVA)', rr: 'Return & Risk', dash: 'Dashboard', importExcel: 'Import Excel', exportExcel: 'Export Excel', exportPdf: 'Export PDF'
  },
  ar: {
    title: 'محلل مالي', tbTitle: 'ميزان المراجعة', thName: 'اسم الحساب', addRow: '+ إضافة بند', generate: 'إنشاء القوائم والتحليل',
    bs: 'الميزانية', is: 'قائمة الدخل', cf: 'قائمة التدفقات', ratios: 'النسب المالية', eva: 'القيمة الاقتصادية المضافة', rr: 'العائد والمخاطرة', dash: 'الداشبورد', importExcel: 'استيراد Excel', exportExcel: 'تصدير Excel', exportPdf: 'تصدير PDF'
  }
};
let lang = localStorage.getItem('fa_lang') || 'ar';
const el = id => document.getElementById(id);
function applyLang(){
  const L = i18n[lang];
  el('appTitle').textContent = L.title;
  el('tbTitle').textContent = L.tbTitle + ' / Trial Balance';
  document.querySelector('#thName').textContent = L.thName;
  document.querySelector('#addRowBtn')?.setAttribute('title', L.addRow);
  el('generateBtn').textContent = L.generate;
  el('bsTitle').textContent = L.bs;
  el('isTitle').textContent = L.is;
  el('cfTitle').textContent = L.cf;
  el('ratiosTitle').textContent = L.ratios;
  el('evaTitle').textContent = L.eva;
  el('rrTitle').textContent = L.rr;
  el('dashTitle').textContent = L.dash;
  el('importExcelBtn').textContent = L.importExcel;
  el('exportExcelBtn').textContent = L.exportExcel;
  el('exportPdfBtn').textContent = L.exportPdf;
  el('langSwitch').value = lang;
}
applyLang();
el('langSwitch').addEventListener('change', (e)=>{lang = e.target.value; localStorage.setItem('fa_lang', lang); applyLang();});

/* ==========================
   Trial balance model
   ========================== */
function createRowObj(code='',name='',debit='',credit=''){ return {code,name,debit,credit}; }
let tb = JSON.parse(localStorage.getItem('fa_tb')||'null') || [
  createRowObj('1000','Cash',12000,0),
  createRowObj('1100','AR',4000,0),
  createRowObj('2000','Bank Loan',0,5000),
  createRowObj('4000','Sales 2022',0,80000),
  createRowObj('4001','Sales 2023',0,90000),
  createRowObj('3000','COGS',30000,0)
];

function renderTB(){
  const body = el('tbBody'); body.innerHTML='';
  tb.forEach((r,idx)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input data-idx="${idx}" data-field="code" value="${r.code}" /></td>
      <td><input data-idx="${idx}" data-field="name" value="${r.name}" /></td>
      <td><input data-idx="${idx}" data-field="debit" value="${r.debit}" /></td>
      <td><input data-idx="${idx}" data-field="credit" value="${r.credit}" /></td>
      <td class="right"><div class="row-actions"><button data-act="del" data-idx="${idx}">Del</button></div></td>
    `;
    body.appendChild(tr);
  });
  attachTBEvents(); updateTotals();
}

function attachTBEvents(){
  document.querySelectorAll('#tbBody input').forEach(inp=>{
    inp.addEventListener('change', (e)=>{
      const idx = +e.target.dataset.idx; const field = e.target.dataset.field; const val = e.target.value.trim();
      tb[idx][field] = val;
      if(field==='debit' || field==='credit') tb[idx][field] = evaluateCell(val);
      saveTB(); renderTB();
    });
  });
  document.querySelectorAll('button[data-act="del"]').forEach(b=>b.addEventListener('click', e=>{const i=+e.target.dataset.idx; tb.splice(i,1); saveTB(); renderTB();}));
}

function evaluateCell(v){
  if(v===undefined || v===null) return 0;
  v = v.toString().trim();
  if(v === '') return 0;
  if(v.startsWith('=')){
    try{
      if(v.toUpperCase().startsWith('=SUM(')){
        const inner = v.substring(5,v.length-1);
        const parts = inner.split(/[,;]+/).map(x=>parseFloat(x)||0);
        return parts.reduce((a,b)=>a+b,0);
      }
      return eval(v.substring(1));
    }catch(e){ return 0; }
  }
  return parseFloat(v) || 0;
}

function saveTB(){ localStorage.setItem('fa_tb', JSON.stringify(tb)); }

el('addRowBtn').addEventListener('click', ()=>{ tb.push(createRowObj('','',0,0)); saveTB(); renderTB(); });
el('clearBtn').addEventListener('click', ()=>{ if(confirm('Clear all rows?')){ tb=[]; saveTB(); renderTB(); } });

function updateTotals(){
  const totalDebit = tb.reduce((s,r)=>s + (parseFloat(r.debit)||0),0);
  const totalCredit = tb.reduce((s,r)=>s + (parseFloat(r.credit)||0),0);
  el('tbTotals').textContent = `Debit: ${totalDebit.toLocaleString()}  |  Credit: ${totalCredit.toLocaleString()}`;
}

renderTB();

/* ==========================
   Generate statements & analysis
   ========================== */
function generateStatements(){
  const assets = [], liabilities = [], equity = [], revenue = [], expenses = [];
  tb.forEach(r=>{
    const code = (r.code||'').toString();
    const bal = (parseFloat(r.debit)||0) - (parseFloat(r.credit)||0);
    if(code.startsWith('1')) assets.push({...r,bal});
    else if(code.startsWith('2')) liabilities.push({...r,bal});
    else if(code.startsWith('3')) expenses.push({...r,bal});
    else if(code.startsWith('4')) revenue.push({...r,bal});
    else if(code.startsWith('5')) equity.push({...r,bal});
    else { if(bal>0) assets.push({...r,bal}); else liabilities.push({...r,bal}); }
  });

  const totalRevenue = revenue.reduce((s,a)=>s + ((parseFloat(a.credit)||0) - (parseFloat(a.debit)||0)),0) * -1;
  const totalExpenses = expenses.reduce((s,a)=>s + ((parseFloat(a.debit)||0) - (parseFloat(a.credit)||0)),0);
  const netIncome = totalRevenue - totalExpenses;

  const totalAssets = assets.reduce((s,a)=>s + Math.abs(a.bal),0);
  const totalLiabilities = liabilities.reduce((s,a)=>s + Math.abs(a.bal),0);
  const totalEquity = equity.reduce((s,a)=>s + Math.abs(a.bal),0);

  const bsText = `Assets:\n${assets.map(a=>` ${a.code} ${a.name} : ${a.bal.toLocaleString()}`).join('\n')}\nTotal Assets: ${totalAssets.toLocaleString()}\n\nLiabilities:\n${liabilities.map(a=>` ${a.code} ${a.name} : ${a.bal.toLocaleString()}`).join('\n')}\nTotal Liabilities: ${totalLiabilities.toLocaleString()}\n\nEquity:\n${equity.map(a=>` ${a.code} ${a.name} : ${a.bal.toLocaleString()}`).join('\n')}\nTotal Equity: ${totalEquity.toLocaleString()}`;

  const isText = `Revenue: ${totalRevenue.toLocaleString()}\nExpenses: ${totalExpenses.toLocaleString()}\nNet Income: ${netIncome.toLocaleString()}`;
  const cfText = `Cash from Operations: ${netIncome.toLocaleString()}\nCash from Investing: 0\nCash from Financing: 0\nNet Change: ${netIncome.toLocaleString()}`;

  el('balanceSheet').textContent = bsText;
  el('incomeStatement').textContent = isText;
  el('cashFlow').textContent = cfText;

  // Ratios
  const roa = (netIncome / (totalAssets||1)) * 100;
  const roe = (netIncome / (totalEquity||1)) * 100;
  const debtToEquity = (totalLiabilities / (totalEquity||1));
  const currentRatio = (totalAssets / (totalLiabilities||1));
  const ratiosText = `ROA: ${roa.toFixed(2)}%\nROE: ${roe.toFixed(2)}%\nDebt/Equity: ${debtToEquity.toFixed(2)}\nCurrent Ratio (approx): ${currentRatio.toFixed(2)}`;
  el('ratiosOut').textContent = ratiosText;

  // EVA
  const wacc = parseFloat(el('wacc').value || 10)/100;
  const nopat = netIncome * 0.85;
  const capital = totalAssets - totalLiabilities;
  const eva = nopat - (wacc * capital);
  el('evaOut').textContent = `NOPAT: ${nopat.toLocaleString()}\nCapital: ${capital.toLocaleString()}\nWACC: ${(wacc*100).toFixed(2)}%\nEVA: ${eva.toLocaleString()}`;

  // Return & Risk (from revenue accounts with year suffix)
  const revByYear = {};
  revenue.forEach(r=>{
    const m = (r.name||'').match(/(\d{4})$/);
    if(m){ const y = m[1]; revByYear[y]= (revByYear[y]||0) + (parseFloat(r.credit)||0) - (parseFloat(r.debit)||0); }
  });
  const years = Object.keys(revByYear).sort();
  const returns = [];
  for(let i=1;i<years.length;i++){ const a=revByYear[years[i-1]]; const b=revByYear[years[i]]; returns.push((b-a)/Math.abs(a||1)); }
  const avgReturn = (returns.reduce((s,x)=>s+x,0) / (returns.length||1));
  const stdDev = Math.sqrt(returns.reduce((s,x)=>s + Math.pow(x-avgReturn,2),0)/(returns.length||1));
  const rf = parseFloat(el('rf').value||3)/100;
  const sharpe = (avgReturn - rf) / (stdDev||1);
  el('rrOut').textContent = `Avg Return: ${(avgReturn*100).toFixed(2)}%\nStd Dev: ${(stdDev*100).toFixed(2)}%\nSharpe (approx): ${sharpe.toFixed(2)}`;

  updateCharts({totalAssets,totalLiabilities,totalEquity,totalRevenue,totalExpenses,netIncome,revByYear});
  computeProjections(netIncome, revByYear);
}

el('generateBtn').addEventListener('click', generateStatements);

/* ==========================
   Charts
   ========================== */
let chart1,chart2,chart3;
function initCharts(){
  const ctx1 = document.getElementById('chart1').getContext('2d');
  chart1 = new Chart(ctx1,{type:'doughnut',data:{labels:['Assets','Liabilities','Equity'],datasets:[{data:[1,1,1]}]}});
  const ctx2 = document.getElementById('chart2').getContext('2d');
  chart2 = new Chart(ctx2,{type:'bar',data:{labels:[],datasets:[{label:'Revenue',data:[]},{label:'Expenses',data:[]}]} , options:{responsive:true}});
  const ctx3 = document.getElementById('chart3').getContext('2d');
  chart3 = new Chart(ctx3,{type:'line',data:{labels:[],datasets:[{label:'Net Income',data:[],tension:0.3}]},options:{responsive:true}});
}
initCharts();

function updateCharts(data){
  chart1.data.datasets[0].data = [data.totalAssets||0,data.totalLiabilities||0,data.totalEquity||0];
  chart1.update();

  const years = Object.keys(data.revByYear||{});
  chart2.data.labels = years.length?years:['No Data'];
  chart2.data.datasets[0].data = years.map(y=>Math.abs(data.revByYear[y]||0));
  chart2.data.datasets[1].data = years.map(y=>0);
  chart2.update();

  chart3.data.labels = years.length?years:['No Data'];
  chart3.data.datasets[0].data = years.map(y=> (data.revByYear[y]||0) );
  chart3.update();
}

/* ==========================
   Projections (simple linear regression)
   ========================== */
function linearRegression(xs, ys){
  const n = xs.length;
  const sumX = xs.reduce((a,b)=>a+b,0); const sumY = ys.reduce((a,b)=>a+b,0);
  const sumXY = xs.reduce((s,x,i)=>s + x*ys[i],0);
  const sumX2 = xs.reduce((s,x)=>s + x*x,0);
  const slope = (n*sumXY - sumX*sumY)/(n*sumX2 - sumX*sumX || 1);
  const intercept = (sumY - slope*sumX)/n;
  return {slope,intercept};
}

function computeProjections(netIncome, revByYear){
  const years = Object.keys(revByYear).map(y=>+y).sort();
  if(years.length<2){
    el('incomeStatement').textContent += '\n\nProjection: Insufficient historical series (provide revenue with year suffix in account names e.g. "Sales 2022")';
    return;
  }
  const xs = years.map((y,i)=>i+1);
  const ys = years.map(y=>revByYear[y]||0);
  const reg = linearRegression(xs,ys);
  const projYears = parseInt(el('projY').value||3);
  const lastYear = years[years.length-1];
  let projText = 'Projections:\n';
  for(let i=1;i<=projYears;i++){
    const x = xs[xs.length-1] + i;
    const y = reg.intercept + reg.slope * x;
    projText += `${lastYear + i}: ${Math.round(y).toLocaleString()}\n`;
  }
  el('incomeStatement').textContent += '\n\n' + projText;
}

/* ==========================
   Excel import/export via SheetJS
   ========================== */
el('importExcelBtn').addEventListener('click', ()=>el('fileInput').click());
el('fileInput').addEventListener('change', async (e)=>{
  const f = e.target.files[0]; if(!f) return;
  const data = await f.arrayBuffer();
  const wb = XLSX.read(data);
  const ws = wb.Sheets[wb.SheetNames[0]];
  const json = XLSX.utils.sheet_to_json(ws, {header:1});
  const rows=[]; for(let i=1;i<json.length;i++){ const r=json[i]; if(!r || r.length<2) continue; rows.push(createRowObj(r[0]||'', r[1]||'', r[2]||0, r[3]||0)); }
  if(rows.length){ tb = rows; saveTB(); renderTB(); alert('Imported ' + rows.length + ' rows'); }
});

el('exportExcelBtn').addEventListener('click', ()=>{
  const ws = XLSX.utils.json_to_sheet(tb.map(r=>({Code:r.code,Name:r.name,Debit:r.debit,Credit:r.credit})));
  const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb,ws,'TrialBalance');
  XLSX.writeFile(wb,'trial_balance_export.xlsx');
});

/* ==========================
   PDF export via html2canvas + jspdf
   ========================== */
el('exportPdfBtn').addEventListener('click', async ()=>{
  const node = document.querySelector('.container');
  const canvas = await html2canvas(node, {scale:2});
  const img = canvas.toDataURL('image/png');
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p','pt', 'a4');
  const imgProps = pdf.getImageProperties(img);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(img, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save('financial_report.pdf');
});

/* ==========================
   Initial generate
   ========================== */
setTimeout(()=>{ generateStatements(); },300);
