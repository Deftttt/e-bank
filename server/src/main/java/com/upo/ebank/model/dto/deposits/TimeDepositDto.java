package com.upo.ebank.model.dto.deposits;

import com.upo.ebank.model.enums.DepositStatus;
import com.upo.ebank.model.enums.DepositType;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class TimeDepositDto {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal depositAmount;

    private Date startDate;

    private Date endDate;

    private DepositStatus status;

    private DepositType depositType;

    private String AccountNumber;

}


