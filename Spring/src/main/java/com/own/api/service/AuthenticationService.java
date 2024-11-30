package com.own.api.service;

import com.own.api.model.User;
import com.own.api.repository.UserRepository;
import com.own.api.service.jwt.JwtService;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    @Autowired
    private UserRepository userRepository;

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @Autowired
    public AuthenticationService(AuthenticationManager authenticationManager, JwtService jwtService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public String authenticate(String username, String password) {
        try {
            // Autentica as credenciais do usuário
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            System.out.println(auth.getPrincipal());

            // Gera o token JWT e o retorna
            return jwtService.generateToken(auth);
        } catch (AuthenticationException e) {
            throw new RuntimeException("Falha na autenticação: " + e.getMessage());
        }
    }

    public List<String> getRolesForUser(String username) {
        // Busca o usuário no banco de dados
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + username));
    
        // Retorna a lista de roles (diretamente armazenada como String)
        return user.getRoles();
    }
    

}
