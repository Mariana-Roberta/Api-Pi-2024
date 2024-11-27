package com.own.api.controller;

import com.own.api.model.Cliente;
import com.own.api.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public Cliente save(@RequestBody Cliente cliente) {return clienteService.save(cliente); }

    @PutMapping("/save/{id}")
    public Cliente update(@PathVariable Long id, @RequestBody Cliente cliente) {
        return clienteService.update(cliente);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {clienteService.deleteById(id);}
}
