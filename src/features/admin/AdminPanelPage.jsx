import React, { useEffect, useState } from "react";
import {
  listarClubs,
  crearClub,
  eliminarClub,
  listarPistasDeClub,
  crearPista,
  eliminarPista,
} from "../../services/adminService";

export default function AdminPanelPage() {
  const [clubs, setClubs] = useState([]);
  const [pistas, setPistas] = useState([]);
  const [clubSeleccionado, setClubSeleccionado] = useState(null);

  const [clubData, setClubData] = useState({
    nombreClub: "",
    direccionClub: "",
    telefonoClub: "",
    imagenClub: "",
  });

  const [pistaData, setPistaData] = useState({
    nombrePista: "",
    idClub: "",
    imagenPista: "",
  });

  useEffect(() => {
    cargarClubs();
  }, []);

  const cargarClubs = async () => {
    setClubs(await listarClubs());
  };

  const seleccionarClub = (club) => {
    setClubSeleccionado(club);
    cargarPistas(club.idClub);
  };

  const handleCrearClub = async (e) => {
    e.preventDefault();
    if (
      !clubData.nombreClub.trim() ||
      !clubData.direccionClub.trim() ||
      !clubData.telefonoClub.trim() ||
      !clubData.imagenClub.trim()
    ) {
      alert("Por favor, completa todos los campos antes de crear el club.");
      return;
    }
    await crearClub(clubData);
    setClubData({
      nombreClub: "",
      direccionClub: "",
      telefonoClub: "",
      imagenClub: "",
    });
    cargarClubs();
  };

  const cargarPistas = async (idClub) => {
    setPistas(await listarPistasDeClub(idClub));
  };

  const handleCrearPista = async (e) => {
    e.preventDefault();
    if (
      !pistaData.nombrePista.trim() ||
      !pistaData.idClub.trim() ||
      !pistaData.imagenPista.trim()
    ) {
      alert("Por favor, completa todos los campos antes de crear la pista.");
      return;
    }
    await crearPista(pistaData);
    setPistaData({ nombrePista: "", idClub: "", imagenPista: "" });
    cargarPistas(pistaData.idClub);
  };

  const borrarClub = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este club?")) return;

    try {
      await eliminarClub(id);
      setClubs((prev) => prev.filter((club) => club.idClub !== id));
    } catch (err) {
      console.error("Error eliminando club:", err);
      alert("No se pudo eliminar el club");
    }
  };

  const borrarPista = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta pista?")) return;

    try {
      await eliminarPista(id);
      setPistas((prev) => prev.filter((pista) => pista.idPista !== id));
    } catch (err) {
      console.error("Error eliminando pista:", err);
      alert("No se pudo eliminar la pista");
    }
  };

  return (
    <div className="container mx-auto pt-40 px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Administración</h1>

      {/* Crear club */}
      <div className="bg-white shadow p-6 rounded mb-10">
        <h2 className="text-xl font-semibold mb-4">Crear Club</h2>

        <form onSubmit={handleCrearClub} className="flex gap-3 flex-col">
          <input
            placeholder="Nombre del club"
            className="border p-2 rounded"
            value={clubData.nombreClub}
            onChange={(e) =>
              setClubData({ ...clubData, nombreClub: e.target.value })
            }
          />

          <input
            placeholder="Dirección"
            className="border p-2 rounded"
            value={clubData.direccionClub}
            onChange={(e) =>
              setClubData({ ...clubData, direccionClub: e.target.value })
            }
          />

          <input
            placeholder="Teléfono"
            className="border p-2 rounded"
            value={clubData.telefonoClub}
            onChange={(e) =>
              setClubData({ ...clubData, telefonoClub: e.target.value })
            }
          />

          <input
            placeholder="URL de la imagen"
            className="border p-2 rounded"
            value={clubData.imagenClub}
            onChange={(e) =>
              setClubData({ ...clubData, imagenClub: e.target.value })
            }
          />

          <button className="bg-[#172554] text-white py-2 rounded  hover:bg-[#c0e000]  hover:text-black transition-colors">
            Crear Club
          </button>
        </form>
      </div>

      {/* Lista de clubes */}
      <div className="bg-white shadow p-6 rounded mb-10">
        <h2 className="text-xl font-bold mb-3">Clubes registrados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {clubs.map((club) => (
            <div
              key={club.idClub}
              className="bg-white rounded shadow cursor-pointer overflow-hidden hover:shadow-lg transition"
            >
              {/* Imagen */}
              <img
                src={club.imagenClub}
                alt={club.nombreClub}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">{club.nombreClub}</h3>
                <p className="text-gray-500 text-sm">{club.direccionClub}</p>

                <div className="flex gap-3 mt-3">
                  <button
                    className="bg-[#172554] text-white px-3 py-2 rounded  hover:bg-[#c0e000]  hover:text-black transition-colors"
                    onClick={() => seleccionarClub(club)}
                  >
                    Ver pistas
                  </button>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => borrarClub(club.idClub)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pistas del club */}
      {clubSeleccionado && (
        <div className="bg-white shadow p-6 rounded mb-10">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Pistas de {clubSeleccionado.nombreClub}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pistas.map((pista) => (
                <div
                  key={pista.idPista}
                  className="bg-white p-3 rounded shadow flex flex-col"
                >
                  <img
                    src={pista.imagenPista}
                    alt={pista.nombrePista}
                    className="w-full h-40 object-cover rounded mb-3"
                  />

                  <p className="font-semibold text-center mb-3">
                    {pista.nombrePista}
                  </p>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded mt-auto w-full hover:bg-red-700"
                    onClick={() => borrarPista(pista.idPista)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Crear pista */}
          <div className="bg-white shadow p-6 rounded mt-6">
            <h3 className="text-lg font-semibold mb-2">Crear Pista</h3>
            <form onSubmit={handleCrearPista} className="flex flex-col gap-3">
              <input
                placeholder="Nombre de la pista"
                className="border p-2 rounded"
                value={pistaData.nombrePista}
                onChange={(e) =>
                  setPistaData({
                    ...pistaData,
                    nombrePista: e.target.value,
                    idClub: clubSeleccionado.idClub,
                  })
                }
              />

              <input
                placeholder="URL de la imagen"
                className="border p-2 rounded"
                value={pistaData.imagenPista}
                onChange={(e) =>
                  setPistaData({
                    ...pistaData,
                    imagenPista: e.target.value,
                    idClub: clubSeleccionado.idClub || clubSeleccionado.idClub,
                  })
                }
              />

              <button className="bg-[#172554] text-white py-2 rounded  hover:bg-[#c0e000]  hover:text-black transition-colors">
                Crear Pista
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
