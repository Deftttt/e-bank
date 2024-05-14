package com.upo.ebank.model.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class TransactionDetailsDTO {
    private Long id;
    private BigDecimal amount;
    private Date transactionDate = new Date();
    private String message;
    private String senderAccountNumber;
    private String senderName;
    private String senderSurname;
    private String recipientAccountNumber;
    private String recipientName;
    private String recipientSurname;
}