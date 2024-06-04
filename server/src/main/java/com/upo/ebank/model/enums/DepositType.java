package com.upo.ebank.model.enums;

public enum DepositType {
    ONE_MONTH(1, 0.01),
    SIX_MONTHS(6, 0.03),
    TWELVE_MONTHS(12, 0.06),
    TWENTY_FOUR_MONTHS(24, 0.08);

    private final int months;
    private final double interestRate;

    DepositType(int months, double interestRate) {
        this.months = months;
        this.interestRate = interestRate;
    }

    public int getMonths() {
        return months;
    }

    public double getInterestRate() {
        return interestRate;
    }
}
