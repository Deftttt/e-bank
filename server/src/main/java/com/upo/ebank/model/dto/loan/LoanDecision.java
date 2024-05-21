package com.upo.ebank.model.dto.loan;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoanDecision {
    @NotNull
    private boolean approved;

    @NotBlank(message = "Must leave a comment!")
    private String comment;
}
