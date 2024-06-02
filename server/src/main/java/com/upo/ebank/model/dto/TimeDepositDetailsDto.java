package com.upo.ebank.model.dto;

import com.upo.ebank.model.enums.DepositStatus;
import com.upo.ebank.model.enums.DepositType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;
@Data
public class TimeDepositDetailsDto {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String AccountNumber;

    private BigDecimal depositAmount;

    private Date startDate;

    private Date endDate;

    private DepositStatus status;

    private int months;
    private BigDecimal interestRate;

    private String clientFirstName;

    private String clientLastName;
}
