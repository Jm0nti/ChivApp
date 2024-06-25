document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar los elementos <select> y el formulario
    const selectOrigen = document.getElementById('origen');
    const selectDestino = document.getElementById('destino');
    const formulario = document.querySelector('.formulario-viaje');
    const formularioLogin = document.querySelector('.formulario-login');

    const url = 'viajes.json';

    fetch(url)
        .then(response => response.json())
        .then(data => {
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


    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const origenSeleccionado = selectOrigen.value;
        const destinoSeleccionado = selectDestino.value;

        if (origenSeleccionado === destinoSeleccionado) {
            alert('El origen y el destino no pueden ser iguales. Por favor, selecciona otra combinación.');
        }
    });

    formularioLogin.addEventListener('submit', function(event) {
        event.preventDefault();

        window.location.href = 'home.html';
    });
});
