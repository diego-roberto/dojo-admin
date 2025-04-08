package com.budokan.dojoadmin.repository;

import com.budokan.dojoadmin.entity.Exame;
import com.budokan.dojoadmin.enums.Faixa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface ExameRepository extends JpaRepository<Exame, UUID> {

    List<Exame> findByAlunoId(UUID alunoId);
    List<Exame> findByFaixaAlvo(Faixa faixa);
    List<Exame> findByDataExameBetween(LocalDate start, LocalDate end);

}
