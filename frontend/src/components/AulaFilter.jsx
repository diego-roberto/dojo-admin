import React, { useEffect, useState } from "react";
import api from "../api";

export default function AulaFilter({ onSearch }) {
  const [tipo, setTipo] = useState("");
  const [data, setData] = useState("");
  const [senseiId, setSenseiId] = useState("");
  const [alunoId, setAlunoId] = useState("");
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/alunos/ativos");
        setAlunos(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const blackBelts = alunos.filter((a) => a.graduacaoKyu >= 91);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ tipo, data, senseiId, alunoId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 border p-4">
      <h2 className="font-bold text-lg">Buscar Aulas</h2>
      <label className="block max-w-md">
        <span className="text-sm">Buscar por</span>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Selecione</option>
          <option value="dia">Dia</option>
          <option value="sensei">Sensei</option>
          <option value="aluno">Aluno</option>
        </select>
      </label>
      {tipo === "dia" && (
        <label className="block max-w-md">
          <span className="text-sm">Data</span>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="border p-2 w-full"
          />
        </label>
      )}
      {tipo === "sensei" && (
        <label className="block max-w-md">
          <span className="text-sm">Sensei</span>
          <select
            value={senseiId}
            onChange={(e) => setSenseiId(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Selecione</option>
            {blackBelts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nome}
              </option>
            ))}
          </select>
        </label>
      )}
      {tipo === "aluno" && (
        <label className="block max-w-md">
          <span className="text-sm">Aluno</span>
          <select
            value={alunoId}
            onChange={(e) => setAlunoId(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="">Selecione</option>
            {alunos.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nome}
              </option>
            ))}
          </select>
        </label>
      )} <br/>
      <button type="submit" className="bg-[#E30C0C] text-white px-4 py-1 rounded">
        Buscar
      </button>
    </form>
  );
}
