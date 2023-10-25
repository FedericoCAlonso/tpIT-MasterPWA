let bip = null;

// Administrar el botón de instalación
window.addEventListener("appinstalled", event => {
 
})

window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault(); 
    bip = event;
});

document.addEventListener("DOMContentLoaded", event => {

    if (matchMedia("(display-mode: standalone)").matches) {
       
        document.querySelector("head").innerHTML = `
            <meta name="google" content="notranslate">
        `;
    }

    document.querySelector("#instalacion button").addEventListener("click", async (event) => {
        if (bip) {
            bip.prompt();
            const { outcome } = await bip.userChoice;
            // The deferredPrompt can only be used once.
            deferredPrompt = null;
            // Act on the user's choice
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt.');
            } else if (outcome === 'dismissed') {
                console.log('User dismissed the install prompt');
            }
        } else {
            alert("Instalalo manualmente")
        }
    });
})


