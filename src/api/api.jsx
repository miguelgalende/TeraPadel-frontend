const API_URL = "http://localhost:8090/api";

export const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Error en la API");
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
};


