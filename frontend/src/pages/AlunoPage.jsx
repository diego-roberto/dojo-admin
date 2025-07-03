import React, { useEffect, useState } from "react";
import api from "../api";
import AlunoForm from "../components/AlunoForm";
import AlunoList from "../components/AlunoList";

export default function AlunoPage() {
  const [alunos, setAlunos] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const res = await api.get("/alunos");
      setAlunos(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (data) => {
    if (editing) await api.put(`/alunos/${editing.id}`, data);
    else await api.post("/alunos", data);
    setEditing(null);
    load();
  };

  return (
    <div className="space-y-6">
      <AlunoForm aluno={editing} onSubmit={handleSave} onCancel={() => setEditing(null)} />
      <AlunoList alunos={alunos} onEdit={setEditing} />
    </div>
  );
}
