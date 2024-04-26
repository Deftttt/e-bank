package com.upo.ebank.service;

import com.upo.ebank.exception.InvalidRegisterConfirmTokenException;
import com.upo.ebank.model.RegisterConfirmationToken;
import com.upo.ebank.model.User;
import com.upo.ebank.model.dto.SignUpRequest;
import com.upo.ebank.model.dto.LoginResponse;
import com.upo.ebank.repository.RegisterConfirmationTokenRepository;
import com.upo.ebank.repository.UserRepository;
import com.upo.ebank.security.JwtIssuer;
import com.upo.ebank.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtIssuer jwtIssuer;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RegisterConfirmationTokenRepository tokenRepository;
    private final EmailService emailService;

    public LoginResponse attemptLogin(String email, String password){

        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password)
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        var principal = (UserPrincipal) authentication.getPrincipal();
        var roles = principal.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        var token = jwtIssuer.issue(principal.getUserId(), principal.getEmail(), roles);
        return LoginResponse.builder()
                .accessToken(token)
                .build();
    }


    public void validateSignUpRequest(SignUpRequest request) throws Exception {
        if (isEmailTaken(request.getEmail())) {
            throw new Exception("Entered email already is in use.");
        }
    }

    public boolean isEmailTaken(String email){
        return userRepository.findByEmail(email) != null;
    }


    public String confirmToken(String token) {
        RegisterConfirmationToken confirmationToken = tokenRepository.findByToken(token);
        if (confirmationToken == null || confirmationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new InvalidRegisterConfirmTokenException("Token is invalid or expired");
        }
        User user = confirmationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);
        tokenRepository.delete(confirmationToken);
        return "Account activated successfully";
    }

    public RegisterConfirmationToken createToken(String email) {
        User user = userRepository.findByEmail(email);
        RegisterConfirmationToken token = new RegisterConfirmationToken(user);
        return tokenRepository.save(token);
    }





}
