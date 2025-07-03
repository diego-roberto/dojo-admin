import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { logout, user } = useAuth();

  const linkClass = ({ isActive }) =>
    isActive ? "underline font-semibold" : "hover:underline";

  return (
    <nav className="bg-[#E30C0C] text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <NavLink to="/" className="mr-4 font-bold">
          Budokan
        </NavLink>
        <NavLink to="/alunos" className={linkClass}>
          Alunos
        </NavLink>
        <NavLink to="/mensalidades" className={linkClass}>
          Mensalidades
        </NavLink>
        <NavLink to="/aulas" className={linkClass}>
          Aulas
        </NavLink>
      </div>
      <div className="flex items-center space-x-2">
        <span>{user?.username}</span>
        <button onClick={logout} className="underline">
          Sair
        </button>
      </div>
    </nav>
  );
}
