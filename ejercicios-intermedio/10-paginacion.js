const usuarios = [];

for (let i = 1; i <= 25; i++) {
  usuarios.push({ id: i, nombre: "Usuario " + i });
}

function paginar(datos, pagina, cantidad) {
  if (pagina < 1 || cantidad < 1) {
    return [];
  }

  const inicio = (pagina - 1) * cantidad;
  const fin = inicio + cantidad;

  return datos.slice(inicio, fin);
}


function verIds(lista) {
  return lista.map((usuario) => usuario.id);
}

console.log("Página 1:", verIds(paginar(usuarios, 1, 10)));
console.log("Página 2:", verIds(paginar(usuarios, 2, 10)));
console.log("Página 3:", verIds(paginar(usuarios, 3, 10)));
console.log("Página 4:", verIds(paginar(usuarios, 4, 10)));
console.log("Página 0:", verIds(paginar(usuarios, 0, 10)));
console.log("Página 2 de 5 en 5:", verIds(paginar(usuarios, 2, 5)));