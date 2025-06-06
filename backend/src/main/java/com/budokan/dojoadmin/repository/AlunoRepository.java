package com.budokan.dojoadmin.repository;

import com.budokan.dojoadmin.entity.Aluno;
import com.budokan.dojoadmin.enums.StatusAluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AlunoRepository extends JpaRepository<Aluno, UUID> {

    List<Aluno> findByStatus(StatusAluno status);
    Optional<Aluno> findByUsuarioIgnoreCase(String username);

    @Query(value = "SELECT * FROM alunos WHERE unaccent(lower(nome)) LIKE unaccent(lower(concat('%', :nome, '%')))", nativeQuery = true)
    Optional<Aluno> findByNomeUnaccent(@Param("nome") String nome);

}
