package com.budokan.dojoadmin.service;

import com.budokan.dojoadmin.entity.Exame;
import com.budokan.dojoadmin.repository.ExameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExameService {

    private final ExameRepository exameRepository;

    public List<Exame> findUpcoming(int daysAhead) {
        LocalDate start = LocalDate.now();
        LocalDate end = start.plusDays(daysAhead);
        return exameRepository.findByDataExameBetween(start, end);
    }
}
