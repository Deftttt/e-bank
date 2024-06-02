package com.upo.ebank.service;

import com.upo.ebank.exception.BankAccountException;
import com.upo.ebank.exception.InsuficientBalanceException;
import com.upo.ebank.model.BankAccount;
import com.upo.ebank.model.Transaction;
import com.upo.ebank.model.dto.transaction.CreateTransactionDTO;
import com.upo.ebank.model.dto.transaction.TransactionDetailsDto;
import com.upo.ebank.model.dto.transaction.TransactionDto;
import com.upo.ebank.model.enums.TransactionType;
import com.upo.ebank.repository.BankAccountRepository;
import com.upo.ebank.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final BankAccountRepository bankAccountRepository;
    private final ModelMapper modelMapper;

    public Page<TransactionDto> getAllTransactions(Pageable pageable) {
        Page<Transaction> transactions = transactionRepository.findAll(pageable);
        return transactions.map(transaction -> modelMapper.map(transaction, TransactionDto.class));
    }


    public Transaction transferMoney(String accountNumber, CreateTransactionDTO createTransactionDTO) throws Exception {
        validateTransferRequest(createTransactionDTO, accountNumber);

        BankAccount sender = bankAccountRepository.findByAccountNumber(accountNumber);
        BankAccount recipient = bankAccountRepository.findById(createTransactionDTO.getRecipientAccountNumber()).orElseThrow();

        ensureAccountIsNotBlocked(sender);
        ensureAccountIsNotBlocked(recipient);

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

    public void validateTransferRequest(CreateTransactionDTO createTransactionDTO, String senderAccountNumber) {
        validateAccountExists(createTransactionDTO.getRecipientAccountNumber());
        validateSufficientBalance(createTransactionDTO.getAmount(), senderAccountNumber);
        validateDifferentAccounts(createTransactionDTO.getRecipientAccountNumber(), senderAccountNumber);
    }

    private void validateAccountExists(String accountNumber) throws BankAccountException {
        if (!bankAccountRepository.existsById(accountNumber)) {
            throw new BankAccountException("Bank account of given number does not exist");
        }
    }

    private void validateDifferentAccounts(String recipientAccountNumber, String senderAccountNumber) {
        if (recipientAccountNumber.equals(senderAccountNumber)) {
            throw new BankAccountException("Sender and recipient account number must be diffrent");
        }
    }

    private void validateSufficientBalance(BigDecimal amount, String senderAccountNumber) {
        BankAccount sender = bankAccountRepository.findByAccountNumber(senderAccountNumber);
        if (sender.getBalance().compareTo(amount) < 0) {
            throw new InsuficientBalanceException("Insufficient balance");
        }
    }

    public TransactionDetailsDto getTransactionById(Long id) {
        Transaction transaction = transactionRepository.findById(id).orElseThrow();
        TransactionDetailsDto detailsDto =  modelMapper.map(transaction,TransactionDetailsDto.class);
        detailsDto.setSenderName(transaction.getSenderAccount().getClient().getFirstName());
        detailsDto.setSenderSurname(transaction.getSenderAccount().getClient().getLastName());

        detailsDto.setRecipientName(transaction.getRecipientAccount().getClient().getFirstName());
        detailsDto.setRecipientSurname(transaction.getRecipientAccount().getClient().getLastName());

        return detailsDto;
    }

    private Transaction getTransaction(Long transactionId) {
        return transactionRepository.findById(transactionId).orElseThrow();
    }

    public Page<TransactionDto> getTransactionBySenderAccountNumber(String accountNumber, TransactionType transactionType, Pageable pageable) {
        Page<Transaction> transactions;
        if (transactionType == TransactionType.OUTGOING) {
            transactions = transactionRepository.findOutgoingTransactionsBySenderAccountNumber(accountNumber, pageable);
        } else if (transactionType == TransactionType.INCOMING) {
            transactions = transactionRepository.findIncomingTransactionsByAccountNumber(accountNumber, pageable);
        } else {
            transactions = transactionRepository.findTransactionsByAccountNumber(accountNumber, pageable);
        }
        return transactions.map(transaction -> modelMapper.map(transaction, TransactionDto.class));
    }

    public Page<TransactionDto> getTransactionByClientId(Long clientId, TransactionType transactionType, Pageable pageable) {
        Page<Transaction> transactions;
        if (transactionType == TransactionType.OUTGOING) {
            transactions = transactionRepository.findOutgoingTransactionsByClientId(clientId, pageable);
        } else if (transactionType == TransactionType.INCOMING) {
            transactions = transactionRepository.findIncomingTransactionsByClientId(clientId, pageable);
        } else {
            transactions = transactionRepository.findTransactionsByClientId(clientId, pageable);
        }
        return transactions.map(transaction -> modelMapper.map(transaction, TransactionDto.class));
    }

    public boolean checkTransactionOwner(Long transactionId, Long userId) {
        Transaction transaction = getTransaction(transactionId);
        return (transaction.getSenderAccount().getClient().getId().equals(userId)
                || transaction.getRecipientAccount().getClient().getId().equals(userId));
    }

    private void ensureAccountIsNotBlocked(BankAccount account) {
        if (account.isBlocked()) {
            throw new IllegalStateException("Account is blocked");
        }
    }


}
