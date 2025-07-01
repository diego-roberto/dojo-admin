package com.budokan.dojoadmin.mapper;

import com.budokan.dojoadmin.dto.exame.ExameResponseDTO;
import com.budokan.dojoadmin.entity.Exame;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ExameMapper {

    public ExameResponseDTO toDTO(Exame exame) {
        return ExameResponseDTO.builder()
                .id(exame.getId())
                .nomeAluno(exame.getAluno() != null ? exame.getAluno().getNome() : null)
                .dataExame(exame.getDataExame())
                .kyu(exame.getKyu())
                .faixaAlvo(exame.getFaixaAlvo())
                .aprovado(exame.getAprovado())
                .build();
    }
}
