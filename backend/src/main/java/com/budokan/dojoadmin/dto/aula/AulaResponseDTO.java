package com.budokan.dojoadmin.dto.aula;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AulaResponseDTO {

    private UUID id;
    private LocalDate data;
    private String fotoUrl;
    private String nomeSensei;
    private List<String> nomesParticipantes;

    /* ids utilizados para edicao */
    private UUID senseiId;
    private List<UUID> participantesIds;

}
