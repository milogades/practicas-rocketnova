const usuarios = [
  { nombre: "Juan", edad: 17 },
  { nombre: "Maria", edad: 25 },
  { nombre: "Pedro", edad: 32 },
  { nombre: "Ana", edad: 16 },
  { nombre: "Luis", edad: 40 },
  { nombre: "Elena", edad: 15 },
  { nombre: "Carlos", edad: 28 },
  { nombre: "Lucia", edad: 21 },
  { nombre: "Sofia", edad: 19 },
  { nombre: "Diego", edad: 33 }
];

function contarPorEdad(lista) {
  const menores = lista.filter((usuario) => usuario.edad < 18);
  const mayores = lista.filter((usuario) => usuario.edad >= 18);

  return {
    menores: menores.length,
    mayores: mayores.length
  };
}

const resultado = contarPorEdad(usuarios);
console.log("Menores: " + resultado.menores);
console.log("Mayores: " + resultado.mayores);