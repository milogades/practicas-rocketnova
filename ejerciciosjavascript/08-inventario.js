const productos = [
  { id: 1, nombre: "Pizza", stock: 10 },
  { id: 2, nombre: "Hamburguesa", stock: 0 },
  { id: 3, nombre: "Coca-Cola", stock: 20 }
];

function listarDisponibles() {
  return productos.filter((producto) => producto.stock > 0);
}

function buscarProducto(id) {
  return productos.find((producto) => producto.id === id);
}

console.log(listarDisponibles());
console.log(buscarProducto(1));


