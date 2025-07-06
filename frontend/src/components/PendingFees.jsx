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
        const res = await api.get(`/mensalidades/status/PENDENTE`);
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
    <section className="bg-white p-4 rounded shadow border border-[#E30C0C]">
      <h2 className="text-xl font-semibold mb-2">Mensalidades pendentes</h2>
      {pendentes.length === 0 ? (
        <p>Nenhuma Mensalidade pendente.</p>
      ) : (
        <ul className="space-y-2">
          {pendentes.map((m) => (
            <li key={m.id} className="space-y-1 border-b last:border-0 pb-2">
              <span className="block">{m.nomeAluno}</span>
              <span className="block">{m.mesReferencia}</span>
              <span className="block">{m.statusPagamento}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
