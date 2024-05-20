package com.upo.ebank.model.dto;

import com.upo.ebank.model.enums.LoanStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class LoanDetailsDto {

    private Long id;

    private Long clientId;

    private String clientFullName;

    private Long employeeId;

    private String employeeFullName;

    private BigDecimal amount;

    private LoanStatus status;

    private LocalDateTime applicationDate;

    private LocalDateTime decisionDate;

    private String loanPurpose;

    private Integer loanTermMonths;

    private LocalDate startDate;

    private Double interestRate;

    private BigDecimal monthlyRepaymentAmount;

    private BigDecimal totalRepaymentAmount;

    private String comment;
}
