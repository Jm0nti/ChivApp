document.addEventListener('DOMContentLoaded', function() {
    const formularioViaje = document.querySelector('.formulario-viaje');
    const contenedorViajes = document.querySelector('.contenedor-viajes');
    const contenedorForm = document.querySelector('.contenido-home');
    const contenedorBienvenida = document.querySelector('.bienvenida');
    const nombreUsuario = localStorage.getItem('nombreUsuario');
    const adminUsuario = localStorage.getItem('adminUsuario');
    const mensajeBienvenida = document.createElement('h3');
    
    
    mensajeBienvenida.textContent = `Bienvenid@ ${nombreUsuario} :), eres ${adminUsuario==="true" ? 'administrador' : 'usuario'}`;
    contenedorBienvenida.appendChild(mensajeBienvenida);

    formularioViaje.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const origen = document.getElementById('origen').value;
        const destino = document.getElementById('destino').value;
        const fecha = document.getElementById('fecha').value;
        const horaSeleccionada = document.getElementById('hora').value;
        const n_pasajeros = document.getElementById('n_pasajeros').value;

        if (origen === '' || destino === '' || fecha === '' || horaSeleccionada === '' || n_pasajeros === '') {
            mostrarAlerta('Todos los campos son obligatorios', true);
        } else if (n_pasajeros>10) {
            mostrarAlerta('Puedes comprar como máximo 10 tickets', true);
        } else {
            mostrarViajes(origen, destino, fecha, horaSeleccionada, n_pasajeros);
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


    function mostrarViajes(origen, destino, fecha, horaSeleccionada, n_pasajeros) {
        const url = 'viajes.json';

        console.log('mostrando viajes');
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const viajes = data.viajes;

                // Limpiar contenedor de viajes previo
                contenedorViajes.innerHTML = '';

                // Filtrar viajes según los criterios
                const viajesFiltrados = viajes.filter(viaje => viaje.origen === origen && viaje.destino === destino);

                if (viajesFiltrados.length > 0) {
                    viajesFiltrados.forEach(viaje => {
                        const { precio } = viaje;
                        const totalViaje = precio * n_pasajeros;

                        const viajeHTML = document.createElement('DIV');
                        viajeHTML.classList.add('viaje');

                        viajeHTML.innerHTML = `
                            <h2>Detalles de viaje</h2>
                            <p><span>Origen:</span> ${origen} | <span>Destino:</span> ${destino}</p>
                            <p><span>Fecha:</span> ${fecha} | <span>Hora:</span> ${horaSeleccionada}</p>
                            <p><span>Número de pasajeros:</span> ${n_pasajeros} | <span>Precio:</span> $${totalViaje}</p>
                        `;

                        contenedorViajes.appendChild(viajeHTML);

                        const containerBtnPagar = document.createElement('DIV');
                        containerBtnPagar.classList.add('contenedor-btn-pagar');
                        
                        const botonPagar = document.createElement('BUTTON');
                        botonPagar.textContent = 'Proceder al pago';
                        botonPagar.classList.add('boton-pagar');

                        contenedorViajes.appendChild(containerBtnPagar);
                        containerBtnPagar.appendChild(botonPagar);
                    });

                
                } else {
                    const mensaje = document.createElement('P');
                    mensaje.textContent = 'No se encontraron viajes :(';
                    mensaje.classList.add('mensaje');
                    contenedorViajes.appendChild(mensaje);
                }
            })
            .catch(error => {
                console.error('Error al cargar el JSON:', error);
            });
    }

    // Cargar opciones de origen y destino
    cargarCiudades();

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
});
