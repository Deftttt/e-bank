package com.upo.ebank.controller;

import com.upo.ebank.model.Client;
import com.upo.ebank.model.dto.ClientDto;
import com.upo.ebank.model.dto.PagedResponse;
import com.upo.ebank.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;

    @GetMapping("")
    public PagedResponse<ClientDto> getAllClients(@PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        List<ClientDto> clients = clientService.getClients(pageable);
        long totalElements = clientService.getTotalClientsNumber();
        return new PagedResponse<>(clients, totalElements);
    }

    @GetMapping("/{id}")
    public Client getClient(@PathVariable Long id) {
        return clientService.getClient(id);
    }


}
