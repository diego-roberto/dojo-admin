package com.budokan.dojoadmin.controller;

import com.budokan.dojoadmin.dto.exame.ExameResponseDTO;
import com.budokan.dojoadmin.mapper.ExameMapper;
import com.budokan.dojoadmin.service.ExameService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/exames")
@RequiredArgsConstructor
public class ExameController {

    private final ExameService exameService;
    private final ExameMapper exameMapper;

    @GetMapping("/proximos")
    public ResponseEntity<List<ExameResponseDTO>> listarProximos(@RequestParam(defaultValue = "30") int dias) {
        List<ExameResponseDTO> dtos = exameService.findUpcoming(dias)
                .stream().map(exameMapper::toDTO).toList();
        return ResponseEntity.ok(dtos);
    }
}
