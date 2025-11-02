service-worker.js
const CACHE_NAME = 'financial-analyzer-v2';
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
'manifest.json',
'https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap',
'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];
self.addEventListener('install', (event) => {
event.waitUntil(
caches.open(CACHE_NAME)
.then((cache) => {
console.log('[ServiceWorker] بيخزن الملفات الأساسية (App Shell)');
return cache.addAll(FILES_TO_CACHE);
})
);
});
self.addEventListener('activate', (event) => {
console.log('[ServiceWorker] التفعيل...');
const cacheWhitelist = [CACHE_NAME];
event.waitUntil(
caches.keys().then((cacheNames) => {
return Promise.all(
cacheNames.map((cacheName) => {
if (cacheWhitelist.indexOf(cacheName) === -1) {
console.log('[ServiceWorker] مسح الكاش القديم:', cacheName);
return caches.delete(cacheName);
}
})
);
})
);
return self.clients.claim(); 
});
self.addEventListener('fetch', (event) => {
event.respondWith(
caches.match(event.request)
.then((response) => {
if (response) {
return response;
}
return fetch(event.request);
}

      
)
);
});
