const API_URL = "http://localhost:8090/api";

/* CLUBES */

export const listarClubs = async () => {
  const res = await fetch(`${API_URL}/clubs/listar`);
  return res.json();
};

export const crearClub = async (data) => {
  const res = await fetch(`${API_URL}/clubs/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const eliminarClub = async (id) => {
  const res = await fetch(`${API_URL}/clubs/eliminar/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error eliminando club");
};

/* PISTAS */

export const listarPistasDeClub = async (idClub) => {
  const res = await fetch(`${API_URL}/pistas/club/${idClub}`);
  return res.json();
};

export const crearPista = async (data) => {
  const res = await fetch(`${API_URL}/pistas/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const eliminarPista = async (id) => {
  const res = await fetch(`${API_URL}/pistas/eliminar/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error eliminando pista");
};