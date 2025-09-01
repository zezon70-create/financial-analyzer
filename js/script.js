// Dark Mode
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Language and Currency Switch
const languageSelector = document.getElementById('languageSelector');
const currencySelector = document.getElementById('currencySelector');

languageSelector?.addEventListener('change', () => {
    const lang = languageSelector.value;
    if(lang==='en') alert("English mode activated"); else alert("الوضع العربي مفعل");
});

currencySelector?.addEventListener('change', () => {
    const cur = currencySelector.value;
    alert("Currency switched to "+cur);
});
