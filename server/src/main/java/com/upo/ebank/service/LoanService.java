package com.upo.ebank.service;

import com.upo.ebank.model.Client;
import com.upo.ebank.model.Employee;
import com.upo.ebank.model.Loan;
import com.upo.ebank.model.dto.LoanDecision;
import com.upo.ebank.model.dto.LoanDto;
import com.upo.ebank.model.dto.LoanRequest;
import com.upo.ebank.model.enums.LoanStatus;
import com.upo.ebank.repository.ClientRepository;
import com.upo.ebank.repository.EmployeeRepository;
import com.upo.ebank.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoanService {
    private final LoanRepository loanRepository;
    private final ClientRepository clientRepository;
    private final EmployeeRepository employeeRepository;
    private final ModelMapper modelMapper;

    public List<LoanDto> getLoans(LoanStatus status, Pageable pageable) {
        Page<Loan> loans;
        if (status != null) {
            loans = loanRepository.findByStatus(status, pageable);
        } else {
            loans = loanRepository.findAll(pageable);
        }
        return loans.stream()
                .map(loan -> modelMapper.map(loan, LoanDto.class))
                .collect(Collectors.toList());
    }

    public List<LoanDto> getLoansByEmployee(Long employeeId, LoanStatus status, Pageable pageable) {
        Page<Loan> loans;
        if (status != null) {
            loans = loanRepository.findByEmployeeIdAndStatus(employeeId, status, pageable);
        } else {
            loans = loanRepository.findByEmployeeId(employeeId, pageable);
        }
        return loans.stream()
                .map(loan -> modelMapper.map(loan, LoanDto.class))
                .collect(Collectors.toList());
    }

    public List<LoanDto> getLoansByClient(Long clientId, LoanStatus status, Pageable pageable) {
        Page<Loan> loans;
        if (status != null) {
            loans = loanRepository.findByClientIdAndStatus(clientId, status, pageable);
        } else {
            loans = loanRepository.findByClientId(clientId, pageable);
        }
        return loans.stream()
                .map(loan -> modelMapper.map(loan, LoanDto.class))
                .collect(Collectors.toList());
    }

    public Loan getLoan(Long id){
        return loanRepository.findById(id).orElseThrow();
    }


    public Loan requestLoan(Long clientId, LoanRequest loanRequest) {
        Client client = clientRepository.findById(clientId).orElseThrow();
        Employee assignedEmployee = employeeRepository.findWithLeastAssignedLoans();

        Loan newLoan = Loan.builder()
                .client(client)
                .employee(assignedEmployee)
                .amount(loanRequest.getAmount())
                .status(LoanStatus.REQUESTED)
                .applicationDate(LocalDateTime.now())
                .startDate(loanRequest.getStartDate())
                .loanTermMonths(loanRequest.getLoanTermMonths())
                .loanPurpose(loanRequest.getLoanPurpose())
                .build();

        return loanRepository.save(newLoan);
    }

    public Loan approveOrRejectLoan(Long loanId, LoanDecision decisionDTO) {
        Loan loan = loanRepository.findById(loanId).orElseThrow();

        loan.setStatus(decisionDTO.isApprove() ? LoanStatus.APPROVED : LoanStatus.REJECTED);
        loan.setDecisionDate(LocalDateTime.now());
        loan.setComment(decisionDTO.getComment());

        if (decisionDTO.isApprove()) {
            // Tutaj jakas funkcyjna co obliczy na podstawie czasu, kwoty, etc.
            double interestRate = 3.5;
            loan.setInterestRate(interestRate);

            BigDecimal interestMultiplier = BigDecimal.valueOf(1 + interestRate / 100);
            BigDecimal totalRepayment = loan.getAmount().multiply(interestMultiplier);
            BigDecimal monthlyRepayment = totalRepayment.divide(BigDecimal.valueOf(loan.getLoanTermMonths()), RoundingMode.HALF_UP);

            loan.setTotalRepaymentAmount(totalRepayment);
            loan.setMonthlyRepaymentAmount(monthlyRepayment);
        }

        return loanRepository.save(loan);
    }


    public boolean isAssignedEmployee(Long employeeId, Long loanId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow();
        Loan loan = loanRepository.findById(loanId).orElseThrow();

        return employee.getId().equals(loan.getEmployee().getId());
    }

    public boolean isAssignedClient(Long clientId, Long loanId) {
        Client client = clientRepository.findById(clientId).orElseThrow();
        Loan loan = loanRepository.findById(loanId).orElseThrow();

        return client.getId().equals(loan.getClient().getId());
    }


}