package com.upo.ebank;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.upo.ebank.controller.TransactionController;
import com.upo.ebank.model.Transaction;
import com.upo.ebank.model.dto.transaction.CreateTransactionDTO;
import com.upo.ebank.model.dto.transaction.TransactionDetailsDto;
import com.upo.ebank.model.dto.transaction.TransactionDto;
import com.upo.ebank.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.Mockito.*;

public class TransactionControllerTest {

    @Mock
    private TransactionService transactionService;

    @InjectMocks
    private TransactionController transactionController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(transactionController)
                .setCustomArgumentResolvers(new PageableHandlerMethodArgumentResolver())
                .build();
    }

    @Test
    @WithMockUser(authorities = "VIEW_TRANSACTIONS")
    public void testGetAllTransactions() throws Exception {
        List<TransactionDto> transactionList = Arrays.asList(new TransactionDto(), new TransactionDto());
        Page<TransactionDto> transactionPage = new PageImpl<>(transactionList, PageRequest.of(0, 10), transactionList.size());

        when(transactionService.getAllTransactions(any())).thenReturn(transactionPage);

        mockMvc.perform(get("/transactions"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.totalElements").value(transactionList.size()));
    }

    @Test
    @WithMockUser(authorities = "VIEW_TRANSACTIONS")
    public void testGetTransactionById() throws Exception {
        TransactionDetailsDto transactionDetailsDto = new TransactionDetailsDto();
        transactionDetailsDto.setId(1L);

        when(transactionService.getTransactionById(anyLong())).thenReturn(transactionDetailsDto);

        mockMvc.perform(get("/transactions/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }

    @Test
    @WithMockUser(authorities = "VIEW_TRANSACTIONS")
    public void testGetTransactionBySenderAccountNumber() throws Exception {
        List<TransactionDto> transactionList = Arrays.asList(new TransactionDto(), new TransactionDto());
        Page<TransactionDto> transactionPage = new PageImpl<>(transactionList, PageRequest.of(0, 10), transactionList.size());

        when(transactionService.getTransactionBySenderAccountNumber(anyString(), any(), any())).thenReturn(transactionPage);

        mockMvc.perform(get("/transactions/account/12345"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.totalElements").value(transactionList.size()));
    }

    @Test
    @WithMockUser(authorities = "VIEW_TRANSACTIONS")
    public void testGetTransactionByClientId() throws Exception {
        List<TransactionDto> transactionList = Arrays.asList(new TransactionDto(), new TransactionDto());
        Page<TransactionDto> transactionPage = new PageImpl<>(transactionList, PageRequest.of(0, 10), transactionList.size());

        when(transactionService.getTransactionByClientId(anyLong(), any(), any())).thenReturn(transactionPage);

        mockMvc.perform(get("/transactions/client/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.totalElements").value(transactionList.size()));
    }

    @Test
    @WithMockUser(authorities = "USER_RIGHTS")
    public void testTransferMoney() throws Exception {
        CreateTransactionDTO createTransactionDTO = new CreateTransactionDTO();
        createTransactionDTO.setAmount(BigDecimal.valueOf(100.0));
        createTransactionDTO.setMessage("Test Transfer");
        createTransactionDTO.setRecipientAccountNumber("987654321");

        Transaction transaction = new Transaction();
        transaction.setId(1L);

        when(transactionService.transferMoney(anyString(), any(CreateTransactionDTO.class))).thenReturn(transaction);

        mockMvc.perform(post("/transactions/account/12345/transfer")
                        .contentType("application/json")
                        .content(new ObjectMapper().writeValueAsString(createTransactionDTO)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }
}

