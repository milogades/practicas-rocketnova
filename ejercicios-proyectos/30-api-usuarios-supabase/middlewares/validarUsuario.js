const crearError = require("../utils/crearError");

const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarUsuario(req, res, next) {
  const { nombre, email } = req.body || {};
  const esCrear = req.method === "POST";
  const errores = [];

  if (!esCrear && nombre === undefined && email === undefined) {
    return next(crearError(400, "Envía al menos nombre o email"));
  }

  if (esCrear || nombre !== undefined) {
    if (typeof nombre !== "string" || nombre.trim() === "") {
      errores.push("nombre es obligatorio y debe ser un texto");
    }
  }

  if (esCrear || email !== undefined) {
    if (typeof email !== "string" || !FORMATO_EMAIL.test(email.trim())) {
      errores.push("email es obligatorio y debe tener un formato válido (ejemplo@correo.com)");
    }
  }

  if (errores.length > 0) {
    return next(crearError(400, errores.join(". ")));
  }

  next();
}

module.exports = validarUsuario;
