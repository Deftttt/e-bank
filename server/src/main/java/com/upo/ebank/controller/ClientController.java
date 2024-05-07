package com.upo.ebank.controller;

import com.upo.ebank.model.Client;
import com.upo.ebank.model.dto.ClientDto;
import com.upo.ebank.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;

    @GetMapping("/clients")
    public List<ClientDto> getClients() {
        return clientService.getClients();
    }

    @GetMapping("/clients/{id}")
    public Client getClient(@PathVariable Long id) {

        return clientService.getClient(id);
    }


}
