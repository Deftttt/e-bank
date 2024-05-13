package com.upo.ebank.model.dto;

import lombok.Data;

@Data
public class LoanDecision {
    private boolean approved;
    private String comment;
}
