const formRegistro = document.querySelector(".formulario-registro");
const guiaAlerta = document.querySelector(".guiaAlerta");
const marcaInput = document.getElementById('marcaInput');
const placaInput = document.getElementById('placaInput');
const capacidadInput = document.getElementById('capacidadInput');
const modeloInput = document.getElementById('modeloInput');
const valueID = placaInput.value;

document.addEventListener('DOMContentLoaded', function() {
    console.log('registroChiva.js loaded');

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
        console.log(placaInput.value);
        console.log(placaInput)
        console.log(parseInt(placaInput.value))
        console.log(parseInt(placaInput))
        console.log(typeof(valueID))

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const usuario = data.usuarios.find(user => user.id == parseInt(placaInput.value));

                if (usuario) {
                    mostrarAlerta('La ID de usuario ya existe', true);
                } else {

                    agregarUsuario({
                        id: parseInt(placaInput.value),
                        pass: modeloInput.value,
                        nombre: marcaInput.value,
                        apellido: capacidadInput.value,
                        admin: false
                    });
                }
            })
            .catch(error => {
                console.error('Error al cargar el JSON:', error);
                mostrarAlerta('Error al cargar los datos', true);
            });
    }

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

        if (placaInput.value === "" || modeloInput.value === "" || marcaInput.value === "" || capacidadInput.value === "") {
            mostrarAlerta('Todos los campos son obligatorios', true);
        } else {
            verificarExistenciaUsuario(valueID); 
        }

    });
});
