package com.own.api.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class OpenRouteService {

    private static final String ORS_URL = "https://api.openrouteservice.org/v2/directions/driving-car";
    private static final String API_KEY = "5b3ce3597851110001cf62481a809977a4254c9ea52da021c457b484";

    public Map getRoute(List<List<Double>> coordinates) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", API_KEY);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("coordinates", coordinates);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                ORS_URL,
                HttpMethod.POST,
                request,
                Map.class
            );
            return response.getBody();
        } catch (HttpClientErrorException e) {
            System.err.println("Erro na requisição: " + e.getResponseBodyAsString());
            throw e;
        }
    }

    public void testRoute() {
        List<List<Double>> coordinates = new ArrayList<>();
        coordinates.add(Arrays.asList(8.681495, 49.41461)); // Ponto inicial
        coordinates.add(Arrays.asList(8.687872, 49.420318)); // Ponto final

        Map result = getRoute(coordinates);
        System.out.println("Resultado da rota: \n" + result);
    }
}
