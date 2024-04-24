package com.upo.ebank.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "address")
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 60, nullable = false)
    private String city;

    @Column(length = 60, nullable = false)
    private String street;

    @Column(length = 10)
    private String localNumber;

    @Column(length = 10, nullable = false)
    private String postCode;

    @Column(length = 60, nullable = false)
    private String country;


}
