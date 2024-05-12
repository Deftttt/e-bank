package com.upo.ebank.model.dto;

import lombok.Data;

@Data
public class LoanDecisionDTO {
    private boolean approve;
    private String comment;
}
