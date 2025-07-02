import React, { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [alunos, setAlunos] = useState([]);
  const [exames, setExames] = useState([]);
  const [pendentes, setPendentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [alunosRes, examesRes, pendRes] = await Promise.all([
          api.get("/alunos/ativos"),
          api.get("/exames/proximos"),
          api.get(
            `/mensalidades/mes/${new Date().toISOString().slice(0, 7).replace("/", "-")}/status/PENDENTE`
          ),
        ]);
        setAlunos(alunosRes.data);
        setExames(examesRes.data);
        setPendentes(pendRes.data);
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
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Budokan</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Alunos ativos</h2>
        <ul className="list-disc pl-5">
          {alunos.map((a) => (
            <li key={a.id}>{a.nome}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Próximos exames</h2>
        {exames.length === 0 ? (
          <p>Nenhum exame agendado.</p>
        ) : (
          <ul className="list-disc pl-5">
            {exames.map((e) => (
              <li key={e.id}>{`${e.nomeAluno} - ${e.dataExame}`}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Mensalidades pendentes</h2>
        {pendentes.length === 0 ? (
          <p>Nenhuma Mensalidade pendente.</p>
        ) : (
          <ul className="list-disc pl-5">
            {pendentes.map((m) => (
              <li key={m.id}>{m.alunoId}</li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
