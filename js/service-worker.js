const CACHE_NAME = "cineverse-v1";

const urlsToCache = [
  "/",
  "index.html",
  "login.html",
  "register.html",
  "dashboard.html",
  "favorites.html",
  "profile.html",
  "feedback.html",
  "movie-details.html",
  "manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});