package com.upo.ebank.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class CreateTransactionDTO {
    @NotNull(message = "Pole nie może być puste")
    @Positive(message = "Kwota musi być dodatnia")
    private BigDecimal amount;
    private Date transactionDate = new Date();
    private String message;
    @NotBlank(message = "Pole nie może być puste")
    private String recipientAccountNumber;
}
