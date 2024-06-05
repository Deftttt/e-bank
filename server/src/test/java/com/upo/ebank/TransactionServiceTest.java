package com.upo.ebank;

import com.upo.ebank.exception.BankAccountException;
import com.upo.ebank.model.BankAccount;
import com.upo.ebank.model.Client;
import com.upo.ebank.model.Transaction;
import com.upo.ebank.model.dto.transaction.CreateTransactionDTO;
import com.upo.ebank.model.dto.transaction.TransactionDetailsDto;
import com.upo.ebank.model.dto.transaction.TransactionDto;
import com.upo.ebank.model.enums.TransactionType;
import com.upo.ebank.repository.BankAccountRepository;
import com.upo.ebank.repository.TransactionRepository;
import com.upo.ebank.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private BankAccountRepository bankAccountRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private TransactionService transactionService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllTransactions() {
        List<Transaction> transactions = Arrays.asList(new Transaction(), new Transaction());
        Page<Transaction> transactionPage = new PageImpl<>(transactions, PageRequest.of(0, 10), transactions.size());
        when(transactionRepository.findAll(any(Pageable.class))).thenReturn(transactionPage);
        when(modelMapper.map(any(Transaction.class), eq(TransactionDto.class))).thenReturn(new TransactionDto());

        Page<TransactionDto> result = transactionService.getAllTransactions(PageRequest.of(0, 10));

        assertNotNull(result);
        assertEquals(transactions.size(), result.getTotalElements());
    }

    @Test
    public void testTransferMoney() throws Exception {
        CreateTransactionDTO createTransactionDTO = new CreateTransactionDTO();
        createTransactionDTO.setAmount(BigDecimal.valueOf(100.0));
        createTransactionDTO.setMessage("Test Transfer");
        createTransactionDTO.setRecipientAccountNumber("987654321");

        BankAccount sender = new BankAccount();
        sender.setAccountNumber("12345");
        sender.setBalance(BigDecimal.valueOf(200.0));

        BankAccount recipient = new BankAccount();
        recipient.setAccountNumber("987654321");
        recipient.setBalance(BigDecimal.valueOf(50.0));

        Transaction transaction = new Transaction();
        transaction.setId(1L);
        transaction.setSenderAccount(sender);
        transaction.setRecipientAccount(recipient);

        when(bankAccountRepository.findByAccountNumber("12345")).thenReturn(sender);
        when(bankAccountRepository.findById("987654321")).thenReturn(Optional.of(recipient));
        when(bankAccountRepository.existsById("987654321")).thenReturn(true);
        when(modelMapper.map(any(CreateTransactionDTO.class), eq(Transaction.class))).thenReturn(transaction);
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        Transaction result = transactionService.transferMoney("12345", createTransactionDTO);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(bankAccountRepository, times(1)).save(sender);
        verify(bankAccountRepository, times(1)).save(recipient);
    }

    @Test
    public void testGetTransactionById() {
        Transaction transaction = new Transaction();
        transaction.setId(1L);
        BankAccount senderAccount = new BankAccount();
        Client senderClient = new Client();
        senderClient.setId(1L);
        senderAccount.setClient(senderClient);
        transaction.setSenderAccount(senderAccount);

        BankAccount recipientAccount = new BankAccount();
        Client recipientClient = new Client();
        recipientClient.setId(2L);
        recipientAccount.setClient(recipientClient);
        transaction.setRecipientAccount(recipientAccount);

        when(transactionRepository.findById(anyLong())).thenReturn(Optional.of(transaction));
        when(modelMapper.map(any(Transaction.class), eq(TransactionDetailsDto.class))).thenReturn(new TransactionDetailsDto());

        TransactionDetailsDto result = transactionService.getTransactionById(1L);

        assertNotNull(result);
    }

    @Test
    public void testGetTransactionBySenderAccountNumber() {
        List<Transaction> transactions = Arrays.asList(new Transaction(), new Transaction());
        Page<Transaction> transactionPage = new PageImpl<>(transactions, PageRequest.of(0, 10), transactions.size());

        when(transactionRepository.findTransactionsByAccountNumber(anyString(), any(Pageable.class))).thenReturn(transactionPage);
        when(modelMapper.map(any(Transaction.class), eq(TransactionDto.class))).thenReturn(new TransactionDto());

        Page<TransactionDto> result = transactionService.getTransactionBySenderAccountNumber("12345", null, PageRequest.of(0, 10));

        assertNotNull(result);
        assertEquals(transactions.size(), result.getTotalElements());
    }

    @Test
    public void testGetTransactionByClientId() {
        List<Transaction> transactions = Arrays.asList(new Transaction(), new Transaction());
        Page<Transaction> transactionPage = new PageImpl<>(transactions, PageRequest.of(0, 10), transactions.size());

        when(transactionRepository.findTransactionsByClientId(anyLong(), any(Pageable.class))).thenReturn(transactionPage);
        when(modelMapper.map(any(Transaction.class), eq(TransactionDto.class))).thenReturn(new TransactionDto());

        Page<TransactionDto> result = transactionService.getTransactionByClientId(1L, null, PageRequest.of(0, 10));

        assertNotNull(result);
        assertEquals(transactions.size(), result.getTotalElements());
    }

    @Test
    public void testCheckTransactionOwner() {
        Transaction transaction = new Transaction();
        BankAccount senderAccount = new BankAccount();
        Client senderClient = new Client();
        senderClient.setId(1L);
        senderAccount.setClient(senderClient);
        transaction.setSenderAccount(senderAccount);

        BankAccount recipientAccount = new BankAccount();
        Client recipientClient = new Client();
        recipientClient.setId(2L);
        recipientAccount.setClient(recipientClient);
        transaction.setRecipientAccount(recipientAccount);

        when(transactionRepository.findById(anyLong())).thenReturn(Optional.of(transaction));

        boolean result = transactionService.checkTransactionOwner(1L, 1L);

        assertTrue(result);

        result = transactionService.checkTransactionOwner(1L, 2L);

        assertTrue(result);

        result = transactionService.checkTransactionOwner(1L, 3L);

        assertFalse(result);
    }
}
