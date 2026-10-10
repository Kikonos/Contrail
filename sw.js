// Contrail offline cache. Bump VERSION with every release so phones pick up the new app.
const VERSION = "contrail-2.8";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-180.png", "./icon-192.png", "./icon-512.png", "./favicon-32.png"];
// libraries the app needs, saved at install so the app works offline from the start
const LIBS = ["https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js", "https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/js/world.js", "https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&display=swap"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(async c => {
    await c.addAll(SHELL.map(u => new Request(u, { cache: "reload" })));
    // keep libraries from the previous version, fetch any that are missing; none of this may block the install
    for (const u of LIBS) { try { const old = await caches.match(u); if (old) await c.put(u, old); else await c.put(u, await fetch(new Request(u, { mode: "no-cors" }))); } catch (e) {} }
  }));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// a fetch that gives up after ms, so aircraft or hotel Wi-Fi without internet can't hang the app
function timed(req, ms, opt) {
  return new Promise((res, rej) => { const t = setTimeout(() => rej(new Error("timeout")), ms); fetch(req, opt).then(r => { clearTimeout(t); res(r); }, err => { clearTimeout(t); rej(err); }); });
}
// only keep a page that is really Contrail, not a Wi-Fi login page
async function isApp(r) {
  if (!r || !r.ok || r.redirected || !/text\/html/.test(r.headers.get("content-type") || "")) return false;
  try { return (await r.clone().text()).includes("<title>Contrail</title>"); } catch (e) { return false; }
}
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Flight data, weather and exchange rates are always fetched fresh, never from the cache
  if (["fr24api.flightradar24.com", "aerodatabox.p.rapidapi.com", "api.open-meteo.com", "open.er-api.com"].includes(url.hostname)) return;
  // the app itself: the newest copy from GitHub if it arrives within 3 seconds, otherwise the saved copy
  if (req.mode === "navigate" || (url.origin === location.origin && /\/(index\.html)?$/.test(url.pathname))) {
    const net = fetch(req, { cache: "no-store" }).then(async r => { if (await isApp(r)) { const c = r.clone(); await caches.open(VERSION).then(x => x.put("./index.html", c)); return r; } throw new Error("not the app"); });
    e.waitUntil(net.catch(() => {}));
    e.respondWith((async () => {
      const saved = await caches.match("./index.html");
      if (!saved) return net.catch(() => fetch(req));
      try { return await Promise.race([net, new Promise((_, rej) => setTimeout(() => rej(new Error("slow")), 3000))]); } catch (err) { return saved; }
    })());
    return;
  }
  // libraries, map outline, fonts and icons: saved copy first, refreshed in the background
  e.respondWith(caches.match(req).then(hit => {
    const net = timed(req, 15000).then(r => { if (r && (r.ok || r.type === "opaque")) { const c = r.clone(); caches.open(VERSION).then(x => x.put(req, c)); } return r; }).catch(() => hit || Response.error());
    if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
    return net;
  }));
});
