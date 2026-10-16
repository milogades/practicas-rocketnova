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

const productos = [
  { id: 1, nombre: "Pizza margarita", categoria: "comidas", precio: 45000 },
  { id: 2, nombre: "Coca-Cola 1L", categoria: "bebidas", precio: 12000 },
  { id: 3, nombre: "Hamburguesa completa", categoria: "comidas", precio: 35000 },
  { id: 4, nombre: "Agua mineral", categoria: "bebidas", precio: 6000 },
  { id: 5, nombre: "Pizza cuatro quesos", categoria: "comidas", precio: 52000 },
  { id: 6, nombre: "Helado de vainilla", categoria: "postres", precio: 15000 },
  { id: 7, nombre: "Cerveza", categoria: "bebidas", precio: 18000 }
];

const categorias = [
  { id: 1, nombre: "comidas" },
  { id: 2, nombre: "bebidas" },
  { id: 3, nombre: "postres" }
];

app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

app.post("/usuarios", (req, res) => {
  const nombre = req.body.nombre;
  const email = req.body.email;

  const maxId = usuarios.reduce((max, u) => (u.id > max ? u.id : max), 0);

  const nuevoUsuario = {
    id: maxId + 1,
    nombre: nombre,
    email: email
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json(nuevoUsuario);
});

app.put("/usuarios/:id", (req, res) => {
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

  res.json(usuario);
});

app.get("/productos", (req, res) => {
  res.json(productos);
});

app.get("/categorias", (req, res) => {
  res.json(categorias);
});

app.listen(3000, () => {
  console.log("Servidor Express escuchando en http://localhost:3000");
});