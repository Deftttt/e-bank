package com.upo.ebank.controller;

import com.upo.ebank.model.Transaction;
import com.upo.ebank.model.dto.transaction.CreateTransactionDTO;
import com.upo.ebank.model.dto.transaction.TransactionDetailsDto;
import com.upo.ebank.model.dto.transaction.TransactionDto;
import com.upo.ebank.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor

public class TransactionController {

    private final TransactionService transactionService;

    @PreAuthorize("hasAuthority('VIEW_CLIENTS')")
    @GetMapping
    public List<TransactionDto> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @PreAuthorize("hasAuthority('VIEW_CLIENTS') or @transactionService.checkTransactionOwner(#id, principal.userId)")
    @GetMapping("/{id}")
    public TransactionDetailsDto getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id);
    }
    @PreAuthorize("hasAuthority('VIEW_CLIENTS') or @bankAccountService.checkAccountOwner(#accountNumber, principal.userId)")
    @GetMapping("/account/{accountNumber}")
    public List<TransactionDto> getTransactionBySenderAccountNumber(@PathVariable String accountNumber,
                                                                    @RequestParam(required = false) String transactionType) {
        return transactionService.getTransactionBySenderAccountNumber(accountNumber, transactionType);
    }
    @PreAuthorize("hasAuthority('VIEW_CLIENTS') or #clientId == principal.userId")
    @GetMapping("/client/{clientId}")
    public List<TransactionDto> getTransactionByClientId(@PathVariable Long clientId,
                                                                    @RequestParam(required = false) String transactionType) {
        return transactionService.getTransactionByClientId(clientId, transactionType);
    }

    @PreAuthorize("@bankAccountService.checkAccountOwner(#accountNumber, principal.userId)")
    @PostMapping("/account/{accountNumber}/transfer")
    public Transaction transferMoney(@PathVariable String accountNumber,
                                     @Valid @RequestBody CreateTransactionDTO createTransactionDTO) throws Exception {
        return transactionService.transferMoney(accountNumber, createTransactionDTO);
    }

}
