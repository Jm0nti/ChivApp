// JavaScript para gestionar la visibilidad de las secciones y el comportamiento de los botones

// Mostrar sección de pago con tarjeta al hacer clic en el botón correspondiente
document
  .getElementById("pay-with-card-btn")
  .addEventListener("click", function () {
    document.getElementById("payment-options").style.display = "none";
    document.getElementById("card-payment-section").style.display = "block";
    document.getElementById("qr-payment-section").style.display = "none";
  });

// Mostrar sección de pago con QR al hacer clic en el botón correspondiente
document
  .getElementById("pay-with-qr-btn")
  .addEventListener("click", function () {
    document.getElementById("payment-options").style.display = "none";
    document.getElementById("card-payment-section").style.display = "none";
    document.getElementById("qr-payment-section").style.display = "block";
  });

// Volver a la sección de opciones de pago desde la sección de pago con tarjeta
document
  .getElementById("back-to-payment-options")
  .addEventListener("click", function () {
    document.getElementById("payment-options").style.display = "block";
    document.getElementById("card-payment-section").style.display = "none";
    document.getElementById("qr-payment-section").style.display = "none";
  });

// Volver a la sección de opciones de pago desde la sección de pago con QR
document
  .getElementById("back-to-payment-options-qr")
  .addEventListener("click", function () {
    document.getElementById("payment-options").style.display = "block";
    document.getElementById("card-payment-section").style.display = "none";
    document.getElementById("qr-payment-section").style.display = "none";
  });

//VALIDACION TARJETA

// Validación y formateo para el número de tarjeta
document.getElementById("card-number").addEventListener("input", function () {
  let cardNumber = this.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos

  // Determinar el tipo de tarjeta basado en los primeros dígitos
  let cardType = cardNumber.match(/^3[47]/)
    ? "amex"
    : cardNumber.match(/^4/)
    ? "visa"
    : cardNumber.match(/^5/)
    ? "mastercard"
    : "other";

  // Aplicar el formato y la longitud máxima según el tipo de tarjeta
  switch (cardType) {
    case "visa":
    case "mastercard":
      // Formato: XXXX XXXX XXXX XXXX
      cardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
      this.maxLength = 19; // máximo 19 caracteres (16 dígitos + 3 espacios)
      break;
    case "amex":
      // Formato: XXXX XXXXXX XXXXX
      cardNumber = cardNumber.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3");
      this.maxLength = 17; // máximo 17 caracteres (15 dígitos + 2 espacios)
      break;
    default:
      // Otros tipos de tarjeta o no reconocido
      this.maxLength = 19; // Por defecto, máximo 19 caracteres
      break;
  }

  // Actualizar el valor del campo con el formato aplicado
  this.value = cardNumber.trim();
});

// Validación y formateo para la fecha de expiración
document.getElementById("card-expiry").addEventListener("input", function () {
  let expiry = this.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos

  // Aplicar el formato MM/AA
  if (expiry.length > 2) {
    expiry = expiry.substring(0, 2) + "/" + expiry.substring(2);
  }

  // Limitar la longitud máxima a 5 caracteres (MM/AA)
  this.value = expiry.substring(0, 5);
});

// Validación y formateo para el CVV
document.getElementById("card-cvc").addEventListener("input", function () {
  let cvv = this.value.replace(/\D/g, ""); // Eliminar caracteres no numéricos

  // Determinar el tipo de tarjeta basado en el número de tarjeta
  let cardNumber = document
    .getElementById("card-number")
    .value.replace(/\D/g, "");
  let cardType = cardNumber.match(/^3[47]/)
    ? "amex"
    : cardNumber.match(/^4/)
    ? "visa"
    : cardNumber.match(/^5/)
    ? "mastercard"
    : "other";

  // Aplicar el formato y la longitud máxima según el tipo de tarjeta
  switch (cardType) {
    case "visa":
    case "mastercard":
      // Limitar a 3 dígitos
      cvv = cvv.substring(0, 3);
      this.maxLength = 3;
      break;
    case "amex":
      // Limitar a 4 dígitos
      cvv = cvv.substring(0, 4);
      this.maxLength = 4;
      break;
    default:
      // Por defecto, limitar a 4 dígitos para cualquier otro tipo de tarjeta
      cvv = cvv.substring(0, 4);
      this.maxLength = 4;
      break;
  }

  // Actualizar el valor del campo con el CVV formateado y limitado en longitud
  this.value = cvv;
});
