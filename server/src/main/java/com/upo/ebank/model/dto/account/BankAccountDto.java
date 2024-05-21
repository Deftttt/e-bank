package com.upo.ebank.model.dto.account;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.upo.ebank.model.enums.AccountType;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class BankAccountDto {
    private String accountNumber;
    private BigDecimal balance;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private Date openingDate;
    private AccountType accountType;
    private Long clientId;
}