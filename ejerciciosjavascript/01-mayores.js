const usuarios = [
  { nombre: "Juan", edad: 17 },
  { nombre: "Maria", edad: 25 },
  { nombre: "Pedro", edad: 32 },
  { nombre: "Ana", edad: 16 }
];

function mayoresDeEdad(lista) {
    return lista.filter((usuario) => usuario.edad >= 18);
}

console.log(mayoresDeEdad(usuarios));
