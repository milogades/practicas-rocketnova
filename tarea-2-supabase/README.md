# Tarea 2 – Introducción a Supabase

Prácticas FCT en RocketNova · Miguel López León · 21 de octubre de 2026

## Qué se ha hecho

- [x] Cuenta y proyecto en Supabase (**Miguel-rocketnovas Project**, región West EU – Ireland, plan Free).
- [x] Tabla `usuarios` con las columnas `id` (int8, clave primaria, se genera sola), `nombre` (text) y `email` (text).
- [x] 5 usuarios metidos a mano: Juan, Maria, Pedro, Ana y Carlos.
- [x] Tabla `productos` con las columnas `id` (int8, clave primaria), `nombre` (text) y `precio` (numeric).
- [x] 5 productos: Pizza margarita (45000), Coca-Cola 1L (12000), Hamburguesa completa (35000), Agua mineral (6000) y Helado de vainilla (15000).
- [x] Desde el panel: crear, editar, eliminar y consultar registros, y revisar la estructura de la tabla.
- [x] Preguntas teóricas respondidas (abajo).

## Capturas

| # | Qué muestra | Archivo |
|---|---|---|
| 1 | Proyecto creado | [01-proyecto-creado.jpg](capturas/01-proyecto-creado.jpg) |
| 2 | Tabla `usuarios` y sus columnas | [02-tabla-usuarios-estructura.jpg](capturas/02-tabla-usuarios-estructura.jpg) |
| 3 | Los 5 usuarios | [03-usuarios-5-filas.jpg](capturas/03-usuarios-5-filas.jpg) |
| 4 | Tabla `productos` y sus columnas | [04-tabla-productos-estructura.jpg](capturas/04-tabla-productos-estructura.jpg) |
| 5 | Los 5 productos | [05-productos-5-filas.jpg](capturas/05-productos-5-filas.jpg) |
| 6 | Crear: formulario y fila nueva (Cerveza, id 7) | [06a](capturas/06a-crear-formulario.jpg), [06b](capturas/06b-crear-resultado.jpg) |
| 7 | Editar: formulario y resultado («margarita» → «Pizza margarita») | [07a](capturas/07a-editar-formulario.jpg), [07b](capturas/07b-editar-resultado.jpg) |
| 8 | Eliminar: menú, confirmación y resultado | [08a](capturas/08a-eliminar-menu.jpg), [08b](capturas/08b-eliminar-confirmar.jpg), [08c](capturas/08c-eliminar-resultado.jpg) |
| 9 | Consultar: filtro `precio < 20000` (3 resultados) | [09-consultar-filtro.jpg](capturas/09-consultar-filtro.jpg) |
| 10 | Estructura: definición SQL de `productos` | [10-estructura-definition.jpg](capturas/10-estructura-definition.jpg) |

La Cerveza tiene el id 7 y no el 6 porque se creó una antes, se borró, y la base de datos nunca reutiliza un id ya usado.

## Preguntas

**1. ¿Qué es Supabase?**
Supabase es una plataforma en internet que te da ya hecha la parte de «servidor» de tu web o app. Te proporciona una base de datos PostgreSQL, sistema de usuarios (login), almacenamiento de archivos y APIs listas para usar. Yo he creado en ella mi proyecto con las tablas `usuarios` y `productos`, y lo he manejado todo desde su panel web.

**2. ¿Qué es una base de datos?**
Es un lugar organizado donde se guarda la información de forma ordenada para poder buscarla, añadirla, modificarla o borrarla fácilmente. Imagina un archivador digital muy bien estructurado. A diferencia de un array en el código, los datos no se pierden al reiniciar el servidor.

**3. ¿Qué es una tabla?**
Dentro de una base de datos, una tabla es como una hoja de Excel. Contiene información relacionada de un mismo tipo. Por ejemplo, en mi proyecto tengo una tabla `usuarios` y otra `productos`.

**4. ¿Qué es una fila?**
Una fila es un registro concreto, es decir, una entrada individual. Por ejemplo, en mi tabla `productos`, la fila `2 · Coca-Cola 1L · 12000` es un producto concreto, y en `usuarios` cada fila es un usuario (Juan, Maria…).

**5. ¿Qué es una columna?**
Una columna es un campo: un tipo de dato que tienen todas las filas. Por ejemplo, en mi tabla `productos` tengo las columnas `id`, `nombre` y `precio`. La columna `precio` es de tipo `numeric`, así que todas las filas tienen un precio y tiene que ser un número.

**6. ¿Qué es una API?**
Es un intermediario que permite que dos programas se hablen entre sí. Tu frontend (la página web o app) le pide datos a la API, la API se los pide a la base de datos y se los devuelve. Es como el camarero que lleva tu pedido a la cocina y te trae la comida. Yo hice una en el ejercicio 29: Postman le pedía los productos con `GET /productos` y ella los devolvía en JSON.

**7. ¿Para qué sirve Supabase en un proyecto web?**
Sirve para no tener que montar tú mismo todo el backend desde cero. Con Supabase puedes:

- Guardar y consultar datos en una base de datos.
- Tener usuarios con registro y login.
- Conectar tu web o tu servidor mediante su API.
- Almacenar archivos, como imágenes.

Por ejemplo, en el ejercicio 30 mi servidor de Render guardará los datos en Supabase en vez de en un array, así no se pierden al reiniciar.
