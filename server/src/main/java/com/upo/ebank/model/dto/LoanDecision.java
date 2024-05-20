package com.upo.ebank.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoanDecision {
    @NotNull
    private boolean approved;
    private String comment;
}
