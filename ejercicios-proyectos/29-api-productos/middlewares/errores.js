const crearError = require("../utils/crearError");

function rutaNoEncontrada(req, res, next) {
  next(crearError(404, `Ruta ${req.method} ${req.originalUrl} no encontrada`));
}

function manejarErrores(err, req, res, next) {
  const status = err.status || 500;
  const mensaje = status === 500 ? "Error interno del servidor" : err.message;

  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({ success: false, error: mensaje });
}

module.exports = { rutaNoEncontrada, manejarErrores };
