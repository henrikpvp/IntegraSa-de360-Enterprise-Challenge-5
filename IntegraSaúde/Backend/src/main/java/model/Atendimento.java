package com.integrasaude.api.model;

import com.integrasaude.api.model.enums.NivelRisco;
import com.integrasaude.api.model.enums.StatusAtendimento;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tb_atendimentos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Atendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @ManyToOne
    @JoinColumn(name = "medico_id")
    private Medico medico;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String queixaPrincipal;

    @Embedded
    private SinaisVitais sinaisVitais;

    @Enumerated(EnumType.STRING)
    private NivelRisco nivelRisco;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusAtendimento status = StatusAtendimento.AGUARDANDO_TRIAGEM;

    @Column(nullable = false)
    private LocalDateTime dataHoraChegada = LocalDateTime.now();

    private LocalDateTime dataHoraTriagem;

    private LocalDateTime dataHoraAtendimento;

    private LocalDateTime dataHoraFinalizacao;

    private Double pontuacaoPrioridade;
}