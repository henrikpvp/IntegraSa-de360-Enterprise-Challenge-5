package com.integrasaude.api.dto.response;

public record MedicoResponseDTO(
        Long id,
        String nome,
        String crm,
        String especialidade
) {}