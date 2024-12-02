package com.own.api;

import com.own.api.model.User;
import com.own.api.model.Cliente;
import com.own.api.repository.ClienteRepository;
import com.own.api.repository.UserRepository;
import com.own.api.service.OpenRouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Component
public class StartApplication implements CommandLineRunner {

    @Autowired
    private OpenRouteService openRouteService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Transactional
    @Override
    public void run(String... args) throws Exception {

        // Criação do usuário admin
        createUserIfNotExists("admin", "123", "ROLE_ADMIN");

        createClienteIfNotExists("fatesg", "admin@email.com", "62000000000", "74610155", "Rua 227-A", "95", "Setor Leste Universitário", -16.671255, -49.238687);

        createClienteIfNotExists("Cliente Teste 1", "cliente1@email.com", "62983747645", "74910300", "Rua Flamboyant", "S/N", "Vila Santos Dumont", -16.671255, -49.238687);

        // Criação do usuário user
        createUserIfNotExists("user", "123", "ROLE_USER");
    }

    private void createUserIfNotExists(String username, String password, String role) {
        Optional<User> optionalUser = userRepository.findByUsername(username);

        if (optionalUser.isEmpty()) {
            User user = new User();
            user.setUsername(username);
            user.setPassword(new BCryptPasswordEncoder().encode(password));
            user.getRoles().add(role);
            userRepository.save(user);
        }
    }

    private void createClienteIfNotExists(String nome, String email, String telefone, String cep, String logradouro, String numero, String bairro, double lat, double lng) {
        Optional<Cliente> optionalCliente = clienteRepository.findById((long)1);

        if (optionalCliente.isEmpty()) {
            Cliente cliente = new Cliente();
            cliente.setNome(nome);
            cliente.setEmail(email);
            cliente.setTelefone(telefone);
            cliente.setCep(cep);
            cliente.setLogradouro(logradouro);
            cliente.setNumero(numero);
            cliente.setBairro(bairro);
            cliente.setLat(lat);
            cliente.setLng(lng);
            clienteRepository.save(cliente);
        }
    }

}
