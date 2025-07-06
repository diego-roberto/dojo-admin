import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    <section className="bg-white p-4 rounded shadow border border-[#E30C0C]">
      <h2 className="text-xl font-semibold mb-2">Alunos ativos</h2>
      {alunos.length === 0 ? (
        <p>Nenhum aluno ativo.</p>
      ) : (
        <ul className="space-y-2">
          {alunos.map((a) => (
            <li key={a.id} className="space-y-1 border-b last:border-0 pb-2">
              <Link
                to={`/alunos/${a.id}`}
                className="text-blue-600 underline block"
              >
                {a.nome}
              </Link>
              <span className="block">{a.graduacaoLabel}</span>
              <span className="block">{a.faixaAtual}</span>
              {a.dataNascimento && (
                <span className="block">{a.dataNascimento}</span>
              )}
              {a.dataUltimoExame && (
                <span className="block">{a.dataUltimoExame}</span>
              )}
              {a.observacoes && <span className="block">{a.observacoes}</span>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
