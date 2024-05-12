package com.upo.ebank.service;

import com.upo.ebank.model.Client;
import com.upo.ebank.model.Employee;
import com.upo.ebank.model.Loan;
import com.upo.ebank.model.dto.LoanRequest;
import com.upo.ebank.model.enums.LoanStatus;
import com.upo.ebank.repository.ClientRepository;
import com.upo.ebank.repository.EmployeeRepository;
import com.upo.ebank.repository.LoanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
                .loanTermMonths(loanRequest.getLoanTermMonths())
                .loanPurpose(loanRequest.getLoanPurpose())
                .build();

        return loanRepository.save(newLoan);
    }


    public Employee requestLoan2(Long clientId, LoanRequest loanRequest) {
        Client client = clientRepository.findById(clientId).orElseThrow();
        return employeeRepository.findWithLeastAssignedLoans();
    }


}