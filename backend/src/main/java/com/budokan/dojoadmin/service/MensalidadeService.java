package com.budokan.dojoadmin.service;

import com.budokan.dojoadmin.dto.mensalidade.MensalidadeRequestDTO;
import com.budokan.dojoadmin.entity.Mensalidade;
import com.budokan.dojoadmin.enums.StatusPagamento;
import com.budokan.dojoadmin.mapper.MensalidadeMapper;
import com.budokan.dojoadmin.repository.MensalidadeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MensalidadeService {

    private final MensalidadeRepository mensalidadeRepository;
    private final MensalidadeMapper mensalidadeMapper;

    @Transactional
    public Mensalidade create(MensalidadeRequestDTO dto) {
        Mensalidade mensalidade = mensalidadeMapper.fromDTO(dto);
        return mensalidadeRepository.save(mensalidade);
    }

    public List<Mensalidade> findByAluno(UUID alunoId) {
        return mensalidadeRepository.findByAlunoId(alunoId);
    }

    public List<Mensalidade> findByMesAndStatus(String mes, StatusPagamento status) {
        return mensalidadeRepository.findByMesReferenciaAndStatusPagamento(mes, status);
    }

    public List<Mensalidade> findByStatus(StatusPagamento status) {
        return mensalidadeRepository.findByStatusPagamento(status);
    }

    public List<Mensalidade> findByPeriodoAndStatus(String inicio, String fim, StatusPagamento status) {
        return mensalidadeRepository.findByPeriodoAndStatus(inicio, fim, status);
    }

    public Optional<Mensalidade> findById(UUID id) {
        return mensalidadeRepository.findById(id);
    }

    @Transactional
    public Mensalidade update(UUID id, MensalidadeRequestDTO dto) {
        Mensalidade existing = mensalidadeRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Mensalidade não encontrada"));

        Mensalidade atualizado = mensalidadeMapper.fromDTO(dto);
        existing.setAluno(atualizado.getAluno());
        existing.setMesReferencia(atualizado.getMesReferencia());
        existing.setStatusPagamento(atualizado.getStatusPagamento());
        existing.setIsencao(atualizado.getIsencao());
        existing.setMotivoIsencao(atualizado.getMotivoIsencao());
        existing.setDataPagamento(atualizado.getDataPagamento());
        existing.setComprovanteUrl(atualizado.getComprovanteUrl());

        return mensalidadeRepository.save(existing);
    }

    @Transactional
    public void delete(UUID id) {
        mensalidadeRepository.deleteById(id);
    }
}