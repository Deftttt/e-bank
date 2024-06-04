package com.upo.ebank.exception;

public class InsufficientBalanceForDepositException extends RuntimeException {
    public InsufficientBalanceForDepositException(String message) {
        super(message);
    }
}