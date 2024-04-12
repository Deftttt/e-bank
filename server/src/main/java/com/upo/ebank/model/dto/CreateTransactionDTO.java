package com.upo.ebank.model.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class CreateTransactionDTO {
    private BigDecimal amount;
    private Date transactionDate = new Date();
    private String senderAccountNumber;
    private String recipientAccountNumber;
}
