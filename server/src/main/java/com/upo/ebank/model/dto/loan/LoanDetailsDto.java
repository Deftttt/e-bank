package com.upo.ebank.model.dto.loan;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime applicationDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime decisionDate;
    private String loanPurpose;
    private Integer loanTermMonths;
    private LocalDate startDate;
    private Double interestRate;
    private BigDecimal monthlyRepaymentAmount;
    private BigDecimal totalRepaymentAmount;
    private String comment;
}
