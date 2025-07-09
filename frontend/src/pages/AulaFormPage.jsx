import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import AulaForm from "../components/AulaForm";

export default function AulaFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aula, setAula] = useState(null);

  useEffect(() => {
    async function load() {
      if (id) {
        try {
          const res = await api.get(`/aulas/${id}`);
          setAula(res.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        setAula({});
      }
    }
    load();
  }, [id]);

  const handleSave = async (data) => {
    if (id) await api.put(`/aulas/${id}`, data);
    else await api.post("/aulas", data);
    navigate("/aulas");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <AulaForm aula={aula} onSubmit={handleSave} onCancel={() => navigate("/aulas")} />
    </div>
  );
}
