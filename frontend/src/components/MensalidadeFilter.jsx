import React, { useState } from "react";
import api from "../api";

export default function MensalidadeFilter({ onResults }) {
  const [form, setForm] = useState({
    nome: "",
    status: "",
    mes: "",
    inicio: "",
    fim: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = "";
      if (form.nome) {
        url = `/mensalidades/aluno/nome/${encodeURIComponent(form.nome)}`;
      } else if (form.mes && form.status) {
        url = `/mensalidades/mes/${form.mes}/status/${form.status}`;
      } else if (form.inicio && form.fim && form.status) {
        url = `/mensalidades/periodo/${form.inicio}/${form.fim}/status/${form.status}`;
      } else if (form.status) {
        url = `/mensalidades/status/${form.status}`;
      } else {
        url = `/mensalidades/status/PENDENTE`;
      }

      const res = await api.get(url);
      onResults(res.data);
    } catch (err) {
      console.error(err);
      onResults([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4">
      <h2 className="font-bold text-lg">Filtrar Mensalidades</h2>
      <label className="block">
        <span className="text-sm">Nome do aluno</span>
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </label>
      <label className="block">
        <span className="text-sm">Status</span>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="">Selecione</option>
          <option value="PAGO">PAGO</option>
          <option value="PENDENTE">PENDENTE</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm">Mês</span>
        <input
          type="month"
          name="mes"
          value={form.mes}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </label>
      <div className="flex space-x-2">
        <label className="block w-full">
          <span className="text-sm">De</span>
          <input
            type="month"
            name="inicio"
            value={form.inicio}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </label>
        <label className="block w-full">
          <span className="text-sm">Até</span>
          <input
            type="month"
            name="fim"
            value={form.fim}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </label>
      </div>
      <button type="submit" className="bg-[#E30C0C] text-white px-4 py-1 rounded">
        Buscar
      </button>
    </form>
  );
}


