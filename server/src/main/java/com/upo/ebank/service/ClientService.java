package com.upo.ebank.service;

import com.upo.ebank.model.Address;
import com.upo.ebank.model.Client;
import com.upo.ebank.model.dto.SignUpRequest;
import com.upo.ebank.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;

    public List<Client> getClients() {
        return clientRepository.findAll();
    }

    public Client getClient(Long id) {
        return clientRepository.findById(id).orElseThrow();
    }

    public Client addClient(Client client) {
        return clientRepository.save(client);
    }

    public Client addClient(SignUpRequest request) {
        Client client = new Client(
                null,
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getFirstName(),
                request.getLastName(),
                request.getPhoneNumber(),
                List.of(new Address(null, request.getCity(), request.getStreet(), request.getLocalNumber(),
                        request.getPostCode(), request.getCountry())),
                request.getPesel()
        );

        return clientRepository.save(client);
    }


}
