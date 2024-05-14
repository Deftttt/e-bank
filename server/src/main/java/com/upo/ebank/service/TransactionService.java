package com.upo.ebank.service;

import com.upo.ebank.model.BankAccount;
import com.upo.ebank.model.Transaction;
import com.upo.ebank.model.dto.CreateTransactionDTO;
import com.upo.ebank.model.dto.TransactionDetailsDTO;
import com.upo.ebank.model.dto.TransactionDto;
import com.upo.ebank.repository.BankAccountRepository;
import com.upo.ebank.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final BankAccountRepository bankAccountRepository;
    private final ModelMapper modelMapper;

    public List<TransactionDto> getAllTransactions(){
        List<Transaction> transactions = transactionRepository.findAll();

        return transactions.stream()
                .map(transaction -> modelMapper.map(transaction, TransactionDto.class))
                .collect(Collectors.toList());

    }

    public Transaction createTransaction(CreateTransactionDTO createTransactionDTO) {
        BankAccount sender = bankAccountRepository.findById(createTransactionDTO.getSenderAccountNumber()).orElseThrow();
        BankAccount recipient = bankAccountRepository.findById(createTransactionDTO.getRecipientAccountNumber()).orElseThrow();

        Transaction transaction = modelMapper.map(createTransactionDTO, Transaction.class);
        transaction.setSenderAccount(sender);
        transaction.setRecipientAccount(recipient);

        transactionRepository.save(transaction);

        return transaction;
    }

    public Transaction transferMoney(CreateTransactionDTO createTransactionDTO) throws Exception {
        validateTransferRequest(createTransactionDTO);

        BankAccount sender = bankAccountRepository.findById(createTransactionDTO.getSenderAccountNumber()).orElseThrow();
        BankAccount recipient = bankAccountRepository.findById(createTransactionDTO.getRecipientAccountNumber()).orElseThrow();

        sender.setBalance(sender.getBalance().subtract(createTransactionDTO.getAmount()));
        bankAccountRepository.save(sender);

        recipient.setBalance(recipient.getBalance().add(createTransactionDTO.getAmount()));
        bankAccountRepository.save(recipient);

        Transaction transaction = modelMapper.map(createTransactionDTO, Transaction.class);
        transaction.setSenderAccount(sender);
        transaction.setRecipientAccount(recipient);
        transactionRepository.save(transaction);

        return transaction;
    }

    public void validateTransferRequest(CreateTransactionDTO createTransactionDTO) throws Exception {
        validateAccountExists(createTransactionDTO.getSenderAccountNumber(), "Sender account not found");
        validateAccountExists(createTransactionDTO.getRecipientAccountNumber(), "Recipient account not found");
        validateSufficientBalance(createTransactionDTO);
    }

    private void validateAccountExists(String accountNumber, String errorMessage) throws Exception {
        if (!bankAccountRepository.existsById(accountNumber)) {
            throw new Exception(errorMessage);
        }
    }

    private void validateSufficientBalance(CreateTransactionDTO createTransactionDTO) throws Exception {
        BankAccount sender = bankAccountRepository.findById(createTransactionDTO.getSenderAccountNumber()).orElseThrow();
        if (sender.getBalance().compareTo(createTransactionDTO.getAmount()) < 0) {
            throw new Exception("Insufficient balance");
        }
    }

    public TransactionDto getTransactionById(Long id) {
        Transaction transaction = transactionRepository.findById(id).orElseThrow();
        return modelMapper.map(transaction,TransactionDto.class);
    }

    private Transaction getTransaction(Long transactionId) {
        return transactionRepository.findById(transactionId).orElseThrow();
    }

    public List<TransactionDto> getTransactionBySenderAccountNumber(String accountNumber, String transactionType) {
        List<Transaction> transactions;
        if("outgoing".equals(transactionType)) {
            transactions = transactionRepository.findOutgoingTransactionsBySenderAccountNumber(accountNumber);
        } else if ("incoming".equals(transactionType)) {
            transactions = transactionRepository.findIncomingTransactionsByAccountNumber(accountNumber);
        } else {
            transactions = transactionRepository.findTransactionsByAccountNumber(accountNumber);
        }

        return transactions.stream()
                .map(transaction -> modelMapper.map(transaction, TransactionDto.class))
                .collect(Collectors.toList());
    }

    public List<TransactionDto> getTransactionByClientId(Long clientId, String transactionType) {
        List<Transaction> transactions;
        if("outgoing".equals(transactionType)) {
            transactions = transactionRepository.findOutgoingTransactionsByClientId(clientId);
        } else if ("incoming".equals(transactionType)) {
            transactions = transactionRepository.findIncomingTransactionsByClientId(clientId);
        } else {
            transactions = transactionRepository.findTransactionsByClientId(clientId);
        }

        return transactions.stream()
                .map(transaction -> modelMapper.map(transaction, TransactionDto.class))
                .collect(Collectors.toList());
    }

    public boolean checkTransactionOwner(Long transactionId, Long userId) {
        Transaction transaction = getTransaction(transactionId);
        return (transaction.getSenderAccount().getClient().getId().equals(userId)
                || transaction.getRecipientAccount().getClient().getId().equals(userId));
    }



}
