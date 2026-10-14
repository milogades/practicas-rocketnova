const productos = [
  { id: 1, nombre: "Pizza", votos: [] },
  { id: 2, nombre: "Hamburguesa", votos: [] },
  { id: 3, nombre: "Coca-Cola", votos: [] },
  { id: 4, nombre: "Agua", votos: [] }
];

function buscarProducto(id) {
  return productos.find((producto) => producto.id === id);
}


function calificar(id, nota) {
  const producto = buscarProducto(id);

  if (!producto) {
    return null;
  }
  if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
    return "La nota tiene que ser un número entero del 1 al 5";
  }

  producto.votos.push(nota);
  return producto;
}


function cantidadVotos(id) {
  const producto = buscarProducto(id);
  if (!producto) {
    return null;
  }
  return producto.votos.length;
}


function promedio(id) {
  const producto = buscarProducto(id);
  if (!producto || producto.votos.length === 0) {
    return null;
  }
  const suma = producto.votos.reduce((total, nota) => total + nota, 0);
  return Math.round((suma / producto.votos.length) * 10) / 10;
}

// Producto mejor valorado
function mejorValorado() {
  const conVotos = productos.filter((producto) => producto.votos.length > 0);

  return conVotos.reduce((mejor, producto) => {
    if (promedio(producto.id) > promedio(mejor.id)) {
      return producto;
    }
    return mejor;
  });
}


function promedioInferiorA3() {
  return productos.filter((producto) => {
    const media = promedio(producto.id);
    return media !== null && media < 3;
  });
}


calificar(1, 5);
calificar(1, 4);
calificar(1, 5);
calificar(2, 3);
calificar(2, 2);
calificar(3, 4);
calificar(3, 4);
calificar(3, 3);
calificar(3, 5);

console.log(calificar(1, 6));
console.log(calificar(1, 0));
console.log(calificar(1, 3.5));
console.log(calificar(99, 4));


for (const producto of productos) {
  console.log(producto.nombre + ": " + cantidadVotos(producto.id) + " votos, promedio " + promedio(producto.id));
}

console.log("Mejor valorado: " + mejorValorado().nombre);
console.log("Promedio inferior a 3:", promedioInferiorA3().map((producto) => producto.nombre));