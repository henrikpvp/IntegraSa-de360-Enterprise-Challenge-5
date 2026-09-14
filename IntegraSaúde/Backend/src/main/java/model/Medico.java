package com.integrasaude.api.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tb_medicos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Medico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String crm;

    private String especialidade;

    @Column(nullable = false)
    private Boolean ativo = true;

    @OneToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}