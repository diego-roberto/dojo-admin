package com.budokan.dojoadmin.service;

import com.budokan.dojoadmin.dto.dashboard.DashboardResponseDTO;
import com.budokan.dojoadmin.dto.aluno.AlunoPublicDTO;
import com.budokan.dojoadmin.dto.mensalidade.MensalidadeResponseDTO;
import com.budokan.dojoadmin.enums.StatusPagamento;
import com.budokan.dojoadmin.mapper.AlunoMapper;
import com.budokan.dojoadmin.mapper.MensalidadeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final AlunoService alunoService;
    private final MensalidadeService mensalidadeService;
    private final AlunoMapper alunoMapper;
    private final MensalidadeMapper mensalidadeMapper;

    public DashboardResponseDTO getDashboard() {
        long totalAtivos = alunoService.countActive();

        List<AlunoPublicDTO> proximosExames = alunoService.findAptosExame()
                .stream().map(alunoMapper::toPublicDTO).toList();

        String mesAtual = YearMonth.now().format(DateTimeFormatter.ofPattern("yyyy/MM"));
        List<MensalidadeResponseDTO> inadimplentes = mensalidadeService
                .findByMesAndStatus(mesAtual, StatusPagamento.PENDENTE)
                .stream().map(mensalidadeMapper::toDTO).toList();

        int mesNumero = YearMonth.now().getMonthValue();
        List<AlunoPublicDTO> aniversariantes = alunoService.findAniversariantes(mesNumero)
                .stream().map(alunoMapper::toPublicDTO).toList();

        return DashboardResponseDTO.builder()
                .totalAlunosAtivos(totalAtivos)
                .proximosExames(proximosExames)
                .inadimplentes(inadimplentes)
                .aniversariantes(aniversariantes)
                .build();
    }
}
