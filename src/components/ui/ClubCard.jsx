export function ClubCard({ club, onClick }) {
  return (
    <div
      onClick={() => onClick(club)}
      className="bg-white shadow rounded-lg p-4 cursor-pointer hover:shadow-lg"
    >
      <img
        src={club.imagenClub}
        alt={club.nombreClub}
        className="w-full h-40 object-cover rounded mb-3"
      />
      <h3 className="text-lg font-semibold">{club.nombreClub}</h3>
      <p className="text-gray-500 text-sm">{club.direccionClub}</p>
      <p className="text-gray-400 text-xs mt-2">{club.telefonoClub}</p>
    </div>
  );
}
