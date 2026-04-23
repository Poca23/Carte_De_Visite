const CACHE = "cnd-v1";
const FILES = [
  "/",
  "/index.html",
  "/css/main.css",
  "/css/base.css",
  "/css/layout.css",
  "/css/panel.css",
  "/css/card.css",
  "/css/print.css",
  "/js/main.js",
  "/js/history.js",
  "/js/render.js",
  "/js/media.js",
  "/js/drag.js",
  "/assets/logos/logo-dark-removebg-preview.png",
  "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js",
];

self.addEventListener("install", (e) =>
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES))),
);

self.addEventListener("activate", (e) =>
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      ),
  ),
);

self.addEventListener("fetch", (e) =>
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request))),
);
