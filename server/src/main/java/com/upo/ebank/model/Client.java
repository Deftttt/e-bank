package com.upo.ebank.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Table(name = "client")
@NoArgsConstructor
@AllArgsConstructor
public class Client extends User {

    private String pesel;

    public Client(Long id, String email, String password, String firstName, String lastName, String phoneNumber, List<Address> addresses, String pesel) {
        super(id, email, password, firstName, lastName, phoneNumber, addresses);
        this.pesel = pesel;
    }
}
