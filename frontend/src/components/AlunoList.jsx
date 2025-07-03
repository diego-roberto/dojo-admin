import React from "react";

export default function AlunoList({ alunos, onEdit }) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-2">Alunos</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Nome</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2" />
          </tr>
        </thead>
        <tbody>
          {alunos.map((a) => (
            <tr key={a.id} className="border-t">
              <td className="p-2">{a.nome}</td>
              <td className="p-2">{a.email}</td>
              <td className="p-2 text-right">
                <button
                  onClick={() => onEdit(a)}
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
