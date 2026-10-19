const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();

const carpetaUploads = path.join(__dirname, "uploads");

if (!fs.existsSync(carpetaUploads)) {
  fs.mkdirSync(carpetaUploads);
}

const almacenamiento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, carpetaUploads);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage: almacenamiento });

app.post("/subir", upload.single("archivo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No se ha enviado ningún archivo" });
  }

  res.status(201).json({
    mensaje: "Archivo subido",
    nombre: req.file.filename,
    original: req.file.originalname,
    tipo: req.file.mimetype,
    tamaño: req.file.size
  });
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: "El archivo debe enviarse en el campo 'archivo'" });
  }

  res.status(500).json({ error: "Error del servidor" });
});

app.listen(3000, () => {
  console.log("Servidor Express escuchando en http://localhost:3000");
});