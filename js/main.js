// main.js - language, currency, common helpers
const LANG_KEY = 'fa_lang';
const CUR_KEY = 'fa_currency';
document.addEventListener('DOMContentLoaded', ()=> {
  const savedLang = localStorage.getItem(LANG_KEY) || 'ar';
  const savedCur = localStorage.getItem(CUR_KEY) || 'EGP';
  document.querySelectorAll('#langSelect').forEach(sel=>{ if(sel) sel.value = savedLang; sel?.addEventListener('change',(e)=>{ localStorage.setItem(LANG_KEY,e.target.value); location.reload(); }); });
  document.querySelectorAll('#currencySelect').forEach(sel=>{ if(sel) sel.value = savedCur; sel?.addEventListener('change',(e)=>{ localStorage.setItem(CUR_KEY,e.target.value); window.dispatchEvent(new Event('currencyChanged')); }); });
  document.getElementById('year')?.textContent = new Date().getFullYear();
});
function formatMoney(v){
  const cur = localStorage.getItem(CUR_KEY) || 'EGP';
  try{ return new Intl.NumberFormat(undefined,{style:'currency',currency:cur, maximumFractionDigits:2}).format(v); }catch(e){ return Number(v).toLocaleString(); }
}
