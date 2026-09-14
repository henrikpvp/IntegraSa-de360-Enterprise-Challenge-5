package com.integrasaude.api.repository;

import com.integrasaude.api.model.Atendimento;
import com.integrasaude.api.model.enums.StatusAtendimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AtendimentoRepository extends JpaRepository<Atendimento, Long> {
    List<Atendimento> findByStatus(StatusAtendimento status);

    @Query("SELECT a FROM Atendimento a WHERE a.status = 'AGUARDANDO_CONSULTA' ORDER BY a.pontuacaoPrioridade DESC, a.dataHoraChegada ASC")
    List<Atendimento> findFilaAtendimentoPriorizada();
}