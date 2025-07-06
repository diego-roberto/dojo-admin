import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(username, password);
    setLoading(false);
    if (result.success) {
      toast.success("Bem-vindo!");
      navigate("/");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xs"
      >
      <div className="flex justify-center mb-4">
        <img
          // src="/bdk_logo.png"
          src="/shotokan_logo.png"
          alt="Logo Budokan"
          className="w-24 h-24 object-contain"
        />
      </div>
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Entrar</h1>
        <input
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring"
          placeholder="Usuário"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
