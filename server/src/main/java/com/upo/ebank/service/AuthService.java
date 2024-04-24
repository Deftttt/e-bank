package com.upo.ebank.service;

import com.upo.ebank.model.dto.SignUpRequest;
import com.upo.ebank.model.dto.LoginResponse;
import com.upo.ebank.repository.UserRepository;
import com.upo.ebank.security.JwtIssuer;
import com.upo.ebank.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final JwtIssuer jwtIssuer;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

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




}
