package com.upo.ebank;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

import com.upo.ebank.controller.LoanController;
import com.upo.ebank.model.Loan;
import com.upo.ebank.model.dto.loan.LoanDecision;
import com.upo.ebank.model.dto.loan.LoanDetailsDto;
import com.upo.ebank.model.dto.loan.LoanDto;
import com.upo.ebank.model.enums.LoanStatus;
import com.upo.ebank.service.LoanService;
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
import java.util.Arrays;
import java.util.List;

public class LoanControllerTest {

    @Mock
    private LoanService loanService;

    @InjectMocks
    private LoanController loanController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(loanController)
                .setCustomArgumentResolvers(new PageableHandlerMethodArgumentResolver())
                .build();
    }

    @Test
    @WithMockUser(authorities = "VIEW_LOANS")
    public void testGetAllLoans() throws Exception {
        List<LoanDto> loanList = Arrays.asList(new LoanDto(), new LoanDto());
        Page<LoanDto> loanPage = new PageImpl<>(loanList, PageRequest.of(0, 10), loanList.size());

        when(loanService.getLoans(any(), any())).thenReturn(loanList);
        when(loanService.getTotalLoansNumber(any())).thenReturn((long) loanList.size());

        mockMvc.perform(get("/loans"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.totalElements").value(loanList.size()));
    }

    @Test
    @WithMockUser(authorities = "VIEW_LOANS")
    public void testGetLoansByEmployee() throws Exception {
        List<LoanDto> loanList = Arrays.asList(new LoanDto(), new LoanDto());
        Page<LoanDto> loanPage = new PageImpl<>(loanList, PageRequest.of(0, 10), loanList.size());

        when(loanService.getLoansByEmployee(anyLong(), any(), any())).thenReturn(loanList);
        when(loanService.getTotalLoansNumberByEmployee(anyLong(), any())).thenReturn((long) loanList.size());

        mockMvc.perform(get("/loans/employee/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.totalElements").value(loanList.size()));
    }

    @Test
    @WithMockUser(authorities = "VIEW_LOANS")
    public void testGetLoansByClient() throws Exception {
        List<LoanDto> loanList = Arrays.asList(new LoanDto(), new LoanDto());
        Page<LoanDto> loanPage = new PageImpl<>(loanList, PageRequest.of(0, 10), loanList.size());

        when(loanService.getLoansByClient(anyLong(), any(), any())).thenReturn(loanList);
        when(loanService.getTotalLoansNumberByClient(anyLong(), any())).thenReturn((long) loanList.size());

        mockMvc.perform(get("/loans/client/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.totalElements").value(loanList.size()));
    }

    @Test
    @WithMockUser(authorities = "VIEW_LOANS")
    public void testGetLoan() throws Exception {
        LoanDetailsDto loanDetailsDto = new LoanDetailsDto();
        loanDetailsDto.setId(1L);

        when(loanService.getLoan(anyLong())).thenReturn(loanDetailsDto);

        mockMvc.perform(get("/loans/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L));
    }


    @Test
    @WithMockUser(authorities = "APPROVE_LOANS")
    public void testApproveOrRejectLoan() throws Exception {
        LoanDecision loanDecision = new LoanDecision();
        loanDecision.setApproved(true);
        Loan loan = new Loan();
        loan.setId(1L);
        loan.setStatus(LoanStatus.APPROVED);

        when(loanService.approveOrDenyLoanByEmployee(anyLong(), any())).thenReturn(loan);

        mockMvc.perform(post("/loans/1/decision")
                        .contentType("application/json")
                        .content("{ \"approved\": true, \"comment\": \"Approved\" }"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("APPROVED"));
    }

    @Test
    @WithMockUser(authorities = "USER_RIGHTS")
    public void testClientDecision() throws Exception {
        Loan loan = new Loan();
        loan.setId(1L);
        loan.setStatus(LoanStatus.ACCEPTED);

        when(loanService.acceptOrRejectLoanByClient(anyLong(), anyBoolean())).thenReturn(loan);

        mockMvc.perform(put("/loans/1/client-decision?accepted=true"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("ACCEPTED"));
    }


}

