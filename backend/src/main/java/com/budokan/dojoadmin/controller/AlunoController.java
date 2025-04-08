package com.budokan.dojoadmin.controller;

import com.budokan.dojoadmin.dto.AlunoAdminDTO;
import com.budokan.dojoadmin.dto.AlunoPublicDTO;
import com.budokan.dojoadmin.entity.Aluno;
import com.budokan.dojoadmin.mapper.AlunoMapper;
import com.budokan.dojoadmin.service.AlunoService;
import com.budokan.dojoadmin.util.RoleUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/alunos")
public class AlunoController {

    @Autowired
    private final AlunoService alunoService;

    private final AlunoMapper alunoMapper;

    @GetMapping
    public ResponseEntity<List<?>> getAll(Authentication auth) {
        boolean hasRole = RoleUtil.isSensei(auth);
        List<Aluno> alunos;

        try {
            alunos = alunoService.findAll();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonList(e.getMessage()));
        }

        if (hasRole) {
            List<AlunoAdminDTO> dtos = alunos.stream().map(alunoMapper::toAdminDTO).toList();
            return ResponseEntity.status(HttpStatus.OK).body(dtos);
        } else {
            List<AlunoPublicDTO> dtos = alunos.stream().map(alunoMapper::toPublicDTO).toList();
            return ResponseEntity.status(HttpStatus.OK).body(dtos);
        }

    }

    @GetMapping("/ativos")
    public ResponseEntity<List<?>> getAllActive(Authentication auth) {
        boolean hasRole = RoleUtil.isSensei(auth);
        List<Aluno> alunos;

        try {
            alunos = alunoService.findAllActive();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonList(e.getMessage()));
        }

        if (hasRole) {
            List<AlunoAdminDTO> dtos = alunos.stream().map(alunoMapper::toAdminDTO).toList();
            return ResponseEntity.status(HttpStatus.OK).body(dtos);
        } else {
            List<AlunoPublicDTO> dtos = alunos.stream().map(alunoMapper::toPublicDTO).toList();
            return ResponseEntity.status(HttpStatus.OK).body(dtos);
        }

    }

    @GetMapping("/nome/{name}")
    public ResponseEntity<?> getByName(@PathVariable String name, Authentication auth) {
        boolean hasRole = RoleUtil.isSensei(auth);
        Optional<Aluno> alunoOpt = alunoService.findByName(name);

        if (alunoOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno não encontrado.");
        }

        Aluno aluno = alunoOpt.get();
        return hasRole ? ResponseEntity.ok(alunoMapper.toAdminDTO(aluno))
                : ResponseEntity.ok(alunoMapper.toPublicDTO(aluno));
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getById(@PathVariable UUID id, Authentication auth) {
        boolean hasRole = RoleUtil.isSensei(auth);
        Optional<Aluno> alunoOpt = alunoService.findById(id);

        if (alunoOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno não encontrado.");
        }

        Aluno aluno = alunoOpt.get();
        return hasRole ? ResponseEntity.ok(alunoMapper.toAdminDTO(aluno))
                : ResponseEntity.ok(alunoMapper.toPublicDTO(aluno));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody AlunoAdminDTO dto, Authentication auth) {
        if (!RoleUtil.isAdmin(auth)){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Sem permissão para executar ação");
        }
        try {
            Aluno novoAluno = alunoService.save(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(alunoMapper.toAdminDTO(novoAluno));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody AlunoAdminDTO dto, Authentication auth) {
        if (!RoleUtil.isAdmin(auth)){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Sem permissão para executar ação");
        }
        try {
            Aluno atualizado = alunoService.update(id, dto);
            return ResponseEntity.ok(alunoMapper.toAdminDTO(atualizado));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno não encontrado.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/senha/{id}")
    public ResponseEntity<?> atualizarSenha(@PathVariable UUID id, @RequestBody String novaSenha, Authentication auth) {
        if (!RoleUtil.isAdmin(auth)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Sem permissão para executar ação");
        }
        try {
            alunoService.atualizarSenha(id, novaSenha, auth.getName());
            return ResponseEntity.ok("Senha atualizada com sucesso");
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Aluno não encontrado.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
