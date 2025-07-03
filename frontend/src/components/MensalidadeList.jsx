import React from "react";

export default function MensalidadeList({ mensalidades, onEdit }) {
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
                <button
                  onClick={() => onEdit(m)}
                  className="text-blue-600 underline"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
