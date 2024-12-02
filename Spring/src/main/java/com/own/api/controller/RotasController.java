package com.own.api.controller;

import com.own.api.model.Cliente;
import com.own.api.tools.Tsp;
import com.own.api.service.ClienteService;
import com.own.api.service.OpenRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/rotas")
@CrossOrigin(origins = "http://localhost:4200")
public class RotasController {

    private final OpenRouteService openRouteService;
    
    @Autowired
    private ClienteService clienteService;


    public RotasController(OpenRouteService openRouteService) {
        this.openRouteService = openRouteService;
    }


    @PostMapping
public ResponseEntity<?> generateBestRoute(@RequestBody List<Cliente> clients) {
   
    List<List<Double>> coordinates = new ArrayList<>();
    for (Cliente client : clients) {
        coordinates.add(Arrays.asList(client.getLng(), client.getLat()));
    }

    // Passo 2: Gerar a matriz de distâncias utilizando OpenRouteService
    Map<String, double[][]> distanceMatrix = openRouteService.getRoute(coordinates);

    // Verifique se a matriz de distâncias está presente
    if (distanceMatrix == null || !distanceMatrix.containsKey("distances")) {
        throw new IllegalStateException("Matriz de distâncias inválida ou ausente na resposta.");
    }

    double[][] distances = distanceMatrix.get("distances");

    // Passo 3: Aplicar o algoritmo TSP usando a matriz de distâncias
    int[] bestRouteIndices = Tsp.tsp(distances);

    // Passo 4: Calcular a distância total da melhor rota
    double totalDistance = Tsp.calculateTotalDistance(bestRouteIndices, distances);

    // Passo 5: Organizar os clientes na ordem da melhor rota
    List<Cliente> orderedClients = new ArrayList<>();
    for (int index : bestRouteIndices) {
        orderedClients.add(clients.get(index));
    }

    // Passo 6: Retornar a lista de clientes na ordem da melhor rota e a distância total
    Map<String, Object> result = new HashMap<>();
    result.put("orderedClients", orderedClients);
    result.put("totalDistance", totalDistance);

    //return result;
        if (result != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(result); // Retorna o objeto com status 201
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Retorna erro se não conseguir salvar
        }
}

@PostMapping("/directions")
public Map<String, Object> generateDirections(@RequestBody List<Cliente> clients) {
    // Passo 1: Extrair as coordenadas (longitude, latitude) dos clientes
    List<List<Double>> coordinates = new ArrayList<>();
    for (Cliente client : clients) {
        coordinates.add(Arrays.asList(client.getLng(), client.getLat()));
    }

    // Passo 2: Gerar as direções utilizando OpenRouteService
    List<String> directions = openRouteService.getDirections(coordinates);

    // Passo 3: Retornar as instruções e a lista de clientes na ordem original
    Map<String, Object> result = new HashMap<>();
    result.put("clients", clients); // Mantém os clientes na ordem fornecida
    result.put("directions", directions);

    return result;
}


}
