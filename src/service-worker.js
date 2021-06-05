/* eslint-disable no-restricted-globals,no-console */
const VERSION = 5002;
const APP_NAME = 'Arcanoid-Game';
const CACHE_NAME = `${APP_NAME}-${VERSION}`;
const CACHE_PREFER = [
  '/images/00.png',
  '/images/01.png',
  '/images/02.png',
  '/images/03.png',
  '/images/04.png',
  '/images/05.png',
  '/images/06.png',
  '/images/07.png',
  '/images/08.png',
  '/sounds/09.png',
  '/sounds/00.png',
  '/sounds/01.png',
  '/sounds/02.png',
  '/sounds/03.png',
  '/sounds/04.png',
  '/sounds/05.png',
  '/sounds/06.png',
  '/sounds/07.png',
  '/sounds/08.png',
  '/sounds/09.png',
];

const NETWORK_ONLY = [
  '/api/v2/auth/signin',
  '/api/v2/auth/signup',
  '/api/v2/auth/logout',
  '/api/v2/auth/user',
  '/api/v2/oauth/yandex',
  '/api/v2/oauth/yandex/service-id',
  '/api/v2/user/profile',
  '/api/v2/user/password',
  '/api/v2/user/',
  '/api/v2/search/',
  '/api/v2/user/profile/avatar',
  '/api/v2/leaderboard',
  '/api/v2/leaderboard/all',
  '/api/v2/forum',
  '/api/v2/forum/thread',
  '/api/v2/forum/userinfo',
];
self.addEventListener('install', async () => {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CACHE_PREFER);
  } catch (e) {
    // eslint-disable-next-line no-console
    // console.error('Error install service worker', e);
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(
      (keys) => keys.filter((key) => key !== CACHE_NAME)
        .forEach((key) => caches.delete(key)),
    ),
  );
});

const fromNetwork = async (request) => {
  try {
    return await fetch(request);
  } catch (e) {
    // console.error('Error network request from service worker', e);
    return Promise.reject();
  }
};

const fromCache = async (request) => {
  const cache = caches.match(request);
  if (cache) {
    return cache;
  }
  const answer = await fetch(request, { mode: 'no-cors' });
  return answer;
};

const tryNetwork = async (request) => {
  const cache = await caches.open(CACHE_NAME);
  let answer;
  try {
    answer = await fetch(request);
    await cache.put(request, answer.clone());
  } catch (e) {
    answer = await cache.match(request);
  }
  return answer;
};

const respondHandler = (e) => {
  const { request } = e;
  const url = new URL(request.url);
  const match = (u) => (p) => u.includes(p);
  if (url.origin === location.origin && url.search.includes('code')) {
    return fromNetwork(request);
  }

  if (url.origin === location.origin && NETWORK_ONLY.some(match(url.pathname))) {
    return fromNetwork(request);
  }
  if (url.origin === location.origin && CACHE_PREFER.some(match(url.pathname))) {
    return fromCache(request);
  }

  return tryNetwork(request);
};

self.addEventListener('fetch', (e) => {
  e.respondWith(respondHandler(e));
});
