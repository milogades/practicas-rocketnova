const usuarios = require("../data/usuarios");

function listar(req, res) {
  res.json(usuarios);
}

function obtener(req, res, next) {
  const id = Number(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    return next(error);
  }

  res.json(usuario);
}

function crear(req, res) {
  const maxId = usuarios.reduce((max, u) => (u.id > max ? u.id : max), 0);

  const nuevoUsuario = {
    id: maxId + 1,
    nombre: req.body.nombre,
    email: req.body.email,
    edad: req.body.edad
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json(nuevoUsuario);
}

function actualizar(req, res, next) {
  const id = Number(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    return next(error);
  }

  if (req.body.nombre !== undefined) {
    usuario.nombre = req.body.nombre;
  }

  if (req.body.email !== undefined) {
    usuario.email = req.body.email;
  }

  if (req.body.edad !== undefined) {
    usuario.edad = req.body.edad;
  }

  res.json(usuario);
}

function eliminar(req, res, next) {
  const id = Number(req.params.id);
  const indice = usuarios.findIndex((u) => u.id === id);

  if (indice === -1) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    return next(error);
  }

  const eliminado = usuarios.splice(indice, 1)[0];

  res.json({ mensaje: "Usuario eliminado", usuario: eliminado });
}

module.exports = { listar, obtener, crear, actualizar, eliminar };


