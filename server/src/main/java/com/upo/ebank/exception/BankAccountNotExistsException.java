package com.upo.ebank.exception;

public class BankAccountNotExistsException extends RuntimeException {
    public BankAccountNotExistsException(String message) {
        super(message);
    }
}
