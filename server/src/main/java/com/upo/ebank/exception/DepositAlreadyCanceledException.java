package com.upo.ebank.exception;

public class DepositAlreadyCanceledException extends RuntimeException {
    public DepositAlreadyCanceledException(String message) {
        super(message);
    }
}