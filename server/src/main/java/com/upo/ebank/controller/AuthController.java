package com.upo.ebank.controller;

import com.upo.ebank.model.dto.LoginRequest;
import com.upo.ebank.model.dto.LoginResponse;
import com.upo.ebank.model.dto.SignUpRequest;
import com.upo.ebank.service.AuthService;
import com.upo.ebank.service.ClientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final ClientService clientService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        return authService.attemptLogin(request.getEmail(), request.getPassword());
    }

    @PostMapping("/signup")
    public LoginResponse signUp(@Valid @RequestBody SignUpRequest request) throws Exception {
        authService.validateSignUpRequest(request);
        clientService.addClient(request);

        return authService.attemptLogin(request.getEmail(), request.getPassword());
    }


}
