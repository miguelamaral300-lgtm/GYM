/* Project 80 service worker — shell cache so the app opens offline.
   Bump CACHE whenever you re-upload index.html so phones fetch the new version. */
const CACHE = "p80-v4";

/* Note: "./" is deliberately NOT listed. On this GitHub Pages site the bare
   directory URL 404s, and one failing entry would abort the whole install. */
const SHELL = [
  "./index.html",
  "./firebase-config.js",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c =>
      // cache each file independently so one bad entry can't kill the install
      Promise.all(SHELL.map(u =>
        fetch(new Request(u, { cache: "reload" }))
          .then(r => (r && r.ok) ? c.put(u, r) : null)
          .catch(() => null)
      ))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch (_) { return; }

  // never touch Firebase / Google traffic
  if (/googleapis|gstatic|firebase|google\.com/.test(url.hostname)) return;
  if (url.origin !== location.origin) return;

  // network first, fall back to cache, then to the app shell
  e.respondWith(
    fetch(req)
      .then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() =>
        caches.match(req).then(hit =>
          hit || caches.match("./index.html").then(shell =>
            shell || new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } })
          )
        )
      )
  );
});
