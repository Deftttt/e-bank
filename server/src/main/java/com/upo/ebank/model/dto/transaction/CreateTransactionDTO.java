package com.upo.ebank.model.dto.transaction;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class CreateTransactionDTO {
    @NotNull(message = "Field cannot be null")
    @Positive(message = "Amount must be positive number")
    private BigDecimal amount;

    private Date transactionDate = new Date();

    @NotBlank(message = "Transaction title cannot be empty")
    private String message;

    @NotBlank(message = "Recipient account number cannot be empty")
    private String recipientAccountNumber;
}
