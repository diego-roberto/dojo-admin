package com.budokan.dojoadmin.dto;

import com.budokan.dojoadmin.enums.Faixa;
import com.budokan.dojoadmin.enums.StatusAluno;
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
public class AlunoPublicDTO {

    private UUID id;
    private String nome;
    private String usuario;
    private String graduacaoLabel;
    private Faixa faixaAtual;
    private String federacaoOrigem;
    private LocalDate dataUltimoExame;
    private StatusAluno status;

}
