package com.upo.ebank.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;
import java.util.Map;

@Data
@AllArgsConstructor
public class ExceptionDetails{
    private Date timestamp;
    private String message;
    private String details;
    private Map<String, String> errors;

    public ExceptionDetails(Date timestamp, String message, String details) {
        this.timestamp = timestamp;
        this.message = message;
        this.details = details;
    }
}
