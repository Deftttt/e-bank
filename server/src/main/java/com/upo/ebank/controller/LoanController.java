package com.upo.ebank.controller;

import com.upo.ebank.model.Loan;
import com.upo.ebank.model.dto.PagedResponse;
import com.upo.ebank.model.dto.loan.*;
import com.upo.ebank.model.enums.LoanStatus;
import com.upo.ebank.security.UserPrincipal;
import com.upo.ebank.service.LoanService;
import jakarta.validation.Valid;
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

    @PreAuthorize("hasAuthority('VIEW_LOANS')")
    @GetMapping("")
    public PagedResponse<LoanDto> getAllLoans(@RequestParam(required = false) LoanStatus status,
                                     @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        List<LoanDto> loans = loanService.getLoans(status, pageable);
        long totalElements = loanService.getTotalLoansNumber(status);
        return new PagedResponse<>(loans, totalElements);
    }

    @PreAuthorize("hasAuthority('VIEW_LOANS')")
    @GetMapping("/employee/{employeeId}")
    public PagedResponse<LoanDto> getLoansByEmployee(@PathVariable Long employeeId,
                                            @RequestParam(required = false) LoanStatus status,
                                            @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        List<LoanDto> loans = loanService.getLoansByEmployee(employeeId, status, pageable);
        long totalElements = loanService.getTotalLoansNumberByEmployee(employeeId, status);
        return new PagedResponse<>(loans, totalElements);
    }

    @PreAuthorize("hasAuthority('VIEW_LOANS') or #clientId == principal.userId")
    @GetMapping("/client/{clientId}")
    public PagedResponse<LoanDto> getLoansByClient(@PathVariable Long clientId,
                                          @RequestParam(required = false) LoanStatus status,
                                          @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        List<LoanDto> loans = loanService.getLoansByClient(clientId, status, pageable);
        long totalElements = loanService.getTotalLoansNumberByClient(clientId, status);
        return new PagedResponse<>(loans, totalElements);
    }

    @PreAuthorize("hasAuthority('VIEW_LOANS') or @loanService.isAssignedClient(principal.userId, #id)")
    @GetMapping("/{id}")
    public LoanDetailsDto getLoan(@PathVariable Long id) {
        return loanService.getLoan(id);
    }

    @PreAuthorize("hasAuthority('USER_RIGHTS')")
    @PostMapping("/request")
    public ResponseEntity<Loan> requestLoan(@AuthenticationPrincipal UserPrincipal userPrincipal, @Valid @RequestBody LoanRequest loanRequest) {
        Loan loan = loanService.requestLoan(userPrincipal.getUserId(), loanRequest);
        return ResponseEntity.ok(loan);
    }

    @PreAuthorize("@loanService.isAssignedEmployee(principal.userId, #loanId)")
    @PostMapping("/{loanId}/decision")
    public ResponseEntity<Loan> approveOrRejectLoan(@PathVariable Long loanId, @Valid @RequestBody LoanDecision decisionDTO) {
        Loan loan = loanService.approveOrDenyLoanByEmployee(loanId, decisionDTO);
        return ResponseEntity.ok(loan);
    }

    @PreAuthorize("@loanService.isAssignedClient(principal.userId, #loanId)")
    @PutMapping("/{loanId}/client-decision")
    public ResponseEntity<Loan> clientDecision(@PathVariable Long loanId, @RequestParam boolean accepted) {
        Loan loan = loanService.acceptOrRejectLoanByClient(loanId, accepted);
        return ResponseEntity.ok(loan);
    }


}