const productos = [
  { nombre: "Pizza", precio: 30000, cantidad: 2 },
  { nombre: "Coca-Cola", precio: 10000, cantidad: 3 },
  { nombre: "Hamburguesa", precio: 25000, cantidad: 1 }
];

function aplicarDescuento(lista, porcentaje) {
  return lista.map((producto) => {
    return {
      nombre: producto.nombre,
      precio: producto.precio - (producto.precio * porcentaje) / 100,
      cantidad: producto.cantidad
    };
  });
}

console.log(aplicarDescuento(productos, 10));
