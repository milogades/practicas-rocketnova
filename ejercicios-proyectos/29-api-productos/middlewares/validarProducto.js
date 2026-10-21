const crearError = require("../utils/crearError");

const CATEGORIAS = ["comidas", "bebidas", "postres"];

function validarProducto(req, res, next) {
  const { nombre, categoria, precio } = req.body || {};
  const esActualizacion = req.method === "PUT";
  const errores = [];

  if (esActualizacion && nombre === undefined && categoria === undefined && precio === undefined) {
    return next(crearError(400, "Envía al menos nombre, categoria o precio"));
  }

  if (!esActualizacion || nombre !== undefined) {
    if (typeof nombre !== "string" || nombre.trim() === "") {
      errores.push("nombre es obligatorio y debe ser un texto");
    }
  }

  if (!esActualizacion || categoria !== undefined) {
    if (!CATEGORIAS.includes(categoria)) {
      errores.push(`categoria debe ser una de estas: ${CATEGORIAS.join(", ")}`);
    }
  }

  if (!esActualizacion || precio !== undefined) {
    if (typeof precio !== "number" || precio <= 0) {
      errores.push("precio debe ser un número mayor que 0");
    }
  }

  if (errores.length > 0) {
    return next(crearError(400, errores.join(". ")));
  }

  next();
}

module.exports = validarProducto;
