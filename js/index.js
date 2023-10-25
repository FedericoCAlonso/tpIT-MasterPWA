
// Clave de la api
const ApiKey = "fbfb7f30d8105989e1a73331ca6b86c5";
// Obtener los elementos del DOM
const formClima = document.getElementById("form-clima");
const inputCiudad = document.getElementById("ciudad");
const resultadoClima = document.getElementById("resultado-clima");
const iconoPestania = document.getElementById("icono");


// Agregar un evento de escucha al formulario
formClima.addEventListener("submit", function(event) {
    // Evitar que se recargue la página
    event.preventDefault();
    // Obtener el valor del campo de texto
    const ciudad = inputCiudad.value;
    // Validar que no esté vacío
    if (ciudad) {
        // Hacer la petición a la API de OpenWeatherMap
        consultarClima(ciudad);
    } else {
        // Mostrar un mensaje de error
        mostrarError("Debes ingresar una ciudad");
    }
});

// Función para consultar el clima de una ciudad
function consultarClima(ciudad) {
    // Limpiar el resultado anterior
    resultadoClima.innerHTML = "";
    // Definir la URL de la API con la ciudad y la clave API
   
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=${ApiKey}`;
    // Usar fetch para hacer la petición
    fetch(url)
        .then(function(response) {
            // Si la respuesta es exitosa, devolver los datos en formato JSON
            if (response.ok) {
                return response.json();
            } else {
                // Si no, lanzar un error con el código de estado
                throw new Error(`Error ${response.status}`);
            }
        })
        .then(function(data) {
            // Mostrar los datos del clima en el elemento div
            mostrarClima(data);
        })
        .catch(function(error) {
            // Mostrar el error en el elemento div
            mostrarError(error.message);
        });
}

// Función para mostrar el clima de una ciudad
function mostrarClima(data) {
    
    const nombreCiudad = document.createElement("h2");
    nombreCiudad.textContent = `${data.name}, ${data.sys.country}`;
    // Crear un elemento img con el icono del clima
    const iconoEstado = document.createElement("img");
    iconoEstado.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    iconoEstado.alt = data.weather[0].description;
    iconoPestania.href = iconoEstado.src;
    // Crear un elemento p con la descripción del clima
    const descripcion = document.createElement("p");
    descripcion.textContent = data.weather[0].description;
    // Crear un elemento p con la temperatura actual
    const temperatura = document.createElement("p");
    temperatura.textContent = `Temperatura: ${data.main.temp} °C`;
    // Crear un elemento p con la humedad
    const humedad = document.createElement("p");
    humedad.textContent = `Humedad: ${data.main.humidity} %`;
    // Crear un elemento p con la presión
    const presion = document.createElement("p");
    presion.textContent = `Presión: ${data.main.pressure} hPa`;
    // Crear un elemento p con la velocidad del viento
    const velocidadViento = document.createElement("p");
    velocidadViento.textContent = `Viento: ${data.wind.speed} m/s`;
    // Agregar los elementos al elemento div
    const grupoNombre = document.createElement("div");
    
    grupoNombre.appendChild(nombreCiudad);
    grupoNombre.appendChild(iconoEstado);
    resultadoClima.appendChild(grupoNombre);
    /* resultadoClima.appendChild(nombreCiudad);
    resultadoClima.appendChild(iconoEstado); */
    resultadoClima.appendChild(descripcion);
    resultadoClima.appendChild(temperatura);
    resultadoClima.appendChild(humedad);
    resultadoClima.appendChild(presion);
    resultadoClima.appendChild(velocidadViento);
}

// Función para mostrar un error
function mostrarError(mensaje) {
    // Crear un elemento p con el mensaje de error
    const p = document.createElement("p");
    p.textContent = mensaje;
    p.className = "alert alert-danger";
    // Agregar el elemento al elemento div
    resultadoClima.appendChild(p);
}


