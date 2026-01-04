// The name of your app's cache
const CACHE_NAME = 'MyVerseflowApp-cache-v1';

// The files you want to make available offline
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon192.png',
  '/icon512.png'
];

// Install the service worker and save the files to the cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache: ' + CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate the service worker and remove old versions of the cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch files from the cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});