import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../api";

export default function AulaDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [aula, setAula] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/aulas/${id}`);
        setAula(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [id]);

  if (!aula) return <div className="p-4">Carregando...</div>;

  return (
    <div className="p-4 space-y-4 max-w-3xl mx-auto">
      <h2 className="font-bold text-lg">Aula em {aula.data}</h2>
      <div className="flex space-x-4">
        {aula.fotoUrl && (
          <iframe
            src={aula.fotoUrl}
            alt="Foto da aula"
            width="640" height="480"
            className="w-48 h-48 object-cover border"
          />
        )}
        <div>
          <p>
            <strong>Sensei:</strong> {aula.nomeSensei}
          </p> <br/>
          <p>
            <strong>Participantes:</strong> {aula.nomesParticipantes.join(", ")}
          </p>
        </div>
      </div>
      <div className="space-x-2">
        <button onClick={() => navigate("/aulas")} className="px-4 py-1 border rounded">
          Voltar
        </button>
        {user && (
          <button
            onClick={() => navigate(`/aulas/${id}/edit`)}
            className="bg-[#E30C0C] text-white px-4 py-1 rounded"
          >
            Editar
          </button>
        )}
      </div>
    </div>
  );
}
