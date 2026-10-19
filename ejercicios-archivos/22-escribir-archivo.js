const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());

const rutaArchivo = path.join(__dirname, "usuarios.txt");

app.get("/archivo", (req, res) => {
  fs.readFile(rutaArchivo, "utf-8", (err, contenido) => {
    if (err) {
      return res.status(500).json({ error: "No se pudo leer el archivo" });
    }

    res.type("text/plain").send(contenido);
  });
});

app.post("/archivo", (req, res) => {
  const texto = req.body.texto;

  if (typeof texto !== "string" || texto.trim() === "") {
    return res.status(400).json({ error: "Falta el texto" });
  }

  fs.appendFile(rutaArchivo, "\n" + texto, (err) => {
    if (err) {
      return res.status(500).json({ error: "No se pudo escribir en el archivo" });
    }

    res.status(201).json({ mensaje: "Línea añadida", texto: texto });
  });
});

app.put("/archivo", (req, res) => {
  const texto = req.body.texto;

  if (typeof texto !== "string" || texto.trim() === "") {
    return res.status(400).json({ error: "Falta el texto" });
  }

  fs.writeFile(rutaArchivo, texto, (err) => {
    if (err) {
      return res.status(500).json({ error: "No se pudo modificar el archivo" });
    }

    res.json({ mensaje: "Archivo reemplazado", texto: texto });
  });
});

app.listen(3000, () => {
  console.log("Servidor Express escuchando en http://localhost:3000");
});