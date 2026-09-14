
package com.integrasaude.api.dto.response;

import com.integrasaude.api.model.enums.NivelRisco;
import com.integrasaude.api.model.enums.StatusAtendimento;

import java.time.LocalDateTime;

public record AtendimentoResponseDTO(
        Long id,
        PacienteResponseDTO paciente,
        String queixaPrincipal,
        NivelRisco nivelRisco,
        StatusAtendimento status,
        LocalDateTime dataHoraChegada,
        LocalDateTime dataHoraTriagem
) {}