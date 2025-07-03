import React, { useEffect, useState } from "react";

export default function AlunoForm({ aluno, onSubmit, onCancel }) {
  const [form, setForm] = useState({ nome: "", email: "" });

  useEffect(() => {
    setForm(aluno || { nome: "", email: "" });
  }, [aluno]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 max-w-md">
      <h2 className="font-bold text-lg">
        {aluno ? "Editar Aluno" : "Novo Aluno"}
      </h2>
      <input
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <div className="space-x-2">
        <button
          type="submit"
          className="bg-[#E30C0C] text-white px-4 py-1 rounded"
        >
          {aluno ? "Salvar" : "Criar"}
        </button>
        {aluno && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-1 border rounded"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
