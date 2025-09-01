// main.js - language, currency, common helpers
const LANG_KEY = 'fa_lang';
const CUR_KEY = 'fa_currency';
document.addEventListener('DOMContentLoaded', ()=> {
  // load saved lang/currency
  const lang = localStorage.getItem(LANG_KEY) || 'ar';
  const cur = localStorage.getItem(CUR_KEY) || 'EGP';
  document.querySelectorAll('#langSelect, #languageSelect, #languageSwitch').forEach(sel=>{
    if(sel) sel.value = lang;
    sel?.addEventListener('change', (e)=>{
      localStorage.setItem(LANG_KEY, e.target.value);
      // simple: reload to apply (could be SPA)
      location.reload();
    });
  });
  document.querySelectorAll('#currencySelect').forEach(sel=>{
    if(sel) sel.value = cur;
    sel?.addEventListener('change', (e)=>{
      localStorage.setItem(CUR_KEY, e.target.value);
      // re-render tables / charts if needed
      window.dispatchEvent(new Event('currencyChanged'));
    });
  });
  // set year
  const y = new Date().getFullYear();
  document.getElementById('year')?.textContent = y;
});
function formatMoney(v){
  const cur = localStorage.getItem(CUR_KEY) || 'EGP';
  return new Intl.NumberFormat(undefined, {style:'currency',currency:cur, maximumFractionDigits:2}).format(v);
}
