package com.budokan.dojoadmin.service;

import com.budokan.dojoadmin.dto.aula.AulaRequestDTO;
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

    public Page<Aula> findBySensei(UUID senseiId, Pageable pageable) {
        return aulaRepository.findBySenseiResponsavelId(senseiId, pageable);
    }

    public Page<Aula> findBySenseiAndDateBetween(UUID senseiId, LocalDate inicio, LocalDate fim, Pageable pageable) {
        return aulaRepository.findBySenseiResponsavelIdAndDataBetween(senseiId, inicio, fim, pageable);
    }

}

