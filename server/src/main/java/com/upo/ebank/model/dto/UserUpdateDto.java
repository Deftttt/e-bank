package com.upo.ebank.model.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class UserUpdateDto {
    @NotBlank(message = "Pole nie może być puste")
    @Size(max = 60, message = "Maksymalna długość to 40 znaków")
    private String firstName;
    @NotBlank(message = "Pole nie może być puste")
    @Size(max = 60, message = "Maksymalna długość to 40 znaków")
    private String lastName;
    @NotBlank(message = "Pole nie może być puste")
    @Size(max = 16, message = "Maksymalna długość to 16 znaków")
    private String phoneNumber;

    @NotNull(message =  "Pole nie może być puste")
    @Valid
    private List<AddressUpdateDto> addresses;
}
