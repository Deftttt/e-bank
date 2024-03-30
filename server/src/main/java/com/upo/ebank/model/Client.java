package com.upo.ebank.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "client")
@NoArgsConstructor
@AllArgsConstructor
public class Client extends User {

    private String pesel;

    public Client(Long id, String email, String password, String firstName, String lastName, String phoneNumber, Address address, String pesel) {
        super(id, email, password, firstName, lastName, phoneNumber, address);
        this.pesel = pesel;
    }
}
