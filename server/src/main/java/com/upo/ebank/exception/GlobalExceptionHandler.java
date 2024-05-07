package com.upo.ebank.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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

    @ExceptionHandler(EmailExistsException.class)
    public ResponseEntity<ExceptionDetails> emailInUseExceptionHandling(Exception exception, WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        errors.put("email", exception.getMessage());

        ExceptionDetails exceptionDetails = new ExceptionDetails(new Date(), "Validation Failed", request.getDescription(false), errors);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoUserWithEmailException.class)
    public ResponseEntity<?> handleNoUserWithEmailException(Exception exception, WebRequest request) {
        return new ResponseEntity<>(new ExceptionDetails(new Date(), exception.getMessage(), request.getDescription(false)), HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionDetails> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ExceptionDetails exceptionDetails = new ExceptionDetails(new Date(), "Validation Failed", ex.getMessage(), errors);
        return new ResponseEntity<>(exceptionDetails, HttpStatus.BAD_REQUEST);
    }
}
