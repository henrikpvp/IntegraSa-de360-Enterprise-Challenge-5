package com.integrasaude.api.service;

import com.integrasaude.api.dto.request.PacienteRequestDTO;
import com.integrasaude.api.dto.response.PacienteResponseDTO;
import com.integrasaude.api.exception.BusinessException;
import com.integrasaude.api.exception.ResourceNotFoundException;
import com.integrasaude.api.model.Paciente;
import com.integrasaude.api.repository.PacienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository) {
        this.pacienteRepository = pacienteRepository;
    }

    @Transactional
    public PacienteResponseDTO salvar(PacienteRequestDTO dto) {
        if (pacienteRepository.existsByCpf(dto.cpf())) {
            throw new BusinessException("Paciente com o CPF " + dto.cpf() + " já está cadastrado.");
        }

        Paciente paciente = new Paciente();
        paciente.setNome(dto.nome());
        paciente.setCpf(dto.cpf());
        paciente.setDataNascimento(dto.dataNascimento());
        paciente.setTelefone(dto.telefone());
        paciente.setCartaoSus(dto.cartaoSus());

        Paciente salvo = pacienteRepository.save(paciente);
        return toDTO(salvo);
    }

    @Transactional(readOnly = true)
    public List<PacienteResponseDTO> listarTodos() {
        return pacienteRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PacienteResponseDTO buscarPorId(Long id) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado com o ID: " + id));
        return toDTO(paciente);
    }

    @Transactional(readOnly = true)
    public PacienteResponseDTO buscarPorCpf(String cpf) {
        Paciente paciente = pacienteRepository.findByCpf(cpf)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado com o CPF: " + cpf));
        return toDTO(paciente);
    }

    private PacienteResponseDTO toDTO(Paciente p) {
        return new PacienteResponseDTO(
                p.getId(),
                p.getNome(),
                p.getCpf(),
                p.getDataNascimento(),
                p.getTelefone(),
                p.getCartaoSus()
        );
    }
}