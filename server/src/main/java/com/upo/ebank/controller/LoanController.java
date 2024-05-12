package com.upo.ebank.controller;

import com.upo.ebank.model.Employee;
import com.upo.ebank.model.Loan;
import com.upo.ebank.model.dto.LoanRequest;
import com.upo.ebank.security.UserPrincipal;
import com.upo.ebank.service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/loans")
@RequiredArgsConstructor
public class LoanController {

    private final LoanService loanService;

    @GetMapping("/")
    public List<Loan> getAllLoans(){
        return loanService.getAllLoans();
    }

    @PostMapping("/request")
    public ResponseEntity<?> requestLoan(@AuthenticationPrincipal UserPrincipal userPrincipal, @RequestBody LoanRequest loanRequest) {
        Loan loan = loanService.requestLoan(userPrincipal.getUserId(), loanRequest);
        return ResponseEntity.ok(loan);
    }


}