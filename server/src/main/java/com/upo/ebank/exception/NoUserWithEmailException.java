package com.upo.ebank.exception;

public class NoUserWithEmailException extends RuntimeException {
    public NoUserWithEmailException(String message) {
        super(message);
    }
}