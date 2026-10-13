const usuarios = [
  { nombre: "Juan", puntos: 150 },
  { nombre: "Maria", puntos: 320 },
  { nombre: "Pedro", puntos: 210 }
];

function generarRanking(lista) {
  const ordenados = [...lista].sort((a, b) => b.puntos - a.puntos);

  return ordenados.map((usuario, indice) => {
    return {
      posicion: indice + 1,
      nombre: usuario.nombre,
      puntos: usuario.puntos
    };
  });
}

const ranking = generarRanking(usuarios);
console.log(ranking);

ranking.forEach((fila) => {
  console.log(fila.posicion + ". " + fila.nombre + " - " + fila.puntos + " puntos");
});