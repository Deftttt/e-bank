package com.upo.ebank.service;

import com.upo.ebank.model.Client;
import com.upo.ebank.model.Employee;
import com.upo.ebank.model.Loan;
import com.upo.ebank.model.dto.LoanDecisionDTO;
import com.upo.ebank.model.dto.LoanRequest;
import com.upo.ebank.model.enums.LoanStatus;
import com.upo.ebank.repository.ClientRepository;
import com.upo.ebank.repository.EmployeeRepository;
import com.upo.ebank.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoanService {
    private final LoanRepository loanRepository;
    private final ClientRepository clientRepository;
    private final EmployeeRepository employeeRepository;

    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }


    public Loan requestLoan(Long clientId, LoanRequest loanRequest) {
        Client client = clientRepository.findById(clientId).orElseThrow();
        Employee assignedEmployee = employeeRepository.findWithLeastAssignedLoans();

        Loan newLoan = Loan.builder()
                .client(client)
                .employee(assignedEmployee)
                .amount(loanRequest.getAmount())
                .status(LoanStatus.REQUESTED)
                .applicationDate(new Date())
                .startDate(loanRequest.getStartDate())
                .loanTermMonths(loanRequest.getLoanTermMonths())
                .loanPurpose(loanRequest.getLoanPurpose())
                .build();

        return loanRepository.save(newLoan);
    }

    public Loan approveOrRejectLoan(Long loanId, LoanDecisionDTO decisionDTO) {
        Loan loan = loanRepository.findById(loanId).orElseThrow();

        loan.setStatus(decisionDTO.isApprove() ? LoanStatus.APPROVED : LoanStatus.REJECTED);
        loan.setDecisionDate(new Date());
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


    public Employee requestLoan2(Long clientId, LoanRequest loanRequest) {
        Client client = clientRepository.findById(clientId).orElseThrow();
        return employeeRepository.findWithLeastAssignedLoans();
    }

    public boolean isAssignedEmployee(Long employeeId, Long loanId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow();
        Loan loan = loanRepository.findById(loanId).orElseThrow();

        return employee.getId().equals(loan.getEmployee().getId());
    }


}