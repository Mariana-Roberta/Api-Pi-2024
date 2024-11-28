package com.own.api.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class GeocodingService {

    private final RestTemplate restTemplate;

    public GeocodingService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private final String NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
    private final String NOMINATIM_REVERSE_URL = "https://nominatim.openstreetmap.org/reverse";

    public String getAddressByLatLon(double lat, double lon) {
        // Montar a URL de consulta com as coordenadas de forma segura
        String url = UriComponentsBuilder.fromHttpUrl(NOMINATIM_REVERSE_URL)
                .queryParam("lat", lat)
                .queryParam("lon", lon)
                .queryParam("format", "json")
                .toUriString();

        // Usar o RestTemplate para fazer a requisição HTTP com tratamento de exceção
        RestTemplate restTemplate = new RestTemplate();
        String response = null;
        try {
            response = restTemplate.getForObject(url, String.class);
        } catch (Exception e) {
            // Tratar possíveis exceções (exemplo: falha na requisição, erro de rede)
            System.err.println("Erro ao fazer a requisição para a API: " + e.getMessage());
        }

        return response;
    }

    public String geocodeAddress(String street, String city, String postalCode) {
        // Montando a URL para a consulta Nominatim
        String url = UriComponentsBuilder.fromHttpUrl("https://nominatim.openstreetmap.org/search")
                .queryParam("street", street)
                .queryParam("city", city)
                .queryParam("postalcode", postalCode)
                .queryParam("format", "json")
                .toUriString();

        // Fazendo a requisição GET à API Nominatim
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        return response.getBody(); // Retorna o resultado em formato JSON
    }

    public String getCoordinatesFromAddress(String address) {
        // Nominatim URL base
        String url = UriComponentsBuilder.fromHttpUrl(NOMINATIM_URL)
                .queryParam("q", address)
                .queryParam("format", "json")
                .toUriString();

        // Fazer a requisição
        String response = restTemplate.getForObject(url, String.class);

        // Retornar a resposta (você pode parsear o JSON aqui, se necessário)
        return response;
    }
}

