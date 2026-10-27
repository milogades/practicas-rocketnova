# API de usuarios con Supabase (ejercicio 30)

API REST de usuarios hecha con **Node.js**, **Express** y **Supabase** (PostgreSQL). Permite listar, consultar, crear, modificar y borrar usuarios, con validaciones, middleware y manejo de errores. A diferencia del ejercicio 29, los datos se guardan en una **base de datos real**, así que los cambios no se pierden al reiniciar el servidor.

Incluye el apartado extra de **autenticación**: registro, login con **JWT** y contraseñas cifradas con **bcrypt**. Leer usuarios es público, pero crear, modificar y borrar exige haber iniciado sesión.

Ejercicio 30 del bloque 5 de los «30 ejercicios de Node.js» de las prácticas FCT en RocketNova.

- **URL pública (Render):** https://api-usuarios-miguel.onrender.com
- **Código:** https://github.com/milogades/practicas-rocketnova/tree/main/ejercicios-proyectos/30-api-usuarios-supabase

> Render (plan gratuito) apaga la API tras unos minutos sin uso. La primera petición puede tardar entre 30 y 60 segundos en responder.

## Tecnologías

- Node.js
- Express 5
- Supabase (PostgreSQL) con `@supabase/supabase-js`
- bcryptjs (cifrado de contraseñas)
- jsonwebtoken (tokens JWT)
- dotenv (variables de entorno)
- Postman (pruebas)
- Git y GitHub
- Render (despliegue)

## Cómo funciona

```
Postman / navegador  →  API Express (Render)  →  Supabase (tablas usuarios y cuentas)
```

La API recibe la petición, comprueba el token cuando la ruta lo exige, revisa los datos con sus middlewares, consulta Supabase y responde en JSON.

## Estructura del proyecto

```
30-api-usuarios-supabase/
├── server.js                       Carga el .env, monta middlewares y rutas, y arranca el servidor
├── config/
│   ├── supabase.js                 Crea el cliente de Supabase con las variables de entorno
│   └── jwt.js                      Lee la clave para firmar los tokens y su duración
├── routes/
│   ├── usuarios.js                 CRUD de usuarios (POST, PUT y DELETE protegidas con token)
│   └── auth.js                     Registro, login y perfil
├── controllers/
│   ├── usuariosController.js       Consultas a Supabase: listar, obtener, crear, actualizar, eliminar
│   └── authController.js           Registro con bcrypt, login con JWT y perfil
├── middlewares/
│   ├── logger.js                   Muestra en consola método, URL y hora de cada petición
│   ├── validarId.js                Comprueba que el id de la URL sea un entero mayor que 0
│   ├── validarUsuario.js           Valida nombre y email en POST y PUT de usuarios
│   ├── validarAuth.js              Valida los datos del registro y del login
│   ├── verificarToken.js           Comprueba el token JWT de la cabecera Authorization
│   └── errores.js                  Ruta no encontrada (404) y manejador global de errores
├── utils/
│   └── crearError.js               Crea errores con código de estado
├── postman/
│   └── api-usuarios.postman_collection.json
├── .env.example                    Plantilla de variables de entorno (sin valores reales)
├── .gitignore                      Excluye node_modules y .env
└── package.json
```

## Base de datos (Supabase)

Tabla `usuarios` (los datos que gestiona la API):

| Columna | Tipo | Notas |
|---|---|---|
| `id` | `int8` | Clave primaria, se genera sola |
| `nombre` | `text` | |
| `email` | `text` | Único: no se puede repetir |

Tabla `cuentas` (quién puede iniciar sesión):

| Columna | Tipo | Notas |
|---|---|---|
| `id` | `int8` | Clave primaria, se genera sola |
| `nombre` | `text` | Obligatorio |
| `email` | `text` | Obligatorio y único |
| `password_hash` | `text` | Hash de bcrypt. **Nunca se guarda la contraseña** |
| `creada_en` | `timestamptz` | Fecha de creación, se pone sola |

Las dos tablas tienen activado el RLS (Row Level Security), así que no se pueden leer desde fuera con la clave pública. La API usa la clave secreta desde el servidor.

SQL usado en el SQL Editor de Supabase:

```sql
ALTER TABLE usuarios ADD CONSTRAINT usuarios_email_unico UNIQUE (email);

CREATE TABLE cuentas (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre text NOT NULL,
  email text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  creada_en timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cuentas ENABLE ROW LEVEL SECURITY;
```

## Cómo ejecutarlo en local

1. Instalar las dependencias:
   ```bash
   npm install
   ```
2. Copiar `.env.example` como `.env` y rellenar los valores. La URL y la clave secreta salen de Supabase (**Project Settings → API Keys**). `JWT_SECRET` es una clave larga y aleatoria, que se puede generar con:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   ```
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_SECRET_KEY=pon_aqui_tu_secret_key
   JWT_SECRET=pon_aqui_una_clave_larga_y_aleatoria
   PORT=3000
   ```
3. Arrancar:
   ```bash
   npm start
   ```

La API queda en `http://localhost:3000`.

> El archivo `.env` contiene las claves y **no se sube a GitHub** (está en `.gitignore`). En Render, `SUPABASE_URL`, `SUPABASE_SECRET_KEY` y `JWT_SECRET` se configuran en la pestaña **Environment** del servicio.

## Endpoints

| Método | Ruta | Descripción | Token | Respuesta correcta |
|---|---|---|---|---|
| GET | `/` | Bienvenida y lista de endpoints | No | 200 |
| POST | `/auth/register` | Crea una cuenta | No | 201 |
| POST | `/auth/login` | Inicia sesión y devuelve un token | No | 200 |
| GET | `/auth/perfil` | Datos de la cuenta que ha iniciado sesión | **Sí** | 200 |
| GET | `/usuarios` | Lista de usuarios ordenados por id | No | 200 |
| GET | `/usuarios/:id` | Un usuario por su id | No | 200 |
| POST | `/usuarios` | Crea un usuario | **Sí** | 201 |
| PUT | `/usuarios/:id` | Modifica el nombre, el email o los dos | **Sí** | 200 |
| DELETE | `/usuarios/:id` | Borra un usuario | **Sí** | 200 |

## Autenticación

1. **Registrarse** (`POST /auth/register`):
   ```json
   { "nombre": "Miguel", "email": "miguel@email.com", "password": "123456" }
   ```
   La contraseña se guarda cifrada con bcrypt. La respuesta devuelve la cuenta, sin la contraseña ni su hash.

2. **Iniciar sesión** (`POST /auth/login`):
   ```json
   { "email": "miguel@email.com", "password": "123456" }
   ```
   Respuesta:
   ```json
   { "success": true, "mensaje": "Login correcto", "token": "eyJhbGciOiJIUzI1NiIs..." }
   ```
   El token caduca a la hora.

3. **Usar el token** en las rutas protegidas, en la cabecera:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
   ```
   En Postman: pestaña **Authorization** → **Bearer Token** → pegar el token.

## Usuarios

### Listar usuarios (`GET /usuarios`)

```json
{
  "success": true,
  "total": 5,
  "datos": [
    { "id": 1, "nombre": "Juan", "email": "juan@email.com" },
    { "id": 2, "nombre": "Maria", "email": "maria@email.com" }
  ]
}
```

### Crear un usuario (`POST /usuarios`, con token)

Body (JSON), los dos campos son obligatorios:

```json
{ "nombre": "Lucia", "email": "lucia@email.com" }
```

El nombre y el email se guardan sin espacios a los lados, y el email en minúsculas.

### Modificar un usuario (`PUT /usuarios/:id`, con token)

Se envían solo los campos que cambian:

```json
{ "nombre": "Lucía Pérez" }
```

## Validaciones

- `id` (en la URL): número entero mayor que 0.
- `nombre`: texto no vacío.
- `email`: texto con formato de email (`ejemplo@correo.com`).
- `password` (registro): texto de al menos 6 caracteres.
- En POST de usuarios y en el registro, todos los campos son obligatorios. En PUT se valida solo lo que se envía, y hay que enviar al menos uno.
- Si hay varios fallos, se devuelven todos juntos en un solo mensaje.

## Errores

Todas las respuestas de error tienen el mismo formato:

```json
{ "success": false, "error": "Usuario no encontrado" }
```

| Código | Cuándo |
|---|---|
| 400 | Id no válido, datos no válidos o JSON mal escrito |
| 401 | Falta el token, el token no es válido o ha caducado, o el email o la contraseña del login son incorrectos |
| 404 | El usuario, la cuenta o la ruta no existen |
| 409 | El email ya está registrado |
| 500 | Error interno del servidor (el detalle solo se muestra en la consola del servidor) |

## Pruebas con Postman

En la carpeta `postman/` está la colección con 23 peticiones en dos carpetas, **Autenticación** y **Usuarios**, incluidos los casos de error. Cada petición comprueba su código de respuesta.

1. En Postman: **Import** → elegir `api-usuarios.postman_collection.json`.
2. La colección usa la variable `baseUrl`, que apunta a Render. Para probar en local, cambiarla a `http://localhost:3000` en la pestaña **Variables** de la colección.
3. Ejecutar las peticiones en orden, o todas a la vez con **Run collection**:
   - La 02 registra una cuenta nueva con un email distinto en cada ejecución.
   - La 06 hace login y guarda el token. La colección lo envía solo como Bearer Token en las peticiones protegidas.
   - La 15 crea un usuario de prueba, la 19 lo modifica y la 21 lo borra, así la tabla `usuarios` queda como estaba.

> Cada ejecución deja una cuenta de prueba nueva en la tabla `cuentas`, porque la API no tiene una ruta para borrar cuentas. Se pueden borrar desde el panel de Supabase.

## Autor

Miguel López León — Prácticas FCT, DAW
