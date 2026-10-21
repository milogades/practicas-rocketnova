const productos = require("../data/productos");
const crearError = require("../utils/crearError");

// GET /productos  → búsqueda, filtros y paginación
function listar(req, res, next) {
  const { nombre, categoria, precioMin, precioMax } = req.query;
  const pagina = Number(req.query.pagina) || 1;
  const limite = Number(req.query.limite) || 5;

  if (pagina < 1 || limite < 1) {
    return next(crearError(400, "pagina y limite deben ser números mayores que 0"));
  }

  let resultado = productos;

  if (nombre) {
    resultado = resultado.filter((p) =>
      p.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
  }

  if (categoria) {
    resultado = resultado.filter((p) => p.categoria === categoria.toLowerCase());
  }

  if (precioMin) {
    resultado = resultado.filter((p) => p.precio >= Number(precioMin));
  }

  if (precioMax) {
    resultado = resultado.filter((p) => p.precio <= Number(precioMax));
  }

  const total = resultado.length;
  const totalPaginas = Math.ceil(total / limite);
  const inicio = (pagina - 1) * limite;
  const datos = resultado.slice(inicio, inicio + limite);

  res.json({ success: true, total, pagina, limite, totalPaginas, datos });
}

// GET /productos/:id
function obtener(req, res, next) {
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return next(crearError(404, "Producto no encontrado"));
  }

  res.json({ success: true, datos: producto });
}

// POST /productos
function crear(req, res) {
  const { nombre, categoria, precio } = req.body;

  const nuevoId = productos.reduce((max, p) => (p.id > max ? p.id : max), 0) + 1;

  const nuevo = { id: nuevoId, nombre: nombre.trim(), categoria, precio };
  productos.push(nuevo);

  res.status(201).json({ success: true, datos: nuevo });
}

// PUT /productos/:id
function actualizar(req, res, next) {
  const id = Number(req.params.id);
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return next(crearError(404, "Producto no encontrado"));
  }

  const { nombre, categoria, precio } = req.body;

  if (nombre !== undefined) producto.nombre = nombre.trim();
  if (categoria !== undefined) producto.categoria = categoria;
  if (precio !== undefined) producto.precio = precio;

  res.json({ success: true, datos: producto });
}

// DELETE /productos/:id
function eliminar(req, res, next) {
  const id = Number(req.params.id);
  const indice = productos.findIndex((p) => p.id === id);

  if (indice === -1) {
    return next(crearError(404, "Producto no encontrado"));
  }

  const eliminado = productos.splice(indice, 1)[0];

  res.json({ success: true, mensaje: "Producto eliminado", datos: eliminado });
}

module.exports = { listar, obtener, crear, actualizar, eliminar };
