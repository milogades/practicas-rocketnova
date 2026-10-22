const crearError = require("../utils/crearError");

function validarId(req, res, next) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return next(crearError(400, "El id debe ser un número entero mayor que 0"));
  }

  req.id = id;
  next();
}

module.exports = validarId;
