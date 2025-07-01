import React, { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/alunos/ativos");
        setAlunos(res.data);
      } catch (err) {
        setError("Erro ao carregar dados");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="mt-4 text-center">Carregando...</p>;
  if (error) return <p className="mt-4 text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Budokan</h1>
      <h2 className="text-xl font-semibold mb-2">Alunos ativos</h2>
      <ul className="list-disc pl-5">
        {alunos.map((a) => (
          <li key={a.id}>{a.nome}</li>
        ))}
      </ul>
    </div>
  );
}
