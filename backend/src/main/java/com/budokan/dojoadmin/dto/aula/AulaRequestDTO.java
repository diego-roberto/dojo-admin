package com.budokan.dojoadmin.dto.aula;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
public class AulaRequestDTO {

    @NotNull
    private LocalDate data;

    @NotNull
    private UUID senseiId;

    @NotEmpty
    private List<UUID> participantes;

    private String fotoUrl;

}

