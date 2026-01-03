const CACHE_NAME = 'verseflow-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon192.ico',
  './icon512.ico',
  './screenshot1.png',
  './screenshot2.png',
  './screenshot3.png'
];

// Install and cache all assets including screenshots
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Clean up old caches but keep the current one
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Offline-first: Serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});