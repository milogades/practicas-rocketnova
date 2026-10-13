const usuarios = [
  { id: 1, nombre: "Juan", edad: 17 },
  { id: 2, nombre: "Maria", edad: 25 },
  { id: 3, nombre: "Pedro", edad: 32 }
];

function listarUsuarios() {
  return usuarios.map((usuario) => {
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      edad: usuario.edad
    };
  });
}

function buscarUsuario(id) {
  const encontrado = usuarios.find((usuario) => usuario.id === id);
  if (!encontrado) {
    return null;
  }
  return encontrado;
}

function buscarPorNombre(nombre) {
  const encontrado = usuarios.find((usuario) => usuario.nombre === nombre);
  if (!encontrado) {
    return null;
  }
  return encontrado;
}

function crearUsuario(nombre, edad) {
  if (!nombre) {
    return "Falta el nombre";
  }
  if (typeof edad !== "number" || edad < 0) {
    return "La edad no puede ser negativa";
  }

  const id = usuarios.reduce((max, usuario) => {
    if (usuario.id > max) {
      return usuario.id;
    }
    return max;
  }, 0) + 1;

  const repetido = usuarios.find((usuario) => usuario.id === id);
  if (repetido) {
    return "ID repetido";
  }

  const nuevo = { id: id, nombre: nombre, edad: edad };
  usuarios.push(nuevo);
  return nuevo;
}

function eliminarUsuario(id) {
  const encontrado = buscarUsuario(id);
  if (!encontrado) {
    return null;
  }

  const indice = usuarios.findIndex((usuario) => usuario.id === id);
  usuarios.splice(indice, 1);
  return encontrado;
}

function actualizarUsuario(id, nombre) {
  const encontrado = buscarUsuario(id);
  if (!encontrado) {
    return null;
  }
  if (!nombre) {
    return "Falta el nombre";
  }

  encontrado.nombre = nombre;
  return encontrado;
}

console.log(crearUsuario("Fernando", 30));
console.log(buscarUsuario(2));
console.log(eliminarUsuario(3));
console.log(actualizarUsuario(1, "Juan Carlos"));
console.log(listarUsuarios());
