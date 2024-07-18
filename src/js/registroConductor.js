const formRegistro = document.querySelector(".formulario-registroChiva");
const guiaAlerta = document.querySelector(".guiaAlerta");
const nombreInput = document.getElementById('nombreInput');
const apellidoInput = document.getElementById('apellidoInput');
const idInput = document.getElementById('idInput');
const passwordInput = document.getElementById('passwordInput');
const placaInput = document.getElementById('placaInput');
const valueID = idInput.value;

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

    function verificarExistenciaUsuario(valueID) {
        const url = 'credenciales.json';

        console.log('verificando existencia de usuario');
        console.log(idInput.value);
        console.log(idInput)
        console.log(parseInt(idInput.value))
        console.log(parseInt(idInput))
        console.log(typeof(valueID))

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const usuario = data.usuarios.find(user => user.id == parseInt(idInput.value));
                const placa = data.usuarios.find(user => user.placa == placaInput.value)
                if (usuario) {
                    mostrarAlerta('La ID de usuario ya existe', true);
                
                } 
                else if(placa){
                    mostrarAlerta('La Chiva ya tiene conductor asignado', true);
                } 
                else {

                    agregarUsuario({
                        id: parseInt(idInput.value),
                        pass: passwordInput.value,
                        nombre: nombreInput.value,
                        apellido: apellidoInput.value,
                        placa: placaInput.value,

                        admin: false,
                        driver: true
                    });
                }
            })
            .catch(error => {
                console.error('Error al cargar el JSON:', error);
                mostrarAlerta('Error al cargar los datos', true);
            });
    }

    //desde aquí
    cargarChivas();

    function cargarChivas() {
        const url = 'placas.json';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const placas = data.placas;
                const placaSelect = document.getElementById('placaInput');
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

    function agregarUsuario(nuevoUsuario) {
        fetch('http://localhost:3000/agregar-usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoUsuario),
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

        if (idInput.value === "" || passwordInput.value === "" || nombreInput.value === "" || apellidoInput.value === "") {
            mostrarAlerta('Todos los campos son obligatorios', true);
        } else {
            verificarExistenciaUsuario(valueID); 
        }

    });
});
