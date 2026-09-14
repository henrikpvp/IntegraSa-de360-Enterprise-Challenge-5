package com.integrasaude.api.dto.response;

import java.time.LocalDateTime;

public record ErrorResponseDTO(
        Integer status,
        String message,
        LocalDateTime timestamp
) {}