package com.integrasaude.api.service;

import com.integrasaude.api.dto.request.AtendimentoRequestDTO;
import com.integrasaude.api.dto.request.TriagemRequestDTO;
import com.integrasaude.api.dto.response.AtendimentoResponseDTO;
import com.integrasaude.api.dto.response.FilaAtendimentoDTO;
import com.integrasaude.api.dto.response.PacienteResponseDTO;
import com.integrasaude.api.exception.ResourceNotFoundException;
import com.integrasaude.api.model.Atendimento;
import com.integrasaude.api.model.Paciente;
import com.integrasaude.api.model.SinaisVitais;
import com.integrasaude.api.model.enums.NivelRisco;
import com.integrasaude.api.model.enums.StatusAtendimento;
import com.integrasaude.api.repository.AtendimentoRepository;
import com.integrasaude.api.repository.PacienteRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AtendimentoService {

    private final AtendimentoRepository atendimentoRepository;
    private final PacienteRepository pacienteRepository;
    private final AlgoritmoPrioridadeService algoritmoService;

    public AtendimentoService(AtendimentoRepository atendimentoRepository,
                              PacienteRepository pacienteRepository,
                              AlgoritmoPrioridadeService algoritmoService) {
        this.atendimentoRepository = atendimentoRepository;
        this.pacienteRepository = pacienteRepository;
        this.algoritmoService = algoritmoService;
    }

    @Transactional
    public AtendimentoResponseDTO registrarRecepcao(AtendimentoRequestDTO dto) {
        Paciente paciente = pacienteRepository.findById(dto.pacienteId())
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado com ID: " + dto.pacienteId()));

        Atendimento atendimento = new Atendimento();
        atendimento.setPaciente(paciente);
        atendimento.setQueixaPrincipal(dto.queixaPrincipal());
        atendimento.setStatus(StatusAtendimento.AGUARDANDO_TRIAGEM);
        atendimento.setDataHoraChegada(LocalDateTime.now());

        Atendimento salvo = atendimentoRepository.save(atendimento);
        return toDTO(salvo);
    }

    @Transactional
    public AtendimentoResponseDTO processarTriagem(Long atendimentoId, TriagemRequestDTO dto) {
        Atendimento atendimento = atendimentoRepository.findById(atendimentoId)
                .orElseThrow(() -> new ResourceNotFoundException("Atendimento não encontrado com ID: " + atendimentoId));

        SinaisVitais vitais = new SinaisVitais(
                dto.frequenciaCardiaca(),
                dto.pressaoSistolica(),
                dto.pressaoDiastolica(),
                dto.temperatura(),
                dto.saturacaoOxigenio(),
                dto.escalaDor()
        );

        NivelRisco riscoClassificado = algoritmoService.classificarRisco(vitais);

        atendimento.setSinaisVitais(vitais);
        atendimento.setNivelRisco(riscoClassificado);
        atendimento.setStatus(StatusAtendimento.AGUARDANDO_CONSULTA);
        atendimento.setDataHoraTriagem(LocalDateTime.now());

        Double pontuacao = algoritmoService.calcularPontuacaoFila(atendimento);
        atendimento.setPontuacaoPrioridade(pontuacao);

        Atendimento atualizado = atendimentoRepository.save(atendimento);
        return toDTO(atualizado);
    }

    @Transactional(readOnly = true)
    public List<FilaAtendimentoDTO> obterFilaAtendimento() {
        List<Atendimento> fila = atendimentoRepository.findFilaAtendimentoPriorizada();

        return fila.stream().map(a -> {
            long minutosEspera = Duration.between(a.getDataHoraChegada(), LocalDateTime.now()).toMinutes();
            return new FilaAtendimentoDTO(
                    a.getId(),
                    a.getPaciente().getNome(),
                    a.getNivelRisco(),
                    a.getPontuacaoPrioridade(),
                    a.getDataHoraChegada(),
                    minutosEspera
            );
        }).collect(Collectors.toList());
    }

    @Transactional
    public void finalizarAtendimento(Long id) {
        Atendimento atendimento = atendimentoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Atendimento não encontrado com ID: " + id));

        atendimento.setStatus(StatusAtendimento.FINALIZADO);
        atendimento.setDataHoraFinalizacao(LocalDateTime.now());
        atendimentoRepository.save(atendimento);
    }

    private AtendimentoResponseDTO toDTO(Atendimento a) {
        Paciente p = a.getPaciente();
        PacienteResponseDTO pacienteDTO = new PacienteResponseDTO(
                p.getId(), p.getNome(), p.getCpf(), p.getDataNascimento(), p.getTelefone(), p.getCartaoSus()
        );

        return new AtendimentoResponseDTO(
                a.getId(),
                pacienteDTO,
                a.getQueixaPrincipal(),
                a.getNivelRisco(),
                a.getStatus(),
                a.getDataHoraChegada(),
                a.getDataHoraTriagem()
        );
    }
}
