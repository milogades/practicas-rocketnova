const express = require("express");
const controller = require("../controllers/authController");
const { validarRegistro, validarLogin } = require("../middlewares/validarAuth");
const verificarToken = require("../middlewares/verificarToken");

const router = express.Router();

router.post("/register", validarRegistro, controller.registrar);
router.post("/login", validarLogin, controller.login);
router.get("/perfil", verificarToken, controller.perfil);

module.exports = router;
