package com.upo.ebank.model.dto;

import lombok.Data;

@Data
public class MfaVerificationRequest {
    private String email;
    private String code;
}
