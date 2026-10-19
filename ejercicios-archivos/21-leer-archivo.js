const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.get("/archivo", (req, res) => {
  const rutaArchivo = path.join(__dirname, "usuarios.txt");

  fs.readFile(rutaArchivo, "utf-8", (err, contenido) => {
    if (err) {
      return res.status(500).json({ error: "No se pudo leer el archivo" });
    }

    res.type("text/plain").send(contenido);
  });
});

app.listen(3000, () => {
  console.log("Servidor Express escuchando en http://localhost:3000");
});