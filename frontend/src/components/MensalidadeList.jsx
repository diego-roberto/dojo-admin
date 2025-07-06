import React from "react";
import { Link } from "react-router-dom";

export default function MensalidadeList({ mensalidades }) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-2">Mensalidades</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Aluno</th>
            <th className="p-2 text-left">Mês</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2" />
          </tr>
        </thead>
        <tbody>
          {mensalidades.map((m) => (
            <tr key={m.id} className="border-t">
              <td className="p-2">{m.nomeAluno}</td>
              <td className="p-2">{m.mesReferencia}</td>
              <td className="p-2">{m.statusPagamento}</td>
              <td className="p-2 text-right">
                <Link
                  to={`/mensalidades/${m.id}`}
                  className="text-blue-600 underline"
                >
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

