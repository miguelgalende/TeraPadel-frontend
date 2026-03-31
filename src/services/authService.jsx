const API_URL = "http://localhost:8090/api";

/* LOGIN */

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error("Contraseña incorrecta");
    if (response.status === 404) throw new Error("Usuario no encontrado");
    throw new Error("Error al iniciar sesión");
  }

  const data = await response.json();

  localStorage.setItem("token", data.token);
  localStorage.setItem("usuario", JSON.stringify(data.usuario));

  return data;
};

/* REGISTER */

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/usuarios/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("No se pudo registrar el usuario");
  }

  const data = await response.json();

  localStorage.setItem("token", data.token);
  localStorage.setItem("usuario", JSON.stringify(data.usuario));

  return data;
};

/* LOGOUT */

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
};

export const getUser = () => {
  const user = localStorage.getItem("usuario");
  return user ? JSON.parse(user) : null;
};

export const isAdmin = () => {
  const user = getUser();
  return user && user.rolUsuario === "ADMIN";
};