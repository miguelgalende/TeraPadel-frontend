import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HourButton } from "../../components/ui/HourButton";
import { getPista } from "../../services/pistasService";

export default function PistaPage() {
  const { state } = useLocation();
  const pistaProp = state?.pista;

  const [pista, setPista] = useState(pistaProp || null);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [fecha, setFecha] = useState("");

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!pistaProp) {
      getPista(state?.idPista).then(setPista);
    }
  }, [pistaProp, state]);

  if (!pista) return <div className="pt-60 text-center">Cargando...</div>;

  const horasOcupadas =
    fecha && pista.ocupadasPorDia ? pista.ocupadasPorDia[fecha] || [] : [];

  const hoy = new Date().toISOString().split("T")[0];
  const esHoy = fecha === hoy;

  const ahora = new Date();
  ahora.setSeconds(0, 0);

  const horaYaPaso = (hora) => {
    if (!esHoy) return false;

    const [h, m] = hora.split(":").map(Number);

    const inicio = new Date();
    inicio.setHours(h, m, 0, 0);

    const fin = new Date(inicio);
    fin.setMinutes(fin.getMinutes() + 30);

    return ahora >= inicio;
  };

  const toggleTime = (time) => {
    if (horaYaPaso(time)) return;

    const times = pista.horario; // lista ordenada de horas
    const index = times.indexOf(time);

    // Si ya está seleccionado → deseleccionar y reiniciar selección
    if (selectedTimes.includes(time)) {
      setSelectedTimes([]);
      return;
    }

    // Si no hay seleccionados → selecciona el primero
    if (selectedTimes.length === 0) {
      setSelectedTimes([time]);
      return;
    }

    // Verifica consecutividad
    const ordered = [...selectedTimes].sort(
      (a, b) => times.indexOf(a) - times.indexOf(b),
    );
    const firstIndex = times.indexOf(ordered[0]);
    const lastIndex = times.indexOf(ordered[ordered.length - 1]);

    // El nuevo debe estar justo antes o justo después
    const esConsecutivo = index === lastIndex + 1 || index === firstIndex - 1;

    if (!esConsecutivo) {
      return alert("Solo puedes seleccionar horas consecutivas");
    }

    // Si ya hay 3 → no dejar agregar más
    if (selectedTimes.length >= 3) {
      return alert("Solo puedes seleccionar máximo 3 bloques");
    }

    // AÑADIR DE FORMA ORDENADA
    const newSelection = [...selectedTimes, time].sort(
      (a, b) => times.indexOf(a) - times.indexOf(b),
    );

    setSelectedTimes(newSelection);
  };

  const crearReserva = async () => {
    if (!usuario) return alert("Debes iniciar sesión");
    if (!fecha) return alert("Selecciona una fecha");
    if (selectedTimes.length === 0)
      return alert("Selecciona al menos una hora");

    const inicio = selectedTimes[0];
    const ultima = selectedTimes[selectedTimes.length - 1];

    const [h, m] = ultima.split(":");
    let minutoFinal = Number(m) + 30;
    let horaFinal = Number(h);

    if (minutoFinal >= 60) {
      minutoFinal -= 60;
      horaFinal++;
    }

    const inicioReserva = `${fecha}T${inicio}:00`;
    const finReserva = `${fecha}T${String(horaFinal).padStart(2, "0")}:${String(
      minutoFinal,
    ).padStart(2, "0")}:00`;

    const data = {
      idPista: pista.idPista,
      idUsuario: usuario.idUsuario,
      inicioReserva,
      finReserva,
      estadoReserva: "ACTIVA",
    };

    console.log("ENVIANDO:", data);

    try {
      const res = await fetch("http://localhost:8090/api/reservas/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.text();
        console.error("ERROR SERVIDOR:", error);
        alert("La reserva no se pudo crear ❌");
        return;
      }

      alert("Reserva creada ✔");
      setSelectedTimes([]);

      const nuevas = [...horasOcupadas, ...selectedTimes];
      setPista((prev) => ({
        ...prev,
        ocupadasPorDia: {
          ...prev.ocupadasPorDia,
          [fecha]: nuevas,
        },
      }));
    } catch (e) {
      console.error(e);
      alert("Error de conexión ❌");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-40">
      <h2 className="text-2xl font-bold mb-4">{pista.nombrePista}</h2>

      <img
        src={pista.imagenPista}
        alt={pista.nombrePista}
        className="w-full h-60 object-cover rounded mb-6 shadow"
      />

      {/* FECHA */}
      <label className="block text-sm text-gray-700 mb-1">Fecha</label>
      <input
        type="date"
        className="border p-2 rounded mb-6"
        min={new Date().toISOString().split("T")[0]}
        value={fecha}
        onChange={(e) => {
          setFecha(e.target.value);
          setSelectedTimes([]);
        }}
      />

      {/* HORAS */}
      {fecha ? (
        <>
          <h3 className="text-lg font-semibold mb-2">Selecciona hora</h3>

          <div className="grid grid-cols-4 gap-2">
            {pista.horario.map((t) => {
              const pasada = horaYaPaso(t);

              return (
                <HourButton
                  key={t}
                  time={t}
                  busy={horasOcupadas.includes(t)}
                  past={pasada}
                  selected={selectedTimes.includes(t)}
                  onClick={toggleTime}
                />
              );
            })}
          </div>
        </>
      ) : (
        <p className="mt-4 text-gray-600">
          Selecciona una fecha para ver horas
        </p>
      )}

      {/* BOTONES */}
      <div className="mt-6 flex gap-3">
        <button
          className="bg-blue-950 text-white rounded px-4 py-2 hover:bg-[#d7ff00] hover:text-black"
          onClick={crearReserva}
        >
          Confirmar reserva
        </button>

        <button
          className=" bg-gray-300 text-black rounded px-4 py-2 hover:bg-gray-400"
          onClick={() => setSelectedTimes([])}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
