// Basic Service Worker to enable PWA installation
const CACHE_NAME = 'verseflow-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // This allows the app to load while the browser checks for updates
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});