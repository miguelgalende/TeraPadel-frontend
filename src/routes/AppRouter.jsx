import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import HomePage from "../features/clubes/HomePage";
import PistaPage from "../features/pistas/PistaPage";
import ReservasPage from "../features/reservas/ReservasPage";
import AdminPanelPage from "../features/admin/AdminPanelPage";

function PrivateAdminRoute({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario || usuario.rolUsuario !== "ADMIN") {
    return <Navigate to="/home" />;
  }
  return children;
}

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/pista" element={<PistaPage />} />
      <Route path="/reservas" element={<ReservasPage />} />
      <Route
        path="/admin"
        element={
          <PrivateAdminRoute>
            <AdminPanelPage />
          </PrivateAdminRoute>
        }
      />
    </Routes>
  );
}
