import React, { useEffect, useState } from "react";

export default function MensalidadeForm({ mensalidade, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    alunoId: "",
    mesReferencia: "",
    statusPagamento: "PAGO",
    dataPagamento: "",
    isencao: false,
    motivoIsencao: "",
    comprovanteUrl: "",
  });

  useEffect(() => {
    setForm(
      mensalidade || {
        alunoId: "",
        mesReferencia: "",
        statusPagamento: "PAGO",
        dataPagamento: "",
        isencao: false,
        motivoIsencao: "",
        comprovanteUrl: "",
      }
    );
  }, [mensalidade]);

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-2 max-w-md">
      <h2 className="font-bold text-lg">
        {mensalidade && mensalidade.id ? "Editar Mensalidade" : "Nova Mensalidade"}
      </h2>
      <input
        name="alunoId"
        placeholder="ID do aluno"
        value={form.alunoId}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="month"
        name="mesReferencia"
        value={form.mesReferencia}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <select
        name="statusPagamento"
        value={form.statusPagamento}
        onChange={handleChange}
        className="border p-2 w-full"
      >
        <option value="PAGO">PAGO</option>
        <option value="PENDENTE">PENDENTE</option>
      </select>
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isencao"
          checked={form.isencao || false}
          onChange={handleChange}
        />
        <span>Isenção</span>
      </label>
      {form.isencao && (
        <input
          name="motivoIsencao"
          placeholder="Motivo"
          value={form.motivoIsencao || ""}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      )}
      <input
        type="date"
        name="dataPagamento"
        value={form.dataPagamento || ""}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        name="comprovanteUrl"
        placeholder="URL do comprovante"
        value={form.comprovanteUrl || ""}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <div className="space-x-2">
        <button type="submit" className="bg-[#E30C0C] text-white px-4 py-1 rounded">
          Salvar
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-4 py-1 border rounded">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
