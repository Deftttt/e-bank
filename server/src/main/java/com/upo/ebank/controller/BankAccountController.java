package com.upo.ebank.controller;

import com.upo.ebank.model.BankAccount;
import com.upo.ebank.model.dto.account.ClientCreateBankAccountDto;
import com.upo.ebank.model.dto.account.EmployeeCreateBankAccountDto;
import com.upo.ebank.model.dto.PagedResponse;
import com.upo.ebank.model.dto.account.BankAccountDetailsDto;
import com.upo.ebank.model.dto.account.BankAccountDto;
import com.upo.ebank.model.enums.AccountType;
import com.upo.ebank.security.UserPrincipal;
import com.upo.ebank.service.BankAccountService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class BankAccountController {
    private final BankAccountService bankAccountService;

    @PreAuthorize("hasAuthority('VIEW_ACCOUNTS')")
    @GetMapping("")
    public PagedResponse<BankAccountDto> getAllAccounts(@RequestParam(required = false) AccountType accountType,
                                        @PageableDefault(sort = "accountNumber", direction = Sort.Direction.ASC) Pageable pageable) {
        List<BankAccountDto> accounts = bankAccountService.getBankAccounts(accountType, pageable);
        long totalElements = bankAccountService.getTotalAccountsNumber(accountType);
        return new PagedResponse<>(accounts, totalElements);
    }

    @PreAuthorize("hasAuthority('VIEW_ACCOUNTS') or @bankAccountService.checkAccountOwner(#accountNumber, principal.userId)")
    @GetMapping("/{accountNumber}")
    public BankAccountDetailsDto getAccount(@PathVariable String accountNumber) {
        return bankAccountService.getBankAccount(accountNumber);
    }

    @PreAuthorize("hasAuthority('VIEW_ACCOUNTS') or #clientId == principal.userId")
    @GetMapping("/clients/{clientId}")
    public PagedResponse<BankAccountDto> getAccountsByClientId(@PathVariable Long clientId,
                                                          @RequestParam(required = false) AccountType accountType,
                                                          @PageableDefault(sort = "accountNumber", direction = Sort.Direction.ASC) Pageable pageable) {
        List<BankAccountDto> accounts = bankAccountService.getBankAccountsByClientId(clientId, accountType, pageable);
        long totalElements = bankAccountService.getTotalAccountsNumberByClientId(clientId, accountType);
        return new PagedResponse<>(accounts, totalElements);
    }

    @PreAuthorize("hasAuthority('USER_RIGHTS')")
    @PostMapping
    public ResponseEntity<BankAccount> createBankAccount(@AuthenticationPrincipal UserPrincipal userPrincipal,
                                                         @Valid @RequestBody ClientCreateBankAccountDto createBankAccountDto) {
        BankAccount createdAccount = bankAccountService.createBankAccount(userPrincipal.getUserId(), createBankAccountDto);
        return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('EMPLOYEE_RIGHTS')")
    @PostMapping("/clients/{clientId}")
    public ResponseEntity<BankAccount> createAccountForClient(@PathVariable Long clientId,
                                                                 @Valid @RequestBody EmployeeCreateBankAccountDto createBankAccountDto) {
        BankAccount createdAccount = bankAccountService.createBankAccount(clientId, createBankAccountDto);
        return new ResponseEntity<>(createdAccount, HttpStatus.CREATED);
    }


    @PreAuthorize("hasAuthority('MANAGE_ACCOUNTS') or @bankAccountService.checkAccountOwner(#accountNumber, principal.userId)")
    @PostMapping("/{accountNumber}/block")
    public ResponseEntity<Void> blockAccount(@PathVariable String accountNumber) {
        bankAccountService.blockAccount(accountNumber);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("hasAuthority('MANAGE_ACCOUNTS')")
    @PostMapping("/{accountNumber}/unblock")
    public ResponseEntity<Void> unblockAccount(@PathVariable String accountNumber) {
        bankAccountService.unblockAccount(accountNumber);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}

