const productos = require("../data/productos");

function listar(req, res) {
  res.json(productos);
}

function obtener(req, res, next) {
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    return next(error);
  }

  res.json(producto);
}

function crear(req, res) {
  const maxId = productos.reduce((max, p) => (p.id > max ? p.id : max), 0);

  const nuevoProducto = {
    id: maxId + 1,
    nombre: req.body.nombre,
    categoria: req.body.categoria,
    precio: req.body.precio
  };

  productos.push(nuevoProducto);

  res.status(201).json(nuevoProducto);
}

function actualizar(req, res, next) {
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    return next(error);
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
}

function eliminar(req, res, next) {
  const id = Number(req.params.id);
  const indice = productos.findIndex((p) => p.id === id);

  if (indice === -1) {
    const error = new Error("Producto no encontrado");
    error.status = 404;
    return next(error);
  }

  const eliminado = productos.splice(indice, 1)[0];

  res.json({ mensaje: "Producto eliminado", producto: eliminado });
}

module.exports = { listar, obtener, crear, actualizar, eliminar };