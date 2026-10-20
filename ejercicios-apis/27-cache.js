const express = require("express");

const app = express();

const URL_API = "https://jsonplaceholder.typicode.com/users";
const DURACION_CACHE = 60 * 1000; 

let cache = null;     
let horaCache = 0;    

app.get("/datos-externos", async (req, res) => {
  const ahora = Date.now(); 

  
  if (cache && ahora - horaCache < DURACION_CACHE) {
    const segundosRestantes = Math.round((DURACION_CACHE - (ahora - horaCache)) / 1000);
    console.log(`Respuesta desde la caché (caduca en ${segundosRestantes} s)`);
    return res.json({ origen: "cache", caducaEn: segundosRestantes, datos: cache });
  }

  try {
    console.log("Llamando a la API externa...");
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

    cache = usuarios;   
    horaCache = ahora;  

    res.json({ origen: "api", caducaEn: DURACION_CACHE / 1000, datos: usuarios });
  } catch (error) {
    res.status(502).json({ error: "No se pudo conectar con la API externa" });
  }
});

app.listen(3000, () => {
  console.log("Servidor Express escuchando en http://localhost:3000");
});