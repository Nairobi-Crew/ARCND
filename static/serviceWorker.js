const CACHE_NAME = 'Arcanoid-Cache';
const CACHE_VERSION = '2';
const CACHE = `${CACHE_NAME}-${CACHE_VERSION}`;

this.addEventListener('activate', (e) => {
  console.log(e);
});

this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => {
      console.log('Install done', cache.addAll(['/', '/*']));
      return cache.addAll(['/', '/*']);
    }).catch((error) => {
      console.log('Install cache error', error);
    }),
  );
});
