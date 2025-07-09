package com.budokan.dojoadmin.service;

import com.budokan.dojoadmin.dto.aula.AulaRequestDTO;
import com.budokan.dojoadmin.dto.aula.FrequenciaDTO;
import com.budokan.dojoadmin.entity.Aula;
import com.budokan.dojoadmin.mapper.AulaMapper;
import com.budokan.dojoadmin.repository.AulaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AulaService {

    private final AulaRepository aulaRepository;
    private final AulaMapper aulaMapper;

    @Transactional
    public Aula save(AulaRequestDTO dto) {
        Aula aula = aulaMapper.fromDTO(dto);
        return aulaRepository.save(aula);
    }

    public Page<Aula> findAll(Pageable pageable) {
        return aulaRepository.findAll(pageable);
    }

    public List<Aula> findByDate(LocalDate data) {
        return aulaRepository.findByData(data);
    }

    public Page<Aula> findByDateBetween(LocalDate inicio, LocalDate fim, Pageable pageable) {
        return aulaRepository.findByDataBetween(inicio, fim, pageable);
    }


    public FrequenciaDTO calcularFrequenciaAluno(UUID alunoId, LocalDate inicio, LocalDate fim) {
        List<Aula> aulasPeriodo = aulaRepository.findByDataBetween(inicio, fim);
        List<Aula> presencas = aulaRepository.findByParticipantes_IdAndDataBetween(alunoId, inicio, fim);

        long totalPresencas = presencas.size();
        double percentual = aulasPeriodo.isEmpty() ? 0.0 : (double) totalPresencas / aulasPeriodo.size() * 100;

        List<LocalDate> datas = presencas.stream().map(Aula::getData).toList();

        return FrequenciaDTO.builder()
                .totalPresencas(totalPresencas)
                .percentual(percentual)
                .datas(datas)
                .build();
    }

    public Page<Aula> findBySensei(UUID senseiId, Pageable pageable) {
        return aulaRepository.findBySenseiResponsavelId(senseiId, pageable);
    }

    public Page<Aula> findBySenseiAndDateBetween(UUID senseiId, LocalDate inicio, LocalDate fim, Pageable pageable) {
        return aulaRepository.findBySenseiResponsavelIdAndDataBetween(senseiId, inicio, fim, pageable);
    }

    public Page<Aula> findByAluno(UUID alunoId, Pageable pageable) {
        return aulaRepository.findByParticipantes_Id(alunoId, pageable);
    }

    public Page<Aula> findByAlunoAndDateBetween(UUID alunoId, LocalDate inicio, LocalDate fim, Pageable pageable) {
        return aulaRepository.findByParticipantes_IdAndDataBetween(alunoId, inicio, fim, pageable);
    }

    public Aula findById(UUID id) {
        return aulaRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @Transactional
    public Aula update(UUID id, AulaRequestDTO dto) {
        Aula existing = aulaRepository.findById(id).orElseThrow();
        Aula updated = aulaMapper.fromDTO(dto);

        existing.setData(updated.getData());
        existing.setFotoUrl(updated.getFotoUrl());
        existing.setSenseiResponsavel(updated.getSenseiResponsavel());
        existing.setParticipantes(updated.getParticipantes());

        return aulaRepository.save(existing);
    }

}

