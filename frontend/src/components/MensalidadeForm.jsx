import React, { useEffect, useState } from "react";

export default function MensalidadeForm({ mensalidade, onSubmit, onCancel }) {
  const [form, setForm] = useState({ statusPagamento: "PAGO", dataPagamento: "" });

  useEffect(() => {
    setForm(
      mensalidade || { statusPagamento: "PAGO", dataPagamento: "" }
    );
  }, [mensalidade]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!mensalidade) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-2 max-w-md">
      <h2 className="font-bold text-lg">Editar Mensalidade</h2>
      <select
        name="statusPagamento"
        value={form.statusPagamento}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="PAGO">PAGO</option>
        <option value="PENDENTE">PENDENTE</option>
      </select>
      <input
        type="date"
        name="dataPagamento"
        value={form.dataPagamento || ""}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <div className="space-x-2">
        <button type="submit" className="bg-[#E30C0C] text-white px-4 py-1 rounded">
          Salvar
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-1 border rounded">
          Cancelar
        </button>
      </div>
    </form>
  );
}
