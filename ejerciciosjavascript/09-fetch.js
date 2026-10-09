async function obtenerUsuarios() {
  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!respuesta.ok) {
      throw new Error("Error HTTP " + respuesta.status);
    }

    const usuarios = await respuesta.json();
    console.log(usuarios);
  } catch (error) {
    console.log("No se pudieron obtener los usuarios");
    console.log(error);
  }
}

obtenerUsuarios();