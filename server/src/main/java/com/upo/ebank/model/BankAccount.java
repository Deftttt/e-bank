package com.upo.ebank.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "bank_account")
@NoArgsConstructor
@AllArgsConstructor
public class BankAccount {
    @Id
    private String accountNumber;

    private BigDecimal balance;

    private Date openingDate;

    private AccountType accountType;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToMany(mappedBy = "account")
    private List<Transaction> transactions;
}
