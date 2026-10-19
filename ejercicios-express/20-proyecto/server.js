const express = require("express");
const rutasUsuarios = require("./routes/usuarios");
const rutasProductos = require("./routes/productos");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const hora = new Date().toLocaleTimeString("es-ES");
  console.log(`${req.method} ${req.url} - ${hora}`);
  next();
});

app.use("/usuarios", rutasUsuarios);
app.use("/productos", rutasProductos);

app.use((req, res, next) => {
  const error = new Error("Ruta no encontrada");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ success: false, error: err.message });
});

app.listen(3000, () => {
  console.log("Servidor Express escuchando en http://localhost:3000");
});