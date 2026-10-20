const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const SECRETO_JWT = "rocketnova-clave-secreta-para-firmar-tokens-2026";

const usuarios = [];


app.post("/registro", async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ error: "Faltan nombre, email o password" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
  }

  const existe = usuarios.find((u) => u.email === email);
  if (existe) {
    return res.status(409).json({ error: "Ese email ya está registrado" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const nuevo = {
    id: usuarios.length + 1,
    nombre,
    email,
    passwordHash
  };
  usuarios.push(nuevo);

  console.log("Usuario guardado:", nuevo);

  res.status(201).json({
    mensaje: "Usuario registrado",
    usuario: { id: nuevo.id, nombre: nuevo.nombre, email: nuevo.email }
  });
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Faltan email o password" });
  }

  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) {
    return res.status(401).json({ error: "Email o contraseña incorrectos" });
  }

  const correcta = await bcrypt.compare(password, usuario.passwordHash);
  if (!correcta) {
    return res.status(401).json({ error: "Email o contraseña incorrectos" });
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    SECRETO_JWT,
    { expiresIn: "1h" }
  );

  res.json({ mensaje: "Login correcto", token });
});


function verificarToken(req, res, next) {
  const cabecera = req.headers.authorization;

  if (!cabecera || !cabecera.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Falta el token" });
  }

  const token = cabecera.split(" ")[1];

  try {
    const datosToken = jwt.verify(token, SECRETO_JWT);
    req.usuario = datosToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token no válido o caducado" });
  }
}


app.get("/perfil", verificarToken, (req, res) => {
  const usuario = usuarios.find((u) => u.id === req.usuario.id);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  res.json({ id: usuario.id, nombre: usuario.nombre, email: usuario.email });
});

app.listen(3000, () => {
  console.log("Servidor Express escuchando en http://localhost:3000");
});