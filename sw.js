const CACHE_NAME = 'verseflow-v2'; // Changed to v2 to force update
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'https://gamache61.github.io/MyVerseflowApp/icon192.png',
  'https://gamache61.github.io/MyVerseflowApp/icon512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting()) // Forces the new service worker to take over immediately
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // Deletes the old v1 cache
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});