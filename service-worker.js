// service-worker.js (نسخة v6 - لإجبار تحديث الكاش)

// --- الخطوة 1: تغيير اسم الكاش (الإصدار) ---
// غيرنا v5 لـ v6
const CACHE_NAME = 'financial-analyzer-v6';

// --- القايمة الكاملة 100% (زي المرة اللي فاتت) ---
const FILES_TO_CACHE = [
    'index.html',
    'zezo.json',
    'input.html',
    'upload.html',
    'report.html', 
    'advanced.html', 
    'dashboard.html', 
    'comparisons.html', 
    'benchmarks.html', 

    'css/style.css',

    'js/main.js',
    'js/auth-guard.js',
    'js/index-app.js',
    'js/input-app.js',
    'js/upload-app.js', // سيتم تخزين النسخة الجديدة المُصححة
    'js/report-app.js',
    'js/advanced-app.js',
    'js/dashboard-app.js',
    'js/comparisons-app.js',
    'js/benchmarks-app.js',

    'assets/logo.png',
    'assets/icons/icon-192x192.png',
    'assets/icons/icon-512x512.png',

    'manifest.json',

    // --- ملفات الـ CDN الخارجية ---
    'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css', // (مهم لصفحة advanced)
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js',
    'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js',
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];


// --- حدث الـ "Install" (التثبيت) ---
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] بيخزن الملفات الأساسية (v5)...');
                // --- طريقة تخزين "أكثر أماناً" (بتتجاهل الأخطاء لو ملف CDN وقع) ---
                const promises = FILES_TO_CACHE.map(url => {
                    return cache.add(url).catch(err => {
                        console.warn(`[ServiceWorker] فشل تخزين الملف (سيتم تجاهله): ${url}`, err);
                    });
                });
                return Promise.all(promises);
            })
            .then(() => {
                console.log('[ServiceWorker] تخزين (v5) اكتمل. تفعيل فوري...');
                // بيجبر الحارس الجديد إنه يشتغل علطول وميستناش
                return self.skipWaiting(); 
            })
    );
});

// --- حدث الـ "Activate" (التفعيل) ---
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] التفعيل (v5)...');
    const cacheWhitelist = [CACHE_NAME]; // القايمة البيضا (سيب v5 بس)

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('[ServiceWorker] مسح الكاش القديم:', cacheName);
                        return caches.delete(cacheName); // امسح كل ما هو ليس v5 (يعني v4 هيتمسح)
                    }
                })
            );
        }).then(() => {
            console.log('[ServiceWorker] السيطرة على الصفحة (v5).');
            // بيجبر كل الصفحات المفتوحة إنها تستخدم الحارس الجديد ده فوراً
            return self.clients.claim();
        })
    );
});

// --- حدث الـ "Fetch" (جلب البيانات) ---
self.addEventListener('fetch', (event) => {
    const requestUrl = new URL(event.request.url);

    // استراتيجية "Network First" للملفات الأساسية
    if (event.request.mode === 'navigate' || 
        (requestUrl.pathname.endsWith('.html') || 
         requestUrl.pathname.endsWith('.js') || 
         requestUrl.pathname.endsWith('.css'))) 
    {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    // جبنا نسخة جديدة من النت
                    return caches.open(CACHE_NAME).then(cache => {
                        console.log(`[ServiceWorker] تخزين نسخة جديدة: ${event.request.url}`);
                        cache.put(event.request, response.clone());
                        return response;
                    });
                })
                .catch(err => {
                    // النت فاصل؟ روح هات من الكاش
                    console.log(`[ServiceWorker] النت فاصل. جاري البحث في الكاش عن: ${event.request.url}`);
                    return caches.match(event.request)
                        .then(response => {
                            return response || caches.match('index.html'); 
                        });
                })
        );
    } else {
        // استراتيجية "Cache First" للصور والخطوط
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    return response || fetch(event.request);
                })
        );
    }
});