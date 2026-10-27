const crearError = require("../utils/crearError");

const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validarRegistro(req, res, next) {
  const { nombre, email, password } = req.body || {};
  const errores = [];

  if (typeof nombre !== "string" || nombre.trim() === "") {
    errores.push("nombre es obligatorio y debe ser un texto");
  }

  if (typeof email !== "string" || !FORMATO_EMAIL.test(email.trim())) {
    errores.push("email es obligatorio y debe tener un formato válido (ejemplo@correo.com)");
  }

  if (typeof password !== "string" || password.length < 6) {
    errores.push("password es obligatoria y debe tener al menos 6 caracteres");
  }

  if (errores.length > 0) {
    return next(crearError(400, errores.join(". ")));
  }

  next();
}

function validarLogin(req, res, next) {
  const { email, password } = req.body || {};

  if (typeof email !== "string" || email.trim() === "" || typeof password !== "string" || password === "") {
    return next(crearError(400, "Envía email y password"));
  }

  next();
}

module.exports = { validarRegistro, validarLogin };
