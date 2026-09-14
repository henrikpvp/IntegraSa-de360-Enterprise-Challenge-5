package com.integrasaude.api.service;

import com.integrasaude.api.dto.request.PacienteRequestDTO;
import com.integrasaude.api.dto.response.PacienteResponseDTO;
import com.integrasaude.api.exception.BusinessException;
import com.integrasaude.api.model.Paciente;
import com.integrasaude.api.repository.PacienteRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PacienteServiceTest {

    @Mock
    private PacienteRepository pacienteRepository;

    @InjectMocks
    private PacienteService pacienteService;

    @Test
    @DisplayName("Deve salvar paciente com sucesso quando CPF não existir")
    void deveSalvarPacienteComSucesso() {
        PacienteRequestDTO request = new PacienteRequestDTO(
                "Carlos Silva", "12345678901", LocalDate.of(1990, 5, 20), "11999998888", "123456"
        );

        Paciente pacienteSalvo = new Paciente(
                1L, "Carlos Silva", "12345678901", LocalDate.of(1990, 5, 20), "11999998888", "123456"
        );

        when(pacienteRepository.existsByCpf(request.cpf())).thenReturn(false);
        when(pacienteRepository.save(any(Paciente.class))).thenReturn(pacienteSalvo);

        PacienteResponseDTO response = pacienteService.salvar(request);

        assertNotNull(response);
        assertEquals(1L, response.id());
        assertEquals("Carlos Silva", response.nome());
        verify(pacienteRepository, times(1)).save(any(Paciente.class));
    }

    @Test
    @DisplayName("Deve lançar BusinessException ao tentar cadastrar CPF duplicado")
    void deveLancarExcecaoQuandoCpfDuplicado() {
        PacienteRequestDTO request = new PacienteRequestDTO(
                "Carlos Silva", "12345678901", LocalDate.of(1990, 5, 20), "11999998888", "123456"
        );

        when(pacienteRepository.existsByCpf(request.cpf())).thenReturn(true);

        assertThrows(BusinessException.class, () -> pacienteService.salvar(request));
        verify(pacienteRepository, never()).save(any(Paciente.class));
    }
}