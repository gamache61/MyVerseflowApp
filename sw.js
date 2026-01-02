const CACHE_NAME = 'verseflow-v2'; // Changed version to force update
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png'
];

// Install Event
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Force the new service worker to take over immediately
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate Event - This deletes the old "broken" cache
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch Event
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});