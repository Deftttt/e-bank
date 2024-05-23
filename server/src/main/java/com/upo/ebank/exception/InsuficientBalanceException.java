package com.upo.ebank.exception;


public class InsuficientBalanceException extends RuntimeException {
    public InsuficientBalanceException(String message) {
        super(message);
    }
}