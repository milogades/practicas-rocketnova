const express = require("express");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const hora = new Date().toLocaleTimeString("es-ES");
  console.log(`${req.method} ${req.url} - ${hora}`);
  next();
});

const usuarios = [
  { id: 1, nombre: "Ana", email: "ana@correo.com", edad: 28 },
  { id: 2, nombre: "Luis", email: "luis@correo.com", edad: 34 },
  { id: 3, nombre: "Marta", email: "marta@correo.com", edad: 22 },
  { id: 4, nombre: "Pedro", email: "pedro@correo.com", edad: 41 },
  { id: 5, nombre: "Lucía", email: "lucia@correo.com", edad: 19 }
];

const productos = [
  { id: 1, nombre: "Pizza margarita", categoria: "comidas", precio: 45000 },
  { id: 2, nombre: "Coca-Cola 1L", categoria: "bebidas", precio: 12000 },
  { id: 3, nombre: "Hamburguesa completa", categoria: "comidas", precio: 35000 }
];

app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.get("/productos", (req, res) => {
  res.json(productos);
});

app.post("/usuarios", (req, res) => {
  const maxId = usuarios.reduce((max, u) => (u.id > max ? u.id : max), 0);

  const nuevoUsuario = {
    id: maxId + 1,
    nombre: req.body.nombre,
    email: req.body.email
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json(nuevoUsuario);
});

app.listen(3000, () => {
  console.log("Servidor Express escuchando en http://localhost:3000");
});