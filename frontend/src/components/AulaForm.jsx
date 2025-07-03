import React, { useState } from "react";

export default function AulaForm({ onSubmit }) {
  const [data, setData] = useState("");
  const [senseiId, setSenseiId] = useState("");
  const [participantes, setParticipantes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      data,
      senseiId,
      participantes: participantes.split(/\s*,\s*/).filter((p) => p),
    });
    setData("");
    setSenseiId("");
    setParticipantes("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 max-w-md">
      <h2 className="font-bold text-lg">Nova Aula</h2>
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        placeholder="Sensei ID"
        value={senseiId}
        onChange={(e) => setSenseiId(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        placeholder="Participantes IDs separados por vírgula"
        value={participantes}
        onChange={(e) => setParticipantes(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-[#E30C0C] text-white px-4 py-1 rounded">
        Registrar
      </button>
    </form>
  );
}
