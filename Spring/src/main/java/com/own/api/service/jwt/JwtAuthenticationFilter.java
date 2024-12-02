package com.own.api.service.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.security.Key;
import java.security.interfaces.RSAPrivateKey;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtDecoder jwtDecoder;

    public JwtAuthenticationFilter(JwtDecoder jwtDecoder) {
        this.jwtDecoder = jwtDecoder;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        System.out.println("Cabeçalhos recebidos:");
        request.getHeaderNames().asIterator().forEachRemaining(
                header -> System.out.println(header + ": " + request.getHeader(header))
        );

        System.out.println("SecurityContext: " + SecurityContextHolder.getContext().getAuthentication());


        String authorizationHeader = request.getHeader("Authorization");
        System.out.println("authorizationHeader: " + authorizationHeader);

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);

            try {
                var decodedJwt = jwtDecoder.decode(token);

                String username = decodedJwt.getSubject();
                List<GrantedAuthority> authorities = decodedJwt.getClaimAsStringList("roles").stream()
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

                System.out.println("Usuário autenticado: " + username);
                System.out.println("Roles extraídas do token: " + authorities);

                // Configura o contexto de segurança
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(username, null, authorities);
                System.out.println("authentication: " + authentication);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                System.out.println("SecurityContextHolder: " + SecurityContextHolder.getContext().getAuthentication());
            } catch (Exception e) {
                // Token inválido ou expirado
                System.out.println("Erro ao processar token JWT: " + e.getMessage());
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
