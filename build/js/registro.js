const formRegistro = document.querySelector(".formulario-registro");
const guiaAlerta = document.querySelector(".guiaAlerta");
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const id = document.getElementById('id');
const password = document.getElementById('password');

document.addEventListener('DOMContentLoaded', function() {

    console.log('registro.js loaded');

    function mostrarAlerta(mensaje, error = null) {
        const alerta = document.createElement("P");
        alerta.textContent = mensaje;
    
        if (error) {
            alerta.classList.add("error");
        } else {
            alerta.classList.add("correcto");
        }
        guiaAlerta.appendChild(alerta);
        //formRegistro.insertBefore(alerta, password.nextSibling);
    
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }

    function verificarExistenciaUsuario(id) {
        const url = 'credenciales.json';

        console.log('verificando existencia de usuario');

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const usuario = data.usuarios.find(user => user.id == id);

                if (usuario) {
                    mostrarAlerta('La ID de usuario ya existe', true);
                } else {
                    agregarUsuario({
                        id: parseInt(id.value.trim),
                        pass: password.value,
                        nombre: nombre.value,
                        apellido: apellido.value,
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
        })
        .catch(error => {
            console.error('Error al enviar datos al servidor:', error);
            mostrarAlerta('Error al enviar datos al servidor', true);
        });
    }
    

    formRegistro.addEventListener('submit', function(e) {
        e.preventDefault();

        if (nombre.value === '' || apellido.value === '' || id.value === '' || password.value === '') {
            mostrarAlerta('Todos los campos son obligatorios', true);
        } else {
            verificarExistenciaUsuario(id.value); 
        }
    });
});
