package com.integrasaude.api.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SinaisVitais {

    private Integer frequenciaCardiaca;
    private Integer pressaoSistolica;
    private Integer pressaoDiastolica;
    private Double temperatura;
    private Integer saturacaoOxigenio;
    private Integer escalaDor;
}