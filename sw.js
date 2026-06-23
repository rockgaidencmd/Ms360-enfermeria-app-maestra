/* Service Worker — MS360 Enfermería (app maestra) v4 */
const CACHE = "ms360-enf-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./menu.css",
  "./menu.js",
  "./activacion.js",
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

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;

  // No interceptar Firebase / Google — deben ir siempre a la red
  const url = e.request.url;
  if (url.includes("firebase") || url.includes("googleapis") || url.includes("gstatic")) {
    return;
  }

  // Estrategia: red primero, caché de respaldo (offline)
  e.respondWith(
    fetch(e.request)
      .then((resp) => {
        if (resp && resp.status === 200 && resp.type === "basic") {
          const clon = resp.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clon));
        }
        return resp;
      })
      .catch(() =>
        caches.match(e.request).then((c) => c || caches.match("./index.html"))
      )
  );
});

self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});
