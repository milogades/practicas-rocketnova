# API de usuarios con Supabase (ejercicio 30)

API REST de usuarios hecha con **Node.js**, **Express** y **Supabase** (PostgreSQL). Permite listar, consultar, crear, modificar y borrar usuarios, con validaciones, middleware y manejo de errores. A diferencia del ejercicio 29, los datos se guardan en una **base de datos real**, así que los cambios no se pierden al reiniciar el servidor.

Ejercicio 30 del bloque 5 de los «30 ejercicios de Node.js» de las prácticas FCT en RocketNova.

- **URL pública (Render):** https://api-usuarios-miguel.onrender.com
- **Código:** https://github.com/milogades/practicas-rocketnova/tree/main/ejercicios-proyectos/30-api-usuarios-supabase

> Render (plan gratuito) apaga la API tras unos minutos sin uso. La primera petición puede tardar entre 30 y 60 segundos en responder.

## Tecnologías

- Node.js
- Express 5
- Supabase (PostgreSQL) con `@supabase/supabase-js`
- dotenv (variables de entorno)
- Postman (pruebas)
- Git y GitHub
- Render (despliegue)

## Cómo funciona

```
Postman / navegador  →  API Express (Render)  →  Supabase (tabla usuarios)
```

La API recibe la petición, revisa los datos con sus middlewares, consulta Supabase y responde en JSON.

## Estructura del proyecto

```
30-api-usuarios-supabase/
├── server.js                       Carga el .env, monta middlewares y rutas, y arranca el servidor
├── config/
│   └── supabase.js                 Crea el cliente de Supabase con las variables de entorno
├── routes/
│   └── usuarios.js                 Asocia cada URL con sus middlewares y su función del controller
├── controllers/
│   └── usuariosController.js       Consultas a Supabase: listar, obtener, crear, actualizar, eliminar
├── middlewares/
│   ├── logger.js                   Muestra en consola método, URL y hora de cada petición
│   ├── validarId.js                Comprueba que el id de la URL sea un entero mayor que 0
│   ├── validarUsuario.js           Valida nombre y email en POST y PUT
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

Tabla `usuarios`:

| Columna | Tipo | Notas |
|---|---|---|
| `id` | `int8` | Clave primaria, se genera sola |
| `nombre` | `text` | |
| `email` | `text` | Único: no se puede repetir |

La regla de email único se creó en el SQL Editor de Supabase:

```sql
ALTER TABLE usuarios ADD CONSTRAINT usuarios_email_unico UNIQUE (email);
```

## Cómo ejecutarlo en local

1. Instalar las dependencias:
   ```bash
   npm install
   ```
2. Copiar `.env.example` como `.env` y rellenar los valores del proyecto de Supabase (**Project Settings → API Keys**):
   ```
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_SECRET_KEY=pon_aqui_tu_secret_key
   PORT=3000
   ```
3. Arrancar:
   ```bash
   npm start
   ```

La API queda en `http://localhost:3000`.

> El archivo `.env` contiene la clave secreta y **no se sube a GitHub** (está en `.gitignore`). En Render, las variables `SUPABASE_URL` y `SUPABASE_SECRET_KEY` se configuran en la pestaña **Environment** del servicio.

## Endpoints

| Método | Ruta | Descripción | Respuesta correcta |
|---|---|---|---|
| GET | `/` | Bienvenida y lista de endpoints | 200 |
| GET | `/usuarios` | Lista de usuarios ordenados por id | 200 |
| GET | `/usuarios/:id` | Un usuario por su id | 200 |
| POST | `/usuarios` | Crea un usuario | 201 |
| PUT | `/usuarios/:id` | Modifica el nombre, el email o los dos | 200 |
| DELETE | `/usuarios/:id` | Borra un usuario | 200 |

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

### Crear un usuario (`POST /usuarios`)

Body (JSON), los dos campos son obligatorios:

```json
{ "nombre": "Lucia", "email": "lucia@email.com" }
```

El nombre y el email se guardan sin espacios a los lados, y el email en minúsculas.

### Modificar un usuario (`PUT /usuarios/:id`)

Se envían solo los campos que cambian:

```json
{ "nombre": "Lucía Pérez" }
```

## Validaciones

- `id` (en la URL): número entero mayor que 0.
- `nombre`: texto no vacío.
- `email`: texto con formato de email (`ejemplo@correo.com`).
- En POST los dos campos son obligatorios. En PUT se valida solo lo que se envía, y hay que enviar al menos uno.
- Si hay varios fallos, se devuelven todos juntos en un solo mensaje.

## Errores

Todas las respuestas de error tienen el mismo formato:

```json
{ "success": false, "error": "Usuario no encontrado" }
```

| Código | Cuándo |
|---|---|
| 400 | Id no válido, datos no válidos o JSON mal escrito |
| 404 | El usuario o la ruta no existen |
| 409 | El email ya está registrado |
| 500 | Error interno del servidor (el detalle solo se muestra en la consola del servidor) |

## Pruebas con Postman

En la carpeta `postman/` está la colección con 14 peticiones, incluidos los casos de error. Cada petición comprueba su código de respuesta.

1. En Postman: **Import** → elegir `api-usuarios.postman_collection.json`.
2. La colección usa la variable `baseUrl`, que apunta a Render. Para probar en local, cambiarla a `http://localhost:3000` en la pestaña **Variables** de la colección.
3. Ejecutar las peticiones en orden, o todas a la vez con **Run collection**. La 06 crea un usuario de prueba y guarda su id; la 10 lo modifica y la 12 lo borra, así la tabla queda como estaba.

## Autor

Miguel López León — Prácticas FCT, DAW
