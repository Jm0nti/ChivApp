document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.formulario-registro');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nuevoUsuario = {
            id: parseInt(document.getElementById('id').value),
            pass: document.getElementById('password').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            admin: false
        };

        fetch('http://localhost:3000/registro', {
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
            alert(data);
        })
        .catch(error => {
            console.error('Error al enviar datos al servidor:', error);
        });
    });
});
