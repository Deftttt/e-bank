package com.upo.ebank.model;

import com.upo.ebank.model.enums.Department;
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

    @Enumerated(EnumType.STRING)
    private Department department;

    @OneToOne
    private Position position;

    public Employee(Long id, String email, String password, String firstName, String lastName, String phoneNumber, List<Address> addresses, Department department, Position position) {
        super(id, email, password, firstName, lastName, phoneNumber, addresses);
        this.department = department;
        this.position = position;
    }

}
