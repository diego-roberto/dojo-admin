import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import MensalidadeForm from "../components/MensalidadeForm";

export default function MensalidadeFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mensalidade, setMensalidade] = useState(null);

  useEffect(() => {
    async function load() {
      if (id) {
        try {
          const res = await api.get(`/mensalidades/${id}`);
          setMensalidade(res.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        setMensalidade({});
      }
    }
    load();
  }, [id]);

  const handleSave = async (data) => {
    if (id) await api.put(`/mensalidades/${id}`, data);
    else await api.post("/mensalidades", data);
    navigate("/mensalidades");
  };

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <MensalidadeForm
        mensalidade={mensalidade}
        onSubmit={handleSave}
        onCancel={() => navigate("/mensalidades")}
      />
    </div>
  );
}

