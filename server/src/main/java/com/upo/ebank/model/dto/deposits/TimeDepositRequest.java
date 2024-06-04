package com.upo.ebank.model.dto.deposits;


import com.upo.ebank.model.enums.DepositType;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;



@Data
public class TimeDepositRequest {
    @Max(value = 100000, message = "Amount must be less than 1,000,000")
    @NotNull(message = "Amount cannot be null")
    @DecimalMin(value = "100", inclusive = false, message = "Amount must be greater than 100")
    private BigDecimal depositAmount;

    private Date startDate = new Date();

    @Valid
    @NotNull(message = "Deposit type cannot be null")
    private DepositType depositType;

}