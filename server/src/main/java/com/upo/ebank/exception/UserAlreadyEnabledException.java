package com.upo.ebank.exception;

public class UserAlreadyEnabledException extends RuntimeException {
    public UserAlreadyEnabledException(String message) {
        super(message);
    }
}