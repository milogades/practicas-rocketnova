const usuarios = [
  { nombre: "Juan", edad: 17 },
  { nombre: "Maria", edad: 25 },
  { nombre: "Pedro", edad: 32 },
  { nombre: "Ana", edad: 16 }
];

function obtenerNombres(lista){
    return lista.map((usuario) => usuario.nombre);
}
console.log(obtenerNombres(usuarios));