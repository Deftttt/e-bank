package com.upo.ebank.model.dto.account;

import com.upo.ebank.model.enums.AccountType;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ClientCreateBankAccountDto {
    @NotNull(message= "Account type cannot be null")
    private AccountType accountType;
}