package com.upo.ebank.model.dto.transaction;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class TransactionDetailsDto {
    private Long id;
    private BigDecimal amount;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private Date transactionDate = new Date();
    private String message;
    private String senderAccountNumber;
    private String senderName;
    private String senderSurname;
    private String recipientAccountNumber;
    private String recipientName;
    private String recipientSurname;
}