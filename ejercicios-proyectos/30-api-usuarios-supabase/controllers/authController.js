const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");
const { JWT_SECRET, JWT_DURACION } = require("../config/jwt");
const crearError = require("../utils/crearError");

async function registrar(req, res, next) {
  try {
    const { nombre, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("cuentas")
      .insert({
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        password_hash: passwordHash
      })
      .select("id, nombre, email, creada_en")
      .single();

    if (error) {
      if (error.code === "23505") {
        throw crearError(409, "Ese email ya está registrado");
      }
      throw error;
    }

    res.status(201).json({ success: true, mensaje: "Cuenta creada", datos: data });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const { data: cuenta, error } = await supabase
      .from("cuentas")
      .select("id, nombre, email, password_hash")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!cuenta) {
      throw crearError(401, "Email o contraseña incorrectos");
    }

    const correcta = await bcrypt.compare(password, cuenta.password_hash);

    if (!correcta) {
      throw crearError(401, "Email o contraseña incorrectos");
    }

    const token = jwt.sign(
      { id: cuenta.id, email: cuenta.email },
      JWT_SECRET,
      { expiresIn: JWT_DURACION }
    );

    res.json({ success: true, mensaje: "Login correcto", token });
  } catch (error) {
    next(error);
  }
}

async function perfil(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("cuentas")
      .select("id, nombre, email, creada_en")
      .eq("id", req.cuenta.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      throw crearError(404, "Cuenta no encontrada");
    }

    res.json({ success: true, datos: data });
  } catch (error) {
    next(error);
  }
}

module.exports = { registrar, login, perfil };
