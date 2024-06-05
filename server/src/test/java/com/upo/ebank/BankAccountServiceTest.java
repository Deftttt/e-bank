package com.upo.ebank;

import com.upo.ebank.model.BankAccount;
import com.upo.ebank.model.Client;
import com.upo.ebank.model.dto.account.BankAccountDetailsDto;
import com.upo.ebank.model.dto.account.BankAccountDto;
import com.upo.ebank.model.dto.account.ClientCreateBankAccountDto;
import com.upo.ebank.model.dto.account.EmployeeCreateBankAccountDto;
import com.upo.ebank.model.enums.AccountType;
import com.upo.ebank.repository.BankAccountRepository;
import com.upo.ebank.repository.ClientRepository;
import com.upo.ebank.service.BankAccountService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class BankAccountServiceTest {

    @Mock
    private BankAccountRepository bankAccountRepository;

    @Mock
    private ClientRepository clientRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private BankAccountService bankAccountService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetBankAccounts() {
        Page<BankAccount> page = new PageImpl<>(Arrays.asList(new BankAccount(), new BankAccount()));
        when(bankAccountRepository.findAll(any(PageRequest.class))).thenReturn(page);

        assertEquals(2, bankAccountService.getBankAccounts(null, PageRequest.of(0, 10)).size());
    }

    @Test
    public void testGetBankAccountsByClientId() {
        Page<BankAccount> page = new PageImpl<>(Arrays.asList(new BankAccount(), new BankAccount()));
        when(bankAccountRepository.findByClientId(anyLong(), any(PageRequest.class))).thenReturn(page);

        assertEquals(2, bankAccountService.getBankAccountsByClientId(1L, null, PageRequest.of(0, 10)).size());
    }

    @Test
    public void testGetTotalAccountsNumber() {
        when(bankAccountRepository.count()).thenReturn(10L);

        assertEquals(10L, bankAccountService.getTotalAccountsNumber());
    }

    @Test
    public void testGetTotalAccountsNumberByClientId() {
        when(bankAccountRepository.countByClientId(anyLong())).thenReturn(5L);

        assertEquals(5L, bankAccountService.getTotalAccountsNumberByClientId(1L));
    }

    @Test
    public void testGetBankAccount() {
        BankAccount bankAccount = new BankAccount();
        bankAccount.setAccountNumber("12345");
        Client client = new Client();
        client.setFirstName("John");
        client.setLastName("Doe");
        bankAccount.setClient(client);

        when(bankAccountRepository.findById(anyString())).thenReturn(Optional.of(bankAccount));
        when(modelMapper.map(any(BankAccount.class), eq(BankAccountDetailsDto.class))).thenReturn(new BankAccountDetailsDto());

        BankAccountDetailsDto detailsDto = bankAccountService.getBankAccount("12345");
        assertNotNull(detailsDto);
    }

    @Test
    public void testCheckAccountOwner() {
        BankAccount bankAccount = new BankAccount();
        Client client = new Client();
        client.setId(1L);
        bankAccount.setClient(client);
        when(bankAccountRepository.findById(anyString())).thenReturn(Optional.of(bankAccount));

        assertTrue(bankAccountService.checkAccountOwner("12345", 1L));
    }

    @Test
    public void testCreateBankAccountForClient() {
        Client client = new Client();
        client.setId(1L);
        when(clientRepository.findById(anyLong())).thenReturn(Optional.of(client));

        ClientCreateBankAccountDto createBankAccountDto = new ClientCreateBankAccountDto();
        createBankAccountDto.setAccountType(AccountType.PERSONAL_ACCOUNT);

        BankAccount bankAccount = new BankAccount();
        bankAccount.setAccountNumber("12345");
        when(bankAccountRepository.save(any(BankAccount.class))).thenReturn(bankAccount);

        BankAccount createdAccount = bankAccountService.createBankAccount(1L, createBankAccountDto);
        assertNotNull(createdAccount);
        assertEquals("12345", createdAccount.getAccountNumber());
    }

    @Test
    public void testBlockAccount() {
        BankAccount bankAccount = new BankAccount();
        when(bankAccountRepository.findById(anyString())).thenReturn(Optional.of(bankAccount));

        bankAccountService.blockAccount("12345");
        assertTrue(bankAccount.isBlocked());
        verify(bankAccountRepository, times(1)).save(bankAccount);
    }

    @Test
    public void testUnblockAccount() {
        BankAccount bankAccount = new BankAccount();
        bankAccount.setBlocked(true);
        when(bankAccountRepository.findById(anyString())).thenReturn(Optional.of(bankAccount));

        bankAccountService.unblockAccount("12345");
        assertFalse(bankAccount.isBlocked());
        verify(bankAccountRepository, times(1)).save(bankAccount);
    }
}
