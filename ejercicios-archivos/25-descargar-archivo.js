const express = require("express");
const path = require("path");

const app = express();

const carpetaUploads = path.join(__dirname, "uploads");

app.get("/descargar/:archivo", (req, res) => {
  const nombre = path.basename(req.params.archivo);
  const rutaArchivo = path.join(carpetaUploads, nombre);

  res.download(rutaArchivo, (err) => {
    if (err && !res.headersSent) {
      res.status(404).json({ error: "Archivo no encontrado" });
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor Express escuchando en http://localhost:3000");
});