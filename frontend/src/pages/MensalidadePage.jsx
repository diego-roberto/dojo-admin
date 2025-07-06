import React, { useState } from "react";
import { Link } from "react-router-dom";
import MensalidadeList from "../components/MensalidadeList";
import MensalidadeFilter from "../components/MensalidadeFilter";

export default function MensalidadePage() {
  const [mensalidades, setMensalidades] = useState([]);

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-end">
        <Link
          to="/mensalidades/new"
          className="bg-[#E30C0C] text-white px-4 py-1 rounded"
        >
          Nova Mensalidade
        </Link>
      </div>
      <MensalidadeFilter onResults={setMensalidades} />
      <MensalidadeList mensalidades={mensalidades} />
    </div>
  );
}

