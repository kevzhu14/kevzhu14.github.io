/* =========================================================================
   Kill switch.

   The previous version of this site (the Almace Scaffolding Jekyll theme)
   registered a service worker at this exact path that precached the site and
   served it cache-first. Visitors who saw that version still have it
   installed, and it keeps replaying the old site no matter what the server
   sends.

   This replacement takes over, deletes every cache it left behind,
   unregisters itself, and reloads any open tabs onto the live site. Once a
   browser has run it, that browser is clean and this file does nothing more.

   Do not delete this file: an old client may still check for it. Removing it
   would strand those browsers on the cached copy.
   ========================================================================= */

self.addEventListener('install', function () {
  // Replace the old worker immediately instead of waiting for tabs to close
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (names) {
        return Promise.all(names.map(function (name) { return caches.delete(name); }));
      })
      .then(function () {
        return self.registration.unregister();
      })
      .then(function () {
        return self.clients.matchAll({ type: 'window' });
      })
      .then(function (clients) {
        clients.forEach(function (client) {
          // Reload each open tab so it picks up the real site
          if ('navigate' in client) client.navigate(client.url);
        });
      })
  );
});

/* No fetch handler: every request goes straight to the network. */
