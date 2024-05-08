package com.upo.ebank.controller;

import com.upo.ebank.model.dto.BankAccountDto;
import com.upo.ebank.service.BankAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class BankAccountController {
    private final BankAccountService bankAccountService;

    @PreAuthorize("hasAuthority('VIEW_ACCOUNTS')")
    @GetMapping()
    public List<BankAccountDto> getAllAccounts() {
        return bankAccountService.getBankAccounts();
    }

    @PreAuthorize("hasAuthority('VIEW_ACCOUNTS') or @bankAccountService.checkAccountOwner(#accountNumber, principal.userId)")
    @GetMapping("/{accountNumber}")
    public BankAccountDto getAccount(@PathVariable String accountNumber) {
        return bankAccountService.getBankAccountByAccountNumber(accountNumber);
    }

    @PreAuthorize("hasAuthority('VIEW_ACCOUNTS') or #clientId == principal.userId")
    @GetMapping("/clients/{clientId}")
    public List<BankAccountDto> getAccountsByClientId(@PathVariable Long clientId) {
        return bankAccountService.getBankAccountsByClientId(clientId);
    }

}

