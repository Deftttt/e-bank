package com.upo.ebank.controller;

import com.upo.ebank.model.Transaction;
import com.upo.ebank.model.dto.PagedResponse;
import com.upo.ebank.model.dto.transaction.CreateTransactionDTO;
import com.upo.ebank.model.dto.transaction.TransactionDetailsDto;
import com.upo.ebank.model.dto.transaction.TransactionDto;
import com.upo.ebank.model.enums.TransactionType;
import com.upo.ebank.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor

public class TransactionController {

    private final TransactionService transactionService;

    @PreAuthorize("hasAuthority('VIEW_CLIENTS')")
    @GetMapping("")
    public PagedResponse<TransactionDto> getAllTransactions(
            @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<TransactionDto> transactions = transactionService.getAllTransactions(pageable);
        return new PagedResponse<>(transactions.getContent(), transactions.getTotalElements());
    }

    @PreAuthorize("hasAuthority('VIEW_CLIENTS') or @transactionService.checkTransactionOwner(#id, principal.userId)")
    @GetMapping("/{id}")
    public TransactionDetailsDto getTransactionById(@PathVariable Long id) {
        return transactionService.getTransactionById(id);
    }
    @PreAuthorize("hasAuthority('VIEW_CLIENTS') or @bankAccountService.checkAccountOwner(#accountNumber, principal.userId)")
    @GetMapping("/account/{accountNumber}")
    public PagedResponse<TransactionDto> getTransactionBySenderAccountNumber(
            @PathVariable String accountNumber,
            @RequestParam(required = false) TransactionType transactionType,
            @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<TransactionDto> transactions = transactionService.getTransactionBySenderAccountNumber(accountNumber, transactionType, pageable);
        return new PagedResponse<>(transactions.getContent(), transactions.getTotalElements());
    }

    @PreAuthorize("hasAuthority('VIEW_CLIENTS') or #clientId == principal.userId")
    @GetMapping("/client/{clientId}")
    public PagedResponse<TransactionDto> getTransactionByClientId(
            @PathVariable Long clientId,
            @RequestParam(required = false) TransactionType transactionType,
            @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        Page<TransactionDto> transactions = transactionService.getTransactionByClientId(clientId, transactionType, pageable);
        return new PagedResponse<>(transactions.getContent(), transactions.getTotalElements());
    }

    @PreAuthorize("@bankAccountService.checkAccountOwner(#accountNumber, principal.userId)")
    @PostMapping("/account/{accountNumber}/transfer")
    public Transaction transferMoney(@PathVariable String accountNumber,
                                     @Valid @RequestBody CreateTransactionDTO createTransactionDTO) throws Exception {
        return transactionService.transferMoney(accountNumber, createTransactionDTO);
    }

}
