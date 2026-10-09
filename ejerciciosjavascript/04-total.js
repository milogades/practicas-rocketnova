const productos = [
  { nombre: "Pizza", precio: 30000, cantidad: 2 },
  { nombre: "Coca-Cola", precio: 10000, cantidad: 3 },
  { nombre: "Hamburguesa", precio: 25000, cantidad: 1 }
];

function totalCompra(lista){
    return lista.reduce((total,producto) => total + producto.precio * producto.cantidad, 0);
}

console.log("Total: " + totalCompra(productos) + "G");