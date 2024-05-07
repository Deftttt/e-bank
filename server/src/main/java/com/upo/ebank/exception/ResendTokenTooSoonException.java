package com.upo.ebank.exception;

public class ResendTokenTooSoonException extends RuntimeException {
    public ResendTokenTooSoonException(String message) {
        super(message);
    }
}
