// Версия sw
// Менять при каждом изменении файла
const cacheVersion = 'v1';

// Инициализация sw
self.addEventListener('install', function(event) {
  console.log('install', cacheVersion)
  event.waitUntil(
    caches.open(cacheVersion)
      .then((cache) => {
        console.log(cache)
        // fetch("./manifest.json")
        //   .then(response => {
        //     return new Promise((res) => response.json().then(
        //       (ans) => res({
        //         response,
        //         assets: ans.chunks,
        //       })
        //     ));
        //   })
        //   .then(({ response, assets }) => {
        //     // Список всех ресурсов
        //     const urlsToCache = [
        //       '/',
        //       ...Object.entries(assets).filter(([name, nameHash]) => name !== 'sw.js' && name !== 'images/.DS_Store' && name !== 'manifest.json').map(([_, nameHash]) => nameHash),
        //     ]
        //     cache.addAll(urlsToCache)
        //   })
      })
  );
});

// Удаление старого кэша, если он есть
self.addEventListener('activate', event => {
  console.log('activate', cacheVersion)
  event.waitUntil(
    caches.keys()
      .then(keyList => {
        Promise.all(keyList.map(key => {
          if (cacheVersion !== key) {
            console.log('Deleting cache: ' + key)
            return caches.delete(key);
          }
        }))
      })
  );
});

// Само кешировани
self.addEventListener('fetch', function(event) {
  console.log({ event })
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
