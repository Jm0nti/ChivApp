const formRegistro = document.querySelector(".formulario-registroChiva");
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

    function verificarExistenciaChiva(valueID) {
        const url = 'chivas.json';

        console.log('verificando existencia de Chiva');
        console.log(placaInput.value);
        console.log(placaInput)
        console.log(typeof(valueID))

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const Chiva = data.Chivas.find(user => user.placa == placaInput.value);

                if (Chiva) {
                    mostrarAlerta('La ID de Chiva ya existe', true);
                } else {

                    agregarChiva({
                        placa: placaInput.value,
                        marca: marcaInput.value,
                        capacidad: parseInt(capacidadInput.value),
                        modelo: parseInt(modeloInput.value),
                        conductor: null
                    });
                }
            })
            .catch(error => {
                console.error('Error al cargar el JSON:', error);
                mostrarAlerta('Error al cargar los datos', true);
            });
    }

    function agregarChiva(nuevoChiva) {
        fetch('http://localhost:3000/agregar-Chiva', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoChiva),
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
            verificarExistenciaChiva(valueID); 
        }

    });
});
