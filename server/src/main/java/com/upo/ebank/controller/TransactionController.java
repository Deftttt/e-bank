package com.upo.ebank.controller;

import com.upo.ebank.model.Transaction;
import com.upo.ebank.model.dto.CreateTransactionDTO;
import com.upo.ebank.model.dto.TransactionDto;
import com.upo.ebank.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping
    public List<TransactionDto> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    @GetMapping("/{id}")
    public TransactionDto getTransactionById(@PathVariable Long id) { return transactionService.getTransactionById(id);}

    @GetMapping("/account/{accountNumber}")
    public List<TransactionDto> getTransactionBySenderAccountNumber(@PathVariable String accountNumber,
                                                                    @RequestParam(required = false) String transactionType) {
        return transactionService.getTransactionBySenderAccountNumber(accountNumber, transactionType);
    }

    @GetMapping("/client/{clientId}")
    public List<TransactionDto> getTransactionByClientId(@PathVariable Long clientId,
                                                                    @RequestParam(required = false) String transactionType) {
        return transactionService.getTransactionByClientId(clientId, transactionType);
    }

    @PostMapping
    public Transaction createTransaction(@RequestBody CreateTransactionDTO createTransactionDTO) {
        return transactionService.createTransaction(createTransactionDTO);
    }

}
