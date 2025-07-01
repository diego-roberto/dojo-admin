import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* exemplo de página protegida */
function Home() {
  return <h1 className="text-center mt-16 text-2xl">Dashboard Budokan</h1>;
}

/* rota protegida (redireciona se não autenticado) */
function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
