package com.own.api.controller;

import com.own.api.service.GeocodingService;
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

    @GetMapping("/geocode/adress")
    public String geocodeAddress(@RequestParam String street,
                                 @RequestParam String city,
                                 @RequestParam String postalCode) {
        return geocodingService.geocodeAddress(street, city, postalCode);
    }
}

