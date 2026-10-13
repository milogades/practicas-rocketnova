function calcularDescuento(subtotal) {
  let porcentaje;

  if (subtotal < 100000) {
    porcentaje = 0;
  } else if (subtotal <= 300000) {
    porcentaje = 5;
  } else if (subtotal <= 500000) {
    porcentaje = 10;
  } else {
    porcentaje = 15;
  }

  const descuento = subtotal * porcentaje / 100;
  const total = subtotal - descuento;

  return {
    subtotal: subtotal,
    porcentaje: porcentaje,
    descuento: descuento,
    total: total
  };
}

function mostrarCompra(subtotal) {
  const compra = calcularDescuento(subtotal);
  console.log("Subtotal: " + compra.subtotal + " Gs");
  console.log("Descuento (" + compra.porcentaje + "%): " + compra.descuento + " Gs");
  console.log("Total final: " + compra.total + " Gs");
  console.log("-----");
}

mostrarCompra(80000);
mostrarCompra(200000);
mostrarCompra(400000);
mostrarCompra(600000);