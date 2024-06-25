document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar los elementos <select> y el formulario
    const selectOrigen = document.getElementById('origen');
    const selectDestino = document.getElementById('destino');
    const formulario = document.querySelector('.formulario-viaje');
    const formularioLogin = document.querySelector('.formulario-login');

    // URL del archivo JSON (ciudades.json)
    const url = 'ciudades.json';

    // Cargar el JSON y cargar las opciones de ciudades en los <select>
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Iterar sobre las ciudades y agregarlas como opciones en los <select>
            data.ciudades.forEach(ciudad => {
                const optionOrigen = document.createElement('option');
                optionOrigen.value = ciudad;
                optionOrigen.textContent = ciudad;
                selectOrigen.appendChild(optionOrigen);

                const optionDestino = document.createElement('option');
                optionDestino.value = ciudad;
                optionDestino.textContent = ciudad;
                selectDestino.appendChild(optionDestino);
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));


    // Agregar event listener para el submit del formulario
    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto

        // Obtener los valores seleccionados de origen y destino
        const origenSeleccionado = selectOrigen.value;
        const destinoSeleccionado = selectDestino.value;



        // Verificar si origen y destino son iguales
        if (origenSeleccionado === destinoSeleccionado) {
            alert('El origen y el destino no pueden ser iguales. Por favor, selecciona otra combinación.');
        }
    });

    formularioLogin.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario por defecto

        window.location.href = 'home.html';
    });
});
