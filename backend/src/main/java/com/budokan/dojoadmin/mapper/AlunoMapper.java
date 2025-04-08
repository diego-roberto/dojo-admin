package com.budokan.dojoadmin.mapper;

import com.budokan.dojoadmin.dto.AlunoAdminDTO;
import com.budokan.dojoadmin.dto.AlunoPublicDTO;
import com.budokan.dojoadmin.entity.Aluno;
import com.budokan.dojoadmin.enums.Role;
import com.budokan.dojoadmin.util.GraduacaoHelper;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
public class AlunoMapper {


    public AlunoPublicDTO toPublicDTO(Aluno aluno) {
        return AlunoPublicDTO.builder()
                .id(aluno.getId())
                .nome(aluno.getNome())
                .usuario(aluno.getUsuario())
                .graduacaoLabel(GraduacaoHelper.getLabel(aluno.getGraduacaoKyu()))
                .faixaAtual(aluno.getFaixaAtual())
                .federacaoOrigem(aluno.getFederacaoOrigem())
                .dataUltimoExame(aluno.getDataUltimoExame())
                .status(aluno.getStatus())
                .build();
    }

    public AlunoAdminDTO toAdminDTO(Aluno aluno) {
        return AlunoAdminDTO.builder()
                .id(aluno.getId())
                .nome(aluno.getNome())
                .usuario(aluno.getUsuario())
                .dataNascimento(aluno.getDataNascimento())
                .email(aluno.getEmail())
                .graduacaoKyu(aluno.getGraduacaoKyu())
                .graduacaoLabel(GraduacaoHelper.getLabel(aluno.getGraduacaoKyu()))
                .faixaAtual(aluno.getFaixaAtual())
                .federacaoOrigem(aluno.getFederacaoOrigem())
                .dataUltimoExame(aluno.getDataUltimoExame())
                .status(aluno.getStatus())
                .roles(aluno.getRoles().stream().map(Enum::name).collect(Collectors.toSet()))
                .observacoes(aluno.getObservacoes())
                .build();
    }

    public Aluno fromAdminDTO(AlunoAdminDTO dto) {
        Set<Role> roles = dto.getRoles() != null
                ? dto.getRoles().stream().map(Role::valueOf).collect(Collectors.toSet())
                : Set.of();

        return Aluno.builder()
                .id(dto.getId())
                .nome(dto.getNome())
                .usuario(dto.getUsuario())
                .dataNascimento(dto.getDataNascimento())
                .email(dto.getEmail())
                .graduacaoKyu(dto.getGraduacaoKyu())
                .faixaAtual(dto.getFaixaAtual())
                .federacaoOrigem(dto.getFederacaoOrigem())
                .dataUltimoExame(dto.getDataUltimoExame())
                .status(dto.getStatus())
                .roles(roles)
                .observacoes(dto.getObservacoes())
                .build();
    }

}
