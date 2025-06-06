package com.budokan.dojoadmin.controller;

import com.budokan.dojoadmin.dto.aula.AulaRequestDTO;
import com.budokan.dojoadmin.dto.aula.AulaResponseDTO;
import com.budokan.dojoadmin.entity.Aula;
import com.budokan.dojoadmin.mapper.AulaMapper;
import com.budokan.dojoadmin.service.AulaService;
import com.budokan.dojoadmin.util.RoleUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/aulas")
@RequiredArgsConstructor
public class AulaController {

    private final AulaService aulaService;
    private final AulaMapper aulaMapper;

    @GetMapping
    public ResponseEntity<Page<AulaResponseDTO>> getAll(@RequestParam(defaultValue = "0") int page,
                                                        @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("data").descending());
        Page<AulaResponseDTO> pageResult = aulaService.findAll(pageable)
                .map(aulaMapper::toDTO);
        return ResponseEntity.ok(pageResult);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid AulaRequestDTO dto, Authentication auth) {
        if (!RoleUtil.isSensei(auth)) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Apenas senseis podem registrar aulas");

        try {
            Aula aula = aulaService.save(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(aulaMapper.toDTO(aula));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/data")
    public ResponseEntity<List<AulaResponseDTO>> buscarPorData(@RequestParam("value") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {
        List<AulaResponseDTO> dtos = aulaService.findByDate(data).stream()
                .map(aulaMapper::toDTO)
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/periodo")
    public ResponseEntity<Page<AulaResponseDTO>> buscarPorPeriodo(@RequestParam("inicio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate inicio,
                                                                  @RequestParam("fim") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fim,
                                                                  @RequestParam(defaultValue = "0") int page,
                                                                  @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("data").descending());
        Page<AulaResponseDTO> pageResult = aulaService.findByDateBetween(inicio, fim, pageable)
                .map(aulaMapper::toDTO);
        return ResponseEntity.ok(pageResult);
    }

}

