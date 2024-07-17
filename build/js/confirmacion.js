//confirmacion de pago
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
        <p>Detalles del pago:</p>
        <p>Fecha: ${new Date().toLocaleDateString()}</p>
        <p>Monto: $100.00</p>
        <p>Tarjeta utilizada: **** **** **** 1234</p>
      `;
  } else {
    document.getElementById("confirmacion-titulo").textContent =
      "Pago Rechazado";
    document
      .getElementById("confirmacion-mensaje")
      .classList.remove("confirmacion-exito");
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
