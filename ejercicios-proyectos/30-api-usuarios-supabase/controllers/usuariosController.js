const supabase = require("../config/supabase");

// GET /usuarios
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

module.exports = { listar };
