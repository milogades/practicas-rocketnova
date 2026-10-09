# Servidor de usuarios y productos

Es la práctica del servidor. Devuelve usuarios y productos en JSON, y en la página principal se ve el HTML.

## Instalación

Hay que tener Node instalado. No he instalado nada más.

## Ejecución

Dentro de la carpeta del proyecto:

    node server.js

Si sale Servidor en http://localhost:3000, ya está. Se abre esa dirección en el navegador. Para pararlo, Ctrl+C en la terminal.

## Endpoints

- GET / enseña la página.
- GET /usuarios devuelve a Juan, Maria y Pedro. Código 200.
- GET /usuarios/2 devuelve a Maria. Código 200.
- GET /usuarios/99 no está en la lista, así que devuelve Usuario no encontrado y un 404.
- GET /productos devuelve cinco productos, con id, nombre y precio. Código 200.

## Capturas de Postman

- GET /usuarios, código 200. <img width="719" height="680" alt="image" src="https://github.com/user-attachments/assets/f8775b0d-7bd4-4a26-8a0f-aa6726eb6680" />

- GET /usuarios/99, código 404. <img width="706" height="505" alt="image" src="https://github.com/user-attachments/assets/78edb572-8f9c-4957-af21-c39d9735c54a" />

- GET /productos, código 200. <img width="706" height="669" alt="image" src="https://github.com/user-attachments/assets/32ca8329-b237-47c3-85ee-2c921ba4d044" />


## Qué aprendí

Casi todo era nuevo. Empecé por JavaScript: una lista de usuarios, una función, filter para quedarme con los mayores de edad y find para buscar por id. Si no está, se devuelve null. Al principio no veía cómo se conectaba la lista con la función. Se conecta al llamarla.

El código se escribe en VS Code y se ejecuta en la terminal con node. La terminal también sirve para parar el servidor con Ctrl+C.

Después el fetch, con async y await, para pedir datos a una API. Luego el servidor: GET /usuarios devuelve la lista, GET /usuarios/2 devuelve a una persona y si el id no existe responde 404. La página HTML la sirve el mismo servidor, y el botón pide /usuarios y pinta los nombres. Al principio no salían porque abrí el HTML con Live Server, en el puerto 5500, y no en localhost:3000.

También añadí /productos y lo probé en Postman, mirando el 200 y el 404 del usuario 99.
