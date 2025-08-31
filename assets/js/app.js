/* app.js - shared utilities, lang, theme, storage */
const STORAGE_KEY = 'fa_trial_balance_v1';
const LANG_KEY = 'fa_lang_v1';

const i18n = {
  ar: { clear_confirm: 'هل تريد مسح كل البيانات؟', cleared: 'تم مسح البيانات.' },
  en: { clear_confirm: 'Clear all saved data?', cleared: 'Data cleared.' }
};

function formatMoney(x){ if(x===undefined||x===null) return '-'; return Number(x).toLocaleString(); }
function saveTB(tb){ localStorage.setItem(STORAGE_KEY, JSON.stringify(tb)); }
function loadTB(){ try{ const s = localStorage.getItem(STORAGE_KEY); return s? JSON.parse(s): []; }catch(e){return []; } }
function clearAllData(){ localStorage.removeItem(STORAGE_KEY); }

function setLang(lang){
  localStorage.setItem(LANG_KEY, lang);
  if(lang === 'ar'){ document.documentElement.setAttribute('dir','rtl'); document.documentElement.lang='ar'; }
  else { document.documentElement.setAttribute('dir','ltr'); document.documentElement.lang='en'; }
  document.querySelectorAll('[id^="langSwitch"]').forEach(s => s.value = lang);
}

function applyTheme(theme){
  if(theme === 'light') document.body.classList.add('light');
  else document.body.classList.remove('light');
  localStorage.setItem('fa_theme', theme);
}

document.addEventListener('DOMContentLoaded', ()=>{
  // Clear data buttons
  document.querySelectorAll('#clearDataBtn, #clearDataBtn2, #clearDataBtn3, #clearDataBtn4').forEach(b=>{
    b?.addEventListener('click', ()=>{
      const lang = localStorage.getItem(LANG_KEY) || 'ar';
      if(confirm(i18n[lang].clear_confirm)){
        clearAllData();
        alert(i18n[lang].cleared);
        location.reload();
      }
    });
  });

  // language selectors
  document.querySelectorAll('[id^="langSwitch"]').forEach(s => {
    s.addEventListener('change', (e) => setLang(e.target.value));
  });
  setLang(localStorage.getItem(LANG_KEY) || 'ar');

  // theme toggle
  const themeBtn = document.getElementById('themeToggle');
  if(themeBtn){
    const current = localStorage.getItem('fa_theme') || 'dark';
    applyTheme(current);
    themeBtn.textContent = current === 'dark' ? 'Dark' : 'Light';
    themeBtn.addEventListener('click', ()=>{
      const next = (localStorage.getItem('fa_theme') || 'dark') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      themeBtn.textContent = next === 'dark' ? 'Dark' : 'Light';
    });
  }

  // Dashboard quick nav
  document.getElementById('openReports')?.addEventListener('click', ()=> location.href = 'reports.html');
  document.getElementById('openData')?.addEventListener('click', ()=> location.href = 'data.html');
});
