// sw.js - simple Service Worker for offline caching
const CACHE_NAME = 'fa-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/report.html',
  '/css/style.css',
  '/css/fa_enhancements.css',
  '/js/main.js',
  '/js/fa_enhancements.js',
  '/assets/logo.png'
];

self.addEventListener('install', (evt)=>{
  evt.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', (evt)=>{
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evt)=>{
  evt.respondWith(caches.match(evt.request).then(resp=>{
    return resp || fetch(evt.request);
  }));
});