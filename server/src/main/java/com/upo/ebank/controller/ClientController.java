package com.upo.ebank.controller;

import com.upo.ebank.model.Client;
import com.upo.ebank.model.dto.ClientDto;
import com.upo.ebank.model.dto.PagedResponse;
import com.upo.ebank.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
public class ClientController {
    private final ClientService clientService;

    @GetMapping("")
    public PagedResponse<ClientDto> getAllClients(
            @RequestParam(required = false) String lastName,
            @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        List<ClientDto> clients = clientService.getClients(lastName, pageable);
        long totalElements = clientService.getTotalClientsNumber(lastName);
        return new PagedResponse<>(clients, totalElements);
    }

    @GetMapping("/{id}")
    public Client getClient(@PathVariable Long id) {
        return clientService.getClient(id);
    }


}
