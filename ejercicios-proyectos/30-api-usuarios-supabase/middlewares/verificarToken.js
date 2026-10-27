const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/jwt");
const crearError = require("../utils/crearError");

function verificarToken(req, res, next) {
  const cabecera = req.headers.authorization;

  if (!cabecera || !cabecera.startsWith("Bearer ")) {
    return next(crearError(401, "Falta el token. Inicia sesión en POST /auth/login"));
  }

  const token = cabecera.split(" ")[1];
  let datosToken;

  try {
    datosToken = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return next(crearError(401, "Token no válido o caducado"));
  }

  req.cuenta = datosToken;
  next();
}

module.exports = verificarToken;
