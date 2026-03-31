const API_URL = "http://localhost:8090/api";

export async function crearReserva(data) {
  const res = await fetch(`${API_URL}/reservas/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await res.json();
}

export const listarReservasUsuario = async (idUsuario) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:8090/api/reservas/usuario/${idUsuario}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Error al obtener reservas");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [];
};