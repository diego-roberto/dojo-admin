package com.budokan.dojoadmin.dto.exame;

import com.budokan.dojoadmin.enums.Faixa;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExameResponseDTO {
    private UUID alunoId;
    private String nomeAluno;
    private LocalDate dataExame;
    private int kyu;
    private Faixa faixaAlvo;
    private Boolean aprovado;
}
