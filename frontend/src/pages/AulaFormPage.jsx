import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import AulaForm from "../components/AulaForm";

export default function AulaFormPage() {
  const navigate = useNavigate();

  const handleSave = async (data) => {
    await api.post("/aulas", { ...data, data: data.data });
    navigate("/aulas");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <AulaForm onSubmit={handleSave} />
    </div>
  );
}
