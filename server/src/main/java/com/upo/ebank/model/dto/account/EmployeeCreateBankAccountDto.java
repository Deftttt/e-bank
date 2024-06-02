package com.upo.ebank.model.dto.account;

import com.upo.ebank.model.enums.AccountType;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class EmployeeCreateBankAccountDto {
    @NotNull(message= "Account type cannot be null")
    private AccountType accountType;
    @Positive(message = "Amount must be positive number")
    private BigDecimal initialDeposit;
}
