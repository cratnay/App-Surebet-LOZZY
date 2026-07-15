const CACHE_NAME='surebet-lozzy-v67';
const ASSETS=['./','./index.html','./SurebetApp.html','./logo_lozzy.png','./manifest.json'];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(()=>{})));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k===CACHE_NAME?null:caches.delete(k)))).then(()=>clients.claim()));
});
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
