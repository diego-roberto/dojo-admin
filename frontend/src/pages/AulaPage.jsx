import React, { useEffect, useState } from "react";
import api from "../api";
import AulaList from "../components/AulaList";
import AulaForm from "../components/AulaForm";

export default function AulaPage() {
  const [aulas, setAulas] = useState([]);

  const load = async () => {
    try {
      const res = await api.get("/aulas");
      setAulas(res.data.content || res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (data) => {
    await api.post("/aulas", {
      ...data,
      data: data.data,
    });
    load();
  };

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <AulaForm onSubmit={handleCreate} />
      <AulaList aulas={aulas} />
    </div>
  );
}
