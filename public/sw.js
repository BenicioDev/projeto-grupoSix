const CACHE_NAME = 'vsl-app-v1';
const STATIC_CACHE = 'static-v1';

const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/index.css'
];

const RUNTIME_CACHE = [
  '/src/pages/VSLPage.jsx',
  '/src/components/VideoPlayer.jsx',
  '/src/components/ProductSection.jsx',
  '/src/components/TestimonialsSection.jsx',
  '/src/components/Footer.jsx'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('SW: Cache crítico criado');
        return cache.addAll(CRITICAL_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE) {
              console.log('SW: Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (!request.url.startsWith('http')) {
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(request)
            .then((response) => {
              const responseClone = response.clone();
              
              caches.open(STATIC_CACHE)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
              
              return response;
            });
        })
    );
    return;
  }

  if (isDynamicContent(url)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone para cache
          const responseClone = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(request, responseClone);
            });
          
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
    return;
  }

  if (isImage(url)) {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          const fetchPromise = fetch(request)
            .then((networkResponse) => {
              const responseClone = networkResponse.clone();
              
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
              
              return networkResponse;
            });

          return response || fetchPromise;
        })
    );
    return;
  }
});

function isStaticAsset(url) {
  return /\.(js|css|woff|woff2|ttf|eot)$/.test(url.pathname);
}

function isDynamicContent(url) {
  return url.pathname.includes('/api/') || 
         url.searchParams.has('dynamic') ||
         url.pathname.includes('.json');
}

function isImage(url) {
  return /\.(jpg|jpeg|png|gif|webp|svg|ico)$/.test(url.pathname);
}

self.addEventListener('sync', (event) => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(
      syncAnalytics()
    );
  }
});

