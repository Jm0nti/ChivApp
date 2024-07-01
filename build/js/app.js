document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar los elementos <select> y el formulario
    const selectOrigen = document.getElementById('origen');
    const selectDestino = document.getElementById('destino');
    const formulario = document.querySelector('.formulario-viaje');

    // URL del archivo JSON 
    const url = 'viajes.json';

    console.log('app.js loaded');

    fetch('viajes.json')
    .then(response => response.json())
    .then(data => {
        console.log('Viajes:', data.viajes);
        console.log('Ciudades:', data.ciudades);

        const viajesContainer = document.getElementById('viajes');
        const ciudadesContainer = document.getElementById('ciudades');

        // data.viajes.forEach(viaje => {
        //     const viajeElement = document.createElement('div');
        //     viajeElement.textContent = `${viaje.origen} a ${viaje.destino} - $${viaje.precio}`;
        //     viajesContainer.appendChild(viajeElement);
        // });

        data.ciudades.forEach(ciudad => {
            
            // Cargar ciudades origen en formulario
            const optionOrigen = document.createElement('option');
            optionOrigen.value = ciudad;
            optionOrigen.textContent = ciudad;
            selectOrigen.appendChild(optionOrigen);
            // Cargo ciudades destino en formulario
            const optionDestino = document.createElement('option');
            optionDestino.value = ciudad;
            optionDestino.textContent = ciudad;
            selectDestino.appendChild(optionDestino);


            // const ciudadElement = document.createElement('div');
            // ciudadElement.textContent = ciudad;
            // ciudadesContainer.appendChild(ciudadElement);
        });
    })
    .catch(error => console.error('Error al cargar el JSON:', error));



    // Cargar el JSON y cargar las opciones de ciudades en los <select>
    // fetch(url)
    //     .then(response => response.json())
    //     .then(data => {
    //         // Iterar sobre las ciudades y agregarlas como opciones en los <select>
    //         data.ciudades.forEach(ciudad => {
    //             const optionOrigen = document.createElement('option');
    //             optionOrigen.value = ciudad;
    //             optionOrigen.textContent = ciudad;
    //             selectOrigen.appendChild(optionOrigen);

    //             const optionDestino = document.createElement('option');
    //             optionDestino.value = ciudad;
    //             optionDestino.textContent = ciudad;
    //             selectDestino.appendChild(optionDestino);
    //         });
    //     })
    //     .catch(error => console.error('Error al cargar el JSON:', error));


    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); 

        console.log('Formulario enviado desde app.js');
        const origenSeleccionado = selectOrigen.value;
        const destinoSeleccionado = selectDestino.value;

        if (origenSeleccionado === destinoSeleccionado) {
            alert('El origen y el destino no pueden ser iguales. Por favor, selecciona otra combinación.');
        }
    });
});
