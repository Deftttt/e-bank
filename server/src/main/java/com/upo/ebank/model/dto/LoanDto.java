package com.upo.ebank.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime applicationDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime decisionDate;
    private String loanPurpose;
    private Integer loanTermMonths;
}
