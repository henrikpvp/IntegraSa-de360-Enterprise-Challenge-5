package com.integrasaude.api.controller;

import com.integrasaude.api.dto.response.MedicoResponseDTO;
import com.integrasaude.api.service.MedicoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicos")
public class MedicoController {

    @Autowired
    private MedicoService medicoService;

    @GetMapping
    public ResponseEntity<List<MedicoResponseDTO>> listarAtivos() {
        return ResponseEntity.ok(medicoService.listarMedicosAtivos());
    }
}