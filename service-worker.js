
self.addEventListener('install', function(e){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ console.log('SW activated'); });
self.addEventListener('fetch', function(e){ /* basic offline fallback could be added */ });
