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

  const handleParticipantesChange = (id) => {
    setParticipantes((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
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
      /> <br/> <br/>
      <span className="text-sm">Responsável</span>
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
      </select> <br/> <br/>
      <span className="text-sm">Alunos</span>
      <div className="border p-2 w-full h-32 overflow-y-auto">
        {participantesOptions.map((a) => (
          <label key={a.id} className="block">
            <input
              type="checkbox"
              value={a.id}
              checked={participantes.includes(a.id)}
              onChange={() => handleParticipantesChange(a.id)}
              className="mr-2"
            />
            {a.nome}
          </label>
        ))}
      </div>
      <input
        placeholder="URL da foto da aula"
        value={fotoUrl}
        onChange={(e) => setFotoUrl(e.target.value)}
        className="border p-2 w-full"
      /> <br/> <br/>
      <button type="submit" className="bg-[#E30C0C] text-white px-4 py-1 rounded">
        Registrar
      </button>
    </form>
  );
}
