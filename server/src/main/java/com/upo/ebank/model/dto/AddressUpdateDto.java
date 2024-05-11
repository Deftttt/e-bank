package com.upo.ebank.model.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AddressUpdateDto {
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
