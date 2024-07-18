document.addEventListener('DOMContentLoaded', () => {
    const placafiltro = localStorage.getItem('placachiva');
    console.log(placafiltro)
    fetch('../../viajes.json')
        .then(response => response.json())
        .then(data => {
            const viajesContainer = document.querySelector('.viajes');
            const buttonState = JSON.parse(localStorage.getItem('buttonState')) || { enabledButtonId: 1 };
            const enabledButtonId = buttonState.enabledButtonId;
            const viajesFiltrados = data.viajes.filter(viaje => viaje.placa === placafiltro);
            console.log(viajesFiltrados);

            viajesFiltrados.forEach((viaje, index) => {
                const viajeDiv = document.createElement('div');
                viajeDiv.classList.add('viaje');

                viajeDiv.innerHTML = `
                    <h3>Viaje ${viaje.id}</h3>
                    <p><strong>Fecha:</strong> ${viaje.fecha}</p>
                    <p><strong>Hora de Salida:</strong> ${viaje.Hora}</p>
                    <p><strong>Destino:</strong> ${viaje.destino}</p>
                    <p><strong>Pasajeros:</strong> ${viaje.Aforo}</p>
                    <button class="btn-iniciar" data-id="${viaje.id}">Iniciar Viaje</button>
                `;

                viajesContainer.appendChild(viajeDiv);
            });

            const siguienteIdHabilitado = parseInt(enabledButtonId) + 1;
            console.log(`El próximo viaje habilitado será el ${siguienteIdHabilitado}`);

            document.querySelectorAll('.btn-iniciar').forEach(button => {
                button.addEventListener('click', (event) => {
                    const viajeId = event.target.getAttribute('data-id');
                    console.log(`Iniciando viaje con ID: ${viajeId}`);
                    window.location.href = `../../conductor2.html?id=${viajeId}`;
                });
            });
        })
        .catch(error => console.error('Error al obtener los viajes:', error));

    // Reiniciar id de los viajes
    function resetViajes() {
        localStorage.removeItem('buttonState'); // Elimina el estado actual de localStorage
        location.reload(); // Recarga la página para reflejar los cambios
    }

    // Llamada directa para reiniciar los viajes
    //resetViajes();
});
