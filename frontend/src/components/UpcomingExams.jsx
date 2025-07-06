import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function UpcomingExams() {
  const [exames, setExames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/exames/proximos?dias=30");
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
    <section className="bg-white p-4 rounded shadow border border-[#E30C0C]">
      <h2 className="text-xl font-semibold mb-2">Próximos exames</h2>
      {exames.length === 0 ? (
        <p>Nenhum exame agendado.</p>
      ) : (
        <ul className="space-y-2">
          {exames.map((e) => (
            <li key={e.alunoId} className="flex flex-col sm:flex-row sm:space-x-2">
              <Link
                to={`/alunos/${e.alunoId}`}
                className="text-blue-600 underline"
              >
                {e.nomeAluno}
              </Link>
              <span>{e.dataExame}</span>
              <span>{e.kyu}º kyu</span>
              <span>{e.faixaAlvo}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
