package com.upo.ebank.model.dto;

import com.upo.ebank.model.enums.AccountType;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class BankAccountDto {
    private String accountNumber;
    private BigDecimal balance;
    private Date openingDate;
    private AccountType accountType;
    private Long clientId;
}