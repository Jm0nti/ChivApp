document.addEventListener('DOMContentLoaded', function() {
    const formularioViaje = document.querySelector('.formulario-viaje');
    const contenedorForm = document.querySelector('.contenido-home');

    formularioViaje.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;
        const fecha = document.getElementById('fecha').value;
        const horaSeleccionada = document.getElementById('hora').value;
        const n_pasajeros = document.getElementById('n_pasajeros').value;
        const chivaSeleccionada = document.getElementById('chiva').value;

        if (origen === '' || destino === '' || fecha === '' || horaSeleccionada === '' || n_pasajeros === '' || chivaSeleccionada === '') {
            mostrarAlerta('Todos los campos son obligatorios', true);
        }
    });

    function mostrarAlerta(mensaje, error = null) {
        // Elimina alerta si ya existe
        const alertaExistente = document.querySelector('.alerta');
        if (alertaExistente) {
            alertaExistente.remove();
        }
        
        // Crea alerta
        const alerta = document.createElement("P");
        alerta.textContent = mensaje;
        alerta.classList.add('alerta');
        
        if (error) {
            alerta.classList.add("error");
        } else {
            alerta.classList.add("correcto");
        }
        
        contenedorForm.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

    // Cargar opciones de origen y destino
    cargarCiudades();
    cargarChivas();


    function cargarCiudades() {
        const url = 'viajes.json';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const horarios = data.horarios;
                const ciudades = data.ciudades;
                const origenSelect = document.getElementById('origen');
                const destinoSelect = document.getElementById('destino');
                const horaSelect = document.getElementById('hora');

                ciudades.forEach(ciudad => {
                    const opcionOrigen = document.createElement('option');
                    opcionOrigen.value = ciudad;
                    opcionOrigen.textContent = ciudad;
                    origenSelect.appendChild(opcionOrigen);

                    const opcionDestino = document.createElement('option');
                    opcionDestino.value = ciudad;
                    opcionDestino.textContent = ciudad;
                    destinoSelect.appendChild(opcionDestino);
                });

                horarios.forEach(horario => {
                    const opcionHora = document.createElement('option');
                    opcionHora.value = horario;
                    opcionHora.textContent = horario;
                    horaSelect.appendChild(opcionHora);
                });
            })
            .catch(error => {
                console.error('Error al cargar el JSON:', error);
            });
    }
    function cargarChivas() {
        const url = 'placas.json';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const placas = data.placas;
                const placaSelect = document.getElementById('chiva');
                placas.forEach(placa => {
                    const opcionplaca = document.createElement('option');
                    opcionplaca.value = placa;
                    opcionplaca.textContent = placa;
                    placaSelect.appendChild(opcionplaca);
                });
            })
            .catch(error => {
                console.error('Error al cargar el JSON:', error);
            });
    }

});
