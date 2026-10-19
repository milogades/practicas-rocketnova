const express = require("express");

const app = express();

app.use(express.json());

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

app.get("/usuarios/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const usuario = usuarios.find((u) => u.id === id);

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    error.status = 404;
    return next(error);
  }

  res.json(usuario);
});

app.get("/fallo", (req, res, next) => {
  const error = new Error("Algo ha fallado en el servidor");
  next(error);
});

app.use((req, res, next) => {
  const error = new Error("Ruta no encontrada");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ success: false, error: err.message });
});

app.listen(3000, () => {
  console.log("Servidor Express escuchando en http://localhost:3000");
});