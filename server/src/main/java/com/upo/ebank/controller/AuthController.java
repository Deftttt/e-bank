package com.upo.ebank.controller;

import com.upo.ebank.model.RegisterConfirmationToken;
import com.upo.ebank.model.dto.LoginRequest;
import com.upo.ebank.model.dto.LoginResponse;
import com.upo.ebank.model.dto.SignUpRequest;
import com.upo.ebank.service.AuthService;
import com.upo.ebank.service.ClientService;
import com.upo.ebank.service.EmailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final ClientService clientService;
    private final EmailService emailService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        return authService.attemptLogin(request.getEmail(), request.getPassword());
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest request) throws Exception {
        authService.validateSignUpRequest(request);
        clientService.addClient(request);

        RegisterConfirmationToken confirmationToken = authService.createToken(request.getEmail());
        emailService.sendConfirmationEmail(request.getEmail(), confirmationToken.getToken());

        return ResponseEntity.ok("User registered successfully. Please check your email to activate your account.");
    }

    @GetMapping("/signup/confirm")
    public String confirmRegistration(@RequestParam("token") String token) {
        return authService.confirmToken(token);
    }


}
