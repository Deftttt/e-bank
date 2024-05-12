package com.upo.ebank.controller;

import com.upo.ebank.model.Loan;
import com.upo.ebank.model.dto.LoanDecision;
import com.upo.ebank.model.dto.LoanDto;
import com.upo.ebank.model.dto.LoanRequest;
import com.upo.ebank.model.enums.LoanStatus;
import com.upo.ebank.security.UserPrincipal;
import com.upo.ebank.service.LoanService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/loans")
@RequiredArgsConstructor
public class LoanController {

    private final LoanService loanService;

    @PreAuthorize("hasAuthority('APPROVE_LOANS')")
    @GetMapping("")
    public List<LoanDto> getAllLoans(@RequestParam(required = false) LoanStatus status,
                                     @PageableDefault(sort = "amount", direction = Sort.Direction.ASC) Pageable pageable) {
        return loanService.getLoans(status, pageable);
    }

    @PreAuthorize("hasAuthority('APPROVE_LOANS') or #employeeId == principal.userId")
    @GetMapping("/employee/{employeeId}")
    public List<LoanDto> getLoansByEmployee(@PathVariable Long employeeId,
                                            @RequestParam(required = false) LoanStatus status,
                                            @PageableDefault(sort = "amount", direction = Sort.Direction.ASC) Pageable pageable) {
        return loanService.getLoansByEmployee(employeeId, status, pageable);
    }

    @PreAuthorize("hasAuthority('APPROVE_LOANS') or #clientId == principal.userId")
    @GetMapping("/client/{clientId}")
    public List<LoanDto> getLoansByClient(@PathVariable Long clientId,
                                          @RequestParam(required = false) LoanStatus status,
                                          @PageableDefault(sort = "amount", direction = Sort.Direction.ASC) Pageable pageable) {
        return loanService.getLoansByClient(clientId, status, pageable);
    }

    @PreAuthorize("hasAuthority('APPROVE_LOANS') or @loanService.isAssignedClient(principal.userId, #id)")
    @GetMapping("/{id}")
    public Loan getAllLoans(@PathVariable Long id) {
        return loanService.getLoan(id);
    }

    @PostMapping("/request")
    public ResponseEntity<Loan> requestLoan(@AuthenticationPrincipal UserPrincipal userPrincipal, @RequestBody LoanRequest loanRequest) {
        Loan loan = loanService.requestLoan(userPrincipal.getUserId(), loanRequest);
        return ResponseEntity.ok(loan);
    }

    @PreAuthorize("@loanService.isAssignedEmployee(principal.userId, #loanId)")
    @PostMapping("/{loanId}/decision")
    public ResponseEntity<Loan> approveOrRejectLoan(@PathVariable Long loanId, @RequestBody LoanDecision decisionDTO) {
        Loan loan = loanService.approveOrRejectLoan(loanId, decisionDTO);
        return ResponseEntity.ok(loan);
    }


}