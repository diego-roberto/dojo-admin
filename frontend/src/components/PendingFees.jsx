import React, { useEffect, useState } from "react";
import api from "../api";

export default function PendingFees() {
  const [pendentes, setPendentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allowed, setAllowed] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const month = new Date().toISOString().slice(0, 7).replace("/", "-");
        const res = await api.get(`/mensalidades/mes/${month}/status/PENDENTE`);
        setPendentes(res.data);
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setAllowed(false);
        } else {
          setError("Falha ao carregar mensalidades");
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (!allowed) return null;
  if (loading) return <p className="mt-4 text-center">Carregando...</p>;
  if (error) return <p className="mt-4 text-center text-red-500">{error}</p>;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Mensalidades pendentes</h2>
      {pendentes.length === 0 ? (
        <p>Nenhuma Mensalidade pendente.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          {pendentes.map((m) => (
            <li key={m.id}>{`${m.nomeAluno} - ${m.mesReferencia} - ${m.statusPagamento}`}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
