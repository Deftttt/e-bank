package com.upo.ebank.model.enums;

import java.math.BigDecimal;

public enum DepositType {
    ONE_MONTH(1, BigDecimal.valueOf(0.01)),
    SIX_MONTHS(6, BigDecimal.valueOf(0.03)),
    TWELVE_MONTHS(12, BigDecimal.valueOf(0.06)),
    TWENTY_FOUR_MONTHS(24, BigDecimal.valueOf(0.08));

    private final int months;
    private final BigDecimal interestRate;

    DepositType(int months, BigDecimal interestRate) {
        this.months = months;
        this.interestRate = interestRate;
    }

    public int getMonths() {
        return months;
    }

    public BigDecimal getInterestRate() {
        return interestRate;
    }
}
