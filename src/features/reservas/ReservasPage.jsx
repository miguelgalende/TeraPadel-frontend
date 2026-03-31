import React, { useEffect, useState } from "react";
import { getPista } from "../../services/pistasService";
import { listarReservasUsuario } from "../../services/reservasService";
import { getClub } from "../../services/clubesService";

export default function ReservasPage() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");

  const esPasada = (fechaISO) => {
    const ahora = new Date();
    const fechaReserva = new Date(fechaISO);
    return fechaReserva < ahora;
  };

  useEffect(() => {
    if (!usuario) return;

    const cargar = async () => {
      try {
        const data = await listarReservasUsuario(usuario.idUsuario);

        const completas = await Promise.all(
          data.map(async (reserva) => {
            const pista = await getPista(reserva.idPista);
            const club = await getClub(pista.idClub);
            return { ...reserva, pista, club };
          }),
        );

        completas.sort(
          (a, b) => new Date(a.inicioReserva) - new Date(b.inicioReserva),
        );

        setReservas(completas);
      } catch (err) {
        console.error("Error cargando reservas:", err.message);
        setReservas([]);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, [usuario]);

  const eliminarReserva = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta reserva?")) return;

    try {
      const response = await fetch(
        `http://localhost:8090/api/reservas/eliminar/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: "Bearer " + token },
        },
      );

      if (response.ok) {
        setReservas((prev) => prev.filter((r) => r.idReserva !== id));
      }
    } catch (err) {
      console.error("Error eliminando:", err);
    }
  };

  if (!usuario)
    return (
      <h2 className="text-center pt-60 text-xl">
        Debes iniciar sesión para ver tus reservas.
      </h2>
    );

  if (loading)
    return <h2 className="text-center pt-60 text-xl">Cargando reservas...</h2>;

  return (
    <div className="container mx-auto px-4 py-8 pt-40">
      <h1 className="text-2xl font-bold mb-6">Mis Reservas</h1>

      {reservas.length === 0 ? (
        <p>No tienes reservas realizadas.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {reservas.map((reserva) => {
            const pasada = esPasada(reserva.inicioReserva);

            return (
              <div
                key={reserva.idReserva}
                className="bg-white p-4 shadow rounded flex flex-col justify-between w-full sm:w-[48%] lg:w-[30%] max-w-sm mx-auto"
              >
                <div>
                  <h2 className="text-xl font-semibold text-center">
                    {reserva.club?.nombreClub}
                  </h2>

                  <p>
                    <strong>Pista:</strong> {reserva.pista?.nombrePista}
                  </p>

                  <p>
                    <strong>Inicio:</strong>{" "}
                    {new Date(reserva.inicioReserva).toLocaleString()}
                  </p>

                  <p>
                    <strong>Fin:</strong>{" "}
                    {new Date(reserva.finReserva).toLocaleString()}
                  </p>

                  <p>
                    <strong>Estado:</strong> {reserva.estadoReserva}
                  </p>
                </div>

                <button
                  onClick={() => !pasada && eliminarReserva(reserva.idReserva)}
                  disabled={pasada}
                  className={`px-4 py-2 rounded mt-3 ${
                    pasada
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-700"
                  }`}
                >
                  {pasada ? "Reserva pasada" : "Cancelar reserva"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
