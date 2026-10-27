const supabase = require("../config/supabase");
const crearError = require("../utils/crearError");

function traducirError(error) {
  if (error.code === "23505") {
    return crearError(409, "Ese email ya está registrado");
  }
  return error;
}

async function listar(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .order("id");

    if (error) {
      throw error;
    }

    res.json({ success: true, total: data.length, datos: data });
  } catch (error) {
    next(error);
  }
}

async function obtener(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", req.id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      throw crearError(404, "Usuario no encontrado");
    }

    res.json({ success: true, datos: data });
  } catch (error) {
    next(error);
  }
}

async function crear(req, res, next) {
  try {
    const { nombre, email } = req.body;

    const { data, error } = await supabase
      .from("usuarios")
      .insert({ nombre: nombre.trim(), email: email.trim().toLowerCase() })
      .select()
      .single();

    if (error) {
      throw traducirError(error);
    }

    res.status(201).json({ success: true, datos: data });
  } catch (error) {
    next(error);
  }
}

async function actualizar(req, res, next) {
  try {
    const { nombre, email } = req.body;
    const cambios = {};

    if (nombre !== undefined) cambios.nombre = nombre.trim();
    if (email !== undefined) cambios.email = email.trim().toLowerCase();

    const { data, error } = await supabase
      .from("usuarios")
      .update(cambios)
      .eq("id", req.id)
      .select()
      .maybeSingle();

    if (error) {
      throw traducirError(error);
    }

    if (!data) {
      throw crearError(404, "Usuario no encontrado");
    }

    res.json({ success: true, datos: data });
  } catch (error) {
    next(error);
  }
}

async function eliminar(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("usuarios")
      .delete()
      .eq("id", req.id)
      .select()
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      throw crearError(404, "Usuario no encontrado");
    }

    res.json({ success: true, mensaje: "Usuario eliminado", datos: data });
  } catch (error) {
    next(error);
  }
}

module.exports = { listar, obtener, crear, actualizar, eliminar };
