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
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-20">
        
        <div className="flex flex-col flex-1">
          <AulaForm onSubmit={handleCreate} />
        </div>

        <div className="flex flex-col flex-1 gap-6">
          <AulaList aulas={aulas} />
        </div>

      </div>
    </div>
  );
}
