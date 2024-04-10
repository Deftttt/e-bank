package com.upo.ebank.controller;

import com.upo.ebank.model.*;
import com.upo.ebank.service.AuthService;
import com.upo.ebank.service.ClientService;
import com.upo.ebank.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final UserService userService;
    private final ClientService clientService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/auth/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        return authService.attemptLogin(request.getEmail(), request.getPassword());
    }

    @PostMapping("/auth/signup")
    public LoginResponse signUp(@RequestBody @Validated SignUpRequest request) throws Exception {
        if(userService.isEmailTaken(request.getEmail())){
            throw new Exception("Email exists!");
        }

        Client client = clientService.addClient(new Client(
                null,
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getFirstName(),
                request.getLastName(),
                request.getPhoneNumber(),
                List.of(new Address(null, request.getCity(), request.getStreet(), request.getLocalNumber(),
                        request.getPostCode(), request.getCountry())),
                request.getPesel()
        ));

        return authService.attemptLogin(request.getEmail(), request.getPassword());
    }



}
