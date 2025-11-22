/* ============================================
   SERVICE WORKER
   PWA Support & Offline Functionality
   ============================================ */

const CACHE_NAME = 'resume-builder-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/css/templates.css',
    '/css/themes.css',
    '/js/app.js',
    '/js/templates.js',
    '/js/pdf-generator.js',
    '/js/storage.js',
    '/js/ads.js',
    // External resources (will be cached as they're accessed)
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache resources
self.addEventListener('install', event => {
    console.log('[Service Worker] Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[Service Worker] Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('[Service Worker] Caching failed:', error);
            })
    );

    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating...');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

    // Claim clients immediately
    return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    const { request } = event;

    // Skip cross-origin requests
    if (!request.url.startsWith(self.location.origin) &&
        !request.url.includes('fonts.googleapis.com') &&
        !request.url.includes('cdnjs.cloudflare.com')) {
        return;
    }

    // Skip AdSense and Analytics requests
    if (request.url.includes('googlesyndication') ||
        request.url.includes('googletagmanager') ||
        request.url.includes('google-analytics')) {
        return;
    }

    event.respondWith(
        caches.match(request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    console.log('[Service Worker] Serving from cache:', request.url);
                    return response;
                }

                // Clone the request
                const fetchRequest = request.clone();

                return fetch(fetchRequest)
                    .then(response => {
                        // Check if valid response
                        if (!response || response.status !== 200 || response.type === 'error') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Cache the response for future use
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(request, responseToCache);
                            });

                        return response;
                    })
                    .catch(error => {
                        console.error('[Service Worker] Fetch failed:', error);

                        // Return offline page if available
                        return caches.match('/offline.html') || new Response('Offline');
                    });
            })
    );
});

// Background Sync - for offline downloads
self.addEventListener('sync', event => {
    console.log('[Service Worker] Background sync:', event.tag);

    if (event.tag === 'sync-downloads') {
        event.waitUntil(syncDownloads());
    }
});

function syncDownloads() {
    // Sync logic for offline downloads
    return Promise.resolve();
}

// Push notifications (future feature)
self.addEventListener('push', event => {
    console.log('[Service Worker] Push received:', event);

    const options = {
        body: event.data ? event.data.text() : 'New notification',
        icon: '/assets/images/icon-192.png',
        badge: '/assets/images/badge-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('Resume Builder', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    console.log('[Service Worker] Notification click:', event);

    event.notification.close();

    event.waitUntil(
        clients.openWindow('/')
    );
});

console.log('[Service Worker] Loaded');
