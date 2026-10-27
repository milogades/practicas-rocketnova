const express = require("express");
const controller = require("../controllers/usuariosController");
const validarUsuario = require("../middlewares/validarUsuario");
const validarId = require("../middlewares/validarId");
const verificarToken = require("../middlewares/verificarToken");

const router = express.Router();

router.get("/", controller.listar);
router.get("/:id", validarId, controller.obtener);
router.post("/", verificarToken, validarUsuario, controller.crear);
router.put("/:id", verificarToken, validarId, validarUsuario, controller.actualizar);
router.delete("/:id", verificarToken, validarId, controller.eliminar);

module.exports = router;
