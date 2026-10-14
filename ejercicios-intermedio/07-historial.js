const usuarios = [
  {
    id: 1,
    nombre: "Juan",
    compras: [
      { fecha: "2026-10-01", total: 50000 },
      { fecha: "2026-10-05", total: 120000 },
      { fecha: "2026-10-09", total: 30000 }
    ]
  },
  {
    id: 2,
    nombre: "Maria",
    compras: [
      { fecha: "2026-10-02", total: 200000 },
      { fecha: "2026-10-08", total: 80000 }
    ]
  },
  {
    id: 3,
    nombre: "Pedro",
    compras: []
  }
];

function buscarUsuario(id) {
  return usuarios.find((usuario) => usuario.id === id);
}

function totalGastado(id) {
  const usuario = buscarUsuario(id);
  if (!usuario) {
    return null;
  }
  return usuario.compras.reduce((total, compra) => total + compra.total, 0);
}

function compraMasGrande(id) {
  const usuario = buscarUsuario(id);
  if (!usuario || usuario.compras.length === 0) {
    return null;
  }
  return usuario.compras.reduce((mayor, compra) => {
    if (compra.total > mayor.total) {
      return compra;
    }
    return mayor;
  });
}

function promedioCompra(id) {
  const usuario = buscarUsuario(id);
  if (!usuario || usuario.compras.length === 0) {
    return 0;
  }
  return Math.round(totalGastado(id) / usuario.compras.length);
}

function ultimaCompra(id) {
  const usuario = buscarUsuario(id);
  if (!usuario || usuario.compras.length === 0) {
    return null;
  }
  return usuario.compras[usuario.compras.length - 1];
}

function usuarioQueMasGasto() {
  return usuarios.reduce((mejor, usuario) => {
    if (totalGastado(usuario.id) > totalGastado(mejor.id)) {
      return usuario;
    }
    return mejor;
  });
}

for (const usuario of usuarios) {
  console.log("--- " + usuario.nombre + " ---");
  console.log("Total gastado: " + totalGastado(usuario.id) + " Gs");
  console.log("Compra más grande:", compraMasGrande(usuario.id));
  console.log("Promedio: " + promedioCompra(usuario.id) + " Gs");
  console.log("Última compra:", ultimaCompra(usuario.id));
}

console.log("Usuario que más gastó: " + usuarioQueMasGasto().nombre);