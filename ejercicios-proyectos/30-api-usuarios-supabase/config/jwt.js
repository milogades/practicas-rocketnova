const JWT_SECRET = process.env.JWT_SECRET;
const JWT_DURACION = "1h";

if (!JWT_SECRET) {
  console.error("Falta JWT_SECRET en el archivo .env");
  process.exit(1);
}

module.exports = { JWT_SECRET, JWT_DURACION };
