/* ============================================================================
 * 원탭 도구 허브 (OneTap Tools) · Service Worker
 *
 * 목적: 같은 오리진의 정적 파일만 캐시해 두 번째 실행부터 즉시 뜨게 하고,
 *       네트워크가 끊겨도 허브가 열리게 합니다.
 * 원칙:
 *   · 외부 오리진 요청은 건드리지 않습니다(가로채지도 않음).
 *   · `?embed` 요청(다른 사이트에 끼워 넣는 경우)은 우회합니다.
 *   · 문서(navigation)는 네트워크 우선 → 실패 시 캐시.
 *   · 그 밖의 정적 자산은 캐시 우선 + 뒤에서 조용히 갱신.
 * ==========================================================================*/
'use strict';

const VERSION = 'v2.0.0-bento';
const PREFIX = 'onetapl-hub-';
const CACHE = PREFIX + VERSION;

const CORE = [
  './',
  './index.html',
  './privacy.html',
  './styles.css',
  './data.js',
  './core.js',
  './thumbs.js',
  './app.js',
  './pwa.js',
  './manifest.webmanifest',
  './favicon.svg',
  './assets/favicon.svg',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png',
  './assets/icons/apple-touch-icon.png',
  './assets/fonts/hub-serif.woff2',
  './assets/fonts/plexkr-Regular.woff2',
  './assets/fonts/plexkr-SemiBold.woff2',
  './assets/fonts/plexkr-Bold.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // 한 파일이 실패해도 설치 자체는 끝나도록 개별로 담습니다.
    await Promise.all(CORE.map(async (url) => {
      try {
        const res = await fetch(url, { cache: 'reload' });
        if (res && res.ok) await cache.put(url, res);
      } catch (_) { /* 오프라인 설치 등: 다음 방문에서 채웁니다 */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter((k) => k.startsWith(PREFIX) && k !== CACHE)
      .map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

function bypass(url, request) {
  if (request.method !== 'GET') return true;
  if (request.headers.has('range')) return true;
  if (url.origin !== self.location.origin) return true;
  if (url.pathname.endsWith('/sw.js')) return true;
  if (url.searchParams.has('embed')) return true;
  return false;
}

async function networkFirst(request, cache) {
  try {
    const res = await fetch(request);
    if (res && res.ok) cache.put(request, res.clone()).catch(() => {});
    return res;
  } catch (_) {
    const hit = await cache.match(request, { ignoreSearch: true });
    if (hit) return hit;
    const shell = await cache.match('./index.html');
    if (shell) return shell;
    return new Response('오프라인 상태이고 저장된 사본이 없습니다.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
  }
}

async function cacheFirst(request, cache) {
  const hit = await cache.match(request, { ignoreSearch: false });
  if (hit) {
    // 뒤에서 조용히 최신본으로 바꿔 둡니다.
    fetch(request).then((res) => {
      if (res && res.ok) cache.put(request, res.clone()).catch(() => {});
    }).catch(() => {});
    return hit;
  }
  try {
    const res = await fetch(request);
    if (res && res.ok && res.type === 'basic') cache.put(request, res.clone()).catch(() => {});
    return res;
  } catch (_) {
    return new Response('', { status: 504, statusText: 'offline' });
  }
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  let url;
  try { url = new URL(request.url); } catch (_) { return; }
  if (bypass(url, request)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    if (request.mode === 'navigate') return networkFirst(request, cache);
    return cacheFirst(request, cache);
  })());
});
