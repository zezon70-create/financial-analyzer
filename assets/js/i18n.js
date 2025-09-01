const langSelect = document.getElementById('langSelect');
if(langSelect){
    langSelect.addEventListener('change', ()=>{
        const lang = langSelect.value;
        fetch(`i18n/${lang}.json`)
        .then(res => res.json())
        .then(data=>{
            const welcome = document.getElementById('welcomeText');
            if(welcome) welcome.innerText = data.welcomeText;
            const btn = document.getElementById('startBtn');
            if(btn) btn.innerText = data.startNow;
        });
    });
}
