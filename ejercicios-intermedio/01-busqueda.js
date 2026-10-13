const usuarios = [
  { nombre: "Juan", edad: 17, ciudad: "Encarnacion", email: "juan@email.com" },
  { nombre: "Maria", edad: 25, ciudad: "Asuncion", email: "maria@email.com" },
  { nombre: "Pedro", edad: 32, ciudad: "Asuncion", email: "pedro@email.com" },
  { nombre: "Ana", edad: 25, ciudad: "CiudadDelEste", email: "ana@email.com" },
  { nombre: "Luis", edad: 40, ciudad: "Encarnacion", email: "luis@email.com" }
];

function buscarUsuarios(filtros) {
  return usuarios.filter((usuario) => {
    if (filtros.nombre && usuario.nombre !== filtros.nombre) {
      return false;
    }
    if (filtros.edad && usuario.edad !== filtros.edad) {
      return false;
    }
    if (filtros.ciudad && usuario.ciudad !== filtros.ciudad) {
      return false;
    }
    if (filtros.email && usuario.email !== filtros.email) {
      return false;
    }
    return true;
  });
}

console.log(buscarUsuarios({ ciudad: "Asuncion" }));
console.log(buscarUsuarios({ edad: 25 }));
console.log(buscarUsuarios({ edad: 25, ciudad: "Asuncion" }));
console.log(buscarUsuarios({ nombre: "Nadie" }));