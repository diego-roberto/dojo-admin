import React, { useEffect, useState } from "react";
import api from "../api";

export default function ActiveStudents() {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get("/alunos/ativos");
        setAlunos(res.data);
      } catch (err) {
        setError("Falha ao carregar alunos");
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
      <h2 className="text-xl font-semibold mb-2">Alunos ativos</h2>
      {alunos.length === 0 ? (
        <p>Nenhum aluno ativo.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          {alunos.map((a) => (
            <li key={a.id}>
              {a.nome} - {a.graduacaoLabel} - {a.faixaAtual}
              {a.dataNascimento && (
                <> - {a.dataNascimento} - {a.dataUltimoExame}
                  {a.observacoes && ` - ${a.observacoes}`}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
