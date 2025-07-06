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
      <label className="block">
        <span className="text-sm">ID do aluno</span>
        <input
          name="alunoId"
          value={form.alunoId}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </label>
      <label className="block">
        <span className="text-sm">Mês de referência</span>
        <input
          type="month"
          name="mesReferencia"
          value={form.mesReferencia}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </label>
      <label className="block">
        <span className="text-sm">Status de pagamento</span>
        <select
          name="statusPagamento"
          value={form.statusPagamento}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="PAGO">PAGO</option>
          <option value="PENDENTE">PENDENTE</option>
        </select>
      </label>
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
        <label className="block">
          <span className="text-sm">Motivo</span>
          <input
            name="motivoIsencao"
            value={form.motivoIsencao || ""}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </label>
      )}
      <label className="block">
        <span className="text-sm">Data de pagamento</span>
        <input
          type="date"
          name="dataPagamento"
          value={form.dataPagamento || ""}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </label>
      <label className="block">
        <span className="text-sm">URL do comprovante</span>
        <input
          name="comprovanteUrl"
          value={form.comprovanteUrl || ""}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </label>
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
