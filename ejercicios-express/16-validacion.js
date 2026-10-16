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

app.post("/usuarios", (req, res) => {
  const nombre = req.body.nombre;
  const email = req.body.email;
  const edad = req.body.edad;

  const nombreValido = typeof nombre === "string" && nombre.trim() !== "";
  const emailValido = typeof email === "string" && email.includes("@") && email.includes(".");
  const edadValida = typeof edad === "number" && edad > 0;

  if (!nombreValido || !emailValido || !edadValida) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  const maxId = usuarios.reduce((max, u) => (u.id > max ? u.id : max), 0);

  const nuevoUsuario = {
    id: maxId + 1,
    nombre: nombre.trim(),
    email: email,
    edad: edad
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json(nuevoUsuario);
});

app.listen(3000, () => {
  console.log("Servidor Express escuchando en http://localhost:3000");
});