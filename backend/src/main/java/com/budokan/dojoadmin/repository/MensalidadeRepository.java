package com.budokan.dojoadmin.repository;

import com.budokan.dojoadmin.entity.Mensalidade;
import com.budokan.dojoadmin.enums.StatusPagamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MensalidadeRepository extends JpaRepository<Mensalidade, UUID> {

    List<Mensalidade> findByAlunoId(UUID alunoId);
    List<Mensalidade> findByMesReferenciaAndStatusPagamento(String mes, StatusPagamento status);
    List<Mensalidade> findByStatusPagamento(StatusPagamento status);

    @Query("SELECT m FROM Mensalidade m WHERE m.mesReferencia >= :inicio AND m.mesReferencia <= :fim AND m.statusPagamento = :status")
    List<Mensalidade> findByPeriodoAndStatus(@Param("inicio") String inicio, @Param("fim") String fim, @Param("status") StatusPagamento status);


}
