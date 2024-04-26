package com.upo.ebank.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@Entity
@Table(name = "client")
@NoArgsConstructor
@AllArgsConstructor
public class Client extends User {

    @Column(length = 12, nullable = false)
    private String pesel;

    public Client(Long id, String email, String password, String firstName, String lastName, String phoneNumber, List<Address> addresses, String pesel) {
        super(id, email, password, firstName, lastName, phoneNumber, addresses);
        this.pesel = pesel;
    }

    public Client(Long id, String email, String password, String firstName, String lastName, String phoneNumber, List<Address> addresses, String pesel, boolean enabled) {
        super(id, email, password, firstName, lastName, phoneNumber, addresses, enabled);
        this.pesel = pesel;
    }
}
