package com.upo.ebank.service;

import com.upo.ebank.model.Address;
import com.upo.ebank.model.Client;
import com.upo.ebank.model.dto.ClientDto;
import com.upo.ebank.model.dto.auth.SignUpRequest;
import com.upo.ebank.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository clientRepository;
    private final PasswordEncoder passwordEncoder;
    private final ModelMapper modelMapper;

    public List<ClientDto> getClients(String lastName, Pageable pageable) {
        Page<Client> clients;
        if (lastName != null && !lastName.isEmpty()) {
            clients = clientRepository.findByLastNameStartingWithIgnoreCase(lastName, pageable);
        } else {
            clients = clientRepository.findAll(pageable);
        }
        return clients.stream()
                .map(client -> modelMapper.map(client, ClientDto.class))
                .collect(Collectors.toList());
    }

    public long getTotalClientsNumber(String lastName) {
        if (lastName != null && !lastName.isEmpty()) {
            return clientRepository.countByLastNameStartingWithIgnoreCase(lastName);
        } else {
            return clientRepository.count();
        }
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
