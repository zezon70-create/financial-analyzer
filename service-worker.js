// service-worker.js

const CACHE_NAME = 'financial-analyzer-v1';

// ▼▼▼ دي أهم خطوة ▼▼▼
// ضيف هنا "كل" الملفات اللي موقعك بيحتاجها علشان يشتغل
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/input.html', 
    '/upload.html',
    '/report.html', 
    '/advanced.html', 
    '/dashboard.html', 
    '/comparisons.html', 
    '/benchmarks.html', 
    // ... (ضيف باقي صفحات الـ HTML)
    '/css/style.css',
    '/js/main.js',
    '/js/auth-guard.js',
    '/js/index-app.js',
    '/js/input-app.js', // ضيف كل ملفات الـ JS
    '/js/upload-app.js',
    '/js/report-app.js',
    '/js/advanced-app.js',
    '/js/dashboard-app.js',
    '/js/comparisons-app.js',
    '/js/benchmarks-app.js',

    // ... (ضيف باقي ملفات الـ JS)

    '/assets/logo.png',
    '/assets/icons/icon-192x192.png',
    '/assets/icons/icon-512x512.png',

    // دي الملفات الخارجية اللي بنستخدمها (CDN)
    'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
    // لو بتستخدم Bootstrap أو غيره في صفحات تانية، ضيف اللينكات بتاعتهم هنا
];

// 1. التثبيت (Install): بيخزن الملفات دي في الكاش
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] بيخزن الملفات الأساسية (App Shell)');
                return cache.addAll(FILES_TO_CACHE);
            })
    );
});

// 2. الجلب (Fetch): بيقدم الملفات من الكاش لو موجودة
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // لو الملف موجود في الكاش، رجعه
                if (response) {
                    return response;
                }
                // لو مش موجود، روح هاته من النت
                return fetch(event.request);
            }
        )
    );
});
