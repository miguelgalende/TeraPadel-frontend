import React, { useEffect, useState } from "react";
import { getPista } from "../../services/pistasService";
import { useNavigate } from "react-router-dom";
import { listarClubs, listarPistasDeClub } from "../../services/adminService";
import { ClubCard } from "../../components/ui/ClubCard";

export default function HomePage() {
  const [clubs, setClubs] = useState([]);
  const [pistasPorClub, setPistasPorClub] = useState({});
  const [clubAbierto, setClubAbierto] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await listarClubs();
        if (Array.isArray(data)) setClubs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  // Abrir club y cargar pistas
  const abrirClub = async (club) => {
    const idClub = club.idClub;

    if (clubAbierto === idClub) {
      setClubAbierto(null);
      return;
    }

    setClubAbierto(idClub);

    if (!pistasPorClub[idClub]) {
      const pistas = await listarPistasDeClub(idClub);
      setPistasPorClub((prev) => ({ ...prev, [idClub]: pistas }));
    }
  };

  if (loading) {
    return <h2 className="mt-40 text-center text-xl">Cargando clubes...</h2>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-40">
      <h2 className="text-2xl font-bold mb-6">Clubes disponibles</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {clubs.length === 0 ? (
          <p>No hay clubes disponibles.</p>
        ) : (
          clubs.map((club) => (
            <div key={club.idClub} className="relative">
              <ClubCard club={club} onClick={abrirClub} />

              {/* DESPLEGABLE DE PISTAS */}
              {clubAbierto === club.idClub && (
                <div className="mt-3 bg-gray-100 p-3 rounded shadow">
                  {!pistasPorClub[club.idClub] ? (
                    <p>Cargando pistas...</p>
                  ) : (
                    pistasPorClub[club.idClub].map((p) => (
                      <div
                        key={p.idPista || p._id}
                        className="flex flex-col items-center justify-between bg-white p-3 rounded shadow mb-2"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={p.imagenPista}
                            alt={p.nombrePista}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <span className="font-semibold">{p.nombrePista}</span>
                        </div>

                        <button
                          className="bg-blue-950 text-white px-3 py-1 rounded hover:bg-[#d7ff00] hover:text-black mt-5"
                          onClick={async () => {
                            const pistaCompleta = await getPista(p.idPista);
                            navigate("/pista", {
                              state: { pista: pistaCompleta },
                            });
                          }}
                        >
                          Reservar
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
