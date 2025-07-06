import React, { useEffect, useState } from "react";
import api from "../api";

export default function AulaForm({ onSubmit }) {
  const [data, setData] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [senseiId, setSenseiId] = useState("");
  const [participantes, setParticipantes] = useState([]);
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    async function loadAlunos() {
      try {
        const res = await api.get("/alunos/ativos");
        setAlunos(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    loadAlunos();
  }, []);

  const blackBelts = alunos.filter((a) => a.graduacaoKyu >= 91);
  const participantesOptions = alunos.filter((a) => a.id !== senseiId);

  const handleParticipantesChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
    setParticipantes(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ data, senseiId, participantes, fotoUrl });
    setData("");
    setFotoUrl("");
    setSenseiId("");
    setParticipantes([]);
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
      <select
        value={senseiId}
        onChange={(e) => setSenseiId(e.target.value)}
        className="border p-2 w-full"
      >
        <option value="">Selecione o sensei</option>
        {blackBelts.map((a) => (
          <option key={a.id} value={a.id}>
            {a.nome}
          </option>
        ))}
      </select>
      <select
        multiple
        value={participantes}
        onChange={handleParticipantesChange}
        className="border p-2 w-full h-32"
      >
        {participantesOptions.map((a) => (
          <option key={a.id} value={a.id}>
            {a.nome}
          </option>
        ))}
      </select>
      <input
        placeholder="URL da foto da aula"
        value={fotoUrl}
        onChange={(e) => setFotoUrl(e.target.value)}
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-[#E30C0C] text-white px-4 py-1 rounded">
        Registrar
      </button>
    </form>
  );
}
