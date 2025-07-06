import React, { useEffect, useState } from "react";
import api from "../api";
import MensalidadeList from "../components/MensalidadeList";
import MensalidadeForm from "../components/MensalidadeForm";

export default function MensalidadePage() {
  const [mensalidades, setMensalidades] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    try {
      const res = await api.get("/mensalidades/status/PENDENTE");
      setMensalidades(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async (data) => {
    await api.put(`/mensalidades/${editing.id}`, data);
    setEditing(null);
    load();
  };

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <MensalidadeForm
        mensalidade={editing}
        onSubmit={handleSave}
        onCancel={() => setEditing(null)}
      />
      <MensalidadeList mensalidades={mensalidades} onEdit={setEditing} />
    </div>
  );
}
