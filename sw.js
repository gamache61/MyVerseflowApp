const CACHE_NAME = 'verseflow-v41';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon192.png',
  './icon512.png'
];

// Install stage
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching Corrected PWA Assets...');
      return cache.addAll(ASSETS);
    })
  );
});

// Activate stage: Cleans up old versions
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch stage
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      return res || fetch(e.request);
    })
  );
});