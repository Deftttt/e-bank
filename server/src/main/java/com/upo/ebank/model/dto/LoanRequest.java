package com.upo.ebank.model.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class LoanRequest {
    private BigDecimal amount;
    private String loanPurpose;
    private Integer loanTermMonths;
    private Date startDate;
}
