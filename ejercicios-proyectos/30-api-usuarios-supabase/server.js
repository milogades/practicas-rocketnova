require("dotenv").config({ quiet: true });

const express = require("express");
const logger = require("./middlewares/logger");
const rutasUsuarios = require("./routes/usuarios");
const { rutaNoEncontrada, manejarErrores } = require("./middlewares/errores");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    mensaje: "API de usuarios con Supabase funcionando",
    endpoints: [
      "GET /usuarios",
      "GET /usuarios/:id",
      "POST /usuarios",
      "PUT /usuarios/:id",
      "DELETE /usuarios/:id"
    ]
  });
});

app.use("/usuarios", rutasUsuarios);

app.use(rutaNoEncontrada);
app.use(manejarErrores);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
