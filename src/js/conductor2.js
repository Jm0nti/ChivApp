document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const viajeId = urlParams.get('id');

    fetch('../../viajes.json')
        .then(response => response.json())
        .then(data => {
            const viaje = data.viajes.find(v => v.id == viajeId);
            if (viaje) {
                document.getElementById('viaje-info').innerHTML = `
                    <p><strong>Fecha:</strong> ${viaje.fecha}</p>
                    <p><strong>Hora de Salida:</strong> ${viaje.Hora}</p>
                    <p><strong>Destino:</strong> ${viaje.destino}</p>
                    <p><strong>Pasajeros:</strong> ${viaje.Aforo}</p>
                `;
            }
        })
        .catch(error => console.error('Error al obtener los detalles del viaje:', error));


    document.querySelector('.btn-terminar').addEventListener('click', () => {
        const buttonState = JSON.parse(localStorage.getItem('buttonState')) || { enabledButtonId: 1 };
        const nextEnabledButtonId = parseInt(viajeId) + 1;
        buttonState.enabledButtonId = nextEnabledButtonId;
        localStorage.setItem('buttonState', JSON.stringify(buttonState));
        window.location.href = '../../conductor1.html';
        fetch(`/eliminar-viaje/${viajeId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '../../conductor1.html';
            } else {
                console.error('Error al eliminar el viaje');
            }
        })
        .catch(error => console.error('Error en la solicitud de eliminación:', error));
    });

    document.querySelector('.btn-volver').addEventListener('click', () => {
        window.location.href = '../../conductor1.html';
    });
});
