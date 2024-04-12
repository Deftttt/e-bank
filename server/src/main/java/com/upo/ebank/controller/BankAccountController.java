package com.upo.ebank.controller;

import com.upo.ebank.model.dto.BankAccountDto;
import com.upo.ebank.service.BankAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BankAccountController {
    private final BankAccountService bankAccountService;

    @GetMapping("/accounts")
    public List<BankAccountDto> getAllAccounts() {
        return bankAccountService.getBankAccounts();
    }

    @GetMapping("/accounts/{accountNumber}")
    public BankAccountDto getAccount(@PathVariable String accountNumber) {
        return bankAccountService.getBankAccountByAccountNumber(accountNumber);
    }

}
