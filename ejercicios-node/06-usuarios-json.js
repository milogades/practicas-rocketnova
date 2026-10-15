const http = require("http");
const fs = require("fs");
const path = require("path");

const usuarios = [
  { id: 1, nombre: "Ana", email: "ana@correo.com", edad: 28 },
  { id: 2, nombre: "Luis", email: "luis@correo.com", edad: 34 },
  { id: 3, nombre: "Marta", email: "marta@correo.com", edad: 22 },
  { id: 4, nombre: "Pedro", email: "pedro@correo.com", edad: 41 },
  { id: 5, nombre: "Lucía", email: "lucia@correo.com", edad: 19 }
];

const servidor = http.createServer((req, res) => {
  const ahora = new Date();
  const fecha = ahora.toLocaleDateString("es-ES");
  const hora = ahora.toLocaleTimeString("es-ES");
  console.log(`${req.method} ${req.url} - ${fecha} ${hora}`);

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
  } else if (req.url === "/usuarios") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(usuarios));
  } else if (req.url === "/productos") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Aquí verás la lista de productos");
  } else if (req.url === "/contacto") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Página de contacto de RocketNova");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 - Página no encontrada");
  }
});

servidor.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});