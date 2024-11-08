package com.own.api.service;

import com.own.api.service.jwt.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

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

}
