const usuarios = [
  { id: 1, nombre: "Juan" },
  { id: 2, nombre: "Maria" },
  { id: 3, nombre: "Pedro" }
];

function buscarUsuario(id) {
    const encontrado = usuarios.find((usuario) => usuario.id == id);
    if(!encontrado){
        return null;
    }
    return encontrado;
}

console.log(buscarUsuario(2));
console.log(buscarUsuario(99));
