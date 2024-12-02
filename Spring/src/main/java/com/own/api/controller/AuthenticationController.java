package com.own.api.controller;

import com.own.api.dto.UserDTO;
import com.own.api.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("authenticate")
public ResponseEntity<Map<String, Object>> authenticate(@RequestBody UserDTO userDTO) {
    // Autentica o usuário e obtém o token
    String token = authenticationService.authenticate(userDTO.getUsername(), userDTO.getPassword());

    // Obtém as roles do usuário autenticado
    List<String> roles = authenticationService.getRolesForUser(userDTO.getUsername());

    // Cria a resposta com token e roles
    Map<String, Object> response = new HashMap<>();
    response.put("token", token);
    response.put("roles", roles);

    return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(response);
}



}

