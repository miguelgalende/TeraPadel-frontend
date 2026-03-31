const API_URL = "http://localhost:8090/api";

export async function crearPista(data) {
  const res = await fetch(`${API_URL}/pistas/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function listarPistasDeClub(idClub) {
  const res = await fetch(`${API_URL}/pistas/club/${idClub}`);
  return await res.json();
}

export async function eliminarPista(id) {
  const res = await fetch(`${API_URL}/pistas/eliminar/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage || "Error al eliminar la pista");
  }

  try {
    return await res.json();
  } catch {
    return { message: "Eliminado sin respuesta JSON" };
  }
}

export async function getPista(id) {
  const res = await fetch(`${API_URL}/pistas/${id}`);
  return await res.json();
}