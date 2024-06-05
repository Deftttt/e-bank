package com.upo.ebank;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.upo.ebank.controller.BankAccountController;
import com.upo.ebank.model.BankAccount;
import com.upo.ebank.model.dto.PagedResponse;
import com.upo.ebank.model.dto.account.BankAccountDetailsDto;
import com.upo.ebank.model.dto.account.BankAccountDto;
import com.upo.ebank.model.dto.account.ClientCreateBankAccountDto;
import com.upo.ebank.model.dto.account.EmployeeCreateBankAccountDto;
import com.upo.ebank.model.enums.AccountType;
import com.upo.ebank.security.UserPrincipal;
import com.upo.ebank.service.BankAccountService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.*;

public class BankAccountControllerTest {

    @Mock
    private BankAccountService bankAccountService;

    @InjectMocks
    private BankAccountController bankAccountController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(bankAccountController)
                .setCustomArgumentResolvers(new PageableHandlerMethodArgumentResolver())
                .build();
    }

    @Test
    @WithMockUser(authorities = "VIEW_ACCOUNTS")
    public void testGetAllAccounts() throws Exception {
        BankAccountDto accountDto1 = new BankAccountDto();
        accountDto1.setAccountNumber("12345");
        accountDto1.setBalance(BigDecimal.valueOf(1000));
        accountDto1.setOpeningDate(new Date());
        accountDto1.setAccountType(AccountType.PERSONAL_ACCOUNT);
        accountDto1.setClientId(1L);
        accountDto1.setBlocked(false);

        BankAccountDto accountDto2 = new BankAccountDto();
        accountDto2.setAccountNumber("67890");
        accountDto2.setBalance(BigDecimal.valueOf(2000));
        accountDto2.setOpeningDate(new Date());
        accountDto2.setAccountType(AccountType.INVESTMENT_ACCOUNT);
        accountDto2.setClientId(2L);
        accountDto2.setBlocked(false);

        List<BankAccountDto> accountList = Arrays.asList(accountDto1, accountDto2);
        Page<BankAccountDto> accountPage = new PageImpl<>(accountList, PageRequest.of(0, 10), accountList.size());

        when(bankAccountService.getBankAccounts(any(), any())).thenReturn(accountList);
        when(bankAccountService.getTotalAccountsNumber(any())).thenReturn((long) accountList.size());

        mockMvc.perform(get("/accounts")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sort", "accountNumber,asc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.totalElements").value(accountList.size()));
    }

    @Test
    @WithMockUser(authorities = "VIEW_ACCOUNTS")
    public void testGetAccount() throws Exception {
        BankAccountDetailsDto accountDetailsDto = new BankAccountDetailsDto();
        accountDetailsDto.setAccountNumber("12345");
        accountDetailsDto.setBalance(BigDecimal.valueOf(1000));
        accountDetailsDto.setOpeningDate(new Date());
        accountDetailsDto.setAccountType(AccountType.PERSONAL_ACCOUNT);
        accountDetailsDto.setClientId(1L);
        accountDetailsDto.setClientFirstName("John");
        accountDetailsDto.setClientLastName("Doe");
        accountDetailsDto.setBlocked(false);

        when(bankAccountService.getBankAccount("12345")).thenReturn(accountDetailsDto);

        mockMvc.perform(get("/accounts/12345"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accountNumber").value("12345"))
                .andExpect(jsonPath("$.balance").value(1000))
                .andExpect(jsonPath("$.clientId").value(1L));
    }

    @Test
    @WithMockUser(authorities = "VIEW_ACCOUNTS")
    public void testGetAccountsByClientId() throws Exception {
        BankAccountDto accountDto = new BankAccountDto();
        accountDto.setAccountNumber("12345");
        accountDto.setBalance(BigDecimal.valueOf(1000));
        accountDto.setOpeningDate(new Date());
        accountDto.setAccountType(AccountType.PERSONAL_ACCOUNT);
        accountDto.setClientId(1L);
        accountDto.setBlocked(false);

        List<BankAccountDto> accountList = Arrays.asList(accountDto);
        Page<BankAccountDto> accountPage = new PageImpl<>(accountList, PageRequest.of(0, 10), accountList.size());

        when(bankAccountService.getBankAccountsByClientId(anyLong(), any(), any())).thenReturn(accountList);
        when(bankAccountService.getTotalAccountsNumberByClientId(anyLong(), any())).thenReturn((long) accountList.size());

        mockMvc.perform(get("/accounts/clients/1")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sort", "accountNumber,asc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.totalElements").value(accountList.size()));
    }


    @Test
    @WithMockUser(authorities = "MANAGE_ACCOUNTS")
    public void testCreateAccountForClient() throws Exception {
        EmployeeCreateBankAccountDto createBankAccountDto = new EmployeeCreateBankAccountDto();
        createBankAccountDto.setAccountType(AccountType.PERSONAL_ACCOUNT);

        BankAccount createdAccount = new BankAccount();
        createdAccount.setAccountNumber("12345");
        createdAccount.setBalance(BigDecimal.ZERO);
        createdAccount.setOpeningDate(new Date());
        createdAccount.setAccountType(AccountType.PERSONAL_ACCOUNT);
        createdAccount.setClient(null); // Add client object if necessary
        createdAccount.setBlocked(false);

        when(bankAccountService.createBankAccount(anyLong(), any(EmployeeCreateBankAccountDto.class))).thenReturn(createdAccount);

        mockMvc.perform(post("/accounts/clients/1")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(createBankAccountDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.accountNumber").value("12345"));
    }

    @Test
    @WithMockUser(authorities = "MANAGE_ACCOUNTS")
    public void testBlockAccount() throws Exception {
        doNothing().when(bankAccountService).blockAccount(anyString());

        mockMvc.perform(post("/accounts/12345/block"))
                .andExpect(status().isNoContent());

        verify(bankAccountService, times(1)).blockAccount("12345");
    }

    @Test
    @WithMockUser(authorities = "MANAGE_ACCOUNTS")
    public void testUnblockAccount() throws Exception {
        doNothing().when(bankAccountService).unblockAccount(anyString());

        mockMvc.perform(post("/accounts/12345/unblock"))
                .andExpect(status().isNoContent());

        verify(bankAccountService, times(1)).unblockAccount("12345");
    }
}
