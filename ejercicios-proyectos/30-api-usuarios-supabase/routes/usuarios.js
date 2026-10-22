const express = require("express");
const controller = require("../controllers/usuariosController");

const router = express.Router();

router.get("/", controller.listar);

module.exports = router;
