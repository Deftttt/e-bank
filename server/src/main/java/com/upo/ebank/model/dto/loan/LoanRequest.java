package com.upo.ebank.model.dto.loan;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class LoanRequest {
    @NotNull(message = "Amount cannot be null")
    @DecimalMin(value = "0.0", inclusive = false, message = "Amount must be greater than 0")
    private BigDecimal amount;

    @NotBlank(message = "Loan purpose cannot be blank")
    private String loanPurpose;

    @NotNull(message = "Loan term cannot be null")
    @Min(value = 1, message = "Loan term must be at least 1 month")
    private Integer loanTermMonths;

    @FutureOrPresent(message = "Start date must be in the future or present")
    private LocalDate startDate;
}
