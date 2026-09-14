package com.integrasaude.api.service;

import com.integrasaude.api.model.Atendimento;
import com.integrasaude.api.model.SinaisVitais;
import com.integrasaude.api.model.enums.NivelRisco;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

@Service
public class AlgoritmoPrioridadeService {

    /**
     * Calcula o Nível de Risco do paciente com base no protocolo de Manchester/vitalidade
     */
    public NivelRisco classificarRisco(SinaisVitais vitais) {
        if (vitais == null) return NivelRisco.VERDE;

        // Emergência / Vermelho
        if ((vitais.getSaturacaoOxigenio() != null && vitais.getSaturacaoOxigenio() < 90) ||
            (vitais.getFrequenciaCardiaca() != null && (vitais.getFrequenciaCardiaca() > 140 || vitais.getFrequenciaCardiaca() < 40))) {
            return NivelRisco.VERMELHO;
        }

        // Laranja
        if ((vitais.getSaturacaoOxigenio() != null && vitais.getSaturacaoOxigenio() <= 94) ||
            (vitais.getPressaoSistolica() != null && vitais.getPressaoSistolica() >= 180) ||
            (vitais.getEscalaDor() != null && vitais.getEscalaDor() >= 8)) {
            return NivelRisco.LARANJA;
        }

        // Amarelo
        if ((vitais.getTemperatura() != null && (vitais.getTemperatura() >= 39.0 || vitais.getTemperatura() <= 35.0)) ||
            (vitais.getEscalaDor() != null && vitais.getEscalaDor() >= 5)) {
            return NivelRisco.AMARELO;
        }

        // Verde
        if (vitais.getEscalaDor() != null && vitais.getEscalaDor() >= 2) {
            return NivelRisco.VERDE;
        }

        return NivelRisco.AZUL;
    }

    /**
     * Calcula a pontuação final na fila preditiva ponderando:
     * Nível de Risco + Idade do Paciente + Tempo de Espera
     */
    public Double calcularPontuacaoFila(Atendimento atendimento) {
        double pesoRisco = switch (atendimento.getNivelRisco()) {
            case VERMELHO -> 1000.0;
            case LARANJA -> 500.0;
            case AMARELO -> 200.0;
            case VERDE -> 50.0;
            case AZUL -> 10.0;
        };

        // Fator idade (Idosos > 60 anos ganham peso extra)
        int idade = Period.between(atendimento.getPaciente().getDataNascimento(), LocalDate.now()).getYears();
        double pesoIdade = idade >= 60 ? (idade - 60) * 1.5 + 10.0 : 0.0;

        // Fator tempo de espera (minutos na fila adicionam prioridade progressiva)
        long minutosEspera = Duration.between(atendimento.getDataHoraChegada(), LocalDateTime.now()).toMinutes();
        double pesoTempoEspera = minutosEspera * 2.0;

        return pesoRisco + pesoIdade + pesoTempoEspera;
    }
}
