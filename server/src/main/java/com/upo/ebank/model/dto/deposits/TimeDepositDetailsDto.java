package com.upo.ebank.model.dto.deposits;

import com.upo.ebank.model.enums.DepositStatus;
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

    private BigDecimal finalAmount;

    private Date startDate;

    private Date endDate;

    private DepositStatus status;

    private int months;

    private double interestRate;

    private String clientFirstName;

    private String clientLastName;
}
