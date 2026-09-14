package com.integrasaude.api.dto.response;

import com.integrasaude.api.model.enums.PerfilUsuario;

public record LoginResponseDTO(
        String token,
        String email,
        PerfilUsuario perfil
) {}