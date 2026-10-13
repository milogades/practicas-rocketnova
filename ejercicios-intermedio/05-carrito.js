const carrito = [];

// Agregar producto
function agregarProducto(nombre, precio, cantidad) {
  const existente = carrito.find((producto) => producto.nombre === nombre);

  if (existente) {
    existente.cantidad = existente.cantidad + cantidad;
    return existente;
  }

  const nuevo = { nombre: nombre, precio: precio, cantidad: cantidad };
  carrito.push(nuevo);
  return nuevo;
}

// Eliminar producto
function eliminarProducto(nombre) {
  const indice = carrito.findIndex((producto) => producto.nombre === nombre);

  if (indice === -1) {
    return null;
  }

  const eliminado = carrito[indice];
  carrito.splice(indice, 1);
  return eliminado;
}

// Modificar cantidad
function modificarCantidad(nombre, cantidad) {
  const producto = carrito.find((producto) => producto.nombre === nombre);

  if (!producto) {
    return null;
  }
  if (cantidad <= 0) {
    return eliminarProducto(nombre);
  }

  producto.cantidad = cantidad;
  return producto;
}

// Vaciar carrito
function vaciarCarrito() {
  carrito.length = 0;
}

// Calcular subtotal
function calcularSubtotal() {
  return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
}

// Calcular descuento (las reglas del ejercicio 4)
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

  return subtotal * porcentaje / 100;
}

// Calcular total
function calcularTotal() {
  const subtotal = calcularSubtotal();
  const descuento = calcularDescuento(subtotal);
  return subtotal - descuento;
}

// Mostrar el carrito
function mostrarCarrito() {
  console.log(carrito);
  console.log("Subtotal: " + calcularSubtotal() + " Gs");
  console.log("Descuento: " + calcularDescuento(calcularSubtotal()) + " Gs");
  console.log("Total: " + calcularTotal() + " Gs");
  console.log("-----");
}

// Pruebas
agregarProducto("Pizza", 30000, 2);
agregarProducto("Coca-Cola", 10000, 3);
agregarProducto("Hamburguesa", 25000, 1);
mostrarCarrito();

agregarProducto("Pizza", 30000, 1);
mostrarCarrito();

modificarCantidad("Coca-Cola", 1);
eliminarProducto("Hamburguesa");
mostrarCarrito();

vaciarCarrito();
mostrarCarrito();