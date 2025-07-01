package com.budokan.dojoadmin.repository;

import com.budokan.dojoadmin.entity.Aula;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface AulaRepository extends JpaRepository<Aula, UUID> {

    List<Aula> findByData(LocalDate data);
    Page<Aula> findByDataBetween(LocalDate inicio, LocalDate fim, Pageable pageable);


    Page<Aula> findBySenseiResponsavelId(UUID senseiId, Pageable pageable);
    Page<Aula> findBySenseiResponsavelIdAndDataBetween(UUID senseiId, LocalDate inicio, LocalDate fim, Pageable pageable);

    boolean existsByParticipantes_Id(UUID alunoId);

    boolean existsBySenseiResponsavel_Id(UUID alunoId);

}
