package com.integrasaude.api.model.enums;

public enum PerfilUsuario {
    ADMIN("ADMIN"),
    MEDICO("MEDICO"),
    RECEPCAO("RECEPCAO");

    private final String role;

    PerfilUsuario(String role) {
        this.role = role;
    }

    public String getRole() {
        return role;
    }
}