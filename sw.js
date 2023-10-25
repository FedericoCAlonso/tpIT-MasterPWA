
importScripts("sw-helper.js");



self.addEventListener("install", async event => {
    // sólo si queremos forzar al viejo SW a dejar de estar activo
    // event.skipWaiting();

    // precache - al momento de instalar el SW, vamos a descargar archivos para servir luego
    const cache = await caches.open("recursos");
    await cache.addAll(["/", "index.html", "./CSS/*", "./assets/iconos/images/logoLocoWeather_512.png",
    "./assets/iconos/images/logoSimple.png", 
    "https://fonts.googleapis.com/css2?family=Lobster&display=swap",
    "https://fonts.googleapis.com/css2?family=Tilt+Neon&display=swap"
]);
    console.log("Archivos cacheados");

    // Se instaló el SW pero todavía está esperando, no está activo
})

self.addEventListener("activate", event => {
    // Ahora estamos activos y somos responsables de las PWAs de este scope
})

self.addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request));
});

// Network first
async function handleRequest2(request) {
    try {
        const networkResponse = await fetch(request);
        return networkResponse;
    } catch (e) {
        const cache = await caches.open("recursos");
        const cachedResponse = await cache.match(request);
        return cachedResponse;
    }
}

async function handleRequest(request) {
    const cache = await caches.open("recursos");
    

    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
        const networkResponse = await fetch(request);
        cache.put(request, networkResponse.clone()); // actualiza el cache

        return cachedResponse;
    }
  
    const networkResponse = await fetch(request);
    // lazy cache
    // cache.put(request, networkResponse.clone()); // actualiza el cache
  
    return networkResponse;
    
}

// self.addEventListener("fetch", async event => {
//     // una vez por cada recurso HTTP que cualquier página en mi scope esté solicitando
//     console.log(event.request);
//     // Cache First
//     event.respondWith(
//         (async () => {
//             const cache = await caches.open("recursos");
//             const response = await cache.match(event.request);
//             if (response!=undefined) {
//                 // Está en el cache
//                return response;
//             } else {
//                 // No está
//                return fetch(response);
//             }
//         })()
//     )
    

//     // FAKE RESPONSE
//     // const response = new Response("hola, <b>estoy en el SW</b>", {
//     //     headers: {
//     //         "Content-Type": "text/html"
//     //     }
//     // });
//     // responder por el recurso
//     // if (event.request.url=="http://localhost:5500/") {
//     //     event.respondWith(response);
//     // }
// })
