package com.budokan.dojoadmin.controller;

import com.budokan.dojoadmin.dto.mensalidade.MensalidadeRequestDTO;
import com.budokan.dojoadmin.dto.mensalidade.MensalidadeResponseDTO;
import com.budokan.dojoadmin.entity.Mensalidade;
import com.budokan.dojoadmin.enums.StatusPagamento;
import com.budokan.dojoadmin.mapper.MensalidadeMapper;
import com.budokan.dojoadmin.service.MensalidadeService;
import com.budokan.dojoadmin.util.RoleUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/mensalidades")
@RequiredArgsConstructor
public class MensalidadeController {

    private final MensalidadeService mensalidadeService;
    private final MensalidadeMapper mensalidadeMapper;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid MensalidadeRequestDTO dto, Authentication auth) {
        if (!RoleUtil.isTesouraria(auth)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Sem permissão para executar ação");
        }

        try {
            Mensalidade mensalidade = mensalidadeService.create(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(mensalidadeMapper.toDTO(mensalidade));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/aluno/{alunoId}")
    public ResponseEntity<?> getByAluno(@PathVariable UUID alunoId, Authentication auth) {
        if (!RoleUtil.isTesouraria(auth)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Sem permissão para executar ação");
        }

        List<MensalidadeResponseDTO> dtos = mensalidadeService.findByAluno(alunoId)
                .stream().map(mensalidadeMapper::toDTO).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/mes/{anoMes}/status/{status}")
    public ResponseEntity<?> getByMesStatus(@PathVariable String anoMes, @PathVariable StatusPagamento status,
                                            Authentication auth) {
        if (!RoleUtil.isTesouraria(auth)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Sem permissão para executar ação");
        }

        List<MensalidadeResponseDTO> dtos = mensalidadeService.findByMesAndStatus(anoMes, status)
                .stream().map(mensalidadeMapper::toDTO).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<?> getByStatus(@PathVariable StatusPagamento status, Authentication auth) {
        if (!RoleUtil.isTesouraria(auth)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Sem permissão para executar ação");
        }

        List<MensalidadeResponseDTO> dtos = mensalidadeService.findByStatus(status)
                .stream().map(mensalidadeMapper::toDTO).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/periodo/{inicio}/{fim}/status/{status}")
    public ResponseEntity<?> getByPeriodoAndStatus(@PathVariable String inicio, @PathVariable String fim,
                                                   @PathVariable StatusPagamento status, Authentication auth) {
        if (!RoleUtil.isTesouraria(auth)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Sem permissão para executar ação");
        }

        List<MensalidadeResponseDTO> dtos = mensalidadeService.findByPeriodoAndStatus(inicio, fim, status)
                .stream().map(mensalidadeMapper::toDTO).toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable UUID id, Authentication auth) {
        if (!RoleUtil.isTesouraria(auth)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Sem permissão para executar ação");
        }

        return mensalidadeService.findById(id)
                .map(m -> ResponseEntity.ok(mensalidadeMapper.toDTO(m)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Mensalidade não encontrada"));
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id,
                                    @RequestBody @Valid MensalidadeRequestDTO dto,
                                    Authentication auth) {
        if (!RoleUtil.isTesouraria(auth)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Sem permissão para executar ação");
        }

        try {
            Mensalidade atualizado = mensalidadeService.update(id, dto);
            return ResponseEntity.ok(mensalidadeMapper.toDTO(atualizado));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /* não há necessidade de deletar */
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> delete(@PathVariable UUID id, Authentication auth) {
//        if (!RoleUtil.isTesouraria(auth)) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Sem permissão para executar ação");
//        }
//        mensalidadeService.delete(id);
//        return ResponseEntity.ok().build();
//    }
}