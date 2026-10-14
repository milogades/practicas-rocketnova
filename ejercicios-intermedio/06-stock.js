const productos = [];
const STOCK_MINIMO = 5;

function buscarProducto(id) {
  return productos.find((producto) => producto.id === id);
}

function agregarProducto(id, nombre, stock) {
  if (buscarProducto(id)) {
    return "Ya existe un producto con el id " + id;
  }
  if (stock < 0) {
    return "El stock no puede ser negativo";
  }

  const nuevo = { id: id, nombre: nombre, stock: stock };
  productos.push(nuevo);
  return nuevo;
}

function aumentarStock(id, cantidad) {
  const producto = buscarProducto(id);

  if (!producto) {
    return null;
  }
  if (cantidad <= 0) {
    return "La cantidad debe ser mayor que cero";
  }

  producto.stock += cantidad;
  return producto;
}

function reducirStock(id, cantidad) {
  const producto = buscarProducto(id);

  if (!producto) {
    return null;
  }
  if (cantidad <= 0) {
    return "La cantidad debe ser mayor que cero";
  }
  if (cantidad > producto.stock) {
    return "Stock insuficiente: solo quedan " + producto.stock + " de " + producto.nombre;
  }

  producto.stock -= cantidad;
  return producto;
}

function consultarStock(id) {
  const producto = buscarProducto(id);

  if (!producto) {
    return null;
  }
  return producto.stock;
}

function productosAgotados() {
  return productos.filter((producto) => producto.stock === 0);
}

function productosStockBajo() {
  return productos.filter((producto) => producto.stock > 0 && producto.stock <= STOCK_MINIMO);
}

console.log(agregarProducto(1, "Pizza", 10));
console.log(agregarProducto(2, "Hamburguesa", 3));
console.log(agregarProducto(3, "Coca-Cola", 0));
console.log(agregarProducto(1, "Agua", 20));

console.log(aumentarStock(3, 12));
console.log(reducirStock(1, 4));
console.log(reducirStock(2, 5));
console.log(reducirStock(2, 3));

console.log("Stock de Pizza: " + consultarStock(1));
console.log("Agotados:", productosAgotados());
console.log("Stock bajo:", productosStockBajo());