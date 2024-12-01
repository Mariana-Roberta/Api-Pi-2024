package com.own.api.service;

import com.own.api.exception.ClienteException;
import com.own.api.model.Cliente;
import com.own.api.repository.ClienteRepository;
import com.own.api.validator.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> findAll() {return clienteRepository.findAll();}

    public Cliente findById(Long id) {return clienteRepository.findById(id).orElseThrow();}

    public Cliente save(Cliente cliente) {
        clienteExceptionHandler(cliente);
        return clienteRepository.save(cliente);
    }

    public Cliente update(Cliente cliente) {
        //clienteExceptionHandler(cliente);
        return clienteRepository.save(cliente);
    }

    public void deleteById(Long id) {clienteRepository.deleteById(id);}

    // Exception Handler
    private void clienteExceptionHandler(Cliente cliente) {

        if (cliente.getNome() == null || cliente.getNome().isEmpty()) {
            throw new ClienteException("O nome deve ser informado.");
        } else if (cliente.getNome().length() < 3) {
            throw new ClienteException("O nome deve ser conter no mínimo 2 caracteres.");
        }

        if (cliente.getEmail() == null || cliente.getEmail().isEmpty()) {
            throw new ClienteException("O email deve ser informado.");
        } else if (!EmailValidator.isEmailValid(cliente.getEmail())) {
            throw new ClienteException("Email inválido. Digite um email válido.");
        }

        if (cliente.getTelefone() == null || cliente.getTelefone().isEmpty()) {
            throw new ClienteException("O telefone deve ser informado.");
        } else if (!PhoneValidator.isValidTelefone(cliente.getTelefone())) {
            throw new ClienteException("Telefone inválido. Digite um telefone válido.");
        }

    }
}
