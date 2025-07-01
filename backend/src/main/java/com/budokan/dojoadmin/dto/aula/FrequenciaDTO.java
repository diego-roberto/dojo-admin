package com.budokan.dojoadmin.dto.aula;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FrequenciaDTO {

    private long totalPresencas;
    private double percentual;
    private List<LocalDate> datas;
}
