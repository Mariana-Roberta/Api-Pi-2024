package com.own.api.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class GeocodingService {

    private final RestTemplate restTemplate;

    public GeocodingService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getCoordinatesFromAddress(String address) {
        // Nominatim URL base
        String url = UriComponentsBuilder.fromHttpUrl("https://nominatim.openstreetmap.org/search")
                .queryParam("q", address)
                .queryParam("format", "json")
                .toUriString();

        // Fazer a requisição
        String response = restTemplate.getForObject(url, String.class);

        // Retornar a resposta (você pode parsear o JSON aqui, se necessário)
        return response;
    }
}

