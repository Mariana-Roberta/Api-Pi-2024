package com.own.api.service;

import org.springframework.stereotype.Service;
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
        requestBody.put("locations", coordinates);
        requestBody.put("metrics", Arrays.asList("distance", "duration"));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                ORS_URL,
                HttpMethod.POST,
                request,
                Map.class
        );

        // Retorna a matriz de distâncias e durações
        Map<String, Object> responseBody = response.getBody();
        Map<String, double[][]> result = new HashMap<>();
        result.put("distances", (double[][]) responseBody.get("distances"));
        result.put("durations", (double[][]) responseBody.get("durations"));

        return result;
    }

    // Mini-teste
    public void testRoute() {
        // Lista de coordenadas: [Longitude, Latitude]
        List<List<Double>> coordinates = new ArrayList<>();
        coordinates.add(Arrays.asList(8.681495, 49.41461)); // Ponto inicial
        coordinates.add(Arrays.asList(8.687872, 49.420318)); // Ponto final

        // Chama o método e imprime o resultado
        Map result = getRoute(coordinates);
        System.out.println("Resultado da rota: \n" + result);
    }
}