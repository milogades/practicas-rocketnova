const productos = [
  { nombre: "Pizza", categoria: "comida" },
  { nombre: "Coca-Cola", categoria: "bebida" },
  { nombre: "Hamburguesa", categoria: "comida" },
  { nombre: "Agua", categoria: "bebida" }
];

function buscarPorCategoria(categoria) {
  return productos.filter((producto) => producto.categoria === categoria);
}

console.log(buscarPorCategoria("bebida"));