package com.budokan.dojoadmin.mapper;

import com.budokan.dojoadmin.dto.aula.AulaRequestDTO;
import com.budokan.dojoadmin.dto.aula.AulaResponseDTO;
import com.budokan.dojoadmin.entity.Aluno;
import com.budokan.dojoadmin.entity.Aula;
import com.budokan.dojoadmin.repository.AlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AulaMapper {

    private final AlunoRepository alunoRepository;

    public Aula fromDTO(AulaRequestDTO dto) {
        Aluno sensei = alunoRepository.findById(dto.getSenseiId())
                .orElseThrow(() -> new IllegalArgumentException("Sensei não encontrado"));

        if (sensei.getGraduacaoKyu() < 91) {
            throw new IllegalArgumentException("Apenas yudanshas podem ministrar aulas");
        }

        List<Aluno> participantes = alunoRepository.findAllById(dto.getParticipantes());

        return Aula.builder()
                .data(dto.getData())
                .fotoUrl(dto.getFotoUrl())
                .comentarios(dto.getComentarios())
                .senseiResponsavel(sensei)
                .participantes(participantes)
                .build();
    }

    public AulaResponseDTO toDTO(Aula aula) {
        return new AulaResponseDTO(
                aula.getId(),
                aula.getData(),
                aula.getFotoUrl(),
                aula.getComentarios(),
                aula.getSenseiResponsavel().getNome(),
                aula.getParticipantes().stream().map(Aluno::getNome).toList(),
                aula.getSenseiResponsavel().getId(),
                aula.getParticipantes().stream().map(Aluno::getId).toList()
        );
    }

}
