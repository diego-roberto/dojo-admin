import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import AlunoPage from "./pages/AlunoPage";
import MensalidadePage from "./pages/MensalidadePage";
import AulaPage from "./pages/AulaPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="alunos" element={<AlunoPage />} />
            <Route path="alunos/:id" element={<AlunoPage />} />
            <Route path="mensalidades" element={<MensalidadePage />} />
            <Route path="aulas" element={<AulaPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
