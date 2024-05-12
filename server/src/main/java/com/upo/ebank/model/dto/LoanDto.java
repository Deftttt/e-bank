package com.upo.ebank.model.dto;

import com.upo.ebank.model.enums.LoanStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class LoanDto {
    private Long id;
    private Long clientId;
    private Long employeeId;
    private BigDecimal amount;
    private LocalDate startDate;
    private LoanStatus status;
    private LocalDateTime applicationDate;
    private LocalDateTime decisionDate;
    private String loanPurpose;
    private Integer loanTermMonths;
}
