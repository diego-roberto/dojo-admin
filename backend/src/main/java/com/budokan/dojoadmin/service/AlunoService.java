package com.budokan.dojoadmin.service;

import com.budokan.dojoadmin.dto.aluno.AlunoAdminDTO;
import com.budokan.dojoadmin.entity.Aluno;
import com.budokan.dojoadmin.enums.StatusAluno;
import com.budokan.dojoadmin.enums.Role;
import com.budokan.dojoadmin.mapper.AlunoMapper;
import com.budokan.dojoadmin.repository.AlunoRepository;
import com.budokan.dojoadmin.repository.AulaRepository;
import com.budokan.dojoadmin.repository.ExameRepository;
import com.budokan.dojoadmin.repository.MensalidadeRepository;
import com.budokan.dojoadmin.exception.AlunoVinculadoException;
import com.budokan.dojoadmin.util.GraduacaoHelper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AlunoService {

    private final AlunoRepository alunoRepository;
    private final AlunoMapper alunoMapper;
    private final PasswordEncoder passwordEncoder;
    private final MensalidadeRepository mensalidadeRepository;
    private final ExameRepository exameRepository;
    private final AulaRepository aulaRepository;

    private void addSenseiRoleIfNeeded(Aluno aluno) {
        if (aluno.getGraduacaoKyu() >= 91 && (aluno.getRoles() == null || !aluno.getRoles().contains(Role.SENSEI))) {
            Set<Role> roles = aluno.getRoles() == null ? new HashSet<>() : new HashSet<>(aluno.getRoles());
            roles.add(Role.SENSEI);
            aluno.setRoles(roles);
        }
    }

    public List<Aluno> findAll() {
        return alunoRepository.findAll();
    }

    public List<Aluno> findAllActive() {
        return alunoRepository.findByStatus(StatusAluno.ATIVO);
    }

    public Optional<Aluno> findById(UUID id) {
        return alunoRepository.findById(id);
    }

    public Optional<Aluno> findByName(String nome) {
        return alunoRepository.findByNomeUnaccent(nome);
    }

    @Transactional
    public Aluno save(AlunoAdminDTO dto) {
        if (alunoRepository.findByUsuarioIgnoreCase(dto.getUsuario()).isPresent()) {
            throw new IllegalArgumentException("Usuário já cadastrado");
        }

        Aluno aluno = alunoMapper.fromAdminDTO(dto);

        addSenseiRoleIfNeeded(aluno);

        /* primeira senha é gerada com data de nascimento */
        aluno.setPassword(gerarSenhaPadrao(dto.getDataNascimento()));
        aluno.setStatus(StatusAluno.ATIVO);

        return alunoRepository.save(aluno);
    }

    private String gerarSenhaPadrao(LocalDate dataNascimento) {
        return passwordEncoder.encode(dataNascimento.toString()); /* AAAA-MM-DD */
    }

    @Transactional
    public Aluno update(UUID id, AlunoAdminDTO dto) {
        Aluno existing = alunoRepository.findById(id).orElseThrow();
        Aluno updated = alunoMapper.fromAdminDTO(dto);

        existing.setNome(updated.getNome());
        existing.setUsuario(dto.getUsuario() != null && !dto.getUsuario().isBlank() ? dto.getUsuario() : existing.getUsuario());
        existing.setDataNascimento(updated.getDataNascimento());
        existing.setGraduacaoKyu(updated.getGraduacaoKyu());
        existing.setFaixaAtual(updated.getFaixaAtual());
        existing.setFederacaoOrigem(updated.getFederacaoOrigem());
        existing.setDataUltimoExame(updated.getDataUltimoExame());
        existing.setStatus(updated.getStatus());
        existing.setObservacoes(updated.getObservacoes());

        existing.setRoles(updated.getRoles());

        addSenseiRoleIfNeeded(existing);

        return alunoRepository.save(existing);
    }

    @Transactional
    public void inativar(UUID id, String executor) {
        Aluno aluno = alunoRepository.findById(id).orElseThrow();
        aluno.setStatus(StatusAluno.INATIVO);
        aluno.setUltimaAlteracaoSenha(auditoria("Inativado por " + executor));
        alunoRepository.save(aluno);
    }

    @Transactional
    public void delete(UUID id) {
        boolean hasMensalidades = !mensalidadeRepository.findByAlunoId(id).isEmpty();
        boolean hasExames = !exameRepository.findByAlunoId(id).isEmpty();
        boolean hasAulas = aulaRepository.existsByParticipantes_Id(id) || aulaRepository.existsBySenseiResponsavel_Id(id);

        if (hasMensalidades || hasExames || hasAulas) {
            throw new AlunoVinculadoException("Não é possível excluir um aluno vinculado a mensalidades, exames ou presenças.");
        }

        alunoRepository.deleteById(id);
    }

    @Transactional
    public void atualizarSenha(UUID id, String novaSenha, String executor) {
        if (novaSenha == null || novaSenha.isBlank()) {
            throw new IllegalArgumentException("Senha não pode estar em branco");
        }

        Aluno aluno = alunoRepository.findById(id).orElseThrow();
        aluno.setPassword(passwordEncoder.encode(novaSenha));
        aluno.setUltimaAlteracaoSenha(auditoria("Senha redefinida por " + executor));
        alunoRepository.save(aluno);
    }

    private String auditoria(String acao) {
        return String.format("%s - %s",
                LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")),
                acao);
    }

    public long countActive() {
        return alunoRepository.countByStatus(StatusAluno.ATIVO);
    }

    public List<Aluno> findAptosExame() {
        LocalDate hoje = LocalDate.now();
        return findAllActive().stream()
                .filter(a -> !GraduacaoHelper.isDan(a.getGraduacaoKyu()))
                .filter(a -> {
                    Integer meses = GraduacaoHelper.getMesesCarenciaExame(a.getGraduacaoKyu());
                    if (meses == null) {
                        return false;
                    }
                    LocalDate ultimo = a.getDataUltimoExame();
                    return ultimo == null || !ultimo.plusMonths(meses).isAfter(hoje);
                })
                .toList();
    }

    public List<Aluno> findAniversariantes(int mes) {
        return alunoRepository.findAniversariantes(StatusAluno.ATIVO, mes);
    }


}
