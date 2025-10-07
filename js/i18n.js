const langToggle = document.getElementById('lang-toggle');

const translations = {
  en: {
    title: "Financial Analyzer",
    submit: "Submit",
    ...
  },
  ar: {
    title: "المحلل المالي",
    submit: "إرسال",
    ...
  }
};

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key];
  });
  localStorage.setItem('lang', lang);
}

// تحميل اللغة من التخزين المحلي
if(localStorage.getItem('lang')){
  setLanguage(localStorage.getItem('lang'));
}

langToggle.addEventListener('change', (e) => setLanguage(e.target.value));
