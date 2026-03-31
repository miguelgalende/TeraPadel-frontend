import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function RegisterModal({ onClose, navigate }) {
  const { register } = useAuth();

  const [registerData, setRegisterData] = useState({
    nombreUsuario: "",
    apellidosUsuario: "",
    telefonoUsuario: "",
    emailUsuario: "",
    contraseñaUsuario: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      await register(registerData);

      setRegisterData({
        nombreUsuario: "",
        apellidosUsuario: "",
        telefonoUsuario: "",
        emailUsuario: "",
        contraseñaUsuario: "",
      });

      onClose();
      navigate("/home");
    } catch {
      setMensaje("No se pudo registrar el usuario");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 w-[420px] relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-blue-950 mb-6 text-center">
          Crear cuenta
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Nombre"
            value={registerData.nombreUsuario}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                nombreUsuario: e.target.value,
              })
            }
            className="border px-4 py-2 rounded"
          />

          <input
            type="text"
            placeholder="Apellidos"
            value={registerData.apellidosUsuario}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                apellidosUsuario: e.target.value,
              })
            }
            className="border px-4 py-2 rounded"
          />

          <input
            type="tel"
            placeholder="Teléfono"
            value={registerData.telefonoUsuario}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                telefonoUsuario: e.target.value,
              })
            }
            className="border px-4 py-2 rounded"
          />

          <input
            type="email"
            placeholder="Correo"
            value={registerData.emailUsuario}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                emailUsuario: e.target.value,
              })
            }
            className="border px-4 py-2 rounded"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={registerData.contraseñaUsuario}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                contraseñaUsuario: e.target.value,
              })
            }
            className="border px-4 py-2 rounded"
          />

          <button className="bg-blue-950 text-white py-2 rounded">
            Registrarse
          </button>

          {mensaje && (
            <p className="text-red-600 text-sm text-center">{mensaje}</p>
          )}
        </form>
      </div>
    </div>
  );
}
