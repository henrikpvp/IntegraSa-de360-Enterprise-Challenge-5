package com.integrasaude.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AtendimentoRequestDTO(
        @NotNull(message = "O ID do paciente é obrigatório.")
        Long pacienteId,

        @NotBlank(message = "A queixa principal é obrigatória.")
        String queixaPrincipal
) {}