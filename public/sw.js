// Bump this version string whenever you deploy to bust old caches.
const CACHE_NAME = 'scoreverse-cache-v3';

// Only pre-cache non-HTML static assets that rarely change.
const STATIC_ASSETS = [
  '/manifest.json',
  '/playstore-icon.png',
  '/favicon-round.png',
];

// Delete old caches on activation so users never see stale JS chunks.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // --- Network-first for HTML (navigation requests) ---
  // Always fetch fresh HTML so hashed JS/CSS bundles are never stale.
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // --- Cache-first for same-origin static assets (images, icons, etc.) ---
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then(cached => cached || fetch(request))
    );
    return;
  }

  // --- Network-only for everything else (API calls, external CDN) ---
  event.respondWith(fetch(request));
});
