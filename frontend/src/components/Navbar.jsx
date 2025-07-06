import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { logout, user } = useAuth();

  const linkClass = ({ isActive }) =>
    isActive ? "underline font-semibold" : "hover:underline";

  return (
    <nav className="bg-[#E30C0C] text-white px-4 py-2 fixed top-0 w-full z-10 h-20 flex flex-col md:flex-row items-center justify-between">
      {/* Linha de navegação e logo (empilha em telas pequenas) */}
      <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
        {/* Menu lateral */}
        <div className="flex flex-row space-x-4 items-center justify-center w-full md:w-auto">
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
        {/* Logo: visível só em md+ */}
        <div className="hidden md:flex md:mx-8 items-center justify-center
        absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
          <img
            // src="/bdk_logo_full.png"
            src="/shotokan_logo.png"
            alt="Logo Budokan"
            className="h-16 w-auto object-contain"
            style={{ maxWidth: 250, maxHeight: 80 }}
            draggable={false}
          />
        </div>
      </div>
      {/* Usuário e logout: sempre visível e sem sobreposição */}
      <div className="flex items-center space-x-2 mt-2 md:mt-0">
        <span>{user?.username}</span>
        <button onClick={logout} className="underline">
          Sair
        </button>
      </div>
    </nav>
  );
}