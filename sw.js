/* =========================================================
   FAIL 3: SERVICE WORKER (TIDAK PERLU DIEDIT)
   PANDUAN: Fail ini bertugas untuk menjadikan PWA offline-aware.
   Bila buat projek baharu (duplicate), anda BIASANYA tidak perlu 
   menyentuh fail ini. 
   
   NOTA: Jika anda ingin kemas kini icon atau HTML secara paksa, 
   baru tukar nombor pada hujung CACHE_NAME (cth: dari v1 ke v2).
   ========================================================= */

const CACHE_NAME = 'pwa-nav-wrapper-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            try {
                const cache = await caches.open(CACHE_NAME);
                await cache.addAll(urlsToCache);
                self.skipWaiting();
            } catch (error) {
                console.error('SW Install Error:', error);
            }
        })()
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            try {
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            return caches.delete(cacheName);
                        }
                    })
                );
                self.clients.claim();
            } catch (error) {
                console.error('SW Activation Error:', error);
            }
        })()
    );
});

self.addEventListener('fetch', (event) => {
    // Abaikan permintaan luar (GAS iframe), hanya simpan aset local
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        (async () => {
            try {
                const networkResponse = await fetch(event.request);
                const cache = await caches.open(CACHE_NAME);
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            } catch (error) {
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) return cachedResponse;
                throw error;
            }
        })()
    );
});