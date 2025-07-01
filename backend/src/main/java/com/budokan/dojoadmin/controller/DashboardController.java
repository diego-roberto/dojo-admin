package com.budokan.dojoadmin.controller;

import com.budokan.dojoadmin.dto.dashboard.DashboardResponseDTO;
import com.budokan.dojoadmin.service.DashboardService;
import com.budokan.dojoadmin.util.RoleUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<?> getDashboard(Authentication auth) {
        if (!RoleUtil.isSensei(auth)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Sem permissão para executar ação");
        }
        DashboardResponseDTO dto = dashboardService.getDashboard();
        return ResponseEntity.ok(dto);
    }
}
