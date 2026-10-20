const express = require("express");

const app = express();

const URL_API = "https://jsonplaceholder.typicode.com/users";

app.get("/datos-externos", async (req, res) => {
  try {
    const respuesta = await fetch(URL_API);

    if (!respuesta.ok) {
      return res.status(502).json({ error: "La API externa ha respondido con un error" });
    }

    const datos = await respuesta.json();

    const usuarios = datos.map((u) => ({
      id: u.id,
      nombre: u.name,
      email: u.email,
      ciudad: u.address.city
    }));

    res.json(usuarios);
  } catch (error) {
    res.status(502).json({ error: "No se pudo conectar con la API externa" });
  }
});

app.listen(3000, () => {
  console.log("Servidor Express escuchando en http://localhost:3000");
});