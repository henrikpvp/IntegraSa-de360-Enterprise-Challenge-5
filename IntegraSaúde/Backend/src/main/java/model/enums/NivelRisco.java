package com.integrasaude.api.model.enums;

public enum NivelRisco {
    VERMELHO(1, "Emergência - Atendimento Imediato"),
    LARANJA(2, "Muito Urgente - Atendimento em até 10 min"),
    AMARELO(3, "Urgente - Atendimento em até 60 min"),
    VERDE(4, "Pouco Urgente - Atendimento em até 120 min"),
    AZUL(5, "Não Urgente - Atendimento em até 240 min");

    private final int prioridade;
    private final String descricao;

    NivelRisco(int prioridade, String descricao) {
        this.prioridade = prioridade;
        this.descricao = descricao;
    }

    public int getPrioridade() {
        return prioridade;
    }

    public String getDescricao() {
        return descricao;
    }
}