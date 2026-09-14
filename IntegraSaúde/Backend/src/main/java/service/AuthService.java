package com.integrasaude.api.service;

import com.integrasaude.api.dto.request.LoginRequestDTO;
import com.integrasaude.api.dto.request.RegisterRequestDTO;
import com.integrasaude.api.dto.response.LoginResponseDTO;
import com.integrasaude.api.exception.BusinessException;
import com.integrasaude.api.model.Usuario;
import com.integrasaude.api.repository.UsuarioRepository;
import com.integrasaude.api.security.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponseDTO login(LoginRequestDTO dto) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getSenha());
        var auth = this.authenticationManager.authenticate(usernamePassword);
        
        var usuario = (Usuario) auth.getPrincipal();
        var token = tokenService.gerarToken(usuario);

        return new LoginResponseDTO(token, usuario.getEmail(), usuario.getPerfil());
    }

    @Transactional
    public void register(RegisterRequestDTO dto) {
        if (usuarioRepository.existsByEmail(dto.getEmail())) {
            throw new BusinessException("E-mail já cadastrado no sistema.");
        }

        String encryptedPassword = passwordEncoder.encode(dto.getSenha());
        Usuario novoUsuario = new Usuario(dto.getEmail(), encryptedPassword, dto.getPerfil());
        
        usuarioRepository.save(novoUsuario);
    }
}