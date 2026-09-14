package com.integrasaude.api.controller;

import com.integrasaude.api.dto.request.AtendimentoRequestDTO;
import com.integrasaude.api.dto.request.TriagemRequestDTO;
import com.integrasaude.api.dto.response.AtendimentoResponseDTO;
import com.integrasaude.api.dto.response.FilaAtendimentoDTO;
import com.integrasaude.api.service.AtendimentoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/atendimentos")
public class AtendimentoController {

    @Autowired
    private AtendimentoService atendimentoService;

    @PostMapping("/recepcao")
    public ResponseEntity<AtendimentoResponseDTO> iniciarRecepcao(@RequestBody @Valid AtendimentoRequestDTO dto) {
        AtendimentoResponseDTO response = atendimentoService.registrarRecepcao(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}/triagem")
    public ResponseEntity<AtendimentoResponseDTO> realizarTriagem(
            @PathVariable Long id,
            @RequestBody @Valid TriagemRequestDTO dto) {
        AtendimentoResponseDTO response = atendimentoService.processarTriagem(id, dto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/fila")
    public ResponseEntity<List<FilaAtendimentoDTO>> obterFilaPriorizada() {
        return ResponseEntity.ok(atendimentoService.obterFilaAtendimento());
    }

    @PatchMapping("/{id}/finalizar")
    public ResponseEntity<Void> finalizarAtendimento(@PathVariable Long id) {
        atendimentoService.finalizarAtendimento(id);
        return ResponseEntity.noContent().build();
    }
}