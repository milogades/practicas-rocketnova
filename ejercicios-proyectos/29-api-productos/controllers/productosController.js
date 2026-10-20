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

module.exports = { listar, obtener };
