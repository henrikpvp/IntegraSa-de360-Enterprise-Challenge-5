package com.integrasaude.api.service;

import com.integrasaude.api.model.Atendimento;
import com.integrasaude.api.model.Paciente;
import com.integrasaude.api.model.SinaisVitais;
import com.integrasaude.api.model.enums.NivelRisco;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;

class AlgoritmoPrioridadeServiceTest {

    private AlgoritmoPrioridadeService algoritmoService;

    @BeforeEach
    void setUp() {
        algoritmoService = new AlgoritmoPrioridadeService();
    }

    @Test
    @DisplayName("Deve classificar como VERMELHO quando saturação de oxigênio for menor que 90%")
    void deveClassificarComoVermelhoSaturacaoBaixa() {
        SinaisVitais vitais = new SinaisVitais(80, 120, 80, 36.5, 88, 2);

        NivelRisco risco = algoritmoService.classificarRisco(vitais);

        assertEquals(NivelRisco.VERMELHO, risco);
    }

    @Test
    @DisplayName("Deve classificar como LARANJA quando pressão sistólica for maior ou igual a 180")
    void deveClassificarComoLaranjaPressaoAlta() {
        SinaisVitais vitais = new SinaisVitais(85, 185, 110, 36.8, 96, 4);

        NivelRisco risco = algoritmoService.classificarRisco(vitais);

        assertEquals(NivelRisco.LARANJA, risco);
    }

    @Test
    @DisplayName("Deve calcular maior pontuação de prioridade para idosos e tempos de espera maiores")
    void deveCalcularPontuacaoPrioridadeCorretamente() {
        Paciente pacienteIdoso = new Paciente();
        pacienteIdoso.setDataNascimento(LocalDate.now().minusYears(70));

        Atendimento atendimento = new Atendimento();
        atendimento.setPaciente(pacienteIdoso);
        atendimento.setNivelRisco(NivelRisco.AMARELO); // Peso 200.0
        atendimento.setDataHoraChegada(LocalDateTime.now().minusMinutes(30)); // 30 min * 2.0 = 60.0

        Double pontuacao = algoritmoService.calcularPontuacaoFila(atendimento);

        // Expectativa: Peso Risco (200.0) + Peso Idade ((70-60)*1.5 + 10 = 25.0) + Tempo (60.0) = 285.0
        assertEquals(285.0, pontuacao, 1.0);
    }
}