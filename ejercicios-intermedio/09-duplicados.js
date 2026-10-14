const usuarios = [
  { id: 1, nombre: "Juan", email: "juan@email.com" },
  { id: 2, nombre: "Maria", email: "maria@email.com" },
  { id: 3, nombre: "Pedro", email: "pedro@email.com" },
  { id: 3, nombre: "Ana", email: "ana@email.com" },
  { id: 4, nombre: "Juan", email: "juan2@email.com" },
  { id: 5, nombre: "Luis", email: "maria@email.com" },
  { id: 6, nombre: "Juan", email: "juan3@email.com" }
];

function buscarDuplicados(lista, campo) {
  const conteo = lista.reduce((cuenta, usuario) => {
    const valor = usuario[campo];

    if (!cuenta[valor]) {
      cuenta[valor] = 0;
    }
    cuenta[valor] = cuenta[valor] + 1;

    return cuenta;
  }, {});

  return Object.keys(conteo)
    .filter((valor) => conteo[valor] > 1)
    .map((valor) => {
      return { valor: valor, veces: conteo[valor] };
    });
}

function detectarDuplicados(lista) {
  return {
    emails: buscarDuplicados(lista, "email"),
    ids: buscarDuplicados(lista, "id"),
    nombres: buscarDuplicados(lista, "nombre")
  };
}

console.log(detectarDuplicados(usuarios));