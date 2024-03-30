package com.upo.ebank.model;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}
