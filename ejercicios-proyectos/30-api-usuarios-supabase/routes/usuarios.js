const express = require("express");
const controller = require("../controllers/usuariosController");
const validarUsuario = require("../middlewares/validarUsuario");
const validarId = require("../middlewares/validarId");

const router = express.Router();

router.get("/", controller.listar);
router.get("/:id", validarId, controller.obtener);
router.post("/", validarUsuario, controller.crear);
router.put("/:id", validarId, validarUsuario, controller.actualizar);
router.delete("/:id", validarId, controller.eliminar);

module.exports = router;
