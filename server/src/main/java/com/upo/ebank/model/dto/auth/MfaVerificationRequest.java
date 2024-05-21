package com.upo.ebank.model.dto.auth;

import lombok.Data;

@Data
public class MfaVerificationRequest {
    private String email;
    private String code;
}
