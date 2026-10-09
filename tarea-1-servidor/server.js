const http = require("http");
const fs = require("fs");
const path = require("path");

const usuarios = [
  { id: 1, nombre: "Juan" },
  { id: 2, nombre: "Maria" },
  { id: 3, nombre: "Pedro" }
];

const productos = [
  { id: 1, nombre: "Teclado", precio: 25 },
  { id: 2, nombre: "Raton", precio: 15 },
  { id: 3, nombre: "Monitor", precio: 180 },
  { id: 4, nombre: "Auriculares", precio: 40 },
  { id: 5, nombre: "Webcam", precio: 35 }
];

function buscarUsuario(id) {
  const encontrado = usuarios.find((usuario) => usuario.id === id);
  if (!encontrado) {
    return null;
  }
  return encontrado;
}

const servidor = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    const ruta = path.join(__dirname, "public", "index.html");

    fs.readFile(ruta, "utf8", (error, html) => {
      if (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("No se pudo leer la página");
        return;
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    });

    return;
  }

  if (req.method === "GET" && req.url === "/usuarios") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuarios));
    return;
  }

  if (req.method === "GET" && req.url.startsWith("/usuarios/")) {
    const partes = req.url.split("/");
    const id = Number(partes[2]);
    const usuario = buscarUsuario(id);

    if (!usuario) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Usuario no encontrado" }));
      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(usuario));
    return;
  }

  if (req.method === "GET" && req.url === "/productos") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(productos));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Ruta no encontrada" }));
});

const PORT = process.env.PORT || 3000;

servidor.listen(PORT, () => {
  console.log("Servidor en http://localhost:" + PORT);
});
