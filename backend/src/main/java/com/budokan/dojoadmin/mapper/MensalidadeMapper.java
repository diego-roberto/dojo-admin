package com.budokan.dojoadmin.mapper;

import com.budokan.dojoadmin.dto.mensalidade.MensalidadeRequestDTO;
import com.budokan.dojoadmin.dto.mensalidade.MensalidadeResponseDTO;
import com.budokan.dojoadmin.entity.Aluno;
import com.budokan.dojoadmin.entity.Mensalidade;
import com.budokan.dojoadmin.repository.AlunoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MensalidadeMapper {

    private final AlunoRepository alunoRepository;

    public Mensalidade fromDTO(MensalidadeRequestDTO dto) {
        Aluno aluno = alunoRepository.findById(dto.getAlunoId())
                .orElseThrow(() -> new IllegalArgumentException("Aluno não encontrado"));

        return Mensalidade.builder()
                .aluno(aluno)
                .mesReferencia(dto.getMesReferencia())
                .statusPagamento(dto.getStatusPagamento())
                .isencao(dto.getIsencao())
                .motivoIsencao(dto.getMotivoIsencao())
                .dataPagamento(dto.getDataPagamento())
                .comprovanteUrl(dto.getComprovanteUrl())
                .build();
    }

    public MensalidadeResponseDTO toDTO(Mensalidade mensalidade) {
        return MensalidadeResponseDTO.builder()
                .id(mensalidade.getId())
                .alunoId(mensalidade.getAluno().getId())
                .nomeAluno(mensalidade.getAluno().getNome())
                .mesReferencia(mensalidade.getMesReferencia())
                .statusPagamento(mensalidade.getStatusPagamento())
                .isencao(mensalidade.getIsencao())
                .motivoIsencao(mensalidade.getMotivoIsencao())
                .dataPagamento(mensalidade.getDataPagamento())
                .comprovanteUrl(mensalidade.getComprovanteUrl())
                .build();
    }
}