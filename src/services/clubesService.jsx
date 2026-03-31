const API_URL = "http://localhost:8090/api";

export async function crearClub(data) {
  const res = await fetch(`${API_URL}/clubs/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function listarClubs() {
  const res = await fetch(`${API_URL}/clubs/listar`);
  return await res.json();
}

export async function eliminarClub(id) {
  const res = await fetch(`${API_URL}/clubs/eliminar/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar club");

  try {
    return await res.json();
  } catch {
    return { message: "Eliminado sin respuesta JSON" };
  }
}