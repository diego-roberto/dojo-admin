import React from "react";
import { useNavigate } from "react-router-dom";

export default function AulaList({ aulas, title, page, totalPages, onPageChange }) {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="font-bold text-lg mb-2">{title}</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Data</th>
            <th className="p-2 text-left">Sensei</th>
            <th className="p-2 text-left">Participantes</th>
          </tr>
        </thead>
        <tbody>
          {aulas.map((a) => (
            <tr
              key={a.id}
              className="border-t hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/aulas/${a.id}`)}
            >
              <td className="p-2">{a.data}</td>
              <td className="p-2">{a.nomeSensei}</td>
              <td className="p-2">{a.nomesParticipantes.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-between mt-2">
          <button
            disabled={page === 0}
            onClick={() => onPageChange(page - 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
