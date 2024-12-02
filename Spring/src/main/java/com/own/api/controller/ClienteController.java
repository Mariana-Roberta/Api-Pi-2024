package com.own.api.controller;

import com.own.api.model.Cliente;
import com.own.api.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cliente")
@CrossOrigin(origins = "http://localhost:4200")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping("/findAll")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Cliente> findAll() { return clienteService.findAll(); }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public Cliente findById(@PathVariable Long id) { return clienteService.findById(id); }

    @PostMapping(value = "/save", consumes = {"application/json", "text/plain"})
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> save(@RequestBody Cliente cliente) {
    System.out.println("cliente " + cliente);
        Cliente savedCliente = clienteService.save(cliente);
        if (savedCliente != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCliente); // Retorna o objeto cliente com status 201
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Retorna erro se não conseguir salvar
        }
    }

    @PostMapping("/saving")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveTest() {
        System.out.println("Acessando /saving");
        return ResponseEntity.ok("Acesso permitido");
    }


    @PutMapping("/update")
    @PreAuthorize("hasRole('ADMIN')")
    public Cliente update(@RequestBody Cliente cliente) {
        return clienteService.update(cliente);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void delete(@PathVariable Long id) {clienteService.deleteById(id);}
}
