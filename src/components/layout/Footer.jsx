export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-10">
      <div className="container mx-auto px-6 text-center">
        <p className="text-lg font-semibold tracking-wide">
          © {new Date().getFullYear()} Miguel Ángel Galende Verdes — Todos los
          derechos reservados.
        </p>

        <p className="text-sm text-gray-300 mt-2">
          Aplicación desarrollada para gestión de reservas de pádel.
        </p>
      </div>
    </footer>
  );
}
