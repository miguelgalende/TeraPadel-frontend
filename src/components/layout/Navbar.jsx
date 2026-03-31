import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logopadel.png";

import LoginModal from "../auth/LoginModal";
import RegisterModal from "../auth/RegisterModal";

import useAuth from "../../hooks/useAuth";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const isInitPage = location.pathname === "/";
  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-blue-950 text-white flex items-center justify-between px-4 sm:px-6 md:px-12 py-3 sm:py-4 md:py-6 shadow-lg z-50">
        <div
          className="cursor-pointer flex-shrink-0"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="TeraPadel" className="w-16 sm:w-20 md:w-24" />
        </div>

        {isInitPage ? (
          <div className="flex gap-2 sm:gap-4 md:gap-6">
            <button
              onClick={() => setShowLogin(true)}
              className="bg-[#d7ff00] text-black px-6 py-2 rounded-lg shadow hover:shadow-lg hover:bg-[#9fcc00] transition-all duration-200"
            >
              Iniciar sesión
            </button>

            <button
              onClick={() => setShowRegister(true)}
              className="border border-[#d7ff00] text-[#d7ff00] px-6 py-2 rounded-lg hover:bg-[#d7ff00] hover:text-black shadow hover:shadow-lg transition-all duration-200"
            >
              Registrarse
            </button>
          </div>
        ) : (
          <>
            {/* MENU DESKTOP */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                to="/home"
                className={`px-4 py-2 rounded-lg transition ${
                  isActive("/home")
                    ? "bg-[#d7ff00] text-black shadow-lg"
                    : "hover:bg-[#d7ff00] hover:text-black"
                }`}
              >
                Inicio
              </Link>

              <Link
                to="/reservas"
                className={`px-4 py-2 rounded-lg transition ${
                  isActive("/reservas")
                    ? "bg-[#d7ff00] text-black shadow-lg"
                    : "hover:bg-[#d7ff00] hover:text-black"
                }`}
              >
                Mis Reservas
              </Link>

              <Link
                to="/admin"
                className={`px-4 py-2 rounded-lg transition ${
                  isActive("/admin")
                    ? "bg-[#d7ff00] text-black shadow-lg"
                    : "hover:bg-[#d7ff00] hover:text-black"
                }`}
              >
                Admin
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded shadow hover:shadow-lg hover:bg-red-700 transition"
              >
                Cerrar sesión
              </button>
            </div>

            {/* BOTON HAMBURGUESA (movil) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col justify-center items-center gap-1 w-8 h-8"
            >
              <span
                className={`block h-0.5 w-6 bg-white transition ${
                  menuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-white transition ${
                  menuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 w-6 bg-white transition ${
                  menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              ></span>
            </button>
          </>
        )}
      </nav>

      {/* MENU MOVIL */}
      {!isInitPage && menuOpen && (
        <div className="md:hidden fixed top-[80px] text-white left-0 w-full bg-blue-950 flex flex-col items-center gap-4 py-6 shadow-lg z-40">
          <Link
            to="/home"
            onClick={closeMenu}
            className={`w-48 text-center px-4 py-2 rounded-lg transition ${
              isActive("/home")
                ? "bg-[#d7ff00] text-black"
                : "hover:bg-[#d7ff00] hover:text-black"
            }`}
          >
            Inicio
          </Link>

          <Link
            to="/reservas"
            onClick={closeMenu}
            className={`w-48 text-center px-4 py-2 rounded-lg transition ${
              isActive("/reservas")
                ? "bg-[#d7ff00] text-black"
                : "hover:bg-[#d7ff00] hover:text-black"
            }`}
          >
            Mis Reservas
          </Link>

          <Link
            to="/admin"
            onClick={closeMenu}
            className={`w-48 text-center px-4 py-2 rounded-lg transition ${
              isActive("/admin")
                ? "bg-[#d7ff00] text-black"
                : "hover:bg-[#d7ff00] hover:text-black"
            }`}
          >
            Admin
          </Link>

          <button
            onClick={handleLogout}
            className="w-48 bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Cerrar sesión
          </button>
        </div>
      )}

      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} navigate={navigate} />
      )}

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          navigate={navigate}
        />
      )}
    </>
  );
}
