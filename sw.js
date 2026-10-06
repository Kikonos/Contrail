// Contrail offline cache. Bump VERSION with every release so phones pick up the new app.
const VERSION = "contrail-2.2";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png", "./favicon-32.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: "reload" })))));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Flight data, weather and exchange rates are always fetched fresh, never from the cache
  if (["fr24api.flightradar24.com", "aerodatabox.p.rapidapi.com", "api.open-meteo.com", "open.er-api.com"].includes(url.hostname)) return;
  // the app itself: always the newest copy from GitHub when online, the saved copy when offline
  if (req.mode === "navigate" || (url.origin === location.origin && /\/(index\.html)?$/.test(url.pathname))) {
    e.respondWith(fetch(req, { cache: "no-store" }).then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put("./index.html", c)); return r; }).catch(() => caches.match("./index.html")));
    return;
  }
  // libraries, map outline and icons: saved copy first, refreshed in the background
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(r => { if (r && (r.ok || r.type === "opaque")) { const c = r.clone(); caches.open(VERSION).then(x => x.put(req, c)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
