const express = require("express");

const app = express();

app.use(express.json());

const productos = [
  { id: 1, nombre: "Pizza margarita", categoria: "comidas", precio: 45000 },
  { id: 2, nombre: "Coca-Cola 1L", categoria: "bebidas", precio: 12000 },
  { id: 3, nombre: "Hamburguesa completa", categoria: "comidas", precio: 35000 },
  { id: 4, nombre: "Agua mineral", categoria: "bebidas", precio: 6000 },
  { id: 5, nombre: "Pizza cuatro quesos", categoria: "comidas", precio: 52000 },
  { id: 6, nombre: "Helado de vainilla", categoria: "postres", precio: 15000 },
  { id: 7, nombre: "Cerveza", categoria: "bebidas", precio: 18000 }
];

app.get("/productos", (req, res) => {
  res.json(productos);
});

app.get("/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(producto);
});

app.post("/productos", (req, res) => {
  const maxId = productos.reduce((max, p) => (p.id > max ? p.id : max), 0);

  const nuevoProducto = {
    id: maxId + 1,
    nombre: req.body.nombre,
    categoria: req.body.categoria,
    precio: req.body.precio
  };

  productos.push(nuevoProducto);

  res.status(201).json(nuevoProducto);
});

app.put("/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  if (req.body.nombre !== undefined) {
    producto.nombre = req.body.nombre;
  }

  if (req.body.categoria !== undefined) {
    producto.categoria = req.body.categoria;
  }

  if (req.body.precio !== undefined) {
    producto.precio = req.body.precio;
  }

  res.json(producto);
});

app.delete("/productos/:id", (req, res) => {
  const id = Number(req.params.id);
  const indice = productos.findIndex((p) => p.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const eliminado = productos.splice(indice, 1)[0];

  res.json({ mensaje: "Producto eliminado", producto: eliminado });
});

app.listen(3000, () => {
  console.log("Servidor Express escuchando en http://localhost:3000");
});