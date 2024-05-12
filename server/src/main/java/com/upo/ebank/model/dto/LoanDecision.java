package com.upo.ebank.model.dto;

import lombok.Data;

@Data
public class LoanDecision {
    private boolean approve;
    private String comment;
}
