const CACHE_NAME = 'verseflow-v1';
const urlsToCache = [
  '/',
  'index.html',
  'manifest.json',
  'https://gamache61.github.io/MyVerseflowApp/icon192.png',
  'https://gamache61.github.io/MyVerseflowApp/icon512.png',
  'https://gamache61.github.io/MyVerseflowApp/maskableicon512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});