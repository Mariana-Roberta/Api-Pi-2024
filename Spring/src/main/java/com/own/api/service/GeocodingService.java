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

    public String getAddressByPostalCode(String postalCode) {
        // Construir a URL de consulta com o código postal
        String url = UriComponentsBuilder.fromHttpUrl(NOMINATIM_URL)
                .queryParam("postalcode", postalCode)
                .queryParam("country", "Brazil") // Adicione para restringir ao Brasil
                .queryParam("format", "json")
                .toUriString();

        System.out.println("URL gerada: " + url); // Log para verificar a URL gerada

        String response = null;
        try {
            // Fazer a requisição para a API do Nominatim
            response = restTemplate.getForObject(url, String.class);

            // Log da resposta para debug
            System.out.println("Resposta da API: " + response);

        } catch (Exception e) {
            // Tratar possíveis exceções
            System.err.println("Erro ao fazer a requisição para a API: " + e.getMessage());
        }

        // Caso a resposta seja nula ou vazia, retornar uma mensagem adequada
        if (response == null || response.isEmpty()) {
            System.err.println("Nenhum resultado encontrado para o código postal.");
            return "[]"; // Retornar um JSON vazio para indicar ausência de resultados
        }

        return response;
    }


}

