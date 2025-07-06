import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import AlunoForm from "../components/AlunoForm";
import AlunoList from "../components/AlunoList";

export default function AlunoPage() {
  const [alunos, setAlunos] = useState([]);
  const [editing, setEditing] = useState(null);
  const { id } = useParams();

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

  useEffect(() => {
    async function loadAluno() {
      if (id) {
        try {
          const res = await api.get(`/alunos/id/${id}`);
          setEditing(res.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        setEditing(null);
      }
    }
    loadAluno();
  }, [id]);

  const handleSave = async (data) => {
    if (editing) await api.put(`/alunos/${editing.id}`, data);
    else await api.post("/alunos", data);
    setEditing(null);
    load();
  };

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <AlunoForm aluno={editing} onSubmit={handleSave} onCancel={() => setEditing(null)} />
      <AlunoList alunos={alunos} onEdit={setEditing} />
    </div>
  );
}
