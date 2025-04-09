package com.budokan.dojoadmin.entity;

import com.budokan.dojoadmin.enums.Faixa;
import com.budokan.dojoadmin.enums.Role;
import com.budokan.dojoadmin.enums.StatusAluno;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "alunos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @NotBlank(message = "Nome é obrigatório")
    private String nome;

    @NotBlank(message = "Username é obrigatório")
    private String usuario;

    @Past
    @NotNull(message = "Data de nascimento é obrigatória")
    private LocalDate dataNascimento;

    @Email
    private String email;

    /* padrão de codificação: 1–11 → Kyu | 91–999 → Dan (1º a xº Dan) */
    private int graduacaoKyu;

    @Enumerated(EnumType.STRING)
    private Faixa faixaAtual;

    private String federacaoOrigem;

    private LocalDate dataUltimoExame;

    @Enumerated(EnumType.STRING)
    private StatusAluno status;

    private String observacoes;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "aluno_roles", joinColumns = @JoinColumn(name = "aluno_id"))
    @Enumerated(EnumType.STRING)
    private Set<Role> roles;

    private String password;

    @Column(name = "ultima_alteracao_senha")
    private String ultimaAlteracaoSenha;

}
