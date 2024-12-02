package com.own.api.controller;

import com.own.api.service.GeocodingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class GeocodingController {

    private final GeocodingService geocodingService;

    public GeocodingController(GeocodingService geocodingService) {
        this.geocodingService = geocodingService;
    }

    private final String NOMINATIM_API_URL = "https://nominatim.openstreetmap.org/reverse";

    @GetMapping("/getAddressByLatLon/{lat}/{lon}")
    public String getAddressByLatLon(@PathVariable double lat, @PathVariable double lon) {
        System.out.println(lat + " " + lon);
        return geocodingService.getAddressByLatLon(lat, lon);
    }

    @GetMapping("/geocode")
    public String getCoordinates(@RequestParam String address) {
        return geocodingService.getCoordinatesFromAddress(address);
    }

    @GetMapping("/postalCode")
    public ResponseEntity<String> geocodeAddress(@RequestParam String postalCode) {
        System.out.println("RequestParam postalCode: " + postalCode); // Verifique se o postalCode está chegando corretamente
        try {
            String address = geocodingService.getAddressByPostalCode(postalCode);
            System.out.println("Address encontrado: " + address); // Log para verificar a resposta do serviço
            if (address != null && !address.isEmpty()) {
                return ResponseEntity.ok(address);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Endereço não encontrado para o CEP informado.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao processar a solicitação: " + e.getMessage());
        }
    }

}

