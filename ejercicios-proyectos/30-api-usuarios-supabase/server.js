require("dotenv").config({ quiet: true });

const express = require("express");
const logger = require("./middlewares/logger");
const rutasUsuarios = require("./routes/usuarios");
const rutasAuth = require("./routes/auth");
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
      "POST /auth/register",
      "POST /auth/login",
      "GET /auth/perfil (con token)",
      "GET /usuarios",
      "GET /usuarios/:id",
      "POST /usuarios (con token)",
      "PUT /usuarios/:id (con token)",
      "DELETE /usuarios/:id (con token)"
    ]
  });
});

app.use("/auth", rutasAuth);
app.use("/usuarios", rutasUsuarios);

app.use(rutaNoEncontrada);
app.use(manejarErrores);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
