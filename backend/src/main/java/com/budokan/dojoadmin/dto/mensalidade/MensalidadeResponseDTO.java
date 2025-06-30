package com.budokan.dojoadmin.dto.mensalidade;

import com.budokan.dojoadmin.enums.StatusPagamento;
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
public class MensalidadeResponseDTO {
    private UUID id;
    private UUID alunoId;
    private String mesReferencia;
    private StatusPagamento statusPagamento;
    private Boolean isencao;
    private String motivoIsencao;
    private LocalDate dataPagamento;
    private String comprovanteUrl;
}