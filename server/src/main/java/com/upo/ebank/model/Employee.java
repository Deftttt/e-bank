package com.upo.ebank.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Table(name = "employee")
@NoArgsConstructor
@AllArgsConstructor
public class Employee extends User {

    private String department;

    @ManyToOne()
    @JoinColumn(name = "position_id")
    private Position position;

    public Employee(Long id, String email, String password, String firstName, String lastName, String phoneNumber, List<Address> addresses, String department, Position position) {
        super(id, email, password, firstName, lastName, phoneNumber, addresses);
        this.department = department;
        this.position = position;
    }

    public Employee(Long id, String email, String password, String firstName, String lastName, String phoneNumber, List<Address> addresses, String department, Position position, boolean enabled) {
        super(id, email, password, firstName, lastName, phoneNumber, addresses, enabled);
        this.department = department;
        this.position = position;
    }

}
