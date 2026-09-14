package com.integrasaude.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.integrasaude.api.dto.request.PacienteRequestDTO;
import com.integrasaude.api.dto.response.PacienteResponseDTO;
import com.integrasaude.api.security.SecurityFilter;
import com.integrasaude.api.security.TokenService;
import com.integrasaude.api.service.PacienteService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(PacienteController.class)
@AutoConfigureMockMvc(addFilters = false)
class PacienteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PacienteService pacienteService;

    @MockBean
    private TokenService tokenService;

    @MockBean
    private SecurityFilter securityFilter;

    @Test
    @WithMockUser
    @DisplayName("Deve retornar HTTP 201 Created ao cadastrar paciente válido")
    void deveRetornar201AoCriarPaciente() throws Exception {
        PacienteRequestDTO request = new PacienteRequestDTO(
                "Ana Costa", "98765432100", LocalDate.of(1985, 10, 15), "11988887777", null
        );

        PacienteResponseDTO response = new PacienteResponseDTO(
                1L, "Ana Costa", "98765432100", LocalDate.of(1985, 10, 15), "11988887777", null
        );

        when(pacienteService.salvar(any(PacienteRequestDTO.class))).thenReturn(response);

        mockMvc.perform(post("/pacientes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.nome").value("Ana Costa"));
    }

    @Test
    @WithMockUser
    @DisplayName("Deve retornar HTTP 400 Bad Request ao enviar payload com CPF inválido")
    void deveRetornar400QuandoCpfInvalido() throws Exception {
        PacienteRequestDTO requestInvalido = new PacienteRequestDTO(
                "Ana Costa", "123", LocalDate.of(1985, 10, 15), "11988887777", null
        );

        mockMvc.perform(post("/pacientes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requestInvalido)))
                .andExpect(status().isBadRequest());
    }
}
