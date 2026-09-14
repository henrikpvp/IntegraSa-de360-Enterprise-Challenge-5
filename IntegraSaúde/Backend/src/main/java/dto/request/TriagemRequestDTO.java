package com.integrasaude.api.dto.request;

import jakarta.validation.constraints.NotNull;

public record TriagemRequestDTO(
        @NotNull(message = "A frequência cardíaca é obrigatória.")
        Integer frequenciaCardiaca,

        @NotNull(message = "A pressão sistólica é obrigatória.")
        Integer pressaoSistolica,

        @NotNull(message = "A pressão diastólica é obrigatória.")
        Integer pressaoDiastolica,

        @NotNull(message = "A temperatura é obrigatória.")
        Double temperatura,

        @NotNull(message = "A saturação de oxigênio é obrigatória.")
        Integer saturacaoOxigenio,

        @NotNull(message = "A escala de dor (0 a 10) é obrigatória.")
        Integer escalaDor
) {}