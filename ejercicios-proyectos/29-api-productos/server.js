const express = require("express");
const logger = require("./middlewares/logger");
const rutasProductos = require("./routes/productos");
const { rutaNoEncontrada, manejarErrores } = require("./middlewares/errores");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({
    success: true,
    mensaje: "API de productos funcionando",
    endpoints: ["/productos", "/productos/:id"]
  });
});

app.use("/productos", rutasProductos);

app.use(rutaNoEncontrada);
app.use(manejarErrores);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
