package com.own.api.service;

import com.own.api.model.Cliente;
import com.own.api.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> findAll() {return clienteRepository.findAll();}

    public Cliente findById(Long id) {return clienteRepository.findById(id).orElseThrow();}

    public Cliente save(Cliente cliente) {return clienteRepository.save(cliente);}

    public Cliente update(Cliente cliente) {return clienteRepository.save(cliente);}

    public void deleteById(Long id) {clienteRepository.deleteById(id);}
}
