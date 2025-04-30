
const CACHE_NAME = "blogify-v1";
const urlsToCache = [
  "/", 
  "/index.html",
  "/fallback.html",
  "/post",
  "/uploads"
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

// Fetch event - Network First Strategy
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        // Clone response and save to cache
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, resClone);
        });
        return res;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(event.request).then((cachedRes) => {
          return cachedRes || caches.match("/fallback.html");
        });
      })
  );
});
