package com.integrasaude.api.service;

import com.integrasaude.api.dto.response.MedicoResponseDTO;
import com.integrasaude.api.repository.MedicoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MedicoService {

    private final MedicoRepository medicoRepository;

    public MedicoService(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    @Transactional(readOnly = true)
    public List<MedicoResponseDTO> listarMedicosAtivos() {
        return medicoRepository.findByAtivoTrue().stream()
                .map(m -> new MedicoResponseDTO(m.getId(), m.getNome(), m.getCrm(), m.getEspecialidade()))
                .collect(Collectors.toList());
    }
}