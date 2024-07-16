const formRegistro = document.querySelector(".formulario-registroChiva");
const guiaAlerta = document.querySelector(".guiaAlerta");
const OrigenInput = document.getElementById('OrigenInput');
const DestinoInput = document.getElementById('DestinoInput');
const IdInput = document.getElementById('IdInput');
const FechaInput = document.getElementById('FechaInput');
const PlacaInput = document.getElementById('PlacaInput');
const PrecioInput = document.getElementById('PrecioInput');
const NpInput = document.getElementById('NpInput');
const HoraInput = document.getElementById('HoraInput');
const valueID = IdInput.value;

document.addEventListener('DOMContentLoaded', function() {
    console.log('registroConductor.js loaded');

    function mostrarAlerta(mensaje, error = null) {

        const alertaExistente = document.querySelector('.alerta');
        if (alertaExistente) {
            alertaExistente.remove();
        }
        
        const alerta = document.createElement("P");
        alerta.textContent = mensaje;
        alerta.classList.add('alerta');
        
        if (error) {
            alerta.classList.add("error");
        } else {
            alerta.classList.add("correcto");
        }
        
        guiaAlerta.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

    function verificarExistenciaViaje(valueID) {
        const url = 'viajes.json';

        console.log('verificando existencia de usuario');
        console.log(IdInput.value);
        console.log(IdInput)
        console.log(parseInt(IdInput.value))
        console.log(parseInt(IdInput))
        console.log(typeof(valueID))

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const usuario = data.viajes.find(user => user.id == parseInt(IdInput.value));

                if (usuario) {
                    mostrarAlerta('La ID de usuario ya existe', true);
                } else {

                    agregarViaje({
                        
                        origen: OrigenInput.value,
                        destino: DestinoInput.value,
                        id: parseInt(IdInput.value),
                        fecha: FechaInput.value,
                        placa: PlacaInput.value,
                        precio: PrecioInput.value,
                        Aforo: parseInt(NpInput.value),
                        Hora: parseInt(HoraInput.value),

                        
                    });
                }
            })
            .catch(error => {
                console.error('Error al cargar el JSON:', error);
                mostrarAlerta('Error al cargar los datos', true);
            });
    }

    
    cargarChivas();

    function cargarChivas() {
        const url = 'placas.json';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const placas = data.placas;
                const placaSelect = document.getElementById('PlacaInput');
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
    //desde aquí

    function agregarViaje(nuevoViaje) {
        fetch('http://localhost:3000/agregar-viaje', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoViaje),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al guardar los datos en el servidor');
            }
            return response.text();
        })
        .then(data => {
            mostrarAlerta(data);
            formRegistro.reset();
        })
        .catch(error => {
            console.error('Error al enviar datos al servidor:', error);
            mostrarAlerta('Error al enviar datos al servidor', true);
        });
    }
    
    formRegistro.addEventListener('submit', function(e) {
        e.preventDefault();

        if (IdInput.value === "" || FechaInput.value === "" || OrigenInput.value === "" || DestinoInput.value === "" || PrecioInput.value === "" || NpInput.value === "" || HoraInput.value === "") {
            mostrarAlerta('Todos los campos son obligatorios', true);
        } else {
            verificarExistenciaViaje(valueID); 
        }

    });
});


