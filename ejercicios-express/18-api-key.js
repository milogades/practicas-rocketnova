const express = require("express");

const app = express();

app.use(express.json());

const API_KEY = "rocketnova123";

function verificarApiKey(req, res, next) {
  const clave = req.headers["x-api-key"];

  if (clave !== API_KEY) {
    return res.status(401).send("401 - No autorizado");
  }

  next();
}

const usuarios = [
  { id: 1, nombre: "Ana", email: "ana@correo.com", edad: 28 },
  { id: 2, nombre: "Luis", email: "luis@correo.com", edad: 34 },
  { id: 3, nombre: "Marta", email: "marta@correo.com", edad: 22 },
  { id: 4, nombre: "Pedro", email: "pedro@correo.com", edad: 41 },
  { id: 5, nombre: "Lucía", email: "lucia@correo.com", edad: 19 }
];

app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.post("/usuarios", verificarApiKey, (req, res) => {
  const maxId = usuarios.reduce((max, u) => (u.id > max ? u.id : max), 0);

  const nuevoUsuario = {
    id: maxId + 1,
    nombre: req.body.nombre,
    email: req.body.email
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json(nuevoUsuario);
});

app.delete("/usuarios/:id", verificarApiKey, (req, res) => {
  const id = Number(req.params.id);
  const indice = usuarios.findIndex((u) => u.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const eliminado = usuarios.splice(indice, 1)[0];

  res.json({ mensaje: "Usuario eliminado", usuario: eliminado });
});

app.listen(3000, () => {
  console.log("Servidor Express escuchando en http://localhost:3000");
});
