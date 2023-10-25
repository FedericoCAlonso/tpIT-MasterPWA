const urlStart = "tpIT-MasterPWA/";

self.addEventListener("install", async event => {
    // sólo si queremos forzar al viejo SW a dejar de estar activo
    // event.skipWaiting();

    // precache - al momento de instalar el SW, vamos a descargar archivos para servir luego
    const cache = await caches.open("recursos");
    await cache.addAll([urlStart+"/", urlStart+"index.html", urlStart+"assets/CSS/fonts.css",urlStart+"assets/CSS/navbar.css",
    urlStart+"assets/CSS/paleta.css",urlStart+"assets/CSS/style.css", urlStart+"assets/iconos/logoLocoWeather_512.png",urlStart+"assets/iconos/logoSimple.png", 
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
/* async function handleRequest(request) {
    try {
        const networkResponse = await fetch(request);
        return networkResponse;
    } catch (e) {
        const cache = await caches.open("recursos");
        const cachedResponse = await cache.match(request);
        return cachedResponse;
    }
} */

async function handleRequest(request) {
    const cache = await caches.open("recursos");
    

    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
        const networkResponse = await fetch(request);
        cache.put(request, networkResponse.clone()); 

        return cachedResponse;
    }
  
    const networkResponse = await fetch(request);

  
    return networkResponse;
    
}
