const usuarios = [
  { nombre: "Juan", ciudad: "Encarnacion" },
  { nombre: "Maria", ciudad: "Asuncion" },
  { nombre: "Pedro", ciudad: "Asuncion" },
  { nombre: "Ana", ciudad: "CiudadDelEste" },
  { nombre: "Luis", ciudad: "Encarnacion" }
];

function agruparPorCiudad(lista) {
  return lista.reduce((grupos, usuario) => {
    if (!grupos[usuario.ciudad]) {
      grupos[usuario.ciudad] = [];
    }
    grupos[usuario.ciudad].push(usuario);
    return grupos;
  }, {});
}

console.log(agruparPorCiudad(usuarios));