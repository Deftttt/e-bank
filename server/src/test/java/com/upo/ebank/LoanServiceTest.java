package com.upo.ebank;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

import com.upo.ebank.model.Client;
import com.upo.ebank.model.Employee;
import com.upo.ebank.model.Loan;
import com.upo.ebank.model.dto.loan.*;
import com.upo.ebank.model.enums.LoanStatus;
import com.upo.ebank.repository.ClientRepository;
import com.upo.ebank.repository.EmployeeRepository;
import com.upo.ebank.repository.LoanRepository;
import com.upo.ebank.service.LoanService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class LoanServiceTest {

    @Mock
    private LoanRepository loanRepository;

    @Mock
    private ClientRepository clientRepository;

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private LoanService loanService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetLoans() {
        Pageable pageable = PageRequest.of(0, 10);
        Loan loan = new Loan();
        Page<Loan> loanPage = new PageImpl<>(Arrays.asList(loan));
        LoanDto loanDto = new LoanDto();

        when(loanRepository.findAll(pageable)).thenReturn(loanPage);
        when(modelMapper.map(loan, LoanDto.class)).thenReturn(loanDto);

        List<LoanDto> result = loanService.getLoans(null, pageable);

        assertEquals(1, result.size());
        verify(loanRepository).findAll(pageable);
    }

    @Test
    public void testGetLoansByStatus() {
        Pageable pageable = PageRequest.of(0, 10);
        Loan loan = new Loan();
        Page<Loan> loanPage = new PageImpl<>(Arrays.asList(loan));
        LoanDto loanDto = new LoanDto();

        when(loanRepository.findByStatus(LoanStatus.REQUESTED, pageable)).thenReturn(loanPage);
        when(modelMapper.map(loan, LoanDto.class)).thenReturn(loanDto);

        List<LoanDto> result = loanService.getLoans(LoanStatus.REQUESTED, pageable);

        assertEquals(1, result.size());
        verify(loanRepository).findByStatus(LoanStatus.REQUESTED, pageable);
    }

    @Test
    public void testGetLoansByEmployee() {
        Pageable pageable = PageRequest.of(0, 10);
        Loan loan = new Loan();
        Page<Loan> loanPage = new PageImpl<>(Arrays.asList(loan));
        LoanDto loanDto = new LoanDto();

        when(loanRepository.findByEmployeeId(1L, pageable)).thenReturn(loanPage);
        when(modelMapper.map(loan, LoanDto.class)).thenReturn(loanDto);

        List<LoanDto> result = loanService.getLoansByEmployee(1L, null, pageable);

        assertEquals(1, result.size());
        verify(loanRepository).findByEmployeeId(1L, pageable);
    }

    @Test
    public void testGetLoansByClient() {
        Pageable pageable = PageRequest.of(0, 10);
        Loan loan = new Loan();
        Page<Loan> loanPage = new PageImpl<>(Arrays.asList(loan));
        LoanDto loanDto = new LoanDto();

        when(loanRepository.findByClientId(1L, pageable)).thenReturn(loanPage);
        when(modelMapper.map(loan, LoanDto.class)).thenReturn(loanDto);

        List<LoanDto> result = loanService.getLoansByClient(1L, null, pageable);

        assertEquals(1, result.size());
        verify(loanRepository).findByClientId(1L, pageable);
    }


    @Test
    public void testRequestLoan() {
        Client client = new Client();
        Employee employee = new Employee();
        Loan loan = new Loan();
        LoanRequest loanRequest = new LoanRequest();

        loanRequest.setAmount(BigDecimal.valueOf(1000));
        loanRequest.setLoanPurpose("Home Improvement");
        loanRequest.setLoanTermMonths(12);
        loanRequest.setStartDate(LocalDate.now());

        when(clientRepository.findById(1L)).thenReturn(Optional.of(client));
        when(employeeRepository.findWithLeastAssignedLoans()).thenReturn(employee);
        when(loanRepository.save(any(Loan.class))).thenReturn(loan);

        Loan result = loanService.requestLoan(1L, loanRequest);

        assertNotNull(result);
        verify(loanRepository).save(any(Loan.class));
    }

    @Test
    public void testApproveOrDenyLoanByEmployee() {
        Loan loan = new Loan();
        loan.setLoanTermMonths(12);
        loan.setAmount(BigDecimal.valueOf(1000));
        LoanDecision decision = new LoanDecision();
        decision.setApproved(true);

        when(loanRepository.findById(1L)).thenReturn(Optional.of(loan));
        when(loanRepository.save(any(Loan.class))).thenReturn(loan);

        Loan result = loanService.approveOrDenyLoanByEmployee(1L, decision);

        assertNotNull(result);
        assertEquals(LoanStatus.APPROVED, result.getStatus());
        verify(loanRepository).save(any(Loan.class));
    }

    @Test
    public void testAcceptOrRejectLoanByClient() {
        Loan loan = new Loan();
        loan.setStatus(LoanStatus.APPROVED);

        when(loanRepository.findById(1L)).thenReturn(Optional.of(loan));
        when(loanRepository.save(any(Loan.class))).thenReturn(loan);

        Loan result = loanService.acceptOrRejectLoanByClient(1L, true);

        assertNotNull(result);
        assertEquals(LoanStatus.ACCEPTED, result.getStatus());
        verify(loanRepository).save(any(Loan.class));
    }

    @Test
    public void testIsAssignedEmployee() {
        Loan loan = new Loan();
        Employee employee = new Employee();
        employee.setId(1L);
        loan.setEmployee(employee);

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));
        when(loanRepository.findById(1L)).thenReturn(Optional.of(loan));

        boolean result = loanService.isAssignedEmployee(1L, 1L);

        assertTrue(result);
        verify(employeeRepository).findById(1L);
        verify(loanRepository).findById(1L);
    }

    @Test
    public void testIsAssignedClient() {
        Loan loan = new Loan();
        Client client = new Client();
        client.setId(1L);
        loan.setClient(client);

        when(clientRepository.findById(1L)).thenReturn(Optional.of(client));
        when(loanRepository.findById(1L)).thenReturn(Optional.of(loan));

        boolean result = loanService.isAssignedClient(1L, 1L);

        assertTrue(result);
        verify(clientRepository).findById(1L);
        verify(loanRepository).findById(1L);
    }
}
