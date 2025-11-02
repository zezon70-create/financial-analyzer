// service-worker.js (نسخة v3 - القايمة الكاملة)

// --- الخطوة 1: تغيير اسم الكاش (الإصدار) ---
// غيرنا v2 لـ v3
const CACHE_NAME = 'financial-analyzer-v3';

// --- ▼▼▼ القايمة الكاملة 100% (شاملة كل صفحاتك وملفات الـ CDN) ▼▼▼ ---
const FILES_TO_CACHE = [
    // الصفحات الأساسية
    'index.html',
    'input.html',
    'upload.html',
    'report.html', 
    'advanced.html', 
    'dashboard.html', 
    'comparisons.html', 
    'benchmarks.html', 

    // ملفات الستايل
    'css/style.css',

    // ملفات الجافاسكريبت
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

    // ملفات الصور والأيقونات
    'assets/logo.png',
    'assets/icons/icon-192x192.png',
    'assets/icons/icon-512x512.png',

    // ملف الـ PWA
    'manifest.json',

    // --- ملفات الـ CDN الخارجية (مهم جداً) ---
    // الخطوط والأيقونات
    'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css',

    // ستايلات البوتستراب (بنضيف النسختين العادية والـ RTL)
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',

    // سكريبتات البوتستراب
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',

    // سكريبتات رفع الملفات (من input/upload)
    'https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js',
    'https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js',

    // سكريبتات التحليل المتقدم (من advanced)
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
];
// --- ▲▲▲ نهاية القايمة الكاملة ▲▲▲ ---


// --- حدث الـ "Install" (التثبيت) ---
// (هيخزن الملفات في الكاش الجديد v3)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[ServiceWorker] بيخزن الملفات الأساسية (v3)...');
                return cache.addAll(FILES_TO_CACHE);
            })
            .then(() => {
                console.log('[ServiceWorker] تخزين (v3) اكتمل. تفعيل فوري...');
                // السطر ده بيجبر الحارس الجديد إنه يشتغل علطول
                return self.skipWaiting(); 
            })
    );
});

// --- حدث الـ "Activate" (التفعيل) ---
// (هيمسح الكاش القديم v1 و v2)
self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] التفعيل (v3)...');
    const cacheWhitelist = [CACHE_NAME]; // القايمة البيضا (سيب v3 بس)

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('[ServiceWorker] مسح الكاش القديم:', cacheName);
                        return caches.delete(cacheName); // امسحه
                    }
                })
            );
        }).then(() => {
            console.log('[ServiceWorker] السيطرة على الصفحة (v3).');
            // السطر ده بيخلي الحارس الجديد يسيطر على الصفحة علطول
            return self.clients.claim();
        })
    );
});

// --- حدث الـ "Fetch" (جلب البيانات) ---
// (زي ما هو، بيجيب من الكاش الأول)
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
