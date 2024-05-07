package com.upo.ebank.model.dto;

import lombok.Data;

import java.math.BigDecimal;
@Data
public class ClientDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
}
