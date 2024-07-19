document.addEventListener("DOMContentLoaded", function () {
  const totalViaje = localStorage.getItem("totalViaje");
  const fechaviaje = localStorage.getItem("fechaviaje");
  const origenviaje = localStorage.getItem("origenviaje");
  const destinoviaje = localStorage.getItem("destinoviaje");
  const horaSeleccionadaviaje = localStorage.getItem("horaviaje");
  const n_pasajerosviaje = localStorage.getItem("n_pasajerosviaje");

  // Función para manejar la confirmación de pago por tarjeta
  function confirmarPagoTarjeta() {
    const esPagoAceptado = Math.random() < 0.5; // 50% de probabilidad de ser aceptado

    if (esPagoAceptado) {
      document.getElementById("confirmacion-titulo").textContent =
        "Pago Confirmado";
      document
        .getElementById("confirmacion-mensaje")
        .classList.remove("confirmacion-error");
      document.getElementById("detalles-pago").innerHTML = `
        <p><b>Detalles</b></p>
        <p><b>Origen:</b> ${origenviaje} | <b>Destino:</b> ${destinoviaje}</p>
        <p><b>Fecha:</b> ${fechaviaje} | <b>Hora:</b> ${horaSeleccionadaviaje}</p>
        <p><b>Número de pasajeros:</b> ${n_pasajerosviaje} | <b>Precio:</b> $${totalViaje}</p>
        <p class="pago-aceptado">Pago exitoso, la factura ha sido enviada a tu correo</p>
      `;
    } else {
      document.getElementById("confirmacion-titulo").textContent =
        "Pago Rechazado";
      document
        .getElementById("confirmacion-mensaje")
        .classList.remove("confirmacion-exito");
      document.getElementById("detalles-pago").innerHTML = `
        <p><b>Detalles</b></p>
        <p><b>Origen:</b> ${origenviaje} | <b>Destino:</b> ${destinoviaje}</p>
        <p><b>Fecha:</b> ${fechaviaje} | <b>Hora:</b> ${horaSeleccionadaviaje}</p>
        <p><b>Número de pasajeros:</b> ${n_pasajerosviaje} | <b>Precio:</b> $${totalViaje}</p>
        <p class="pago-rechazado">Pago rechazado, contáctate con tu banco.</p>
      `;
    }
  }

  // Función para manejar la confirmación de pago por QR
  function confirmarPagoQR() {
    // Simular envío de captura de transferencia por QR
    document.getElementById("info-adicional").textContent =
      "Tu solicitud de pago por QR ha sido recibida. Pronto recibirás una respuesta por correo.";
  }

  confirmarPagoTarjeta();

  // Event Listeners para botones de pago
  document
    .getElementById("pay-with-card-btn")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Evitar el envío del formulario por defecto
      confirmarPagoTarjeta();
    });

  document
    .getElementById("pay-with-qr-btn")
    .addEventListener("click", function (event) {
      event.preventDefault(); // Evitar el envío del formulario por defecto
      confirmarPagoQR();
    });
});
