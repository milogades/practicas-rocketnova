const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

const rutaArchivo = path.join(__dirname, "usuarios.json");

function leerUsuarios() {
  const texto = fs.readFileSync(rutaArchivo, "utf-8");
  return JSON.parse(texto);
}

function guardarUsuarios(usuarios) {
  const texto = JSON.stringify(usuarios, null, 2);
  fs.writeFileSync(rutaArchivo, texto);
}

app.get("/usuarios", (req, res) => {
  const usuarios = leerUsuarios();
  res.json(usuarios);
});

app.get("/usuarios/:id", (req, res) => {
  const usuarios = leerUsuarios();
  const id = Number(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json(usuario);
});

app.post("/usuarios", (req, res) => {
  const usuarios = leerUsuarios();
  const maxId = usuarios.reduce((max, u) => (u.id > max ? u.id : max), 0);

  const nuevoUsuario = {
    id: maxId + 1,
    nombre: req.body.nombre,
    email: req.body.email,
    edad: req.body.edad
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  res.status(201).json(nuevoUsuario);
});

app.put("/usuarios/:id", (req, res) => {
  const usuarios = leerUsuarios();
  const id = Number(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
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

  guardarUsuarios(usuarios);

  res.json(usuario);
});

app.delete("/usuarios/:id", (req, res) => {
  const usuarios = leerUsuarios();
  const id = Number(req.params.id);
  const indice = usuarios.findIndex((u) => u.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const eliminado = usuarios.splice(indice, 1)[0];
  guardarUsuarios(usuarios);

  res.json({ mensaje: "Usuario eliminado", usuario: eliminado });
});

app.listen(3000, () => {
  console.log("Servidor Express escuchando en http://localhost:3000");
});