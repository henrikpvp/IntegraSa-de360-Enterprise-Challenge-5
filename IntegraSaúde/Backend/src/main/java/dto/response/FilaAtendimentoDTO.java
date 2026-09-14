package com.integrasaude.api.dto.response;

import com.integrasaude.api.model.enums.NivelRisco;

import java.time.LocalDateTime;

public record FilaAtendimentoDTO(
        Long atendimentoId,
        String nomePaciente,
        NivelRisco nivelRisco,
        Double pontuacaoPrioridade,
        LocalDateTime dataHoraChegada,
        Long tempoEsperaMinutos
) {}