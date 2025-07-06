import React, { useState } from "react";
import api from "../api";

export default function MensalidadeFilter({ onResults }) {
  const [form, setForm] = useState({
    alunoId: "",
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
      if (form.alunoId) {
        url = `/mensalidades/aluno/${form.alunoId}`;
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
      <input
        name="alunoId"
        value={form.alunoId}
        onChange={handleChange}
        placeholder="ID do aluno"
        className="border p-2 w-full"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="">Status</option>
        <option value="PAGO">PAGO</option>
        <option value="PENDENTE">PENDENTE</option>
      </select>
      <input
        type="month"
        name="mes"
        value={form.mes}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <div className="flex space-x-2">
        <input
          type="month"
          name="inicio"
          value={form.inicio}
          onChange={handleChange}
          className="border p-2 w-full"
        />
        <input
          type="month"
          name="fim"
          value={form.fim}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-[#E30C0C] text-white px-4 py-1 rounded">
        Buscar
      </button>
    </form>
  );
}


