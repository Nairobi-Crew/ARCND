const VERSION = 3831;
const APP_NAME = 'Arcanoid-Game';
const CACHE_NAME = `${APP_NAME}-${VERSION}`;
const BUILD_FOLDER = '';
const PRECACHE_MANIFEST = `${BUILD_FOLDER}/resources-manifest.json`;

function cacheOrNetwork(event) {
  const clonedRequest = event.request.clone();
  return caches.match(event.request).then((resp) => resp || fetch(clonedRequest));
}

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  event.waitUntil(
    new Promise((resolve) => {
      caches
        .open(CACHE_NAME)
        .then((cache) => fetch(PRECACHE_MANIFEST)
          .then((resp) => resp.json())
          .then((jsonResp) => cache.addAll(['/', ...jsonResp.TO_CACHE.map((name) => `${BUILD_FOLDER}/${name}`)]))
          .then(resolve))
      // eslint-disable-next-line no-console
        .catch((err) => console.error('SW errors', err));
    }),
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(
      (keys) => keys.filter((key) => key !== CACHE_NAME)
        .forEach((key) => caches.delete(key)),
    ),
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  // eslint-disable-next-line no-restricted-globals
  if (event.request.url.indexOf(location.origin) === 0) {
    event.respondWith(cacheOrNetwork(event));
  }
});
