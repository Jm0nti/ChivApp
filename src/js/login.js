const formularioLogin = document.querySelector('.formulario-login');
const guiaAlerta = document.getElementById('guiaAlerta');
const id = document.getElementById('id');
const password = document.getElementById('password');

document.addEventListener('DOMContentLoaded', function() {
    console.log('login.js loaded');
    
    formularioLogin.addEventListener('submit', function(e) {
        e.preventDefault();
    
        if (id.value === '' || password.value === '') {
            mostrarAlerta('Todos los campos son obligatorios', true);
        } else {
            verificarCredenciales(id.value, password.value);
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
        
        guiaAlerta.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
    
    function verificarCredenciales(id, password) {
        const url = 'credenciales.json';
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const usuario = data.usuarios.find(user => user.id == id && user.pass === password);
    
                if (usuario) {
                    console.log("redirigiendo a home.html")
                    localStorage.setItem('nombreUsuario', usuario.nombre);
                    localStorage.setItem('adminUsuario', usuario.admin);  
                    window.location.href = 'home.html';
                } else {
                    mostrarAlerta('Credenciales incorrectas', true);
                }
            })
            .catch(error => {
                console.error('Error al cargar el JSON:', error);
                mostrarAlerta('Error al cargar los datos', true);
            });
    }
});
