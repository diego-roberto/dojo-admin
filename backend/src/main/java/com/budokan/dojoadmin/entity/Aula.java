package com.budokan.dojoadmin.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "aulas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Aula {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private LocalDate data;

    private String fotoUrl; /* url da imagem */

    @ManyToMany
    @JoinTable(
            name = "presencas",
            joinColumns = @JoinColumn(name = "aula_id"),
            inverseJoinColumns = @JoinColumn(name = "aluno_id")
    )
    private List<Aluno> participantes;

    @ManyToOne(optional = false)
    @JoinColumn(name = "sensei_id")
    private Aluno senseiResponsavel;

}