package com.own.api.controller;

import com.own.api.model.Cliente;
import com.own.api.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "http://localhost:4200")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/findAll")
    public List<Cliente> findAll() { return clienteService.findAll(); }

    @GetMapping("/{id}")
    public Cliente findById(@PathVariable Long id) { return clienteService.findById(id); }

    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody Cliente cliente) {
        Cliente savedCliente = clienteService.save(cliente);
        System.out.println(cliente);
        System.out.println(savedCliente);
        if (savedCliente != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCliente); // Retorna o objeto cliente com status 201
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Retorna erro se não conseguir salvar
        }
    }

    @PutMapping("/save/{id}")
    public Cliente update(@PathVariable Long id, @RequestBody Cliente cliente) {
        return clienteService.update(cliente);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {clienteService.deleteById(id);}
}
