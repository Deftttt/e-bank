package com.upo.ebank.controller;

import com.upo.ebank.model.BankAccount;
import com.upo.ebank.model.dto.account.BankAccountDto;
import com.upo.ebank.model.dto.account.PagedBankAccountResponse;
import com.upo.ebank.model.enums.AccountType;
import com.upo.ebank.service.BankAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class BankAccountController {
    private final BankAccountService bankAccountService;

    @PreAuthorize("hasAuthority('VIEW_ACCOUNTS')")
    @GetMapping("")
    public PagedBankAccountResponse getAllAccounts(@RequestParam(required = false) AccountType accountType,
                                                   @PageableDefault(sort = "accountNumber", direction = Sort.Direction.ASC) Pageable pageable) {
        List<BankAccountDto> accounts = bankAccountService.getBankAccounts(accountType, pageable);
        long totalElements = bankAccountService.getTotalAccountsNumber(accountType);
        return new PagedBankAccountResponse(accounts, totalElements);
    }

    @PreAuthorize("hasAuthority('VIEW_ACCOUNTS') or @bankAccountService.checkAccountOwner(#accountNumber, principal.userId)")
    @GetMapping("/{accountNumber}")
    public BankAccount getAccount(@PathVariable String accountNumber) {
        return bankAccountService.getBankAccount(accountNumber);
    }

    @PreAuthorize("hasAuthority('VIEW_ACCOUNTS') or #clientId == principal.userId")
    @GetMapping("/clients/{clientId}")
    public PagedBankAccountResponse getAccountsByClientId(@PathVariable Long clientId,
                                                          @RequestParam(required = false) AccountType accountType,
                                                          @PageableDefault(sort = "accountNumber", direction = Sort.Direction.ASC) Pageable pageable) {
        List<BankAccountDto> accounts = bankAccountService.getBankAccountsByClientId(clientId, accountType, pageable);
        long totalElements = bankAccountService.getTotalAccountsNumberByClientId(clientId, accountType);
        return new PagedBankAccountResponse(accounts, totalElements);
    }

}

