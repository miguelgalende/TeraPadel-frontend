import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function LoginModal({ onClose, navigate }) {
  const { login } = useAuth();

  const [loginData, setLoginData] = useState({
    emailUsuario: "",
    contraseñaUsuario: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      await login(loginData);

      setLoginData({
        emailUsuario: "",
        contraseñaUsuario: "",
      });

      onClose();
      navigate("/home");
    } catch (error) {
      if (error.status === 401) setMensaje("Contraseña incorrecta");
      else if (error.status === 404) setMensaje("Usuario no encontrado");
      else setMensaje("Error al iniciar sesión");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-blue-950 mb-6 text-center">
          Iniciar sesión
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={loginData.emailUsuario}
            onChange={(e) =>
              setLoginData({ ...loginData, emailUsuario: e.target.value })
            }
            className="border px-4 py-2 rounded"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={loginData.contraseñaUsuario}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                contraseñaUsuario: e.target.value,
              })
            }
            className="border px-4 py-2 rounded"
            required
          />

          <button className="bg-blue-950 text-white hover:bg-[#d7ff00] hover:text-black py-2 rounded">
            Entrar
          </button>
        </form>

        {mensaje && (
          <p className="text-red-600 text-sm text-center mt-3">{mensaje}</p>
        )}
      </div>
    </div>
  );
}
