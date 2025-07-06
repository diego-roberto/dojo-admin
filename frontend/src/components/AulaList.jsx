import React from "react";

export default function AulaList({ aulas }) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-2">Últimas Aulas</h2>
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
            <tr key={a.id} className="border-t">
              <td className="p-2">{a.data}</td>
              <td className="p-2">{a.nomeSensei}</td>
              <td className="p-2">{a.nomesParticipantes.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
