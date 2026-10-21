# API de productos (ejercicio 29)

API REST de productos hecha con **Node.js** y **Express**. Permite listar, consultar, crear, modificar y borrar productos, con búsqueda, filtros, paginación, validaciones, middleware y manejo de errores.

Ejercicio 29 del bloque 5 de los «30 ejercicios de Node.js» de las prácticas FCT en RocketNova.

- **URL pública (Render):** https://api-productos-miguel.onrender.com
- **Código:** https://github.com/milogades/practicas-rocketnova/tree/main/ejercicios-proyectos/29-api-productos

> Render (plan gratuito) apaga la API tras unos minutos sin uso. La primera petición puede tardar entre 30 y 60 segundos en responder.

## Tecnologías

- Node.js
- Express 5
- Postman (pruebas)
- Git y GitHub
- Render (despliegue)

## Estructura del proyecto

```
29-api-productos/
├── server.js                       Arranca la app, monta middlewares y rutas
├── routes/
│   └── productos.js                Asocia cada URL con su función del controller
├── controllers/
│   └── productosController.js      Lógica: listar, obtener, crear, actualizar, eliminar
├── middlewares/
│   ├── logger.js                   Muestra en consola método, URL y hora de cada petición
│   ├── validarProducto.js          Valida los datos de POST y PUT
│   └── errores.js                  Ruta no encontrada (404) y manejador global de errores
├── utils/
│   └── crearError.js               Crea errores con código de estado
├── data/
│   └── productos.js                Datos de ejemplo (12 productos)
├── postman/
│   └── api-productos.postman_collection.json
└── package.json
```

## Cómo ejecutarlo en local

```bash
npm install
npm start
```

La API queda en `http://localhost:3000`. El puerto se puede cambiar con la variable de entorno `PORT`.

## Endpoints

| Método | Ruta | Descripción | Respuesta correcta |
|---|---|---|---|
| GET | `/` | Bienvenida y lista de endpoints | 200 |
| GET | `/productos` | Lista de productos con búsqueda, filtros y paginación | 200 |
| GET | `/productos/:id` | Un producto por su id | 200 |
| POST | `/productos` | Crea un producto | 201 |
| PUT | `/productos/:id` | Modifica uno o varios campos de un producto | 200 |
| DELETE | `/productos/:id` | Borra un producto | 200 |

### Búsqueda, filtros y paginación (`GET /productos`)

Todos los parámetros son opcionales y se pueden combinar.

| Parámetro | Ejemplo | Qué hace |
|---|---|---|
| `nombre` | `?nombre=pizza` | Productos cuyo nombre contiene el texto (sin distinguir mayúsculas) |
| `categoria` | `?categoria=bebidas` | Solo esa categoría: `comidas`, `bebidas` o `postres` |
| `precioMin` | `?precioMin=15000` | Precio mayor o igual |
| `precioMax` | `?precioMax=30000` | Precio menor o igual |
| `pagina` | `?pagina=2` | Página que se quiere ver (por defecto 1) |
| `limite` | `?limite=3` | Productos por página (por defecto 5) |

Ejemplo: `GET /productos?categoria=comidas&precioMax=40000&pagina=1&limite=2`

Respuesta:

```json
{
  "success": true,
  "total": 3,
  "pagina": 1,
  "limite": 2,
  "totalPaginas": 2,
  "datos": [
    { "id": 3, "nombre": "Hamburguesa completa", "categoria": "comidas", "precio": 35000 },
    { "id": 8, "nombre": "Ensalada césar", "categoria": "comidas", "precio": 28000 }
  ]
}
```

### Crear un producto (`POST /productos`)

Body (JSON), los tres campos son obligatorios:

```json
{ "nombre": "Café con leche", "categoria": "bebidas", "precio": 8000 }
```

### Modificar un producto (`PUT /productos/:id`)

Se envían solo los campos que cambian:

```json
{ "precio": 9000 }
```

## Validaciones

- `nombre`: texto no vacío.
- `categoria`: una de `comidas`, `bebidas` o `postres`.
- `precio`: número mayor que 0 (sin comillas).
- En POST los tres campos son obligatorios. En PUT se valida solo lo que se envía, y hay que enviar al menos uno.
- Si hay varios fallos, se devuelven todos juntos en un solo mensaje.

## Errores

Todas las respuestas de error tienen el mismo formato:

```json
{ "success": false, "error": "Producto no encontrado" }
```

| Código | Cuándo |
|---|---|
| 400 | Datos no válidos, JSON mal escrito, o `pagina` / `limite` menores que 1 |
| 404 | El producto o la ruta no existen |
| 500 | Error interno del servidor |

## Pruebas con Postman

En la carpeta `postman/` está la colección con todas las peticiones, incluidos los casos de error.

1. En Postman: **Import** → elegir `api-productos.postman_collection.json`.
2. La colección usa la variable `baseUrl`, que apunta a Render. Para probar en local, cambiarla a `http://localhost:3000` en la pestaña **Variables** de la colección.
3. Ejecutar las peticiones en orden (la 9 crea el producto que usan la 11 a la 14).

## Nota

Los datos se guardan en memoria: los cambios hechos con POST, PUT y DELETE se pierden al reiniciar el servidor (también cuando Render lo apaga por inactividad).

## Autor

Miguel López León — Prácticas FCT, DAW
