package com.budokan.dojoadmin.repository;

import com.budokan.dojoadmin.entity.Mensalidade;
import com.budokan.dojoadmin.enums.StatusPagamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MensalidadeRepository extends JpaRepository<Mensalidade, UUID> {

    List<Mensalidade> findByAlunoId(UUID alunoId);
    List<Mensalidade> findByMesReferenciaAndStatusPagamento(String mes, StatusPagamento status);

}
