const VERSION = "v1"
const CACHE_NAME = `dino-run-${VERSION}`;

const APP_STATIC_RESOURCES = [
    "./",
    "./index.html",
    "./style.css",
    "./app.js",
    "./cacti.png",
    "./t-rex-background.png",
    "./t-rex.png"
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      cache.addAll(APP_STATIC_RESOURCES);
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
          return undefined;
        }),
      );
      await clients.claim();
    })(),
  );
});