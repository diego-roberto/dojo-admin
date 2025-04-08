package com.budokan.dojoadmin.entity;

import com.budokan.dojoadmin.enums.Faixa;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "exames")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exame {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;

    private LocalDate dataExame;

    private int kyu;

    @Enumerated(EnumType.STRING)
    private Faixa faixaAlvo;

    private Boolean aprovado;

    @ManyToMany
    @JoinTable(
            name = "banca_examinadora",
            joinColumns = @JoinColumn(name = "exame_id"),
            inverseJoinColumns = @JoinColumn(name = "examinador_id")
    )
    private List<Aluno> examinadores;

}
