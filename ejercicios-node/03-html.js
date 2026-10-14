const http = require("http");
const fs = require("fs");
const path = require("path");

const servidor = http.createServer((req, res) => {
  if (req.url === "/") {
    const rutaArchivo = path.join(__dirname, "public", "index.html");

    fs.readFile(rutaArchivo, (err, contenido) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Error al leer el archivo");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(contenido);
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Esa ruta no existe");
  }
});

servidor.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});