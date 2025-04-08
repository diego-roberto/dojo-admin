package com.budokan.dojoadmin.entity;

import com.budokan.dojoadmin.enums.StatusPagamento;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "mensalidades")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Mensalidade {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;

    private String mesReferencia; /* formato: AAAA/MM */

    @Enumerated(EnumType.STRING)
    private StatusPagamento statusPagamento;

    @Column(name = "isencao")
    private Boolean isencao;

    private String motivoIsencao;

    private LocalDate dataPagamento;

    private String comprovanteUrl; /* url do documento */

}
