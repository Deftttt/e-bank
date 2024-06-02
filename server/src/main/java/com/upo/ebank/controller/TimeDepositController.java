package com.upo.ebank.controller;
import com.upo.ebank.model.Loan;
import com.upo.ebank.model.TimeDeposit;
import com.upo.ebank.model.dto.PagedResponse;
import com.upo.ebank.model.dto.TimeDepositDetailsDto;
import com.upo.ebank.model.dto.TimeDepositDto;
import com.upo.ebank.model.dto.TimeDepositRequest;
import com.upo.ebank.model.dto.loan.LoanRequest;
import com.upo.ebank.security.UserPrincipal;
import com.upo.ebank.service.TimeDepositService;
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
@RequestMapping("/deposits")
@RequiredArgsConstructor
public class TimeDepositController {
    private final TimeDepositService timeDepositService;

    //@PreAuthorize("hasAuthority('VIEW_DEPOSITS')")
    @GetMapping("")
    public PagedResponse<TimeDepositDto> getAllTimeDeposits(@PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        List<TimeDepositDto> deposits = timeDepositService.getAllTimeDeposits(pageable);
        long totalElements = timeDepositService.getTotalDepositsNumber();
        return new PagedResponse<>(deposits, totalElements);
    }


    //@PreAuthorize("hasAuthority('VIEW_DEPOSITS') or @timeDepositService.checkDepositOwner(#id, principal.userId)")
    @GetMapping("/{id}")
    public TimeDepositDetailsDto getTimeDeposit(@PathVariable Long id) {
        return timeDepositService.getTimeDeposit(id);
    }

   // @PreAuthorize("hasAuthority('VIEW_DEPOSITS') or #clientId == principal.userId")
    @GetMapping("/account/{accountNumber}")
    public PagedResponse<TimeDepositDto> getTimeDepositsByAccountNumber(@PathVariable String accountNumber, @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        List<TimeDepositDto> deposits = timeDepositService.getTimeDepositsByAccountNumber(accountNumber, pageable);
        long totalElements = timeDepositService.getTotalDepositsNumberByAccountNumber(accountNumber);
        return new PagedResponse<>(deposits, totalElements);
    }

    @PostMapping("/account/{accountNumber}/request")
    public ResponseEntity<TimeDeposit> requestTimeDeposit(@PathVariable String accountNumber, @Valid @RequestBody TimeDepositRequest timeDepositRequest) {
        TimeDeposit timeDeposit = timeDepositService.requestTimeDeposit(accountNumber, timeDepositRequest);
        return ResponseEntity.ok(timeDeposit);
    }

}
