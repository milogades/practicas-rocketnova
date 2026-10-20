const express = require("express");
const controller = require("../controllers/productosController");

const router = express.Router();

router.get("/", controller.listar);
router.get("/:id", controller.obtener);

module.exports = router;
