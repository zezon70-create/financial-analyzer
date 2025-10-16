document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const themeToggle = document.getElementById('themeToggle');
    const langToggle = document.getElementById('langToggle');
    const currencySelect = document.getElementById('currencySelect');
    const htmlEl = document.documentElement;

    // --- Translations Object ---
    const translations = {
        ar: {
            title: "المحلل المالي",
            heroTitle: "أدخل بيانات ميزان المراجعة",
            heroText: "واستمتع بقوائم مالية دقيقة، تحليلات شاملة، وتنبؤات متقدمة مع دعم العملات واللغات.",
            startBtn: "ابدأ الآن",
            f1Title: "تحليل مالي متكامل",
            f1Desc: "احصل على نسب مالية دقيقة ورسوم بيانية تفاعلية.",
            f2Title: "استيراد وتصدير",
            f2Desc: "تحميل البيانات من Excel أو CSV وحفظ النتائج كـ PDF/Excel.",
            f3Title: "آمن وسهل",
            f3Desc: "كل البيانات تبقى محلياً على جهازك بدون إرسال للخادم.",
            footer: "© 2025 جميع الحقوق محفوظة - معتز مدكور"
        },
        en: {
            title: "Financial Analyzer",
            heroTitle: "Enter Trial Balance Data",
            heroText: "Get accurate financial statements, detailed analysis, and advanced forecasts with multi-language & currency support.",
            startBtn: "Start Now",
            f1Title: "Comprehensive Analysis",
            f1Desc: "Get accurate ratios and interactive charts.",
            f2Title: "Import & Export",
            f2Desc: "Load data from Excel/CSV and export to PDF/Excel.",
            f3Title: "Secure & Easy",
            f3Desc: "Your data stays local — nothing sent to the server.",
            footer: "© 2025 All rights reserved - Moataz Madkour"
        }
    };

    // --- Functions ---
    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            themeToggle.textContent = '☀️';
        } else {
            document.body.classList.remove('light-mode');
            themeToggle.textContent = '🌙';
        }
        localStorage.setItem('theme', theme);
    };

    const applyLanguage = (lang) => {
        htmlEl.lang = lang;
        htmlEl.dir = lang === 'ar' ? 'rtl' : 'ltr';
        langToggle.textContent = lang === 'ar' ? 'EN' : 'AR';
        
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            el.textContent = translations[lang][key];
        });

        localStorage.setItem('lang', lang);
    };

    const applyCurrency = (currency) => {
        currencySelect.value = currency;
        localStorage.setItem('currency', currency);
    };

    // --- Event Listeners ---
    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
        applyTheme(newTheme);
    });

    langToggle.addEventListener('click', () => {
        const newLang = htmlEl.lang === 'ar' ? 'en' : 'ar';
        applyLanguage(newLang);
    });

    currencySelect.addEventListener('change', (e) => {
        localStorage.setItem('currency', e.target.value);
    });

    // --- Initial Load from localStorage ---
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLang = localStorage.getItem('lang') || 'ar';
    const savedCurrency = localStorage.getItem('currency') || 'EGP';

    applyTheme(savedTheme);
    applyLanguage(savedLang);
    applyCurrency(savedCurrency);

    // --- Particle Background Animation ---
    const initParticleAnimation = () => {
        const canvas = document.createElement("canvas");
        canvas.id = "particleCanvas";
        document.getElementById("particles-bg").appendChild(canvas);
        const ctx = canvas.getContext("2d");

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setCanvasSize();

        let particles = [];
        const particleCount = window.innerWidth < 768 ? 50 : 150; // Fewer particles on mobile
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) / 2,
                dy: (Math.random() - 0.5) / 2
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const particleColor = document.body.classList.contains('light-mode') ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.3)";
            ctx.fillStyle = particleColor;
            
            for (let p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            }
            requestAnimationFrame(animate);
        }
        animate();
        window.addEventListener('resize', setCanvasSize);
    };

    initParticleAnimation();
});