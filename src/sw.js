const CACHE_NAME = 'cache-v1';
const URLS = [
  '/main.js',
  '/index.html',
];

addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Opened cache");
        return cache.addAll(URLS);
      })
      .catch((err) => {
        console.log(err);
        throw err;
      }),
  );
});

addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response !== undefined) {
          return response;
        }
        return fetch(event.request)
          .then((response) => {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseClone);
              });
            return response;
          }).catch((err) => console.log(err));
      }),
  );
});

addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((name) => true)
          .map((name) => caches.delete(name)),
      )),
  );
});
