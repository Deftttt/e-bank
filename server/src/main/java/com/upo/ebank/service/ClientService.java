package com.upo.ebank.service;

import com.upo.ebank.model.Client;
import com.upo.ebank.model.Employee;
import com.upo.ebank.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientService {
    private final ClientRepository clientRepository;

    public List<Client> getClients(){
        return clientRepository.findAll();
    }

    public Client getClient(Long id){
        return clientRepository.findById(id).orElseThrow();
    }

    public Client addClient(Client client){
        return clientRepository.save(client);
    }
}
