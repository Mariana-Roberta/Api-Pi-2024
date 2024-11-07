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
import java.util.Map;


@RestController
public class AuthenticationController {
    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("authenticate")
    public ResponseEntity<Map<String, String>> authenticate(@RequestBody UserDTO userDTO) {
        String token = authenticationService.authenticate(userDTO.getUsername(), userDTO.getPassword());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(response);
    }


}

