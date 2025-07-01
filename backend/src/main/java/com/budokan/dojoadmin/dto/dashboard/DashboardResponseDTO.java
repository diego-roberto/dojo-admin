package com.budokan.dojoadmin.dto.dashboard;

import com.budokan.dojoadmin.dto.aluno.AlunoPublicDTO;
import com.budokan.dojoadmin.dto.mensalidade.MensalidadeResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardResponseDTO {

    private long totalAlunosAtivos;
    private List<AlunoPublicDTO> proximosExames;
    private List<MensalidadeResponseDTO> inadimplentes;
    private List<AlunoPublicDTO> aniversariantes;
}
