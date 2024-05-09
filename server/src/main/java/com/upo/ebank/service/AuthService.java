package com.upo.ebank.service;

import com.upo.ebank.exception.*;
import com.upo.ebank.model.PasswordResetToken;
import com.upo.ebank.model.RegisterConfirmationToken;
import com.upo.ebank.model.User;
import com.upo.ebank.model.dto.MfaVerificationRequest;
import com.upo.ebank.model.dto.ResetPasswordRequest;
import com.upo.ebank.model.dto.SignUpRequest;
import com.upo.ebank.model.dto.LoginResponse;
import com.upo.ebank.repository.PasswordResetTokenRepository;
import com.upo.ebank.repository.RegisterConfirmationTokenRepository;
import com.upo.ebank.repository.UserRepository;
import com.upo.ebank.security.JwtIssuer;
import com.upo.ebank.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtIssuer jwtIssuer;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RegisterConfirmationTokenRepository tokenRepository;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailService emailService;
    private final MfaService mfaService;
    private final PasswordEncoder passwordEncoder;

    public LoginResponse attemptLogin(String email, String password, String mfaCode) {
        try {
            var authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);

            var principal = (UserPrincipal) authentication.getPrincipal();
            User user = userRepository.findByEmail(principal.getEmail());

            if (user.isMfaEnabled()) {
                if (mfaCode == null || !mfaService.isOtpValid( user.getSecret(), mfaCode)) {
                    throw new BadCredentialsException("MFA is enabled, and the required MFA code is missing or invalid.");
                }
            }

            var roles = principal.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .toList();

            var token = jwtIssuer.issue(principal.getUserId(), principal.getEmail(), roles);
            return LoginResponse.builder()
                    .accessToken(token)
                    .build();
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Incorrect email or password");
        }
    }

    public void validateSignUpRequest(SignUpRequest request) {
        if (isEmailTaken(request.getEmail())) {
            throw new EmailExistsException("Entered email already is in use.");
        }
    }

    public boolean isEmailTaken(String email){
        return userRepository.findByEmail(email) != null;
    }


    public String setupMfa(String email){
        User user = userRepository.findByEmail(email);
        if (user.getSecret() == null) {
            String secretKey = mfaService.generateNewSecret();
            user.setSecret(secretKey);
            userRepository.save(user);
        }
        String qrCodeUrl = mfaService.generateQrCodeImageUri(user.getSecret());
        return qrCodeUrl;
    }

    public void verifyMfaSetup(MfaVerificationRequest request){
        User user = userRepository.findByEmail(request.getEmail());
        String mfaCode = request.getCode();
        if (!mfaService.isOtpValid(user.getSecret(), mfaCode)) {
            throw new BadCredentialsException("Invalid MFA code. Please make sure you've scanned the QR code correctly.");
        }
        user.setMfaEnabled(true);
        userRepository.save(user);
    }


    public String confirmToken(String token) {
        RegisterConfirmationToken confirmationToken = tokenRepository.findByToken(token);
        if (confirmationToken == null || confirmationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new InvalidRegisterConfirmTokenException("Token is invalid or expired");
        }
        User user = confirmationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);
        tokenRepository.deleteByUser(user);

        return "Account activated successfully";
    }


    public RegisterConfirmationToken createToken(String email) {
        User user = userRepository.findByEmail(email);
        RegisterConfirmationToken token = new RegisterConfirmationToken(user);
        return tokenRepository.save(token);
    }


    public void resendConfirmationToken(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new NoUserWithEmailException("User not found with email: " + email);
        }
        if (user.isEnabled()) {
            throw new UserAlreadyEnabledException("User is already enabled, no need to resend the confirmation token");
        }

        RegisterConfirmationToken lastToken = tokenRepository.findTopByUserOrderByCreatedAtDesc(user);
        LocalDateTime now = LocalDateTime.now();
        if (lastToken != null && lastToken.getCreatedAt().plusSeconds(30).isAfter(now)) {
            throw new ResendTokenTooSoonException("You must wait at least 30 seconds before resending the token");
        }

        RegisterConfirmationToken confirmationToken = createToken(email);
        emailService.sendConfirmationEmail(email, confirmationToken.getToken());
    }

    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new NoUserWithEmailException("User not found with email: " + email);
        }

        PasswordResetToken lastToken = passwordResetTokenRepository.findTopByUserOrderByCreatedAtDesc(user);
        LocalDateTime now = LocalDateTime.now();
        if (lastToken != null && lastToken.getCreatedAt().plusSeconds(30).isAfter(now)) {
            throw new ResendTokenTooSoonException("You must wait at least 30 seconds to resend password reset link");
        }

        PasswordResetToken token = new PasswordResetToken(user);
        passwordResetTokenRepository.save(token);

        emailService.sendPasswordResetEmail(email, token.getToken());
    }

    public void resetPassword(ResetPasswordRequest request) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(request.getToken());
        if (resetToken == null || resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new InvalidPasswordResetTokenException("Token is invalid or expired");
        }

        User user = resetToken.getUser();

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        passwordResetTokenRepository.deleteByUser(user);
    }




}
