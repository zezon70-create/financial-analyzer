// Main UI helpers: dark mode, i18n, currency, validation, export to PDF
(function(){
  // Dark mode
  const darkKey = 'fa_dark_mode';
  function applyDark(pref){
    if(pref) document.body.classList.add('dark'); else document.body.classList.remove('dark');
  }
  const saved = localStorage.getItem(darkKey);
  applyDark(saved === '1');
  window.toggleDark = function(el){
    const on = el.checked;
    applyDark(on);
    localStorage.setItem(darkKey, on ? '1' : '0');
  }

  // Currency
  const curKey = 'fa_currency';
  const defaultCur = localStorage.getItem(curKey) || 'USD';
  function applyCurrency(sym){
    document.querySelectorAll('.fa-currency-symbol').forEach(e=>{
      e.textContent = sym;
    });
  }
  applyCurrency(defaultCur);
  window.changeCurrency = function(sel){
    const v = sel.value;
    localStorage.setItem(curKey, v);
    applyCurrency(v);
  }

  // i18n
  const langKey = 'fa_lang';
  const defaultLang = localStorage.getItem(langKey) || 'en';
  async function loadLocale(lang){
    try{
      const res = await fetch(`lang/${lang}.json`);
      const data = await res.json();
      document.querySelectorAll('[data-i18n]').forEach(el=>{
        const key = el.getAttribute('data-i18n');
        if(data[key]) el.innerHTML = data[key];
      });
    }catch(err){
      console.warn('i18n load failed', err);
    }
  }
  loadLocale(defaultLang);
  window.changeLang = function(sel){
    const v = sel.value;
    localStorage.setItem(langKey, v);
    loadLocale(v);
  }

  // Simple validation: trial balance check
  window.validateTrialBalance = function(entries){
    // entries: array of {account, debit, credit}
    let d=0,c=0;
    entries.forEach(row=>{
      const dv = parseFloat(row.debit)||0;
      const cv = parseFloat(row.credit)||0;
      d += dv; c += cv;
    });
    return {debitTotal: d, creditTotal: c, balanced: Math.abs(d-c) < 0.005};
  }

  // Export report to PDF using html2pdf if available
  window.exportReportToPdf = async function(elementId, filename='report.pdf'){
    const el = document.getElementById(elementId);
    if(!el){ showToast('Report element not found','error'); return; }
    if(window.html2pdf){
      // enhanced export - header/footer handled below
      const opt = { margin: 0.8, filename, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
      html2pdf().set(opt).from(el).save();
    } else {
      // fallback

      showToast('PDF library not loaded. Connect to the internet or include html2pdf library.','error');
    }
  }

  // Lightweight unit test runner for arithmetic checks
  window.fa_run_tests = function(){
    const results = [];
    try{
      // example test: simple balance sheet totals
      const testEntries = [{account:'Cash',debit:100,credit:0},{account:'Sales',debit:0,credit:100}];
      const res = validateTrialBalance(testEntries);
      results.push({name:'Trial Balance equality', ok: res.balanced, info:res});
    }catch(e){
      results.push({name:'Exception', ok:false, info:e.toString()});
    }
    return results;
  }

})();

/* PDF export enhanced by automation */

// Export Chart.js canvas as PNG file
window.exportChartAsPNG = function(canvas, filename){
  try{
    if(typeof canvas === 'string') canvas = document.querySelector(canvas);
    if(!canvas) { showToast('Chart not found','error'); return; }
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a'); a.href = url; a.download = filename || 'chart.png'; document.body.appendChild(a); a.click(); a.remove();
    showToast('Chart exported','success');
  }catch(e){ console.error(e); showToast('فشل تصدير الرسم','error'); }
}
