package com.upo.ebank.controller;

import com.upo.ebank.model.RegisterConfirmationToken;
import com.upo.ebank.model.User;
import com.upo.ebank.model.dto.*;
import com.upo.ebank.security.UserPrincipal;
import com.upo.ebank.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final ClientService clientService;
    private final EmailService emailService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        return authService.attemptLogin(request.getEmail(), request.getPassword(), request.getMfaCode());
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest request){
        authService.validateSignUpRequest(request);
        clientService.addClient(request);

        RegisterConfirmationToken confirmationToken = authService.createToken(request.getEmail());
        emailService.sendConfirmationEmail(request.getEmail(), confirmationToken.getToken());

        return ResponseEntity.ok("Registered successfully! Please check your email to activate your account.");
    }

    @GetMapping("/signup/confirm")
    public ResponseEntity<String> confirmRegistration(@RequestParam("token") String token) {
        return ResponseEntity.ok(authService.confirmToken(token));
    }

    @PostMapping("/signup/resend-confirmation")
    public ResponseEntity<String> resendConfirmationToken(@RequestParam String email) {
        authService.resendConfirmationToken(email);
        return ResponseEntity.ok("Confirmation token resent successfully! Please check your email.");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        authService.forgotPassword(email);
        return ResponseEntity.ok("Password reset email sent successfully! Please check your email.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok("Password reset successfully!");
    }

    @PostMapping("/setup-mfa")
    public String setupMfa(@AuthenticationPrincipal UserPrincipal userPrincipal) {
        String qrCodeUrl = authService.setupMfa(userPrincipal.getEmail());
        return qrCodeUrl;
    }

    @PostMapping("/verify-mfa")
    public ResponseEntity<?> verifyMfa(@RequestBody MfaVerificationRequest request) {
        authService.verifyMfaSetup(request);
        return ResponseEntity.ok("MFA setup completed successfully");
    }


}
