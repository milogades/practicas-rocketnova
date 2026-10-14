const http = require("http");

const servidor = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Hola, bienvenido a mi servidor");
});

servidor.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});