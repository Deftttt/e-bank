package com.upo.ebank.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidRegisterConfirmTokenException.class)
    public ResponseEntity<?> handleInvalidRegisterConfirmTokenException(Exception exception, WebRequest request) {
        return new ResponseEntity<>(new ExceptionDetails(new Date(), exception.getMessage(), request.getDescription(false)), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidPasswordResetTokenException.class)
    public ResponseEntity<?> handleInvalidPasswordResetTokenException(Exception exception, WebRequest request) {
        return new ResponseEntity<>(new ExceptionDetails(new Date(), exception.getMessage(), request.getDescription(false)), HttpStatus.BAD_REQUEST);
    }
}
