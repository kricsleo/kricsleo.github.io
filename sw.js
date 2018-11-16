const cacheVer = 'kricsleo-cache-v2'
const cacheFileList = [
  '/',
  '/style.css',
  '/js/index.js',
  '/js/search.js',
];

self.addEventListener('install', evt => {
  self.skipWaiting();
  evt.waitUntil(caches.open(cacheVer).then(cache => {
    return cache.addAll(cacheFileList);
  }));
});

self.addEventListener('activate', evt => {
  evt.waitUntil(Promise.all([
    self.clients.claim(),
    caches.keys().then(cacheList => Promise.all(
      cacheList.map(cacheName => cacheName !== cacheVer ? caches.delete(cacheName) : undefined)
    ))
  ]));
})

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(res => {
      if (res) {
        return res;
      }
      const req = evt.request.clone();
      return fetch(req).then(res => {
        if (!res || res.status !== 200) {
          return res;
        }
        const resClone = res.clone();
        caches.open('kricsleo-cache-v1').then(cache => {
        });
        return res;
      });
    })
  );
})