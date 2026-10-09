const express = require("express");
const app = express();

app.use(express.json());

const usuarios = [
  { id: 1, nombre: "Juan", edad: 17 },
  { id: 2, nombre: "Maria", edad: 25 },
  { id: 3, nombre: "Pedro", edad: 32 }
];

function buscarUsuario(id) {
  const encontrado = usuarios.find((usuario) => usuario.id === id);
  if (!encontrado) {
    return null;
  }
  return encontrado;
}


app.get("/usuarios", (req, res) => {
  res.status(200).json(usuarios);
});


app.get("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const usuario = buscarUsuario(id);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.status(200).json(usuario);
});


app.post("/usuarios", (req, res) => {
  const nombre = req.body.nombre;
  const edad = req.body.edad;

  if (!nombre) {
    return res.status(400).json({ error: "Falta el nombre" });
  }
  if (edad < 0) {
    return res.status(400).json({ error: "La edad no puede ser negativa" });
  }

  const id = usuarios.reduce((max, usuario) => {
    if (usuario.id > max) {
      return usuario.id;
    }
    return max;
  }, 0) + 1;

  const nuevo = { id: id, nombre: nombre, edad: edad };
  usuarios.push(nuevo);

  res.status(201).json(nuevo);
});

app.put("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const usuario = buscarUsuario(id);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const nombre = req.body.nombre;
  const edad = req.body.edad;

  if (!nombre) {
    return res.status(400).json({ error: "Falta el nombre" });
  }
  if (edad < 0) {
    return res.status(400).json({ error: "La edad no puede ser negativa" });
  }

  usuario.nombre = nombre;
  if (edad !== undefined) {
    usuario.edad = edad;
  }

  res.status(200).json(usuario);
});

app.delete("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const usuario = buscarUsuario(id);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const indice = usuarios.findIndex((usuario) => usuario.id === id);
  usuarios.splice(indice, 1);

  res.status(200).json(usuario);
});

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});