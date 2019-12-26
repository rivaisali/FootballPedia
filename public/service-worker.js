importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
  workbox.precaching.precacheAndRoute([
    { url: "/", revision: '1' },
    { url: "/manifest.json", revision: '1' },
    { url: "/nav.html", revision: '1' },
    { url: "/index.html", revision: '1' },
    { url: "/team.html", revision: '1' },
    { url: "/player.html", revision: '1' },
    { url: "/detail_schedule.html", revision: '1' },
    //pages
    { url: "/pages/home.html", revision: '1' },
     { url: "/pages/schedule.html", revision: '1' },
    { url: "/pages/standings.html", revision: '1' },
    { url: "/pages/favorite.html", revision: '1' },
    { url: "/pages/contact.html", revision: '1' },
    { url: "/pages/about.html", revision: '1' },
    //css
    { url: "/css/materialize.min.css", revision: '1' },
    { url: "/css/main.css", revision: '1' },
    //js
    { url: "/js/materialize.min.js", revision: '1' },
    { url: "/js/materialize.js", revision: '1' },
    { url: "/js/jquery.min.js", revision: '1' },
    { url: "/js/nav.js", revision: '1' },
    { url: "/js/api_football.js", revision: '1' },
    { url: "/js/idb.js", revision: '1' },
    { url: "/js/database.js", revision: '1' },
    { url: "/js/schedule.js", revision: '1' },
    { url: "/js/standings.js", revision: '1' },
    { url: "/js/main.js", revision: '1' },
    { url: "/js/push.js", revision: '1' },
    { url: "/js/detail_team.js", revision: '1' },
    { url: "/js/detail_schedule.js", revision: '1' },
    //image
    { url: "/img/icons/icon-144x144.png", revision: '1' },
    { url: "/img/logo.png", revision: '1' },
    { url: "/img/logo-white.png", revision: '1' },
    { url: "/img/notification.png", revision: '1' },
    
  ]);
  
  workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);
  
  workbox.routing.registerRoute(
    new RegExp('/'),
    workbox.strategies.staleWhileRevalidate()
  );

  workbox.routing.registerRoute(
     new RegExp('https://api.football-data.org/v2/'),
     workbox.strategies.staleWhileRevalidate()
   );
 
 workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'pwa3-image-cache',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200]
        }),
        new workbox.expiration.Plugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ]
    })
  );
}
else {
  console.log(`Workbox gagal dimuat`);
}

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});