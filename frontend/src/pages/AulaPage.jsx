import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import AulaList from "../components/AulaList";
import AulaFilter from "../components/AulaFilter";

export default function AulaPage() {
  const [pageData, setPageData] = useState({ content: [], number: 0, totalPages: 0 });
  const [filter, setFilter] = useState(null);
  const navigate = useNavigate();

  const loadMonth = async (page = 0) => {
    const now = new Date();
    const inicio = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .slice(0, 10);
    const fim = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .slice(0, 10);
    try {
      const res = await api.get(
        `/aulas/periodo?inicio=${inicio}&fim=${fim}&page=${page}`
      );
      setPageData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMonth();
  }, []);

  const handleSearch = async (params, page = 0) => {
    try {
      let url = "";
      if (params.tipo === "dia" && params.data) {
        url = `/aulas/periodo?inicio=${params.data}&fim=${params.data}&page=${page}`;
      } else if (params.tipo === "sensei" && params.senseiId) {
        url = `/aulas/sensei/${params.senseiId}?page=${page}`;
      } else if (params.tipo === "aluno" && params.alunoId) {
        url = `/aulas/aluno/${params.alunoId}?page=${page}`;
      } else {
        return;
      }
      const res = await api.get(url);
      setPageData(res.data);
      setFilter(params);
    } catch (err) {
      console.error(err);
    }
  };

  const changePage = (p) => {
    if (filter) handleSearch(filter, p);
    else loadMonth(p);
  };

  const title = filter ? "Aulas encontradas" : "Últimas aulas do mês";

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => navigate("/aulas/new")}
          className="bg-[#E30C0C] text-white px-4 py-1 rounded"
        >
          Registrar
        </button>
      </div>
      <AulaFilter onSearch={(p) => handleSearch(p, 0)} />
      <AulaList
        aulas={pageData.content || []}
        title={title}
        page={pageData.number}
        totalPages={pageData.totalPages}
        onPageChange={changePage}
      />
    </div>
  );
}
