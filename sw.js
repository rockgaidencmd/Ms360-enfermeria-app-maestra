/* Service Worker — MS360 Enfermería (app maestra) */
const CACHE = "ms360-enf-v2";

const ASSETS = [
  "./",
  "./index.html",
  "./menu.css",
  "./menu.js",
  "./manifest.json",
  "./icons/logo-canal.png",
  "./icons/logo-canal-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Estrategia: cache primero, red de respaldo (sirve para offline)
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request).then((resp) => {
        return caches.open(CACHE).then((c) => {
          try { c.put(e.request, resp.clone()); } catch (_) {}
          return resp;
        });
      }).catch(() => cached);
    })
  );
});
