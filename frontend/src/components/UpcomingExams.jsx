import React, { useEffect, useState } from "react";
import api from "../api";

export default function UpcomingExams() {
  const [exames, setExames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/exames/proximos");
        setExames(res.data);
      } catch (err) {
        setError("Falha ao carregar exames");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="mt-4 text-center">Carregando...</p>;
  if (error) return <p className="mt-4 text-center text-red-500">{error}</p>;

  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Próximos exames</h2>
      {exames.length === 0 ? (
        <p>Nenhum exame agendado.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          {exames.map((e, idx) => (
            <li key={idx}>{`${e.nomeAluno} - ${e.dataExame} - ${e.kyu}º kyu - ${e.faixaAlvo}`}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
