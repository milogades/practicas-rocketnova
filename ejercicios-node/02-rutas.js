const http = require("http");

const servidor = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

  if (req.url === "/") {
    res.end("Bienvenido a la página de inicio");
  } else if (req.url === "/usuarios") {
    res.end("Aquí verás la lista de usuarios");
  } else if (req.url === "/productos") {
    res.end("Aquí verás la lista de productos");
  } else if (req.url === "/contacto") {
    res.end("Página de contacto de RocketNova");
  } else {
    res.end("Esa ruta no existe");
  }
});

servidor.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});