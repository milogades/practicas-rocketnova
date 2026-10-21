const express = require("express");
const controller = require("../controllers/productosController");
const validarProducto = require("../middlewares/validarProducto");

const router = express.Router();

router.get("/", controller.listar);
router.get("/:id", controller.obtener);
router.post("/", validarProducto, controller.crear);
router.put("/:id", validarProducto, controller.actualizar);
router.delete("/:id", controller.eliminar);

module.exports = router;
