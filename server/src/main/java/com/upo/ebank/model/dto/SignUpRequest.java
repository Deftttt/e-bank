package com.upo.ebank.model.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
@Data
public class SignUpRequest {

    @Email(message = "Niepoprawny adres email")
    @NotBlank(message = "Pole nie może być puste")
    private String email;

    @NotBlank(message = "Pole nie może być puste")
    @Size(min = 6, max = 30, message = "Hasło użytkownika musi mieć 6-30 znaków")
    private String password;

    @NotBlank(message = "Pole nie może być puste")
    @Size(max = 40, message = "Maksymalna długość to 40 znaków")
    private String firstName;

    @NotBlank(message = "Pole nie może być puste")
    @Size(max = 40, message = "Maksymalna długość to 40 znaków")
    private String lastName;

    @NotBlank(message = "Pole nie może być puste")
    @Size(max = 16, message = "Maksymalna długość to 16 znaków")
    private String phoneNumber;

    @NotBlank(message = "Pole nie może być puste")
    @Size(min = 11, max = 11, message = "Pesel musi mieć 11 znaków")
    private String pesel;

    @NotBlank(message = "Pole nie może być puste")
    @Size(max = 60, message = "Maksymalna długość to 60 znaków")
    private String city;

    @NotBlank(message = "Pole nie może być puste")
    @Size(max = 60, message = "Maksymalna długość to 60 znaków")
    private String street;

    @Size(max = 10, message = "Maksymalna długość to 10 znaków")
    private String localNumber;

    @NotBlank(message = "Pole nie może być puste")
    @Size(max = 10, message = "Maksymalna długość to 10 znaków")
    private String postCode;

    @NotBlank(message = "Pole nie może być puste")
    @Size(max = 60, message = "Maksymalna długość to 60 znaków")
    private String country;
}
