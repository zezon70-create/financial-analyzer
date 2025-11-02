// service-worker.js (نسخة محدثة مع تنظيف الكاش)

// --- الخطوة 1: تغيير اسم الكاش (الإصدار) ---
// غيرنا v1 لـ v2
const CACHE_NAME = 'financial-analyzer-v2';

// دي قايمة الملفات بتاعتك زي ما هي
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
    'favicon.ico',

    'css/style.css',

    'js/main.js',
    'js/auth-guard.js',
    'js/index-app.js',
    'js/input-app.js',
    'js/upload-app.js',
    'js/report-app.js',
    'js/advanced-app.js',
    'js/dashboard-app.js',
    'js/comparisons-app.js',
    'js/benchmarks-app.js',
   
    'assets/logo.png',
    'assets/icons/icon-192x192.png',
    'assets/icons/icon-512x512.png',

    'manifest.json', // (لازم نضيف ده كمان)

    // الملفات الخارجية (CDN)
    'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
    // (ضيف أي لينكات CDN تانية لو موجودة)
];

// --- حدث الـ "Install" (التثبيت) ---
// (ده زي ما هو، هيخزن الملفات في الكاش الجديد v2)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] بيخزن الملفات الأساسية (App Shell)');
                return cache.addAll(FILES_TO_CACHE);
            })
    );
});

// --- ▼▼▼ الخطوة 2: إضافة حدث الـ "Activate" (التفعيل) ▼▼▼ ---
// (ده الكود الجديد اللي هيمسح الكاش القديم v1)
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] التفعيل...');
    const cacheWhitelist = [CACHE_NAME]; // القايمة البيضا (سيب الكاش الجديد v2 بس)

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // لو اسم الكاش مش موجود في القايمة البيضا (يعني ده كاش قديم زي v1)
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('[ServiceWorker] مسح الكاش القديم:', cacheName);
                        return caches.delete(cacheName); // امسحه
                    }
                })
            );
        })
    );
    // السطر ده بيخلي الحارس الجديد يسيطر على الصفحة علطول
    return self.clients.claim(); 
});
// --- ▲▲▲ نهاية الإضافة ▲▲▲ ---


// --- حدث الـ "Fetch" (جلب البيانات) ---
// (ده زي ما هو، بيجيب الملفات من الكاش الأول)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response; // رجع من الكاش لو موجود
                }
                return fetch(event.request); // لو مش موجود، هاته من النت
            }
        )
    );
});
